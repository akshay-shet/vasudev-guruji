import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArchTile, EnquiryForm, Eyebrow, KeywordPair, Ribbon, Section, SectionTitle, usePageTitle } from '../components/Common'
import { Diamond } from '../components/Decor'
import { Arrow, Book, Heart, Lotus, Phone, Play, Sprout, Star, WhatsApp } from '../components/Icons'
import { ServiceCard } from './Services'
import { homas, reviews, services, tiles } from '../data/content'
import { HomaTile } from './Homa'
import { LifeLineSlider } from '../components/LifeLine'
import { site, whatsappLink, type Topic } from '../data/site'
import { usePrefs, useT } from '../lib/prefs'
import RashiChakra from '../components/RashiChakra'
import { Locations } from '../components/Locations'

/* ───────── Slides (mobile slider dots) ───────── */
const slides = [
  { l1: 'A Path to', l2: 'Higher Consciousness', h1: 'ಉನ್ನತ ಪ್ರಜ್ಞೆಯ', h2: 'ದಿವ್ಯ ಮಾರ್ಗ', pillars: ['Dharma', 'Self-Realization', 'Inner Peace', 'Service to Humanity'], hp: ['ಧರ್ಮ', 'ಆತ್ಮಸಾಕ್ಷಾತ್ಕಾರ', 'ಆಂತರಿಕ ಶಾಂತಿ', 'ಮಾನವ ಸೇವೆ'] },
  { l1: 'The Light of', l2: 'Vedic Jyotisha', h1: 'ವೈದಿಕ', h2: 'ಜ್ಯೋತಿಷ್ಯದ ಬೆಳಕು', pillars: ['Kundali', 'Guna Milan', 'Mantra', 'Remedies'], hp: ['ಕುಂಡಲಿ', 'ಗುಣ ಮಿಲನ', 'ಮಂತ್ರ', 'ಪರಿಹಾರ'] },
  { l1: 'The Power of', l2: 'Mantra & Japa', h1: 'ಮಂತ್ರ ಮತ್ತು', h2: 'ಜಪದ ಶಕ್ತಿ', pillars: ['Japa', 'Diya', 'Puja', 'Meditation'], hp: ['ಜಪ', 'ದೀಪ', 'ಪೂಜೆ', 'ಧ್ಯಾನ'] },
  { l1: 'Serve with', l2: 'Love & Devotion', h1: 'ಪ್ರೀತಿ ಮತ್ತು', h2: 'ಭಕ್ತಿಯಿಂದ ಸೇವೆ', pillars: ['Seva', 'Satsang', 'Retreats', 'Community'], hp: ['ಸೇವೆ', 'ಸತ್ಸಂಗ', 'ಸಾಧನೆ', 'ಸಮುದಾಯ'] },
]


/* ───────── Latest discourse video card ───────── */
function VideoCard({ variant }: { variant: 'mobile' | 'desktop' }) {
  const [playing, setPlaying] = useState(false)
  const t = useT()
  const desk = variant === 'desktop'
  const { youtubeId, videoSrc, poster, title, duration } = site.latestDiscourse
  const cover = poster || import.meta.env.BASE_URL + 'img/discourse.jpg'
  const fs = (deskPx: string, mob: number) => (desk ? deskPx : `calc(var(--u)*${mob})`)
  return (
    <div className={`relative aspect-[9/16] w-full overflow-hidden ${desk ? 'rounded-[24px]' : 'rounded-[20px]'}`}
      style={{ padding: 3, background: 'linear-gradient(135deg,#F6DA8E,#C58B2D 40%,#F2CF7E 60%,#93600F)', boxShadow: '0 12px 30px -12px rgba(147,96,15,.6)' }}>
      <div className={`relative h-full w-full overflow-hidden bg-black ${desk ? 'rounded-[21px]' : 'rounded-[17px]'}`}>
        {!playing ? (
          <button onClick={() => setPlaying(true)} aria-label={`Play latest discourse: ${title}`} data-id="play-latest" className="group absolute inset-0 block text-left">
            <img src={cover} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" />
            <span className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(20,12,30,.75) 0%, rgba(20,12,30,.2) 40%, transparent 62%)' }} />
            <span className="absolute left-1/2 top-[42%] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white/90 bg-white/25 text-white backdrop-blur-[2px] transition group-hover:scale-110"
              style={{ width: fs('68px', 16), height: fs('68px', 16) }}>
              <Play size={desk ? 34 : 30} className="ml-1" />
            </span>
            <span className="absolute bottom-[6%] left-[6%] right-[6%] text-white">
              <span className="block font-cormorant font-semibold" style={{ fontSize: fs('16px', 4) }}>{t('Latest Discourse', 'ಇತ್ತೀಚಿನ ಪ್ರವಚನ')}</span>
              <span className="block font-cormorant font-semibold leading-tight" style={{ fontSize: fs('26px', 6.4) }}>{title}</span>
            </span>
            <span className="absolute right-[5%] top-[4%] rounded-full bg-black/70 px-[0.6em] py-[0.1em] font-cormorant font-semibold text-white" style={{ fontSize: fs('15px', 3.8) }}>{duration}</span>
          </button>
        ) : youtubeId ? (
          <iframe className="absolute inset-0 h-full w-full" src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
            title={title} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
        ) : videoSrc ? (
          <><video className="absolute inset-0 h-full w-full object-cover" src={videoSrc} poster={cover} controls autoPlay playsInline /></>
        ) : (
          /* Placeholder player — replaced automatically once a video is added in src/data/site.ts */
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center text-white" style={{ background: 'radial-gradient(circle at 50% 40%, #4A2A12, #1C1008 75%)' }}>
            <Lotus size={desk ? 56 : 40} className="text-goldlight" />
            <p className="mt-2 font-cormorant font-semibold" style={{ fontSize: fs('clamp(20px,1.6vw,28px)', 5) }}>{title}</p>
            <p className="mt-1 text-white/80" style={{ fontSize: fs('clamp(14px,1vw,17px)', 3.4) }}>{t('This discourse will play here once the video is published.', 'ವೀಡಿಯೊ ಪ್ರಕಟವಾದ ತಕ್ಷಣ ಈ ಪ್ರವಚನ ಇಲ್ಲೇ ಪ್ರಸಾರವಾಗುತ್ತದೆ.')}</p>
            <div className="mt-3 h-1 w-[70%] overflow-hidden rounded-full bg-white/20"><div className="h-full w-0 bg-goldlight" /></div>
            <div className="mt-2 flex w-[70%] justify-between text-white/70" style={{ fontSize: fs('13px', 3) }}><span>0:00</span><span>{duration}</span></div>
            <button onClick={() => setPlaying(false)} className="btn-outline mt-3 px-4 py-1 text-sm">{t('Close', 'ಮುಚ್ಚಿ')}</button>
          </div>
        )}
      </div>
    </div>
  )
}

/* ───────── Latest discourse intro text ───────── */
function DiscourseIntro({ center = false }: { center?: boolean }) {
  return (
    <div className={center ? 'text-center' : ''}>
      <Eyebrow kn="ಇತ್ತೀಚಿನ ಪ್ರವಚನ" en="LATEST DISCOURSE" />
      <h2 className="section-title mt-3 !leading-tight">{site.latestDiscourse.title}</h2>
      <Diamond className={`mt-2 h-3 w-28 ${center ? 'mx-auto' : ''}`} />
      <p className={`mt-3 max-w-md text-lg text-ink/[.88] ${center ? 'mx-auto' : ''}`}>In this conversation Guruji answers questions on business losses, partnerships that turn sour, money troubles, sleepless nights and fear — and how negative energy can lie behind them.</p>
    </div>
  )
}

/* ───────── Begin your inner journey panel (desktop) ───────── */
function JourneyPanel() {
  const t = useT()
  const items = [
    { icon: Lotus, label: t('Meditate', 'ಧ್ಯಾನ'), to: '/mantras' },
    { icon: Book, label: t('Learn', 'ಕಲಿಯಿರಿ'), to: '/gallery' },
    { icon: Sprout, label: t('Practice', 'ಅಭ್ಯಾಸ'), to: '/mantras#japa' },
    { icon: Heart, label: t('Serve', 'ಸೇವೆ'), to: '/events' },
  ]
  return (
    <div className="card flex h-full flex-col items-center justify-center !rounded-[22px] px-[6%] py-[5%]">
      <h3 className="font-cormorant font-semibold text-maroon" style={{ fontSize: 'clamp(19px,1.45vw,25px)' }}>{t('Begin Your Inner Journey', 'ನಿಮ್ಮ ಆಂತರಿಕ ಯಾತ್ರೆ ಆರಂಭಿಸಿ')}</h3>
      <Diamond className="mt-1 h-2.5 w-24" />
      <div className="mt-[6%] grid w-full grid-cols-4 gap-2">
        {items.map(({ icon: I, label, to }) => (
          <Link key={label} to={to} className="group flex flex-col items-center">
            <span className="flex aspect-square w-[78%] items-center justify-center rounded-full border border-goldlight bg-paper text-gold shadow-gold transition group-hover:-translate-y-0.5">
              <I size={28} />
            </span>
            <span className="mt-1.5 font-cormorant font-semibold text-ink" style={{ fontSize: 'clamp(14px,1vw,17px)' }}>{label}</span>
          </Link>
        ))}
      </div>
      <Link to="/mantras" className="btn-gold mt-[7%] w-[78%] py-[0.55em]" style={{ fontSize: 'clamp(15px,1.05vw,18px)' }}>
        {t('Start My Journey', 'ಯಾತ್ರೆ ಆರಂಭಿಸಿ')} <Arrow size={20} />
      </Link>
    </div>
  )
}

/* ───────────────────────── MOBILE HOMEPAGE ───────────────────────── */
function MobileHome() {
  const [slide, setSlide] = useState(0)
  const [paused, setPaused] = useState(false)
  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setSlide((s) => (s + 1) % slides.length), 7000)
    return () => clearInterval(id)
  }, [paused])
  const s = slides[slide]
  const u = (n: number) => `calc(var(--u)*${n})`
  const { lang: L } = usePrefs()
  const lang = L === 'kn' ? 'hi' : 'en'
  const native = L !== 'en'

  return (
    <div className="mx-auto w-full max-w-[480px] overflow-hidden lg:hidden" style={{ ['--u' as string]: 'min(1vw, 4.8px)' }}>
      {/* HERO ART */}
      <div className="relative aspect-[941/1420] overflow-hidden">
        <picture>
          <source
            type="image/webp"
            srcSet={`${import.meta.env.BASE_URL}img/hero-mobile-600.webp 600w, ${import.meta.env.BASE_URL}img/hero-mobile.webp 820w`}
            sizes="(max-width: 600px) 100vw, 480px"
          />
          <img
            src={import.meta.env.BASE_URL + 'img/hero-mobile.jpg'}
            alt="Vasudev Guruji seated with a rudraksha mala before a golden mandala, with temple bells, waterfalls and the rising sun"
            className="absolute inset-0 h-full w-full object-cover object-top"
            fetchPriority="high"
            decoding="async"
            width={941}
            height={1420}
          />
        </picture>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[16%]" style={{ background: 'linear-gradient(to bottom, rgba(255,250,238,.85), rgba(255,250,238,.45) 55%, transparent)' }} />
        <div className="fade-cream pointer-events-none absolute inset-x-0 bottom-0 h-[16%]" style={{ background: 'linear-gradient(to bottom, rgba(255,248,234,0), var(--fade) 88%)' }} />
      </div>

      {/* HEADLINE + SLIDER */}
      <div className="relative -mt-[7%] px-[4%] text-center" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} aria-roledescription="carousel" aria-label="Highlights">
        <p className="font-deva text-maroon" style={{ fontSize: u(4.1) }}>{site.shloka}</p>
        <div key={slide} className="animate-[fadein_.7s_ease]" aria-live="polite">
          <style>{'@keyframes fadein{from{opacity:0;transform:translateY(8px)}}'}</style>
          <h1 className="leading-[1.02]">
            <span className="block font-cormorant font-semibold italic text-maroon" style={{ fontSize: `calc(${u(7.6)} * var(--hs, 1))` }}>{lang === 'hi' ? s.h1 : native ? `${s.l1} ${s.l2} ·1` : s.l1}</span>
            <span className="gold-text block font-cormorant font-bold italic" style={{ fontSize: `calc(${u(9.4)} * var(--hs, 1))` }}>{lang === 'hi' ? s.h2 : native ? `${s.l1} ${s.l2} ·2` : s.l2}</span>
          </h1>
          <p className="mx-auto mt-[calc(var(--u)*3)] inline-block rounded-full bg-maroon/90 px-[1.1em] py-[0.4em] font-semibold leading-snug text-[#F7D88A] shadow-gold" style={{ fontSize: 'clamp(15px, calc(var(--u)*3.9), 19px)' }}><KeywordPair en="Best Astrologer Online" kn="ಅತ್ಯುತ್ತಮ ಆನ್‌ಲೈನ್ ಜ್ಯೋತಿಷಿ" className="[&_.text-gold]:text-goldlight" /></p>
        </div>
        <div className="mt-[calc(var(--u)*4)] flex justify-center gap-1" role="tablist">
          {slides.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={slide === i}
              aria-label={`Slide ${i + 1}`}
              onClick={() => setSlide(i)}
              className="flex h-9 w-9 items-center justify-center rounded-full transition"
            >
              <span
                className="rounded-full transition"
                style={{ width: u(1.9), height: u(1.9), background: slide === i ? '#C58B2D' : '#E3DCCD' }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* ARCH TILES — 4 + 3 */}
      <div className="mt-[calc(var(--u)*3)] px-[4%]">
        <div className="grid grid-cols-4 gap-[calc(var(--u)*2.6)]">
          {tiles.slice(0, 4).map((tl) => (
            <div key={tl.label} className="flex"><ArchTile {...tl} label={L === 'kn' ? tl.hi : native ? `${tl.label} ${tl.label2}` : tl.label} label2={native ? '' : tl.label2} /></div>
          ))}
        </div>
        <div className="mx-auto mt-[calc(var(--u)*2.6)] grid w-[86%] grid-cols-3 gap-[calc(var(--u)*2.6)]">
          {tiles.slice(4).map((tl) => (
            <div key={tl.label} className="flex"><ArchTile {...tl} label={L === 'kn' ? tl.hi : native ? `${tl.label} ${tl.label2}` : tl.label} label2={native ? '' : tl.label2} /></div>
          ))}
        </div>
      </div>

      {/* VIDEO — vertical 9:16, plays in place */}
      <div className="mt-[calc(var(--u)*8)] px-[5%] pb-[calc(var(--u)*2)]">
        <DiscourseIntro center />
        <div className="mx-auto mt-5 w-[78%] max-w-[340px]"><VideoCard variant="mobile" /></div>
      </div>
    </div>
  )
}

/* ───────────────────────── DESKTOP HOMEPAGE ───────────────────────── */
function DesktopHome() {
  const { lang: L } = usePrefs()
  const lang = L === 'kn' ? 'hi' : 'en'
  const native = L !== 'en'
  const s = slides[0]
  const d = (n: number, min: number) => `max(${min}px, calc(var(--d)*${n}))`
  return (
    <div className="hidden lg:block" style={{ ['--d' as string]: 'min(1vw, 16.8px)' }}>
      {/* HERO */}
      <div className="relative mx-auto h-[100svh] max-h-[1080px] min-h-[640px] w-full max-w-[1920px] overflow-hidden">
        <picture>
          <source type="image/webp" srcSet={import.meta.env.BASE_URL + 'img/hero-desktop.webp'} />
          <img
            src={import.meta.env.BASE_URL + 'img/hero-desktop.jpg'}
            alt="Vasudev Guruji seated with a rudraksha mala before a golden mandala, with a temple, waterfalls and the rising sun behind"
            className="absolute inset-0 h-full w-full object-cover object-[30%_38%]"
            fetchPriority="high"
            decoding="async"
            width={1671}
            height={941}
          />
        </picture>
        {/* soft glow so the headline reads cleanly over the sky */}
        <div className="pointer-events-none absolute left-[29%] top-[8%] h-[56%] w-[55%]" style={{ background: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(255,250,238,.88) 0%, rgba(255,246,228,.62) 50%, transparent 76%)' }} />
        <div className="fade-cream pointer-events-none absolute inset-x-0 bottom-0 h-[22%]" style={{ background: 'linear-gradient(to bottom, rgba(255,248,234,0) 0%, rgba(255,248,234,.35) 45%, var(--fade) 100%)' }} />

        {/* headline */}
        <div className="absolute bottom-[37%] left-[33.5%] top-[11%] flex w-[48%] flex-col items-center justify-center text-center">
          <p className="font-deva text-maroon" style={{ fontSize: d(1.85, 20) }}>{site.shloka}</p>
          <Diamond className="mx-auto mt-[0.4em] h-[calc(var(--d)*1)] w-[calc(var(--d)*11)]" />
          <h1 className="mt-[0.2em] leading-[1.06]">
            <span className="block font-cormorant font-semibold italic text-maroon" style={{ fontSize: `calc(${d(4, 42)} * var(--hs, 1))` }}>{lang === 'hi' ? s.h1 : native ? `${s.l1} ${s.l2} ·1` : s.l1}</span>
            <span className="gold-text block whitespace-nowrap font-cormorant font-bold italic" style={{ fontSize: `calc(${d(4.85, 50)} * var(--hs, 1))` }}>{lang === 'hi' ? s.h2 : native ? `${s.l1} ${s.l2} ·2` : s.l2}</span>
          </h1>
          <div className="mx-auto mt-[calc(var(--d)*1)] flex w-[78%] items-center gap-3" aria-hidden>
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold" />
            <span className="text-gold" style={{ fontSize: d(1.2, 12) }}>◈</span>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold" />
          </div>
          <p className="rounded-full bg-maroon/90 px-[1.3em] py-[0.4em] font-semibold text-[#F7D88A] shadow-gold" style={{ marginTop: d(1.8, 18), fontSize: d(1.75, 20) }}><KeywordPair en="Best Astrologer Online" kn="ಅತ್ಯುತ್ತಮ ಆನ್‌ಲೈನ್ ಜ್ಯೋತಿಷಿ" className="[&_.text-gold]:text-goldlight" /></p>
        </div>


        {/* tiles — rest on the marble floor, fully visible with space below */}
        <div className="absolute inset-x-0 bottom-[max(28px,calc(var(--d)*2.6))] mx-auto grid aspect-[1265/150] w-[75.7%] max-w-[1450px] grid-cols-7 gap-[1.35%]">
          {tiles.map((tl) => (
            <ArchTile key={tl.label} {...tl} label={L === 'kn' ? tl.hi : native ? `${tl.label} ${tl.label2}` : tl.label} label2={native ? '' : tl.label2} variant="desktop" />
          ))}
        </div>
      </div>

      {/* LOWER ROW: latest discourse (plays in place) • inner journey */}
      <div className="mx-auto grid w-full max-w-[1180px] grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-10 px-8 pb-6 pt-14">
        <DiscourseIntro />
        <div className="w-[min(360px,28vw)]"><VideoCard variant="desktop" /></div>
        <div className="h-[420px]"><JourneyPanel /></div>
      </div>
    </div>
  )
}

/* ───────────────────────── Devotee words (horizontal scroll) ───────────────────────── */
function DevoteeWords() {
  const track = useRef<HTMLDivElement>(null)
  const scroll = (dir: number) => {
    const el = track.current
    if (!el) return
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.85, 420), behavior: 'smooth' })
  }
  const hue = ['#C58B2D', '#7A2410', '#93600F', '#B5651D']
  return (
    <div>
      <div className="mb-6 flex flex-col items-center gap-4 text-center">
        <div className="flex flex-col items-center">
          <div className="mb-2"><Eyebrow kn="ಭಕ್ತರ ಅನುಭವಗಳು" en="WORDS FROM DEVOTEES" /></div>
          <h2 className="section-title max-sm:!text-[28px]"><KeywordPair heading en="Trusted Astrologer for Life Problems" kn={services.find((x) => x.slug === 'life-problems')!.kn} /></h2>
          <Diamond className="mx-auto mt-2 h-3 w-28" />
        </div>
        <div className="flex shrink-0 gap-2">
          <button onClick={() => scroll(-1)} className="pill h-10 w-10 text-gold" aria-label="Previous reviews"><Arrow size={18} className="rotate-180" /></button>
          <button onClick={() => scroll(1)} className="pill h-10 w-10 text-gold" aria-label="Next reviews"><Arrow size={18} /></button>
        </div>
      </div>
      <div ref={track} className="no-scrollbar -mx-4 flex snap-x snap-mandatory scroll-pl-4 gap-4 overflow-x-auto scroll-smooth px-4 md:scroll-pl-6 pb-4 md:-mx-6 md:px-6" tabIndex={0} aria-label="Devotee reviews, scroll sideways">
        {reviews.map((r, i) => (
          <figure key={r.name} className="card flex w-[82%] shrink-0 snap-start flex-col !rounded-2xl p-5 sm:w-[340px]">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-marcellus text-lg text-white" style={{ background: hue[i % hue.length] }} aria-hidden>{r.name[0]}</span>
              <div className="min-w-0 flex-1">
                <figcaption className="font-marcellus text-[17px] leading-tight text-maroon">{r.name}</figcaption>
                <p className="text-sm text-ink/[.88]">{r.place} · {r.topic}</p>
              </div>
            </div>
            <span className="mt-3 flex text-gold" aria-label={`${r.rating} out of 5`}>{Array.from({ length: 5 }).map((_, k) => <Star key={k} size={15} filled={k < r.rating} />)}</span>
            <blockquote className="mt-2 flex-1 text-[17px] leading-relaxed text-ink/90">{r.text}</blockquote>
          </figure>
        ))}
      </div>
      
    </div>
  )
}

export default function Home() {
  usePageTitle()
  const t = useT()
  const [topic] = useState<Topic>('Other')
  return (
    <>
      <MobileHome />
      <DesktopHome />

      <div className="mt-6"><Ribbon /></div>

      <Section className="lg:pt-16">
        <SectionTitle eyebrow={{ kn: 'ಸೇವೆಗಳು', en: 'OUR SERVICES' }} kn="ವೈದಿಕ ಜ್ಯೋತಿಷ್ಯ ಸೇವೆಗಳು"
          sub="Accurate horoscope reading, Kundali Milan, Vastu and proven remedies for every area of life — choose a service to know more.">Vedic Astrology Services</SectionTitle>
        <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-2 sm:gap-5">
          {services.map((s) => (
            <div key={s.slug} className="flex w-[calc((100%-1rem)/3)] sm:w-[calc((100%-2.5rem)/3)] lg:w-[calc((100%-3.75rem)/4)]"><ServiceCard s={s} minimal /></div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionTitle eyebrow={{ kn: 'ಗುರೂಜಿ ವಿಶೇಷ', en: 'GURUJI SPECIAL' }} kn="ಜೀವನ ರೇಖೆ ಜಾತಕ"
          sub="A personal book on your life, prepared from your complete Vedic birth chart under the guidance of Vasudev Guruji.">Life Line Horoscope</SectionTitle>
        <LifeLineSlider />
      </Section>

      <Section>
        <Locations />
      </Section>

      <Section>
        <SectionTitle eyebrow={{ kn: 'ಹೋಮಗಳು', en: 'SACRED FIRE RITUALS' }} kn="ಹೋಮ ಮತ್ತು ಹವನ ಸೇವೆಗಳು"
          sub="Vedic homas performed by Guruji with the sankalpa in your name — at the ashram, at your home or online.">Homa &amp; Havan Services</SectionTitle>
        <div className="mx-auto grid max-w-6xl grid-cols-3 gap-2 sm:gap-4 lg:grid-cols-4">
          {homas.map((h) => <HomaTile key={h.slug} h={h} />)}
        </div>
        <div className="mt-6 text-center"><Link to="/homa" className="btn-gold px-6 py-2">Book a Homa <Arrow size={16} /></Link></div>
      </Section>

      <Section>
        <SectionTitle eyebrow={{ kn: 'ಜ್ಯೋತಿಷ್ಯ', en: 'VEDIC ASTROLOGY' }} kn="ರಾಶಿ ಚಕ್ರ" sub={t('Tap a rashi to see its element, graha, gem and guna.', 'ಚಕ್ರದಲ್ಲಿ ಯಾವುದೇ ರಾಶಿಯನ್ನು ಆರಿಸಿ.')}>The Rashi Chakra</SectionTitle>
        <RashiChakra />
      </Section>

      <Section>
        <DevoteeWords />
      </Section>


      <Section>
        <SectionTitle eyebrow={{ kn: 'ನೇರ ಸಂಪರ್ಕ', en: 'TALK TO GURUJI' }} kn={services.find((x) => x.slug === 'live-chat-call')!.kn}
          sub="Call or WhatsApp Guruji’s office now, or send your question with your birth details below.">Live Astrologer Chat &amp; Call</SectionTitle>
        <div className="mx-auto mb-6 flex max-w-md justify-center gap-3">
          <a href={site.phoneHref} className="btn-gold flex-1 py-2.5"><Phone size={18} /> Call Now</a>
          <a href={whatsappLink('🙏 Hari Om Guruji, I would like a live consultation.')} target="_blank" rel="noopener" className="btn-outline flex-1 py-2.5"><WhatsApp size={18} className="text-[#1DA851]" /> WhatsApp</a>
        </div>
        <div id="ask-guruji" className="mx-auto max-w-4xl scroll-mt-24"><EnquiryForm key={topic} defaultTopic={topic} title={t('Ask Guruji', 'ಗುರೂಜಿಯನ್ನು ಕೇಳಿ')} /></div>
      </Section>
    </>
  )
}
