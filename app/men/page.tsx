// app/men/page.tsx

import Link from "next/link";

export default function MenPage() {
  const products = [
    { id: 1, name: "The Midnight Tuxedo", price: "PKR 85,000", category: "Bespoke Suit" },
    { id: 2, name: "Heritage Wool Blazer", price: "PKR 45,000", category: "Outerwear" },
    { id: 3, name: "Ivory Silk Kurta", price: "PKR 35,000", category: "Traditional" },
    { id: 4, name: "Charcoal Dress Shirt", price: "PKR 12,000", category: "Shirting" },
  ];

  return (
    <div className="bg-[#FFF8F0] min-h-screen">
      {/* Hero Section */}
      <div className="bg-[#1E1E2C] text-white py-32 px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <p className="text-[#C5A059] uppercase tracking-[0.4em] text-xs mb-6">Menswear</p>
          <h1 className="text-5xl md:text-7xl font-serif mb-6 tracking-tight">
            Sartorial <span className="italic text-[#C5A059]">Elegance</span>
          </h1>
          <p className="text-white/60 max-w-xl mx-auto font-light leading-relaxed">
            Bespoke tailoring for the modern gentleman. Crafted with precision, 
            designed for distinction.
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-6 py-24 max-w-6xl">
        <div className="flex justify-between items-end mb-12 border-b border-[#1E1E2C]/10 pb-6">
          <h2 className="text-3xl font-serif text-[#1E1E2C]">The Collection</h2>
          <p className="text-[#1E1E2C]/50 text-xs uppercase tracking-widest">{products.length} Pieces</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link 
              key={product.id} 
              href={`/shop/${product.id}`} // Agar detail page hai toh
              className="group cursor-pointer"
            >
              <div className="bg-[#1E1E2C]/5 aspect-[3/4] mb-4 border border-[#1E1E2C]/10 overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center text-[#1E1E2C]/20 font-serif italic">
                  Product Image
                </div>
                <div className="absolute inset-0 bg-[#5D1A24]/0 group-hover:bg-[#5D1A24]/10 transition-colors duration-500"></div>
              </div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] mb-1">{product.category}</p>
              <h3 className="font-serif text-lg text-[#1E1E2C] mb-1 group-hover:text-[#5D1A24] transition">{product.name}</h3>
              <p className="text-sm text-[#1E1E2C]/60">{product.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
