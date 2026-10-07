// components/site/section-heading.tsx

import { Reveal } from '@/components/site/reveal'

type SectionHeadingProps = {
  /** Small label above the title (e.g. "Collections") */
  eyebrow?: string
  /** Main heading text */
  title: string
  /** Optional subtitle / description */
  description?: string
  /** Alignment — default: 'left' */
  align?: 'left' | 'center'
  /** Extra classes for wrapper */
  className?: string
  /** Extra classes for eyebrow */
  eyebrowClassName?: string
  /** Extra classes for title */
  titleClassName?: string
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
}

const SIZE_CLASSES = {
  sm: 'text-2xl md:text-3xl',
  md: 'text-3xl md:text-5xl',
  lg: 'text-4xl md:text-6xl lg:text-7xl',
} as const

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className = '',
  eyebrowClassName = '',
  titleClassName = '',
  size = 'md',
}: SectionHeadingProps) {
  const isCenter = align === 'center'

  return (
    <div
      className={`${isCenter ? 'text-center mx-auto max-w-3xl' : ''} ${className}`}
    >
      {eyebrow && (
        <Reveal
          as="p"
          className={`tracking-luxe text-[10px] uppercase text-brand-gold font-medium ${eyebrowClassName}`}
        >
          {eyebrow}
        </Reveal>
      )}

      <Reveal
        as="h2"
        delay={80}
        className={`mt-4 font-serif leading-[1.05] text-balance text-brand-charcoal ${SIZE_CLASSES[size]} ${titleClassName}`}
      >
        {title}
      </Reveal>

      {description && (
        <Reveal
          as="p"
          delay={160}
          className={`mt-5 text-sm md:text-base text-muted-foreground leading-relaxed ${
            isCenter ? 'mx-auto max-w-xl' : 'max-w-2xl'
          }`}
        >
          {description}
        </Reveal>
      )}

      {/* Decorative gold line under heading */}
      {isCenter && (
        <Reveal delay={200} className="mt-6 flex justify-center">
          <div className="gold-line" />
        </Reveal>
      )}
    </div>
  )
}
