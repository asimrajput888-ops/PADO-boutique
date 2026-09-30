// app/shop/page.tsx

import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function ShopPage() {
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  const normalizedProducts = (products || []).map((p: any) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    image: p.image_url,
    category: p.category,
    description: p.description,
  }));

  return (
    <div className="min-h-screen bg-white pt-32 pb-24 px-5 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header */}
        <div className="text-center mb-14 md:mb-20">
          <p className="text-[10px] tracking-[0.4em] text-neutral-500 uppercase mb-4">
            The Collection
          </p>
          <h1 className="text-3xl md:text-5xl font-serif mb-4 text-neutral-900">
            All Products
          </h1>
          <p className="text-neutral-500 max-w-md mx-auto text-sm">
            Explore our complete collection of bespoke tailoring and ready-to-wear garments.
          </p>
        </div>

        {/* Products Grid — Suitsupply style: 2 col mobile, 3 tablet, 4 desktop */}
        {normalizedProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-10 md:gap-x-4 md:gap-y-14">
            {normalizedProducts.map((product: any) => (
              <Link
                key={product.id}
                href={`/shop/${product.id}`}
                className="group block"
              >
                {/* Image — subtle bg + slow zoom */}
                <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 mb-3 md:mb-4">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-300 text-[10px] uppercase tracking-widest">
                      No image
                    </div>
                  )}
                </div>

                {/* Text — minimal */}
                <div className="space-y-1">
                  <h3 className="text-[13px] md:text-sm text-neutral-900 leading-snug transition-colors duration-300 group-hover:text-neutral-500">
                    {product.name}
                  </h3>
                  <p className="text-[13px] md:text-sm text-neutral-500">
                    Rs. {product.price?.toLocaleString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-neutral-400 text-base">No products available yet.</p>
            <p className="text-neutral-400 text-sm mt-2">
              Add products from the Admin Panel.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
