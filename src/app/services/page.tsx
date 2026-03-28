import type { Metadata } from 'next'
import Link from 'next/link'
import { FINISH_SURFACES, SERVICE_CARD_DESCRIPTIONS, SERVICES_HUB_FAQS, PROCESS_STEPS, COPY } from '@/lib/constants'
import { getPiecesByCategory, getServicesHubPage, getAllServicePages, getSiteGlobals } from '@/lib/queries'
import { SanityImage } from '@/components/SanityImage'
import { CtaSection } from '@/components/CtaSection'
import { FaqAccordion } from '@/components/FaqAccordion'
import { JsonLd } from '@/components/JsonLd'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const hub = await getServicesHubPage().catch(() => null)
  const metaTitle = hub?.seo?.metaTitle || 'Decorative Painting Services Houston | Murals, Plaster & Custom Finishes | Misha Creations'
  const metaDescription = hub?.seo?.metaDescription || 'Explore 8 luxury decorative painting services from Houston\'s premier artist. Venetian plaster, wall murals, trompe l\'oeil, decorative ceilings, faux finishes, and more. 25+ years serving River Oaks, Memorial, and Tanglewood.'

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: { canonical: 'https://mishacreations.com/services' },
    openGraph: { title: metaTitle, description: metaDescription, url: 'https://mishacreations.com/services' },
  }
}

export default async function ServicesPage() {
  const [hub, cmsServices, globals] = await Promise.all([
    getServicesHubPage().catch(() => null),
    getAllServicePages().catch(() => []),
    getSiteGlobals().catch(() => null),
  ])

  // Use CMS service pages if available, fall back to constants
  const services = cmsServices.length > 0
    ? cmsServices.map((s) => ({ slug: s.slug.current, categoryId: s.categoryId, title: s.title, cardDescription: s.cardDescription }))
    : FINISH_SURFACES.map((f) => ({ slug: f.slug, categoryId: f.categoryId, title: f.title, cardDescription: SERVICE_CARD_DESCRIPTIONS[f.categoryId] || '' }))

  const processSteps = globals?.processSteps || PROCESS_STEPS
  const hubFaqs = hub?.hubFaqs || SERVICES_HUB_FAQS
  const trustPoints = hub?.trustPoints || [
    '25+ years of museum-quality artistry in Houston',
    'Every finish hand-applied by the artist personally',
    'Complimentary in-home consultation',
    'Serving River Oaks, Memorial, Tanglewood, West University, The Woodlands, and Bellaire',
  ]
  const socialProof = globals?.socialProofNeighborhoods || [...COPY.socialProof]

  // Fetch one hero piece per category for the cards
  const categoryPieces = await Promise.all(
    services.map(async (s) => {
      const pieces = await getPiecesByCategory(s.categoryId, 1)
      return { service: s, heroImage: pieces[0]?.heroImage }
    })
  )

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    provider: { '@type': 'LocalBusiness', name: 'Misha Creations' },
    serviceType: services.map((s) => s.title),
    areaServed: { '@type': 'City', name: 'Houston', containedInPlace: { '@type': 'State', name: 'Texas' } },
  }

  return (
    <>
      <JsonLd data={serviceSchema} />

      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center justify-center bg-ink">
        <div className="relative z-10 text-center px-5 max-w-4xl mx-auto pt-20">
          <h1 className="font-display text-[42px] leading-[52px] md:text-[58px] md:leading-[68px] text-cream mb-4">
            {hub?.heroHeadline || 'Decorative Painting Services in Houston'}
          </h1>
          <p className="font-body text-lg text-mist max-w-2xl mx-auto">
            {hub?.heroSubtext || "Museum-quality artistry for Houston's most distinguished homes. 25+ years of artistic excellence."}
          </p>
        </div>
      </section>

      {/* Hub Introduction */}
      <section className="py-12 md:py-16 bg-warm">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <p className="font-body text-lg leading-relaxed text-mist">
            {hub?.introText || "Misha Creations offers 8 luxury decorative painting services for Houston's most distinguished homes. With 25+ years of museum-quality artistry, Misha hand-applies every finish personally — from Venetian lime plaster and wall murals to trompe l'oeil, decorative ceilings, faux finishes, and more. Each project begins with a complimentary in-home consultation where Misha studies your space, light, and vision."}
          </p>
        </div>
      </section>

      {/* Service Cards */}
      <section className="py-16 md:py-24 bg-ink">
        <div className="max-w-7xl mx-auto px-5">
          <h2 className="font-display text-3xl md:text-4xl text-center text-cream mb-12">
            Our {services.length} Luxury Decorative Painting Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryPieces.map(({ service, heroImage }) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group relative aspect-[3/4] rounded-lg overflow-hidden shadow-md"
              >
                {heroImage && (
                  <SanityImage
                    image={heroImage}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
                {!heroImage && <div className="absolute inset-0 bg-ink" />}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-editorial text-lg text-white">{service.title}</h3>
                  {service.cardDescription && (
                    <p className="font-body text-sm text-white/70 mt-1">{service.cardDescription}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Block */}
      <section className="py-16 md:py-20 bg-warm">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <h2 className="font-display text-3xl md:text-4xl text-cream mb-8">
            {hub?.trustHeading || 'Why Choose Misha Creations'}
          </h2>
          <ul className="space-y-3 text-left max-w-xl mx-auto">
            {trustPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-gold mt-1 flex-shrink-0">&#10003;</span>
                <span className="font-body text-mist">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Process Summary */}
      <section className="py-16 md:py-20 bg-ink">
        <div className="max-w-3xl mx-auto px-5">
          <h2 className="font-display text-3xl md:text-4xl text-center text-cream mb-12">
            {hub?.processHeading || 'How It Works'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {processSteps.map((step) => (
              <div key={step.step} className="border border-muted/30 rounded-lg p-6">
                <p className="font-body text-xs uppercase tracking-widest text-gold mb-2">Step {step.step}</p>
                <h3 className="font-editorial text-lg text-cream mb-2">{step.name}</h3>
                <p className="font-body text-mist leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hub FAQs */}
      <FaqAccordion faqs={hubFaqs} heading="Decorative Painting FAQ" />

      {/* Area Links */}
      <section className="py-10 bg-warm">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <p className="font-body text-xs uppercase tracking-widest text-muted mb-4">Serving Houston&apos;s Finest Neighborhoods</p>
          <div className="flex flex-wrap justify-center gap-3">
            {socialProof.map((area) => (
              <span key={area} className="font-body text-sm text-mist/70">{area}</span>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        headline="Start Your Decorative Painting Project"
        body="Call today for a complimentary consultation. Misha will visit your home, study the light and architecture, and show you what is possible."
      />
    </>
  )
}
