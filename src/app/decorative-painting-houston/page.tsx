import type { Metadata } from 'next'
import Link from 'next/link'
import { getFeaturedPieces } from '@/lib/queries'
import { PortfolioGrid } from '@/components/PortfolioGrid'
import { CtaSection } from '@/components/CtaSection'
import { JsonLd } from '@/components/JsonLd'

// ── SEO Metadata ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'Decorative Painting Houston',
  description:
    "Houston's premier decorative painting artist. Venetian plaster, hand-painted murals, faux finishes & luxury wall treatments. River Oaks, Memorial, Tanglewood.",
  alternates: {
    canonical: 'https://mishacreations.com/decorative-painting-houston',
  },
  openGraph: {
    title: 'Decorative Painting Houston | Misha Creations',
    description:
      "Houston's premier decorative painting artist. Venetian plaster, murals, faux finishes for luxury estates.",
    url: 'https://mishacreations.com/decorative-painting-houston',
    type: 'website',
  },
}

// ── Service cards ────────────────────────────────────────────────────────────
const SERVICES = [
  {
    title: 'Venetian Plaster',
    body: 'Authentic lime-based plaster applied by hand, burnished to a luminous depth that changes with light throughout the day.',
    href: '/services/venetian-lime-plaster',
  },
  {
    title: 'Hand-Painted Murals',
    body: "Original wall and ceiling murals designed for your specific architecture — from botanical chinoiserie to trompe l'oeil illusions.",
    href: '/services/luxury-wall-murals',
  },
  {
    title: 'Faux Specialty Finishes',
    body: 'Faux marble, aged stone, metallic treatments, and custom textured finishes that bring the material world into your interior.',
    href: '/services/faux-specialty-finishes',
  },
  {
    title: 'Decorative Ceilings',
    body: 'Coffered medallions, sky domes, and hand-detailed ceiling treatments that transform the fifth wall into a signature statement.',
    href: '/services/decorative-ceilings',
  },
  {
    title: 'Modello Stencils',
    body: 'Precision stencil artistry applied with hand-mixed pigments — crisp geometric and organic patterns for walls, floors, and ceilings.',
    href: '/services/modello-stencils',
  },
  {
    title: "Trompe L'Oeil",
    body: 'Architectural illusions, painted drapery, and dimensional effects that expand space and defy expectations.',
    href: '/services/trompe-loeil-architectural-illusions',
  },
]

const NEIGHBORHOODS = [
  { name: 'River Oaks', href: '/areas/river-oaks-luxury-murals' },
  { name: 'Memorial', href: '/areas/memorial' },
  { name: 'Tanglewood', href: '/areas/tanglewood' },
  { name: 'West University', href: '/areas/west-university' },
  { name: 'The Woodlands', href: '/areas/the-woodlands' },
  { name: 'Bellaire', href: '/areas/bellaire' },
]

// ── Page ─────────────────────────────────────────────────────────────────────
export default async function DecorativePaintingHoustonPage() {
  let pieces: Awaited<ReturnType<typeof getFeaturedPieces>> = []
  try {
    pieces = await getFeaturedPieces(6)
  } catch (e) {
    console.error('Sanity fetch failed for decorative-painting-houston:', e)
  }

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Misha Creations',
    url: 'https://mishacreations.com',
    description:
      "Houston's premier decorative painting artist specializing in Venetian plaster, hand-painted murals, and luxury decorative finishes.",
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Houston',
      addressRegion: 'TX',
      addressCountry: 'US',
    },
    areaServed: {
      '@type': 'City',
      name: 'Houston',
    },
  }

  return (
    <>
      <JsonLd data={localBusinessSchema} />

      {/* ── Hero Section ── */}
      <section className="bg-charcoal pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <p className="font-body text-xs uppercase tracking-[0.22em] text-gold mb-5">
            Houston Decorative Painting
          </p>
          <h1 className="font-display text-[42px] leading-[52px] md:text-[58px] md:leading-[68px] text-white mb-6">
            Decorative Painting in Houston
          </h1>
          <p className="font-body text-lg text-white/80 leading-relaxed max-w-2xl mx-auto mb-10">
            Misha has spent 25 years bringing extraordinary surfaces to Houston&apos;s
            most distinguished homes — Venetian plaster walls, hand-painted ceiling
            murals, custom faux finishes, and decorative treatments that transform
            architecture into art.
          </p>
          <Link
            href="/consult"
            className="inline-block bg-gold text-dark text-sm uppercase tracking-widest px-10 py-4 rounded-full hover:bg-gold/90 transition-colors font-body font-medium"
          >
            Schedule a Consultation
          </Link>
        </div>
      </section>

      {/* ── Services Section ── */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-4xl mx-auto px-5">
          <h2 className="font-display text-3xl md:text-4xl text-dark mb-14 text-center">
            Decorative Painting Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((svc) => (
              <div key={svc.title} className="border-t border-bronze/20 pt-6">
                <h3 className="font-editorial text-xl text-dark mb-3">
                  <Link href={svc.href} className="hover:text-gold transition-colors">
                    {svc.title}
                  </Link>
                </h3>
                <p className="font-body text-charcoal/80 leading-relaxed text-sm">
                  {svc.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Portfolio Grid ── */}
      {pieces.length > 0 && (
        <section className="py-16 md:py-24 bg-sand">
          <div className="max-w-7xl mx-auto px-5">
            <h2 className="font-display text-3xl md:text-4xl text-dark mb-12 text-center">
              Recent Decorative Painting Projects
            </h2>
            <PortfolioGrid pieces={pieces} />
          </div>
        </section>
      )}

      {/* ── Areas Served ── */}
      <section className="py-16 md:py-20 bg-cream">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <h2 className="font-display text-3xl md:text-4xl text-dark mb-6">
            Serving Houston&apos;s Premier Neighborhoods
          </h2>
          <p className="font-body text-charcoal/70 leading-loose">
            {NEIGHBORHOODS.map((n, i) => (
              <span key={n.name}>
                <Link href={n.href} className="text-charcoal hover:text-gold transition-colors font-medium">
                  {n.name}
                </Link>
                {i < NEIGHBORHOODS.length - 1 && <span className="text-bronze"> &middot; </span>}
              </span>
            ))}
            <span className="text-bronze"> &middot; </span>
            <span>Briargrove &middot; Royden Oaks &middot; Energy Corridor &middot; Piney Point Village</span>
          </p>
        </div>
      </section>

      {/* ── Closing CTA ── */}
      <CtaSection
        headline="Begin Your Commission"
        body="Every project begins with a consultation — Misha studies your architecture, light, and vision before recommending a single finish. Contact us to schedule yours."
      />
    </>
  )
}
