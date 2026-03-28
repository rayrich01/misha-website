import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { NEIGHBORHOOD_MAP, NEIGHBORHOODS, NEIGHBORHOOD_CONTENT, FINISH_SURFACES } from '@/lib/constants'
import { getPiecesByCategories, getMishaSelectPieces, getAreaPage, getAllAreaSlugs, getAllServicePages } from '@/lib/queries'
import { SanityImage } from '@/components/SanityImage'
import { FaqAccordion } from '@/components/FaqAccordion'
import { CtaSection } from '@/components/CtaSection'
import { JsonLd } from '@/components/JsonLd'

export const revalidate = 60

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const cmsSlugs = await getAllAreaSlugs().catch(() => [])
  if (cmsSlugs.length > 0) return cmsSlugs.map((s) => ({ slug: s }))
  return NEIGHBORHOODS.map((n) => ({ slug: n.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const cms = await getAreaPage(slug).catch(() => null)
  const hood = NEIGHBORHOOD_MAP[slug]
  if (!cms && !hood) return notFound()

  const metaTitle = cms ? cms.seo.metaTitle : hood!.metaTitle
  const metaDescription = cms ? cms.seo.metaDescription : hood!.metaDescription

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: {
      canonical: `https://mishacreations.com/areas/${slug}`,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: `https://mishacreations.com/areas/${slug}`,
    },
  }
}

export default async function AreaPage({ params }: PageProps) {
  const { slug } = await params
  const cms = await getAreaPage(slug).catch(() => null)
  const hood = NEIGHBORHOOD_MAP[slug]
  if (!cms && !hood) return notFound()

  const name = cms?.name || hood!.name
  const h1 = cms?.h1 || hood!.h1

  // Use CMS content if available, fall back to constants
  const content = cms ? {
    description: cms.description,
    featuredCategories: cms.featuredCategories as [string, string],
    categoryOffset: cms.categoryOffset,
    popularFinishes: cms.popularFinishes,
    faqAnswers: cms.faqAnswers,
    extraFaqs: cms.extraFaqs,
    nearbyAreas: cms.nearbyAreas,
    trustPoints: cms.trustPoints,
  } : NEIGHBORHOOD_CONTENT[slug] || null

  const pieces = content
    ? await getPiecesByCategories(content.featuredCategories, 2, content.categoryOffset)
    : (await getMishaSelectPieces(4)).slice(0, 4)

  // Fetch service pages from CMS for the services grid, fall back to constants
  const cmsServices = await getAllServicePages().catch(() => [])
  const serviceList = cmsServices.length > 0
    ? cmsServices.map((s) => ({ slug: s.slug.current, title: s.title }))
    : FINISH_SURFACES.map((f) => ({ slug: f.slug, title: f.title }))

  const baseFaqs = content
    ? [
        { question: `Does Misha Creations serve ${name}?`, answer: content.faqAnswers.serve },
        { question: `How much does decorative painting cost in ${name}?`, answer: content.faqAnswers.cost },
        { question: `What decorative finishes are popular in ${name}?`, answer: content.faqAnswers.popular },
      ]
    : [
        { question: `Does Misha Creations serve ${name}?`, answer: `Yes! Misha has been serving ${name} homeowners for over 25 years with luxury decorative finishes, wall murals, and Venetian plaster. She personally visits your home for every consultation.` },
        { question: `How much does decorative painting cost in ${name}?`, answer: `Every project is customized to your tastes and priced based on scope, surface area, and finish complexity. Misha provides a detailed, no-obligation estimate after an in-home consultation.` },
        { question: `What decorative finishes are popular in ${name}?`, answer: `${name} homeowners often choose Venetian plaster for entry halls, custom wall murals for dining rooms, and decorative ceiling treatments for living areas. Misha tailors every finish to complement your home's architecture.` },
      ]
  const neighborhoodFaqs = content?.extraFaqs ? [...baseFaqs, ...content.extraFaqs] : baseFaqs

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'VisualArtist'],
    name: 'Misha Creations',
    description: `Luxury decorative finishes and wall murals in ${name}, Houston`,
    url: `https://mishacreations.com/areas/${slug}`,
    areaServed: { '@type': 'Neighborhood', name: name },
  }

  return (
    <>
      <JsonLd data={localBusinessSchema} />

      {/* Hero */}
      <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden bg-ink">
        {pieces[0]?.heroImage && (
          <div className="absolute inset-0">
            <SanityImage image={pieces[0].heroImage} fill priority sizes="100vw" className="object-cover opacity-40" />
          </div>
        )}
        <div className="relative z-10 text-center px-5 max-w-4xl mx-auto pt-20">
          <h1 className="font-display text-[38px] leading-[48px] md:text-[54px] md:leading-[64px] text-white mb-4">
            {h1}
          </h1>
          <p className="font-body text-lg text-white/85 max-w-2xl mx-auto">
            Trusted by {name} homeowners for over 25 years
          </p>
        </div>
      </section>

      {/* Description */}
      {content && (
        <section className="py-16 md:py-20 bg-warm">
          <div className="max-w-3xl mx-auto px-5 text-center">
            <p className="font-body text-lg leading-relaxed text-mist">{content.description}</p>
          </div>
        </section>
      )}

      {/* Portfolio Grid */}
      {pieces.length > 0 && (
        <section className={`py-16 md:py-20 ${content ? 'bg-ink' : 'bg-warm'}`}>
          <div className="max-w-6xl mx-auto px-5">
            <h2 className="font-display text-3xl md:text-4xl text-center text-cream mb-12">
              Work in {name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {pieces.map((piece) => (
                <div key={piece._id} className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-md">
                  <SanityImage
                    image={piece.heroImage}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover"
                    alt={piece.heroImage?.alt || `${piece.title} - decorative finish in ${name} by Misha Creations`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="font-editorial text-lg text-white">{piece.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Services available */}
      <section className="py-16 bg-warm">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <h2 className="font-display text-3xl text-cream mb-8">
            Services Available in {name}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {serviceList.map((f) => (
              <Link
                key={f.slug}
                href={`/services/${f.slug}`}
                className="bg-ink rounded-lg p-4 text-center hover:shadow-md transition-shadow"
              >
                <p className="font-editorial text-sm text-cream">{f.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Block (004A / 013B) */}
      {content?.trustPoints && (
        <section className="py-16 md:py-20 bg-ink">
          <div className="max-w-3xl mx-auto px-5 text-center">
            <h2 className="font-display text-3xl md:text-4xl text-cream mb-8">
              Why {name} Homeowners Choose Misha
            </h2>
            <ul className="space-y-3 text-left max-w-xl mx-auto">
              {content.trustPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-gold mt-1 flex-shrink-0">&#10003;</span>
                  <span className="font-body text-mist">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <FaqAccordion faqs={neighborhoodFaqs} heading={`${name} FAQ`} />

      {/* Nearby Areas (004A / 013B) */}
      {content?.nearbyAreas && content.nearbyAreas.length > 0 && (
        <section className="py-10 bg-warm">
          <div className="max-w-3xl mx-auto px-5 text-center">
            <p className="font-body text-xs uppercase tracking-widest text-muted mb-4">Also Serving Nearby</p>
            <div className="flex flex-wrap justify-center gap-3">
              {content.nearbyAreas.map((area) => (
                <Link
                  key={area.slug}
                  href={`/areas/${area.slug}`}
                  className="font-body text-sm text-gold border border-gold/40 px-4 py-2 rounded-full hover:bg-gold/10 transition-colors"
                >
                  {area.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaSection
        headline={`Start Your ${name} Project`}
        body="Call today for a complimentary consultation. Misha will visit your home, study the light and architecture, and show you what is possible."
      />
    </>
  )
}
