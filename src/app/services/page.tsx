import type { Metadata } from 'next'
import Link from 'next/link'
import { FINISH_SURFACES } from '@/lib/constants'
import { getPiecesByCategory } from '@/lib/queries'
import { SanityImage } from '@/components/SanityImage'
import { CtaSection } from '@/components/CtaSection'
import { JsonLd } from '@/components/JsonLd'

export const metadata: Metadata = {
  title: 'Decorative Painting Houston | Custom Wall Murals | Venetian Plaster | Misha Creations',
  description: 'Master faux artist specializing in custom wall murals Houston, venetian plaster, decorative painting, and luxury finishes. Serving River Oaks, Memorial, The Woodlands, and surrounding areas.',
  alternates: {
    canonical: 'https://mishacreations.com/services',
  },
  openGraph: {
    title: 'Decorative Painting Services Houston | Misha Creations',
    description: "Master faux artist specializing in custom wall murals, venetian plaster, and luxury decorative finishes for Houston's finest homes.",
    url: 'https://mishacreations.com/services',
  },
}

export const revalidate = 60

export default async function ServicesPage() {
  // Fetch one hero piece per category for the cards
  const categoryPieces = await Promise.all(
    FINISH_SURFACES.map(async (f) => {
      const pieces = await getPiecesByCategory(f.categoryId, 1)
      return { finish: f, heroImage: pieces[0]?.heroImage }
    })
  )

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Misha Creations',
    },
    serviceType: FINISH_SURFACES.map((f) => f.title),
    areaServed: {
      '@type': 'City',
      name: 'Houston',
      containedInPlace: { '@type': 'State', name: 'Texas' },
    },
  }

  return (
    <>
      <JsonLd data={serviceSchema} />

      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center justify-center bg-charcoal">
        <div className="relative z-10 text-center px-5 max-w-4xl mx-auto pt-20">
          <h1 className="font-display text-[42px] leading-[52px] md:text-[58px] md:leading-[68px] text-white mb-4">
            Decorative Painting Services
          </h1>
          <p className="font-body text-lg text-white/85 max-w-2xl mx-auto">
            Museum-quality artistry for Houston&apos;s most distinguished homes. 25+ years of artistic excellence.
          </p>
        </div>
      </section>

      {/* Service Cards */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryPieces.map(({ finish, heroImage }) => (
              <Link
                key={finish.slug}
                href={`/services/${finish.slug}`}
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
                {!heroImage && <div className="absolute inset-0 bg-charcoal" />}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="font-editorial text-lg text-white">{finish.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaSection headline="Ready to Transform Your Space?" />
    </>
  )
}
