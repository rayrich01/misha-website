import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

type SanityImageSource = Parameters<ReturnType<typeof createImageUrlBuilder>['image']>[0]

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'uz6uv7gy'
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: '2026-02-19',
  useCdn: true,
})

const builder = createImageUrlBuilder(sanityClient)

export function sanityImageUrl(
  source: SanityImageSource,
  opts: { width?: number; height?: number; quality?: number } = {}
): string {
  let b = builder.image(source).auto('format')
  if (opts.width) b = b.width(opts.width)
  if (opts.height) b = b.height(opts.height)
  if (opts.quality) b = b.quality(opts.quality)
  else b = b.quality(80)
  return b.url()
}
