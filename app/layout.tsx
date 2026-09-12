import type { Metadata } from 'next'
import { CartProvider } from '@/context/cart-context'
import { CurrencyProvider } from '@/context/currency-context'
import './globals.css'

export const metadata: Metadata = {
  title: 'PADO BOUTIQUE | Bespoke Modern Tailoring',
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
        <CurrencyProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </CurrencyProvider>
      </body>
    </html>
  )
}
