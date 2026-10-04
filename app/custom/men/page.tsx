// app/custom/men/page.tsx

"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useCurrency } from "@/context/currency-context";

export default function CustomMenGallery() {
  const [models, setModels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { formatPrice } = useCurrency();

  useEffect(() => {
    const fetchModels = async () => {
      const { data } = await supabase
        .from("models")
        .select("*")
        .eq("category", "men")
        .order("created_at", { ascending: false });

      setModels(data || []);
      setLoading(false);
    };
    fetchModels();
  }, []);

  return (
    <div className="min-h-screen bg-white pt-32 pb-24 px-5 md:px-10">
      <div className="max-w-[1400px] mx-auto">

        <Link
          href="/custom"
          className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 hover:text-neutral-900 mb-8 inline-block"
        >
          ← Back to Collections
        </Link>

        {/* Header */}
        <div className="text-center mb-14 md:mb-20">
          <p className="text-[10px] tracking-[0.4em] text-neutral-500 uppercase mb-4">
            PADO Signature Designs
          </p>
          <h1 className="text-3xl md:text-5xl font-serif mb-4 text-neutral-900">
            Men&apos;s Bespoke Models
          </h1>
          <p className="text-neutral-500 max-w-md mx-auto text-sm">
            Choose a model, then customize fabric, lapel, buttons, and measurements.
          </p>
        </div>

        {/* Grid */}
        {loading ? (
          <p className="text-center text-neutral-400 py-20">Loading models...</p>
        ) : models.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-neutral-400 text-base">No models available yet.</p>
            <p className="text-neutral-400 text-sm mt-2">
              Add models from the Admin Panel.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-10 md:gap-x-4 md:gap-y-14">
            {models.map((m) => (
              <Link
                key={m.id}
                href={`/custom/men/${m.id}`}
                className="group block"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 mb-3 md:mb-4">
                  {m.image_url ? (
                    <Image
                      src={m.image_url}
                      alt={m.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                      unoptimized
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
