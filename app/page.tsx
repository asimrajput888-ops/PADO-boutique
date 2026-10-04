// app/page.tsx

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useCurrency } from "@/context/currency-context";

export default function HomePage() {
  const [featured, setFeatured] = useState<any[]>([]);
  const { formatPrice } = useCurrency();

  useEffect(() => {
    const fetchFeatured = async () => {
      const { data } = await supabase
        .from("models")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(4);
      setFeatured(data || []);
    };
    fetchFeatured();
  }, []);

  return (
    <main className="bg-white">

      {/* ============ 1. HERO ============ */}
      <section className="relative min-h-screen w-full flex items-center justify-start overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero.png"
            alt="PADO BOUTIQUE Bespoke Tailoring"
            fill
            priority
            className="object-cover object-top"
            style={{ filter: "brightness(1.18) contrast(1.05)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/25 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-6 md:px-16 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-xl text-white"
          >
            <p className="text-amber-500 tracking-[0.4em] text-[11px] md:text-xs font-semibold mb-4 uppercase">
              PADO BOUTIQUE
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-5 leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
              The Art of <br />
              <span className="italic text-amber-500">Bespoke</span> Precision
            </h1>
            <p className="text-sm md:text-base text-white/85 mb-8 max-w-md font-light leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.4)]">
              Crafting custom-tailored silhouettes, artisanal wool-cashmere blazers,
              and luxury garments designed to your exact body specifications.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/custom"
                className="bg-amber-500 text-black px-6 py-3 font-semibold hover:bg-amber-400 transition-all duration-300 tracking-widest text-[11px] uppercase"
              >
                Design Your Suit
              </Link>
              <Link
                href="/custom/men"
                className="border border-white/60 text-white px-6 py-3 font-semibold hover:border-amber-500 hover:text-amber-500 transition-all duration-300 tracking-widest text-[11px] uppercase"
              >
                Explore Collection
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ 2. CATEGORY TILES ============ */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-[10px] tracking-[0.4em] text-neutral-500 uppercase mb-3">
              Explore
            </p>
            <h2 className="text-3xl md:text-4xl font-serif text-neutral-900">
              Three Ways to Dress
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {/* For Him */}
            <Link href="/custom/men" className="group relative aspect-[4/5] overflow-hidden bg-neutral-100">
              <Image
                src="/images/editorial-custom.png"
                alt="Custom Made for Him"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                <p className="text-[10px] tracking-[0.4em] uppercase opacity-80 mb-2">
                  Bespoke
                </p>
                <h3 className="text-2xl md:text-3xl font-serif mb-3">
                  For Him
                </h3>
                <p className="text-xs md:text-sm opacity-90 mb-4 max-w-xs">
                  Custom suits, jackets, coats. Made to your exact measurements.
                </p>
                <span className="text-[10px] tracking-[0.3em] uppercase border-b border-white pb-1">
                  Start Now →
                </span>
              </div>
            </Link>

            {/* For Her */}
            <Link href="/custom/women" className="group relative aspect-[4/5] overflow-hidden bg-neutral-100">
              <Image
                src="/images/editorial-women.png"
                alt="Custom Made for Her"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                <p className="text-[10px] tracking-[0.4em] uppercase opacity-80 mb-2">
                  Bespoke
                </p>
                <h3 className="text-2xl md:text-3xl font-serif mb-3">
                  For Her
                </h3>
                <p className="text-xs md:text-sm opacity-90 mb-4 max-w-xs">
                  Tailored suits, blazers, and coats designed to your silhouette.
                </p>
                <span className="text-[10px] tracking-[0.3em] uppercase border-b border-white pb-1">
                  Discover →
                </span>
              </div>
            </Link>

            {/* Seasonal */}
            <Link href="/seasonal" className="group relative aspect-[4/5] overflow-hidden bg-neutral-100">
              <Image
                src="/images/editorial-fabrics.png"
                alt="Seasonal & Novelty"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                <p className="text-[10px] tracking-[0.4em] uppercase opacity-80 mb-2">
                  Limited Edition
                </p>
                <h3 className="text-2xl md:text-3xl font-serif mb-3">
                  Seasonal &amp; Novelty
                </h3>
                <p className="text-xs md:text-sm opacity-90 mb-4 max-w-xs">
                  Halloween, cosplay, gothic, movie-inspired. Custom made to order.
                </p>
                <span className="text-[10px] tracking-[0.3em] uppercase border-b border-white pb-1">
                  Explore →
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ 3. FEATURED MODELS ============ */}
      {featured.length > 0 && (
        <section className="py-20 md:py-28 px-5 md:px-10 bg-neutral-50">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-[10px] tracking-[0.4em] text-neutral-500 uppercase mb-3">
                  New Arrivals
                </p>
                <h2 className="text-3xl md:text-4xl font-serif text-neutral-900">
                  Signature Models
                </h2>
              </div>
              <Link
                href="/custom"
                className="hidden md:block text-[10px] tracking-[0.3em] uppercase border-b border-neutral-900 pb-1 hover:opacity-60 transition"
              >
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-10 md:gap-x-4">
              {featured.map((model: any) => (
                <Link
                  key={model.id}
                  href={`/custom/${model.category === "women" ? "women" : "men"}/${model.id}`}
                  className="group block"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 mb-3">
                    {model.image_url && (
                      <img
                        src={model.image_url}
                        alt={model.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                    )}
                  </div>
                  <h3 className="text-[13px] md:text-sm text-neutral-900 leading-snug mb-1 group-hover:text-neutral-500 transition-colors">
                    {model.name}
                  </h3>
                  <p className="text-[13px] md:text-sm text-neutral-500">
                    {formatPrice(model.price)}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============ 4. OCCASION BANNER ============ */}
      <section className="relative py-24 md:py-32 px-5 md:px-10 overflow-hidden bg-neutral-900">
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="max-w-2xl text-white">
            <p className="text-[10px] tracking-[0.4em] text-amber-500 uppercase mb-4">
              Seasonal Collection
            </p>
            <h2 className="text-3xl md:text-5xl font-serif mb-6 leading-tight">
              One-of-a-kind suits for one-of-a-kind occasions.
            </h2>
            <p className="text-sm md:text-base text-white/70 mb-8 max-w-lg leading-relaxed">
              Halloween, cosplay, gothic, movie-inspired, or themed events —
              send us your reference and we&apos;ll tailor it to life.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/seasonal"
                className="bg-white text-black px-8 py-4 text-[11px] tracking-[0.3em] uppercase font-medium hover:bg-neutral-200 transition"
              >
                Explore Seasonal
              </Link>
              <Link
                href="/contact"
                className="border border-white/40 text-white px-8 py-4 text-[11px] tracking-[0.3em] uppercase font-medium hover:bg-white hover:text-black transition"
              >
                Custom Order
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 5. ATELIER STORY ============ */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
            <Image
              src="/images/atelier-fabric.png"
              alt="PADO Atelier"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-[10px] tracking-[0.4em] text-neutral-500 uppercase mb-4">
              Our Atelier
            </p>
            <h2 className="text-3xl md:text-4xl font-serif mb-6 text-neutral-900 leading-tight">
              Crafted by hand, made for you.
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-6 text-sm">
              Every PADO BOUTIQUE piece is handcrafted in our atelier using traditional techniques
              and the finest fabrics. From measurement to final stitch, every detail is tailored
              to you.
            </p>
            <p className="text-neutral-600 leading-relaxed mb-8 text-sm">
              Founded in 2020, we blend old-world craftsmanship with a modern eye for silhouette
              and proportion.
            </p>
            <Link
              href="/about"
              className="inline-block text-[10px] tracking-[0.3em] uppercase border-b border-neutral-900 pb-1 hover:opacity-60 transition"
            >
              Read Our Story →
            </Link>
          </div>
        </div>
      </section>

      {/* ============ 6. JOURNAL PREVIEW ============ */}
      <section className="py-20 md:py-28 px-5 md:px-10 bg-neutral-50">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-[10px] tracking-[0.4em] text-neutral-500 uppercase mb-3">
              Journal
            </p>
            <h2 className="text-3xl md:text-4xl font-serif text-neutral-900">
              Stories &amp; Style
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                img: "/images/journal-1.png",
                title: "The Art of Bespoke Tailoring",
                excerpt: "Why a made-to-measure suit changes how you carry yourself.",
              },
              {
                img: "/images/journal-2.png",
                title: "A Gentleman's Guide to Fabric",
                excerpt: "Wool, cashmere, linen — what to pick and when.",
              },
              {
                img: "/images/journal-3.png",
                title: "The Perfect Fit",
                excerpt: "How to measure yourself for a bespoke suit.",
              },
            ].map((article, i) => (
              <Link key={i} href="/journal" className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100 mb-4">
                  <Image
                    src={article.img}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <p className="text-[10px] tracking-[0.3em] text-neutral-500 uppercase mb-2">
                  Coming Soon
                </p>
                <h3 className="font-serif text-xl text-neutral-900 mb-2 group-hover:text-neutral-500 transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  {article.excerpt}
                </p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-14">
            <Link
              href="/journal"
              className="inline-block text-[10px] tracking-[0.3em] uppercase border-b border-neutral-900 pb-1 hover:opacity-60 transition"
            >
              Read All Articles →
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
