'use client'

import { useState } from 'react'
import { JsonLd } from './JsonLd'

interface FaqItem {
  question: string
  answer: string
}

interface Props {
  faqs: FaqItem[]
  heading?: string
}

export function FaqAccordion({ faqs, heading = 'Frequently Asked Questions' }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <section className="py-16 md:py-24">
      <JsonLd data={faqSchema} />
      <div className="max-w-3xl mx-auto px-5">
        <h2 className="font-display text-3xl md:text-4xl text-center text-cream mb-12">
          {heading}
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-muted/30 rounded-lg overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left font-editorial text-lg text-cream hover:bg-warm/50 transition-colors"
              >
                <span>{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-muted transition-transform flex-shrink-0 ml-4 ${openIndex === i ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === i && (
                <div className="px-6 pb-5">
                  <p className="font-body text-mist leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
