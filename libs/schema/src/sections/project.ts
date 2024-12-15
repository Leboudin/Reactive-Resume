import { z } from 'zod'

import { defaultItem, defaultUrl, itemSchema, urlSchema } from '../shared'

// Schema
export const projectSchema = itemSchema.extend({
  name: z.string().min(1).describe('Project name'),
  description: z.string().describe('Project description'),
  date: z.string().describe('Date'),
  summary: z.string().describe('Summary'),
  keywords: z.array(z.string()).default([]).describe('Keywords'),
  url: urlSchema.describe('Project URL')
})

// Type
export type Project = z.infer<typeof projectSchema>

// Defaults
export const defaultProject: Project = {
  ...defaultItem,
  name: '',
  description: '',
  date: '',
  summary: '',
  keywords: [],
  url: defaultUrl
}
