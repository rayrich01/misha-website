import type { Metadata } from 'next'
import { CtaSection } from '@/components/CtaSection'

export const metadata: Metadata = {
  title: 'Decorative Painting Blog Houston | Luxury Finishing Tips & Inspiration | Misha Creations',
  description:
    "Expert decorative painting tips, luxury finishing techniques, and design inspiration from Houston's premier decorative artist. Learn professional techniques for River Oaks, Memorial, Tanglewood homes.",
  alternates: {
    canonical: 'https://mishacreations.com/blog',
  },
  openGraph: {
    title: 'Decorative Painting Blog | Houston Luxury Tips & Inspiration',
    description:
      "Expert decorative painting tips, luxury finishing techniques, and design inspiration from Houston's premier decorative artist.",
    url: 'https://mishacreations.com/blog',
  },
}

export default function BlogPage() {
  return (
    <>
      <section className="bg-ink pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <h1 className="font-display text-[48px] md:text-[64px] text-cream mb-4">
            Blog
          </h1>
          <p className="font-body text-lg text-mist max-w-2xl mx-auto">
            Expert decorative painting tips, luxury finishing techniques, and design inspiration
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-warm">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <p className="font-editorial text-xl text-mist italic">
            New articles coming soon. In the meantime, explore our gallery to see our latest work.
          </p>
        </div>
      </section>

      <CtaSection headline="Ready to Start Your Project?" />
    </>
  )
}
