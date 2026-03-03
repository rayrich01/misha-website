import type { MetadataRoute } from 'next'

function baseUrl(): string {
  // Prefer explicit config; fall back to the canonical production domain.
  const explicit = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL
  if (explicit) return explicit.replace(/\/+$/, '')
  const vercel = process.env.VERCEL_URL
  if (vercel) return `https://${vercel}`.replace(/\/+$/, '')
  return 'https://mishacreations.com'.replace(/\/+$/, '')
}

export default function robots(): MetadataRoute.Robots {
  const url = baseUrl()
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Add disallow paths only if they are real and should not be indexed:
      // disallow: ['/private/', '/admin/'],
    },
    sitemap: `${url}/sitemap.xml`,
  }
}
