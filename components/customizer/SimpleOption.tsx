// components/customizer/SimpleOption.tsx

"use client";

interface SimpleOptionProps {
  id: string;
  name: string;
  price: number;
  selected: boolean;
  onSelect: () => void;
}

export default function SimpleOption({ id, name, price, selected, onSelect }: SimpleOptionProps) {
  return (
    <button onClick={onSelect}
      className={`w-full flex items-center gap-4 p-4 border rounded-xl transition-all duration-300 ${
        selected ? "border-amber-600 bg-amber-50 shadow-md" : "border-neutral-200 hover:border-amber-400 hover:bg-neutral-50"
      }`}>
      <div className="flex-1 text-left">
        <p className={`text-sm font-medium ${selected ? "text-neutral-900" : "text-neutral-700"}`}>{name}</p>
        <p className="text-xs text-neutral-500">{price > 0 ? `+ Rs. ${price.toLocaleString()}` : "Included"}</p>
      </div>
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selected ? "border-amber-600" : "border-neutral-300"}`}>
        {selected && <div className="w-2.5 h-2.5 rounded-full bg-amber-600" />}
      </div>
    </button>
  );
}