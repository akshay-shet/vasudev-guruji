import { useEffect, useId, useState, type ReactNode } from 'react'
import { site } from '../data/site'

/* ───────── Gold lotus logo ───────── */
export function LotusLogo({ className = '' }: { className?: string }) {
  const id = 'lg' + useId().replace(/:/g, '')
  return (
    <svg viewBox="0 0 64 48" className={className} aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F2CF7E" />
          <stop offset=".55" stopColor="#C58B2D" />
          <stop offset="1" stopColor="#93600F" />
        </linearGradient>
      </defs>
      <g fill="none" stroke={`url(#${id})`} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
        <path d="M32 4c-5 6-7 14-4 24 1 3 2.5 6 4 8 1.5-2 3-5 4-8 3-10 1-18-4-24z" fill={`url(#${id})`} fillOpacity=".15" />
        <path d="M28 34c-7-2-12-9-12-18 7 1 12 6 14 12" />
        <path d="M36 34c7-2 12-9 12-18-7 1-12 6-14 12" />
        <path d="M26 36c-8 1-15-3-20-10 6-2 13 0 17 4" />
        <path d="M38 36c8 1 15-3 20-10-6-2-13 0-17 4" />
        <path d="M8 40c15 5 33 5 48 0" />
        <path d="M14 44c11 3 25 3 36 0" strokeWidth="1.4" />
      </g>
    </svg>
  )
}

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <LotusLogo className={compact ? 'h-9 w-12' : 'h-12 w-16'} />
      <span className="flex flex-col items-center leading-none">
        <span data-no-translate lang="en" className={`font-marcellus text-maroon ${compact ? 'text-[25px]' : 'text-[30px]'}`}>{site.name}</span>
      </span>
    </span>
  )
}

/* ───────── Small gold divider with diamond ───────── */
export function Diamond({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 12" className={className} aria-hidden>
      <path d="M0 6h50M70 6h50" stroke="#C58B2D" strokeWidth="1" />
      <path d="M60 1l5 5-5 5-5-5z" fill="none" stroke="#C58B2D" strokeWidth="1.2" />
      <circle cx="60" cy="6" r="1.6" fill="#C58B2D" />
      <circle cx="47" cy="6" r="1.4" fill="#C58B2D" />
      <circle cx="73" cy="6" r="1.4" fill="#C58B2D" />
    </svg>
  )
}

/* ───────── Mandala (rotating) with 4 ॐ on the upper arc ───────── */
export function Mandala({ className = '' }: { className?: string }) {
  const petals = Array.from({ length: 24 })
  const small = Array.from({ length: 48 })
  const oms = [-62, -26, 26, 62] // degrees from top
  return (
    <div className={`relative ${className}`} aria-hidden>
      <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,250,235,.95) 0%, rgba(255,240,205,.85) 55%, rgba(255,232,180,.25) 72%, transparent 74%)' }} />
      <svg viewBox="-200 -200 400 400" className="absolute inset-0 h-full w-full animate-spin-slow">
        <g fill="none" stroke="#D3A04A" strokeOpacity=".75">
          <circle r="196" strokeWidth="2.2" />
          <circle r="188" strokeWidth=".8" />
          <circle r="150" strokeWidth="1" />
          <circle r="112" strokeWidth=".8" />
          <circle r="70" strokeWidth=".8" />
          {petals.map((_, i) => (
            <path key={i} transform={`rotate(${i * 15})`} d="M0-150c14-14 18-28 0-38-18 10-14 24 0 38z" strokeWidth="1" />
          ))}
          {small.map((_, i) => (
            <path key={'s' + i} transform={`rotate(${i * 7.5})`} d="M0-112c6-8 6-16 0-24-6 8-6 16 0 24z" strokeWidth=".7" />
          ))}
          {petals.map((_, i) => (
            <path key={'c' + i} transform={`rotate(${i * 15 + 7.5})`} d="M0-70q20-18 0-42q-20 24 0 42z" strokeWidth=".7" />
          ))}
          {small.map((_, i) => (
            <circle key={'d' + i} transform={`rotate(${i * 7.5})`} cy="-192" r="1.6" fill="#D3A04A" stroke="none" />
          ))}
        </g>
      </svg>
      {/* ॐ symbols — static so they stay upright */}
      {oms.map((deg, i) => {
        const rad = (deg * Math.PI) / 180
        const x = 50 + Math.sin(rad) * 42
        const y = 50 - Math.cos(rad) * 42
        return (
          <span key={i} className="absolute -translate-x-1/2 -translate-y-1/2 font-deva gold-text" style={{ left: `${x}%`, top: `${y}%`, fontSize: 'clamp(16px, 2.4vw, 40px)' }}>
            ॐ
          </span>
        )
      })}
      <span className="absolute left-1/2 top-[3.5%] -translate-x-1/2 text-gold" style={{ fontSize: 'clamp(14px,2vw,30px)' }}>
        <svg viewBox="0 0 48 48" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2"><path d="M24 8c-4 5-5 11-3 17 1 3 2 5 3 6 1-1 2-3 3-6 2-6 1-12-3-17zM21 31c-5-1-9-5-10-12 5 0 9 3 11 7M27 31c5-1 9-5 10-12-5 0-9 3-11 7" /></svg>
      </span>
    </div>
  )
}

/* ───────── Light rays behind the hero ───────── */
export function Rays({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute animate-rays ${className}`} aria-hidden
      style={{ background: 'repeating-conic-gradient(from 0deg at 50% 50%, rgba(255,214,130,.22) 0deg 4deg, transparent 4deg 12deg)', maskImage: 'radial-gradient(circle, #000 0%, transparent 65%)', WebkitMaskImage: 'radial-gradient(circle, #000 0%, transparent 65%)' }} />
  )
}

/* ───────── Swaying brass bell ───────── */
export function Bell({ className = '', chain = 60, delay = 0 }: { className?: string; chain?: number; delay?: number }) {
  const id = 'br' + useId().replace(/:/g, '')
  return (
    <div className={`animate-sway ${className}`} style={{ animationDelay: `${delay}s` }} aria-hidden>
      <svg viewBox={`0 0 40 ${chain + 52}`} width="100%" height="100%">
        <defs>
          <linearGradient id={id} x1="0" x2="1">
            <stop offset="0" stopColor="#8A5A0E" />
            <stop offset=".35" stopColor="#F4D27E" />
            <stop offset=".6" stopColor="#D49A35" />
            <stop offset="1" stopColor="#7A4E0B" />
          </linearGradient>
        </defs>
        {Array.from({ length: Math.floor(chain / 6) }).map((_, i) => (
          <ellipse key={i} cx="20" cy={3 + i * 6} rx="2" ry="3.2" fill="none" stroke="#B9862E" strokeWidth="1.2" />
        ))}
        <g transform={`translate(0 ${chain})`}>
          <circle cx="20" cy="2" r="3.5" fill={`url(#${id})`} />
          <path d="M20 4c-9 0-12 9-12 20 0 6-3 10-6 13h36c-3-3-6-7-6-13 0-11-3-20-12-20z" fill={`url(#${id})`} />
          <rect x="1" y="36" width="38" height="5" rx="2.5" fill={`url(#${id})`} />
          <circle cx="20" cy="46" r="4" fill={`url(#${id})`} />
        </g>
      </svg>
    </div>
  )
}

/* ───────── Brass diya ───────── */
export function Diya({ lit = true, className = '' }: { lit?: boolean; className?: string }) {
  const id = 'dy' + useId().replace(/:/g, '')
  return (
    <svg viewBox="0 0 60 60" className={className} aria-hidden>
      <defs>
        <radialGradient id={id + "f"} cx=".5" cy=".7" r=".6">
          <stop offset="0" stopColor="#FFF7C2" />
          <stop offset=".5" stopColor="#FFC93C" />
          <stop offset="1" stopColor="#FF7A00" />
        </radialGradient>
        <linearGradient id={id + "b"} x1="0" x2="1">
          <stop offset="0" stopColor="#8A5A0E" /><stop offset=".45" stopColor="#F0C66A" /><stop offset="1" stopColor="#7A4E0B" />
        </linearGradient>
      </defs>
      {lit && <circle cx="30" cy="22" r="18" fill="#FFD36B" opacity=".25" />}
      {lit && <path className="flame" d="M30 8c-4 7-6 11-6 15a6 6 0 0 0 12 0c0-4-2-8-6-15z" fill={`url(#${id}f)`} />}
      <path d="M6 34c6 10 14 13 24 13s18-3 24-13c-8 3-16 4-24 4s-16-1-24-4z" fill={`url(#${id}b)`} />
      <path d="M22 47l-3 7h22l-3-7" fill={`url(#${id}b)`} />
    </svg>
  )
}

/* ───────── Arch (temple) tile background ───────── */
export function ArchShape() {
  const id = 'ar' + useId().replace(/:/g, '')
  return (
    <svg className="arch-bg" viewBox="0 0 160 170" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--arch-top, #FFFEFA)" />
          <stop offset="1" stopColor="var(--arch-bot, #FFF1D6)" />
        </linearGradient>
      </defs>
      <path
        d="M4 166V46c0-9 5-14 15-15 22-2 39-10 50-24 4-4 7-6 11-6s7 2 11 6c11 14 28 22 50 24 10 1 15 6 15 15v120z"
        fill={`url(#${id})`} stroke="#D9AA52" strokeWidth="1.6" vectorEffect="non-scaling-stroke"
        style={{ filter: 'drop-shadow(0 6px 10px rgba(197,139,45,.28))' }}
      />
      <path
        d="M10 160V48c0-6 4-10 11-11 24-3 41-11 52-25 3-3 5-4 7-4s4 1 7 4c11 14 28 22 52 25 7 1 11 5 11 11v112z"
        fill="none" stroke="#ECC46E" strokeOpacity=".55" strokeWidth="1" vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

/* ───────── Guruji photo with graceful fallback ───────── */
export function GurujiPhoto({ className = '' }: { className?: string }) {
  const [src, setSrc] = useState(site.photo)
  return <img src={src} alt={site.photoAlt} className={className} onError={() => setSrc(site.photoFallback)} draggable={false} />
}

/* ───────── Floating clouds at the bottom of hero ───────── */
export function Clouds({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-x-0 ${className}`} aria-hidden>
      <div className="fade-cream absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent, var(--fade) 78%)' }} />
      {[8, 26, 48, 70, 90].map((l, i) => (
        <div key={i} className="absolute rounded-full animate-float" style={{
          left: `${l}%`, bottom: `${-20 + (i % 2) * 14}%`, width: `${26 + (i % 3) * 8}%`, height: '70%', transform: 'translateX(-50%)',
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,.95) 0%, rgba(255,255,255,.6) 45%, transparent 70%)',
          animationDelay: `${i * 0.7}s`,
        }} />
      ))}
    </div>
  )
}

/* ───────── Temple-door intro (once per session) ───────── */
export function TempleIntro() {
  const [show, setShow] = useState(() => {
    try { return !sessionStorage.getItem('vg-intro') } catch { return false }
  })
  useEffect(() => {
    if (!show) return
    try { sessionStorage.setItem('vg-intro', '1') } catch { /* ignore */ }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const t = setTimeout(() => setShow(false), reduce ? 0 : 2600)
    return () => clearTimeout(t)
  }, [show])
  if (!show) return null
  const door = (side: 'left' | 'right'): ReactNode => (
    <div className="relative h-full w-1/2" style={{
      transformOrigin: side === 'left' ? 'left center' : 'right center',
      animation: `door-${side} 1.6s cubic-bezier(.6,.05,.3,1) .8s forwards`,
      background: 'linear-gradient(180deg,#7A2410,#5B1A0B)',
      boxShadow: 'inset 0 0 0 10px #B8862E, inset 0 0 0 14px #6E3A0A',
    }}>
      <div className="absolute inset-[10%] grid grid-cols-2 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-md" style={{ boxShadow: 'inset 0 0 0 2px #C58B2D', background: 'radial-gradient(circle,#8E2C14,#5B1A0B)' }}>
            <div className="flex h-full items-center justify-center text-3xl text-goldlight/80">✿</div>
          </div>
        ))}
      </div>
      <div className={`absolute top-1/2 h-10 w-10 -translate-y-1/2 rounded-full ${side === 'left' ? 'right-3' : 'left-3'}`} style={{ background: 'radial-gradient(circle,#F4D27E,#93600F)' }} />
    </div>
  )
  return (
    <div className="fixed inset-0 z-[100] flex" style={{ animation: 'fade-out .4s ease 2.3s forwards' }} role="presentation" onClick={() => setShow(false)}>
      {door('left')}
      {door('right')}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="font-deva text-6xl text-goldlight drop-shadow">ॐ</span>
        <span className="mt-2 font-marcellus text-2xl text-goldlight">{site.name}</span>
      </div>
    </div>
  )
}

/* ───────── Starfield (night theme) ───────── */
export function Stars() {
  const [stars] = useState(() => Array.from({ length: 90 }, () => ({ l: Math.random() * 100, t: Math.random() * 100, d: Math.random() * 3, s: Math.random() > 0.85 ? 3 : 2 })))
  return (
    <div className="stars" aria-hidden>
      {stars.map((s, i) => <i key={i} style={{ left: `${s.l}%`, top: `${s.t}%`, animationDelay: `${s.d}s`, width: s.s, height: s.s }} />)}
    </div>
  )
}

/* ───────── Side ornaments: fill the empty left & right margins on wide screens ─────────
 * Fixed behind the page content, only where the margin is wide enough (xl+).
 * Per side: a slowly turning gold line-mandala peeking in from the edge, a vertical temple border
 * with lotus & diamond motifs, a swaying bell at the top and a lit diya at the bottom (left). */
const SIDE_BORDER = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='34' height='150' viewBox='0 0 34 150'><g fill='none' stroke='#C58B2D' stroke-opacity='.6'>` +
  `<path d='M13 0v150M21 0v150' stroke-width='.8'/>` +
  `<path d='M17 30l8 11-8 11-8-11z' fill='#F6DA8E' fill-opacity='.55' stroke-width='1'/><circle cx='17' cy='41' r='1.7' fill='#C58B2D'/>` +
  `<path d='M17 118c5-6 5-11 0-16-5 5-5 10 0 16zM17 118c6-4 10-4 12 0-4 3-8 3-12 0zM17 118c-6-4-10-4-12 0 4 3 8 3 12 0z' fill='#F6DA8E' fill-opacity='.5' stroke-width='.8'/>` +
  `<circle cx='17' cy='86' r='2.2' fill='#E7C26A' stroke-width='.6'/></g></svg>`,
)}")`

/** Shri Chakra medallion: 16- and 8-petal lotus rings around nine interlocking triangles and the bindu. */
function ChakraMedallion({ className = '' }: { className?: string }) {
  const id = 'ck' + useId().replace(/:/g, '')
  const p16 = Array.from({ length: 16 })
  const p8 = Array.from({ length: 8 })
  const dots = Array.from({ length: 32 })
  // 4 upward (Shiva) and 5 downward (Shakti) triangles, as [apexY, baseY, halfWidth]
  const up: [number, number, number][] = [[-62, 34, 56], [-44, 46, 50], [-30, 20, 36], [-14, 30, 30]]
  const down: [number, number, number][] = [[64, -36, 58], [50, -46, 52], [36, -22, 40], [24, -30, 30], [12, -16, 18]]
  return (
    <svg viewBox="-200 -200 400 400" className={className} aria-hidden>
      <defs>
        <radialGradient id={id + 'bg'}>
          <stop offset="0" stopColor="#FFF9EC" /><stop offset=".72" stopColor="#FFF1D2" /><stop offset="1" stopColor="#FCE6B6" />
        </radialGradient>
        <linearGradient id={id + 'g'} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#E9C46A" /><stop offset=".5" stopColor="#B7832B" /><stop offset="1" stopColor="#E9C46A" />
        </linearGradient>
      </defs>
      <circle r="198" fill={`url(#${id}bg)`} className="chakra-bg" />
      {/* outer lotus rings turn slowly */}
      <g className="animate-spin-slow" style={{ transformOrigin: '0 0', transformBox: 'view-box' }} fill="none" stroke={`url(#${id}g)`}>
        <circle r="194" strokeWidth="3" />
        <circle r="186" strokeWidth="1" />
        {dots.map((_, i) => <circle key={'d' + i} transform={`rotate(${i * 11.25})`} cy="-178" r="2.6" fill="#D4A245" stroke="none" />)}
        <circle r="170" strokeWidth="1.2" />
        {p16.map((_, i) => <path key={'a' + i} transform={`rotate(${i * 22.5})`} d="M0-168C22-150 24-126 0-110-24-126-22-150 0-168z" fill="#F6DA8E" fillOpacity=".35" strokeWidth="1.4" />)}
        {p16.map((_, i) => <path key={'a2' + i} transform={`rotate(${i * 22.5})`} d="M0-158C10-146 10-130 0-120" strokeWidth=".8" />)}
      </g>
      <g fill="none" stroke={`url(#${id}g)`}>
        <circle r="110" strokeWidth="1.4" />
        {p8.map((_, i) => <path key={'b' + i} transform={`rotate(${i * 45 + 22.5})`} d="M0-108C26-96 30-80 0-70-30-80-26-96 0-108z" fill="#F2CF7E" fillOpacity=".35" strokeWidth="1.3" />)}
        <circle r="70" strokeWidth="2.2" fill="#FFF6E0" className="chakra-inner" />
        <circle r="66" strokeWidth=".8" />
        {up.map(([a, b, w], i) => <path key={'u' + i} d={`M0 ${a}L${w} ${b}H${-w}Z`} stroke="#A8741F" strokeWidth="2" fill="#F2CF7E" fillOpacity=".22" />)}
        {down.map(([a, b, w], i) => <path key={'v' + i} d={`M0 ${a}L${w} ${b}H${-w}Z`} stroke="#B0321A" strokeOpacity=".75" strokeWidth="1.8" fill="#E8A33A" fillOpacity=".1" />)}
        <circle r="7" fill="#B0321A" stroke="#E9C46A" strokeWidth="2" />
      </g>
    </svg>
  )
}

/** Fades the side ornaments in once the page's header artwork has scrolled away. */
function useShowOrnaments() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const on = () => setShow(window.scrollY > Math.min(320, window.innerHeight * 0.38))
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return show
}

export function SideOrnaments() {
  const show = useShowOrnaments()
  const side = (right: boolean) => {
    const at = (offset: string) => ({ [right ? 'right' : 'left']: offset })
    return (
      <div className="absolute inset-y-0" style={{ ...at('0'), width: 'var(--gutter)' }}>
        {/* soft saffron glow along the edge */}
        <div className="absolute inset-0" style={{ background: `linear-gradient(${right ? 'to left' : 'to right'}, rgba(242,185,28,.10), rgba(242,207,126,.05) 60%, transparent)` }} />
        {/* the garland: a temple border running from the bell down to the diya */}
        <div className="absolute bottom-[70px] top-[200px] w-[34px]" style={{ ...at('calc(var(--axis) - 17px)'), backgroundImage: SIDE_BORDER, backgroundRepeat: 'repeat-y', backgroundPosition: 'center',
          maskImage: 'linear-gradient(to bottom, transparent, #000 8%, #000 92%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, #000 8%, #000 92%, transparent)' }} />
        {/* bell under the header */}
        <div className="absolute top-[74px] h-[132px] w-[42px]" style={at('calc(var(--axis) - 21px)')}>
          <Bell className="h-full w-full" chain={78} delay={right ? 1.2 : 0} />
        </div>
        {/* Shri Chakra medallion hung on the garland, mid-screen */}
        <div className="absolute top-1/2 -translate-y-1/2 drop-shadow-[0_10px_18px_rgba(147,96,15,.25)]" style={{ ...at('calc(var(--axis) - var(--ck) / 2)'), width: 'var(--ck)', height: 'var(--ck)' }}>
          <ChakraMedallion className="h-full w-full" />
        </div>
        {/* lit diya at the foot (left only — the contact buttons sit bottom-right) */}
        {!right && <div className="absolute bottom-3 h-14 w-14" style={at('calc(var(--axis) - 28px)')}><Diya className="h-full w-full" /></div>}
      </div>
    )
  }
  return (
    <div className={`side-ornaments pointer-events-none fixed inset-0 z-0 hidden transition-opacity duration-700 min-[1300px]:block ${show ? 'opacity-100' : 'opacity-0'}`} aria-hidden>
      {side(false)}
      {side(true)}
    </div>
  )
}
