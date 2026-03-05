import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    loader: 'custom',
    loaderFile: './src/lib/sanity-image-loader.ts',
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
      // ── Readdy legacy service URLs (flat, no /services/ prefix) ──
      { source: '/luxury-wall-murals', destination: '/services/luxury-wall-murals', permanent: true },
      { source: '/venetian-lime-plaster', destination: '/services/venetian-lime-plaster', permanent: true },
      { source: '/venetian-plaster', destination: '/services/venetian-lime-plaster', permanent: true },
      { source: '/trompe-loeil-architectural-illusions', destination: '/services/trompe-loeil-architectural-illusions', permanent: true },
      { source: '/childrens-themed-rooms', destination: '/services/childrens-themed-rooms', permanent: true },
      { source: '/themed-rooms-skyscapes', destination: '/services/themed-rooms-skyscapes', permanent: true },
      { source: '/decorative-ceilings', destination: '/services/decorative-ceilings', permanent: true },
      { source: '/faux-specialty-finishes', destination: '/services/faux-specialty-finishes', permanent: true },
      { source: '/modello-stencils', destination: '/services/modello-stencils', permanent: true },
      { source: '/faux-finishes', destination: '/services/faux-specialty-finishes', permanent: true },
      { source: '/murals', destination: '/services/luxury-wall-murals', permanent: true },
      { source: '/cabinet-glazing', destination: '/services/faux-specialty-finishes', permanent: true },

      // ── Previous misha-website flat -houston URLs → new /services/ URLs ──
      { source: '/venetian-plaster-houston', destination: '/services/venetian-lime-plaster', permanent: true },
      { source: '/wall-murals-houston', destination: '/services/luxury-wall-murals', permanent: true },
      { source: '/faux-finishes-houston', destination: '/services/faux-specialty-finishes', permanent: true },
      { source: '/decorative-ceilings-houston', destination: '/services/decorative-ceilings', permanent: true },
      { source: '/childrens-rooms-houston', destination: '/services/childrens-themed-rooms', permanent: true },
      { source: '/themed-rooms-houston', destination: '/services/themed-rooms-skyscapes', permanent: true },
      { source: '/trompe-loeil-houston', destination: '/services/trompe-loeil-architectural-illusions', permanent: true },
      { source: '/modello-stencils-houston', destination: '/services/modello-stencils', permanent: true },
      { source: '/skyscapes-houston', destination: '/services/themed-rooms-skyscapes', permanent: true },
      { source: '/commercial-houston', destination: '/gallery', permanent: true },

      // ── Area pages ──
      { source: '/river-oaks', destination: '/areas/river-oaks-luxury-murals', permanent: true },
      { source: '/memorial', destination: '/areas/memorial', permanent: true },
      { source: '/tanglewood', destination: '/areas/tanglewood', permanent: true },
      { source: '/west-university', destination: '/areas/west-university', permanent: true },
      { source: '/the-woodlands', destination: '/areas/the-woodlands', permanent: true },
      { source: '/bellaire', destination: '/areas/bellaire', permanent: true },
      { source: '/cypress', destination: '/', permanent: true },

      // ── Readdy legacy utility URLs ──
      { source: '/feed', destination: '/blog', permanent: true },
      { source: '/lander', destination: '/', permanent: true },
      { source: '/contact', destination: '/consult', permanent: true },
      { source: '/book-consultation', destination: '/consult', permanent: true },

      // ── Previous misha-website portfolio → gallery ──
      { source: '/portfolio', destination: '/gallery', permanent: true },
      { source: '/portfolio/:slug', destination: '/gallery/:slug', permanent: true },
    ]
  },
}

export default nextConfig
