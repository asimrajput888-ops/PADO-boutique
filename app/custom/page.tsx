// app/custom/page.tsx

import Link from "next/link";
import Image from "next/image";

export default function CustomGenderPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] py-32 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-amber-600 tracking-[0.3em] text-xs font-semibold mb-4 uppercase">
            Custom Made
          </p>
          <h1 className="text-4xl md:text-5xl font-serif mb-4">
            Choose Your Collection
          </h1>
          <p className="text-neutral-500 max-w-xl mx-auto">
            Full bespoke tailoring crafted to your exact measurements.
          </p>
        </div>

        {/* Two Cards Side-by-Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          
          {/* MEN Card */}
          <Link href="/men" className="group cursor-pointer">
            <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
              <Image
                src="/images/editorial-men.png"
                alt="Custom Made Men"
                fill
                className="object-cover group-hover:scale-105 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-amber-400 text-xs uppercase tracking-[0.3em] mb-2">
                  Collection
                </p>
                <h2 className="text-3xl md:text-4xl font-serif text-white mb-2">
                  Men
                </h2>
                <p className="text-white/80 text-sm">
                  Bespoke suits, blazers, and tailored garments.
                </p>
              </div>
            </div>
          </Link>

          {/* WOMEN Card */}
          <Link href="/women" className="group cursor-pointer">
            <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
              <Image
                src="/images/editorial-women.png"
                alt="Custom Made Women"
                fill
                className="object-cover group-hover:scale-105 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#5D1A24]/80 via-black/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-[#C5A059] text-xs uppercase tracking-[0.3em] mb-2">
                  Collection
                </p>
                <h2 className="text-3xl md:text-4xl font-serif text-white mb-2">
                  Women
                </h2>
                <p className="text-white/80 text-sm">
                  Timeless couture, silk loungewear, and tailored blazers.
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Bottom Info */}
        <div className="text-center mt-16">
          <p className="text-neutral-400 text-sm mb-2">
            Full bespoke tailoring crafted in 3–4 weeks.
          </p>
          <p className="text-neutral-400 text-xs">
            Every piece is handmade, quality over quantity.
          </p>
        </div>
      </div>
    </div>
  );
}
