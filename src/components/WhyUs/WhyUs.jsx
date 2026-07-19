import './WhyUs.css'

const WHY_CARDS = [
  { icon: '👷', title: 'Professional & Expert Team', desc: 'Our builders have years of experience. They make every basement, deck, and outdoor project strong, safe, and built perfectly.' },
  { icon: '💰', title: 'Clear and Affordable Pricing', desc: 'We keep costs clear and honest, giving you value without hidden charges, and quality results that suit your budget.' },
  { icon: '📋', title: 'Plan with Confidence', desc: 'We consult, plan, and guide you through every step — so you know exactly what to expect before work even begins.' },
  { icon: '🛠️', title: 'Build with Care', desc: 'Our experienced team handles basements, decks, and outdoor work with safe methods, appropriate tools, and quality-checked results.' },
  { icon: '🏆', title: 'Finish with Pride', desc: 'We complete every detail, clean the site, and leave you with a home upgrade that feels ready to enjoy.' },
  { icon: '📍', title: 'Local Calgary Experts', desc: 'Born and raised in Calgary, we understand the climate, soil, and unique needs of local properties better than anyone.' }
]

export default function WhyUs() {
  return (
    <section className="why-us" id="why">
      <div className="why-bg" />
      <div className="container">
        
        <div className="section-header reveal up">
          <div className="section-label">Why Choose Us</div>
          <h2 className="section-title light">Strong homes built with trust,<br />lasting value made with care.</h2>
        </div>

        <div className="why-grid">
          {WHY_CARDS.map((card, idx) => (
            <div key={idx} className={`why-card reveal up d${(idx % 3) + 1}`}>
              <div className="why-icon-wrap">
                <span className="why-icon" role="img" aria-label={card.title}>{card.icon}</span>
              </div>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
