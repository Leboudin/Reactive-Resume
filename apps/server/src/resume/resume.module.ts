import { Module } from '@nestjs/common'

import { AuthModule } from '@/server/auth/auth.module'
import { PrinterModule } from '@/server/printer/printer.module'

import { StorageModule } from '../storage/storage.module'
import { ResumeController } from './resume.controller'
import { ResumeService } from './resume.service'
import { LLMModule } from '@/server/llm/llm.module'

@Module({
  imports: [AuthModule, PrinterModule, StorageModule, LLMModule],
  controllers: [ResumeController],
  providers: [ResumeService],
  exports: [ResumeService]
})
export class ResumeModule {}
