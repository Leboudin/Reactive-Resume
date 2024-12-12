import { createZodDto } from 'nestjs-zod/dto'
import { z } from 'nestjs-zod/z'

export const CreateCheckoutSchema = z.object({
  userId: z.string(),
  userName: z.string().optional(),
  tenantId: z.string(),
  planId: z.string(),
  email: z.string(),
  amount: z.number().optional()
})

export class CreateCheckoutDto extends createZodDto(CreateCheckoutSchema) {}

export const CheckoutSchema = z.object({
  id: z.string(),
  url: z.string()
})

export class CheckoutDto extends createZodDto(CheckoutSchema) {}
