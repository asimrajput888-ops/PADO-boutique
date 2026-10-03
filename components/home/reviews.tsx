// components/home/reviews.tsx

import { reviews } from "@/lib/data";

interface Review {
  id: number;
  name: string;
  country: string;
  text: string;
  rating: number;
}

export function Reviews() {
  const list = (reviews as Review[]) || [];

  if (list.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-8">
      <div className="text-center mb-14">
        <p className="text-[10px] tracking-[0.4em] text-neutral-500 uppercase mb-4">
          Client Stories
        </p>
        <h2 className="text-3xl md:text-4xl font-serif text-neutral-900">
          What They Say
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {list.map((review: Review, i: number) => (
          <div key={review.id} className="border border-neutral-200 p-8">
            <div className="flex gap-1 mb-4">
              {Array.from({ length: review.rating }).map((_, idx) => (
                <span key={idx} className="text-amber-500 text-sm">★</span>
              ))}
            </div>
            <p className="text-neutral-700 leading-relaxed mb-6 text-sm">
              &ldquo;{review.text}&rdquo;
            </p>
            <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-500">
              {review.name} — {review.country}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
