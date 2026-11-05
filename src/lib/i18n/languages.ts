export type Lang = 'en' | 'kn' | 'te' | 'ta' | 'ml' | 'mr' | 'hi'

export const LANGUAGES: { code: Lang; native: string; short: string; locale: string; english: string }[] = [
  { code: 'kn', native: 'ಕನ್ನಡ', short: 'ಕ', locale: 'kn-IN', english: 'Kannada' },
  { code: 'en', native: 'English', short: 'EN', locale: 'en-IN', english: 'English' },
  { code: 'te', native: 'తెలుగు', short: 'తె', locale: 'te-IN', english: 'Telugu' },
  { code: 'ta', native: 'தமிழ்', short: 'த', locale: 'ta-IN', english: 'Tamil' },
  { code: 'ml', native: 'മലയാളം', short: 'മ', locale: 'ml-IN', english: 'Malayalam' },
  { code: 'mr', native: 'मराठी', short: 'म', locale: 'mr-IN', english: 'Marathi' },
  { code: 'hi', native: 'हिन्दी', short: 'हि', locale: 'hi-IN', english: 'Hindi' },
]
export const isLang = (s: string | null): s is Lang => LANGUAGES.some((l) => l.code === s)
