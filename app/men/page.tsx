// app/custom/men/page.tsx

import Image from "next/image";
import Link from "next/link";

const MEN_DESIGNS = [
  { id: "atelier-navy", name: "The Atelier Navy", price: 85000, image: "/images/editorial-men.png" },
  { id: "heritage-check", name: "The Heritage Check", price: 92000, image: "/images/product-alton.png" },
  { id: "modern-charcoal", name: "The Modern Charcoal", price: 78000, image: "/images/product-belgrave.png" },
  { id: "signature-black", name: "The Signature Black", price: 88000, image: "/images/product-camden.png" },
  { id: "classic-navy", name: "The Classic Navy", price: 82000, image: "/images/product-foxley.png" },
  { id: "heritage-brown", name: "The Heritage Brown", price: 95000, image: "/images/product-harrow.png" },
];

export default function CustomMenPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <Link href="/custom" className="text-sm text-neutral-500 hover:text-amber-600 mb-8 inline-block">
          &larr; Back to Collections
        </Link>

        <div className="text-center mb-16">
          <p className="text-amber-600 tracking-[0.3em] text-xs font-semibold mb-4 uppercase">
            Men's Signature Designs
          </p>
          <h1 className="text-4xl md:text-5xl font-serif mb-4">
            Exclusive Men's Collection
          </h1>
          <p className="text-neutral-500 max-w-xl mx-auto">
            Choose a design, provide your measurements, and we'll hand-craft it for you in 3 weeks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MEN_DESIGNS.map((design) => (
            <Link
              key={design.id}
              href={`/custom/men/${design.id}`}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 mb-4">
                <Image
                  src={design.image}
                  alt={design.name}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />
              </div>
              <h3 className="font-serif text-lg text-neutral-900 group-hover:text-amber-600 transition">
                {design.name}
              </h3>
              <p className="text-sm text-neutral-500">Rs. {design.price.toLocaleString()}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
