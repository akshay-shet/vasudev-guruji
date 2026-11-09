import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { nav } from '../data/content'
import { usePrefs, useT } from '../lib/prefs'
import { LANGUAGES } from '../lib/i18n/languages'
import { translateText } from '../lib/translateDom'
import { Brand, LotusLogo } from './Decor'
import { site } from '../data/site'
import { Chevron, Close, Menu, MoonIcon, Search, Sun } from './Icons'

/* ───────── Search index ───────── */
const pages = [
  ['Home', '/'], ['About Guruji', '/about'], ['Life Line Horoscope', '/life-line-horoscope'], ['Homa — Sacred Fire Rituals', '/homa'], ['Guna Milan — Kundali Matching', '/kundali-matching'], ['Shop — Rudraksha, Yantras, Gemstones', '/shop'],
  ['Events & Programs', '/events'], ['Gallery — Photos & Videos', '/gallery'], ['Mantras & Japa Mala', '/mantras'], ['Light a Diya', '/mantras#diya'],
  ['Contact', '/contact'], ['Privacy Policy', '/legal/privacy'], ['Terms & Conditions', '/legal/terms'], ['Disclaimer', '/legal/disclaimer'],
] as const

function useSearchIndex() {
  return useMemo(() => [
    ...pages.map(([label, to]) => ({ label, to, kind: 'Page' })),
  ], [])
}

export function SearchPanel({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState('')
  const idx = useSearchIndex()
  const navigate = useNavigate()
  const ref = useRef<HTMLInputElement>(null)
  const t = useT()
  useEffect(() => { ref.current?.focus() }, [])
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [onClose])
  const results = q.trim() ? idx.filter((i) => i.label.toLowerCase().includes(q.trim().toLowerCase()) || translateText(i.label).includes(q.trim())).slice(0, 8) : []
  const go = (to: string) => { navigate(to); onClose() }
  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center bg-ink/30 px-4 pt-24 backdrop-blur-sm" onClick={onClose} role="dialog" aria-modal="true" aria-label="Search">
      <div className="card w-full max-w-xl p-4" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={(e) => { e.preventDefault(); if (results[0]) go(results[0].to) }} className="flex items-center gap-2">
          <Search size={22} className="text-gold" />
          <input ref={ref} value={q} onChange={(e) => setQ(e.target.value)} className="input border-0 bg-transparent text-xl shadow-none"
            placeholder={t('Search pages…', 'ಪುಟಗಳನ್ನು ಹುಡುಕಿ…')} aria-label="Search the site" />
          <button type="button" onClick={onClose} className="pill h-9 w-9 shrink-0" aria-label="Close search"><Close size={16} /></button>
        </form>
        {results.length > 0 && (
          <ul className="mt-3 divide-y divide-goldlight/40">
            {results.map((r) => (
              <li key={r.to + r.label}>
                <button onClick={() => go(r.to)} className="flex w-full items-center justify-between px-2 py-2.5 text-left hover:bg-goldlight/15">
                  <span className="text-lg">{r.label}</span>
                  <span className="font-cinzel text-[11px] tracking-widest text-gold">{r.kind}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
        {q && results.length === 0 && <p className="mt-3 px-2 text-ink/[.82]">{t('No results. Try “Guna Milan”, “Shop” or “Mantra”.')}</p>}
      </div>
    </div>
  )
}

/* ───────── Language / theme pill ───────── */
function LangPill({ className = '' }: { className?: string }) {
  const { lang, setLang, theme, toggleTheme } = usePrefs()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const h = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('click', h)
    return () => document.removeEventListener('click', h)
  }, [])
  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen((o) => !o)} className={`pill gap-1 font-marcellus text-ink ${className}`} aria-haspopup="menu" aria-expanded={open} aria-label="Language and theme" data-id="lang-pill">
        <span data-no-translate>{LANGUAGES.find((x) => x.code === lang)!.short}</span> <Chevron size={12} />
      </button>
      {open && (
        <div className="card absolute right-0 top-[calc(100%+8px)] z-50 w-44 overflow-hidden p-1.5" role="menu">
          {LANGUAGES.map((l) => (
            <button key={l.code} role="menuitemradio" aria-checked={lang === l.code} onClick={() => { setLang(l.code); setOpen(false) }} data-lang={l.code}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-1.5 text-left font-marcellus hover:bg-goldlight/20 ${lang === l.code ? 'text-golddark' : ''}`}>
              <span data-no-translate lang={l.code}>{l.native}</span> {lang === l.code && '✓'}
            </button>
          ))}
          <div className="my-1 h-px bg-goldlight/50" />
          <button role="menuitem" onClick={() => { toggleTheme(); setOpen(false) }} className="flex w-full items-center gap-2 rounded-xl px-3 py-2 font-marcellus hover:bg-goldlight/20">
            {theme === 'day' ? <><MoonIcon size={18} className="text-gold" /> Night theme ☾</> : <><Sun size={18} className="text-gold" /> Day theme ☀</>}
          </button>
        </div>
      )}
    </div>
  )
}


/* ───────── Desktop navigation bar (gold framed) ───────── */
function DesktopNav() {
  const t = useT()
  const { pathname } = useLocation()
  const [open, setOpen] = useState<string | null>(null)
  const path = pathname
  const activeIdx = (() => {
    if (path === '/') return 0
    const direct = nav.findIndex((n, i) => i > 0 && path.startsWith(n.to.split('#')[0]))
    if (direct >= 0) return direct
    return nav.findIndex((n) => n.children?.some((c) => path.startsWith(c.to.split('#')[0])))
  })()
  return (
    <nav aria-label="Main" className="relative flex items-center">
      {/* ornament ends */}
      <span className="absolute -left-4 top-1/2 h-px w-6 -translate-y-1/2 bg-gold" aria-hidden />
      <span className="absolute -left-6 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rotate-45 border border-gold bg-cream" aria-hidden />
      <span className="absolute -right-4 top-1/2 h-px w-6 -translate-y-1/2 bg-gold" aria-hidden />
      <span className="absolute -right-6 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rotate-45 border border-gold bg-cream" aria-hidden />
      <ul className="flex items-center gap-[0.15vw] rounded-full border border-goldlight/90 bg-paper/75 px-1.5 py-1 shadow-[0_4px_18px_-8px_rgba(197,139,45,.6)] backdrop-blur-sm">
        {nav.map((item, idx) => {
          const active = idx === activeIdx
          return (
            <li key={item.label} className="relative" onMouseEnter={() => item.children && setOpen(item.label)} onMouseLeave={() => setOpen(null)}>
              <NavLink to={item.to} onFocus={() => item.children && setOpen(item.label)}
                className={`flex items-center gap-1 whitespace-nowrap rounded-full px-[clamp(6px,0.85vw,16px)] py-1.5 font-cormorant text-[clamp(14px,0.98vw,17px)] font-semibold transition ${active ? 'btn-gold !font-semibold' : 'text-ink hover:text-golddark'}`}
                aria-haspopup={item.children ? 'menu' : undefined} aria-expanded={item.children ? open === item.label : undefined}>
                {t(item.label, item.hi)}
                {item.children && <Chevron size={10} />}
              </NavLink>
              {item.children && open === item.label && (
                <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-2">
                  <ul className="card w-60 p-2" role="menu">
                    {item.children.map((c) => (
                      <li key={c.to + c.label}>
                        <Link to={c.to} role="menuitem" onClick={() => setOpen(null)} onBlur={(e) => { if (!e.currentTarget.closest('ul')?.contains(e.relatedTarget as Node)) setOpen(null) }}
                          className="block rounded-xl px-3 py-2 font-marcellus text-[15px] text-ink hover:bg-goldlight/20 hover:text-golddark">
                          {t(c.label, c.hi)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

/* ───────── Slide-in mobile menu ───────── */
function Drawer({ onClose, onSearch }: { onClose: () => void; onSearch: () => void }) {
  const t = useT()
  const { theme, toggleTheme } = usePrefs()
  const [expanded, setExpanded] = useState<string | null>(null)
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', k)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', k); document.body.style.overflow = '' }
  }, [onClose])
  return (
    <div className="fixed inset-0 z-[80]" role="dialog" aria-modal="true" aria-label="Menu">
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]" onClick={onClose} />
      <aside className="absolute left-0 top-0 flex h-full w-[86%] max-w-sm flex-col overflow-y-auto bg-cream p-5 shadow-2xl" style={{ animation: 'slidein .3s ease' }}>
        <div className="mb-4 flex items-center justify-between">
          <Brand compact />
          <button onClick={onClose} className="pill h-10 w-10" aria-label="Close menu"><Close size={18} /></button>
        </div>
        <button onClick={onSearch} className="mb-3 flex w-full items-center gap-2 rounded-full border border-goldlight bg-paper px-4 py-2.5 text-left text-ink/[.82]" aria-label="Search the site">
          <Search size={18} className="text-gold" /> Search pages…
        </button>
        <ul className="space-y-1">
          {nav.map((item) => (
            <li key={item.label}>
              <div className="flex items-center">
                <NavLink to={item.to} onClick={onClose} end={item.to === '/'}
                  className={({ isActive }) => `flex-1 rounded-xl px-3 py-2.5 font-marcellus text-lg ${isActive ? 'bg-goldlight/25 text-golddark' : 'text-ink'}`}>
                  {t(item.label, item.hi)}
                </NavLink>
                {item.children && (
                  <button onClick={() => setExpanded(expanded === item.label ? null : item.label)} className="p-3 text-gold" aria-label={`Expand ${item.label}`} aria-expanded={expanded === item.label}>
                    <Chevron size={14} className={`transition ${expanded === item.label ? 'rotate-180' : ''}`} />
                  </button>
                )}
              </div>
              {item.children && expanded === item.label && (
                <ul className="mb-2 ml-4 border-l border-goldlight/60 pl-3">
                  {item.children.map((c) => (
                    <li key={c.to + c.label}><Link to={c.to} onClick={onClose} className="block py-1.5 font-cormorant text-lg text-ink/90">{t(c.label, c.hi)}</Link></li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
        <div className="mt-auto space-y-3 pt-6">
          <button onClick={toggleTheme} className="btn-outline w-full py-2.5">
            {theme === 'day' ? <><MoonIcon size={18} className="text-gold" /> Night theme ☾</> : <><Sun size={18} className="text-gold" /> Day theme ☀</>}
          </button>
          <p className="text-center font-deva text-maroon">॥ ಹರಿ ಓಂ ॥</p>
        </div>
      </aside>
    </div>
  )
}

/* ───────── Header ───────── */
export default function Header() {
  const [menu, setMenu] = useState(false)
  const [search, setSearch] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const home = pathname === '/'
  useEffect(() => {
    const s = () => setScrolled(window.scrollY > 40)
    s()
    window.addEventListener('scroll', s, { passive: true })
    return () => window.removeEventListener('scroll', s)
  }, [])

  return (
    <>
      {/* Desktop */}
      <header className={`fixed inset-x-0 top-0 z-50 hidden transition-all duration-300 lg:block ${scrolled || !home ? 'bg-cream/90 shadow-[0_6px_20px_-12px_rgba(147,96,15,.5)] backdrop-blur-md' : ''}`}>
        <div className="mx-auto flex max-w-[1680px] items-center justify-between gap-3 px-[2vw] py-2.5">
          <Link to="/" aria-label="Vasudev Guruji — home" className={`ml-0 shrink-0 rounded-full px-3 py-1 transition 2xl:ml-[6vw] min-[1800px]:ml-[9vw] ${scrolled || !home ? '' : 'bg-paper/80 shadow-[0_4px_18px_-8px_rgba(197,139,45,.6)] backdrop-blur-md'}`}><span className="hidden xl:block"><Brand /></span><LotusLogo className="h-10 w-14 xl:hidden" /></Link>
          <DesktopNav />
          <div className="flex shrink-0 items-center gap-3">
            <LangPill className="h-11 px-4 text-[15px]" />
          </div>
        </div>
      </header>

      {/* Mobile */}
      <header className={`z-40 lg:hidden ${home ? 'absolute inset-x-0 top-0' : 'relative bg-cream/95 pb-3 shadow-[0_6px_20px_-14px_rgba(147,96,15,.6)]'}`}>
        <div className="mx-auto flex max-w-[480px] items-center justify-between gap-2 px-[3.5%] pt-[calc(var(--u)*3)]" style={{ ['--u' as string]: 'min(1vw, 4.8px)' }}>
          <button onClick={() => setMenu(true)} className="pill h-[max(40px,calc(var(--u)*10))] w-[max(44px,calc(var(--u)*11))] shrink-0 text-ink" aria-label="Open menu" data-id="open-menu" aria-expanded={menu}><Menu size={22} /></button>
          <Link to="/" aria-label="Vasudev Guruji — home"
            className={`flex min-w-0 items-center gap-[calc(var(--u)*1.4)] rounded-full px-[calc(var(--u)*3.2)] py-[calc(var(--u)*1.2)] ${home ? 'bg-paper/85 shadow-[0_4px_18px_-6px_rgba(147,96,15,.55)] backdrop-blur-md' : ''}`}>
            <LotusLogo className="h-[calc(var(--u)*7)] w-[calc(var(--u)*9)] shrink-0" />
            <span data-no-translate lang="en" className="whitespace-nowrap font-marcellus leading-none text-maroon" style={{ fontSize: 'clamp(18px, calc(var(--u)*5.8), 26px)' }}>{site.name}</span>
          </Link>
          <LangPill className="h-[max(40px,calc(var(--u)*10))] shrink-0 px-[calc(var(--u)*3.2)] text-[15px]" />
        </div>
      </header>

      {menu && <Drawer onClose={() => setMenu(false)} onSearch={() => { setMenu(false); setSearch(true) }} />}
      {search && <SearchPanel onClose={() => setSearch(false)} />}
    </>
  )
}
