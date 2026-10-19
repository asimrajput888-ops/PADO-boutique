// components/product/product-gallery.tsx

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [validImages, setValidImages] = useState<string[]>([]);

  useEffect(() => {
    // 🔥 Proxy lagana aur duplicate images hatana
    const processedImages = (images || []).map(img => {
      if (img && (img.includes("aliyuncs.com") || img.includes("cjdropshipping.com"))) {
        return `https://images.weserv.nl/?url=${encodeURIComponent(img)}`;
      }
      return img;
    }).filter(img => img && img.trim() !== "");

    const uniqueImages = Array.from(new Set(processedImages));
    setValidImages(uniqueImages);
    setSelectedIndex(0); // Jab bhi nayi image aaye (color change), toh index 0 par reset ho
  }, [images]);

  if (!validImages || validImages.length === 0) {
    return (
      <div className="aspect-[3/4] bg-brand-cream flex flex-col items-center justify-center text-brand-slate p-4 text-center">
        <span className="font-serif text-3xl mb-2">PADO</span>
        <span className="text-[10px] uppercase tracking-widest">Image Coming Soon</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image Display */}
      <div className="overflow-hidden relative bg-cream aspect-[3/4]">
        <AnimatePresence mode="wait">
          <motion.img
            key={selectedIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            src={validImages[selectedIndex]}
            alt={`${name} - ${selectedIndex + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
      </div>

      {/* Thumbnails */}
      {validImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {validImages.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`flex-[0_0_80px] aspect-[3/4] relative border-2 transition-all duration-300 ${
                index === selectedIndex ? "border-ink opacity-100" : "border-transparent opacity-50 hover:opacity-100"
              }`}
            >
              <img 
                src={img} 
                alt={`Thumbnail ${index + 1}`} 
                className="w-full h-full object-cover" 
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
