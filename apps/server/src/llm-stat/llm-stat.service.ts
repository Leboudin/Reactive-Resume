import { Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'

@Injectable()
export class LLMStatService {
  constructor(private readonly prisma: PrismaService) {
  }

  async update(
    tenantId: string,
    period: string,
    requests: number,
    inputTokens: number,
    outputTokens: number
  ) {
    return this.prisma.lLMStatistics.upsert({
      where: { tenantId_period: { tenantId, period } },
      update: {
        requests: { increment: requests },
        inputTokens: { increment: inputTokens },
        outputTokens: { increment: outputTokens }
      },
      create: {
        tenantId,
        period,
        requests,
        inputTokens,
        outputTokens
      }
    })
  }

  async get(tenantId: string, period: string) {
    return this.prisma.lLMStatistics.findUnique({
      where: { tenantId_period: { tenantId, period } }
    })
  }
}
