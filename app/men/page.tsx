// app/men/page.tsx

import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { getProductsByCategory } from "@/lib/products";

export default async function MenPage() {
  // Supabase se "men" category ke products fetch karein
  const { data: supabaseProducts } = await supabase
    .from("products")
    .select("*")
    .eq("category", "men")
    .order("created_at", { ascending: false });

  // Agar Supabase mein products nahi hain, toh fallback (lib/products.ts) use karein
  const fallbackProducts = getProductsByCategory("men");

  // Decide karein kaunsa data use karna hai
  const products =
    supabaseProducts && supabaseProducts.length > 0
      ? supabaseProducts
      : fallbackProducts;

  // Normalize data (Supabase mein "image_url" hai, fallback mein "image")
  const normalizedProducts = products.map((p: any) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    image: p.image_url || p.image,
    category: p.category,
    description: p.description,
  }));

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-neutral-900">
      
      {/* ============ HERO SECTION ============ */}
      <section className="pt-32 pb-20 px-6 text-center">
        <p className="text-amber-600 tracking-[0.3em] text-xs font-semibold mb-4 uppercase">
          Gentlemen's Bespoke Atelier
        </p>
        <h1 className="text-4xl md:text-6xl font-serif mb-6 text-neutral-900">
          Men's Sartorial Collection
        </h1>
        <p className="text-neutral-600 max-w-2xl mx-auto text-lg leading-relaxed">
          Hand-cut Italian wools, precision canvas construction, and timeless tailoring built to your exact silhouette.
        </p>
      </section>

      {/* ============ PRODUCTS GRID ============ */}
      <section className="container mx-auto px-6 pb-24">
        {normalizedProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {normalizedProducts.map((product) => (
              <Link
                key={product.id}
                href={`/men/${product.id}`}
                className="group cursor-pointer"
              >
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 mb-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-700"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />
                  {/* Customize Button on Hover */}
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="bg-white text-neutral-900 px-4 py-2 text-xs uppercase tracking-widest font-semibold inline-block">
                      Customize This Piece
                    </span>
                  </div>
                </div>

                {/* Product Info */}
                <h3 className="text-lg font-serif text-neutral-900 group-hover:text-amber-600 transition mb-1">
                  {product.name}
                </h3>
                <p className="text-neutral-500 text-sm">
                  Starting at Rs. {product.price.toLocaleString()}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-neutral-400 text-lg">No products available yet.</p>
            <p className="text-neutral-400 text-sm mt-2">
              Add products from the Admin Panel.
            </p>
          </div>
        )}
      </section>

      {/* ============ BOTTOM CTA ============ */}
      <section className="bg-neutral-900 text-white py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-amber-500 tracking-[0.3em] text-xs font-semibold mb-4 uppercase">
            Experience Bespoke
          </p>
          <h2 className="text-3xl md:text-5xl font-serif mb-6">
            Book a Fitting Consultation
          </h2>
          <p className="text-white/60 max-w-xl mx-auto mb-8">
            Meet our master tailors and get measured for your perfect fit.
          </p>
          <Link
            href="/custom"
            className="bg-amber-500 text-black px-10 py-4 text-xs uppercase tracking-[0.3em] font-semibold hover:bg-amber-400 transition-all duration-300 inline-block"
          >
            Enter Bespoke Studio
          </Link>
        </div>
      </section>
    </div>
  );
}
