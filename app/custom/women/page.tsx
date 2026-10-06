// app/custom/women/page.tsx

"use client";

import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useCurrency } from "@/context/currency-context";

const TYPE_LABELS: Record<string, string> = {
  suit: "Custom Suits",
  blazer: "Custom Blazers",
  coat: "Custom Coats",
  shirt: "Custom Shirts",
  trouser: "Custom Trousers",
  vest: "Custom Vests",
};

function WomenGalleryContent() {
  const searchParams = useSearchParams();
  const typeFilter = searchParams.get("type") || "";

  const [models, setModels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { formatPrice } = useCurrency();

  useEffect(() => {
    const fetchModels = async () => {
      setLoading(true);
      let query = supabase
        .from("models")
        .select("*")
        .eq("category", "women")
        .order("created_at", { ascending: false });

      if (typeFilter) {
        query = query.eq("product_type", typeFilter);
      }

      const { data } = await query;
      setModels(data || []);
      setLoading(false);
    };
    fetchModels();
  }, [typeFilter]);

  const heading = typeFilter
    ? TYPE_LABELS[typeFilter] || "Women's Collection"
    : "Women's Bespoke Collection";

  const subheading = typeFilter
    ? `Custom-made ${typeFilter}s tailored to your exact measurements.`
    : "Choose a model, then customize fabric, silhouette, and measurements.";

  return (
    <div className="min-h-screen bg-white pt-32 pb-24 px-5 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        <Link
          href="/custom"
          className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 hover:text-neutral-900 mb-8 inline-block"
        >
          ← Back to Collections
        </Link>

        <div className="text-center mb-14 md:mb-20">
          <p className="text-[10px] tracking-[0.4em] text-neutral-500 uppercase mb-4">
            PADO Signature Designs
          </p>
          <h1 className="text-3xl md:text-5xl font-serif mb-4 text-neutral-900">
            {heading}
          </h1>
          <p className="text-neutral-500 max-w-md mx-auto text-sm">
            {subheading}
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-neutral-300 border-t-neutral-900 rounded-full animate-spin" />
          </div>
        ) : models.length === 0 ? (
          <div className="text-center py-24 border border-neutral-200">
            <p className="text-neutral-400 text-base mb-2">
              No {typeFilter ? `${typeFilter}s` : "models"} available yet.
            </p>
            <p className="text-neutral-400 text-sm">
              New pieces are added regularly. Check back soon.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-10 md:gap-x-4 md:gap-y-14">
            {models.map((m) => (
              <Link
                key={m.id}
                href={`/custom/women/${m.id}`}
                className="group block"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 mb-3 md:mb-4">
                  {m.image_url ? (
                    <img
                      src={m.image_url}
                      alt={m.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-300 text-[10px] uppercase tracking-widest">
                      No image
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-400">
                    {m.product_type || "Suit"}
                  </p>
                  <h3 className="text-[13px] md:text-sm text-neutral-900 leading-snug transition-colors duration-300 group-hover:text-neutral-500">
                    {m.name}
                  </h3>
                  <p className="text-[13px] md:text-sm text-neutral-500">
                    {formatPrice(m.price)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function CustomWomenGallery() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white pt-40 flex justify-center">
        <div className="w-8 h-8 border-2 border-neutral-300 border-t-neutral-900 rounded-full animate-spin" />
      </div>
    }>
      <WomenGalleryContent />
    </Suspense>
  );
}
