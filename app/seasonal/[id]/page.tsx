// app/seasonal/[id]/page.tsx

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCurrency } from "@/context/currency-context";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";

export default function SeasonalDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const { formatPrice } = useCurrency();

  const [model, setModel] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModel = async () => {
      const { data } = await supabase
        .from("models")
        .select("*")
        .eq("id", Number(id))
        .single();

      if (data) setModel(data);
      setLoading(false);
    };
    fetchModel();
  }, [id]);

  const galleryImages: string[] =
    model?.images && Array.isArray(model.images) && model.images.length > 0
      ? model.images
      : model?.image_url
      ? [model.image_url]
      : [];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper">
        <div className="w-8 h-8 border border-border border-t-ink rounded-full animate-spin" />
      </div>
    );
  }

  if (!model) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper">
        <div className="text-center">
          <h1 className="text-4xl font-serif text-ink mb-4">Design Not Found</h1>
          <Link href="/seasonal" className="text-stone hover:text-ink underline">
            ← Back to Seasonal Collection
          </Link>
        </div>
      </div>
    );
  }

  const pt = model?.subcategory || model?.product_type || "seasonal";

  return (
    <div className="min-h-screen bg-paper pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-[1500px] mx-auto">
        <Link
          href="/seasonal"
          className="text-[10px] uppercase tracking-[0.4em] text-stone hover:text-ink mb-12 inline-flex items-center gap-2 transition-colors"
        >
          <span>←</span> Back to Seasonal
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* LEFT: Images */}
          <div className="space-y-6">
            {galleryImages.length > 0 ? (
              galleryImages.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.15 }}
                  className="relative aspect-[3/4] overflow-hidden bg-cream"
                >
                  <img
                    src={img}
                    alt={`${model.name} ${i + 1}`}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                </motion.div>
              ))
            ) : (
              <div className="relative aspect-[3/4] bg-cream flex items-center justify-center">
                <p className="text-mist text-xs uppercase tracking-label">
                  No image available
                </p>
              </div>
            )}
          </div>

          {/* RIGHT: Details */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-[10px] tracking-[0.5em] text-bronze uppercase mb-6">
                {pt} · Bespoke
              </p>
              <h1 className="text-4xl md:text-6xl font-serif mb-8 text-ink leading-[1.05]">
                {model.name}
              </h1>
              <p className="text-3xl text-ink mb-12 pb-12 border-b border-border font-serif">
                {formatPrice(model.price)}
              </p>

              {model.description && (
                <div className="mb-12">
                  <h2 className="text-[10px] uppercase tracking-[0.4em] text-bronze mb-6 font-semibold">
                    Description
                  </h2>
                  <p className="text-graphite leading-[1.8] text-[15px] whitespace-pre-line">
                    {model.description}
                  </p>
                </div>
              )}

              <div className="border-t border-border pt-10 mb-12">
                <h2 className="text-[10px] uppercase tracking-[0.4em] text-bronze mb-6 font-semibold">
                  The PADO Promise
                </h2>
                <ul className="space-y-4 text-sm text-graphite">
                  {[
                    "Cut to your exact measurements",
                    "Hand-finished by master tailors",
                    "Dispatched within 3 weeks",
                    "Complimentary worldwide shipping",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-4">
                      <span className="w-6 h-[1px] bg-ink" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => {
                    // Redirect to appropriate customize page based on category
                    const category = model.category === "women" ? "women" : "men";
                    window.location.href = `/custom/${category}/${model.id}`;
                  }}
                  className="w-full bg-ink text-paper py-6 text-[11px] uppercase tracking-[0.4em] font-medium hover:bg-bronze transition-colors duration-500"
                >
                  Begin Your Order →
                </button>
                <a
                  href={`https://wa.me/16393840265?text=${encodeURIComponent(
                    `Hi, I'm interested in: ${model.name}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full border border-ink text-ink text-center py-6 text-[11px] uppercase tracking-[0.4em] font-medium hover:bg-ink hover:text-paper transition-all duration-500"
                >
                  Speak to a Tailor
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
