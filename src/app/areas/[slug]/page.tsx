import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { NEIGHBORHOOD_MAP, NEIGHBORHOODS, NEIGHBORHOOD_CONTENT, FINISH_SURFACES } from '@/lib/constants'
import { getPiecesByCategories, getMishaSelectPieces } from '@/lib/queries'
import { SanityImage } from '@/components/SanityImage'
import { FaqAccordion } from '@/components/FaqAccordion'
import { CtaSection } from '@/components/CtaSection'
import { JsonLd } from '@/components/JsonLd'

export const revalidate = 60

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return NEIGHBORHOODS.map((n) => ({ slug: n.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const hood = NEIGHBORHOOD_MAP[slug]
  if (!hood) return notFound()

  return {
    title: hood.metaTitle,
    description: hood.metaDescription,
    alternates: {
      canonical: `https://mishacreations.com/areas/${slug}`,
    },
    openGraph: {
      title: hood.metaTitle,
      description: hood.metaDescription,
      url: `https://mishacreations.com/areas/${slug}`,
    },
  }
}

export default async function AreaPage({ params }: PageProps) {
  const { slug } = await params
  const hood = NEIGHBORHOOD_MAP[slug]
  if (!hood) return notFound()

  const content = NEIGHBORHOOD_CONTENT[slug]
  const pieces = content
    ? await getPiecesByCategories(content.featuredCategories, 2, content.categoryOffset)
    : (await getMishaSelectPieces(4)).slice(0, 4)

  const neighborhoodFaqs = content
    ? [
        { question: `Does Misha Creations serve ${hood.name}?`, answer: content.faqAnswers.serve },
        { question: `How much does decorative painting cost in ${hood.name}?`, answer: content.faqAnswers.cost },
        { question: `What decorative finishes are popular in ${hood.name}?`, answer: content.faqAnswers.popular },
      ]
    : [
        { question: `Does Misha Creations serve ${hood.name}?`, answer: `Yes! Misha has been serving ${hood.name} homeowners for over 25 years with luxury decorative finishes, wall murals, and Venetian plaster. She personally visits your home for every consultation.` },
        { question: `How much does decorative painting cost in ${hood.name}?`, answer: `Every project is customized to your tastes and priced based on scope, surface area, and finish complexity. Misha provides a detailed, no-obligation estimate after an in-home consultation.` },
        { question: `What decorative finishes are popular in ${hood.name}?`, answer: `${hood.name} homeowners often choose Venetian plaster for entry halls, custom wall murals for dining rooms, and decorative ceiling treatments for living areas. Misha tailors every finish to complement your home's architecture.` },
      ]

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'VisualArtist'],
    name: 'Misha Creations',
    description: `Luxury decorative finishes and wall murals in ${hood.name}, Houston`,
    url: `https://mishacreations.com/areas/${slug}`,
    areaServed: { '@type': 'Neighborhood', name: hood.name },
  }

  return (
    <>
      <JsonLd data={localBusinessSchema} />

      {/* Hero */}
      <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden bg-charcoal">
        {pieces[0]?.heroImage && (
          <div className="absolute inset-0">
            <SanityImage image={pieces[0].heroImage} fill priority sizes="100vw" className="object-cover opacity-40" />
          </div>
        )}
        <div className="relative z-10 text-center px-5 max-w-4xl mx-auto pt-20">
          <h1 className="font-display text-[38px] leading-[48px] md:text-[54px] md:leading-[64px] text-white mb-4">
            {hood.h1}
          </h1>
          <p className="font-body text-lg text-white/85 max-w-2xl mx-auto">
            Trusted by {hood.name} homeowners for over 25 years
          </p>
        </div>
      </section>

      {/* Description */}
      {content && (
        <section className="py-16 md:py-20 bg-cream">
          <div className="max-w-3xl mx-auto px-5 text-center">
            <p className="font-body text-lg leading-relaxed text-charcoal">{content.description}</p>
          </div>
        </section>
      )}

      {/* Portfolio Grid */}
      {pieces.length > 0 && (
        <section className={`py-16 md:py-20 ${content ? 'bg-sand' : 'bg-cream'}`}>
          <div className="max-w-6xl mx-auto px-5">
            <h2 className="font-display text-3xl md:text-4xl text-center text-dark mb-12">
              Work in {hood.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {pieces.map((piece) => (
                <div key={piece._id} className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-md">
                  <SanityImage
                    image={piece.heroImage}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover"
                    alt={piece.heroImage?.alt || `${piece.title} - decorative finish in ${hood.name} by Misha Creations`}
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
      <section className="py-16 bg-sand">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <h2 className="font-display text-3xl text-dark mb-8">
            Services Available in {hood.name}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {FINISH_SURFACES.map((f) => (
              <Link
                key={f.slug}
                href={`/services/${f.slug}`}
                className="bg-cream rounded-lg p-4 text-center hover:shadow-md transition-shadow"
              >
                <p className="font-editorial text-sm text-dark">{f.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FaqAccordion faqs={neighborhoodFaqs} heading={`${hood.name} FAQ`} />
      <CtaSection headline={`Ready to Transform Your ${hood.name} Home?`} />
    </>
  )
}
