// app/signature-suit/women/page.tsx

import Link from "next/link";
import Image from "next/image";

const WOMEN_SUITS = [
  { id: "signature-ivory-blazer", name: "Signature Ivory Blazer", price: 48000, image: "/images/editorial-women.png", colors: ["Ivory", "Cream", "White"] },
  { id: "signature-charcoal-suit", name: "Signature Charcoal Suit", price: 62000, image: "/images/editorial-women.png", colors: ["Charcoal", "Black", "Navy"] },
  { id: "signature-navy-blazer", name: "Signature Navy Blazer", price: 52000, image: "/images/editorial-women.png", colors: ["Navy", "Black", "Burgundy"] },
  { id: "signature-black-tuxedo", name: "Signature Black Tuxedo", price: 68000, image: "/images/editorial-women.png", colors: ["Black", "Charcoal"] },
];

export default function SignatureSuitWomenPage() {
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
            Women's Limited Designs
          </h1>
          <p className="text-neutral-500 max-w-xl mx-auto">
            Ready-to-wear blazers and suits in limited colors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {WOMEN_SUITS.map((suit) => (
            <Link key={suit.id} href={`/signature-suit/women/${suit.id}`} className="group cursor-pointer">
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
