import { z } from 'zod'

import { defaultItem, defaultUrl, itemSchema, urlSchema } from '../shared'

// Schema
export const certificationSchema = itemSchema.extend({
  name: z.string().min(1).describe('Certification name'),
  issuer: z.string().describe('Issuer name'),
  date: z.string().describe('Date of completion'),
  summary: z.string().describe('Summary'),
  url: urlSchema.describe('Certification URL')
})

// Type
export type Certification = z.infer<typeof certificationSchema>

// Defaults
export const defaultCertification: Certification = {
  ...defaultItem,
  name: '',
  issuer: '',
  date: '',
  summary: '',
  url: defaultUrl
}
