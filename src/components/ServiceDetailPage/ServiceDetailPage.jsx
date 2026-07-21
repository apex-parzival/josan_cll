import { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './ServiceDetailPage.css'
import servicesData from '../../services_content_all.json'
import IntroAnimation from '../ScrollSequence/IntroAnimation'

const VIDEO_FILES = {
  'artificial-grass-installation-turf': 'artificial grass.mp4',
  'trees': 'backyard renovaiton.mp4',
  'basement-renovation': 'basement renovation.mp4',
  'basement-renovations': 'basement renovation 24.mp4',
  'bobcat-service': 'bobcat.mp4',
  'decking': 'deck.mp4',
  'deck-building-services': 'deck building.mp4',
  'fencing-services': 'fencing.mp4',
  'flower-bed': 'flower bed.mp4',
  'framing-service': 'framing.mp4',
  'garage': 'garage.mp4',
  'gate-building': 'gate building.mp4',
  'gazebo': 'gazebo.mp4',
  'professional-home-renovation': 'home renovation.mp4',
  'kitchen-service': 'kitchen.mp4',
  'lot-gardening': 'lot gardening and landscaping.mp4',
  'new-basement-construction': 'basement construction.mp4',
  'painting-service': 'painting.mp4',
  'patios': 'patio.mp4',
  'pergola-services': 'pergola.mp4',
  'railing': 'railing.mp4',
  'retaining-walls': 'retaining walls.mp4',
  'rock': 'rock landscaping.mp4',
  'sod': 'sod.mp4'
}

export default function ServiceDetailPage() {
  const { serviceId } = useParams()
  const navigate = useNavigate()
  const [showIntro, setShowIntro] = useState(true)

  const service = servicesData[serviceId]
  const image = service ? service.image : '/assets/sod.webp'

  const onBack = () => {
    navigate('/')
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    setShowIntro(true)
  }, [serviceId])

  const handleIntroComplete = useCallback(() => {
    setShowIntro(false)
  }, [])

  if (!service) {
    return (
      <div className="service-error">
        <h2>Service Not Found</h2>
        <button className="btn btn-primary" onClick={onBack}><span>Back to Home</span></button>
      </div>
    )
  }

  // Helper to determine if a paragraph item should be rendered as a heading
  function isHeading(item) {
    if (item.tag === 'h2' || item.tag === 'h3') return true
    // If paragraph text is short, bold, or has no ending period, treat it as a heading
    const text = item.text.trim()
    return text.length < 60 && !text.endsWith('.') && !text.endsWith('?')
  }

  // Parse paragraphs and group headings into the next paragraph card as bold questions
  function getServiceCards(paragraphs) {
    const cards = []
    let pendingHeadings = []

    paragraphs.forEach((item) => {
      if (isHeading(item)) {
        pendingHeadings.push(item.text.trim())
      } else {
        let headingText = ""
        if (pendingHeadings.length > 0) {
          headingText = pendingHeadings.map(h => {
            let clean = h.replace(/\.+$/, "")
            if (!clean.endsWith("?")) {
              clean += "?"
            }
            return clean
          }).join(" ")
          pendingHeadings = []
        }
        
        cards.push({
          heading: headingText,
          text: item.text
        })
      }
    })

    // Fallback for trailing headings
    if (pendingHeadings.length > 0) {
      cards.push({
        heading: pendingHeadings.map(h => h.endsWith("?") ? h : h + "?").join(" "),
        text: ""
      })
    }

    return cards
  }

  const serviceCards = getServiceCards(service.paragraphs)

  return (
    <article className="service-detail">
      {/* Fullscreen Motion Video Intro Overlay */}
      {showIntro && VIDEO_FILES[serviceId] && (
        <IntroAnimation
          videoFile={VIDEO_FILES[serviceId]}
          onComplete={handleIntroComplete}
        />
      )}

      {/* Detail Hero Header */}
      <header className="detail-hero" style={{ backgroundImage: `url('${image}')` }}>
        <div className="detail-hero-overlay" />
        <div className="container detail-hero-content">
          <span className="detail-badge">Professional Services</span>
          <h1 className="detail-title">{service.title}</h1>
        </div>
      </header>

      {/* Main Content Body - Info in Cards */}
      <div className="detail-body-section">
        <div className="container">
          {/* Top Navigation Bar */}
          <div className="detail-top-nav">
            <button className="btn-back-text" onClick={onBack}>
              ← Back to Home
            </button>
            <div className="detail-breadcrumbs">
              <span className="crumb" onClick={onBack}>Home</span>
              <span className="crumb-sep">/</span>
              <span className="crumb-current">{serviceId.replace(/-/g, ' ')}</span>
            </div>
          </div>

          <div className="detail-grid">
            {/* Main Content Column */}
            <div className="detail-content-area">
              {serviceCards.map((card, idx) => (
                <div key={idx} className="detail-paragraph">
                  {card.heading && <div className="card-question">{card.heading}</div>}
                  {card.text && <p className="card-answer">{card.text}</p>}
                </div>
              ))}
            </div>

            {/* Right Sidebar Column */}
            <aside className="detail-sidebar">
              <div className="sidebar-card quote-sidebar">
                <h3>Request a Free Quote</h3>
                <p>Ready to start your {serviceId.replace('-', ' ')} project? Fill out our form or call us directly for a free estimate.</p>
                <div className="sidebar-contact-links">
                  <a href="tel:+14030000000" className="sidebar-phone-btn">
                    📞 Call +1 (403) 000-0000
                  </a>
                  <button className="btn btn-primary full" onClick={() => {
                    const contactSection = document.getElementById('contact')
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}>
                    <span>Get a Free Estimate</span>
                  </button>
                </div>
              </div>

              <div className="sidebar-card details-sidebar">
                <h3>Why Work With Us?</h3>
                <ul className="sidebar-features-list">
                  <li>✓ 15+ Years Calgary Experience</li>
                  <li>✓ Fully Licensed & Insured</li>
                  <li>✓ Transparent Upfront Pricing</li>
                  <li>✓ Skilled & Trusted Crew</li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </article>
  )
}
