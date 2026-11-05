import { useId, type ReactNode } from 'react'
import type { HomaEmblem } from '../data/content'

/**
 * Original illustration for each homa: a glowing sky, a temple arch,
 * a stepped havan kunda with living flames, and the homa's sacred emblem above.
 */
const G = '#F7D27A' // gold
const GD = '#C58B2D'

function Emblem({ kind, id }: { kind: HomaEmblem; id: string }): ReactNode {
  const gold = `url(#${id}-gold)`
  switch (kind) {
    case 'lakshmi': // lotus with falling gold coins
      return (
        <g>
          {[[-46, -30], [44, -38], [-30, -58], [34, -64], [0, -76]].map(([x, y], i) => (
            <g key={i} transform={`translate(${x} ${y})`}><circle r="7" fill={gold} stroke="#93600F" strokeWidth="1" /><circle r="3.6" fill="none" stroke="#93600F" strokeWidth="0.8" /></g>
          ))}
          {[-62, -36, -12, 12, 36, 62].map((r) => <path key={r} transform={`rotate(${r})`} d="M0 6C-9-10-9-28 0-40 9-28 9-10 0 6z" fill="#F6B9CF" stroke="#fff" strokeWidth="1" />)}
          <path d="M0 6C-8-8-8-30 0-44 8-30 8-8 0 6z" fill="#F9D3E1" stroke="#fff" strokeWidth="1" />
          <ellipse cx="0" cy="2" rx="12" ry="4" fill={gold} />
        </g>
      )
    case 'sudarshana': // flaming discus
      return (
        <g transform="translate(0 -22)">
          {Array.from({ length: 16 }).map((_, i) => <path key={i} transform={`rotate(${i * 22.5})`} d="M-5-38L0-50 5-38z" fill="#FF9A1F" />)}
          <circle r="37" fill="none" stroke={G} strokeWidth="5" />
          <circle r="28" fill="none" stroke={G} strokeWidth="1.5" />
          {Array.from({ length: 12 }).map((_, i) => <line key={i} transform={`rotate(${i * 30})`} x1="0" y1="-8" x2="0" y2="-28" stroke={G} strokeWidth="2.4" />)}
          <circle r="8" fill={gold} />
          <circle r="3" fill="#93600F" />
        </g>
      )
    case 'ganapathi': // elephant-headed Ganapathi with crown, curled trunk and modakas
      return (
        <g transform="translate(0 -16)">
          <ellipse cx="-27" cy="-22" rx="19" ry="23" fill={gold} stroke="#93600F" strokeWidth="1.4" />
          <ellipse cx="27" cy="-22" rx="19" ry="23" fill={gold} stroke="#93600F" strokeWidth="1.4" />
          <ellipse cx="-27" cy="-20" rx="11" ry="15" fill="#F2B04A" opacity=".7" />
          <ellipse cx="27" cy="-20" rx="11" ry="15" fill="#F2B04A" opacity=".7" />
          <path d="M-12-62h24l-4 10h-16z" fill={gold} stroke="#93600F" strokeWidth="1" />
          <circle cx="0" cy="-64" r="3" fill="#C0392B" />
          <circle cx="0" cy="-30" r="22" fill={gold} stroke="#93600F" strokeWidth="1.4" />
          <path d="M-5-14C-9 4-4 18 8 22c7 2 12-4 8-9" fill="none" stroke="#93600F" strokeWidth="11" strokeLinecap="round" />
          <path d="M-5-14C-9 4-4 18 8 22c7 2 12-4 8-9" fill="none" stroke={G} strokeWidth="8" strokeLinecap="round" />
          <path d="M10-14l9 7" stroke="#FFF8E6" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="-9" cy="-32" r="2.6" fill="#3A2412" /><circle cx="9" cy="-32" r="2.6" fill="#3A2412" />
          <path d="M-7-43h14" stroke="#FFF8E6" strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="0" cy="-43" r="2" fill="#C0392B" />
          {[-34, 34].map((x) => (
            <path key={x} transform={`translate(${x} 30)`} d="M0-12C-4-5-10-2-10 4a10 8 0 0 0 20 0C10-2 4-5 0-12z" fill="#FFF3D6" stroke={GD} strokeWidth="1.2" />
          ))}
        </g>
      )
    case 'mrityunjaya': // trishula, crescent moon and the third eye
      return (
        <g transform="translate(0 -16) scale(.9)">
          <path d="M0-48V44" stroke={G} strokeWidth="5" strokeLinecap="round" />
          <path d="M0-48l-6 12h12z" fill={gold} />
          <path d="M-24-34c0 22 10 28 24 28s24-6 24-28" fill="none" stroke={G} strokeWidth="5" strokeLinecap="round" />
          <path d="M-24-34l-5 10M24-34l5 10" stroke={G} strokeWidth="4" strokeLinecap="round" />
          <path d="M-30-56a16 16 0 1 0 22 18 13 13 0 1 1-22-18z" fill="#EAF0FF" opacity=".95" />
          <ellipse cx="0" cy="14" rx="9" ry="5" fill="#FFF8E6" stroke={G} strokeWidth="2" />
          <circle cx="0" cy="14" r="2.6" fill="#7A1F1F" />
        </g>
      )
    case 'navagraha': { // nine grahas around the sun
      const cols = ['#E07B14', '#E8EDF7', '#C0392B', '#2E8B57', '#F1C40F', '#F5B7D0', '#34495E', '#7F8C8D', '#A0522D']
      return (
        <g transform="translate(0 -24)">
          {[-26, 0, 26].flatMap((y, r) => [-26, 0, 26].map((x, c) => {
            const i = r * 3 + c
            return <g key={i}><circle cx={x} cy={y} r={i === 4 ? 13 : 10} fill={i === 4 ? '#FFB020' : cols[i]} stroke={G} strokeWidth="1.6" />
              {i === 4 && Array.from({ length: 10 }).map((_, k) => <line key={k} transform={`rotate(${k * 36})`} x1="0" y1="-15" x2="0" y2="-19" stroke="#FFB020" strokeWidth="2" />)}</g>
          }))}
          <rect x="-42" y="-42" width="84" height="84" rx="6" fill="none" stroke={G} strokeWidth="2" />
        </g>
      )
    }
    case 'vastu': // vastu mandala with a house
      return (
        <g transform="translate(0 -24)">
          <rect x="-40" y="-40" width="80" height="80" fill="#FFF3D6" fillOpacity=".12" stroke={G} strokeWidth="2.4" />
          {[-13.3, 13.3].map((v) => <g key={v}><line x1={v} y1="-40" x2={v} y2="40" stroke={G} strokeWidth="1" /><line x1="-40" y1={v} x2="40" y2={v} stroke={G} strokeWidth="1" /></g>)}
          <path d="M-22 8l22-22 22 22v22h-44z" fill="#FFF3D6" stroke={GD} strokeWidth="2" />
          <path d="M-6 30V16h12v14" fill={gold} />
          <path d="M0-14v-14M-4-26h8" stroke={G} strokeWidth="2" />
        </g>
      )
    case 'santana': // peacock feather, flute and a little cradle
      return (
        <g transform="translate(0 -24)">
          <path d="M-36 30L34-26" stroke="#8B5A2B" strokeWidth="5" strokeLinecap="round" />
          {[-24, -10, 4, 18].map((x, i) => <circle key={i} cx={x} cy={20 - (x + 24) * 0.8} r="1.8" fill="#3B2412" />)}
          <path d="M8-8C18-46 50-50 44-16 40 6 18 6 8-8z" fill="#1E8A5A" />
          <ellipse cx="30" cy="-20" rx="10" ry="12" fill="#1F5FA8" />
          <ellipse cx="30" cy="-19" rx="5" ry="6" fill="#0B2A4A" />
          <circle cx="30" cy="-20" r="2" fill="#F7D27A" />
          <path d="M-40 34c8 10 32 10 40 0" fill="none" stroke={G} strokeWidth="3" />
          <path d="M-36 34h32" stroke={G} strokeWidth="2" />
          <circle cx="-20" cy="28" r="6" fill="#FFE2C6" />
        </g>
      )
    case 'dhanvantari': // amrita kalasha with mango leaves
      return (
        <g transform="translate(0 -22)">
          {[-30, -15, 0, 15, 30].map((r) => <path key={r} transform={`rotate(${r} 0 -22)`} d="M0-22C-6-38-4-52 0-58 4-52 6-38 0-22z" fill="#2F9E44" stroke="#1B5E20" strokeWidth="0.8" />)}
          <ellipse cx="0" cy="-26" rx="13" ry="11" fill="#8B5A2B" />
          <path d="M-14-16h28l-2 6c18 4 24 16 22 28-2 16-14 24-34 24S-26 34-28 18c-2-12 4-24 22-28z" fill={gold} stroke="#93600F" strokeWidth="1.6" />
          <path d="M-22 16h44" stroke="#93600F" strokeWidth="1.5" />
          <path d="M-6 6l6-8 6 8-6 8z" fill="#C0392B" />
        </g>
      )
    case 'aghora': // trishula with damaru and vibhuti stripes
      return (
        <g transform="translate(0 -26)">
          <path d="M0-50V46" stroke="#E8E8F0" strokeWidth="5" strokeLinecap="round" />
          <path d="M0-50l-6 12h12z" fill="#E8E8F0" />
          <path d="M-22-36c0 20 9 26 22 26s22-6 22-26" fill="none" stroke="#E8E8F0" strokeWidth="5" strokeLinecap="round" />
          <path d="M-14 4l28 0-10 10 10 10h-28l10-10z" fill="#C0392B" stroke={G} strokeWidth="1.5" />
          <path d="M-14 4c-6 2-6 18 0 20M14 4c6 2 6 18 0 20" stroke={G} strokeWidth="1" fill="none" />
          {[-36, -30, -24].map((y) => <path key={y} d={`M-34 ${y + 70}h68`} stroke="#E8E8F0" strokeWidth="2" opacity=".7" />)}
          <circle cx="0" cy="40" r="3" fill="#C0392B" />
        </g>
      )
    case 'shatru': // Subrahmanya's Vel before a fan of peacock feathers
      return (
        <g transform="translate(0 -24)">
          {[-60, -30, 0, 30, 60].map((r) => (
            <g key={r} transform={`rotate(${r} 0 30)`}>
              <path d="M0 30V-36" stroke="#1E8A5A" strokeWidth="2" />
              <path d="M0-30C-9-38-9-52 0-58 9-52 9-38 0-30z" fill="#1E8A5A" />
              <ellipse cx="0" cy="-46" rx="5" ry="6.5" fill="#1F5FA8" /><circle cx="0" cy="-46" r="2.4" fill="#0B2A4A" />
            </g>
          ))}
          <path d="M0-12V46" stroke={G} strokeWidth="5" strokeLinecap="round" />
          <path d="M0-56C14-38 16-22 0-10-16-22-14-38 0-56z" fill={gold} stroke="#93600F" strokeWidth="1.5" />
          <path d="M0-46C6-36 6-26 0-18-6-26-6-36 0-46z" fill="#FFF3D6" />
          <rect x="-8" y="-12" width="16" height="6" rx="2" fill="#C0392B" />
        </g>
      )
    case 'pratyangira': // fierce lion-faced Mother: flaming mane, fierce brows, fangs
      return (
        <g transform="translate(0 -22)">
          {Array.from({ length: 24 }).map((_, i) => <path key={i} transform={`rotate(${i * 15})`} d="M-6-28L0-52 6-28z" fill={i % 2 ? '#E0561B' : gold} />)}
          {Array.from({ length: 16 }).map((_, i) => <path key={'m' + i} transform={`rotate(${i * 22.5 + 11})`} d="M-7-24L0-40 7-24z" fill="#B5651D" />)}
          <circle r="27" fill="#F2B04A" stroke="#93600F" strokeWidth="1.5" />
          <path d="M-18-12l12 5M18-12l-12 5" stroke="#5B1A0B" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="-10" cy="-4" r="3" fill="#FFF8E6" /><circle cx="10" cy="-4" r="3" fill="#FFF8E6" />
          <circle cx="-10" cy="-4" r="1.5" fill="#5B1A0B" /><circle cx="10" cy="-4" r="1.5" fill="#5B1A0B" />
          <path d="M-5 4h10l-5 6z" fill="#5B1A0B" />
          <path d="M-12 14q12 10 24 0q-12 4-24 0z" fill="#7A1F1F" />
          <path d="M-8 14l2 6 2-5M8 14l-2 6-2-5" fill="#FFF8E6" />
          <path d="M-4-20h8" stroke="#C0392B" strokeWidth="4" strokeLinecap="round" />
          <circle cx="0" cy="-14" r="2.5" fill="#C0392B" />
        </g>
      )
    case 'chandi': // crossed khadga and trishula behind a red lotus and kumkum
      return (
        <g transform="translate(0 -18) scale(.82)">
          <g transform="rotate(-32)"><path d="M0-50V40" stroke={G} strokeWidth="4" /><path d="M0-50l-5 10h10z" fill={gold} /><path d="M-15-40c0 13 6 17 15 17s15-4 15-17" fill="none" stroke={G} strokeWidth="4" /></g>
          <g transform="rotate(32)"><path d="M0-52C5-38 5-10 3 10h-6C-5-10-5-38 0-52z" fill="#E8EDF7" stroke="#9AA6B8" strokeWidth="1" /><path d="M-12 12h24" stroke={G} strokeWidth="4" strokeLinecap="round" /><path d="M0 12v20" stroke="#8B5A2B" strokeWidth="5" /></g>
          {[-50, -25, 0, 25, 50].map((r) => <path key={r} transform={`translate(0 30) rotate(${r})`} d="M0 0C-8-10-8-24 0-32 8-24 8-10 0 0z" fill="#E53950" stroke="#FFC1CC" strokeWidth="1" />)}
          <circle cx="0" cy="26" r="5" fill={gold} />
        </g>
      )
  }
}

export function HomaArt({ emblem, hue, className = '', title }: { emblem: HomaEmblem; hue: string; className?: string; title?: string }) {
  const id = 'ha' + useId().replace(/:/g, '')
  return (
    <svg viewBox="0 0 320 200" className={className} role="img" aria-label={title} preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id={`${id}-sky`} cx="50%" cy="62%" r="75%">
          <stop offset="0" stopColor="#FFE7A8" />
          <stop offset=".35" stopColor={hue} stopOpacity=".95" />
          <stop offset="1" stopColor="#2A0E05" />
        </radialGradient>
        <linearGradient id={`${id}-gold`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFE9A8" /><stop offset=".5" stopColor={G} /><stop offset="1" stopColor={GD} /></linearGradient>
        <linearGradient id={`${id}-kunda`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#B5651D" /><stop offset="1" stopColor="#5B2E0B" /></linearGradient>
        <radialGradient id={`${id}-flame`} cx=".5" cy=".85" r=".8"><stop offset="0" stopColor="#FFF6C2" /><stop offset=".45" stopColor="#FFC229" /><stop offset="1" stopColor="#F05A16" /></radialGradient>
        <radialGradient id={`${id}-aura`} r=".5"><stop offset="0" stopColor="#FFF3C4" stopOpacity=".75" /><stop offset="1" stopColor="#FFF3C4" stopOpacity="0" /></radialGradient>
      </defs>
      <rect width="320" height="200" fill={`url(#${id}-sky)`} />
      {/* rays */}
      <g opacity=".18" transform="translate(160 92)">
        {Array.from({ length: 18 }).map((_, i) => <path key={i} transform={`rotate(${i * 20})`} d="M-6 0L0-170 6 0z" fill="#FFF3C4" />)}
      </g>
      {/* temple arch frame */}
      <path d="M18 200V70c0-22 30-30 52-34 40-8 66-22 90-34 24 12 50 26 90 34 22 4 52 12 52 34v130" fill="none" stroke={GD} strokeOpacity=".55" strokeWidth="2" />
      {/* aura + emblem */}
      <circle cx="160" cy="70" r="60" fill={`url(#${id}-aura)`} />
      <g transform="translate(160 88) scale(.9)"><Emblem kind={emblem} id={id} /></g>
      {/* flames */}
      <g transform="translate(160 168)">
        <ellipse cx="0" cy="-2" rx="58" ry="16" fill="#FFB020" opacity=".35" />
        {[[-26, 0.7], [26, 0.7], [-12, 0.95], [12, 0.95], [0, 1.2]].map(([x, s], i) => (
          <path key={i} className="flame" style={{ animationDelay: `${i * 0.23}s` }} transform={`translate(${x} 0) scale(${s})`}
            d="M0-38C-6-26-14-18-14-6a14 12 0 0 0 28 0C14-18 6-26 0-38z" fill={`url(#${id}-flame)`} />
        ))}
      </g>
      {/* stepped havan kunda */}
      <path d="M96 170h128l-8 10H104z" fill={`url(#${id}-kunda)`} />
      <path d="M104 180h112l-8 10H112z" fill={`url(#${id}-kunda)`} />
      <path d="M112 190h96l-6 10h-84z" fill={`url(#${id}-kunda)`} />
      <path d="M96 170h128" stroke="#F7D27A" strokeWidth="1.5" />
      {/* sparks */}
      {[[132, 120], [190, 112], [148, 104], [176, 126], [204, 132], [118, 136]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1.6" fill="#FFE08A" opacity=".85" />)}
    </svg>
  )
}
