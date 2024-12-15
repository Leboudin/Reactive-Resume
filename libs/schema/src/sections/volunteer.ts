import { z } from 'zod'

import { defaultItem, defaultUrl, itemSchema, urlSchema } from '../shared'

// Schema
export const volunteerSchema = itemSchema.extend({
  organization: z.string().min(1).describe('Organization name'),
  position: z.string().describe('Position'),
  location: z.string().describe('Location'),
  date: z.string().describe('Date'),
  summary: z.string().describe('Summary'),
  url: urlSchema.describe('URL')
})

// Type
export type Volunteer = z.infer<typeof volunteerSchema>

// Defaults
export const defaultVolunteer: Volunteer = {
  ...defaultItem,
  organization: '',
  position: '',
  location: '',
  date: '',
  summary: '',
  url: defaultUrl
}
