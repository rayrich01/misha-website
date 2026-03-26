import type { Metadata } from 'next'
import { FaqAccordion } from '@/components/FaqAccordion'
import { CtaSection } from '@/components/CtaSection'

export const metadata: Metadata = {
  title: 'Decorative Painting FAQ | Pricing, Process & Timeline | Misha Creations',
  description:
    'Common questions about luxury decorative painting, Venetian plaster, wall murals, and custom finishes in Houston. Learn about pricing, timelines, and Misha\'s 25+ year process. River Oaks, Memorial, Tanglewood.',
  alternates: {
    canonical: 'https://mishacreations.com/faq',
  },
  openGraph: {
    title: 'Decorative Painting FAQ | Pricing, Process & Timeline | Misha Creations',
    description: 'Common questions about luxury decorative painting, Venetian plaster, wall murals, and custom finishes in Houston. Pricing, timelines, and process.',
    url: 'https://mishacreations.com/faq',
  },
}

const generalFaqs = [
  {
    question: 'What areas do you serve?',
    answer:
      'Misha Creations serves all of the greater Houston area including River Oaks, Memorial, Tanglewood, West University, Bellaire, The Woodlands, Katy, and surrounding communities. Misha personally visits every home for consultation.',
  },
  {
    question: 'How much does decorative painting cost?',
    answer:
      'Every project is customized to your tastes and priced based on scope, surface area, and finish complexity. Misha provides a detailed, no-obligation estimate after an in-home consultation where she evaluates the surfaces, lighting, and architectural details of your space.',
  },
  {
    question: 'What is the process for starting a project?',
    answer:
      'The process begins with a complimentary in-home consultation where Misha studies your space, discusses your vision, and recommends finishes. She then creates physical finish samples for your approval before any brushwork begins. Most projects take 1-3 weeks from design approval to completion.',
  },
  {
    question: 'Do you work with interior designers and builders?',
    answer:
      'Absolutely. Misha regularly collaborates with interior designers, architects, and builders throughout Houston. She can work from design specifications or provide creative direction. Visit studio.mishacreations.com for our designer and trade portal.',
  },
  {
    question: 'How long has Misha been working in Houston?',
    answer:
      'Misha has over 25 years of experience as a decorative artist in Houston. She trained at the Buon Fresco School of Venetian Plastering in Washington D.C. and Nicola Vigini Studios, and has completed projects ranging from private estates to the Houston Zoo and commercial venues.',
  },
  {
    question: 'What types of finishes do you offer?',
    answer:
      "Misha specializes in luxury wall murals, Venetian lime plaster, trompe l'oeil architectural illusions, decorative ceilings, faux & specialty finishes, children's themed rooms, themed rooms & skyscapes, and Modello stencil designs. Each finish is hand-applied and customized to your home.",
  },
  {
    question: 'Do you provide finish samples before starting?',
    answer:
      'Yes. Misha creates physical finish samples on sample boards that you can hold, view in your space, and approve before any work begins. This ensures the color, texture, and sheen match your vision perfectly. No surprises on install day.',
  },
]

export default function FaqPage() {
  return (
    <>
      <section className="bg-ink pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <h1 className="font-display text-[48px] md:text-[64px] text-cream mb-4">
            Frequently Asked Questions
          </h1>
          <p className="font-body text-lg text-mist max-w-2xl mx-auto">
            Common questions about our decorative painting services in Houston
          </p>
        </div>
      </section>

      <FaqAccordion faqs={generalFaqs} heading="" />
      <CtaSection headline="Have More Questions?" body="Call today for a complimentary consultation to discuss your project with Misha in person." />
    </>
  )
}
