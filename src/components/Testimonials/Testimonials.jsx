import { useState, useRef } from 'react'
import './Testimonials.css'
import photosData from '../../testimonials_photos.json'

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

export default function Testimonials() {
  const [activeTab, setActiveTab] = useState('all')
  const [activePhoto, setActivePhoto] = useState(null)
  const [visiblePhotosCount, setVisiblePhotosCount] = useState(18)
  const videoTrackRef = useRef(null)

  function scrollVideoCarousel(direction) {
    if (!videoTrackRef.current) return
    const amount = direction === 'left' ? -380 : 380
    videoTrackRef.current.scrollBy({ left: amount, behavior: 'smooth' })
  }

  const showcasePhotos = photosData.slice(0, activeTab === 'photos' ? visiblePhotosCount : 12)

  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        
        <div className="section-header reveal up visible">
          <div className="section-label">Client Reviews & Gallery</div>
          <h2 className="section-title">What Our Clients Say</h2>
          <p className="section-subtitle">
            Browse our client video reviews, written testimonials, and real jobsite photos across Calgary.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="testimonials-tabs flex-center">
          <button
            className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Content
          </button>
          <button
            className={`tab-btn ${activeTab === 'videos' ? 'active' : ''}`}
            onClick={() => setActiveTab('videos')}
          >
            🎥 Video Testimonials ({VIDEO_TESTIMONIALS.length})
          </button>
          <button
            className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            ⭐ Written Reviews ({WRITTEN_TESTIMONIALS.length})
          </button>
          <button
            className={`tab-btn ${activeTab === 'photos' ? 'active' : ''}`}
            onClick={() => setActiveTab('photos')}
          >
            📷 Project Photos ({photosData.length})
          </button>
        </div>

        {/* ── 1. Video Testimonials Carousel ── */}
        {(activeTab === 'all' || activeTab === 'videos') && (
          <div className="video-testimonials-section" style={{ marginBottom: activeTab === 'all' ? '60px' : '0' }}>
            <div className="carousel-header flex-between" style={{ marginBottom: '20px' }}>
              <div>
                <h3 className="video-carousel-title">🎥 Client Video Testimonials ({VIDEO_TESTIMONIALS.length} Videos)</h3>
                <p className="video-carousel-sub">Swipe or click arrows to browse all 6 jobsite videos</p>
              </div>
              <div className="carousel-arrows">
                <button className="carousel-arrow" onClick={() => scrollVideoCarousel('left')} aria-label="Previous Video">
                  ←
                </button>
                <button className="carousel-arrow" onClick={() => scrollVideoCarousel('right')} aria-label="Next Video">
                  →
                </button>
              </div>
            </div>

            <div className="video-testimonials-track" ref={videoTrackRef}>
              {VIDEO_TESTIMONIALS.map(v => (
                <div key={v.id} className="video-testimonial-card">
                  <div className="video-wrapper">
                    <video
                      src={v.videoUrl}
                      controls
                      playsInline
                      preload="metadata"
                      className="video-player-elem"
                    />
                  </div>
                  <div className="video-card-body">
                    <div className="flex-between" style={{ marginBottom: '8px' }}>
                      <span className="service-tag-inline">{v.service}</span>
                      <div className="testimonial-stars">{v.stars}</div>
                    </div>
                    <h4 className="video-card-title">{v.title}</h4>
                    <p className="video-card-text">{v.text}</p>
                    <div className="video-card-author">
                      <strong>{v.author}</strong> — <span>{v.loc}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── 2. Written Client Reviews Grid ── */}
        {(activeTab === 'all' || activeTab === 'reviews') && (
          <div className="written-reviews-section" style={{ marginBottom: activeTab === 'all' ? '60px' : '0' }}>
            {activeTab === 'all' && (
              <div className="sub-section-title">
                <h3>⭐ Client Testimonials</h3>
              </div>
            )}
            <div className="testimonials-grid">
              {WRITTEN_TESTIMONIALS.map(t => (
                <div key={t.id} className="testimonial-card-item written-only">
                  <div className="testimonial-body">
                    <div className="testimonial-stars">{t.stars}</div>
                    <span className="service-tag-inline">{t.service}</span>
                    <h3 className="testimonial-title" style={{ marginTop: '8px' }}>{t.title}</h3>
                    <p className="testimonial-text">"{t.text}"</p>
                    <div className="testimonial-author">
                      <div className="author-avatar">{t.author.substring(0, 2)}</div>
                      <div className="author-info">
                        <strong>{t.author}</strong>
                        <span>{t.loc}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── 3. Client Project Photo Gallery ── */}
        {(activeTab === 'all' || activeTab === 'photos') && (
          <div className="testimonials-photos-section">
            {activeTab === 'all' && (
              <div className="sub-section-title">
                <h3>📷 Real Client Project Gallery</h3>
                <p>Browse recent jobsite photos uploaded by our clients</p>
              </div>
            )}
            <div className="testimonials-photos-grid">
              {showcasePhotos.map((p, idx) => (
                <div key={idx} className="photo-item-card" onClick={() => setActivePhoto(p.file)}>
                  <img src={p.file} alt={`Josan Client Project ${idx + 1}`} loading="lazy" />
                  <div className="photo-hover-overlay">
                    <span>🔍 View Photo</span>
                  </div>
                </div>
              ))}
            </div>

            {activeTab === 'photos' && visiblePhotosCount < photosData.length && (
              <div className="flex-center" style={{ marginTop: '32px' }}>
                <button
                  className="btn btn-primary"
                  onClick={() => setVisiblePhotosCount(prev => prev + 18)}
                >
                  <span>Load More Photos ({photosData.length - visiblePhotosCount} remaining)</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Lightbox Photo Viewer */}
        {activePhoto && (
          <div className="testimonial-video-modal" onClick={() => setActivePhoto(null)}>
            <div className="modal-content photo-modal" onClick={e => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setActivePhoto(null)}>✕</button>
              <img src={activePhoto} alt="Client Project Full View" className="modal-photo" />
            </div>
          </div>
        )}

      </div>
    </section>
  )
}
