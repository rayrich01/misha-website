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
  url.searchParams.set('w', width.toString())
  url.searchParams.set('q', (quality || 75).toString())
  if (!url.searchParams.has('auto')) url.searchParams.set('auto', 'format')
  return url.toString()
}
