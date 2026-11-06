import { KeywordPair, Eyebrow } from './Common'
import { Arrow, Phone, Pin, WhatsApp } from './Icons'
import { places } from '../data/content'
import { site, whatsappLink } from '../data/site'

const img = (f: string) => import.meta.env.BASE_URL + 'img/' + f

/** Guruji's centres: a large main-centre card and a gold "pilgrim route" of the other cities. */
export function Locations({ heading = true }: { heading?: boolean }) {
  const main = places.find((p) => p.main)!
  const others = places.filter((p) => !p.main)
  return (
    <div>
      {heading && (
        <div className="mb-8 text-center">
          <Eyebrow kn="ನಮ್ಮ ಕೇಂದ್ರಗಳು" en="LOCATIONS" />
          <h2 className="section-title mt-3"><KeywordPair heading en="Where to Meet Guruji" kn="ಗುರೂಜಿಯವರನ್ನು ಎಲ್ಲಿ ಭೇಟಿಯಾಗಬಹುದು" /></h2>
        </div>
      )}
      <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[1.05fr_1fr]">
        {/* main centre */}
        <article className="relative overflow-hidden rounded-3xl text-white shadow-[0_18px_40px_-18px_rgba(122,36,16,.7)]" style={{ background: 'linear-gradient(160deg,#9C2A14 0%,#7A2410 55%,#4A1408 100%)' }}>
          <div className="relative aspect-[16/10] overflow-hidden">
            <img src={img('hero-desktop.jpg')} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-[78%_35%]" />
            <img src={img('guruji-portrait.jpg')} alt="Vasudev Guruji" loading="lazy" className="absolute bottom-0 left-0 h-full w-[46%] object-cover object-top"
              style={{ maskImage: 'linear-gradient(to right,#000 70%,transparent)', WebkitMaskImage: 'linear-gradient(to right,#000 70%,transparent)' }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #7A2410 0%, rgba(122,36,16,.35) 35%, transparent 60%)' }} />
            <span className="absolute right-4 top-4 rounded-full bg-[#F2B91C] px-3 py-1 font-cinzel text-[11px] font-semibold tracking-[0.16em] text-maroon shadow">MAIN CENTRE</span>
          </div>
          <div className="relative px-5 pb-6 pt-1 md:px-7">
            <span className="pointer-events-none absolute -bottom-6 right-2 select-none font-kn text-[110px] leading-none text-white/[0.07]" aria-hidden data-no-translate>{main.kn}</span>
            <p className="flex items-center gap-1.5 font-cinzel text-[12px] tracking-[0.18em] text-goldlight"><Pin size={14} /> {main.state.toUpperCase()}</p>
            <h3 className="mt-1 font-cormorant text-4xl font-bold leading-tight text-[#F7D88A]"><KeywordPair en={main.city} kn={main.kn} className="[&_.text-gold]:text-goldlight" /></h3>
            <p className="mt-2 text-[16.5px] leading-snug text-white/90">{main.address}</p>
            <p className="mt-2 inline-flex items-center gap-2 rounded-full border border-goldlight/50 bg-white/10 px-3 py-1 text-[15.5px] leading-snug text-[#F7D88A]"><span aria-hidden>🛕</span>{main.note}</p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              <a href={main.map} target="_blank" rel="noopener" className="btn-gold px-5 py-2"><Pin size={16} /> Get Directions</a>
              <a href={site.phoneHref} className="inline-flex items-center gap-2 rounded-full border border-goldlight/70 px-5 py-2 font-marcellus text-goldlight hover:bg-white/10"><Phone size={16} /> {site.phone}</a>
            </div>
          </div>
        </article>

        {/* other cities as a route */}
        <ol className="relative flex flex-col gap-3.5 pl-7 md:pl-9">
          <span className="absolute bottom-6 left-[11px] top-6 w-[2px] md:left-[15px]" style={{ background: 'repeating-linear-gradient(to bottom,#C58B2D 0 6px,transparent 6px 12px)' }} aria-hidden />
          {others.map((p) => (
            <li key={p.slug} className="relative">
              <span className="absolute -left-7 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border-2 border-paper text-white shadow md:-left-9 md:h-8 md:w-8" style={{ background: 'linear-gradient(180deg,#E8B95A,#A5701A)' }} aria-hidden><Pin size={13} /></span>
              <article className="card relative flex items-center gap-4 overflow-hidden !rounded-2xl px-4 py-3.5 md:px-5">
                <span className="pointer-events-none absolute -right-2 -top-3 select-none font-kn text-[64px] leading-none text-gold/[0.10]" aria-hidden data-no-translate>{p.kn}</span>
                <div className="relative min-w-0 flex-1">
                  <p className="font-cinzel text-[11px] font-semibold tracking-[0.16em] text-[#B0321A]">{p.state.toUpperCase()}</p>
                  <h3 className="font-cormorant text-[26px] font-bold leading-tight text-maroon"><KeywordPair en={p.city} kn={p.kn} className="[&>span:last-child]:text-[0.7em] [&>span:last-child]:text-golddark max-sm:[&>span:nth-child(2)]:hidden max-sm:[&>span:last-child]:block" /></h3>
                  <p className="mt-1 flex items-center gap-1.5 text-[15.5px] font-semibold leading-snug text-golddark"><span aria-hidden className="text-[14px]">🛕</span>{p.note}</p>
                </div>
                <a href={p.map} target="_blank" rel="noopener" aria-label={`Directions to ${p.city}`}
                  className="relative flex shrink-0 flex-col items-center gap-1 rounded-xl border border-goldlight bg-paper px-3 py-2 font-marcellus text-[13px] text-golddark transition hover:bg-goldlight/20">
                  <Pin size={20} /> Map <Arrow size={12} />
                </a>
              </article>
            </li>
          ))}
          <li className="relative">
            <span className="absolute -left-7 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border-2 border-paper bg-[#1DA851] text-white shadow md:-left-9 md:h-8 md:w-8" aria-hidden><WhatsApp size={14} /></span>
            <a href={whatsappLink('🙏 Hari Om Guruji, I would like to know when you are visiting my city.')} target="_blank" rel="noopener"
              className="flex items-center justify-between gap-3 rounded-2xl border border-dashed border-gold/60 px-4 py-3 text-[15.5px] text-ink/[.88] hover:bg-goldlight/10 md:px-5">
              <span>Anywhere else? Ask when Guruji visits your city, or consult by video.</span>
              <Arrow size={16} className="shrink-0 text-gold" />
            </a>
          </li>
        </ol>
      </div>
    </div>
  )
}
