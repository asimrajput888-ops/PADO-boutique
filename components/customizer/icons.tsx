// components/customizer/icons.tsx

"use client";

interface IconProps {
  className?: string;
}

// ============================================
// LAPEL ICONS
// ============================================

export const NotchLapelIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20 15 L38 45 L20 55" />
    <path d="M80 15 L62 45 L80 55" />
    <line x1="50" y1="15" x2="50" y2="90" strokeDasharray="3 3" opacity="0.3" />
    <circle cx="50" cy="50" r="2" fill="currentColor" />
  </svg>
);

export const PeakLapelIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20 15 L42 30 L38 50 L20 60" />
    <path d="M80 15 L58 30 L62 50 L80 60" />
    <line x1="50" y1="15" x2="50" y2="90" strokeDasharray="3 3" opacity="0.3" />
    <circle cx="50" cy="55" r="2" fill="currentColor" />
  </svg>
);

export const ShawlLapelIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 15 Q30 45 45 55" />
    <path d="M78 15 Q70 45 55 55" />
    <circle cx="50" cy="58" r="2" fill="currentColor" />
    <line x1="50" y1="15" x2="50" y2="90" strokeDasharray="3 3" opacity="0.3" />
  </svg>
);

// ============================================
// BUTTON ICONS
// ============================================

export const Button1Icon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <rect x="35" y="10" width="30" height="80" rx="2" />
    <circle cx="50" cy="50" r="4" fill="currentColor" />
  </svg>
);

export const Button2Icon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <rect x="35" y="10" width="30" height="80" rx="2" />
    <circle cx="50" cy="35" r="4" fill="currentColor" />
    <circle cx="50" cy="65" r="4" fill="currentColor" />
  </svg>
);

export const Button3Icon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <rect x="35" y="10" width="30" height="80" rx="2" />
    <circle cx="50" cy="30" r="3" fill="currentColor" />
    <circle cx="50" cy="50" r="3" fill="currentColor" />
    <circle cx="50" cy="70" r="3" fill="currentColor" />
  </svg>
);

export const DoubleBreastedIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <path d="M30 10 Q50 15 70 10 L70 90 Q50 85 30 90 Z" />
    <circle cx="42" cy="35" r="3" fill="currentColor" />
    <circle cx="42" cy="65" r="3" fill="currentColor" />
    <circle cx="58" cy="35" r="3" fill="currentColor" />
    <circle cx="58" cy="65" r="3" fill="currentColor" />
  </svg>
);

// ============================================
// SLEEVE ICONS
// ============================================

export const Sleeve1Icon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <rect x="30" y="20" width="40" height="60" rx="2" />
    <circle cx="50" cy="30" r="3" fill="currentColor" />
  </svg>
);

export const Sleeve2Icon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <rect x="30" y="20" width="40" height="60" rx="2" />
    <circle cx="50" cy="28" r="3" fill="currentColor" />
    <circle cx="50" cy="38" r="3" fill="currentColor" />
  </svg>
);

export const Sleeve3Icon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <rect x="30" y="20" width="40" height="60" rx="2" />
    <circle cx="50" cy="26" r="3" fill="currentColor" />
    <circle cx="50" cy="36" r="3" fill="currentColor" />
    <circle cx="50" cy="46" r="3" fill="currentColor" />
  </svg>
);

export const Sleeve4Icon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <rect x="30" y="20" width="40" height="60" rx="2" />
    <circle cx="50" cy="24" r="2.5" fill="currentColor" />
    <circle cx="50" cy="33" r="2.5" fill="currentColor" />
    <circle cx="50" cy="42" r="2.5" fill="currentColor" />
    <circle cx="50" cy="51" r="2.5" fill="currentColor" />
  </svg>
);

// ============================================
// COLLAR ICONS
// ============================================

export const ClassicCollarIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" className={className}>
    <path d="M30 40 L50 55 L70 40 L65 75 L35 75 Z" />
    <path d="M35 40 L50 55 L65 40" />
  </svg>
);

export const SpreadCollarIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" className={className}>
    <path d="M25 40 L50 60 L75 40 L65 75 L35 75 Z" />
    <path d="M30 42 L50 60 L70 42" />
  </svg>
);

export const CutawayCollarIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" className={className}>
    <path d="M20 40 L50 65 L80 40 L65 75 L35 75 Z" />
  </svg>
);

// ============================================
// POCKET ICONS
// ============================================

export const FlapPocketIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <rect x="20" y="35" width="60" height="30" rx="1" />
    <line x1="20" y1="45" x2="80" y2="45" strokeWidth="2" />
  </svg>
);

export const PatchPocketIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <rect x="20" y="30" width="60" height="40" rx="1" />
    <line x1="20" y1="35" x2="80" y2="35" strokeDasharray="2 2" opacity="0.5" />
  </svg>
);

export const WeltPocketIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <line x1="20" y1="45" x2="80" y2="45" strokeWidth="2" />
    <line x1="25" y1="48" x2="75" y2="48" opacity="0.5" />
  </svg>
);

// ============================================
// FIT ICONS
// ============================================

export const SlimFitIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" className={className}>
    <path d="M35 15 L32 40 L38 85 L42 85 L45 45 L55 45 L58 85 L62 85 L68 40 L65 15 Z" />
    <line x1="50" y1="15" x2="50" y2="45" strokeDasharray="2 2" opacity="0.4" />
  </svg>
);

export const RegularFitIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" className={className}>
    <path d="M30 15 L28 40 L34 85 L40 85 L45 45 L55 45 L60 85 L66 85 L72 40 L70 15 Z" />
    <line x1="50" y1="15" x2="50" y2="45" strokeDasharray="2 2" opacity="0.4" />
  </svg>
);

export const RelaxedFitIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" className={className}>
    <path d="M25 15 L22 40 L30 85 L38 85 L45 45 L55 45 L62 85 L70 85 L78 40 L75 15 Z" />
    <line x1="50" y1="15" x2="50" y2="45" strokeDasharray="2 2" opacity="0.4" />
  </svg>
);

// ============================================
// TROUSER ICONS
// ============================================

export const FlatFrontIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" className={className}>
    <path d="M30 15 L30 90 L45 90 L50 45 L55 90 L70 90 L70 15 Z" />
    <line x1="30" y1="25" x2="70" y2="25" />
  </svg>
);

export const SinglePleatIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" className={className}>
    <path d="M30 15 L30 90 L45 90 L50 45 L55 90 L70 90 L70 15 Z" />
    <line x1="30" y1="25" x2="70" y2="25" />
    <line x1="40" y1="25" x2="40" y2="45" opacity="0.6" />
  </svg>
);

export const DoublePleatIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" className={className}>
    <path d="M30 15 L30 90 L45 90 L50 45 L55 90 L70 90 L70 15 Z" />
    <line x1="30" y1="25" x2="70" y2="25" />
    <line x1="38" y1="25" x2="38" y2="45" opacity="0.6" />
    <line x1="62" y1="25" x2="62" y2="45" opacity="0.6" />
  </svg>
);

export const CuffedIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" className={className}>
    <path d="M30 15 L30 82 L45 82 L50 45 L55 82 L70 82 L70 15 Z" />
    <line x1="30" y1="82" x2="70" y2="82" strokeWidth="2.5" />
  </svg>
);

// ============================================
// VENT ICONS
// ============================================

export const NoVentIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" className={className}>
    <path d="M25 15 Q50 20 75 15 L75 90 L25 90 Z" />
    <line x1="50" y1="25" x2="50" y2="90" strokeDasharray="3 3" opacity="0.4" />
  </svg>
);

export const SingleVentIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" className={className}>
    <path d="M25 15 Q50 20 75 15 L75 90 L25 90 Z" />
    <line x1="50" y1="25" x2="50" y2="60" strokeDasharray="3 3" opacity="0.4" />
    <line x1="50" y1="60" x2="50" y2="90" strokeWidth="2.5" />
  </svg>
);

export const DoubleVentIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" className={className}>
    <path d="M25 15 Q50 20 75 15 L75 90 L25 90 Z" />
    <line x1="50" y1="25" x2="50" y2="90" strokeDasharray="3 3" opacity="0.4" />
    <line x1="38" y1="60" x2="38" y2="90" strokeWidth="2" />
    <line x1="62" y1="60" x2="62" y2="90" strokeWidth="2" />
  </svg>
);

// ============================================
// WOMEN TROUSER ICONS
// ============================================

export const StraightTrouserIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" className={className}>
    <path d="M35 15 L35 90 L47 90 L50 45 L53 90 L65 90 L65 15 Z" />
  </svg>
);

export const SlimTrouserIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" className={className}>
    <path d="M38 15 L38 90 L47 90 L50 45 L53 90 L62 90 L62 15 Z" />
  </svg>
);

export const WideTrouserIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" className={className}>
    <path d="M30 15 L25 90 L45 90 L50 45 L55 90 L75 90 L70 15 Z" />
  </svg>
);

// ============================================
// SKIRT ICONS
// ============================================

export const PencilSkirtIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" className={className}>
    <path d="M30 20 L35 85 L65 85 L70 20 Z" />
    <line x1="30" y1="20" x2="70" y2="20" />
  </svg>
);

export const ALineSkirtIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" className={className}>
    <path d="M38 20 L22 85 L78 85 L62 20 Z" />
    <line x1="38" y1="20" x2="62" y2="20" />
  </svg>
);

export const PleatedSkirtIcon = ({ className = "w-full h-full" }: IconProps) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" className={className}>
    <path d="M38 20 L22 85 L78 85 L62 20 Z" />
    <line x1="38" y1="20" x2="62" y2="20" />
    <line x1="42" y1="20" x2="35" y2="85" opacity="0.5" />
    <line x1="50" y1="20" x2="50" y2="85" opacity="0.5" />
    <line x1="58" y1="20" x2="65" y2="85" opacity="0.5" />
  </svg>
);

// ============================================
// ICON MAP — id → Icon component
// ============================================

export const ICON_MAP: Record<string, (props: IconProps) => React.ReactElement> = {
  // Lapels
  "notch": NotchLapelIcon,
  "peak": PeakLapelIcon,
  "shawl": ShawlLapelIcon,

  // Buttons
  "1-button": Button1Icon,
  "2-button": Button2Icon,
  "3-button": Button3Icon,
  "double-breasted": DoubleBreastedIcon,

  // Sleeves
  "1-sleeve": Sleeve1Icon,
  "2-sleeve": Sleeve2Icon,
  "3-sleeve": Sleeve3Icon,
  "4-sleeve": Sleeve4Icon,

  // Collars
  "classic-collar": ClassicCollarIcon,
  "spread-collar": SpreadCollarIcon,
  "cutaway-collar": CutawayCollarIcon,

  // Pockets
  "flap": FlapPocketIcon,
  "patch": PatchPocketIcon,
  "welt": WeltPocketIcon,

  // Fit
  "slim": SlimFitIcon,
  "regular": RegularFitIcon,
  "relaxed": RelaxedFitIcon,

  // Trousers
  "flat-front": FlatFrontIcon,
  "pleated": SinglePleatIcon,
  "double-pleat": DoublePleatIcon,
  "cuffed": CuffedIcon,

  // Vents
  "no-vent": NoVentIcon,
  "single-vent": SingleVentIcon,
  "double-vent": DoubleVentIcon,

  // Women trousers
  "straight-trouser": StraightTrouserIcon,
  "slim-trouser": SlimTrouserIcon,
  "wide-trouser": WideTrouserIcon,

  // Skirts
  "pencil-skirt": PencilSkirtIcon,
  "a-line-skirt": ALineSkirtIcon,
  "pleated-skirt": PleatedSkirtIcon,
};
