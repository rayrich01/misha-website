import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'studioProject',
  title: 'Studio Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Primary Category',
      type: 'string',
      options: {
        list: [
          { title: 'Venetian Plaster',      value: 'venetian-plaster' },
          { title: 'Wall Murals',           value: 'wall-murals' },
          { title: 'Faux Finishes',         value: 'faux-finishes' },
          { title: "Trompe l'Oeil",         value: 'trompe-loeil' },
          { title: 'Decorative Ceilings',   value: 'decorative-ceilings' },
          { title: 'Modello & Stencils',    value: 'modello-stencils' },
          { title: 'Themed Rooms',          value: 'themed-rooms' },
          { title: "Children's Rooms",      value: 'childrens-rooms' },
          { title: 'Skyscapes & Celestial', value: 'skyscapes' },
          { title: 'Commercial & Public Art', value: 'commercial' },
        ],
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Brief project description for gallery display',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Primary image representing this project. If empty, uses the first piece\'s heroImage.',
      fields: [
        defineField({ name: 'alt', title: 'Alt text', type: 'string' }),
      ],
    }),
    defineField({
      name: 'pieces',
      title: 'Project Pieces',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'portfolioPiece' }] }],
      description: 'Portfolio pieces belonging to this project, in display order',
    }),
    defineField({
      name: 'anchorPiece',
      title: 'Gallery Anchor Piece',
      type: 'reference',
      to: [{ type: 'portfolioPiece' }],
      description: 'The piece that represents this project in the gallery grid.',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'projectType',
      title: 'Project Type',
      type: 'string',
      options: {
        list: [
          { title: 'Residential', value: 'residential' },
          { title: 'Commercial / Public', value: 'commercial' },
        ],
      },
      initialValue: 'residential',
    }),
    defineField({
      name: 'testimonial',
      title: 'Client Testimonial',
      type: 'object',
      description: 'A quote from the client for this project. All fields optional; leave blank to render no testimonial.',
      fields: [
        defineField({
          name: 'quote',
          title: 'Quote',
          type: 'text',
          rows: 4,
          description: 'The client\'s words, verbatim.',
        }),
        defineField({
          name: 'attribution',
          title: 'Attribution Name',
          type: 'string',
          description: 'e.g. "Anna Adkinson"; leave blank for anonymous.',
        }),
        defineField({
          name: 'role',
          title: 'Role / Relationship',
          type: 'string',
          description: 'e.g. "Homeowner, River Oaks" or "22-year client".',
        }),
        defineField({
          name: 'date',
          title: 'Date Given',
          type: 'date',
          description: 'Optional — when the quote was provided.',
        }),
      ],
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Project',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isMishaSelect',
      title: 'Misha Select',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'source',
      title: 'Record Source',
      type: 'string',
      description: 'Provenance of this project record. Set automatically on creation; do not edit manually unless correcting a mis-classified record.',
      options: {
        list: [
          { title: 'Operator authored',            value: 'operator-authored' },
          { title: 'Auto classifier',              value: 'auto-classifier' },
          { title: 'Migrated from finishCategory', value: 'migrated-from-finishCategory' },
        ],
      },
    }),
    defineField({
      name: 'mergedInto',
      title: 'Merged Into',
      type: 'reference',
      to: [{ type: 'studioProject' }],
      readOnly: true,
    }),
    defineField({
      name: 'mergedAt',
      title: 'Merged At',
      type: 'datetime',
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'heroImage',
      published: 'published',
    },
    prepare({ title, subtitle, media, published }) {
      return {
        title: `${published ? '' : '⬜ '}${title}`,
        subtitle: subtitle?.replace(/-/g, ' '),
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'displayOrderAsc',
      by: [{ field: 'displayOrder', direction: 'asc' }],
    },
    {
      title: 'Category',
      name: 'categoryAsc',
      by: [{ field: 'category', direction: 'asc' }],
    },
  ],
})
