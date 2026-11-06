import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { EnquiryForm, PageHero, Section } from '../components/Common'
import { Diamond } from '../components/Decor'
import { BiText } from '../components/LifeLine'
import { Arrow, Chevron, Close, Lotus, Play, Star } from '../components/Icons'
import { gallery, gallerySections, type GalleryItem, type GallerySection } from '../data/gallery'

const ICONS = { star: Star, lotus: Lotus, play: Play } as const

/** One framed item: cream mount, double gold rule, small corner jewels — the whole picture is shown, never cropped. */
function Frame({ item, onOpen }: { item: GalleryItem; onOpen: () => void }) {
  const jewel = 'absolute h-2.5 w-2.5 rotate-45 border border-[#C58B2D] bg-[#F6DA8E]'
  return (
    <figure className="mb-4 break-inside-avoid sm:mb-6">
      <button onClick={onOpen} className="group block w-full rounded-xl text-left" aria-label={item.video ? `Play video: ${item.caption}` : `Open photo: ${item.caption}`}>
        <div className="relative rounded-xl bg-[#FFFBF0] p-2.5 shadow-[0_14px_30px_-18px_rgba(122,36,16,.6)] ring-1 ring-[#E7C26A] transition group-hover:-translate-y-1 group-hover:shadow-[0_22px_36px_-18px_rgba(122,36,16,.65)] sm:p-3">
          <div className="pointer-events-none absolute inset-1 rounded-lg border border-[#E7C26A]/70" aria-hidden />
          <span className={`${jewel} left-0 top-0 -translate-x-1/3 -translate-y-1/3`} aria-hidden />
          <span className={`${jewel} right-0 top-0 translate-x-1/3 -translate-y-1/3`} aria-hidden />
          <span className={`${jewel} bottom-0 left-0 -translate-x-1/3 translate-y-1/3`} aria-hidden />
          <span className={`${jewel} bottom-0 right-0 translate-x-1/3 translate-y-1/3`} aria-hidden />
          <div className="relative overflow-hidden rounded-md ring-1 ring-[#C58B2D]/50">
            <img src={item.video ? item.poster : item.src} alt={item.caption} loading="lazy" className="block h-auto w-full transition duration-700 group-hover:scale-[1.03]" />
            {item.video && (
              <>
                <span className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white/90 bg-[#B0321A]/80 text-white shadow-lg transition group-hover:scale-110"><Play size={24} className="ml-1" /></span>
                <span className="absolute left-2 top-2 rounded-full bg-[#B0321A] px-2 py-0.5 font-cinzel text-[10px] font-semibold tracking-widest text-white">VIDEO</span>
              </>
            )}
          </div>
          <figcaption className="px-1 pb-0.5 pt-2.5 text-center">
            <span className="block font-marcellus text-[15px] leading-snug text-maroon sm:text-[16px]"><BiText t={{ en: item.caption, kn: item.kn }} knClass="text-[0.85em] mt-0.5" /></span>
          </figcaption>
        </div>
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
  const tabs: { key: 'all' | GallerySection; label: string; kn: string; icon?: string; count: number }[] = [
    { key: 'all', label: 'All', kn: 'ಎಲ್ಲಾ', count: gallery.length },
    ...gallerySections.map((s) => ({ key: s.key, label: s.label, kn: s.kn, icon: s.icon, count: gallery.filter((g) => g.section === s.key).length })),
  ]
  return (
    <>
      <PageHero compact eyebrow={{ kn: 'ಗ್ಯಾಲರಿ', en: 'GALLERY' }} title="Gallery" hi="ಚಿತ್ರ ಸಂಪುಟ" />
      <Section className="!pt-4">
        {/* compact section switcher */}
        <div className="mb-8 flex justify-center">
          <div className="flex flex-wrap justify-center gap-1.5 sm:inline-flex sm:flex-nowrap sm:gap-1 sm:rounded-full sm:border sm:border-goldlight sm:bg-paper sm:p-1 sm:shadow-sm" role="tablist" aria-label="Gallery sections">
            {tabs.map((t) => {
              const I = t.icon ? ICONS[t.icon as keyof typeof ICONS] : null
              const active = tab === t.key
              return (
                <button key={t.key} role="tab" aria-selected={active} onClick={() => setTab(t.key)}
                  className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 font-marcellus text-[13.5px] transition sm:px-4 sm:text-[15px] ${active ? 'text-[#F7D88A] shadow' : 'border border-goldlight bg-paper text-maroon hover:bg-goldlight/20 sm:border-0 sm:bg-transparent'}`}
                  style={active ? { background: 'linear-gradient(180deg,#8E2412,#5E160A)' } : undefined}>
                  {I && <I size={15} />}
                  <span>{t.label}</span>
                  <span className={`rounded-full px-1.5 text-[11px] leading-[18px] ${active ? 'bg-white/15 text-goldlight' : 'bg-goldlight/30 text-golddark'}`}>{t.count}</span>
                </button>
              )
            })}
          </div>
        </div>

        {shown.map((s) => {
          const items = gallery.filter((g) => g.section === s.key)
          return (
            <div key={s.key} className="mb-10 last:mb-0">
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/60" />
                <h2 className="text-center font-cormorant text-[24px] font-bold italic leading-tight text-maroon sm:text-[30px]"><BiText t={{ en: s.label, kn: s.kn }} inline knClass="text-[0.7em]" /></h2>
                <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/60" />
              </div>
              <div className={`mx-auto gap-4 sm:gap-6 ${items.length === 1 ? 'max-w-[260px] sm:max-w-[340px]' : items.length === 2 ? 'max-w-2xl columns-2' : 'columns-2 lg:columns-3'}`}>
                {items.map((it, i) => <Frame key={it.src} item={it} onOpen={() => setOpen({ items, i })} />)}
              </div>
            </div>
          )
        })}
        <Diamond className="mx-auto mt-6 h-3 w-28" />
        <p className="mt-3 text-center text-[15px] text-ink/[.82]">More photos and videos are added regularly. <Link to="/contact" className="inline-flex items-center gap-1 text-golddark underline">Share yours with the office <Arrow size={12} /></Link></p>
      </Section>
      <Section className="!pt-2"><div className="mx-auto max-w-3xl"><EnquiryForm title="Ask Guruji" /></div></Section>
      {open && <Lightbox items={open.items} index={open.i} onClose={() => setOpen(null)} onGo={(i) => setOpen({ ...open, i })} />}
    </>
  )
}
