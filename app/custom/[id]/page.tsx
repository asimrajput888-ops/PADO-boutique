// app/custom/[id]/page.tsx

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useParams } from "next/navigation";

const SIGNATURE_DESIGNS = [
  {
    id: "atelier-navy",
    name: "The Atelier Navy",
    price: 85000,
    image: "/images/editorial-custom.png",
    description:
      "A PADO signature design featuring hand-stitched peak lapels, a subtle ticket pocket, and a bespoke navy wool that shifts in natural light.",
  },
  {
    id: "heritage-check",
    name: "The Heritage Check",
    price: 92000,
    image: "/images/editorial-fabrics.png",
    description:
      "An exclusive PADO design with a classic check pattern, elbow patches, and a soft flannel finish.",
  },
  {
    id: "modern-ivory",
    name: "The Modern Ivory",
    price: 78000,
    image: "/images/product-alton.png",
    description:
      "A contemporary ivory blazer with a relaxed silhouette, perfect for evening wear.",
  },
  {
    id: "signature-charcoal",
    name: "The Signature Charcoal",
    price: 88000,
    image: "/images/product-belgrave.png",
    description:
      "PADO's take on the timeless charcoal suit — clean lines, structured shoulders, and a modern fit.",
  },
  {
    id: "midnight-blue",
    name: "The Midnight Blue",
    price: 95000,
    image: "/images/product-camden.png",
    description:
      "Deep midnight blue wool with subtle sheen, perfect for formal evenings.",
  },
  {
    id: "heritage-tweed",
    name: "The Heritage Tweed",
    price: 89000,
    image: "/images/product-foxley.png",
    description:
      "Classic heritage tweed with a modern cut — rustic elegance at its finest.",
  },
];

export default function CustomDesignPage() {
  const params = useParams();
  const id = params?.id as string;
  const design = SIGNATURE_DESIGNS.find((d) => d.id === id);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    chest: "",
    waist: "",
    shoulder: "",
    height: "",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);

  if (!design) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">
        <div className="text-center">
          <h1 className="text-4xl font-serif text-neutral-900 mb-4">
            Design Not Found
          </h1>
          <Link href="/custom" className="text-amber-600 hover:underline">
            &larr; Back to Custom
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
    <div className="min-h-screen bg-[#FDFBF7] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/custom"
          className="text-sm text-neutral-500 hover:text-amber-600 mb-8 inline-block"
        >
          &larr; Back to Custom Collection
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left: Design Image */}
          <div>
            <div className="relative aspect-[3/4] bg-neutral-100 overflow-hidden">
              <Image
                src={design.image}
                alt={design.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="mt-6">
              <p className="text-amber-600 text-xs uppercase tracking-[0.3em] mb-2">
                PADO Signature Design
              </p>
              <h1 className="text-3xl font-serif text-neutral-900 mb-4">
                {design.name}
              </h1>
              <p className="text-neutral-600 leading-relaxed mb-4">
                {design.description}
              </p>
              <p className="text-2xl text-neutral-900 font-serif">
                Rs. {design.price.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Right: Measurement Form */}
          <div className="bg-white/80 backdrop-blur-xl border border-neutral-200 p-8 rounded-2xl shadow-xl h-fit">
            {submitted ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4 text-amber-600">✓</div>
                <h2 className="text-2xl font-serif text-neutral-900 mb-4">
                  Order Received
                </h2>
                <p className="text-neutral-600 mb-8">
                  Thank you, {formData.name}. Our atelier will contact you within
                  24 hours.
                </p>
                <Link href="/" className="text-amber-600 hover:underline">
                  &larr; Back to Home
                </Link>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-serif text-neutral-900 mb-6">
                  Enter Your Measurements
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full border border-neutral-200 p-3 rounded-lg focus:border-amber-500 outline-none"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full border border-neutral-200 p-3 rounded-lg focus:border-amber-500 outline-none"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full border border-neutral-200 p-3 rounded-lg focus:border-amber-500 outline-none"
                    required
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Chest (in)"
                      value={formData.chest}
                      onChange={(e) =>
                        setFormData({ ...formData, chest: e.target.value })
                      }
                      className="w-full border border-neutral-200 p-3 rounded-lg focus:border-amber-500 outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Waist (in)"
                      value={formData.waist}
                      onChange={(e) =>
                        setFormData({ ...formData, waist: e.target.value })
                      }
                      className="w-full border border-neutral-200 p-3 rounded-lg focus:border-amber-500 outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Shoulder (in)"
                      value={formData.shoulder}
                      onChange={(e) =>
                        setFormData({ ...formData, shoulder: e.target.value })
                      }
                      className="w-full border border-neutral-200 p-3 rounded-lg focus:border-amber-500 outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Height (in)"
                      value={formData.height}
                      onChange={(e) =>
                        setFormData({ ...formData, height: e.target.value })
                      }
                      className="w-full border border-neutral-200 p-3 rounded-lg focus:border-amber-500 outline-none"
                    />
                  </div>
                  <textarea
                    placeholder="Additional notes (optional)"
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    rows={3}
                    className="w-full border border-neutral-200 p-3 rounded-lg focus:border-amber-500 outline-none resize-none"
                  />
                  <button
                    type="submit"
                    className="w-full bg-neutral-900 text-white py-4 font-semibold hover:bg-amber-600 transition rounded-lg"
                  >
                    Submit Order
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
