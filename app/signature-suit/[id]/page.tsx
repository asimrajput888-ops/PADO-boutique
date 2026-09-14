// app/signature-suit/[id]/page.tsx

"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { useCurrency } from "@/context/currency-context";
import { getProductById } from "@/lib/products";
import { useParams } from "next/navigation";
import { useState } from "react";

const COLORS = [
  { id: "navy", name: "Navy", hex: "#1B2A4A" },
  { id: "charcoal", name: "Charcoal", hex: "#36454F" },
  { id: "black", name: "Black", hex: "#0A0A0A" },
  { id: "beige", name: "Beige", hex: "#D4C5A9" },
];

const SIZES = ["38", "40", "42", "44", "46"];

export default function SignatureSuitDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const product = getProductById(id);
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">
        <div className="text-center">
          <h1 className="text-4xl font-serif text-neutral-900 mb-4">
            Product Not Found
          </h1>
          <Link href="/signature-suit" className="text-amber-600 hover:underline">
            &larr; Back to Signature Suit
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      alert("Please select colour and size");
      return;
    }

    addToCart({
      id: `${product.id}-${selectedColor}-${selectedSize}`,
      name: `${product.name} (${selectedColor}, ${selectedSize})`,
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
          href="/signature-suit"
          className="text-sm text-neutral-500 hover:text-amber-600 mb-8 inline-block"
        >
          &larr; Back to Signature Suit
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
              Ready-to-Wear Signature
            </p>
            <h1 className="text-3xl md:text-4xl font-serif text-neutral-900 mb-4">
              {product.name}
            </h1>
            <p className="text-2xl text-neutral-700 mb-6">
              {formatPrice(product.price)}
            </p>
            <p className="text-neutral-600 leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Colour Selection */}
            <div className="mb-6">
              <p className="text-sm font-medium text-neutral-700 mb-3">
                Select Colour
              </p>
              <div className="flex gap-3">
                {COLORS.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-10 h-10 rounded-full border-2 transition ${
                      selectedColor === color.name
                        ? "border-amber-600 scale-110"
                        : "border-neutral-300 hover:border-amber-400"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
              {selectedColor && (
                <p className="text-xs text-neutral-500 mt-2">
                  Selected: {selectedColor}
                </p>
              )}
            </div>

            {/* Size Selection */}
            <div className="mb-8">
              <p className="text-sm font-medium text-neutral-700 mb-3">
                Select Size
              </p>
              <div className="flex gap-2 flex-wrap">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-lg text-sm font-medium transition ${
                      selectedSize === size
                        ? "border-amber-600 bg-amber-50 text-amber-700"
                        : "border-neutral-300 text-neutral-700 hover:border-amber-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-neutral-900 text-white py-4 font-semibold hover:bg-amber-600 transition rounded-lg"
            >
              {added ? "✓ Added to Cart" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
