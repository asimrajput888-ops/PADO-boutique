// components/customizer/FittingRoom.tsx

"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface FittingRoomProps {
  productImage: string;
  productName: string;
  selectedStyle: string[];       // Style IDs (lapel, buttons)
  selectedDetails: string[];     // Details IDs (vest, trouser)
  fabricFilter: string;          // CSS filter
}

export default function FittingRoom({
  productImage,
  productName,
  selectedStyle,
  selectedDetails,
  fabricFilter,
}: FittingRoomProps) {
  // Get the LAST selected style image (most recent selection)
  const lastStyleId = selectedStyle[selectedStyle.length - 1];
  const lastDetailId = selectedDetails[selectedDetails.length - 1];

  // Find image paths
  const styleImages = [
    { id: "lapel-shawl", image: "/images/garments/lapel-shawl.png" },
    { id: "lapel-notch", image: "/images/garments/lapel-notch.png" },
    { id: "lapel-peak", image: "/images/garments/lapel-peak.png" },
    { id: "buttons-1", image: "/images/garments/buttons-1.png" },
    { id: "buttons-2", image: "/images/garments/buttons-2.png" },
    { id: "buttons-double", image: "/images/garments/buttons-double.png" },
    { id: "sleeve-3", image: "/images/garments/sleeve-3-buttons.png" },
    { id: "sleeve-4", image: "/images/garments/sleeve-4-buttons.png" },
  ];

  const detailImages = [
    { id: "vest-1-welt", image: "/images/garments/vest-1-welt.png" },
    { id: "vest-2-welt", image: "/images/garments/vest-2-welt.png" },
    { id: "vest-flap", image: "/images/garments/vest-flap.png" },
    { id: "vest-5-buttons", image: "/images/garments/vest-5-buttons.png" },
    { id: "vest-6-buttons", image: "/images/garments/vest-6-buttons.png" },
    { id: "trouser-classic", image: "/images/garments/trouser-classic.png" },
    { id: "trouser-slim", image: "/images/garments/trouser-slim.png" },
    { id: "trouser-narrow", image: "/images/garments/trouser-narrow.png" },
    { id: "trouser-flat", image: "/images/garments/trouser-flat.png" },
    { id: "trouser-double-pleat", image: "/images/garments/trouser-double-pleat.png" },
    { id: "trouser-triple-pleat", image: "/images/garments/trouser-triple-pleat.png" },
    { id: "trouser-slanted", image: "/images/garments/trouser-slanted.png" },
    { id: "trouser-slanted-welt", image: "/images/garments/trouser-slanted-welt.png" },
    { id: "trouser-welt", image: "/images/garments/trouser-welt.png" },
    { id: "trouser-standard-belt", image: "/images/garments/trouser-standard-belt.png" },
    { id: "trouser-belt", image: "/images/garments/trouser-belt.png" },
    { id: "trouser-adjuster", image: "/images/garments/trouser-adjuster.png" },
  ];

  const currentStyleImage = styleImages.find((s) => s.id === lastStyleId)?.image;
  const currentDetailImage = detailImages.find((d) => d.id === lastDetailId)?.image;

  return (
    <div className="relative w-full h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-neutral-50 to-neutral-100 border border-neutral-200 flex items-center justify-center">
      {/* Base Product Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={productImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Image
            src={productImage}
            alt={productName}
            width={400}
            height={500}
            className="object-contain p-4"
            style={{
              filter: fabricFilter,
              transition: "filter 0.5s ease",
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Style Layer (Lapel, Buttons) — TOP LEFT */}
      {currentStyleImage && (
        <motion.div
          key={currentStyleImage}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute top-4 left-4 w-24 h-24 rounded-lg overflow-hidden bg-white/80 backdrop-blur-sm border border-neutral-200 p-2"
        >
          <Image
            src={currentStyleImage}
            alt="Style"
            fill
            className="object-contain p-2"
          />
        </motion.div>
      )}

      {/* Details Layer (Vest, Trouser) — TOP RIGHT */}
      {currentDetailImage && (
        <motion.div
          key={currentDetailImage}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute top-4 right-4 w-24 h-24 rounded-lg overflow-hidden bg-white/80 backdrop-blur-sm border border-neutral-200 p-2"
        >
          <Image
            src={currentDetailImage}
            alt="Detail"
            fill
            className="object-contain p-2"
          />
        </motion.div>
      )}

      {/* Selected Options Summary — BOTTOM */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2 justify-center">
        {selectedStyle.map((s) => (
          <span
            key={s}
            className="text-[10px] uppercase tracking-widest bg-amber-100 text-amber-800 px-2 py-1 rounded"
          >
            {s.replace("lapel-", "").replace("buttons-", "").replace("sleeve-", "")}
          </span>
        ))}
        {selectedDetails.map((d) => (
          <span
            key={d}
            className="text-[10px] uppercase tracking-widest bg-neutral-100 text-neutral-700 px-2 py-1 rounded"
          >
            {d.replace("trouser-", "").replace("vest-", "")}
          </span>
        ))}
      </div>

      {/* Live Preview Label */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.2em] text-neutral-400">
        Live Preview
      </div>
    </div>
  );
}
