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

  async getByPeriod(tenantId: string, period: string) {
    return this.prisma.lLMStatistics.findUnique({
      where: { tenantId_period: { tenantId, period } }
    })
  }

  async updateCurrent(tenantId: string,
                      requests: number,
                      inputTokens: number,
                      outputTokens: number) {
    const period = new Date().toISOString().slice(0, 7) // 'YYYY-MM'
    return this.update(tenantId, period, requests, inputTokens, outputTokens)
  }

  async getCurrent(tenantId: string) {
    const period = new Date().toISOString().slice(0, 7) // 'YYYY-MM'
    return this.getByPeriod(tenantId, period)
  }
}
