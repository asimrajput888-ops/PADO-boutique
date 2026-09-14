// app/women/page.tsx

import Image from "next/image";
import Link from "next/link";
import { getProductsByCategory } from "@/lib/products";

export default function WomenPage() {
  const products = getProductsByCategory("women");

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      
      {/* Hero Section */}
      <div className="bg-[#5D1A24] text-white py-32 px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <p className="text-[#C5A059] uppercase tracking-[0.4em] text-xs mb-6">Womenswear</p>
          <h1 className="text-5xl md:text-7xl font-serif mb-6 tracking-tight">
            Timeless <span className="italic text-[#C5A059]">Grace</span>
          </h1>
          <p className="text-white/70 max-w-xl mx-auto font-light leading-relaxed">
            From silk loungewear to bespoke couture. Every piece tells a story of 
            refined craftsmanship.
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-6 py-24 max-w-6xl">
        <div className="flex justify-between items-end mb-12 border-b border-[#1E1E2C]/10 pb-6">
          <h2 className="text-3xl font-serif text-[#1E1E2C]">The Atelier</h2>
          <p className="text-[#1E1E2C]/50 text-xs uppercase tracking-widest">{products.length} Pieces</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link 
              key={product.id} 
              href={`/shop/${product.id}`}
              className="group cursor-pointer"
            >
              <div className="bg-[#1E1E2C]/5 aspect-[3/4] mb-4 border border-[#1E1E2C]/10 overflow-hidden relative">
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  fill 
                  className="object-cover group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-[#5D1A24]/0 group-hover:bg-[#5D1A24]/10 transition-colors duration-500"></div>
              </div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] mb-1">
                {product.category}
              </p>
              <h3 className="font-serif text-lg text-[#1E1E2C] mb-1 group-hover:text-[#5D1A24] transition">
                {product.name}
              </h3>
              <p className="text-sm text-[#1E1E2C]/60">PKR {product.price.toLocaleString()}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
