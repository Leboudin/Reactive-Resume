// src/llm/llm.service.ts
import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
  Logger,
  InternalServerErrorException
} from '@nestjs/common'
import { LLMStatService } from '@/server/llm-stat/llm-stat.service'
import { SubscriptionService } from '@/server/subscription/subscription.service'
import OpenAI from 'openai'
import { ConfigService } from '@nestjs/config'
import { User as UserEntity } from '@prisma/client'

const DEFAULT_LLM_MODEL = 'moonshot-v1-auto'
const DEFAULT_LLM_BASE_URL = 'https://api.moonshot.cn/v1'

@Injectable()
export class LLMService {
  private openai: OpenAI

  constructor(
    private readonly subscriptionService: SubscriptionService,
    private readonly llmStatService: LLMStatService,
    private readonly configService: ConfigService
  ) {

  }

  get openaiClient() {
    if (this.openai) {
      return this.openai
    }
    const configuration = {
      apiKey: this.configService.get('LLM_API_KEY'),
      baseURL: this.configService.get('LLM_BASE_URL', DEFAULT_LLM_BASE_URL)
    }
    this.openai = new OpenAI(configuration)
    return this.openai
  }


  async createCompletions(user: UserEntity, req: any) {
    Logger.log('received completions request: ' + JSON.stringify({ user: user, body: req.body }))

    // 1. 验证用户是否属于租户
    if (!user.tenantId) {
      throw new ForbiddenException('User tenant not found')
    }

    // 2. 查询当前 tenant 的订阅记录
    const tenantId = user.tenantId
    let subscription
    try {
      subscription = await this.subscriptionService.getActiveSubscriptionByTenantId(tenantId)
    } catch (error) {
      throw new ForbiddenException('No active subscription found for this tenant')
    }

    const features = subscription.features as Record<string, any>
    const maxRequests = features.maxRequests as number
    const maxTokens = features.maxTokens as number

    // 3. 获取当前月份的统计数据
    const currentPeriod = new Date().toISOString().slice(0, 7) // 'YYYY-MM'
    const stats = await this.llmStatService.get(tenantId, currentPeriod)

    // 4. 检查统计数据是否已经超出用量上限
    if (stats && (stats.requests >= maxRequests || stats.inputTokens + stats.outputTokens >= maxTokens)) {
      throw new ForbiddenException('Usage limit exceeded')
    }

    // 5. 调用 OpenAI API
    try {
      const request: any = {
        model: this.configService.get('LLM_MODEL', DEFAULT_LLM_MODEL),
        messages: req.body.messages,
        max_tokens: req.body.max_tokens || 1024
        // temperature: req.body.temperature,
        // top_p: req.body.top_p,
        // n: req.body.n,
        // stop: req.body.stop
      }

      Logger.log(`model: ${this.configService.get('LLM_MODEL', DEFAULT_LLM_MODEL)}, api key: ${this.configService.get('LLM_API_KEY')}, base url: ${this.configService.get('LLM_BASE_URL', DEFAULT_LLM_BASE_URL)}. request: ${JSON.stringify(request)}`)
      const response = await this.openaiClient.completions.create(request)

      // 6. 更新统计数据
      const usage = response?.usage
      await this.llmStatService.update(tenantId, currentPeriod, 1, usage?.prompt_tokens || 0, usage?.completion_tokens || 0)

      return response?.choices[0]?.text?.trim() || ''
    } catch (error) {
      Logger.error(error)
      Logger.error(JSON.stringify(error))
      throw new InternalServerErrorException('Internal server error')
    }
  }
}
