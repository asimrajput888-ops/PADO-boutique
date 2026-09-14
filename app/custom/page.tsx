// app/custom/page.tsx

import Link from "next/link";

export default function CustomGenderPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] py-32 px-6">
      <div className="max-w-5xl mx-auto">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Men's Collection */}
          <Link href="/custom/men" className="group cursor-pointer">
            <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
              <img 
                src="/images/editorial-men.png" 
                alt="Men's Signature Designs" 
                className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-amber-400 text-xs uppercase tracking-[0.3em] mb-2">Collection</p>
                <h2 className="text-3xl font-serif text-white mb-2">Men's Signature</h2>
                <p className="text-white/80 text-sm">Bespoke designs, hand-crafted for you.</p>
              </div>
            </div>
          </Link>

          {/* Women's Collection */}
          <Link href="/custom/women" className="group cursor-pointer">
            <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
              <img 
                src="/images/editorial-women.png" 
                alt="Women's Signature Designs" 
                className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#5D1A24]/80 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-[#C5A059] text-xs uppercase tracking-[0.3em] mb-2">Collection</p>
                <h2 className="text-3xl font-serif text-white mb-2">Women's Signature</h2>
                <p className="text-white/80 text-sm">Timeless couture, tailored to you.</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
