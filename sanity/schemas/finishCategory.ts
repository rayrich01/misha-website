import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'finishCategory',
  title: 'Finish Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Display Title',
      type: 'string',
      description: 'e.g. Venetian Plaster',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'e.g. venetian-plaster — must match classification category value',
      options: { source: 'title' },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      description: 'Controls display order in gallery navigation',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'heroImage',
      title: 'Category Hero Image',
      type: 'image',
      options: { hotspot: true }
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 2,
      description: 'One sentence shown on category card'
    }),
    defineField({
      name: 'tradeDescription',
      title: 'Trade Description',
      type: 'text',
      rows: 4,
      description: 'Shown on category landing page for trade visitors'
    }),
    defineField({
      name: 'isVisible',
      title: 'Visible in Gallery',
      type: 'boolean',
      initialValue: true
    }),
  ],
  preview: {
    select: { title: 'title', media: 'heroImage', order: 'sortOrder' },
    prepare({ title, media, order }) {
      return { title: `${order}. ${title}`, media }
    }
  },
  orderings: [
    {
      title: 'Sort Order',
      name: 'sortOrderAsc',
      by: [{ field: 'sortOrder', direction: 'asc' }]
    }
  ]
})
