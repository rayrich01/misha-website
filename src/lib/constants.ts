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
    slug: 'themed-rooms',
    categoryId: 'themed-rooms',
    title: 'Themed Rooms',
    metaTitle: 'Custom Themed Room Murals Houston | Immersive Hand-Painted Environments | Misha Creations',
    metaDescription: 'Custom hand-painted themed room environments for Houston luxury homes. Wine cellars, media rooms, Mediterranean retreats, and immersive spaces. 25+ years of artistry. River Oaks, Memorial, Tanglewood.',
    h1: 'Custom Themed Room Murals in Houston',
  },
  {
    slug: 'skyscapes-celestial',
    categoryId: 'skyscapes',
    title: 'Skyscapes & Celestial',
    metaTitle: 'Hand-Painted Sky Ceiling Murals Houston | Skyscapes, Galaxies & Celestial Art | Misha Creations',
    metaDescription: 'Hand-painted sky ceiling murals, celestial scenes, and cosmic environments for Houston luxury homes. Blue skies, night stars, galaxies, and nebulas. 25+ years of artistry. River Oaks, Memorial, Tanglewood.',
    h1: 'Skyscapes & Celestial Murals in Houston',
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
  'themed-rooms': 'Immersive hand-painted environments — wine cellars, media rooms, and themed retreats.',
  'skyscapes': 'Hand-painted sky ceilings, celestial scenes, galaxies, and atmospheric cloud murals.',
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
  'decorative-ceilings': {
    intro: {
      heading: 'What Is Decorative Ceiling Painting?',
      paragraphs: [
        'Decorative ceiling painting transforms the overhead surface of a room into a work of art. From hand-painted sky murals and cloud scenes to frescoed medallions, gilded domes, and ornamental coffered details, decorative ceilings add dimension and drama that walls alone cannot achieve.',
        'Misha has over 25 years of experience painting decorative ceilings in Houston luxury homes. She specializes in sky ceiling murals, trompe l\'oeil dome illusions, and ornamental ceiling treatments designed to complement your home\'s architecture and capture the unique light of each space.',
      ],
    },
    process: {
      heading: 'Misha\'s Ceiling Painting Process',
      steps: [
        { name: 'In-Home Consultation', desc: 'Misha visits your home to study the ceiling height, lighting, and architectural details. She discusses your vision and recommends the ideal ceiling treatment for your space.' },
        { name: 'Custom Design and Samples', desc: 'Misha creates detailed design renderings and physical finish samples showing how the ceiling will look. You approve every element before painting begins.' },
        { name: 'Hand-Painted Execution', desc: 'The ceiling is painted on-site by Misha personally, layer by layer. Specialized techniques and equipment ensure precision on overhead surfaces. Work is coordinated around your schedule.' },
        { name: 'Final Reveal', desc: 'Once complete, Misha walks you through the finished ceiling. The result is a one-of-a-kind overhead surface that transforms the entire character of the room.' },
      ],
    },
    trust: {
      heading: 'Why Choose Misha for Decorative Ceilings',
      points: [
        '25+ years of decorative ceiling painting experience in Houston',
        'Every ceiling hand-painted by the artist personally',
        'Specialized techniques for sky murals, domes, medallions, and ornamental finishes',
        'Custom design renderings and finish samples before any work begins',
        'Serving River Oaks, Memorial, Tanglewood, West University, The Woodlands, and Bellaire',
      ],
    },
    extraFaqs: [
      { question: 'What types of decorative ceiling painting does Misha offer?', answer: 'Misha offers hand-painted sky murals, cloud ceiling scenes, trompe l\'oeil dome illusions, frescoed medallions, gilded finishes, coffered ceiling treatments, and ornamental overhead designs. Each ceiling is custom-designed to complement your home\'s architecture.' },
      { question: 'Can decorative ceilings be painted in any room?', answer: 'Yes. Decorative ceiling painting works in foyers, dining rooms, bedrooms, bathrooms, living rooms, and hallways. Misha assesses ceiling height, condition, and lighting during the consultation to recommend the best treatment for each space.' },
      { question: 'What is a sky ceiling mural?', answer: 'A sky ceiling mural is a hand-painted ceiling treatment that creates the illusion of an open sky — often with realistic cloud formations, atmospheric depth, and natural light transitions. Misha paints each sky ceiling to match the room\'s lighting and architecture.' },
      { question: 'How long does decorative ceiling painting take?', answer: 'Timeline depends on ceiling size, height, and treatment complexity. Most decorative ceiling projects take 1-3 weeks from design approval to completion. Misha coordinates around your schedule and provides a realistic timeline during the consultation.' },
      { question: 'Does Misha serve my area for ceiling painting?', answer: 'Misha serves Houston\'s finest neighborhoods including River Oaks, Memorial, Tanglewood, West University, The Woodlands, and Bellaire. Call (281) 650-0500 for a complimentary consultation.' },
    ],
    relatedServices: [
      { slug: 'luxury-wall-murals', label: 'Luxury Wall Murals' },
      { slug: 'trompe-loeil-architectural-illusions', label: 'Trompe L\'Oeil & Architectural Illusions' },
    ],
    areaContext: 'Misha has painted decorative ceilings in homes across River Oaks, Memorial, Tanglewood, West University, The Woodlands, and Bellaire.',
  },
  'faux-finishes': {
    intro: {
      heading: 'What Are Faux & Specialty Finishes?',
      paragraphs: [
        'Faux and specialty finishes are hand-applied decorative treatments that replicate the appearance of natural materials — stone, aged leather, brushed metals, metallic glazes, and textured surfaces — using layered paint and plaster techniques. The result is a rich, dimensional surface that adds depth and character to any room.',
        'With over 25 years of experience, Misha hand-applies every faux and specialty finish personally. From warm metallic glazes in powder rooms to faux stone accent walls in living spaces, each treatment is customized to your home\'s architecture, palette, and lighting. Faux finishes are one of the most versatile decorative painting services, suitable for walls, ceilings, trim, and architectural details.',
      ],
    },
    process: {
      heading: 'Misha\'s Faux Finish Process',
      steps: [
        { name: 'In-Home Consultation', desc: 'Misha visits your home to study the surfaces, lighting, and existing palette. She discusses your vision and recommends the ideal faux or specialty treatment for your space.' },
        { name: 'Custom Sample Creation', desc: 'Physical finish samples are created on sample boards so you can see and touch the exact surface before any work begins. Colors, textures, and sheen levels are refined to your approval.' },
        { name: 'Hand-Applied Execution', desc: 'The finish is applied by Misha personally using layered techniques that build depth and dimension. Work is coordinated around your schedule.' },
        { name: 'Final Review and Reveal', desc: 'Once complete, Misha reviews the finished surfaces with you. The result is a one-of-a-kind decorative treatment designed for your home.' },
      ],
    },
    trust: {
      heading: 'Why Choose Misha for Faux Finishes',
      points: [
        '25+ years of faux and specialty finish experience in Houston',
        'Every surface hand-applied by the artist personally',
        'Physical finish samples provided before any work begins',
        'Versatile treatments for walls, ceilings, trim, and architectural details',
        'Serving River Oaks, Memorial, Tanglewood, West University, The Woodlands, and Bellaire',
      ],
    },
    extraFaqs: [
      { question: 'What types of faux finishes does Misha offer?', answer: 'Misha offers a wide range of faux and specialty treatments including faux stone, aged leather, brushed metals, metallic glazes, hand-rubbed surfaces, and textured accent walls. Each finish is customized and hand-applied to your specifications.' },
      { question: 'What is the difference between faux finishes and Venetian plaster?', answer: 'Faux finishes replicate the appearance of materials like stone, metal, or wood through layered paint techniques. Venetian plaster is a specific lime-based plaster applied in thin layers and polished for depth and luminosity. Misha offers both as separate services.' },
      { question: 'How durable are faux specialty finishes?', answer: 'Professional faux finishes are highly durable when properly applied and sealed. They are suitable for high-traffic areas and maintain their appearance for years. Misha uses professional-grade materials for lasting results.' },
      { question: 'Where do faux finishes work best?', answer: 'Faux and specialty finishes work beautifully on accent walls, powder rooms, dining rooms, living rooms, entryways, and architectural features like columns and niches. They add depth and character that standard paint cannot achieve.' },
      { question: 'Does Misha serve my area for faux finishes?', answer: 'Misha serves Houston\'s finest neighborhoods including River Oaks, Memorial, Tanglewood, West University, The Woodlands, and Bellaire. Call (281) 650-0500 for a complimentary consultation.' },
    ],
    relatedServices: [
      { slug: 'venetian-lime-plaster', label: 'Venetian Lime Plaster' },
      { slug: 'modello-stencils', label: 'Modello Stencils' },
    ],
    areaContext: 'Misha has applied faux and specialty finishes in homes across River Oaks, Memorial, Tanglewood, West University, The Woodlands, and Bellaire.',
  },
  'trompe-loeil': {
    intro: {
      heading: 'What Is Trompe L\'Oeil?',
      paragraphs: [
        'Trompe l\'oeil — French for "deceive the eye" — is a classical painting technique that creates realistic three-dimensional illusions on flat surfaces. Faux architectural elements like niches, columns, stone detailing, arched windows, and decorative molding appear to project from or recede into the wall, adding visual depth and architectural interest where none physically exists.',
        'Misha has over 25 years of experience painting trompe l\'oeil and architectural illusions in Houston luxury homes. From faux library shelves and stone-framed windows to full-room panoramic scenes, each illusion is hand-painted by the artist personally and designed to integrate seamlessly with your home\'s existing architecture.',
      ],
    },
    process: {
      heading: 'Misha\'s Trompe L\'Oeil Process',
      steps: [
        { name: 'In-Home Consultation', desc: 'Misha visits your home to study the wall, room proportions, and sight lines. She discusses your vision and recommends how trompe l\'oeil can enhance or transform the space.' },
        { name: 'Design Renderings', desc: 'Detailed design renderings show exactly how the illusion will look on your surface. Perspective, lighting, and architectural accuracy are refined before any painting begins.' },
        { name: 'Hand-Painted Execution', desc: 'The illusion is painted on-site by Misha personally, building from structural outlines to detailed shadows, highlights, and textures. Work is coordinated around your schedule.' },
        { name: 'Final Reveal', desc: 'Once complete, Misha walks you through the finished work. The full dimensional effect is best appreciated from the natural viewing angle of the room.' },
      ],
    },
    trust: {
      heading: 'Why Choose Misha for Trompe L\'Oeil',
      points: [
        '25+ years of trompe l\'oeil and architectural illusion experience in Houston',
        'Every illusion hand-painted by the artist personally',
        'Detailed design renderings for approval before painting begins',
        'Classical technique adapted to modern and traditional Houston homes',
        'Serving River Oaks, Memorial, Tanglewood, West University, The Woodlands, and Bellaire',
      ],
    },
    extraFaqs: [
      { question: 'What is trompe l\'oeil painting?', answer: 'Trompe l\'oeil is a classical painting technique that creates realistic three-dimensional illusions on flat surfaces. The name means "deceive the eye" in French. Misha specializes in faux architectural elements like niches, columns, stone detailing, and decorative molding that appear to project from or recede into the wall.' },
      { question: 'Where can trompe l\'oeil be used in a home?', answer: 'Trompe l\'oeil works on walls, ceilings, hallways, foyers, dining rooms, and architectural features. It is especially effective for adding visual depth to smaller spaces or creating the appearance of windows, niches, and columns where none exist.' },
      { question: 'Is trompe l\'oeil the same as a mural?', answer: 'They overlap but differ in intent. Murals depict scenes or imagery, while trompe l\'oeil specifically aims to create architectural illusions — making flat surfaces appear three-dimensional. Misha offers both as separate services.' },
      { question: 'How long does a trompe l\'oeil project take?', answer: 'Timeline varies with the complexity and scale of the illusion. Most projects take 1-3 weeks from design approval to completion. Misha creates detailed design renderings for approval before painting begins.' },
      { question: 'Does Misha serve my area for trompe l\'oeil?', answer: 'Misha serves Houston\'s finest neighborhoods including River Oaks, Memorial, Tanglewood, West University, The Woodlands, and Bellaire. Call (281) 650-0500 for a complimentary consultation.' },
    ],
    relatedServices: [
      { slug: 'luxury-wall-murals', label: 'Luxury Wall Murals' },
      { slug: 'decorative-ceilings', label: 'Decorative Ceilings' },
    ],
    areaContext: 'Misha has painted trompe l\'oeil and architectural illusions in homes across River Oaks, Memorial, Tanglewood, West University, The Woodlands, and Bellaire.',
  },
  'childrens-rooms': {
    intro: {
      heading: 'Custom Children\'s Themed Room Murals',
      paragraphs: [
        'A child\'s room is where imagination lives. Custom themed room murals transform nurseries, playrooms, and bedrooms into immersive environments designed around your child\'s interests — from storybook landscapes and nature scenes to fantasy worlds, sports themes, and whimsical characters. Every mural is one-of-a-kind and painted by hand.',
        'Misha has over 25 years of experience painting children\'s rooms in Houston luxury homes. She works directly with parents to understand the vision, creates detailed design renderings for approval, and uses professional-grade, low-VOC paints appropriate for children\'s environments. The result is a space that sparks imagination and grows with your child.',
      ],
    },
    process: {
      heading: 'Misha\'s Children\'s Room Process',
      steps: [
        { name: 'In-Home Consultation', desc: 'Misha visits your home to see the room, discuss your child\'s interests, and understand the vision. She evaluates lighting, wall space, and room layout.' },
        { name: 'Custom Design Renderings', desc: 'Misha creates detailed design renderings showing how the themed room will look. Colors, characters, and scenes are refined to your family\'s approval before any painting begins.' },
        { name: 'Hand-Painted Execution', desc: 'The mural is painted on-site by Misha personally using professional-grade, low-VOC materials. Work is coordinated around your family\'s schedule.' },
        { name: 'The Reveal', desc: 'Once complete, Misha walks you through the finished room. The result is a magical space created just for your child — painted by the artist who designed it.' },
      ],
    },
    trust: {
      heading: 'Why Choose Misha for Children\'s Rooms',
      points: [
        '25+ years of experience painting children\'s room murals in Houston',
        'Every mural hand-painted by the artist personally',
        'Professional-grade, low-VOC paints safe for children\'s environments',
        'Custom design renderings for your family\'s approval before painting begins',
        'Serving River Oaks, Memorial, Tanglewood, West University, The Woodlands, and Bellaire',
      ],
    },
    extraFaqs: [
      { question: 'What themes can Misha paint for a child\'s room?', answer: 'Misha creates custom themed rooms based on your child\'s interests and imagination — from nature scenes and storybook worlds to sports themes, fantasy landscapes, and whimsical characters. Every design is one-of-a-kind and tailored to your child.' },
      { question: 'Is the paint safe for children\'s rooms?', answer: 'Yes. Misha uses professional-grade, low-VOC paints and finishes appropriate for children\'s environments. Safety and air quality are considered in every nursery and children\'s room project.' },
      { question: 'Can Misha paint a nursery before the baby arrives?', answer: 'Yes. Misha coordinates project timing around your schedule and can complete nursery murals well before your due date. Most projects take 1-3 weeks from design approval to completion.' },
      { question: 'Will the mural grow with my child?', answer: 'Misha designs murals with longevity in mind. She discusses age-appropriate themes and can create designs that transition from toddler to school-age. Murals can also be refreshed or updated as your child\'s interests evolve.' },
      { question: 'Does Misha serve my area for children\'s room murals?', answer: 'Misha serves Houston\'s finest neighborhoods including River Oaks, Memorial, Tanglewood, West University, The Woodlands, and Bellaire. Call (281) 650-0500 for a complimentary consultation.' },
    ],
    relatedServices: [
      { slug: 'themed-rooms', label: 'Themed Rooms' },
      { slug: 'skyscapes-celestial', label: 'Skyscapes & Celestial' },
    ],
    areaContext: 'Misha has painted children\'s themed room murals in homes across River Oaks, Memorial, Tanglewood, West University, The Woodlands, and Bellaire.',
  },
  'themed-rooms': {
    intro: {
      heading: 'What Are Themed Rooms?',
      paragraphs: [
        'Themed rooms are immersive, hand-painted environments that transform entire spaces into experiences. Wine cellars wrapped in vineyard landscapes, media rooms with panoramic vistas, Mediterranean retreats with aged stone and ironwork, and entertainment spaces with custom atmospheric treatments — each room tells a story through paint.',
        'With over 25 years of experience, Misha creates themed environments for Houston luxury homes that go far beyond standard decoration. Every themed room is hand-painted by the artist personally, designed to integrate with the room\'s architecture, lighting, and intended atmosphere. Children\'s themed rooms are also available as a dedicated specialty.',
      ],
    },
    process: {
      heading: 'Misha\'s Themed Room Process',
      steps: [
        { name: 'In-Home Consultation', desc: 'Misha visits your home to study the room, lighting, and intended use. She discusses your vision for the themed environment and how the space will be experienced.' },
        { name: 'Custom Design Renderings', desc: 'Detailed design renderings show how the themed room will look. Color palette, narrative elements, and spatial flow are refined to your approval.' },
        { name: 'Hand-Painted Execution', desc: 'The environment is painted on-site by Misha personally — walls, ceilings, and connecting surfaces as needed. Work is coordinated around your schedule.' },
        { name: 'Final Reveal', desc: 'Once complete, Misha walks you through the finished environment. The full immersive effect is best experienced in person under the room\'s intended lighting.' },
      ],
    },
    trust: {
      heading: 'Why Choose Misha for Themed Rooms',
      points: [
        '25+ years of themed room experience in Houston luxury homes',
        'Every environment hand-painted by the artist personally',
        'Custom design renderings for approval before painting begins',
        'Full-room immersive environments — walls, ceilings, and transitions',
        'Serving River Oaks, Memorial, Tanglewood, West University, The Woodlands, and Bellaire',
      ],
    },
    extraFaqs: [
      { question: 'What types of themed rooms does Misha create?', answer: 'Misha creates wine cellars with vineyard murals, media rooms with panoramic landscapes, Mediterranean retreats, Asian-inspired spaces, and custom entertainment environments. Each room is designed as a complete immersive experience.' },
      { question: 'Can themed rooms be designed for adults?', answer: 'Absolutely. Themed rooms are a popular choice for wine cellars, home theaters, game rooms, and entertainment spaces tailored to adult interests and sophisticated design.' },
      { question: 'How long does a themed room project take?', answer: 'Timeline depends on the scope and complexity. Most themed room projects take 1-3 weeks from design approval to completion. Misha coordinates around your schedule.' },
      { question: 'What is the difference between a themed room and a mural?', answer: 'A mural is typically a single painted surface. A themed room is a complete environmental transformation — multiple walls, ceiling, and connecting elements all work together to create an immersive experience.' },
      { question: 'Does Misha serve my area for themed rooms?', answer: 'Misha serves Houston\'s finest neighborhoods including River Oaks, Memorial, Tanglewood, West University, The Woodlands, and Bellaire. Call (281) 650-0500 for a complimentary consultation.' },
    ],
    relatedServices: [
      { slug: 'childrens-themed-rooms', label: 'Children\'s Themed Rooms' },
      { slug: 'skyscapes-celestial', label: 'Skyscapes & Celestial' },
    ],
    areaContext: 'Misha has painted themed rooms in homes across River Oaks, Memorial, Tanglewood, West University, The Woodlands, and Bellaire.',
  },
  'skyscapes': {
    intro: {
      heading: 'What Are Skyscapes & Celestial Murals?',
      paragraphs: [
        'Skyscapes and celestial murals transform ceilings and walls into breathtaking atmospheric environments. From serene blue skies with drifting clouds to dramatic night skies filled with stars, and cosmic scenes featuring galaxies and nebulas — each skyscape is hand-painted by Misha to create a convincing illusion of infinite depth overhead.',
        'Misha\'s skyscape work spans three distinct styles. Daylight scenes feature blue skies, cloud formations, and sunrise or sunset transitions. Night sky murals capture moonlit atmospheres with star fields and gentle luminosity. Celestial compositions go further — hand-painting planets, nebula formations, and galaxy spirals that transform rooms into cosmic environments. With over 25 years of experience, every skyscape is custom-designed for the room\'s architecture, lighting, and intended atmosphere.',
      ],
    },
    process: {
      heading: 'Misha\'s Skyscape Process',
      steps: [
        { name: 'In-Home Consultation', desc: 'Misha visits your home to study the ceiling shape, height, lighting conditions, and the room\'s intended mood. She discusses which skyscape style — daylight, night sky, or celestial — best fits your vision.' },
        { name: 'Custom Sky Design', desc: 'Detailed color studies and design renderings show the planned atmospheric effect. Cloud formations, star placement, or celestial elements are positioned to complement the room\'s architecture.' },
        { name: 'Hand-Painted Execution', desc: 'The skyscape is painted on-site by Misha personally using airbrushing and hand-painting techniques that create convincing atmospheric depth. Multiple layers build the illusion of distance and light.' },
        { name: 'Final Reveal', desc: 'The full atmospheric effect of a skyscape is best experienced in person under the room\'s intended lighting — day and evening. Misha walks you through the finished work.' },
      ],
    },
    trust: {
      heading: 'Why Choose Misha for Skyscapes',
      points: [
        '25+ years of skyscape and celestial mural experience in Houston',
        'Three distinct styles: daylight, night sky, and celestial',
        'Airbrushing and hand-painting techniques for atmospheric depth',
        'Every skyscape hand-painted by the artist personally',
        'Custom-designed for your ceiling shape, lighting, and room character',
        'Serving River Oaks, Memorial, Tanglewood, West University, The Woodlands, and Bellaire',
      ],
    },
    extraFaqs: [
      { question: 'What is a skyscape ceiling mural?', answer: 'A skyscape is a hand-painted ceiling treatment that creates the illusion of open sky overhead — with realistic clouds, atmospheric depth, and natural light transitions. Misha paints each skyscape to match the room\'s character and lighting.' },
      { question: 'What types of skyscapes does Misha offer?', answer: 'Misha creates three styles of skyscapes: Daylight scenes with blue skies, clouds, sunrises, and sunsets. Night sky murals with moonlight and star fields. And celestial compositions featuring planets, nebulas, and galaxy formations.' },
      { question: 'Can a skyscape include a night sky with stars?', answer: 'Yes. Night sky skyscapes are one of Misha\'s specialties. She hand-paints moonlit atmospheres with realistic star fields. Some clients also add photoluminescent paint that glows softly after lights are turned off.' },
      { question: 'What is a celestial mural?', answer: 'Celestial murals go beyond simple sky scenes to include cosmic elements — planets, nebula formations, galaxy spirals, and deep-space environments. These are popular for bedrooms, media rooms, and children\'s rooms.' },
      { question: 'How realistic are hand-painted sky ceilings?', answer: 'Misha\'s sky ceilings use airbrushing and layered hand-painting to create convincing atmospheric depth. Cloud formations, light gradients, and color transitions are built up in multiple passes for a natural, dimensional result.' },
      { question: 'Can skyscapes be painted on walls as well as ceilings?', answer: 'Absolutely. While ceilings are the most common surface for skyscapes, Misha also paints sky and celestial scenes on walls, domed surfaces, and vaulted areas to create full atmospheric environments.' },
      { question: 'How long does a skyscape project take?', answer: 'Most skyscape projects take 3-7 days depending on ceiling size and complexity. Celestial and night sky scenes with detailed star fields may take longer. Misha coordinates around your schedule.' },
      { question: 'Does Misha serve my area for skyscapes?', answer: 'Misha serves Houston\'s finest neighborhoods including River Oaks, Memorial, Tanglewood, West University, The Woodlands, and Bellaire. Call (281) 650-0500 for a complimentary consultation.' },
    ],
    relatedServices: [
      { slug: 'decorative-ceilings', label: 'Decorative Ceilings' },
      { slug: 'themed-rooms', label: 'Themed Rooms' },
    ],
    areaContext: 'Misha has painted skyscapes and celestial murals in homes across River Oaks, Memorial, Tanglewood, West University, The Woodlands, and Bellaire.',
  },
  'modello-stencils': {
    intro: {
      heading: 'What Are Modello Stencils?',
      paragraphs: [
        'Modello stencils are precision-cut decorative stencils used to create elegant repeating patterns, borders, and designs on walls, ceilings, and architectural details. Unlike simple paint stencils, Modello designs are applied by hand with multiple layers of finish — paint, plaster, metallic, or glaze — producing refined, dimensional results with museum-quality detail.',
        'Misha has over 25 years of experience applying Modello stencil designs in Houston luxury homes. She combines stencil precision with artistic hand-finishing to create surfaces that have the depth and refinement of custom millwork — without the structural commitment. Stencils can be combined with Venetian plaster, faux finishes, or metallic glazes for layered, multi-dimensional effects.',
      ],
    },
    process: {
      heading: 'Misha\'s Stencil Process',
      steps: [
        { name: 'In-Home Consultation', desc: 'Misha visits your home to study the surfaces, architecture, and design context. She discusses pattern options, scale, and finish combinations.' },
        { name: 'Pattern Selection and Samples', desc: 'Misha presents pattern options and creates physical samples showing the stencil with your chosen finish treatment. You approve the pattern, scale, and finish before work begins.' },
        { name: 'Hand-Applied Execution', desc: 'The stencil is applied by Misha personally with multiple layers of finish — paint, plaster, or metallic — building depth and dimension. Work is coordinated around your schedule.' },
        { name: 'Final Review', desc: 'Once complete, Misha reviews the finished pattern with you. The result is an elegant decorative surface that adds architectural interest and refined detail to your space.' },
      ],
    },
    trust: {
      heading: 'Why Choose Misha for Modello Stencils',
      points: [
        '25+ years of decorative stencil experience in Houston',
        'Every stencil hand-applied by the artist personally',
        'Physical samples with your chosen finish before work begins',
        'Can be combined with Venetian plaster, faux finishes, or metallic glazes',
        'Serving River Oaks, Memorial, Tanglewood, West University, The Woodlands, and Bellaire',
      ],
    },
    extraFaqs: [
      { question: 'What are Modello stencils?', answer: 'Modello stencils are precision-cut decorative stencils used to create elegant repeating patterns and designs on walls, ceilings, and architectural details. Misha applies them by hand with multiple layers of finish for a refined, dimensional result.' },
      { question: 'Where do Modello stencils work best?', answer: 'Modello stencils are ideal for accent walls, ceiling borders, entryways, powder rooms, dining rooms, and architectural details like column wraps and niches. They add dimension and pattern to any surface.' },
      { question: 'Can stencils be combined with other finishes?', answer: 'Yes. Misha often combines Modello stencils with Venetian plaster, faux finishes, or metallic glazes for a layered, multi-dimensional effect. She discusses combination options during the consultation.' },
      { question: 'How long does a stencil project take?', answer: 'Timeline depends on the scope and complexity of the pattern. Most stencil projects take 1-2 weeks from design approval to completion. Misha coordinates around your schedule.' },
      { question: 'Does Misha serve my area for stencil work?', answer: 'Misha serves Houston\'s finest neighborhoods including River Oaks, Memorial, Tanglewood, West University, The Woodlands, and Bellaire. Call (281) 650-0500 for a complimentary consultation.' },
    ],
    relatedServices: [
      { slug: 'faux-specialty-finishes', label: 'Faux & Specialty Finishes' },
      { slug: 'venetian-lime-plaster', label: 'Venetian Lime Plaster' },
    ],
    areaContext: 'Misha has applied Modello stencil designs in homes across River Oaks, Memorial, Tanglewood, West University, The Woodlands, and Bellaire.',
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
  /* ─── 004A / 013B area-page enrichment fields ─── */
  extraFaqs?: { question: string; answer: string }[]
  nearbyAreas?: { slug: string; name: string }[]
  trustPoints?: string[]
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
    extraFaqs: [
      { question: 'What services does Misha offer in River Oaks?', answer: 'Misha offers all 8 luxury decorative painting services in River Oaks: Luxury Wall Murals, Venetian Lime Plaster, Trompe L\'Oeil & Architectural Illusions, Children\'s Themed Rooms, Themed Rooms & Skyscapes, Decorative Ceilings, Faux & Specialty Finishes, and Modello Stencils.' },
      { question: 'How do I start a project in River Oaks?', answer: 'Call (281) 650-0500 or submit a project inquiry online. Misha will arrange a complimentary in-home consultation at your River Oaks residence.' },
      { question: 'Does Misha provide in-home consultations in River Oaks?', answer: 'Yes. Misha personally visits every River Oaks home for consultation. The visit is complimentary with no obligation.' },
    ],
    nearbyAreas: [{ slug: 'memorial', name: 'Memorial' }, { slug: 'tanglewood', name: 'Tanglewood' }, { slug: 'west-university', name: 'West University' }],
    trustPoints: ['25+ years of museum-quality artistry in Houston', 'Every finish hand-applied by the artist personally', 'Complimentary in-home consultation', 'Serving Houston\'s finest neighborhoods'],
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
    extraFaqs: [
      { question: 'What services does Misha offer in Memorial?', answer: 'Misha offers all 8 luxury decorative painting services in Memorial: Luxury Wall Murals, Venetian Lime Plaster, Trompe L\'Oeil & Architectural Illusions, Children\'s Themed Rooms, Themed Rooms & Skyscapes, Decorative Ceilings, Faux & Specialty Finishes, and Modello Stencils.' },
      { question: 'How do I start a project in Memorial?', answer: 'Call (281) 650-0500 or submit a project inquiry online. Misha will arrange a complimentary in-home consultation at your Memorial home.' },
      { question: 'Does Misha provide in-home consultations in Memorial?', answer: 'Yes. Misha personally visits every Memorial home for consultation. The visit is complimentary with no obligation.' },
    ],
    nearbyAreas: [{ slug: 'river-oaks-luxury-murals', name: 'River Oaks' }, { slug: 'tanglewood', name: 'Tanglewood' }, { slug: 'bellaire', name: 'Bellaire' }],
    trustPoints: ['25+ years of museum-quality artistry in Houston', 'Every finish hand-applied by the artist personally', 'Complimentary in-home consultation', 'Serving Houston\'s finest neighborhoods'],
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
    extraFaqs: [
      { question: 'What services does Misha offer in Tanglewood?', answer: 'Misha offers all 8 luxury decorative painting services in Tanglewood including Venetian Lime Plaster, Faux & Specialty Finishes, Luxury Wall Murals, and more.' },
      { question: 'How do I start a project in Tanglewood?', answer: 'Call (281) 650-0500 or submit a project inquiry online. Misha will arrange a complimentary in-home consultation.' },
      { question: 'Does Misha provide in-home consultations in Tanglewood?', answer: 'Yes. Misha personally visits every Tanglewood home for consultation at no charge.' },
    ],
    nearbyAreas: [{ slug: 'river-oaks-luxury-murals', name: 'River Oaks' }, { slug: 'memorial', name: 'Memorial' }, { slug: 'west-university', name: 'West University' }, { slug: 'bellaire', name: 'Bellaire' }],
    trustPoints: ['25+ years of museum-quality artistry in Houston', 'Every finish hand-applied by the artist personally', 'Complimentary in-home consultation', 'Serving Houston\'s finest neighborhoods'],
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
    extraFaqs: [
      { question: 'What services does Misha offer in West University?', answer: 'Misha offers all 8 luxury decorative painting services in West University including Children\'s Themed Rooms, Luxury Wall Murals, and custom decorative finishes.' },
      { question: 'How do I start a project in West University?', answer: 'Call (281) 650-0500 or submit a project inquiry online. Misha will arrange a complimentary in-home consultation.' },
      { question: 'Does Misha provide in-home consultations in West University?', answer: 'Yes. Misha personally visits every West University home for consultation at no charge.' },
    ],
    nearbyAreas: [{ slug: 'river-oaks-luxury-murals', name: 'River Oaks' }, { slug: 'memorial', name: 'Memorial' }, { slug: 'bellaire', name: 'Bellaire' }, { slug: 'tanglewood', name: 'Tanglewood' }],
    trustPoints: ['25+ years of museum-quality artistry in Houston', 'Every finish hand-applied by the artist personally', 'Complimentary in-home consultation', 'Serving Houston\'s finest neighborhoods'],
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
    extraFaqs: [
      { question: 'What services does Misha offer in The Woodlands?', answer: 'Misha offers all 8 luxury decorative painting services in The Woodlands including Themed Rooms & Skyscapes, Decorative Ceilings, and custom wall murals.' },
      { question: 'How do I start a project in The Woodlands?', answer: 'Call (281) 650-0500 or submit a project inquiry online. Misha will travel to The Woodlands for a complimentary in-home consultation.' },
      { question: 'Does Misha travel to The Woodlands for consultations?', answer: 'Yes. Misha regularly travels to The Woodlands for consultations and project work. The consultation is complimentary with no obligation.' },
    ],
    nearbyAreas: [{ slug: 'memorial', name: 'Memorial' }, { slug: 'tanglewood', name: 'Tanglewood' }, { slug: 'bellaire', name: 'Bellaire' }],
    trustPoints: ['25+ years of museum-quality artistry in Houston', 'Every finish hand-applied by the artist personally', 'Complimentary in-home consultation — travels to The Woodlands', 'Serving Houston\'s finest neighborhoods'],
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
    extraFaqs: [
      { question: 'What services does Misha offer in Bellaire?', answer: 'Misha offers all 8 luxury decorative painting services in Bellaire including Faux & Specialty Finishes, Luxury Wall Murals, Venetian Plaster, and more.' },
      { question: 'How do I start a project in Bellaire?', answer: 'Call (281) 650-0500 or submit a project inquiry online. Misha will arrange a complimentary in-home consultation at your Bellaire home.' },
      { question: 'Does Misha provide in-home consultations in Bellaire?', answer: 'Yes. Misha personally visits every Bellaire home for consultation at no charge.' },
    ],
    nearbyAreas: [{ slug: 'west-university', name: 'West University' }, { slug: 'memorial', name: 'Memorial' }, { slug: 'tanglewood', name: 'Tanglewood' }, { slug: 'river-oaks-luxury-murals', name: 'River Oaks' }],
    trustPoints: ['25+ years of museum-quality artistry in Houston', 'Every finish hand-applied by the artist personally', 'Complimentary in-home consultation', 'Serving Houston\'s finest neighborhoods'],
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
