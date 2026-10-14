import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './ReviewsPage.css'
import { PROJECT_VIDEOS } from '../../seo/videos'
import { WRITTEN_REVIEWS } from '../../seo/reviews'

// Videos live in src/seo/videos.js (shared with VideoObject structured data)
const VIDEO_TESTIMONIALS = PROJECT_VIDEOS

// Written reviews live in src/seo/reviews.js (shared with the Markdown export)
const WRITTEN_TESTIMONIALS = WRITTEN_REVIEWS

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
            Project videos and reviews from homeowners across Calgary who trusted Josan Construction & Landscaping.
          </p>
          <div className="reviews-hero-stats">
            <div className="reviews-stat">
              <span className="reviews-stat-num">⭐ 5.0</span>
              <span className="reviews-stat-lbl">Average Rating</span>
            </div>
            <div className="reviews-stat-divider" />
            <div className="reviews-stat">
              <span className="reviews-stat-num">{VIDEO_TESTIMONIALS.length}</span>
              <span className="reviews-stat-lbl">Project Videos</span>
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
              🎥 Project Videos
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
                  <h2 className="reviews-section-title">🎥 Project &amp; Client Videos</h2>
                  <p className="reviews-section-sub">Watch {VIDEO_TESTIMONIALS.length} videos of our work and clients across Calgary</p>
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
                        poster={v.thumbnailUrl}
                        title={v.title}
                        controls
                        playsInline
                        preload="metadata"
                        className="reviews-video-elem"
                      />
                    </div>
                    <div className="reviews-video-body">
                      <div className="reviews-video-top">
                        <span className="reviews-service-tag">{v.service}</span>
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
