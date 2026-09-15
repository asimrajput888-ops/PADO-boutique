// app/page.tsx

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <main className="bg-[#FDFBF7]">
      {/* ============ HERO SECTION (Hockerty Style) ============ */}
      <section className="relative min-h-screen flex items-center bg-[#FDFBF7]">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-32 pb-16">
          
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="z-10"
          >
            <p className="text-amber-600 tracking-[0.3em] text-xs font-semibold mb-6 uppercase">
              Architectural Tailoring &amp; Pure Silk Loungewear
            </p>
            <h1 className="text-5xl md:text-7xl font-serif text-neutral-900 mb-6 leading-tight">
              The Art of <br /> Bespoke Precision
            </h1>
            <p className="text-neutral-600 max-w-lg text-lg mb-10">
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
                className="border border-neutral-300 text-neutral-900 px-8 py-4 font-semibold hover:border-amber-600 hover:text-amber-600 transition-all duration-300 tracking-widest text-xs uppercase"
              >
                Explore Catalogue
              </Link>
            </div>
          </motion.div>

          {/* Right: Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative aspect-[3/4] lg:aspect-[4/5] overflow-hidden"
          >
            <Image
              src="/images/hero.png"
              alt="Bespoke Tailoring"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* ============ CURATED DIVISIONS ============ */}
      <section className="py-24 px-6 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-amber-600 tracking-[0.3em] text-xs font-semibold mb-4 uppercase">
              Curated Divisions
            </p>
            <h2 className="text-4xl md:text-5xl font-serif mb-4">
              Three Tiers of Craftsmanship
            </h2>
            <p className="text-neutral-500 max-w-xl mx-auto">
              From full bespoke tailoring to ready-to-wear signature suits.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tier 1: Men's Bespoke */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Link href="/men" className="group block">
                <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 mb-6">
                  <Image
                    src="/images/editorial-men.png"
                    alt="Men's Bespoke"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
                </div>
                <p className="text-amber-600 tracking-[0.3em] text-xs font-semibold mb-2 uppercase">
                  Tier 01
                </p>
                <h3 className="text-2xl font-serif mb-2 group-hover:text-amber-600 transition">
                  Men's Bespoke
                </h3>
                <p className="text-neutral-500 text-sm">
                  Full custom tailoring — fabric, style, details, fit, measurements.
                </p>
              </Link>
            </motion.div>

            {/* Tier 2: Women's Bespoke */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <Link href="/women" className="group block">
                <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 mb-6">
                  <Image
                    src="/images/editorial-women.png"
                    alt="Women's Bespoke"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
                </div>
                <p className="text-amber-600 tracking-[0.3em] text-xs font-semibold mb-2 uppercase">
                  Tier 02
                </p>
                <h3 className="text-2xl font-serif mb-2 group-hover:text-amber-600 transition">
                  Women's Bespoke
                </h3>
                <p className="text-neutral-500 text-sm">
                  Timeless couture — silk loungewear, gowns, and tailored blazers.
                </p>
              </Link>
            </motion.div>

            {/* Tier 3: Signature Suit */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link href="/signature-suit" className="group block">
                <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 mb-6">
                  <Image
                    src="/images/garments/suit.webp"
                    alt="Signature Suit"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
                </div>
                <p className="text-amber-600 tracking-[0.3em] text-xs font-semibold mb-2 uppercase">
                  Tier 03
                </p>
                <h3 className="text-2xl font-serif mb-2 group-hover:text-amber-600 transition">
                  Signature Suit
                </h3>
                <p className="text-neutral-500 text-sm">
                  Ready-to-wear. Single/Double breasted in limited colors.
                </p>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ CUSTOM GALLERY CTA ============ */}
      <section className="py-24 px-6 bg-neutral-900 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-amber-500 tracking-[0.3em] text-xs font-semibold mb-4 uppercase"
          >
            PADO Signature Designs
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-4xl md:text-5xl font-serif mb-6"
          >
            One-of-a-Kind Designs
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white/60 max-w-xl mx-auto mb-10"
          >
            Choose an exclusive PADO design, provide your measurements, and we'll craft it in 3 weeks.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            <Link
              href="/custom"
              className="bg-amber-500 text-black px-10 py-4 font-semibold hover:bg-amber-400 transition-all duration-300 tracking-widest text-xs uppercase inline-block"
            >
              Explore Signature Designs
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
