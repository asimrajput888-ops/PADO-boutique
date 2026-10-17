// components/product/product-gallery.tsx

"use client";

import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({ loop: true });
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

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

  if (!images || images.length === 0) {
    return <div className="aspect-[3/4] bg-cream flex items-center justify-center text-stone">No Image</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image Carousel */}
      <div className="overflow-hidden relative bg-cream aspect-[3/4]">
        <div className="flex h-full touch-pan-y" ref={emblaMainRef}>
          {images.map((img, index) => (
            <div className="flex-[0_0_100%] min-w-0 relative h-full" key={index}>
              <motion.img
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                src={img}
                alt={`${name} - Image ${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
                loading={index === 0 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>

        {/* Navigation Arrows (Only if more than 1 image) */}
        {images.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none">
            <button
              onClick={() => emblaMainApi?.scrollPrev()}
              className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center pointer-events-auto hover:bg-white transition-colors"
            >
              ←
            </button>
            <button
              onClick={() => emblaMainApi?.scrollNext()}
              className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center pointer-events-auto hover:bg-white transition-colors"
            >
              →
            </button>
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="overflow-hidden" ref={emblaThumbsRef}>
          <div className="flex gap-3">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => onThumbClick(index)}
                className={`flex-[0_0_80px] min-w-0 aspect-[3/4] relative transition-opacity ${
                  index === selectedIndex ? "opacity-100 border-b-2 border-ink pb-1" : "opacity-40 hover:opacity-100"
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
        </div>
      )}
    </div>
  );
}
