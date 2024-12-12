import { Test, TestingModule } from '@nestjs/testing'
import { LLMService } from './llm.service'
import { SubscriptionService } from '@/server/subscription/subscription.service'
import { ConfigService } from '@nestjs/config'
import { LLMStatService } from '@/server/llm-stat/llm-stat.service'
import { PrismaService } from 'nestjs-prisma'

describe('LLMService', () => {
  let service: LLMService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LLMService, SubscriptionService, ConfigService, LLMStatService, PrismaService]
    }).compile()

    service = module.get<LLMService>(LLMService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should call OpenAI completions.create with the correct request', async () => {
    const request = {
      messages: [{ role: 'user', content: 'Hello, are you a LLM model? Please answer yes or no' }],
      max_tokens: 1024
    }
    const response = await service['_createCompletions'](request)
    const result = response?.choices[0]?.message?.content?.toLowerCase() || ''
    expect(result).toContain('yes')
  })
})
