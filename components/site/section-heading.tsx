import { Reveal } from '@/components/site/reveal'

type SectionHeadingProps = {
  eyebrow?: string
  title: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  align = 'left',
  className = '',
}: SectionHeadingProps) {
  return (
    <div className={`${align === 'center' ? 'text-center' : ''} ${className}`}>
      {eyebrow && (
        <Reveal as="p" className="text-[11px] tracking-luxe text-muted-foreground uppercase">
          {eyebrow}
        </Reveal>
      )}
      <Reveal
        as="h2"
        delay={80}
        className="mt-4 font-serif text-4xl leading-[1.02] text-balance md:text-6xl"
      >
        {title}
      </Reveal>
    </div>
  )
}
