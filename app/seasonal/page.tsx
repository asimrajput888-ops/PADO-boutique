// app/seasonal/page.tsx

"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useCurrency } from "@/context/currency-context";
import { motion } from "framer-motion";

const TYPE_LABELS: Record<string, string> = {
  halloween: "Halloween Collection",
  superhero: "Superhero Suits",
  gothic: "Gothic & Dark",
  movie: "Movie-Inspired",
  party: "Party & Events",
};

const SEASONAL_CATEGORIES = [
  {
    type: "halloween",
    name: "Halloween",
    href: "/seasonal?type=halloween",
    image: "/images/seasonal/halloween.webp",
    label: "Limited Edition",
  },
  {
    type: "superhero",
    name: "Superhero",
    href: "/seasonal?type=superhero",
    image: "/images/seasonal/superhero.jpg",
    label: "Bold & Dramatic",
  },
  {
    type: "gothic",
    name: "Gothic & Dark",
    href: "/seasonal?type=gothic",
    image: "/images/seasonal/gothic.jpg",
    label: "Moody Aesthetic",
  },
  {
    type: "party",
    name: "Party & Events",
    href: "/seasonal?type=party",
    image: "/images/seasonal/party.webp",
    label: "Evening Wear",
  },
];

function SeasonalContent() {
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
        .eq("category", "seasonal")
        .order("created_at", { ascending: false });

      // Filter by subcategory (your DB uses 'subcategory' column)
      if (typeFilter) {
        query = query.eq("subcategory", typeFilter);
      }

      const { data, error } = await query;

      if (error) {
        // Fallback: try product_type if subcategory column doesn't exist
        let fallbackQuery = supabase
          .from("models")
          .select("*")
          .eq("category", "seasonal")
          .order("created_at", { ascending: false });

        if (typeFilter) {
          fallbackQuery = fallbackQuery.eq("product_type", typeFilter);
        }

        const fallback = await fallbackQuery;
        setModels(fallback.data || []);
      } else {
        setModels(data || []);
      }

      setLoading(false);
    };
    fetchModels();
  }, [typeFilter]);

  const heading = typeFilter
    ? TYPE_LABELS[typeFilter] || "Seasonal Collection"
    : "Seasonal & Novelty";

  const subheading = typeFilter
    ? `Custom-made ${TYPE_LABELS[typeFilter] || typeFilter} pieces, tailored to you.`
    : "Bold, unconventional, and handcrafted. For those who stand out.";

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
            PADO Seasonal
          </p>
          <h1 className="text-4xl md:text-6xl font-serif text-ink leading-[1.1] mb-6">
            {heading}
          </h1>
          <p className="text-stone text-base leading-relaxed">{subheading}</p>
        </motion.div>

        {/* Category cards — show only when no filter */}
        {!typeFilter && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-24">
            {SEASONAL_CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.type}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <Link href={cat.href} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden bg-cream mb-5">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-cover object-top transition-transform duration-[1500ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.06]"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="text-[10px] tracking-label text-paper/70 uppercase mb-2">
                        {cat.label}
                      </p>
                      <h3 className="text-2xl font-serif text-paper">
                        {cat.name}
                      </h3>
                    </div>
                  </div>
                  <span className="text-[10px] tracking-label text-ink uppercase link-underline">
                    Explore →
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* Filtered models grid */}
        {typeFilter && (
          <>
            {loading ? (
              <div className="flex justify-center py-32">
                <div className="w-8 h-8 border border-border border-t-ink rounded-full animate-spin" />
              </div>
            ) : models.length === 0 ? (
              <div className="text-center py-32 border border-border">
                <p className="text-stone text-base mb-2">
                  No pieces in this collection yet.
                </p>
                <p className="text-mist text-sm">
                  New designs are added regularly. Check back soon.
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
                      href={`/seasonal/${m.id}`}
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
                          {m.subcategory || m.product_type || "Seasonal"}
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
          </>
        )}
      </div>
    </div>
  );
}

export default function SeasonalPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-paper pt-40 flex justify-center">
          <div className="w-8 h-8 border border-border border-t-ink rounded-full animate-spin" />
        </div>
      }
    >
      <SeasonalContent />
    </Suspense>
  );
}
