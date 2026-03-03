import type { MetadataRoute } from 'next'

function baseUrl(): string {
  // Prefer explicit config, then Vercel production domain, then fallback.
  const explicit = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL
  if (explicit) return explicit.replace(/\/+$/, '')
  const prodUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  if (prodUrl) return `https://${prodUrl}`.replace(/\/+$/, '')
  return 'https://mishacreations.com'
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
