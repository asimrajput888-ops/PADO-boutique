// components/customizer/SimpleOption.tsx

"use client";

interface SimpleOptionProps {
  id: string;
  name: string;
  price?: number;
  selected: boolean;
  onSelect: () => void;
}

export default function SimpleOption({
  id,
  name,
  price,
  selected,
  onSelect,
}: SimpleOptionProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full flex items-center justify-between gap-4 p-5 border transition-all duration-300 text-left ${
        selected
          ? "border-neutral-900 bg-neutral-50"
          : "border-neutral-200 hover:border-neutral-400 bg-white"
      }`}
    >
      <div>
        <p
          className={`text-sm font-medium ${
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

      <div
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
          selected ? "border-neutral-900 bg-neutral-900" : "border-neutral-300"
        }`}
      >
        {selected && <div className="w-2 h-2 rounded-full bg-white" />}
      </div>
    </button>
  );
}
