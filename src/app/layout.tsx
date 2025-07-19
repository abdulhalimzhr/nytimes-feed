import type { Metadata } from 'next'
import { Playfair_Display, Playfair_Display_SC } from 'next/font/google'
import Providers from '../components/providers'
import './globals.css'

const playfairDisplay = Playfair_Display({
  variable: '--font-playfair-display',
  subsets: ['latin'],
})

const playfairDisplaySC = Playfair_Display_SC({
  variable: '--font-playfair-display-sc',
  weight: ['400', '700', '900'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'NY Times Feed',
  description:
    'A simple Next.js app to fetch and display articles from the New York Times API.',
  icons: {
    icon: [
      {
        url: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
    apple: [
      {
        url: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    other: [
      {
        rel: 'android-chrome-192x192',
        url: '/android-chrome-192x192.png',
      },
      {
        rel: 'android-chrome-512x512',
        url: '/android-chrome-512x512.png',
      },
    ],
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-background text-foreground antialiased ${playfairDisplay.variable} ${playfairDisplaySC.variable}`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
