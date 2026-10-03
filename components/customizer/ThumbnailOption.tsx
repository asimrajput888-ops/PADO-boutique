// components/customizer/ThumbnailOption.tsx

"use client";

import Image from "next/image";

interface ThumbnailOptionProps {
  id: string;
  name: string;
  price?: number;
  thumbnail?: string;
  selected: boolean;
  onSelect: () => void;
}

export default function ThumbnailOption({
  id,
  name,
  price,
  thumbnail,
  selected,
  onSelect,
}: ThumbnailOptionProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group relative w-full border transition-all duration-300 overflow-hidden text-left ${
        selected
          ? "border-neutral-900 bg-neutral-50"
          : "border-neutral-200 hover:border-neutral-400 bg-white"
      }`}
    >
      {/* Image Container — bigger */}
      <div className="relative aspect-[4/3] w-full bg-neutral-100 overflow-hidden">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-300 text-[10px] uppercase tracking-widest">
            No preview
          </div>
        )}

        {/* Selected checkmark */}
        {selected && (
          <div className="absolute top-3 right-3 w-6 h-6 bg-neutral-900 text-white flex items-center justify-center rounded-full text-[11px] font-bold">
            ✓
          </div>
        )}
      </div>

      {/* Text below image */}
      <div className="px-4 py-3 border-t border-neutral-100">
        <p
          className={`text-sm font-medium leading-snug ${
            selected ? "text-neutral-900" : "text-neutral-700"
          }`}
        >
          {name}
        </p>
        {price !== undefined && (
          <p className="text-xs text-neutral-500 mt-0.5">
            {price > 0 ? `+ $${price.toLocaleString()}` : "Included"}
          </p>
        )}
      </div>
    </button>
  );
}
