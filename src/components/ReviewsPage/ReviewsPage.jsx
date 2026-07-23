import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './ReviewsPage.css'

const VIDEO_TESTIMONIALS = [
  {
    id: 1,
    videoUrl: '/assets/testimonials/testimonial_video_1.mp4',
    stars: '★★★★★',
    title: 'Backyard Landscaping & Sod Installation',
    text: "Watch our jobsite transformation — precision sod installation and complete backyard landscaping in Calgary.",
    author: 'Gurpreet & Family',
    loc: 'Cornerstone, Calgary',
    service: 'Landscaping & Sod'
  },
  {
    id: 2,
    videoUrl: '/assets/testimonials/testimonial_video_2.mp4',
    stars: '★★★★★',
    title: 'Custom Decking & Retaining Wall',
    text: "See our custom multi-level deck building and heavy-duty stone retaining wall construction.",
    author: 'Michael R.',
    loc: 'Saddle Ridge, Calgary',
    service: 'Decking & Wall'
  },
  {
    id: 3,
    videoUrl: '/assets/testimonials/testimonial_video_3.mp4',
    stars: '★★★★★',
    title: 'Legal Basement Suite Renovation',
    text: "Tour this legal basement suite transformation from initial framing to final high-end finishes.",
    author: 'Amandeep S.',
    loc: 'Redstone, Calgary',
    service: 'Basement Renovation'
  },
  {
    id: 4,
    videoUrl: '/assets/testimonials/testimonial_video_4.mp4',
    stars: '★★★★★',
    title: 'Perimeter Fencing & Patio Design',
    text: "Check out this custom cedar fence building and modern outdoor stone patio project.",
    author: 'Sarah & David L.',
    loc: 'Savanna, Calgary',
    service: 'Fencing & Patio'
  },
  {
    id: 5,
    videoUrl: '/assets/testimonials/testimonial_video_5.mp4',
    stars: '★★★★★',
    title: 'Bobcat Service & Site Excavation',
    text: "Precision Bobcat excavation, lot grading, and site preparation executed by skilled operators.",
    author: 'Jason K.',
    loc: 'Calgary, AB',
    service: 'Bobcat Service'
  },
  {
    id: 6,
    videoUrl: '/assets/testimonials/testimonial_video_6.mp4',
    stars: '★★★★★',
    title: 'Whole Home Interior Renovation',
    text: "Full interior remodeling and structural framing project walkthrough completed by Josan Construction.",
    author: 'Rajinder P.',
    loc: 'Cornerstone, Calgary',
    service: 'Home Renovation'
  }
]

const WRITTEN_TESTIMONIALS = [
  {
    id: 1,
    stars: '★★★★★',
    title: 'Backyard Landscaping & Patio Construction',
    text: "Josan Construction transformed our outdoor space completely! The stone patio and retaining wall craftsmanship exceeded our expectations. Professional, clean, and finished on schedule.",
    author: 'Michael & Sarah R.',
    loc: 'Cornerstone, Calgary',
    service: 'Patio & Retaining Walls'
  },
  {
    id: 2,
    stars: '★★★★★',
    title: 'Legal Basement Suite Finishing',
    text: "From framing to final painting, the Josan crew was outstanding. Clear communication throughout, clean workmanship, and transparent pricing. 10/10 service!",
    author: 'David K.',
    loc: 'Saddle Ridge, Calgary',
    service: 'Basement Renovation'
  },
  {
    id: 3,
    stars: '★★★★★',
    title: 'Custom Decking & Perimeter Fencing',
    text: "We hired Josan for our composite deck building and perimeter fencing. The team was punctual, respectful, and delivered superior quality. Will definitely hire them again!",
    author: 'Jennifer P.',
    loc: 'Redstone, Calgary',
    service: 'Deck & Fencing'
  },
  {
    id: 4,
    stars: '★★★★★',
    title: 'Artificial Grass & Turf Installation',
    text: "No more muddy paw prints! The artificial turf installation was fast, seamless, and looks lush green all year round. Highly recommended landscaping team in Calgary!",
    author: 'Robert & Amandeep S.',
    loc: 'Savanna, Calgary',
    service: 'Artificial Turf'
  }
]

export default function ReviewsPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('videos')
  const videoTrackRef = useRef(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  function scrollVideoCarousel(direction) {
    if (!videoTrackRef.current) return
    const amount = direction === 'left' ? -390 : 390
    videoTrackRef.current.scrollBy({ left: amount, behavior: 'smooth' })
  }

  return (
    <div className="reviews-page">
      {/* Hero Banner */}
      <header className="reviews-hero">
        <div className="reviews-hero-overlay" />
        <div className="container reviews-hero-content">
          <button
            className="reviews-back-btn"
            onClick={() => { navigate('/'); window.scrollTo({ top: 0, behavior: 'instant' }) }}
          >
            ← Back to Home
          </button>
          <div className="section-label light">Client Feedback</div>
          <h1 className="reviews-hero-title">What Our Clients Say</h1>
          <p className="reviews-hero-sub">
            Real video testimonials and written reviews from homeowners across Calgary who trusted Josan Construction & Landscaping.
          </p>
          <div className="reviews-hero-stats">
            <div className="reviews-stat">
              <span className="reviews-stat-num">⭐ 5.0</span>
              <span className="reviews-stat-lbl">Average Rating</span>
            </div>
            <div className="reviews-stat-divider" />
            <div className="reviews-stat">
              <span className="reviews-stat-num">{VIDEO_TESTIMONIALS.length}</span>
              <span className="reviews-stat-lbl">Video Reviews</span>
            </div>
            <div className="reviews-stat-divider" />
            <div className="reviews-stat">
              <span className="reviews-stat-num">{WRITTEN_TESTIMONIALS.length}+</span>
              <span className="reviews-stat-lbl">Written Reviews</span>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Switcher */}
      <div className="reviews-tab-bar">
        <div className="container">
          <div className="reviews-tabs">
            <button
              className={`reviews-tab-btn${activeTab === 'videos' ? ' active' : ''}`}
              onClick={() => setActiveTab('videos')}
            >
              🎥 Video Testimonials
              <span className="reviews-tab-count">{VIDEO_TESTIMONIALS.length}</span>
            </button>
            <button
              className={`reviews-tab-btn${activeTab === 'written' ? ' active' : ''}`}
              onClick={() => setActiveTab('written')}
            >
              ⭐ Written Reviews
              <span className="reviews-tab-count">{WRITTEN_TESTIMONIALS.length}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="reviews-content">
        <div className="container">

          {/* ── Video Testimonials ── */}
          {activeTab === 'videos' && (
            <div className="reviews-videos-section">
              <div className="reviews-section-header">
                <div>
                  <h2 className="reviews-section-title">🎥 Client Video Testimonials</h2>
                  <p className="reviews-section-sub">Watch {VIDEO_TESTIMONIALS.length} real jobsite videos from our clients across Calgary</p>
                </div>
                <div className="carousel-arrows">
                  <button className="carousel-arrow" onClick={() => scrollVideoCarousel('left')} aria-label="Previous Video">←</button>
                  <button className="carousel-arrow" onClick={() => scrollVideoCarousel('right')} aria-label="Next Video">→</button>
                </div>
              </div>

              <div className="reviews-video-track" ref={videoTrackRef}>
                {VIDEO_TESTIMONIALS.map(v => (
                  <div key={v.id} className="reviews-video-card">
                    <div className="reviews-video-wrapper">
                      <video
                        src={v.videoUrl}
                        controls
                        playsInline
                        preload="metadata"
                        className="reviews-video-elem"
                      />
                    </div>
                    <div className="reviews-video-body">
                      <div className="reviews-video-top">
                        <span className="reviews-service-tag">{v.service}</span>
                        <span className="reviews-stars">{v.stars}</span>
                      </div>
                      <h3 className="reviews-video-title">{v.title}</h3>
                      <p className="reviews-video-text">{v.text}</p>
                      <div className="reviews-video-author">
                        <div className="reviews-author-avatar">{v.author.substring(0, 2)}</div>
                        <div>
                          <strong>{v.author}</strong>
                          <span>{v.loc}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Written Reviews ── */}
          {activeTab === 'written' && (
            <div className="reviews-written-section">
              <div className="reviews-section-header" style={{ marginBottom: '36px' }}>
                <div>
                  <h2 className="reviews-section-title">⭐ Written Client Reviews</h2>
                  <p className="reviews-section-sub">Honest feedback from homeowners who chose Josan Construction & Landscaping</p>
                </div>
              </div>

              <div className="reviews-written-grid">
                {WRITTEN_TESTIMONIALS.map(t => (
                  <div key={t.id} className="reviews-written-card">
                    <div className="rwc-top">
                      <span className="reviews-stars">{t.stars}</span>
                      <span className="reviews-service-tag">{t.service}</span>
                    </div>
                    <h3 className="rwc-title">{t.title}</h3>
                    <p className="rwc-text">"{t.text}"</p>
                    <div className="rwc-author">
                      <div className="reviews-author-avatar">{t.author.substring(0, 2)}</div>
                      <div className="rwc-author-info">
                        <strong>{t.author}</strong>
                        <span>{t.loc}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* CTA Strip */}
      <div className="reviews-cta-strip">
        <div className="container reviews-cta-inner">
          <div>
            <h3>Ready to Start Your Project?</h3>
            <p>Join hundreds of satisfied Calgary homeowners. Get your free estimate today.</p>
          </div>
          <div className="reviews-cta-btns">
            <a href="tel:5873944029" className="btn btn-primary"><span>📞 Call Us Now</span></a>
            <button
              className="btn btn-outline light"
              onClick={() => { navigate('/'); setTimeout(() => { const el = document.getElementById('contact'); if (el) el.scrollIntoView({ behavior: 'smooth' }) }, 100) }}
            >
              Get Free Estimate
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
