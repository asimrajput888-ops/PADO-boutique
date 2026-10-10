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
  { number: "01", title: "Choose Your Design", description: "Browse our collection and select the piece you want." },
  { number: "02", title: "Provide Measurements", description: "Use our guided form or send us your best-fitting garment." },
  { number: "03", title: "Handcrafted in Atelier", description: "Our master tailors cut, stitch, and finish with precision." },
  { number: "04", title: "Delivered Worldwide", description: "Carefully packaged and shipped with tracking." },
];

export default function HomePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  return (
    <div className="bg-paper">

      {/* ===== HERO ===== */}
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image
            src="/images/hero.png"
            alt="PADO Boutique"
            fill
            priority
            className="object-cover object-[70%_30%] md:object-[75%_35%]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent" />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 h-full flex items-end pb-24 md:pb-32 px-6 md:px-16"
        >
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-[10px] tracking-label text-mist uppercase mb-6"
            >
              Bespoke Tailoring · Est. 2020
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-5xl md:text-7xl lg:text-8xl font-serif text-paper leading-[1.05] mb-10"
            >
              Cut to your
              <br />
              <em className="italic">exact measure.</em>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/custom/men" className="btn-primary">
                Begin Your Order
              </Link>
              <Link
                href="/about"
                className="inline-block border border-paper/40 text-paper px-10 py-5 text-[11px] uppercase tracking-label font-medium hover:bg-paper hover:text-ink transition-all duration-500"
              >
                Our Story
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 right-10 md:right-16 hidden md:flex flex-col items-center gap-3"
        >
          <span className="text-[9px] tracking-label text-paper/50 uppercase">Scroll</span>
          <div className="w-[1px] h-16 bg-paper/30 relative overflow-hidden">
            <motion.div
              animate={{ y: [-64, 64] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-full h-8 bg-paper"
            />
          </div>
        </motion.div>
      </section>

      {/* ===== MARQUEE ===== */}
      <section className="bg-ink py-6 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-20 px-10">
              {["Handcrafted", "Made to Measure", "Worldwide Shipping", "Master Tailors", "Premium Fabrics", "Bespoke Fit"].map((text) => (
                <span key={text} className="text-[10px] tracking-label text-paper/60 uppercase flex items-center gap-20">
                  {text}
                  <span className="text-paper/20">◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ===== INTRO ===== */}
      <section className="py-32 md:py-48 px-6 md:px-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <Reveal>
                <p className="text-[10px] tracking-label text-stone uppercase mb-4">Introduction</p>
                <span className="block w-16 h-[1px] bg-ink" />
              </Reveal>
            </div>
            <div className="lg:col-span-8">
              <Reveal delay={100}>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-ink leading-[1.15] mb-8">
                  Bespoke tailoring,<br />
                  <em className="italic text-bronze">crafted for you.</em>
                </h2>
                <p className="text-base md:text-lg text-graphite leading-[1.8] max-w-2xl">
                  Every PADO BOUTIQUE garment is handcrafted to your exact measurements by master tailors in our Karachi atelier. No mass production. No shortcuts. Just premium fabrics, timeless design, and the art of slow fashion.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="pb-32 md:pb-48 px-6 md:px-16">
        <div className="max-w-[1400px] mx-auto">
          <Reveal className="mb-20 flex items-end justify-between">
            <div>
              <p className="text-[10px] tracking-label text-stone uppercase mb-4">Collections</p>
              <h2 className="text-4xl md:text-6xl font-serif text-ink">Explore Our Craft</h2>
            </div>
            <Link href="/custom/men" className="hidden md:block text-[10px] tracking-label text-stone uppercase link-underline hover:text-ink transition-colors">
              View All →
            </Link>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {CATEGORIES.map((cat, i) => (
              <Reveal key={cat.name} delay={i * 150}>
                <Link href={cat.href} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden bg-cream mb-6">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-cover object-top transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.06]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-label text-stone uppercase mb-2">{cat.label}</p>
                    <h3 className="text-2xl md:text-3xl font-serif text-ink mb-3 group-hover:text-bronze transition-colors">
                      {cat.name}
                    </h3>
                    <span className="text-[10px] tracking-label text-ink uppercase link-underline">
                      Shop Now
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section className="py-32 md:py-48 px-6 md:px-16 bg-cream">
        <div className="max-w-[1400px] mx-auto">
          <Reveal className="mb-20">
            <p className="text-[10px] tracking-label text-stone uppercase mb-4">The Process</p>
            <h2 className="text-4xl md:text-6xl font-serif text-ink">From Measurement<br />to Masterpiece</h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
            {PROCESS.map((step, i) => (
              <Reveal key={step.number} delay={i * 120}>
                <div className="border-t border-ink pt-6">
                  <p className="text-[10px] tracking-label text-stone uppercase mb-6">{step.number}</p>
                  <h3 className="text-xl md:text-2xl font-serif text-ink mb-4">{step.title}</h3>
                  <p className="text-sm text-graphite leading-relaxed">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ATELIER ===== */}
      <section className="py-32 md:py-48 px-6 md:px-16">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden bg-cream img-zoom-container">
              <Image
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200&q=90&auto=format&fit=crop"
                alt="PADO Atelier"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                unoptimized
              />
            </div>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-[10px] tracking-label text-stone uppercase mb-6">Our Atelier</p>
            <h2 className="text-4xl md:text-6xl font-serif text-ink leading-[1.15] mb-8">
              Where every<br />
              stitch tells<br />
              <em className="italic">a story.</em>
            </h2>
            <p className="text-base text-graphite leading-[1.8] mb-10 max-w-lg">
              Each PADO BOUTIQUE garment is handcrafted by master tailors using premium fabrics sourced from renowned mills.
            </p>
            <ul className="space-y-4 mb-12">
              {["Hand-finished by master tailors", "Premium Italian & English fabrics", "14–18 day bespoke delivery", "Complimentary worldwide shipping over $250"].map((item) => (
                <li key={item} className="flex items-center gap-4 text-sm text-graphite">
                  <span className="w-6 h-[1px] bg-ink" />
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/about" className="btn-outline">
              Discover Our Story
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative py-40 md:py-56 px-6 md:px-16 bg-ink overflow-hidden">
        <Reveal className="relative z-10 max-w-4xl mx-auto text-center">
          <p className="text-[10px] tracking-label text-mist uppercase mb-8">Begin Your Journey</p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-paper leading-[1.1] mb-10">
            Your perfect fit is<br />
            <em className="italic text-mist">one order away.</em>
          </h2>
          <p className="text-paper/60 mb-12 max-w-xl mx-auto leading-relaxed text-base">
            Choose your garment, provide your measurements, and let our master tailors craft a piece that&apos;s uniquely yours.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/custom/men" className="inline-block bg-paper text-ink px-12 py-5 text-[11px] uppercase tracking-label font-medium hover:bg-bronze hover:text-paper transition-all duration-500">
              Men&apos;s Bespoke
            </Link>
            <Link href="/custom/women" className="inline-block border border-paper/30 text-paper px-12 py-5 text-[11px] uppercase tracking-label font-medium hover:bg-paper hover:text-ink transition-all duration-500">
              Women&apos;s Bespoke
            </Link>
          </div>
        </Reveal>
      </section>

    </div>
  );
}
