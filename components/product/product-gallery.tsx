// components/product/product-gallery.tsx

"use client";

import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [validImages, setValidImages] = useState<string[]>([]);
  
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({ loop: true });
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({ containScroll: "keepSnaps", dragFree: true });

  useEffect(() => {
    // 🔥 URL PROXY LOGIC
    const processedImages = (images || []).map(img => {
      if (img && (img.includes("aliyuncs.com") || img.includes("cjdropshipping.com"))) {
        return `/api/proxy-image?url=${encodeURIComponent(img)}`;
      }
      return img;
    }).filter(img => img && img.trim() !== "");

    setValidImages(processedImages);
  }, [images]);

  const onThumbClick = useCallback((index: number) => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    emblaMainApi.scrollTo(index);
  }, [emblaMainApi, emblaThumbsApi]);

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  const handleImageError = (failedImgUrl: string) => {
    setValidImages((prev) => prev.filter((url) => url !== failedImgUrl));
  };

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
      <div className="overflow-hidden relative bg-cream aspect-[3/4]">
        <div className="flex h-full touch-pan-y" ref={emblaMainRef}>
          {validImages.map((img, index) => (
            <div className="flex-[0_0_100%] min-w-0 relative h-full" key={index}>
              <img
                src={img}
                alt={`${name} - ${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
                onError={() => handleImageError(img)}
              />
            </div>
          ))}
        </div>
        
        {validImages.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none">
            <button onClick={() => emblaMainApi?.scrollPrev()} className="w-10 h-10 bg-white/80 rounded-full flex items-center justify-center pointer-events-auto hover:bg-white text-ink">←</button>
            <button onClick={() => emblaMainApi?.scrollNext()} className="w-10 h-10 bg-white/80 rounded-full flex items-center justify-center pointer-events-auto hover:bg-white text-ink">→</button>
          </div>
        )}
      </div>

      {validImages.length > 1 && (
        <div className="overflow-hidden" ref={emblaThumbsRef}>
          <div className="flex gap-3">
            {validImages.map((img, index) => (
              <button
                key={index}
                onClick={() => onThumbClick(index)}
                className={`flex-[0_0_80px] aspect-[3/4] relative border transition-opacity ${
                  index === selectedIndex ? "border-ink opacity-100" : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img 
                  src={img} 
                  alt="Thumb" 
                  className="w-full h-full object-cover" 
                  onError={() => handleImageError(img)}
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
