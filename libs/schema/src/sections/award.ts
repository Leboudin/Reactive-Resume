import { z } from 'zod'

import { defaultItem, defaultUrl, itemSchema, urlSchema } from '../shared'

// Schema
export const awardSchema = itemSchema.extend({
  title: z.string().min(1).describe('Award title'),
  awarder: z.string().describe('Awarder name'),
  date: z.string().describe('Award date'),
  summary: z.string().describe('Award summary'),
  url: urlSchema.describe('Award URL')
})

// Type
export type Award = z.infer<typeof awardSchema>

// Defaults
export const defaultAward: Award = {
  ...defaultItem,
  title: '',
  awarder: '',
  date: '',
  summary: '',
  url: defaultUrl
}
