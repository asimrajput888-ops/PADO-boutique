// lib/customizer-data.ts

export const GARMENTS = [
  { id: "suit", name: "Full Suit", basePrice: 45000, type: "jacket" },
  { id: "blazer", name: "Blazer", basePrice: 32000, type: "jacket" },
  { id: "coat", name: "Coat", basePrice: 55000, type: "jacket" },
  { id: "shirt", name: "Shirt", basePrice: 12000, type: "shirt" },
  { id: "trousers", name: "Trousers", basePrice: 15000, type: "trouser" },
  { id: "waistcoat", name: "Waistcoat", basePrice: 18000, type: "vest" },
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
  { id: "1-button", name: "Single Breasted 1 Button", price: 0, thumbnail: "/images/thumbnails/1-button.png" },
  { id: "2-button", name: "Single Breasted 2 Button", price: 0, thumbnail: "/images/thumbnails/2-button.png" },
  { id: "3-button", name: "Single Breasted 3 Button", price: 2000, thumbnail: "/images/thumbnails/3-button.png" },
  { id: "double-breasted", name: "Double Breasted", price: 4000, thumbnail: "/images/thumbnails/double-breasted.png" },
];

export const SLEEVE_OPTIONS = [
  { id: "1-sleeve", name: "1 Sleeve Button", price: 0, thumbnail: "/images/thumbnails/1-sleeve.png" },
  { id: "2-sleeve", name: "2 Sleeve Buttons", price: 0, thumbnail: "/images/thumbnails/2-sleeve.png" },
  { id: "3-sleeve", name: "3 Sleeve Buttons", price: 0, thumbnail: "/images/thumbnails/3-sleeve.png" },
  { id: "4-sleeve", name: "4 Sleeve Buttons", price: 500, thumbnail: "/images/thumbnails/4-sleeve.png" },
];

export const SHIRT_COLLAR_OPTIONS = [
  { id: "point", name: "Point Collar", price: 0, thumbnail: "/images/thumbnails/point-collar.png" },
  { id: "spread", name: "Spread Collar", price: 0, thumbnail: "/images/thumbnails/spread-collar.png" },
  { id: "mandarin", name: "Mandarin / Stand Collar", price: 1500, thumbnail: "/images/thumbnails/mandarin-collar.png" },
  { id: "button-down", name: "Button-Down Collar", price: 500, thumbnail: "/images/thumbnails/button-down-collar.png" },
];

export const POCKET_OPTIONS = [
  { id: "ticket", name: "Ticket Pocket", price: 700, thumbnail: "/images/thumbnails/ticket-pocket.png" },
  { id: "patch", name: "Patch Pocket", price: 0, thumbnail: "/images/thumbnails/patch-pocket.png" },
  { id: "double-welt", name: "Double Welt Pocket", price: 800, thumbnail: "/images/thumbnails/double-welt.png" },
];

export const FIT_OPTIONS = [
  { id: "slim", name: "Slim Fit", price: 0, thumbnail: "/images/thumbnails/slim-fit.png" },
  { id: "modern", name: "Modern Fit", price: 0, thumbnail: "/images/thumbnails/modern-fit.png" },
  { id: "regular", name: "Regular Fit", price: 2000, thumbnail: "/images/thumbnails/regular-fit.png" },
];

export const TROUSER_OPTIONS = [
  { id: "flat-front", name: "Flat Front", price: 0, thumbnail: "/images/thumbnails/flat-front.png" },
  { id: "single-pleat", name: "Single Pleat", price: 500, thumbnail: "/images/thumbnails/single-pleat.png" },
  { id: "double-pleat", name: "Double Pleat", price: 1000, thumbnail: "/images/thumbnails/double-pleat.png" },
];

export const VENT_OPTIONS = [
  { id: "single-vent", name: "Single Vent (Centre Cut)", price: 0, thumbnail: "/images/thumbnails/single-vent.png" },
  { id: "double-vent", name: "Double Vent (Side Cut)", price: 0, thumbnail: "/images/thumbnails/double-vent.png" },
  { id: "no-vent", name: "No Vent", price: 0, thumbnail: "/images/thumbnails/no-vent.png" },
];

export const VEST_OPTIONS = [
  { id: "without-vest", name: "Without Vest", price: 0 },
  { id: "vest-2-button", name: "2 Button Vest", price: 18000 },
  { id: "vest-3-button", name: "3 Button Vest", price: 18000 },
  { id: "vest-4-button", name: "4 Button Vest", price: 18000 },
  { id: "vest-5-button", name: "5 Button Vest", price: 18000 },
  { id: "vest-6-button", name: "6 Button Vest", price: 18000 },
];

export const LINING_OPTIONS = [
  { id: "navy", name: "Navy Lining", price: 0, color: "#1a237e" },
  { id: "black", name: "Black Lining", price: 0, color: "#000000" },
  { id: "burgundy", name: "Burgundy Lining", price: 500, color: "#800020" },
  { id: "grey", name: "Grey Lining", price: 0, color: "#424242" },
  { id: "cream", name: "Cream Lining", price: 0, color: "#f5f0e1" },
  { id: "royal-blue", name: "Royal Blue Lining", price: 800, color: "#1e40af" },
];
