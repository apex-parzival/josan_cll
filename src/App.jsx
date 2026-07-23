import { useEffect } from 'react'
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Marquee from './components/Marquee/Marquee'
import About from './components/About/About'
import Vision from './components/Vision/Vision'
import Services from './components/Services/Services'
import WhyUs from './components/WhyUs/WhyUs'
import Gallery from './components/Gallery/Gallery'
import Testimonials from './components/Testimonials/Testimonials'
import CtaBanner from './components/CtaBanner/CtaBanner'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import BackToTop from './components/BackToTop/BackToTop'
import ServiceDetailPage from './components/ServiceDetailPage/ServiceDetailPage'
import GalleryPage from './components/GalleryPage/GalleryPage'
import ReviewsPage from './components/ReviewsPage/ReviewsPage'

function ScrollRevealManager() {
  const location = useLocation()

  // Scroll reveal
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [location.pathname])

  return null
}

export default function App() {
  return (
    <HashRouter>
      <ScrollRevealManager />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Marquee />
              <About />
              <Vision />
              <Services />
              <WhyUs />
              <Gallery />
              <Testimonials />
              <CtaBanner />
              <Contact />
            </>
          } />
          <Route path="/services/:serviceId" element={
            <>
              <ServiceDetailPage />
              <Contact />
            </>
          } />
          <Route path="/gallery" element={
            <>
              <GalleryPage />
              <Contact />
            </>
          } />
          <Route path="/reviews" element={
            <>
              <ReviewsPage />
              <Contact />
            </>
          } />
        </Routes>
      </main>
      <Footer />
      <BackToTop />
    </HashRouter>
  )
}
