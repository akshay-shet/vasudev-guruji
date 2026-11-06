import { useState, type KeyboardEvent } from 'react'
import { Link } from 'react-router-dom'
import { navagraha, rashis } from '../data/vedic'
import { Arrow } from './Icons'
import { usePrefs } from '../lib/prefs'

/** Approximate sidereal Sun transit through each rashi (Lahiri ayanamsha). */
const transit = [
  ['Apr 14', 'May 14'], ['May 15', 'Jun 14'], ['Jun 15', 'Jul 15'], ['Jul 16', 'Aug 16'],
  ['Aug 17', 'Sep 16'], ['Sep 17', 'Oct 16'], ['Oct 17', 'Nov 15'], ['Nov 16', 'Dec 15'],
  ['Dec 16', 'Jan 13'], ['Jan 14', 'Feb 12'], ['Feb 13', 'Mar 13'], ['Mar 14', 'Apr 13'],
] as const
/** [month, day] each transit starts — used to pre-select today's Sun sign. */
const starts: [number, number][] = [[4, 14], [5, 15], [6, 15], [7, 16], [8, 17], [9, 17], [10, 17], [11, 16], [12, 16], [1, 14], [2, 13], [3, 14]]

const tattva = { Fire: 'Agni (Fire)', Earth: 'Prithvi (Earth)', Air: 'Vayu (Air)', Water: 'Jala (Water)' } as const
const gunaOfLord: Record<string, string> = {
  Sun: 'Sattva — clarity & light', Moon: 'Sattva — devotion & nurture', Jupiter: 'Sattva — wisdom & dharma',
  Mercury: 'Rajas — intellect in motion', Venus: 'Rajas — beauty & desire', Mars: 'Tamas — raw energy & will', Saturn: 'Tamas — endurance & discipline',
}
/** Kalapurusha: the rashis as the limbs of the cosmic being. */
const limb = ['head (Shira)', 'face & throat (Mukha)', 'arms & shoulders (Bahu)', 'heart & chest (Hridaya)', 'belly & spine (Udara)', 'waist & intestines (Kati)',
  'lower abdomen (Basti)', 'reproductive organs (Guhya)', 'thighs (Uru)', 'knees (Janu)', 'calves (Jangha)', 'feet (Pada)']

function currentSunSign(d = new Date()) {
  const md = (d.getMonth() + 1) * 100 + d.getDate()
  let idx = 11
  starts.forEach(([m, day], i) => {
    const s = m * 100 + day
    const next = starts[(i + 1) % 12]
    const e = next[0] * 100 + next[1]
    if (s < e ? md >= s && md < e : md >= s || md < e) idx = i
  })
  return idx
}

const R_OUT = 236, R_IN = 150
const pt = (r: number, deg: number) => { const a = (deg * Math.PI) / 180; return [Math.cos(a) * r, Math.sin(a) * r] }
function segPath(i: number) {
  const a0 = -90 + i * 30, a1 = a0 + 30
  const [x0, y0] = pt(R_OUT, a0), [x1, y1] = pt(R_OUT, a1), [x2, y2] = pt(R_IN, a1), [x3, y3] = pt(R_IN, a0)
  return `M${x0} ${y0}A${R_OUT} ${R_OUT} 0 0 1 ${x1} ${y1}L${x2} ${y2}A${R_IN} ${R_IN} 0 0 0 ${x3} ${y3}Z`
}

const KN_GRAHA: Record<string, string> = { Sun: 'ಸೂರ್ಯ', Moon: 'ಚಂದ್ರ', Mars: 'ಕುಜ', Mercury: 'ಬುಧ', Jupiter: 'ಗುರು', Venus: 'ಶುಕ್ರ', Saturn: 'ಶನಿ' }

export default function RashiChakra() {
  const kn = usePrefs().lang !== 'en'
  const [sel, setSel] = useState(currentSunSign)
  const r = rashis[sel]
  const g = navagraha.find((x) => x.key === r.lord)!
  const key = (i: number) => (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSel(i) }
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); setSel((sel + 1) % 12) }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); setSel((sel + 11) % 12) }
  }

  return (
    <div className="mx-auto grid max-w-5xl items-center gap-5 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-8">
      {/* ───── Wheel ───── */}
      <svg viewBox="-250 -250 500 500" className="mx-auto w-full max-w-[300px] md:max-w-[400px] drop-shadow-[0_18px_30px_rgba(147,96,15,.25)]" role="radiogroup" aria-label="Rashi chakra — choose a sign">
        <defs>
          <radialGradient id="rc-bg" r=".5"><stop offset="0" stopColor="#FFFBEF" /><stop offset=".7" stopColor="#FCEFD2" /><stop offset="1" stopColor="#F5DFAE" /></radialGradient>
          <linearGradient id="rc-sel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#E8B95A" /><stop offset="1" stopColor="#A5701A" /></linearGradient>
          <radialGradient id="rc-core" r=".5"><stop offset="0" stopColor="#FFF8E6" /><stop offset="1" stopColor="#F6E2B4" /></radialGradient>
        </defs>
        <circle r="246" fill="none" stroke="#C58B2D" strokeWidth="3" />
        <circle r={R_OUT} fill="url(#rc-bg)" stroke="#D9AA52" strokeWidth="1" />
        {rashis.map((rs, i) => {
          const active = i === sel
          const [tx, ty] = pt((R_OUT + R_IN) / 2, -90 + i * 30 + 15)
          return (
            <g key={rs.name} role="radio" aria-checked={active} aria-label={`${rs.name} — ${rs.english}`} tabIndex={active ? 0 : -1}
              onClick={() => setSel(i)} onKeyDown={key(i)} className="cursor-pointer outline-none [&:focus-visible>path]:stroke-[3]">
              <path d={segPath(i)} fill={active ? 'url(#rc-sel)' : 'transparent'} stroke={active ? '#93600F' : '#D9AA52'} strokeWidth={active ? 2.4 : 1}
                className="transition-[fill] duration-300 hover:fill-[#F2CF7E66]" style={active ? { filter: 'drop-shadow(0 4px 8px rgba(147,96,15,.45))' } : undefined} />
              <text x={tx} y={ty - 1} textAnchor="middle" fontSize={rs.kn.length > 5 ? 16 : 19} fill={active ? '#fff' : '#7A2410'} fontFamily="'Tiro Kannada', 'Tiro Telugu', 'Tiro Tamil', 'Noto Serif Malayalam', 'Tiro Devanagari Hindi', serif" pointerEvents="none">{rs.kn}</text>
              <text x={tx} y={ty + 16} textAnchor="middle" fontSize="9.5" letterSpacing="1.2" fill={active ? '#FFF3D6' : '#93600F'} fontFamily={kn ? 'inherit' : 'Cinzel, serif'} pointerEvents="none">{kn ? KN_GRAHA[rs.lord] : rs.english.toUpperCase()}</text>
            </g>
          )
        })}
        {/* inner rings */}
        <circle r={R_IN} fill="url(#rc-core)" stroke="#C58B2D" strokeWidth="1.6" />
        <circle r="124" fill="none" stroke="#D9AA52" strokeDasharray="2 6" />
        <circle r="74" fill="#FFF8E6" stroke="#C58B2D" strokeWidth="2.4" />
        <g transform="translate(0 0)"><g className="animate-spin-slow" style={{ transformOrigin: '0px 0px', transformBox: 'view-box' }}>
          <rect x="-46" y="-46" width="92" height="92" fill="none" stroke="#C58B2D" strokeWidth="1.2" transform="rotate(15)" />
          <rect x="-46" y="-46" width="92" height="92" fill="none" stroke="#C58B2D" strokeWidth="1.2" transform="rotate(-30)" />
        </g></g>
        <text y="14" textAnchor="middle" fontSize="40" fontFamily="'Tiro Devanagari Sanskrit', serif" fill="#93600F">ॐ</text>
      </svg>

      {/* ───── Details panel ───── */}
      <div className="card p-4 md:p-6" aria-live="polite">
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-b border-goldlight/60 pb-3">
          <div className="flex min-w-0 items-center gap-3">
            <span className="gold-text shrink-0 font-kn text-4xl leading-tight md:text-5xl" lang="kn">{r.kn}</span>
            <div>
              <h3 className="font-cormorant text-2xl font-bold leading-tight md:text-3xl">{kn ? `${r.kn} ರಾಶಿ` : `${r.name} · ${r.english}`}</h3>
              <p className="text-[15px] leading-snug text-ink/[.82]">{r.symbol}</p>
            </div>
          </div>
          <div className="shrink-0 max-sm:flex max-sm:w-full max-sm:items-baseline max-sm:gap-2 sm:text-right">
            <p className="font-cinzel text-[10px] tracking-[0.15em] text-golddark">SUN TRANSIT</p>
            <p className="whitespace-nowrap font-marcellus text-[15px] text-ink md:text-base">{transit[sel][0]} – {transit[sel][1]}</p>
          </div>
        </div>

        <dl className="mt-3 grid grid-cols-2 gap-2 lg:grid-cols-4">
          {[
            ['Element', tattva[r.element]],
            ['Graha', g.name.split(' (')[0]],
            ['Gem', g.gem],
            ['Guna', gunaOfLord[r.lord].split(' — ')[0]],
          ].map(([k, v]) => (
            <div key={k} className="rounded-xl border border-goldlight/70 bg-paper/70 px-3 py-2">
              <dt className="font-cinzel text-[9.5px] tracking-[0.12em] text-golddark">{k.toUpperCase()}</dt>
              <dd className="mt-0.5 font-marcellus text-[15px] leading-tight text-ink">{v}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-3 font-cormorant text-lg font-semibold italic leading-snug text-maroon md:text-xl">“{r.traits}”</p>

        <p className="mt-1.5 text-[15px] leading-snug text-ink/[.88]">Kalapurusha: governs the {limb[sel]} · {r.quality.split(' ')[0]} sign · {r.degrees}</p>

        <div className="mt-3 flex flex-wrap gap-2">
          <Link to="/contact" className="btn-gold px-4 py-1.5 text-[15px]">Ask Guruji <Arrow size={18} /></Link>
          <Link to="/kundali-matching" className="btn-outline px-4 py-1.5 text-[15px]">Guna Milan</Link>
        </div>
      </div>
    </div>
  )
}
