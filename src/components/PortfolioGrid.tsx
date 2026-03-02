import type { PortfolioPiece } from '@/lib/queries'
import { PortfolioCard } from '@/components/PortfolioCard'

interface PortfolioGridProps {
  pieces: PortfolioPiece[]
  columns?: 2 | 3
  showCategory?: boolean
}

export function PortfolioGrid({ pieces, columns = 3, showCategory }: PortfolioGridProps) {
  const gridCols =
    columns === 2
      ? 'grid-cols-1 sm:grid-cols-2'
      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'

  const sizes =
    columns === 2
      ? '(max-width: 640px) 100vw, 50vw'
      : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'

  return (
    <div className={`grid ${gridCols} gap-6`}>
      {pieces.map((piece, i) => (
        <PortfolioCard
          key={piece._id}
          piece={piece}
          showCategory={showCategory}
          sizes={sizes}
          priority={i < 3}
        />
      ))}
    </div>
  )
}
