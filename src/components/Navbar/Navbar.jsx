import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './Navbar.css'

const SERVICES = [
  'Artificial Grass / Turf','Basement Renovations','Bobcat Service',
  'Deck Building Services','Decking','Fencing Services','Flower Bed',
  'Framing Service','Garage','Gate Building','Home Renovation','Kitchen Service',
  'Lot Gardening','New Basement Construction','Painting Service',
  "Patio's",'Pergola','Railing','Retaining Walls','Rock','Sod','Trees',
]

const PAGE_MAP = {
  'Artificial Grass / Turf': 'artificial-grass-installation-turf',
  'Basement Renovations': 'basement-renovations',
  'Bobcat Service': 'bobcat-service',
  'Deck Building Services': 'deck-building-services',
  'Decking': 'decking',
  'Fencing Services': 'fencing-services',
  'Flower Bed': 'flower-bed',
  'Framing Service': 'framing-service',
  'Garage': 'garage',
  'Gate Building': 'gate-building',
  'Home Renovation': 'professional-home-renovation',
  'Kitchen Service': 'kitchen-service',
  'Lot Gardening': 'lot-gardening',
  'New Basement Construction': 'new-basement-construction',
  'Painting Service': 'painting-service',
  "Patio's": 'patios',
  'Pergola': 'pergola-services',
  'Railing': 'railing',
  'Retaining Walls': 'retaining-walls',
  'Rock': 'rock',
  'Sod': 'sod',
  'Trees': 'trees'
}

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  const [scrolled,    setScrolled]    = useState(false)
  const [menuOpen,    setMenuOpen]    = useState(false)
  const [dropOpen,    setDropOpen]    = useState(false)
  const [activeId,    setActiveId]    = useState('home')
  const [visible,     setVisible]     = useState(true)
  const navRef = useRef(null)

  /* scroll state + active link tracking + smart navbar retract logic */
  useEffect(() => {
    let lastScrollY = window.pageYOffset

    const onScroll = () => {
      const currentScrollY = window.pageYOffset
      setScrolled(currentScrollY > 80)

      // Keep navbar visible always when scrolling
      setVisible(true)

      lastScrollY = currentScrollY

      const SECTIONS = ['home','about','services','gallery','contact']
      const offset = 100
      for (const id of [...SECTIONS].reverse()) {
        const el = document.getElementById(id)
        if (el && currentScrollY + offset >= el.offsetTop) {
          setActiveId(id); break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [menuOpen])

  /* close mobile menu on resize to desktop */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) closeMobile() }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  /* lock body scroll when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  function closeMobile() { setMenuOpen(false); setDropOpen(false) }

  function handleServiceClick(serviceName) {
    const pageId = PAGE_MAP[serviceName]
    if (pageId) {
      navigate('/services/' + pageId)
      window.scrollTo({ top: 0, behavior: 'instant' })
    } else {
      handleLinkClick('services')
    }
    closeMobile()
  }

  function handleLinkClick(id) {
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        const el = document.getElementById(id)
        if (el) window.scrollTo({ top: el.offsetTop - 72, behavior: 'smooth' })
      }, 100)
    } else {
      const el = document.getElementById(id)
      if (el) {
        const top = el.getBoundingClientRect().top + window.pageYOffset - 72
        window.scrollTo({ top, behavior: 'smooth' })
      }
    }
    closeMobile()
  }

  const links = [
    { id: 'home',     label: 'Home' },
    { id: 'about',    label: 'About Us' },
    { id: 'services', label: 'Services', hasDrop: true },
    { id: 'gallery',  label: 'Gallery' },
    { id: 'contact',  label: 'Contact Us' },
  ]

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}${!visible ? ' retracted' : ''}`} ref={navRef}>
        <div className="nav-container">
          {/* Logo */}
          <button className="nav-logo" onClick={() => handleLinkClick('home')} aria-label="Go to home">
            <img src="/assets/logo.png" alt="Josan Construction & Landscaping LTD" className="logo-img" />
          </button>

          {/* Desktop links */}
          <ul className="nav-links">
            {links.map(({ id, label, hasDrop }) =>
              hasDrop ? (
                <li key={id} className="has-dropdown">
                  <button
                    className={`nav-link${activeId === id && location.pathname === '/' ? ' active' : ''}`}
                    onClick={() => handleLinkClick(id)}
                  >
                    {label} <span className="drop-arrow">▾</span>
                  </button>
                  <div className="dropdown-menu">
                    <div className="dropdown-grid">
                      {SERVICES.map(s => (
                        <button key={s} className="drop-item" onClick={() => handleServiceClick(s)}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </li>
              ) : (
                <li key={id}>
                  <button
                    className={`nav-link${activeId === id && location.pathname === '/' ? ' active' : ''}`}
                    onClick={() => handleLinkClick(id)}
                  >
                    {label}
                  </button>
                </li>
              )
            )}
          </ul>

          {/* CTA */}
          <button className="nav-cta" onClick={() => handleLinkClick('contact')}>
            Get Free Quote
          </button>

          {/* Hamburger */}
          <button
            className={`hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`mobile-overlay${menuOpen ? ' active' : ''}`}
        onClick={closeMobile}
        aria-hidden="true"
      />

      {/* Mobile drawer */}
      <div className={`mobile-drawer${menuOpen ? ' open' : ''}`} role="dialog" aria-modal="true">
        <div className="drawer-header">
          <span className="logo-icon">🌿</span>
          <span className="logo-main">JOSAN</span>
          <button className="drawer-close" onClick={closeMobile} aria-label="Close menu">✕</button>
        </div>
        <ul className="drawer-links">
          {links.map(({ id, label, hasDrop }) => (
            <li key={id}>
              {hasDrop ? (
                <>
                  <button className="drawer-link" onClick={() => setDropOpen(v => !v)}>
                    {label}
                    <span className={`drop-arrow${dropOpen ? ' open' : ''}`}>▾</span>
                  </button>
                  {dropOpen && (
                    <div className="drawer-drop">
                      {SERVICES.map(s => (
                        <button key={s} className="drawer-drop-item" onClick={() => handleServiceClick(s)}>
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <button className="drawer-link" onClick={() => handleLinkClick(id)}>{label}</button>
              )}
            </li>
          ))}
        </ul>
        <button className="drawer-cta btn btn-primary" onClick={() => handleLinkClick('contact')}>
          <span>Get Free Quote</span>
        </button>
      </div>
    </>
  )
}
