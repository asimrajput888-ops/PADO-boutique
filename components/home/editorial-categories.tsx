import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/site/reveal'

const tiles = [
  { label: 'Men', cta: "Shop Men's Tailoring", href: '/shop/men', image: '/images/editorial-men.png' },
  {
    label: 'Women',
    cta: "Shop Women's Tailoring",
    href: '/shop/women',
    image: '/images/editorial-women.png',
  },
  { label: 'Fabrics', cta: 'Explore Fabrics', href: '/custom', image: '/images/editorial-fabrics.png' },
  {
    label: 'Custom Tailoring',
    cta: 'Create Your Suit',
    href: '/custom',
    image: '/images/editorial-custom.png',
  },
]

export function EditorialCategories() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
        {tiles.map((tile, i) => (
          <Reveal key={tile.label} delay={i * 90}>
            <Link href={tile.href} className="group relative block aspect-[4/5] overflow-hidden bg-muted">
              <Image
                src={tile.image || '/placeholder.svg'}
                alt={tile.label}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-charcoal/10 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="font-serif text-3xl text-offwhite">{tile.label}</h3>
                <span className="mt-2 flex items-center gap-2 text-[10px] tracking-wide-sm text-offwhite/85 uppercase">
                  {tile.cta}
                  <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
