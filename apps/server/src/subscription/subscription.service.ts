// src/subscription/subscription.service.ts
import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'

@Injectable()
export class SubscriptionService {
  constructor(private readonly prisma: PrismaService) {
  }

  async getActiveSubscriptionByTenantId(tenantId: string) {
    // TODO: search from database
    return {
      id: '123',
      tenantId,
      status: 'active',
      features: {
        maxUsers: 10,
        maxProjects: 10,
        maxRequests: 100,
        maxTokens: 10000
      },
      start: new Date(),
      end: new Date()
    }
    // const now = new Date()
    // return this.prisma.subscription.findFirstOrThrow({
    //   where: {
    //     tenantId,
    //     status: 'active',
    //     start: { lte: now },
    //     end: { gte: now }
    //   },
    //   orderBy: { createdAt: 'desc' }
    // })
  }
}
