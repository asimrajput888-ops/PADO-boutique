// lib/customizer-data.ts

export const GARMENTS = [
  { id: "suit", name: "Full Suit", basePrice: 45000 },
  { id: "blazer", name: "Blazer", basePrice: 32000 },
  { id: "trousers", name: "Trousers", basePrice: 15000 },
  { id: "waistcoat", name: "Waistcoat", basePrice: 18000 },
  { id: "shirt", name: "Shirt", basePrice: 12000 },
  { id: "coat", name: "Coat", basePrice: 55000 },
];

export const FABRICS = [
  { id: "premium-wool", name: "Premium Wool", price: 0, color: "#1a1a1a" },
  { id: "super-120s", name: "Super 120s", price: 5000, color: "#2d2d2d" },
  { id: "super-130s", name: "Super 130s", price: 8000, color: "#3d3d3d" },
  { id: "linen", name: "Linen", price: 3000, color: "#d4c5a9" },
  { id: "wool-blend", name: "Wool Blend", price: 2000, color: "#4a4a4a" },
  { id: "seasonal", name: "Seasonal Fabrics", price: 6000, color: "#8b7355" },
];

export const LAPEL_OPTIONS = [
  { id: "notch", name: "Notch Lapel", price: 0, thumbnail: "/images/thumbnails/notch-lapel.png" },
  { id: "peak", name: "Peak Lapel", price: 3000, thumbnail: "/images/thumbnails/peak-lapel.png" },
  { id: "shawl", name: "Shawl Lapel", price: 4000, thumbnail: "/images/thumbnails/shawl-lapel.png" },
];

export const BUTTON_OPTIONS = [
  { id: "1-button", name: "One Button", price: 0, thumbnail: "/images/thumbnails/1-button.png" },
  { id: "2-button", name: "Two Button", price: 0, thumbnail: "/images/thumbnails/2-button.png" },
  { id: "double-breasted", name: "Double Breasted", price: 4000, thumbnail: "/images/thumbnails/double-breasted.png" },
];

export const SLEEVE_OPTIONS = [
  { id: "3-sleeve", name: "3 Sleeve Buttons", price: 0, thumbnail: "/images/thumbnails/3-sleeve.png" },
  { id: "4-sleeve", name: "4 Sleeve Buttons", price: 0, thumbnail: "/images/thumbnails/4-sleeve.png" },
];

export const POCKET_OPTIONS = [
  { id: "flap", name: "Flap Pockets", price: 0, thumbnail: "/images/thumbnails/flap-pocket.png" },
  { id: "welt", name: "Welt Pockets", price: 500, thumbnail: "/images/thumbnails/welt-pocket.png" },
  { id: "ticket", name: "Ticket Pocket", price: 700, thumbnail: "/images/thumbnails/ticket-pocket.png" },
];

export const FIT_OPTIONS = [
  { id: "slim", name: "Slim Fit", price: 0, thumbnail: "/images/thumbnails/slim-fit.png" },
  { id: "classic", name: "Classic Fit", price: 0, thumbnail: "/images/thumbnails/classic-fit.png" },
  { id: "relaxed", name: "Relaxed Fit", price: 2000, thumbnail: "/images/thumbnails/relaxed-fit.png" },
];

export const TROUSER_OPTIONS = [
  { id: "flat-front", name: "Flat Front", price: 0, thumbnail: "/images/thumbnails/flat-front.png" },
  { id: "double-pleat", name: "Double Pleat", price: 1000, thumbnail: "/images/thumbnails/double-pleat.png" },
  { id: "triple-pleat", name: "Triple Pleat", price: 1500, thumbnail: "/images/thumbnails/triple-pleat.png" },
];

export const VEST_OPTIONS = [
  { id: "with-vest", name: "With Vest", price: 18000, thumbnail: "/images/thumbnails/vest-yes.png" },
  { id: "no-vest", name: "Without Vest", price: 0, thumbnail: "/images/thumbnails/vest-no.png" },
];

export const LINING_OPTIONS = [
  { id: "navy", name: "Navy Lining", price: 0, color: "#1a237e" },
  { id: "black", name: "Black Lining", price: 0, color: "#000000" },
  { id: "burgundy", name: "Burgundy Lining", price: 500, color: "#800020" },
  { id: "grey", name: "Grey Lining", price: 0, color: "#424242" },
];
