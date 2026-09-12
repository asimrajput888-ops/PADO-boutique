import Link from "next/link"

export default function Home() {
  return (
    <div className="bg-[#0A0A0A] text-[#F5F5F5] min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center px-6 text-center border-b border-neutral-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#0A0A0A] z-10" />
        
        {/* Editorial Background Accent */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:32px_32px]" />

        <div className="relative z-20 max-w-4xl space-y-6">
          <p className="text-amber-400 text-xs uppercase tracking-[0.4em] font-mono">
            Architectural Tailoring & Pure Silk Loungewear
          </p>
          <h1 className="text-4xl md:text-7xl font-serif font-light tracking-wide text-white leading-tight">
            The Art of Bespoke Precision
          </h1>
          <p className="text-neutral-400 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
            Crafting custom-tailored silhouettes, artisanal wool-cashmere blazers, and luxury garments designed to your exact body specifications.
          </p>
          
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/custom"
              className="w-full sm:w-auto bg-amber-400 text-black text-xs uppercase tracking-[0.25em] px-8 py-4 font-semibold hover:bg-amber-300 transition-all shadow-lg"
            >
              Enter Bespoke Studio
            </Link>
            <Link
              href="/shop"
              className="w-full sm:w-auto border border-neutral-700 text-white text-xs uppercase tracking-[0.25em] px-8 py-4 font-medium hover:border-amber-400 hover:text-amber-400 transition-all"
            >
              Explore Catalogue
            </Link>
          </div>
        </div>
      </section>

      {/* Editorial Collection Highlights */}
      <section className="max-w-7xl mx-auto py-24 px-6">
        <div className="text-center mb-16 space-y-2">
          <h2 className="text-xs uppercase tracking-[0.3em] text-amber-400 font-mono">Curated Divisions</h2>
          <p className="text-3xl font-serif text-white font-light">Explore Our Collections</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Men's Sartorial Card */}
          <div className="group relative h-[450px] border border-neutral-800 bg-[#0D0D0D] p-8 flex flex-col justify-end hover:border-amber-400/50 transition-all">
            <div className="absolute top-6 right-6 text-xs text-neutral-600 font-mono">01 / MEN</div>
            <h3 className="text-2xl font-serif text-white mb-2">Men’s Sartorial</h3>
            <p className="text-xs text-neutral-400 mb-6 font-light">Structured double-breasted blazers, tuxedos, and handmade trousers.</p>
            <Link href="/men" className="text-xs uppercase tracking-widest text-amber-400 font-medium group-hover:translate-x-2 transition-transform inline-flex items-center gap-2">
              View Collection &rarr;
            </Link>
          </div>

          {/* Women's Couture Card */}
          <div className="group relative h-[450px] border border-neutral-800 bg-[#0D0D0D] p-8 flex flex-col justify-end hover:border-amber-400/50 transition-all">
            <div className="absolute top-6 right-6 text-xs text-neutral-600 font-mono">02 / WOMEN</div>
            <h3 className="text-2xl font-serif text-white mb-2">Women’s Couture</h3>
            <p className="text-xs text-neutral-400 mb-6 font-light">Architectural suiting, pure silk loungewear, and tailored eveningwear.</p>
            <Link href="/women" className="text-xs uppercase tracking-widest text-amber-400 font-medium group-hover:translate-x-2 transition-transform inline-flex items-center gap-2">
              View Collection &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
