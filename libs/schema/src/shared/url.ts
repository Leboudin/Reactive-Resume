import { z } from 'zod'

// Schema
export const urlSchema = z.object({
  label: z.string().describe('The label name of the website'),
  href: z.literal('').or(z.string().url()).describe('Website URL')
})

// Type
export type URL = z.infer<typeof urlSchema>

// Defaults
export const defaultUrl: URL = {
  label: '',
  href: ''
}
