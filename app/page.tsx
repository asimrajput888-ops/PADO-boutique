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
        Architectural Tailoring & Pure Silk Loungewear
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
