import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FAQ_FALLBACK, FAQ_START, faqs, matchFaq, type Faq } from '../data/faq'
import { site, whatsappLink } from '../data/site'
import { translateText } from '../lib/translateDom'
import { LotusLogo } from './Decor'
import { Arrow, Chat as ChatIcon, Close, Phone, WhatsApp } from './Icons'

/** Chat built from a fixed list of questions & answers (src/data/faq.ts) — no AI, no API key. */
interface Msg { role: 'user' | 'bot'; content: string; faq?: Faq; contact?: boolean }
const GREETING: Msg = { role: 'bot', content: '🙏 Hari Om! I am Guruji’s website assistant. Ask me about Guruji, his services, homas, Guna Milan, events, the shop or how to reach him.' }

/** Direct Call + WhatsApp buttons. */
function ContactButtons() {
  return (
    <div className="mt-2 flex flex-wrap gap-1.5">
      <a href={site.phoneHref} className="btn-gold px-3 py-1.5 text-[14px]"><Phone size={15} /> Call Guruji</a>
      <a href={whatsappLink('🙏 Hari Om Guruji, I need your guidance.')} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 rounded-full bg-[#1DA851] px-3 py-1.5 text-[14px] font-semibold text-white shadow"><WhatsApp size={15} /> WhatsApp</a>
    </div>
  )
}

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState<Msg[]>([GREETING])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [all, setAll] = useState(false)
  const end = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { if (open) { end.current?.scrollIntoView({ block: 'nearest' }); inputRef.current?.focus() } }, [open, msgs, all])
  useEffect(() => {
    if (!open) return
    const k = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [open])

  /** Reply to typed text, or to a tapped question (faq given). */
  const ask = (text: string, picked?: Faq) => {
    text = text.trim()
    if (!text || busy) return
    const f = picked ?? matchFaq(text, translateText)
    setMsgs((m) => [...m, { role: 'user', content: text }])
    setInput(''); setBusy(true); setAll(false)
    window.setTimeout(() => {
      setMsgs((m) => [...m, f ? { role: 'bot', content: f.a, faq: f, contact: f.contact } : { role: 'bot', content: FAQ_FALLBACK, contact: true }])
      setBusy(false)
    }, 450)
  }

  const chips = all ? faqs.filter((f) => !f.hidden) : FAQ_START.map((id) => faqs.find((f) => f.id === id)!).filter((f) => !msgs.some((m) => m.faq?.id === f.id))

  return (
    <>
      <button onClick={() => setOpen((o) => !o)} aria-label={open ? 'Close chat' : 'Open chat'} data-id="ai-toggle" aria-expanded={open} title="Ask a question"
        className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-goldlight bg-paper text-golddark shadow-lg transition hover:scale-105 sm:h-14 sm:w-14">
        {open ? <Close size={22} /> : <ChatIcon size={25} />}
      </button>

      {open && (
        <div role="dialog" aria-label="Guruji’s Assistant"
          className="card fixed bottom-4 right-[84px] z-[70] flex h-[min(580px,calc(100svh-120px))] w-[min(390px,calc(100vw-100px))] flex-col overflow-hidden !rounded-2xl shadow-2xl max-sm:inset-x-3 max-sm:bottom-3 max-sm:top-[76px] max-sm:h-auto max-sm:w-auto"
          style={{ animation: 'chatpop .25s ease' }}>
          <style>{'@keyframes chatpop{from{opacity:0;transform:translateY(12px) scale(.97)}}'}</style>
          <div className="flex items-center gap-3 border-b border-goldlight/60 bg-paper/80 px-4 py-2.5">
            <LotusLogo className="h-7 w-9" />
            <div className="flex-1 leading-tight">
              <p className="font-marcellus text-[17px] text-maroon">Guruji’s Assistant</p>
              <p className="text-[12px] text-ink/[.88]">Quick answers from Guruji’s office</p>
            </div>
            <button onClick={() => setOpen(false)} className="pill h-8 w-8" aria-label="Close chat" data-id="chat-close"><Close size={14} /></button>
          </div>

          <div className="flex-1 space-y-2.5 overflow-y-auto p-3" aria-live="polite">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : ''}`}>
                <div className="max-w-[88%]">
                  <p data-no-translate={m.role === 'user' ? '' : undefined} className={`whitespace-pre-wrap rounded-2xl px-3.5 py-2 text-[16px] leading-snug ${m.role === 'user' ? 'rounded-br-md bg-gold text-white' : 'rounded-bl-md border border-goldlight bg-paper'}`}>{m.content}</p>
                  {m.faq?.link && (
                    <Link to={m.faq.link.to} onClick={() => setOpen(false)} className="btn-outline mt-2 inline-flex px-3 py-1 text-[14px]">{m.faq.link.label} <Arrow size={13} /></Link>
                  )}
                  {m.contact && <ContactButtons />}
                </div>
              </div>
            ))}
            {busy && <p className="px-1 text-sm text-ink/[.88]">Typing…</p>}
            {!busy && (
              <div className="pt-1">
                {chips.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {chips.map((f) => <button key={f.id} onClick={() => ask(translateText(f.q), f)} className="btn-outline px-3 py-1 text-left text-[13px] leading-snug">{f.q}</button>)}
                  </div>
                )}
                {!all && <button onClick={() => setAll(true)} className="mt-2 text-[13px] text-golddark underline">See all questions</button>}
              </div>
            )}
            <div ref={end} />
          </div>

          <form onSubmit={(e) => { e.preventDefault(); ask(input) }} className="flex gap-2 border-t border-goldlight/60 p-2.5">
            <label htmlFor="chatw-in" className="sr-only">Your message</label>
            <input id="chatw-in" ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} className="input !py-2 !text-[16px]" placeholder="Type your question…" maxLength={300} />
            <button className="btn-gold shrink-0 px-4" disabled={busy}>Send</button>
          </form>
          <a href={whatsappLink('🙏 Hari Om Guruji, I would like to make an enquiry.')} target="_blank" rel="noopener"
            className="flex items-center justify-center gap-1.5 border-t border-goldlight/40 py-1.5 text-[13px] text-ink/[.82] hover:text-golddark">
            <WhatsApp size={14} className="text-[#1DA851]" /> Prefer a person? Chat with the office on WhatsApp
          </a>
        </div>
      )}
    </>
  )
}
