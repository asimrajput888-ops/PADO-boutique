// components/site/site-header.tsx

"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "@/context/cart-context";
import { useCurrency } from "@/context/currency-context";
import { motion, AnimatePresence } from "framer-motion";

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const { cart } = useCart();
  const { currency, setCurrency } = useCurrency();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "unset";
  }, [menuOpen]);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const menuSections = [
    {
      id: "custom-made",
      title: "Custom Made",
      links: [
        { name: "Signature Designs", href: "/custom" },
      ],
    },
    {
      id: "ready-to-wear",
      title: "Ready to Wear",
      links: [
        { name: "Limited Designs", href: "/signature-suit" },
      ],
    },
    {
      id: "shop",
      title: "Shop All",
      links: [
        { name: "All Products", href: "/shop" },
        { name: "Men", href: "/shop" },
        { name: "Women", href: "/shop" },
        { name: "Custom Made", href: "/shop" },
        { name: "Ready to Wear", href: "/shop" },
      ],
    },
    {
      id: "info",
      title: "Highlights",
      links: [
        { name: "About", href: "/about" },
        { name: "Journal", href: "/journal" },
        { name: "How It Works", href: "/about" },
      ],
    },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#FDFBF7]/95 backdrop-blur-md border-b border-neutral-200"
            : "bg-gradient-to-b from-black/50 to-transparent"
        }`}
      >
        <div className="relative flex items-center justify-between px-6 py-5">
          
          {/* LEFT: Hamburger Menu */}
          <button
            onClick={() => setMenuOpen(true)}
            className="flex items-center gap-3 group z-10"
          >
            <div className="flex flex-col gap-1.5">
              <span className={`w-6 h-[1.5px] transition-colors duration-500 ${scrolled ? "bg-neutral-900" : "bg-white"}`} />
              <span className={`w-6 h-[1.5px] transition-colors duration-500 ${scrolled ? "bg-neutral-900" : "bg-white"}`} />
              <span className={`w-4 h-[1.5px] transition-colors duration-500 ${scrolled ? "bg-neutral-900" : "bg-white"}`} />
            </div>
          </button>

          {/* CENTER: Logo */}
          <Link
            href="/"
            className={`absolute left-1/2 -translate-x-1/2 text-sm md:text-lg font-serif tracking-[0.35em] transition-colors duration-500 ${
              scrolled ? "text-neutral-900" : "text-white"
            }`}
          >
            PADO BOUTIQUE
          </Link>

          {/* RIGHT: Currency + Cart */}
          <div className="flex items-center gap-5 z-10">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className={`bg-transparent text-xs uppercase tracking-widest border-0 outline-none cursor-pointer transition-colors duration-500 ${
                scrolled ? "text-neutral-900" : "text-white"
              }`}
            >
              <option value="PKR" className="text-neutral-900">PKR</option>
              <option value="USD" className="text-neutral-900">USD</option>
            </select>

            <Link href="/checkout" className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor"
                className={`w-5 h-5 transition-colors duration-500 ${scrolled ? "text-neutral-900" : "text-white"}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
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

      {/* SIDE MENU DRAWER */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="fixed top-0 left-0 h-full w-full md:w-[520px] bg-[#FDFBF7] z-[70] overflow-y-auto"
            >
              <div className="flex items-center justify-between px-8 py-6 border-b border-neutral-200">
                <span className="text-xs uppercase tracking-[0.3em] text-neutral-500">Menu</span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-2xl text-neutral-900 hover:text-amber-600 transition"
                >
                  ✕
                </button>
              </div>

              <div className="px-8 py-10">
                {menuSections.map((section) => (
                  <div key={section.id} className="mb-10">
                    <button
                      onClick={() =>
                        setOpenSubmenu(openSubmenu === section.id ? null : section.id)
                      }
                      className="w-full text-left flex items-center justify-between mb-4 group"
                    >
                      <span className="text-2xl md:text-3xl font-serif text-neutral-900 group-hover:text-amber-600 transition">
                        {section.title}
                      </span>
                      <span className="text-neutral-400 text-sm">
                        {openSubmenu === section.id ? "−" : "+"}
                      </span>
                    </button>

                    <AnimatePresence>
                      {openSubmenu === section.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <ul className="space-y-3 pl-4 border-l border-neutral-200">
                            {section.links.map((link) => (
                              <li key={link.name}>
                                <Link
                                  href={link.href}
                                  onClick={() => setMenuOpen(false)}
                                  className="block text-base text-neutral-600 hover:text-amber-600 transition tracking-wide"
                                >
                                  {link.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              <div className="px-8 py-6 border-t border-neutral-200">
                <p className="text-xs text-neutral-400 uppercase tracking-widest mb-3">Contact</p>
                <p className="text-sm text-neutral-700">www.joinpado.com</p>
                <p className="text-sm text-neutral-700">+1 (639) 384-0265</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
