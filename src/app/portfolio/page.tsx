import type { Metadata } from 'next'
import Link from 'next/link'
import { getFeaturedPieces, getPiecesByCategory } from '@/lib/queries'
import { FINISH_SURFACES, COPY } from '@/lib/constants'
import { PortfolioCard } from '@/components/PortfolioCard'
import { CtaSection } from '@/components/CtaSection'
import { JsonLd } from '@/components/JsonLd'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Portfolio | Misha Creations Houston',
  description:
    'Explore our portfolio of luxury decorative finishes, wall murals, and Venetian plaster across Houston\'s finest homes. 25+ years of artistry in River Oaks, Memorial, Tanglewood, and beyond.',
}

export default async function PortfolioPage() {
  // Fetch featured pieces + all category pieces in parallel
  const [featured, ...categoryResults] = await Promise.all([
    getFeaturedPieces(6),
    ...FINISH_SURFACES.map((f) => getPiecesByCategory(f.categoryId, 6)),
  ])

  const gallerySchema = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: 'Misha Creations Portfolio',
    description: 'Luxury decorative finishes portfolio — Houston, TX',
    author: {
      '@type': 'LocalBusiness',
      name: 'Misha Creations',
      url: 'https://mishacreations.com',
    },
  }

  return (
    <>
      <JsonLd data={gallerySchema} />

      {/* Hero */}
      <section className="bg-ink pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <h1 className="font-display text-[48px] md:text-[64px] text-cream mb-4">
            Portfolio
          </h1>
          <p className="font-editorial text-xl md:text-2xl text-mist max-w-2xl mx-auto mb-6">
            A curated collection of decorative finishes across Houston&apos;s finest homes
          </p>
          <div className="w-8 h-px bg-gold mx-auto mb-6" />
          <p className="font-body text-sm text-muted">
            Trusted by homeowners in {COPY.socialProof.join(', ')}
          </p>
        </div>
      </section>

      {/* Featured Works */}
      {featured.length > 0 && (
        <section className="pb-20 bg-ink">
          <div className="max-w-7xl mx-auto px-5">
            <h2 className="font-display text-3xl md:text-4xl text-cream text-center mb-12">
              Featured Works
            </h2>

            {/* Staggered grid — alternating large/small */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {featured.map((piece, i) => {
                const isLarge = i % 2 === 0
                return (
                  <div
                    key={piece._id}
                    className={isLarge ? 'md:col-span-7' : 'md:col-span-5'}
                  >
                    <PortfolioCard
                      piece={piece}
                      showCategory
                      sizes={isLarge ? '(max-width: 768px) 100vw, 58vw' : '(max-width: 768px) 100vw, 42vw'}
                      priority={i < 2}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Finish Category Sections */}
      {FINISH_SURFACES.map((finish, sectionIndex) => {
        const pieces = categoryResults[sectionIndex] || []
        if (pieces.length === 0) return null
        const bgClass = sectionIndex % 2 === 0 ? 'bg-warm' : 'bg-ink'

        return (
          <section key={finish.slug} id={finish.categoryId} className={`py-16 md:py-20 ${bgClass}`}>
            <div className="max-w-7xl mx-auto px-5">
              {/* Section header */}
              <div className="mb-10">
                <p className="font-body text-xs uppercase tracking-[0.18em] text-gold mb-2">
                  {finish.title} &middot; {pieces.length} project{pieces.length !== 1 ? 's' : ''}
                </p>
                <h2 className="font-display text-3xl md:text-4xl text-cream mb-3">
                  {finish.title}
                </h2>
                <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
                  <Link
                    href={`/${finish.slug}`}
                    className="font-body text-sm text-gold hover:text-goldf transition-colors"
                  >
                    Explore {finish.title} &rarr;
                  </Link>
                </div>
              </div>

              {/* Image grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {pieces.map((piece, i) => (
                  <PortfolioCard
                    key={piece._id}
                    piece={piece}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={sectionIndex === 0 && i < 3}
                  />
                ))}
              </div>
            </div>
          </section>
        )
      })}

      <CtaSection
        headline="Envision Something Similar?"
        body="Every finish is one-of-a-kind, customized to your home's architecture and light. Call today for a complimentary consultation to begin your commission."
      />
    </>
  )
}
