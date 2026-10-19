// components/shop/product-card.tsx

"use client";

import Link from "next/link";
import { useState } from "react";
import { useCurrency } from "@/context/currency-context";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    image_url: string;
    images?: string[];
    supplier?: string;
    product_type?: string;
  };
  category: "men" | "women" | "seasonal" | "shop";
}

export function ProductCard({ product, category }: ProductCardProps) {
  const { formatPrice } = useCurrency();
  const [imageError, setImageError] = useState(false);

  // Main Image URL
  let imageSrc = product.image_url || (product.images && product.images.length > 0 ? product.images[0] : "");

  // 🔥 MAGIC: Agar image aliyuncs ya cjdropshipping se hai, toh proxy use karo
  if (imageSrc && (imageSrc.includes("aliyuncs.com") || imageSrc.includes("cjdropshipping.com"))) {
    imageSrc = `/api/proxy-image?url=${encodeURIComponent(imageSrc)}`;
  }

  const isReadyToWear = ["cj", "1688"].includes(product.supplier?.toLowerCase() || "");

  let href = `/custom/${category === "shop" ? "men" : category}/${product.id}`;
  if (isReadyToWear) href = `/shop/${product.id}`;
  else if (category === "seasonal") href = `/seasonal/${product.id}`;

  return (
    <Link href={href} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-brand-cream mb-4">
        
        {!imageSrc || imageError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-brand-cream text-brand-slate p-4 text-center">
            <span className="font-serif text-2xl mb-2">PADO</span>
            <span className="text-[10px] uppercase tracking-widest">Image Coming Soon</span>
          </div>
        ) : (
          <img
            src={imageSrc}
            alt={product.name}
            className="object-cover object-center absolute inset-0 w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        )}

        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <span className={`text-[9px] uppercase tracking-[0.2em] px-3 py-1.5 font-medium ${isReadyToWear ? "bg-white/90 text-brand-charcoal" : "bg-brand-charcoal/90 text-white"}`}>
            {isReadyToWear ? "Ready to Wear" : "Made to Measure"}
          </span>
        </div>
      </div>

      <div className="text-center px-2">
        <h3 className="font-serif text-lg text-brand-charcoal mb-1 group-hover:text-brand-gold transition-colors duration-300 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-sm font-medium text-brand-slate">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
