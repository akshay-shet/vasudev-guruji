/**
 * Daily Rahu Kaal, Gulika Kaal and Yamaganda Kaal.
 * The day (sunrise → sunset) is split into 8 equal parts; each weekday has a fixed part for each kaal.
 * Sunrise/sunset are calculated for Guruji's centre (Srirangapatna, Mandya) in IST, so the times are the
 * same for every visitor and match Karnataka panchangas.
 */
export const PLACE = { name: 'Srirangapatna, Mandya', kn: 'ಶ್ರೀರಂಗಪಟ್ಟಣ, ಮಂಡ್ಯ', lat: 12.4216, lon: 76.6932, tz: 5.5 }

// 1-based eighth of the daytime, indexed by weekday (0 = Sunday)
const RAHU = [8, 2, 7, 5, 6, 4, 3]
const YAMAGANDA = [5, 4, 3, 2, 1, 7, 6]
const GULIKA = [7, 6, 5, 4, 3, 2, 1]

const rad = Math.PI / 180
/** Sunrise or sunset in hours (local, place tz) for a given date — NOAA almanac algorithm, accurate to ~1 min. */
function sunTime(y: number, m: number, d: number, rising: boolean, lat = PLACE.lat, lon = PLACE.lon, tz = PLACE.tz) {
  const N = Math.floor((Date.UTC(y, m - 1, d) - Date.UTC(y, 0, 0)) / 864e5)
  const lngHour = lon / 15
  const t = N + ((rising ? 6 : 18) - lngHour) / 24
  const M = 0.9856 * t - 3.289
  let L = M + 1.916 * Math.sin(M * rad) + 0.02 * Math.sin(2 * M * rad) + 282.634
  L = ((L % 360) + 360) % 360
  let RA = Math.atan(0.91764 * Math.tan(L * rad)) / rad
  RA = ((RA % 360) + 360) % 360
  RA = (RA + Math.floor(L / 90) * 90 - Math.floor(RA / 90) * 90) / 15
  const sinDec = 0.39782 * Math.sin(L * rad)
  const cosDec = Math.cos(Math.asin(sinDec))
  const cosH = (Math.cos(90.833 * rad) - sinDec * Math.sin(lat * rad)) / (cosDec * Math.cos(lat * rad))
  const H = (rising ? 360 - Math.acos(cosH) / rad : Math.acos(cosH) / rad) / 15
  const T = H + RA - 0.06571 * t - 6.622
  const UT = (((T - lngHour) % 24) + 24) % 24
  return (UT + tz + 24) % 24
}

export interface Kaal { key: 'rahu' | 'gulika' | 'yamaganda'; en: string; kn: string; start: number; end: number }
export interface DayKaal { date: Date; weekday: number; sunrise: number; sunset: number; kaals: Kaal[]; nowHours: number }

/** Today's date & time at the centre (IST), independent of the visitor's own time zone. */
function placeNow(now = new Date()) {
  const ms = now.getTime() + PLACE.tz * 3600e3
  const p = new Date(ms) // read with getUTC* = wall-clock at the place
  return { y: p.getUTCFullYear(), m: p.getUTCMonth() + 1, d: p.getUTCDate(), wd: p.getUTCDay(), h: p.getUTCHours() + p.getUTCMinutes() / 60 }
}

export function kaalsFor(now = new Date()): DayKaal {
  const { y, m, d, wd, h } = placeNow(now)
  const sunrise = sunTime(y, m, d, true)
  const sunset = sunTime(y, m, d, false)
  const part = (sunset - sunrise) / 8
  const seg = (n: number) => ({ start: sunrise + (n - 1) * part, end: sunrise + n * part })
  return {
    date: new Date(Date.UTC(y, m - 1, d)), weekday: wd, sunrise, sunset, nowHours: h,
    kaals: [
      { key: 'rahu', en: 'Rahu Kaal', kn: 'ರಾಹು ಕಾಲ', ...seg(RAHU[wd]) },
      { key: 'gulika', en: 'Gulika Kaal', kn: 'ಗುಳಿಕ ಕಾಲ', ...seg(GULIKA[wd]) },
      { key: 'yamaganda', en: 'Yamaganda Kaal', kn: 'ಯಮಗಂಡ ಕಾಲ', ...seg(YAMAGANDA[wd]) },
    ],
  }
}

/** 9.5 → "9:30 AM" */
export function fmt(hours: number) {
  let mins = Math.round(hours * 60)
  const h24 = Math.floor(mins / 60) % 24; mins %= 60
  const h12 = ((h24 + 11) % 12) + 1
  return `${h12}:${String(mins).padStart(2, '0')} ${h24 < 12 ? 'AM' : 'PM'}`
}
/** Kannada time with ಬೆಳಿಗ್ಗೆ / ಮಧ್ಯಾಹ್ನ / ಸಂಜೆ */
export function fmtKn(hours: number) {
  let mins = Math.round(hours * 60)
  const h24 = Math.floor(mins / 60) % 24; mins %= 60
  const h12 = ((h24 + 11) % 12) + 1
  const part = h24 < 12 ? 'ಬೆಳಿಗ್ಗೆ' : h24 < 16 ? 'ಮಧ್ಯಾಹ್ನ' : h24 < 19 ? 'ಸಂಜೆ' : 'ರಾತ್ರಿ'
  return `${part} ${h12}:${String(mins).padStart(2, '0')}`
}

export const WEEKDAY_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
export const WEEKDAY_KN = ['ಭಾನುವಾರ', 'ಸೋಮವಾರ', 'ಮಂಗಳವಾರ', 'ಬುಧವಾರ', 'ಗುರುವಾರ', 'ಶುಕ್ರವಾರ', 'ಶನಿವಾರ']
export const MONTH_KN = ['ಜನವರಿ', 'ಫೆಬ್ರವರಿ', 'ಮಾರ್ಚ್', 'ಏಪ್ರಿಲ್', 'ಮೇ', 'ಜೂನ್', 'ಜುಲೈ', 'ಆಗಸ್ಟ್', 'ಸೆಪ್ಟೆಂಬರ್', 'ಅಕ್ಟೋಬರ್', 'ನವೆಂಬರ್', 'ಡಿಸೆಂಬರ್']
