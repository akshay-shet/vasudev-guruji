import type { SVGProps } from 'react'

type P = SVGProps<SVGSVGElement> & { size?: number }
const base = (size = 24, props: P) => ({
  width: size,
  height: size,
  viewBox: '0 0 48 48',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  ...props,
})

export const Lotus = ({ size, ...p }: P) => (
  <svg {...base(size, p)}>
    <path d="M24 10c-4 5-5 11-3 17 1 3 2 5 3 6 1-1 2-3 3-6 2-6 1-12-3-17z" />
    <path d="M21 33c-5-1-9-5-10-12 5 0 9 3 11 7" />
    <path d="M27 33c5-1 9-5 10-12-5 0-9 3-11 7" />
    <path d="M20 34c-5 1-11-1-15-6 4-2 9-1 12 1" />
    <path d="M28 34c5 1 11-1 15-6-4-2-9-1-12 1" />
    <path d="M10 38c8 3 20 3 28 0" />
  </svg>
)
export const Book = ({ size, ...p }: P) => (
  <svg {...base(size, p)}>
    <path d="M24 14c-5-3-12-4-18-3v24c6-1 13 0 18 3 5-3 12-4 18-3V11c-6-1-13 0-18 3z" />
    <path d="M24 14v24" />
    <path d="M10 17c3 0 7 0 10 2M10 22c3 0 7 0 10 2M10 27c3 0 7 0 10 2M28 19c3-2 7-2 10-2M28 24c3-2 7-2 10-2M28 29c3-2 7-2 10-2" strokeWidth={1.4} />
  </svg>
)
export const Meditate = ({ size, ...p }: P) => (
  <svg {...base(size, p)}>
    <circle cx="24" cy="10" r="4" />
    <path d="M24 15c-4 0-6 3-6 7v6l-6 4" />
    <path d="M24 15c4 0 6 3 6 7v6l6 4" />
    <path d="M18 26l-3 3M30 26l3 3" />
    <path d="M8 38c4-4 10-6 16-6s12 2 16 6c-6 2-11 2-16 0-5 2-10 2-16 0z" />
  </svg>
)
export const Seva = ({ size, ...p }: P) => (
  <svg {...base(size, p)}>
    <path d="M24 24c-6-4-9-7-9-11a4.5 4.5 0 0 1 9-1 4.5 4.5 0 0 1 9 1c0 4-3 7-9 11z" />
    <path d="M5 22c2 7 6 12 12 15l4 3" />
    <path d="M43 22c-2 7-6 12-12 15l-4 3" />
    <path d="M9 18l3 9 6 5M39 18l-3 9-6 5" />
  </svg>
)
export const Mountain = ({ size, ...p }: P) => (
  <svg {...base(size, p)}>
    <path d="M3 37l13-20 8 11 5-6 16 15z" />
    <path d="M16 17l-3 7 3-2 3 3M29 22l-2 4 2-1 2 2" strokeWidth={1.4} />
  </svg>
)
export const Calendar = ({ size, ...p }: P) => (
  <svg {...base(size, p)}>
    <rect x="7" y="10" width="34" height="30" rx="3" />
    <path d="M7 18h34M15 6v8M33 6v8" />
    <path d="M14 24h3M22 24h4M31 24h3M14 30h3M22 30h4M31 30h3M14 35h3M22 35h4" strokeWidth={2.4} />
  </svg>
)
export const People = ({ size, ...p }: P) => (
  <svg {...base(size, p)}>
    <circle cx="24" cy="12" r="4.5" />
    <circle cx="12" cy="17" r="3.8" />
    <circle cx="36" cy="17" r="3.8" />
    <path d="M16 36c0-6 3-11 8-11s8 5 8 11z" />
    <path d="M4 37c0-5 3-9 8-9 2 0 3 .5 4 1.4M44 37c0-5-3-9-8-9-2 0-3 .5-4 1.4" />
  </svg>
)
export const Play = ({ size, ...p }: P) => (
  <svg {...base(size, p)} fill="currentColor" stroke="none">
    <path d="M18 13v22l18-11z" />
  </svg>
)
export const PlayCircle = ({ size, ...p }: P) => (
  <svg {...base(size, p)}>
    <circle cx="24" cy="24" r="19" />
    <path d="M20 16v16l12-8z" fill="currentColor" />
  </svg>
)
export const Search = ({ size, ...p }: P) => (
  <svg {...base(size, p)} strokeWidth={3}>
    <circle cx="21" cy="21" r="12" />
    <path d="M30 30l10 10" />
  </svg>
)
export const Menu = ({ size, ...p }: P) => (
  <svg {...base(size, p)} strokeWidth={3}>
    <path d="M8 14h32M8 24h32M8 34h32" />
  </svg>
)
export const Close = ({ size, ...p }: P) => (
  <svg {...base(size, p)} strokeWidth={3}>
    <path d="M12 12l24 24M36 12L12 36" />
  </svg>
)
export const Chevron = ({ size, ...p }: P) => (
  <svg {...base(size, p)} strokeWidth={4}>
    <path d="M14 19l10 10 10-10" />
  </svg>
)
export const Arrow = ({ size, ...p }: P) => (
  <svg {...base(size, p)} strokeWidth={2.6}>
    <path d="M6 24h34M30 14l10 10-10 10" />
  </svg>
)
export const Heart = ({ size, ...p }: P) => (
  <svg {...base(size, p)}>
    <path d="M24 40C12 32 6 25 6 17a9 9 0 0 1 18-3 9 9 0 0 1 18 3c0 8-6 15-18 23z" />
  </svg>
)
export const Leaf = ({ size, ...p }: P) => (
  <svg {...base(size, p)}>
    <path d="M10 38C8 22 18 10 40 8c0 20-12 32-28 30z" />
    <path d="M10 38L28 20" />
  </svg>
)
export const Sprout = ({ size, ...p }: P) => (
  <svg {...base(size, p)}>
    <path d="M24 42V22" />
    <path d="M24 26c0-8-6-13-14-13 0 8 6 13 14 13z" />
    <path d="M24 22c0-8 6-14 14-14 0 8-6 14-14 14z" />
  </svg>
)
export const Rings = ({ size, ...p }: P) => (
  <svg {...base(size, p)}>
    <circle cx="18" cy="28" r="10" />
    <circle cx="30" cy="28" r="10" />
    <path d="M14 12l4-5 4 5-4 4z" />
  </svg>
)
export const Briefcase = ({ size, ...p }: P) => (
  <svg {...base(size, p)}>
    <rect x="6" y="14" width="36" height="24" rx="3" />
    <path d="M18 14v-4h12v4M6 24h36" />
  </svg>
)
export const Coins = ({ size, ...p }: P) => (
  <svg {...base(size, p)}>
    <ellipse cx="20" cy="14" rx="12" ry="5" />
    <path d="M8 14v8c0 3 5 5 12 5s12-2 12-5v-8" />
    <path d="M16 30v4c0 3 5 5 12 5s12-2 12-5v-8c0-2-2-4-6-4.6" />
  </svg>
)
export const Shield = ({ size, ...p }: P) => (
  <svg {...base(size, p)}>
    <path d="M24 5l16 6v11c0 10-7 17-16 21C15 39 8 32 8 22V11z" />
    <path d="M17 24l5 5 9-10" />
  </svg>
)
export const Phone = ({ size, ...p }: P) => (
  <svg {...base(size, p)} fill="currentColor" stroke="none">
    <path d="M14 6c1 0 2 .7 2.4 1.7l2.4 6c.4 1-.1 2.2-1 2.8l-3 2c2 4.4 5.4 7.8 9.8 9.8l2-3c.6-.9 1.8-1.4 2.8-1l6 2.4c1 .4 1.7 1.4 1.7 2.4V39c0 1.7-1.3 3-3 3C17 42 6 31 6 9c0-1.7 1.3-3 3-3z" />
  </svg>
)
export const WhatsApp = ({ size, ...p }: P) => (
  <svg width={size ?? 24} height={size ?? 24} viewBox="0 0 32 32" aria-hidden {...p}>
    <path fill="currentColor" d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.3.6 4.5 1.8 6.4L3 29l7.2-1.9c1.8 1 3.8 1.5 5.8 1.5 7 0 12.7-5.6 12.7-12.6S23 3 16 3zm0 23.1c-1.9 0-3.7-.5-5.3-1.5l-.4-.2-4.3 1.1 1.1-4.1-.3-.4c-1.1-1.7-1.6-3.6-1.6-5.5C5.2 9.8 10 5.1 16 5.1S26.7 9.8 26.7 15.6 22 26.1 16 26.1zm5.9-7.8c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2s-.8 1-1 1.2c-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.4.3-.6.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.8 5 .8.4 1.4.6 1.9.7.8.2 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z" />
  </svg>
)
export const Sun = ({ size, ...p }: P) => (
  <svg {...base(size, p)}>
    <circle cx="24" cy="24" r="8" />
    <path d="M24 4v6M24 38v6M4 24h6M38 24h6M10 10l4 4M34 34l4 4M10 38l4-4M34 14l4-4" />
  </svg>
)
export const MoonIcon = ({ size, ...p }: P) => (
  <svg {...base(size, p)}>
    <path d="M36 30A15 15 0 0 1 18 12a15 15 0 1 0 18 18z" />
  </svg>
)
export const Star = ({ size, filled, ...p }: P & { filled?: boolean }) => (
  <svg {...base(size, p)} fill={filled ? 'currentColor' : 'none'}>
    <path d="M24 5l5.8 12 13.2 1.8-9.6 9.2 2.4 13L24 34.8 12.2 41l2.4-13L5 18.8 18.2 17z" />
  </svg>
)
export const Mail = ({ size, ...p }: P) => (
  <svg {...base(size, p)}>
    <rect x="5" y="10" width="38" height="28" rx="3" />
    <path d="M6 12l18 14 18-14" />
  </svg>
)
export const Pin = ({ size, ...p }: P) => (
  <svg {...base(size, p)}>
    <path d="M24 43s14-13 14-24a14 14 0 0 0-28 0c0 11 14 24 14 24z" />
    <circle cx="24" cy="19" r="5" />
  </svg>
)
export const Cart = ({ size, ...p }: P) => (
  <svg {...base(size, p)}>
    <path d="M4 7h6l5 24h22l4-16H13" />
    <circle cx="18" cy="39" r="3" />
    <circle cx="34" cy="39" r="3" />
  </svg>
)
export const Chat = ({ size, ...p }: P) => (
  <svg {...base(size, p)}>
    <path d="M8 10h32v22H22l-9 7v-7H8z" />
    <path d="M15 19h18M15 25h12" />
  </svg>
)

export const Gem = ({ size, ...p }: P) => (
  <svg {...base(size, p)}>
    <path d="M14 8h20l8 10-18 24L6 18z" />
    <path d="M6 18h36M18 8l-4 10 10 24 10-24-4-10" />
  </svg>
)
export const House = ({ size, ...p }: P) => (
  <svg {...base(size, p)}>
    <path d="M6 22L24 7l18 15" />
    <path d="M11 19v21h26V19" />
    <path d="M20 40V28h8v12" />
  </svg>
)
export const Compass = ({ size, ...p }: P) => (
  <svg {...base(size, p)}>
    <circle cx="24" cy="24" r="18" />
    <path d="M30 18l-4 8-8 4 4-8z" />
    <path d="M24 4v4M24 40v4M4 24h4M40 24h4" />
  </svg>
)
export const Globe = ({ size, ...p }: P) => (
  <svg {...base(size, p)}>
    <circle cx="24" cy="24" r="18" />
    <path d="M6 24h36M24 6c-6 6-6 30 0 36M24 6c6 6 6 30 0 36" />
  </svg>
)

export const iconByName: Record<string, (p: P) => JSX.Element> = {
  lotus: Lotus, book: Book, meditate: Meditate, seva: Seva, mountain: Mountain, calendar: Calendar, people: People,
  heart: Heart, leaf: Leaf, sprout: Sprout, rings: Rings, briefcase: Briefcase, coins: Coins, shield: Shield,
  gem: Gem, house: House, compass: Compass, globe: Globe, sun: Sun, phone: Phone,
}
