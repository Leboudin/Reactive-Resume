import { z } from 'zod'

import { defaultItem, defaultUrl, itemSchema, urlSchema } from '../shared'

// Schema
export const experienceSchema = itemSchema.extend({
  company: z.string().min(1).describe('Company name'),
  position: z.string().describe('Position'),
  location: z.string().describe('Location'),
  date: z.string().describe('Date'),
  summary: z.string().describe('Summary'),
  url: urlSchema.describe('Website related to the experience')
})

// Type
export type Experience = z.infer<typeof experienceSchema>

// Defaults
export const defaultExperience: Experience = {
  ...defaultItem,
  company: '',
  position: '',
  location: '',
  date: '',
  summary: '',
  url: defaultUrl
}
