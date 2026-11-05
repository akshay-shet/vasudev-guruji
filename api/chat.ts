// Vercel serverless function: POST /api/chat
// Set ANTHROPIC_API_KEY (and optionally ANTHROPIC_MODEL) in Vercel → Settings → Environment Variables.
import type { VercelRequest, VercelResponse } from '@vercel/node'

const SYSTEM = `You are the friendly website assistant for "Vasudev Guruji", a Vedic astrologer and spiritual teacher.
- Answer questions about Vedic astrology (Jyotisha): rashis, nakshatras, navagraha, Vimshottari dasha, Ashtakoota Guna Milan, Sade Sati, mantras, festivals, and the ashram's services.
- Be warm, concise (under 180 words), respectful and devotional in tone. Greet with "Hari Om" where natural.
- Do NOT make specific personal predictions; for personal readings, invite the user to send their birth details via the website's WhatsApp enquiry form.
- Never give medical, legal or financial advice; suggest consulting a qualified professional. Astrology is guidance, not a substitute.
- Services: Love, Marriage, Education, Career, Finance, Health, Black Magic (negative energy) Removal — all remedies are sattvic (mantra, puja, seva).
- If unsure, say so honestly.`

const LANG_NAMES: Record<string, string> = { en: 'English', kn: 'Kannada', te: 'Telugu', ta: 'Tamil', ml: 'Malayalam', mr: 'Marathi', hi: 'Hindi' }

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const key = process.env.ANTHROPIC_API_KEY
  if (!key) return res.status(500).json({ error: 'ANTHROPIC_API_KEY is not configured' })

  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
  const messages = Array.isArray(body?.messages) ? body.messages : []
  const clean = messages
    .filter((m: { role: string; content: unknown }) => (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .slice(-12)
    .map((m: { role: string; content: string }) => ({ role: m.role, content: m.content.slice(0, 2000) }))
  while (clean.length && clean[0].role !== 'user') clean.shift()
  if (!clean.length) return res.status(400).json({ error: 'No message' })

  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-5', max_tokens: 600, system: SYSTEM + `
- Reply only in ${LANG_NAMES[body?.lang] ?? 'English'}, in that language's own script.`, messages: clean }),
    })
    const data = await r.json()
    if (!r.ok) return res.status(502).json({ error: data?.error?.message || 'Upstream error' })
    const reply = (data.content || []).filter((c: { type: string }) => c.type === 'text').map((c: { text: string }) => c.text).join('\n')
    return res.status(200).json({ reply })
  } catch {
    return res.status(500).json({ error: 'Assistant unavailable' })
  }
}
