import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './ServiceDetailPage.css'
import servicesData from '../../services_content_all.json'
import ScrollSequence from '../ScrollSequence/ScrollSequence'

const SEQUENCE_FOLDERS = {
  'artificial-grass-installation-turf': 'artificial grass',
  'trees': 'backyard renovation',
  'basement-renovation': 'basement renovation',
  'basement-renovations': 'basement renovation 24',
  'bobcat-service': 'bobcat',
  'decking': 'deck',
  'deck-building-services': 'deck building',
  'fencing-services': 'fencing',
  'flower-bed': 'flower bed',
  'framing-service': 'framing',
  'garage': 'gargage',
  'gate-building': 'gate building',
  'gazebo': 'gazebo',
  'professional-home-renovation': 'home renovation',
  'kitchen-service': 'kitchen',
  'lot-gardening': 'lot gardening and landscaping',
  'new-basement-construction': 'new basement construciton',
  'painting-service': 'painting',
  'patios': 'patio',
  'pergola-services': 'pergola',
  'railing': 'railing',
  'retaining-walls': 'retaining wall',
  'rock': 'rock lanscaping',
  'sod': 'sod'
}

export default function ServiceDetailPage() {
  const { serviceId } = useParams()
  const navigate = useNavigate()

  const service = servicesData[serviceId]
  const image = service ? service.image : '/assets/sod.webp'

  const onBack = () => {
    navigate('/')
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [serviceId])

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
    <article className={`service-detail${SEQUENCE_FOLDERS[serviceId] ? ' sequence-active' : ''}`}>
      {SEQUENCE_FOLDERS[serviceId] ? (
        <ScrollSequence sequenceFolder={SEQUENCE_FOLDERS[serviceId]}>
          <div className="detail-grid sequence-grid">
            
            {/* Sequence Title & Navigation Block */}
            <div className="sequence-header-overlay">
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

              <div className="sequence-title-card">
                <span className="detail-badge">Professional Services</span>
                <h1 className="detail-title">{service.title}</h1>
              </div>
            </div>

            {/* Single Card Column Flow */}
            <div className="detail-content-area">
              {serviceCards.map((card, idx) => (
                <div key={idx} className="detail-paragraph">
                  {card.heading && <div className="card-question">{card.heading}</div>}
                  {card.text && <p className="card-answer">{card.text}</p>}
                </div>
              ))}

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
            </div>

          </div>
        </ScrollSequence>
      ) : (
        <>
          {/* Detail Hero */}
          <header className="detail-hero" style={{ backgroundImage: `url('${image}')` }}>
            <div className="detail-hero-overlay" />
            <div className="container detail-hero-content">
              <span className="detail-badge">Professional Services</span>
              <h1 className="detail-title">{service.title}</h1>
            </div>
          </header>

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
                
                {/* Left Content Column */}
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
        </>
      )}
    </article>
  )
}
