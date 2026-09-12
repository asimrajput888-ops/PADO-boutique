import type React from 'react'
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/lib/cart-context'
import { SiteHeader } from '@/components/site/site-header'
import { SiteFooter } from '@/components/site/site-footer'
import { CartDrawer } from '@/components/site/cart-drawer'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-cormorant',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'BESPOKE — Tailored For You',
    template: '%s — BESPOKE',
  },
  description:
    'BESPOKE is a premium custom tailoring house. Design your own suit with hand-selected fabrics, precision measurements and a perfect fit — crafted for men and women, delivered worldwide.',
  keywords: [
    'bespoke tailoring',
    'custom suits',
    'made to measure suits',
    'luxury menswear',
    'luxury womenswear',
    'premium fabrics',
  ],
  openGraph: {
    title: 'BESPOKE — Tailored For You',
    description:
      'Premium custom tailoring. Design your own suit with premium fabrics and a precise, personal fit.',
    type: 'website',
  },
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#f4f1ea',
  colorScheme: 'light',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`bg-background ${cormorant.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-background text-foreground">
        <CartProvider>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  )
}
