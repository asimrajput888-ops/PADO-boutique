// components/home/signature-collection.tsx

import Link from "next/link";
import Image from "next/image";
import { products } from "@/lib/data";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  gender?: string;
  image: string;
  description: string;
}

export function SignatureCollection() {
  const list = (products as Product[]) || [];
  const filtered = list.filter((p: Product) => p.category === "signature").slice(0, 4);

  if (filtered.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-8">
      <div className="flex items-end justify-between mb-12">
        <div>
          <p className="text-[10px] tracking-[0.4em] text-neutral-500 uppercase mb-3">
            Signature Collection
          </p>
          <h2 className="text-3xl md:text-4xl font-serif text-neutral-900">
            Ready to Wear
          </h2>
        </div>
        <Link
          href="/signature-suit"
          className="hidden md:block text-[10px] tracking-[0.3em] uppercase border-b border-neutral-900 pb-1"
        >
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-10 md:gap-x-4">
        {filtered.map((product: Product, i: number) => (
          <Link
            key={product.id}
            href={`/shop/${product.id}`}
            className="group block"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 mb-3">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
              />
            </div>
            <h3 className="text-[13px] md:text-sm text-neutral-900 leading-snug mb-1">
              {product.name}
            </h3>
            <p className="text-[13px] md:text-sm text-neutral-500">
              ${product.price.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
