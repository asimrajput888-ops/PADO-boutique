// components/site/site-header.tsx

"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/cart-context";
import { useCurrency } from "@/context/currency-context";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  {
    name: "Men",
    href: "/custom/men",
    mega: [
      {
        title: "Bespoke",
        links: [
          { name: "All Men's", href: "/custom/men" },
          { name: "Suits", href: "/custom/men?type=suit" },
          { name: "Blazers", href: "/custom/men?type=blazer" },
          { name: "Tuxedos", href: "/custom/men?type=tuxedo" },
          { name: "Coats", href: "/custom/men?type=coat" },
        ],
      },
      {
        title: "Essentials",
        links: [
          { name: "Shirts", href: "/custom/men?type=shirt" },
          { name: "Trousers", href: "/custom/men?type=trouser" },
          { name: "Vests", href: "/custom/men?type=vest" },
        ],
      },
    ],
  },
  {
    name: "Women",
    href: "/custom/women",
    mega: [
      {
        title: "Bespoke",
        links: [
          { name: "All Women's", href: "/custom/women" },
          { name: "Suits", href: "/custom/women?type=suit" },
          { name: "Blazers", href: "/custom/women?type=blazer" },
          { name: "Coats", href: "/custom/women?type=coat" },
        ],
      },
      {
        title: "Essentials",
        links: [
          { name: "Shirts", href: "/custom/women?type=shirt" },
          { name: "Trousers", href: "/custom/women?type=trouser" },
        ],
      },
    ],
  },
  {
    name: "Seasonal",
    href: "/seasonal",
    mega: [
      {
        title: "Novelty",
        links: [
          { name: "Halloween", href: "/seasonal?type=halloween" },
          { name: "Superhero", href: "/seasonal?type=superhero" },
          { name: "Gothic", href: "/seasonal?type=gothic" },
          { name: "Movie-Inspired", href: "/seasonal?type=movie" },
          { name: "Party", href: "/seasonal?type=party" },
        ],
      },
    ],
  },
  {
    name: "Atelier",
    href: "/about",
    mega: [
      {
        title: "Discover",
        links: [
          { name: "Our Story", href: "/about" },
          { name: "Journal", href: "/journal" },
          { name: "Measurements", href: "/measurements" },
          { name: "Contact", href: "/contact" },
        ],
      },
    ],
  },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { cart } = useCart();
  const { currency, setCurrency } = useCurrency();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 40);
      if (currentScrollY > lastScrollY && currentScrollY > 300) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "unset";
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
    setActiveMega(null);
  }, [pathname]);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <motion.header
        animate={{ y: hidden ? -120 : 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        onMouseLeave={() => setActiveMega(null)}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
          scrolled || activeMega
            ? "bg-paper border-b border-border"
            : "bg-transparent"
        }`}
      >
        {/* Top bar */}
        <div className="border-b border-border/50 hidden md:block">
          <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-2 flex items-center justify-between text-[10px] tracking-label uppercase text-stone">
            <div className="flex items-center gap-6">
              <span>Free Worldwide Shipping over $250</span>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/track-order" className="hover:text-ink transition-colors">
                Track Order
              </Link>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as any)}
                className="bg-transparent uppercase tracking-label border-0 outline-none cursor-pointer hover:text-ink transition-colors"
                aria-label="Currency"
              >
                <option value="USD">USD</option>
                <option value="CAD">CAD</option>
                <option value="EUR">EUR</option>
                <option value="AUD">AUD</option>
                <option value="GBP">GBP</option>
                <option value="AED">AED</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main nav */}
        <div className="max-w-[1600px] mx-auto px-6 md:px-10">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(true)}
              className="lg:hidden flex flex-col gap-[5px] p-2"
              aria-label="Menu"
            >
              <span className={`block w-6 h-[1px] ${scrolled || activeMega ? "bg-ink" : "bg-ink"}`} />
              <span className={`block w-6 h-[1px] ${scrolled || activeMega ? "bg-ink" : "bg-ink"}`} />
            </button>

            {/* Desktop nav left */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAV_ITEMS.slice(0, 2).map((item) => (
                <div
                  key={item.name}
                  onMouseEnter={() => setActiveMega(item.name)}
                  className="relative"
                >
                  <Link
                    href={item.href}
                    className={`text-[11px] uppercase tracking-label font-medium transition-colors duration-300 link-underline ${
                      activeMega === item.name ? "text-ink" : "text-ink hover:text-bronze"
                    }`}
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
            </nav>

            {/* Center Logo */}
            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2 font-serif text-lg md:text-xl tracking-[0.4em] text-ink"
            >
              PADO
            </Link>

            {/* Desktop nav right */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAV_ITEMS.slice(2).map((item) => (
                <div
                  key={item.name}
                  onMouseEnter={() => setActiveMega(item.name)}
                  className="relative"
                >
                  <Link
                    href={item.href}
                    className={`text-[11px] uppercase tracking-label font-medium transition-colors duration-300 link-underline ${
                      activeMega === item.name ? "text-ink" : "text-ink hover:text-bronze"
                    }`}
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
            </nav>

            {/* Right icons */}
            <div className="flex items-center gap-5">
              <Link
                href="/admin/login"
                aria-label="Account"
                className="text-ink hover:text-bronze transition-colors hidden md:block"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-[18px] h-[18px]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </Link>

              <Link href="/checkout" className="relative" aria-label="Cart">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-[18px] h-[18px] text-ink hover:text-bronze transition-colors">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-ink text-paper text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Mega menu */}
        <AnimatePresence>
          {activeMega && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="hidden lg:block absolute top-full left-0 right-0 bg-paper border-t border-border"
            >
              <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-12">
                <div className="grid grid-cols-4 gap-12">
                  {NAV_ITEMS.find((n) => n.name === activeMega)?.mega?.map((section) => (
                    <div key={section.title}>
                      <p className="text-[10px] tracking-label uppercase text-stone mb-5 font-medium">
                        {section.title}
                      </p>
                      <ul className="space-y-3">
                        {section.links.map((link) => (
                          <li key={link.name}>
                            <Link
                              href={link.href}
                              className="text-sm text-graphite hover:text-ink transition-colors"
                            >
                              {link.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-ink/40 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 left-0 h-full w-full md:w-[480px] bg-paper z-[70] overflow-y-auto"
            >
              <div className="flex items-center justify-between px-8 py-6 border-b border-border">
                <span className="text-[10px] uppercase tracking-label text-stone">
                  Menu
                </span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-2xl text-ink hover:text-bronze transition"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              <div className="px-8 py-10">
                {NAV_ITEMS.map((section) => (
                  <div key={section.name} className="mb-8">
                    <Link
                      href={section.href}
                      onClick={() => setMenuOpen(false)}
                      className="text-3xl font-serif text-ink hover:text-bronze transition-colors block mb-4"
                    >
                      {section.name}
                    </Link>
                    <div className="pl-4 border-l border-border space-y-2">
                      {section.mega?.flatMap((s) => s.links).slice(0, 5).map((link) => (
                        <Link
                          key={link.name}
                          href={link.href}
                          onClick={() => setMenuOpen(false)}
                          className="block text-sm text-graphite hover:text-ink transition-colors"
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-8 py-6 border-t border-border space-y-3">
                <Link href="/track-order" onClick={() => setMenuOpen(false)} className="block text-sm text-graphite hover:text-ink transition-colors">
                  Track Order
                </Link>
                <Link href="/contact" onClick={() => setMenuOpen(false)} className="block text-sm text-graphite hover:text-ink transition-colors">
                  Contact
                </Link>
                <div className="pt-4 border-t border-border mt-4">
                  <p className="text-[10px] text-stone uppercase tracking-label mb-3">Get in touch</p>
                  <p className="text-sm text-graphite">www.padoshop.com</p>
                  <p className="text-sm text-graphite">+1 (639) 384-0265</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
