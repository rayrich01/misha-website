import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/preview/', '/api/', '/index'],
    },
    sitemap: 'https://mishacreations.com/sitemap.xml',
    host: 'https://mishacreations.com',
  }
}
