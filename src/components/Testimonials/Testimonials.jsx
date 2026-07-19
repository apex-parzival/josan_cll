import { useState, useEffect, useRef } from 'react'
import './Testimonials.css'

const TESTIMONIALS_DATA = [
  { stars: '★★★★★', text: "Josan did an incredible job on our backyard patio and retaining wall. The team was professional, on time, and the quality is outstanding. Highly recommend to anyone in Calgary!", author: 'Mike R.', loc: 'Calgary, AB' },
  { stars: '★★★★★', text: "We hired Josan for our deck building and fencing project. The price was fair, the work was exceptional, and they left the site spotless. Will definitely use them again!", author: 'Sarah L.', loc: 'Calgary, AB' },
  { stars: '★★★★★', text: "Best landscaping company in Calgary. They transformed our front yard with sod and beautiful flower beds. So happy with the result. Very trustworthy team.", author: 'David K.', loc: 'Calgary, AB' },
  { stars: '★★★★★', text: "Josan built our basement renovation and we couldn't be happier. Clear communication throughout, clean workmanship, and they finished on time. 10/10!", author: 'Jennifer P.', loc: 'Calgary, AB' }
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const autoPlayRef = useRef(null)
  const touchStartRef = useRef(0)

  function goTo(idx) {
    setCurrent(idx)
  }

  function next() {
    setCurrent(c => (c + 1) % TESTIMONIALS_DATA.length)
  }

  function prev() {
    setCurrent(c => (c - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length)
  }

  useEffect(() => {
    autoPlayRef.current = setInterval(next, 6000)
    return () => clearInterval(autoPlayRef.current)
  }, [])

  function resetAutoPlay() {
    clearInterval(autoPlayRef.current)
    autoPlayRef.current = setInterval(next, 6000)
  }

  function handleTouchStart(e) {
    touchStartRef.current = e.changedTouches[0].clientX
  }

  function handleTouchEnd(e) {
    const diff = touchStartRef.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) {
      resetAutoPlay()
      if (diff > 0) next()
      else prev()
    }
  }

  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        
        <div className="section-header reveal up">
          <div className="section-label">Client Reviews</div>
          <h2 className="section-title">What Our Clients Say</h2>
        </div>

        <div className="testimonials-slider">
          <div
            className="testimonials-track"
            style={{ transform: `translateX(-${current * 100}%)` }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {TESTIMONIALS_DATA.map((t, idx) => (
              <div key={idx} className="testimonial-card">
                <div className="testimonial-stars">{t.stars}</div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <div className="author-avatar">{t.author.substring(0, 2)}</div>
                  <div className="author-info">
                    <strong>{t.author}</strong>
                    <span>{t.loc}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="slider-controls">
            <button
              className="slider-btn prev"
              onClick={() => { resetAutoPlay(); prev() }}
              aria-label="Previous review"
            >
              ‹
            </button>
            <div className="slider-dots">
              {TESTIMONIALS_DATA.map((_, idx) => (
                <button
                  key={idx}
                  className={`dot dark${idx === current ? ' active' : ''}`}
                  onClick={() => { resetAutoPlay(); goTo(idx) }}
                  aria-label={`Review ${idx + 1}`}
                />
              ))}
            </div>
            <button
              className="slider-btn next"
              onClick={() => { resetAutoPlay(); next() }}
              aria-label="Next review"
            >
              ›
            </button>
          </div>
        </div>

      </div>
    </section>
  )
}
