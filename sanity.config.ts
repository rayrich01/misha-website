import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

import aboutPage from './sanity/schemas/aboutPage'
import areaPage from './sanity/schemas/areaPage'
import blogPost from './sanity/schemas/blogPost'
import faqPage from './sanity/schemas/faqPage'
import finishCategory from './sanity/schemas/finishCategory'
import mainSiteSettings from './sanity/schemas/mainSiteSettings'
import portfolioPiece from './sanity/schemas/portfolioPiece'
import processPage from './sanity/schemas/processPage'
import servicePage from './sanity/schemas/servicePage'
import servicesHubPage from './sanity/schemas/servicesHubPage'
import siteGlobals from './sanity/schemas/siteGlobals'
import studioProject from './sanity/schemas/studioProject'

export default defineConfig({
  name: 'misha-website',
  title: 'Misha Creations — Website Editor',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'uz6uv7gy',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  basePath: '/studio',
  plugins: [structureTool(), visionTool()],
  schema: {
    types: [
      // Page Content
      mainSiteSettings,
      aboutPage,
      faqPage,
      processPage,
      servicesHubPage,
      servicePage,
      areaPage,
      blogPost,
      siteGlobals,

      // Portfolio & Gallery
      portfolioPiece,
      finishCategory,
      studioProject,
    ],
  },
})
