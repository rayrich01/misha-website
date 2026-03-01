import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Schedule a Consultation | Misha Creations Houston',
  description:
    'Book a complimentary consultation with Misha Creations. We will visit your Houston home, study the light and architecture, and show you what is possible.',
}

export default function ConsultPage() {
  return (
    <section className="pt-20 min-h-screen bg-cream">
      <iframe
        src="https://calendly.com/mishacreations/30min"
        width="100%"
        height="100%"
        className="min-h-[calc(100vh-80px)] border-0"
        title="Schedule a consultation with Misha Creations"
      />
    </section>
  )
}
