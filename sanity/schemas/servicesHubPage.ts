import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'servicesHubPage',
  title: 'Services Hub Page',
  type: 'document',
  fields: [
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({ name: 'metaTitle', type: 'string', title: 'Meta Title' }),
        defineField({ name: 'metaDescription', type: 'text', title: 'Meta Description', rows: 3 }),
      ],
    }),
    defineField({ name: 'heroHeadline', type: 'string', title: 'Hero Headline' }),
    defineField({ name: 'heroSubtext', type: 'text', title: 'Hero Subtext', rows: 2 }),
    defineField({ name: 'introText', type: 'text', title: 'Intro Paragraph', rows: 4 }),
    defineField({
      name: 'trustHeading',
      type: 'string',
      title: 'Trust Section Heading',
    }),
    defineField({
      name: 'trustPoints',
      type: 'array',
      title: 'Trust Points',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'processHeading', type: 'string', title: 'Process Section Heading' }),
    defineField({
      name: 'hubFaqs',
      title: 'Hub FAQs',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'question', type: 'string', title: 'Question', validation: (Rule) => Rule.required() }),
          defineField({ name: 'answer', type: 'text', title: 'Answer', rows: 4, validation: (Rule) => Rule.required() }),
        ],
        preview: { select: { title: 'question' } },
      }],
    }),
    defineField({ name: 'ctaHeadline', type: 'string', title: 'CTA Headline' }),
    defineField({ name: 'ctaBody', type: 'text', title: 'CTA Body', rows: 3 }),
  ],
  preview: { prepare: () => ({ title: 'Services Hub Page' }) },
})
