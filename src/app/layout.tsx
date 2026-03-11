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
    default: 'Misha Creations | Luxury Finishes & Murals Houston',
    template: '%s | Misha Creations',
  },
  description:
    "Custom luxury finishes, luxury faux finishes, wall murals, Venetian plaster & decorative painting for River Oaks, Memorial & Tanglewood homes. Expert artisan craftsmanship in Houston.",
  metadataBase: new URL('https://mishacreations.com'),
  openGraph: {
    siteName: 'Misha Creations',
    locale: 'en_US',
    type: 'website',
    title: 'Misha Creations | Luxury Finishes, Wall Murals & Venetian Plaster in Houston',
    description:
      "Luxury finishes, luxury faux finishes, wall murals, Venetian plaster, and artistic environments customized to your tastes, designed for Houston's most beautiful homes. Serving River Oaks, Memorial, West University, Tanglewood, Bellaire & Piney Point Village.",
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Misha Creations - Houston\'s Premier Decorative Painting',
    description: 'Transform your Houston home with luxury wall murals and decorative finishes.',
    images: ['/og-image.jpg'],
  },
  other: {
    'geo.region': 'US-TX',
    'geo.placename': 'Houston',
    'geo.position': '29.7604;-95.3698',
    'ICBM': '29.7604, -95.3698',
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
{/* Google Tag Manager (noscript) */}
<noscript dangerouslySetInnerHTML={{ __html: `
  <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-T8WG6SX9"
  height="0" width="0" style="display:none;visibility:hidden"></iframe>
` }} />
{/* End Google Tag Manager (noscript) */}
{/* Google Tag Manager */}
<script dangerouslySetInnerHTML={{ __html: `
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-T8WG6SX9');
` }} />
{/* End Google Tag Manager */}
        <div className="max-w-screen-2xl mx-auto w-full">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
