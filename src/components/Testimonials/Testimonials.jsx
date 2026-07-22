import { useState } from 'react'
import './Testimonials.css'

const TESTIMONIALS_DATA = [
  {
    id: 1,
    type: 'video',
    videoUrl: '/assets/testimonials/testimonial_1.mp4',
    poster: '/assets/patio.webp',
    stars: '★★★★★',
    title: 'Backyard Renovation & Patio',
    text: "Josan transformed our outdoor space completely. The craftsmanship on the stone patio and retaining wall exceeded our expectations!",
    author: 'Michael & Sarah R.',
    loc: 'Cornerstone, Calgary',
    service: 'Patio & Retaining Walls'
  },
  {
    id: 2,
    type: 'video',
    videoUrl: '/assets/testimonials/testimonial_2.mp4',
    poster: '/assets/basement.webp',
    stars: '★★★★★',
    title: 'Legal Basement Suite Construction',
    text: "From framing to final painting, the Josan crew was clean, fast, and fully transparent with pricing. Our legal suite looks incredible!",
    author: 'David K.',
    loc: 'Saddle Ridge, Calgary',
    service: 'Basement Construction'
  },
  {
    id: 3,
    type: 'text',
    poster: '/assets/deck.webp',
    stars: '★★★★★',
    title: 'Custom Decking & Fencing',
    text: "We hired Josan for our composite deck building and perimeter fencing. The team was punctual, respectful, and delivered 10/10 quality.",
    author: 'Jennifer P.',
    loc: 'Redstone, Calgary',
    service: 'Deck & Fencing'
  },
  {
    id: 4,
    type: 'text',
    poster: '/assets/sod.webp',
    stars: '★★★★★',
    title: 'Artificial Grass & Landscaping',
    text: "No more muddy paw prints! The artificial turf installation was fast, seamless, and looks lush green all year round. Highly recommended!",
    author: 'Robert M.',
    loc: 'Calgary, AB',
    service: 'Artificial Grass'
  }
]

export default function Testimonials() {
  const [activeTab, setActiveTab] = useState('all')
  const [activeVideo, setActiveVideo] = useState(null)

  const filtered = TESTIMONIALS_DATA.filter(t => {
    if (activeTab === 'video') return t.type === 'video'
    if (activeTab === 'written') return t.type === 'text'
    return true
  })

  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        
        <div className="section-header reveal up">
          <div className="section-label">Client Reviews</div>
          <h2 className="section-title">What Our Clients Say</h2>
          <p className="section-subtitle">
            Real video stories and reviews from property owners across Calgary.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="testimonials-tabs flex-center reveal up">
          <button
            className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Reviews
          </button>
          <button
            className={`tab-btn ${activeTab === 'video' ? 'active' : ''}`}
            onClick={() => setActiveTab('video')}
          >
            🎥 Video Reviews
          </button>
          <button
            className={`tab-btn ${activeTab === 'written' ? 'active' : ''}`}
            onClick={() => setActiveTab('written')}
          >
            ⭐ Written Reviews
          </button>
        </div>

        {/* Testimonials Grid */}
        <div className="testimonials-grid reveal up">
          {filtered.map(t => (
            <div key={t.id} className="testimonial-card-item">
              
              {/* Media Block (Video or Image) */}
              <div className="testimonial-media">
                <img src={t.poster} alt={t.title} className="media-poster" />
                <div className="media-overlay" />
                {t.type === 'video' ? (
                  <button
                    className="video-play-btn"
                    onClick={() => setActiveVideo(t.videoUrl)}
                    aria-label="Play video review"
                  >
                    ▶
                  </button>
                ) : (
                  <div className="verified-badge">✓ Verified Client</div>
                )}
                <span className="service-tag">{t.service}</span>
              </div>

              {/* Body Content */}
              <div className="testimonial-body">
                <div className="testimonial-stars">{t.stars}</div>
                <h3 className="testimonial-title">{t.title}</h3>
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

        {/* Modal Video Player */}
        {activeVideo && (
          <div className="testimonial-video-modal" onClick={() => setActiveVideo(null)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setActiveVideo(null)}>✕</button>
              <video src={activeVideo} controls autoPlay className="modal-video" />
            </div>
          </div>
        )}

      </div>
    </section>
  )
}
