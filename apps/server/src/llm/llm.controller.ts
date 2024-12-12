// src/llm/llm.controller.ts
import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common'
import { LLMService } from './llm.service'
import { TwoFactorGuard } from '@/server/auth/guards/two-factor.guard'
import { User } from '@/server/user/decorators/user.decorator'
import { User as UserEntity } from '@prisma/client'

@Controller('v1/chat')
export class LLMController {
  constructor(private readonly llmService: LLMService) {
  }

  @Post('completions')
  @UseGuards(TwoFactorGuard)
  async callOpenAICompletion(@User() user: UserEntity, @Body() req: any) {
    return this.llmService.createCompletions(user, req)
  }
}
