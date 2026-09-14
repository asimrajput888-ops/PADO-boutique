// app/custom/women/page.tsx

import Image from "next/image";
import Link from "next/link";

const WOMEN_DESIGNS = [
  { id: "ivory-grace", name: "The Ivory Grace", price: 95000, image: "/images/editorial-women.png" },
  { id: "emerald-couture", name: "The Emerald Couture", price: 125000, image: "/images/product-kensington.png" },
  { id: "silk-serenity", name: "The Silk Serenity", price: 78000, image: "/images/product-marlow.png" },
  { id: "midnight-elegance", name: "The Midnight Elegance", price: 110000, image: "/images/editorial-fabrics.png" },
  { id: "rose-blush", name: "The Rose Blush", price: 88000, image: "/images/editorial-custom.png" },
  { id: "golden-hour", name: "The Golden Hour", price: 135000, image: "/images/hero.png" },
];

export default function CustomWomenPage() {
  return (
    <div className="min-h-screen bg-[#FFF8F0] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <Link href="/custom" className="text-sm text-neutral-500 hover:text-[#5D1A24] mb-8 inline-block">
          &larr; Back to Collections
        </Link>

        <div className="text-center mb-16">
          <p className="text-[#C5A059] tracking-[0.3em] text-xs font-semibold mb-4 uppercase">
            Women's Signature Designs
          </p>
          <h1 className="text-4xl md:text-5xl font-serif mb-4 text-[#5D1A24]">
            Exclusive Women's Collection
          </h1>
          <p className="text-neutral-500 max-w-xl mx-auto">
            Choose a design, provide your measurements, and we'll hand-craft it for you in 3 weeks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WOMEN_DESIGNS.map((design) => (
            <Link
              key={design.id}
              href={`/custom/women/${design.id}`}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 mb-4">
                <Image
                  src={design.image}
                  alt={design.name}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-[#5D1A24]/0 group-hover:bg-[#5D1A24]/10 transition-colors duration-500" />
              </div>
              <h3 className="font-serif text-lg text-[#1E1E2C] group-hover:text-[#5D1A24] transition">
                {design.name}
              </h3>
              <p className="text-sm text-neutral-500">PKR {design.price.toLocaleString()}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
