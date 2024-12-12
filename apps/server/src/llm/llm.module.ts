import { Module } from '@nestjs/common'
import { LLMService } from './llm.service'
import { LLMController, LLMProxyController } from './llm.controller'
import { UserModule } from '@/server/user/user.module'
import { SubscriptionModule } from '@/server/subscription/subscription.module'
import { LLMStatModule } from '@/server/llm-stat/llm-stat.module'

@Module({
  imports: [UserModule, SubscriptionModule, LLMStatModule],
  providers: [LLMService],
  exports: [LLMService],
  controllers: [LLMController, LLMProxyController]
})
export class LLMModule {}
