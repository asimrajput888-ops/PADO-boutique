'use client'

import { useState } from 'react'
import { PRODUCTS, Product } from '@/lib/products'

export default function ShopCatalog() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high'>('featured')

  const filteredProducts = PRODUCTS.filter((product) => {
    if (selectedCategory === 'all') return true
    return product.category === selectedCategory
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price
    if (sortBy === 'price-high') return b.price - a.price
    return 0
  })

  return (
    <div className="mx-auto max-w-[1500px] px-5 py-8">
      {/* Filters and Sorting Controls */}
      <div className="flex flex-col gap-4 border-b border-neutral-200 pb-6 md:flex-row md:items-center md:justify-between">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {['all', 'suits', 'blazers', 'shirts', 'trousers'].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-xs uppercase tracking-wider transition-all ${
                selectedCategory === category
                  ? 'bg-black text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-500 uppercase tracking-wider">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="border border-neutral-300 bg-white px-3 py-1.5 text-xs text-neutral-800 focus:outline-none"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="group relative border border-neutral-100 p-4 transition-all hover:shadow-lg">
            <div className="aspect-[3/4] w-full overflow-hidden bg-neutral-100">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="mt-4">
              <p className="text-[10px] uppercase tracking-widest text-neutral-400">{product.fabric}</p>
              <h3 className="mt-1 font-serif text-base font-semibold text-neutral-900">{product.name}</h3>
              <p className="mt-2 text-sm font-medium text-neutral-700">${product.price} USD</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
