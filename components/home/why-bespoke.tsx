// components/home/why-bespoke.tsx

import { benefits } from "@/lib/data";

interface Benefit {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export function WhyBespoke() {
  const list = (benefits as Benefit[]) || [];

  if (list.length === 0) {
    // Fallback benefits
    const defaultBenefits: Benefit[] = [
      {
        id: 1,
        title: "Made to Measure",
        description: "Every piece is cut to your exact measurements.",
        icon: "📐",
      },
      {
        id: 2,
        title: "Premium Fabrics",
        description: "Wool, cashmere, linen — sourced from the finest mills.",
        icon: "🧵",
      },
      {
        id: 3,
        title: "Hand Finished",
        description: "Traditional techniques, modern silhouettes.",
        icon: "✂️",
      },
    ];

    return (
      <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-8">
        <div className="text-center mb-14">
          <p className="text-[10px] tracking-[0.4em] text-neutral-500 uppercase mb-4">
            Why PADO
          </p>
          <h2 className="text-3xl md:text-4xl font-serif text-neutral-900">
            The Bespoke Difference
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {defaultBenefits.map((benefit: Benefit, i: number) => (
            <div key={benefit.id} className="text-center">
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-serif mb-3 text-neutral-900">{benefit.title}</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-8">
      <div className="text-center mb-14">
        <p className="text-[10px] tracking-[0.4em] text-neutral-500 uppercase mb-4">
          Why PADO
        </p>
        <h2 className="text-3xl md:text-4xl font-serif text-neutral-900">
          The Bespoke Difference
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {list.map((benefit: Benefit, i: number) => (
          <div key={benefit.id} className="text-center">
            <div className="text-4xl mb-4">{benefit.icon}</div>
            <h3 className="text-xl font-serif mb-3 text-neutral-900">{benefit.title}</h3>
            <p className="text-sm text-neutral-500 leading-relaxed">{benefit.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
