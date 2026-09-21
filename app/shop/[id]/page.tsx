// app/shop/[id]/page.tsx

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useCart } from "@/context/cart-context";
import { useCurrency } from "@/context/currency-context";
import { supabase } from "@/lib/supabase";
import { getProductById } from "@/lib/products";

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      // Pehle Supabase se try karein
      const { data: supabaseProduct } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (supabaseProduct) {
        setProduct({
          id: supabaseProduct.id,
          name: supabaseProduct.name,
          price: supabaseProduct.price,
          image: supabaseProduct.image_url,
          category: supabaseProduct.category,
          description: supabaseProduct.description,
        });
      } else {
        // Fallback: lib/products.ts se
        const fallback = getProductById(id);
        if (fallback) {
          setProduct({
            id: fallback.id,
            name: fallback.name,
            price: fallback.price,
            image: fallback.image,
            category: fallback.category,
            description: fallback.description,
          });
        }
      }
      setLoading(false);
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">
        <p className="text-neutral-400">Loading...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">
        <div className="text-center">
          <h1 className="text-4xl font-serif text-neutral-900 mb-4">
            Product Not Found
          </h1>
          <Link href="/shop" className="text-amber-600 hover:underline">
            ← Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  // Determine product type
  const isReadyToWear = product.category === "signature";
  const isCustomMade = product.category === "men" || product.category === "women";

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
        <Link
          href="/shop"
          className="text-sm text-neutral-500 hover:text-amber-600 mb-8 inline-block"
        >
          ← Back to Shop
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* LEFT: Product Image */}
          <div className="relative aspect-[3/4] bg-neutral-100 overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          {/* RIGHT: Product Details */}
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
              {/* CUSTOM MADE: Only Customize Button */}
              {isCustomMade && (
                <>
                  <Link
                    href={`/${product.category}/${product.id}`}
                    className="block w-full text-center bg-amber-600 text-white py-5 text-xs uppercase tracking-[0.3em] font-semibold hover:bg-neutral-900 transition"
                  >
                    Start Customizing
                  </Link>
                  <p className="text-xs text-neutral-500 text-center">
                    Customize style, fabric, details, and measurements
                  </p>
                </>
              )}

              {/* READY TO WEAR: Only Add to Cart Button */}
              {isReadyToWear && (
                <>
                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-neutral-900 text-white py-5 text-xs uppercase tracking-[0.3em] font-semibold hover:bg-amber-600 transition"
                  >
                    {added ? "✓ Added to Cart" : "Add to Cart"}
                  </button>
                  <p className="text-xs text-neutral-500 text-center">
                    Ready to wear — immediate delivery
                  </p>
                </>
              )}

              {/* FALLBACK: If category is not set, show both */}
              {!isCustomMade && !isReadyToWear && (
                <>
                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-neutral-900 text-white py-5 text-xs uppercase tracking-[0.3em] font-semibold hover:bg-amber-600 transition"
                  >
                    {added ? "✓ Added to Cart" : "Add to Cart"}
                  </button>
                  <Link
                    href={`/custom/${product.id}`}
                    className="block w-full text-center border border-neutral-300 py-5 text-xs uppercase tracking-[0.3em] font-semibold hover:border-amber-600 hover:text-amber-600 transition"
                  >
                    Customize This Piece
                  </Link>
                </>
              )}
            </div>

            {/* Details */}
            <div className="mt-8 pt-8 border-t border-neutral-200 space-y-2 text-sm text-neutral-500">
              <p>• Free delivery worldwide</p>
              <p>• Bespoke orders crafted in 3 weeks</p>
              <p>• Handcrafted by master tailors</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
