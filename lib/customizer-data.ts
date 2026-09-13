// lib/customizer-data.ts

// ==========================================
// STEP 01 — CHOOSE GARMENT
// ==========================================
export const GARMENTS = [
  {
    id: "suit",
    name: "Suit",
    basePrice: 45000,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c47e35f?w=800&q=80",
  },
  {
    id: "blazer",
    name: "Blazer",
    basePrice: 32000,
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80",
  },
  {
    id: "trousers",
    name: "Trousers",
    basePrice: 15000,
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80",
  },
  {
    id: "waistcoat",
    name: "Waistcoat",
    basePrice: 18000,
    image: "https://images.unsplash.com/photo-1593030103066-0093718efeb9?w=800&q=80",
  },
  {
    id: "shirt",
    name: "Shirt",
    basePrice: 12000,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80",
  },
  {
    id: "coat",
    name: "Coat",
    basePrice: 55000,
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80",
  },
];

// ==========================================
// STEP 02 — CHOOSE FABRIC
// ==========================================
export const FABRICS = [
  { id: "premium-wool", name: "Premium Wool", price: 0 },
  { id: "super-120s", name: "Super 120s", price: 5000 },
  { id: "super-130s", name: "Super 130s", price: 8000 },
  { id: "linen", name: "Linen", price: 3000 },
  { id: "wool-blend", name: "Wool Blend", price: 2000 },
  { id: "seasonal", name: "Seasonal Fabrics", price: 6000 },
];

// ==========================================
// STEP 03 — CHOOSE STYLE
// ==========================================
export const STYLES = [
  { id: "single-breasted", name: "Single Breasted", price: 0 },
  { id: "double-breasted", name: "Double Breasted", price: 4000 },
  { id: "buttons-1", name: "1 Button", price: 0 },
  { id: "buttons-2", name: "2 Button", price: 0 },
  { id: "buttons-3", name: "3 Button", price: 2000 },
  { id: "notch-lapel", name: "Notch Lapel", price: 0 },
  { id: "peak-lapel", name: "Peak Lapel", price: 3000 },
  { id: "shawl-lapel", name: "Shawl Lapel", price: 4000 },
  { id: "slim", name: "Slim Fit", price: 0 },
  { id: "classic", name: "Classic Fit", price: 0 },
  { id: "relaxed", name: "Relaxed Fit", price: 2000 },
];

// ==========================================
// STEP 04 — CUSTOMIZE DETAILS
// ==========================================
export const DETAILS = [
  { id: "lapel-width", name: "Lapel Width", price: 0 },
  { id: "buttons", name: "Buttons", price: 1500 },
  { id: "buttonhole", name: "Buttonhole", price: 1000 },
  { id: "chest-pocket", name: "Chest Pocket", price: 500 },
  { id: "side-pockets", name: "Side Pockets", price: 800 },
  { id: "ticket-pocket", name: "Ticket Pocket", price: 700 },
  { id: "vents", name: "Vents", price: 1200 },
  { id: "sleeve-buttons", name: "Sleeve Buttons", price: 900 },
  { id: "lining", name: "Lining", price: 2500 },
  { id: "monogram", name: "Monogram", price: 1500 },
];

// ==========================================
// STEP 05 — YOUR FIT
// ==========================================
export const FIT_OPTIONS = [
  { id: "standard", name: "Standard Size", price: 0 },
  { id: "measurements", name: "Enter Measurements", price: 2000 },
  { id: "guided", name: "Guided Measurement", price: 3000 },
  { id: "consultation", name: "Book Fitting Consultation", price: 5000 },
];
