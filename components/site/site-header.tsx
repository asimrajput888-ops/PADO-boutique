// components/site/site-header.tsx

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/cart-context";

const NAV_LINKS = [
  { name: "Ready to Wear", href: "/shop" },       // NAYA LINK
  { name: "For Him", href: "/custom/men" },
  { name: "For Her", href: "/custom/women" },
  { name: "Seasonal & Novelty", href: "/seasonal" },
  { name: "Atelier", href: "/about" },
];

export default function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  // Aapke cart context ke hisaab se isko adjust kar lein
  // const { cart } = useCart(); 

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setMobileMenuOpen(false), [pathname]);

  // Home page pe transparent, baaki jagah solid background
  const isHomePage = pathname === "/";
  const headerBg = isScrolled || !isHomePage || mobileMenuOpen
    ? "bg-brand-ivory/95 backdrop-blur-md border-b border-border shadow-sm py-4"
    : "bg-transparent py-6";
  
  const textColor = isScrolled || !isHomePage ? "text-brand-charcoal" : "text-white";

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${headerBg}`}>
        <div className="max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 flex items-center justify-between">
          
          {/* Mobile Menu Button */}
          <button onClick={() => setMobileMenuOpen(true)} className={`lg:hidden p-2 -ml-2 ${textColor}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 8h16M4 16h16" />
            </svg>
          </button>

          {/* Logo */}
          <Link href="/" className="flex-1 lg:flex-none text-center lg:text-left">
            <span className={`font-serif text-2xl tracking-[0.2em] uppercase transition-colors duration-500 ${textColor}`}>
              PADO
            </span>
            <span className={`block text-[8px] uppercase tracking-[0.4em] mt-1 transition-colors duration-500 ${isScrolled || !isHomePage ? "text-brand-slate" : "text-white/70"}`}>
              Bespoke
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-[11px] uppercase tracking-[0.2em] font-medium transition-all duration-300 hover:text-brand-gold ${
                  pathname.startsWith(link.href) ? "text-brand-gold" : textColor
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Icons */}
          <div className={`flex items-center justify-end gap-5 flex-1 lg:flex-none ${textColor}`}>
            <button className="hover:text-brand-gold transition-colors hidden sm:block">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
            </button>
            <button className="hover:text-brand-gold transition-colors relative">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
              <span className="absolute -top-1.5 -right-2 bg-brand-gold text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileMenuOpen(false)} className="fixed inset-0 bg-black/50 z-[60] lg:hidden" />
            <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "tween", duration: 0.4 }} className="fixed top-0 left-0 bottom-0 w-[85vw] max-w-[400px] bg-brand-ivory z-[70] flex flex-col lg:hidden shadow-2xl">
              <div className="p-6 flex justify-between items-center border-b border-border">
                <span className="font-serif text-xl tracking-[0.2em] uppercase text-brand-charcoal">PADO</span>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-brand-charcoal">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6 6 18M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto py-10 px-6 flex flex-col gap-8">
                {NAV_LINKS.map((link) => (
                  <Link key={link.name} href={link.href} className="font-serif text-3xl text-brand-charcoal hover:text-brand-gold transition-colors">
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
