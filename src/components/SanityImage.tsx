import Image from 'next/image'
import { sanityImageBaseUrl } from '@/lib/sanity'
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
  quality,
}: Props) {
  if (!image?.asset) return null

  const src = sanityImageBaseUrl(image)
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
        quality={quality}
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
      quality={quality}
      className={className}
      placeholder={blurDataURL ? 'blur' : 'empty'}
      blurDataURL={blurDataURL}
    />
  )
}
