import type { Metadata } from 'next'
import ShopCatalog from '@/components/shop-catalog'

export const metadata: Metadata = {
  title: 'Shop Collection | Zoe Pado',
  description: 'Explore bespoke tailoring, fine suits, and luxury apparel.',
}

export default function ShopPage() {
  return (
    <main className="py-8">
      <section className="border-b border-neutral-200 bg-neutral-50 py-10 text-center">
        <h1 className="text-3xl font-serif font-bold sm:text-4xl">The Ready-to-Wear Collection</h1>
        <p className="mt-2 text-sm text-neutral-600">Curated garments crafted with unmatched precision.</p>
      </section>
      <ShopCatalog />
    </main>
  )
}
