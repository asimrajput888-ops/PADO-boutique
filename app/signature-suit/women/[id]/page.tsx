// app/signature-suit/women/[id]/page.tsx

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useCart } from "@/context/cart-context";
import { useCurrency } from "@/context/currency-context";

const WOMEN_SUITS = [
  { id: "signature-ivory-blazer", name: "Signature Ivory Blazer", price: 48000, image: "/images/editorial-women.png", colors: ["Ivory", "Cream", "White"] },
  { id: "signature-charcoal-suit", name: "Signature Charcoal Suit", price: 62000, image: "/images/editorial-women.png", colors: ["Charcoal", "Black", "Navy"] },
  { id: "signature-navy-blazer", name: "Signature Navy Blazer", price: 52000, image: "/images/editorial-women.png", colors: ["Navy", "Black", "Burgundy"] },
  { id: "signature-black-tuxedo", name: "Signature Black Tuxedo", price: 68000, image: "/images/editorial-women.png", colors: ["Black", "Charcoal"] },
];

const SIZES = ["XS", "S", "M", "L", "XL"];

export default function WomenSuitDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const suit = WOMEN_SUITS.find((s) => s.id === id);
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();

  const [selectedColor, setSelectedColor] = useState(suit?.colors[0] || "");
  const [selectedSize, setSelectedSize] = useState("");
  const [added, setAdded] = useState(false);

  if (!suit) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">
        <div className="text-center">
          <h1 className="text-4xl font-serif text-neutral-900 mb-4">Suit Not Found</h1>
          <Link href="/signature-suit/women" className="text-amber-600 hover:underline">
            ← Back to Women's Limited Designs
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size first");
      return;
    }
    addToCart({
      id: `${suit.id}-${selectedColor}-${selectedSize}`,
      name: `${suit.name} (${selectedColor}, ${selectedSize})`,
      price: suit.price,
      image: suit.image,
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <Link href="/signature-suit/women" className="text-sm text-neutral-500 hover:text-amber-600 mb-8 inline-block">
          ← Back to Women's Limited Designs
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* LEFT: Product Image */}
          <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
            <Image src={suit.image} alt={suit.name} fill className="object-cover" />
          </div>

          {/* RIGHT: Product Details */}
          <div className="flex flex-col justify-center">
            <p className="text-amber-600 text-xs uppercase tracking-[0.3em] mb-4">
              Ready to Wear
            </p>
            <h1 className="text-4xl md:text-5xl font-serif text-neutral-900 mb-6">
              {suit.name}
            </h1>
            <p className="text-3xl text-neutral-900 mb-8">
              {formatPrice(suit.price)}
            </p>

            {/* Color Selector */}
            <div className="mb-8">
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-3">Color</p>
              <div className="flex gap-3 flex-wrap">
                {suit.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-5 py-2 text-xs uppercase tracking-widest border transition-all ${
                      selectedColor === color
                        ? "border-neutral-900 bg-neutral-900 text-white"
                        : "border-neutral-300 text-neutral-700 hover:border-amber-600"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="mb-8">
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-3">Size</p>
              <div className="flex gap-3 flex-wrap">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-14 text-sm border transition-all ${
                      selectedSize === size
                        ? "border-neutral-900 bg-neutral-900 text-white"
                        : "border-neutral-300 text-neutral-700 hover:border-amber-600"
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
              className="w-full bg-neutral-900 text-white py-5 text-xs uppercase tracking-[0.3em] font-semibold hover:bg-amber-600 transition-all duration-300"
            >
              {added ? "✓ Added to Cart" : "Add to Cart"}
            </button>

            {/* Details */}
            <div className="mt-8 pt-8 border-t border-neutral-200 space-y-2 text-sm text-neutral-500">
              <p>• Free delivery in 2–3 business days</p>
              <p>• Ready-to-wear, no measurement required</p>
              <p>• Limited colors available</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
