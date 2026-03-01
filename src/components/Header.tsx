'use client'

import { useState } from 'react'
import Link from 'next/link'
import { COPY, FINISH_SURFACES, NEIGHBORHOODS } from '@/lib/constants'

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-sand">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-5 py-3">
        <Link href="/" className="font-display text-2xl md:text-3xl text-dark">
          Misha Creations
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6 text-sm font-body">
          <Link href="/about" className="text-charcoal hover:text-gold transition-colors">
            About
          </Link>
          <div className="relative group">
            <span className="text-charcoal hover:text-gold transition-colors cursor-default">
              Finishes
            </span>
            <div className="absolute top-full left-0 pt-2 hidden group-hover:block">
              <div className="bg-cream border border-sand rounded-lg shadow-lg py-2 min-w-[220px]">
                {FINISH_SURFACES.map((f) => (
                  <Link
                    key={f.slug}
                    href={`/${f.slug}`}
                    className="block px-4 py-2 text-sm text-charcoal hover:bg-sand hover:text-gold transition-colors"
                  >
                    {f.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="relative group">
            <span className="text-charcoal hover:text-gold transition-colors cursor-default">
              Areas
            </span>
            <div className="absolute top-full left-0 pt-2 hidden group-hover:block">
              <div className="bg-cream border border-sand rounded-lg shadow-lg py-2 min-w-[200px]">
                {NEIGHBORHOODS.map((n) => (
                  <Link
                    key={n.slug}
                    href={`/${n.slug}`}
                    className="block px-4 py-2 text-sm text-charcoal hover:bg-sand hover:text-gold transition-colors"
                  >
                    {n.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <Link
            href="/consult"
            className="bg-charcoal text-cream text-xs uppercase tracking-widest px-6 py-2.5 rounded-full hover:bg-dark transition-colors"
          >
            Book a Consultation
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-charcoal"
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
        <div className="md:hidden bg-cream border-t border-sand px-5 py-4 space-y-3">
          <Link href="/about" className="block text-charcoal font-body" onClick={() => setOpen(false)}>
            About
          </Link>
          <p className="text-xs uppercase tracking-widest text-bronze font-body mt-4">Finishes</p>
          {FINISH_SURFACES.map((f) => (
            <Link
              key={f.slug}
              href={`/${f.slug}`}
              className="block text-charcoal pl-3 font-body text-sm"
              onClick={() => setOpen(false)}
            >
              {f.title}
            </Link>
          ))}
          <p className="text-xs uppercase tracking-widest text-bronze font-body mt-4">Areas</p>
          {NEIGHBORHOODS.map((n) => (
            <Link
              key={n.slug}
              href={`/${n.slug}`}
              className="block text-charcoal pl-3 font-body text-sm"
              onClick={() => setOpen(false)}
            >
              {n.name}
            </Link>
          ))}
          <Link
            href="/consult"
            className="block mt-4 text-center bg-charcoal text-cream text-xs uppercase tracking-widest px-6 py-3 rounded-full"
            onClick={() => setOpen(false)}
          >
            Book a Consultation
          </Link>
        </div>
      )}
    </header>
  )
}
