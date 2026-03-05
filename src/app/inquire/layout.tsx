import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Project Inquiry | Misha Creations Houston',
  description:
    'Submit a project inquiry to Misha Creations. Describe your vision for custom wall murals, Venetian plaster, or decorative finishes in your Houston home.',
  alternates: {
    canonical: 'https://mishacreations.com/inquire',
  },
}

export default function InquireLayout({ children }: { children: React.ReactNode }) {
  return children
}
