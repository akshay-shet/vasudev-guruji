import { useEffect, useState } from 'react'
import { PageHero, Section, SectionTitle } from '../components/Common'
import { Diamond, Diya } from '../components/Decor'
import { mantras } from '../data/content'

function JapaMala() {
  const [count, setCount] = useState(0)
  const [malas, setMalas] = useState(0)
  const [mantra, setMantra] = useState(1)
  const beads = 108
  const tap = () => {
    setCount((c) => {
      if (c + 1 >= beads) { setMalas((m) => m + 1); if ('vibrate' in navigator) navigator.vibrate?.(120); return 0 }
      if ('vibrate' in navigator) navigator.vibrate?.(8)
      return c + 1
    })
  }
  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (e.code === 'Space' && (e.target as HTMLElement).tagName !== 'SELECT') { e.preventDefault(); tap() } }
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [])
  return (
    <div id="japa" className="card scroll-mt-28 p-6 text-center md:p-8">
      <h2 className="font-cormorant text-3xl font-bold italic">Japa Mala — 108</h2>
      <Diamond className="mx-auto mt-1 h-3 w-24" />
      <select aria-label="Choose mantra" className="input mx-auto mt-4 max-w-sm text-center" value={mantra} onChange={(e) => setMantra(+e.target.value)}>
        {mantras.map((m, i) => <option key={m.name} value={i}>{m.name}</option>)}
      </select>
      <p className="mt-3 font-deva text-xl text-maroon">{mantras[mantra].text}</p>
      <button onClick={tap} className="relative mx-auto mt-6 block aspect-square w-full max-w-[300px] rounded-full" data-id="count-bead" aria-label={`Count bead. ${count} of 108`}>
        <svg viewBox="-110 -110 220 220" className="absolute inset-0 h-full w-full">
          {Array.from({ length: beads }).map((_, i) => {
            const a = (i / beads) * Math.PI * 2 - Math.PI / 2
            return <circle key={i} cx={Math.cos(a) * 96} cy={Math.sin(a) * 96} r="3.6" fill={i < count ? '#C58B2D' : '#E8D9BC'} stroke={i < count ? '#93600F' : '#CDB78E'} strokeWidth=".6" />
          })}
          <circle cx="0" cy="-108" r="6" fill="#93600F" />
        </svg>
        <span className="absolute inset-[18%] flex flex-col items-center justify-center rounded-full border border-goldlight bg-paper shadow-glow">
          <span className="gold-text font-marcellus text-6xl">{count}</span>
          <span className="font-cinzel text-xs tracking-widest text-ink/70">TAP · SPACE</span>
        </span>
      </button>
      <p className="mt-5 text-xl">Malas completed: <b className="text-golddark">{malas}</b> · Total japa: <b>{malas * 108 + count}</b></p>
      <button onClick={() => { setCount(0); setMalas(0) }} className="btn-outline mt-3 px-5 py-1.5">Reset</button>
    </div>
  )
}

function DiyaLighting() {
  const [lit, setLit] = useState<boolean[]>(() => Array(9).fill(false))
  const total = lit.filter(Boolean).length
  return (
    <div id="diya" className="card scroll-mt-28 p-6 text-center md:p-8">
      <h2 className="font-cormorant text-3xl font-bold italic">Light a Diya</h2>
      <Diamond className="mx-auto mt-1 h-3 w-24" />
      <p className="mx-auto mt-3 max-w-xl text-lg">Offer a light with a prayer in your heart. Tap each diya to light it — one for each of the Navagraha.</p>
      <p className="mt-2 font-deva text-lg text-maroon">ಶುಭಂ ಕರೋತಿ ಕಲ್ಯಾಣಮ್ ಆರೋಗ್ಯಂ ಧನಸಮ್ಪದಾ ।</p>
      <div className="mt-6 grid grid-cols-3 gap-4 sm:grid-cols-9">
        {lit.map((l, i) => (
          <button key={i} onClick={() => setLit((a) => a.map((v, k) => (k === i ? true : v)))} aria-pressed={l} aria-label={`Diya ${i + 1}${l ? ' lit' : ''}`}
            className={`rounded-2xl p-2 transition ${l ? 'bg-goldlight/15' : 'hover:bg-goldlight/10'}`}>
            <Diya lit={l} className="mx-auto h-16 w-16" />
          </button>
        ))}
      </div>
      <p className="mt-4 text-xl" aria-live="polite">{total === 9 ? '🙏 All nine diyas are lit. May the light within you shine. Hari Om.' : `${total} of 9 lit`}</p>
      <div className="mt-3 flex justify-center gap-3">
        <button className="btn-gold px-5 py-1.5" data-id="light-all" onClick={() => setLit(Array(9).fill(true))}>Light all</button>
        <button className="btn-outline px-5 py-1.5" onClick={() => setLit(Array(9).fill(false))}>Reset</button>
      </div>
    </div>
  )
}

export default function Mantras() {
  return (
    <>
      <PageHero keyword="Vedic Astrology Services" title="Mantras, Japa & Diya" hi="ಮಂತ್ರ, ಜಪ ಮತ್ತು ದೀಪ" subtitle="Sacred sound purifies the mind. Chant with devotion, count with the mala and offer a light." />
      <Section>
        <SectionTitle>Sacred Mantras</SectionTitle>
        <div className="grid gap-5 md:grid-cols-2">
          {mantras.map((m) => (
            <article key={m.name} className="card p-6">
              <h3 className="font-marcellus text-2xl">{m.name}</h3>
              <p className="mt-3 font-deva text-xl leading-relaxed text-maroon">{m.text}</p>
              <p className="mt-3 text-lg italic">{m.meaning}</p>
              <p className="mt-2 font-cinzel text-xs tracking-widest text-gold">{m.source}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section><div className="grid gap-8 lg:grid-cols-2"><JapaMala /><DiyaLighting /></div></Section>
    </>
  )
}
