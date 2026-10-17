// app/page.tsx

"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "@/components/site/reveal";

const CATEGORIES = [
  {
    name: "Men's Bespoke",
    href: "/custom/men",
    image: "/images/categories/men.jpg",
    label: "Made to Measure",
  },
  {
    name: "Women's Bespoke",
    href: "/custom/women",
    image: "/images/categories/women.jpg",
    label: "Made to Measure",
  },
  {
    name: "Seasonal & Novelty",
    href: "/seasonal",
    image: "/images/categories/seasonal.webp",
    label: "Made to Measure",
  },
];

const PROCESS = [
  {
    number: "01",
    title: "Choose Your Design",
    description:
      "Browse our collection and select the piece you want — from bespoke suits and blazers to shirts, trousers, and seasonal pieces.",
  },
  {
    number: "02",
    title: "Provide Measurements",
    description:
      "Use our guided measurement form or send us a photo of your best-fitting garment. Our tailors are here to help.",
  },
  {
    number: "03",
    title: "Handcrafted in Atelier",
    description:
      "Our master tailors cut, stitch, and finish your piece with precision over 14–18 days.",
  },
  {
    number: "04",
    title: "Delivered Worldwide",
    description:
      "Your garment is carefully packaged and shipped to your door with tracking — worldwide.",
  },
];

export default function HomePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  return (
    <div className="bg-brand-ivory">
      {/* ===== HERO SECTION ===== */}
      <section
        ref={heroRef}
        className="relative min-h-svh w-full overflow-hidden bg-brand-charcoal"
      >
        {/* FULL SCREEN IMAGE */}
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image
            src="/images/hero-model.jpg"
            alt="PADO Boutique Bespoke Tailoring"
            fill
            priority
            className="object-cover object-[70%_25%] sm:object-[65%_center] lg:object-[58%_center]"
            sizes="100vw"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 md:bg-gradient-to-r md:from-black/70 md:via-black/25 md:to-transparent" />
        </motion.div>

        {/* TEXT — LEFT SIDE */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 min-h-svh flex items-center px-5 py-20 sm:px-8 md:px-12 lg:px-20"
        >
          <div className="w-full max-w-xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="eyebrow text-white mb-6 sm:mb-8"
            >
              Bespoke Tailoring · Est. 2020
            </motion.p>

            {/* TEXT MASK REVEAL H1 */}
            <h1
              className="h-display text-white mb-6 sm:mb-8"
              style={{ textShadow: "0 4px 40px rgba(0,0,0,0.5)" }}
            >
              <span className="text-mask">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 1.2,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.3,
                  }}
                  className="block pb-1"
                >
                  Cut to your
                </motion.span>
              </span>
              <span className="text-mask">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 1.2,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.45,
                  }}
                  className="block italic"
                >
                  exact measure.
                </motion.span>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-white text-[13px] sm:text-sm md:text-base leading-relaxed mb-8 sm:mb-10 max-w-md"
            >
              Handcrafted bespoke suits, made to your exact measurements.
              Designed in Canada, handcrafted in Karachi, delivered worldwide.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <Link
                href="/custom/men"
                className="inline-block text-center bg-white text-brand-charcoal px-8 md:px-10 py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-brand-gold hover:text-white active:scale-[0.98] transition-all duration-500"
              >
                Begin Your Order
              </Link>
              <Link
                href="/about"
                className="inline-block text-center border border-white/50 text-white px-8 md:px-10 py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-white/10 active:scale-[0.98] backdrop-blur-sm transition-all duration-500"
              >
                Our Story
              </Link>
            </motion.div>

            {/* Bottom hairline details */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="mt-10 sm:mt-12 pt-6 border-t border-white/20 flex flex-wrap gap-x-5 gap-y-2 sm:gap-x-8 text-[9px] sm:text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.3em] text-white"
            >
              <span>Handcrafted</span>
              <span>Made to Measure</span>
              <span>Worldwide</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-6 right-5 sm:bottom-8 sm:right-8 md:right-12 hidden sm:flex flex-col items-center gap-3 z-10"
        >
          <span className="text-[9px] tracking-[0.4em] text-white uppercase">
            Scroll
          </span>
          <div className="w-[1px] h-14 bg-white/30 relative overflow-hidden">
            <motion.div
              animate={{ y: [-56, 56] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-full h-7 bg-brand-gold"
            />
          </div>
        </motion.div>
      </section>

      {/* ===== MARQUEE STRIP ===== */}
      <section className="bg-brand-charcoal py-4 sm:py-5 overflow-hidden border-t border-white/10">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-10 sm:gap-16 px-5 sm:px-8">
              {[
                "Handcrafted",
                "Made to Measure",
                "Worldwide Shipping",
                "Master Tailors",
                "Premium Fabrics",
                "Bespoke Fit",
              ].map((text) => (
                <span
                  key={text}
                  className="text-[9px] sm:text-[10px] tracking-[0.35em] sm:tracking-[0.5em] text-brand-gold-light/70 uppercase flex items-center gap-10 sm:gap-16"
                >
                  {text}
                  <span className="text-brand-gold/30">◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ===== CATEGORIES SECTION ===== */}
      <section className="py-16 sm:py-20 md:py-28 lg:py-32 px-5 sm:px-8 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <Reveal className="mb-10 sm:mb-12 md:mb-16">
            <p className="eyebrow text-brand-gold mb-3 sm:mb-4">
              Collections
            </p>
            <h2 className="h-section text-brand-charcoal">
              Explore Our Craft
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
            {CATEGORIES.map((cat, i) => (
              <Reveal key={cat.name} delay={i * 150} direction="none">
                <Link
                  href={cat.href}
                  className="group block relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-brand-stone"
                >
                  {/* Clip Path Reveal for Image */}
                  <motion.div
                    initial={{ clipPath: "inset(100% 0 0 0)" }}
                    whileInView={{ clipPath: "inset(0% 0 0 0)" }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 1.4, ease: [0.77, 0, 0.175, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-cover object-top transition-transform duration-[1.2s] ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    />
                  </motion.div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 md:p-8">
                    <p className="eyebrow text-brand-gold-light mb-2 sm:mb-3">
                      {cat.label}
                    </p>
                    <h3 className="h-card text-white mb-3 sm:mb-4">
                      {cat.name}
                    </h3>
                    <span className="text-[10px] tracking-[0.3em] text-brand-gold-light uppercase border-b border-brand-gold-light/50 pb-1 group-hover:border-brand-gold-light transition-all duration-500">
                      Shop Now →
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROCESS SECTION ===== */}
      <section className="py-16 sm:py-20 md:py-28 lg:py-32 px-5 sm:px-8 md:px-12 bg-brand-cream">
        <div className="max-w-[1400px] mx-auto">
          <Reveal className="mb-10 sm:mb-12 md:mb-16">
            <p className="eyebrow text-brand-gold mb-3 sm:mb-4">
              The Process
            </p>
            <h2 className="h-section text-brand-charcoal">
              From Measurement to Masterpiece
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6 md:gap-x-8 lg:gap-x-12">
            {PROCESS.map((step, i) => (
              <Reveal key={step.number} delay={i * 100}>
                <div className="relative group cursor-default">
                  <span className="text-[64px] sm:text-[80px] md:text-[100px] font-serif text-brand-gold/15 leading-none absolute -top-4 sm:-top-6 -left-2 select-none transition-colors duration-500 group-hover:text-brand-gold/25">
                    {step.number}
                  </span>
                  <div className="relative pt-7 sm:pt-8">
                    <div className="gold-line mb-5 sm:mb-6 transition-all duration-500 group-hover:w-16" />
                    <h3 className="text-lg sm:text-xl font-serif text-brand-charcoal mb-2 sm:mb-3">
                      {step.title}
                    </h3>
                    <p className="text-[13px] sm:text-sm text-brand-slate leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== EDITORIAL / ATELIER SECTION ===== */}
      <section className="py-16 sm:py-20 md:py-28 lg:py-32 px-5 sm:px-8 md:px-12">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-20 items-center">
          <Reveal>
            {/* Clip Path Reveal for Image */}
            <motion.div
              initial={{ clipPath: "inset(100% 0 0 0)" }}
              whileInView={{ clipPath: "inset(0% 0 0 0)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1.4, ease: [0.77, 0, 0.175, 1] }}
              className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-brand-stone img-zoom-container"
            >
              <Image
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200&q=90&auto=format&fit=crop"
                alt="PADO Boutique Atelier"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                unoptimized
              />
            </motion.div>
          </Reveal>

          <Reveal delay={200}>
            <p className="eyebrow text-brand-gold mb-4 sm:mb-6">
              Our Atelier
            </p>
            <h2 className="h-section text-brand-charcoal mb-6 sm:mb-8">
              Where every stitch
              <br />
              tells a story.
            </h2>
            <p className="text-[13px] sm:text-sm md:text-base text-brand-slate leading-relaxed mb-6 sm:mb-8 max-w-lg">
              Each PADO BOUTIQUE garment is handcrafted by master tailors using
              premium fabrics sourced from renowned mills. We believe in the
              art of slow fashion — no shortcuts, no compromises.
            </p>
            <ul className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
              {[
                "Hand-finished by master tailors",
                "Premium Italian & English fabrics",
                "14–18 day bespoke delivery",
                "Complimentary worldwide shipping over $250",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 sm:gap-4 text-[13px] sm:text-sm text-brand-slate"
                >
                  <span className="w-6 sm:w-8 h-[1px] bg-brand-gold mt-2.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/about"
              className="inline-block border border-brand-charcoal text-brand-charcoal px-8 sm:px-10 py-3.5 sm:py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-brand-charcoal hover:text-white active:scale-[0.98] transition-all duration-500"
            >
              Discover Our Story
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="relative py-20 sm:py-28 md:py-32 lg:py-40 px-5 sm:px-8 md:px-12 bg-brand-charcoal overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=2000&q=90&auto=format&fit=crop"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            unoptimized
          />
        </div>
        <Reveal className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="eyebrow text-brand-gold mb-4 sm:mb-6">
            Begin Your Journey
          </p>
          <h2 className="h-section text-white mb-6 sm:mb-8">
            Your perfect fit is
            <br />
            <em className="text-brand-gold-light">one order away.</em>
          </h2>
          <p className="text-[13px] sm:text-sm md:text-base text-white/60 mb-8 sm:mb-10 max-w-xl mx-auto leading-relaxed">
            Choose your garment, provide your measurements, and let our master
            tailors craft a piece that&apos;s uniquely yours.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Link
              href="/custom/men"
              className="inline-block text-center bg-brand-gold text-white px-8 sm:px-10 py-3.5 sm:py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-brand-gold-light active:scale-[0.98] transition-all duration-500"
            >
              Men&apos;s Bespoke
            </Link>
            <Link
              href="/custom/women"
              className="inline-block text-center border border-white/30 text-white px-8 sm:px-10 py-3.5 sm:py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-white/10 active:scale-[0.98] transition-all duration-500"
            >
              Women&apos;s Bespoke
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
