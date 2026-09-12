export type Gender = 'men' | 'women'

export type Product = {
  slug: string
  name: string
  color: string
  colorHex: string
  price: number
  gender: Gender
  fabric: string
  style: string
  image: string
  description: string
}

export const products: Product[] = [
  {
    slug: 'the-foxley',
    name: 'The Foxley',
    color: 'Charcoal',
    colorHex: '#3a3a3d',
    price: 690,
    gender: 'men',
    fabric: 'Super 120s Wool',
    style: 'Two-Piece',
    image: '/images/product-foxley.png',
    description:
      'A modern charcoal essential cut from Super 120s wool. The Foxley is the quiet anchor of a considered wardrobe — precise shoulders, a clean drape and a finish that carries from boardroom to evening.',
  },
  {
    slug: 'the-alton',
    name: 'The Alton',
    color: 'Grey',
    colorHex: '#8f8d88',
    price: 890,
    gender: 'men',
    fabric: 'Silk-Wool Blend',
    style: 'Two-Piece',
    image: '/images/product-alton.png',
    description:
      'Soft grey with a whisper of sheen. The Alton blends silk and wool for a fluid, luminous hand that moves beautifully and photographs even better.',
  },
  {
    slug: 'the-marlow',
    name: 'The Marlow',
    color: 'Navy',
    colorHex: '#2b3245',
    price: 690,
    gender: 'men',
    fabric: 'Super 120s Wool',
    style: 'Two-Piece',
    image: '/images/product-marlow.png',
    description:
      'The definitive navy. The Marlow is engineered for versatility — a deep, honest blue with a structured lapel and a fit that flatters without constraint.',
  },
  {
    slug: 'the-harrow',
    name: 'The Harrow',
    color: 'Black',
    colorHex: '#1c1c1e',
    price: 890,
    gender: 'men',
    fabric: 'Silk-Wool Blend',
    style: 'Evening',
    image: '/images/product-harrow.png',
    description:
      'An evening suit with intent. The Harrow is rendered in a silk-wool blend with a refined satin lapel option — made for the moments that matter most.',
  },
  {
    slug: 'the-camden',
    name: 'The Camden',
    color: 'Ivory',
    colorHex: '#e7e0d3',
    price: 725,
    gender: 'women',
    fabric: 'Super 120s Wool',
    style: 'Trouser Suit',
    image: '/images/product-camden.png',
    description:
      'Ivory, softened and precise. The Camden is a tailored trouser suit with elongated lines and an effortless confidence — a modern heirloom.',
  },
  {
    slug: 'the-belgrave',
    name: 'The Belgrave',
    color: 'Charcoal',
    colorHex: '#3a3a3d',
    price: 925,
    gender: 'women',
    fabric: 'Silk-Wool Blend',
    style: 'Trouser Suit',
    image: '/images/product-belgrave.png',
    description:
      'The Belgrave is sharp tailoring with a fluid soul — a charcoal silk-wool suit sculpted to the body with a nipped waist and a clean, high trouser.',
  },
  {
    slug: 'the-primrose',
    name: 'The Primrose',
    color: 'Navy',
    colorHex: '#2b3245',
    price: 725,
    gender: 'women',
    fabric: 'Super 120s Wool',
    style: 'Trouser Suit',
    image: '/images/product-primrose.png',
    description:
      'A navy trouser suit with quiet authority. The Primrose pairs a structured shoulder with a relaxed leg for a silhouette that is both commanding and easy.',
  },
  {
    slug: 'the-kensington',
    name: 'The Kensington',
    color: 'Taupe',
    colorHex: '#b8a892',
    price: 925,
    gender: 'women',
    fabric: 'Linen',
    style: 'Trouser Suit',
    image: '/images/product-kensington.png',
    description:
      'Taupe linen, tailored for warmth and light. The Kensington is a breathable, elegant suit built for travel, celebration and the long golden hour.',
  },
]

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug)
}

export type Option = {
  id: string
  name: string
  detail: string
  price: number
}

export const fabrics: (Option & { hex: string; swatch: string })[] = [
  {
    id: 'super-120s',
    name: 'Super 120s Wool',
    detail: 'The signature — fine, resilient, all-season.',
    price: 0,
    hex: '#3a3a3d',
    swatch: '/images/swatch-wool.png',
  },
  {
    id: 'silk-wool',
    name: 'Silk-Wool Blend',
    detail: 'A luminous hand with a subtle, refined sheen.',
    price: 120,
    hex: '#c9c2b4',
    swatch: '/images/swatch-silkwool.png',
  },
  {
    id: 'linen',
    name: 'Linen',
    detail: 'Breathable and textured — made for warmth and light.',
    price: 40,
    hex: '#b8a892',
    swatch: '/images/swatch-linen.png',
  },
  {
    id: 'velvet',
    name: 'Velvet',
    detail: 'Plush, deep and dramatic — reserved for evening.',
    price: 180,
    hex: '#26262b',
    swatch: '/images/swatch-velvet.png',
  },
]

export const lapels: Option[] = [
  { id: 'peak', name: 'Peak', detail: 'Bold, upswept and formal.', price: 0 },
  { id: 'notch', name: 'Notch', detail: 'Classic, versatile, timeless.', price: 0 },
  { id: 'shawl', name: 'Shawl', detail: 'Smooth, rounded, for evening.', price: 40 },
]

export const fits: Option[] = [
  { id: 'slim', name: 'Slim', detail: 'Close to the body, sharp lines.', price: 0 },
  { id: 'tailored', name: 'Tailored', detail: 'The signature balanced silhouette.', price: 0 },
  { id: 'oversized', name: 'Oversized', detail: 'Relaxed, fluid, contemporary.', price: 0 },
]

export const buttons: (Option & { hex: string })[] = [
  { id: 'horn', name: 'Horn', detail: 'Natural, warm-toned, unique grain.', price: 0, hex: '#4b3a2b' },
  {
    id: 'mother-of-pearl',
    name: 'Mother of Pearl',
    detail: 'Iridescent and refined.',
    price: 30,
    hex: '#ece7de',
  },
  { id: 'matte-black', name: 'Matte Black', detail: 'Modern and understated.', price: 0, hex: '#1c1c1e' },
]

export const fitPreferences: Option[] = [
  { id: 'snug', name: 'Snug', detail: 'A closer, sharper hold.', price: 0 },
  { id: 'true', name: 'True to Size', detail: 'Our recommended fit.', price: 0 },
  { id: 'relaxed', name: 'Relaxed', detail: 'A touch of ease and movement.', price: 0 },
]

export const BASE_PRICE = 690

export const measurementFields: Record<Gender, { id: string; label: string; hint: string }[]> = {
  men: [
    { id: 'chest', label: 'Chest', hint: 'Around the fullest part of the chest, under the arms.' },
    { id: 'waist', label: 'Waist', hint: 'Around your natural waistline, keeping the tape level.' },
    { id: 'hip', label: 'Hip', hint: 'Around the fullest part of the seat.' },
    { id: 'shoulder', label: 'Shoulder', hint: 'From the edge of one shoulder to the other, across the back.' },
    { id: 'sleeve', label: 'Sleeve', hint: 'From shoulder edge to wrist with the arm slightly bent.' },
    { id: 'inseam', label: 'Inseam', hint: 'From the crotch to the desired trouser hem.' },
  ],
  women: [
    { id: 'bust', label: 'Bust', hint: 'Around the fullest part of the bust, keeping the tape level.' },
    { id: 'waist', label: 'Waist', hint: 'Around the narrowest part of your natural waist.' },
    { id: 'hip', label: 'Hip', hint: 'Around the fullest part of the hips.' },
    { id: 'shoulder', label: 'Shoulder', hint: 'From the edge of one shoulder to the other, across the back.' },
    { id: 'sleeve', label: 'Sleeve', hint: 'From shoulder edge to wrist with the arm slightly bent.' },
    { id: 'inseam', label: 'Inseam', hint: 'From the crotch to the desired trouser hem.' },
  ],
}

export const journalPosts = [
  {
    slug: 'how-to-choose-the-perfect-suit',
    title: 'How to Choose the Perfect Suit',
    category: 'Style',
    excerpt:
      'Colour, cut and cloth — the three decisions that define a suit, and how to make them with confidence.',
    image: '/images/journal-1.png',
    readTime: '6 min',
  },
  {
    slug: 'understanding-suit-fabrics',
    title: 'Understanding Suit Fabrics',
    category: 'Craft',
    excerpt:
      'From Super 120s wool to silk blends and linen — a field guide to the cloths that make a suit.',
    image: '/images/journal-2.png',
    readTime: '8 min',
  },
  {
    slug: 'bespoke-vs-made-to-measure',
    title: 'Bespoke vs Made-to-Measure',
    category: 'Craft',
    excerpt: 'What truly separates the two, and how to know which one is right for you.',
    image: '/images/editorial-custom.png',
    readTime: '5 min',
  },
  {
    slug: 'how-to-measure-yourself',
    title: 'How to Measure Yourself',
    category: 'Guide',
    excerpt: 'A calm, step-by-step guide to taking accurate measurements at home in ten minutes.',
    image: '/images/journal-3.png',
    readTime: '7 min',
  },
  {
    slug: 'suit-styles-for-every-occasion',
    title: 'Suit Styles for Every Occasion',
    category: 'Style',
    excerpt: 'Weddings, work and weekends — building a wardrobe that answers every invitation.',
    image: '/images/editorial-men.png',
    readTime: '6 min',
  },
]

export const reviews = [
  {
    quote:
      'The fit is unlike anything off the rack. It feels like the suit was drawn around me — because it was.',
    name: 'James Whitmore',
    location: 'New York, USA',
  },
  {
    quote:
      'I designed my own suit down to the buttons. The process felt personal, considered and genuinely luxurious.',
    name: 'Amara Osei',
    location: 'Toronto, Canada',
  },
  {
    quote:
      'From fabric to delivery, everything was effortless. It arrived pressed, boxed and absolutely perfect.',
    name: 'Sofia Laurent',
    location: 'Paris, France',
  },
]

export const benefits = [
  { title: 'Perfect Fit', text: 'Custom measurements for a precise, personal fit.' },
  { title: 'Premium Fabrics', text: 'Hand-selected materials for exceptional comfort.' },
  { title: 'Worldwide Shipping', text: 'Delivered to your door, wherever you are.' },
  { title: 'Secure Payments', text: 'Safe and protected checkout, every time.' },
  { title: 'Bespoke Service', text: 'A personalised tailoring experience from start to finish.' },
]

export const orderStages = [
  'Order Confirmed',
  'Measurements Received',
  'Tailoring In Progress',
  'Quality Check',
  'Shipped',
  'Delivered',
]
