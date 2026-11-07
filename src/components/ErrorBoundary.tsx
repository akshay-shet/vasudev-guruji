import { Component, type ErrorInfo, type ReactNode } from 'react'
import { LotusLogo } from './Decor'
import { site } from '../data/site'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Structured client-side logging (sanitized of sensitive data)
    if (typeof console !== 'undefined' && console.error) {
      console.error('[Application ErrorBoundary]', {
        message: error.message,
        name: error.name,
        componentStack: errorInfo.componentStack?.slice(0, 500),
        time: new Date().toISOString(),
      })
    }
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined })
    window.location.href = '/'
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center" role="alert">
          <LotusLogo className="h-16 w-16 text-gold" />
          <h1 className="mt-4 font-marcellus text-2xl text-maroon sm:text-3xl">॥ ಶಾಂತಿಃ ಶಾಂತಿಃ ಶಾಂತಿಃ ॥</h1>
          <p className="mt-2 max-w-md font-cormorant text-lg text-ink">
            Something unexpected occurred while displaying this page. Please return to the home page or contact Guruji’s office directly.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button onClick={this.handleReset} className="btn-gold px-6 py-2">
              Return to Home
            </button>
            <a href={site.phoneHref} className="btn-outline px-6 py-2">
              Call Guruji
            </a>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
