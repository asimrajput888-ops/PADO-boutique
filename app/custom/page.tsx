import type { Metadata } from 'next'
import SuitBuilder from '@/components/suit-builder'

export const metadata: Metadata = {
  title: 'Create Your Bespoke Suit | Zoe Pado',
  description: 'Design your own suit in our digital tailoring studio.',
}

export default function CustomPage() {
  return (
    <>
      <section className="border-b border-neutral-200 bg-neutral-50 py-12 text-center">
        <div className="mx-auto max-w-[1500px] px-5">
          <p className="text-[11px] uppercase tracking-widest text-neutral-500">
            Create Your Bespoke Suit
          </p>
          <h1 className="mx-auto mt-3 max-w-3xl text-3xl font-serif font-bold sm:text-4xl">
            Every detail, chosen by you.
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-neutral-600">
            Move through six considered steps as you build your suit in real time — a digital tailoring studio, at your command.
          </p>
        </div>
      </section>
      <SuitBuilder />
    </>
  )
}
