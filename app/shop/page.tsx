// app/shop/page.tsx

import Link from "next/link";
import Image from "next/image";
import { PRODUCTS } from "@/lib/products";

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-amber-600 tracking-[0.3em] text-xs font-semibold mb-4 uppercase">
            The Collection
          </p>
          <h1 className="text-4xl md:text-5xl font-serif mb-4">All Products</h1>
          <p className="text-neutral-500 max-w-xl mx-auto">
            Explore our complete collection of bespoke tailoring, ready-to-wear
            suits, and signature designs.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRODUCTS.map((product) => (
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
      </div>
    </div>
  );
}
