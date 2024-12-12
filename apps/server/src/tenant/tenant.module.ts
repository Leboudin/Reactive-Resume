import { Module } from '@nestjs/common'
import { TenantService } from '@/server/tenant/tenant.service'

@Module({
  providers: [TenantService],
  exports: [TenantService]
})
export class TenantModule {}
