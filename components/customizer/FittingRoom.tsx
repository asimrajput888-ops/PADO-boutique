// components/customizer/FittingRoom.tsx

"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

interface FittingRoomProps {
  productImage: string;
  productName: string;
  selectedStyle: string[];
  selectedDetails: string[];
  fabricFilter: string;
}

const STYLE_IMAGES: Record<string, string> = {
  "lapel-shawl": "/images/garments/lapel-shawl.png",
  "lapel-notch": "/images/garments/lapel-notch.png",
  "lapel-peak": "/images/garments/lapel-peak.png",
  "buttons-1": "/images/garments/buttons-1.png",
  "buttons-2": "/images/garments/buttons-2.png",
  "buttons-double": "/images/garments/buttons-double.png",
  "sleeve-3": "/images/garments/sleeve-3-buttons.png",
  "sleeve-4": "/images/garments/sleeve-4-buttons.png",
};

const DETAIL_IMAGES: Record<string, string> = {
  "vest-1-welt": "/images/garments/vest-1-welt.png",
  "vest-2-welt": "/images/garments/vest-2-welt.png",
  "vest-flap": "/images/garments/vest-flap.png",
  "vest-5-buttons": "/images/garments/vest-5-buttons.png",
  "vest-6-buttons": "/images/garments/vest-6-buttons.png",
  "trouser-classic": "/images/garments/trouser-classic.png",
  "trouser-slim": "/images/garments/trouser-slim.png",
  "trouser-narrow": "/images/garments/trouser-narrow.png",
  "trouser-flat": "/images/garments/trouser-flat.png",
  "trouser-double-pleat": "/images/garments/trouser-double-pleat.png",
  "trouser-triple-pleat": "/images/garments/trouser-triple-pleat.png",
  "trouser-slanted": "/images/garments/trouser-slanted.png",
  "trouser-slanted-welt": "/images/garments/trouser-slanted-welt.png",
  "trouser-welt": "/images/garments/trouser-welt.png",
  "trouser-standard-belt": "/images/garments/trouser-standard-belt.png",
  "trouser-belt": "/images/garments/trouser-belt.png",
  "trouser-adjuster": "/images/garments/trouser-adjuster.png",
};

export default function FittingRoom({
  productImage,
  productName,
  selectedStyle,
  selectedDetails,
  fabricFilter,
}: FittingRoomProps) {
  const lastStyleId = selectedStyle[selectedStyle.length - 1];
  const lastDetailId = selectedDetails[selectedDetails.length - 1];

  const currentStyleImage = lastStyleId ? STYLE_IMAGES[lastStyleId] : null;
  const currentDetailImage = lastDetailId ? DETAIL_IMAGES[lastDetailId] : null;

  return (
    <div className="relative w-full h-[650px] rounded-2xl overflow-hidden bg-gradient-to-br from-neutral-50 to-neutral-100 border border-neutral-200 shadow-xl">
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 text-[10px] uppercase tracking-[0.3em] text-neutral-400 bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full">
        Live Preview
      </div>

      <div className="absolute top-4 right-4 z-20">
        <TransformWrapper initialScale={1} minScale={0.5} maxScale={3} centerOnInit>
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              <div className="flex flex-col gap-2">
                <button onClick={() => zoomIn()} className="w-9 h-9 bg-white/90 backdrop-blur-sm border border-neutral-200 rounded-full flex items-center justify-center hover:bg-amber-50 hover:border-amber-400 transition shadow-sm">
                  <ZoomIn className="w-4 h-4 text-neutral-700" />
                </button>
                <button onClick={() => zoomOut()} className="w-9 h-9 bg-white/90 backdrop-blur-sm border border-neutral-200 rounded-full flex items-center justify-center hover:bg-amber-50 hover:border-amber-400 transition shadow-sm">
                  <ZoomOut className="w-4 h-4 text-neutral-700" />
                </button>
                <button onClick={() => resetTransform()} className="w-9 h-9 bg-white/90 backdrop-blur-sm border border-neutral-200 rounded-full flex items-center justify-center hover:bg-amber-50 hover:border-amber-400 transition shadow-sm">
                  <RotateCcw className="w-4 h-4 text-neutral-700" />
                </button>
              </div>

              <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }} contentStyle={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div className="relative w-full h-full flex items-center justify-center">
                  <motion.div key={productImage} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="relative">
                    <Image src={productImage} alt={productName} width={400} height={550} className="object-contain" style={{ filter: fabricFilter, transition: "filter 0.5s ease" }} />
                  </motion.div>

                  <AnimatePresence>
                    {currentStyleImage && (
                      <motion.div key={currentStyleImage} initial={{ opacity: 0, x: -30, scale: 0.9 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: -30, scale: 0.9 }} transition={{ duration: 0.4 }} className="absolute top-6 left-6 w-28 h-28 rounded-xl overflow-hidden bg-white/95 backdrop-blur-md border border-neutral-300 shadow-lg p-2">
                        <Image src={currentStyleImage} alt="Style" fill className="object-contain p-2" />
                        <div className="absolute bottom-0 left-0 right-0 bg-neutral-900 text-white text-[8px] uppercase tracking-widest text-center py-0.5">Style</div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {currentDetailImage && (
                      <motion.div key={currentDetailImage} initial={{ opacity: 0, x: 30, scale: 0.9 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: 30, scale: 0.9 }} transition={{ duration: 0.4 }} className="absolute top-6 right-6 w-28 h-28 rounded-xl overflow-hidden bg-white/95 backdrop-blur-md border border-amber-200 shadow-lg p-2">
                        <Image src={currentDetailImage} alt="Detail" fill className="object-contain p-2" />
                        <div className="absolute bottom-0 left-0 right-0 bg-amber-600 text-white text-[8px] uppercase tracking-widest text-center py-0.5">Detail</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
      </div>

      <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap gap-2 justify-center">
        {selectedStyle.map((s) => (
          <motion.span key={s} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-[10px] uppercase tracking-widest bg-neutral-900 text-white px-3 py-1.5 rounded-full font-medium shadow-sm">
            {s.replace("lapel-", "").replace("buttons-", "").replace("sleeve-", "")}
          </motion.span>
        ))}
        {selectedDetails.map((d) => (
          <motion.span key={d} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-[10px] uppercase tracking-widest bg-amber-100 text-amber-800 border border-amber-200 px-3 py-1.5 rounded-full font-medium shadow-sm">
            {d.replace("trouser-", "").replace("vest-", "")}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
