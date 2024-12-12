import { Body, Controller, Post } from '@nestjs/common'
import { LemonSqueezyPaymentService } from '@/server/payment/payment.service'
import { Webhook as LemonSqueezyWebhook } from '@lemonsqueezy/lemonsqueezy.js'
import { CheckoutDto, CreateCheckoutDto } from '../../../../libs/dto/src/payment'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Payment')
@Controller('v1/payment/lemonsqueezy')
export class LemonSqueezyPaymentController {
  constructor(
    private readonly paymentService: LemonSqueezyPaymentService
  ) {
  }

  // TODO: use auth guard
  @Post('checkout')
  public async handleCheckout(@Body() req: CreateCheckoutDto): Promise<CheckoutDto> {
    return this.paymentService.createCheckout(req)
  }

  @Post('webhook')
  public async handleWebhook(@Body() req: LemonSqueezyWebhook): Promise<void> {
    return this.paymentService.handleWebhookEvent(req)
  }
}
