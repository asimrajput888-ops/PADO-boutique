"use client";

import { motion } from "framer-motion";

export type FulfillmentMode = "ready" | "m2m";

interface Props {
  value: FulfillmentMode;
  onChange: (v: FulfillmentMode) => void;
}

const OPTIONS = [
  {
    id: "ready" as const,
    label: "Ready to Wear",
    meta: "Ships in 3–5 days",
    sub: "Standard sizing",
  },
  {
    id: "m2m" as const,
    label: "Made to Measure",
    meta: "Handcrafted in 14–18 days",
    sub: "Your exact measurements",
  },
];

export function FulfillmentToggle({ value, onChange }: Props) {
  return (
    <div className="mb-10">
      <p className="text-[10px] tracking-[0.4em] text-brand-gold uppercase mb-4">
        Choose Your Fit
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {OPTIONS.map((opt) => {
          const selected = value === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChange(opt.id)}
              className={`relative text-left p-5 border transition-all duration-300 ${
                selected
                  ? "border-brand-gold bg-brand-gold/5"
                  : "border-brand-stone hover:border-brand-slate/40"
              }`}
            >
              {selected && (
                <motion.span
                  layoutId="fulfillment-indicator"
                  className="absolute top-0 left-0 right-0 h-[2px] bg-brand-gold"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <p className="font-serif text-lg text-brand-charcoal mb-1">
                {opt.label}
              </p>
              <p className="text-[12px] text-brand-slate mb-2">{opt.sub}</p>
              <p className="text-[10px] tracking-[0.25em] text-brand-gold uppercase">
                {opt.meta}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
