// components/customizer/ThumbnailOption.tsx

"use client";

import { ICON_MAP } from "./icons";

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
  selected,
  onSelect,
}: ThumbnailOptionProps) {
  const IconComponent = ICON_MAP[id];

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
      {/* Icon Container */}
      <div className="relative aspect-square w-full bg-white flex items-center justify-center p-6">
        {IconComponent ? (
          <IconComponent className="w-full h-full text-neutral-900" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-300 text-[10px] uppercase tracking-widest">
            {name}
          </div>
        )}

        {/* Selected checkmark */}
        {selected && (
          <div className="absolute top-3 right-3 w-6 h-6 bg-neutral-900 text-white flex items-center justify-center rounded-full text-[11px] font-bold">
            ✓
          </div>
        )}
      </div>

      {/* Text below */}
      <div className="px-4 py-3 border-t border-neutral-100">
        <p
          className={`text-sm font-medium leading-snug ${
            selected ? "text-neutral-900" : "text-neutral-700"
          }`}
        >
          {name}
        </p>
      </div>
    </button>
  );
}
