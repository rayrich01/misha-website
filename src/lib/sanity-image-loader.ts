/* Cap max requested width to prevent oversized image delivery from Sanity CDN.
   Removes the w=3840 / w=2048 requests that were sending 4K images to mobile screens.
   See MC-LIVE-SEO-006A + MC-LIVE-SEO-012B for context. */
const MAX_WIDTH = 1920

export default function sanityImageLoader({
  src,
  width,
  quality,
}: {
  src: string
  width: number
  quality?: number
}) {
  const url = new URL(src)
  url.searchParams.set('w', Math.min(width, MAX_WIDTH).toString())
  url.searchParams.set('q', (quality || 75).toString())
  if (!url.searchParams.has('auto')) url.searchParams.set('auto', 'format')
  return url.toString()
}
