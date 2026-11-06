import { EnquiryForm, PageHero, Section, SectionTitle } from '../components/Common'
import { LifeLineAreas, LifeLineBook, LifeLineContents, LifeLineOffer } from '../components/LifeLine'
import { iconByName } from '../components/Icons'
import { lifeline } from '../data/lifeline'

export default function LifeLinePage() {
  return (
    <>
      <PageHero compact eyebrow={{ kn: 'ಗುರೂಜಿ ವಿಶೇಷ', en: 'GURUJI SPECIAL' }} title={lifeline.title} hi={lifeline.kn} subtitle={`${lifeline.tagline} — ${lifeline.pages}`} />
      <Section className="!pt-4">
        <div className="card grid items-center gap-8 p-5 sm:p-8 lg:grid-cols-[minmax(240px,330px)_1fr] lg:gap-12">
          <div className="mx-auto w-[64%] max-w-[320px] sm:w-[44%] lg:w-full"><LifeLineBook /></div>
          <div>
            <p className="text-[18px] leading-relaxed text-ink/[.9]">{lifeline.intro}</p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-3">
              {lifeline.highlights.map((h) => {
                const I = iconByName[h.icon]
                return (
                  <li key={h.title} className="rounded-xl border border-goldlight/70 bg-paper p-3">
                    <I size={22} className="text-golddark" />
                    <b className="mt-1 block font-marcellus text-[17px] font-normal leading-tight text-maroon">{h.title}</b>
                    <span className="mt-1 block text-[15px] leading-snug text-ink/[.88]">{h.text}</span>
                  </li>
                )
              })}
            </ul>
            <div className="mt-5"><LifeLineOffer /></div>
          </div>
        </div>
      </Section>
      <Section>
        <SectionTitle eyebrow={{ kn: 'ಎಲ್ಲಾ ಕ್ಷೇತ್ರಗಳು', en: 'WHAT IT COVERS' }} kn="ಜೀವನದ ಎಲ್ಲಾ ಕ್ಷೇತ್ರಗಳು">360-Degree Coverage</SectionTitle>
        <LifeLineAreas />
      </Section>
      <Section>
        <SectionTitle eyebrow={{ kn: 'ಪುಸ್ತಕದ ಒಳಗೆ', en: 'INSIDE THE BOOK' }} kn="ಸಂಪೂರ್ಣ ಜೀವನ ವರದಿ">Full Life Report</SectionTitle>
        <div className="card p-5 sm:p-7"><LifeLineContents cols={3} /></div>
      </Section>
      <Section>
        <SectionTitle eyebrow={{ kn: 'ಆರ್ಡರ್ ಮಾಡುವುದು ಹೇಗೆ', en: 'HOW TO ORDER' }} kn="ಇಂದೇ ಆರ್ಡರ್ ಮಾಡಿ"
          sub="Take control of your future with actionable guidance tailored specifically for you. Click below to place your order directly via WhatsApp.">Order Your Report</SectionTitle>
        <div className="mx-auto max-w-xl"><LifeLineOffer center /></div>
      </Section>
      <Section className="!pt-2"><div className="mx-auto max-w-3xl"><EnquiryForm defaultTopic="Horoscope Reading" title="Have a question first?" /></div></Section>
    </>
  )
}
