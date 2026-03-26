import type { Metadata } from 'next'
import Link from 'next/link'
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

const articles = [
  {
    slug: 'guide-to-venetian-lime-plaster-houston',
    title: 'A Guide to Venetian Lime Plaster for Houston Luxury Homes',
    excerpt: 'Learn about authentic Venetian lime plaster — how it is applied, where it works best, and why training matters. By an artist with 25+ years of experience.',
    category: 'Guide',
  },
  {
    slug: 'guide-to-decorative-painting-houston',
    title: 'The Complete Guide to Decorative Painting for Houston Homes',
    excerpt: "Explore 8 types of decorative painting services — from Venetian plaster and wall murals to faux finishes and trompe l'oeil. Everything you need to know.",
    category: 'Complete Guide',
  },
]

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
        <div className="max-w-3xl mx-auto px-5 space-y-8">
          {articles.map((a) => (
            <Link
              key={a.slug}
              href={`/blog/${a.slug}`}
              className="block border border-muted/30 rounded-lg p-8 hover:border-gold/40 transition-colors"
            >
              <p className="font-body text-xs uppercase tracking-widest text-gold mb-3">{a.category}</p>
              <h2 className="font-editorial text-xl md:text-2xl text-cream mb-3">{a.title}</h2>
              <p className="font-body text-mist leading-relaxed">{a.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>

      <CtaSection headline="Ready to Start Your Project?" />
    </>
  )
}
