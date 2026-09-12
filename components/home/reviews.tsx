'use client'

import { useEffect, useState } from 'react'
import { reviews } from '@/lib/data'

export function Reviews() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setActive((a) => (a + 1) % reviews.length), 6500)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="border-y border-border bg-offwhite py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-5 text-center md:px-8">
        <p className="text-[11px] tracking-luxe text-muted-foreground uppercase">Client Voices</p>
        <div className="relative mt-10 min-h-[240px] md:min-h-[200px]">
          {reviews.map((review, i) => (
            <blockquote
              key={review.name}
              className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-1000 ${
                i === active ? 'opacity-100' : 'pointer-events-none opacity-0'
              }`}
            >
              <span className="font-serif text-6xl leading-none text-champagne">&ldquo;</span>
              <p className="mt-4 max-w-2xl font-serif text-2xl leading-snug text-balance md:text-4xl md:leading-snug">
                {review.quote}
              </p>
              <footer className="mt-8">
                <p className="text-[12px] tracking-wide-sm uppercase">{review.name}</p>
                <p className="mt-1 text-[11px] tracking-wide-sm text-muted-foreground uppercase">
                  {review.location}
                </p>
              </footer>
            </blockquote>
          ))}
        </div>
        <div className="mt-10 flex items-center justify-center gap-3">
          {reviews.map((review, i) => (
            <button
              key={review.name}
              onClick={() => setActive(i)}
              aria-label={`Show review ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === active ? 'w-8 bg-charcoal' : 'w-1.5 bg-border'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
