'use client'

import Link from 'next/link'
import { useCart } from '@/context/cart-context'
import { useCurrency, Currency } from '@/context/currency-context'
import { ShoppingBag } from 'lucide-react'

export default function Header() {
  const { totalItems } = useCart()
  const { currency, setCurrency } = useCurrency()

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-neutral-200">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-4">
        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-xs font-medium uppercase tracking-widest text-neutral-700">
          <Link href="/shop" className="hover:text-black transition-colors">
            Collections
          </Link>
          <Link href="/custom" className="hover:text-black transition-colors font-bold text-black">
            Create Your Suit
          </Link>
        </nav>

        {/* Brand Name */}
        <Link href="/" className="text-center">
          <span className="block text-xl font-serif font-bold tracking-wider text-black">
            PADO BOUTIQUE
          </span>
          <span className="block text-[9px] uppercase tracking-[0.25em] text-neutral-500 font-sans">
            Bespoke Modern Tailoring
          </span>
        </Link>

        {/* Actions & Currency Switcher */}
        <div className="flex items-center space-x-6">
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as Currency)}
            className="border border-neutral-300 bg-white px-2 py-1 text-xs text-neutral-800 focus:outline-none uppercase font-mono cursor-pointer"
          >
            <option value="USD">USD ($)</option>
            <option value="CAD">CAD (CA$)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
          </select>

          <Link href="/checkout" className="relative flex items-center text-neutral-800 hover:text-black">
            <ShoppingBag className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] text-white">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  )
}
