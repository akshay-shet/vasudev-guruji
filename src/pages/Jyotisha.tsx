import { useMemo, useState } from 'react'
import { usePrefs } from '../lib/prefs'
import { EnquiryForm, Eyebrow, KeywordPair, PageHero, Section, SectionTitle } from '../components/Common'
import { Diamond } from '../components/Decor'
import { gunaMilan, rashiFromNakshatra } from '../lib/astro'
import { nakshatras, rashis } from '../data/vedic'


/* ───────────────── Kundali matching ───────────────── */
function NakPicker({ label, value, onChange }: { label: string; value: { nak: number; pada: number }; onChange: (v: { nak: number; pada: number }) => void }) {
  const r = rashis[rashiFromNakshatra(value.nak, value.pada)]
  const kn = usePrefs().lang !== 'en'
  return (
    <fieldset className="rounded-2xl border border-goldlight/70 p-4">
      <legend className="px-2 font-marcellus text-xl text-maroon">{label}</legend>
      <label className="label" htmlFor={`${label}-n`}>Janma Nakshatra (Moon)</label>
      <select id={`${label}-n`} className="input" value={value.nak} onChange={(e) => onChange({ ...value, nak: +e.target.value })}>
        {nakshatras.map((n, i) => <option key={n.name} value={i}>{kn ? n.deva : `${n.name} — ${n.deva}`}</option>)}
      </select>
      <label className="label mt-3" htmlFor={`${label}-p`}>Pada</label>
      <select id={`${label}-p`} className="input" value={value.pada} onChange={(e) => onChange({ ...value, pada: +e.target.value })}>
        {[1, 2, 3, 4].map((p) => <option key={p} value={p}>Pada {p}</option>)}
      </select>
      <p className="mt-2 text-ink/[.88]">Moon sign: <b>{r.name}</b> ({r.english})</p>
    </fieldset>
  )
}

export function Kundali() {
  const [boy, setBoy] = useState({ nak: 3, pada: 2 })
  const [girl, setGirl] = useState({ nak: 12, pada: 1 })
  const res = useMemo(() => gunaMilan(boy, girl), [boy, girl])
  const kootaInfo = [
    ['Varna', 1, 'Spiritual compatibility & ego — based on the Moon sign’s varna.'],
    ['Vashya', 2, 'Mutual attraction & control — based on the Moon sign’s category.'],
    ['Tara', 3, 'Health & destiny — count of nakshatras between the two.'],
    ['Yoni', 4, 'Physical & intimate harmony — the animal nature of each nakshatra.'],
    ['Graha Maitri', 5, 'Mental wavelength — friendship of the Moon-sign lords.'],
    ['Gana', 6, 'Temperament — Deva, Manushya or Rakshasa nature.'],
    ['Bhakoot', 7, 'Love, family welfare & prosperity — distance between Moon signs.'],
    ['Nadi', 8, 'Health & progeny — the three doshas Adi, Madhya, Antya.'],
  ] as const
  return (
    <>
      <PageHero eyebrow={{ kn: 'ಗುಣ ಮಿಲನ', en: 'GUNA MILAN' }} keyword="Marriage Matching & Kundali Milan" title="Kundali Matching" hi="ಕುಂಡಲಿ ಹೊಂದಾಣಿಕೆ" />
      <Section>
        <div className="card p-5 md:p-8">
          <div className="text-center"><Eyebrow kn="ಲೆಕ್ಕಾಚಾರ" en="CALCULATOR" /></div>
          <h2 className="mt-3 text-center font-cormorant text-3xl font-bold italic text-maroon md:text-4xl"><KeywordPair heading en="Guna Milan Calculator" kn="ಗುಣ ಮಿಲನ ಲೆಕ್ಕಾಚಾರ" /></h2>
          <Diamond className="mx-auto mt-1 h-3 w-24" />
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <NakPicker label="Boy" value={boy} onChange={setBoy} />
            <NakPicker label="Girl" value={girl} onChange={setGirl} />
          </div>
          <div className="mt-8 text-center">
            <p className="font-cinzel text-xs tracking-[0.3em] text-gold">TOTAL GUNAS</p>
            <p className="gold-text font-marcellus text-6xl">{res.total}<span className="text-3xl"> / 36</span></p>
            <p className="mt-1 text-2xl italic text-maroon">{res.verdict}</p>
            <div className="mx-auto mt-3 h-3 max-w-md overflow-hidden rounded-full bg-goldlight/30">
              <div className="h-full rounded-full transition-all" style={{ width: `${(res.total / 36) * 100}%`, background: 'linear-gradient(90deg,#ECC46E,#C58B2D)' }} />
            </div>
            {(res.nadiDosha || res.bhakootDosha) && (
              <p className="mx-auto mt-3 max-w-xl rounded-xl border border-maroon/30 bg-maroon/5 p-3 text-lg">
                {res.nadiDosha && 'Nadi Dosha present (same Nadi). '}{res.bhakootDosha && 'Bhakoot Dosha present. '}
                Classical texts list exceptions (cancellations) — please consult Guruji for a full analysis.
              </p>
            )}
          </div>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-[17px]">
              <thead className="font-marcellus text-maroon"><tr className="border-b border-goldlight"><th className="p-2">Koota</th><th className="p-2">Details</th><th className="p-2">Area</th><th className="p-2 text-right">Score</th></tr></thead>
              <tbody>
                {res.kootas.map((k) => (
                  <tr key={k.name} className="border-b border-goldlight/40">
                    <td className="p-2 font-semibold">{k.name}</td><td className="p-2">{k.detail}</td><td className="p-2 text-ink/[.88]">{k.meaning}</td>
                    <td className="p-2 text-right font-marcellus"><span className={k.score === 0 ? 'text-maroon' : 'text-golddark'}>{k.score}</span> / {k.max}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-center text-ink/[.82]">Educational calculator using standard tables (Yoni scoring simplified). Mangal Dosha, Navamsha and dasha compatibility are checked in Guruji’s full reading.</p>
        </div>
      </Section>
      <Section>
        <SectionTitle eyebrow={{ kn: 'ಎಂಟು ಕೂಟಗಳು', en: '8 KOOTAS' }} kn="ಅಷ್ಟಕೂಟ" sub="Total 36 gunas. 18+ is generally acceptable; 25+ is very good; Nadi and Bhakoot doshas need special attention.">The Ashtakoota</SectionTitle>
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4">
          {kootaInfo.map(([n, p, d], i) => (
            <div key={n} className="card p-3 sm:p-4">
              <div className="flex items-baseline justify-between"><h3 className="font-marcellus text-[15px] leading-tight sm:text-xl">{i + 1}. {n}</h3><span className="gold-text font-marcellus text-xl sm:text-2xl">{p}</span></div>
              <p className="mt-1 text-[13.5px] leading-snug sm:text-[17px]">{d}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section><div className="mx-auto max-w-3xl"><EnquiryForm defaultTopic="Marriage Matching" title="Request a full Kundali Matching" /></div></Section>
    </>
  )
}

