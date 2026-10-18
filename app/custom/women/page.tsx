// app/custom/women/page.tsx

"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { ProductCard } from "@/components/shop/product-card";
import { motion } from "framer-motion";

export default function WomenBespokeListingPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      // Database se saare women's products fetch karein
      const { data, error } = await supabase
        .from("models")
        .select("*")
        .eq("category", "women") // Yahan "women" kiya hai
        .order("created_at", { ascending: false });

      if (data) {
        // Client-side filtering: Sirf wo products rakhein jo CJ ya 1688 ke nahi hain
        const bespokeOnly = data.filter(
          (p) => !["cj", "1688"].includes(p.supplier?.toLowerCase() || "")
        );
        setProducts(bespokeOnly);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper">
        <div className="w-8 h-8 border border-border border-t-ink rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-[1500px] mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <p className="text-[10px] tracking-[0.4em] text-brand-gold uppercase mb-4">
            The Bespoke Collection
          </p>
          <h1 className="text-4xl md:text-6xl font-serif text-brand-charcoal mb-6">
            Women's Made to Measure {/* Heading change ki hai */}
          </h1>
          <p className="text-sm text-brand-slate max-w-xl mx-auto">
            Handcrafted by master tailors to your exact measurements. Select a design, choose your fabric, and we'll craft a garment that fits you perfectly.
          </p>
        </div>

        {/* Product Grid */}
        {products.length === 0 ? (
          <div className="text-center border border-border p-12">
            <p className="text-stone">No Made-to-Measure products found.</p>
            <p className="text-xs text-mist mt-2">Please add products from Supabase with supplier 'kashif' or 'cheonseng'.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ProductCard product={product} category="women" />
              </motion.div>
            ))}
          </div>
        )}
        
      </div>
    </div>
  );
}
