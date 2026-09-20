// lib/customizer-data.ts

// ============ GARMENTS ============
export const GARMENTS = [
  { id: "suit", name: "Suit", basePrice: 45000, image: "/images/garments/suit.webp" },
  { id: "blazer", name: "Blazer", basePrice: 32000, image: "/images/garments/blazer.webp" },
  { id: "trousers", name: "Trousers", basePrice: 15000, image: "/images/garments/trousers.webp" },
  { id: "waistcoat", name: "Waistcoat", basePrice: 18000, image: "/images/garments/waistcoat.webp" },
  { id: "shirt", name: "Shirt", basePrice: 12000, image: "/images/garments/shirt.webp" },
  { id: "coat", name: "Coat", basePrice: 55000, image: "/images/garments/coat.webp" },
];

// ============ FABRICS ============
export const FABRICS = [
  { id: "premium-wool", name: "Premium Wool", price: 0, colorFilter: "none" },
  { id: "super-120s", name: "Super 120s", price: 5000, colorFilter: "hue-rotate(0deg)" },
  { id: "super-130s", name: "Super 130s", price: 8000, colorFilter: "hue-rotate(20deg)" },
  { id: "linen", name: "Linen", price: 3000, colorFilter: "saturate(0.6) brightness(1.1)" },
  { id: "wool-blend", name: "Wool Blend", price: 2000, colorFilter: "hue-rotate(-20deg)" },
  { id: "seasonal", name: "Seasonal Fabrics", price: 6000, colorFilter: "sepia(0.3)" },
];

// ============ STYLES (Lapel, Buttons, Sleeve) ============
export const STYLES = [
  // Lapel Styles
  { id: "lapel-shawl", name: "Shawl Lapel", price: 0, image: "/images/garments/lapel-shawl.png" },
  { id: "lapel-notch", name: "Notch Lapel", price: 0, image: "/images/garments/lapel-notch.png" },
  { id: "lapel-peak", name: "Peak Lapel", price: 3000, image: "/images/garments/lapel-peak.png" },
  
  // Buttons
  { id: "buttons-1", name: "One Button", price: 0, image: "/images/garments/buttons-1.png" },
  { id: "buttons-2", name: "Two Button", price: 0, image: "/images/garments/buttons-2.png" },
  { id: "buttons-double", name: "Double Breasted", price: 4000, image: "/images/garments/buttons-double.png" },
  
  // Sleeve Buttons
  { id: "sleeve-3", name: "3 Sleeve Buttons", price: 0, image: "/images/garments/sleeve-3-buttons.png" },
  { id: "sleeve-4", name: "4 Sleeve Buttons", price: 0, image: "/images/garments/sleeve-4-buttons.png" },
];

// ============ DETAILS (Vest, Trouser) ============
export const DETAILS = [
  // Vest Options
  { id: "vest-1-welt", name: "Vest — Single Welt Pocket", price: 0, image: "/images/garments/vest-1-welt.png" },
  { id: "vest-2-welt", name: "Vest — Double Welt Pocket", price: 1500, image: "/images/garments/vest-2-welt.png" },
  { id: "vest-flap", name: "Vest — Single Flap Pocket", price: 1000, image: "/images/garments/vest-flap.png" },
  { id: "vest-5-buttons", name: "Vest — 5 Buttons", price: 0, image: "/images/garments/vest-5-buttons.png" },
  { id: "vest-6-buttons", name: "Vest — 6 Buttons", price: 500, image: "/images/garments/vest-6-buttons.png" },
  
  // Trouser Options
  { id: "trouser-classic", name: "Trouser — Classic Fit", price: 0, image: "/images/garments/trouser-classic.png" },
  { id: "trouser-slim", name: "Trouser — Slim Fit", price: 0, image: "/images/garments/trouser-slim.png" },
  { id: "trouser-narrow", name: "Trouser — Narrow Fit", price: 0, image: "/images/garments/trouser-narrow.png" },
  { id: "trouser-flat", name: "Trouser — Flat Front", price: 0, image: "/images/garments/trouser-flat.png" },
  { id: "trouser-double-pleat", name: "Trouser — Double Pleats", price: 1000, image: "/images/garments/trouser-double-pleat.png" },
  { id: "trouser-triple-pleat", name: "Trouser — Triple Pleats", price: 1500, image: "/images/garments/trouser-triple-pleat.png" },
  { id: "trouser-slanted", name: "Trouser — Slanted Pocket", price: 0, image: "/images/garments/trouser-slanted.png" },
  { id: "trouser-slanted-welt", name: "Trouser — Slanted Welt Pocket", price: 800, image: "/images/garments/trouser-slanted-welt.png" },
  { id: "trouser-welt", name: "Trouser — Straight Welt Pocket", price: 700, image: "/images/garments/trouser-welt.png" },
  { id: "trouser-standard-belt", name: "Trouser — Standard Belt Loop", price: 0, image: "/images/garments/trouser-standard-belt.png" },
  { id: "trouser-belt", name: "Trouser — Italian Belt Loop", price: 500, image: "/images/garments/trouser-belt.png" },
  { id: "trouser-adjuster", name: "Trouser — Side Adjusters", price: 1000, image: "/images/garments/trouser-adjuster.png" },
];

// ============ FIT OPTIONS ============
export const FIT_OPTIONS = [
  { id: "standard", name: "Standard Size", price: 0 },
  { id: "measurements", name: "Enter Measurements", price: 2000 },
  { id: "guided", name: "Guided Measurement", price: 3000 },
  { id: "consultation", name: "Book Fitting Consultation", price: 5000 },
];

// ============ FINAL PREVIEW ============
export const FINAL_SUIT_IMAGE = "/images/garments/suit-final.png";
