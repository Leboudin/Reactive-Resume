// src/llm/llm.controller.ts
import { extname } from 'path'
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  UseInterceptors,
  UploadedFile,
  BadRequestException
} from '@nestjs/common'
import { LLMService } from './llm.service'
import { TwoFactorGuard } from '@/server/auth/guards/two-factor.guard'
import { User } from '@/server/user/decorators/user.decorator'
import { User as UserEntity } from '@prisma/client'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'

@Controller('v1/llm')
export class LLMController {
  constructor(private readonly llmService: LLMService) {}

  @Post('upload')
  @UseGuards(TwoFactorGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: '/tmp/uploaded',
        filename: (req, file, callback) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('')
          return callback(null, `${randomName}${extname(file.originalname)}`)
        }
      })
    })
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded')
    }

    const filePath = file.path
    const content = await this.llmService.test(filePath)
    // TODO: 处理文件内容
    return { content }
  }
}

@Controller('v1/chat')
export class LLMProxyController {
  constructor(private readonly llmService: LLMService) {}

  @Post('completions')
  @UseGuards(TwoFactorGuard)
  async callOpenAICompletion(@User() user: UserEntity, @Body() req: any) {
    return this.llmService.createCompletions(user, req)
  }
}
