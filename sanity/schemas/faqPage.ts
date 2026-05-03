import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'faqPage',
  title: 'FAQ Page',
  type: 'document',
  fields: [
    defineField({ name: 'headline',       type: 'string', title: 'Headline' }),
    defineField({ name: 'subheadline',    type: 'string', title: 'Subheadline' }),
    defineField({
      name: 'faqs',
      type: 'array',
      title: 'FAQ Items',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'question', type: 'string', title: 'Question', validation: (Rule) => Rule.required() }),
          defineField({ name: 'answer',   type: 'text',   title: 'Answer',   rows: 4, validation: (Rule) => Rule.required() }),
        ],
        preview: {
          select: { title: 'question' },
        },
      }],
    }),
    defineField({ name: 'ctaHeadline',    type: 'string', title: 'CTA Headline' }),
    defineField({ name: 'ctaText',        type: 'text',   title: 'CTA Body Text', rows: 3 }),
    defineField({ name: 'seoTitle',       type: 'string', title: 'SEO Title' }),
    defineField({ name: 'seoDescription', type: 'text',   title: 'SEO Description', rows: 2 }),
  ],
  preview: { prepare: () => ({ title: 'FAQ Page' }) },
})
