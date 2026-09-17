// app/shop/page.tsx

import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { PRODUCTS } from "@/lib/products";

export default async function ShopPage() {
  // Supabase se saare products fetch karein
  const { data: supabaseProducts } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  // Agar Supabase mein products hain, toh woh use karein; warna fallback
  const products =
    supabaseProducts && supabaseProducts.length > 0
      ? supabaseProducts
      : PRODUCTS;

  // Data normalize karein (Supabase mein "image_url", fallback mein "image")
  const normalizedProducts = products.map((p: any) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    image: p.image_url || p.image,
    category: p.category,
    description: p.description,
  }));

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-amber-600 tracking-[0.3em] text-xs font-semibold mb-4 uppercase">
            The Collection
          </p>
          <h1 className="text-4xl md:text-5xl font-serif mb-4">
            All Products
          </h1>
          <p className="text-neutral-500 max-w-xl mx-auto">
            Explore our complete collection of bespoke tailoring and ready-to-wear garments.
          </p>
        </div>

        {/* Products Grid */}
        {normalizedProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {normalizedProducts.map((product: any) => (
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
        ) : (
          <div className="text-center py-20">
            <p className="text-neutral-400 text-lg">No products available yet.</p>
            <p className="text-neutral-400 text-sm mt-2">
              Add products from the Admin Panel.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
