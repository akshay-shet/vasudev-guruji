import { LotusLogo } from './Decor'

export function PageFallback() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center p-8 text-center" aria-live="polite" aria-busy="true">
      <div className="relative flex items-center justify-center">
        <LotusLogo className="h-12 w-12 text-gold animate-pulse" />
      </div>
      <p className="mt-3 font-marcellus text-sm tracking-widest text-golddark uppercase">
        Loading…
      </p>
    </div>
  )
}
