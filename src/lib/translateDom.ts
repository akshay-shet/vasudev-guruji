/**
 * Language layer. When a language other than English is active, every visible
 * English text node and text attribute (placeholder, aria-label, title, alt) is
 * replaced from that language's dictionary in src/lib/i18n/<lang>.ts, and any
 * Kannada-script Sanskrit is converted to the language's own script.
 * Switching back to English restores the originals.
 */
import kn from './i18n/kn'
import { nakshatras, rashis } from '../data/vedic'
import type { Lang } from './i18n/languages'
import { toScript } from './i18n/script'

type Dict = { exact: Record<string, string>; phrases: Record<string, string> }
const loaders = import.meta.glob<{ default: Dict }>('./i18n/[a-z][a-z].ts')
const cache: Partial<Record<Lang, Dict>> = { kn }

const norm = (s: string) => s.replace(/\s+/g, ' ').trim().toLowerCase()
const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const LATIN = /[A-Za-z]/
const EMAIL = /[\w.+-]+@[\w-]+(?:\.[\w-]+)+/g

let cur: Lang = 'en'
let exact = new Map<string, string>()
let phraseMap = new Map<string, string>()
let phraseRe: RegExp | null = null

function build(lang: Lang, d: Dict) {
  exact = new Map()
  Object.entries(d.exact).forEach(([k, v]) => exact.set(norm(k), v))
  phraseMap = new Map()
  nakshatras.forEach((n) => phraseMap.set(n.name.toLowerCase(), toScript(n.deva, lang)))
  rashis.forEach((r) => { const v = toScript(r.kn, lang); phraseMap.set(r.name.toLowerCase(), v); phraseMap.set(r.english.toLowerCase(), v) })
  Object.entries(d.phrases).forEach(([k, v]) => phraseMap.set(k.toLowerCase(), v))
  phraseRe = new RegExp('(?<![A-Za-z])(' + [...phraseMap.keys()].sort((a, b) => b.length - a.length).map(esc).join('|') + ')(?![A-Za-z])', 'gi')
}

/** Translate one English string into the active language. */
export function translateText(s: string): string {
  if (cur === 'en' || !s) return s
  let res = s
  if (LATIN.test(s) && !/https?:|www\./.test(s)) {
    const lead = s.match(/^\s*/)![0]
    const trail = s.match(/\s*$/)![0]
    const emails: string[] = []
    const core = s.trim().replace(EMAIL, (m) => { emails.push(m); return '{email}' })
    if (core !== '{email}') {
      const hit = exact.get(norm(core))
      const out = hit !== undefined ? hit : core.replace(phraseRe!, (m) => phraseMap.get(m.toLowerCase()) ?? m)
      let i = 0
      res = lead + out.replace(/\{email\}/g, () => emails[i++] ?? '') + trail
    }
  }
  return toScript(res, cur)
}

const ATTRS = ['placeholder', 'aria-label', 'title', 'alt']
const SKIP = 'script,style,textarea,[data-no-translate]'
const origText = new Map<Text, string>()
const origAttr = new Map<Element, Record<string, string>>()
let written = new WeakMap<Node, string>()
let writtenAttr = new WeakMap<Element, Record<string, string>>()
let observer: MutationObserver | null = null
let origTitle: string | null = null

function doText(n: Text) {
  const v = n.nodeValue ?? ''
  if (written.get(n) === v) return
  const p = n.parentElement
  if (!p || p.closest(SKIP)) return
  const t = translateText(v)
  if (t === v) return
  origText.set(n, v)
  written.set(n, t)
  n.nodeValue = t
}
function doAttrs(el: Element) {
  if (el.closest(SKIP)) return
  for (const a of ATTRS) {
    const v = el.getAttribute(a)
    if (v == null) continue
    const w = writtenAttr.get(el) ?? {}
    if (w[a] === v) continue
    const t = translateText(v)
    if (t === v) continue
    const o = origAttr.get(el) ?? {}
    o[a] = v
    origAttr.set(el, o)
    w[a] = t
    writtenAttr.set(el, w)
    el.setAttribute(a, t)
  }
}
function walk(root: Node) {
  if (root.nodeType === Node.TEXT_NODE) return doText(root as Text)
  if (root.nodeType !== Node.ELEMENT_NODE) return
  doAttrs(root as Element)
  const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT)
  let n: Node | null
  while ((n = tw.nextNode())) {
    if (n.nodeType === Node.TEXT_NODE) doText(n as Text)
    else doAttrs(n as Element)
  }
}

function restore() {
  observer?.disconnect()
  observer = null
  origText.forEach((v, n) => { if (n.isConnected && written.get(n) === n.nodeValue) n.nodeValue = v })
  origAttr.forEach((o, el) => {
    if (!el.isConnected) return
    const w = writtenAttr.get(el) ?? {}
    Object.entries(o).forEach(([a, v]) => { if (el.getAttribute(a) === w[a]) el.setAttribute(a, v) })
  })
  origText.clear(); origAttr.clear()
  written = new WeakMap(); writtenAttr = new WeakMap()
  if (origTitle) { document.title = origTitle; origTitle = null }
}

function start() {
  walk(document.body)
  observer = new MutationObserver((muts) => {
    for (const m of muts) {
      if (m.type === 'characterData') doText(m.target as Text)
      else if (m.type === 'attributes') doAttrs(m.target as Element)
      else m.addedNodes.forEach(walk)
    }
  })
  observer.observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ATTRS })
}

let seq = 0
/** Switch the whole page to a language. Dictionaries other than Kannada load on demand. */
export async function setLanguage(lang: Lang) {
  const my = ++seq
  let d = cache[lang]
  if (lang !== 'en' && !d) {
    const load = loaders[`./i18n/${lang}.ts`]
    d = load ? (await load()).default : { exact: {}, phrases: {} }
    cache[lang] = d
    if (my !== seq) return
  }
  restore()
  cur = lang
  if (lang === 'en') return
  build(lang, d!)
  start()
}
