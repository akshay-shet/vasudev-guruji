import { useEffect, useMemo, useState } from 'react'
import { fmt, fmtKn, kaalsFor, MONTH_KN, PLACE, WEEKDAY_EN, WEEKDAY_KN } from '../lib/kaal'
import { Close, Sun } from './Icons'

const KEY = 'vg-kaal-seen'
/** Other parts of the site (e.g. the footer link) can open the card with: window.dispatchEvent(new Event('vg:kaal')) */
export const openKaal = () => window.dispatchEvent(new Event('vg:kaal'))

const dayKey = (d: Date) => d.toISOString().slice(0, 10)

/** Pops up once a day with today's Rahu, Gulika and Yamaganda Kaal — English and Kannada. */
export function KaalPopup() {
  const [open, setOpen] = useState(false)
  const [now, setNow] = useState(() => new Date())
  const day = useMemo(() => kaalsFor(now), [now])

  useEffect(() => {
    let seen = ''
    try { seen = localStorage.getItem(KEY) ?? '' } catch { /* storage blocked: still show */ }
    // wait for the temple-door intro to finish before showing
    const t = seen === dayKey(day.date) ? 0 : window.setTimeout(() => { setNow(new Date()); setOpen(true) }, 3500)
    const reopen = () => { setNow(new Date()); setOpen(true) }
    window.addEventListener('vg:kaal', reopen)
    return () => { if (t) clearTimeout(t); window.removeEventListener('vg:kaal', reopen) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!open) return
    const tick = window.setInterval(() => setNow(new Date()), 60_000)
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && close()
    window.addEventListener('keydown', esc)
    return () => { clearInterval(tick); window.removeEventListener('keydown', esc) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const close = () => {
    setOpen(false)
    try { localStorage.setItem(KEY, dayKey(day.date)) } catch { /* ignore */ }
  }
  if (!open) return null

  const d = day.date
  const dateEn = `${WEEKDAY_EN[day.weekday]}, ${d.getUTCDate()} ${d.toLocaleString('en-IN', { month: 'long', timeZone: 'UTC' })} ${d.getUTCFullYear()}`
  const dateKn = `${WEEKDAY_KN[day.weekday]}, ${d.getUTCDate()} ${MONTH_KN[d.getUTCMonth()]} ${d.getUTCFullYear()}`

  return (
    <div role="dialog" aria-modal="false" aria-labelledby="kaal-title"
      className="fixed bottom-3 left-3 right-[76px] z-[65] max-w-[380px] overflow-hidden rounded-2xl border border-goldlight bg-paper shadow-[0_20px_50px_-12px_rgba(90,30,8,.55)] sm:bottom-5 sm:left-5 sm:right-auto sm:w-[380px]"
      style={{ animation: 'chatpop .3s ease' }}>
      <div className="flex items-start gap-3 px-4 pb-2.5 pt-3.5 text-white" style={{ background: 'linear-gradient(135deg,#8E2412,#5E160A)' }}>
        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-goldlight"><Sun size={20} /></span>
        <div className="min-w-0 flex-1 leading-tight">
          <p id="kaal-title" className="font-marcellus text-[17px]">Today’s Inauspicious Times</p>
          <p lang="kn" data-no-translate className="font-kn text-[14.5px] text-goldlight">ಇಂದಿನ ರಾಹು ಕಾಲ, ಗುಳಿಕ ಕಾಲ, ಯಮಗಂಡ ಕಾಲ</p>
          <p className="mt-1 text-[12.5px] text-white/80">{dateEn}</p>
          <p lang="kn" data-no-translate className="font-kn text-[12.5px] text-white/80">{dateKn}</p>
        </div>
        <button onClick={close} aria-label="Close" className="-mr-1 -mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white/85 hover:bg-white/15"><Close size={14} /></button>
      </div>

      <ul className="divide-y divide-goldlight/50 px-4">
        {day.kaals.map((k) => {
          const live = day.nowHours >= k.start && day.nowHours < k.end
          const over = day.nowHours >= k.end
          return (
            <li key={k.key} className={`flex items-center justify-between gap-3 py-2.5 ${over ? 'opacity-60' : ''}`}>
              <div className="leading-tight">
                <p className="font-marcellus text-[16px] text-maroon">{k.en}
                  {live && <span className="ml-2 rounded-full bg-[#B0321A] px-2 py-0.5 align-middle font-sans text-[10.5px] font-semibold uppercase tracking-wide text-white">Now</span>}
                </p>
                <p lang="kn" data-no-translate className="font-kn text-[14px] text-golddark">{k.kn}</p>
              </div>
              <div className="text-right leading-tight">
                <p className="whitespace-nowrap font-marcellus text-[15px] text-ink" data-no-translate>{fmt(k.start)} – {fmt(k.end)}</p>
                <p lang="kn" data-no-translate className="whitespace-nowrap font-kn text-[12.5px] text-ink/75">{fmtKn(k.start)} – {fmtKn(k.end)}</p>
              </div>
            </li>
          )
        })}
      </ul>

      <div className="border-t border-goldlight/50 bg-cream/60 px-4 py-2 text-[12px] leading-snug text-ink/75">
        <p>Avoid starting new or auspicious work in these periods. Sunrise {fmt(day.sunrise)} · Sunset {fmt(day.sunset)} at {PLACE.name}.</p>
        <p lang="kn" data-no-translate className="font-kn">ಈ ಸಮಯದಲ್ಲಿ ಹೊಸ ಅಥವಾ ಶುಭ ಕಾರ್ಯ ಆರಂಭಿಸಬೇಡಿ. ಸೂರ್ಯೋದಯ {fmtKn(day.sunrise)} · ಸೂರ್ಯಾಸ್ತ {fmtKn(day.sunset)} ({PLACE.kn}).</p>
      </div>
    </div>
  )
}
