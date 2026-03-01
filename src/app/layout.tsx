import type { Metadata } from 'next'
import { Great_Vibes, Cormorant_Garamond, Lora } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

const greatVibes = Great_Vibes({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-great-vibes',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
})

const lora = Lora({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Misha Creations | Luxury Decorative Finishes Houston',
    template: '%s | Misha Creations',
  },
  description:
    "Houston's premier decorative finishes artist. Custom wall murals, Venetian plaster, and luxury decorative painting for River Oaks, Memorial, Tanglewood, and West University homes.",
  metadataBase: new URL('https://mishacreations.com'),
  openGraph: {
    siteName: 'Misha Creations',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${greatVibes.variable} ${cormorant.variable} ${lora.variable} font-body antialiased`}
      >
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
