"use client"

import Link from "next/link"
import { useCurrency } from "@/context/currency-context"

interface Product {
  id: string
  name: string
  fabric: string
  description: string
  priceUSD: number
  image: string
  tag: string
}

const womenProducts: Product[] = [
  {
    id: "w-01",
    name: "Tailored Ivory Double-Breasted Suit",
    fabric: "Super 120s Wool & Mulberry Silk Blend",
    description: "Sharp architectural shoulders, custom peak lapels, and hand-stitched detailing crafted for commanding elegance.",
    priceUSD: 1450,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80",
    tag: "Bespoke Tailoring"
  },
  {
    id: "w-02",
    name: "Midnight Silk Loungewear Set",
    fabric: "100% Pure 22 Momme Mulberry Silk",
    description: "Fluid, ultra-soft tailored luxury loungewear designed for relaxed elegance with custom contrasting piping.",
    priceUSD: 720,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
    tag: "Couture Loungewear"
  },
  {
    id: "w-03",
    name: "Architectural Evening Tuxedo Blazer",
    fabric: "Italian Silk Velvet & Grosgrain Satin Lapel",
    description: "Sculpted women's black-tie tuxedo jacket featuring hand-finished buttonholes and natural structured canvas.",
    priceUSD: 1250,
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80",
    tag: "Eveningwear"
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
              <div className="relative h-[400px] w-full bg-neutral-900 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-black/70 backdrop-blur-md text-amber-400 border border-amber-400/30 text-[9px] uppercase tracking-widest px-3 py-1 font-mono">
                  {product.tag}
                </span>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-base font-serif text-white tracking-wide">{product.name}</h3>
                  <p className="text-[11px] text-amber-400/80 font-mono tracking-wide">{product.fabric}</p>
                  <p className="text-xs text-neutral-400 font-light leading-relaxed">{product.description}</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-neutral-900 mt-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-mono text-neutral-500">Starting at</span>
                    <span className="text-sm font-mono text-amber-400 font-medium">
                      {formatPrice(product.priceUSD)}
                    </span>
                  </div>
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
