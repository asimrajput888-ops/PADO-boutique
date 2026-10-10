// app/custom/women/page.tsx

"use client";

import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useCurrency } from "@/context/currency-context";
import { motion } from "framer-motion";

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
    : "Choose a design, then customize fabric, silhouette, and measurements.";

  return (
    <div className="min-h-screen bg-paper pt-40 pb-32 px-6 md:px-16">
      <div className="max-w-[1400px] mx-auto">
        <Link
          href="/custom"
          className="text-[10px] uppercase tracking-label text-stone hover:text-ink mb-16 inline-flex items-center gap-2 transition-colors"
        >
          <span>←</span> Back to Collections
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24 md:mb-32 max-w-2xl mx-auto"
        >
          <p className="text-[10px] tracking-label text-stone uppercase mb-5">
            PADO Signature Designs
          </p>
          <h1 className="text-4xl md:text-6xl font-serif text-ink leading-[1.1] mb-6">
            {heading}
          </h1>
          <p className="text-stone text-base leading-relaxed">
            {subheading}
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-32">
            <div className="w-8 h-8 border border-border border-t-ink rounded-full animate-spin" />
          </div>
        ) : models.length === 0 ? (
          <div className="text-center py-32 border border-border">
            <p className="text-stone text-base mb-2">
              No {typeFilter ? `${typeFilter}s` : "designs"} available yet.
            </p>
            <p className="text-mist text-sm">
              New pieces are added regularly. Check back soon.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-14 md:gap-x-6 md:gap-y-20">
            {models.map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
              >
                <Link
                  href={`/custom/women/${m.id}`}
                  className="group block"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-cream mb-5">
                    {m.image_url ? (
                      <img
                        src={m.image_url}
                        alt={m.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1500ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.06]"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-mist text-[10px] uppercase tracking-label">
                        No image
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <p className="text-[10px] uppercase tracking-label text-stone">
                      {m.product_type || "Suit"}
                    </p>
                    <h3 className="text-[15px] md:text-base font-serif text-ink leading-snug group-hover:text-bronze transition-colors duration-500">
                      {m.name}
                    </h3>
                    <p className="text-sm text-graphite">
                      {formatPrice(m.price)}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function CustomWomenGallery() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-paper pt-40 flex justify-center">
          <div className="w-8 h-8 border border-border border-t-ink rounded-full animate-spin" />
        </div>
      }
    >
      <WomenGalleryContent />
    </Suspense>
  );
}
