// app/custom/men/page.tsx

import Link from "next/link";
import Image from "next/image";

// PADO Men's Signature Designs
const MEN_DESIGNS = [
  {
    id: "atelier-navy",
    name: "The Atelier Navy",
    price: 85000,
    image: "/images/editorial-custom.png",
    description: "Hand-stitched peak lapels, subtle ticket pocket, and a bespoke navy wool.",
  },
  {
    id: "heritage-check",
    name: "The Heritage Check",
    price: 92000,
    image: "/images/editorial-fabrics.png",
    description: "Classic check pattern with elbow patches and a soft flannel finish.",
  },
  {
    id: "modern-charcoal",
    name: "The Modern Charcoal",
    price: 88000,
    image: "/images/product-belgrave.png",
    description: "Structured shoulders, clean lines, and a modern slim fit.",
  },
  {
    id: "signature-midnight",
    name: "The Signature Midnight",
    price: 95000,
    image: "/images/product-camden.png",
    description: "Deep midnight blue with a satin shawl lapel — perfect for evening wear.",
  },
  {
    id: "harrow-tweed",
    name: "The Harrow Tweed",
    price: 82000,
    image: "/images/product-harrow.png",
    description: "English tweed with a heritage feel, tailored for the modern gentleman.",
  },
  {
    id: "kensington-wool",
    name: "The Kensington Wool",
    price: 90000,
    image: "/images/product-kensington.png",
    description: "Pure wool with a subtle sheen, ideal for both office and evening.",
  },
];

export default function MenCustomGallery() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Back Link */}
        <Link
          href="/custom"
          className="text-sm text-neutral-500 hover:text-amber-600 mb-8 inline-block"
        >
          &larr; Back to Collections
        </Link>

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-amber-600 tracking-[0.3em] text-xs font-semibold mb-4 uppercase">
            Men's Signature
          </p>
          <h1 className="text-4xl md:text-5xl font-serif mb-4">
            The Atelier Collection
          </h1>
          <p className="text-neutral-500 max-w-xl mx-auto">
            Exclusive designs crafted by PADO. Choose a design and provide your measurements — we'll handle the rest.
          </p>
        </div>

        {/* Designs Grid */}
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
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="bg-white text-neutral-900 px-4 py-2 text-xs uppercase tracking-widest font-semibold inline-block">
                    View Design
                  </span>
                </div>
              </div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-amber-600 mb-1">
                PADO Signature
              </p>
              <h3 className="font-serif text-lg text-neutral-900 group-hover:text-amber-600 transition">
                {design.name}
              </h3>
              <p className="text-sm text-neutral-500">
                Rs. {design.price.toLocaleString()}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
