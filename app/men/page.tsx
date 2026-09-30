// app/men/page.tsx

import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function MenPage() {
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("category", "men")
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-amber-600 tracking-[0.3em] text-xs font-semibold mb-4 uppercase">
            Men&apos;s Collection
          </p>
          <h1 className="text-4xl md:text-5xl font-serif mb-4">For Him</h1>
        </div>

        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product: any) => (
              <Link
                key={product.id}
                href={`/shop/${product.id}`}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 mb-4">
                  {product.image_url && (
                    <Image
                      src={product.image_url}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-700"
                    />
                  )}
                </div>
                <h3 className="font-serif text-lg text-neutral-900 group-hover:text-amber-600 transition">
                  {product.name}
                </h3>
                <p className="text-sm text-neutral-500">
                  Rs. {product.price?.toLocaleString()}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-neutral-400 text-lg">No products yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
