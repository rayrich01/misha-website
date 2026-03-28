import type { Metadata } from 'next'
import Link from 'next/link'
import { PROCESS_STEPS, FINISH_SURFACES, NEIGHBORHOODS, COPY } from '@/lib/constants'
import { getProcessPage, getAllServicePages, getAllAreaPages, getSiteGlobals } from '@/lib/queries'
import { FaqAccordion } from '@/components/FaqAccordion'
import { CtaSection } from '@/components/CtaSection'
import { JsonLd } from '@/components/JsonLd'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getProcessPage().catch(() => null)
  const metaTitle = cms?.seo?.metaTitle || 'How Misha Works | Your Decorative Painting Process'
  const metaDescription = cms?.seo?.metaDescription || 'From first call to final reveal — learn how Misha Creations transforms Houston luxury homes with 25+ years of decorative painting expertise. Complimentary in-home consultation. Physical samples before work begins.'

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: { canonical: 'https://mishacreations.com/process' },
    openGraph: {
      title: cms?.seo?.metaTitle || 'How Misha Works | Your Decorative Painting Process | Misha Creations',
      description: 'From first call to final reveal — learn how Misha transforms Houston luxury homes with decorative painting.',
      url: 'https://mishacreations.com/process',
    },
  }
}

export default async function ProcessPage() {
  const [cms, cmsServices, cmsAreas, globals] = await Promise.all([
    getProcessPage().catch(() => null),
    getAllServicePages().catch(() => []),
    getAllAreaPages().catch(() => []),
    getSiteGlobals().catch(() => null),
  ])

  const processSteps = cms?.processSteps || globals?.processSteps || PROCESS_STEPS
  const phone = globals?.phone || COPY.phone
  const phoneHref = globals?.phoneHref || COPY.phoneHref

  const services = cmsServices.length > 0
    ? cmsServices.map((s) => ({ slug: s.slug.current, title: s.title }))
    : FINISH_SURFACES.map((f) => ({ slug: f.slug, title: f.title }))

  const areas = cmsAreas.length > 0
    ? cmsAreas.map((a) => ({ slug: a.slug.current, name: a.name }))
    : NEIGHBORHOODS.map((n) => ({ slug: n.slug, name: n.name }))

  const processFaqs = cms?.faqs || [
    {
      question: 'How long does the process take?',
      answer: 'Most projects take 1-3 weeks from design approval to completion. The timeline depends on scope and complexity. Misha coordinates around your schedule and provides a realistic timeline during the consultation.',
    },
    {
      question: 'Is the consultation really free?',
      answer: 'Yes. The in-home consultation is complimentary with no obligation. Misha visits your home to study the space, discuss your vision, and provide a detailed estimate.',
    },
    {
      question: 'Does Misha do the work herself?',
      answer: 'Yes. Every decorative finish is hand-applied by Misha personally. She does not subcontract her artistry.',
    },
  ]

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Work with Misha Creations for Decorative Painting',
    description: 'The step-by-step process for commissioning decorative painting from Misha Creations in Houston.',
    step: processSteps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.desc,
    })),
  }

  return (
    <>
      <JsonLd data={howToSchema} />

      {/* Hero */}
      <section className="bg-ink pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <h1 className="font-display text-[42px] md:text-[58px] text-cream mb-4">
            {cms?.heroHeadline || 'Your Decorative Painting Process'}
          </h1>
          <p className="font-body text-lg text-mist max-w-2xl mx-auto">
            {cms?.heroSubtext || 'From first call to final reveal'}
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 md:py-20 bg-warm">
        <div className="max-w-3xl mx-auto px-5">
          <h2 className="font-display text-3xl md:text-4xl text-center text-cream mb-8">
            {cms?.introHeading || 'From First Call to Final Reveal'}
          </h2>
          <p className="font-body text-lg leading-relaxed text-mist mb-6">
            {cms?.introText || (
              <>
                Every project begins with a conversation. Whether you call{' '}
                <a href={phoneHref} className="text-gold hover:text-goldf transition-colors">{phone}</a>{' '}
                or{' '}
                <Link href="/inquire" className="text-gold hover:text-goldf transition-colors">submit an inquiry</Link>
                , Misha responds within 24 hours. From there, the process is personal, consultative, and grounded in 25+ years of decorative painting expertise in Houston.
              </>
            )}
          </p>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 md:py-24 bg-ink">
        <div className="max-w-3xl mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {processSteps.map((step) => (
              <div key={step.step} className="border border-muted/30 rounded-lg p-6">
                <p className="font-body text-xs uppercase tracking-widest text-gold mb-2">Step {step.step}</p>
                <h2 className="font-editorial text-xl text-cream mb-3">{step.name}</h2>
                <p className="font-body text-mist leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Misha */}
      <section className="py-16 md:py-20 bg-warm">
        <div className="max-w-3xl mx-auto px-5">
          <h2 className="font-display text-3xl md:text-4xl text-center text-cream mb-8">
            {cms?.aboutHeading || 'About Misha'}
          </h2>
          {cms?.aboutParagraphs ? (
            cms.aboutParagraphs.map((p, i) => (
              <p key={i} className="font-body text-lg leading-relaxed text-mist mb-6 last:mb-0">{p}</p>
            ))
          ) : (
            <>
              <p className="font-body text-lg leading-relaxed text-mist mb-6">
                Misha has over 25 years of experience as a decorative painting artist in Houston. She trained at the Buon Fresco School of Venetian Plastering in Washington D.C. and Nicola Vigini Studios. Her work spans private estates to the Houston Zoo.
              </p>
              <p className="font-body text-mist leading-relaxed mb-6">
                She serves Houston&apos;s finest neighborhoods including{' '}
                {areas.map((a, i) => (
                  <span key={a.slug}>
                    <Link href={`/areas/${a.slug}`} className="text-gold hover:text-goldf transition-colors">{a.name}</Link>
                    {i < areas.length - 1 ? ', ' : '.'}
                  </span>
                ))}
              </p>
            </>
          )}
        </div>
      </section>

      {/* Services */}
      <section className="py-12 bg-ink">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <h2 className="font-display text-3xl text-cream mb-8">Services</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {services.map((f) => (
              <Link
                key={f.slug}
                href={`/services/${f.slug}`}
                className="font-body text-sm text-gold border border-gold/40 px-4 py-2 rounded-full hover:bg-gold/10 transition-colors"
              >
                {f.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FaqAccordion faqs={processFaqs} heading="Process FAQ" />

      <CtaSection
        headline="Start Your Project"
        body="Call today for a complimentary consultation. Misha will visit your home, study the light and architecture, and show you what is possible."
      />
    </>
  )
}
