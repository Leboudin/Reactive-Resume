import { Module } from '@nestjs/common'
import { LLMStatService } from './llm-stat.service'

@Module({
  providers: [LLMStatService],
  exports: [LLMStatService]
})
export class LLMStatModule {}
