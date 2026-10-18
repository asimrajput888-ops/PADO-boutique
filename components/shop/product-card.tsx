// components/shop/product-card.tsx

"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
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

  // Main image nikalne ka logic
  const mainImage = 
    product.images && Array.isArray(product.images) && product.images.length > 0
      ? product.images[0]
      : product.image_url || "/placeholder.jpg";

  // Hover pe dusri image dikhane ke liye
  const hoverImage = 
    product.images && Array.isArray(product.images) && product.images.length > 1
      ? product.images[1]
      : mainImage;

  // Check karein ke product Ready-to-Wear (CJ/1688) hai ya Made-to-Measure
  const isReadyToWear = ["cj", "1688"].includes(product.supplier?.toLowerCase() || "");

  // SMART ROUTING LOGIC:
  // Agar Ready-to-Wear hai -> /shop/[id]
  // Agar Seasonal hai -> /seasonal/[id]
  // Agar Customize hai -> /custom/[category]/[id]
  let href = `/custom/${category === "shop" ? "men" : category}/${product.id}`;
  
  if (isReadyToWear) {
    href = `/shop/${product.id}`;
  } else if (category === "seasonal") {
    href = `/seasonal/${product.id}`;
  }

  return (
    <Link href={href} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-brand-cream mb-4">
        
        {/* Main Image */}
        <Image
          src={mainImage}
          alt={product.name}
          fill
          className="object-cover object-center absolute inset-0 transition-opacity duration-700 ease-in-out group-hover:opacity-0"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Hover Image */}
        <Image
          src={hoverImage}
          alt={`${product.name} alternate`}
          fill
          className="object-cover object-center absolute inset-0 opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100 scale-105 group-hover:scale-100"
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

        {/* Quick View Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
          <div className="bg-white/95 backdrop-blur-sm text-brand-charcoal text-center py-3 text-[10px] uppercase tracking-[0.2em] font-medium hover:bg-brand-charcoal hover:text-white transition-colors">
            {isReadyToWear ? "Select Size" : "Begin Order"}
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="text-center px-2">
        <h3 className="font-serif text-lg md:text-xl text-brand-charcoal mb-1 group-hover:text-brand-gold transition-colors duration-300">
          {product.name}
        </h3>
        <p className="text-sm text-brand-slate">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
