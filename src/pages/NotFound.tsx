import { Link } from 'react-router-dom'
import { PageHero } from '../components/Common'

export function NotFound() {
  return (
    <PageHero title="Page not found" hi="ಪುಟ ಸಿಗಲಿಲ್ಲ" subtitle="The path you seek is not here — but every path leads home.">
      <Link to="/" className="btn-gold mt-6 px-7 py-2.5">Return home</Link>
    </PageHero>
  )
}
