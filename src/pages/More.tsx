import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { EnquiryForm, KeywordPair, PageHero, Section } from '../components/Common'
import { Arrow, Mail, Phone, Pin, WhatsApp } from '../components/Icons'
import { Locations } from '../components/Locations'
import { products, shopCategories, type ShopCategory } from '../data/content'
import { site, whatsappLink } from '../data/site'
import { useLocale } from '../lib/prefs'

/* ───────── Shop ───────── */
export function Shop() {
  const [cat, setCat] = useState<'all' | ShopCategory>('all')
  const [sel, setSel] = useState<Record<string, number>>({})
  const add = (id: string, d: number) => setSel((c) => ({ ...c, [id]: Math.max(0, Math.min(99, (c[id] ?? 0) + d)) }))
  const items = products.filter((p) => (sel[p.id] ?? 0) > 0).map((p) => ({ p, q: sel[p.id] }))
  const count = items.reduce((n, i) => n + i.q, 0)
  const link = whatsappLink(['🙏 Hari Om, I would like to enquire about:', ...items.map((i) => `• ${i.p.name} × ${i.q}`), '', 'Name:', 'Place:'].join('\n'))
  const shown = shopCategories.filter((c) => cat === 'all' || c.key === cat)
  const pill = (active: boolean) => `whitespace-nowrap rounded-full border px-3.5 py-1.5 font-marcellus text-[13.5px] transition sm:text-[15px] ${active ? 'border-[#D9AA52] text-[#F7D88A] shadow' : 'border-goldlight bg-paper text-maroon hover:bg-goldlight/20'}`
  const activeBg = { background: 'linear-gradient(180deg,#8E2412,#5E160A)' }
  return (
    <>
      <PageHero compact eyebrow={{ kn: 'ಅಂಗಡಿ', en: 'SHOP' }} title="Sacred Shop" hi="ಪವಿತ್ರ ವಸ್ತುಗಳು" />
      <Section className="!pt-4">
        <div className="mb-8 flex flex-wrap justify-center gap-1.5 sm:gap-2" role="tablist" aria-label="Shop categories">
          <button role="tab" aria-selected={cat === 'all'} onClick={() => setCat('all')} className={pill(cat === 'all')} style={cat === 'all' ? activeBg : undefined}>All <span>({products.length})</span></button>
          {shopCategories.map((c) => (
            <button key={c.key} role="tab" aria-selected={cat === c.key} onClick={() => setCat(c.key)} className={pill(cat === c.key)} style={cat === c.key ? activeBg : undefined}>
              {c.label} <span>({products.filter((p) => p.category === c.key).length})</span>
            </button>
          ))}
        </div>

        {shown.map((c) => (
          <div key={c.key} className="mb-12 last:mb-0">
            <div className="mb-5 text-center">
              <div className="flex items-center gap-3">
                <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/60" />
                <h2 className="font-cormorant text-[24px] font-bold italic leading-tight text-maroon sm:text-[32px]"><KeywordPair heading en={c.label} kn={c.kn} /></h2>
                <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/60" />
              </div>
              <p className="mt-1 text-[15px] text-ink/[.82] sm:text-[16px]">{c.blurb}</p>
            </div>
            <div className="mx-auto grid max-w-6xl grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
              {products.filter((p) => p.category === c.key).map((p) => {
                const q = sel[p.id] ?? 0
                return (
                  <article key={p.id} className={`card flex flex-col p-2 transition sm:p-3 ${q ? 'ring-2 ring-gold' : ''}`}>
                    <div className={`relative aspect-square overflow-hidden rounded-lg ring-1 ring-goldlight/60 ${p.category === 'pyramids' ? 'bg-[#FBF0D6]' : 'bg-[#3A1A0C]'}`}>
                      <img src={p.img} alt={p.name} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-contain" />
                      {q > 0 && <span className="absolute right-1.5 top-1.5 flex h-6 min-w-6 items-center justify-center rounded-full bg-maroon px-1.5 font-marcellus text-[13px] text-goldlight shadow">×{q}</span>}
                    </div>
                    <h3 className="mt-2 flex-1 font-marcellus text-[14px] leading-tight text-maroon sm:text-[16.5px] sm:leading-snug" data-no-translate="">{p.name}</h3>
                    {q === 0 ? (
                      <button className="btn-gold mt-2 w-full px-2 py-1.5 text-[14px] sm:text-base" onClick={() => add(p.id, 1)} aria-label={`Add ${p.name}`}>+ Add</button>
                    ) : (
                      <div className="mt-2 flex items-center justify-between gap-1 rounded-full border border-gold bg-paper p-0.5">
                        <button className="btn-outline h-8 w-8 shrink-0 !p-0 text-lg sm:h-9 sm:w-9" onClick={() => add(p.id, -1)} aria-label={`Remove one ${p.name}`}>−</button>
                        <span className="font-marcellus text-[16px] text-maroon sm:text-lg" aria-live="polite">{q}</span>
                        <button className="btn-gold h-8 w-8 shrink-0 !p-0 text-lg sm:h-9 sm:w-9" onClick={() => add(p.id, 1)} aria-label={`Add one ${p.name}`}>+</button>
                      </div>
                    )}
                  </article>
                )
              })}
            </div>
          </div>
        ))}
        <p className="mt-8 text-center text-[14px] text-ink/[.82]">Availability is confirmed on WhatsApp. Guruji can suggest the right item for your chart and home.</p>
        {count > 0 && <div className="h-20" aria-hidden />}
      </Section>
      {count > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-goldlight bg-paper/95 px-3 py-2.5 shadow-[0_-8px_24px_-12px_rgba(147,96,15,.5)] backdrop-blur pr-[88px] sm:px-6 sm:pr-28">
          <div className="mx-auto flex max-w-4xl items-center gap-2 sm:gap-4">
            <div className="min-w-0 flex-1">
              <p className="font-marcellus text-[15px] leading-tight text-maroon sm:text-lg">{count} {count === 1 ? 'item selected' : 'items selected'}</p>
              <button onClick={() => setSel({})} className="text-[13px] text-ink/[.88] underline">Clear</button>
            </div>
            <a href={link} target="_blank" rel="noopener" className="btn-gold shrink-0 whitespace-nowrap px-3.5 py-2 text-[14px] sm:px-6 sm:text-base"><WhatsApp size={18} /> Enquire on WhatsApp</a>
          </div>
        </div>
      )}
    </>
  )
}

/* ───────── Contact ───────── */
/** Photo of the centre on the Contact page — opens this Google listing. */
const centrePhotoLink = 'https://www.google.com/search?client=ms-android-samsung-rvo1&hs=LdHW&sca_esv=b3f9128d827c892f&hl=en-IN&cs=1&sxsrf=AKL5yDixRKnF45QA7GhNvHTfDsd2NFsIkA%3A1793948773056&kgmid=%2Fg%2F11x_dx57m1&q=Samruddhi%20Astro%20Center&shem=epsd1%2Cltae%2Crimspwouoe&shndl=30&source=sh%2Fx%2Floc%2Fact%2Fm1%2F4&kgs=5f3afa48479be324'

export function Contact() {
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapQuery)}`
  const cards = [
    { icon: <Phone size={20} />, label: 'Call', value: site.phone, href: site.phoneHref },
    { icon: <WhatsApp size={20} />, label: 'WhatsApp', value: site.phone, href: whatsappLink('🙏 Hari Om') },
    { icon: <Mail size={20} />, label: 'Email', value: site.email, href: `mailto:${site.email}` },
    { icon: <Pin size={20} />, label: 'Directions', value: 'Open in Google Maps', href: mapsLink },
  ]
  return (
    <>
      <PageHero compact eyebrow={{ kn: 'ಸಂಪರ್ಕ', en: 'CONTACT' }} keyword="Live Astrologer Chat & Call" title="Contact Guruji’s Office" hi="ಗುರೂಜಿಯವರ ಕಚೇರಿ ಸಂಪರ್ಕ" />
      <section className="mx-auto w-full max-w-6xl px-4 pb-10 md:px-6">
        {/* quick contact strip */}
        <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4 md:gap-4">
          {cards.map((c) => (
            <a key={c.label} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener"
              className="card flex items-center gap-3 !rounded-2xl p-3 transition hover:-translate-y-0.5 md:p-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-goldlight bg-paper text-gold md:h-11 md:w-11">{c.icon}</span>
              <span className="min-w-0">
                <span className="block font-marcellus text-[15px] leading-tight text-maroon md:text-base">{c.label}</span>
                <span className="block truncate text-[14px] leading-snug text-ink/[.88] md:text-[15px]">{c.value}</span>
              </span>
            </a>
          ))}
        </div>

        <div className="mt-4 grid gap-4 md:mt-6 md:gap-6 lg:grid-cols-[1fr_1.25fr]">
          {/* map + visit info */}
          <div className="flex flex-col gap-4 md:gap-6">
            <a href={centrePhotoLink} target="_blank" rel="noopener" aria-label="Samruddhi Astro Center on Google"
              className="card group relative block min-h-[240px] flex-1 overflow-hidden !rounded-2xl">
              <img src={import.meta.env.BASE_URL + 'img/kollegala-centre.webp'} alt="Samruddhi Astro Center, Srirangapatna, Mandya" loading="lazy"
                className="absolute inset-0 h-full w-full object-cover object-top transition duration-700 group-hover:scale-105" />
              <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
                <span>
                  <span className="block font-cormorant text-[24px] font-bold leading-tight text-[#F7D88A]" data-no-translate="">Samruddhi Astro Center</span>
                  <span className="flex items-center gap-1 text-[14px] text-white/90"><Pin size={14} /> Srirangapatna, Mandya</span>
                </span>
                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white/95 px-3.5 py-1.5 font-marcellus text-[14px] text-maroon shadow">View on Google <Arrow size={13} /></span>
              </span>
            </a>
            <div className="card !rounded-2xl p-4 md:p-5">
              <h2 className="font-marcellus text-lg text-maroon">Visit the Ashram</h2>
              <p className="mt-1 flex gap-2 text-[15px] leading-snug"><Pin size={16} className="mt-0.5 shrink-0 text-gold" />{site.address}</p>
              <dl className="mt-3 grid grid-cols-1 gap-2 text-[15px] leading-snug sm:grid-cols-2">
                <div className="rounded-xl border border-goldlight/60 bg-paper/70 px-3 py-2">
                  <dt className="font-cinzel text-[10px] tracking-[0.15em] text-golddark">OFFICE HOURS</dt>
                  <dd>{site.officeHours}</dd>
                </div>
                <div className="rounded-xl border border-goldlight/60 bg-paper/70 px-3 py-2">
                  <dt className="font-cinzel text-[10px] tracking-[0.15em] text-golddark">GETTING HERE</dt>
                  <dd>Beside the Kaveri at Ganjam, Srirangapatna — about 16 km from Mysuru and 125 km from Bengaluru.</dd>
                </div>
              </dl>
              <p className="mt-2 text-[14px] text-ink/[.82]">Please message on WhatsApp before visiting so the office can confirm Guruji’s availability.</p>
            </div>
          </div>
          <EnquiryForm compact title="Send an Enquiry" />
        </div>
        <div className="mt-12"><Locations /></div>
      </section>
    </>
  )
}

/* ───────── Legal ───────── */
const legal: Record<string, { title: string; kn: string; body: [string, string][] }> = {
  privacy: {
    title: 'Privacy Policy', kn: 'ಗೌಪ್ಯತಾ ನೀತಿ',
    body: [
      ['Information we collect', 'When you submit an enquiry, your name, phone number, birth details and message are placed into a WhatsApp message that you send yourself. This website does not store these details on a server.'],
      ['How we use it', 'Your details are used only to respond to your enquiry, prepare your chart and arrange consultations. We never sell or share your personal data.'],
      ['Chat assistant', 'The chat on this website answers common questions from a fixed list. What you type stays in your browser and is not sent anywhere.'],
      ['Cookies & storage', 'We store only your language and theme preference in your browser. No advertising trackers are used.'],
      ['Your rights', `You may ask us to delete any information you have shared by writing to ${site.email}.`],
    ],
  },
  terms: {
    title: 'Terms & Conditions', kn: 'ನಿಯಮಗಳು ಮತ್ತು ಷರತ್ತುಗಳು',
    body: [
      ['Use of this website', 'Content is provided for spiritual and educational purposes. By using the site you agree to use it lawfully and respectfully.'],
      ['Consultations', 'Readings are given based on the birth details you provide. Accuracy depends on the correctness of those details.'],
      ['Intellectual property', `All text, artwork and recordings on this site belong to ${site.name} unless stated otherwise and may not be reproduced without permission. Scriptural verses are in the public domain.`],
      ['Changes', 'These terms may be updated from time to time. The latest version is always on this page.'],
    ],
  },
  disclaimer: {
    title: 'Disclaimer', kn: 'ಹಕ್ಕು ನಿರಾಕರಣೆ',
    body: [
      ['Nature of guidance', 'Vedic astrology (Jyotisha) offers spiritual and traditional guidance. It is not a substitute for medical, legal or psychological advice from qualified professionals.'],
      ['No guarantees', 'Predictions and remedies are given in good faith; outcomes depend on many factors including one’s own effort (purushartha) and divine grace. No specific result is guaranteed.'],
      ['Health & safety', 'Never stop or change medical treatment based on an astrological reading. In an emergency, contact local emergency services.'],
      ['Chat assistant', 'The chat gives general information only. For personal guidance, please speak to Guruji directly.'],
    ],
  },
}

export function Legal() {
  const loc = useLocale()
  const { page = 'privacy' } = useParams()
  const doc = legal[page]
  if (!doc) return <NotFound />
  return (
    <>
      <PageHero eyebrow={{ kn: 'ಕಾನೂನು', en: 'LEGAL' }} title={doc.title} hi={doc.kn} subtitle={`Last updated ${new Date(2026, 10, 1).toLocaleDateString(loc, { month: 'long', year: 'numeric' })}`} />
      <Section>
        <div className="card mx-auto max-w-3xl p-6 md:p-10">
          {doc.body.map(([h, p]) => (
            <div key={h} className="mb-6 last:mb-0">
              <h2 className="font-marcellus text-2xl">{h}</h2>
              <p className="mt-2 text-lg">{p}</p>
            </div>
          ))}
          <div className="mt-8 flex flex-wrap gap-2 border-t border-goldlight/60 pt-5">
            {Object.entries(legal).map(([k, v]) => <Link key={k} to={`/legal/${k}`} className={k === page ? 'btn-gold px-4 py-1.5' : 'btn-outline px-4 py-1.5'}>{v.title}</Link>)}
          </div>
        </div>
      </Section>
    </>
  )
}

import { NotFound } from './NotFound'
export { NotFound }
