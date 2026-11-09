import { Component, type ErrorInfo, type ReactNode } from 'react'
import { site, whatsappLink } from '../data/site'
import { logError } from '../lib/log'

/**
 * Catches render errors anywhere below it and shows a calm fallback with direct Call / WhatsApp
 * links, instead of a blank page. `resetKey` (the current path) clears the error on navigation.
 */
export class ErrorBoundary extends Component<{ children: ReactNode; resetKey?: string }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch(error: Error, info: ErrorInfo) { logError('render', error, { componentStack: info.componentStack?.split('\n').slice(0, 6).join('\n') }) }
  componentDidUpdate(prev: { resetKey?: string }) { if (this.state.failed && prev.resetKey !== this.props.resetKey) this.setState({ failed: false }) }
  render() {
    if (!this.state.failed) return this.props.children
    return (
      <section role="alert" className="mx-auto max-w-xl px-5 py-20 text-center">
        <h1 className="font-cormorant text-4xl font-bold italic text-maroon">Something went wrong</h1>
        <p className="mt-3 text-lg text-ink/[.88]">This part of the page could not load. Please refresh, or reach Guruji’s office directly.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button onClick={() => window.location.reload()} className="btn-outline px-5 py-2">Refresh page</button>
          <a href={site.phoneHref} className="btn-gold px-5 py-2">Call {site.phone}</a>
          <a href={whatsappLink('🙏 Hari Om Guruji, I would like to make an enquiry.')} target="_blank" rel="noopener" className="btn-outline px-5 py-2">WhatsApp</a>
        </div>
      </section>
    )
  }
}
