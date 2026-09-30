{/* Background Image — bright */}
<Image
  src="/images/hero.png"
  alt="PADO BOUTIQUE Bespoke Tailoring"
  fill
  priority
  className="object-cover object-top"
  style={{ filter: "brightness(1.15) contrast(1.05)" }}
/>

{/* Halka dark overlay — text readable rahe */}
<div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent" />

{/* Text content — side pe */}
<div className="relative z-10 container mx-auto px-6 md:px-16 pt-20">
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="max-w-xl text-white"
  >
    <p className="text-amber-500 tracking-[0.4em] text-xs md:text-sm font-semibold mb-4 uppercase">
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
        href="/shop"
        className="border border-white/60 text-white px-6 py-3 font-semibold hover:border-amber-500 hover:text-amber-500 transition-all duration-300 tracking-widest text-[11px] uppercase"
      >
        Explore Catalogue
      </Link>
    </div>
  </motion.div>
</div>
