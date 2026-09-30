// lib/products.ts

export interface Product {
  id: string;
  name: string;
  price: number;
  category: "men" | "women" | "custom" | "signature";
  image: string;
  description: string;
}

// Fallback products (khali rakho — ab Supabase se data aayega)
export const PRODUCTS: Product[] = [];

export const getProductsByCategory = (
  category: "men" | "women" | "custom" | "signature"
) => {
  return PRODUCTS.filter((p) => p.category === category);
};

export const getProductById = (id: string) => {
  return PRODUCTS.find((p) => p.id === id);
};
