// src/llm/llm.controller.ts
import * as fs from 'fs'
import * as path from 'path'
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
import { simpleRandom } from '@reactive-resume/utils'

@Controller('v1/llm')
export class LLMController {
  constructor(private readonly llmService: LLMService) {}
}

@Controller('v1/chat')
export class LLMProxyController {
  constructor(private readonly llmService: LLMService) {}

  @Post('completions')
  @UseGuards(TwoFactorGuard)
  // TODO: Use guard to check usage
  async callOpenAICompletion(@User() user: UserEntity, @Body() req: any) {
    return this.llmService.createCompletions(user, req)
  }
}
