import { z } from 'zod'

import { defaultUrl, urlSchema } from '../shared'
import { customFieldSchema } from './custom'

// Schema
export const basicsSchema = z.object({
  name: z.string().describe('Applicant name'),
  headline: z.string().describe('A short self introduction of the applicant'),
  email: z.literal('').or(z.string().email()).describe('Applicant email'),
  phone: z.string().describe('Applicant phone'),
  location: z.string().describe('Applicant location'),
  url: urlSchema.describe('Applicant website'),
  customFields: z.array(customFieldSchema),
  picture: z.object({
    url: z.string(),
    size: z.number().default(64),
    aspectRatio: z.number().default(1),
    borderRadius: z.number().default(0),
    effects: z.object({
      hidden: z.boolean().default(false),
      border: z.boolean().default(false),
      grayscale: z.boolean().default(false)
    })
  }).describe('Applicant personal photo')
})

// Type
export type Basics = z.infer<typeof basicsSchema>

// Defaults
export const defaultBasics: Basics = {
  name: '',
  headline: '',
  email: '',
  phone: '',
  location: '',
  url: defaultUrl,
  customFields: [],
  picture: {
    url: '',
    size: 64,
    aspectRatio: 1,
    borderRadius: 0,
    effects: {
      hidden: false,
      border: false,
      grayscale: false
    }
  }
}

export * from './custom'
