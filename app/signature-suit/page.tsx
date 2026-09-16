// app/signature-suit/page.tsx

import Link from "next/link";
import Image from "next/image";

export default function SignatureSuitGenderPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] py-32 px-6">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-16">
          <p className="text-amber-600 tracking-[0.3em] text-xs font-semibold mb-4 uppercase">
            Ready to Wear
          </p>
          <h1 className="text-4xl md:text-5xl font-serif mb-4">
            Limited Designs
          </h1>
          <p className="text-neutral-500 max-w-xl mx-auto">
            Ready-to-wear suits in limited colors. Single or double breasted. Available for immediate delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          
          <Link href="/signature-suit/men" className="group cursor-pointer">
            <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
              <Image
                src="/images/garments/suit.webp"
                alt="Ready to Wear Men"
                fill
                className="object-cover group-hover:scale-105 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-amber-400 text-xs uppercase tracking-[0.3em] mb-2">
                  Ready to Wear
                </p>
                <h2 className="text-3xl md:text-4xl font-serif text-white mb-2">
                  Men
                </h2>
                <p className="text-white/80 text-sm">
                  Single or double breasted suits in limited colors.
                </p>
              </div>
            </div>
          </Link>

          <Link href="/signature-suit/women" className="group cursor-pointer">
            <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
              <Image
                src="/images/editorial-women.png"
                alt="Ready to Wear Women"
                fill
                className="object-cover group-hover:scale-105 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#5D1A24]/80 via-black/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-[#C5A059] text-xs uppercase tracking-[0.3em] mb-2">
                  Ready to Wear
                </p>
                <h2 className="text-3xl md:text-4xl font-serif text-white mb-2">
                  Women
                </h2>
                <p className="text-white/80 text-sm">
                  Tailored blazers and suits in limited colors.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
