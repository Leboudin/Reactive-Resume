// src/llm/llm.controller.ts
import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common'
import { LLMService } from './llm.service'
import { TwoFactorGuard } from '@/server/auth/guards/two-factor.guard'
import { User } from '@/server/user/decorators/user.decorator'
import { User as UserEntity } from '@prisma/client'

@Controller('llm')
export class LLMController {
  constructor(private readonly llmService: LLMService) {
  }

  @Post('/v1/chat/completions')
  @UseGuards(TwoFactorGuard)
  async callOpenAICompletion(@User() user: UserEntity, @Request() req: any) {
    return this.llmService.createCompletions(user, req)
  }
}
