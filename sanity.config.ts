import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import type { StructureBuilder } from 'sanity/structure'

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

function categoryList(S: StructureBuilder, title: string, filter: string) {
  return S.listItem()
    .title(title)
    .child(
      S.documentList()
        .title(title)
        .filter(filter)
        .defaultOrdering([{ field: 'title', direction: 'asc' }])
    )
}

const structure = (S: StructureBuilder) =>
  S.list()
    .title('Misha Creations')
    .items([
      // ── Page Content ──
      S.divider(),
      S.listItem().title('Page Content').child(
        S.list().title('Page Content').items([
          S.listItem().title('Homepage Settings').child(S.document().schemaType('mainSiteSettings').documentId('mainSiteSettings')),
          S.listItem().title('About Page').child(S.document().schemaType('aboutPage').documentId('aboutPage')),
          S.listItem().title('FAQ Page').child(S.document().schemaType('faqPage').documentId('faqPage')),
          S.listItem().title('Process Page').child(S.documentTypeList('processPage').title('Process Page')),
          S.listItem().title('Services Hub').child(S.documentTypeList('servicesHubPage').title('Services Hub')),
          S.listItem().title('Service Pages').child(S.documentTypeList('servicePage').title('Service Pages')),
          S.listItem().title('Area Pages').child(S.documentTypeList('areaPage').title('Area Pages')),
          S.listItem().title('Blog Posts').child(S.documentTypeList('blogPost').title('Blog Posts')),
          S.listItem().title('Site Globals').child(S.document().schemaType('siteGlobals').documentId('siteGlobals')),
        ])
      ),

      S.divider(),

      // ── Portfolio by Category Tree ──
      S.listItem().title('Portfolio by Category').child(
        S.list().title('Portfolio by Category').items([

          // Services / Finishes / Styles
          S.listItem().title('Services, Finishes & Artistic Styles').child(
            S.list().title('Services, Finishes & Styles').items([
              // Luxury Wall Murals + subs
              S.listItem().title('Luxury Wall Murals').child(
                S.list().title('Luxury Wall Murals').items([
                  categoryList(S, 'All Luxury Wall Murals', '_type == "portfolioPiece" && finishCategory->title == "Luxury Wall Murals"'),
                  categoryList(S, '— Asian Themed Murals', '_type == "portfolioPiece" && finishCategory->title == "Asian Themed Murals"'),
                  categoryList(S, '— Jungle Themes', '_type == "portfolioPiece" && finishCategory->title == "Jungle Themes"'),
                  categoryList(S, '— Egret Mural', '_type == "portfolioPiece" && finishCategory->title == "Egret Mural"'),
                  categoryList(S, '— Canvas Art and Murals', '_type == "portfolioPiece" && finishCategory->title == "Canvas Art and Murals"'),
                  categoryList(S, '— Young Beginnings Oil Paintings', '_type == "portfolioPiece" && finishCategory->title == "Young Beginnings Oil Paintings"'),
                ])
              ),
              // Venetian Lime Plaster + subs
              S.listItem().title('Venetian Lime Plaster').child(
                S.list().title('Venetian Lime Plaster').items([
                  categoryList(S, 'All Venetian Lime Plaster', '_type == "portfolioPiece" && finishCategory->title == "Venetian Lime Plaster"'),
                  categoryList(S, '— Marbelizing', '_type == "portfolioPiece" && finishCategory->title == "Marbelizing"'),
                  categoryList(S, '— Wonderfaux Wall Finishes', '_type == "portfolioPiece" && finishCategory->title == "Wonderfaux Wall Finishes"'),
                ])
              ),
              // Trompe L'Oeil
              categoryList(S, "Trompe L'Oeil & Architectural Illusions", '_type == "portfolioPiece" && finishCategory->title == "Trompe L\'Oeil & Architectural Illusions"'),
              // Themed Rooms + subs
              S.listItem().title('Themed Rooms').child(
                S.list().title('Themed Rooms').items([
                  categoryList(S, 'All Themed Rooms', '_type == "portfolioPiece" && finishCategory->title == "Themed Rooms"'),
                  categoryList(S, '— Childrens Themed Rooms', '_type == "portfolioPiece" && finishCategory->title == "Childrens Themed Rooms"'),
                ])
              ),
              // Skyscapes & Celestial
              categoryList(S, 'Skyscapes & Celestial', '_type == "portfolioPiece" && finishCategory->title == "Skyscapes & Celestial"'),
              // Faux & Specialty Finishes + subs
              S.listItem().title('Faux & Specialty Finishes').child(
                S.list().title('Faux & Specialty Finishes').items([
                  categoryList(S, 'All Faux & Specialty Finishes', '_type == "portfolioPiece" && finishCategory->title == "Faux & Specialty Finishes"'),
                  categoryList(S, '— Faux Finished Cabinets', '_type == "portfolioPiece" && finishCategory->title == "Faux Finished Cabinets"'),
                  categoryList(S, '— Faux Wood', '_type == "portfolioPiece" && finishCategory->title == "Faux Wood"'),
                  categoryList(S, '— Faux Wood Floors', '_type == "portfolioPiece" && finishCategory->title == "Faux Wood Floors"'),
                  categoryList(S, '— Faux Granite and Marble Epoxy Floors', '_type == "portfolioPiece" && finishCategory->title == "Faux Granite and Marble Epoxy Floors"'),
                  categoryList(S, '— Epoxy Wall Art', '_type == "portfolioPiece" && finishCategory->title == "Epoxy Wall Art"'),
                ])
              ),
              // Modello & Stencils
              categoryList(S, 'Modello & Stencils', '_type == "portfolioPiece" && finishCategory->title == "Modello & Stencils"'),
              // Commercial & Public Art
              categoryList(S, 'Commercial & Public Art', '_type == "portfolioPiece" && finishCategory->title == "Commercial & Public Art"'),
              // Decorative Ceilings
              categoryList(S, 'Decorative Ceilings', '_type == "portfolioPiece" && finishCategory->title == "Decorative Ceilings"'),
            ])
          ),

          S.divider(),

          // Rooms
          S.listItem().title('Rooms').child(
            S.list().title('Rooms').items([
              categoryList(S, 'Bathrooms', '_type == "portfolioPiece" && finishCategory->title == "Bathrooms"'),
              categoryList(S, 'Bedrooms', '_type == "portfolioPiece" && finishCategory->title == "Bedrooms"'),
              categoryList(S, "Children's Rooms", '_type == "portfolioPiece" && finishCategory->title == "Children\'s Rooms"'),
              categoryList(S, 'Childrens Themed Rooms', '_type == "portfolioPiece" && finishCategory->title == "Childrens Themed Rooms"'),
              categoryList(S, 'Dining Rooms', '_type == "portfolioPiece" && finishCategory->title == "Dining Rooms"'),
              categoryList(S, 'Kitchens', '_type == "portfolioPiece" && finishCategory->title == "Kitchens"'),
              categoryList(S, 'Niches', '_type == "portfolioPiece" && finishCategory->title == "Niches"'),
              categoryList(S, 'Powder Rooms', '_type == "portfolioPiece" && finishCategory->title == "Powder Rooms"'),
            ])
          ),

          S.divider(),

          // Misha & ARtner Team
          S.listItem().title('Misha & ARtner Team').child(
            S.list().title('Misha & ARtner Team').items([
              categoryList(S, 'ARtner Team', '_type == "portfolioPiece" && finishCategory->title == "ARtner Team"'),
              categoryList(S, 'Images of Misha', '_type == "portfolioPiece" && finishCategory->title == "Images of Misha"'),
              categoryList(S, 'Wonderwall Project Team', '_type == "portfolioPiece" && finishCategory->title == "Wonderwall Project Team"'),
            ])
          ),

          S.divider(),

          // Projects
          S.listItem().title('Projects').child(
            S.list().title('Projects').items([
              categoryList(S, 'Albert Luis Salon & Day Spa Project', '_type == "portfolioPiece" && finishCategory->title == "Albert Luis Salon & Day Spa Project"'),
              categoryList(S, 'DWI Law Firm - Early American Themescape Project', '_type == "portfolioPiece" && finishCategory->title == "DWI Law Firm - Early American Themescape Project"'),
              categoryList(S, 'Dreamscape Powder Room Mural', '_type == "portfolioPiece" && finishCategory->title == "Dreamscape Powder Room Mural"'),
              categoryList(S, 'Galveston AirB&B Sealife Themescape Project', '_type == "portfolioPiece" && finishCategory->title == "Galveston AirB&B Sealife Themesacpe Project"'),
              categoryList(S, 'Houston Zoo Project', '_type == "portfolioPiece" && finishCategory->title == "Houston Zoo Project"'),
              categoryList(S, 'Jerusalem Themed Room Project', '_type == "portfolioPiece" && finishCategory->title == "Jerusalem Themed Room Project"'),
              categoryList(S, 'Pool Room Tropical Themescape Project', '_type == "portfolioPiece" && finishCategory->title == "Pool Room Tropical Themscape Project"'),
              categoryList(S, 'Rainforest Cafe - Katy Mills Mall Project', '_type == "portfolioPiece" && finishCategory->title == "Rainforest Cafe - Katy Mills Mall Project"'),
              categoryList(S, 'Tosa Entry Theme Project', '_type == "portfolioPiece" && finishCategory->title == "Tosa Entry Theme Project"'),
              categoryList(S, 'Whimsical Themed Bedroom Project', '_type == "portfolioPiece" && finishCategory->title == "Whimsical Themed Bedroom Project"'),
            ])
          ),

          S.divider(),

          // All Portfolio Pieces (unfiltered)
          S.listItem().title('All Portfolio Pieces').child(
            S.documentTypeList('portfolioPiece').title('All Portfolio Pieces')
          ),
        ])
      ),

      S.divider(),

      // ── Category & Project Management ──
      S.listItem().title('Categories & Projects').child(
        S.list().title('Categories & Projects').items([
          S.listItem().title('Finish Categories').child(S.documentTypeList('finishCategory').title('Finish Categories')),
          S.listItem().title('Studio Projects').child(S.documentTypeList('studioProject').title('Studio Projects')),
        ])
      ),
    ])

export default defineConfig({
  name: 'misha-website',
  title: 'Misha Creations — Website Editor',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'uz6uv7gy',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  basePath: '/studio',
  plugins: [
    structureTool({ structure }),
    visionTool(),
  ],
  schema: {
    types: [
      mainSiteSettings, aboutPage, faqPage, processPage,
      servicesHubPage, servicePage, areaPage, blogPost, siteGlobals,
      portfolioPiece, finishCategory, studioProject,
    ],
  },
})
