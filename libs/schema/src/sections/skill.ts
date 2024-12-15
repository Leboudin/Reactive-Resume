import { z } from 'zod'

import { defaultItem, itemSchema } from '../shared'

// Schema
export const skillSchema = itemSchema.extend({
  name: z.string().describe('Name of the skill'),
  description: z.string().describe('Description of the skill'),
  level: z.number().min(0).max(5).default(1).describe('Level of the skill'),
  keywords: z.array(z.string()).default([]).describe('Keywords')
})

// Type
export type Skill = z.infer<typeof skillSchema>

// Defaults
export const defaultSkill: Skill = {
  ...defaultItem,
  name: '',
  description: '',
  level: 1,
  keywords: []
}
