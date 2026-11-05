import type { Lang } from './languages'

/**
 * Converts Kannada-script text (Sanskrit shlokas, mantras, rashi names) into
 * the script of the chosen language. Indic Unicode blocks share one layout,
 * so this is a fixed offset — except Tamil, which lacks some letters.
 */
const OFFSET: Partial<Record<Lang, number>> = { te: -0x80, ml: 0x80, hi: -0x380, mr: -0x380 }
const KN = /[ಀ-೿]/

// Tamil: map Kannada letters with no Tamil equivalent to the nearest Tamil letter.
const TA: Record<string, string> = {
  'ಖ': 'க', 'ಗ': 'க', 'ಘ': 'க', 'ಛ': 'ச', 'ಝ': 'ஜ', 'ಠ': 'ட', 'ಡ': 'ட', 'ಢ': 'ட', 'ಥ': 'த', 'ದ': 'த', 'ಧ': 'த',
  'ಫ': 'ப', 'ಬ': 'ப', 'ಭ': 'ப', 'ಂ': 'ம்', 'ಃ': 'ஃ', 'ೃ': '்ரு', 'ಋ': 'ரு', 'ೞ': 'ழ',
}

export function toScript(text: string, lang: Lang): string {
  if (lang === 'en' || lang === 'kn' || !KN.test(text)) return text
  let out = ''
  for (const ch of text) {
    const c = ch.codePointAt(0)!
    if (c < 0x0c80 || c > 0x0cff) { out += ch; continue }
    if (lang === 'ta') out += TA[ch] ?? String.fromCodePoint(c - 0x100)
    else out += String.fromCodePoint(c + (OFFSET[lang] ?? 0))
  }
  return out
}
