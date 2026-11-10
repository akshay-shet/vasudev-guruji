import { Link, useParams } from 'react-router-dom'
import { EnquiryForm, Eyebrow, KeywordPair, PageHero, Section, usePageTitle } from '../components/Common'
import { Diamond } from '../components/Decor'
import { Arrow, iconByName, Phone, WhatsApp } from '../components/Icons'
import { services, type Service } from '../data/content'
import { NotFound } from './NotFound'
import { site, whatsappLink } from '../data/site'

const img = (f: string) => import.meta.env.BASE_URL + 'img/' + f

/** Temple-scene banner with Guruji's portrait and the service name in gold. */
export function ServiceBanner({ s, large = false }: { s: Service; large?: boolean }) {
  return (
    <div className={`relative overflow-hidden ${large ? 'aspect-[16/8] rounded-2xl' : 'aspect-[16/8.4] rounded-lg sm:rounded-xl'}`}>
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_15%_60%,#7A3A12_0%,#3A1408_70%)]" />
      <img src={img(`services/${s.slug}.webp`)} alt="" loading="lazy" decoding="async" className="absolute inset-y-0 right-0 h-full w-[76%] object-cover"
        style={{ maskImage: 'linear-gradient(90deg,transparent 0%,#000 30%)', WebkitMaskImage: 'linear-gradient(90deg,transparent 0%,#000 30%)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, rgba(30,10,2,.6) 0%, rgba(30,10,2,0) 42%)' }} />
      <img src={img('services/guruji-deepa.webp')} alt="" loading="lazy" decoding="async"
        className="absolute bottom-0 left-0 h-[94%] w-auto max-w-[50%] object-contain object-left-bottom drop-shadow-[4px_0_10px_rgba(0,0,0,.45)]" />
      <div className="absolute bottom-[6%] right-[4%] flex w-[50%] justify-end text-right">
        <span className="font-cormorant font-bold italic leading-[1.05] text-[#F7D88A] [text-shadow:0_2px_6px_rgba(0,0,0,.85)]"
          style={{ fontSize: large ? 'clamp(24px,3.4vw,44px)' : 'clamp(11px,1.9vw,24px)' }}>{s.short}</span>
      </div>
    </div>
  )
}

/** Poster card (like the Homa posters): Guruji in a temple frame, service name on a maroon-gold plaque. */
export function ServicePoster({ s }: { s: Service }) {
  const I = iconByName[s.icon]
  return (
    <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-[#FDEDCF] sm:rounded-xl">
      {/* right: the service artwork, fading into the parchment */}
      <img src={img(`services/${s.slug}.webp`)} alt="" loading="lazy" decoding="async" className="absolute inset-y-0 right-0 h-full w-[70%] object-cover object-[62%_50%]"
        style={{ maskImage: 'linear-gradient(90deg,transparent 0%,rgba(0,0,0,.55) 20%,#000 42%)', WebkitMaskImage: 'linear-gradient(90deg,transparent 0%,rgba(0,0,0,.55) 20%,#000 42%)' }} />
      {/* left: parchment with mandala corners and a faint temple */}
      <img src={img('services/panel-left.webp')} alt="" loading="lazy" decoding="async" className="absolute inset-y-0 left-0 h-full w-[48%] object-cover object-left"
        style={{ maskImage: 'linear-gradient(90deg,#000 62%,transparent)', WebkitMaskImage: 'linear-gradient(90deg,#000 62%,transparent)' }} />
      {/* Guruji in the left space */}
      <img src={img('services/guruji-namaste.webp')} alt="" loading="lazy" decoding="async"
        className="absolute bottom-0 left-[-4%] h-[62%] w-auto max-w-[66%] object-contain object-left-bottom drop-shadow-[3px_2px_8px_rgba(90,40,10,.35)]" />
      <span className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full border border-goldlight/80 bg-maroon/85 text-goldlight shadow sm:right-2.5 sm:top-2.5 sm:h-9 sm:w-9"><I size={14} /></span>
    </div>
  )
}

/** Home-page card: wide banner (parchment left, service artwork right) with the name written in the parchment space. */
export function ServiceBannerCard({ s }: { s: Service }) {
  const I = iconByName[s.icon]
  return (
    <Link to={`/services/${s.slug}`} aria-label={s.title}
      className="group relative block aspect-[1040/440] w-full overflow-hidden rounded-xl bg-[#FBEAD0] shadow-[0_10px_24px_-14px_rgba(147,96,15,.55)] transition hover:-translate-y-1 hover:shadow-[0_16px_30px_-14px_rgba(147,96,15,.6)] sm:rounded-2xl">
      <img src={img(`services/home-${s.slug}.webp`)} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
      <div className="absolute inset-y-0 left-0 flex w-[54%] flex-col justify-center pl-[5%] pr-1">
        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-golddark/40 bg-white/60 text-golddark sm:h-8 sm:w-8"><I size={15} /></span>
        <h3 className="mt-1.5 font-marcellus text-[17px] leading-tight text-maroon sm:text-[19px] xl:text-[18px]">{s.short}</h3>
        <p className="mt-0.5 font-kn text-[13px] leading-snug text-golddark sm:text-[14px] xl:text-[13px]" lang="kn" data-no-translate>{s.kn}</p>
        <span className="mt-1.5 inline-flex items-center gap-1 font-marcellus text-[13.5px] text-[#B0321A] group-hover:gap-2 sm:text-[14.5px]">Know more <Arrow size={13} /></span>
      </div>
    </Link>
  )
}

export function ServiceCard({ s, minimal = false }: { s: Service; minimal?: boolean }) {
  return (
    <Link to={`/services/${s.slug}`} className="group flex w-full flex-col rounded-xl bg-paper p-1 shadow-[0_10px_26px_-14px_rgba(147,96,15,.5)] transition hover:-translate-y-1 sm:rounded-2xl sm:p-1.5">
      <ServicePoster s={s} />
      <div className={`flex flex-1 flex-col items-center px-1 text-center sm:px-3 ${minimal ? 'pb-2.5 pt-2 sm:pb-4 sm:pt-3' : 'pb-2 pt-1.5 sm:pb-4 sm:pt-2'}`}>
        <h3 className={`font-marcellus leading-tight text-maroon ${minimal ? 'text-[13.5px] sm:text-[21px]' : 'text-[12px] sm:text-[18px] sm:leading-snug'}`}>
          <KeywordPair stacked en={s.title} kn={s.kn} className={minimal
            ? '[&>span:last-child]:mt-0.5 [&>span:last-child]:text-[12px] [&>span:last-child]:text-golddark sm:[&>span:last-child]:text-[16px]'
            : '[&>span:last-child]:text-[10.5px] [&>span:last-child]:text-golddark sm:[&>span:last-child]:text-[13.5px]'} />
        </h3>
        {!minimal && <p className="mt-1.5 hidden text-[15px] leading-snug text-ink/70 lg:block">{s.desc}</p>}
        <span className={`mt-auto hidden items-center gap-1 font-marcellus text-[#B0321A] group-hover:gap-2 sm:inline-flex ${minimal ? 'pt-3 text-[15px]' : 'pt-2 text-[14px]'}`}>Know more <Arrow size={14} /></span>
      </div>
    </Link>
  )
}

/** Services-page card (reference layout): banner on top, round call button over its corner,
 *  small red "… IN MANDYA" label, bold title, short description and "Know more". */
export function ServiceTile({ s }: { s: Service }) {
  return (
    <article className="group relative flex h-full w-full flex-col rounded-xl bg-paper p-1.5 shadow-[0_10px_26px_-14px_rgba(147,96,15,.45)] transition hover:-translate-y-1 sm:rounded-2xl sm:p-2.5">
      <Link to={`/services/${s.slug}`} aria-label={s.title} className="block"><ServiceBanner s={s} /></Link>
      <a href={site.phoneHref} aria-label={`Call about ${s.short}`}
        className="relative z-[1] -mt-4 ml-1.5 flex h-8 w-8 items-center justify-center rounded-full border-2 border-paper bg-[#F2B91C] text-maroon shadow-md transition hover:scale-110 sm:-mt-5 sm:ml-3 sm:h-10 sm:w-10">
        <Phone size={16} />
      </a>
      <Link to={`/services/${s.slug}`} className="flex flex-1 flex-col items-center px-0.5 pb-1.5 pt-1.5 text-center sm:px-2 sm:pb-3">
        <p className="font-cinzel text-[8px] font-semibold leading-tight tracking-[0.08em] text-[#B0321A] uppercase sm:text-[11px] sm:tracking-[0.12em]">{`${s.label} in Mandya`}</p>
        <h2 className="mt-1 font-marcellus text-[13px] font-semibold leading-tight text-maroon sm:mt-1.5 sm:text-[19px] sm:leading-snug">
          <KeywordPair stacked en={s.short} kn={s.kn} className="[&>span:last-child]:mt-0.5 [&>span:last-child]:block [&>span:last-child]:text-[10.5px] [&>span:last-child]:font-normal [&>span:last-child]:text-golddark sm:[&>span:last-child]:text-[13.5px]" />
        </h2>
        <p className="mt-1.5 line-clamp-4 text-[11.5px] leading-snug text-ink/[.82] sm:mt-2 sm:line-clamp-none sm:text-[15px]">{s.desc}</p>
        <span className="mt-auto inline-flex items-center gap-1 pt-2 font-marcellus text-[12px] text-[#B0321A] group-hover:gap-2 sm:pt-3 sm:text-[14.5px]">Know more <Arrow size={13} /></span>
      </Link>
    </article>
  )
}

export function Services() {
  usePageTitle('Astrology Services')
  return (
    <>
      <section className="page-hero mx-auto max-w-6xl px-4 pb-4 pt-6 text-center md:px-6 lg:pt-10">
        <Eyebrow kn="ಸೇವೆಗಳು" en="OUR SERVICES" />
        <h1 className="section-title mt-3 !leading-tight"><KeywordPair heading en="How Guruji Can Help" kn="ಗುರೂಜಿಯವರ ಮಾರ್ಗದರ್ಶನ" /></h1>
        <Diamond className="mx-auto mt-2 h-3 w-28" />
      </section>
      <Section className="!pt-4">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-2 sm:gap-5">
          {services.map((s) => (
            <div key={s.slug} className="flex w-[calc((100%-1rem)/3)] sm:w-[calc((100%-2.5rem)/3)]"><ServiceTile s={s} /></div>
          ))}
        </div>
      </Section>
      <Section className="!pt-2"><div className="mx-auto max-w-4xl"><EnquiryForm title="Ask Guruji" /></div></Section>
    </>
  )
}

export function ServiceDetail() {
  const { slug } = useParams()
  const s = services.find((x) => x.slug === slug)
  if (!s) return <NotFound />
  return (
    <>
      <PageHero compact eyebrow={{ kn: 'ಸೇವೆಗಳು', en: 'OUR SERVICES' }} title={s.title} hi={s.kn} />
      <Section className="!pt-2">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
          <div>
            <ServiceBanner s={s} large />
            <div className="card mt-5 p-5 md:p-6">
              <p className="font-cinzel text-[11px] font-semibold uppercase tracking-[0.14em] text-[#B0321A]">{s.label}</p>
              <p className="mt-2 text-lg leading-relaxed">{s.about}</p>
              <Diamond className="my-4 h-3 w-24" />
              <ul className="space-y-2 text-lg">
                {s.points.map((p) => <li key={p} className="flex gap-2.5"><span className="text-gold">✦</span>{p}</li>)}
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                <a href={site.phoneHref} className="btn-gold px-5 py-2"><Phone size={18} /> Call Guruji</a>
                <a href={whatsappLink(`🙏 Hari Om Guruji, I would like guidance on: ${s.title}`)} target="_blank" rel="noopener" className="btn-outline px-5 py-2">
                  <WhatsApp size={18} className="text-[#1DA851]" /> WhatsApp
                </a>
              </div>
            </div>
          </div>
          <EnquiryForm compact defaultTopic={s.topic} title="Send an Enquiry" />
        </div>
      </Section>
      <Section className="!pt-0">
        <h2 className="text-center font-cormorant text-3xl font-bold italic text-maroon"><KeywordPair heading en="Other services" kn="ಇತರ ಸೇವೆಗಳು" /></h2>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {services.filter((x) => x.slug !== s.slug).map((x) => (
            <Link key={x.slug} to={`/services/${x.slug}`} className="btn-outline px-3.5 py-1.5 text-[14px]"><KeywordPair en={x.short} kn={x.kn} /></Link>
          ))}
        </div>
        <div className="mt-6 text-center"><Link to="/services" className="btn-gold px-6 py-2">All services <Arrow size={16} /></Link></div>
      </Section>
    </>
  )
}
