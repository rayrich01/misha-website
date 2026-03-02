'use client'

import { useState } from 'react'
import { PortfolioZoomImage } from '@/components/PortfolioZoomImage'
import { PortfolioThumbnailStrip, type ThumbnailImage } from '@/components/PortfolioThumbnailStrip'

interface ImageData {
  src: string
  alt: string
  lqip?: string
  width: number
  height: number
}

interface Props {
  images: ImageData[]
  thumbnails: ThumbnailImage[]
}

export function PortfolioDetailClient({ images, thumbnails }: Props) {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = images[activeIndex]

  return (
    <div>
      <PortfolioZoomImage
        key={activeIndex}
        src={active.src}
        alt={active.alt}
        lqip={active.lqip}
        width={active.width}
        height={active.height}
      />
      <PortfolioThumbnailStrip
        images={thumbnails}
        activeIndex={activeIndex}
        onSelect={setActiveIndex}
      />
    </div>
  )
}
