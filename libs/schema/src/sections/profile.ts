import { z } from 'zod'

import { defaultItem, defaultUrl, itemSchema, urlSchema } from '../shared'

// Schema
export const profileSchema = itemSchema.extend({
  network: z.string().min(1).describe('Network name or platform name'),
  username: z.string().min(1).describe('Username'),
  icon: z
    .string()
    .describe(
      'Slug for the icon from https://simpleicons.org. For example, "github", "linkedin", etc.'
    ),
  url: urlSchema.describe('Profile URL')
})

// Type
export type Profile = z.infer<typeof profileSchema>

// Defaults
export const defaultProfile: Profile = {
  ...defaultItem,
  network: '',
  username: '',
  icon: '',
  url: defaultUrl
}
