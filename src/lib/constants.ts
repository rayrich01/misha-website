/* Design tokens — Misha Creations main site (dark premium palette, matching studio) */
export const TOKENS = {
  INK:   '#171210',
  WARM:  '#1E1710',
  GOLD:  '#C4A064',
  GOLDF: '#D4B478',
  CREAM: '#F0EAE0',
  MIST:  '#C8BEB4',
  MUTED: '#786A5C',
} as const

export const FONTS = {
  display:   "'Great Vibes', cursive",
  editorial: "'Cormorant Garamond', serif",
  body:      "'Jost', sans-serif",
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
    metaTitle: 'Custom Wall Murals Houston | Hand-Painted Luxury Murals | Misha Creations',
    metaDescription: 'Custom hand-painted wall murals for Houston\'s most distinguished homes. Museum-quality artistry with 25+ years of experience. Serving River Oaks, Memorial, The Woodlands, and Tanglewood. Call (281) 650-0500.',
    h1: 'Luxury Wall Murals in Houston',
  },
  {
    slug: 'venetian-lime-plaster',
    categoryId: 'venetian-plaster',
    title: 'Venetian Lime Plaster',
    metaTitle: 'Venetian Lime Plaster Houston | Authentic Hand-Applied Finishes | Misha Creations',
    metaDescription: 'Authentic Venetian lime plaster for Houston luxury homes. Hand-applied by an artist with 25+ years of expertise. Custom plaster finishes for River Oaks, Memorial, and Tanglewood estates. Call (281) 650-0500.',
    h1: 'Venetian Lime Plaster in Houston',
  },
  {
    slug: 'trompe-loeil-architectural-illusions',
    categoryId: 'trompe-loeil',
    title: "Trompe L'Oeil & Architectural Illusions",
    metaTitle: "Trompe L'Oeil & Architectural Illusions Houston | Misha Creations",
    metaDescription: "Classical trompe l'oeil and architectural illusion painting for Houston luxury homes. Faux niches, stone detailing, and decorative molding by an artist with 25+ years of expertise. River Oaks, Memorial, Tanglewood.",
    h1: "Trompe L'Oeil & Architectural Illusions in Houston",
  },
  {
    slug: 'childrens-themed-rooms',
    categoryId: 'childrens-rooms',
    title: "Children's Themed Rooms",
    metaTitle: "Children's Themed Room Murals Houston | Custom Kids Room Painting | Misha Creations",
    metaDescription: "Custom themed room murals that bring your child's imagination to life. Hand-painted by an artist with 25+ years of experience. Serving Houston, River Oaks, Memorial, and The Woodlands.",
    h1: "Children's Themed Room Murals in Houston",
  },
  {
    slug: 'themed-rooms-skyscapes',
    categoryId: 'themed-rooms',
    title: 'Themed Rooms & Skyscapes',
    metaTitle: 'Themed Rooms & Sky Ceiling Murals Houston | Misha Creations',
    metaDescription: 'Custom themed rooms and hand-painted sky ceiling murals for Houston luxury homes. 25+ years of museum-quality artistry. Serving River Oaks, Memorial, Tanglewood, and The Woodlands.',
    h1: 'Themed Rooms & Skyscapes in Houston',
  },
  {
    slug: 'decorative-ceilings',
    categoryId: 'decorative-ceilings',
    title: 'Decorative Ceilings',
    metaTitle: 'Decorative Ceiling Painting Houston | Sky Murals & Custom Ceilings | Misha Creations',
    metaDescription: 'Custom decorative ceiling painting for Houston luxury homes. Hand-painted sky murals, frescoed medallions, and ornamental ceilings by an artist with 25+ years of expertise. River Oaks, Memorial, Tanglewood.',
    h1: 'Decorative Ceiling Painting in Houston',
  },
  {
    slug: 'faux-specialty-finishes',
    categoryId: 'faux-finishes',
    title: 'Faux & Specialty Finishes',
    metaTitle: 'Faux & Specialty Finishes Houston | Custom Decorative Finishes | Misha Creations',
    metaDescription: 'Custom faux and specialty finishes for Houston luxury homes. Hand-applied decorative treatments by an artist with 25+ years of expertise. Serving River Oaks, Memorial, Tanglewood, and The Woodlands.',
    h1: 'Luxury Faux & Specialty Finishes in Houston',
  },
  {
    slug: 'modello-stencils',
    categoryId: 'modello-stencils',
    title: 'Modello Stencils',
    metaTitle: 'Modello Stencils Houston | Decorative Stencil Designs | Misha Creations',
    metaDescription: 'Elegant Modello stencil designs for Houston luxury homes. Custom decorative stenciling by an artist with 25+ years of expertise. Serving River Oaks, Memorial, Tanglewood, and The Woodlands.',
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
    metaTitle: 'Decorative Painting River Oaks Houston | Murals & Venetian Plaster | Misha Creations',
    metaDescription: 'Luxury decorative painting for River Oaks homes. Wall murals, Venetian plaster, decorative ceilings, and faux finishes by an artist with 25+ years of Houston expertise. Call (281) 650-0500.',
    h1: 'Luxury Decorative Finishes in River Oaks',
  },
  {
    slug: 'memorial',
    name: 'Memorial',
    metaTitle: 'Decorative Painting Memorial Houston | Luxury Murals & Finishes | Misha Creations',
    metaDescription: 'Luxury decorative painting for Memorial homes. Wall murals, Venetian plaster, decorative ceilings, and custom finishes by an artist with 25+ years of Houston expertise. Call (281) 650-0500.',
    h1: 'Luxury Decorative Painting in Memorial',
  },
  {
    slug: 'tanglewood',
    name: 'Tanglewood',
    metaTitle: 'Decorative Painting Tanglewood Houston | Luxury Finishes & Murals | Misha Creations',
    metaDescription: 'Luxury decorative painting for Tanglewood homes. Venetian plaster, wall murals, faux finishes, and decorative ceilings by an artist with 25+ years of Houston expertise. Call (281) 650-0500.',
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

/* ─── Service card descriptions for the /services hub (003B) ─── */
export const SERVICE_CARD_DESCRIPTIONS: Record<string, string> = {
  'wall-murals': 'Custom hand-painted murals for walls, ceilings, and architectural features.',
  'venetian-plaster': 'Authentic hand-applied lime plaster finishes with depth and luminosity.',
  'trompe-loeil': 'Classical illusion painting — faux niches, stone detailing, and architectural molding.',
  'childrens-rooms': 'Custom themed room murals that bring your child\'s imagination to life.',
  'themed-rooms': 'Hand-painted sky ceiling murals and themed room environments.',
  'decorative-ceilings': 'Sky murals, frescoed medallions, and ornamental ceiling finishes.',
  'faux-finishes': 'Custom faux and specialty treatments hand-applied for luxury residences.',
  'modello-stencils': 'Elegant stencil designs for walls, ceilings, and architectural details.',
}

/* ─── Service page enrichment content (003A — venetian plaster first) ─── */
export interface ServiceEnrichment {
  intro: { heading: string; paragraphs: string[] }
  process: { heading: string; steps: { name: string; desc: string }[] }
  trust: { heading: string; points: string[] }
  extraFaqs: { question: string; answer: string }[]
  relatedServices: { slug: string; label: string }[]
  areaContext: string
}

export const SERVICE_ENRICHMENT: Record<string, ServiceEnrichment> = {
  'venetian-plaster': {
    intro: {
      heading: 'What Is Venetian Lime Plaster?',
      paragraphs: [
        'Venetian lime plaster is an authentic, lime-based decorative finish applied by hand in multiple thin layers and polished to create depth, luminosity, and tonal variation unique to each surface. The technique dates back centuries and produces finishes that change with the light — from soft warmth in the morning to a burnished glow under evening illumination.',
        'Misha has over 25 years of experience applying Venetian lime plaster in Houston luxury homes. She trained at the Buon Fresco School of Venetian Plastering in Washington D.C. and at Nicola Vigini Studios, bringing authentic Italian technique to every surface she finishes. Venetian plaster is suitable for walls, ceilings, foyers, bathrooms, and architectural features.',
      ],
    },
    process: {
      heading: 'Misha\'s Venetian Plaster Process',
      steps: [
        { name: 'In-Home Consultation', desc: 'Misha visits your home to study the space, light, and architecture. She discusses your vision and recommends the ideal plaster finish for your surfaces.' },
        { name: 'Custom Sample Creation', desc: 'Physical finish samples are created on sample boards for your approval. You see and touch the exact finish before any work begins in your home.' },
        { name: 'Hand Application', desc: 'Multiple layers of lime plaster are hand-applied by Misha personally, building depth and luminosity with each pass. The work is coordinated around your schedule.' },
        { name: 'Final Polish and Reveal', desc: 'The surface is burnished to its final sheen and reviewed for quality. The result is a one-of-a-kind finish designed for your home and applied by the artist who conceived it.' },
      ],
    },
    trust: {
      heading: 'Why Choose Misha for Venetian Plaster',
      points: [
        '25+ years of Venetian plaster experience in Houston',
        'Trained at the Buon Fresco School of Venetian Plastering and Nicola Vigini Studios',
        'Every surface hand-applied by the artist personally',
        'Physical finish samples provided before any work begins',
        'Complimentary in-home consultation to study your space',
      ],
    },
    extraFaqs: [
      { question: 'What rooms are best for Venetian lime plaster?', answer: 'Venetian plaster works beautifully on walls, ceilings, columns, foyers, bathrooms, living rooms, and dining rooms — any architectural surface. It adapts to curved walls, niches, and custom features, making it one of the most versatile luxury finishes available.' },
      { question: 'Is Venetian lime plaster durable?', answer: 'Yes. Authentic lime plaster is extremely durable and naturally develops character over time. It is suitable for high-traffic areas and even moisture-rich spaces like bathrooms when properly sealed.' },
      { question: 'Can Venetian plaster be applied over existing walls?', answer: 'In most cases, yes, after proper surface preparation. Misha assesses your existing surfaces during the in-home consultation and recommends the best preparation approach for your specific walls.' },
      { question: 'What is the difference between Venetian plaster and regular plaster?', answer: 'Venetian plaster uses slaked lime applied in multiple thin layers, then polished to create depth and luminosity. Regular plaster is a single-layer functional surface without the artistic finish. The multi-layer technique is what gives Venetian plaster its signature depth and light-catching quality.' },
      { question: 'Does Misha serve my area for Venetian plaster?', answer: 'Misha serves Houston\'s finest neighborhoods including River Oaks, Memorial, Tanglewood, West University, The Woodlands, and Bellaire. Call (281) 650-0500 for a complimentary consultation.' },
    ],
    relatedServices: [
      { slug: 'faux-specialty-finishes', label: 'Faux & Specialty Finishes' },
      { slug: 'decorative-ceilings', label: 'Decorative Ceilings' },
    ],
    areaContext: 'Misha has applied Venetian lime plaster finishes in homes across River Oaks, Memorial, Tanglewood, West University, The Woodlands, and Bellaire.',
  },
  'wall-murals': {
    intro: {
      heading: 'What Are Custom Wall Murals?',
      paragraphs: [
        'Custom wall murals are one-of-a-kind, hand-painted artworks created directly on your walls, ceilings, or architectural surfaces. Unlike printed reproductions or decals, every mural Misha paints is site-specific — scaled to your elevations, designed for your light, and approved before brushwork begins.',
        'With over 25 years of experience painting murals in Houston luxury homes, Misha creates everything from classical landscapes and Mediterranean scenes to botanical compositions, architectural trompe l\'oeil, and contemporary abstracts. Each mural is hand-painted by the artist personally — no subcontractors, no shortcuts.',
      ],
    },
    process: {
      heading: 'Misha\'s Mural Process',
      steps: [
        { name: 'In-Home Consultation', desc: 'Misha visits your home to study the wall, ceiling, or surface. She evaluates the light, scale, and surrounding architecture to recommend the ideal approach for your mural.' },
        { name: 'Custom Design and Approval', desc: 'Misha creates detailed design renderings showing how the mural will look in your space. You review and approve before any painting begins.' },
        { name: 'Hand-Painted Execution', desc: 'The mural is painted on-site by Misha personally, layer by layer. She coordinates around your schedule and manages the project from first sketch to final detail.' },
        { name: 'Final Walkthrough', desc: 'Once complete, Misha walks you through the finished work. The result is a one-of-a-kind mural designed for your home and painted by the artist who conceived it.' },
      ],
    },
    trust: {
      heading: 'Why Choose Misha for Wall Murals',
      points: [
        '25+ years of mural painting experience in Houston',
        'Every mural hand-painted by the artist personally',
        'Custom design renderings for approval before painting begins',
        'Museum-quality artistry for residential and commercial spaces',
        'Serving River Oaks, Memorial, Tanglewood, West University, The Woodlands, and Bellaire',
      ],
    },
    extraFaqs: [
      { question: 'What types of wall murals does Misha paint?', answer: 'Misha paints custom murals for walls, ceilings, and architectural features — including landscape scenes, Mediterranean vistas, botanical compositions, trompe l\'oeil illusions, and contemporary designs. Every mural is one-of-a-kind and painted by Misha personally.' },
      { question: 'What rooms are best for wall murals?', answer: 'Wall murals work beautifully in foyers, dining rooms, living rooms, bedrooms, nurseries, bathrooms, hallways, and even home offices. Misha evaluates your space during a complimentary in-home consultation to recommend the best approach for your room.' },
      { question: 'Can Misha paint a mural from my own design or photo?', answer: 'Yes. Misha works from your vision — whether it is a reference photo, a designer\'s concept, or a completely original idea. The process starts with a consultation where she discusses your vision and creates custom design renderings for your approval.' },
      { question: 'How does the wall mural process work?', answer: 'The process begins with a complimentary in-home consultation where Misha studies the space and light. She then creates design renderings for your approval. Once approved, the mural is hand-painted in your home over 1-3 weeks, coordinated around your schedule.' },
      { question: 'Does Misha serve my area for wall murals?', answer: 'Misha serves Houston\'s finest neighborhoods including River Oaks, Memorial, Tanglewood, West University, The Woodlands, and Bellaire. Call (281) 650-0500 for a complimentary consultation.' },
    ],
    relatedServices: [
      { slug: 'trompe-loeil-architectural-illusions', label: 'Trompe L\'Oeil & Architectural Illusions' },
      { slug: 'decorative-ceilings', label: 'Decorative Ceilings' },
    ],
    areaContext: 'Misha has painted custom wall murals in homes across River Oaks, Memorial, Tanglewood, West University, The Woodlands, and Bellaire.',
  },
}

/* ─── Hub-level FAQs for /services page (003B) ─── */
export const SERVICES_HUB_FAQS = [
  { question: 'What decorative painting services does Misha offer?', answer: 'Misha offers 8 luxury decorative painting services: Luxury Wall Murals, Venetian Lime Plaster, Trompe L\'Oeil & Architectural Illusions, Children\'s Themed Rooms, Themed Rooms & Skyscapes, Decorative Ceilings, Faux & Specialty Finishes, and Modello Stencils. Each finish is hand-applied by the artist personally.' },
  { question: 'How much does decorative painting cost?', answer: 'Every project is customized and priced by scope, surface area, and complexity. Misha provides a detailed, no-obligation estimate after a complimentary in-home consultation where she evaluates your surfaces, lighting, and vision.' },
  { question: 'How long has Misha been a decorative painter?', answer: 'Misha has over 25 years of experience as a decorative painting artist in Houston. She trained at the Buon Fresco School of Venetian Plastering in Washington D.C. and Nicola Vigini Studios, and has completed projects ranging from private estates to the Houston Zoo.' },
  { question: 'What areas of Houston does Misha serve?', answer: 'Misha serves Houston\'s finest neighborhoods including River Oaks, Memorial, Tanglewood, West University, The Woodlands, and Bellaire.' },
  { question: 'How do I start a project?', answer: 'Call (281) 650-0500 or submit a project inquiry online. Misha will arrange a complimentary in-home consultation to study your space, lighting, and vision.' },
  { question: 'Does Misha do the work herself?', answer: 'Yes. Every decorative finish is hand-applied by Misha personally. She does not subcontract her artistry.' },
]

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
