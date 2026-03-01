import { sanityClient } from './sanity'

const PIECE_FIELDS = `
  _id, title, slug, category, location,
  heroImage { asset, hotspot, alt, caption, "lqip": asset->metadata.lqip },
  images[] { asset, hotspot, alt, caption, "lqip": asset->metadata.lqip },
  orientation, description, isFeatured, isMishaSelect, displayOrder
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
  category: string
  location?: string
  heroImage: SanityImage
  images?: SanityImage[]
  orientation: 'portrait' | 'landscape' | 'square'
  description?: string
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

/** Pieces by location/neighborhood */
export async function getPiecesByLocation(location: string, limit = 4): Promise<PortfolioPiece[]> {
  return sanityClient.fetch(`
    *[_type == "portfolioPiece" && published == true && coalesce(archived, false) != true && location match $location]
    | order(displayOrder asc) [0...$limit] { ${PIECE_FIELDS} }
  `, { location: `*${location}*`, limit })
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
