import { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './ServiceDetailPage.css'
import servicesData from '../../services_content_all.json'
import IntroAnimation from '../ScrollSequence/IntroAnimation'
import Marquee from '../Marquee/Marquee'
import serviceGalleryMap from '../../service_galleries_map.json'
import { getServiceSeo } from '../../seo/seoConfig'
import { getServiceCards } from '../../seo/serviceCards'
import { CALGARY_FACTS, FACTS_DISCLAIMER, RELATED_SERVICES } from '../../seo/calgaryFacts'

const VIDEO_FILES = {
  'artificial-grass-installation-turf': 'artificial grass.mp4',
  'trees': 'backyard renovaiton.mp4',
  'basement-renovation': 'basement renovation.mp4',
  'basement-renovations': 'basement renovation 24.mp4',
  'bobcat-service': 'bobcat.mp4',
  'decking': 'deck.mp4',
  'deck-building-services': 'deck building.mp4',
  'fencing-services': 'fencing.mp4',
  'flower-bed': 'flower bed.mp4',
  'framing-service': 'framing.mp4',
  'garage': 'garage.mp4',
  'gate-building': 'gate building.mp4',
  'gazebo': 'gazebo.mp4',
  'professional-home-renovation': 'home renovation.mp4',
  'kitchen-service': 'kitchen.mp4',
  'lot-gardening': 'lot gardening and landscaping.mp4',
  'new-basement-construction': 'basement construction.mp4',
  'painting-service': 'painting.mp4',
  'patios': 'patio.mp4',
  'pergola-services': 'pergola.mp4',
  'railing': 'railing.mp4',
  'retaining-walls': 'retaining walls.mp4',
  'rock': 'rock landscaping.mp4',
  'sod': 'sod.mp4'
}

export default function ServiceDetailPage() {
  const { serviceId } = useParams()
  const navigate = useNavigate()
  const [showIntro, setShowIntro] = useState(true)
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [failedPhotos, setFailedPhotos] = useState([])

  const service = servicesData[serviceId]
  const seo = getServiceSeo(serviceId)
  const image = service ? service.image : '/assets/sod.webp'
  const servicePhotos = serviceGalleryMap[serviceId] || []
  const activePhotos = servicePhotos.filter(photo => !failedPhotos.includes(photo))

  const onBack = () => {
    navigate('/')
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    setShowIntro(true)
  }, [serviceId])

  const handleIntroComplete = useCallback(() => {
    setShowIntro(false)
  }, [])

  if (!service) {
    return (
      <div className="service-error">
        <h2>Service Not Found</h2>
        <button className="btn btn-primary" onClick={onBack}><span>Back to Home</span></button>
      </div>
    )
  }

  const serviceCards = getServiceCards(service.paragraphs)

  return (
    <article className="service-detail">
      {/* Fullscreen Motion Video Intro Overlay */}
      {showIntro && VIDEO_FILES[serviceId] && (
        <IntroAnimation
          key={serviceId}
          videoFile={VIDEO_FILES[serviceId]}
          onComplete={handleIntroComplete}
        />
      )}

      {/* Detail Hero Header */}
      <header className="detail-hero" style={{ backgroundImage: `url('${image}')` }}>
        <div className="detail-hero-overlay" />
        <div className="container detail-hero-content">
          <span className="detail-badge">Calgary &amp; Surrounding Areas</span>
          <h1 className="detail-title">{seo.h1}</h1>
          <p className="detail-subtitle" style={{ color: 'rgba(255,255,255,.85)', marginTop: '12px', fontSize: '1.1rem' }}>{service.title}</p>
        </div>
      </header>

      {/* Green Marquee Ticker Strip */}
      <Marquee />

      {/* Main Content Body - Info in Cards */}
      <div className="detail-body-section">
        <div className="container">
          {/* Top Navigation Bar */}
          <div className="detail-top-nav">
            <button className="btn-back-text" onClick={onBack}>
              ← Back to Home
            </button>
            <div className="detail-breadcrumbs">
              <a href="/" className="crumb" onClick={e => { e.preventDefault(); onBack() }}>Home</a>
              <span className="crumb-sep">/</span>
              <span className="crumb-current">{seo.name}</span>
            </div>
          </div>

          <div className="detail-grid">
            {/* Main Content Column */}
            <div className="detail-content-area">
              {serviceCards.map((card, idx) => (
                <div key={idx} className="detail-paragraph">
                  {card.heading && <h2 className="card-question">{card.heading}</h2>}
                  {card.text && <p className="card-answer">{card.text}</p>}
                </div>
              ))}

              {/* Calgary permit facts (source-cited) */}
              {CALGARY_FACTS[serviceId] && (
                <section className="detail-paragraph calgary-facts" id="calgary-permit-facts">
                  <h2 className="card-question">{CALGARY_FACTS[serviceId].heading}</h2>
                  <ul className="calgary-facts-list">
                    {CALGARY_FACTS[serviceId].points.map((pt, i) => <li key={i}>{pt}</li>)}
                  </ul>
                  <p className="calgary-facts-note">
                    {FACTS_DISCLAIMER} Source:{' '}
                    {CALGARY_FACTS[serviceId].sources.map((src, i) => (
                      <a key={i} href={src.url} target="_blank" rel="noopener noreferrer">{src.label}</a>
                    ))}
                  </p>
                </section>
              )}

              {/* Related services (contextual internal links) */}
              {RELATED_SERVICES[serviceId] && (
                <nav className="detail-paragraph related-services" aria-label="Related services">
                  <h2 className="card-question">Related services in Calgary</h2>
                  <ul className="related-services-list">
                    {RELATED_SERVICES[serviceId].filter(id => servicesData[id]).map(id => (
                      <li key={id}>
                        <a href={`/services/${id}`} onClick={e => { e.preventDefault(); navigate(`/services/${id}`) }}>
                          {getServiceSeo(id).h1}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}

              {/* Real Project Gallery for this Service */}
              {activePhotos.length > 0 && (
                <div className="service-gallery-block">
                  <h3 className="service-gallery-title">📷 Real {seo.name} Projects in Calgary</h3>
                  <div className="service-gallery-grid">
                    {activePhotos.map((photo, pIdx) => (
                      <div key={pIdx} className="service-gallery-thumb" onClick={() => setSelectedPhoto(photo)}>
                        <img 
                          src={photo} 
                          alt={`${seo.name} project in Calgary – photo ${pIdx + 1}`} 
                          loading="lazy" 
                          onError={() => setFailedPhotos(prev => [...prev, photo])}
                        />
                        <div className="thumb-overlay">🔍 View</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar Column */}
            <aside className="detail-sidebar">
              <div className="sidebar-card quote-sidebar">
                <h3>Request a Free Quote</h3>
                <p>Ready to start your {seo.name.toLowerCase()} project in Calgary? Fill out our form or call us directly for a free estimate.</p>
                <div className="sidebar-contact-links" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <a href="tel:5873944029" className="sidebar-phone-btn">
                    📞 Call +1 (587) 394-4029
                  </a>
                  <a href="tel:5872278001" className="sidebar-phone-btn" style={{ background: 'var(--g700)' }}>
                    📞 Call +1 (587) 227-8001
                  </a>
                  <button className="btn btn-primary full" onClick={() => {
                    const contactSection = document.getElementById('contact')
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}>
                    <span>Get a Free Estimate</span>
                  </button>
                </div>
              </div>

              <div className="sidebar-card details-sidebar">
                <h3>Why Work With Us?</h3>
                <ul className="sidebar-features-list">
                  <li>✓ 8+ Years Calgary Experience</li>
                  <li>✓ Fully Licensed & Insured</li>
                  <li>✓ Transparent Upfront Pricing</li>
                  <li>✓ Skilled & Trusted Crew</li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* Lightbox Photo Modal */}
      {selectedPhoto && (
        <div className="testimonial-video-modal" onClick={() => setSelectedPhoto(null)}>
          <div className="modal-content photo-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedPhoto(null)}>✕</button>
            <img src={selectedPhoto} alt="Project Full View" className="modal-photo" />
          </div>
        </div>
      )}
    </article>
  )
}
