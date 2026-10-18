// app/shop/page.tsx

"use client";

import { useState, useEffect, Suspense } from "react";
import { supabase } from "@/lib/supabase";
import { ProductCard } from "@/components/shop/product-card";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

// Ready to Wear Categories (Landing Page ke liye)
const RW_CATEGORIES = [
  {
    name: "For Him",
    href: "/shop?gender=men",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1000&q=80", // Unsplash dummy (aap apni image laga sakte hain)
    label: "Men's Ready to Wear",
  },
  {
    name: "For Her",
    href: "/shop?gender=women",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=1000&q=80", // Unsplash dummy
    label: "Women's Ready to Wear",
  },
];

function ShopContent() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  
  const genderFilter = searchParams.get("gender"); // 'men' or 'women'

  useEffect(() => {
    const fetchProducts = async () => {
      // Agar gender filter nahi hai (matlab landing page hai), toh products fetch karne ki zaroorat nahi
      if (!genderFilter) {
        setLoading(false);
        return;
      }

      setLoading(true);
      let query = supabase
        .from("models")
        .select("*")
        .in("supplier", ["cj", "1688", "CJ", "1688"])
        .order("created_at", { ascending: false });

      // Filter by Men or Women
      if (genderFilter === "men") {
        query = query.eq("category", "men");
      } else if (genderFilter === "women") {
        query = query.eq("category", "women");
      }

      const { data } = await query;
      if (data) setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, [genderFilter]);

  // ==========================================
  // SCREEN 1: Landing Page (2 Pictures)
  // ==========================================
  if (!genderFilter) {
    return (
      <div className="min-h-screen bg-paper pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <p className="text-[10px] tracking-[0.4em] text-brand-gold uppercase mb-4">
              Express Delivery
            </p>
            <h1 className="text-4xl md:text-6xl font-serif text-brand-charcoal mb-6">
              Ready to Wear
            </h1>
            <p className="text-sm text-brand-slate max-w-xl mx-auto">
              Explore our curated collection of ready-to-wear garments. Crafted on standard patterns and dispatched within 7–10 days.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {RW_CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
              >
                <Link
                  href={cat.href}
                  className="group block relative aspect-[4/5] md:aspect-[3/4] overflow-hidden bg-brand-stone"
                >
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover object-top transition-transform duration-[1.2s] ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
                    <p className="text-[10px] tracking-[0.4em] text-brand-gold-light uppercase mb-3">
                      {cat.label}
                    </p>
                    <h3 className="text-3xl md:text-4xl font-serif text-white mb-4">
                      {cat.name}
                    </h3>
                    <span className="text-[10px] tracking-[0.3em] text-brand-gold-light uppercase border-b border-brand-gold-light/50 pb-1 group-hover:border-brand-gold-light transition-all duration-500">
                      Shop Now →
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // SCREEN 2: Products Grid (Filtered)
  // ==========================================
  if (loading) return <div className="min-h-screen flex items-center justify-center font-serif text-xl">Loading Collection...</div>;

  return (
    <div className="min-h-screen bg-paper pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-[1500px] mx-auto">
        
        {/* Header for Filtered View */}
        <div className="mb-12">
          <Link href="/shop" className="text-[10px] uppercase text-stone mb-8 inline-flex items-center gap-2 hover:text-ink transition-colors">
            <span>←</span> Back to Categories
          </Link>
          <h1 className="text-3xl md:text-5xl font-serif text-brand-charcoal mb-4 capitalize">
            {genderFilter === "men" ? "Men's" : "Women's"} Ready to Wear
          </h1>
          <p className="text-sm text-brand-slate">
            Showing {products.length} {products.length === 1 ? 'item' : 'items'}
          </p>
        </div>

        {products.length === 0 ? (
          <p className="text-center text-stone border border-border p-12">
            No Ready-to-Wear products found for this category. Add some from Supabase!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ProductCard product={product} category={genderFilter as "men" | "women"} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ReadyToWearPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ShopContent />
    </Suspense>
  );
}
