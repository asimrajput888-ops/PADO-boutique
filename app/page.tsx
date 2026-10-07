{/* ===== HERO SECTION ===== */}
<section
  ref={heroRef}
  className="relative h-screen w-full overflow-hidden"
>
  <motion.div style={{ y: heroY }} className="absolute inset-0">
    <Image
      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=2400&q=90&auto=format&fit=crop"
      alt="PADO Boutique Bespoke Tailoring"
      fill
      priority
      className="object-cover object-center"
      sizes="100vw"
      unoptimized
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
    <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
  </motion.div>
