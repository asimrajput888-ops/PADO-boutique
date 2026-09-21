// components/customizer/StyleSelector.tsx

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface StyleItem {
  id: string;
  name: string;
  price: number;
  image?: string;
}

interface StyleSelectorProps {
  styles: StyleItem[];
  selectedStyles: string[];
  onToggle: (id: string) => void;
}

export default function StyleSelector({ styles, selectedStyles, onToggle }: StyleSelectorProps) {
  // Group styles by category (Lapel, Buttons, Sleeve)
  const groupedStyles = {
    "Lapel Style": styles.filter((s) => s.id.startsWith("lapel-")),
    "Buttons": styles.filter((s) => s.id.startsWith("buttons-")),
    "Sleeve Buttons": styles.filter((s) => s.id.startsWith("sleeve-")),
  };

  return (
    <div className="space-y-8 max-h-[500px] overflow-y-auto pr-2">
      {Object.entries(groupedStyles).map(([category, items]) => (
        <div key={category}>
          <h3 className="text-xs uppercase tracking-[0.3em] text-neutral-400 mb-4 font-semibold">
            {category}
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {items.map((item, index) => {
              const isSelected = selectedStyles.includes(item.id);
              return (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onClick={() => onToggle(item.id)}
                  className={`group flex items-center gap-4 p-4 border rounded-xl text-left transition-all duration-300 ${
                    isSelected
                      ? "border-amber-600 bg-amber-50 shadow-md"
                      : "border-neutral-200 hover:border-amber-400 hover:bg-neutral-50"
                  }`}
                >
                  {/* Image Thumbnail */}
                  {item.image && (
                    <div className="relative w-16 h-16 flex-shrink-0 bg-neutral-900 rounded-lg overflow-hidden border border-neutral-200">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                  )}

                  {/* Name */}
                  <div className="flex-1">
                    <p className="font-medium text-sm text-neutral-900">{item.name}</p>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      {item.price > 0 ? `+ Rs. ${item.price.toLocaleString()}` : "Included"}
                    </p>
                  </div>

                  {/* Check Mark */}
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                      isSelected
                        ? "bg-amber-600 text-white"
                        : "border-2 border-neutral-300 group-hover:border-amber-400"
                    }`}
                  >
                    {isSelected && <Check className="w-4 h-4" />}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
