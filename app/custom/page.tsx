import type { Metadata } from 'next'
import SuitBuilder from '@/components/suit-builder'

export const metadata: Metadata = {
  title: 'Create Your Bespoke Suit | Zoe Pado',
  description: 'Design your custom tailored suit with exact body measurements.',
}

export default function CustomPage() {
  return (
    <main>
      <section className="border-b border-neutral-200 bg-neutral-50 py-10 text-center">
        <div className="mx-auto max-w-[1500px] px-5">
          <p className="text-[11px] uppercase tracking-widest text-neutral-500">
            Zoe Pado Digital Atelier
          </p>
          <h1 className="mx-auto mt-2 max-w-3xl text-3xl font-serif font-bold sm:text-4xl">
            Bespoke Suit Configurator & Measurement Studio
          </h1>
          <p className="mx-auto mt-2 max-w-xl text-xs text-neutral-600">
            Select lapel stance, silk lining, custom monogramming, and input precise tailor measurements.
          </p>
        </div>
      </section>
      <SuitBuilder />
    </main>
  )
}
