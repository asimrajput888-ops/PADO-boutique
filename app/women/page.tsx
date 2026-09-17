// app/women/page.tsx

import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { getProductsByCategory } from "@/lib/products";

export default async function WomenPage() {
  // Supabase se "women" category ke products fetch karein
  const { data: supabaseProducts } = await supabase
    .from("products")
    .select("*")
    .eq("category", "women")
    .order("created_at", { ascending: false });

  // Fallback (agar Supabase khali ho)
  const fallbackProducts = getProductsByCategory("women");

  const products =
    supabaseProducts && supabaseProducts.length > 0
      ? supabaseProducts
      : fallbackProducts;

  const normalizedProducts = products.map((p: any) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    image: p.image_url || p.image,
    category: p.category,
    description: p.description,
  }));

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      
      {/* ============ HERO SECTION ============ */}
      <div className="bg-[#5D1A24] text-white py-32 px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <p className="text-[#C5A059] uppercase tracking-[0.4em] text-xs mb-6">
            Womenswear
          </p>
          <h1 className="text-5xl md:text-7xl font-serif mb-6 tracking-tight">
            Timeless <span className="italic text-[#C5A059]">Grace</span>
          </h1>
          <p className="text-white/70 max-w-xl mx-auto font-light leading-relaxed">
            From silk loungewear to bespoke couture. Every piece tells a story of refined craftsmanship.
          </p>
        </div>
      </div>

      {/* ============ PRODUCTS GRID ============ */}
      <div className="container mx-auto px-6 py-24 max-w-7xl">
        <div className="flex justify-between items-end mb-12 border-b border-[#1E1E2C]/10 pb-6">
          <h2 className="text-3xl font-serif text-[#1E1E2C]">The Atelier</h2>
          <p className="text-[#1E1E2C]/50 text-xs uppercase tracking-widest">
            {normalizedProducts.length} Pieces
          </p>
        </div>

        {normalizedProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {normalizedProducts.map((product: any) => (
              <Link
                key={product.id}
                href={`/women/${product.id}`}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-[#1E1E2C]/5 mb-4 border border-[#1E1E2C]/10">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-[#5D1A24]/0 group-hover:bg-[#5D1A24]/10 transition-colors duration-500" />
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="bg-white text-[#5D1A24] px-4 py-2 text-xs uppercase tracking-widest font-semibold inline-block">
                      Customize This Piece
                    </span>
                  </div>
                </div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] mb-1">
                  {product.category}
                </p>
                <h3 className="font-serif text-lg text-[#1E1E2C] mb-1 group-hover:text-[#5D1A24] transition">
                  {product.name}
                </h3>
                <p className="text-sm text-[#1E1E2C]/60">
                  PKR {product.price.toLocaleString()}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-[#1E1E2C]/40 text-lg">No products available yet.</p>
            <p className="text-[#1E1E2C]/40 text-sm mt-2">
              Add products from the Admin Panel.
            </p>
          </div>
        )}
      </div>

      {/* ============ BOTTOM CTA ============ */}
      <div className="bg-[#5D1A24] text-white py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#C5A059] tracking-[0.3em] text-xs font-semibold mb-4 uppercase">
            Bespoke Couture
          </p>
          <h2 className="text-3xl md:text-5xl font-serif mb-6">
            Crafted Just for You
          </h2>
          <p className="text-white/70 max-w-xl mx-auto mb-8">
            Experience the art of bespoke tailoring with our master craftsmen.
          </p>
          <Link
            href="/custom"
            className="bg-[#C5A059] text-[#1E1E2C] px-10 py-4 text-xs uppercase tracking-[0.3em] font-semibold hover:bg-white transition-all duration-300 inline-block"
          >
            Enter Bespoke Studio
          </Link>
        </div>
      </div>
    </div>
  );
}
