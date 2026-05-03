import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'processPage',
  title: 'Process Page',
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
    defineField({ name: 'heroSubtext', type: 'string', title: 'Hero Subtext' }),
    defineField({ name: 'introHeading', type: 'string', title: 'Intro Section Heading' }),
    defineField({ name: 'introText', type: 'text', title: 'Intro Text', rows: 4 }),
    defineField({ name: 'aboutHeading', type: 'string', title: 'About Section Heading' }),
    defineField({
      name: 'aboutParagraphs',
      type: 'array',
      title: 'About Paragraphs',
      of: [{ type: 'text' }],
    }),
    defineField({
      name: 'processSteps',
      title: 'Process Steps',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'step', type: 'string', title: 'Step Number' }),
          defineField({ name: 'name', type: 'string', title: 'Step Name' }),
          defineField({ name: 'desc', type: 'text', title: 'Description', rows: 3 }),
        ],
        preview: { select: { title: 'name', subtitle: 'step' } },
      }],
    }),
    defineField({
      name: 'faqs',
      title: 'Process FAQs',
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
  preview: { prepare: () => ({ title: 'Process Page' }) },
})
