export interface Product {
  id: string
  name: string
  category: 'suits' | 'blazers' | 'shirts' | 'trousers'
  price: number
  fabric: string
  color: string
  image: string
  isNew?: boolean
}

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Bespoke Charcoal Double-Breasted Suit',
    category: 'suits',
    price: 1250,
    fabric: 'Super 130s Merino Wool',
    color: 'Charcoal',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=800',
    isNew: true,
  },
  {
    id: '2',
    name: 'Midnight Navy Italian Cut Blazer',
    category: 'blazers',
    price: 750,
    fabric: 'Italian Cashmere Blend',
    color: 'Navy',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '3',
    name: 'Egyptian Cotton Royal Oxford Shirt',
    category: 'shirts',
    price: 220,
    fabric: '100% Egyptian Cotton',
    color: 'White',
    image: 'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '4',
    name: 'Tailored Flat-Front Trouser',
    category: 'trousers',
    price: 340,
    fabric: 'Worsted Wool',
    color: 'Grey',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800',
  },
]
