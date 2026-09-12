'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { products, type Gender } from '@/lib/data'
import { ProductCard } from '@/components/shop/product-card'
import { Reveal } from '@/components/site/reveal'

export function SignatureCollection() {
  const [gender, setGender] = useState<Gender>('men')
  const shown = products.filter((p) => p.gender === gender)

  return (
    <section className="bg-offwhite py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Reveal as="p" className="text-[11px] tracking-luxe text-muted-foreground uppercase">
              Our Signature Collection
            </Reveal>
            <Reveal
              as="h2"
              delay={80}
              className="mt-4 max-w-xl font-serif text-4xl leading-[1.0] text-balance md:text-6xl"
            >
              Designed to be remembered.
            </Reveal>
          </div>

          <Reveal delay={120} className="flex items-center gap-1 border border-border p-1">
            {(['men', 'women'] as Gender[]).map((g) => (
              <button
                key={g}
                onClick={() => setGender(g)}
                className={`px-6 py-2.5 text-[11px] tracking-wide-sm uppercase transition-colors ${
                  gender === g
                    ? 'bg-charcoal text-offwhite'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {g}
              </button>
            ))}
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 lg:grid-cols-4">
          {shown.map((product, i) => (
            <Reveal key={product.slug} delay={i * 70}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <Link
            href="/shop"
            className="group flex items-center gap-3 border border-charcoal px-9 py-4 text-[11px] tracking-wide-sm uppercase transition-colors hover:bg-charcoal hover:text-offwhite"
          >
            View All Designs
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}
