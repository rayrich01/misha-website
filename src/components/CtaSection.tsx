import Link from 'next/link'

interface Props {
  headline?: string
  body?: string
}

export function CtaSection({
  headline = 'Transform Your Home Into a Living Masterpiece',
  body = 'Schedule a complimentary consultation. Misha will visit your home, study the light and architecture, and show you what is possible.',
}: Props) {
  return (
    <section className="bg-charcoal text-cream py-20 md:py-28">
      <div className="max-w-3xl mx-auto text-center px-5">
        <h2 className="font-display text-3xl md:text-5xl mb-6">{headline}</h2>
        <p className="font-body text-lg leading-relaxed text-cream/85 mb-10">
          {body}
        </p>
        <Link
          href="/consult"
          className="inline-block bg-gold text-dark text-sm uppercase tracking-widest px-10 py-4 rounded-full hover:bg-gold/90 transition-colors font-body font-medium"
        >
          Schedule Your Consultation
        </Link>
      </div>
    </section>
  )
}
