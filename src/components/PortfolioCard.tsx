import Link from 'next/link'
import type { PortfolioPiece } from '@/lib/queries'
import { SanityImage } from '@/components/SanityImage'
import { FINISH_SURFACES } from '@/lib/constants'

interface PortfolioCardProps {
  piece: PortfolioPiece
  showCategory?: boolean
  sizes: string
  priority?: boolean
}

export function PortfolioCard({ piece, showCategory, sizes, priority }: PortfolioCardProps) {
  const imageCount = 1 + (piece.images?.length || 0)
  const finish = FINISH_SURFACES.find((f) => f.categoryId === piece.category)

  return (
    <Link
      href={`/portfolio/${piece.slug.current}`}
      className="group relative aspect-[4/5] rounded-lg overflow-hidden shadow-md block"
    >
      <SanityImage
        image={piece.heroImage}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover group-hover:scale-105 transition-transform duration-500"
        alt={piece.heroImage?.alt || `${piece.title} by Misha Creations Houston`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />

      {/* Image count badge */}
      {imageCount > 1 && (
        <span className="absolute top-3 right-3 font-body text-[10px] tracking-wider text-cream bg-charcoal/60 backdrop-blur-sm px-2.5 py-1 rounded-full">
          {imageCount} images
        </span>
      )}

      {/* Info overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        {showCategory && finish && (
          <p className="font-body text-[10px] uppercase tracking-[0.16em] text-gold mb-1.5">
            {finish.title}
          </p>
        )}
        <p className="font-editorial text-lg text-white leading-snug">{piece.title}</p>
        {piece.location && (
          <p className="font-body text-sm text-white/65 mt-1">{piece.location}</p>
        )}
      </div>
    </Link>
  )
}
