import { dashaOrder, nadiOf, nakshatras, rashis, type Graha } from '../data/vedic'

/* ───────────── Ashtakoota (36 Guna) Milan ───────────── */

/** Rashi index (0 = Mesha) from nakshatra index (0-26) and pada (1-4). */
export const rashiFromNakshatra = (nak: number, pada: number) => Math.floor((nak * 4 + (pada - 1)) / 9)

// 3 Brahmin (water signs), 2 Kshatriya (fire), 1 Vaishya (earth), 0 Shudra (air)
const varnaOfRashi = (r: number) => [2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3][r]

type Vashya = 'Chatushpada' | 'Manava' | 'Jalachara' | 'Vanachara' | 'Keeta'
const VASHYA: Vashya[] = ['Chatushpada', 'Chatushpada', 'Manava', 'Jalachara', 'Vanachara', 'Manava', 'Manava', 'Keeta', 'Manava', 'Chatushpada', 'Manava', 'Jalachara']
const VASHYA_IDX: Record<Vashya, number> = { Chatushpada: 0, Manava: 1, Jalachara: 2, Vanachara: 3, Keeta: 4 }
// rows: boy, cols: girl
const VASHYA_TABLE = [
  [2, 1, 1, 0.5, 1],
  [1, 2, 0.5, 0, 1],
  [1, 0.5, 2, 1, 1],
  [0, 0, 0, 2, 0],
  [1, 1, 1, 0, 2],
]

const YONI_ENEMIES: [string, string][] = [
  ['Horse', 'Buffalo'], ['Elephant', 'Lion'], ['Sheep', 'Monkey'], ['Serpent', 'Mongoose'],
  ['Dog', 'Deer'], ['Cat', 'Rat'], ['Cow', 'Tiger'],
]

const FRIENDS: Record<string, { f: Graha[]; e: Graha[] }> = {
  Sun: { f: ['Moon', 'Mars', 'Jupiter'], e: ['Venus', 'Saturn'] },
  Moon: { f: ['Sun', 'Mercury'], e: [] },
  Mars: { f: ['Sun', 'Moon', 'Jupiter'], e: ['Mercury'] },
  Mercury: { f: ['Sun', 'Venus'], e: ['Moon'] },
  Jupiter: { f: ['Sun', 'Moon', 'Mars'], e: ['Mercury', 'Venus'] },
  Venus: { f: ['Mercury', 'Saturn'], e: ['Sun', 'Moon'] },
  Saturn: { f: ['Mercury', 'Venus'], e: ['Sun', 'Moon', 'Mars'] },
}
const rel = (a: Graha, b: Graha): 'F' | 'N' | 'E' => (a === b ? 'F' : FRIENDS[a].f.includes(b) ? 'F' : FRIENDS[a].e.includes(b) ? 'E' : 'N')

export interface Koota { name: string; max: number; score: number; meaning: string; detail: string }

export function gunaMilan(boy: { nak: number; pada: number }, girl: { nak: number; pada: number }) {
  const br = rashiFromNakshatra(boy.nak, boy.pada)
  const gr = rashiFromNakshatra(girl.nak, girl.pada)
  const bN = nakshatras[boy.nak]
  const gN = nakshatras[girl.nak]
  const kootas: Koota[] = []

  // 1. Varna
  const bv = varnaOfRashi(br), gv = varnaOfRashi(gr)
  const vn = ['Shudra', 'Vaishya', 'Kshatriya', 'Brahmin']
  kootas.push({ name: 'Varna', max: 1, score: bv >= gv ? 1 : 0, meaning: 'Spiritual compatibility and ego', detail: `Boy ${vn[bv]} · Girl ${vn[gv]}` })

  // 2. Vashya
  const bva = VASHYA[br], gva = VASHYA[gr]
  kootas.push({ name: 'Vashya', max: 2, score: VASHYA_TABLE[VASHYA_IDX[bva]][VASHYA_IDX[gva]], meaning: 'Mutual attraction and influence', detail: `Boy ${bva} · Girl ${gva}` })

  // 3. Tara (Dina)
  const t1 = ((boy.nak - girl.nak + 27) % 27) + 1
  const t2 = ((girl.nak - boy.nak + 27) % 27) + 1
  const good = (n: number) => ![3, 5, 7].includes(n % 9 === 0 ? 9 : n % 9)
  kootas.push({ name: 'Tara', max: 3, score: (good(t1) ? 1.5 : 0) + (good(t2) ? 1.5 : 0), meaning: 'Health, well-being and destiny', detail: `Count girl→boy ${t1}, boy→girl ${t2}` })

  // 4. Yoni (simplified: same 4, sworn enemies 0, otherwise 2)
  let ys = 2
  if (bN.yoni === gN.yoni) ys = 4
  else if (YONI_ENEMIES.some(([a, b]) => (a === bN.yoni && b === gN.yoni) || (b === bN.yoni && a === gN.yoni))) ys = 0
  kootas.push({ name: 'Yoni', max: 4, score: ys, meaning: 'Physical and intimate harmony', detail: `Boy ${bN.yoni} · Girl ${gN.yoni}` })

  // 5. Graha Maitri
  const bl = rashis[br].lord, gl = rashis[gr].lord
  const r1 = rel(bl, gl), r2 = rel(gl, bl)
  const pair = [r1, r2].sort().join('')
  const gmScore: Record<string, number> = { FF: 5, FN: 4, NN: 3, EF: 1, EN: 0.5, EE: 0 }
  kootas.push({ name: 'Graha Maitri', max: 5, score: gmScore[pair], meaning: 'Mental compatibility and friendship', detail: `Lords ${bl} & ${gl}` })

  // 6. Gana
  const bg = bN.gana, gg = gN.gana
  let gs = 0
  if (bg === gg) gs = 6
  else if (bg === 'Deva' && gg === 'Manushya') gs = 6
  else if (bg === 'Manushya' && gg === 'Deva') gs = 5
  else if ((bg === 'Deva' && gg === 'Rakshasa') || (bg === 'Rakshasa' && gg === 'Deva')) gs = 1
  else gs = 0
  kootas.push({ name: 'Gana', max: 6, score: gs, meaning: 'Temperament and nature', detail: `Boy ${bg} · Girl ${gg}` })

  // 7. Bhakoot
  const d = ((br - gr + 12) % 12) + 1
  const d2 = ((gr - br + 12) % 12) + 1
  const bad = [[2, 12], [5, 9], [6, 8]].some(([a, b]) => (d === a && d2 === b) || (d === b && d2 === a))
  kootas.push({ name: 'Bhakoot', max: 7, score: bad ? 0 : 7, meaning: 'Love, family welfare and prosperity', detail: `Moon signs ${rashis[br].name} & ${rashis[gr].name} (${d}/${d2})` })

  // 8. Nadi
  const bnd = nadiOf(boy.nak), gnd = nadiOf(girl.nak)
  kootas.push({ name: 'Nadi', max: 8, score: bnd === gnd ? 0 : 8, meaning: 'Health and progeny (most important)', detail: `Boy ${bnd} · Girl ${gnd}` })

  const total = kootas.reduce((s, k) => s + k.score, 0)
  let verdict = 'Not recommended without detailed analysis'
  if (total >= 32) verdict = 'Excellent match'
  else if (total >= 25) verdict = 'Very good match'
  else if (total >= 18) verdict = 'Acceptable match'
  return { kootas, total, verdict, boyRashi: rashis[br], girlRashi: rashis[gr], nadiDosha: bnd === gnd, bhakootDosha: bad }
}

/* ───────────── Vimshottari Dasha ───────────── */

export interface DashaPeriod { lord: Graha; start: Date; end: Date; years: number }

/** Approximate dasha sequence. `elapsed` = fraction (0-1) of the birth nakshatra already traversed by the Moon. */
export function vimshottari(birth: Date, nak: number, elapsed: number) {
  const startIdx = nak % 9
  const first = dashaOrder[startIdx]
  const balance = first.years * (1 - elapsed)
  const periods: DashaPeriod[] = []
  let cursor = new Date(birth)
  const addYears = (d: Date, y: number) => new Date(d.getTime() + y * 365.2425 * 86400000)
  for (let i = 0; i < 9; i++) {
    const p = dashaOrder[(startIdx + i) % 9]
    const yrs = i === 0 ? balance : p.years
    const end = addYears(cursor, yrs)
    periods.push({ lord: p.lord, start: cursor, end, years: yrs })
    cursor = end
  }
  return periods
}

export function antardashas(maha: DashaPeriod) {
  const idx = dashaOrder.findIndex((d) => d.lord === maha.lord)
  const full = dashaOrder[idx].years
  const out: DashaPeriod[] = []
  // When the maha dasha is a balance period, antardashas are scaled from the theoretical start.
  const fullMs = full * 365.2425 * 86400000
  const theoreticalStart = new Date(maha.end.getTime() - fullMs)
  let cursor = theoreticalStart
  for (let i = 0; i < 9; i++) {
    const p = dashaOrder[(idx + i) % 9]
    const yrs = (full * p.years) / 120
    const end = new Date(cursor.getTime() + yrs * 365.2425 * 86400000)
    if (end > maha.start) out.push({ lord: p.lord, start: cursor < maha.start ? maha.start : cursor, end, years: yrs })
    cursor = end
  }
  return out
}

/* ───────────── Daily horoscope (general guidance) ───────────── */

const focus = ['career', 'family', 'health', 'finance', 'learning', 'relationships', 'spiritual practice', 'travel', 'creativity']
const openers = [
  'The Moon’s movement brings a calm and steady day.',
  'A day to move with patience rather than haste.',
  'Planetary energies favour fresh beginnings.',
  'Your efforts of the past begin to show results.',
  'Today asks for clarity in speech and humility in action.',
  'A gentle, reflective day — good for inner work.',
  'Energy is high; channel it into meaningful work.',
  'Support may come from elders or a mentor.',
]
const advice = [
  'Begin the morning with a few rounds of your ishta mantra.',
  'Offer water to Surya at sunrise for strength and clarity.',
  'Light a ghee diya in the evening and sit quietly for a few minutes.',
  'Do a small act of seva — feed a cow, a bird or someone in need.',
  'Avoid arguments after sunset; speak sweetly.',
  'Read one verse of the Bhagavad Gita and reflect on it.',
  'Keep finances simple today; avoid impulsive purchases.',
  'Respect your parents and teachers; their blessings protect you.',
]
const colours = ['Saffron', 'White', 'Yellow', 'Green', 'Red', 'Sky blue', 'Cream', 'Pink', 'Orange', 'Gold']

function seeded(seed: number) {
  let s = seed % 2147483647
  if (s <= 0) s += 2147483646
  return () => (s = (s * 16807) % 2147483647) / 2147483647
}

export function dailyHoroscope(rashiIdx: number, date = new Date()) {
  const key = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate()
  const r = seeded(key * 13 + rashiIdx * 7919)
  const pick = <T,>(a: T[]) => a[Math.floor(r() * a.length)]
  const f = pick(focus)
  return {
    text: `${pick(openers)} Matters of ${f} take the spotlight for ${rashis[rashiIdx].english} natives. ${pick(advice)}`,
    luckyNumber: 1 + Math.floor(r() * 9),
    luckyColour: pick(colours),
    rating: 3 + Math.floor(r() * 3),
    focus: f,
  }
}
