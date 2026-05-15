import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { FINISH_MAP, FINISH_SURFACES, FINISH_DESCRIPTIONS, SERVICE_ENRICHMENT, SUPPRESS_VISIBLE_IMAGE_TITLES } from '@/lib/constants'
import { getPiecesByCategory, getFinishCategory, getServicePage, getAllServiceSlugs } from '@/lib/queries'
import { SanityImage } from '@/components/SanityImage'
import { FaqAccordion } from '@/components/FaqAccordion'
import { CtaSection } from '@/components/CtaSection'
import { JsonLd } from '@/components/JsonLd'

export const revalidate = 60

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const cmsSlugs = await getAllServiceSlugs().catch(() => [])
  if (cmsSlugs.length > 0) return cmsSlugs.map((s) => ({ slug: s }))
  return FINISH_SURFACES.map((f) => ({ slug: f.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const cms = await getServicePage(slug).catch(() => null)
  const finish = cms || FINISH_MAP[slug]
  if (!finish) return notFound()

  const metaTitle = cms ? cms.seo.metaTitle : (finish as typeof FINISH_MAP[string]).metaTitle
  const metaDescription = cms ? cms.seo.metaDescription : (finish as typeof FINISH_MAP[string]).metaDescription

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: {
      canonical: `https://mishacreations.com/services/${slug}`,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: `https://mishacreations.com/services/${slug}`,
    },
  }
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params
  const cms = await getServicePage(slug).catch(() => null)
  const finish = FINISH_MAP[slug]
  if (!cms && !finish) return notFound()

  const title = cms?.title || finish?.title || ''
  const h1 = cms?.h1 || finish?.h1 || ''
  const categoryId = cms?.categoryId || finish?.categoryId || ''

  const [pieces, category] = await Promise.all([
    getPiecesByCategory(categoryId, 6),
    getFinishCategory(categoryId),
  ])

  const heroImage = category?.heroImage || pieces[0]?.heroImage
  const description =
    category?.tradeDescription ||
    category?.shortDescription ||
    FINISH_DESCRIPTIONS[categoryId] ||
    `Misha Creations brings 25+ years of expertise in ${title.toLowerCase()} to Houston's most distinguished homes and businesses. Each project is customized to your tastes, designed to complement your architecture and capture the unique light of your space.`

  // CMS enrichment takes priority per-section, fall back to constants.ts per-section
  const fallback = SERVICE_ENRICHMENT[categoryId] || null
  const enrichment = (cms || fallback) ? {
    intro: (cms?.intro?.heading && cms?.intro?.paragraphs?.length) ? cms.intro : fallback?.intro ?? null,
    process: (cms?.process?.heading && cms?.process?.steps?.length) ? cms.process : fallback?.process ?? null,
    trust: (cms?.trust?.heading && cms?.trust?.points?.length) ? cms.trust : fallback?.trust ?? null,
    extraFaqs: cms?.extraFaqs?.length ? cms.extraFaqs : fallback?.extraFaqs ?? null,
    relatedServices: cms?.relatedServices?.length ? cms.relatedServices : fallback?.relatedServices ?? [],
    areaContext: cms?.areaContext || fallback?.areaContext || null,
  } : null

  const baseFaqs = [
    {
      question: `How much does ${title.toLowerCase()} cost in Houston?`,
      answer: `Every ${title.toLowerCase()} project is customized to your tastes and priced based on scope, surface area, and complexity. Misha provides a detailed estimate after an in-home consultation where she studies your space, lighting, and vision.`,
    },
    {
      question: `How long does a ${title.toLowerCase()} project take?`,
      answer: `Timeline depends on the scope and complexity of the work. Most projects take 1-3 weeks from design approval to completion. Misha coordinates around your schedule and provides a realistic timeline during the consultation.`,
    },
    {
      question: `Do you provide samples before starting ${title.toLowerCase()} work?`,
      answer: `Absolutely. Misha creates physical finish samples for your approval before any brushwork begins. You see and touch the exact finish that will be applied in your home. No surprises on install day.`,
    },
  ]
  const finishFaqs = enrichment?.extraFaqs?.length ? enrichment.extraFaqs : baseFaqs

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${title} Houston`,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Misha Creations',
      url: 'https://mishacreations.com',
    },
    areaServed: { '@type': 'City', name: 'Houston' },
    description,
  }

  return (
    <>
      <JsonLd data={serviceSchema} />

      {/* Hero — editorial band (text only) */}
      <section className="bg-ink pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="text-center px-5 max-w-4xl mx-auto">
          <h1 className="font-display text-[38px] leading-[48px] md:text-[54px] md:leading-[64px] text-cream mb-4">
            {h1}
          </h1>
          <p className="font-body text-lg text-mist max-w-2xl mx-auto">
            By Misha Creations &middot; 25+ Years of Artistic Excellence
          </p>
        </div>
      </section>

      {/* Hero image — contained, clean */}
      {heroImage && (
        <section className="bg-ink pb-8">
          <div className="max-w-5xl mx-auto px-5">
            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl">
              <SanityImage image={heroImage} fill priority sizes="(max-width: 1024px) 100vw, 1024px" className="object-cover" />
            </div>
          </div>
        </section>
      )}

      {/* Description */}
      <section className="py-16 md:py-20 bg-warm">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <p className="font-body text-lg leading-relaxed text-mist">{description}</p>
        </div>
      </section>

      {/* Service Intro — enriched pages only (003A) */}
      {enrichment?.intro && (
        <section className="py-16 md:py-20 bg-ink">
          <div className="max-w-3xl mx-auto px-5">
            <h2 className="font-display text-3xl md:text-4xl text-center text-cream mb-8">
              {enrichment.intro.heading}
            </h2>
            {enrichment.intro.paragraphs.map((p, i) => (
              <p key={i} className="font-body text-lg leading-relaxed text-mist mb-6 last:mb-0">{p}</p>
            ))}
            {enrichment?.areaContext && (
              <p className="font-body text-mist/70 mt-8 text-center text-sm">{enrichment.areaContext}</p>
            )}
          </div>
        </section>
      )}

      {/* Process — enriched pages only (003A) */}
      {enrichment?.process && (
        <section className="py-16 md:py-20 bg-warm">
          <div className="max-w-3xl mx-auto px-5">
            <h2 className="font-display text-3xl md:text-4xl text-center text-cream mb-12">
              {enrichment.process.heading}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {enrichment.process.steps.map((step, i) => (
                <div key={i} className="border border-muted/30 rounded-lg p-6">
                  <h3 className="font-editorial text-lg text-gold mb-2">
                    {String(i + 1).padStart(2, '0')}. {step.name}
                  </h3>
                  <p className="font-body text-mist leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Portfolio Grid */}
      {pieces.length > 0 && (
        <section className="py-16 md:py-20 bg-ink">
          <div className="max-w-7xl mx-auto px-5">
            <h2 className="font-display text-3xl md:text-4xl text-center text-cream mb-12">
              Featured {title} Work
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pieces.map((piece) => (
                <div key={piece._id} className="relative aspect-[4/5] rounded-lg overflow-hidden shadow-md">
                  <SanityImage
                    image={piece.heroImage}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                    alt={piece.heroImage?.alt || `${piece.title} - ${title} by Misha Creations Houston`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  {!SUPPRESS_VISIBLE_IMAGE_TITLES && (
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <p className="font-editorial text-lg text-white">{piece.title}</p>
                      {piece.location && (
                        <p className="font-body text-sm text-white/70 mt-1">{piece.location}</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Trust Block — enriched pages only (003A) */}
      {enrichment?.trust && (
        <section className="py-16 md:py-20 bg-warm">
          <div className="max-w-3xl mx-auto px-5 text-center">
            <h2 className="font-display text-3xl md:text-4xl text-cream mb-8">
              {enrichment.trust.heading}
            </h2>
            <ul className="space-y-3 text-left max-w-xl mx-auto">
              {enrichment.trust.points.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-gold mt-1 flex-shrink-0">&#10003;</span>
                  <span className="font-body text-mist">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <FaqAccordion faqs={finishFaqs} heading={`${title} FAQ`} />

      {/* Related Services — enriched pages only (003A / 002C) */}
      {enrichment?.relatedServices && enrichment.relatedServices.length > 0 && (
        <section className="py-12 bg-warm">
          <div className="max-w-3xl mx-auto px-5 text-center">
            <p className="font-body text-xs uppercase tracking-widest text-muted mb-4">Related Services</p>
            <div className="flex flex-wrap justify-center gap-4">
              {enrichment.relatedServices.map((rs) => (
                <Link
                  key={rs.slug}
                  href={`/services/${rs.slug}`}
                  className="font-body text-gold border border-gold/40 px-5 py-2 rounded-full hover:bg-gold/10 transition-colors"
                >
                  {rs.label}
                </Link>
              ))}
              <Link
                href="/services"
                className="font-body text-mist border border-muted/30 px-5 py-2 rounded-full hover:bg-muted/10 transition-colors"
              >
                View All Services
              </Link>
            </div>
          </div>
        </section>
      )}

      <CtaSection
        headline={`Start Your ${title} Project`}
        body="Call today for a complimentary consultation. Misha will visit your home, study the light and architecture, and show you what is possible."
      />
    </>
  )
}
