import { EnquiryForm, PageHero, Section, SectionTitle } from '../components/Common'
import { BiText, BookContents, LifeLineAreas, LifeLineBook, LifeLineOffer } from '../components/LifeLine'
import { lifeline } from '../data/lifeline'

export default function LifeLinePage() {
  return (
    <>
      <PageHero compact eyebrow={{ kn: 'ಗುರೂಜಿ ವಿಶೇಷ', en: 'GURUJI SPECIAL' }} title={lifeline.title.en} hi={lifeline.title.kn} />
      <Section className="!pt-4">
        <div className="card grid items-center gap-8 p-5 sm:p-8 lg:grid-cols-[minmax(240px,330px)_1fr] lg:gap-12">
          <div className="mx-auto w-[60%] max-w-[320px] sm:w-[42%] lg:w-full"><LifeLineBook /></div>
          <div>
            <h2 className="font-cormorant text-[28px] font-bold italic leading-tight text-maroon sm:text-[34px]"><BiText t={lifeline.tagline} knClass="text-[0.66em] mt-1" /></h2>
            <p className="mt-3 text-[17px] leading-relaxed text-ink/[.9] sm:text-[18px]"><BiText t={lifeline.intro} knClass="text-[0.9em] mt-2 leading-relaxed" /></p>
            <div className="mt-5"><LifeLineOffer /></div>
          </div>
        </div>
      </Section>
      <Section>
        <SectionTitle eyebrow={{ kn: 'ಎಲ್ಲಾ ಕ್ಷೇತ್ರಗಳು', en: 'WHAT IT COVERS' }} kn={lifeline.labels.coverage.kn}>{lifeline.labels.coverage.en}</SectionTitle>
        <LifeLineAreas />
      </Section>
      <Section>
        <SectionTitle eyebrow={{ kn: 'ಪುಸ್ತಕದ ಒಳಗೆ', en: 'INSIDE THE BOOK' }} kn={lifeline.labels.contents.kn}>{lifeline.labels.contents.en}</SectionTitle>
        <BookContents />
      </Section>
      <Section>
        <SectionTitle eyebrow={{ kn: 'ಆರ್ಡರ್ ಮಾಡುವುದು ಹೇಗೆ', en: 'HOW TO ORDER' }} kn={lifeline.labels.order.kn}>{lifeline.labels.order.en}</SectionTitle>
        <p className="mx-auto -mt-4 mb-6 max-w-2xl text-center text-lg text-ink/[.88]"><BiText t={lifeline.labels.orderText} knClass="text-[0.88em] mt-1.5" /></p>
        <div className="mx-auto max-w-xl"><LifeLineOffer center /></div>
      </Section>
      <Section className="!pt-2"><div className="mx-auto max-w-3xl"><EnquiryForm defaultTopic="Horoscope Reading" title="Have a question first?" /></div></Section>
    </>
  )
}
