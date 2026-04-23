import type { Metadata } from 'next'
import { CtaSection } from '@/components/CtaSection'
import { JsonLd } from '@/components/JsonLd'
import { PROCESS_STEPS } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'About Misha Thibeaux | 25+ Years of Decorative Artistry in Houston | Misha Creations',
  description: "Meet Misha Thibeaux — muralist, luminist, and decorative artist with 25+ years transforming Houston's finest homes. Formal training at Buon Fresco School of Venetian Plastering, Nicola Vigini Studios, Faux Effects, Definitive School of Decorative Arts, Nina's Decorative Finishes, and iVenetian with Eli Lucero.",
  alternates: {
    canonical: 'https://mishacreations.com/about',
  },
  openGraph: {
    title: 'About Misha Thibeaux | 25+ Years of Decorative Artistry in Houston | Misha Creations',
    description: "Meet Misha Thibeaux — muralist, luminist, and decorative artist with 25+ years transforming Houston's finest homes. Formal training at Buon Fresco School of Venetian Plastering, Nicola Vigini Studios, Faux Effects, Definitive School of Decorative Arts, Nina's Decorative Finishes, and iVenetian with Eli Lucero.",
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
            Every surface tells a story. Ours began over 25 years ago with a simple belief: Your home or business should move you, your guests and customers.
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
              Drawing since the age of three and painting from the age of six, Misha began her professional
              decorative arts career in 1999. Over more than two decades, she has grown into a masterful
              luminist — a painter of light — bathing her murals in the glow that transforms ordinary walls
              into living expressions of texture, depth, and radiance.
            </p>
            <p>
              Her work blends authentic Italian Venetian lime plaster, reflective finishes, and hand-crafted
              detail to create interiors that seem to glow from within. Every finish begins with the
              architecture and ends with the light already present in the room — whether it&apos;s the subtle
              warmth of hand-polished Venetian plaster in an entry rotunda, a sky mural that turns a
              child&apos;s ceiling into infinity, or a trompe-l&apos;oeil vista that opens a windowless powder
              room to the gardens of Versailles.
            </p>
            <p>
              Misha has mastered the art of duplicating earth&apos;s elements — marble, wood graining, and
              faux stone — and maintains an extensive portfolio of cabinet finishes alongside her mural,
              plaster, and themed-environment work. She works directly with homeowners and their design
              teams, coordinating around construction schedules, studying sight lines, and creating physical
              finish samples for approval before any brushwork begins.
            </p>
          </div>
        </div>
      </section>

      {/* Formal Training */}
      <section className="py-16 md:py-24 bg-ink">
        <div className="max-w-5xl mx-auto px-5">
          <p className="font-body text-xs tracking-[0.2em] uppercase text-gold text-center mb-4">
            Formal Training &amp; Certifications
          </p>
          <h2 className="font-editorial text-3xl md:text-4xl text-cream mb-4 text-center">
            Schools, Ateliers &amp; Mentorships
          </h2>
          <p className="font-body text-mist leading-relaxed text-center max-w-2xl mx-auto mb-12">
            Misha&apos;s technique is the product of sustained study with some of the most respected names
            in traditional decorative arts — a signature style that merges classical European method with
            modern luminosity.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="border-t-2 border-gold pt-6">
              <h3 className="font-editorial text-xl text-cream mb-1">Buon Fresco School of Venetian Plastering</h3>
              <p className="font-body text-sm text-gold/80 mb-3">Washington, D.C.</p>
              <p className="font-body text-mist text-sm leading-relaxed">
                Authentic Italian lime-plaster technique — slaked-lime grassello, multi-layer hand application, and burnishing.
              </p>
            </div>
            <div className="border-t-2 border-gold pt-6">
              <h3 className="font-editorial text-xl text-cream mb-1">Nicola Vigini Studios</h3>
              <p className="font-body text-mist text-sm leading-relaxed mt-3">
                Studio mentorship with master decorative artist Nicola Vigini — classical European decorative and fine-art disciplines.
              </p>
            </div>
            <div className="border-t-2 border-gold pt-6">
              <h3 className="font-editorial text-xl text-cream mb-1">Faux Effects</h3>
              <p className="font-body text-sm text-gold/80 mb-3">San Antonio, TX</p>
              <p className="font-body text-mist text-sm leading-relaxed">
                Advanced faux, specialty, and specification-grade decorative finishes.
              </p>
            </div>
            <div className="border-t-2 border-gold pt-6">
              <h3 className="font-editorial text-xl text-cream mb-1">Definitive School of Decorative Arts</h3>
              <p className="font-body text-sm text-gold/80 mb-3">Houston, TX</p>
            </div>
            <div className="border-t-2 border-gold pt-6">
              <h3 className="font-editorial text-xl text-cream mb-1">Nina&apos;s Decorative Finishes</h3>
              <p className="font-body text-sm text-gold/80 mb-3">Houston, TX</p>
            </div>
            <div className="border-t-2 border-gold pt-6">
              <h3 className="font-editorial text-xl text-cream mb-1">iVenetian with Eli Lucero</h3>
              <p className="font-body text-mist text-sm leading-relaxed mt-3">
                True Lime Venetian plasters, reflective Grassello, and matte Marmorino.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Notable Portfolio */}
      <section className="py-16 md:py-24 bg-warm">
        <div className="max-w-3xl mx-auto px-5">
          <p className="font-body text-xs tracking-[0.2em] uppercase text-gold text-center mb-4">
            Notable Portfolio
          </p>
          <h2 className="font-editorial text-3xl md:text-4xl text-cream mb-12 text-center">
            Commissions &amp; Productions
          </h2>
          <ul className="divide-y divide-mist/20">
            <li className="py-5">
              <h3 className="font-editorial text-lg text-cream mb-1">Houston Zoo</h3>
              <p className="font-body text-mist text-sm leading-relaxed">
                Hand-painted tropical rainforest murals and dimensional plaster relief — red-eyed tree frog on Bird of Paradise,
                green python jungle canopy, and a waterfall commercial door panel.
              </p>
            </li>
            <li className="py-5">
              <h3 className="font-editorial text-lg text-cream mb-1">Rainforest Café</h3>
              <p className="font-body text-mist text-sm leading-relaxed">Immersive themed environments.</p>
            </li>
            <li className="py-5">
              <h3 className="font-editorial text-lg text-cream mb-1">Katy Mills Mall</h3>
              <p className="font-body text-mist text-sm leading-relaxed">Commercial decorative painting and themed retail environments.</p>
            </li>
            <li className="py-5">
              <h3 className="font-editorial text-lg text-cream mb-1">Captain Brad&apos;s Coastal Kitchen / Juicy Crab — Willowbrook</h3>
              <p className="font-body text-mist text-sm leading-relaxed">Commercial restaurant decorative painting.</p>
            </li>
            <li className="py-5">
              <h3 className="font-editorial text-lg text-cream mb-1">Extreme Makeover: Home Edition (ABC)</h3>
              <p className="font-body text-mist text-sm leading-relaxed">
                Lead artist, Houston episodes — The Beach Family (2010) and The Johnsons (2011).
              </p>
            </li>
            <li className="py-5">
              <h3 className="font-editorial text-lg text-cream mb-1">Florida Wild (feature film, 2024)</h3>
              <p className="font-body text-mist text-sm leading-relaxed">
                Lead Scenic Artist — built the visual world of an 1800s cowboy town on the Myakka City, Florida set.
              </p>
            </li>
            <li className="py-5">
              <h3 className="font-editorial text-lg text-cream mb-1">Elbert Wood Community Mural</h3>
              <p className="font-body text-mist text-sm leading-relaxed">
                Heirloom-grade canvas mural honoring a 93-year-old veteran; mounted like wallpaper so the family can remove and re-hang it.
              </p>
            </li>
            <li className="py-5">
              <h3 className="font-editorial text-lg text-cream mb-1">500+ Private Luxury Residences</h3>
              <p className="font-body text-mist text-sm leading-relaxed">
                Across Houston since 2000 — River Oaks, Memorial, Tanglewood, West University, The Woodlands,
                Bellaire, Piney Point, Bunker Hill, and Energy Corridor.
              </p>
            </li>
          </ul>
        </div>
      </section>

      {/* Artners */}
      <section className="py-16 md:py-24 bg-ink">
        <div className="max-w-4xl mx-auto px-5">
          <p className="font-body text-xs tracking-[0.2em] uppercase text-gold text-center mb-4">
            The Studio Circle
          </p>
          <h2 className="font-editorial text-3xl md:text-4xl text-cream mb-4 text-center">
            Artners &mdash; Collaborating Master Artists
          </h2>
          <p className="font-body italic text-mist text-center max-w-xl mx-auto mb-12">
            Peer artists Misha trusts and collaborates with on large commissions.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border-t-2 border-gold pt-6">
              <h3 className="font-editorial text-lg text-cream mb-1">Eli Lucero</h3>
              <p className="font-body text-mist text-sm leading-relaxed">
                Master artist (retired) — Venetian Grassello plaster and Modello stenciled ceilings.
              </p>
            </div>
            <div className="border-t-2 border-gold pt-6">
              <h3 className="font-editorial text-lg text-cream mb-1">Julio</h3>
              <p className="font-body text-mist text-sm leading-relaxed">
                Master Grassello Venetian plaster applicator.
              </p>
            </div>
            <div className="border-t-2 border-gold pt-6">
              <h3 className="font-editorial text-lg text-cream mb-1">Gary Hannon / Hannon Designs</h3>
              <p className="font-body text-mist text-sm leading-relaxed">Design partner.</p>
            </div>
            <div className="border-t-2 border-gold pt-6">
              <h3 className="font-editorial text-lg text-cream mb-1">Laurie Lopez Greiger / Studio Laurie Finishes</h3>
              <p className="font-body text-mist text-sm leading-relaxed">Regular collaborator.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials & Recognition */}
      <section className="py-16 md:py-24 bg-warm">
        <div className="max-w-2xl mx-auto px-5">
          <p className="font-body text-xs tracking-[0.2em] uppercase text-gold text-center mb-4">
            Credentials &amp; Recognition
          </p>
          <h2 className="font-editorial text-3xl md:text-4xl text-cream mb-10 text-center">
            Experience &amp; Industry Standing
          </h2>
          <ul className="space-y-3 font-editorial text-lg text-cream">
            <li className="flex gap-3 items-start border-b border-mist/20 pb-3">
              <span className="text-gold">&bull;</span>25+ years of decorative painting practice (professional since 1999)
            </li>
            <li className="flex gap-3 items-start border-b border-mist/20 pb-3">
              <span className="text-gold">&bull;</span>500+ trade commissions completed
            </li>
            <li className="flex gap-3 items-start border-b border-mist/20 pb-3">
              <span className="text-gold">&bull;</span>European-trained Venetian lime-plaster specialist
            </li>
            <li className="flex gap-3 items-start border-b border-mist/20 pb-3">
              <span className="text-gold">&bull;</span>Luminist &mdash; &ldquo;a painter of light&rdquo;
            </li>
            <li className="flex gap-3 items-start border-b border-mist/20 pb-3">
              <span className="text-gold">&bull;</span>Romabio &mdash; Preferred Installer
            </li>
            <li className="flex gap-3 items-start pb-3">
              <span className="text-gold">&bull;</span>SilkPlaster.us &mdash; Authorized Photography Partner
            </li>
          </ul>
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
