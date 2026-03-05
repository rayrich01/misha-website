import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { FINISH_MAP, NEIGHBORHOOD_MAP, FINISH_SURFACES, NEIGHBORHOODS, FINISH_DESCRIPTIONS } from '@/lib/constants'
import { getPiecesByCategory, getPiecesByLocation, getFinishCategory, getMishaSelectPieces } from '@/lib/queries'
import { SanityImage } from '@/components/SanityImage'
import { FaqAccordion } from '@/components/FaqAccordion'
import { CtaSection } from '@/components/CtaSection'
import { JsonLd } from '@/components/JsonLd'

export const revalidate = 60

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return [
    ...FINISH_SURFACES.map((f) => ({ slug: f.slug })),
    ...NEIGHBORHOODS.map((n) => ({ slug: n.slug })),
  ]
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const finish = FINISH_MAP[slug]
  const neighborhood = NEIGHBORHOOD_MAP[slug]

  if (finish) {
    return {
      title: finish.metaTitle,
      description: `${finish.title} by Misha Creations in Houston. Custom ${finish.title.toLowerCase()} for luxury homes in River Oaks, Memorial, Tanglewood, and West University. 25+ years of artistic excellence.`,
    }
  }

  if (neighborhood) {
    return {
      title: neighborhood.metaTitle,
      description: `Luxury decorative painting and finishes in ${neighborhood.name}, Houston. Venetian plaster, wall murals, and custom finishes by Misha Creations. 25+ years serving ${neighborhood.name}.`,
    }
  }

  return notFound()
}

export default async function SlugPage({ params }: PageProps) {
  const { slug } = await params
  const finish = FINISH_MAP[slug]
  const neighborhood = NEIGHBORHOOD_MAP[slug]

  if (finish) return <FinishPage slug={slug} />
  if (neighborhood) return <NeighborhoodPage slug={slug} />
  return notFound()
}

/* ─── Finish Surface ─── */
async function FinishPage({ slug }: { slug: string }) {
  const finish = FINISH_MAP[slug]
  const [pieces, category] = await Promise.all([
    getPiecesByCategory(finish.categoryId, 6),
    getFinishCategory(finish.categoryId),
  ])

  const heroImage = category?.heroImage || pieces[0]?.heroImage
  const description =
    category?.tradeDescription ||
    category?.shortDescription ||
    FINISH_DESCRIPTIONS[finish.categoryId] ||
    `Misha Creations brings 25+ years of expertise in ${finish.title.toLowerCase()} to Houston's most distinguished homes. Each project is customized to your tastes, designed to complement your architecture and capture the unique light of your space.`

  const finishFaqs = [
    {
      question: `How much does ${finish.title.toLowerCase()} cost in Houston?`,
      answer: `Every ${finish.title.toLowerCase()} project is customized to your tastes and priced based on scope, surface area, and complexity. Misha provides a detailed estimate after an in-home consultation where she studies your space, lighting, and vision.`,
    },
    {
      question: `How long does a ${finish.title.toLowerCase()} project take?`,
      answer: `Timeline depends on the scope and complexity of the work. Most projects take 1-3 weeks from design approval to completion. Misha coordinates around your schedule and provides a realistic timeline during the consultation.`,
    },
    {
      question: `Do you provide samples before starting ${finish.title.toLowerCase()} work?`,
      answer: `Absolutely. Misha creates physical finish samples for your approval before any brushwork begins. You see and touch the exact finish that will be applied in your home. No surprises on install day.`,
    },
  ]

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${finish.title} Houston`,
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

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {heroImage && (
          <div className="absolute inset-0">
            <SanityImage image={heroImage} fill priority sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
          </div>
        )}
        {!heroImage && <div className="absolute inset-0 bg-charcoal" />}
        <div className="relative z-10 text-center px-5 max-w-4xl mx-auto pt-20">
          <h1 className="font-display text-[38px] leading-[48px] md:text-[54px] md:leading-[64px] text-white mb-4">
            {finish.h1}
          </h1>
          <p className="font-body text-lg text-white/85 max-w-2xl mx-auto">
            By Misha Creations &middot; 25+ Years of Artistic Excellence
          </p>
        </div>
      </section>

      {/* Description */}
      <section className="py-16 md:py-20 bg-cream">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <p className="font-body text-lg leading-relaxed text-charcoal">{description}</p>
        </div>
      </section>

      {/* Portfolio Grid */}
      {pieces.length > 0 && (
        <section className="py-16 md:py-20 bg-sand">
          <div className="max-w-7xl mx-auto px-5">
            <h2 className="font-display text-3xl md:text-4xl text-center text-dark mb-12">
              Featured {finish.title} Work
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pieces.map((piece) => (
                <div key={piece._id} className="relative aspect-[4/5] rounded-lg overflow-hidden shadow-md">
                  <SanityImage
                    image={piece.heroImage}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                    alt={piece.heroImage?.alt || `${piece.title} - ${finish.title} by Misha Creations Houston`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="font-editorial text-lg text-white">{piece.title}</p>
                    {piece.location && (
                      <p className="font-body text-sm text-white/70 mt-1">{piece.location}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <FaqAccordion faqs={finishFaqs} heading={`${finish.title} FAQ`} />
      <CtaSection headline={`Ready for ${finish.title} in Your Home?`} />
    </>
  )
}

/* ─── Neighborhood Surface ─── */
async function NeighborhoodPage({ slug }: { slug: string }) {
  const hood = NEIGHBORHOOD_MAP[slug]
  const [locationPieces, fallbackPieces] = await Promise.all([
    getPiecesByLocation(hood.name, 4),
    getMishaSelectPieces(4),
  ])
  const pieces = locationPieces.length >= 3 ? locationPieces : fallbackPieces.slice(0, 4)

  const neighborhoodFaqs = [
    {
      question: `Does Misha Creations serve ${hood.name}?`,
      answer: `Yes! Misha has been serving ${hood.name} homeowners for over 25 years with luxury decorative finishes, wall murals, and Venetian plaster. She personally visits your home for every consultation.`,
    },
    {
      question: `How much does decorative painting cost in ${hood.name}?`,
      answer: `Every project is customized to your tastes and priced based on scope, surface area, and finish complexity. Misha provides a detailed, no-obligation estimate after an in-home consultation.`,
    },
    {
      question: `What decorative finishes are popular in ${hood.name}?`,
      answer: `${hood.name} homeowners often choose Venetian plaster for entry halls, custom wall murals for dining rooms, and decorative ceiling treatments for living areas. Misha tailors every finish to complement your home's architecture.`,
    },
  ]

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'VisualArtist'],
    name: 'Misha Creations',
    description: `Luxury decorative finishes and wall murals in ${hood.name}, Houston`,
    url: `https://mishacreations.com/${slug}`,
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

      {/* Portfolio Grid */}
      {pieces.length > 0 && (
        <section className="py-16 md:py-20 bg-cream">
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
            {FINISH_SURFACES.slice(0, 8).map((f) => (
              <Link
                key={f.slug}
                href={`/${f.slug}`}
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
