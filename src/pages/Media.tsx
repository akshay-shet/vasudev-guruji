import { useEffect, useState } from 'react'
import { PageHero, Section } from '../components/Common'
import { Calendar, Pin } from '../components/Icons'
import { events } from '../data/content'
import { whatsappLink } from '../data/site'
import { useLocale } from '../lib/prefs'

/* ───────── Events ───────── */
function useNow() {
  const [now, setNow] = useState(Date.now())
  useEffect(() => { const i = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(i) }, [])
  return now
}

export function Events() {
  const loc = useLocale()
  const now = useNow()
  const sorted = [...events].sort((a, b) => +new Date(a.date) - +new Date(b.date))
  const upcoming = sorted.filter((e) => +new Date(e.date) > now)
  const next = upcoming[0]
  const diff = next ? +new Date(next.date) - now : 0
  const parts = [[Math.floor(diff / 864e5), 'Days'], [Math.floor(diff / 36e5) % 24, 'Hours'], [Math.floor(diff / 6e4) % 60, 'Min'], [Math.floor(diff / 1e3) % 60, 'Sec']] as const
  return (
    <>
      <PageHero eyebrow={{ kn: 'ಕಾರ್ಯಕ್ರಮಗಳು', en: 'EVENTS' }} keyword="Best Astrologer Online" title="Events & Programs" hi="ಉತ್ಸವ ಮತ್ತು ಕಾರ್ಯಕ್ರಮಗಳು" />
      {next && (
        <Section>
          <div className="card p-6 text-center md:p-10">
            <p className="font-cinzel text-xs tracking-[0.3em] text-gold">NEXT EVENT BEGINS IN</p>
            <div className="mt-4 flex justify-center gap-3 md:gap-5" role="timer">
              {parts.map(([v, l]) => (
                <div key={l} className="w-20 rounded-2xl border border-goldlight bg-paper py-3 shadow-gold md:w-28">
                  <div className="gold-text font-marcellus text-4xl md:text-5xl">{String(v).padStart(2, '0')}</div>
                  <div className="font-cinzel text-[11px] tracking-widest">{l}</div>
                </div>
              ))}
            </div>
            <h2 className="mt-6 font-cormorant text-4xl font-bold italic">{next.title}</h2>
            <p className="mt-1 text-lg text-ink/[.88]">{new Date(next.date).toLocaleString(loc, { dateStyle: 'full', timeStyle: 'short' })} · {next.place}</p>
          </div>
        </Section>
      )}
      <Section>
        <div className="grid gap-5 md:grid-cols-2">
          {sorted.map((e) => {
            const d = new Date(e.date)
            const past = +d < now
            return (
              <article key={e.title} className={`card flex gap-5 p-5 ${past ? 'opacity-60' : ''}`}>
                <div className="flex w-20 shrink-0 flex-col items-center justify-center rounded-2xl border border-goldlight bg-paper py-2">
                  <span className="font-cinzel text-xs tracking-widest text-golddark">{d.toLocaleString(loc, { month: 'short' }).toUpperCase()}</span>
                  <span className="gold-text font-marcellus text-4xl">{d.getDate()}</span>
                  <span className="text-sm">{d.getFullYear()}</span>
                </div>
                <div className="flex-1">
                  <p className="font-cinzel text-xs tracking-widest text-gold">{e.type.toUpperCase()}{past ? ' · COMPLETED' : ''}</p>
                  <h2 className="font-marcellus text-xl leading-snug">{e.title}</h2>
                  <p className="mt-1 flex items-center gap-1 text-ink/[.88]"><Calendar size={16} className="text-gold" />{d.toLocaleTimeString(loc, { hour: 'numeric', minute: '2-digit' })}{e.end ? ` – ${new Date(e.end).toLocaleDateString(loc, { day: 'numeric', month: 'short' })}` : ''}</p>
                  <p className="flex items-center gap-1 text-ink/[.88]"><Pin size={16} className="text-gold" />{e.place}</p>
                  <p className="mt-2 text-lg">{e.description}</p>
                  {!past && <a href={whatsappLink(`🙏 Hari Om, I would like to register for “${e.title}” on ${d.toDateString()}.`)} target="_blank" rel="noopener" className="btn-gold mt-3 px-5 py-1.5">Register on WhatsApp</a>}
                </div>
              </article>
            )
          })}
        </div>
      </Section>
    </>
  )
}

