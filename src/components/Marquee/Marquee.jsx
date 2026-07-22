import { useNavigate } from 'react-router-dom'
import './Marquee.css'

const ITEMS = [
  { text: '🌿 Landscaping', id: 'lot-gardening' },
  { text: '🏗️ Deck Building', id: 'deck-building-services' },
  { text: '🪨 Patios', id: 'patios' },
  { text: '🌲 Trees & Sod', id: 'trees' },
  { text: '🔧 Fencing', id: 'fencing-services' },
  { text: '🏠 Basement Renovations', id: 'basement-renovation' },
  { text: '🌺 Flower Beds', id: 'flower-bed' },
  { text: '⛏️ Retaining Walls', id: 'retaining-walls' },
  { text: '🚜 Bobcat Service', id: 'bobcat-service' },
  { text: '🎨 Painting', id: 'painting-service' },
  { text: '🌾 Artificial Turf', id: 'artificial-grass-installation-turf' },
  { text: '🍳 Kitchen Remodeling', id: 'kitchen-service' },
  { text: '🚘 Garage Construction', id: 'garage' },
  { text: '🛖 Pergola', id: 'pergola-services' },
]

export default function Marquee() {
  const navigate = useNavigate()
  const doubled = [...ITEMS, ...ITEMS, ...ITEMS]

  function handleClick(id) {
    if (id) {
      navigate(`/services/${id}`)
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }

  return (
    <div className="marquee-strip" aria-label="Services Ticker">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} onClick={() => handleClick(item.id)} className="marquee-item">
            {item.text}
          </span>
        ))}
      </div>
    </div>
  )
}
