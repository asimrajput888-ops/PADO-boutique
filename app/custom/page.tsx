// app/custom/page.tsx

import Image from "next/image";
import Link from "next/link";

const SIGNATURE_DESIGNS = [
  {
    id: "atelier-navy",
    name: "The Atelier Navy",
    price: 85000,
    image: "/images/editorial-custom.png",
  },
  {
    id: "heritage-check",
    name: "The Heritage Check",
    price: 92000,
    image: "/images/editorial-fabrics.png",
  },
  {
    id: "modern-ivory",
    name: "The Modern Ivory",
    price: 78000,
    image: "/images/product-alton.png",
  },
  {
    id: "signature-charcoal",
    name: "The Signature Charcoal",
    price: 88000,
    image: "/images/product-belgrave.png",
  },
  {
    id: "midnight-blue",
    name: "The Midnight Blue",
    price: 95000,
    image: "/images/product-camden.png",
  },
  {
    id: "heritage-tweed",
    name: "The Heritage Tweed",
    price: 89000,
    image: "/images/product-foxley.png",
  },
];

export default function CustomGalleryPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-amber-600 tracking-[0.3em] text-xs font-semibold mb-4 uppercase">
            PADO Signature Designs
          </p>
          <h1 className="text-4xl md:text-5xl font-serif mb-4">
            Exclusive Designer Collection
          </h1>
          <p className="text-neutral-500 max-w-xl mx-auto">
            One-of-a-kind designs crafted by PADO. Choose a design, provide your
            measurements, and we&apos;ll tailor it to you.
          </p>
        </div>

        {/* Designs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SIGNATURE_DESIGNS.map((design) => (
            <Link
              key={design.id}
              href={`/custom/${design.id}`}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 mb-4">
                <Image
                  src={design.image}
                  alt={design.name}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-700"
                />
              </div>
              <h3 className="text-lg font-serif text-neutral-900 group-hover:text-amber-600 transition">
                {design.name}
              </h3>
              <p className="text-neutral-500 text-sm">
                Rs. {design.price.toLocaleString()}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
