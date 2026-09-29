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
        
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero.png" // Aapki current image
            alt="PADO BOUTIQUE Bespoke Tailoring"
            fill
            priority
            className="object-cover object-top" // object-top se model ka sar/head nazar aayega
          />
          {/* Dark Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 md:px-16 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl text-white"
          >
            {/* Brand Name - Prominently Displayed */}
            <p className="text-amber-500 tracking-[0.4em] text-sm md:text-base font-semibold mb-6 uppercase">
              PADO BOUTIQUE
            </p>

            <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight">
              The Art of <br />
              <span className="italic text-amber-500">Bespoke</span> Precision
            </h1>

            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-lg font-light leading-relaxed">
              Crafting custom-tailored silhouettes, artisanal wool-cashmere blazers, 
              and luxury garments designed to your exact body specifications.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/custom"
                className="bg-amber-500 text-black px-8 py-4 font-semibold hover:bg-amber-400 transition-all duration-300 tracking-widest text-xs uppercase"
              >
                Design Your Suit
              </Link>
              <Link
                href="/shop"
                className="border border-white/50 text-white px-8 py-4 font-semibold hover:border-amber-500 hover:text-amber-500 transition-all duration-300 tracking-widest text-xs uppercase"
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

      {/* ============ BAQI SECTIONS (Jaisa pehle tha) ============ */}
      {/* Neeche apna Curated Divisions, Custom Gallery CTA waghaira wahi rakhein jo pehle tha */}
    </main>
  );
}
