// app/seasonal/[type]/page.tsx

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useCurrency } from "@/context/currency-context";

const COLLECTION_TITLES: Record<string, { title: string; subtitle: string }> = {
  halloween: {
    title: "Halloween Collection",
    subtitle: "Day of the Dead, Sugar Skull, Gothic themes",
  },
  superhero: {
    title: "Superhero Collection",
    subtitle: "Spiderman, Batman, Movie-inspired designs",
  },
  gothic: {
    title: "Gothic & Dark",
    subtitle: "Gothic rose, dark romantic, vampire aesthetics",
  },
  party: {
    title: "Party & Events",
    subtitle: "Bold colors, glitter, statement pieces",
  },
};

export default function SeasonalCollectionPage() {
  const params = useParams();
  const type = params?.type as string;
  const { formatPrice } = useCurrency();

  const [menModels, setMenModels] = useState<any[]>([]);
  const [womenModels, setWomenModels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const info = COLLECTION_TITLES[type] || {
    title: "Collection",
    subtitle: "",
  };

  useEffect(() => {
    const fetchModels = async () => {
      const { data } = await supabase
        .from("models")
        .select("*")
        .eq("subcategory", type)
        .order("created_at", { ascending: false });

      const all = data || [];
      setMenModels(all.filter((m) => m.category === "men"));
      setWomenModels(all.filter((m) => m.category === "women"));
      setLoading(false);
    };
    fetchModels();
  }, [type]);

  const hasAny = menModels.length > 0 || womenModels.length > 0;

  return (
    <div className="min-h-screen bg-white pt-32 pb-24 px-5 md:px-10">
      <div className="max-w-[1400px] mx-auto">

        <Link
          href="/seasonal"
          className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 hover:text-neutral-900 mb-8 inline-block"
        >
          ← Back to Seasonal
        </Link>

        {/* Header */}
        <div className="text-center mb-14 md:mb-20">
          <p className="text-[10px] tracking-[0.4em] text-neutral-500 uppercase mb-4">
            Seasonal Collection
          </p>
          <h1 className="text-3xl md:text-5xl font-serif mb-4 text-neutral-900">
            {info.title}
          </h1>
          <p className="text-neutral-500 max-w-md mx-auto text-sm">
            {info.subtitle}
          </p>
        </div>

        {loading ? (
          <p className="text-center text-neutral-400 py-20">Loading...</p>
        ) : !hasAny ? (
          <div className="text-center py-24 border border-neutral-200">
            <p className="text-neutral-400 text-base mb-2">
              No pieces in this collection yet.
            </p>
            <p className="text-neutral-400 text-sm mb-6">
              We make fully custom designs — send us your reference.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-neutral-900 text-white px-8 py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-neutral-700 transition"
            >
              Request Custom Order
            </Link>
          </div>
        ) : (
          <div className="space-y-20">
            {/* Men Section */}
            {menModels.length > 0 && (
              <section>
                <div className="mb-8">
                  <p className="text-[10px] tracking-[0.4em] text-neutral-500 uppercase mb-2">
                    For Him
                  </p>
                  <h2 className="text-2xl md:text-3xl font-serif text-neutral-900">
                    Men&apos;s {info.title}
                  </h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-10 md:gap-x-4 md:gap-y-14">
                  {menModels.map((m) => (
                    <Link
                      key={m.id}
                      href={`/custom/men/${m.id}`}
                      className="group block"
                    >
                      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 mb-3 md:mb-4">
                        {m.image_url && (
                          <img
                            src={m.image_url}
                            alt={m.name}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                            loading="lazy"
                          />
                        )}
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-400">
                          {m.product_type || "Suit"}
                        </p>
                        <h3 className="text-[13px] md:text-sm text-neutral-900 leading-snug group-hover:text-neutral-500 transition-colors">
                          {m.name}
                        </h3>
                        <p className="text-[13px] md:text-sm text-neutral-500">
                          {formatPrice(m.price)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Women Section */}
            {womenModels.length > 0 && (
              <section>
                <div className="mb-8">
                  <p className="text-[10px] tracking-[0.4em] text-neutral-500 uppercase mb-2">
                    For Her
                  </p>
                  <h2 className="text-2xl md:text-3xl font-serif text-neutral-900">
                    Women&apos;s {info.title}
                  </h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-10 md:gap-x-4 md:gap-y-14">
                  {womenModels.map((m) => (
                    <Link
                      key={m.id}
                      href={`/custom/women/${m.id}`}
                      className="group block"
                    >
                      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 mb-3 md:mb-4">
                        {m.image_url && (
                          <img
                            src={m.image_url}
                            alt={m.name}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                            loading="lazy"
                          />
                        )}
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-400">
                          {m.product_type || "Suit"}
                        </p>
                        <h3 className="text-[13px] md:text-sm text-neutral-900 leading-snug group-hover:text-neutral-500 transition-colors">
                          {m.name}
                        </h3>
                        <p className="text-[13px] md:text-sm text-neutral-500">
                          {formatPrice(m.price)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
