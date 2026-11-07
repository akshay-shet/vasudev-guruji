import { lazy, Suspense, useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header'
import { FloatingContact, Footer } from './components/Common'
import { SideOrnaments, Stars, TempleIntro } from './components/Decor'
import { ErrorBoundary } from './components/ErrorBoundary'
import { PageFallback } from './components/PageFallback'
import { useReveal } from './lib/useReveal'
import { Seo } from './lib/Seo'
import Home from './pages/Home'
import HomaPage from './pages/Homa'
import { ServiceDetail, Services } from './pages/Services'

const About = lazy(() => import('./pages/About'))
const LifeLinePage = lazy(() => import('./pages/LifeLine'))
const Kundali = lazy(() => import('./pages/Jyotisha').then((m) => ({ default: m.Kundali })))
const Mantras = lazy(() => import('./pages/Mantras'))
const GalleryPage = lazy(() => import('./pages/Gallery'))
const Events = lazy(() => import('./pages/Media').then((m) => ({ default: m.Events })))
const Shop = lazy(() => import('./pages/More').then((m) => ({ default: m.Shop })))
const Contact = lazy(() => import('./pages/More').then((m) => ({ default: m.Contact })))
const Legal = lazy(() => import('./pages/More').then((m) => ({ default: m.Legal })))
const NotFound = lazy(() => import('./pages/More').then((m) => ({ default: m.NotFound })))

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
    <ErrorBoundary>
      <Stars />
      <SideOrnaments />
      <Seo />
      <TempleIntro />
      <ScrollManager />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[200] focus:rounded-full focus:bg-paper focus:px-4 focus:py-2">Skip to content</a>
      <Header />
      <main id="main" className={`relative z-[1] ${pathname === '/' ? 'lg:pt-0' : 'lg:pt-20'}`}>
        <Suspense fallback={<PageFallback />}>
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
      </main>
      <Footer />
      <FloatingContact />
    </ErrorBoundary>
  )
}
