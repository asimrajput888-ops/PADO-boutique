// components/site/site-header.tsx

"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "@/context/cart-context";
import { useCurrency } from "@/context/currency-context";

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const { cart } = useCart();
  const { currency, setCurrency } = useCurrency();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#FDFBF7]/90 backdrop-blur-md border-b border-neutral-200"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-serif tracking-tight text-neutral-900">
          PADO<span className="text-amber-600">.</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/men" className="text-xs uppercase tracking-[0.2em] text-neutral-600 hover:text-amber-600 transition">
            Men
          </Link>
          <Link href="/women" className="text-xs uppercase tracking-[0.2em] text-neutral-600 hover:text-amber-600 transition">
            Women
          </Link>
          <Link href="/custom" className="text-xs uppercase tracking-[0.2em] text-neutral-600 hover:text-amber-600 transition">
            Custom
          </Link>
          <Link href="/signature-suit" className="text-xs uppercase tracking-[0.2em] text-neutral-600 hover:text-amber-600 transition">
            Signature Suit
          </Link>
          <Link href="/shop" className="text-xs uppercase tracking-[0.2em] text-neutral-600 hover:text-amber-600 transition">
            Shop
          </Link>
          <Link href="/about" className="text-xs uppercase tracking-[0.2em] text-neutral-600 hover:text-amber-600 transition">
            About
          </Link>
          <Link href="/journal" className="text-xs uppercase tracking-[0.2em] text-neutral-600 hover:text-amber-600 transition">
            Journal
          </Link>
        </nav>

        {/* Right Side: Currency + Cart */}
        <div className="flex items-center gap-4">
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="bg-transparent text-xs uppercase tracking-widest text-neutral-600 border border-neutral-300 px-2 py-1 rounded cursor-pointer"
          >
            <option value="PKR">PKR</option>
            <option value="USD">USD</option>
          </select>

          <Link href="/checkout" className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 text-neutral-900"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
