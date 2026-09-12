"use client"

import Link from "next/link"
import { useCurrency } from "@/context/currency-context"

export default function Header() {
  const { currency, setCurrency } = useCurrency()

  return (
    <header className="sticky top-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-neutral-800 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Navigation Links - Matching App Router */}
        <nav className="hidden md:flex items-center space-x-8 text-xs uppercase tracking-[0.2em] font-medium text-neutral-300">
          <Link href="/men" className="hover:text-amber-400 transition-colors">Men</Link>
          <Link href="/women" className="hover:text-amber-400 transition-colors">Women</Link>
          <Link href="/custom" className="hover:text-amber-400 transition-colors">Bespoke Studio</Link>
          <Link href="/shop" className="hover:text-amber-400 transition-colors">Catalogue</Link>
        </nav>

        {/* Brand Logo */}
        <Link href="/" className="text-xl md:text-2xl font-serif tracking-[0.3em] font-light text-white text-center">
          PADO <span className="text-xs tracking-[0.4em] font-sans block text-neutral-500 font-normal">BOUTIQUE</span>
        </Link>

        {/* Currency Switcher & Book Fitting Button */}
        <div className="flex items-center space-x-6">
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as any)}
            className="bg-neutral-900 border border-neutral-800 text-neutral-300 text-[11px] px-2.5 py-1.5 rounded focus:outline-none focus:border-amber-400 font-mono"
          >
            <option value="USD">USD ($)</option>
            <option value="CAD">CAD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
          </select>

          <Link
            href="/custom"
            className="hidden sm:inline-block border border-amber-400/60 text-amber-400 text-[10px] uppercase tracking-widest px-4 py-2 hover:bg-amber-400 hover:text-black transition-all font-medium"
          >
            Book Fitting
          </Link>
        </div>

      </div>
    </header>
  )
}
