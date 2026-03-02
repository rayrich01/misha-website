'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { FINISH_SURFACES } from '@/lib/constants'

export default function InquirePage() {
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSending(true)
    setError('')

    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))

    const formId = process.env.NEXT_PUBLIC_FORMSPREE_INQUIRE
    const endpoint = formId
      ? `https://formspree.io/f/${formId}`
      : 'https://formspree.io/misha@mishacreations.com'

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...data, _subject: 'New Inquiry from mishacreations.com' }),
      })
      if (!res.ok) throw new Error('Submission failed')
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again or call to reach us directly.')
    } finally {
      setSending(false)
    }
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-cream pt-32 pb-20 px-5">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="font-display text-4xl text-dark mb-4">Thank You</h2>
          <p className="font-body text-charcoal leading-relaxed mb-8">
            Your inquiry has been received. Misha will be in touch within 48 hours.
          </p>
          <Link
            href="/"
            className="inline-block bg-gold text-dark text-xs uppercase tracking-widest px-8 py-3 rounded-full hover:bg-gold/90 transition-colors font-body font-medium"
          >
            Return Home
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-cream pt-32 pb-20 px-5">
      <div className="max-w-xl mx-auto">
        <p className="font-body text-xs uppercase tracking-[0.18em] text-gold mb-8">
          Project Inquiry
        </p>
        <h1 className="font-display text-[clamp(1.8rem,5vw,2.8rem)] text-dark mb-3">
          Start a Conversation
        </h1>
        <p className="font-body text-charcoal leading-relaxed mb-10">
          Tell us about your project. Misha will respond with a scope,
          sample board recommendation, and realistic timeline within 48 hours.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-body text-xs uppercase tracking-wider text-charcoal/70 mb-1.5">
              Name *
            </label>
            <input
              name="name"
              required
              className="w-full font-body text-[15px] bg-sand/40 text-dark border border-sand rounded px-3.5 py-3 outline-none focus:border-gold transition-colors"
            />
          </div>

          <div>
            <label className="block font-body text-xs uppercase tracking-wider text-charcoal/70 mb-1.5">
              Email *
            </label>
            <input
              name="email"
              type="email"
              required
              className="w-full font-body text-[15px] bg-sand/40 text-dark border border-sand rounded px-3.5 py-3 outline-none focus:border-gold transition-colors"
            />
          </div>

          <div>
            <label className="block font-body text-xs uppercase tracking-wider text-charcoal/70 mb-1.5">
              Phone
            </label>
            <input
              name="phone"
              type="tel"
              className="w-full font-body text-[15px] bg-sand/40 text-dark border border-sand rounded px-3.5 py-3 outline-none focus:border-gold transition-colors"
            />
          </div>

          <div>
            <label className="block font-body text-xs uppercase tracking-wider text-charcoal/70 mb-1.5">
              Project Type
            </label>
            <select
              name="projectType"
              className="w-full font-body text-[15px] bg-sand/40 text-dark border border-sand rounded px-3.5 py-3 outline-none focus:border-gold transition-colors"
            >
              <option value="">Select a type&hellip;</option>
              {FINISH_SURFACES.map((f) => (
                <option key={f.categoryId} value={f.categoryId}>
                  {f.title}
                </option>
              ))}
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block font-body text-xs uppercase tracking-wider text-charcoal/70 mb-1.5">
              Message
            </label>
            <textarea
              name="message"
              rows={5}
              placeholder="Describe your project, timeline, or any reference images you have in mind&hellip;"
              className="w-full font-body text-[15px] bg-sand/40 text-dark border border-sand rounded px-3.5 py-3 outline-none focus:border-gold transition-colors resize-y"
            />
          </div>

          {error && (
            <p className="font-body text-sm text-red-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={sending}
            className="w-full bg-gold text-dark text-xs uppercase tracking-widest font-body font-medium py-4 rounded-full hover:bg-gold/90 transition-colors disabled:opacity-60"
          >
            {sending ? 'Sending\u2026' : 'Submit Inquiry'}
          </button>
        </form>

        <div className="mt-12 pt-8 border-t border-sand text-center">
          <p className="font-editorial text-[15px] italic text-charcoal/70 mb-4">
            Prefer to talk by phone about your project?
          </p>
          <Link
            href="/consult"
            className="inline-block font-body text-xs uppercase tracking-widest text-gold border border-gold/50 px-7 py-3 hover:bg-gold/10 transition-colors"
          >
            Schedule a Consultation
          </Link>
        </div>
      </div>
    </main>
  )
}
