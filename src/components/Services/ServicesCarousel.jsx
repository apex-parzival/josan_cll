import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './ServicesCarousel.css'
import { ServiceIcon } from './ServiceIcons'

const ALL_SERVICES = [
  { id: 'artificial-grass-installation-turf', title: 'Artificial Grass', img: '/assets/sod.webp' },
  { id: 'trees', title: 'Trees & Landscaping', img: '/assets/trees.webp' },
  { id: 'basement-renovation', title: 'Basement Renovation', img: '/assets/basement-renovations.webp' },
  { id: 'basement-renovations', title: 'Basement Suite', img: '/assets/basement-renovations.webp' },
  { id: 'bobcat-service', title: 'Bobcat Service', img: '/assets/bobcat-service.webp' },
  { id: 'decking', title: 'Custom Decking', img: '/assets/deck-building-services.webp' },
  { id: 'deck-building-services', title: 'Deck Building', img: '/assets/deck-building-services.webp' },
  { id: 'fencing-services', title: 'Fencing Services', img: '/assets/fencing-services.webp' },
  { id: 'flower-bed', title: 'Flower Bed Design', img: '/assets/flower-bed.webp' },
  { id: 'framing-service', title: 'Framing Service', img: '/assets/framing-service.webp' },
  { id: 'garage', title: 'Garage Construction', img: '/assets/Garage.webp' },
  { id: 'gate-building', title: 'Gate Building', img: '/assets/gate-building.webp' },
  { id: 'gazebo', title: 'Gazebo', img: '/assets/gazebo.webp' },
  { id: 'professional-home-renovation', title: 'Home Renovation', img: '/assets/professional-home-renovation.webp' },
  { id: 'kitchen-service', title: 'Kitchen Remodeling', img: '/assets/kitchen-service.webp' },
  { id: 'lot-gardening', title: 'Lot Gardening', img: '/assets/lot-gardening.webp' },
  { id: 'new-basement-construction', title: 'New Basement', img: '/assets/basement-renovations.webp' },
  { id: 'painting-service', title: 'Painting Service', img: '/assets/painting-service.webp' },
  { id: 'patios', title: 'Patio Installation', img: '/assets/patios.webp' },
  { id: 'pergola-services', title: 'Pergola', img: '/assets/pergola-services.webp' },
  { id: 'railing', title: 'Railing & Gates', img: '/assets/railing.webp' },
  { id: 'retaining-walls', title: 'Retaining Walls', img: '/assets/retaining-walls.webp' },
  { id: 'rock', title: 'Rock Landscaping', img: '/assets/rock.webp' },
  { id: 'sod', title: 'Sod Installation', img: '/assets/sod.webp' },
]

export default function ServicesCarousel({ currentServiceId }) {
  const navigate = useNavigate()
  const trackRef = useRef(null)

  function handleScroll(direction) {
    if (!trackRef.current) return
    const scrollAmount = direction === 'left' ? -340 : 340
    trackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }

  function handleCardClick(id) {
    navigate(`/services/${id}`)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  return (
    <div className="services-carousel-bar">
      <div className="container">
        <div className="carousel-header flex-between">
          <div className="carousel-titles">
            <span className="carousel-badge">Quick Navigation</span>
            <h3 className="carousel-heading">Explore All Services</h3>
          </div>
          <div className="carousel-arrows">
            <button className="carousel-arrow" onClick={() => handleScroll('left')} aria-label="Scroll Left">
              ←
            </button>
            <button className="carousel-arrow" onClick={() => handleScroll('right')} aria-label="Scroll Right">
              →
            </button>
          </div>
        </div>

        <div className="services-carousel-track" ref={trackRef}>
          {ALL_SERVICES.map(item => {
            const isActive = item.id === currentServiceId
            return (
              <div
                key={item.id}
                className={`carousel-card ${isActive ? 'active' : ''}`}
                onClick={() => handleCardClick(item.id)}
              >
                <div className="carousel-card-icon">
                  <ServiceIcon name={item.id} size={32} />
                </div>
                <div className="carousel-card-info">
                  <span className="carousel-card-title">{item.title}</span>
                  <span className="carousel-card-link">View Service →</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
