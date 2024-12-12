import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'nestjs-prisma'

@Injectable()
export class TenantService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 创建一个新的 Tenant
   * @param data - Tenant 的创建数据
   */
  async create(data: Prisma.TenantCreateInput) {
    return this.prisma.tenant.create({ data })
  }

  /**
   * 根据 ID 查找 Tenant
   * @param id - Tenant 的 ID
   */
  async findOneById(id: string) {
    return this.prisma.tenant.findUniqueOrThrow({ where: { id } })
  }

  /**
   * 根据名称查找 Tenant
   * @param name - Tenant 的名称
   */
  async findOneByName(name: string) {
    return this.prisma.tenant.findFirstOrThrow({ where: { name } })
  }

  /**
   * 更新 Tenant
   * @param id - Tenant 的 ID
   * @param data - 要更新的数据
   */
  async update(id: string, data: Prisma.TenantUpdateInput) {
    return this.prisma.tenant.update({ where: { id }, data })
  }

  /**
   * 删除 Tenant
   * @param id - Tenant 的 ID
   */
  async deleteOneById(id: string) {
    return this.prisma.tenant.delete({ where: { id } })
  }
}
