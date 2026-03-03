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

  const now = new Date()

  const routes: MetadataRoute.Sitemap = [
    { url: `${url}`,          lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${url}/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${url}/portfolio`,lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${url}/inquire`,  lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${url}/about`,    lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${url}/contact`,  lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ]

  return routes
}
