// components/site/site-header.tsx

"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/cart-context";
import { useCurrency } from "@/context/currency-context";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useCart();
  const { currency, toggleCurrency } = useCurrency();

  const navLinks = [
    { name: "Men", href: "/men" },
    { name: "Women", href: "/women" },
    { name: "Custom", href: "/custom" },
    { name: "Shop", href: "/shop" },
    { name: "About", href: "/about" },
  ];

  return (
    // YAHAN CHANGE: bg-[#0A0A0A] -> bg-white, border-neutral-800 -> border-neutral-200
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-200">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="text-2xl font-serif text-amber-600 tracking-widest">
          PADO
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              // YAHAN CHANGE: text-neutral-400 -> text-neutral-600, hover:text-amber-500 -> hover:text-amber-600
              className="text-sm text-neutral-600 hover:text-amber-600 transition-colors uppercase tracking-wider"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-6">
          
          {/* Currency Toggle */}
          <button 
            onClick={toggleCurrency} 
            // YAHAN CHANGE: colors ko light theme ke hisaab se karein
            className="text-xs text-neutral-600 hover:text-amber-600 transition border border-neutral-300 px-2 py-1"
          >
            {currency || "PKR"}
          </button>

          {/* Cart Link */}
          <Link href="/checkout" className="relative text-neutral-600 hover:text-amber-600 transition">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-neutral-600 hover:text-amber-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-neutral-200 px-6 py-4 space-y-4">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="block text-neutral-600 hover:text-amber-600 transition uppercase tracking-wider text-sm"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
