// app/seasonal/page.tsx

"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useCurrency } from "@/context/currency-context";

const FILTERS = [
  { id: "all", name: "All" },
  { id: "halloween", name: "Halloween" },
  { id: "superhero", name: "Superhero" },
  { id: "gothic", name: "Gothic" },
  { id: "movie", name: "Movie-Inspired" },
  { id: "party", name: "Party & Events" },
];

export default function SeasonalPage() {
  const searchParams = useSearchParams();
  const initialFilter = searchParams.get("type") || "all";

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState(initialFilter);
  const { formatPrice } = useCurrency();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      let query = supabase
        .from("products")
        .select("*")
        .eq("category", "seasonal")
        .order("created_at", { ascending: false });

      if (activeFilter !== "all") {
        query = query.eq("subcategory", activeFilter);
      }

      const { data } = await query;
      setProducts(data || []);
      setLoading(false);
    };
    fetchProducts();
  }, [activeFilter]);

  return (
    <div className="min-h-screen bg-white pt-32 pb-24 px-5 md:px-10">
      <div className="max-w-[1400px] mx-auto">

        {/* Header */}
        <div className="text-center mb-14 md:mb-20">
          <p className="text-[10px] tracking-[0.4em] text-neutral-500 uppercase mb-4">
            Special Orders
          </p>
          <h1 className="text-3xl md:text-5xl font-serif mb-4 text-neutral-900">
            Seasonal &amp; Novelty
          </h1>
          <p className="text-neutral-500 max-w-xl mx-auto text-sm">
            Custom-made suits for Halloween, cosplay, themed events, and one-of-a-kind occasions.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-14">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`text-[10px] uppercase tracking-[0.25em] px-4 py-2 transition-colors duration-300 ${
                activeFilter === f.id
                  ? "text-neutral-900 border-b border-neutral-900"
                  : "text-neutral-400 hover:text-neutral-900"
              }`}
            >
              {f.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <p className="text-center text-neutral-400 py-20">Loading...</p>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-10 md:gap-x-4 md:gap-y-14">
            {products.map((product: any) => (
              <Link
                key={product.id}
                href={`/shop/${product.id}`}
                className="group block"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 mb-3 md:mb-4">
                  {product.image_url ? (
                    <Image
                      src={product.image_url}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-300 text-[10px] uppercase tracking-widest">
                      No image
                    </div>
                  )}
                </div>
                <div className="space-y-1">
                  <h3 className="text-[13px] md:text-sm text-neutral-900 leading-snug group-hover:text-neutral-500 transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="text-[13px] md:text-sm text-neutral-500">
                    {formatPrice(product.price)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-neutral-400 text-base">No products in this collection yet.</p>
            <p className="text-neutral-400 text-sm mt-2">
              Contact us to order a custom piece.
            </p>
            <Link
              href="/contact"
              className="inline-block mt-6 bg-neutral-900 text-white px-8 py-3 text-[11px] tracking-[0.3em] uppercase hover:bg-neutral-700 transition"
            >
              Request Custom Order
            </Link>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-24 text-center border-t border-neutral-200 pt-16">
          <p className="text-[10px] tracking-[0.4em] text-neutral-500 uppercase mb-4">
            Can&apos;t find what you&apos;re looking for?
          </p>
          <h2 className="text-2xl md:text-3xl font-serif mb-6 text-neutral-900">
            We make fully custom designs
          </h2>
          <p className="text-neutral-500 max-w-md mx-auto text-sm mb-8">
            Send us your reference images — superhero suits, movie-inspired tuxedos, gothic styles, or anything you can imagine.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-neutral-900 text-white px-10 py-4 text-[11px] tracking-[0.3em] uppercase hover:bg-neutral-700 transition"
          >
            Start Custom Order
          </Link>
        </div>

      </div>
    </div>
  );
}
