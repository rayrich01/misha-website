import type { Metadata } from 'next'
import Link from 'next/link'
import { FINISH_SURFACES, NEIGHBORHOODS, COPY } from '@/lib/constants'
import { FaqAccordion } from '@/components/FaqAccordion'
import { CtaSection } from '@/components/CtaSection'
import { JsonLd } from '@/components/JsonLd'

export const metadata: Metadata = {
  title: 'The Complete Guide to Decorative Painting for Houston Homes',
  description:
    'Explore 8 types of decorative painting for Houston luxury homes — from Venetian plaster and wall murals to faux finishes and trompe l\'oeil. By an artist with 25+ years of experience.',
  alternates: {
    canonical: 'https://mishacreations.com/blog/guide-to-decorative-painting-houston',
  },
  openGraph: {
    title: 'The Complete Guide to Decorative Painting for Houston Homes | Misha Creations',
    description:
      'Explore 8 types of decorative painting for Houston luxury homes — from Venetian plaster and wall murals to faux finishes and trompe l\'oeil.',
    url: 'https://mishacreations.com/blog/guide-to-decorative-painting-houston',
    type: 'article',
  },
}

const SERVICE_DESCRIPTIONS: Record<string, string> = {
  'luxury-wall-murals': 'Custom hand-painted murals for walls, ceilings, and architectural features. From classical landscapes to contemporary designs, each mural is one-of-a-kind.',
  'venetian-lime-plaster': 'Authentic lime-based plaster applied by hand in multiple thin layers and polished for depth and luminosity. Traditional Italian technique with over 25 years of Houston expertise.',
  'trompe-loeil-architectural-illusions': 'Classical painting technique creating realistic three-dimensional illusions on flat surfaces — faux niches, columns, stone detailing, and architectural molding.',
  'childrens-themed-rooms': 'Custom themed room murals for nurseries, playrooms, and bedrooms. Every design is one-of-a-kind and painted with low-VOC, child-safe materials.',
  'themed-rooms': 'Immersive hand-painted environments — wine cellars, media rooms, Mediterranean retreats, and custom themed spaces.',
  'skyscapes-celestial': 'Hand-painted sky ceiling murals, celestial scenes, galaxies, and atmospheric cloud environments.',
  'decorative-ceilings': 'Sky murals, frescoed medallions, gilded finishes, and ornamental ceiling treatments that add drama and dimension overhead.',
  'faux-specialty-finishes': 'Custom faux and specialty treatments — faux stone, aged leather, brushed metals, metallic glazes, and textured accent walls.',
  'modello-stencils': 'Elegant precision-cut stencil designs applied by hand for walls, ceilings, and architectural details.',
}

const articleFaq = [
  {
    question: 'What is decorative painting?',
    answer:
      'Decorative painting transforms walls, ceilings, and architectural surfaces using artistic techniques like Venetian plaster, hand-painted murals, faux finishes, trompe l\'oeil, and stencil work. It adds depth, texture, and character that standard paint cannot achieve.',
  },
]

export default function DecorativePaintingGuide() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'The Complete Guide to Decorative Painting for Houston Homes',
    author: { '@type': 'Person', name: 'Misha', jobTitle: 'Decorative Artist', worksFor: { '@type': 'LocalBusiness', name: 'Misha Creations' } },
    publisher: { '@type': 'LocalBusiness', name: 'Misha Creations', url: 'https://mishacreations.com' },
    datePublished: '2026-03-26',
  }

  return (
    <>
      <JsonLd data={articleSchema} />

      {/* Hero */}
      <section className="bg-ink pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <p className="font-body text-xs uppercase tracking-[0.18em] text-gold mb-6">Complete Guide</p>
          <h1 className="font-display text-[36px] md:text-[52px] text-cream mb-4 leading-tight">
            The Complete Guide to Decorative Painting for Houston Homes
          </h1>
          <p className="font-body text-mist">By Misha &middot; 25+ Years of Decorative Painting Expertise</p>
        </div>
      </section>

      <article className="py-16 md:py-24 bg-warm">
        <div className="max-w-3xl mx-auto px-5 space-y-12">

          {/* What Is */}
          <section>
            <h2 className="font-editorial text-2xl md:text-3xl text-cream mb-6">What Is Decorative Painting?</h2>
            <p className="font-body text-lg leading-relaxed text-mist mb-4">
              Decorative painting transforms walls, ceilings, and architectural surfaces using artistic techniques that go far beyond standard paint. Where a regular paint job applies a single uniform color, decorative painting uses multiple layers, hand-applied artistic techniques, and specialty materials to create finishes with depth, luminosity, and texture. Each surface becomes a one-of-a-kind work of art.
            </p>
            <p className="font-body text-lg leading-relaxed text-mist">
              The category encompasses a wide range of techniques — from authentic Venetian plaster and hand-painted murals to faux finishes, trompe l&apos;oeil illusions, decorative ceilings, and stencil work. Misha Creations offers 8 distinct decorative painting services, each hand-applied by the artist personally.
            </p>
          </section>

          {/* 8 Types */}
          <section>
            <h2 className="font-editorial text-2xl md:text-3xl text-cream mb-8">8 Types of Decorative Painting Services</h2>
            <div className="space-y-6">
              {FINISH_SURFACES.map((f) => (
                <div key={f.slug} className="border border-muted/30 rounded-lg p-6">
                  <h3 className="font-editorial text-lg text-cream mb-2">
                    <Link href={`/services/${f.slug}`} className="hover:text-gold transition-colors">
                      {f.title}
                    </Link>
                  </h3>
                  <p className="font-body text-mist leading-relaxed">
                    {SERVICE_DESCRIPTIONS[f.slug] || `Custom ${f.title.toLowerCase()} by Misha Creations.`}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* How It Works */}
          <section>
            <h2 className="font-editorial text-2xl md:text-3xl text-cream mb-6">How Decorative Painting Works</h2>
            <p className="font-body text-lg leading-relaxed text-mist mb-4">
              Every decorative painting project follows a structured process designed around your home and vision. It begins with a complimentary in-home consultation where Misha studies the space, light, and architecture. She then creates physical finish samples or design renderings for your approval. Once approved, the finish is hand-applied on-site by Misha personally, coordinated around your schedule. Most projects take 1-3 weeks from design approval to completion.
            </p>
            <p className="font-body text-mist">
              <Link href="/process" className="text-gold hover:text-goldf transition-colors">Learn more about Misha&apos;s full process &rarr;</Link>
            </p>
          </section>

          {/* What Makes Great */}
          <section>
            <h2 className="font-editorial text-2xl md:text-3xl text-cream mb-6">What Makes a Great Decorative Painting Artist</h2>
            <p className="font-body text-lg leading-relaxed text-mist mb-4">
              The quality of decorative painting depends entirely on the artist&apos;s training, experience, and personal technique. Key factors to consider: formal training in classical techniques, years of hands-on experience, willingness to provide physical samples before work begins, personal execution (not subcontracted labor), and a consultation approach that respects your home&apos;s architecture and lighting.
            </p>
            <p className="font-body text-lg leading-relaxed text-mist">
              Misha has over 25 years of decorative painting experience in Houston. She trained at the Buon Fresco School of Venetian Plastering in Washington D.C. and Nicola Vigini Studios. Her work spans private estates to the Houston Zoo. Every finish is hand-applied by the artist personally.
            </p>
          </section>

          {/* Local */}
          <section>
            <h2 className="font-editorial text-2xl md:text-3xl text-cream mb-6">Decorative Painting in Houston&apos;s Luxury Neighborhoods</h2>
            <p className="font-body text-lg leading-relaxed text-mist">
              Misha serves Houston&apos;s finest neighborhoods including{' '}
              {NEIGHBORHOODS.slice(0, 6).map((n, i) => (
                <span key={n.slug}>
                  <Link href={`/areas/${n.slug}`} className="text-gold hover:text-goldf transition-colors">{n.name}</Link>
                  {i < 5 ? ', ' : '. '}
                </span>
              ))}
              Each neighborhood has its own architectural character, and Misha tailors every finish to complement the home&apos;s style, period, and natural light.
            </p>
          </section>

        </div>
      </article>

      <FaqAccordion faqs={articleFaq} heading="Decorative Painting FAQ" />
      <CtaSection headline="Get Started With Decorative Painting" />
    </>
  )
}
