export interface Product {
  id: string
  name: string
  category: string
  price: number
  fabric: string
  color: string
  image: string
  isNew?: boolean
}

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Bespoke Charcoal Double-Breasted Suit",
    category: "suits",
    price: 1250,
    fabric: "Super 130s Merino Wool",
    color: "Charcoal",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=800",
    isNew: true,
  },
  {
    id: "2",
    name: "Midnight Navy Italian Cut Blazer",
    category: "blazers",
    price: 850,
    fabric: "Italian Wool-Silk Blend",
    color: "Navy",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "3",
    name: "Classic White Cotton Dress Shirt",
    category: "shirts",
    price: 180,
    fabric: "2-Ply Egyptian Cotton",
    color: "White",
    image: "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?auto=format&fit=crop&q=80&w=800",
  },
]
