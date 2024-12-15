// libs/dto/src/plan/plan.ts
import { z } from 'nestjs-zod/z'
import { createZodDto } from 'nestjs-zod/dto'

export const planSchema = z.object({
  id: z.string().cuid(),
  status: z.enum(['active', 'suspended', 'deleted']).default('active'),
  name: z.string(),
  description: z.string(),
  language: z.string().default('en'),
  groupId: z.string(),
  externalId: z.string(),
  period: z.enum(['yearly', 'monthly', 'quarterly']),
  price: z.number(),
  originalPrice: z.number(),
  highlighted: z.boolean().default(false),
  display: z.record(z.any()).default({}),
  features: z.record(z.any()).default({}),
  createdAt: z.date().or(z.string().datetime()),
  updatedAt: z.date().or(z.string().datetime())
})

export class PlanDto extends createZodDto(planSchema) {}
