import type { MetadataRoute } from 'next'
import { FINISH_SURFACES, NEIGHBORHOODS } from '@/lib/constants'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://mishacreations.com'
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base,                          lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/about`,               lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/decorative-painting-houston`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/services`,             lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/gallery`,              lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${base}/recent-projects`,      lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${base}/process`,              lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/blog`,                 lastModified: now, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${base}/blog/guide-to-venetian-lime-plaster-houston`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/blog/guide-to-decorative-painting-houston`,   lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/faq`,                  lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/inquire`,              lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/consult`,              lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
  ]

  const serviceRoutes: MetadataRoute.Sitemap = FINISH_SURFACES.map((f) => ({
    url: `${base}/services/${f.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  const areaRoutes: MetadataRoute.Sitemap = NEIGHBORHOODS.map((n) => ({
    url: `${base}/areas/${n.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...serviceRoutes, ...areaRoutes]
}
