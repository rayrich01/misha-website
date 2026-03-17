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
    metaTitle: 'Hand Painted Wall Murals Houston | Custom Luxury Murals | Misha Creations',
    metaDescription: 'Bespoke hand-painted wall murals for Houston\'s finest homes. River Oaks, Memorial, Tanglewood. Each mural site-specific — scaled to your elevations, approved before brushwork begins.',
    h1: 'Luxury Wall Murals in Houston',
  },
  {
    slug: 'venetian-lime-plaster',
    categoryId: 'venetian-plaster',
    title: 'Venetian Lime Plaster',
    metaTitle: 'Venetian Plaster Houston | Grassello Lime Plaster | Misha Creations',
    metaDescription: 'Master-applied Venetian plaster, grassello, and marmorino in Houston. River Oaks, Memorial, Tanglewood. 25 years. Trained by Nicola Vigini. Free consultation.',
    h1: 'Venetian Lime Plaster in Houston',
  },
  {
    slug: 'trompe-loeil-architectural-illusions',
    categoryId: 'trompe-loeil',
    title: "Trompe L'Oeil & Architectural Illusions",
    metaTitle: "Trompe L'Oeil Houston | Architectural Illusion Murals | Misha Creations",
    metaDescription: "Houston's trompe l'oeil specialist. Painted architectural illusions, faux libraries, sky ceilings, and dimensional wall art. River Oaks, Memorial. 25 years. Trained by Nicola Vigini.",
    h1: "Trompe L'Oeil & Architectural Illusions in Houston",
  },
  {
    slug: 'childrens-themed-rooms',
    categoryId: 'childrens-rooms',
    title: "Children's Themed Rooms",
    metaTitle: "Children's Room Murals Houston | Themed Nursery & Playroom Art | Misha Creations",
    metaDescription: "Hand-painted children's room murals, nurseries, and themed playrooms in Houston. Non-toxic materials, durable finishes. Disney-quality artistry. River Oaks, Memorial.",
    h1: "Children's Themed Room Murals in Houston",
  },
  {
    slug: 'themed-rooms-skyscapes',
    categoryId: 'themed-rooms',
    title: 'Themed Rooms & Skyscapes',
    metaTitle: 'Themed Rooms & Skyscapes Houston | Immersive Interiors | Misha Creations',
    metaDescription: 'Full-envelope themed rooms and skyscape murals in Houston. Continuous horizons, sky and cloud rooms, immersive painted environments. River Oaks, Memorial. 25 years.',
    h1: 'Themed Rooms & Skyscapes in Houston',
  },
  {
    slug: 'decorative-ceilings',
    categoryId: 'decorative-ceilings',
    title: 'Decorative Ceilings',
    metaTitle: 'Decorative Ceiling Painting Houston | Sky Murals & Ceiling Art | Misha Creations',
    metaDescription: "Hand-painted decorative ceilings in Houston. Sky murals, cloud scenes, trompe l'oeil domes, coffered ceiling finishes. River Oaks, Memorial. 25 years. Free consultation.",
    h1: 'Decorative Ceiling Painting in Houston',
  },
  {
    slug: 'faux-specialty-finishes',
    categoryId: 'faux-finishes',
    title: 'Faux & Specialty Finishes',
    metaTitle: 'Faux Finishes Houston | Decorative Painting | Faux Marble & Stone | Misha Creations',
    metaDescription: 'Master decorative painter in Houston specializing in faux marble, faux stone, Venetian plaster, and specialty wall finishes. River Oaks, Memorial, Tanglewood. 25 years.',
    h1: 'Luxury Faux & Specialty Finishes in Houston',
  },
  {
    slug: 'modello-stencils',
    categoryId: 'modello-stencils',
    title: 'Modello Stencils',
    metaTitle: 'Modello Stencils Houston | Custom Decorative Stenciling | Misha Creations',
    metaDescription: 'Luxury modello stenciling and ornamental decorative painting in Houston. Custom plaster medallions, border work, ceiling details. River Oaks, Memorial. 25 years.',
    h1: 'Modello & Decorative Stencils in Houston',
  },
  {
    slug: 'faux-painting-houston',
    categoryId: 'faux-finishes',
    title: 'Faux Painting Houston',
    metaTitle: 'Faux Painting Houston | Master Decorative Painter | Misha Creations',
    metaDescription: 'Luxury faux painting in Houston by a master decorative artist with 25 years experience. Faux marble, stone, aged plaster, metallic finishes. River Oaks, Memorial, Tanglewood.',
    h1: 'Faux Painting in Houston',
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
  'wall-murals': 'Every mural begins with your architecture. Misha Creations designs and executes hand-painted wall murals scaled precisely to your elevations \u2014 no digital prints, no wallpaper. Sketch approval before a single brush touches your wall. From intimate dining room panoramas to grand two-story entry installations, each piece is a commission built around your home\u2019s proportions, light, and design intent. The studio has completed residential murals throughout Houston\u2019s luxury neighborhoods and large-scale commercial installations including the Houston Zoo and Rainforest Cafe.',
  'venetian-plaster': 'Authentic lime-based Venetian plaster \u2014 grassello, marmorino, and stucco veneziano \u2014 applied by a master craftsman trained in the Italian tradition. Misha Creations has transformed walls in River Oaks estates, Memorial homes, and Tanglewood renovations for over 25 years. Each application is site-specific: color developed to your lighting, burnish level calibrated to your architecture. No shortcuts, no acrylic substitutes when lime is specified.',
  'trompe-loeil': 'Trompe l\u2019oeil \u2014 the art of deceiving the eye \u2014 is among the most technically demanding of all decorative arts. Misha Creations executes architectural illusions that transform flat walls into colonnaded galleries, painted bookcases into apparent libraries, ceilings into open skies, and plain surfaces into marble relief. The technique requires mastery of perspective, light behavior, and architectural proportion. Every composition is designed to read correctly from the specific viewing angles of your space. Misha\u2019s trompe l\u2019oeil training under master decorative artist Nicola Vigini gives this work a pedigree few Houston artists can match.',
  'childrens-rooms': 'A child\u2019s room is the first environment that shapes their imagination. Misha Creations designs and executes hand-painted themed rooms, nursery murals, and full-envelope playroom environments \u2014 from enchanted forests and underwater worlds to storybook characters and outer space adventures. All materials used in children\u2019s spaces are non-toxic and child-safe. Finishes are durable and cleanable. The studio has executed children\u2019s room environments for Houston families in River Oaks, Memorial, and Tanglewood with the same artistry applied to grand estate work.',
  'themed-rooms': 'The most ambitious of all decorative arts \u2014 a room that becomes a complete world. Misha Creations designs and executes full-envelope themed environments where walls, ceiling, and architectural transitions disappear into a single continuous painted scene. Skyscape rooms dissolve the ceiling into open sky with rolling clouds that continue seamlessly onto the walls. Garden rooms open the space to painted terraces and distant landscapes. These immersive environments are the defining work of a master decorative artist \u2014 the kind of spaces that stop visitors mid-step. Misha has executed themed environments for residential and commercial clients including the Houston Zoo and Rainforest Cafe.',
  'decorative-ceilings': 'The fifth wall deserves the same attention as any other surface in a distinguished interior. Misha Creations specializes in decorative ceiling treatments for Houston homes \u2014 from classic blue sky and cloud scenes for entries and breakfast rooms to trompe l\u2019oeil architectural domes, gilded coffered panels, aged fresco treatments, and modello ornamental work. All ceiling projects are scaffold-coordinated and site-measured. Compositions are designed to read correctly from the primary viewing positions in your room.',
  'faux-finishes': 'Specialty faux finishes for Houston\u2019s most discerning interiors. Faux Carrara marble for powder rooms and entry halls. Faux travertine for kitchen niches and fireplace surrounds. Aged fresco effects for dining rooms. Metallic treatments for contemporary great rooms. Each finish is developed on-site with sample board approval before application \u2014 you see exactly what you are commissioning before it goes on the wall.',
  'modello-stencils': 'Modello stencils are professional-grade, adhesive-backed masking stencils used to create precise ornamental work with plaster, metallic compounds, and specialty coatings. Unlike craft stencils, modello systems allow master finishers to execute architectural ornament \u2014 ceiling medallions, frieze borders, entry hall details, fireplace surrounds \u2014 with the crispness of carved plasterwork at a fraction of the cost and time. Misha Creations uses the Modello system for custom residential and commercial ornamental projects throughout Houston.',
}

export interface FaqItem {
  question: string
  answer: string
}

/** Per-category FAQ content — keyword-optimized, March 2025 competitive research */
export const FINISH_FAQS: Record<string, FaqItem[]> = {
  'wall-murals': [
    {
      question: 'How much do hand-painted wall murals cost in Houston?',
      answer: 'Custom hand-painted murals in Houston start at $25 per square foot for illustrative compositions and range to $75+ per square foot for photorealistic trompe l\u2019oeil, architectural illusions, and large-scale panoramic work. Ceiling height, site access, and composition complexity affect pricing. All quotes include design sketch approval before work begins.',
    },
    {
      question: 'How long does a custom mural take to complete?',
      answer: 'A single-wall residential mural typically takes 3\u20137 days on-site depending on size and complexity. Large-scale panoramic rooms or multi-surface installations may take 2\u20134 weeks. Timeline is confirmed in your written proposal after site review.',
    },
    {
      question: 'Do you paint murals in River Oaks and Memorial?',
      answer: 'Yes. Misha Creations has completed custom wall murals throughout River Oaks, Memorial, Tanglewood, Bellaire, West University, The Heights, and The Woodlands. We are familiar with the architectural character of Houston\u2019s luxury neighborhoods.',
    },
    {
      question: 'Can a mural be painted on a ceiling?',
      answer: 'Yes. Decorative ceiling murals \u2014 from sky and cloud scenes to architectural trompe l\u2019oeil and botanical canopies \u2014 are a specialty. Scaffold-coordinated, site-measured, and designed to respond to your room\u2019s specific viewing angles and lighting conditions.',
    },
  ],
  'venetian-plaster': [
    {
      question: 'How much does Venetian plaster cost in Houston?',
      answer: 'Authentic lime-based Venetian plaster in Houston runs $15\u2013$45 per square foot installed, depending on the plaster type (grassello, marmorino, stucco veneziano), finish level (matte to high-polish burnish), and surface preparation required. Textured walls require skim-coating first, adding $3\u2013$8/sqft. Misha Creations provides written proposals after a site consultation.',
    },
    {
      question: 'What is the difference between Venetian plaster, Roman clay, and limewash?',
      answer: 'Venetian plaster (stucco veneziano, grassello) is applied in multiple thin layers and burnished to create depth and a marble-like sheen. Roman clay is a softer matte finish with a velvety texture. Limewash is a diluted lime wash for aged, organic walls. All three are lime-based and breathable. The right choice depends on your architecture and desired light behavior.',
    },
    {
      question: 'How long does Venetian plaster last in Houston\u2019s humidity?',
      answer: 'Properly applied lime-based Venetian plaster lasts 20\u201330 years or longer in Houston\u2019s humid climate. Lime is naturally breathable and mold-resistant \u2014 better suited to Gulf Coast conditions than gypsum or acrylic-based alternatives. Correct surface preparation and sealing are critical to longevity.',
    },
    {
      question: 'Do you serve River Oaks, Memorial, and Tanglewood for Venetian plaster?',
      answer: 'Yes. Misha Creations has completed Venetian plaster projects throughout River Oaks, Memorial, Tanglewood, West University, Bellaire, The Heights, and The Woodlands. We serve the greater Houston luxury residential and commercial market.',
    },
    {
      question: 'What is marmorino and how is it different from Venetian plaster?',
      answer: 'Marmorino is a type of Venetian plaster with a higher marble dust content, producing a softer stone-like texture and satin sheen rather than the high-gloss mirror polish of traditional burnished grassello. It is ideal for spaces where you want depth and luxury without strong reflectivity.',
    },
  ],
  'trompe-loeil': [
    {
      question: 'What is trompe l\u2019oeil and how is it used in Houston homes?',
      answer: 'Trompe l\u2019oeil (French: \u2018to fool the eye\u2019) is a painting technique that creates photorealistic three-dimensional illusions on flat surfaces. In Houston homes, it is most commonly applied to: powder room walls painted as formal gardens or stone grottos, study walls as painted bookcases or map rooms, children\u2019s rooms with immersive scenes, entry halls with architectural colonnades, and ceilings as open sky or domed frescoes.',
    },
    {
      question: 'How much does trompe l\u2019oeil cost in Houston?',
      answer: 'Trompe l\u2019oeil murals are quoted by composition and site complexity, not per square foot. A single-wall powder room illusion typically ranges $4,000\u2013$12,000. A full-room architectural treatment with multiple walls and ceiling integration is a significant commission \u2014 pricing is provided after a site consultation and design brief.',
    },
    {
      question: 'Who in Houston specializes in trompe l\u2019oeil?',
      answer: 'Misha Creations is Houston\u2019s dedicated trompe l\u2019oeil specialist with 25 years of experience and master-level training under Nicola Vigini. The studio has executed illusionistic work in River Oaks estates, Memorial homes, and large commercial installations in Houston and beyond.',
    },
  ],
  'childrens-rooms': [
    {
      question: 'Are the paints and finishes safe for children\u2019s rooms?',
      answer: 'Yes. All products used in children\u2019s spaces are selected for zero-VOC or low-VOC content and child safety. We use professional-grade paints and finishes that are non-toxic after cure, cleanable, and durable for the wear patterns of active children\u2019s environments.',
    },
    {
      question: 'Can you paint a full-room themed environment for a child\u2019s room?',
      answer: 'Yes. Full-envelope themed environments \u2014 where all four walls and potentially the ceiling create a single continuous scene \u2014 are a specialty of Misha Creations. These immersive rooms transport children into entirely other worlds. Themes are custom-designed around your child\u2019s interests and your room\u2019s architecture.',
    },
    {
      question: 'How long does a children\u2019s room mural take?',
      answer: 'A single-wall nursery mural typically takes 2\u20134 days. A full-room themed environment takes 5\u201310 days depending on scope. We coordinate timing to minimize disruption to your family\u2019s schedule.',
    },
  ],
  'themed-rooms': [
    {
      question: 'What is a skyscape room and how does it work?',
      answer: 'A skyscape room is a full-envelope painted environment where the ceiling transitions seamlessly into the upper walls, creating the illusion that the room is open to the sky. The horizon line is placed based on the viewer\u2019s eye level in the specific room. Dawn, midday, dusk, night sky, and cloud-draped scenes are all options. The effect requires precise perspective work to read naturally from multiple positions within the room.',
    },
    {
      question: 'Are themed rooms only for children\u2019s spaces?',
      answer: 'No. While children\u2019s rooms are a common application, full-envelope themed environments are equally appropriate for primary bedrooms, sunrooms, breakfast rooms, home theaters, wine cellars, and hospitality spaces. Misha Creations has executed themed environments for adult residential clients and commercial venues including the Houston Zoo and Rainforest Cafe.',
    },
    {
      question: 'How much does a full-room themed environment cost?',
      answer: 'Full-envelope themed rooms are complex commissions that are quoted by project after a site consultation and design brief. The scope varies widely \u2014 a bedroom skyscape differs significantly in scope from a commercial environment. Contact Misha Creations for a consultation.',
    },
  ],
  'decorative-ceilings': [
    {
      question: 'What types of decorative ceilings do you paint in Houston?',
      answer: 'Misha Creations executes: sky and cloud murals (blue sky, dawn, dusk, night sky), trompe l\u2019oeil architectural domes and coffered illusions, frescoed ceiling panels, gilded and metallic ceiling treatments, modello and stencil ornamental work, and full ceiling murals for entries, dining rooms, and primary bedrooms.',
    },
    {
      question: 'How much does a painted ceiling cost in Houston?',
      answer: 'Ceiling mural pricing depends on room size, ceiling height, and composition complexity. A powder room or breakfast room sky ceiling (typically 80\u2013150 sqft) ranges $2,500\u2013$6,000. A grand two-story entry with a full panoramic scene or trompe l\u2019oeil dome is a major commission \u2014 pricing is provided after site consultation.',
    },
    {
      question: 'How do you access high ceilings for painting?',
      answer: 'Misha Creations works with professional scaffold systems for all ceiling heights above standard ladder reach. Scaffold setup and breakdown is coordinated around your household schedule and is included in the project timeline.',
    },
  ],
  'faux-finishes': [
    {
      question: 'What faux finishes do you specialize in Houston?',
      answer: 'Misha Creations specializes in faux marble (Carrara, Calacatta, Nero Marquina), faux travertine and limestone, aged fresco, Venetian plaster, metallic finishes, glazed surfaces, and custom decorative painting. Each technique is applied with sample board approval before work begins.',
    },
    {
      question: 'How is a luxury faux finish different from standard decorative painting?',
      answer: 'Luxury faux finishes are executed in multiple layers \u2014 typically 3\u20137 coats \u2014 with each layer developed, adjusted, and approved against the actual lighting conditions of your space. The materials are professional-grade (San Marco, Kale Lime, Portola), not hardware store products. The result is a surface with genuine depth that improves with age.',
    },
    {
      question: 'Can faux finishes be applied to ceilings and millwork?',
      answer: 'Yes. Faux finishes are not limited to flat walls. Coffered ceilings, crown molding, fireplace surrounds, columns, and architectural millwork all benefit from decorative treatment. Misha Creations routinely executes multi-surface projects where every architectural element receives a coordinated finish.',
    },
  ],
  'modello-stencils': [
    {
      question: 'What are modello stencils and how are they used?',
      answer: 'Modello stencils are professional adhesive masking systems used to create raised or painted ornamental work on walls and ceilings. Applied with plaster compounds, Venetian plaster, or specialty paints, they produce results that replicate carved architectural detail. Common applications include ceiling medallions, entry hall friezes, fireplace surrounds, and border work.',
    },
    {
      question: 'Can modello stenciling be combined with Venetian plaster?',
      answer: 'Yes \u2014 combining modello stenciling with Venetian plaster backgrounds is a signature Misha Creations technique. The plaster provides the base surface and color depth; the modello work adds dimensional ornament. The combination is most effective in formal rooms \u2014 dining rooms, studies, primary bedrooms, and grand entries.',
    },
    {
      question: 'Do you do modello stencil work in River Oaks and Memorial?',
      answer: 'Yes. Misha Creations has completed modello and ornamental stencil projects throughout River Oaks, Memorial, Tanglewood, and West University. We serve Houston\u2019s luxury residential market with this specialty service.',
    },
  ],
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
