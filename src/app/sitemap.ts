import type { MetadataRoute } from 'next'

function baseUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL
  if (explicit) return explicit.replace(/\/+$/, '')
  const vercel = process.env.VERCEL_URL
  if (vercel) return `https://${vercel}`.replace(/\/+$/, '')
  return 'https://mishacreations.com'.replace(/\/+$/, '')
}

export default function sitemap(): MetadataRoute.Sitemap {
  const url = baseUrl()

  // Minimal sitemap so /sitemap.xml no longer 404s.
  // Expand later with dynamic routes from Sanity (services, portfolio, blog, etc.).
  const staticPaths = [
    '',
    '/services',
    '/portfolio',
    '/about',
    '/contact',
  ]

  const now = new Date()

  return staticPaths.map((p, i) => ({
    url: `${url}${p}`,
    lastModified: now,
    changeFrequency: i === 0 ? 'weekly' : 'monthly',
    priority: i === 0 ? 1 : 0.7,
  }))
}
