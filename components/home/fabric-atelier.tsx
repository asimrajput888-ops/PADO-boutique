// components/home/fabric-atelier.tsx

import Image from "next/image";
import Link from "next/link";
import { fabrics } from "@/lib/data";

interface Fabric {
  id: string;
  name: string;
  color: string;
  price: number;
  description?: string;
}

export function FabricAtelier() {
  const list = (fabrics as Fabric[]) || [];

  if (list.length === 0) return null;

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-8">
      <div className="text-center mb-14">
        <p className="text-[10px] tracking-[0.4em] text-neutral-500 uppercase mb-4">
          Fabric Atelier
        </p>
        <h2 className="text-3xl md:text-4xl font-serif text-neutral-900 mb-4">
          The Finest Cloth
        </h2>
        <p className="text-neutral-500 max-w-md mx-auto text-sm">
          Sourced from the finest mills in Italy and England.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {list.slice(0, 8).map((fabric: Fabric, i: number) => (
          <div key={fabric.id} className="group">
            <div
              className="aspect-square w-full border border-neutral-200 mb-3 transition-transform duration-700 group-hover:scale-[1.02]"
              style={{ backgroundColor: fabric.color }}
            />
            <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 mb-1">
              {fabric.price > 0 ? `+ $${fabric.price}` : "Included"}
            </p>
            <h3 className="text-sm font-medium text-neutral-900 mb-1">
              {fabric.name}
            </h3>
            {fabric.description && (
              <p className="text-xs text-neutral-500 leading-relaxed">
                {fabric.description}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="text-center mt-14">
        <Link
          href="/custom/men"
          className="inline-block text-[10px] tracking-[0.3em] uppercase border-b border-neutral-900 pb-1 hover:opacity-60 transition"
        >
          Explore Custom Made →
        </Link>
      </div>
    </section>
  );
}
