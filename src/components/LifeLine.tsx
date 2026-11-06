import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { lifeline, lifelineOrderLink, type Bi } from '../data/lifeline'
import { site } from '../data/site'
import { usePrefs } from '../lib/prefs'
import { Diamond } from './Decor'
import { Arrow, Chevron, iconByName, WhatsApp } from './Icons'

const inr = (n: number) => `₹${n}/-`
const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV']

/**
 * English + Kannada text. In English (default) and Kannada mode both lines are shown;
 * in the other languages only the English line is shown, translated on screen.
 */
export function BiText({ t, className = '', knClass = '', inline = false }: { t: Bi; className?: string; knClass?: string; inline?: boolean }) {
  const { lang } = usePrefs()
  if (lang !== 'en' && lang !== 'kn') return <span className={className}>{t.en}</span>
  return (
    <span className={className} data-no-translate="">
      <span lang="en">{t.en}</span>
      <span lang="kn" className={`font-kn not-italic text-golddark ${inline ? 'ml-1.5' : 'mt-1 block'} ${knClass || 'text-[0.86em]'}`}>{inline && '— '}{t.kn}</span>
    </span>
  )
}

/** The "Life Line Horoscope" book — a maroon & gold hard-cover drawn in CSS with Guruji's portrait. */
export function LifeLineBook({ className = '' }: { className?: string }) {
  return (
    <div className={`relative mx-auto aspect-[3/4] w-full max-w-[300px] ${className}`} style={{ perspective: '1200px', containerType: 'inline-size' }}>
      <div className="absolute inset-y-[2.5%] right-[-3.5%] w-[8%] rounded-r-md" aria-hidden
        style={{ background: 'repeating-linear-gradient(90deg,#FFFDF5 0 2px,#E9DDC2 2px 3px)', boxShadow: '4px 6px 14px -6px rgba(0,0,0,.45)' }} />
      <div className="relative h-full w-full overflow-hidden rounded-[6px_14px_14px_6px] shadow-[0_24px_40px_-18px_rgba(60,15,5,.75)]"
        style={{ transform: 'rotateY(-10deg)', transformOrigin: 'left center', background: 'radial-gradient(120% 90% at 60% 30%,#9A2A14 0%,#6E1A0B 55%,#4A0F06 100%)' }}>
        <div className="absolute inset-y-0 left-0 w-[9%]" aria-hidden style={{ background: 'linear-gradient(90deg,rgba(0,0,0,.45),rgba(0,0,0,.05) 70%,rgba(255,220,150,.25))' }} />
        <div className="absolute inset-[6%] left-[13%] rounded-[8px]" aria-hidden style={{ boxShadow: 'inset 0 0 0 1.5px #E7C26A, inset 0 0 0 5px transparent, inset 0 0 0 6px #E7C26A88' }} />
        <div className="absolute inset-[6%] left-[13%] flex flex-col items-center px-[6%] py-[7%] text-center" data-no-translate="">
          <p className="font-kn text-[4.2cqw] text-[#F2CF7E]">॥ ಶ್ರೀ ॥</p>
          <div className="relative mt-[4%] aspect-square w-[52%] rounded-full p-[3px]" style={{ background: 'conic-gradient(#F6DA8E,#C58B2D,#F2CF7E,#93600F,#F6DA8E)' }}>
            <img src={site.photo} alt="" className="h-full w-full rounded-full object-cover object-top" loading="lazy" />
          </div>
          <h3 className="mt-[7%] font-cormorant text-[10.5cqw] font-bold italic leading-[1.02] text-[#F7D88A] drop-shadow-[0_2px_3px_rgba(0,0,0,.5)]">Life Line<br />Horoscope</h3>
          <p className="mt-[2%] font-kn text-[4.6cqw] text-[#F2CF7E]">ಜೀವನ ರೇಖೆ ಜಾತಕ</p>
          <span className="mt-[3%] block h-px w-1/2 bg-gradient-to-r from-transparent via-[#E7C26A] to-transparent" aria-hidden />
          <p className="mt-[3%] font-cormorant text-[4.4cqw] italic leading-tight text-[#F6E3B4]">Complete Blueprint of Your Life</p>
          <p className="mt-auto font-marcellus text-[4.4cqw] text-[#F7D88A]">Vasudev Guruji</p>
        </div>
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

export function LifeLineAreas({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`grid gap-2.5 ${compact ? 'grid-cols-2' : 'grid-cols-2 lg:grid-cols-3'}`}>
      {lifeline.areas.map((a) => {
        const I = iconByName[a.icon]
        return (
          <div key={a.title.en} className="rounded-xl border border-goldlight/70 bg-paper p-3">
            <div className="flex items-start gap-2"><I size={18} className="mt-0.5 shrink-0 text-golddark" />
              <b className="font-marcellus text-[15.5px] font-normal leading-tight text-maroon sm:text-[17px]"><BiText t={a.title} knClass="text-[0.8em]" /></b></div>
            <p className="mt-1.5 text-[13.5px] leading-snug text-ink/[.88] sm:text-[15px]"><BiText t={a.text} knClass="text-[0.92em]" /></p>
          </div>
        )
      })}
    </div>
  )
}

/** One page of the book's contents (parchment page with roman chapter numbers). */
function ContentsPage({ from, to, folio, title = false, end = false, small = false }: { from: number; to: number; folio: string; title?: boolean; end?: boolean; small?: boolean }) {
  return (
    <div className="relative flex h-full flex-col px-5 pb-4 pt-6 sm:px-8 sm:pt-8">
      {/* inner gold frame */}
      <div className="pointer-events-none absolute inset-2.5 rounded-md border border-[#D9AA52]/60 sm:inset-3.5" aria-hidden />
      <div className="pointer-events-none absolute inset-[13px] rounded-[5px] border border-[#D9AA52]/30 sm:inset-[17px]" aria-hidden />
      {title && (
        <div className="mb-3 text-center">
          <p className="font-kn text-[13px] text-golddark" data-no-translate="">॥ ಶ್ರೀ ॥</p>
          <h3 className="mt-1 font-cormorant text-[30px] font-bold italic leading-none text-maroon sm:text-[34px]"><BiText t={lifeline.labels.contentsShort} knClass="text-[0.6em] mt-1.5" /></h3>
          <Diamond className="mx-auto mt-2 h-3 w-24" />
        </div>
      )}
      <ol className="relative flex-1">
        {lifeline.chapters.slice(from, to).map((c, k) => {
          const i = from + k
          return (
            <li key={c.en} className={`flex items-baseline gap-3 border-b border-dotted border-[#C58B2D]/45 last:border-0 ${small ? 'py-1.5' : 'py-2'}`}>
              <span className="w-9 shrink-0 text-right font-cinzel text-[13px] font-semibold text-[#B0321A]">{ROMAN[i]}</span>
              <span className={`min-w-0 flex-1 leading-snug text-ink ${small ? 'text-[14.5px]' : 'text-[15.5px] sm:text-[16.5px]'}`}><BiText t={c} knClass="text-[0.82em] mt-0.5" /></span>
              <span className="shrink-0 text-[10px] text-gold" aria-hidden>❖</span>
            </li>
          )
        })}
      </ol>
      {end && (
        <p className="mt-3 text-center text-[13.5px] italic text-golddark"><BiText t={lifeline.labels.preparedBy} knClass="text-[0.88em] not-italic" /></p>
      )}
      <p className="mt-2 text-center font-cinzel text-[11px] tracking-[0.3em] text-golddark" aria-hidden>— {folio} —</p>
    </div>
  )
}

/** The book's contents shown as an open book: two parchment pages with a spine (one page on phones). */
export function BookContents({ small = false }: { small?: boolean }) {
  const paper = { background: 'linear-gradient(180deg,#FFFCF2,#FBF0D6)' }
  return (
    <div className="relative mx-auto max-w-5xl">
      {/* leather cover peeking around the pages */}
      <div className="absolute -inset-2 rounded-[18px] sm:-inset-3" aria-hidden style={{ background: 'radial-gradient(120% 120% at 50% 40%,#8E2412,#5E160A)', boxShadow: '0 30px 50px -28px rgba(60,15,5,.8)' }} />
      <div className="relative grid overflow-hidden rounded-xl md:grid-cols-2">
        <div className="relative" style={paper}>
          <ContentsPage from={0} to={8} folio="i" title small={small} />
          {/* spine shadow */}
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-10 md:block" aria-hidden style={{ background: 'linear-gradient(90deg,transparent,rgba(120,80,20,.18))' }} />
        </div>
        <div className="relative border-t border-[#D9AA52]/40 md:border-l md:border-t-0" style={paper}>
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-10 md:block" aria-hidden style={{ background: 'linear-gradient(270deg,transparent,rgba(120,80,20,.18))' }} />
          <ContentsPage from={8} to={15} folio="ii" end small={small} />
        </div>
      </div>
    </div>
  )
}

const slides = [
  { key: 'blueprint', eyebrow: 'GURUJI SPECIAL', title: lifeline.tagline, body: () => (
    <p className="text-[17px] leading-relaxed text-ink/[.9]"><BiText t={lifeline.intro} knClass="text-[0.9em] mt-2 leading-relaxed" /></p>
  ) },
  { key: 'areas', eyebrow: 'WHAT IT COVERS', title: lifeline.labels.coverage, body: () => <LifeLineAreas compact /> },
  { key: 'contents', eyebrow: 'INSIDE THE BOOK', title: lifeline.labels.contents, body: () => (
    <ol className="grid gap-x-5 gap-y-1 sm:grid-cols-2">
      {lifeline.chapters.map((c, i) => (
        <li key={c.en} className="flex items-baseline gap-2 border-b border-dotted border-[#C58B2D]/40 py-1 text-[14.5px] leading-snug">
          <span className="w-7 shrink-0 font-cinzel text-[11px] font-semibold text-[#B0321A]">{ROMAN[i]}</span><span>{c.en}</span>
        </li>
      ))}
    </ol>
  ) },
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
            <h3 className="mb-3 mt-1 font-cormorant text-[26px] font-bold italic leading-tight text-maroon sm:text-[32px]"><BiText t={s.title} knClass="text-[0.68em] mt-1" /></h3>
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
