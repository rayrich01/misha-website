import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getPieceBySlug, getAllPortfolioSlugs, getRelatedPieces } from '@/lib/queries'
import { sanityImageUrl } from '@/lib/sanity'
import { FINISH_SURFACES } from '@/lib/constants'
import { PortfolioDetailClient } from '@/components/PortfolioDetailClient'
import { PortfolioGrid } from '@/components/PortfolioGrid'
import { CtaSection } from '@/components/CtaSection'
import { JsonLd } from '@/components/JsonLd'

export const revalidate = 60

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllPortfolioSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const piece = await getPieceBySlug(slug)
  if (!piece) return {}

  const finish = FINISH_SURFACES.find((f) => f.categoryId === piece.category)
  return {
    title: `${piece.title} | ${finish?.title || 'Portfolio'} | Misha Creations Houston`,
    description:
      piece.description?.slice(0, 160) ||
      `${piece.title} — ${finish?.title || 'decorative finish'} by Misha Creations in ${piece.location || 'Houston'}. View this luxury project and explore detail.`,
  }
}

export default async function PieceDetailPage({ params }: PageProps) {
  const { slug } = await params
  const piece = await getPieceBySlug(slug)
  if (!piece) return notFound()

  const relatedPieces = await getRelatedPieces(piece.category, piece._id, 3)
  const finish = FINISH_SURFACES.find((f) => f.categoryId === piece.category)

  // Build all images array: hero + additional images
  const allImages = [
    piece.heroImage,
    ...(piece.images || []),
  ].filter(Boolean)

  // Build image data for the client component
  const imageData = allImages.map((img) => ({
    src: sanityImageUrl(img, { width: 1600, quality: 88 }),
    alt: img.alt || `${piece.title} by Misha Creations`,
    lqip: img.lqip,
    width: 1600,
    height: piece.orientation === 'landscape' ? 1067 : piece.orientation === 'portrait' ? 2133 : 1600,
  }))

  const thumbnailData = allImages.map((img) => ({
    src: sanityImageUrl(img, { width: 140, quality: 70 }),
    alt: img.alt || piece.title,
    lqip: img.lqip,
  }))

  const imageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    name: piece.title,
    description: piece.description,
    author: { '@type': 'Organization', name: 'Misha Creations' },
    contentLocation: piece.location || 'Houston, TX',
  }

  return (
    <>
      <JsonLd data={imageSchema} />

      <main className="bg-cream pt-24 pb-0">
        {/* Breadcrumb */}
        <div className="max-w-4xl mx-auto px-5 mb-8">
          <nav className="font-body text-xs text-charcoal/50">
            <Link href="/portfolio" className="hover:text-gold transition-colors">Portfolio</Link>
            {finish && (
              <>
                <span className="mx-2">/</span>
                <Link href={`/portfolio#${finish.categoryId}`} className="hover:text-gold transition-colors">
                  {finish.title}
                </Link>
              </>
            )}
            <span className="mx-2">/</span>
            <span className="text-charcoal/70">{piece.title}</span>
          </nav>
        </div>

        {/* Hero Image with Zoom */}
        <div className="max-w-4xl mx-auto px-5 mb-12">
          <PortfolioDetailClient images={imageData} thumbnails={thumbnailData} />
        </div>

        {/* Info Section */}
        <div className="max-w-4xl mx-auto px-5 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left: piece info */}
            <div className="lg:col-span-2">
              {finish && (
                <p className="font-body text-xs uppercase tracking-[0.18em] text-gold mb-3">
                  {finish.title}
                </p>
              )}
              <h1 className="font-display text-[36px] md:text-[48px] text-dark leading-tight mb-3">
                {piece.title}
              </h1>
              {piece.subtitle && (
                <p className="font-editorial text-lg text-charcoal/60 mb-4">{piece.subtitle}</p>
              )}
              {piece.location && (
                <p className="font-editorial text-base italic text-bronze mb-6">{piece.location}</p>
              )}
              {piece.description && (
                <p className="font-body text-charcoal leading-relaxed mb-6">{piece.description}</p>
              )}
              {piece.tradeTags && piece.tradeTags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {piece.tradeTags.map((tag) => (
                    <span
                      key={tag}
                      className="font-body text-[10px] uppercase tracking-wider text-bronze/70 border border-sand px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Right: CTA sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-sand rounded-xl p-6">
                <p className="font-editorial text-xl text-dark mb-2">Love this finish?</p>
                <p className="font-body text-sm text-charcoal/70 leading-relaxed mb-5">
                  Every project is one-of-a-kind, customized to your home&apos;s architecture and light. Misha can create something similar tailored to your space.
                </p>
                <a
                  href="tel:+12816500500"
                  className="block text-center bg-gold text-dark text-xs uppercase tracking-widest font-body font-medium px-6 py-3 rounded-full hover:bg-gold/90 transition-colors"
                >
                  Call (281) 650-0500
                </a>
                <Link
                  href={`/inquire${finish ? `?finish=${finish.categoryId}` : ''}`}
                  className="block text-center mt-3 font-body text-xs text-gold hover:text-bronze transition-colors"
                >
                  Or send an inquiry &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related Pieces */}
        {relatedPieces.length > 0 && (
          <section className="py-16 md:py-20 bg-sand">
            <div className="max-w-7xl mx-auto px-5">
              <h2 className="font-display text-3xl text-dark text-center mb-10">
                More {finish?.title || 'Related'} Work
              </h2>
              <PortfolioGrid pieces={relatedPieces} columns={3} />
            </div>
          </section>
        )}
      </main>

      <CtaSection headline="Ready to Begin Your Project?" />
    </>
  )
}
