import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteGlobals',
  title: 'Site Globals',
  type: 'document',
  fields: [
    defineField({ name: 'siteName', type: 'string', title: 'Site Name' }),
    defineField({ name: 'tagline', type: 'string', title: 'Tagline' }),
    defineField({ name: 'phone', type: 'string', title: 'Phone Number' }),
    defineField({ name: 'phoneHref', type: 'string', title: 'Phone Href (tel: link)' }),
    defineField({ name: 'email', type: 'string', title: 'Email' }),
    defineField({
      name: 'address',
      title: 'Business Address',
      type: 'object',
      fields: [
        defineField({ name: 'city', type: 'string', title: 'City' }),
        defineField({ name: 'state', type: 'string', title: 'State' }),
        defineField({ name: 'country', type: 'string', title: 'Country' }),
      ],
    }),
    defineField({
      name: 'socialProofNeighborhoods',
      title: 'Social Proof Neighborhoods',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Neighborhood names used for social proof strips',
    }),
    defineField({
      name: 'social',
      title: 'Social Links',
      type: 'object',
      fields: [
        defineField({ name: 'instagram', type: 'url', title: 'Instagram' }),
        defineField({ name: 'facebook', type: 'url', title: 'Facebook' }),
        defineField({ name: 'pinterest', type: 'url', title: 'Pinterest' }),
        defineField({ name: 'googleMaps', type: 'url', title: 'Google Maps' }),
      ],
    }),
    defineField({
      name: 'processSteps',
      title: 'Global Process Steps',
      type: 'array',
      description: 'The 4-step process used across multiple pages',
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
      name: 'inquireRoomTypes',
      title: 'Inquire Form — Room Types',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Room type options for the inquiry form dropdown',
    }),
    defineField({
      name: 'inquireTimeframes',
      title: 'Inquire Form — Timeframes',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'value', type: 'string', title: 'Value' }),
          defineField({ name: 'label', type: 'string', title: 'Label' }),
        ],
        preview: { select: { title: 'label' } },
      }],
    }),
  ],
  preview: { prepare: () => ({ title: 'Site Globals' }) },
})
