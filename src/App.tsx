import { lazy, Suspense, useEffect, type ComponentType } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header'
import { FloatingContact, Footer } from './components/Common'
import { SideOrnaments, Stars, TempleIntro } from './components/Decor'
import { ErrorBoundary } from './components/ErrorBoundary'
import { useReveal } from './lib/useReveal'
import { Seo } from './lib/Seo'
import Home from './pages/Home'

/**
 * Route-level code splitting. If a chunk fails to load (typically an old tab after a new deploy
 * removed the previous hashed files), reload the page once to pick up the new build.
 */
function page<T extends Record<string, unknown>>(load: () => Promise<T>, name: keyof T) {
  return lazy(() => load().then((m) => { try { sessionStorage.removeItem('vg-chunk-reload') } catch { /* storage blocked */ } return { default: m[name] as ComponentType } }).catch((err) => {
    const key = 'vg-chunk-reload'
    try { if (!sessionStorage.getItem(key)) { sessionStorage.setItem(key, '1'); window.location.reload(); return new Promise<never>(() => {}) } } catch { /* storage blocked */ }
    throw err
  }))
}
const About = page(() => import('./pages/About'), 'default')
const LifeLinePage = page(() => import('./pages/LifeLine'), 'default')
const HomaPage = page(() => import('./pages/Homa'), 'default')
const Services = page(() => import('./pages/Services'), 'Services')
const ServiceDetail = page(() => import('./pages/Services'), 'ServiceDetail')
const Kundali = page(() => import('./pages/Jyotisha'), 'Kundali')
const Mantras = page(() => import('./pages/Mantras'), 'default')
const GalleryPage = page(() => import('./pages/Gallery'), 'default')
const Events = page(() => import('./pages/Media'), 'Events')
const Shop = page(() => import('./pages/More'), 'Shop')
const Contact = page(() => import('./pages/More'), 'Contact')
const Legal = page(() => import('./pages/More'), 'Legal')
const NotFound = page(() => import('./pages/NotFound'), 'NotFound')

/** Reserves space while a page chunk loads, so the footer does not jump up (no layout shift). */
function PageLoading() {
  return <div className="min-h-[70vh]" aria-busy="true" aria-label="Loading" />
}

function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (el) { setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60); return }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function App() {
  useReveal()
  const { pathname } = useLocation()
  return (
    <>
      <Stars />
      <SideOrnaments />
      <Seo />
      <TempleIntro />
      <ScrollManager />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[200] focus:rounded-full focus:bg-paper focus:px-4 focus:py-2">Skip to content</a>
      <Header />
      <main id="main" className={`relative z-[1] ${pathname === '/' ? 'lg:pt-0' : 'lg:pt-20'}`}>
        <ErrorBoundary resetKey={pathname}>
        <Suspense fallback={<PageLoading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/life-line-horoscope" element={<LifeLinePage />} />
          <Route path="/homa" element={<HomaPage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/kundali-matching" element={<Kundali />} />
          <Route path="/mantras" element={<Mantras />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/discourses" element={<Navigate to="/gallery" replace />} />
          <Route path="/events" element={<Events />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/legal/:page" element={<Legal />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
      <FloatingContact />
    </>
  )
}
