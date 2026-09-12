"use client"

import Link from "next/link"

export default function WomenCollection() {
  return (
    <div className="bg-[#0A0A0A] text-neutral-100 min-h-screen pb-20">
      {/* Editorial Hero */}
      <section className="relative h-[55vh] flex items-center justify-center text-center bg-neutral-900 border-b border-neutral-800 px-6">
        <div className="max-w-3xl space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-amber-400">Couture & Tailored Elegance</p>
          <h1 className="text-4xl md:text-6xl font-serif font-light tracking-wide">Women’s Bespoke Collection</h1>
          <p className="text-neutral-400 text-sm md:text-base max-w-xl mx-auto font-light leading-relaxed">
            Architectural suiting, silk loungewear, and custom-tailored evening silhouettes.
          </p>
        </div>
      </section>

      {/* Private Fitting Banner */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center space-y-6">
        <h2 className="text-2xl font-serif tracking-wider text-amber-400">Private Fitting & Bespoke Atelier</h2>
        <p className="text-neutral-400 max-w-lg mx-auto text-sm leading-relaxed">
          Our women’s couture line is crafted individually upon consultation. Choose your luxury silk or wool blend and design with our master tailors.
        </p>
        <div>
          <Link
            href="/custom"
            className="inline-block bg-white text-black text-xs uppercase tracking-[0.2em] font-medium px-8 py-4 hover:bg-neutral-200 transition-colors"
          >
            Launch Custom Studio
          </Link>
        </div>
      </section>
    </div>
  )
}
