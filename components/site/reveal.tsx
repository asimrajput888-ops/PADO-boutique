// components/site/reveal.tsx
'use client'

import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from 'react'

type RevealProps = {
  children: ReactNode
  as?: ElementType
  className?: string
  delay?: number
  /** Animation direction. Default: 'up' */
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  /** Disable the animation entirely */
  disabled?: boolean
}

export function Reveal({
  children,
  as,
  className = '',
  delay = 0,
  direction = 'up',
  disabled = false,
}: RevealProps) {
  const Tag = (as ?? 'div') as ElementType
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (disabled) {
      setVisible(true)
      return
    }

    const node = ref.current
    if (!node) return

    // Respect user's reduced-motion preference
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [disabled])

  return (
    <Tag
      ref={ref}
      data-direction={direction}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}

/* =========================================================
   Stagger Container — Auto-delays children by index
   ========================================================= */

type StaggerProps = {
  children: ReactNode
  className?: string
  /** Base delay in ms between each child */
  staggerDelay?: number
  as?: ElementType
}

export function Stagger({
  children,
  className = '',
  staggerDelay = 100,
  as,
}: StaggerProps) {
  const Tag = (as ?? 'div') as ElementType
  return (
    <Tag className={className}>
      {Array.isArray(children)
        ? children.map((child, i) => (
            <Reveal key={i} delay={i * staggerDelay}>
              {child}
            </Reveal>
          ))
        : children}
    </Tag>
  )
}
