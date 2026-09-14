// app/custom/women/[id]/page.tsx

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useParams } from "next/navigation";

// Same WOMEN_DESIGNS array (must match the gallery page)
const WOMEN_DESIGNS = [
  { id: "silk-loungewear", name: "The Silk Loungewear", price: 28000, image: "/images/editorial-women.png", description: "Pure silk loungewear set for effortless luxury at home." },
  { id: "emerald-gown", name: "The Emerald Gown", price: 120000, image: "/images/product-kensington.png", description: "Hand-embroidered evening gown in emerald silk." },
  { id: "ivory-chiffon", name: "The Ivory Chiffon", price: 65000, image: "/images/product-marlow.png", description: "Delicate chiffon with subtle gold detailing." },
  { id: "gold-jacket", name: "The Gold Embroidered Jacket", price: 55000, image: "/images/editorial-fabrics.png", description: "Statement jacket with hand-embroidered gold motifs." },
  { id: "atelier-blazer", name: "The Atelier Blazer", price: 75000, image: "/images/editorial-custom.png", description: "A tailored women's blazer, structured yet soft." },
  { id: "heritage-coat", name: "The Heritage Coat", price: 95000, image: "/images/product-belgrave.png", description: "Full-length wool coat with a timeless silhouette." },
];

export default function WomenDesignDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const design = WOMEN_DESIGNS.find((d) => d.id === id);

  const [formData, setFormData] = useState({
    name: "", email: "", phone: "",
    chest: "", waist: "", shoulder: "", height: "", notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  if (!design) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF8F0]">
        <div className="text-center">
          <h1 className="text-4xl font-serif text-[#1E1E2C] mb-4">Design Not Found</h1>
          <Link href="/custom/women" className="text-[#5D1A24] hover:underline">
            &larr; Back to Women's Collection
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <Link href="/custom/women" className="text-sm text-neutral-500 hover:text-[#5D1A24] mb-8 inline-block">
          &larr; Back to Women's Collection
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left: Design Image */}
          <div>
            <div className="relative aspect-[3/4] bg-[#1E1E2C]/5 overflow-hidden border border-[#1E1E2C]/10">
              <Image src={design.image} alt={design.name} fill className="object-cover" />
            </div>
            <div className="mt-6">
              <p className="text-[#C5A059] text-xs uppercase tracking-[0.3em] mb-2">PADO Signature Design</p>
              <h1 className="text-3xl font-serif text-[#1E1E2C] mb-4">{design.name}</h1>
              <p className="text-[#1E1E2C]/60 leading-relaxed mb-4">{design.description}</p>
              <p className="text-2xl text-[#1E1E2C] font-serif">PKR {design.price.toLocaleString()}</p>
            </div>
          </div>

          {/* Right: Measurement Form */}
          <div className="bg-white/80 backdrop-blur-xl border border-[#1E1E2C]/10 p-8 rounded-2xl shadow-xl h-fit">
            {submitted ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">✓</div>
                <h2 className="text-2xl font-serif text-[#1E1E2C] mb-4">Order Received</h2>
                <p className="text-[#1E1E2C]/60 mb-8">
                  Thank you, {formData.name}. Our atelier will craft your piece in 3 weeks and contact you shortly.
                </p>
                <Link href="/" className="text-[#5D1A24] hover:underline">&larr; Back to Home</Link>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-serif text-[#1E1E2C] mb-2">Enter Your Measurements</h2>
                <p className="text-sm text-[#1E1E2C]/50 mb-6">We'll craft this piece to fit you perfectly in 3 weeks.</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input type="text" placeholder="Full Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full border border-neutral-200 p-3 rounded-lg focus:border-[#5D1A24] outline-none" required />
                  <input type="email" placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full border border-neutral-200 p-3 rounded-lg focus:border-[#5D1A24] outline-none" required />
                  <input type="tel" placeholder="Phone Number" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full border border-neutral-200 p-3 rounded-lg focus:border-[#5D1A24] outline-none" required />
                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" placeholder="Chest (in)" value={formData.chest} onChange={(e) => setFormData({ ...formData, chest: e.target.value })} className="w-full border border-neutral-200 p-3 rounded-lg focus:border-[#5D1A24] outline-none" />
                    <input type="text" placeholder="Waist (in)" value={formData.waist} onChange={(e) => setFormData({ ...formData, waist: e.target.value })} className="w-full border border-neutral-200 p-3 rounded-lg focus:border-[#5D1A24] outline-none" />
                    <input type="text" placeholder="Shoulder (in)" value={formData.shoulder} onChange={(e) => setFormData({ ...formData, shoulder: e.target.value })} className="w-full border border-neutral-200 p-3 rounded-lg focus:border-[#5D1A24] outline-none" />
                    <input type="text" placeholder="Height (in)" value={formData.height} onChange={(e) => setFormData({ ...formData, height: e.target.value })} className="w-full border border-neutral-200 p-3 rounded-lg focus:border-[#5D1A24] outline-none" />
                  </div>
                  <textarea placeholder="Additional notes (optional)" value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} rows={3} className="w-full border border-neutral-200 p-3 rounded-lg focus:border-[#5D1A24] outline-none resize-none" />
                  <button type="submit" className="w-full bg-[#5D1A24] text-white py-4 font-semibold hover:bg-[#C5A059] transition rounded-lg">Submit Order</button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
