import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/site/reveal'

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-charcoal">
      <div className="absolute inset-0 opacity-40">
        <Image
          src="/images/atelier-fabric.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          aria-hidden
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/60" />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-5 py-28 text-center md:px-8 md:py-40">
        <Reveal as="p" className="text-[11px] tracking-luxe text-champagne uppercase">
          Begin
        </Reveal>
        <Reveal
          as="h2"
          delay={80}
          className="mt-6 font-serif text-4xl leading-[1.02] text-balance text-offwhite md:text-7xl"
        >
          Your suit. Your measurements. Your signature.
        </Reveal>
        <Reveal delay={160}>
          <Link
            href="/custom"
            className="group mt-10 inline-flex items-center gap-3 bg-offwhite px-10 py-4 text-[11px] tracking-wide-sm text-charcoal uppercase transition-colors hover:bg-champagne"
          >
            Start Your Bespoke Journey
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
