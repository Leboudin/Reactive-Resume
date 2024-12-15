import { z } from 'zod'

import { defaultItem, defaultUrl, itemSchema, urlSchema } from '../shared'

// Schema
export const educationSchema = itemSchema.extend({
  institution: z.string().min(1).describe('Institution name'),
  studyType: z.string().describe('Study type'),
  area: z.string().describe('Area'),
  score: z.string().describe('Score'),
  date: z.string().describe('Date'),
  summary: z.string().describe('Summary'),
  url: urlSchema.describe('URL')
})

// Type
export type Education = z.infer<typeof educationSchema>

// Defaults
export const defaultEducation: Education = {
  ...defaultItem,
  id: '',
  institution: '',
  studyType: '',
  area: '',
  score: '',
  date: '',
  summary: '',
  url: defaultUrl
}
