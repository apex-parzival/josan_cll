import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './Testimonials.css'

const VIDEO_TESTIMONIALS = [
  {
    id: 1,
    videoUrl: '/assets/testimonials/testimonial_video_1.mp4',
    stars: '★★★★★',
    title: 'Backyard Landscaping & Sod Installation',
    text: 'Watch our jobsite transformation — precision sod installation and complete backyard landscaping in Calgary.',
    author: 'Gurpreet & Family',
    loc: 'Cornerstone, Calgary',
    service: 'Landscaping & Sod'
  },
  {
    id: 2,
    videoUrl: '/assets/testimonials/testimonial_video_2.mp4',
    stars: '★★★★★',
    title: 'Custom Decking & Retaining Wall',
    text: 'See our custom multi-level deck building and heavy-duty stone retaining wall construction.',
    author: 'Michael R.',
    loc: 'Saddle Ridge, Calgary',
    service: 'Decking & Wall'
  },
  {
    id: 3,
    videoUrl: '/assets/testimonials/testimonial_video_3.mp4',
    stars: '★★★★★',
    title: 'Legal Basement Suite Renovation',
    text: 'Tour this legal basement suite transformation from initial framing to final high-end finishes.',
    author: 'Amandeep S.',
    loc: 'Redstone, Calgary',
    service: 'Basement Renovation'
  },
  {
    id: 4,
    videoUrl: '/assets/testimonials/testimonial_video_4.mp4',
    stars: '★★★★★',
    title: 'Perimeter Fencing & Patio Design',
    text: 'Check out this custom cedar fence building and modern outdoor stone patio project.',
    author: 'Sarah & David L.',
    loc: 'Savanna, Calgary',
    service: 'Fencing & Patio'
  },
  {
    id: 5,
    videoUrl: '/assets/testimonials/testimonial_video_5.mp4',
    stars: '★★★★★',
    title: 'Bobcat Service & Site Excavation',
    text: 'Precision Bobcat excavation, lot grading, and site preparation executed by skilled operators.',
    author: 'Jason K.',
    loc: 'Calgary, AB',
    service: 'Bobcat Service'
  },
  {
    id: 6,
    videoUrl: '/assets/testimonials/testimonial_video_6.mp4',
    stars: '★★★★★',
    title: 'Whole Home Interior Renovation',
    text: 'Full interior remodeling and structural framing project walkthrough completed by Josan Construction.',
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
  const navigate = useNavigate()
  const videoTrackRef = useRef(null)

  function scrollVideoCarousel(direction) {
    if (!videoTrackRef.current) return
    const amount = direction === 'left' ? -390 : 390
    videoTrackRef.current.scrollBy({ left: amount, behavior: 'smooth' })
  }

  return (
    <section className="testimonials" id="testimonials">
      <div className="container">

        <div className="section-header reveal up visible">
          <div className="section-label">Client Reviews</div>
          <h2 className="section-title">What Our Clients Say</h2>
          <p className="section-subtitle">
            Watch real jobsite videos and read reviews from homeowners across Calgary who trusted Josan Construction & Landscaping.
          </p>
        </div>

        {/* Video Testimonials Section */}
        <div className="testimonials-video-section" style={{ marginBottom: '56px' }}>
          <div className="testimonials-sub-header">
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.5rem', color: 'var(--dark-2)', margin: 0 }}>
              🎥 Real Jobsite Video Walkthroughs
            </h3>
            <div className="carousel-arrows" style={{ display: 'flex', gap: '8px' }}>
              <button className="carousel-arrow" onClick={() => scrollVideoCarousel('left')} aria-label="Previous Video">←</button>
              <button className="carousel-arrow" onClick={() => scrollVideoCarousel('right')} aria-label="Next Video">→</button>
            </div>
          </div>

          <div className="testimonials-video-track" ref={videoTrackRef} style={{ display: 'flex', gap: '20px', overflowX: 'auto', paddingBottom: '16px', scrollSnapType: 'x mandatory' }}>
            {VIDEO_TESTIMONIALS.map(v => (
              <div key={v.id} className="testimonial-video-card" style={{ flex: '0 0 340px', background: '#fff', borderRadius: '16px', border: '1px solid var(--gray-2)', overflow: 'hidden', boxShadow: 'var(--sh-sm)', scrollSnapAlign: 'start' }}>
                <div style={{ position: 'relative', width: '100%', height: '220px', background: '#000' }}>
                  <video
                    src={v.videoUrl}
                    controls
                    playsInline
                    preload="metadata"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ background: '#e6f4e6', color: 'var(--g700)', padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600' }}>{v.service}</span>
                    <span style={{ color: '#f59e0b' }}>{v.stars}</span>
                  </div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--dark-2)', marginBottom: '6px' }}>{v.title}</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--gray-6)', lineHeight: '1.5', marginBottom: '14px' }}>{v.text}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'var(--g700)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.85rem' }}>{v.author.substring(0, 2)}</div>
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.85rem', color: 'var(--dark-2)' }}>{v.author}</strong>
                      <span style={{ fontSize: '0.75rem', color: 'var(--gray-5)' }}>{v.loc}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Written Reviews Header */}
        <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.5rem', color: 'var(--dark-2)', marginBottom: '20px' }}>
          ⭐ Written Client Reviews
        </h3>

        {/* Written Reviews Grid */}
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

        {/* CTA to Reviews Page */}
        <div className="testimonials-cta reveal up" style={{ textAlign: 'center', marginTop: '48px' }}>
          <p style={{ color: 'var(--gray-5)', marginBottom: '16px', fontSize: '0.95rem' }}>
            See all video testimonials and written reviews from our clients.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => { navigate('/reviews'); window.scrollTo({ top: 0, behavior: 'instant' }) }}
          >
            <span>See All Reviews & Videos →</span>
          </button>
        </div>

      </div>
    </section>
  )
}
