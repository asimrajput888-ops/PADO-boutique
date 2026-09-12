'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export function Hero() {
  const [offset, setOffset] = useState(0)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => setOffset(window.scrollY))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section className="relative h-[92vh] min-h-[600px] w-full overflow-hidden bg-charcoal">
      <div
        className="absolute inset-0 will-change-transform"
        style={{ transform: `translate3d(0, ${offset * 0.35}px, 0) scale(1.06)` }}
      >
        <Image
          src="/images/hero.png"
          alt="A man and woman in impeccably tailored suits"
          fill
          priority
          sizes="100vw"
          className={`object-cover object-center transition-[opacity,transform] duration-[1600ms] ease-out ${
            loaded ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
          }`}
        />
      </div>

      {/* Cinematic overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/25 to-charcoal/40" />
      <div className="absolute inset-0 bg-charcoal/10" />

      <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-end px-5 pb-20 md:px-8 md:pb-28">
        <div className="max-w-2xl">
          <p
            className={`text-[11px] tracking-luxe text-champagne uppercase transition-all delay-300 duration-1000 ${
              loaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            Bespoke — Tailored For You
          </p>
          <h1
            className={`mt-5 font-serif text-5xl leading-[0.95] text-balance text-offwhite transition-all delay-500 duration-1000 md:text-7xl lg:text-8xl ${
              loaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
          >
            Timeless Style.
            <br />
            Made For You.
          </h1>
          <p
            className={`mt-6 max-w-lg text-base leading-relaxed text-offwhite/80 transition-all delay-700 duration-1000 md:text-lg ${
              loaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
          >
            Modern tailoring for men and women. Choose from our signature designs or create your
            own — crafted with premium fabrics and a precise, personal fit.
          </p>
          <div
            className={`mt-9 flex flex-col gap-3 transition-all delay-1000 duration-1000 sm:flex-row ${
              loaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
          >
            <Link
              href="/shop"
              className="group flex items-center justify-center gap-3 bg-offwhite px-9 py-4 text-[11px] tracking-wide-sm text-charcoal uppercase transition-colors hover:bg-champagne"
            >
              Shop Collection
            </Link>
            <Link
              href="/custom"
              className="group flex items-center justify-center gap-3 border border-offwhite/50 px-9 py-4 text-[11px] tracking-wide-sm text-offwhite uppercase backdrop-blur-sm transition-colors hover:border-offwhite hover:bg-offwhite/10"
            >
              Create Your Suit
            </Link>
          </div>
        </div>
      </div>

      <div
        className={`absolute right-8 bottom-10 z-10 hidden flex-col items-center gap-3 transition-opacity delay-[1200ms] duration-1000 lg:flex ${
          loaded ? 'opacity-60' : 'opacity-0'
        }`}
      >
        <span className="text-[9px] tracking-luxe text-offwhite uppercase [writing-mode:vertical-rl]">
          Scroll
        </span>
        <span className="h-12 w-px bg-offwhite/50" />
      </div>
    </section>
  )
}
