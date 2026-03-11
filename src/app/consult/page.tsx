import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contact Misha | Misha Creations Houston',
  description:
    'Get in touch with Misha Creations. Call (281) 650-0500 to discuss your project, or submit an inquiry online.',
}

export default function ConsultPage() {
  return (
    <section className="pt-32 pb-20 min-h-screen bg-ink">
      <div className="max-w-2xl mx-auto px-5 text-center">
        <h1 className="font-display text-4xl md:text-5xl text-cream mb-6">
          Let&apos;s Talk About Your Project
        </h1>
        <p className="font-body text-lg text-mist leading-relaxed mb-10">
          The best way to get started is to give Misha a call. She&apos;ll listen to your
          vision, answer your questions, and arrange a time to visit your home.
        </p>
        <a
          href="tel:+12816500500"
          className="inline-block bg-gold text-ink text-sm uppercase tracking-widest px-10 py-4 rounded-full hover:bg-gold/90 transition-colors font-body font-medium mb-6"
        >
          Call (281) 650-0500
        </a>
        <p className="font-body text-sm text-mist/60">
          Prefer to write?{' '}
          <Link href="/inquire" className="text-gold hover:text-goldf transition-colors underline">
            Submit an inquiry
          </Link>
        </p>
      </div>
    </section>
  )
}
