// app/shop/page.tsx

"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { PRODUCTS } from "@/lib/products";

const CATEGORIES = [
  { id: "all", name: "All" },
  { id: "men", name: "Men" },
  { id: "women", name: "Women" },
  { id: "custom", name: "Custom" },
  { id: "signature", name: "Signature Suit" },
];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProducts =
    activeCategory === "all"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-amber-600 tracking-[0.3em] text-xs font-semibold mb-4 uppercase">
            The Collection
          </p>
          <h1 className="text-4xl md:text-5xl font-serif mb-4">All Products</h1>
          <p className="text-neutral-500 max-w-xl mx-auto text-sm">
            Explore bespoke tailoring, ready-to-wear suits, and PADO signature designs.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-2 mb-12 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-2 text-xs uppercase tracking-[0.2em] transition rounded-full ${
                activeCategory === cat.id
                  ? "bg-neutral-900 text-white"
                  : "bg-white text-neutral-600 border border-neutral-200 hover:border-amber-600"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-neutral-400 text-lg">No products in this category yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/shop/${product.id}`}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 mb-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-700"
                  />
                </div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-amber-600 mb-1">
                  {product.category}
                </p>
                <h3 className="font-serif text-lg text-neutral-900 group-hover:text-amber-600 transition">
                  {product.name}
                </h3>
                <p className="text-sm text-neutral-500">
                  Rs. {product.price.toLocaleString()}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
