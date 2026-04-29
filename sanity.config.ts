import { defineConfig, defineType, defineField } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

/* ── About Page ─────────────────────────────────────────── */
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
      of: [{ type: 'object', fields: [
        defineField({ name: 'number', type: 'string', title: 'Step Number' }),
        defineField({ name: 'title', type: 'string', title: 'Step Title' }),
        defineField({ name: 'text', type: 'text', title: 'Step Description' }),
      ]}],
    }),
    defineField({
      name: 'trainingSchools', type: 'array', title: 'Training Schools & Ateliers',
      of: [{ type: 'object', fields: [
        defineField({ name: 'name', type: 'string', title: 'School / Atelier Name' }),
        defineField({ name: 'location', type: 'string', title: 'Location (optional)' }),
        defineField({ name: 'description', type: 'text', title: 'What was studied', rows: 2 }),
      ]}],
    }),
    defineField({
      name: 'notablePortfolio', type: 'array', title: 'Notable Portfolio & Commissions',
      of: [{ type: 'object', fields: [
        defineField({ name: 'title', type: 'string', title: 'Project / Commission Title' }),
        defineField({ name: 'description', type: 'text', title: 'Description', rows: 2 }),
        defineField({ name: 'url', type: 'url', title: 'External Link (optional)' }),
      ]}],
    }),
    defineField({
      name: 'artners', type: 'array', title: 'Artners — Collaborating Master Artists',
      of: [{ type: 'object', fields: [
        defineField({ name: 'name', type: 'string', title: 'Artner Name' }),
        defineField({ name: 'specialty', type: 'string', title: 'Specialty / Role' }),
        defineField({ name: 'notes', type: 'text', title: 'Notes (optional)', rows: 2 }),
      ]}],
    }),
    defineField({ name: 'credentials', type: 'array', title: 'Credentials / Recognition', of: [{ type: 'string' }] }),
    defineField({ name: 'seoTitle', type: 'string', title: 'SEO Title' }),
    defineField({ name: 'seoDescription', type: 'text', title: 'SEO Description', rows: 2 }),
  ],
  preview: { prepare: () => ({ title: 'About Page' }) },
})

/* ── Services Hub Page ──────────────────────────────────── */
const servicesHubPage = defineType({
  name: 'servicesHubPage',
  title: 'Services Hub Page',
  type: 'document',
  fields: [
    defineField({
      name: 'seo', title: 'SEO', type: 'object',
      fields: [
        defineField({ name: 'metaTitle', type: 'string', title: 'Meta Title' }),
        defineField({ name: 'metaDescription', type: 'text', title: 'Meta Description', rows: 3 }),
      ],
    }),
    defineField({ name: 'heroHeadline', type: 'string', title: 'Hero Headline' }),
    defineField({ name: 'heroSubtext', type: 'text', title: 'Hero Subtext', rows: 2 }),
    defineField({ name: 'introText', type: 'text', title: 'Intro Paragraph', rows: 4 }),
    defineField({ name: 'trustHeading', type: 'string', title: 'Trust Section Heading' }),
    defineField({ name: 'trustPoints', type: 'array', title: 'Trust Points', of: [{ type: 'string' }] }),
    defineField({ name: 'processHeading', type: 'string', title: 'Process Section Heading' }),
    defineField({
      name: 'hubFaqs', title: 'Hub FAQs', type: 'array',
      of: [{ type: 'object', fields: [
        defineField({ name: 'question', type: 'string', title: 'Question', validation: (Rule) => Rule.required() }),
        defineField({ name: 'answer', type: 'text', title: 'Answer', rows: 4, validation: (Rule) => Rule.required() }),
      ], preview: { select: { title: 'question' } } }],
    }),
    defineField({ name: 'ctaHeadline', type: 'string', title: 'CTA Headline' }),
    defineField({ name: 'ctaBody', type: 'text', title: 'CTA Body', rows: 3 }),
  ],
  preview: { prepare: () => ({ title: 'Services Hub Page' }) },
})

/* ── Service Page (individual) ──────────────────────────── */
const servicePage = defineType({
  name: 'servicePage',
  title: 'Service Page',
  type: 'document',
  fields: [
    defineField({ name: 'slug', title: 'URL Slug', type: 'slug', description: 'URL path, e.g. "venetian-lime-plaster"', validation: (Rule) => Rule.required() }),
    defineField({ name: 'categoryId', title: 'Category ID', type: 'string', description: 'Maps to portfolioPiece.category value', validation: (Rule) => Rule.required() }),
    defineField({ name: 'title', title: 'Display Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'h1', title: 'Page H1', type: 'string' }),
    defineField({ name: 'cardDescription', title: 'Card Description', type: 'text', rows: 2, description: 'One-liner shown on the services hub page' }),
    defineField({
      name: 'seo', title: 'SEO', type: 'object',
      fields: [
        defineField({ name: 'metaTitle', type: 'string', title: 'Meta Title' }),
        defineField({ name: 'metaDescription', type: 'text', title: 'Meta Description', rows: 3 }),
      ],
    }),
    defineField({
      name: 'intro', title: 'Intro Section', type: 'object',
      fields: [
        defineField({ name: 'heading', type: 'string', title: 'Heading' }),
        defineField({ name: 'paragraphs', type: 'array', title: 'Paragraphs', of: [{ type: 'text' }] }),
      ],
    }),
    defineField({
      name: 'process', title: 'Process Section', type: 'object',
      fields: [
        defineField({ name: 'heading', type: 'string', title: 'Heading' }),
        defineField({
          name: 'steps', type: 'array', title: 'Steps',
          of: [{ type: 'object', fields: [
            defineField({ name: 'name', type: 'string', title: 'Step Name' }),
            defineField({ name: 'desc', type: 'text', title: 'Description', rows: 3 }),
          ], preview: { select: { title: 'name' } } }],
        }),
      ],
    }),
    defineField({
      name: 'trust', title: 'Trust Section', type: 'object',
      fields: [
        defineField({ name: 'heading', type: 'string', title: 'Heading' }),
        defineField({ name: 'points', type: 'array', title: 'Trust Points', of: [{ type: 'string' }] }),
      ],
    }),
    defineField({
      name: 'extraFaqs', title: 'FAQs', type: 'array',
      of: [{ type: 'object', fields: [
        defineField({ name: 'question', type: 'string', title: 'Question', validation: (Rule) => Rule.required() }),
        defineField({ name: 'answer', type: 'text', title: 'Answer', rows: 4, validation: (Rule) => Rule.required() }),
      ], preview: { select: { title: 'question' } } }],
    }),
    defineField({
      name: 'relatedServices', title: 'Related Services', type: 'array',
      of: [{ type: 'object', fields: [
        defineField({ name: 'slug', type: 'string', title: 'Service Slug' }),
        defineField({ name: 'label', type: 'string', title: 'Display Label' }),
      ], preview: { select: { title: 'label' } } }],
    }),
    defineField({ name: 'areaContext', title: 'Area Context Line', type: 'text', rows: 2 }),
    defineField({ name: 'sortOrder', title: 'Sort Order', type: 'number' }),
  ],
  preview: { select: { title: 'title' } },
  orderings: [{ title: 'Sort Order', name: 'sortOrder', by: [{ field: 'sortOrder', direction: 'asc' }] }],
})

/* ── Studio Config ──────────────────────────────────────── */
export default defineConfig({
  name: 'misha-website',
  title: 'Misha Creations — Website Editor',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'uz6uv7gy',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  basePath: '/studio',
  plugins: [structureTool(), visionTool()],
  schema: {
    types: [aboutPage, servicesHubPage, servicePage],
  },
})
