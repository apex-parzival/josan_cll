import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import SEO from './components/SEO/SEO'
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
import Chatbot from './components/Chatbot/Chatbot'
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

function NotFound() {
  return (
    <section className="service-error" style={{ padding: '160px 20px 80px', textAlign: 'center' }}>
      <h1>Page Not Found</h1>
      <p style={{ margin: '16px 0 24px' }}>The page you're looking for doesn't exist or has moved.</p>
      <Link to="/" className="btn btn-primary"><span>Back to Home</span></Link>
    </section>
  )
}

// Routes + layout without a router, so it can be rendered on the client
// (BrowserRouter) and at build time (StaticRouter, see entry-server.jsx).
export function AppShell() {
  return (
    <>
      <ScrollRevealManager />
      <SEO />
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <BackToTop />
      <Chatbot />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}
