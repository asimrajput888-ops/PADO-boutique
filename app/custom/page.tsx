import type { Metadata } from 'next'
import { SuitBuilder } from '@/components/custom/suit-builder'

export const metadata: Metadata = {
  title: 'Create Your Bespoke Suit',
  description:
    'Design your own suit in our digital tailoring studio. Choose fabric, lapel, fit, buttons and enter your measurements for a precise, personal fit.',
}

export default function CustomPage() {
  return (
    <>
      <section className="border-b border-border bg-offwhite">
        <div className="mx-auto max-w-[1500px] px-5 py-14 text-center md:px-8 md:py-20">
          <p className="text-[11px] tracking-luxe text-muted-foreground uppercase">
            Create Your Bespoke Suit
          </p>
          <h1 className="mx-auto mt-5 max-w-3xl font-serif text-4xl leading-[1.02] text-balance md:text-7xl">
            Every detail, chosen by you.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Move through six considered steps. As you choose, your suit and price update in real
            time — a digital tailoring studio, at your own pace.
          </p>
        </div>
      </section>
      <SuitBuilder />
    </>
  )
}
