import { Link } from 'react-router-dom'
import { EnquiryForm, Eyebrow, KeywordPair, Section, usePageTitle } from '../components/Common'
import { Arrow, WhatsApp } from '../components/Icons'
import { homas, type Homa as HomaT } from '../data/content'
import { whatsappLink } from '../data/site'

const homaImg = (h: HomaT) => `${import.meta.env.BASE_URL}img/homa/${h.slug}.jpg`

const bookLink = (h: HomaT) => whatsappLink(`🙏 Hari Om Guruji, I would like to book the ${h.name}.\n\nName:\nGotra / Nakshatra:\nPreferred date:\nPlace:`)

/** Compact card for the homepage grid. */
export function HomaTile({ h }: { h: HomaT }) {
  return (
    <Link to={`/homa#${h.slug}`} className="group flex w-full flex-col overflow-hidden rounded-xl bg-paper shadow-[0_10px_26px_-14px_rgba(147,96,15,.5)] ring-1 ring-goldlight/60 transition hover:-translate-y-1">
      <div className="relative p-1 sm:p-1.5">
        <img src={homaImg(h)} alt={h.name} loading="lazy" className="aspect-[15/16] w-full rounded-lg object-cover object-center" />
      </div>
      <div className="flex flex-1 flex-col items-center px-1.5 pb-2.5 pt-1 text-center sm:px-3 sm:pb-4">
        <h3 className="font-marcellus text-[12px] leading-tight text-maroon sm:text-[17px]"><KeywordPair stacked en={h.name} kn={h.kn} className="[&>span:last-child]:text-[10.5px] [&>span:last-child]:text-golddark sm:[&>span:last-child]:text-[13px]" /></h3>
        <p className="mt-1 hidden text-[14.5px] leading-snug text-ink/70 sm:block">{h.benefits[0]}</p>
      </div>
    </Link>
  )
}

function HomaDetail({ h }: { h: HomaT }) {
  return (
    <article id={h.slug} className="flex scroll-mt-24 flex-col overflow-hidden rounded-xl bg-paper shadow-[0_12px_30px_-16px_rgba(147,96,15,.55)] ring-1 ring-goldlight/60 sm:rounded-2xl">
      <div className="relative p-1 sm:p-2">
        <img src={homaImg(h)} alt={h.name} loading="lazy" decoding="async" className="aspect-[15/16] w-full rounded-lg object-cover object-center sm:rounded-xl" />
      </div>
      <div className="flex flex-1 flex-col px-2 pb-3 pt-0.5 sm:px-5 sm:pb-5 sm:pt-1">
        <h2 className="text-center font-marcellus text-[14px] leading-tight text-maroon sm:text-[21px] sm:leading-snug"><KeywordPair stacked en={h.name} kn={h.kn} className="[&>span:last-child]:text-[12px] [&>span:last-child]:text-golddark sm:[&>span:last-child]:text-[16px]" /></h2>
        <p className="mt-0.5 text-center text-[11.5px] italic leading-tight text-ink/60 sm:mt-1 sm:text-[14px]">{h.deity}</p>
        <p className="mt-3 hidden text-[16.5px] leading-relaxed text-ink/85 sm:block">{h.desc}</p>
        <ul className="mt-2 space-y-0.5 text-[12.5px] leading-snug sm:mt-3 sm:space-y-1 sm:text-[16px]">
          {h.benefits.map((b, i) => <li key={b} className={`gap-1.5 sm:flex sm:gap-2 ${i < 2 ? 'flex' : 'hidden'}`}><span className="text-gold" aria-hidden>✦</span>{b}</li>)}
        </ul>
        <p className="mt-3 hidden rounded-xl bg-goldlight/15 px-3 py-2 text-[15px] sm:block"><span className="font-semibold text-golddark">Best time:</span> {h.when}</p>
        <a href={bookLink(h)} target="_blank" rel="noopener" className="btn-gold mt-auto self-center whitespace-nowrap px-3 py-1.5 text-[13px] sm:mt-4 sm:px-6 sm:py-2 sm:text-base"><WhatsApp size={16} /> Book</a>
      </div>
    </article>
  )
}

export default function HomaPage() {
  usePageTitle('Homa — Sacred Fire Rituals')
  return (
    <>
      <section className="mx-auto max-w-4xl px-4 pb-2 pt-6 text-center md:px-6 lg:pt-10">
        <Eyebrow kn="ಹೋಮಗಳು" en="SACRED FIRE RITUALS" />
        <h1 className="mt-3 font-cormorant text-[34px] font-bold leading-tight text-maroon md:text-5xl"><KeywordPair heading en="Homa & Havan Services" kn="ಹೋಮ ಮತ್ತು ಹವನ ಸೇವೆಗಳು" /></h1>
        <p className="mx-auto mt-3 max-w-2xl text-lg text-ink/75">Each homa is performed by Guruji with Vedic priests, with the sankalpa taken in your name, gotra and nakshatra — at the ashram, at your home, or online with live video.</p>
      </section>
      <Section className="!pt-6">
        <div className="grid grid-cols-2 gap-2.5 sm:gap-5 lg:grid-cols-3">
          {homas.map((h) => <HomaDetail key={h.slug} h={h} />)}
        </div>
      </Section>
      <Section className="!pt-2">
        <div className="mx-auto max-w-4xl"><EnquiryForm defaultTopic="Homa" title="Book a Homa" /></div>
        <p className="mt-3 text-center text-[14px] text-ink/60">Not sure which homa you need? Share your birth details — Guruji will suggest the right one. <Link to="/services" className="text-golddark underline">See all services <Arrow size={12} className="inline" /></Link></p>
      </Section>
    </>
  )
}
