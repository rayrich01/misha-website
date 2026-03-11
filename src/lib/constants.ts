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
  /** URL slug — used in /services/{slug} route */
  slug: string
  /** Sanity portfolioPiece.category value */
  categoryId: string
  title: string
  metaTitle: string
  metaDescription: string
  h1: string
}

/* ─── Service pages — slugs match Readdy URLs exactly for SEO parity ─── */
export const FINISH_SURFACES: FinishSurface[] = [
  {
    slug: 'luxury-wall-murals',
    categoryId: 'wall-murals',
    title: 'Luxury Wall Murals',
    metaTitle: 'Luxury Wall Murals Houston | Custom Hand-Painted Murals | Misha Creations',
    metaDescription: 'Transform your Houston home with custom luxury wall murals by Misha Creations. Expert hand-painted murals for River Oaks, Memorial, and The Woodlands. Museum-quality artistry for discerning homeowners.',
    h1: 'Luxury Wall Murals in Houston',
  },
  {
    slug: 'venetian-lime-plaster',
    categoryId: 'venetian-plaster',
    title: 'Venetian Lime Plaster',
    metaTitle: 'Venetian Lime Plaster Houston | Luxury Plaster Finishes | Misha Creations',
    metaDescription: 'Authentic Venetian lime plaster finishes for Houston luxury homes. Hand-applied by Misha Creations for River Oaks, Memorial, and Tanglewood estates. 25+ years of artisan expertise.',
    h1: 'Venetian Lime Plaster in Houston',
  },
  {
    slug: 'trompe-loeil-architectural-illusions',
    categoryId: 'trompe-loeil',
    title: "Trompe L'Oeil & Architectural Illusions",
    metaTitle: "Luxury Trompe L'Oeil Artist Houston TX | Trompe L'Oeil Finishes Houston TX | Misha Creations",
    metaDescription: "Premier luxury trompe l'oeil artist Houston TX specializing in trompe l'oeil finishes Houston TX. Classical architectural illusions, faux niches, stone blocks & molding for River Oaks, Memorial & Tanglewood luxury homes.",
    h1: "Trompe L'Oeil & Architectural Illusions in Houston",
  },
  {
    slug: 'childrens-themed-rooms',
    categoryId: 'childrens-rooms',
    title: "Children's Themed Rooms",
    metaTitle: "Children's Themed Room Murals Houston | Kids Room Painting Katy TX",
    metaDescription: "Create magical spaces for your children with custom themed room murals. Expert children's room painting for Houston, Katy, Memorial, and River Oaks luxury homes.",
    h1: "Children's Themed Room Murals in Houston",
  },
  {
    slug: 'themed-rooms-skyscapes',
    categoryId: 'themed-rooms',
    title: 'Themed Rooms & Skyscapes',
    metaTitle: 'Themed Rooms & Skyscapes Houston | Sky Ceiling Murals Katy TX',
    metaDescription: 'Transform your Houston home with stunning themed rooms and sky ceiling murals. Expert skyscape painting for River Oaks, Memorial, and Katy luxury residences.',
    h1: 'Themed Rooms & Skyscapes in Houston',
  },
  {
    slug: 'decorative-ceilings',
    categoryId: 'decorative-ceilings',
    title: 'Decorative Ceilings',
    metaTitle: 'Decorative Ceiling Painting Houston | Misha Creations',
    metaDescription: "Transform your Houston luxury home with custom decorative ceiling painting. Sky murals, trompe-l'oeil domes, gilded finishes & frescoed medallions for River Oaks, Memorial & Tanglewood estates.",
    h1: 'Decorative Ceiling Painting in Houston',
  },
  {
    slug: 'faux-specialty-finishes',
    categoryId: 'faux-finishes',
    title: 'Faux & Specialty Finishes',
    metaTitle: 'Faux Specialty Finishes Houston | Misha Creations',
    metaDescription: "Custom faux finishes for Houston's luxury homes — Venetian plaster, metallic treatments, trompe l'oeil, and more. 25 years of artisan expertise.",
    h1: 'Luxury Faux & Specialty Finishes in Houston',
  },
  {
    slug: 'modello-stencils',
    categoryId: 'modello-stencils',
    title: 'Modello Stencils',
    metaTitle: 'Modello Stencils Houston | Decorative Stenciling Katy TX',
    metaDescription: 'Transform your Houston home with elegant Modello stencil designs. Expert decorative stenciling for River Oaks, Memorial, and Katy luxury residences.',
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
  metaDescription: string
  h1: string
}

export const NEIGHBORHOODS: NeighborhoodSurface[] = [
  {
    slug: 'river-oaks-luxury-murals',
    name: 'River Oaks',
    metaTitle: 'Luxury Wall and Ceiling Murals, Decorative Plaster in River Oaks | Misha Creations',
    metaDescription: 'Transform your River Oaks home with luxury wall murals, decorative ceilings, and Venetian plaster. Serving Memorial Close In and West University. 25+ years expertise.',
    h1: 'Luxury Decorative Finishes in River Oaks',
  },
  {
    slug: 'memorial',
    name: 'Memorial',
    metaTitle: 'Decorative Painting Memorial Houston | Misha Creations',
    metaDescription: 'Luxury decorative painting and finishes in Memorial, Houston. Wall murals, decorative ceilings, and custom finishes by Misha Creations. 25+ years serving Memorial.',
    h1: 'Luxury Decorative Painting in Memorial',
  },
  {
    slug: 'tanglewood',
    name: 'Tanglewood',
    metaTitle: 'Decorative Finishes Tanglewood | Misha Creations Houston',
    metaDescription: 'Luxury decorative finishes and specialty painting in Tanglewood, Houston. Venetian plaster, faux stone, and metallic glazes by Misha Creations. 25+ years of artisan expertise.',
    h1: 'Luxury Decorative Finishes in Tanglewood',
  },
  {
    slug: 'west-university',
    name: 'West University',
    metaTitle: 'Decorative Painting West University | Misha Creations Houston',
    metaDescription: "Luxury decorative painting in West University, Houston. Children's murals, botanical wall murals, and custom finishes by Misha Creations. 25+ years serving West U.",
    h1: 'Luxury Decorative Painting in West University',
  },
  {
    slug: 'the-woodlands',
    name: 'The Woodlands',
    metaTitle: 'Decorative Finishes The Woodlands | Misha Creations',
    metaDescription: 'Luxury decorative finishes in The Woodlands, TX. Themed rooms, sky ceilings, and decorative ceiling treatments by Misha Creations. 25+ years of artistic excellence.',
    h1: 'Luxury Decorative Finishes in The Woodlands',
  },
  {
    slug: 'bellaire',
    name: 'Bellaire',
    metaTitle: 'Decorative Painting Bellaire Houston | Misha Creations',
    metaDescription: 'Luxury decorative painting in Bellaire, Houston. Specialty faux finishes, nature murals, and textured accent walls by Misha Creations. 25+ years of artisan expertise.',
    h1: 'Luxury Decorative Painting in Bellaire',
  },
]

export const NEIGHBORHOOD_MAP = Object.fromEntries(
  NEIGHBORHOODS.map(n => [n.slug, n])
) as Record<string, NeighborhoodSurface>

export const FINISH_DESCRIPTIONS: Record<string, string> = {
  'skyscapes': 'Airbrushed skies, galaxies, clouds, and atmospheric treatments for ceilings and walls. Day-to-night transitions, star maps, and cosmic environments rendered with luminous depth.',
  'commercial': 'Themed installations for commercial, hospitality, restaurant, and public spaces. Large-scale murals and environmental art designed for high-traffic durability and visual impact.',
}

export interface NeighborhoodContent {
  description: string
  featuredCategories: [string, string]
  categoryOffset: number
  popularFinishes: string[]
  faqAnswers: {
    serve: string
    cost: string
    popular: string
  }
}

export const NEIGHBORHOOD_CONTENT: Record<string, NeighborhoodContent> = {
  'river-oaks-luxury-murals': {
    description: 'River Oaks estates demand the finest artistry. Misha has spent over two decades transforming grand foyers, formal dining rooms, and master suites in this iconic neighborhood with hand-applied Venetian plaster, architectural trompe l\'oeil, and custom gilded accents that honor the timeless elegance of each home.',
    featuredCategories: ['venetian-plaster', 'trompe-loeil'],
    categoryOffset: 0,
    popularFinishes: ['Venetian plaster', 'trompe l\'oeil', 'gilded ceiling treatments'],
    faqAnswers: {
      serve: 'Absolutely. Misha has been one of the most sought-after decorative artists in River Oaks for over 25 years, trusted by homeowners, designers, and builders throughout the neighborhood. She personally visits every home for consultation.',
      cost: 'River Oaks projects are tailored to the scale and prestige of each estate. Misha provides a detailed, no-obligation estimate after an in-home consultation where she evaluates the surfaces, lighting, and architectural details of your space.',
      popular: 'River Oaks homeowners frequently commission Venetian plaster for grand entry halls, trompe l\'oeil architectural illusions in dining rooms, and gilded ceiling medallions for formal living areas. Each finish is customized to complement the home\'s period and style.',
    },
  },
  'memorial': {
    description: 'Memorial\'s stately homes call for artistry that balances grandeur with warmth. Misha brings decades of experience painting expansive wall murals, hand-finished decorative ceilings, and immersive landscapes that transform Memorial residences into one-of-a-kind living environments.',
    featuredCategories: ['wall-murals', 'decorative-ceilings'],
    categoryOffset: 0,
    popularFinishes: ['wall murals', 'decorative ceilings', 'landscape scenes'],
    faqAnswers: {
      serve: 'Yes. Misha has completed dozens of projects throughout Memorial and Memorial Villages, from intimate powder rooms to soaring two-story foyers. She personally consults on every project.',
      cost: 'Pricing depends on the scope, surface area, and complexity of the finish. Memorial homeowners typically invest in larger-scale murals and ceiling treatments. Misha provides a clear, detailed quote after seeing your space in person.',
      popular: 'Memorial clients love expansive wall murals for dining and living rooms, painted sky ceilings for master bedrooms, and decorative crown and ceiling treatments that add dimension to their already impressive architecture.',
    },
  },
  'tanglewood': {
    description: 'Tanglewood\'s refined residences are the perfect canvas for Misha\'s specialty finishes. From luminous Venetian plaster that captures natural light to hand-rubbed faux stone and metallic glazes, every surface is treated as a piece of fine art, designed to enhance the sophisticated character of Tanglewood homes.',
    featuredCategories: ['faux-finishes', 'venetian-plaster'],
    categoryOffset: 2,
    popularFinishes: ['faux stone finishes', 'metallic glazes', 'Venetian plaster'],
    faqAnswers: {
      serve: 'Yes. Misha has been serving Tanglewood homeowners for over 25 years with custom decorative finishes. She is well known in the neighborhood for her meticulous craftsmanship and personal attention to every project.',
      cost: 'Each Tanglewood project is scoped individually based on surface area, finish complexity, and design requirements. Misha provides a comprehensive estimate after an in-home walkthrough where she studies your walls, lighting, and vision.',
      popular: 'Tanglewood homeowners gravitate toward hand-applied faux stone and aged plaster for accent walls, metallic glazes in powder rooms, and luminous Venetian plaster in entry halls. Misha matches every finish to the home\'s existing palette and architecture.',
    },
  },
  'west-university': {
    description: 'West University families trust Misha to create spaces that inspire — from whimsical children\'s room murals that spark imagination to elegant botanical wall murals that bring nature indoors. Every project in West U reflects the neighborhood\'s blend of family warmth and refined taste.',
    featuredCategories: ['wall-murals', 'childrens-rooms'],
    categoryOffset: 4,
    popularFinishes: ['children\'s murals', 'botanical wall murals', 'nursery themes'],
    faqAnswers: {
      serve: 'Yes. West University is one of Misha\'s most active neighborhoods. She has painted murals and finishes in homes throughout West U for over two decades and understands the neighborhood\'s family-oriented aesthetic.',
      cost: 'West University projects range from single-wall nursery murals to multi-room transformations. Misha provides a clear estimate after a free in-home consultation where she discusses your vision, measures the space, and recommends the best approach.',
      popular: 'West University families love hand-painted children\'s room murals with storybook themes, botanical wall murals for living and dining spaces, and soft decorative finishes for nurseries. Misha creates age-appropriate designs that grow with your children.',
    },
  },
  'the-woodlands': {
    description: 'The Woodlands\' nature-inspired homes deserve artistry that brings the outdoors in. Misha creates immersive themed environments, from wine cellar vineyards to painted sky ceilings, alongside refined decorative ceiling treatments that add drama and depth to The Woodlands\' spacious floor plans.',
    featuredCategories: ['themed-rooms', 'decorative-ceilings'],
    categoryOffset: 2,
    popularFinishes: ['themed room environments', 'sky ceilings', 'decorative ceiling treatments'],
    faqAnswers: {
      serve: 'Yes. Misha regularly travels to The Woodlands for consultations and project work. Many Woodlands homeowners appreciate her willingness to make the trip and her deep experience with the larger-format spaces common in the area.',
      cost: 'The Woodlands homes often feature open floor plans and tall ceilings, which Misha accounts for in her scoping. She provides a detailed, no-obligation estimate after visiting your home and understanding the full project vision.',
      popular: 'The Woodlands homeowners often request immersive themed environments for game rooms and wine cellars, painted sky and cloud ceilings for bedrooms and living areas, and decorative ceiling treatments that take advantage of the area\'s generous ceiling heights.',
    },
  },
  'bellaire': {
    description: 'Bellaire\'s mix of updated classics and contemporary new builds gives Misha a diverse canvas. She brings specialty faux finishes — aged leather, brushed metals, hand-rubbed stone — alongside nature-inspired wall murals that add character and depth to Bellaire\'s evolving residential landscape.',
    featuredCategories: ['faux-finishes', 'wall-murals'],
    categoryOffset: 6,
    popularFinishes: ['specialty faux finishes', 'nature murals', 'textured accent walls'],
    faqAnswers: {
      serve: 'Yes. Misha has worked in Bellaire for many years, serving both longtime residents refreshing their homes and new homeowners looking to add character and artistry to modern builds.',
      cost: 'Bellaire projects vary widely from accent walls to full-room transformations. Misha provides a personalized estimate after a free in-home consultation where she evaluates the space and discusses your goals.',
      popular: 'Bellaire homeowners are drawn to specialty faux finishes like aged leather and brushed metal for accent walls, nature-inspired wall murals for family rooms, and textured Venetian plaster treatments that add warmth to contemporary interiors.',
    },
  },
}

export const COPY = {
  siteTitle: 'Misha Creations',
  tagline: "Houston's premier decorative finishes artist",
  phone: '(281) 650-0500',
  email: 'misha@mishacreations.com',
  phoneHref: 'tel:+12816500500',
  address: { city: 'Houston', state: 'TX', country: 'US' },
  socialProof: ['River Oaks', 'Tanglewood', 'Memorial', 'West University', 'Bellaire', 'The Woodlands'],
  social: {
    instagram: 'https://www.instagram.com/mishacreations',
    facebook: 'https://www.facebook.com/mishacreations',
    pinterest: 'https://www.pinterest.com/mishacreations',
    googleMaps: 'https://www.google.com/maps/place/Misha+Creations',
  },
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
