import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    projects: defineCollection({
      type: 'page',
      source: 'projects/*.md',
      schema: z.object({
        category: z.string(),
        year: z.string().optional(),
        status: z.string().default('In progress'),
        featured: z.boolean().default(false),
        sort: z.number().default(99),
        cover: z.string().optional(),
        coverAlt: z.string().optional(),
        tags: z.array(z.string()).default([]),
        stack: z.array(z.string()).default([]),
        repo: z.string().url().optional(),
        demo: z.string().url().optional()
      })
    })
  }
})
