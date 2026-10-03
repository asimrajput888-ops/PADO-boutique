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

// ============================================
// DATA — khaali (Supabase se aayega)
// ============================================

export const products: Product[] = [];
export const reviews: Review[] = [];
export const benefits: Benefit[] = [];

// ============================================
// JOURNAL POSTS (static)
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
