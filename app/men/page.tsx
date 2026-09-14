// app/men/page.tsx

import Image from "next/image";
import Link from "next/link";
import { getProductsByCategory } from "@/lib/products";

export default function MenPage() {
  const products = getProductsByCategory("men");

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-neutral-900">
      
      {/* Hero Section */}
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

      {/* Product Grid */}
      <section className="container mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Link 
              key={product.id} 
              href={`/shop/${product.id}`}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-neutral-200 mb-4">
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  fill 
                  className="object-cover group-hover:scale-105 transition duration-700"
                />
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
