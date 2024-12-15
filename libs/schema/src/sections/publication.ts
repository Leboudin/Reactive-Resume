import { z } from 'zod'

import { defaultItem, defaultUrl, itemSchema, urlSchema } from '../shared'

// Schema
export const publicationSchema = itemSchema.extend({
  name: z.string().min(1).describe('Pulication name'),
  publisher: z.string().describe('Publisher name'),
  date: z.string().describe('Publication date'),
  summary: z.string().describe('Summary'),
  url: urlSchema.describe('Publication URL')
})

// Type
export type Publication = z.infer<typeof publicationSchema>

// Defaults
export const defaultPublication: Publication = {
  ...defaultItem,
  name: '',
  publisher: '',
  date: '',
  summary: '',
  url: defaultUrl
}
