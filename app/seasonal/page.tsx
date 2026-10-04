// app/seasonal/page.tsx

"use client";

import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { motion } from "framer-motion";

const COLLECTIONS = [
  {
    id: "halloween",
    name: "Halloween",
    tagline: "Day of the Dead, Sugar Skull, Gothic",
    image: "/images/editorial-fabrics.png",
  },
  {
    id: "superhero",
    name: "Superhero",
    tagline: "Spiderman, Batman, Movie-inspired",
    image: "/images/editorial-custom.png",
  },
  {
    id: "gothic",
    name: "Gothic & Dark",
    tagline: "Gothic rose, dark romantic, vampire",
    image: "/images/editorial-men.png",
  },
  {
    id: "party",
    name: "Party & Events",
    tagline: "Bold colors, glitter, statement pieces",
    image: "/images/editorial-women.png",
  },
];

function SeasonalContent() {
  return (
    <div className="min-h-screen bg-white pt-32 pb-24 px-5 md:px-10">
      <div className="max-w-[1400px] mx-auto">

        {/* Header */}
        <div className="text-center mb-14 md:mb-20">
          <p className="text-[10px] tracking-[0.4em] text-neutral-500 uppercase mb-4">
            Special Orders
          </p>
          <h1 className="text-3xl md:text-5xl font-serif mb-4 text-neutral-900">
            Seasonal &amp; Novelty
          </h1>
          <p className="text-neutral-500 max-w-xl mx-auto text-sm">
            Custom-made suits for Halloween, cosplay, themed events, and one-of-a-kind occasions.
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-24">
          {COLLECTIONS.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link
                href={`/seasonal/${c.id}`}
                className="group relative block aspect-[4/3] overflow-hidden bg-neutral-100"
              >
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
                  <p className="text-[10px] tracking-[0.4em] uppercase opacity-80 mb-3">
                    Collection
                  </p>
                  <h3 className="text-3xl md:text-4xl font-serif mb-3">
                    {c.name}
                  </h3>
                  <p className="text-xs md:text-sm opacity-90 mb-5 max-w-md">
                    {c.tagline}
                  </p>
                  <span className="text-[10px] tracking-[0.3em] uppercase border-b border-white pb-1">
                    Explore →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center border-t border-neutral-200 pt-16">
          <p className="text-[10px] tracking-[0.4em] text-neutral-500 uppercase mb-4">
            Can&apos;t find what you&apos;re looking for?
          </p>
          <h2 className="text-2xl md:text-3xl font-serif mb-6 text-neutral-900">
            We make fully custom designs
          </h2>
          <p className="text-neutral-500 max-w-md mx-auto text-sm mb-8">
            Send us your reference images — superhero suits, movie-inspired tuxedos, gothic styles, or anything you can imagine.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-neutral-900 text-white px-10 py-4 text-[11px] tracking-[0.3em] uppercase font-medium hover:bg-neutral-700 transition"
          >
            Start Custom Order
          </Link>
        </div>

      </div>
    </div>
  );
}

export default function SeasonalPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white pt-40 text-center text-neutral-400">Loading...</div>}>
      <SeasonalContent />
    </Suspense>
  );
}
