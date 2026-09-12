import { Ruler, Gem, Globe, ShieldCheck, Sparkles } from 'lucide-react'
import { benefits } from '@/lib/data'
import { SectionHeading } from '@/components/site/section-heading'
import { Reveal } from '@/components/site/reveal'

const icons = [Ruler, Gem, Globe, ShieldCheck, Sparkles]

export function WhyBespoke() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
      <SectionHeading eyebrow="Why BESPOKE" title="Considered in every stitch." />
      <div className="mt-14 grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-5">
        {benefits.map((benefit, i) => {
          const Icon = icons[i]
          return (
            <Reveal key={benefit.title} delay={i * 70} className="bg-background p-8">
              <Icon className="h-6 w-6 text-champagne" strokeWidth={1.25} />
              <h3 className="mt-6 text-[12px] tracking-wide-sm uppercase">{benefit.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{benefit.text}</p>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
