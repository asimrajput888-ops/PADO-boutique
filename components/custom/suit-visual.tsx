'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import type { fabrics } from '@/lib/data'

type Fabric = (typeof fabrics)[number]

export function SuitVisual({
  fabric,
  fitName,
  lapelName,
  buttonHex,
}: {
  fabric: Fabric
  fitName: string
  lapelName: string
  buttonHex: string
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: py * -6, y: px * 8 })
  }

  return (
    <div className="relative flex h-full flex-col justify-center bg-gradient-to-b from-offwhite to-muted p-6 md:p-10">
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        className="relative mx-auto aspect-[3/4] w-full max-w-sm [perspective:1500px]"
      >
        <div
          className="relative h-full w-full transition-transform duration-300 ease-out [transform-style:preserve-3d]"
          style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
        >
          {/* backdrop layer */}
          <div
            className="absolute inset-4 border border-champagne/40"
            style={{ transform: 'translateZ(-70px)' }}
          />
          {/* base suit */}
          <div
            className="relative h-full w-full overflow-hidden shadow-[0_40px_80px_-30px_rgba(0,0,0,0.5)]"
            style={{ transform: 'translateZ(30px)' }}
          >
            <Image
              src="/images/builder-suit.png"
              alt={`Bespoke suit in ${fabric.name}, ${fitName} fit with a ${lapelName} lapel`}
              fill
              sizes="(max-width: 1024px) 90vw, 40vw"
              className="object-cover"
            />
            {/* fabric tint */}
            <div
              className="absolute inset-0 mix-blend-multiply transition-colors duration-700"
              style={{ backgroundColor: fabric.hex, opacity: 0.5 }}
            />
            {/* fabric texture overlay */}
            <div className="absolute inset-0 opacity-30 mix-blend-overlay transition-opacity duration-700">
              <Image
                src={fabric.swatch || '/placeholder.svg'}
                alt=""
                fill
                sizes="40vw"
                className="object-cover"
                aria-hidden
              />
            </div>
            {/* sheen */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent" />
          </div>
          {/* floor shadow */}
          <div
            className="absolute -bottom-6 left-1/2 h-10 w-2/3 -translate-x-1/2 rounded-full bg-black/25 blur-2xl"
            style={{ transform: 'translateZ(-40px)' }}
          />
        </div>
      </div>

      {/* live spec caption */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[10px] tracking-wide-sm text-muted-foreground uppercase">
        <span className="flex items-center gap-2">
          <span
            className="h-3 w-3 rounded-full border border-border"
            style={{ backgroundColor: fabric.hex }}
          />
          {fabric.name}
        </span>
        <span>{lapelName} Lapel</span>
        <span>{fitName} Fit</span>
        <span className="flex items-center gap-2">
          <span
            className="h-3 w-3 rounded-full border border-border"
            style={{ backgroundColor: buttonHex }}
          />
          Buttons
        </span>
      </div>
    </div>
  )
}
