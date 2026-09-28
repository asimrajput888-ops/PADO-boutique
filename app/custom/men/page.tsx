// app/custom/men/page.tsx

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

// Fallback demo models (jab tak Supabase khali ho)
const DEMO_MODELS = [
  {
    id: "demo-1",
    name: "The Signature Navy",
    price: 55000,
    description: "Classic navy suit with peak lapel",
    image_url: "/images/garments/suit.webp",
  },
  {
    id: "demo-2",
    name: "The Charcoal Executive",
    price: 58000,
    description: "Modern charcoal suit with notch lapel",
    image_url: "/images/garments/blazer.webp",
  },
  {
    id: "demo-3",
    name: "The Black Tuxedo",
    price: 65000,
    description: "Formal black tuxedo with shawl lapel",
    image_url: "/images/garments/coat.webp",
  },
];

export default function CustomMenGallery() {
  const [models, setModels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModels = async () => {
      const { data } = await supabase.from("models").select("*").order("created_at", { ascending: false });
      
      // Agar Supabase mein models hain, toh woh use karein; warna demo models
      if (data && data.length > 0) {
        setModels(data);
      } else {
        setModels(DEMO_MODELS);
      }
      setLoading(false);
    };
    fetchModels();
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <Link href="/custom" className="text-sm text-neutral-500 hover:text-amber-600 mb-8 inline-block">← Back to Collections</Link>

        <div className="text-center mb-16">
          <p className="text-amber-600 tracking-[0.3em] text-xs font-semibold mb-4 uppercase">PADO Signature Designs</p>
          <h1 className="text-4xl md:text-5xl font-serif mb-4">Men's Bespoke Models</h1>
          <p className="text-neutral-500 max-w-xl mx-auto">
            Choose a model, then customize fabric, lapel, buttons, and measurements.
          </p>
        </div>

        {loading ? (
          <p className="text-center text-neutral-400">Loading models...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {models.map((m) => (
              <Link key={m.id} href={`/custom/men/${m.id}`} className="group cursor-pointer">
                <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 mb-4">
                  {m.image_url && (
                    <Image src={m.image_url} alt={m.name} fill className="object-cover group-hover:scale-105 transition duration-700" />
                  )}
                </div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-amber-600 mb-1">PADO Signature</p>
                <h3 className="font-serif text-lg text-neutral-900 group-hover:text-amber-600 transition">{m.name}</h3>
                <p className="text-sm text-neutral-500">Rs. {m.price?.toLocaleString()}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
