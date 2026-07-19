import './Marquee.css'

const ITEMS = [
  '🌿 Landscaping','🏗️ Deck Building','🪨 Patios',
  '🌲 Trees & Sod','🔧 Fencing','🏠 Basement Renovations',
  '🌺 Flower Beds','⛏️ Retaining Walls','🚜 Bobcat Service','🎨 Painting',
]

export default function Marquee() {
  const doubled = [...ITEMS, ...ITEMS]
  return (
    <div className="marquee-strip" aria-hidden="true">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i}>{item}</span>
        ))}
      </div>
    </div>
  )
}
