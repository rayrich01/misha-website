import { sanityClient } from './sanity'

const PIECE_FIELDS = `
  _id, title, slug, subtitle, category, location,
  heroImage { asset, hotspot, alt, caption, "lqip": asset->metadata.lqip },
  images[] { asset, hotspot, alt, caption, "lqip": asset->metadata.lqip },
  orientation, description, tradeTags,
  isFeatured, isMishaSelect, displayOrder
`

export interface SanityImage {
  _type: 'image'
  asset: { _ref: string; _type: 'reference' }
  hotspot?: { x: number; y: number; height: number; width: number }
  alt?: string
  caption?: string
  lqip?: string
}

export interface PortfolioPiece {
  _id: string
  title: string
  slug: { current: string }
  subtitle?: string
  category: string
  location?: string
  heroImage: SanityImage
  images?: SanityImage[]
  orientation: 'portrait' | 'landscape' | 'square'
  description?: string
  tradeTags?: string[]
  isFeatured?: boolean
  isMishaSelect?: boolean
  displayOrder?: number
}

export interface FinishCategory {
  _id: string
  title: string
  slug: { current: string }
  heroImage?: SanityImage
  shortDescription?: string
  tradeDescription?: string
}

export interface MainSiteSettings {
  heroHeadline: string
  heroSubheadline: string
  heroImage?: { heroImage: SanityImage }
  featuredTestimonial?: {
    name: string
    quote: string
    duration: string
    location: string
  }
  neighborhoodStrip?: string[]
  seoTitle?: string
  seoDescription?: string
}

/** Misha Select pieces — curated gallery for main site */
export async function getMishaSelectPieces(limit = 12): Promise<PortfolioPiece[]> {
  return sanityClient.fetch(`
    *[_type == "portfolioPiece" && published == true && coalesce(archived, false) != true && isMishaSelect == true]
    | order(displayOrder asc) [0...$limit] { ${PIECE_FIELDS} }
  `, { limit })
}

/** Pieces by finish category */
export async function getPiecesByCategory(category: string, limit = 6): Promise<PortfolioPiece[]> {
  return sanityClient.fetch(`
    *[_type == "portfolioPiece" && published == true && coalesce(archived, false) != true && category == $category]
    | order(displayOrder asc) [0...$limit] { ${PIECE_FIELDS} }
  `, { category, limit })
}

/** Pieces by multiple categories with offset (for unique neighborhood pages) */
export async function getPiecesByCategories(categories: string[], perCategory = 2, offset = 0): Promise<PortfolioPiece[]> {
  const results = await Promise.all(
    categories.map((cat) =>
      sanityClient.fetch<PortfolioPiece[]>(`
        *[_type == "portfolioPiece" && published == true && coalesce(archived, false) != true && category == $cat]
        | order(displayOrder asc) [$offset...$end] { ${PIECE_FIELDS} }
      `, { cat, offset, end: offset + perCategory })
    )
  )
  return results.flat()
}

/** Pieces by location/neighborhood */
export async function getPiecesByLocation(location: string, limit = 4): Promise<PortfolioPiece[]> {
  return sanityClient.fetch(`
    *[_type == "portfolioPiece" && published == true && coalesce(archived, false) != true && location match $location]
    | order(displayOrder asc) [0...$limit] { ${PIECE_FIELDS} }
  `, { location: `*${location}*`, limit })
}

/** Featured portfolio pieces for gallery hero */
export async function getFeaturedPieces(limit = 6): Promise<PortfolioPiece[]> {
  return sanityClient.fetch(`
    *[_type == "portfolioPiece" && published == true && coalesce(archived, false) != true
      && isMishaSelect == true && isFeatured == true]
    | order(displayOrder asc) [0...$limit] { ${PIECE_FIELDS} }
  `, { limit })
}

/** Single portfolio piece by slug */
export async function getPieceBySlug(slug: string): Promise<PortfolioPiece | null> {
  return sanityClient.fetch(`
    *[_type == "portfolioPiece" && published == true && coalesce(archived, false) != true
      && slug.current == $slug][0] { ${PIECE_FIELDS} }
  `, { slug })
}

/** All published Misha Select slugs (for generateStaticParams) */
export async function getAllPortfolioSlugs(): Promise<string[]> {
  return sanityClient.fetch(`
    *[_type == "portfolioPiece" && published == true && coalesce(archived, false) != true].slug.current
  `)
}

/** Related pieces from same category, excluding current */
export async function getRelatedPieces(category: string, excludeId: string, limit = 3): Promise<PortfolioPiece[]> {
  return sanityClient.fetch(`
    *[_type == "portfolioPiece" && published == true && coalesce(archived, false) != true
      && category == $category && _id != $excludeId && isMishaSelect == true]
    | order(displayOrder asc) [0...$limit] { ${PIECE_FIELDS} }
  `, { category, excludeId, limit })
}

/** Finish category metadata */
export async function getFinishCategory(slug: string): Promise<FinishCategory | null> {
  return sanityClient.fetch(`
    *[_type == "finishCategory" && slug.current == $slug][0] {
      _id, title, slug,
      heroImage { asset, hotspot, alt, "lqip": asset->metadata.lqip },
      shortDescription, tradeDescription
    }
  `, { slug })
}

/** Main site settings singleton */
export async function getMainSiteSettings(): Promise<MainSiteSettings | null> {
  return sanityClient.fetch(`
    *[_type == "mainSiteSettings" && _id == "mainSiteSettings"][0] {
      heroHeadline, heroSubheadline,
      heroImage->{ heroImage { asset, hotspot, alt, "lqip": asset->metadata.lqip } },
      featuredTestimonial,
      neighborhoodStrip,
      seoTitle, seoDescription
    }
  `)
}

/** Homepage hero piece (fallback if no mainSiteSettings) */
export async function getHomepageHero(): Promise<PortfolioPiece | null> {
  return sanityClient.fetch(`
    *[_type == "portfolioPiece" && published == true && isFeatured == true]
    | order(displayOrder asc) [0] { ${PIECE_FIELDS} }
  `)
}

/* ═══════════════════════════════════════════════════════════════
   CMS Page Content — replaces constants.ts hardcoded content
   ═══════════════════════════════════════════════════════════════ */

// ── Interfaces ──

export interface CmsServicePage {
  _id: string
  slug: { current: string }
  categoryId: string
  title: string
  h1: string
  cardDescription: string
  sortOrder: number
  seo: { metaTitle: string; metaDescription: string }
  intro: { heading: string; paragraphs: string[] }
  process: { heading: string; steps: { name: string; desc: string }[] }
  trust: { heading: string; points: string[] }
  extraFaqs: { question: string; answer: string }[]
  relatedServices: { slug: string; label: string }[]
  areaContext: string
}

export interface CmsAreaPage {
  _id: string
  slug: { current: string }
  name: string
  sortOrder: number
  seo: { metaTitle: string; metaDescription: string }
  h1: string
  description: string
  featuredCategories: string[]
  categoryOffset: number
  popularFinishes: string[]
  faqAnswers: { serve: string; cost: string; popular: string }
  extraFaqs: { question: string; answer: string }[]
  nearbyAreas: { slug: string; name: string }[]
  trustPoints: string[]
}

export interface CmsServicesHubPage {
  seo: { metaTitle: string; metaDescription: string }
  heroHeadline: string
  heroSubtext: string
  introText: string
  trustHeading: string
  trustPoints: string[]
  processHeading: string
  hubFaqs: { question: string; answer: string }[]
  ctaHeadline: string
  ctaBody: string
}

export interface CmsProcessPage {
  seo: { metaTitle: string; metaDescription: string }
  heroHeadline: string
  heroSubtext: string
  introHeading: string
  introText: string
  aboutHeading: string
  aboutParagraphs: string[]
  processSteps: { step: string; name: string; desc: string }[]
  faqs: { question: string; answer: string }[]
  ctaHeadline: string
  ctaBody: string
}

export interface CmsSiteGlobals {
  siteName: string
  tagline: string
  phone: string
  phoneHref: string
  email: string
  address: { city: string; state: string; country: string }
  socialProofNeighborhoods: string[]
  social: { instagram: string; facebook: string; pinterest: string; googleMaps: string }
  processSteps: { step: string; name: string; desc: string }[]
  inquireRoomTypes: string[]
  inquireTimeframes: { value: string; label: string }[]
}

// ── Queries ──

const SERVICE_PAGE_FIELDS = `
  _id, slug, categoryId, title, h1, cardDescription, sortOrder,
  seo { metaTitle, metaDescription },
  intro { heading, paragraphs },
  process { heading, steps[] { name, desc } },
  trust { heading, points },
  extraFaqs[] { question, answer },
  relatedServices[] { slug, label },
  areaContext
`

const AREA_PAGE_FIELDS = `
  _id, slug, name, sortOrder,
  seo { metaTitle, metaDescription },
  h1, description,
  featuredCategories, categoryOffset, popularFinishes,
  faqAnswers { serve, cost, popular },
  extraFaqs[] { question, answer },
  nearbyAreas[] { slug, name },
  trustPoints
`

/** Single service page by slug */
export async function getServicePage(slug: string): Promise<CmsServicePage | null> {
  return sanityClient.fetch(`
    *[_type == "servicePage" && slug.current == $slug][0] { ${SERVICE_PAGE_FIELDS} }
  `, { slug })
}

/** All service pages (for hub page and navigation) */
export async function getAllServicePages(): Promise<CmsServicePage[]> {
  return sanityClient.fetch(`
    *[_type == "servicePage"] | order(sortOrder asc) { ${SERVICE_PAGE_FIELDS} }
  `)
}

/** All service page slugs (for generateStaticParams) */
export async function getAllServiceSlugs(): Promise<string[]> {
  return sanityClient.fetch(`
    *[_type == "servicePage"].slug.current
  `)
}

/** Single area page by slug */
export async function getAreaPage(slug: string): Promise<CmsAreaPage | null> {
  return sanityClient.fetch(`
    *[_type == "areaPage" && slug.current == $slug][0] { ${AREA_PAGE_FIELDS} }
  `, { slug })
}

/** All area pages (for navigation and cross-links) */
export async function getAllAreaPages(): Promise<CmsAreaPage[]> {
  return sanityClient.fetch(`
    *[_type == "areaPage"] | order(sortOrder asc) { ${AREA_PAGE_FIELDS} }
  `)
}

/** All area page slugs (for generateStaticParams) */
export async function getAllAreaSlugs(): Promise<string[]> {
  return sanityClient.fetch(`
    *[_type == "areaPage"].slug.current
  `)
}

/** Services hub page singleton */
export async function getServicesHubPage(): Promise<CmsServicesHubPage | null> {
  return sanityClient.fetch(`
    *[_type == "servicesHubPage" && _id == "servicesHubPage"][0] {
      seo { metaTitle, metaDescription },
      heroHeadline, heroSubtext, introText,
      trustHeading, trustPoints, processHeading,
      hubFaqs[] { question, answer },
      ctaHeadline, ctaBody
    }
  `)
}

/** Process page singleton */
export async function getProcessPage(): Promise<CmsProcessPage | null> {
  return sanityClient.fetch(`
    *[_type == "processPage" && _id == "processPage"][0] {
      seo { metaTitle, metaDescription },
      heroHeadline, heroSubtext,
      introHeading, introText,
      aboutHeading, aboutParagraphs,
      processSteps[] { step, name, desc },
      faqs[] { question, answer },
      ctaHeadline, ctaBody
    }
  `)
}

/** Site globals singleton */
export async function getSiteGlobals(): Promise<CmsSiteGlobals | null> {
  return sanityClient.fetch(`
    *[_type == "siteGlobals" && _id == "siteGlobals"][0] {
      siteName, tagline, phone, phoneHref, email,
      address { city, state, country },
      socialProofNeighborhoods,
      social { instagram, facebook, pinterest, googleMaps },
      processSteps[] { step, name, desc },
      inquireRoomTypes,
      inquireTimeframes[] { value, label }
    }
  `)
}

/** Navigation data — lightweight fetch for layout */
export async function getNavData(): Promise<{
  services: { slug: string; title: string; categoryId: string }[]
  areas: { slug: string; name: string }[]
}> {
  const [services, areas] = await Promise.all([
    sanityClient.fetch<{ slug: string; title: string; categoryId: string }[]>(`
      *[_type == "servicePage"] | order(sortOrder asc) {
        "slug": slug.current, title, categoryId
      }
    `),
    sanityClient.fetch<{ slug: string; name: string }[]>(`
      *[_type == "areaPage"] | order(sortOrder asc) {
        "slug": slug.current, name
      }
    `),
  ])
  return { services, areas }
}

/* ═══════════════════════════════════════════════════════════════
   Project Galleries
   ═══════════════════════════════════════════════════════════════ */

export interface StudioProject {
  _id: string
  title: string
  slug: { current: string }
  category: string
  description?: string
  heroImage?: SanityImage
  displayOrder?: number
  pieces: PortfolioPiece[]
  pieceCount: number
}

const PROJECT_FIELDS = `
  _id, title, slug, category, description, displayOrder,
  heroImage { asset, hotspot, alt, "lqip": asset->metadata.lqip },
  "pieces": pieces[]->{ ${PIECE_FIELDS} },
  "pieceCount": count(pieces)
`

/** All published projects for /recent-projects listing */
export async function getAllProjects(): Promise<StudioProject[]> {
  return sanityClient.fetch(`
    *[_type == "studioProject" && defined(slug.current) && count(pieces) > 0]
    | order(displayOrder asc) { ${PROJECT_FIELDS} }
  `)
}

/** Single project by slug */
export async function getProjectBySlug(slug: string): Promise<StudioProject | null> {
  return sanityClient.fetch(`
    *[_type == "studioProject" && slug.current == $slug][0] { ${PROJECT_FIELDS} }
  `, { slug })
}

/** All project slugs for generateStaticParams */
export async function getAllProjectSlugs(): Promise<string[]> {
  return sanityClient.fetch(`
    *[_type == "studioProject" && defined(slug.current) && count(pieces) > 0].slug.current
  `)
}

/** Get project info for a piece (if it belongs to a project) */
export async function getProjectForPiece(pieceId: string): Promise<{ title: string; slug: string; pieceCount: number } | null> {
  return sanityClient.fetch(`
    *[_type == "studioProject" && $pieceId in pieces[]._ref][0]{
      title, "slug": slug.current, "pieceCount": count(pieces)
    }
  `, { pieceId })
}
