// app/custom/women/page.tsx

import Link from "next/link";
import Image from "next/image";

// PADO Women's Signature Designs
const WOMEN_DESIGNS = [
  {
    id: "silk-loungewear",
    name: "The Silk Loungewear",
    price: 28000,
    image: "/images/editorial-women.png",
    description: "Pure silk loungewear set for effortless luxury at home.",
  },
  {
    id: "emerald-gown",
    name: "The Emerald Gown",
    price: 120000,
    image: "/images/product-kensington.png",
    description: "Hand-embroidered evening gown in emerald silk.",
  },
  {
    id: "ivory-chiffon",
    name: "The Ivory Chiffon",
    price: 65000,
    image: "/images/product-marlow.png",
    description: "Delicate chiffon with subtle gold detailing.",
  },
  {
    id: "gold-jacket",
    name: "The Gold Embroidered Jacket",
    price: 55000,
    image: "/images/editorial-fabrics.png",
    description: "Statement jacket with hand-embroidered gold motifs.",
  },
  {
    id: "atelier-blazer",
    name: "The Atelier Blazer",
    price: 75000,
    image: "/images/editorial-custom.png",
    description: "A tailored women's blazer, structured yet soft.",
  },
  {
    id: "heritage-coat",
    name: "The Heritage Coat",
    price: 95000,
    image: "/images/product-belgrave.png",
    description: "Full-length wool coat with a timeless silhouette.",
  },
];

export default function WomenCustomGallery() {
  return (
    <div className="min-h-screen bg-[#FFF8F0] py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Back Link */}
        <Link
          href="/custom"
          className="text-sm text-neutral-500 hover:text-[#5D1A24] mb-8 inline-block"
        >
          &larr; Back to Collections
        </Link>

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#C5A059] tracking-[0.3em] text-xs font-semibold mb-4 uppercase">
            Women's Signature
          </p>
          <h1 className="text-4xl md:text-5xl font-serif mb-4 text-[#1E1E2C]">
            The Couture Collection
          </h1>
          <p className="text-[#1E1E2C]/60 max-w-xl mx-auto">
            Timeless designs, hand-crafted for you. Choose a design and provide your measurements — we'll handle the rest.
          </p>
        </div>

        {/* Designs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WOMEN_DESIGNS.map((design) => (
            <Link
              key={design.id}
              href={`/custom/women/${design.id}`}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-[#1E1E2C]/5 border border-[#1E1E2C]/10 mb-4">
                <Image
                  src={design.image}
                  alt={design.name}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-700"
                />
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="bg-white text-[#5D1A24] px-4 py-2 text-xs uppercase tracking-widest font-semibold inline-block">
                    View Design
                  </span>
                </div>
              </div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] mb-1">
                PADO Signature
              </p>
              <h3 className="font-serif text-lg text-[#1E1E2C] group-hover:text-[#5D1A24] transition">
                {design.name}
              </h3>
              <p className="text-sm text-[#1E1E2C]/60">
                PKR {design.price.toLocaleString()}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
