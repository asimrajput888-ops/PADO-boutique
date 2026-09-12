import Image from 'next/image'
import { fabrics } from '@/lib/data'
import { formatSigned } from '@/lib/format'
import { SectionHeading } from '@/components/site/section-heading'
import { Reveal } from '@/components/site/reveal'

export function FabricAtelier() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-20">
        <div>
          <SectionHeading eyebrow="The Fabric Atelier" title="The art of fabric." />
          <Reveal as="p" delay={140} className="mt-6 max-w-md leading-relaxed text-muted-foreground">
            A suit is only as considered as the cloth it begins with. We source and finish a curated
            edit of the world&apos;s finest suiting — each with its own weight, hand and character.
          </Reveal>

          <div className="mt-10 divide-y divide-border border-y border-border">
            {fabrics.map((fabric) => (
              <Reveal
                key={fabric.id}
                className="flex items-center justify-between gap-4 py-4"
              >
                <div className="flex items-center gap-4">
                  <span
                    className="h-9 w-9 rounded-full border border-border"
                    style={{ backgroundColor: fabric.hex }}
                  />
                  <div>
                    <p className="font-serif text-xl leading-none">{fabric.name}</p>
                    <p className="mt-1 text-[12px] text-muted-foreground">{fabric.detail}</p>
                  </div>
                </div>
                <span className="text-[11px] tracking-wide-sm text-muted-foreground uppercase">
                  {formatSigned(fabric.price)}
                </span>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={120} className="grid grid-cols-2 gap-3">
          {fabrics.map((fabric, i) => (
            <div
              key={fabric.id}
              className={`group relative overflow-hidden bg-muted ${
                i % 2 === 0 ? 'aspect-[4/5]' : 'aspect-[4/5] md:mt-10'
              }`}
            >
              <Image
                src={fabric.swatch || '/placeholder.svg'}
                alt={`${fabric.name} fabric texture`}
                fill
                sizes="(max-width: 1024px) 45vw, 25vw"
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/70 to-transparent p-4">
                <p className="text-[10px] tracking-wide-sm text-offwhite uppercase">{fabric.name}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
