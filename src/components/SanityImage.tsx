import Image from 'next/image'
import { sanityImageUrl } from '@/lib/sanity'
import type { SanityImage as SanityImageType } from '@/lib/queries'

interface Props {
  image: SanityImageType
  alt?: string
  width?: number
  height?: number
  priority?: boolean
  fill?: boolean
  sizes?: string
  className?: string
  quality?: number
}

export function SanityImage({
  image,
  alt,
  width = 800,
  height = 600,
  priority = false,
  fill = false,
  sizes,
  className,
  quality = 80,
}: Props) {
  if (!image?.asset) return null

  const src = sanityImageUrl(image, { width: fill ? 1600 : width, height: fill ? undefined : height, quality })
  const altText = alt || image.alt || 'Misha Creations decorative finish'
  const blurDataURL = image.lqip || undefined

  if (fill) {
    return (
      <Image
        src={src}
        alt={altText}
        fill
        priority={priority}
        sizes={sizes || '100vw'}
        className={className}
        placeholder={blurDataURL ? 'blur' : 'empty'}
        blurDataURL={blurDataURL}
        style={image.hotspot ? { objectPosition: `${image.hotspot.x * 100}% ${image.hotspot.y * 100}%` } : undefined}
      />
    )
  }

  return (
    <Image
      src={src}
      alt={altText}
      width={width}
      height={height}
      priority={priority}
      sizes={sizes}
      className={className}
      placeholder={blurDataURL ? 'blur' : 'empty'}
      blurDataURL={blurDataURL}
    />
  )
}
