import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Poppins, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CartProvider } from '@/context/cart-context'
import './globals.css'

/* ── Fonts ─────────────────────────────────────────────────────────────── */

// Display / headings — elegant editorial feel
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
})

// Body / UI — clean, modern sans
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-poppins',
  display: 'swap',
})

// Prices, track lengths, edition numbers — stamped mono feel
const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

/* ── Metadata ───────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: {
    default: 'TIKIZIKI | Official Store',
    template: '%s | TIKIZIKI',
  },
  description:
    'Stream, buy, and wear TIKIZIKI. Exclusive music tracks, limited merch drops, and collector editions.',
  keywords: ['TIKIZIKI', 'music', 'merch', 'limited edition', 'official store'],
  authors: [{ name: 'TIKIZIKI' }],
  creator: 'TIKIZIKI',

  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png',  media: '(prefers-color-scheme: dark)'  },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },

  openGraph: {
    type: 'website',
    siteName: 'TIKIZIKI Official Store',
    title: 'TIKIZIKI | Official Store',
    description: 'Stream, buy, and wear TIKIZIKI. Exclusive music tracks and limited merch drops.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'TIKIZIKI Store' }],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'TIKIZIKI | Official Store',
    description: 'Exclusive music tracks and limited merch drops.',
    images: ['/og-image.jpg'],
  },
}

/* ── Viewport (theme-color lives here in Next 14+) ─────────────────────── */

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7f3ec' }, // --paper
    { media: '(prefers-color-scheme: dark)',  color: '#181410' }, // --stage-black
  ],
  width: 'device-width',
  initialScale: 1,
}

/* ── Structured data (Google Music rich results) ───────────────────────── */

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MusicGroup',
  name: 'TIKIZIKI',
  url: 'https://store.tikiziki.com',
  // Add real social links below
  sameAs: [
    // 'https://open.spotify.com/artist/YOUR_ID',
    // 'https://instagram.com/tikiziki',
    // 'https://tiktok.com/@tikiziki',
  ],
}

/* ── Layout ─────────────────────────────────────────────────────────────── */

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>

      <body
        className={`
          ${playfair.variable}
          ${poppins.variable}
          ${geistMono.variable}
          font-sans antialiased
          bg-background text-foreground
        `}
      >
        <CartProvider>
          {children}
        </CartProvider>

        <Analytics />
      </body>
    </html>
  )
}
