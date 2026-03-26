'use client'

import { useState, useRef, type FormEvent, type ChangeEvent } from 'react'
import Link from 'next/link'
import { FINISH_SURFACES } from '@/lib/constants'

const ROOM_TYPES = [
  'Living Room', 'Dining Room', 'Master Bedroom', 'Master Bathroom',
  'Powder Room', 'Foyer / Entry', 'Hallway / Stairwell', 'Kitchen',
  'Home Office / Library', 'Wine Cellar', 'Media / Game Room',
  "Children's Room / Nursery", 'Ceiling', 'Exterior', 'Commercial Space', 'Other',
]

const TIMEFRAMES = [
  { value: '2-weeks', label: 'Within 2 weeks' },
  { value: '30-days', label: 'Within 30 days' },
  { value: '60-days', label: 'Within 60 days' },
  { value: '90-days', label: 'Within 90 days' },
  { value: 'flexible', label: 'Flexible / No rush' },
]

const MAX_IMAGES = 5

export default function InquirePage() {
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [images, setImages] = useState<File[]>([])
  const fileRef = useRef<HTMLInputElement>(null)

  function handleFiles(e: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || [])
    setImages((prev) => [...prev, ...files].slice(0, MAX_IMAGES))
    if (fileRef.current) fileRef.current.value = ''
  }

  function removeImage(idx: number) {
    setImages((prev) => prev.filter((_, i) => i !== idx))
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSending(true)
    setError('')

    const form = e.currentTarget
    const fd = new FormData(form)

    // Build JSON payload for the API route
    const payload: Record<string, string> = {}
    fd.forEach((value, key) => {
      if (typeof value === 'string') payload[key] = value
    })

    try {
      // Primary: send to API route (GHL + Resend emails)
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Submission failed')
      }

      // Secondary: also send to Formspree for image attachments and backup
      const formId = process.env.NEXT_PUBLIC_FORMSPREE_INQUIRE
      if (formId) {
        const fsFd = new FormData(form)
        images.forEach((file) => fsFd.append('referenceImages', file))
        fsFd.append('_subject', 'New Inquiry from mishacreations.com')
        fetch(`https://formspree.io/f/${formId}`, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: fsFd,
        }).catch(() => {}) // fire-and-forget backup
      }

      // Push lead event to GTM dataLayer for GA4 measurement
      if (typeof window !== 'undefined') {
        const w = window as unknown as { dataLayer?: Record<string, unknown>[] }
        if (w.dataLayer) {
          w.dataLayer.push({
            event: 'generate_lead',
            form_id: 'inquire',
            project_type: payload.projectType || '',
            room_type: payload.roomType || '',
          })
        }
      }

      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again or call to reach us directly.')
    } finally {
      setSending(false)
    }
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-ink pt-32 pb-20 px-5">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="font-display text-4xl text-cream mb-4">Thank You</h2>
          <p className="font-body text-mist leading-relaxed mb-8">
            Your inquiry has been received. Misha will be in touch within 48 hours.
          </p>
          <Link
            href="/"
            className="inline-block bg-gold text-ink text-xs uppercase tracking-widest px-8 py-3 rounded-full hover:bg-gold/90 transition-colors font-body font-medium"
          >
            Return Home
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-ink pt-32 pb-20 px-5">
      <div className="max-w-xl mx-auto">
        <p className="font-body text-xs uppercase tracking-[0.18em] text-gold mb-8">
          Project Inquiry
        </p>
        <h1 className="font-display text-[clamp(1.8rem,5vw,2.8rem)] text-cream mb-3">
          Start a Conversation
        </h1>
        <p className="font-body text-mist leading-relaxed mb-10">
          Tell Misha about your project, vision, location you live, a realistic timeline
          as well as any questions you may have and she will respond within 48 hours.
          You can also call Misha directly at{' '}
          <a href="tel:+12816500500" className="text-gold hover:text-goldf transition-colors">(281) 650-0500</a>{' '}
          or reach out via text.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-body text-xs uppercase tracking-wider text-mist/70 mb-1.5">
              Name *
            </label>
            <input
              name="name"
              required
              className="w-full font-body text-[15px] bg-warm text-cream border border-muted/30 rounded px-3.5 py-3 outline-none focus:border-gold transition-colors"
            />
          </div>

          <div>
            <label className="block font-body text-xs uppercase tracking-wider text-mist/70 mb-1.5">
              Email *
            </label>
            <input
              name="email"
              type="email"
              required
              className="w-full font-body text-[15px] bg-warm text-cream border border-muted/30 rounded px-3.5 py-3 outline-none focus:border-gold transition-colors"
            />
          </div>

          <div>
            <label className="block font-body text-xs uppercase tracking-wider text-mist/70 mb-1.5">
              Phone
            </label>
            <input
              name="phone"
              type="tel"
              className="w-full font-body text-[15px] bg-warm text-cream border border-muted/30 rounded px-3.5 py-3 outline-none focus:border-gold transition-colors"
            />
          </div>

          <div>
            <label className="block font-body text-xs uppercase tracking-wider text-mist/70 mb-1.5">
              Project Type
            </label>
            <select
              name="projectType"
              className="w-full font-body text-[15px] bg-warm text-cream border border-muted/30 rounded px-3.5 py-3 outline-none focus:border-gold transition-colors"
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
            <label className="block font-body text-xs uppercase tracking-wider text-mist/70 mb-1.5">
              Room Type
            </label>
            <select
              name="roomType"
              className="w-full font-body text-[15px] bg-warm text-cream border border-muted/30 rounded px-3.5 py-3 outline-none focus:border-gold transition-colors"
            >
              <option value="">Select a room&hellip;</option>
              {ROOM_TYPES.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-body text-xs uppercase tracking-wider text-mist/70 mb-1.5">
              Timeframe
            </label>
            <select
              name="timeframe"
              className="w-full font-body text-[15px] bg-warm text-cream border border-muted/30 rounded px-3.5 py-3 outline-none focus:border-gold transition-colors"
            >
              <option value="">When would you like to start?</option>
              {TIMEFRAMES.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-body text-xs uppercase tracking-wider text-mist/70 mb-1.5">
              Message
            </label>
            <textarea
              name="message"
              rows={5}
              placeholder="Describe your project, vision, or any questions you have&hellip;"
              className="w-full font-body text-[15px] bg-warm text-cream border border-muted/30 rounded px-3.5 py-3 outline-none focus:border-gold transition-colors resize-y"
            />
          </div>

          <div>
            <label className="block font-body text-xs uppercase tracking-wider text-mist/70 mb-1.5">
              Reference Images <span className="normal-case tracking-normal text-mist/50">(up to 5)</span>
            </label>
            <p className="font-body text-sm text-mist/60 mb-3">
              Include reference images for our discussion — photos of your space, vision ideas, color tones, or examples you love.
            </p>
            <div className="flex flex-wrap gap-3 mb-3">
              {images.map((file, i) => (
                <div key={i} className="relative group">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Reference ${i + 1}`}
                    className="w-20 h-20 object-cover rounded border border-muted/30"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-cream text-ink rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
            {images.length < MAX_IMAGES && (
              <label className="inline-flex items-center gap-2 font-body text-sm text-gold border border-gold/40 rounded px-4 py-2.5 cursor-pointer hover:bg-gold/5 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Add {images.length === 0 ? 'Images' : 'More'}
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFiles}
                  className="hidden"
                />
              </label>
            )}
            {images.length > 0 && (
              <span className="font-body text-xs text-mist/50 ml-3">
                {images.length} of {MAX_IMAGES}
              </span>
            )}
          </div>

          {error && (
            <p className="font-body text-sm text-red-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={sending}
            className="w-full bg-gold text-ink text-xs uppercase tracking-widest font-body font-medium py-4 rounded-full hover:bg-gold/90 transition-colors disabled:opacity-60"
          >
            {sending ? 'Sending\u2026' : 'Submit Inquiry'}
          </button>
        </form>

        <div className="mt-12 pt-8 border-t border-muted/30 text-center space-y-5">
          <p className="font-editorial text-[15px] italic text-mist/70">
            Feel free to call or text Misha
          </p>
          <a
            href="tel:+12816500500"
            className="inline-block font-body text-lg font-medium text-gold tracking-wide hover:text-gold/80 transition-colors"
          >
            (281) 650-0500
          </a>
          <div>
            <a
              href="tel:+12816500500"
              className="inline-block font-body text-xs uppercase tracking-widest text-mist/60 border border-muted/30 px-7 py-3 hover:bg-gold/10 transition-colors"
            >
              Or Call (281) 650-0500
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
