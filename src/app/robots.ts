import type { MetadataRoute } from 'next'

function baseUrl(): string {
  // Prefer explicit config, then Vercel production domain, then fallback.
  const explicit = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL
  if (explicit) return explicit.replace(/\/+$/, '')
  const prodUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  if (prodUrl) return `https://${prodUrl}`.replace(/\/+$/, '')
  return 'https://mishacreations.com'
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
