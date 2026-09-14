// app/men/page.tsx

import Image from "next/image";
import Link from "next/link";
import { getProductsByCategory } from "@/lib/products";

export default function MenPage() {
  const products = getProductsByCategory("men");

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-neutral-900">
      <section className="pt-32 pb-20 px-6 text-center">
        <p className="text-amber-600 tracking-[0.2em] text-sm font-semibold mb-4">
          GENTLEMEN'S BESPOKE ATELIER
        </p>
        <h1 className="text-4xl md:text-6xl font-serif mb-6 text-neutral-900">
          Men's Sartorial Collection
        </h1>
        <p className="text-neutral-600 max-w-2xl mx-auto text-lg leading-relaxed">
          Hand-cut Italian wools, precision canvas construction, and timeless tailoring built to your exact silhouette.
        </p>
      </section>

      <section className="container mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            // ⚠️ Men products link to /custom/[id] (bespoke customizer)
            <Link 
              key={product.id} 
              href={`/custom/${product.id}`}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-neutral-200 mb-4">
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  fill 
                  className="object-cover group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="bg-white text-neutral-900 px-4 py-2 text-xs uppercase tracking-widest font-semibold inline-block">
                    Customize This Piece
                  </span>
                </div>
              </div>
              <h3 className="text-lg font-serif text-neutral-900 group-hover:text-amber-600 transition">
                {product.name}
              </h3>
              <p className="text-neutral-500 text-sm">Starting at Rs. {product.price.toLocaleString()}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
