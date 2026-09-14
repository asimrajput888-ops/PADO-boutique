// lib/products.ts

export interface Product {
  id: string;
  name: string;
  price: number;
  category: "men" | "women" | "custom" | "signature";
  image: string;
  description: string;
}

export const PRODUCTS: Product[] = [
  // ============================================
  // MEN'S BESPOKE COLLECTION
  // ============================================
  {
    id: "italian-wool-suit",
    name: "The Italian Wool Suit",
    price: 45000,
    category: "men",
    image: "/images/editorial-men.png",
    description: "Hand-cut Italian wool suit with precision canvas construction.",
  },
  {
    id: "navy-blazer",
    name: "The Navy Blue Blazer",
    price: 35000,
    category: "men",
    image: "/images/product-alton.png",
    description: "Classic navy blazer, perfect for both formal and smart-casual occasions.",
  },
  {
    id: "linen-shirt",
    name: "The Casual Linen Shirt",
    price: 12000,
    category: "men",
    image: "/images/product-belgrave.png",
    description: "Breathable linen shirt, ideal for warm weather elegance.",
  },
  {
    id: "charcoal-trousers",
    name: "Charcoal Tailored Trousers",
    price: 18000,
    category: "men",
    image: "/images/product-camden.png",
    description: "Slim-fit charcoal trousers, tailored for a sharp silhouette.",
  },
  {
    id: "bespoke-waistcoat",
    name: "Bespoke Waistcoat",
    price: 22000,
    category: "men",
    image: "/images/product-foxley.png",
    description: "Elegant waistcoat with adjustable back strap.",
  },
  {
    id: "heritage-overcoat",
    name: "Heritage Overcoat",
    price: 65000,
    category: "men",
    image: "/images/product-harrow.png",
    description: "Full-length wool overcoat for the modern gentleman.",
  },

  // ============================================
  // WOMEN'S BESPOKE COLLECTION
  // ============================================
  {
    id: "silk-loungewear",
    name: "Silk Loungewear Set",
    price: 28000,
    category: "women",
    image: "/images/editorial-women.png",
    description: "Pure silk loungewear set for effortless luxury.",
  },
  {
    id: "emerald-gown",
    name: "Emerald Evening Gown",
    price: 120000,
    category: "women",
    image: "/images/product-kensington.png",
    description: "Hand-embroidered evening gown in emerald silk.",
  },
  {
    id: "ivory-saree",
    name: "Ivory Chiffon Saree",
    price: 65000,
    category: "women",
    image: "/images/product-marlow.png",
    description: "Delicate chiffon saree with subtle gold detailing.",
  },
  {
    id: "gold-jacket",
    name: "Gold Embroidered Jacket",
    price: 55000,
    category: "women",
    image: "/images/editorial-fabrics.png",
    description: "Statement jacket with hand-embroidered gold motifs.",
  },

  // ============================================
  // PADO SIGNATURE DESIGNS (CUSTOM — TIER 2)
  // ============================================
  {
    id: "pado-atelier-navy",
    name: "PADO Atelier Navy",
    price: 85000,
    category: "custom",
    image: "/images/editorial-custom.png",
    description: "Exclusive PADO signature design with hand-stitched peak lapels and a bespoke navy wool finish.",
  },
  {
    id: "pado-heritage-check",
    name: "PADO Heritage Check",
    price: 92000,
    category: "custom",
    image: "/images/editorial-fabrics.png",
    description: "PADO's take on the classic check pattern — soft flannel finish with subtle texture.",
  },
  {
    id: "pado-modern-ivory",
    name: "PADO Modern Ivory",
    price: 78000,
    category: "custom",
    image: "/images/hero.png",
    description: "A contemporary ivory blazer with a relaxed silhouette, perfect for evening wear.",
  },
  {
    id: "pado-signature-charcoal",
    name: "PADO Signature Charcoal",
    price: 88000,
    category: "custom",
    image: "/images/editorial-men.png",
    description: "PADO's take on the timeless charcoal suit — clean lines and structured shoulders.",
  },

  // ============================================
  // SIGNATURE SUIT (READY-TO-WEAR — TIER 3)
  // ============================================
  {
    id: "signature-navy-single",
    name: "Signature Navy Suit — Single Breasted",
    price: 55000,
    category: "signature",
    image: "/images/garments/suit.webp",
    description: "Ready-to-wear signature navy suit. Single breasted, slim fit.",
  },
  {
    id: "signature-charcoal-double",
    name: "Signature Charcoal Suit — Double Breasted",
    price: 65000,
    category: "signature",
    image: "/images/garments/suit.webp",
    description: "Ready-to-wear signature charcoal suit. Double breasted, classic fit.",
  },
  {
    id: "signature-black-single",
    name: "Signature Black Suit — Single Breasted",
    price: 58000,
    category: "signature",
    image: "/images/garments/suit.webp",
    description: "Ready-to-wear signature black suit. Single breasted, slim fit.",
  },
  {
    id: "signature-beige-double",
    name: "Signature Beige Suit — Double Breasted",
    price: 62000,
    category: "signature",
    image: "/images/garments/suit.webp",
    description: "Ready-to-wear signature beige suit. Double breasted, relaxed fit.",
  },
];

// ============================================
// HELPER FUNCTIONS
// ============================================
export const getProductsByCategory = (
  category: "men" | "women" | "custom" | "signature"
) => {
  return PRODUCTS.filter((p) => p.category === category);
};

export const getProductById = (id: string) => {
  return PRODUCTS.find((p) => p.id === id);
};
