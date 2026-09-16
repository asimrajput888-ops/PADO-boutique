// app/page.tsx

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <main className="bg-[#FDFBF7]">

      {/* ============ FULL-SCREEN HERO (Suitsupply Style) ============ */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Image */}
        <motion.div
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src="/images/hero.png"
            alt="PADO BOUTIQUE"
            fill
            className="object-cover"
            priority
          />
          {/* Subtle Dark Gradient for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/40" />
        </motion.div>

        {/* Hero Content — Bottom Left */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-8 md:p-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h2 className="text-4xl md:text-6xl font-serif text-white mb-4 tracking-tight">
              New Arrivals
            </h2>
            <Link
              href="/shop"
              className="inline-block border-b border-white/60 pb-1 text-xs uppercase tracking-[0.3em] text-white hover:border-amber-500 hover:text-amber-500 transition-all duration-300"
            >
              Explore Collection
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="absolute bottom-8 right-8 z-10 hidden md:block"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-transparent to-white/60" />
        </motion.div>
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
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { tier: "Tier 01", title: "Men's Bespoke", desc: "Full custom tailoring — fabric, style, details, fit.", img: "/images/editorial-men.png", href: "/men" },
              { tier: "Tier 02", title: "Women's Bespoke", desc: "Timeless couture — silk loungewear, gowns, blazers.", img: "/images/editorial-women.png", href: "/women" },
              { tier: "Tier 03", title: "Signature Suit", desc: "Ready-to-wear. Single/Double breasted, limited colors.", img: "/images/garments/suit.webp", href: "/signature-suit" },
            ].map((item, i) => (
              <motion.div
                key={item.tier}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <Link href={item.href} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 mb-6">
                    <Image src={item.img} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
                  </div>
                  <p className="text-amber-600 tracking-[0.3em] text-xs font-semibold mb-2 uppercase">{item.tier}</p>
                  <h3 className="text-2xl font-serif mb-2 group-hover:text-amber-600 transition">{item.title}</h3>
                  <p className="text-neutral-500 text-sm">{item.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CUSTOM GALLERY CTA ============ */}
      <section className="py-24 px-6 bg-neutral-900 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-amber-500 tracking-[0.3em] text-xs font-semibold mb-4 uppercase">PADO Signature Designs</p>
          <h2 className="text-4xl md:text-5xl font-serif mb-6">One-of-a-Kind Designs</h2>
          <p className="text-white/60 max-w-xl mx-auto mb-10">Choose an exclusive PADO design, provide your measurements, and we'll craft it in 3 weeks.</p>
          <Link href="/custom" className="bg-amber-500 text-black px-10 py-4 font-semibold hover:bg-amber-400 transition-all duration-300 tracking-widest text-xs uppercase inline-block">
            Explore Signature Designs
          </Link>
        </div>
      </section>
    </main>
  );
}
