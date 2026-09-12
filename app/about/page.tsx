// app/about/page.tsx

import Link from "next/link"; // 1. Link import karein

export default function AboutPage() {
  return (
    <div className="container mx-auto px-6 py-24 max-w-4xl">
      <h1 className="text-4xl md:text-5xl font-serif text-amber-500 mb-8">
        Our Story
      </h1>
      <div className="space-y-6 text-neutral-400 leading-relaxed">
        <p>
          Welcome to PADO BOUTIQUE. We specialize in luxury bespoke tailoring, 
          silk loungewear, and custom garments designed for the modern individual.
        </p>
        <p>
          Our craftsmanship blends traditional techniques with a contemporary 
          dark-mode aesthetic, ensuring every piece is as unique as you are.
        </p>
      </div>

      {/* 2. Ek button add karein taake user wapas ja sake */}
      <div className="mt-12">
        <Link 
          href="/" 
          className="inline-block bg-amber-600 text-black px-8 py-3 font-semibold hover:bg-amber-500 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
