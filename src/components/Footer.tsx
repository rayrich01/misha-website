import Link from 'next/link'
import { NEIGHBORHOODS } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="bg-dark text-cream/80 py-16">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <p className="font-display text-2xl text-cream mb-3">Misha Creations</p>
            <p className="font-body text-sm leading-relaxed">
              Luxury decorative finishes, wall murals, and Venetian plaster for Houston&apos;s finest homes.
              25+ years of artistic excellence.
            </p>
          </div>
          <div>
            <p className="font-editorial text-lg text-cream mb-3">Service Areas</p>
            <div className="grid grid-cols-2 gap-1">
              {NEIGHBORHOODS.map((n) => (
                <Link
                  key={n.slug}
                  href={`/${n.slug}`}
                  className="font-body text-sm hover:text-gold transition-colors"
                >
                  {n.name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="font-editorial text-lg text-cream mb-3">Get in Touch</p>
            <Link
              href="/portfolio"
              className="block font-body text-sm hover:text-gold transition-colors mb-2"
            >
              View Portfolio
            </Link>
            <Link
              href="/inquire"
              className="block font-body text-sm hover:text-gold transition-colors mb-2"
            >
              Send an Inquiry
            </Link>
            <Link
              href="/consult"
              className="inline-block mt-3 bg-gold text-dark text-xs uppercase tracking-widest px-6 py-2.5 rounded-full hover:bg-gold/90 transition-colors font-body"
            >
              Schedule Consultation
            </Link>
          </div>
        </div>
        <div className="border-t border-cream/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-cream/50">
            &copy; {new Date().getFullYear()} Misha Creations &middot; Houston, TX
          </p>
          <a
            href="https://studio.mishacreations.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-xs text-cream/40 hover:text-gold transition-colors"
          >
            For Designers &amp; Builders &rarr;
          </a>
        </div>
      </div>
    </footer>
  )
}
