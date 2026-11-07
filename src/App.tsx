import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header'
import { FloatingContact, Footer } from './components/Common'
import { SideOrnaments, Stars, TempleIntro } from './components/Decor'
import { useReveal } from './lib/useReveal'
import { Seo } from './lib/Seo'
import Home from './pages/Home'
import HomaPage from './pages/Homa'
import About from './pages/About'
import LifeLinePage from './pages/LifeLine'
import { Kundali } from './pages/Jyotisha'
import Mantras from './pages/Mantras'
import { ServiceDetail, Services } from './pages/Services'
import { Events } from './pages/Media'
import GalleryPage from './pages/Gallery'
import { Contact, Legal, NotFound, Shop } from './pages/More'

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
      </main>
      <Footer />
      <FloatingContact />
    </>
  )
}
