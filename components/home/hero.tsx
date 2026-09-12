import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative bg-neutral-950 py-24 text-white sm:py-32">
      <div className="mx-auto max-w-[1500px] px-5 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">
          Master Craftsmanship & Atelier
        </p>
        <h1 className="mt-4 text-4xl font-serif font-bold tracking-tight sm:text-6xl text-white">
          PADO BOUTIQUE
        </h1>
        <p className="mt-2 text-sm uppercase tracking-[0.2em] text-neutral-300 font-sans">
          Bespoke Modern Tailoring
        </p>
        <p className="mx-auto mt-6 max-w-2xl text-sm text-neutral-400 font-light leading-relaxed">
          Crafting custom suits made to your exact measurements, finest wools, and personalized lining.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/custom"
            className="bg-white px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-black hover:bg-neutral-200 transition-all"
          >
            Create Your Suit
          </Link>
          <Link
            href="/shop"
            className="border border-white/30 px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-white hover:bg-white/10 transition-all"
          >
            Explore Collection
          </Link>
        </div>
      </div>
    </section>
  )
}
