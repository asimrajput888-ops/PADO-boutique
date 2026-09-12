"use client"

import Link from "next/link"
import { useCurrency } from "@/context/currency-context"

const womenProducts = [
  {
    id: "w-01",
    name: "Tailored Ivory Double-Breasted Suit",
    fabric: "Super 120s Wool & Silk Blend",
    priceUSD: 1350,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "w-02",
    name: "Midnight Silk Loungewear Set",
    fabric: "100% Pure Mulberry Silk",
    priceUSD: 650,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "w-03",
    name: "Architectural Tuxedo Blazer",
    fabric: "Italian Velvet & Satin Lapel",
    priceUSD: 1100,
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80",
  },
]

export default function WomenPage() {
  const { formatPrice } = useCurrency()

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen py-16 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header Section */}
        <div className="text-center space-y-3">
          <p className="text-amber-400 text-xs uppercase tracking-[0.3em] font-mono">
            COUTURE & TAILORED ELEGANCE
          </p>
          <h1 className="text-3xl md:text-5xl font-serif tracking-wide text-white font-light">
            Women’s Bespoke Collection
          </h1>
          <p className="text-neutral-400 text-xs md:text-sm max-w-xl mx-auto font-light leading-relaxed">
            Architectural suiting, pure silk loungewear, and custom-tailored evening silhouettes built to your exact measurements.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
          {womenProducts.map((product) => (
            <div
              key={product.id}
              className="bg-[#0D0D0D] border border-neutral-800 rounded-none overflow-hidden hover:border-amber-400/50 transition-all flex flex-col justify-between group"
            >
              <div className="relative h-[380px] w-full bg-neutral-900 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-sm font-serif text-white tracking-wide">{product.name}</h3>
                  <p className="text-[11px] text-neutral-500 font-light mt-1">{product.fabric}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-neutral-900">
                  <span className="text-xs font-mono text-amber-400 font-medium">
                    {formatPrice(product.priceUSD)}
                  </span>
                  <Link
                    href={`/custom?gender=women&item=${product.id}`}
                    className="border border-neutral-700 text-neutral-300 hover:border-amber-400 hover:text-amber-400 text-[10px] uppercase tracking-widest px-4 py-2 transition-all font-medium"
                  >
                    Customize Studio
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
