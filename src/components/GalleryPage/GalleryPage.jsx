import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './GalleryPage.css'
import serviceGalleryMap from '../../service_galleries_map.json'

const CATEGORIES = [
  { id: 'all', label: 'All Photos', icon: '🖼️', serviceId: null },
  { id: 'artificial-grass-installation-turf', label: 'Artificial Grass & Turf', icon: '🌿', serviceId: 'artificial-grass-installation-turf' },
  { id: 'sod', label: 'Sod Installation', icon: '🌲', serviceId: 'sod' },
  { id: 'decking', label: 'Decking', icon: '🏗️', serviceId: 'decking' },
  { id: 'deck-building-services', label: 'Deck Building', icon: '🪵', serviceId: 'deck-building-services' },
  { id: 'fencing-services', label: 'Fencing Services', icon: '🔧', serviceId: 'fencing-services' },
  { id: 'patios', label: "Patio's", icon: '🪨', serviceId: 'patios' },
  { id: 'retaining-walls', label: 'Retaining Walls', icon: '⛏️', serviceId: 'retaining-walls' },
  { id: 'lot-gardening', label: 'Lot Gardening', icon: '🌳', serviceId: 'lot-gardening' },
  { id: 'basement-renovation', label: 'Basement Renovation', icon: '🏠', serviceId: 'basement-renovation' },
]

function getAllPhotos() {
  const seen = new Set()
  const all = []
  Object.values(serviceGalleryMap).forEach(photos => {
    photos.forEach(p => {
      if (!seen.has(p)) { seen.add(p); all.push(p) }
    })
  })
  return all
}

export default function GalleryPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('all')
  const [lightboxSrc, setLightboxSrc] = useState(null)
  const [visibleCount, setVisibleCount] = useState(24)
  const [failedPhotos, setFailedPhotos] = useState([])

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  // Reset visible count when tab changes
  useEffect(() => {
    setVisibleCount(24)
    setFailedPhotos([])
  }, [activeTab])

  // Escape key closes lightbox
  useEffect(() => {
    if (!lightboxSrc) return
    const handle = e => { if (e.key === 'Escape') setLightboxSrc(null) }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [lightboxSrc])

  const activeCategory = CATEGORIES.find(c => c.id === activeTab)

  const rawPhotos = activeTab === 'all'
    ? getAllPhotos()
    : (serviceGalleryMap[activeTab] || [])

  const photos = rawPhotos.filter(p => !failedPhotos.includes(p))
  const visiblePhotos = photos.slice(0, visibleCount)
  const hasMore = visibleCount < photos.length

  function getCategoryCount(catId) {
    if (catId === 'all') return getAllPhotos().length
    return (serviceGalleryMap[catId] || []).length
  }

  return (
    <div className="gallery-page">
      {/* Hero Banner */}
      <header className="gallery-page-hero">
        <div className="gallery-hero-overlay" />
        <div className="container gallery-hero-content">
          <button className="gallery-back-btn" onClick={() => { navigate('/'); window.scrollTo({ top: 0, behavior: 'instant' }) }}>
            ← Back to Home
          </button>
          <div className="section-label light">Our Portfolio</div>
          <h1 className="gallery-hero-title">Project Gallery</h1>
          <p className="gallery-hero-sub">
            Browse real photos from our completed landscaping & construction projects across Calgary.
          </p>
          <div className="gallery-hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-number">{getAllPhotos().length}+</span>
              <span className="hero-stat-label">Project Photos</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="hero-stat-number">{CATEGORIES.length - 1}</span>
              <span className="hero-stat-label">Service Categories</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="hero-stat-number">15+</span>
              <span className="hero-stat-label">Years Experience</span>
            </div>
          </div>
        </div>
      </header>

      {/* Category Filter Tabs */}
      <div className="gallery-filter-bar">
        <div className="container">
          <div className="gallery-tabs-scroll">
            {CATEGORIES.map(cat => {
              const count = getCategoryCount(cat.id)
              if (cat.id !== 'all' && count === 0) return null
              return (
                <button
                  key={cat.id}
                  className={`gallery-tab-btn${activeTab === cat.id ? ' active' : ''}`}
                  onClick={() => setActiveTab(cat.id)}
                >
                  <span className="tab-icon">{cat.icon}</span>
                  <span className="tab-label">{cat.label}</span>
                  <span className="tab-count">{count}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Active Category Header */}
      <div className="gallery-content-area">
        <div className="container">
          <div className="gallery-content-header">
            <div>
              <h2 className="gallery-content-title">
                {activeCategory.icon} {activeCategory.label}
              </h2>
              <p className="gallery-content-sub">
                {photos.length} photo{photos.length !== 1 ? 's' : ''} in this category
              </p>
            </div>
            {activeCategory.serviceId && (
              <button
                className="btn btn-primary gallery-service-btn"
                onClick={() => {
                  navigate(`/services/${activeCategory.serviceId}`)
                  window.scrollTo({ top: 0, behavior: 'instant' })
                }}
              >
                <span>View Service Details →</span>
              </button>
            )}
          </div>

          {/* Photo Grid */}
          {visiblePhotos.length === 0 ? (
            <div className="gallery-empty">
              <span className="gallery-empty-icon">📷</span>
              <p>No photos available for this category yet.</p>
              <button className="btn btn-outline dark" onClick={() => setActiveTab('all')}>
                Browse All Photos
              </button>
            </div>
          ) : (
            <>
              <div className="gallery-photo-grid">
                {visiblePhotos.map((photo, idx) => (
                  <div
                    key={idx}
                    className="gallery-photo-item"
                    onClick={() => setLightboxSrc(photo)}
                  >
                    <img
                      src={photo}
                      alt={`${activeCategory.label} project photo ${idx + 1}`}
                      loading="lazy"
                      onError={() => setFailedPhotos(prev => [...prev, photo])}
                    />
                    <div className="gallery-photo-overlay">
                      <span className="gallery-photo-zoom">🔍 View Full</span>
                    </div>
                  </div>
                ))}
              </div>

              {hasMore && (
                <div className="gallery-load-more">
                  <button
                    className="btn btn-primary"
                    onClick={() => setVisibleCount(prev => prev + 24)}
                  >
                    <span>Load More Photos ({photos.length - visibleCount} remaining)</span>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxSrc && (
        <div className="gallery-lightbox" onClick={() => setLightboxSrc(null)}>
          <div className="gallery-lightbox-content" onClick={e => e.stopPropagation()}>
            <button className="gallery-lightbox-close" onClick={() => setLightboxSrc(null)}>✕</button>
            <img src={lightboxSrc} alt="Project Full View" className="gallery-lightbox-img" />
          </div>
        </div>
      )}
    </div>
  )
}
