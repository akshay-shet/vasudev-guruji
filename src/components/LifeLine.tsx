import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { lifeline, lifelineOrderLink } from '../data/lifeline'
import { site } from '../data/site'
import { Arrow, Chevron, iconByName, WhatsApp } from './Icons'

const inr = (n: number) => `₹${n}/-`

/** The "Life Line Horoscope" book — a maroon & gold hard-cover drawn in CSS with Guruji's portrait. */
export function LifeLineBook({ className = '' }: { className?: string }) {
  return (
    <div className={`relative mx-auto aspect-[3/4] w-full max-w-[300px] ${className}`} style={{ perspective: '1200px', containerType: 'inline-size' }}>
      {/* pages peeking out on the right */}
      <div className="absolute inset-y-[2.5%] right-[-3.5%] w-[8%] rounded-r-md" aria-hidden
        style={{ background: 'repeating-linear-gradient(90deg,#FFFDF5 0 2px,#E9DDC2 2px 3px)', boxShadow: '4px 6px 14px -6px rgba(0,0,0,.45)' }} />
      <div className="relative h-full w-full overflow-hidden rounded-[6px_14px_14px_6px] shadow-[0_24px_40px_-18px_rgba(60,15,5,.75)]"
        style={{ transform: 'rotateY(-10deg)', transformOrigin: 'left center', background: 'radial-gradient(120% 90% at 60% 30%,#9A2A14 0%,#6E1A0B 55%,#4A0F06 100%)' }}>
        {/* spine */}
        <div className="absolute inset-y-0 left-0 w-[9%]" aria-hidden style={{ background: 'linear-gradient(90deg,rgba(0,0,0,.45),rgba(0,0,0,.05) 70%,rgba(255,220,150,.25))' }} />
        {/* gold frame */}
        <div className="absolute inset-[6%] left-[13%] rounded-[8px]" aria-hidden style={{ boxShadow: 'inset 0 0 0 1.5px #E7C26A, inset 0 0 0 5px transparent, inset 0 0 0 6px #E7C26A88' }} />
        <div className="absolute inset-[6%] left-[13%] flex flex-col items-center px-[6%] py-[7%] text-center">
          <p className="font-cinzel text-[3.4cqw] tracking-[0.28em] text-[#F2CF7E]">VEDIC LIFE REPORT</p>
          <div className="relative mt-[6%] aspect-square w-[52%] rounded-full p-[3px]" style={{ background: 'conic-gradient(#F6DA8E,#C58B2D,#F2CF7E,#93600F,#F6DA8E)' }}>
            <img src={site.photo} alt="" className="h-full w-full rounded-full object-cover object-top" loading="lazy" />
          </div>
          <h3 className="mt-[7%] font-cormorant text-[10.5cqw] font-bold italic leading-[1.02] text-[#F7D88A] drop-shadow-[0_2px_3px_rgba(0,0,0,.5)]" data-no-translate="">
            Life Line<br />Horoscope
          </h3>
          <span className="mt-[3%] block h-px w-1/2 bg-gradient-to-r from-transparent via-[#E7C26A] to-transparent" aria-hidden />
          <p className="mt-[3%] font-cormorant text-[4.6cqw] italic leading-tight text-[#F6E3B4]">Complete Blueprint of Your Life</p>
          <p className="mt-auto font-cinzel text-[3.4cqw] tracking-[0.18em] text-[#F2CF7E]">80–100 PAGES</p>
          <p className="mt-1 font-marcellus text-[4.4cqw] text-[#F7D88A]">Vasudev Guruji</p>
        </div>
        {/* sheen */}
        <div className="pointer-events-none absolute inset-0" aria-hidden style={{ background: 'linear-gradient(115deg,transparent 30%,rgba(255,240,200,.16) 45%,transparent 60%)' }} />
      </div>
      <span className="absolute -right-3 -top-3 flex h-[68px] w-[68px] rotate-12 flex-col items-center justify-center rounded-full bg-[#F2B91C] text-center text-maroon shadow-lg ring-2 ring-paper">
        <span className="font-cinzel text-[9px] font-semibold leading-none tracking-wider">SAVE</span>
        <span className="font-marcellus text-[18px] leading-tight">₹{lifeline.originalPrice - lifeline.offerPrice}</span>
      </span>
    </div>
  )
}

/** Offer price block + WhatsApp order button. */
export function LifeLineOffer({ center = false, more = false }: { center?: boolean; more?: boolean }) {
  return (
    <div className={`rounded-2xl border border-goldlight bg-[linear-gradient(180deg,#FFF8E6,#FCEBC4)] p-4 ${center ? 'text-center' : ''}`}>
      <p className="font-cinzel text-[11px] font-semibold tracking-[0.16em] text-[#B0321A]">SPECIAL LIMITED-TIME OFFER</p>
      <div className={`mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-0 ${center ? 'justify-center' : ''}`}>
        <span className="font-marcellus text-[34px] leading-none text-maroon">{inr(lifeline.offerPrice)}</span>
        <span className="text-lg text-ink/75 line-through decoration-[#B0321A]/70">{inr(lifeline.originalPrice)}</span>
        <span className="rounded-full bg-[#1DA851]/12 px-2 py-0.5 text-[14px] font-bold text-[#147A3B]">{`Save ₹${lifeline.originalPrice - lifeline.offerPrice}`}</span>
      </div>
      <div className={`mt-3 flex flex-wrap gap-2 ${center ? 'justify-center' : ''}`}>
        <a href={lifelineOrderLink()} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full bg-[#1DA851] px-5 py-2.5 font-semibold text-white shadow-md transition hover:brightness-110">
          <WhatsApp size={19} /> {`Order on WhatsApp – ${inr(lifeline.offerPrice)}`}
        </a>
        {more && <Link to="/life-line-horoscope" className="btn-outline px-4 py-2">Know more <Arrow size={15} /></Link>}
      </div>
    </div>
  )
}

function Highlights() {
  return (
    <ul className="space-y-3">
      {lifeline.highlights.map((h) => {
        const I = iconByName[h.icon]
        return (
          <li key={h.title} className="flex gap-3">
            <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-goldlight bg-paper text-golddark"><I size={20} /></span>
            <span><b className="font-marcellus text-[18px] font-normal text-maroon">{h.title}</b><span className="block text-[16px] leading-snug text-ink/[.88]">{h.text}</span></span>
          </li>
        )
      })}
    </ul>
  )
}

export function LifeLineAreas({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`grid gap-2.5 ${compact ? 'grid-cols-2' : 'grid-cols-2 lg:grid-cols-3'}`}>
      {lifeline.areas.map((a) => {
        const I = iconByName[a.icon]
        return (
          <div key={a.title} className="rounded-xl border border-goldlight/70 bg-paper p-3">
            <div className="flex items-center gap-2"><I size={18} className="shrink-0 text-golddark" /><b className="font-marcellus text-[15.5px] font-normal leading-tight text-maroon sm:text-[17px]">{a.title}</b></div>
            <p className="mt-1 text-[13.5px] leading-snug text-ink/[.88] sm:text-[15px]">{a.text}</p>
          </div>
        )
      })}
    </div>
  )
}

export function LifeLineContents({ cols = 2 }: { cols?: number }) {
  return (
    <ol className={`grid gap-x-5 gap-y-1.5 ${cols === 3 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2'}`}>
      {lifeline.contents.map((c, i) => (
        <li key={c} className="flex items-start gap-2 text-[15px] leading-snug sm:text-[16px]">
          <span className="mt-[1px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-maroon font-marcellus text-[11px] text-goldlight">{i + 1}</span>{c}
        </li>
      ))}
    </ol>
  )
}

const slides = [
  { key: 'blueprint', eyebrow: '80–100 PAGE DETAILED REPORT', title: 'Complete Blueprint of Your Life', body: () => <><p className="mb-4 text-[17px] leading-relaxed text-ink/[.9]">{lifeline.intro}</p><Highlights /></> },
  { key: 'areas', eyebrow: 'WHAT IT COVERS', title: '360-Degree Coverage Across All Life Areas', body: () => <LifeLineAreas compact /> },
  { key: 'contents', eyebrow: 'INSIDE THE BOOK', title: 'Full Life Report', body: () => <LifeLineContents /> },
]

/** Home-page slider: the book on one side, three sliding panels on the other. */
export function LifeLineSlider() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const touch = useRef<number | null>(null)
  const go = (d: number) => setI((x) => (x + d + slides.length) % slides.length)
  useEffect(() => {
    if (paused) return
    const t = window.setTimeout(() => go(1), 9000)
    return () => clearTimeout(t)
  }, [i, paused])
  const s = slides[i]
  return (
    <div className="card overflow-hidden p-4 sm:p-6 lg:p-8" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => { touch.current = e.touches[0].clientX; setPaused(true) }}
      onTouchEnd={(e) => { if (touch.current != null) { const dx = e.changedTouches[0].clientX - touch.current; if (Math.abs(dx) > 45) go(dx < 0 ? 1 : -1) } touch.current = null }}>
      <div className="grid items-center gap-6 lg:grid-cols-[minmax(240px,320px)_1fr] lg:gap-10">
        <div className="mx-auto w-[56%] max-w-[300px] sm:w-[40%] lg:w-full"><LifeLineBook /></div>
        <div className="min-w-0">
          <div key={s.key} className="min-h-[300px] animate-[fadein_.5s_ease] sm:min-h-[340px]" aria-live="polite">
            <p className="font-cinzel text-[11px] font-semibold tracking-[0.18em] text-[#B0321A]">{s.eyebrow}</p>
            <h3 className="mb-3 mt-1 font-cormorant text-[26px] font-bold italic leading-tight text-maroon sm:text-[32px]">{s.title}</h3>
            {s.body()}
          </div>
          <div className="mt-4 flex items-center gap-3">
            <button onClick={() => go(-1)} className="pill h-9 w-9" aria-label="Previous slide"><Chevron size={14} className="rotate-90" /></button>
            <div className="flex gap-1.5">
              {slides.map((x, n) => (
                <button key={x.key} onClick={() => setI(n)} aria-label={`Slide ${n + 1}`} aria-current={n === i}
                  className={`h-2.5 rounded-full transition-all ${n === i ? 'w-7 bg-gold' : 'w-2.5 bg-goldlight'}`} />
              ))}
            </div>
            <button onClick={() => go(1)} className="pill h-9 w-9" aria-label="Next slide"><Chevron size={14} className="-rotate-90" /></button>
          </div>
          <div className="mt-4"><LifeLineOffer more /></div>
        </div>
      </div>
    </div>
  )
}
