import { Module } from '@nestjs/common'
import { LemonSqueezyPaymentService } from './payment.service'
import { ConfigModule } from '@nestjs/config'
import { SubscriptionModule } from '@/server/subscription/subscription.module'
import { LemonSqueezyPaymentController } from './payment.controller'

@Module({
  imports: [ConfigModule, SubscriptionModule],
  providers: [LemonSqueezyPaymentService],
  exports: [LemonSqueezyPaymentService],
  controllers: [LemonSqueezyPaymentController]
})
export class PaymentModule {
}
