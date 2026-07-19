import { useState, useEffect, useRef } from 'react'
import './Hero.css'

const SLIDES = [
  { img: '/assets/sod.webp',    alt: 'Green sod lawn' },
  { img: '/assets/trees.webp',  alt: 'Beautiful trees' },
  { img: '/assets/rock.webp',   alt: 'Rock landscaping' },
]

const STATS = [
  { target: 15,  suffix: '+', label: 'Years Experience' },
  { target: 500, suffix: '+', label: 'Projects Done' },
  { target: 100, suffix: '%', label: 'Satisfaction' },
]

function useCounter(target, started) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!started) return
    const duration = 2000
    const start = performance.now()
    const raf = requestAnimationFrame(function update(ts) {
      const p = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setCount(Math.round(eased * target))
      if (p < 1) requestAnimationFrame(update)
    })
    return () => cancelAnimationFrame(raf)
  }, [started, target])
  return count
}

function StatItem({ target, suffix, label, started }) {
  const count = useCounter(target, started)
  return (
    <div className="stat-item">
      <div className="stat-num">
        <span className="stat-val">{count}</span>
        <span className="stat-suf">{suffix}</span>
      </div>
      <span className="stat-label">{label}</span>
    </div>
  )
}

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [statsVisible, setStatsVisible] = useState(false)
  const statsRef = useRef(null)
  const intervalRef = useRef(null)

  // Slideshow
  function goTo(i) { setCurrent(i) }
  function nextSlide() { setCurrent(c => (c + 1) % SLIDES.length) }

  useEffect(() => {
    intervalRef.current = setInterval(nextSlide, 5000)
    return () => clearInterval(intervalRef.current)
  }, [])

  function onDotClick(i) {
    clearInterval(intervalRef.current)
    goTo(i)
    intervalRef.current = setInterval(nextSlide, 5000)
  }

  // Counter trigger
  useEffect(() => {
    if (!statsRef.current) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setStatsVisible(true); obs.disconnect() }
    }, { threshold: 0.5 })
    obs.observe(statsRef.current)
    return () => obs.disconnect()
  }, [])

  function scrollTo(id) {
    const el = document.getElementById(id)
    if (el) window.scrollTo({ top: el.offsetTop - 72, behavior: 'smooth' })
  }

  return (
    <section className="hero" id="home">
      {/* Slides */}
      {SLIDES.map((s, i) => (
        <div
          key={i}
          className={`hero-slide${i === current ? ' active' : ''}`}
          style={{ backgroundImage: `url('${s.img}')` }}
          role="img" aria-label={s.alt}
        />
      ))}
      <div className="hero-overlay" />

      <div className="hero-content">
        <div className="hero-badge reveal up">✦ Calgary's Most Trusted Landscapers</div>

        <h1 className="hero-title reveal up d1">
          Transform Your<br />
          <span className="hero-accent">Outdoor Space</span><br />
          Into Something Beautiful
        </h1>

        <p className="hero-subtitle reveal up d2">
          Expert landscaping, construction & outdoor design services. From decks and patios
          to full basement renovations — we build it all with care, skill, and pride.
        </p>

        <div className="hero-actions reveal up d3">
          <button className="btn btn-primary" onClick={() => scrollTo('contact')}>
            <span>Get a Free Quote</span>
          </button>
          <button className="btn btn-outline light" onClick={() => scrollTo('services')}>
            Explore Services
          </button>
        </div>

        <div className="hero-stats reveal up d4" ref={statsRef}>
          {STATS.map((s, i) => (
            <div key={i} className="hero-stat-wrap">
              {i > 0 && <div className="stat-divider" />}
              <StatItem {...s} started={statsVisible} />
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll" aria-hidden="true">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>

      {/* Dots */}
      <div className="hero-dots">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={`dot${i === current ? ' active' : ''}`}
            onClick={() => onDotClick(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
