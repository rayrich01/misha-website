/* Design tokens — Misha Creations main site (warm homeowner palette) */
export const TOKENS = {
  CREAM:    '#E8E0D0',
  SAND:     '#DBD3BE',
  SAGE:     '#D8DDD1',
  SAGE_LT:  '#E8EBE6',
  CHARCOAL: '#3C3C3A',
  DARK:     '#2D2D2D',
  GOLD:     '#C9A96E',
  BRONZE:   '#8B7355',
} as const

export const FONTS = {
  display:   "'Great Vibes', cursive",
  editorial: "'Cormorant Garamond', serif",
  body:      "'Lora', serif",
} as const

export interface FinishSurface {
  slug: string
  categoryId: string
  title: string
  metaTitle: string
  h1: string
}

export const FINISH_SURFACES: FinishSurface[] = [
  {
    slug: 'venetian-plaster-houston',
    categoryId: 'venetian-plaster',
    title: 'Venetian Plaster',
    metaTitle: 'Venetian Plaster Houston | Misha Creations',
    h1: 'Venetian Plaster in Houston',
  },
  {
    slug: 'wall-murals-houston',
    categoryId: 'wall-murals',
    title: 'Wall Murals',
    metaTitle: 'Custom Wall Murals Houston | Misha Creations',
    h1: 'Custom Wall Murals in Houston',
  },
  {
    slug: 'faux-finishes-houston',
    categoryId: 'faux-finishes',
    title: 'Faux Finishes',
    metaTitle: 'Faux Finishes Houston | Misha Creations',
    h1: 'Faux & Specialty Finishes in Houston',
  },
  {
    slug: 'decorative-ceilings-houston',
    categoryId: 'decorative-ceilings',
    title: 'Decorative Ceilings',
    metaTitle: 'Decorative Ceilings Houston | Misha Creations',
    h1: 'Decorative Ceiling Painting in Houston',
  },
  {
    slug: 'childrens-rooms-houston',
    categoryId: 'childrens-rooms',
    title: "Children's Rooms",
    metaTitle: "Children's Room Murals Houston | Misha Creations",
    h1: "Children's Themed Room Murals in Houston",
  },
  {
    slug: 'themed-rooms-houston',
    categoryId: 'themed-rooms',
    title: 'Themed Rooms',
    metaTitle: 'Themed Room Design Houston | Misha Creations',
    h1: 'Themed Rooms & Skyscapes in Houston',
  },
  {
    slug: 'trompe-loeil-houston',
    categoryId: 'trompe-loeil',
    title: "Trompe l'Oeil",
    metaTitle: "Trompe l'Oeil Houston | Misha Creations",
    h1: "Trompe l'Oeil & Architectural Illusions in Houston",
  },
  {
    slug: 'modello-stencils-houston',
    categoryId: 'modello-stencils',
    title: 'Modello Stencils',
    metaTitle: 'Modello Stencils Houston | Misha Creations',
    h1: 'Modello & Decorative Stencils in Houston',
  },
]

export const FINISH_MAP = Object.fromEntries(
  FINISH_SURFACES.map(f => [f.slug, f])
) as Record<string, FinishSurface>

export interface NeighborhoodSurface {
  slug: string
  name: string
  metaTitle: string
  h1: string
}

export const NEIGHBORHOODS: NeighborhoodSurface[] = [
  {
    slug: 'river-oaks',
    name: 'River Oaks',
    metaTitle: 'Decorative Finishes River Oaks | Misha Creations Houston',
    h1: 'Luxury Decorative Finishes in River Oaks',
  },
  {
    slug: 'memorial',
    name: 'Memorial',
    metaTitle: 'Decorative Painting Memorial Houston | Misha Creations',
    h1: 'Luxury Decorative Painting in Memorial',
  },
  {
    slug: 'tanglewood',
    name: 'Tanglewood',
    metaTitle: 'Decorative Finishes Tanglewood | Misha Creations Houston',
    h1: 'Luxury Decorative Finishes in Tanglewood',
  },
  {
    slug: 'west-university',
    name: 'West University',
    metaTitle: 'Decorative Painting West University | Misha Creations Houston',
    h1: 'Luxury Decorative Painting in West University',
  },
  {
    slug: 'the-woodlands',
    name: 'The Woodlands',
    metaTitle: 'Decorative Finishes The Woodlands | Misha Creations',
    h1: 'Luxury Decorative Finishes in The Woodlands',
  },
  {
    slug: 'bellaire',
    name: 'Bellaire',
    metaTitle: 'Decorative Painting Bellaire Houston | Misha Creations',
    h1: 'Luxury Decorative Painting in Bellaire',
  },
]

export const NEIGHBORHOOD_MAP = Object.fromEntries(
  NEIGHBORHOODS.map(n => [n.slug, n])
) as Record<string, NeighborhoodSurface>

export const COPY = {
  siteTitle: 'Misha Creations',
  tagline: "Houston's premier decorative finishes artist",
  phone: '(281) 650-0500',
  email: 'misha@mishacreations.com',
  calendlyUrl: 'https://calendly.com/mishacreations/30min',
  address: { city: 'Houston', state: 'TX', country: 'US' },
  socialProof: ['River Oaks', 'Tanglewood', 'Memorial', 'West University', 'Bellaire', 'The Woodlands'],
} as const

export const PROCESS_STEPS = [
  {
    step: '01',
    name: 'Consultation',
    desc: 'We visit your home, study the light and architecture, and listen to your vision. Every project begins with understanding.',
  },
  {
    step: '02',
    name: 'Design',
    desc: 'Misha creates physical finish samples and detailed design sketches customized to your tastes for your approval before any brushwork begins.',
  },
  {
    step: '03',
    name: 'Execution',
    desc: 'Expert artistry applied with care, coordinated around your schedule. Museum-quality techniques refined over 25+ years of practice.',
  },
  {
    step: '04',
    name: 'Reveal',
    desc: 'Walk into transformed spaces that capture light, tell your story, and elevate every day. Your home becomes a living masterpiece.',
  },
] as const
