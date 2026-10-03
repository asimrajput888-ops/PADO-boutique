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

export interface JournalPost {
  slug: string;
  title: string;
  excerpt: string;
  image?: string;
  category: string;
  readTime: string;
}

export interface Fabric {
  id: string;
  name: string;
  color: string;
  price: number;
  description?: string;
}

// ============================================
// CONSTANTS
// ============================================

export const BASE_PRICE = 450;

// ============================================
// DATA — khaali (Supabase se aayega)
// ============================================

export const products: Product[] = [];
export const reviews: Review[] = [];
export const benefits: Benefit[] = [];

// ============================================
// FABRICS
// ============================================

export const fabrics: Fabric[] = [
  {
    id: "premium-wool",
    name: "Premium Wool",
    color: "#1a1a2e",
    price: 0,
    description: "Classic wool with a soft hand feel.",
  },
  {
    id: "cashmere",
    name: "Cashmere Blend",
    color: "#4a4a4a",
    price: 150,
    description: "Luxurious cashmere blend.",
  },
  {
    id: "linen",
    name: "Linen",
    color: "#d4c5a9",
    price: 80,
    description: "Breathable summer linen.",
  },
  {
    id: "flannel",
    name: "Flannel",
    color: "#3a3a3a",
    price: 100,
    description: "Warm brushed flannel.",
  },
  {
    id: "tweed",
    name: "Tweed",
    color: "#5a4a3a",
    price: 120,
    description: "Traditional textured tweed.",
  },
  {
    id: "silk-blend",
    name: "Silk Blend",
    color: "#2a2a4a",
    price: 200,
    description: "Elegant silk blend.",
  },
  {
    id: "navy-windowpane",
    name: "Navy Windowpane",
    color: "#1e2a4a",
    price: 180,
    description: "Navy with subtle windowpane check.",
  },
  {
    id: "charcoal-herringbone",
    name: "Charcoal Herringbone",
    color: "#2a2a2a",
    price: 160,
    description: "Classic herringbone weave.",
  },
];

// ============================================
// JOURNAL POSTS
// ============================================

export const journalPosts: JournalPost[] = [
  {
    slug: "art-of-bespoke",
    title: "The Art of Bespoke Tailoring",
    excerpt: "Why a made-to-measure suit changes how you carry yourself.",
    image: "/images/journal-1.png",
    category: "Craft",
    readTime: "5 min read",
  },
  {
    slug: "fabric-guide",
    title: "A Gentleman's Guide to Fabric",
    excerpt: "Wool, cashmere, linen — what to pick and when.",
    image: "/images/journal-2.png",
    category: "Style",
    readTime: "4 min read",
  },
  {
    slug: "perfect-fit",
    title: "The Perfect Fit",
    excerpt: "How to measure yourself for a bespoke suit.",
    image: "/images/journal-3.png",
    category: "Guide",
    readTime: "6 min read",
  },
];

// ============================================
// STATIC LISTS
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
