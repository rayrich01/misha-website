import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
  },
  async redirects() {
    return [
      // Phase 1 readdy service URLs → new finish surfaces
      { source: '/services/luxury-wall-murals', destination: '/wall-murals-houston', permanent: true },
      { source: '/services/venetian-lime-plaster', destination: '/venetian-plaster-houston', permanent: true },
      { source: '/services/trompe-loeil-architectural-illusions', destination: '/trompe-loeil-houston', permanent: true },
      { source: '/services/faux-specialty-finishes', destination: '/faux-finishes-houston', permanent: true },
      { source: '/services/childrens-themed-rooms', destination: '/childrens-rooms-houston', permanent: true },
      { source: '/services/themed-rooms-skyscapes', destination: '/themed-rooms-houston', permanent: true },
      { source: '/services/decorative-ceilings', destination: '/decorative-ceilings-houston', permanent: true },
      { source: '/services/modello-stencils', destination: '/modello-stencils-houston', permanent: true },
      // Readdy aggregate pages → entry
      { source: '/services', destination: '/', permanent: true },
      { source: '/gallery', destination: '/', permanent: true },
      { source: '/blog', destination: '/', permanent: true },
      { source: '/faq', destination: '/', permanent: true },
      { source: '/recent-projects', destination: '/', permanent: true },
      { source: '/contact', destination: '/consult', permanent: true },
      { source: '/book-consultation', destination: '/consult', permanent: true },
      // Old area pages → neighborhood surfaces
      { source: '/areas/river-oaks-luxury-murals', destination: '/river-oaks', permanent: true },
      // Old service slugs (no /services/ prefix)
      { source: '/luxury-wall-murals', destination: '/wall-murals-houston', permanent: true },
      { source: '/venetian-lime-plaster', destination: '/venetian-plaster-houston', permanent: true },
      { source: '/venetian-plaster', destination: '/venetian-plaster-houston', permanent: true },
      { source: '/faux-finishes', destination: '/faux-finishes-houston', permanent: true },
      { source: '/murals', destination: '/wall-murals-houston', permanent: true },
      { source: '/cabinet-glazing', destination: '/faux-finishes-houston', permanent: true },
      { source: '/feed', destination: '/', permanent: true },
      { source: '/lander', destination: '/', permanent: true },
      { source: '/cypress', destination: '/', permanent: true },
    ]
  },
}

export default nextConfig
