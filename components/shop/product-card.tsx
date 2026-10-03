// components/shop/product-card.tsx

import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/data";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/shop/${product.id}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 mb-3">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, 25vw"
            className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-300 text-[10px] uppercase tracking-widest">
            No image
          </div>
        )}
      </div>
      <h3 className="text-[13px] md:text-sm text-neutral-900 leading-snug mb-1 transition-colors duration-300 group-hover:text-neutral-500">
        {product.name}
      </h3>
      <p className="text-[13px] md:text-sm text-neutral-500">
        ${product.price.toLocaleString()}
      </p>
    </Link>
  );
}
