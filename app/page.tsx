// app/page.tsx (Hero Section only)

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const HERO_IMAGES = [
  "/images/editorial-men.png",
  "/images/hero.png",
  "/images/editorial-women.png",
  "/images/editorial-custom.png",
];

export default function HomePage() {
  return (
    <main className="bg-[#FDFBF7]">
      {/* ============ HERO SECTION (Hockerty Style) ============ */}
      <section className="relative min-h-screen bg-[#FDFBF7] overflow-hidden">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-32 pb-16 min-h-screen">
          
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="z-10"
          >
            <p className="text-amber-600 tracking-[0.3em] text-xs font-semibold mb-6 uppercase">
              100% Made to Measure
            </p>
            <h1 className="text-6xl md:text-8xl font-serif text-neutral-900 mb-6 leading-[0.95] tracking-tight">
              Bespoke <br /> Suits
            </h1>
            <p className="text-2xl text-neutral-500 mb-8 font-light">
              from Rs. 45,000
            </p>
            <div className="flex items-center gap-2 mb-8">
              <span className="text-amber-500 text-lg">★★★★★</span>
              <span className="text-neutral-500 text-sm">19,063 Reviews</span>
            </div>
            <p className="text-neutral-600 max-w-md text-base mb-10 leading-relaxed">
              Create your own Bespoke Suit by choosing from our wide range of fabrics and options. A real craftsman tailor-made to your measurements.
            </p>
            <Link
              href="/men"
              className="bg-neutral-900 text-white px-10 py-4 font-semibold hover:bg-amber-600 transition-all duration-300 tracking-widest text-xs uppercase inline-block"
            >
              Design Your Suit
            </Link>
          </motion.div>

          {/* Right: Rotating Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative aspect-[3/4] lg:aspect-[4/5] overflow-hidden"
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              className="w-full h-full"
            >
              <Image
                src="/images/hero.png"
                alt="Bespoke Tailoring"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
