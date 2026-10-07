// components/SmoothScroll.tsx
'use client'

import { ReactLenis } from 'lenis/react'
import { useEffect, useRef, type ReactNode } from 'react'

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<{ lenis?: { raf: (time: number) => void } } | null>(null)

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time)
    }

    const rafId = requestAnimationFrame(update)
    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <ReactLenis
      root
      ref={lenisRef as any}
      options={{
        duration: 1.2,
        smoothWheel: true,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      }}
    >
      {children}
    </ReactLenis>
  )
}
