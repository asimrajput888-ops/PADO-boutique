// components/site/site-header.tsx

"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "unset";
  }, [menuOpen]);

  const menuSections = [
    {
      id: "for-him",
      title: "For Him",
      links: [
        { name: "All Men's", href: "/custom/men" },
        { name: "Suits", href: "/custom/men?type=suit" },
        { name: "Blazers", href: "/custom/men?type=blazer" },
        { name: "Tuxedos", href: "/custom/men?type=tuxedo" },
        { name: "Coats", href: "/custom/men?type=coat" },
        { name: "Shirts", href: "/custom/men?type=shirt" },
        { name: "Trousers", href: "/custom/men?type=trouser" },
        { name: "Vests", href: "/custom/men?type=vest" },
      ],
    },
    {
      id: "for-her",
      title: "For Her",
      links: [
        { name: "All Women's", href: "/custom/women" },
        { name: "Suits", href: "/custom/women?type=suit" },
        { name: "Blazers", href: "/custom/women?type=blazer" },
        { name: "Coats", href: "/custom/women?type=coat" },
        { name: "Shirts", href: "/custom/women?type=shirt" },
        { name: "Trousers", href: "/custom/women?type=trouser" },
      ],
    },
    {
      id: "seasonal",
      title: "Seasonal & Novelty",
      links: [
        { name: "Halloween", href: "/seasonal?type=halloween" },
        { name: "Superhero", href: "/seasonal?type=superhero" },
        { name: "Gothic & Dark", href: "/seasonal?type=gothic" },
        { name: "Movie-Inspired", href: "/seasonal?type=movie" },
        { name: "Party & Events", href: "/seasonal?type=party" },
      ],
    },
    {
      id: "atelier",
      title: "Atelier",
      links: [
        { name: "Our Story", href: "/about" },
        { name: "Journal", href: "/journal" },
        { name: "Measurements Guide", href: "/measurements" },
        { name: "Book a Fitting", href: "/contact" },
      ],
    },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-sm"
            : "bg-gradient-to-b from-black/70 via-black/40 to-transparent"
        }`}
      >
        <div className="relative flex items-center justify-between px-5 md:px-12 py-4 md:py-5">
          {/* LEFT: Menu + Search */}
          <div className="flex items-center gap-5 z-10">
            <button
              onClick={() => setMenuOpen(true)}
              className="group"
              aria-label="Open menu"
            >
              <div className="flex flex-col gap-[5px]">
                <span
                  className={`w-6 h-[1.5px] transition-colors duration-500 ${
                    scrolled ? "bg-black" : "bg-white"
                  }`}
                />
                <span
                  className={`w-6 h-[1.5px] transition-colors duration-500 ${
                    scrolled ? "bg-black" : "bg-white"
                  }`}
                />
                <span
                  className={`w-4 h-[1.5px] transition-all duration-500 ${
                    scrolled ? "bg-black" : "bg-white"
                  } group-hover:w-6`}
                />
              </div>
            </button>

            <Link
              href="/custom"
              aria-label="Search"
              className={`transition-colors duration-500 ${
                scrolled ? "text-black" : "text-white"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-[18px] h-[18px]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </Link>
          </div>

          {/* CENTER: PADO Logo */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center"
            aria-label="PADO Boutique"
          >
            <span className="block font-serif text-2xl md:text-3xl tracking-[0.5em] text-[#D4AF37]">
              PADO
            </span>
            <span
              className={`block text-[8px] md:text-[9px] tracking-[0.4em] mt-0.5 transition-colors duration-500 ${
                scrolled ? "text-neutral-500" : "text-white/80"
              }`}
            >
              BESPOKE
            </span>
          </Link>

          {/* RIGHT: Account + Cart */}
          <div className="flex items-center gap-4 md:gap-6 z-10">
            <Link
              href="/admin/login"
              aria-label="Account"
              className={`transition-colors duration-500 ${
                scrolled ? "text-black" : "text-white"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-[18px] h-[18px]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </Link>

            <Link
              href="/checkout"
              className={`transition-colors duration-500 ${
                scrolled ? "text-black" : "text-white"
              }`}
              aria-label="Cart"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-[18px] h-[18px]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z"
                />
              </svg>
            </Link>
          </div>
        </div>
      </header>

      {/* MENU DRAWER */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setMenuOpen(false)}
          />

          <div className="fixed top-0 left-0 h-full w-full md:w-[480px] bg-white z-[70] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between px-8 py-6 border-b border-neutral-200 sticky top-0 bg-white z-10">
              <span className="text-[10px] uppercase tracking-[0.4em] text-neutral-500">
                Menu
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-xl text-black hover:text-[#D4AF37] transition"
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            <div className="px-8 py-10">
              {menuSections.map((section) => (
                <div key={section.id} className="mb-8">
                  <button
                    onClick={() =>
                      setOpenSubmenu(
                        openSubmenu === section.id ? null : section.id
                      )
                    }
                    className="w-full text-left flex items-center justify-between mb-4 group"
                  >
                    <span className="text-xl md:text-2xl font-serif text-black group-hover:text-[#D4AF37] transition">
                      {section.title}
                    </span>
                    <span className="text-neutral-400 text-lg font-light">
                      {openSubmenu === section.id ? "−" : "+"}
                    </span>
                  </button>

                  {openSubmenu === section.id && (
                    <ul className="space-y-3 pl-4 border-l border-neutral-200">
                      {section.links.map((link) => (
                        <li key={link.name}>
                          <Link
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            className="block text-sm text-neutral-600 hover:text-black transition tracking-wide"
                          >
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            <div className="px-8 py-6 border-t border-neutral-200 space-y-3">
              <Link
                href="/track-order"
                onClick={() => setMenuOpen(false)}
                className="block text-sm text-neutral-600 hover:text-black transition"
              >
                Track Order
              </Link>
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="block text-sm text-neutral-600 hover:text-black transition"
              >
                Contact
              </Link>
              <div className="pt-4 border-t border-neutral-200 mt-4">
                <p className="text-[10px] text-neutral-400 uppercase tracking-[0.4em] mb-3">
                  Get in touch
                </p>
                <p className="text-sm text-neutral-700">www.padoshop.com</p>
                <p className="text-sm text-neutral-700">+1 (639) 384-0265</p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
