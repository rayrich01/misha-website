import Link from 'next/link'
import { NEIGHBORHOODS, FINISH_SURFACES, COPY } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="bg-ink text-mist py-16 border-t border-warm">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <p className="font-display text-2xl text-cream mb-3">Misha Creations</p>
            <p className="font-body text-sm leading-relaxed mb-4">
              Luxury decorative finishes, wall murals, and Venetian plaster for Houston&apos;s finest homes.
              25+ years of artistic excellence.
            </p>
          </div>
          <div>
            <p className="font-editorial text-lg text-cream mb-3">Services</p>
            <div className="space-y-1">
              {FINISH_SURFACES.map((f) => (
                <Link
                  key={f.slug}
                  href={`/services/${f.slug}`}
                  className="block font-body text-sm hover:text-gold transition-colors"
                >
                  {f.title}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="font-editorial text-lg text-cream mb-3">Service Areas</p>
            <p className="font-body text-sm text-mist/70 mb-2">Serving the Greater Houston Metro Area</p>
            <div className="space-y-1">
              {NEIGHBORHOODS.map((n) => (
                <Link
                  key={n.slug}
                  href={`/areas/${n.slug}`}
                  className="block font-body text-sm hover:text-gold transition-colors"
                >
                  {n.name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="font-editorial text-lg text-cream mb-3">Get in Touch</p>
            <Link
              href="/gallery"
              className="block font-body text-sm hover:text-gold transition-colors mb-2"
            >
              View Gallery
            </Link>
            <Link
              href="/recent-projects"
              className="block font-body text-sm hover:text-gold transition-colors mb-2"
            >
              Recent Projects
            </Link>
            <Link
              href="/faq"
              className="block font-body text-sm hover:text-gold transition-colors mb-2"
            >
              FAQ
            </Link>
            <Link
              href="/inquire"
              className="inline-block mt-3 bg-cream text-ink text-xs uppercase tracking-widest px-6 py-2.5 rounded-full hover:bg-cream/90 transition-colors font-body"
            >
              Contact
            </Link>
            <a
              href="tel:+12816500500"
              className="inline-block mt-3 bg-gold text-ink text-xs uppercase tracking-widest px-6 py-2.5 rounded-full hover:bg-gold/90 transition-colors font-body"
            >
              Call (281) 650-0500
            </a>
          </div>
        </div>
        <div className="border-t border-cream/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-cream/60">
            &copy; {new Date().getFullYear()} Misha Creations &middot; Houston, TX
          </p>
          <div className="flex items-center gap-4">
            <a href="https://studio.mishacreations.com" target="_blank" rel="noopener noreferrer" className="font-body text-xs text-cream/60 hover:text-gold transition-colors">For Designers &amp; Builders &rarr;</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
