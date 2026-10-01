// app/shop/[id]/page.tsx

import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!product) notFound();

  // Multiple images — agar `images` column hai to use karo
  const images: string[] =
    product.images && Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : product.image_url
      ? [product.image_url]
      : [];

  return (
    <div className="min-h-screen bg-white pt-32 pb-24 px-5 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        <Link
          href="/shop"
          className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 hover:text-neutral-900 mb-10 inline-block"
        >
          ← Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Images Gallery — Sab 8 images */}
          <div className="space-y-3">
            {images.length > 0 ? (
              images.map((img, i) => (
                <div
                  key={i}
                  className="relative aspect-[3/4] overflow-hidden bg-neutral-100"
                >
                  <Image
                    src={img}
                    alt={`${product.name} ${i + 1}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    priority={i === 0}
                  />
                </div>
              ))
            ) : (
              <div className="aspect-[3/4] bg-neutral-100 flex items-center justify-center text-neutral-400">
                No image
              </div>
            )}
          </div>

          {/* Product Info — sticky */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-4">
              {product.category}
            </p>
            <h1 className="text-3xl md:text-4xl font-serif mb-4 text-neutral-900 leading-tight">
              {product.name}
            </h1>
            <p className="text-xl text-neutral-900 mb-8">
              Rs. {product.price?.toLocaleString()}
            </p>

            <p className="text-neutral-600 leading-relaxed mb-8 text-sm whitespace-pre-line">
              {product.description}
            </p>

            <div className="space-y-4 mb-10">
              <a
                href={`https://wa.me/923001234567?text=Hi, I'm interested in: ${encodeURIComponent(product.name)}`}
                className="block w-full bg-neutral-900 text-white text-center py-4 text-[11px] font-medium tracking-[0.3em] uppercase hover:bg-neutral-700 transition"
              >
                Enquire on WhatsApp
              </a>
              <Link
                href="/custom/men"
                className="block w-full border border-neutral-300 text-neutral-900 text-center py-4 text-[11px] font-medium tracking-[0.3em] uppercase hover:border-neutral-900 transition"
              >
                Design Something Similar
              </Link>
            </div>

            <div className="border-t border-neutral-200 pt-6 space-y-3 text-xs text-neutral-500">
              <p>Handcrafted in limited quantities.</p>
              <p>Dispatched within 2-3 business days.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
