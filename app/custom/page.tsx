// app/shop/page.tsx

import Link from "next/link";
import { useState } from "react"; // Note: "use client" chahiye agar filter use kar rahe hain

export default function ShopPage() {
  const allProducts = [
    { id: 1, name: "The Midnight Tuxedo", price: "PKR 85,000", category: "Men", type: "Bespoke Suit" },
    { id: 2, name: "Silk Loungewear Set", price: "PKR 28,000", category: "Women", type: "Loungewear" },
    { id: 3, name: "Emerald Evening Gown", price: "PKR 120,000", category: "Women", type: "Couture" },
    { id: 4, name: "Heritage Wool Blazer", price: "PKR 45,000", category: "Men", type: "Outerwear" },
    { id: 5, name: "Ivory Chiffon Saree", price: "PKR 65,000", category: "Women", type: "Traditional" },
    { id: 6, name: "Ivory Silk Kurta", price: "PKR 35,000", category: "Men", type: "Traditional" },
    { id: 7, name: "Gold Embroidered Jacket", price: "PKR 55,000", category: "Women", type: "Outerwear" },
    { id: 8, name: "Charcoal Dress Shirt", price: "PKR 12,000", category: "Men", type: "Shirting" },
  ];

  return (
    <div className="bg-[#FFF8F0] min-h-screen">
      {/* Hero Section */}
      <div className="bg-[#1E1E2C] text-white py-24 px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <h1 className="text-5xl md:text-6xl font-serif mb-4 tracking-tight">
            The <span className="italic text-[#C5A059]">Collection</span>
          </h1>
          <p className="text-white/60 font-light">Curated pieces from our atelier.</p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-6 py-24 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {allProducts.map((product) => (
            <Link 
              key={product.id} 
              href={`/shop/${product.id}`}
              className="group cursor-pointer"
            >
              <div className="bg-[#1E1E2C]/5 aspect-[3/4] mb-4 border border-[#1E1E2C]/10 overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center text-[#1E1E2C]/20 font-serif italic">
                  Product Image
                </div>
                <div className="absolute inset-0 bg-[#5D1A24]/0 group-hover:bg-[#5D1A24]/10 transition-colors duration-500"></div>
              </div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] mb-1">{product.type} • {product.category}</p>
              <h3 className="font-serif text-lg text-[#1E1E2C] mb-1 group-hover:text-[#5D1A24] transition">{product.name}</h3>
              <p className="text-sm text-[#1E1E2C]/60">{product.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
