// src/subscription/subscription.service.ts
import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'

@Injectable()
export class SubscriptionService {
  constructor(private readonly prisma: PrismaService) {}

  public async create(data: any) {
    return this.prisma.subscription.create({
      data
    })
  }

  public async getActiveByTenantId(tenantId: string) {
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

  public async fetchActiveByTenantId(tenantId?: string) {
    if (!tenantId) {
      return []
    }

    const now = new Date()
    return this.prisma.subscription.findMany({
      where: {
        tenantId,
        status: 'active',
        end: { gte: now }
      },
      orderBy: {
        end: 'desc'
      }
    })
  }

  public async fetchPlans(language?: string) {
    return this.prisma.plan.findMany({
      where: {
        language,
        status: 'active'
      },
      orderBy: {
        id: 'asc'
      }
    })
  }

  public async getPlanById(id: string) {
    return this.prisma.plan.findUnique({
      where: { id }
    })
  }
}
