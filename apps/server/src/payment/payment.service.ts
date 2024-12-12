import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import {
  createCheckout,
  getSubscription,
  lemonSqueezySetup,
  listProducts,
  listVariants
} from '@lemonsqueezy/lemonsqueezy.js'
import type {
  Checkout,
  ListProducts,
  ListProductsParams,
  ListVariants,
  ListVariantsParams,
  NewCheckout,
  Webhook
} from '@lemonsqueezy/lemonsqueezy.js'
import { ConfigService } from '@nestjs/config'
import { SubscriptionService } from '@/server/subscription/subscription.service'
import { CheckoutDto, CreateCheckoutDto } from '../../../../libs/dto/src/payment'
import { snakeToCamel } from '@reactive-resume/utils'

/**
 * Docs: https://docs.lemonsqueezy.com/help
 * Console: https://app.lemonsqueezy.com/dashboard
 */

@Injectable()
export class LemonSqueezyPaymentService {
  private readonly storeId: string
  private readonly testMode: boolean

  constructor(private readonly configService: ConfigService,
              private readonly subscriptionService: SubscriptionService
  ) {
    dayjs.extend(utc)

    this.storeId = this.configService.get('PAYMENT_LEMONSQUEEZY_STORE_ID') || ''
    this.testMode = !!this.configService.get('PAYMENT_LEMONSQUEEZY_TEST_MODE')

    lemonSqueezySetup({
      apiKey: configService.get('PAYMENT_LEMONSQUEEZY_KEY')
    })
  }

  public async createCheckout(req: CreateCheckoutDto): Promise<CheckoutDto> {
    // 1. Fetch existing subscriptions
    const subscriptions = await this.subscriptionService.fetchActiveByTenantId(req.tenantId)
    for (const sub of subscriptions) {
      if (sub.planId === req.planId && dayjs().utc().diff(dayjs(sub.createdAt).utc(), 'days') > 5) {
        throw new BadRequestException('There is already an active subscription of the same plan for the user')
      }
    }

    // 2. Fetch the plan
    const plan = await this.subscriptionService.getPlanById(req.planId)
    if (!plan) {
      throw new BadRequestException('Invalid plan')
    }

    // 3. Create checkout
    try {
      const res: Checkout = await this._createCheckout(plan.externalId, req)
      return {
        id: res?.data?.id,
        url: res?.data?.attributes?.url
      } as CheckoutDto
    } catch (error) {
      throw new InternalServerErrorException('Failed to create checkout')
    }
  }

  public async handleWebhookEvent(event: Webhook): Promise<any> {
    Logger.log({ event }, 'received lemon squeezy webhook event')

    this.validateOrThrow(event)

    // @ts-ignore
    const eventName = event.meta.event_name

    switch (eventName) {
      case 'subscription_created':
        break

      case 'subscription_payment_success':
        return await this.handleSubscriptionPaymentSuccess(event)

      case 'subscription_updated':
        break
    }

    return {}
  }

  private async _createCheckout(variantId: number | string, req: CreateCheckoutDto): Promise<Checkout> {
    const checkout: NewCheckout = {
      checkoutData: {
        email: req.email,
        name: req.userName,
        custom: {
          planId: req.planId,
          userId: req.userId,
          tenantId: req.tenantId
        }
      },
      expiresAt: dayjs().utc().add(1, 'day').toISOString(),
      preview: true
    }

    const { statusCode, error, data } = await createCheckout(this.storeId, variantId, checkout)
    if (error) {
      Logger.error({ statusCode, error, storeId: this.storeId, variantId, checkout }, `failed to create checkout`)
      throw new Error(error.message)
    }

    Logger.log({ data: data?.data?.attributes || data }, 'created checkout')

    return data
  }

  private async handleSubscriptionPaymentSuccess(event: Webhook) {
    // 1. Extract payment information

    // @ts-ignore
    const uniqueId = event.data.id
    // @ts-ignore
    const { planId, tenantId, userId } = snakeToCamel(event.meta.custom_data)
    // @ts-ignore
    const { status, refunded, subscriptionId } = snakeToCamel(event.data.attributes)
    if (status !== 'paid' || refunded) {
      Logger.warn(`unexpected subscription status: ${status}, refunded: ${refunded}`)
      throw new BadRequestException('Unexpected subscription status')
    }

    // 2. Get specified plan
    const plan = await this.subscriptionService.getPlanById(planId)
    if (!plan) {
      Logger.warn(`specified plan not found: ${planId}`)
      throw new BadRequestException('Specified plan not found')
    }

    // 3. Fetch tenant active subscriptions, calculate the start & end date of the new subscription
    let subscriptions = await this.subscriptionService.fetchActiveByTenantId(tenantId)
    subscriptions = subscriptions.filter((v) => v.uniqueId !== uniqueId)
    const start = subscriptions.length ? dayjs(subscriptions[0].end).utc() : dayjs().utc()
    const end = start.clone().add(1, plan.period === 'monthly' ? 'months' : 'years')
    const subscription: any = {
      status: 'active',
      tenantId: tenantId,
      planId: plan.id,
      externalId: `${subscriptionId}`,
      uniqueId: uniqueId,
      start: start.toDate(),
      end: end.toDate(),
      features: plan.features || {},
      createdAt: dayjs(event.data.attributes.created_at).utc().toDate(),
      updatedAt: dayjs(event.data.attributes.updated_at).utc().toDate()
    }

    try {
      const newSub = await this.subscriptionService.create(subscription)
      Logger.log({ subscription: newSub, planName: plan.name }, 'created new subscription')
      return newSub
    } catch (error) {
      if (error.code === 'P2002') {
        Logger.log({ uniqueId }, 'subscription uniqueId already exists, skip creating new subscription')
        return {}
      }

      throw new InternalServerErrorException('Failed to create subscription')
    }

  }

  private validateOrThrow(event: Webhook) {
    // @ts-ignore
    if (this.testMode !== !!event.meta.test_mode) {
      // @ts-ignore
      Logger.warn(`invalid webhook, unexpected mode: ${event.meta.test_mode}`)
      throw new BadRequestException('Invalid mode')
    }
    if (this.storeId !== `${event.data.attributes.store_id}`) {
      Logger.warn(`invalid webhook, unexpected store id: ${event.data.attributes.store_id}`)
      throw new BadRequestException('Unexpected store id')
    }
    const diff = dayjs().utc().diff(dayjs(event.data.attributes.created_at).utc(), 'minutes')
    if (Math.abs(diff) > 10 /* 10 minutes */) {
      Logger.warn(`invalid webhook, webhook seems expired (created at: ${event.data.attributes.created_at})`)
      throw new BadRequestException('Webhook expired')
    }
  }
}
