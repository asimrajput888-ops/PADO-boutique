// app/page.tsx

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <main>

      {/* ============ FULL SCREEN HERO SECTION ============ */}
      <section className="relative min-h-screen w-full flex items-center justify-start overflow-hidden">

        {/* Background Image — bright */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero.png"
            alt="PADO BOUTIQUE Bespoke Tailoring"
            fill
            priority
            className="object-cover object-top"
            style={{ filter: "brightness(1.18) contrast(1.05)" }}
          />

          {/* Halka dark overlay — text readable rahe */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/25 to-transparent" />
        </div>

        {/* Hero Content — LEFT side */}
        <div className="relative z-10 container mx-auto px-6 md:px-16 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-xl text-white"
          >

            {/* Brand Name — small */}
            <p className="text-amber-500 tracking-[0.4em] text-[11px] md:text-xs font-semibold mb-4 uppercase">
              PADO BOUTIQUE
            </p>

            {/* Main Heading — small */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-5 leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
              The Art of <br />
              <span className="italic text-amber-500">Bespoke</span> Precision
            </h1>

            {/* Description — small */}
            <p className="text-sm md:text-base text-white/85 mb-8 max-w-md font-light leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.4)]">
              Crafting custom-tailored silhouettes, artisanal wool-cashmere blazers,
              and luxury garments designed to your exact body specifications.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/custom"
                className="bg-amber-500 text-black px-6 py-3 font-semibold hover:bg-amber-400 transition-all duration-300 tracking-widest text-[11px] uppercase"
              >
                Design Your Suit
              </Link>
              <Link
                href="/shop"
                className="border border-white/60 text-white px-6 py-3 font-semibold hover:border-amber-500 hover:text-amber-500 transition-all duration-300 tracking-widest text-[11px] uppercase"
              >
                Explore Catalogue
              </Link>
            </div>

          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-amber-500 to-transparent" />
        </motion.div>

      </section>

      {/* ============ YAHAN APNE BAQI SECTIONS PASTE KARO ============ */}
      {/* 
        Tumhare page me hero ke neeche jo bhi sections the 
        (Curated Divisions, Custom Gallery CTA, Journal preview, etc.)
        Un sab ko yahan paste kar do.
        
        Agar kuch nahi tha, to ye file aise hi kaam karegi.
      */}

    </main>
  );
}
