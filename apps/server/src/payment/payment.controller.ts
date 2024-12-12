import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { LemonSqueezyPaymentService } from '@/server/payment/payment.service'
import { Webhook as LemonSqueezyWebhook } from '@lemonsqueezy/lemonsqueezy.js'
import { CheckoutDto, CreateCheckoutDto } from '../../../../libs/dto/src/payment'
import { ApiTags } from '@nestjs/swagger'
import { TwoFactorGuard } from '@/server/auth/guards/two-factor.guard'
import { User } from '@/server/user/decorators/user.decorator'
import { UserDto } from '@reactive-resume/dto'

@ApiTags('Payment')
@Controller('v1/payment/lemonsqueezy')
export class LemonSqueezyPaymentController {
  constructor(private readonly paymentService: LemonSqueezyPaymentService) {}

  @Post('checkout')
  @UseGuards(TwoFactorGuard)
  public async createCheckout(
    @User() user: UserDto,
    @Body() req: CreateCheckoutDto
  ): Promise<CheckoutDto> {
    // Set user details to avoid invalid data from frontend
    req.userId = user.id
    req.userName = user.name
    req.email = user.email
    req.tenantId = user.tenantId || ''

    return this.paymentService.createCheckout(req)
  }

  @Post('webhook')
  public async handleWebhook(@Body() req: LemonSqueezyWebhook): Promise<void> {
    return this.paymentService.handleWebhookEvent(req)
  }
}
