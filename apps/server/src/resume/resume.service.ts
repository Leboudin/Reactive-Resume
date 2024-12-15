import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger
} from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { CreateResumeDto, ImportResumeDto, ResumeDto, UpdateResumeDto } from '@reactive-resume/dto'
import { defaultResumeData, ResumeData } from '@reactive-resume/schema'
import type { DeepPartial } from '@reactive-resume/utils'
import { ErrorMessage, generateRandomName, kebabCase } from '@reactive-resume/utils'
import deepmerge from 'deepmerge'
import { PrismaService } from 'nestjs-prisma'

import { PrinterService } from '@/server/printer/printer.service'

import { StorageService } from '../storage/storage.service'
import { LLMService } from '@/server/llm/llm.service'
import fs from 'fs'
import { EXTRACT_RESUME_DATA_PROMPT } from '@/server/resume/constants'

@Injectable()
export class ResumeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly printerService: PrinterService,
    private readonly storageService: StorageService,
    private readonly llmService: LLMService
  ) {}

  public async create(userId: string, createResumeDto: CreateResumeDto) {
    const { name, email, picture } = await this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
      select: { name: true, email: true, picture: true }
    })

    const data = deepmerge(defaultResumeData, {
      basics: { name, email, picture: { url: picture ?? '' } }
    } satisfies DeepPartial<ResumeData>)

    return this.prisma.resume.create({
      data: {
        data,
        userId,
        title: createResumeDto.title,
        visibility: createResumeDto.visibility,
        slug: createResumeDto.slug ?? kebabCase(createResumeDto.title)
      }
    })
  }

  public import(userId: string, importResumeDto: ImportResumeDto) {
    const randomTitle = generateRandomName()

    return this.prisma.resume.create({
      data: {
        userId,
        visibility: 'private',
        data: importResumeDto.data,
        title: importResumeDto.title ?? randomTitle,
        slug: importResumeDto.slug ?? kebabCase(randomTitle)
      }
    })
  }

  public findAll(userId: string) {
    return this.prisma.resume.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
      include: {
        statistics: true
      }
    })
  }

  public findOne(id: string, userId?: string) {
    if (userId) {
      return this.prisma.resume.findUniqueOrThrow({ where: { userId_id: { userId, id } } })
    }

    return this.prisma.resume.findUniqueOrThrow({ where: { id } })
  }

  public async findOneStatistics(id: string) {
    const result = await this.prisma.statistics.findFirst({
      select: { views: true, downloads: true },
      where: { resumeId: id }
    })

    return {
      views: result?.views ?? 0,
      downloads: result?.downloads ?? 0
    }
  }

  public async findOneByUsernameSlug(username: string, slug: string, userId?: string) {
    const resume = await this.prisma.resume.findFirstOrThrow({
      where: { user: { username }, slug, visibility: 'public' }
    })

    // Update statistics: increment the number of views by 1
    if (!userId) {
      await this.prisma.statistics.upsert({
        where: { resumeId: resume.id },
        create: { views: 1, downloads: 0, resumeId: resume.id },
        update: { views: { increment: 1 } }
      })
    }

    return resume
  }

  public async update(userId: string, id: string, updateResumeDto: UpdateResumeDto) {
    try {
      const { locked } = await this.prisma.resume.findUniqueOrThrow({
        where: { id },
        select: { locked: true }
      })

      if (locked) throw new BadRequestException(ErrorMessage.ResumeLocked)

      return await this.prisma.resume.update({
        data: {
          title: updateResumeDto.title,
          slug: updateResumeDto.slug,
          visibility: updateResumeDto.visibility,
          data: updateResumeDto.data as unknown as Prisma.JsonObject
        },
        where: { userId_id: { userId, id } }
      })
    } catch (error) {
      if (error.code === 'P2025') {
        Logger.error(error)
        throw new InternalServerErrorException(error)
      }
    }
  }

  public lock(userId: string, id: string, set: boolean) {
    return this.prisma.resume.update({
      data: { locked: set },
      where: { userId_id: { userId, id } }
    })
  }

  public async remove(userId: string, id: string) {
    await Promise.all([
      // Remove files in storage, and their cached keys
      this.storageService.deleteObject(userId, 'resumes', id),
      this.storageService.deleteObject(userId, 'previews', id)
    ])

    return this.prisma.resume.delete({ where: { userId_id: { userId, id } } })
  }

  public async printResume(resume: ResumeDto, userId?: string) {
    const url = await this.printerService.printResume(resume)

    // Update statistics: increment the number of downloads by 1
    if (!userId) {
      await this.prisma.statistics.upsert({
        where: { resumeId: resume.id },
        create: { views: 0, downloads: 1, resumeId: resume.id },
        update: { downloads: { increment: 1 } }
      })
    }

    return url
  }

  public printPreview(resume: ResumeDto) {
    return this.printerService.printPreview(resume)
  }

  public async extractDocResume(filename: string) {
    try {
      const content = await this.llmService.extractFileContent(filename)
      const request = {
        messages: [
          {
            role: 'user',
            content: EXTRACT_RESUME_DATA_PROMPT + content
          }
        ],
        temperature: 0.3,
        max_tokens: 2048,
        response_format: { type: 'json_object' },
        stream: false
      }
      const response = await this.llmService.createCompletions(request)
      const tmp = response?.choices[0]?.message?.content || '{}'
      const result = JSON.parse(tmp) as ResumeData
      Logger.log({ filename, content, result }, 'extracted resume data from doc file')
      return result
    } catch (error) {
      Logger.error({ error }, 'failed to extract resume data from doc file')
    } finally {
      fs.rmSync(filename)
    }
  }
}
