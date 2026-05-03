import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'areaPage',
  title: 'Area Page',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'URL path segment, e.g. "river-oaks-luxury-murals"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Area Name',
      type: 'string',
      description: 'Display name, e.g. "River Oaks"',
      validation: (Rule) => Rule.required(),
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
      name: 'h1',
      title: 'Page H1',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Intro Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'featuredCategories',
      title: 'Featured Categories',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Category IDs to feature (e.g. "venetian-plaster", "wall-murals")',
    }),
    defineField({
      name: 'categoryOffset',
      title: 'Category Offset',
      type: 'number',
      description: 'Offset for portfolio piece display',
    }),
    defineField({
      name: 'popularFinishes',
      title: 'Popular Finishes',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Display names of popular finishes in this area',
    }),
    defineField({
      name: 'faqAnswers',
      title: 'Base FAQ Answers',
      type: 'object',
      description: 'Answers for the 3 standard area FAQs (serve, cost, popular)',
      fields: [
        defineField({ name: 'serve', type: 'text', title: 'Does Misha serve this area?', rows: 3 }),
        defineField({ name: 'cost', type: 'text', title: 'How much does it cost?', rows: 3 }),
        defineField({ name: 'popular', type: 'text', title: 'What finishes are popular here?', rows: 3 }),
      ],
    }),
    defineField({
      name: 'extraFaqs',
      title: 'Additional FAQs',
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
      name: 'nearbyAreas',
      title: 'Nearby Areas',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'slug', type: 'string', title: 'Area Slug' }),
          defineField({ name: 'name', type: 'string', title: 'Area Name' }),
        ],
        preview: { select: { title: 'name' } },
      }],
    }),
    defineField({
      name: 'trustPoints',
      title: 'Trust Points',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
    }),
  ],
  preview: {
    select: { title: 'name' },
  },
  orderings: [
    { title: 'Sort Order', name: 'sortOrder', by: [{ field: 'sortOrder', direction: 'asc' }] },
  ],
})
