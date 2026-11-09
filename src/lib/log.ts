/**
 * Minimal structured client-side logging. There is no backend, so entries go to the browser console
 * in a consistent JSON shape (easy to forward to Sentry / Vercel / LogRocket later by replacing `sink`).
 * Never pass personal data (names, phone numbers, birth details) to these functions.
 */
type Level = 'info' | 'warn' | 'error'
interface Entry { level: Level; event: string; message?: string; path?: string; time: string; [k: string]: unknown }

const sink = (e: Entry) => {
  const fn = e.level === 'error' ? console.error : e.level === 'warn' ? console.warn : console.info
  fn('[vg]', JSON.stringify(e))
}

function base(level: Level, event: string, extra: Record<string, unknown> = {}): Entry {
  return { level, event, path: typeof location !== 'undefined' ? location.pathname : undefined, time: new Date().toISOString(), ...extra }
}

export function logError(event: string, err: unknown, extra: Record<string, unknown> = {}) {
  const e = err instanceof Error ? err : new Error(String(err))
  sink(base('error', event, { message: e.message, name: e.name, stack: e.stack?.split('\n').slice(0, 5).join('\n'), ...extra }))
}
export const logWarn = (event: string, extra?: Record<string, unknown>) => sink(base('warn', event, extra))

/** Global handlers for errors that escape React (async code, event handlers, failed chunk loads). */
export function installGlobalErrorHandlers() {
  window.addEventListener('error', (ev) => logError('window.error', ev.error ?? ev.message, { source: ev.filename, line: ev.lineno }))
  window.addEventListener('unhandledrejection', (ev) => logError('unhandledrejection', ev.reason))
  // A CSP violation in production means a header needs updating or something unexpected tried to load.
  document.addEventListener('securitypolicyviolation', (ev) => logWarn('csp.violation', { directive: ev.violatedDirective, blocked: ev.blockedURI }))
}
