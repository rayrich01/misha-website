'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FINISH_SURFACES, NEIGHBORHOODS } from '@/lib/constants'

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-ink/95 backdrop-blur-sm border-b border-warm">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-5 py-3">
        <Link href="/" className="font-display text-2xl md:text-3xl text-cream">
          Misha Creations
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6 text-sm font-body">
          <Link href="/about" className="text-mist hover:text-gold transition-colors">
            About
          </Link>
          <Link href="/gallery" className="text-mist hover:text-gold transition-colors">
            Gallery
          </Link>
          <div className="relative group">
            <Link href="/services" className="text-mist hover:text-gold transition-colors">
              Services
            </Link>
            <div className="absolute top-full left-0 pt-2 hidden group-hover:block">
              <div className="bg-warm border border-muted/20 rounded-lg shadow-lg py-2 min-w-[260px]">
                {FINISH_SURFACES.map((f) => (
                  <Link
                    key={f.slug}
                    href={`/services/${f.slug}`}
                    className="block px-4 py-2 text-sm text-mist hover:bg-ink hover:text-gold transition-colors"
                  >
                    {f.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="relative group">
            <span className="text-mist hover:text-gold transition-colors cursor-default">
              Areas
            </span>
            <div className="absolute top-full left-0 pt-2 hidden group-hover:block">
              <div className="bg-warm border border-muted/20 rounded-lg shadow-lg py-2 min-w-[260px]">
                <p className="px-4 py-2 text-xs uppercase tracking-widest text-muted/60 font-body">Serving the Greater Houston Metro Area</p>
                {NEIGHBORHOODS.map((n) => (
                  <Link
                    key={n.slug}
                    href={`/areas/${n.slug}`}
                    className="block px-4 py-2 text-sm text-mist hover:bg-ink hover:text-gold transition-colors"
                  >
                    {n.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <Link href="/faq" className="text-mist hover:text-gold transition-colors">
            FAQ
          </Link>
          <Link
            href="/inquire"
            className="bg-gold text-ink text-xs uppercase tracking-widest px-6 py-2.5 rounded-full hover:bg-gold/90 transition-colors"
          >
            Contact
          </Link>
          <a
            href="tel:+12816500500"
            className="bg-cream text-ink text-xs uppercase tracking-widest px-6 py-2.5 rounded-full hover:bg-cream/90 transition-colors"
          >
            Call (281) 650-0500
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-cream"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-warm border-t border-muted/20 px-5 py-4 space-y-3">
          <Link href="/about" className="block text-cream font-body" onClick={() => setOpen(false)}>
            About
          </Link>
          <Link href="/gallery" className="block text-cream font-body" onClick={() => setOpen(false)}>
            Gallery
          </Link>
          <Link href="/services" className="block text-cream font-body" onClick={() => setOpen(false)}>
            Services
          </Link>
          <p className="text-xs uppercase tracking-widest text-muted font-body mt-4">Services</p>
          {FINISH_SURFACES.map((f) => (
            <Link
              key={f.slug}
              href={`/services/${f.slug}`}
              className="block text-mist pl-3 font-body text-sm"
              onClick={() => setOpen(false)}
            >
              {f.title}
            </Link>
          ))}
          <p className="text-xs uppercase tracking-widest text-muted font-body mt-4">Areas</p>
          <p className="text-xs text-muted/60 font-body pl-3 mb-1">Serving the Greater Houston Metro Area</p>
          {NEIGHBORHOODS.map((n) => (
            <Link
              key={n.slug}
              href={`/areas/${n.slug}`}
              className="block text-mist pl-3 font-body text-sm"
              onClick={() => setOpen(false)}
            >
              {n.name}
            </Link>
          ))}
          <Link href="/faq" className="block mt-4 text-cream font-body" onClick={() => setOpen(false)}>
            FAQ
          </Link>
          <Link
            href="/inquire"
            className="block mt-4 text-center bg-gold text-ink text-xs uppercase tracking-widest px-6 py-3 rounded-full"
            onClick={() => setOpen(false)}
          >
            Contact
          </Link>
          <a
            href="tel:+12816500500"
            className="block mt-4 text-center bg-cream text-ink text-xs uppercase tracking-widest px-6 py-3 rounded-full"
            onClick={() => setOpen(false)}
          >
            Call (281) 650-0500
          </a>
        </div>
      )}
    </header>
  )
}
