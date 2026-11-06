import { useState } from 'react'
import { Link } from 'react-router-dom'
import { EnquiryForm, PageHero, Section } from '../components/Common'
import { Diamond } from '../components/Decor'
import { BiText } from '../components/LifeLine'
import { Arrow, Lotus, Play, Star } from '../components/Icons'
import { gallery, gallerySections, type GalleryItem, type GallerySection } from '../data/gallery'

const ICONS = { star: Star, lotus: Lotus, play: Play } as const

/** One framed item: cream mount, double gold rule, corner jewels. Photos show in place; videos play right inside the frame. */
function Frame({ item }: { item: GalleryItem }) {
  const jewel = 'absolute h-2.5 w-2.5 rotate-45 border border-[#C58B2D] bg-[#F6DA8E]'
  return (
    <figure className="mb-4 break-inside-avoid sm:mb-6">
      <div className="relative rounded-xl bg-[#FFFBF0] p-2.5 shadow-[0_14px_30px_-18px_rgba(122,36,16,.6)] ring-1 ring-[#E7C26A] sm:p-3">
        <div className="pointer-events-none absolute inset-1 rounded-lg border border-[#E7C26A]/70" aria-hidden />
        <span className={`${jewel} left-0 top-0 -translate-x-1/3 -translate-y-1/3`} aria-hidden />
        <span className={`${jewel} right-0 top-0 translate-x-1/3 -translate-y-1/3`} aria-hidden />
        <span className={`${jewel} bottom-0 left-0 -translate-x-1/3 translate-y-1/3`} aria-hidden />
        <span className={`${jewel} bottom-0 right-0 translate-x-1/3 translate-y-1/3`} aria-hidden />
        <div className="relative overflow-hidden rounded-md bg-black ring-1 ring-[#C58B2D]/50">
          {item.video ? (
            <video src={item.src} poster={item.poster} controls playsInline preload="metadata" className="block h-auto w-full" aria-label={item.caption} />
          ) : (
            <img src={item.src} alt={item.caption} loading="lazy" className="block h-auto w-full" />
          )}
        </div>
        <figcaption className="px-1 pb-0.5 pt-2.5 text-center">
          <span className="block font-marcellus text-[15px] leading-snug text-maroon sm:text-[16px]"><BiText t={{ en: item.caption, kn: item.kn }} knClass="text-[0.85em] mt-0.5" /></span>
        </figcaption>
      </div>
    </figure>
  )
}

export default function GalleryPage() {
  const [tab, setTab] = useState<'all' | GallerySection>('all')
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
                {items.map((it) => <Frame key={it.src} item={it} />)}
              </div>
            </div>
          )
        })}
        <Diamond className="mx-auto mt-6 h-3 w-28" />
        <p className="mt-3 text-center text-[15px] text-ink/[.82]">More photos and videos are added regularly. <Link to="/contact" className="inline-flex items-center gap-1 text-golddark underline">Share yours with the office <Arrow size={12} /></Link></p>
      </Section>
      <Section className="!pt-2"><div className="mx-auto max-w-3xl"><EnquiryForm title="Ask Guruji" /></div></Section>
    </>
  )
}
