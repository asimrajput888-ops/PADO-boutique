// app/page.tsx (Hero Section only)

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      {/* Hero Section with Full-Size Background Image */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        
        {/* Background Image with Parallax */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <Image
            src="/images/hero.png"          {/* <-- Apni image ka path */}
            alt="Bespoke Tailoring"
            fill
            className="object-cover"
            priority
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60" />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-amber-500 tracking-[0.3em] text-xs font-semibold mb-6 uppercase"
          >
            Architectural Tailoring & Pure Silk Loungewear
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-serif text-white mb-6 leading-tight"
          >
            The Art of Bespoke <br /> Precision
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/80 max-w-2xl mx-auto text-lg mb-10"
          >
            Crafting custom-tailored silhouettes, artisanal wool-cashmere blazers, 
            and luxury garments designed to your exact body specifications.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Link
              href="/custom"
              className="bg-amber-500 text-black px-8 py-4 font-semibold hover:bg-amber-400 transition-all duration-300 tracking-widest text-xs uppercase"
            >
              Enter Bespoke Studio
            </Link>
            <Link
              href="/shop"
              className="border border-white/40 text-white px-8 py-4 font-semibold hover:border-amber-500 hover:text-amber-500 transition-all duration-300 tracking-widest text-xs uppercase"
            >
              Explore Catalogue
            </Link>
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

      {/* Baaki sections yahan aayenge */}
    </main>
  );
}
