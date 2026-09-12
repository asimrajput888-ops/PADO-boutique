import type { Metadata } from 'next'
import { CartProvider } from '@/context/cart-context'
import './globals.css'

export const metadata: Metadata = {
  title: 'Zoe Pado | Bespoke Tailoring & Luxury Apparel',
  description: 'Custom tailored suits and premium menswear.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-white text-neutral-900 antialiased">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
