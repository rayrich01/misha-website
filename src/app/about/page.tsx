import type { Metadata } from 'next'
import { createClient } from '@sanity/client'
import { CtaSection } from '@/components/CtaSection'
import { JsonLd } from '@/components/JsonLd'
import { PROCESS_STEPS } from '@/lib/constants'

export const revalidate = 60

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'uz6uv7gy',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2026-04-29',
  useCdn: true,
})

async function getAboutData() {
  return sanity.fetch<{
    headline: string | null
    subheadline: string | null
    storyText: string | null
    artOfLightText: string | null
    credentials: string[] | null
    processSteps: { number: string; title: string; text: string }[] | null
    trainingSchools: { name: string; location: string | null; description: string | null }[] | null
    notablePortfolio: { title: string; description: string | null; url: string | null }[] | null
    artners: { name: string; specialty: string | null; notes: string | null }[] | null
    seoTitle: string | null
    seoDescription: string | null
  } | null>(`*[_type == "aboutPage"][0]{
    headline, subheadline, storyText, artOfLightText,
    credentials, processSteps, trainingSchools, notablePortfolio, artners,
    seoTitle, seoDescription
  }`)
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getAboutData()
  const title = data?.seoTitle || 'About Misha Thibeaux | 25+ Years of Decorative Artistry in Houston | Misha Creations'
  const description = data?.seoDescription || "Meet Misha Thibeaux — muralist, luminist, and decorative artist with 25+ years transforming Houston's finest homes, businesses, and public spaces."
  return {
    title,
    description,
    alternates: { canonical: 'https://mishacreations.com/about' },
    openGraph: { title, description, url: 'https://mishacreations.com/about', type: 'profile' },
  }
}

export default async function AboutPage() {
  const data = await getAboutData()

  // Split story text into paragraphs
  const storyParagraphs = (data?.storyText || '').split('\n\n').filter(Boolean)

  // Use CMS process steps if available, otherwise fall back to constants
  const processSteps = data?.processSteps?.length
    ? data.processSteps.map(s => ({ step: s.number, name: s.title, desc: s.text }))
    : PROCESS_STEPS

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Misha Creations',
    url: 'https://mishacreations.com',
    description: "Houston's premier decorative finishes artist with 25+ years of experience",
    address: { '@type': 'PostalAddress', addressLocality: 'Houston', addressRegion: 'TX', addressCountry: 'US' },
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
            {data?.subheadline || 'Every surface tells a story. Ours began over 25 years ago with a simple belief: Your home or business should move you, your guests and customers.'}
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-24 bg-warm">
        <div className="max-w-3xl mx-auto px-5">
          <h2 className="font-editorial text-3xl md:text-4xl text-cream mb-8 text-center">
            Art That Lives With You
          </h2>
          <div className="font-body text-mist leading-relaxed space-y-6">
            {storyParagraphs.length > 0 ? (
              storyParagraphs.map((p, i) => <p key={i}>{p}</p>)
            ) : (
              <>
                <p>
                  Drawing since the age of three and painting from the age of six, Misha began her professional
                  decorative arts career in 1999. Over more than two decades, she has grown into a masterful
                  luminist — a painter of light — bathing her murals in the glow that transforms ordinary walls
                  into living expressions of texture, depth, and radiance.
                </p>
                <p>
                  Her work blends authentic Italian Venetian lime plaster, reflective finishes, and hand-crafted
                  detail to create interiors that seem to glow from within.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Art of Light */}
      {data?.artOfLightText && (
        <section className="py-16 md:py-24 bg-ink">
          <div className="max-w-3xl mx-auto px-5 text-center">
            <h2 className="font-editorial text-3xl md:text-4xl text-cream mb-8">
              The Art of Light
            </h2>
            <p className="font-body text-mist leading-relaxed italic">
              {data.artOfLightText}
            </p>
          </div>
        </section>
      )}

      {/* Formal Training */}
      {data?.trainingSchools && data.trainingSchools.length > 0 && (
        <section className={`py-16 md:py-24 ${data?.artOfLightText ? 'bg-warm' : 'bg-ink'}`}>
          <div className="max-w-5xl mx-auto px-5">
            <p className="font-body text-xs tracking-[0.2em] uppercase text-gold text-center mb-4">
              Formal Training &amp; Certifications
            </p>
            <h2 className="font-editorial text-3xl md:text-4xl text-cream mb-4 text-center">
              Schools, Ateliers &amp; Mentorships
            </h2>
            <p className="font-body text-mist leading-relaxed text-center max-w-2xl mx-auto mb-12">
              Misha&apos;s technique is the product of sustained study with some of the most respected names
              in traditional decorative arts.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.trainingSchools.map((school, i) => (
                <div key={i} className="border-t-2 border-gold pt-6">
                  <h3 className="font-editorial text-xl text-cream mb-1">{school.name}</h3>
                  {school.location && (
                    <p className="font-body text-sm text-gold/80 mb-3">{school.location}</p>
                  )}
                  {school.description && (
                    <p className="font-body text-mist text-sm leading-relaxed">{school.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Notable Portfolio */}
      {data?.notablePortfolio && data.notablePortfolio.length > 0 && (
        <section className="py-16 md:py-24 bg-warm">
          <div className="max-w-3xl mx-auto px-5">
            <p className="font-body text-xs tracking-[0.2em] uppercase text-gold text-center mb-4">
              Notable Portfolio
            </p>
            <h2 className="font-editorial text-3xl md:text-4xl text-cream mb-12 text-center">
              Commissions &amp; Productions
            </h2>
            <ul className="divide-y divide-mist/20">
              {data.notablePortfolio.map((item, i) => (
                <li key={i} className="py-5">
                  <h3 className="font-editorial text-lg text-cream mb-1">{item.title}</h3>
                  {item.description && (
                    <p className="font-body text-mist text-sm leading-relaxed">{item.description}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Artners */}
      {data?.artners && data.artners.length > 0 && (
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
              {data.artners.map((artner, i) => (
                <div key={i} className="border-t-2 border-gold pt-6">
                  <h3 className="font-editorial text-lg text-cream mb-1">{artner.name}</h3>
                  {artner.specialty && (
                    <p className="font-body text-mist text-sm leading-relaxed">{artner.specialty}</p>
                  )}
                  {artner.notes && (
                    <p className="font-body text-mist text-sm leading-relaxed mt-1">{artner.notes}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Credentials & Recognition */}
      {data?.credentials && data.credentials.length > 0 && (
        <section className="py-16 md:py-24 bg-warm">
          <div className="max-w-2xl mx-auto px-5">
            <p className="font-body text-xs tracking-[0.2em] uppercase text-gold text-center mb-4">
              Credentials &amp; Recognition
            </p>
            <h2 className="font-editorial text-3xl md:text-4xl text-cream mb-10 text-center">
              Experience &amp; Industry Standing
            </h2>
            <ul className="space-y-3 font-editorial text-lg text-cream">
              {data.credentials.map((cred, i) => (
                <li key={i} className="flex gap-3 items-start border-b border-mist/20 pb-3">
                  <span className="text-gold">&bull;</span>{cred}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Process */}
      <section className="py-16 md:py-24 bg-ink">
        <div className="max-w-4xl mx-auto px-5">
          <h2 className="font-editorial text-3xl md:text-4xl text-cream mb-14 text-center">
            How We Work Together
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {processSteps.map((step) => (
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
