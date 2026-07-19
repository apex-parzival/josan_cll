import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Services.css'

const CARD_PAGE_MAP = {
  'Artificial Grass & Turf': 'artificial-grass-installation-turf',
  'Deck Building': 'deck-building-services',
  'Patios': 'patios',
  'Fencing Services': 'fencing-services',
  'Basement Renovations': 'basement-renovations',
  'Sod Installation': 'sod',
  'Retaining Walls': 'retaining-walls',
  'Pergola': 'pergola-services',
  'Bobcat Service': 'bobcat-service',
  'Trees & Lot Gardening': 'trees',
  'Railing & Gates': 'railing',
  'Painting Service': 'painting-service'
}

const SERVICE_ITEMS = [
  { icon: '🌿', title: 'Artificial Grass & Turf', desc: 'Low-maintenance, year-round green with premium artificial turf installation.' },
  { icon: '🏗️', title: 'Deck Building', desc: 'Custom-built decks designed for durability, beauty, and your lifestyle.' },
  { icon: '🪨', title: 'Patios', desc: 'Elegant patio designs in stone, concrete, or pavers — perfect for outdoor living.' },
  { icon: '🔧', title: 'Fencing Services', desc: 'Privacy, security, and style with our wide range of fencing solutions.' },
  { icon: '🏠', title: 'Basement Renovations', desc: 'Transform your basement into a functional, beautiful living space.' },
  { icon: '🌲', title: 'Sod Installation', desc: 'Instant lush lawns with professional sod laying and aftercare guidance.' },
  { icon: '⛏️', title: 'Retaining Walls', desc: 'Structural and decorative retaining walls built to last for decades.' },
  { icon: '🌴', title: 'Pergola', desc: 'Beautiful custom pergolas designed for shade, style, and outdoor comfort.' },
  { icon: '🚜', title: 'Bobcat Service', desc: 'Heavy equipment work for excavation, grading, and land preparation.' },
  { icon: '🌳', title: 'Trees & Lot Gardening', desc: 'Tree planting, removal, and full lot gardening services for any property size.' },
  { icon: '🪟', title: 'Railing & Gates', desc: 'Custom railings and gates that combine safety with stunning aesthetics.' },
  { icon: '🎨', title: 'Painting Service', desc: 'Interior and exterior painting with premium materials and flawless finish.' }
]

export default function Services() {
  const navigate = useNavigate()
  const [showAll, setShowAll] = useState(false)

  function handleCardClick(title) {
    const pageId = CARD_PAGE_MAP[title]
    if (pageId) {
      navigate('/services/' + pageId)
      window.scrollTo({ top: 0, behavior: 'instant' })
    } else {
      const el = document.getElementById('contact')
      if (el) window.scrollTo({ top: el.offsetTop - 72, behavior: 'smooth' })
    }
  }

  const visibleItems = showAll ? SERVICE_ITEMS : SERVICE_ITEMS.slice(0, 8)

  return (
    <section className="services" id="services">
      <div className="container">
        
        <div className="section-header reveal up">
          <div className="section-label">What We Offer</div>
          <h2 className="section-title">Comprehensive Landscaping<br />& Construction Services</h2>
          <p className="section-subtitle">From the ground up — indoor and outdoor, we handle it all with expertise and dedication.</p>
        </div>

        <div className="services-grid">
          {visibleItems.map((s, idx) => (
            <div key={idx} className={`service-card reveal up d${(idx % 3) + 1}`}>
              <span className="service-icon" role="img" aria-label={s.title}>{s.icon}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <button className="service-btn" onClick={() => handleCardClick(s.title)}>
                Learn More →
              </button>
            </div>
          ))}
        </div>

        <div className="services-more reveal up">
          <p>And many more services including Kitchen Service, Rock, Flower Beds, Framing, Garage Building & more.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '20px', flexWrap: 'wrap' }}>
            {!showAll ? (
              <button className="btn btn-primary" onClick={() => setShowAll(true)}>
                <span>Show All Services</span>
              </button>
            ) : (
              <button className="btn btn-outline dark" onClick={() => setShowAll(false)}>
                Show Less
              </button>
            )}
            <button className="btn btn-outline dark" onClick={() => {
              const el = document.getElementById('contact')
              if (el) window.scrollTo({ top: el.offsetTop - 72, behavior: 'smooth' })
            }}>
              Get a Quote
            </button>
          </div>
        </div>

      </div>
    </section>
  )
}
