// app/shop/[id]/page.tsx

"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { useCurrency } from "@/context/currency-context";
import { getProductById } from "@/lib/products";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const product = getProductById(id);
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">
        <div className="text-center">
          <h1 className="text-4xl font-serif text-neutral-900 mb-4">Product Not Found</h1>
          <Link href="/shop" className="text-amber-600 hover:underline">
            &larr; Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <Link href="/shop" className="text-sm text-neutral-500 hover:text-amber-600 mb-8 inline-block">
          &larr; Back to Shop
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative aspect-[3/4] bg-neutral-100 overflow-hidden">
            <Image 
              src={product.image} 
              alt={product.name} 
              fill 
              className="object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-center">
            <p className="text-amber-600 text-xs uppercase tracking-[0.3em] mb-4">
              {product.category}
            </p>
            <h1 className="text-4xl md:text-5xl font-serif text-neutral-900 mb-6">
              {product.name}
            </h1>
            <p className="text-2xl text-neutral-700 mb-6">
              {formatPrice(product.price)}
            </p>
            <p className="text-neutral-600 leading-relaxed mb-8">
              {product.description}
            </p>

            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                className="w-full bg-neutral-900 text-white py-4 font-semibold hover:bg-amber-600 transition rounded-lg"
              >
                {added ? "✓ Added to Cart" : "Add to Cart"}
              </button>

              <Link
                href="/custom"
                className="block w-full text-center border border-neutral-300 py-4 font-semibold hover:border-amber-600 transition rounded-lg"
              >
                Customize This Piece
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
