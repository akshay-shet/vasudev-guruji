// Regenerates the chatbot's knowledge base inside api/chat.ts from src/data/*.ts
// Run: npm run kb   (runs automatically before every build)
import { build } from 'esbuild'
import { readFileSync, writeFileSync } from 'node:fs'

const out = await build({
  stdin: { contents: "export * from './src/data/content'; export { site } from './src/data/site'", resolveDir: process.cwd(), loader: 'ts' },
  bundle: true, write: false, format: 'esm', platform: 'node', define: { 'import.meta.env.BASE_URL': '"/"' },
})
const mod = await import('data:text/javascript;base64,' + Buffer.from(out.outputFiles[0].text).toString('base64'))
const { site, services, homas, places, events, products, discourses, nav } = mod

const kb = [
  `NAME: ${site.name}`,
  `PHONE / CALL: ${site.phone}`,
  `WHATSAPP: ${site.phone} (https://wa.me/${site.whatsapp})`,
  `EMAIL: ${site.email}`,
  `MAIN ADDRESS: ${site.address}`,
  `OFFICE HOURS: ${site.officeHours}`,
  `ABOUT GURUJI: ${site.shortBio} ${site.biography.join(' ')}`,
  `WEBSITE PAGES: ${nav.map((n) => `${n.label} (${n.to})`).join(', ')}`,
  '',
  'SERVICES:',
  ...services.map((s) => `- ${s.title} [/services/${s.slug}]: ${s.desc} ${s.points.join('; ')}.`),
  '',
  'HOMAS (book on WhatsApp, page /homa):',
  ...homas.map((h) => `- ${h.name} — ${h.deity}. ${h.desc} Benefits: ${h.benefits.join('; ')}. Best time: ${h.when}.`),
  '',
  'LOCATIONS WHERE GURUJI IS AVAILABLE:',
  ...places.map((p) => `- ${p.city}, ${p.state}${p.main ? ' (MAIN CENTRE)' : ''}: ${p.address ? p.address + '. ' : ''}${p.note} Map: ${p.map}`),
  '',
  'UPCOMING EVENTS (page /events):',
  ...events.map((e) => `- ${e.title} — ${e.date.slice(0, 10)}${e.end ? ' to ' + e.end : ''}, ${e.place}. ${e.description}`),
  '',
  'SHOP ITEMS (no prices on the website — enquire on WhatsApp, page /shop):',
  ...products.map((p) => `- ${p.name} (${p.category}): ${p.description}`),
  '',
  'DISCOURSE VIDEOS (page /discourses):',
  ...discourses.map((d) => `- ${d.title} (${d.series}): ${d.description}`),
  `- Latest discourse: ${site.latestDiscourse.title}`,
  '',
  'TOOLS ON THE WEBSITE: Guna Milan (Kundali matching) calculator at /kundali-matching; Rashi Chakra on the home page; Japa mala counter and Light-a-Diya at /mantras; enquiry form that sends to WhatsApp on most pages.',
].join('\n')

const file = 'api/chat.ts'
const src = readFileSync(file, 'utf8')
const next = src.replace(/(\/\/ KB-START\n)[\s\S]*?(\n\/\/ KB-END)/, `$1const KB = ${JSON.stringify(kb)}$2`)
writeFileSync(file, next)
console.log(`knowledge base: ${kb.length} chars written to ${file}`)
