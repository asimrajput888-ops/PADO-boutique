type IllProps = { active?: boolean; className?: string }

const stroke = 'currentColor'

export function LapelIllustration({ id, active }: { id: string; active?: boolean } & IllProps) {
  const c = active ? 'text-foreground' : 'text-muted-foreground'
  return (
    <svg viewBox="0 0 80 96" fill="none" className={`h-full w-full ${c}`} aria-hidden>
      {/* shoulders + jacket body */}
      <path
        d="M40 6 L64 18 L66 90 L14 90 L16 18 Z"
        stroke={stroke}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      {/* collar base */}
      <path d="M40 6 L28 22 M40 6 L52 22" stroke={stroke} strokeWidth="1.2" />
      {id === 'notch' && (
        <>
          <path d="M28 22 L34 40 L40 34" stroke={stroke} strokeWidth="1.2" strokeLinejoin="round" />
          <path d="M52 22 L46 40 L40 34" stroke={stroke} strokeWidth="1.2" strokeLinejoin="round" />
          <path d="M34 40 L30 46 M46 40 L50 46" stroke={stroke} strokeWidth="1.2" />
        </>
      )}
      {id === 'peak' && (
        <>
          <path d="M28 22 L36 42 L30 34 M40 34 L36 42" stroke={stroke} strokeWidth="1.2" strokeLinejoin="round" />
          <path d="M52 22 L44 42 L50 34 M40 34 L44 42" stroke={stroke} strokeWidth="1.2" strokeLinejoin="round" />
        </>
      )}
      {id === 'shawl' && (
        <path
          d="M28 22 C30 42 34 40 40 40 C46 40 50 42 52 22"
          stroke={stroke}
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      )}
      {/* lapel line down */}
      <path d="M40 34 L40 78" stroke={stroke} strokeWidth="1" strokeDasharray="2 3" />
    </svg>
  )
}

export function FitIllustration({ id, active }: { id: string; active?: boolean } & IllProps) {
  const c = active ? 'text-foreground' : 'text-muted-foreground'
  const shapes: Record<string, string> = {
    slim: 'M32 6 L48 6 L50 26 L46 52 L48 90 L40 90 L40 54 L40 90 L32 90 L34 52 L30 26 Z',
    tailored: 'M28 6 L52 6 L56 28 L50 54 L52 90 L42 90 L40 56 L38 90 L28 90 L30 54 L24 28 Z',
    oversized: 'M22 6 L58 6 L62 30 L58 58 L60 90 L44 90 L40 60 L36 90 L20 90 L22 58 L18 30 Z',
  }
  return (
    <svg viewBox="0 0 80 96" fill="none" className={`h-full w-full ${c}`} aria-hidden>
      <path d={shapes[id]} stroke={stroke} strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M40 8 L40 52" stroke={stroke} strokeWidth="1" strokeDasharray="2 3" />
    </svg>
  )
}
