import type { Metadata } from 'next'
import { getMishaSelectPieces } from '@/lib/queries'
import { COPY } from '@/lib/constants'
import { PortfolioCard } from '@/components/PortfolioCard'
import { CtaSection } from '@/components/CtaSection'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Recent Projects | Misha Creations Houston',
  description:
    'Latest luxury murals & decorative finishes for River Oaks, Memorial & Tanglewood homes. Custom nurseries, Venetian plaster & specialty work.',
  alternates: {
    canonical: 'https://mishacreations.com/recent-projects',
  },
  openGraph: {
    title: 'Recent Luxury Decorative Painting Projects | Houston | Misha Creations',
    description:
      "Discover our latest luxury decorative painting projects in Houston's most prestigious neighborhoods.",
    url: 'https://mishacreations.com/recent-projects',
  },
}

export default async function RecentProjectsPage() {
  const pieces = await getMishaSelectPieces(12)

  return (
    <>
      <section className="bg-ink pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <h1 className="font-display text-[48px] md:text-[64px] text-cream mb-4">
            Recent Projects
          </h1>
          <p className="font-body text-lg text-mist max-w-2xl mx-auto mb-6">
            Latest luxury murals and decorative finishes for Houston&apos;s most prestigious homes
          </p>
          <p className="font-body text-sm text-muted">
            Trusted by homeowners in {COPY.socialProof.join(', ')}
          </p>
        </div>
      </section>

      {pieces.length > 0 && (
        <section className="py-16 md:py-24 bg-warm">
          <div className="max-w-7xl mx-auto px-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pieces.map((piece, i) => (
                <PortfolioCard
                  key={piece._id}
                  piece={piece}
                  showCategory
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={i < 3}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaSection
        headline="Inspired by What You See?"
        body="Every finish is one-of-a-kind. Schedule a complimentary consultation to begin your commission."
      />
    </>
  )
}
