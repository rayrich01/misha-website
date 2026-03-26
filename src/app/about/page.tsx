import type { Metadata } from 'next'
import { CtaSection } from '@/components/CtaSection'
import { JsonLd } from '@/components/JsonLd'
import { PROCESS_STEPS } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'About Misha | 25+ Years of Decorative Artistry in Houston | Misha Creations',
  description: 'Meet Misha — muralist, luminist, and decorative artist with 25+ years transforming Houston\'s finest homes. Venetian plaster, luxury murals, and hand-applied finishes for River Oaks, Memorial, and Tanglewood.',
  alternates: {
    canonical: 'https://mishacreations.com/about',
  },
  openGraph: {
    title: 'About Misha | 25+ Years of Decorative Artistry in Houston | Misha Creations',
    description: 'Meet Misha — muralist, luminist, and decorative artist with 25+ years transforming Houston\'s finest homes. Venetian plaster, luxury murals, and hand-applied finishes for River Oaks, Memorial, and Tanglewood.',
    url: 'https://mishacreations.com/about',
    type: 'profile',
  },
}

export default function AboutPage() {
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Misha Creations',
    url: 'https://mishacreations.com',
    description:
      "Houston's premier decorative finishes artist with 25+ years of experience",
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Houston',
      addressRegion: 'TX',
      addressCountry: 'US',
    },
  }

  return (
    <>
      <JsonLd data={orgSchema} />

      {/* Hero */}
      <section className="bg-ink pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <h1 className="font-display text-[42px] leading-[52px] md:text-[58px] md:leading-[68px] text-cream mb-6">
            The Story Behind the Finish
          </h1>
          <p className="font-body text-lg text-mist leading-relaxed">
            Every surface tells a story. Ours began over 25 years ago with a simple belief: your home should move you.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-24 bg-warm">
        <div className="max-w-3xl mx-auto px-5">
          <h2 className="font-display text-3xl md:text-4xl text-cream mb-8 text-center">
            Art That Lives With You
          </h2>
          <div className="font-body text-mist leading-relaxed space-y-6">
            <p>
              Misha is a muralist, luminist, and decorative artist — painting surfaces that change with the
              hour, breathe with the room, and hold up under the scrutiny of Houston&apos;s most discerning
              homeowners. For over 25 years, she has transformed the finest homes in River Oaks, Memorial,
              Tanglewood, West University, and The Woodlands.
            </p>
            <p>
              Every finish begins with the architecture and ends with the light. Whether it&apos;s the subtle
              warmth of hand-polished Venetian plaster in an entry rotunda, a sky mural that transforms a
              child&apos;s ceiling into infinity, or a trompe-l&apos;oeil vista that opens a windowless powder
              room to the gardens of Versailles — Misha&apos;s work is always customized to your tastes and
              designed for the specific room it inhabits.
            </p>
            <p>
              She works directly with homeowners and their design teams, coordinating around construction
              schedules, studying sight lines, and creating physical finish samples for approval before any
              brushwork begins. The result is art that doesn&apos;t just decorate a wall — it completes a home.
            </p>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-24 bg-ink">
        <div className="max-w-4xl mx-auto px-5">
          <h2 className="font-display text-3xl md:text-4xl text-cream mb-14 text-center">
            How We Work Together
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PROCESS_STEPS.map((step) => (
              <div key={step.step} className="bg-warm rounded-lg p-8">
                <span className="font-editorial text-4xl text-gold/60">{step.step}</span>
                <h3 className="font-editorial text-xl text-cream mt-2 mb-3">{step.name}</h3>
                <p className="font-body text-mist leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        headline="Ready to Begin?"
        body="Call today for a complimentary consultation. Misha will visit your home, study the light and architecture, and show you what is possible."
      />
    </>
  )
}
