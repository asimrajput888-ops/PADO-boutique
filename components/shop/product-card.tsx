// components/shop/product-card.tsx

"use client";

import Link from "next/link";
import Image from "next/image";
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

  // Main image nikalne ka logic (Agar image_url khali hai toh images array se uthayein)
  const mainImage = product.image_url || (product.images && product.images.length > 0 ? product.images[0] : "/placeholder.jpg");

  // Check karein ke product Ready-to-Wear (CJ/1688) hai ya Made-to-Measure
  const isReadyToWear = ["cj", "1688"].includes(product.supplier?.toLowerCase() || "");

  // SMART ROUTING LOGIC
  let href = `/custom/${category === "shop" ? "men" : category}/${product.id}`;
  if (isReadyToWear) {
    href = `/shop/${product.id}`;
  } else if (category === "seasonal") {
    href = `/seasonal/${product.id}`;
  }

  return (
    <Link href={href} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-brand-cream mb-4">
        
        {/* Single Clean Image with Smooth Zoom */}
        <Image
          src={mainImage}
          alt={product.name}
          fill
          className="object-cover object-center absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Tags */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {isReadyToWear ? (
             <span className="bg-white/90 backdrop-blur-sm text-brand-charcoal text-[9px] uppercase tracking-[0.2em] px-3 py-1.5 font-medium">
               Ready to Wear
             </span>
          ) : (
            <span className="bg-brand-charcoal/90 backdrop-blur-sm text-white text-[9px] uppercase tracking-[0.2em] px-3 py-1.5 font-medium">
              Made to Measure
            </span>
          )}
        </div>

        {/* Quick View Button (Hover pe niche se aayega) */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
          <div className="bg-white/95 backdrop-blur-sm text-brand-charcoal text-center py-3 text-[10px] uppercase tracking-[0.2em] font-medium hover:bg-brand-charcoal hover:text-white transition-colors">
            {isReadyToWear ? "Select Size" : "Begin Order"}
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="text-center px-2">
        <h3 className="font-serif text-lg md:text-xl text-brand-charcoal mb-1 group-hover:text-brand-gold transition-colors duration-300 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-sm font-medium text-brand-slate">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
