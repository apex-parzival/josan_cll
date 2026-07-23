import { useNavigate } from 'react-router-dom'
import './Testimonials.css'

const WRITTEN_TESTIMONIALS = [
  {
    id: 1,
    stars: '★★★★★',
    title: 'Backyard Landscaping & Patio Construction',
    text: "Josan Construction transformed our outdoor space completely! The stone patio and retaining wall craftsmanship exceeded our expectations. Professional, clean, and finished on schedule.",
    author: 'Michael & Sarah R.',
    loc: 'Cornerstone, Calgary',
    service: 'Patio & Retaining Walls'
  },
  {
    id: 2,
    stars: '★★★★★',
    title: 'Legal Basement Suite Finishing',
    text: "From framing to final painting, the Josan crew was outstanding. Clear communication throughout, clean workmanship, and transparent pricing. 10/10 service!",
    author: 'David K.',
    loc: 'Saddle Ridge, Calgary',
    service: 'Basement Renovation'
  },
  {
    id: 3,
    stars: '★★★★★',
    title: 'Custom Decking & Perimeter Fencing',
    text: "We hired Josan for our composite deck building and perimeter fencing. The team was punctual, respectful, and delivered superior quality. Will definitely hire them again!",
    author: 'Jennifer P.',
    loc: 'Redstone, Calgary',
    service: 'Deck & Fencing'
  },
  {
    id: 4,
    stars: '★★★★★',
    title: 'Artificial Grass & Turf Installation',
    text: "No more muddy paw prints! The artificial turf installation was fast, seamless, and looks lush green all year round. Highly recommended landscaping team in Calgary!",
    author: 'Robert & Amandeep S.',
    loc: 'Savanna, Calgary',
    service: 'Artificial Turf'
  }
]

export default function Testimonials() {
  const navigate = useNavigate()

  return (
    <section className="testimonials" id="testimonials">
      <div className="container">

        <div className="section-header reveal up visible">
          <div className="section-label">Client Reviews</div>
          <h2 className="section-title">What Our Clients Say</h2>
          <p className="section-subtitle">
            Real feedback from homeowners across Calgary who trusted Josan Construction & Landscaping.
          </p>
        </div>

        {/* Written Reviews Grid */}
        <div className="testimonials-grid">
          {WRITTEN_TESTIMONIALS.map(t => (
            <div key={t.id} className="testimonial-card-item written-only">
              <div className="testimonial-body">
                <div className="testimonial-stars">{t.stars}</div>
                <span className="service-tag-inline">{t.service}</span>
                <h3 className="testimonial-title" style={{ marginTop: '8px' }}>{t.title}</h3>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <div className="author-avatar">{t.author.substring(0, 2)}</div>
                  <div className="author-info">
                    <strong>{t.author}</strong>
                    <span>{t.loc}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA to Reviews Page */}
        <div className="testimonials-cta reveal up" style={{ textAlign: 'center', marginTop: '48px' }}>
          <p style={{ color: 'var(--gray-5)', marginBottom: '16px', fontSize: '0.95rem' }}>
            See all video testimonials and written reviews from our clients.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => { navigate('/reviews'); window.scrollTo({ top: 0, behavior: 'instant' }) }}
          >
            <span>See All Reviews →</span>
          </button>
        </div>

      </div>
    </section>
  )
}
