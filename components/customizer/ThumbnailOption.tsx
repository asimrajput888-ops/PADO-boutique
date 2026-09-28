// components/customizer/ThumbnailOption.tsx

"use client";

import Image from "next/image";

interface ThumbnailOptionProps {
  id: string;
  name: string;
  price: number;
  thumbnail?: string;
  selected: boolean;
  onSelect: () => void;
}

export default function ThumbnailOption({ id, name, price, thumbnail, selected, onSelect }: ThumbnailOptionProps) {
  return (
    <button onClick={onSelect}
      className={`w-full flex items-center gap-4 p-3 border rounded-xl transition-all duration-300 ${
        selected ? "border-amber-600 bg-amber-50 shadow-md" : "border-neutral-200 hover:border-amber-400 hover:bg-neutral-50"
      }`}>
      <div className={`w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 ${selected ? "border-amber-600" : "border-neutral-200"} bg-white flex items-center justify-center`}>
        {thumbnail ? <Image src={thumbnail} alt={name} width={64} height={64} className="object-contain" /> : <div className="w-full h-full bg-neutral-100" />}
      </div>
      <div className="flex-1 text-left">
        <p className={`text-sm font-medium ${selected ? "text-neutral-900" : "text-neutral-700"}`}>{name}</p>
      </div>
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selected ? "border-amber-600" : "border-neutral-300"}`}>
        {selected && <div className="w-2.5 h-2.5 rounded-full bg-amber-600" />}
      </div>
    </button>
  );
}
