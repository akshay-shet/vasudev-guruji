import { useEffect, useState, type ReactNode } from 'react'
import { ChatWidget } from './ChatWidget'
import { KaalPopup, openKaal } from './KaalPopup'
import { Link } from 'react-router-dom'
import { site, topics, whatsappLink, type Topic } from '../data/site'
import { services } from '../data/content'
import { usePrefs, useT } from '../lib/prefs'
import { ArchShape, Brand, Diamond, Diya } from './Decor'
import { Close, iconByName, Mail, MoonIcon, Phone, Pin, Play, Sun, WhatsApp } from './Icons'
import { MEDIA } from '../lib/media'

/* ───────── Arch tile ───────── */
export function ArchTile({ icon, label, label2, to, small, variant = 'mobile' }: { icon: string; label: string; label2: string; to: string; small?: boolean; variant?: 'mobile' | 'desktop' }) {
  const Icon = iconByName[icon]
  const desk = variant === 'desktop'
  return (
    <Link to={to} className={`arch flex h-full flex-col items-center text-center ${desk ? 'px-2 pb-[8%] pt-[22%]' : 'w-full justify-start px-1 pb-[calc(var(--u)*3.4)] pt-[calc(var(--u)*6.2)]'}`}>
      <ArchShape />
      <Icon size={desk ? 46 : undefined} className={`shrink-0 text-gold ${desk ? 'h-[clamp(34px,2.8vw,48px)] w-[clamp(34px,2.8vw,48px)]' : 'h-[calc(var(--u)*6.6)] w-[calc(var(--u)*6.6)]'}`} strokeWidth={1.7} />
      <span className={`mt-[3%] font-marcellus leading-[1.12] text-ink ${desk ? 'text-[clamp(14px,1.12vw,19px)]' : 'text-[calc(var(--u)*3.15)]'}`}>
        {label}
        {label2 && <br />}
        <span className={small ? 'whitespace-nowrap text-[0.66em]' : 'whitespace-nowrap'}>{label2}</span>
      </span>
      {desk && <Diamond className="mt-2 h-2.5 w-16" />}
    </Link>
  )
}

/* ───────── SEO keyword pair: English — Kannada (never translated) ───────── */
export function KeywordPair({ en, kn, stacked = false, heading = false, className = '' }: { en: string; kn: string; stacked?: boolean; heading?: boolean; className?: string }) {
  const { lang } = usePrefs()
  // English and Kannada show the "English — Kannada" pair; other languages show the translated keyword.
  if (lang !== 'en' && lang !== 'kn') return <span className={className}>{en}</span>
  if (heading) {
    // Short pairs sit on one line ("English — ಕನ್ನಡ"); long ones put the Kannada on its own line.
    const long = en.length > 26
    return (
      <span data-no-translate className={className}>
        <span lang="en">{en}</span>
        <span className={`mx-[0.35em] text-gold ${long ? 'hidden' : 'max-md:hidden'}`} aria-hidden>—</span>
        <span lang="kn" className={`font-kn not-italic text-golddark ${long ? 'mt-1 block text-[0.66em] md:text-[0.62em]' : 'max-md:mt-1 max-md:block max-md:text-[0.72em] md:text-[0.82em]'}`}>
          {long && <span className="text-gold" aria-hidden>— </span>}{kn}{long && <span className="text-gold" aria-hidden> —</span>}
        </span>
      </span>
    )
  }
  return (
    <span data-no-translate className={`${stacked ? 'flex flex-col items-center' : 'inline'} ${className}`}>
      <span lang="en">{en}</span>
      {stacked ? null : <span className="mx-[0.4em] text-gold" aria-hidden>—</span>}
      <span lang="kn" className={`font-kn ${stacked ? 'mt-0.5 text-[0.86em]' : ''}`}>{stacked && <span className="text-gold" aria-hidden>— </span>}{kn}</span>
    </span>
  )
}

/** Gold label pill above a section heading: "ಕನ್ನಡ | ENGLISH" (as in the reference design). */
export function Eyebrow({ kn, en }: { kn: string; en: string }) {
  const { lang } = usePrefs()
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-[#F2B91C] px-3 py-1 text-maroon shadow-sm">
      {lang === 'en' && <><span className="font-kn text-[13px]" data-no-translate lang="kn">{kn}</span><span className="h-3 w-px bg-maroon/40" /></>}
      <span className="font-cinzel text-[10.5px] font-semibold tracking-[0.18em]">{en}</span>
    </span>
  )
}

/** Kept for compatibility — titles and meta tags are now set per route by <Seo /> (src/lib/Seo.tsx, data in src/data/seo.ts). */
export function usePageTitle(title?: string) {
  void title
}

/* ───────── Inner page hero banner ─────────
 * Every page header follows one pattern:  [ಕನ್ನಡ | ENGLISH] pill  →  "English — ಕನ್ನಡ" heading  →  subtitle. */
export function PageHero({ title, hi, subtitle, children, compact, keyword, eyebrow }: { title: string; hi?: string; subtitle?: string; children?: ReactNode; compact?: boolean; keyword?: string; eyebrow?: { kn: string; en: string } }) {
  const kw = keyword ? services.find((s) => s.title === keyword) : undefined
  usePageTitle(kw ? `${title} · ${kw.title}` : title)
  return (
    <section className={`page-hero relative overflow-hidden ${compact ? 'pb-2 pt-6 lg:pb-4 lg:pt-10' : 'pb-8 pt-6 lg:pb-12 lg:pt-12'}`}>
      <img src={MEDIA + 'img/hero-right.webp'} alt="" className="scenery pointer-events-none absolute right-0 top-0 hidden h-full w-[34%] object-cover object-left opacity-90 lg:block"
        style={{ maskImage: 'linear-gradient(to left, #000 40%, transparent), linear-gradient(to bottom, #000 62%, transparent)', WebkitMaskImage: 'linear-gradient(to left, #000 40%, transparent), linear-gradient(to bottom, #000 62%, transparent)', maskComposite: 'intersect', WebkitMaskComposite: 'source-in' }} />
      <img src={MEDIA + 'img/hero-left.webp'} alt="" className="scenery pointer-events-none absolute left-0 top-0 hidden h-full w-[12%] object-cover object-right opacity-90 lg:block"
        style={{ maskImage: 'linear-gradient(to right, #000 50%, transparent), linear-gradient(to bottom, #000 62%, transparent)', WebkitMaskImage: 'linear-gradient(to right, #000 50%, transparent), linear-gradient(to bottom, #000 62%, transparent)', maskComposite: 'intersect', WebkitMaskComposite: 'source-in' }} />
      <div className="relative mx-auto max-w-4xl px-5 text-center">
        {eyebrow && <div className="mb-3"><Eyebrow {...eyebrow} /></div>}
        <h1 className="section-title !leading-tight">{hi ? <KeywordPair heading en={title} kn={hi} /> : title}</h1>
        <Diamond className="mx-auto mt-2 h-3 w-28" />
        {subtitle && <p className="hero-sub mx-auto mt-3 max-w-2xl text-lg text-ink/[.88] md:text-xl">{subtitle}</p>}
        {children}
      </div>
    </section>
  )
}

export function Section({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <section className={`reveal mx-auto w-full max-w-6xl px-4 py-10 md:px-6 ${className}`}>{children}</section>
}

export function SectionTitle({ children, sub, kn, eyebrow }: { children: ReactNode; sub?: string; kn?: string; eyebrow?: { kn: string; en: string } }) {
  return (
    <div className="mb-8 text-center">
      {eyebrow && <div className="mb-3"><Eyebrow {...eyebrow} /></div>}
      <h2 className="section-title">{kn && typeof children === 'string' ? <KeywordPair heading en={children} kn={kn} /> : children}</h2>
      <Diamond className="mx-auto mt-2 h-3 w-28" />
      {sub && <p className="mx-auto mt-3 max-w-2xl text-lg text-ink/[.88]">{sub}</p>}
    </div>
  )
}

/* ───────── Enquiry form (sends to WhatsApp) ───────── */
export function EnquiryForm({ defaultTopic = 'Other', title = 'Send an Enquiry', compact = false }: { defaultTopic?: Topic; title?: string; compact?: boolean }) {
  const [sent, setSent] = useState<string | null>(null)
  const [topic, setTopic] = useState<Topic>(defaultTopic)
  useEffect(() => setTopic(defaultTopic), [defaultTopic])
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const clean = (val: FormDataEntryValue | null, max = 200) =>
      typeof val === 'string' ? val.trim().replace(/[\u0000-\u001F\u007F-\u009F]/g, '').slice(0, max) : ''
    const name = clean(f.get('name'), 80)
    const phone = clean(f.get('phone'), 30)
    if (!name || !phone) return
    const lines = [
      '🙏 Hari Om Guruji,',
      `New enquiry from the website — Topic: ${topic}`,
      `Name: ${name}`,
      `Phone: ${phone}`,
      clean(f.get('dob'), 20) ? `Date of birth: ${clean(f.get('dob'), 20)}` : '',
      clean(f.get('tob'), 20) ? `Time of birth: ${clean(f.get('tob'), 20)}` : '',
      clean(f.get('pob'), 100) ? `Place of birth: ${clean(f.get('pob'), 100)}` : '',
      clean(f.get('message'), 1000) ? `Message: ${clean(f.get('message'), 1000)}` : '',
    ].filter(Boolean)
    const link = whatsappLink(lines.join('\n'))
    window.open(link, '_blank', 'noopener,noreferrer')
    setSent(link)
    e.currentTarget.reset()
  }
  return (
    <div className="card p-4 md:p-6">
      <h3 className="text-center font-cormorant text-2xl font-bold italic text-maroon md:text-3xl">{title}</h3>
      <Diamond className="mx-auto mb-3 mt-1 h-3 w-24" />
      {sent ? (
        <div className="py-6 text-center" role="status" aria-live="polite">
          <Diya className="mx-auto h-16 w-16" />
          <p className="mt-3 text-xl text-ink">{site.autoReply}</p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <a href={sent} target="_blank" rel="noopener" className="btn-gold px-6 py-2"><WhatsApp size={18} /> Open WhatsApp</a>
            <button onClick={() => setSent(null)} className="btn-outline px-6 py-2">Send another enquiry</button>
          </div>
        </div>
      ) : (
        <form onSubmit={submit} className={`grid grid-cols-2 gap-x-3 gap-y-2.5 ${compact ? '' : 'md:grid-cols-6 md:gap-x-4 md:gap-y-3'}`}>
          <div className={compact ? '' : 'md:col-span-2'}><label className="label" htmlFor="eq-name">Name *</label><input id="eq-name" name="name" required className="input !py-2" autoComplete="name" /></div>
          <div className={compact ? '' : 'md:col-span-2'}><label className="label" htmlFor="eq-phone">Phone / WhatsApp *</label><input id="eq-phone" name="phone" required className="input !py-2" inputMode="tel" autoComplete="tel" pattern="[0-9+\-\s]{7,}" /></div>
          <div className={`col-span-2 ${compact ? '' : 'md:col-span-2'}`}>
            <label className="label" htmlFor="eq-topic">Topic *</label>
            <select id="eq-topic" value={topic} onChange={(e) => setTopic(e.target.value as Topic)} className="input !py-2">
              {topics.map((tp) => <option key={tp} value={tp}>{tp}</option>)}
            </select>
          </div>
          <div className={compact ? '' : 'md:col-span-2'}><label className="label" htmlFor="eq-dob">Birth date</label><input id="eq-dob" name="dob" type="date" className="input !px-2 !py-2" /></div>
          <div className={compact ? '' : 'md:col-span-2'}><label className="label" htmlFor="eq-tob">Birth time</label><input id="eq-tob" name="tob" type="time" className="input !px-2 !py-2" /></div>
          <div className={`col-span-2 ${compact ? '' : 'md:col-span-2'}`}><label className="label" htmlFor="eq-pob">Birth place</label><input id="eq-pob" name="pob" className="input !py-2" placeholder="City, State, Country" /></div>
          <div className={`col-span-2 ${compact ? '' : 'md:col-span-6'}`}><label className="label" htmlFor="eq-msg">Your question</label><textarea id="eq-msg" name="message" rows={2} className="input !py-2" /></div>
          <div className={`col-span-2 ${compact ? '' : 'md:col-span-6'} mt-1 flex flex-col items-center gap-1.5`}>
            <button type="submit" className="btn-gold px-7 py-2.5 text-[17px]"><WhatsApp size={20} /> Send on WhatsApp</button>
          </div>
        </form>
      )}
    </div>
  )
}

/* ───────── Floating WhatsApp + Call ───────── */
export function FloatingContact() {
  return (
    <div className="fixed bottom-3 right-3 z-[60] flex flex-col gap-2 sm:bottom-4 sm:right-4 sm:gap-3">
      <ChatWidget />
      <KaalPopup />
      <a href={site.phoneHref} aria-label={`Call ${site.phone}`} className="btn-gold h-12 w-12 !rounded-full shadow-lg sm:h-14 sm:w-14"><Phone size={22} /></a>
      <a href={whatsappLink('🙏 Hari Om Guruji, I would like to make an enquiry.')} target="_blank" rel="noopener" aria-label="Chat on WhatsApp"
        className="flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg transition hover:scale-105 sm:h-14 sm:w-14" style={{ background: 'linear-gradient(180deg,#3BE07A,#1DA851)' }}>
        <WhatsApp size={27} />
      </a>
    </div>
  )
}

/* ───────── Marquee ribbon ───────── */
export function Ribbon() {
  const row = [...services, ...services]
  return (
    <div className="relative overflow-hidden border-y border-goldlight/70 py-3" style={{ background: 'linear-gradient(90deg,#93600F,#C58B2D,#ECC46E,#C58B2D,#93600F)' }} aria-label="Highlights">
      <div className="marquee-track flex w-max gap-10 whitespace-nowrap" style={{ animationDuration: '90s' }}>
        {row.map((s, i) => (
          <Link key={i} to={`/services/${s.slug}`} className="flex items-center gap-10 font-marcellus text-lg text-white" tabIndex={i < services.length ? 0 : -1}>
            <KeywordPair en={s.title} kn={s.kn} className="[&_.text-gold]:text-cream/90" /><span className="text-cream/80" aria-hidden>✦</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

/* ───────── Video modal ───────── */
export function VideoModal({ youtubeId, title, onClose }: { youtubeId: string; title: string; onClose: () => void }) {
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [onClose])
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/75 p-4" onClick={onClose} role="dialog" aria-modal="true" aria-label={title}>
      <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="pill absolute -top-12 right-0 h-10 w-10" aria-label="Close video"><Close size={18} /></button>
        {youtubeId ? (
          <div className="aspect-video overflow-hidden rounded-2xl border-2 border-goldlight">
            <iframe className="h-full w-full" src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`} title={title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
          </div>
        ) : (
          <div className="card p-10 text-center">
            <h3 className="font-cormorant text-3xl font-bold italic">{title}</h3>
            <p className="mt-3 text-lg">This discourse will be published soon. Subscribe on YouTube or message the office on WhatsApp to receive the link.</p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <a className="btn-gold px-6 py-2.5" href={site.social.youtube} target="_blank" rel="noopener"><Play size={18} /> YouTube channel</a>
              <a className="btn-outline px-6 py-2.5" href={whatsappLink(`🙏 Hari Om, please share the link for the discourse “${title}”.`)} target="_blank" rel="noopener"><WhatsApp size={18} className="text-[#1DA851]" /> Ask on WhatsApp</a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* ───────── Footer ───────── */
export function Footer() {
  const t = useT()
  const { theme, toggleTheme } = usePrefs()
  return (
    <footer className="relative mt-10 border-t border-goldlight/60 bg-paper/70">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-x-4 gap-y-5 px-5 py-8 md:grid-cols-2 md:gap-12 md:py-10">
        <div className="col-span-2 md:col-span-1">
          <Brand compact />
          <p className="mt-3 hidden text-[17px] text-ink/[.88] md:block">{site.shortBio}</p>
          <p className="mt-2 font-deva text-[15px] text-maroon md:mt-3 md:text-base">{site.shloka}</p>
        </div>
        <div className="col-span-2 md:col-span-1">
          <h4 className="font-marcellus text-base text-maroon md:text-lg">{t('Contact', 'ಸಂಪರ್ಕ')}</h4>
          <ul className="mt-2 grid grid-cols-1 gap-x-4 gap-y-1.5 text-[15px] min-[420px]:grid-cols-2 md:mt-3 md:grid-cols-1 md:gap-y-2.5 md:text-lg">
            <li className="flex items-start gap-2"><Phone size={16} className="mt-1 shrink-0 text-gold" /><a href={site.phoneHref} className="whitespace-nowrap">{site.phone}</a></li>
            <li className="flex items-start gap-2"><WhatsApp size={16} className="mt-1 shrink-0 text-gold" /><a href={whatsappLink('🙏 Hari Om')} target="_blank" rel="noopener" className="whitespace-nowrap">WhatsApp {site.phone}</a></li>
            <li className="flex items-start gap-2 min-[420px]:col-span-2 md:col-span-1"><Mail size={16} className="mt-1 shrink-0 text-gold" /><a href={`mailto:${site.email}`} className="break-all">{site.email}</a></li>
            <li className="flex items-start gap-2 min-[420px]:col-span-2 md:col-span-1"><Pin size={16} className="mt-1 shrink-0 text-gold" /><span>{site.address}</span></li>
          </ul>
          <button onClick={openKaal} className="btn-outline mr-2 mt-3 px-4 py-1 text-sm md:mt-4"><Sun size={16} className="text-gold" /> Today’s Rahu Kaal</button>
          <button onClick={toggleTheme} className="btn-outline mt-3 px-4 py-1 text-sm md:mt-4">
            {theme === 'day' ? <><MoonIcon size={16} className="text-gold" /> Night</> : <><Sun size={16} className="text-gold" /> Day</>}
          </button>
        </div>
      </div>
      <div className="border-t border-goldlight/50 px-5 pb-24 pt-4 text-center text-[13px] text-ink/[.82] md:py-5 md:text-[15px]">
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-1">
          <Link to="/legal/privacy">Privacy Policy</Link><Link to="/legal/terms">Terms &amp; Conditions</Link><Link to="/legal/disclaimer">Disclaimer</Link>
        </div>
        <p className="mt-2">© {new Date().getFullYear()} {site.name}. All rights reserved. · Astrology guidance is not a substitute for medical, legal or financial advice.</p>
      </div>
    </footer>
  )
}
