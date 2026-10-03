// components/shop-catalog.tsx

"use client";

import { useState, useMemo } from "react";
import type { Product } from "@/lib/data";
import { ProductCard } from "@/components/shop/product-card";

interface ShopCatalogProps {
  products: Product[];
}

export function ShopCatalog({ products }: ShopCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedFabric, setSelectedFabric] = useState<string>("all");

  const categories = useMemo(() => {
    const cats = new Set(products.map((p: Product) => p.category));
    return ["all", ...Array.from(cats)];
  }, [products]);

  const fabrics = useMemo(() => {
    const fabs = new Set(
      products
        .map((p: Product) => p.fabric)
        .filter((f): f is string => Boolean(f))
    );
    return ["all", ...Array.from(fabs)];
  }, [products]);

  const filtered = useMemo(() => {
    return products.filter((p: Product) => {
      const matchCat = selectedCategory === "all" || p.category === selectedCategory;
      const matchFab = selectedFabric === "all" || p.fabric === selectedFabric;
      return matchCat && matchFab;
    });
  }, [products, selectedCategory, selectedFabric]);

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`text-[10px] uppercase tracking-[0.25em] px-3 py-2 transition-colors ${
              selectedCategory === cat
                ? "text-neutral-900 border-b border-neutral-900"
                : "text-neutral-400 hover:text-neutral-900"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-10 md:gap-x-4">
          {filtered.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-neutral-400">No products match your filters.</p>
        </div>
      )}
    </div>
  );
}
