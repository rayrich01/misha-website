import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'servicePage',
  title: 'Service Page',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'URL path segment, e.g. "venetian-lime-plaster"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'categoryId',
      title: 'Category ID',
      type: 'string',
      description: 'Maps to portfolioPiece.category value (e.g. "wall-murals")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Display Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'h1',
      title: 'Page H1',
      type: 'string',
    }),
    defineField({
      name: 'cardDescription',
      title: 'Card Description',
      type: 'text',
      rows: 2,
      description: 'One-liner shown on the services hub page',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({ name: 'metaTitle', type: 'string', title: 'Meta Title' }),
        defineField({ name: 'metaDescription', type: 'text', title: 'Meta Description', rows: 3 }),
      ],
    }),
    defineField({
      name: 'intro',
      title: 'Intro Section',
      type: 'object',
      fields: [
        defineField({ name: 'heading', type: 'string', title: 'Heading' }),
        defineField({
          name: 'paragraphs',
          type: 'array',
          title: 'Paragraphs',
          of: [{ type: 'text' }],
        }),
      ],
    }),
    defineField({
      name: 'process',
      title: 'Process Section',
      type: 'object',
      fields: [
        defineField({ name: 'heading', type: 'string', title: 'Heading' }),
        defineField({
          name: 'steps',
          type: 'array',
          title: 'Steps',
          of: [{
            type: 'object',
            fields: [
              defineField({ name: 'name', type: 'string', title: 'Step Name' }),
              defineField({ name: 'desc', type: 'text', title: 'Description', rows: 3 }),
            ],
            preview: { select: { title: 'name' } },
          }],
        }),
      ],
    }),
    defineField({
      name: 'trust',
      title: 'Trust Section',
      type: 'object',
      fields: [
        defineField({ name: 'heading', type: 'string', title: 'Heading' }),
        defineField({
          name: 'points',
          type: 'array',
          title: 'Trust Points',
          of: [{ type: 'string' }],
        }),
      ],
    }),
    defineField({
      name: 'extraFaqs',
      title: 'FAQs',
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
    defineField({
      name: 'relatedServices',
      title: 'Related Services',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'slug', type: 'string', title: 'Service Slug' }),
          defineField({ name: 'label', type: 'string', title: 'Display Label' }),
        ],
        preview: { select: { title: 'label' } },
      }],
    }),
    defineField({
      name: 'areaContext',
      title: 'Area Context Line',
      type: 'text',
      rows: 2,
      description: 'Area mention for the bottom of the page',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      description: 'Display order on the services hub page',
    }),
  ],
  preview: {
    select: { title: 'title' },
  },
  orderings: [
    { title: 'Sort Order', name: 'sortOrder', by: [{ field: 'sortOrder', direction: 'asc' }] },
  ],
})
