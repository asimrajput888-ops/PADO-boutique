"use client"

import { PRODUCTS } from "@/lib/products"
import Link from "next/link"

export default function MenCollection() {
  const menProducts = PRODUCTS.filter(
    (p) => p.category === "suits" || p.category === "blazers" || p.category === "shirts"
  )

  return (
    <div className="bg-[#0A0A0A] text-neutral-100 min-h-screen pb-20">
      {/* Editorial Hero */}
      <section className="relative h-[55vh] flex items-center justify-center text-center bg-neutral-900 border-b border-neutral-800 px-6">
        <div className="max-w-3xl space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-amber-400">Gentlemen's Bespoke Atelier</p>
          <h1 className="text-4xl md:text-6xl font-serif font-light tracking-wide">Men’s Sartorial Collection</h1>
          <p className="text-neutral-400 text-sm md:text-base max-w-xl mx-auto font-light leading-relaxed">
            Hand-cut Italian wools, precision canvas construction, and timeless tailoring built to your exact silhouette.
          </p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {menProducts.map((product) => (
            <div key={product.id} className="group border border-neutral-800 bg-neutral-950 p-4 rounded-sm">
              <div className="relative h-80 w-full overflow-hidden bg-neutral-900 mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="font-serif text-lg tracking-wide">{product.name}</h3>
              <p className="text-xs text-neutral-400 my-1">{product.fabric}</p>
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-neutral-900">
                <span className="text-amber-400 text-sm font-medium">${product.price} USD</span>
                <Link
                  href="/custom"
                  className="text-xs uppercase tracking-widest bg-white text-black px-4 py-2 hover:bg-neutral-200 transition-colors"
                >
                  Customize
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
