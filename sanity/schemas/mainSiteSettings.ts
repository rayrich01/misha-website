import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'mainSiteSettings',
  title: 'Main Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'heroImage',
      title: 'Homepage Hero Image',
      type: 'reference',
      to: [{ type: 'portfolioPiece' }],
      description: 'The portfolio piece whose hero image appears as the full-screen homepage background',
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      description: 'Main headline on the homepage hero section',
    }),
    defineField({
      name: 'heroSubheadline',
      title: 'Hero Subheadline',
      type: 'string',
      description: 'Subheadline text below the main headline',
    }),
    defineField({
      name: 'featuredTestimonial',
      title: 'Featured Testimonial',
      type: 'object',
      fields: [
        defineField({ name: 'name', type: 'string', title: 'Client Name' }),
        defineField({ name: 'quote', type: 'text', title: 'Quote', rows: 3 }),
        defineField({ name: 'duration', type: 'string', title: 'Duration (e.g. "22-year client")' }),
        defineField({ name: 'location', type: 'string', title: 'Location' }),
      ],
    }),
    defineField({
      name: 'neighborhoodStrip',
      title: 'Neighborhood Strip',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Neighborhoods displayed in the social proof strip',
    }),
    defineField({ name: 'seoTitle', type: 'string', title: 'SEO Title' }),
    defineField({ name: 'seoDescription', type: 'text', title: 'SEO Description', rows: 2 }),
  ],
  preview: { prepare: () => ({ title: 'Main Site Settings' }) },
})
