// app/signature-suit/women/page.tsx

import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function SignatureWomenPage() {
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("category", "signature")
    .order("created_at", { ascending: false });

  const normalized = (products || []).map((p: any) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    image: p.image_url,
    description: p.description,
  }));

  return (
    <div className="min-h-screen bg-[#FFF8F0] py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <Link
          href="/signature-suit"
          className="text-sm text-[#1E1E2C]/50 hover:text-[#5D1A24] mb-8 inline-block"
        >
          ← Back to Limited Designs
        </Link>

        <div className="text-center mb-16">
          <p className="text-[#C5A059] tracking-[0.3em] text-xs font-semibold mb-4 uppercase">
            Ready to Wear
          </p>
          <h1 className="text-4xl md:text-5xl font-serif mb-4 text-[#1E1E2C]">
            Women&apos;s Limited Designs
          </h1>
          <p className="text-[#1E1E2C]/50 max-w-xl mx-auto">
            Ready-to-wear suits in limited colors. Available for immediate delivery.
          </p>
        </div>

        {normalized.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {normalized.map((product: any) => (
              <Link
                key={product.id}
                href={`/signature-suit/${product.id}`}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 mb-4">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover group-hover:scale-105 transition duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-300 text-xs">
                      No image
                    </div>
                  )}
                </div>
                <h3 className="font-serif text-lg text-[#1E1E2C] group-hover:text-[#5D1A24] transition">
                  {product.name}
                </h3>
                <p className="text-sm text-[#1E1E2C]/50 mt-1">
                  Rs. {product.price?.toLocaleString()}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-[#1E1E2C]/40 text-lg">No products yet.</p>
            <p className="text-[#1E1E2C]/40 text-sm mt-2">
              Add products from Admin Panel with category &quot;signature&quot;.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
