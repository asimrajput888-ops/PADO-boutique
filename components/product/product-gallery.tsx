// components/product/product-gallery.tsx

"use client";

import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({ loop: true });
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({ containScroll: "keepSnaps", dragFree: true });

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

  if (!images || images.length === 0) return <div className="aspect-[3/4] bg-cream flex items-center justify-center text-stone">No Image</div>;

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-hidden relative bg-cream aspect-[3/4]">
        <div className="flex h-full touch-pan-y" ref={emblaMainRef}>
          {images.map((img, index) => (
            <div className="flex-[0_0_100%] min-w-0 relative h-full" key={index}>
              <img
                src={img}
                alt={`${name} - ${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).src = "https://via.placeholder.com/800x1000?text=No+Image"; }}
              />
            </div>
          ))}
        </div>
        {images.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none">
            <button onClick={() => emblaMainApi?.scrollPrev()} className="w-10 h-10 bg-white/80 rounded-full flex items-center justify-center pointer-events-auto">←</button>
            <button onClick={() => emblaMainApi?.scrollNext()} className="w-10 h-10 bg-white/80 rounded-full flex items-center justify-center pointer-events-auto">→</button>
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="overflow-hidden" ref={emblaThumbsRef}>
          <div className="flex gap-3">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => onThumbClick(index)}
                className={`flex-[0_0_80px] aspect-[3/4] relative border ${index === selectedIndex ? "border-ink" : "border-transparent opacity-60"}`}
              >
                <img src={img} alt="Thumb" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
