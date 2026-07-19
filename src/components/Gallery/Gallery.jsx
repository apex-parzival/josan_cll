import { useState, useEffect } from 'react'
import './Gallery.css'

const GALLERY_ITEMS = [
  { img: '/assets/sod.webp', title: 'Sod Installation', size: 'large' },
  { img: '/assets/trees.webp', title: 'Trees & Lot Gardening', size: 'small' },
  { img: '/assets/Garage.webp', title: 'Garage Building', size: 'small' },
  { img: '/assets/patios-2.webp', title: 'Patio Design', size: 'small' },
  { img: '/assets/rock.webp', title: 'Rock Landscaping', size: 'large' }
]

export default function Gallery() {
  const [activeImg, setActiveImg] = useState(null)

  // Listen to Escape key to close lightbox
  useEffect(() => {
    if (!activeImg) return
    function handleEsc(e) {
      if (e.key === 'Escape') setActiveImg(null)
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [activeImg])

  return (
    <section className="gallery" id="gallery">
      <div className="container">
        
        <div className="section-header reveal up">
          <div className="section-label">Our Work</div>
          <h2 className="section-title">Projects That Speak<br />For Themselves</h2>
        </div>

        <div className="gallery-grid reveal up">
          {GALLERY_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className={`gallery-item gallery-item--${item.size}`}
              onClick={() => setActiveImg(item.img)}
            >
              <img src={item.img} alt={item.title} loading="lazy" />
              <div className="gallery-overlay">
                <span>{item.title}</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeImg && (
        <div className="lightbox-modal" onClick={() => setActiveImg(null)}>
          <div className="lightbox-content">
            <img src={activeImg} alt="Enlarged gallery project" />
            <button className="lightbox-close" onClick={() => setActiveImg(null)}>✕</button>
          </div>
        </div>
      )}
    </section>
  )
}
