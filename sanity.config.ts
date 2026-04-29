import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

// Schema — reuse the aboutPage type from the shared Sanity project
import { defineType, defineField } from 'sanity'

const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({ name: 'headline', type: 'string', title: 'Headline' }),
    defineField({ name: 'subheadline', type: 'string', title: 'Subheadline' }),
    defineField({ name: 'storyText', type: 'text', title: 'Story (main paragraph)', rows: 6 }),
    defineField({ name: 'artOfLightText', type: 'text', title: 'Art of Light section', rows: 4 }),
    defineField({ name: 'portraitImage', type: 'image', title: 'Portrait Photo', options: { hotspot: true } }),
    defineField({
      name: 'processSteps', type: 'array', title: 'Process Steps',
      of: [{
        type: 'object', fields: [
          defineField({ name: 'number', type: 'string', title: 'Step Number' }),
          defineField({ name: 'title', type: 'string', title: 'Step Title' }),
          defineField({ name: 'text', type: 'text', title: 'Step Description' }),
        ],
      }],
    }),
    defineField({
      name: 'trainingSchools', type: 'array', title: 'Training Schools & Ateliers',
      of: [{
        type: 'object', fields: [
          defineField({ name: 'name', type: 'string', title: 'School / Atelier Name' }),
          defineField({ name: 'location', type: 'string', title: 'Location (optional)' }),
          defineField({ name: 'description', type: 'text', title: 'What was studied', rows: 2 }),
        ],
      }],
    }),
    defineField({
      name: 'notablePortfolio', type: 'array', title: 'Notable Portfolio & Commissions',
      of: [{
        type: 'object', fields: [
          defineField({ name: 'title', type: 'string', title: 'Project / Commission Title' }),
          defineField({ name: 'description', type: 'text', title: 'Description', rows: 2 }),
          defineField({ name: 'url', type: 'url', title: 'External Link (optional)' }),
        ],
      }],
    }),
    defineField({
      name: 'artners', type: 'array', title: 'Artners — Collaborating Master Artists',
      of: [{
        type: 'object', fields: [
          defineField({ name: 'name', type: 'string', title: 'Artner Name' }),
          defineField({ name: 'specialty', type: 'string', title: 'Specialty / Role' }),
          defineField({ name: 'notes', type: 'text', title: 'Notes (optional)', rows: 2 }),
        ],
      }],
    }),
    defineField({ name: 'credentials', type: 'array', title: 'Credentials / Recognition', of: [{ type: 'string' }] }),
    defineField({ name: 'seoTitle', type: 'string', title: 'SEO Title' }),
    defineField({ name: 'seoDescription', type: 'text', title: 'SEO Description', rows: 2 }),
  ],
  preview: { prepare: () => ({ title: 'About Page' }) },
})

export default defineConfig({
  name: 'misha-website',
  title: 'Misha Creations — Website Editor',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'uz6uv7gy',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  basePath: '/studio',
  plugins: [
    structureTool(),
    visionTool(),
  ],
  schema: {
    types: [aboutPage],
  },
})
