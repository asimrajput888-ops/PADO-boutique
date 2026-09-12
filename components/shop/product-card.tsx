import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import type { Product } from '@/lib/data'
import { formatUSD } from '@/lib/format'

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <Image
          src={product.image || '/placeholder.svg'}
          alt={`${product.name} in ${product.color}`}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-charcoal/0 transition-colors duration-500 group-hover:bg-charcoal/5" />
        <div className="absolute bottom-0 left-0 right-0 translate-y-2 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="flex items-center justify-center gap-2 bg-offwhite/95 py-3 text-[10px] tracking-wide-sm text-charcoal uppercase backdrop-blur-sm">
            View Details <ArrowRight className="h-3 w-3" />
          </span>
        </div>
      </div>
      <div className="flex items-start justify-between gap-2 pt-4">
        <div>
          <h3 className="font-serif text-xl leading-tight">{product.name}</h3>
          <p className="mt-0.5 text-[11px] tracking-wide-sm text-muted-foreground uppercase">
            {product.color}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-foreground">{formatUSD(product.price)}</span>
          <ArrowRight className="h-4 w-4 text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:text-foreground" />
        </div>
      </div>
    </Link>
  )
}
