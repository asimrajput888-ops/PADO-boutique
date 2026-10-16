// app/about/page.tsx

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/site/reveal";

export const metadata = {
  title: "Our Story | PADO Boutique",
  description:
    "Designed in Canada. Handcrafted in Karachi. Delivered worldwide. The PADO philosophy of bespoke tailoring since 2020.",
};

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Consultation",
    description:
      "We start with a conversation. Your style, your needs, your vision. Every detail matters.",
  },
  {
    number: "02",
    title: "Measurements",
    description:
      "Precise measurements taken to the quarter-inch, or matched from your best-fitting garment.",
  },
  {
    number: "03",
    title: "Handcrafted",
    description:
      "Our master tailors cut, stitch, and finish your piece over 14–18 days with meticulous care.",
  },
  {
    number: "04",
    title: "Delivered",
    description:
      "Carefully packaged and shipped worldwide with tracking. One complimentary alteration included.",
  },
];

const VALUES = [
  {
    title: "Slow Fashion",
    description:
      "We don't mass produce. Every garment is made to order, one at a time, by hand.",
  },
  {
    title: "Master Craftsmanship",
    description:
      "Our tailors have decades of experience, using techniques passed down through generations.",
  },
  {
    title: "Premium Fabrics",
    description:
      "Sourced from renowned Italian and English mills. Only the finest quality materials.",
  },
  {
    title: "Worldwide Delivery",
    description:
      "From our atelier in Karachi to your door — anywhere in the world.",
  },
];

const ATELIER_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=90&auto=format&fit=crop",
    alt: "Men's formal bespoke suit",
  },
  {
    src: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=90&auto=format&fit=crop",
    alt: "Women's wool 2-piece suit",
  },
  {
    src: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=90&auto=format&fit=crop",
    alt: "Party wear tuxedo",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-paper">

      {/* ===== HERO ===== */}
      <section className="relative pt-40 pb-24 md:pt-48 md:pb-32 px-6 md:px-16">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <p className="text-[10px] tracking-[0.5em] text-bronze uppercase mb-6">
              Our Story
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-ink leading-[1.05] mb-8 max-w-4xl">
              Designed in Canada.
              <br />
              <em className="italic text-bronze">Handcrafted in Karachi.</em>
            </h1>
            <p className="text-lg md:text-xl text-graphite leading-relaxed max-w-2xl">
              PADO BOUTIQUE is a Canada-based bespoke tailoring house with our primary
              atelier in Karachi, Pakistan, and select production partnerships in China.
              Every garment we create is a collaboration between you and our master tailors.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== BRAND STORY ===== */}
      <section className="pb-24 md:pb-32 px-6 md:px-16">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden bg-cream">
              <Image
                src="/images/atelier-fabric.png"
                alt="PADO Boutique atelier"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-[10px] tracking-[0.5em] text-bronze uppercase mb-6">
              The PADO Philosophy
            </p>
            <h2 className="text-3xl md:text-5xl font-serif text-ink leading-[1.15] mb-8">
              True luxury lies
              <br />
              in the <em className="italic text-bronze">details.</em>
            </h2>
            <div className="space-y-6 text-base md:text-lg text-graphite leading-[1.8]">
              <p>
                PADO BOUTIQUE was born from a simple idea — that true luxury lies in the
                details. Not in logos. Not in mass production. But in the quiet
                confidence of a garment that fits you perfectly.
              </p>
              <p>
                From fabric selection to silhouette design, every decision is made with
                intention. We don't follow fast fashion trends. We create timeless
                pieces that will still feel relevant in ten years.
              </p>
              <p>
                From the moment you place your order to the day your garment arrives at
                your door, every step is handled with care.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== DESIGNED IN CANADA ===== */}
      <section className="pb-24 md:pb-32 px-6 md:px-16">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <Reveal className="lg:col-span-4">
            <p className="text-[10px] tracking-[0.5em] text-bronze uppercase mb-4">
              Designed in Canada
            </p>
            <span className="block w-16 h-[1px] bg-ink mb-8" />
          </Reveal>
          <Reveal delay={100} className="lg:col-span-8">
            <h2 className="text-3xl md:text-5xl font-serif text-ink leading-[1.15] mb-8">
              Contemporary minimalism,
              <br />
              <em className="italic text-bronze">timeless design.</em>
            </h2>
            <p className="text-base md:text-lg text-graphite leading-[1.8] mb-8">
              Our design studio is based in Canada, where every PADO BOUTIQUE piece is
              conceptualised. We draw inspiration from contemporary minimalism, classic
              menswear traditions, and the art of understated elegance.
            </p>
            <ul className="space-y-4">
              {[
                "Contemporary, minimal design language",
                "Attention to detail at every touchpoint",
                "Modern sizing and fit philosophy",
                "Ethical, slow-fashion approach",
                "Quality control and customer care",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-4 text-sm md:text-base text-graphite"
                >
                  <span className="w-6 h-[1px] bg-ink flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ===== HANDCRAFTED IN KARACHI ===== */}
      <section className="pb-24 md:pb-32 px-6 md:px-16 bg-cream py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <Reveal className="lg:col-span-4">
            <p className="text-[10px] tracking-[0.5em] text-bronze uppercase mb-4">
              Handcrafted in Karachi
            </p>
            <span className="block w-16 h-[1px] bg-ink mb-8" />
          </Reveal>
          <Reveal delay={100} className="lg:col-span-8">
            <h2 className="text-3xl md:text-5xl font-serif text-ink leading-[1.15] mb-8">
              Where generations
              <br />
              of <em className="italic text-bronze">craftsmanship live.</em>
            </h2>
            <p className="text-base md:text-lg text-graphite leading-[1.8] mb-8">
              Karachi has a generations-old tradition of bespoke tailoring. Many of the
              world's finest luxury houses quietly source their craftsmanship from this
              region — because the skill is unmatched, and the dedication is real.
            </p>
            <p className="text-base md:text-lg text-graphite leading-[1.8] mb-8">
              Our master tailors learned their craft from their fathers, who learned from
              theirs. They work with hand-stitching techniques passed down through
              centuries.
            </p>
            <ul className="space-y-4">
              {[
                "Master tailors with 20+ years experience",
                "Traditional hand-stitching techniques",
                "14–18 days of dedicated craftsmanship per garment",
                "Multiple quality checks before dispatch",
                "Premium Italian & English fabrics",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-4 text-sm md:text-base text-graphite"
                >
                  <span className="w-6 h-[1px] bg-ink flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ===== CHINESE PARTNERSHIPS ===== */}
      <section className="pb-24 md:pb-32 px-6 md:px-16 pt-24 md:pt-32">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <Reveal className="lg:col-span-4">
            <p className="text-[10px] tracking-[0.5em] text-bronze uppercase mb-4">
              Chinese Partnerships
            </p>
            <span className="block w-16 h-[1px] bg-ink mb-8" />
          </Reveal>
          <Reveal delay={100} className="lg:col-span-8">
            <h2 className="text-3xl md:text-5xl font-serif text-ink leading-[1.15] mb-8">
              Select pieces,
              <br />
              same <em className="italic text-bronze">high standards.</em>
            </h2>
            <p className="text-base md:text-lg text-graphite leading-[1.8] mb-8">
              For select seasonal and novelty pieces, we work with trusted manufacturing
              partners in China. These factories are carefully vetted for quality, working
              conditions, and craftsmanship standards.
            </p>
            <ul className="space-y-4">
              {[
                "Seasonal & novelty suits (Halloween, party wear)",
                "Ready-to-wear accessories",
                "Fabric sourcing and logistics",
                "Same quality standards as our Karachi atelier",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-4 text-sm md:text-base text-graphite"
                >
                  <span className="w-6 h-[1px] bg-ink flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="px-6 md:px-16 bg-cream py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { number: "2020", label: "Founded" },
              { number: "1000+", label: "Garments Crafted" },
              { number: "25+", label: "Countries Served" },
              { number: "14–18", label: "Days to Deliver" },
            ].map((stat, i) => (
              <Reveal key={stat.label} delay={i * 100}>
                <div className="text-center md:text-left">
                  <p className="text-4xl md:text-5xl font-serif text-ink mb-3">
                    {stat.number}
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.4em] text-stone">
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section className="py-24 md:py-32 px-6 md:px-16">
        <div className="max-w-[1400px] mx-auto">
          <Reveal className="mb-20">
            <p className="text-[10px] tracking-[0.5em] text-bronze uppercase mb-4">
              How We Work
            </p>
            <h2 className="text-3xl md:text-5xl font-serif text-ink">
              From consultation
              <br />
              to delivery.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
            {PROCESS_STEPS.map((step, i) => (
              <Reveal key={step.number} delay={i * 120}>
                <div className="border-t border-ink pt-6">
                  <p className="text-[10px] tracking-[0.4em] text-stone uppercase mb-6">
                    {step.number}
                  </p>
                  <h3 className="text-xl md:text-2xl font-serif text-ink mb-4">
                    {step.title}
                  </h3>
                  <p className="text-sm text-graphite leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ATELIER SHOWCASE ===== */}
      <section className="pb-24 md:pb-32 px-6 md:px-16">
        <div className="max-w-[1400px] mx-auto">
          <Reveal className="mb-16">
            <p className="text-[10px] tracking-[0.5em] text-bronze uppercase mb-4">
              Our Craft
            </p>
            <h2 className="text-3xl md:text-5xl font-serif text-ink max-w-2xl">
              Where every garment
              <br />
              is <em className="italic text-bronze">handcrafted.</em>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {ATELIER_IMAGES.map((img, i) => (
              <Reveal key={i} delay={i * 150}>
                <div className="relative aspect-[3/4] overflow-hidden bg-cream img-zoom-container">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== VALUES ===== */}
      <section className="py-24 md:py-32 px-6 md:px-16 bg-ink">
        <div className="max-w-[1400px] mx-auto">
          <Reveal className="mb-20">
            <p className="text-[10px] tracking-[0.5em] text-bronze uppercase mb-4">
              Our Values
            </p>
            <h2 className="text-3xl md:text-5xl font-serif text-paper">
              What we stand for.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {VALUES.map((value, i) => (
              <Reveal key={value.title} delay={i * 100}>
                <div className="border-t border-paper/20 pt-6">
                  <h3 className="text-xl md:text-2xl font-serif text-paper mb-4">
                    {value.title}
                  </h3>
                  <p className="text-sm md:text-base text-paper/60 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SIGNATURE ===== */}
      <section className="py-24 md:py-32 px-6 md:px-16">
        <Reveal className="max-w-2xl mx-auto text-center">
          <p className="text-6xl md:text-7xl font-serif italic text-bronze mb-6">
            PADO
          </p>
          <p className="text-[10px] uppercase tracking-[0.5em] text-stone mb-12">
            Bespoke Tailoring · Est. 2020
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/custom/men"
              className="bg-ink text-paper px-10 py-4 text-[11px] uppercase tracking-[0.4em] font-medium hover:bg-bronze transition-colors duration-500"
            >
              Begin Your Order
            </Link>
            <Link
              href="/contact"
              className="border border-ink text-ink px-10 py-4 text-[11px] uppercase tracking-[0.4em] font-medium hover:bg-ink hover:text-paper transition-colors duration-500"
            >
              Get in Touch
            </Link>
          </div>
        </Reveal>
      </section>

    </div>
  );
}
