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
    image:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1200&q=90&auto=format&fit=crop",
    label: "Made to Measure",
  },
  {
    name: "Women's Bespoke",
    href: "/custom/women",
    image: "/images/categories/women.png",
    label: "Made to Measure",
  },
  {
    name: "Seasonal & Novelty",
    href: "/seasonal",
    image:
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=1200&q=90&auto=format&fit=crop",
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
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="bg-brand-ivory">
      {/* ===== HERO SECTION ===== */}
      <section
        ref={heroRef}
        className="relative h-screen w-full overflow-hidden"
      >
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image
            src="/images/hero.png"
            alt="PADO Boutique Bespoke Tailoring"
            fill
            priority
            className="object-cover object-[70%_30%] md:object-[75%_35%]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 h-full flex items-end pb-20 md:pb-28 px-6 md:px-12"
        >
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-[10px] tracking-[0.5em] text-brand-gold-light uppercase mb-6"
            >
              Bespoke Tailoring · Est. 2020
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-[1.05] mb-8"
              style={{ textShadow: "0 2px 30px rgba(0,0,0,0.5)" }}
            >
              Cut to your
              <br />
              <em className="text-brand-gold-light">exact measure.</em>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/custom/men"
                className="inline-block bg-white text-brand-charcoal px-10 py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-brand-gold hover:text-white transition-all duration-500"
              >
                Begin Your Order
              </Link>
              <Link
                href="/about"
                className="inline-block border border-white/40 text-white px-10 py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-white/10 transition-all duration-500"
              >
                Our Story
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 right-8 md:right-12 hidden md:flex flex-col items-center gap-2"
        >
          <span className="text-[9px] tracking-[0.4em] text-white/50 uppercase">
            Scroll
          </span>
          <div className="w-[1px] h-12 bg-white/30 relative overflow-hidden">
            <motion.div
              animate={{ y: [-48, 48] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-full h-6 bg-brand-gold"
            />
          </div>
        </motion.div>
      </section>

      {/* ===== MARQUEE STRIP ===== */}
      <section className="bg-brand-charcoal py-5 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-16 px-8">
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
                  className="text-[10px] tracking-[0.5em] text-brand-gold-light/70 uppercase flex items-center gap-16"
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
      <section className="py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <Reveal className="mb-16">
            <p className="text-[10px] tracking-[0.5em] text-brand-gold uppercase mb-4">
              Collections
            </p>
            <h2 className="text-3xl md:text-5xl font-serif text-brand-charcoal">
              Explore Our Craft
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {CATEGORIES.map((cat, i) => (
              <Reveal key={cat.name} delay={i * 100}>
                <Link
                  href={cat.href}
                  className="group block relative aspect-[3/4] overflow-hidden bg-brand-stone"
                >
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <p className="text-[10px] tracking-[0.4em] text-brand-gold-light uppercase mb-3">
                      {cat.label}
                    </p>
                    <h3 className="text-2xl md:text-3xl font-serif text-white mb-4">
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
      <section className="py-24 md:py-32 px-6 md:px-12 bg-brand-cream">
        <div className="max-w-[1400px] mx-auto">
          <Reveal className="mb-16">
            <p className="text-[10px] tracking-[0.5em] text-brand-gold uppercase mb-4">
              The Process
            </p>
            <h2 className="text-3xl md:text-5xl font-serif text-brand-charcoal">
              From Measurement to Masterpiece
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {PROCESS.map((step, i) => (
              <Reveal key={step.number} delay={i * 100}>
                <div className="relative">
                  <span className="text-[80px] md:text-[100px] font-serif text-brand-gold/15 leading-none absolute -top-6 -left-2 select-none">
                    {step.number}
                  </span>
                  <div className="relative pt-8">
                    <div className="gold-line mb-6" />
                    <h3 className="text-xl font-serif text-brand-charcoal mb-3">
                      {step.title}
                    </h3>
                    <p className="text-sm text-brand-slate leading-relaxed">
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
      <section className="py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <Reveal>
            <div className="relative aspect-[3/4] overflow-hidden bg-brand-stone img-zoom-container">
              <Image
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200&q=90&auto=format&fit=crop"
                alt="PADO Boutique Atelier"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                unoptimized
              />
            </div>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-[10px] tracking-[0.5em] text-brand-gold uppercase mb-6">
              Our Atelier
            </p>
            <h2 className="text-3xl md:text-5xl font-serif text-brand-charcoal leading-[1.15] mb-8">
              Where every stitch
              <br />
              tells a story.
            </h2>
            <p className="text-brand-slate leading-relaxed mb-8 max-w-lg">
              Each PADO BOUTIQUE garment is handcrafted by master tailors using
              premium fabrics sourced from renowned mills. We believe in the
              art of slow fashion — no shortcuts, no compromises.
            </p>
            <ul className="space-y-4 mb-10">
              {[
                "Hand-finished by master tailors",
                "Premium Italian & English fabrics",
                "14–18 day bespoke delivery",
                "Complimentary worldwide shipping over $250",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-4 text-sm text-brand-slate"
                >
                  <span className="w-8 h-[1px] bg-brand-gold" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/about"
              className="inline-block border border-brand-charcoal text-brand-charcoal px-10 py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-brand-charcoal hover:text-white transition-all duration-500"
            >
              Discover Our Story
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="relative py-32 md:py-40 px-6 md:px-12 bg-brand-charcoal overflow-hidden">
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
          <p className="text-[10px] tracking-[0.5em] text-brand-gold uppercase mb-6">
            Begin Your Journey
          </p>
          <h2 className="text-3xl md:text-5xl font-serif text-white leading-[1.15] mb-8">
            Your perfect fit is
            <br />
            <em className="text-brand-gold-light">one order away.</em>
          </h2>
          <p className="text-white/60 mb-10 max-w-xl mx-auto leading-relaxed">
            Choose your garment, provide your measurements, and let our master
            tailors craft a piece that&apos;s uniquely yours.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/custom/men"
              className="inline-block bg-brand-gold text-white px-10 py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-brand-gold-light transition-all duration-500"
            >
              Men&apos;s Bespoke
            </Link>
            <Link
              href="/custom/women"
              className="inline-block border border-white/30 text-white px-10 py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-white/10 transition-all duration-500"
            >
              Women&apos;s Bespoke
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
