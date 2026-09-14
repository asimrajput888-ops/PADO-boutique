// app/custom/page.tsx

import Link from "next/link";
import Image from "next/image";

export default function CustomGenderPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] py-32 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-amber-600 tracking-[0.3em] text-xs font-semibold mb-4 uppercase">
            PADO Signature Designs
          </p>
          <h1 className="text-4xl md:text-5xl font-serif mb-4">
            Choose Your Collection
          </h1>
          <p className="text-neutral-500 max-w-xl mx-auto">
            One-of-a-kind designs crafted by PADO. Choose a design, provide your measurements, and we'll tailor it to you in 3 weeks.
          </p>
        </div>

        {/* Men / Women Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Men's Collection */}
          <Link href="/custom/men" className="group cursor-pointer">
            <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
              <Image
                src="/images/editorial-men.png"
                alt="Men's Signature Designs"
                fill
                className="object-cover group-hover:scale-105 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-amber-400 text-xs uppercase tracking-[0.3em] mb-2">
                  Collection
                </p>
                <h2 className="text-3xl font-serif text-white mb-2">
                  Men's Signature
                </h2>
                <p className="text-white/80 text-sm">
                  Bespoke designs, hand-crafted for you.
                </p>
              </div>
            </div>
          </Link>

          {/* Women's Collection */}
          <Link href="/custom/women" className="group cursor-pointer">
            <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
              <Image
                src="/images/editorial-women.png"
                alt="Women's Signature Designs"
                fill
                className="object-cover group-hover:scale-105 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#5D1A24]/90 via-[#5D1A24]/30 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-[#C5A059] text-xs uppercase tracking-[0.3em] mb-2">
                  Collection
                </p>
                <h2 className="text-3xl font-serif text-white mb-2">
                  Women's Signature
                </h2>
                <p className="text-white/80 text-sm">
                  Timeless couture, tailored to you.
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* How It Works */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-amber-600 text-3xl font-serif mb-3">01</p>
            <h3 className="text-lg font-serif text-neutral-900 mb-2">Choose a Design</h3>
            <p className="text-sm text-neutral-500">Select from our exclusive PADO signature designs.</p>
          </div>
          <div>
            <p className="text-amber-600 text-3xl font-serif mb-3">02</p>
            <h3 className="text-lg font-serif text-neutral-900 mb-2">Provide Measurements</h3>
            <p className="text-sm text-neutral-500">Fill in your measurements through our simple form.</p>
          </div>
          <div>
            <p className="text-amber-600 text-3xl font-serif mb-3">03</p>
            <h3 className="text-lg font-serif text-neutral-900 mb-2">We Craft It</h3>
            <p className="text-sm text-neutral-500">Your piece is hand-crafted and delivered in 3 weeks.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
