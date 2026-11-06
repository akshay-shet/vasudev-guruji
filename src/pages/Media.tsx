import { useEffect, useState } from 'react'
import { PageHero, Section, VideoModal } from '../components/Common'
import { Calendar, Pin, Play } from '../components/Icons'
import { discourses, events } from '../data/content'
import { site, whatsappLink } from '../data/site'
import { useLocale } from '../lib/prefs'

/* ───────── Discourses ───────── */
export function Discourses() {
  const [playing, setPlaying] = useState<{ id: string; title: string } | null>(null)
  const [filter, setFilter] = useState('All')
  const series = ['All', ...Array.from(new Set(discourses.map((d) => d.series)))]
  const list = discourses.filter((d) => filter === 'All' || d.series === filter)
  return (
    <>
      <PageHero eyebrow={{ kn: 'ವೀಡಿಯೊಗಳು', en: 'VIDEOS' }} keyword="Vedic Astrology Services" title="Videos & Discourses" hi="ವೀಡಿಯೊ ಮತ್ತು ಪ್ರವಚನಗಳು" subtitle="Satsang, Bhagavad Gita and Jyotisha talks by Guruji." />
      <Section>
        <div className="mb-6 flex flex-wrap justify-center gap-2">
          {series.map((s) => <button key={s} onClick={() => setFilter(s)} className={filter === s ? 'btn-gold px-4 py-1.5' : 'btn-outline px-4 py-1.5'} aria-pressed={filter === s}>{s}</button>)}
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((d, i) => (
            <article key={d.title} className="card overflow-hidden">
              <button onClick={() => setPlaying({ id: d.youtubeId, title: d.title })} className="group relative block aspect-video w-full overflow-hidden" aria-label={`Play ${d.title}`} data-id="play-video">
                <img src={import.meta.env.BASE_URL + 'img/discourse.jpg'} alt="" className="scenery h-full w-full object-cover transition duration-700 group-hover:scale-105" style={{ filter: `hue-rotate(${i * 12}deg)` }} />
                <span className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white/90 bg-white/25 text-white"><Play size={26} className="ml-1" /></span>
                <span className="absolute bottom-2 right-2 rounded-full bg-black/70 px-2 text-white">{d.duration}</span>
              </button>
              <div className="p-5">
                <p className="font-cinzel text-xs tracking-widest text-gold">{d.series.toUpperCase()}</p>
                <h2 className="mt-1 font-marcellus text-xl leading-snug">{d.title}</h2>
                <p className="mt-2 text-lg text-ink/[.88]">{d.description}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-8 text-center"><a href={site.social.youtube} target="_blank" rel="noopener" className="btn-gold px-7 py-2.5"><Play size={18} /> Visit the YouTube channel</a></div>
      </Section>
      {playing && <VideoModal youtubeId={playing.id} title={playing.title} onClose={() => setPlaying(null)} />}
    </>
  )
}

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
      <PageHero eyebrow={{ kn: 'ಕಾರ್ಯಕ್ರಮಗಳು', en: 'EVENTS' }} keyword="Best Astrologer Online" title="Events & Programs" hi="ಉತ್ಸವ ಮತ್ತು ಕಾರ್ಯಕ್ರಮಗಳು" subtitle="Festivals, satsangs, retreats and courses with Guruji — at the ashram and online." />
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
                  <span className="font-cinzel text-xs tracking-widest text-gold">{d.toLocaleString(loc, { month: 'short' }).toUpperCase()}</span>
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

