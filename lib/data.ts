// lib/data.ts

// ============================================
// TYPES
// ============================================

export type Gender = "men" | "women" | "unisex";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: "men" | "women" | "custom" | "signature" | "seasonal";
  gender?: Gender;
  image: string;
  description: string;
  fabric?: string;
  subcategory?: string | null;
}

export interface Review {
  id: number;
  name: string;
  country: string;
  text: string;
  rating: number;
}

export interface Benefit {
  id: number;
  title: string;
  description: string;
  icon: string;
}

// ============================================
// DATA (khaali — ab Supabase se aayega)
// ============================================

export const products: Product[] = [];
export const reviews: Review[] = [];
export const benefits: Benefit[] = [];

// ============================================
// STATIC DATA
// ============================================

export const CATEGORIES = [
  { id: "men", name: "Men", href: "/custom/men" },
  { id: "women", name: "Women", href: "/custom/women" },
  { id: "signature", name: "Signature", href: "/signature-suit" },
  { id: "seasonal", name: "Seasonal", href: "/seasonal" },
];

export const NAV_LINKS = [
  { name: "Shop", href: "/shop" },
  { name: "Custom Men", href: "/custom/men" },
  { name: "Custom Women", href: "/custom/women" },
  { name: "Seasonal", href: "/seasonal" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];
