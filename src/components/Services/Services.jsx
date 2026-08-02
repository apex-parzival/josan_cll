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
  'Painting Service': 'painting-service',
  'Flower Bed Design': 'flower-bed',
  'Framing Service': 'framing-service',
  'Garage Construction': 'garage',
  'Gate Building': 'gate-building',
  'Gazebo': 'gazebo',
  'Home Renovation': 'professional-home-renovation',
  'Kitchen Remodeling': 'kitchen-service',
  'New Basement Construction': 'new-basement-construction',
  'Rock Landscaping': 'rock'
}

const SERVICE_ITEMS = [
  { id: 'artificial-grass-installation-turf', title: 'Artificial Grass & Turf', desc: 'Low-maintenance, year-round green with premium artificial turf installation.', img: '/assets/artificial-grass-installation-turf.webp' },
  { id: 'deck-building-services', title: 'Deck Building', desc: 'Custom-built decks designed for durability, beauty, and your lifestyle.', img: '/assets/deck-building-services.webp' },
  { id: 'patios', title: 'Patios', desc: 'Elegant patio designs in stone, concrete, or pavers — perfect for outdoor living.', img: '/assets/patios.webp' },
  { id: 'fencing-services', title: 'Fencing Services', desc: 'Privacy, security, and style with our wide range of fencing solutions.', img: '/assets/fencing-services.webp' },
  { id: 'basement-renovations', title: 'Basement Renovations', desc: 'Transform your basement into a functional, beautiful living space.', img: '/assets/basement-renovations.webp' },
  { id: 'sod', title: 'Sod Installation', desc: 'Instant lush lawns with professional sod laying and aftercare guidance.', img: '/assets/sod.webp' },
  { id: 'retaining-walls', title: 'Retaining Walls', desc: 'Structural and decorative retaining walls built to last for decades.', img: '/assets/retaining-walls.webp' },
  { id: 'pergola-services', title: 'Pergola', desc: 'Beautiful custom pergolas designed for shade, style, and outdoor comfort.', img: '/assets/pergola-services.webp' },
  { id: 'bobcat-service', title: 'Bobcat Service', desc: 'Heavy equipment work for excavation, grading, and land preparation.', img: '/assets/bobcat-service.webp' },
  { id: 'trees', title: 'Trees & Lot Gardening', desc: 'Tree planting, removal, and full lot gardening services for any property size.', img: '/assets/trees.webp' },
  { id: 'railing', title: 'Railing & Gates', desc: 'Custom railings and gates that combine safety with stunning aesthetics.', img: '/assets/railing.webp' },
  { id: 'painting-service', title: 'Painting Service', desc: 'Interior and exterior painting with premium materials and flawless finish.', img: '/assets/painting-service.webp' },
  { id: 'flower-bed', title: 'Flower Bed Design', desc: 'Custom flower bed design, planting, and garden edging.', img: '/assets/flower-bed.webp' },
  { id: 'framing-service', title: 'Framing Service', desc: 'Structural wood and steel framing for homes and basements.', img: '/assets/framing-service.webp' },
  { id: 'garage', title: 'Garage Construction', desc: 'Custom detached and attached garage building in Calgary.', img: '/assets/Garage.webp' },
  { id: 'gate-building', title: 'Gate Building', desc: 'Heavy-duty wooden and metal entrance gates.', img: '/assets/gate-building.webp' },
  { id: 'gazebo', title: 'Gazebo', desc: 'Custom outdoor gazebo structures for relaxation and shade.', img: '/assets/gazebo.webp' },
  { id: 'professional-home-renovation', title: 'Home Renovation', desc: 'Complete interior and exterior home remodeling services.', img: '/assets/professional-home-renovation.webp' },
  { id: 'kitchen-service', title: 'Kitchen Remodeling', desc: 'High-end kitchen cabinetry, countertops, and full renovation.', img: '/assets/kitchen-service.webp' },
  { id: 'new-basement-construction', title: 'New Basement Construction', desc: 'Legal basement suite builds from bare concrete to turn-key completion.', img: '/assets/new-basement-construction.webp' },
  { id: 'rock', title: 'Rock Landscaping', desc: 'Decorative river rock, boulders, and gravel ground cover.', img: '/assets/rock.webp' }
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
              <div className="service-card-img-badge">
                <img src={s.img} alt={s.title} className="service-thumb-img" loading="lazy" />
              </div>
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
