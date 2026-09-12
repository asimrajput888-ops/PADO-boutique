'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/site/reveal'

const steps = [
  '01 Fabric',
  '02 Lapel',
  '03 Fit',
  '04 Buttons',
  '05 Fit Preference',
  '06 Measurements',
]

export function BuilderTeaser() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: py * -7, y: px * 9 })
  }

  return (
    <section className="relative overflow-hidden bg-charcoal py-20 text-offwhite md:py-28">
      <div className="mx-auto grid max-w-[1400px] items-center gap-14 px-5 md:px-8 lg:grid-cols-2">
        {/* Visual */}
        <Reveal className="order-2 lg:order-1">
          <div
            ref={ref}
            onMouseMove={onMove}
            onMouseLeave={() => setTilt({ x: 0, y: 0 })}
            className="relative mx-auto aspect-[3/4] w-full max-w-md [perspective:1400px]"
          >
            <div
              className="relative h-full w-full transition-transform duration-300 ease-out [transform-style:preserve-3d]"
              style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
            >
              <div
                className="absolute inset-6 bg-champagne/15"
                style={{ transform: 'translateZ(-60px)' }}
              />
              <div
                className="relative h-full w-full overflow-hidden shadow-2xl"
                style={{ transform: 'translateZ(20px)' }}
              >
                <Image
                  src="/images/builder-suit.png"
                  alt="A bespoke suit being configured"
                  fill
                  sizes="(max-width: 1024px) 90vw, 40vw"
                  className="object-cover"
                />
              </div>
              <div
                className="absolute -bottom-4 left-1/2 h-8 w-3/4 -translate-x-1/2 rounded-full bg-black/40 blur-2xl"
                style={{ transform: 'translateZ(-40px)' }}
              />
            </div>
          </div>
        </Reveal>

        {/* Copy */}
        <div className="order-1 lg:order-2">
          <Reveal as="p" className="text-[11px] tracking-luxe text-champagne uppercase">
            Create Your Bespoke Suit
          </Reveal>
          <Reveal
            as="h2"
            delay={80}
            className="mt-5 font-serif text-4xl leading-[1.0] text-balance md:text-6xl"
          >
            Every detail, chosen by you.
          </Reveal>
          <Reveal as="p" delay={140} className="mt-6 max-w-md leading-relaxed text-offwhite/75">
            Step into our digital tailoring studio. Select your cloth, shape your lapel, choose your
            fit and buttons, then enter your measurements — and watch your suit take form in real
            time.
          </Reveal>

          <Reveal delay={200} className="mt-9 grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step}
                className="border-t border-offwhite/20 pt-3 text-[11px] tracking-wide-sm text-offwhite/80 uppercase"
              >
                {step}
              </div>
            ))}
          </Reveal>

          <Reveal delay={260}>
            <Link
              href="/custom"
              className="group mt-10 inline-flex items-center gap-3 bg-offwhite px-9 py-4 text-[11px] tracking-wide-sm text-charcoal uppercase transition-colors hover:bg-champagne"
            >
              Enter the Studio
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
