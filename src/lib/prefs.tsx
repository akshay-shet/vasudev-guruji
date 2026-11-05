import { createContext, useContext, useEffect, useLayoutEffect, useState, type ReactNode } from 'react'
import { setLanguage } from './translateDom'
import { isLang, LANGUAGES, type Lang } from './i18n/languages'

type Theme = 'day' | 'night'
export type { Lang }
interface Prefs { lang: Lang; setLang: (l: Lang) => void; theme: Theme; toggleTheme: () => void }

const Ctx = createContext<Prefs>(null as unknown as Prefs)

// Language: English every time the site is opened; a switch to English lasts for this visit only.
const readLang = (): Lang => { try { const v = sessionStorage.getItem('vg-lang'); return isLang(v) ? v : 'en' } catch { return 'en' } }
const writeLang = (l: Lang) => { try { sessionStorage.setItem('vg-lang', l) } catch { /* ignore */ } }

export function PrefsProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readLang)
  const [theme, setTheme] = useState<Theme>(() => { try { return sessionStorage.getItem('vg-theme') === 'night' ? 'night' : 'day' } catch { return 'day' } })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'night' ? '#0E0B1F' : '#FFF8EA')
    // Light (day) mode every time the site is opened; a switch to night lasts for this visit only.
    try { sessionStorage.setItem('vg-theme', theme) } catch { /* ignore */ }
  }, [theme])
  useLayoutEffect(() => {
    document.documentElement.lang = lang
    writeLang(lang)
    void setLanguage(lang)
  }, [lang])

  return (
    <Ctx.Provider value={{ lang, setLang: setLangState, theme, toggleTheme: () => setTheme((t) => (t === 'day' ? 'night' : 'day')) }}>
      {children}
    </Ctx.Provider>
  )
}
export const usePrefs = () => useContext(Ctx)
/** Locale for dates and numbers. */
export const useLocale = () => LANGUAGES.find((l) => l.code === usePrefs().lang)!.locale

/** Tiny bilingual helper: t('English', 'ಹಿನ್ದೀ') */
export function useT() {
  const { lang } = usePrefs()
  return (en: string, hi?: string) => (lang === 'kn' && hi ? hi : en)
}
