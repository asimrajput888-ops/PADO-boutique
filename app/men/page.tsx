// app/men/page.tsx

import Image from "next/image";
import Link from "next/link";

export default function MenPage() {
  return (
    // 1. Background ko Cream kar diya, Text ko Dark kar diya
    <div className="min-h-screen bg-[#FDFBF7] text-neutral-900">
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 text-center">
        <p className="text-amber-600 tracking-[0.2em] text-sm font-semibold mb-4">
          GENTLEMEN'S BESPOKE ATELIER
        </p>
        <h1 className="text-4xl md:text-6xl font-serif mb-6 text-neutral-900">
          Men's Sartorial Collection
        </h1>
        <p className="text-neutral-600 max-w-2xl mx-auto text-lg leading-relaxed">
          Hand-cut Italian wools, precision canvas construction, and timeless tailoring built to your exact silhouette.
        </p>
      </section>

      {/* Product Grid (Example) */}
      <section className="container mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="group">
            <div className="relative aspect-[3/4] overflow-hidden bg-neutral-200 mb-4">
              <Image 
                src="/images/men-suit-1.jpg" 
                alt="Bespoke Suit" 
                fill 
                className="object-cover group-hover:scale-105 transition duration-700"
              />
            </div>
            <h3 className="text-lg font-serif text-neutral-900">The Italian Wool Suit</h3>
            <p className="text-neutral-500 text-sm">Starting at Rs. 45,000</p>
          </div>

          {/* Card 2 */}
          <div className="group">
            <div className="relative aspect-[3/4] overflow-hidden bg-neutral-200 mb-4">
              <Image 
                src="/images/men-suit-2.jpg" 
                alt="Bespoke Suit" 
                fill 
                className="object-cover group-hover:scale-105 transition duration-700"
              />
            </div>
            <h3 className="text-lg font-serif text-neutral-900">The Navy Blue Blazer</h3>
            <p className="text-neutral-500 text-sm">Starting at Rs. 35,000</p>
          </div>

          {/* Card 3 */}
          <div className="group">
            <div className="relative aspect-[3/4] overflow-hidden bg-neutral-200 mb-4">
              <Image 
                src="/images/men-suit-3.jpg" 
                alt="Bespoke Suit" 
                fill 
                className="object-cover group-hover:scale-105 transition duration-700"
              />
            </div>
            <h3 className="text-lg font-serif text-neutral-900">The Casual Linen Shirt</h3>
            <p className="text-neutral-500 text-sm">Starting at Rs. 12,000</p>
          </div>

        </div>
      </section>
    </div>
  );
}
