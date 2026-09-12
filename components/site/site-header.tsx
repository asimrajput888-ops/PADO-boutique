'use client'

import Link from 'next/link'
import { useCart } from '@/context/cart-context'
import { ShoppingBag } from 'lucide-react'

export default function Header() {
  const { totalItems } = useCart()

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
            PADO BOUTIQUE (Bespoke Modern Tailoring)
          </span>
        </Link>

        {/* Cart Icon */}
        <div className="flex items-center space-x-6">
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
