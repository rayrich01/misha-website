'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'

export interface ThumbnailImage {
  src: string
  alt: string
  lqip?: string
}

interface Props {
  images: ThumbnailImage[]
  activeIndex: number
  onSelect: (index: number) => void
}

export function PortfolioThumbnailStrip({ images, activeIndex, onSelect }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto-scroll active thumbnail into view
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return
    const active = container.children[activeIndex] as HTMLElement | undefined
    active?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }, [activeIndex])

  if (images.length < 2) return null

  return (
    <div className="mt-6">
      <p className="font-body text-xs text-mist/50 mb-3 text-center">
        {images.length} images from this project
      </p>
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto pb-2 justify-center"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => onSelect(i)}
            className={`relative flex-shrink-0 w-14 h-14 rounded overflow-hidden transition-all ${
              i === activeIndex
                ? 'ring-2 ring-gold opacity-100'
                : 'opacity-50 hover:opacity-80'
            }`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={56}
              height={56}
              className="object-cover w-full h-full"
              placeholder={img.lqip ? 'blur' : undefined}
              blurDataURL={img.lqip || undefined}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
