import { Link } from 'react-router-dom'
import { EnquiryForm, PageHero, Section, SectionTitle } from '../components/Common'
import { Diamond, GurujiPhoto } from '../components/Decor'
import { Arrow } from '../components/Icons'
import { site } from '../data/site'

export default function About() {
  return (
    <>
      <PageHero eyebrow={{ kn: 'ಗುರೂಜಿ', en: 'ABOUT GURUJI' }} keyword="Trusted Astrologer for Life Problems" title="About Guruji" hi="ಗುರೂಜಿ ಬಗ್ಗೆ" subtitle={site.shortBio} />

      <Section>
        <div className="grid items-center gap-10 md:grid-cols-[1fr_1.2fr]">
          <div className="relative mx-auto w-full max-w-[400px] rounded-t-[200px] p-[6px] shadow-glow" style={{ background: 'linear-gradient(135deg,#F6DA8E,#C58B2D 40%,#F2CF7E 60%,#93600F)' }}>
            <GurujiPhoto className="aspect-[540/770] w-full rounded-t-[195px] object-cover" />
          </div>
          <div>
            <h2 className="section-title">{site.name}</h2>
            <Diamond className="mt-2 h-3 w-28" />
            {site.biography.map((p) => <p key={p.slice(0, 20)} className="mt-4 text-xl">{p}</p>)}
          </div>
        </div>
      </Section>

      <Section>
        <div className="card relative overflow-hidden p-6 text-center md:p-10">
          <p className="font-cinzel text-xs tracking-[0.3em] text-gold">THE MEANING OF “VASUDEV”</p>
          <p className="mt-4 font-deva text-2xl leading-relaxed text-maroon md:text-3xl">
            ಬಹೂನಾಂ ಜನ್ಮನಾಮನ್ತೇ ಜ್ಞಾನವಾನ್ಮಾಂ ಪ್ರಪದ್ಯತೇ ।<br />ವಾಸುದೇವಃ ಸರ್ವಮಿತಿ ಸ ಮಹಾತ್ಮಾ ಸುದುರ್ಲಭಃ ॥
          </p>
          <p className="mt-2 font-cinzel text-xs tracking-widest text-ink/70">BHAGAVAD GITA 7.19</p>
          <p className="mx-auto mt-4 max-w-3xl text-xl italic">
            “After many births, the one who has realised wisdom surrenders to Me, knowing <b>‘Vasudeva is all that is’</b>. Such a great soul is very rare.”
          </p>
          <Diamond className="mx-auto my-6 h-3 w-28" />
          <div className="mx-auto grid max-w-4xl gap-6 text-left md:grid-cols-3">
            <div>
              <h3 className="font-marcellus text-xl">Vasu + Deva</h3>
              <p className="mt-1 text-lg">From <i>vas</i>, “to dwell”: the Divine who dwells in all beings and in whom all beings dwell — the shining (<i>deva</i>) indweller.</p>
            </div>
            <div>
              <h3 className="font-marcellus text-xl">Son of Vasudeva</h3>
              <p className="mt-1 text-lg">Lord Krishna is called Vāsudeva as the son of Vasudeva. In Gita 10.37 He says, <span className="font-deva">“ವೃಷ್ಣೀನಾಂ ವಾಸುದೇವೋಽಸ್ಮಿ”</span> — “Among the Vrishnis, I am Vāsudeva.”</p>
            </div>
            <div>
              <h3 className="font-marcellus text-xl">Vasudevah Sarvam</h3>
              <p className="mt-1 text-lg">The name is a reminder of the goal of all spiritual life — to see the one Divine in everyone, and to serve all as worship.</p>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <SectionTitle eyebrow={{ kn: 'ಪರಂಪರೆ', en: 'PARAMPARA' }} kn="ಗುರು ಪರಂಪರೆ" sub="The tradition that shapes Guruji’s teaching.">Lineage &amp; Parampara</SectionTitle>
        <ol className="relative mx-auto max-w-3xl border-l-2 border-goldlight pl-8">
          {site.lineage.map((l, i) => (
            <li key={l.title} className="relative mb-8">
              <span className="absolute -left-[45px] flex h-8 w-8 items-center justify-center rounded-full border-2 border-gold bg-paper font-marcellus text-golddark">{i + 1}</span>
              <h3 className="font-marcellus text-2xl">{l.title}</h3>
              <p className="mt-1 text-lg">{l.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <Link to="/discourses" className="btn-gold px-6 py-2.5">Watch Videos <Arrow size={18} /></Link>
          <Link to="/contact" className="btn-outline px-6 py-2.5">Contact Guruji’s Office</Link>
        </div>
      </Section>

      <Section><div className="mx-auto max-w-3xl"><EnquiryForm title="Write to Guruji’s Office" /></div></Section>
    </>
  )
}
