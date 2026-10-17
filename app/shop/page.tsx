// app/shop/page.tsx

"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { ProductCard } from "@/components/shop/product-card";
import { motion } from "framer-motion";

export default function ReadyToWearPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      // Sirf CJ ya 1688 wale products fetch karein
      const { data } = await supabase
        .from("models")
        .select("*")
        .in("supplier", ["cj", "1688", "CJ", "1688"])
        .order("created_at", { ascending: false });

      if (data) setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center font-serif text-xl">Loading Collection...</div>;

  return (
    <div className="min-h-screen bg-paper pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-[1500px] mx-auto">
        <div className="text-center mb-16 md:mb-24">
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

        {products.length === 0 ? (
          <p className="text-center text-stone">No Ready-to-Wear products found. Add some from Supabase!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Note: Humne ProductCard mein href ko /shop/[id] set karna hoga, ya yahan pass karna hoga */}
                <ProductCard product={product} category="men" /> 
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
