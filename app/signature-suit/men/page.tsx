// app/signature-suit/men/page.tsx

import Link from "next/link";
import Image from "next/image";

const MEN_SUITS = [
  { id: "signature-navy-single", name: "Signature Navy — Single Breasted", price: 55000, image: "/images/garments/suit.webp", colors: ["Navy", "Charcoal", "Black", "Beige"] },
  { id: "signature-charcoal-double", name: "Signature Charcoal — Double Breasted", price: 65000, image: "/images/garments/suit.webp", colors: ["Charcoal", "Navy", "Black"] },
  { id: "signature-black-single", name: "Signature Black — Single Breasted", price: 58000, image: "/images/garments/suit.webp", colors: ["Black", "Navy", "Charcoal"] },
  { id: "signature-beige-double", name: "Signature Beige — Double Breasted", price: 62000, image: "/images/garments/suit.webp", colors: ["Beige", "Cream", "Sand"] },
];

export default function SignatureSuitMenPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] py-32 px-6">
      <div className="max-w-7xl mx-auto">
        
        <Link href="/signature-suit" className="text-sm text-neutral-500 hover:text-amber-600 mb-8 inline-block">
          ← Back to Limited Designs
        </Link>

        <div className="text-center mb-16">
          <p className="text-amber-600 tracking-[0.3em] text-xs font-semibold mb-4 uppercase">
            Ready to Wear
          </p>
          <h1 className="text-4xl md:text-5xl font-serif mb-4">
            Men's Limited Designs
          </h1>
          <p className="text-neutral-500 max-w-xl mx-auto">
            Ready-to-wear suits in limited colors. Available for immediate delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {MEN_SUITS.map((suit) => (
            <Link key={suit.id} href={`/signature-suit/men/${suit.id}`} className="group cursor-pointer">
              <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 mb-4">
                <Image src={suit.image} alt={suit.name} fill className="object-cover group-hover:scale-105 transition duration-700" />
              </div>
              <h3 className="font-serif text-lg text-neutral-900 group-hover:text-amber-600 transition mb-2">
                {suit.name}
              </h3>
              <p className="text-sm text-neutral-500 mb-2">Rs. {suit.price.toLocaleString()}</p>
              <div className="flex gap-1 flex-wrap">
                {suit.colors.map((c) => (
                  <span key={c} className="text-[10px] uppercase tracking-widest text-neutral-400 border border-neutral-200 px-2 py-0.5">
                    {c}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
