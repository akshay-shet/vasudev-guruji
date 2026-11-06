import { useEffect, useRef, useState } from 'react'
import { site, whatsappLink } from '../data/site'
import { usePrefs } from '../lib/prefs'
import { translateText } from '../lib/translateDom'
import { LotusLogo } from './Decor'
import { Chat as ChatIcon, Close, Phone, WhatsApp } from './Icons'

interface Msg { role: 'user' | 'assistant'; content: string; ai?: boolean; contact?: boolean }
const GREETING: Msg = { role: 'assistant', content: '🙏 Hari Om! I am Guruji’s website assistant. Ask me about Guruji, his services, homas, Guna Milan, events, the shop or how to reach him.' }
/** Direct Call + WhatsApp buttons shown under a reply when the assistant hands over to Guruji. */
function ContactButtons() {
  return (
    <div className="mt-2 flex flex-wrap gap-1.5">
      <a href={site.phoneHref} className="btn-gold px-3 py-1.5 text-[14px]"><Phone size={15} /> Call Guruji</a>
      <a href={whatsappLink('🙏 Hari Om Guruji, I need your guidance.')} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 rounded-full bg-[#1DA851] px-3 py-1.5 text-[14px] font-semibold text-white shadow"><WhatsApp size={15} /> WhatsApp</a>
    </div>
  )
}

const suggestions = ['Which homa removes obstacles?', 'How does Guna Milan work?', 'Where is Guruji available?', 'Upcoming events?']

/** Floating AI chat — opens as a popup on the same page. */
export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const { lang } = usePrefs()
  const [msgs, setMsgs] = useState<Msg[]>([GREETING])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const end = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { if (open) { end.current?.scrollIntoView({ block: 'nearest' }); inputRef.current?.focus() } }, [open, msgs])
  useEffect(() => {
    if (!open) return
    const k = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [open])

  const send = async (text: string) => {
    text = text.trim()
    if (!text || busy) return
    const next = [...msgs, { role: 'user' as const, content: text }]
    setMsgs(next); setInput(''); setBusy(true)
    try {
      const r = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ lang, messages: next.slice(1).map(({ role, content }) => ({ role, content })).slice(-12) }) })
      if (!r.ok) throw new Error(String(r.status))
      const data = await r.json()
      setMsgs((m) => [...m, { role: 'assistant', content: data.reply || '…', ai: true, contact: !!data.contact }])
    } catch {
      setMsgs((m) => [...m, { role: 'assistant', content: 'The assistant is not available right now. Please call or WhatsApp Guruji’s office directly — we will be happy to help. 🙏', contact: true }])
    } finally { setBusy(false) }
  }

  return (
    <>
      <button onClick={() => setOpen((o) => !o)} aria-label={open ? 'Close AI assistant' : 'Open AI assistant'} data-id="ai-toggle" aria-expanded={open} title="Ask the AI assistant"
        className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-goldlight bg-paper text-golddark shadow-lg transition hover:scale-105">
        {open ? <Close size={24} /> : <ChatIcon size={28} />}
      </button>

      {open && (
        <div role="dialog" aria-label="Guruji’s AI assistant"
          className="card fixed bottom-4 right-[84px] z-[70] flex h-[min(560px,calc(100svh-120px))] w-[min(380px,calc(100vw-100px))] flex-col overflow-hidden !rounded-2xl shadow-2xl max-sm:inset-x-3 max-sm:bottom-3 max-sm:top-[76px] max-sm:h-auto max-sm:w-auto"
          style={{ animation: 'chatpop .25s ease' }}>
          <style>{'@keyframes chatpop{from{opacity:0;transform:translateY(12px) scale(.97)}}'}</style>
          <div className="flex items-center gap-3 border-b border-goldlight/60 bg-paper/80 px-4 py-2.5">
            <LotusLogo className="h-7 w-9" />
            <div className="flex-1 leading-tight">
              <p className="font-marcellus text-[17px] text-maroon">Guruji’s Assistant</p>
              <p className="text-[12px] text-ink/[.88]">AI · general guidance only</p>
            </div>
            <button onClick={() => setOpen(false)} className="pill h-8 w-8" aria-label="Close chat" data-id="chat-close"><Close size={14} /></button>
          </div>

          <div className="flex-1 space-y-2.5 overflow-y-auto p-3" aria-live="polite">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : ''}`}>
                <div className="max-w-[85%]">
                  <p data-no-translate={m.ai || m.role === 'user' ? '' : undefined} className={`whitespace-pre-wrap rounded-2xl px-3.5 py-2 text-[16px] leading-snug ${m.role === 'user' ? 'rounded-br-md bg-gold text-white' : 'rounded-bl-md border border-goldlight bg-paper'}`}>{m.content}</p>
                  {m.contact && <ContactButtons />}
                </div>
              </div>
            ))}
            {busy && <p className="px-1 text-sm text-ink/[.88]">Typing…</p>}
            {msgs.length === 1 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {suggestions.map((s) => <button key={s} onClick={() => send(translateText(s))} className="btn-outline px-3 py-1 text-[13px]">{s}</button>)}
              </div>
            )}
            <div ref={end} />
          </div>

          <form onSubmit={(e) => { e.preventDefault(); send(input) }} className="flex gap-2 border-t border-goldlight/60 p-2.5">
            <label htmlFor="chatw-in" className="sr-only">Your message</label>
            <input id="chatw-in" ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} className="input !py-2 !text-[16px]" placeholder="Type your question…" maxLength={800} />
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
