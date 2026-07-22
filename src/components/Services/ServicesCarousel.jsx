import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './ServicesCarousel.css'

const ALL_SERVICES = [
  { id: 'artificial-grass-installation-turf', title: 'Artificial Grass', icon: '🌾', img: '/assets/sod.webp' },
  { id: 'trees', title: 'Trees & Landscaping', icon: '🌲', img: '/assets/trees.webp' },
  { id: 'basement-renovation', title: 'Basement Renovation', icon: '🏠', img: '/assets/basement.webp' },
  { id: 'basement-renovations', title: 'Basement Suite', icon: '🔨', img: '/assets/basement.webp' },
  { id: 'bobcat-service', title: 'Bobcat Service', icon: '🚜', img: '/assets/bobcat.webp' },
  { id: 'decking', title: 'Custom Decking', icon: '🪵', img: '/assets/deck.webp' },
  { id: 'deck-building-services', title: 'Deck Building', icon: '🏡', img: '/assets/deck.webp' },
  { id: 'fencing-services', title: 'Fencing Services', icon: '🪵', img: '/assets/fencing.webp' },
  { id: 'flower-bed', title: 'Flower Bed Design', icon: '🌸', img: '/assets/flower.webp' },
  { id: 'framing-service', title: 'Framing Service', icon: '🏗️', img: '/assets/framing.webp' },
  { id: 'garage', title: 'Garage Construction', icon: '🚘', img: '/assets/garage.webp' },
  { id: 'gate-building', title: 'Gate Building', icon: '🚪', img: '/assets/gate.webp' },
  { id: 'gazebo', title: 'Gazebo', icon: '🏛️', img: '/assets/gazebo.webp' },
  { id: 'professional-home-renovation', title: 'Home Renovation', icon: '✨', img: '/assets/home_renovation.webp' },
  { id: 'kitchen-service', title: 'Kitchen Remodeling', icon: '🍳', img: '/assets/kitchen.webp' },
  { id: 'lot-gardening', title: 'Lot Gardening', icon: '🌿', img: '/assets/gardening.webp' },
  { id: 'new-basement-construction', title: 'New Basement', icon: '🏗️', img: '/assets/basement.webp' },
  { id: 'painting-service', title: 'Painting Service', icon: '🎨', img: '/assets/painting.webp' },
  { id: 'patios', title: 'Patio Installation', icon: '🪴', img: '/assets/patio.webp' },
  { id: 'pergola-services', title: 'Pergola', icon: '🛖', img: '/assets/pergola.webp' },
  { id: 'railing', title: 'Railing & Gates', icon: '🛡️', img: '/assets/railing.webp' },
  { id: 'retaining-walls', title: 'Retaining Walls', icon: '🧱', img: '/assets/wall.webp' },
  { id: 'rock', title: 'Rock Landscaping', icon: '🪨', img: '/assets/rock.webp' },
  { id: 'sod', title: 'Sod Installation', icon: '🌱', img: '/assets/sod.webp' },
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
                <div className="carousel-card-icon">{item.icon}</div>
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
