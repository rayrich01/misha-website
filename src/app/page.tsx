import type { Metadata } from 'next'
import Link from 'next/link'
import { getMishaSelectPieces, getMainSiteSettings, getHomepageHero } from '@/lib/queries'
import { SanityImage } from '@/components/SanityImage'
import { NeighborhoodStrip } from '@/components/NeighborhoodStrip'
import { CtaSection } from '@/components/CtaSection'
import { JsonLd } from '@/components/JsonLd'
import { COPY, FINISH_SURFACES } from '@/lib/constants'

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://mishacreations.com',
  },
}

export const revalidate = 60

export default async function HomePage() {
  const [settings, pieces, heroPiece] = await Promise.all([
    getMainSiteSettings(),
    getMishaSelectPieces(6),
    getHomepageHero(),
  ])

  const headline = settings?.heroHeadline || "Houston's Premier Decorative Finishes Artist"
  const subheadline =
    settings?.heroSubheadline ||
    'Museum-quality murals, Venetian plaster, and custom finishes for River Oaks, Memorial, and Tanglewood estates'
  const heroImage = settings?.heroImage?.heroImage || heroPiece?.heroImage

  const testimonial = settings?.featuredTestimonial || {
    name: 'Anna Adkinson',
    quote:
      "Misha has an excellent gift on so many levels in customizing and creating beautiful scenes. I have known her 22 years now and love all her work. Absolutely incredible person with integrity and highest commitment to customers' full satisfaction.",
    duration: '22-year client',
    location: 'Houston, TX',
  }

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Misha Creations',
    description: 'Master faux artist specializing in custom wall murals, venetian plaster, and luxury decorative painting in Houston',
    url: 'https://mishacreations.com',
    telephone: COPY.phone,
    email: 'info@mishacreations.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Houston',
      addressRegion: 'TX',
      addressCountry: 'US',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 29.7604, longitude: -95.3698 },
    areaServed: [
      { '@type': 'City', name: 'Houston' },
      { '@type': 'Neighborhood', name: 'River Oaks' },
      { '@type': 'Neighborhood', name: 'Memorial' },
      { '@type': 'City', name: 'The Woodlands' },
      { '@type': 'City', name: 'Cypress' },
      { '@type': 'City', name: 'Spring' },
      { '@type': 'City', name: 'Tomball' },
      { '@type': 'City', name: 'Klein' },
      { '@type': 'Neighborhood', name: 'West University' },
      { '@type': 'Neighborhood', name: 'Tanglewood' },
      { '@type': 'City', name: 'Bellaire' },
      { '@type': 'City', name: 'Katy' },
      { '@type': 'Neighborhood', name: 'Piney Point Village' },
      { '@type': 'Neighborhood', name: 'Bunker Hill Village' },
      { '@type': 'Neighborhood', name: 'Hunters Creek Village' },
      { '@type': 'City', name: 'Magnolia' },
      { '@type': 'City', name: 'Conroe' },
      { '@type': 'City', name: 'Pearland' },
      { '@type': 'City', name: 'Missouri City' },
    ],
    serviceType: [
      'Custom Wall Murals',
      'Decorative Painting',
      'Faux Finishing',
      'Venetian Plaster',
      'Ceiling Murals',
      'Cabinet Glazing',
      'Limewash',
      "Trompe L'oeil",
    ],
    priceRange: '$$$',
    openingHours: 'Mo-Fr 09:00-18:00',
    sameAs: [
      COPY.social.googleMaps,
      COPY.social.instagram,
      COPY.social.facebook,
      COPY.social.pinterest,
    ],
    image: 'https://mishacreations.com/og-image.jpg',
  }

  return (
    <>
      <JsonLd data={localBusinessSchema} />

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {heroImage && (
          <div className="absolute inset-0">
            <SanityImage image={heroImage} fill priority sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />
          </div>
        )}
        {!heroImage && <div className="absolute inset-0 bg-charcoal" />}
        <div className="relative z-10 text-left px-5 md:px-12 max-w-4xl mr-auto pt-20">
          <h1 className="font-display text-[42px] leading-[52px] md:text-[60px] md:leading-[72px] text-white mb-6">
            {headline}
          </h1>
          <p className="font-body text-lg md:text-xl text-white/90 mb-10 max-w-2xl leading-relaxed">
            {subheadline}
          </p>
          <a
            href="tel:+12816500500"
            className="inline-block bg-cream text-charcoal text-sm uppercase tracking-widest px-10 py-4 rounded-full hover:bg-sand transition-colors font-body font-medium shadow-xl"
          >
            Call (281) 650-0500
          </a>
        </div>
      </section>

      <NeighborhoodStrip />

      {/* Misha Select Preview */}
      {pieces.length > 0 && (
        <section className="py-16 md:py-24 bg-cream">
          <div className="max-w-7xl mx-auto px-5">
            <div className="text-center mb-14">
              <h2 className="font-display text-3xl md:text-5xl text-dark mb-4">
                Selected Works
              </h2>
              <p className="font-body text-charcoal/85 max-w-2xl mx-auto">
                A curated selection of decorative finishes, murals, and plaster work customized to our clients&apos; tastes across Houston&apos;s finest homes.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pieces.map((piece) => {
                const finish = FINISH_SURFACES.find((f) => f.categoryId === piece.category)
                return (
                  <Link
                    key={piece._id}
                    href={finish ? `/services/${finish.slug}` : '/gallery'}
                    className="group relative aspect-[4/5] rounded-lg overflow-hidden shadow-md"
                  >
                    <SanityImage
                      image={piece.heroImage}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      alt={`${piece.title} - ${piece.category} by Misha Creations Houston`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <p className="font-editorial text-xl text-white">{piece.title}</p>
                      {piece.location && (
                        <p className="font-body text-sm text-white/70 mt-1">{piece.location}</p>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Testimonial */}
      <section className="py-16 md:py-24 bg-sage">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <div className="flex justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-6 h-6 text-gold" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <blockquote className="font-body text-lg md:text-xl leading-relaxed text-dark italic mb-8">
            &ldquo;{testimonial.quote}&rdquo;
          </blockquote>
          <p className="font-editorial text-lg text-dark">{testimonial.name}</p>
          <p className="font-body text-sm text-bronze">
            {testimonial.duration} &middot; {testimonial.location}
          </p>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
