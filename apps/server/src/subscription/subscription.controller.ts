import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { SubscriptionService } from '@/server/subscription/subscription.service'
import { TwoFactorGuard } from '@/server/auth/guards/two-factor.guard'
import { User } from '@/server/user/decorators/user.decorator'
import { UserDto } from '@reactive-resume/dto'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Subscription')
@Controller('v1/subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get('plans')
  async fetchPlans(@Query('language') language?: string) {
    return this.subscriptionService.fetchPlans(language)
  }

  @Get('active')
  @UseGuards(TwoFactorGuard)
  async fetchActiveSubscriptions(@User() user: UserDto) {
    return this.subscriptionService.fetchActiveByTenantId(user.tenantId)
  }
}
