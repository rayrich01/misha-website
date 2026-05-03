import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'homepageHero',
      title: 'Homepage Hero Image',
      type: 'reference',
      to: [{ type: 'portfolioPiece' }],
      description: 'The portfolio piece whose hero image appears as the full-screen homepage background',
    }),
    defineField({ name: 'headline',        type: 'string',  title: 'Headline' }),
    defineField({ name: 'subheadline',     type: 'string',  title: 'Subheadline' }),
    defineField({ name: 'storyText',       type: 'text',    title: 'Story (main paragraph)', rows: 6 }),
    defineField({ name: 'artOfLightText',  type: 'text',    title: 'Art of Light section',   rows: 4 }),
    defineField({ name: 'portraitImage',   type: 'image',   title: 'Portrait Photo', options: { hotspot: true } }),
    defineField({ name: 'processSteps',    type: 'array',   title: 'Process Steps',
      of: [{ type: 'object', fields: [
        defineField({ name: 'number', type: 'string', title: 'Step Number' }),
        defineField({ name: 'title',  type: 'string', title: 'Step Title' }),
        defineField({ name: 'text',   type: 'text',   title: 'Step Description', validation: undefined }),
      ]}]
    }),
    defineField({ name: 'trainingSchools', type: 'array',   title: 'Training Schools & Ateliers',
      description: 'Formal training. Add new entries here as they are supplied — the About page grows automatically.',
      of: [{ type: 'object', fields: [
        defineField({ name: 'name',        type: 'string', title: 'School / Atelier Name' }),
        defineField({ name: 'location',    type: 'string', title: 'Location (optional)' }),
        defineField({ name: 'description', type: 'text',   title: 'What was studied', rows: 2 }),
      ]}]
    }),
    defineField({ name: 'notablePortfolio', type: 'array',  title: 'Notable Portfolio & Commissions',
      description: 'Named projects, productions, or commissions worth listing distinctly from the general credentials bullets.',
      of: [{ type: 'object', fields: [
        defineField({ name: 'title',       type: 'string', title: 'Project / Commission Title' }),
        defineField({ name: 'description', type: 'text',   title: 'Description', rows: 2 }),
        defineField({ name: 'url',         type: 'url',    title: 'External Link (optional)' }),
      ]}]
    }),
    defineField({ name: 'artners', type: 'array', title: 'Artners — Collaborating Master Artists',
      description: "Peer artists Misha collaborates with on large jobs. She credits them as 'Artners.'",
      of: [{ type: 'object', fields: [
        defineField({ name: 'name',      type: 'string', title: 'Artner Name' }),
        defineField({ name: 'specialty', type: 'string', title: 'Specialty / Role' }),
        defineField({ name: 'notes',     type: 'text',   title: 'Notes (optional)', rows: 2 }),
      ]}]
    }),
    defineField({ name: 'credentials',     type: 'array',   title: 'Credentials / Recognition',
      of: [{ type: 'string' }]
    }),
    defineField({ name: 'seoTitle',        type: 'string',  title: 'SEO Title' }),
    defineField({ name: 'seoDescription',  type: 'text',    title: 'SEO Description', rows: 2 }),
  ],
  preview: { prepare: () => ({ title: 'About Page' }) }
})
