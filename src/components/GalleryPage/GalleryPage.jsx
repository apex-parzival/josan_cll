import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './GalleryPage.css'
import defaultServiceGalleryMap from '../../service_galleries_map.json'
import { ServiceIcon } from '../Services/ServiceIcons'

const CATEGORIES = [
  { id: 'all', label: 'All Photos', serviceId: null, bg: '/assets/sod.webp' },
  { id: 'artificial-grass-installation-turf', label: 'Artificial Grass & Turf', serviceId: 'artificial-grass-installation-turf', bg: '/assets/artificial-grass-installation-turf.webp' },
  { id: 'basement-renovation', label: 'Basement Renovation', serviceId: 'basement-renovation', bg: '/assets/basement-renovations.webp' },
  { id: 'bobcat-service', label: 'Bobcat Service', serviceId: 'bobcat-service', bg: '/assets/bobcat-service.webp' },
  { id: 'decking', label: 'Decking', serviceId: 'decking', bg: '/assets/decking.webp' },
  { id: 'deck-building-services', label: 'Deck Building', serviceId: 'deck-building-services', bg: '/assets/deck-building-services.webp' },
  { id: 'fencing-services', label: 'Fencing Services', serviceId: 'fencing-services', bg: '/assets/fencing-services.webp' },
  { id: 'flower-bed', label: 'Flower Bed', serviceId: 'flower-bed', bg: '/assets/flower-bed.webp' },
  { id: 'framing-service', label: 'Framing Service', serviceId: 'framing-service', bg: '/assets/framing-service.webp' },
  { id: 'garage', label: 'Garage Construction', serviceId: 'garage', bg: '/assets/Garage.webp' },
  { id: 'gate-building', label: 'Gate Building', serviceId: 'gate-building', bg: '/assets/gate-building.webp' },
  { id: 'gazebo', label: 'Gazebo', serviceId: 'gazebo', bg: '/assets/gazebo.webp' },
  { id: 'kitchen-service', label: 'Kitchen Service', serviceId: 'kitchen-service', bg: '/assets/kitchen-service.webp' },
  { id: 'lot-gardening', label: 'Lot Gardening', serviceId: 'lot-gardening', bg: '/assets/lot-gardening.webp' },
  { id: 'new-basement-construction', label: 'New Basement Construction', serviceId: 'new-basement-construction', bg: '/assets/new-basement-construction.webp' },
  { id: 'painting-service', label: 'Painting Service', serviceId: 'painting-service', bg: '/assets/painting-service.webp' },
  { id: 'patios', label: 'Patios', serviceId: 'patios', bg: '/assets/patios.webp' },
  { id: 'pergola-services', label: 'Pergola Services', serviceId: 'pergola-services', bg: '/assets/pergola-services.webp' },
  { id: 'railing', label: 'Railing', serviceId: 'railing', bg: '/assets/railing.webp' },
  { id: 'retaining-walls', label: 'Retaining Walls', serviceId: 'retaining-walls', bg: '/assets/retaining-walls.webp' },
  { id: 'rock', label: 'Rock Landscaping', serviceId: 'rock', bg: '/assets/rock.webp' },
  { id: 'sod', label: 'Sod Installation', serviceId: 'sod', bg: '/assets/sod.webp' },
  { id: 'trees', label: 'Trees & Planting', serviceId: 'trees', bg: '/assets/trees.webp' }
]

const SERVICE_TARGET_CATEGORIES = CATEGORIES.filter(c => c.id !== 'all')

export default function GalleryPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('all')
  const [lightboxSrc, setLightboxSrc] = useState(null)
  const [visibleCount, setVisibleCount] = useState(24)
  const [failedPhotos, setFailedPhotos] = useState([])
  
  // Custom interactive gallery map state
  const [galleryMap, setGalleryMap] = useState(() => {
    try {
      const saved = localStorage.getItem('custom_gallery_map')
      return saved ? JSON.parse(saved) : defaultServiceGalleryMap
    } catch {
      return defaultServiceGalleryMap
    }
  })

  const [organizerMode, setOrganizerMode] = useState(true)
  const [activeMenuPhoto, setActiveMenuPhoto] = useState(null)
  const [toastMsg, setToastMsg] = useState(null)

  // Save to localStorage whenever map changes
  useEffect(() => {
    try {
      localStorage.setItem('custom_gallery_map', JSON.stringify(galleryMap))
    } catch (e) {
      console.error('Failed to save to localStorage', e)
    }
  }, [galleryMap])

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  // Reset visible count when tab changes
  useEffect(() => {
    setVisibleCount(24)
    setFailedPhotos([])
    setActiveMenuPhoto(null)
  }, [activeTab])

  // Close menus on click outside
  useEffect(() => {
    const handleWindowClick = () => setActiveMenuPhoto(null)
    window.addEventListener('click', handleWindowClick)
    return () => window.removeEventListener('click', handleWindowClick)
  }, [])

  function showToast(msg) {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(null), 3500)
  }

  function getAllPhotos() {
    const seen = new Set()
    const all = []
    Object.values(galleryMap).forEach(photos => {
      if (Array.isArray(photos)) {
        photos.forEach(p => {
          if (!seen.has(p)) { seen.add(p); all.push(p) }
        })
      }
    })
    return all
  }

  function movePhotoToCategory(photoPath, targetCategoryId) {
    setGalleryMap(prevMap => {
      const newMap = { ...prevMap }

      // 1. Remove photo from ALL existing categories
      Object.keys(newMap).forEach(catKey => {
        if (Array.isArray(newMap[catKey])) {
          newMap[catKey] = newMap[catKey].filter(p => p !== photoPath)
        }
      })

      // 2. Add photo ONLY to the target category
      if (!newMap[targetCategoryId]) {
        newMap[targetCategoryId] = []
      }
      if (!newMap[targetCategoryId].includes(photoPath)) {
        newMap[targetCategoryId].push(photoPath)
      }

      return newMap
    })

    const targetLabel = CATEGORIES.find(c => c.id === targetCategoryId)?.label || targetCategoryId
    showToast(`Photo moved to "${targetLabel}"`)
    setActiveMenuPhoto(null)
  }

  function exportJSON() {
    const jsonStr = JSON.stringify(galleryMap, null, 2)
    navigator.clipboard.writeText(jsonStr)
    
    // Also trigger file download
    const blob = new Blob([jsonStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'service_galleries_map.json'
    a.click()
    URL.revokeObjectURL(url)

    showToast("Downloaded service_galleries_map.json & copied to clipboard!")
  }

  function resetToDefault() {
    if (window.confirm("Reset all photo categories back to original default?")) {
      setGalleryMap(defaultServiceGalleryMap)
      localStorage.removeItem('custom_gallery_map')
      showToast("Reset to default category mappings.")
    }
  }

  const activeCategory = CATEGORIES.find(c => c.id === activeTab) || CATEGORIES[0]

  const rawPhotos = activeTab === 'all'
    ? getAllPhotos()
    : (galleryMap[activeTab] || [])

  const photos = rawPhotos.filter(p => !failedPhotos.includes(p))
  const visiblePhotos = photos.slice(0, visibleCount)
  const hasMore = visibleCount < photos.length

  function getCategoryCount(catId) {
    if (catId === 'all') return getAllPhotos().length
    return (galleryMap[catId] || []).length
  }

  // Find current category for a photo
  function getPhotoCurrentCategory(photoPath) {
    for (const [catKey, photoList] of Object.entries(galleryMap)) {
      if (Array.isArray(photoList) && photoList.includes(photoPath)) {
        const cat = CATEGORIES.find(c => c.id === catKey)
        return cat ? cat.label : catKey
      }
    }
    return 'Uncategorized'
  }

  return (
    <div className="gallery-page">
      {/* Toast Notification */}
      {toastMsg && <div className="gallery-toast">{toastMsg}</div>}

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

      {/* Photo Organizer Admin Control Bar */}
      <div className="organizer-toolbar">
        <div className="container organizer-toolbar-inner">
          <div className="organizer-toolbar-left">
            <label className="organizer-toggle-lbl">
              <input
                type="checkbox"
                checked={organizerMode}
                onChange={e => setOrganizerMode(e.target.checked)}
              />
              <span className="organizer-toggle-btn" />
              <strong>⚡ Photo Organizer Mode ({organizerMode ? 'ENABLED' : 'DISABLED'})</strong>
            </label>
            <span className="organizer-hint">
              {organizerMode ? 'Click the ⋮ menu on any photo to move it into its exact service category.' : 'Turn on to re-arrange & segregate photos.'}
            </span>
          </div>

          {organizerMode && (
            <div className="organizer-toolbar-right">
              <button className="btn-org btn-org-export" onClick={exportJSON}>
                📥 Save & Export JSON
              </button>
              <button className="btn-org btn-org-reset" onClick={resetToDefault}>
                🔄 Reset
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Category Filter Cards */}
      <div className="gallery-categories-section">
        <div className="container">
          <div className="section-header" style={{ marginBottom: '32px', textAlign: 'left' }}>
            <div className="section-label" style={{ margin: '0 0 10px 0' }}>Filter Work</div>
            <h2 className="section-title" style={{ margin: '0' }}>Select a Service Category</h2>
          </div>
          <div className="gallery-categories-grid">
            {CATEGORIES.map(cat => {
              const count = getCategoryCount(cat.id)
              if (cat.id !== 'all' && count === 0) return null
              return (
                <div
                  key={cat.id}
                  className={`category-card${activeTab === cat.id ? ' active' : ''}`}
                  onClick={() => setActiveTab(cat.id)}
                  style={{ backgroundImage: `url('${cat.bg}')` }}
                >
                  <div className="category-card-overlay" />
                  <div className="category-card-content">
                    <span className="category-card-icon">
                      <ServiceIcon name={cat.id} size={36} />
                    </span>
                    <h3 className="category-card-title">{cat.label}</h3>
                    <span className="category-card-count">{count} Photos</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Active Category Header */}
      <div className="gallery-content-area">
        <div className="container">
          <div className="gallery-content-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <ServiceIcon name={activeCategory.id} size={42} />
              <div>
                <h2 className="gallery-content-title" style={{ margin: 0 }}>
                  {activeCategory.label}
                </h2>
                <p className="gallery-content-sub" style={{ margin: 0 }}>
                  {photos.length} photo{photos.length !== 1 ? 's' : ''} in this category
                </p>
              </div>
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
                {visiblePhotos.map((photo, idx) => {
                  const isMenuOpen = activeMenuPhoto === photo
                  const currentCatLabel = getPhotoCurrentCategory(photo)

                  return (
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

                      {/* Organizer Badge / Category tag */}
                      {organizerMode && (
                        <div className="photo-cat-tag">
                          📁 {currentCatLabel}
                        </div>
                      )}

                      {/* Three-Dot Menu Button */}
                      {organizerMode && (
                        <div
                          className="photo-menu-btn"
                          onClick={(e) => {
                            e.stopPropagation()
                            setActiveMenuPhoto(isMenuOpen ? null : photo)
                          }}
                          title="Move Photo to Category"
                        >
                          ⋮
                        </div>
                      )}

                      {/* Three-Dot Dropdown Menu */}
                      {organizerMode && isMenuOpen && (
                        <div
                          className="photo-move-menu"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="move-menu-header">
                            <span>Move Photo to Folder:</span>
                            <button className="move-menu-close" onClick={() => setActiveMenuPhoto(null)}>✕</button>
                          </div>
                          <div className="move-menu-list">
                            {SERVICE_TARGET_CATEGORIES.map(targetCat => (
                              <button
                                key={targetCat.id}
                                className={`move-menu-item${galleryMap[targetCat.id]?.includes(photo) ? ' selected' : ''}`}
                                onClick={() => movePhotoToCategory(photo, targetCat.id)}
                              >
                                <ServiceIcon name={targetCat.id} size={20} />
                                <span>{targetCat.label}</span>
                                {galleryMap[targetCat.id]?.includes(photo) && <span className="move-check">✓</span>}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="gallery-photo-overlay">
                        <span className="gallery-photo-zoom">🔍 View Full</span>
                      </div>
                    </div>
                  )
                })}
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
