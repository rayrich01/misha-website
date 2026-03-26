import type { Metadata } from 'next'
import Link from 'next/link'
import { NEIGHBORHOODS, COPY } from '@/lib/constants'
import { FaqAccordion } from '@/components/FaqAccordion'
import { CtaSection } from '@/components/CtaSection'
import { JsonLd } from '@/components/JsonLd'

export const metadata: Metadata = {
  title: 'A Guide to Venetian Lime Plaster for Houston Luxury Homes',
  description:
    'Learn about Venetian lime plaster for Houston luxury homes from an artist trained at the Buon Fresco School with 25+ years of experience. Process, materials, and room ideas.',
  alternates: {
    canonical: 'https://mishacreations.com/blog/guide-to-venetian-lime-plaster-houston',
  },
  openGraph: {
    title: 'A Guide to Venetian Lime Plaster for Houston Luxury Homes | Misha Creations',
    description:
      'Learn about Venetian lime plaster from an artist trained at the Buon Fresco School with 25+ years of Houston experience.',
    url: 'https://mishacreations.com/blog/guide-to-venetian-lime-plaster-houston',
    type: 'article',
  },
}

const articleFaqs = [
  {
    question: 'What is Venetian lime plaster?',
    answer:
      'Venetian lime plaster is an authentic decorative finish made from slaked lime, applied by hand in multiple thin layers, then polished to create depth and luminosity. The technique originated in Italy and produces surfaces that change beautifully with the light.',
  },
  {
    question: 'What is the difference between Venetian plaster and regular plaster?',
    answer:
      'Venetian plaster uses slaked lime applied in multiple thin layers, then polished to create depth and luminosity. Regular plaster is a single-layer functional surface without the artistic finish. The multi-layer technique is what gives Venetian plaster its signature depth and light-catching quality.',
  },
]

export default function VenetianPlasterGuide() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'A Guide to Venetian Lime Plaster for Houston Luxury Homes',
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
          <p className="font-body text-xs uppercase tracking-[0.18em] text-gold mb-6">Guide</p>
          <h1 className="font-display text-[36px] md:text-[52px] text-cream mb-4 leading-tight">
            A Guide to Venetian Lime Plaster for Houston Luxury Homes
          </h1>
          <p className="font-body text-mist">By Misha &middot; 25+ Years of Venetian Plaster Expertise</p>
        </div>
      </section>

      <article className="py-16 md:py-24 bg-warm">
        <div className="max-w-3xl mx-auto px-5 space-y-12">

          {/* What Is */}
          <section>
            <h2 className="font-editorial text-2xl md:text-3xl text-cream mb-6">What Is Venetian Lime Plaster?</h2>
            <p className="font-body text-lg leading-relaxed text-mist mb-4">
              Venetian lime plaster is an authentic, lime-based decorative finish applied by hand in multiple thin layers and polished to create depth, luminosity, and tonal variation unique to each surface. The technique dates back centuries to the Italian masters and produces finishes that change with the light — from soft warmth in the morning to a burnished glow under evening illumination.
            </p>
            <p className="font-body text-lg leading-relaxed text-mist">
              Unlike synthetic alternatives, authentic Venetian plaster uses slaked lime (grassello) as its base, creating a breathable, naturally durable surface that develops character over time. It is one of the most luxurious and timeless decorative finishes available for residential interiors.
            </p>
          </section>

          {/* How It's Applied */}
          <section>
            <h2 className="font-editorial text-2xl md:text-3xl text-cream mb-6">How Venetian Plaster Is Applied</h2>
            <p className="font-body text-lg leading-relaxed text-mist mb-4">
              The application process begins with thorough surface preparation. Multiple thin layers of lime plaster are then hand-applied with specialized trowels, each layer building depth and dimension. Between layers, the surface is carefully smoothed and compressed. The final layer is burnished to the desired sheen — from a soft matte to a high-polish finish that catches and reflects light.
            </p>
            <p className="font-body text-lg leading-relaxed text-mist">
              Misha applies every layer personally using traditional Italian technique refined over 25+ years. She studied at the Buon Fresco School of Venetian Plastering in Washington D.C. and trained with Nicola Vigini, bringing authentic European craftsmanship to every Houston project.
            </p>
          </section>

          {/* Where It Works */}
          <section>
            <h2 className="font-editorial text-2xl md:text-3xl text-cream mb-6">Where Venetian Plaster Works Best in Your Home</h2>
            <p className="font-body text-lg leading-relaxed text-mist">
              Venetian plaster is remarkably versatile. It works beautifully on walls, ceilings, columns, foyers, bathrooms, living rooms, dining rooms, and architectural features. The finish adapts to curved surfaces, niches, and custom shapes — making it ideal for grand foyers, statement walls, and spa-like bathrooms. It is also durable enough for high-traffic areas and moisture-rich spaces when properly sealed.
            </p>
          </section>

          {/* Vs Other Finishes */}
          <section>
            <h2 className="font-editorial text-2xl md:text-3xl text-cream mb-6">Venetian Plaster vs Other Decorative Finishes</h2>
            <p className="font-body text-lg leading-relaxed text-mist">
              Venetian plaster differs from faux finishes and standard paint in fundamental ways. While faux finishes replicate the appearance of materials like stone, metal, or wood through layered paint techniques, Venetian plaster is the real material — authentic lime applied in the traditional manner. Standard paint provides a uniform color layer; Venetian plaster creates genuine depth and dimension that changes with the light. Misha offers both{' '}
              <Link href="/services/venetian-lime-plaster" className="text-gold hover:text-goldf transition-colors">Venetian plaster</Link> and{' '}
              <Link href="/services/faux-specialty-finishes" className="text-gold hover:text-goldf transition-colors">faux finishes</Link> as separate services, each suited to different goals and surfaces.
            </p>
          </section>

          {/* Why Choose Misha */}
          <section>
            <h2 className="font-editorial text-2xl md:text-3xl text-cream mb-6">Why Choose an Artist with Venetian Plaster Training</h2>
            <p className="font-body text-lg leading-relaxed text-mist mb-4">
              Authentic Venetian plaster requires years of hands-on training to apply correctly. The depth, luminosity, and durability of the finish depend entirely on the artist&apos;s technique. Misha trained at the Buon Fresco School of Venetian Plastering in Washington D.C. and at Nicola Vigini Studios — two of the most respected training programs for traditional Italian plaster technique.
            </p>
            <p className="font-body text-lg leading-relaxed text-mist">
              With over 25 years of experience in Houston, she has applied Venetian plaster in homes across{' '}
              {NEIGHBORHOODS.slice(0, 6).map((n, i) => (
                <span key={n.slug}>
                  <Link href={`/areas/${n.slug}`} className="text-gold hover:text-goldf transition-colors">{n.name}</Link>
                  {i < 5 ? ', ' : '. '}
                </span>
              ))}
              Every surface is hand-applied by the artist personally — no subcontractors, no shortcuts.
            </p>
          </section>

          {/* CTA inline */}
          <section className="text-center py-8 border-y border-muted/30">
            <p className="font-editorial text-xl text-cream mb-4">Ready to explore Venetian plaster for your home?</p>
            <p className="font-body text-mist mb-6">
              <Link href="/services/venetian-lime-plaster" className="text-gold hover:text-goldf transition-colors">View our Venetian Plaster service page</Link>{' '}
              or{' '}
              <Link href="/inquire" className="text-gold hover:text-goldf transition-colors">submit a project inquiry</Link>.
            </p>
          </section>

        </div>
      </article>

      <FaqAccordion faqs={articleFaqs} heading="Venetian Plaster FAQ" />
      <CtaSection headline="Start Your Venetian Plaster Project" />
    </>
  )
}
