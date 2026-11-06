import { useCallback, useEffect, useRef, useState } from 'react'
import { EnquiryForm, PageHero, Section } from '../components/Common'
import { Diamond } from '../components/Decor'
import { BiText } from '../components/LifeLine'
import { Arrow, Chevron, Close, Lotus, Play, Star } from '../components/Icons'
import { gallery, gallerySections, type GalleryItem, type GallerySection } from '../data/gallery'

const ICONS = { star: Star, lotus: Lotus, play: Play } as const

/** One framed item: temple-arch top, gold border, maroon name-plate underneath. */
function Frame({ item, onOpen }: { item: GalleryItem; onOpen: () => void }) {
  return (
    <figure className="mb-4 break-inside-avoid sm:mb-6">
      <button onClick={onOpen} className="group block w-full text-left" aria-label={item.video ? `Play video: ${item.caption}` : `Open photo: ${item.caption}`}>
        <div className={`p-[3px] shadow-[0_16px_30px_-18px_rgba(122,36,16,.65)] ${item.tall ? 'rounded-t-[999px] rounded-b-xl' : 'rounded-xl'}`}
          style={{ background: 'linear-gradient(135deg,#F6DA8E,#C58B2D 40%,#F2CF7E 60%,#93600F)' }}>
          <div className={`relative overflow-hidden bg-[#3A1408] ${item.tall ? 'aspect-[3/4] rounded-t-[999px] rounded-b-[10px]' : 'aspect-[4/3] rounded-[10px]'}`}>
            <img src={item.video ? item.poster : item.src} alt={item.caption} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
            {item.video ? (
              <>
                <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
                <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white/90 bg-white/25 text-white backdrop-blur-sm transition group-hover:scale-110"><Play size={28} className="ml-1" /></span>
                <span className="absolute left-3 top-3 rounded-full bg-[#B0321A] px-2.5 py-0.5 font-cinzel text-[10px] font-semibold tracking-widest text-white">VIDEO</span>
              </>
            ) : (
              <span className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-0 transition group-hover:opacity-100" />
            )}
          </div>
        </div>
        <figcaption className="relative mx-3 -mt-3 rounded-lg px-3 py-2 text-center shadow-md"
          style={{ background: 'linear-gradient(180deg,#8E2412,#5E160A)', boxShadow: 'inset 0 0 0 1px #D9AA52, 0 6px 14px -8px rgba(0,0,0,.5)' }}>
          <span className="block font-cormorant text-[17px] font-bold leading-tight text-[#F7D88A]"><BiText t={{ en: item.caption, kn: item.kn }} knClass="text-[0.78em] mt-0.5 !text-goldlight/90" /></span>
        </figcaption>
      </button>
    </figure>
  )
}

/** Full-screen viewer with previous / next, swipe and Esc. */
function Lightbox({ items, index, onClose, onGo }: { items: GalleryItem[]; index: number; onClose: () => void; onGo: (i: number) => void }) {
  const item = items[index]
  const touch = useRef<number | null>(null)
  const go = useCallback((d: number) => onGo((index + d + items.length) % items.length), [index, items.length, onGo])
  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1) }
    window.addEventListener('keydown', k)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', k); document.body.style.overflow = '' }
  }, [go, onClose])
  return (
    <div className="fixed inset-0 z-[95] flex flex-col items-center justify-center bg-[#1A0804]/90 p-3 backdrop-blur-sm sm:p-6" role="dialog" aria-modal="true" aria-label={item.caption} onClick={onClose}
      onTouchStart={(e) => { touch.current = e.touches[0].clientX }}
      onTouchEnd={(e) => { if (touch.current != null) { const dx = e.changedTouches[0].clientX - touch.current; if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1) } touch.current = null }}>
      <button onClick={onClose} className="pill absolute right-3 top-3 h-11 w-11" aria-label="Close"><Close size={18} /></button>
      <div className="relative flex max-h-[80vh] w-full max-w-4xl items-center justify-center" onClick={(e) => e.stopPropagation()}>
        {item.video ? (
          <video key={item.src} src={item.src} poster={item.poster} controls autoPlay playsInline className="max-h-[80vh] max-w-full rounded-xl border-2 border-goldlight bg-black" />
        ) : (
          <img key={item.src} src={item.src} alt={item.caption} className="max-h-[80vh] max-w-full rounded-xl border-2 border-goldlight object-contain" />
        )}
      </div>
      <p className="mt-3 max-w-2xl text-center font-cormorant text-[20px] font-bold text-[#F7D88A]" onClick={(e) => e.stopPropagation()}><BiText t={{ en: item.caption, kn: item.kn }} knClass="text-[0.78em] !text-goldlight/90" /></p>
      {items.length > 1 && (
        <>
          <button onClick={(e) => { e.stopPropagation(); go(-1) }} className="pill absolute left-2 top-1/2 h-11 w-11 -translate-y-1/2 sm:left-5" aria-label="Previous"><Chevron size={16} className="rotate-90" /></button>
          <button onClick={(e) => { e.stopPropagation(); go(1) }} className="pill absolute right-2 top-1/2 h-11 w-11 -translate-y-1/2 sm:right-5" aria-label="Next"><Chevron size={16} className="-rotate-90" /></button>
          <p className="mt-1 font-cinzel text-[11px] tracking-[0.25em] text-goldlight/80">{index + 1} / {items.length}</p>
        </>
      )}
    </div>
  )
}

export default function GalleryPage() {
  const [tab, setTab] = useState<'all' | GallerySection>('all')
  const [open, setOpen] = useState<{ items: GalleryItem[]; i: number } | null>(null)
  const shown = gallerySections.filter((s) => tab === 'all' || tab === s.key)
  return (
    <>
      <PageHero compact eyebrow={{ kn: 'ಗ್ಯಾಲರಿ', en: 'GALLERY' }} title="Gallery" hi="ಚಿತ್ರ ಸಂಪುಟ" />
      <Section className="!pt-4">
        {/* section switcher: three temple plaques */}
        <div className="mx-auto mb-8 grid max-w-3xl grid-cols-3 gap-2 sm:gap-4" role="tablist" aria-label="Gallery sections">
          {gallerySections.map((s) => {
            const I = ICONS[s.icon as keyof typeof ICONS]
            const active = tab === s.key
            const count = gallery.filter((g) => g.section === s.key).length
            return (
              <button key={s.key} role="tab" aria-selected={active} onClick={() => setTab(active ? 'all' : s.key)}
                className={`flex flex-col items-center gap-1 rounded-2xl border px-2 py-3 text-center transition sm:py-4 ${active ? 'border-[#D9AA52] text-[#F7D88A] shadow-lg' : 'border-goldlight bg-paper text-maroon hover:-translate-y-0.5 hover:shadow'}`}
                style={active ? { background: 'linear-gradient(180deg,#8E2412,#5E160A)' } : undefined}>
                <span className={`flex h-10 w-10 items-center justify-center rounded-full border ${active ? 'border-goldlight/70 text-goldlight' : 'border-goldlight text-golddark'}`}><I size={20} /></span>
                <span className="font-marcellus text-[13.5px] leading-tight sm:text-[16px]"><BiText t={{ en: s.label, kn: s.kn }} knClass={`text-[0.8em] mt-0.5 ${active ? '!text-goldlight' : ''}`} /></span>
                <span className={`font-cinzel text-[10px] tracking-widest ${active ? 'text-goldlight/80' : 'text-golddark'}`}>{count}</span>
              </button>
            )
          })}
        </div>

        {shown.map((s) => {
          const items = gallery.filter((g) => g.section === s.key)
          return (
            <div key={s.key} className="mb-10 last:mb-0">
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/60" />
                <h2 className="text-center font-cormorant text-[26px] font-bold italic leading-tight text-maroon sm:text-[32px]"><BiText t={{ en: s.label, kn: s.kn }} inline knClass="text-[0.7em]" /></h2>
                <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/60" />
              </div>
              <div className={`mx-auto gap-4 sm:gap-6 ${items.length === 1 ? 'max-w-sm' : items.length === 2 ? 'max-w-2xl columns-2' : 'columns-2 lg:columns-3'}`}>
                {items.map((it, i) => <Frame key={it.src} item={it} onOpen={() => setOpen({ items, i })} />)}
              </div>
            </div>
          )
        })}
        <Diamond className="mx-auto mt-6 h-3 w-28" />
        <p className="mt-3 text-center text-[15px] text-ink/[.82]">More photos and videos are added regularly. <a href="/contact" className="inline-flex items-center gap-1 text-golddark underline">Share yours with the office <Arrow size={12} /></a></p>
      </Section>
      <Section className="!pt-2"><div className="mx-auto max-w-3xl"><EnquiryForm title="Ask Guruji" /></div></Section>
      {open && <Lightbox items={open.items} index={open.i} onClose={() => setOpen(null)} onGo={(i) => setOpen({ ...open, i })} />}
    </>
  )
}
