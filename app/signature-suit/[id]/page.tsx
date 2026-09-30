// app/signature-suit/[id]/page.tsx

import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function SignatureDetailPage({
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

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/signature-suit"
          className="text-sm text-neutral-500 hover:text-amber-600 mb-8 inline-block"
        >
          ← Back to Limited Designs
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
            {product.image_url && (
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            )}
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-[10px] uppercase tracking-[0.3em] text-amber-600 mb-3">
              Ready to Wear
            </p>
            <h1 className="text-3xl md:text-4xl font-serif mb-4 text-neutral-900">
              {product.name}
            </h1>
            <p className="text-2xl text-neutral-700 mb-6">
              Rs. {product.price?.toLocaleString()}
            </p>
            <p className="text-neutral-600 leading-relaxed mb-8">
              {product.description}
            </p>

            <a
              href={`https://wa.me/91XXXXXXXXXX?text=Hi, I'm interested in: ${product.name}`}
              className="bg-amber-600 text-white text-center px-8 py-4 font-semibold hover:bg-amber-700 transition tracking-widest text-xs uppercase"
            >
              Enquire on WhatsApp
            </a>

            <Link
              href="/custom/men"
              className="mt-4 text-center border border-neutral-300 text-neutral-700 px-8 py-4 font-semibold hover:border-amber-600 hover:text-amber-600 transition tracking-widest text-xs uppercase"
            >
              Design Something Similar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
