// components/site/site-header.tsx

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// NAYA MENU STRUCTURE (Dropdowns ke sath)
const NAV_ITEMS = [
  {
    name: "Ready to Wear",
    href: "/shop",
    submenu: [
      { name: "Men's Suits", href: "/shop?type=suit" },
      { name: "Men's Blazers", href: "/shop?type=blazer" },
      { name: "Women's Suits", href: "/shop?type=suit" },
      { name: "Women's Blazers", href: "/shop?type=blazer" },
    ]
  },
  {
    name: "Made to Measure",
    href: "/custom",
    submenu: [
      { name: "For Him", href: "/custom/men" },
      { name: "For Her", href: "/custom/women" },
    ]
  },
  {
    name: "Seasonal",
    href: "/seasonal",
    submenu: [
      { name: "Halloween", href: "/seasonal?category=halloween" },
      { name: "Superhero", href: "/seasonal?category=superhero" },
      { name: "Gothic", href: "/seasonal?category=gothic" },
      { name: "Party Wear", href: "/seasonal?category=party" },
    ]
  },
  {
    name: "Atelier",
    href: "/about",
  }
];

export default function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setExpandedMobileItem(null); // Menu band hone par dropdown reset ho jaye
  }, [pathname]);

  const isHomePage = pathname === "/";
  const headerBg = isScrolled || !isHomePage || mobileMenuOpen
    ? "bg-brand-ivory/95 backdrop-blur-md border-b border-border shadow-sm py-4"
    : "bg-transparent py-6";
  
  const textColor = isScrolled || !isHomePage ? "text-brand-charcoal" : "text-white";

  const toggleMobileSubmenu = (name: string) => {
    setExpandedMobileItem(expandedMobileItem === name ? null : name);
  };

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

          {/* Desktop Navigation (With Mega Menu) */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <div key={item.name} className="relative group py-2">
                {/* Main Link */}
                <Link
                  href={item.href}
                  className={`text-[11px] uppercase tracking-[0.2em] font-medium transition-all duration-300 hover:text-brand-gold flex items-center gap-1 ${
                    pathname.startsWith(item.href) ? "text-brand-gold" : textColor
                  }`}
                >
                  {item.name}
                  {item.submenu && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 opacity-50 group-hover:rotate-180 transition-transform duration-300">
                      <path d="m6 9 6 6 6-6"/>
                    </svg>
                  )}
                </Link>

                {/* Dropdown Menu */}
                {item.submenu && (
                  <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div className="bg-white border border-border shadow-xl w-48 py-2 flex flex-col">
                      {item.submenu.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className="px-5 py-3 text-[10px] uppercase tracking-[0.15em] text-brand-slate hover:text-ink hover:bg-brand-cream transition-colors"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
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

              <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
                {NAV_ITEMS.map((item) => (
                  <div key={item.name} className="border-b border-border/50 pb-2">
                    {/* Mobile Main Link */}
                    <div className="flex justify-between items-center">
                      <Link href={item.href} className="font-serif text-2xl text-brand-charcoal py-3">
                        {item.name}
                      </Link>
                      {item.submenu && (
                        <button onClick={() => toggleMobileSubmenu(item.name)} className="p-3 text-brand-charcoal">
                          <motion.svg 
                            animate={{ rotate: expandedMobileItem === item.name ? 180 : 0 }}
                            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                          >
                            <path d="m6 9 6 6 6-6"/>
                          </motion.svg>
                        </button>
                      )}
                    </div>

                    {/* Mobile Submenu Accordion */}
                    <AnimatePresence>
                      {item.submenu && expandedMobileItem === item.name && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }} 
                          animate={{ height: "auto", opacity: 1 }} 
                          exit={{ height: 0, opacity: 0 }} 
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col gap-3 pl-4 py-4">
                            {item.submenu.map((sub) => (
                              <Link key={sub.name} href={sub.href} className="text-sm uppercase tracking-[0.1em] text-brand-slate hover:text-ink">
                                {sub.name}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
