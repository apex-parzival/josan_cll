import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './ServiceDetailPage.css'
import servicesData from '../../services_content_all.json'
import ScrollSequence from '../ScrollSequence/ScrollSequence'

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

  return (
    <article className="service-detail">
      {/* Detail Hero */}
      <header className="detail-hero" style={{ backgroundImage: `url('${image}')` }}>
        <div className="detail-hero-overlay" />
        <div className="container detail-hero-content">
          <span className="detail-badge">Professional Services</span>
          <h1 className="detail-title">{service.title}</h1>
        </div>
      </header>

      {/* Main Content */}
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

          {/* Render Content Grid. Wrap inside ScrollSequence for professional home renovation page */}
          {serviceId === 'professional-home-renovation' ? (
            <ScrollSequence>
              <div className="detail-grid">
                
                {/* Left Content Column */}
                <div className="detail-content-area">
                  {service.paragraphs.map((item, idx) => {
                    if (isHeading(item)) {
                      return (
                        <h3 key={idx} className="detail-subheading">
                          {item.text}
                        </h3>
                      )
                    }
                    return (
                      <p key={idx} className="detail-paragraph">
                        {item.text}
                      </p>
                    )
                  })}
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
            </ScrollSequence>
          ) : (
            <div className="detail-grid">
              
              {/* Left Content Column */}
              <div className="detail-content-area">
                {service.paragraphs.map((item, idx) => {
                  if (isHeading(item)) {
                    return (
                      <h3 key={idx} className="detail-subheading">
                        {item.text}
                      </h3>
                    )
                  }
                  return (
                    <p key={idx} className="detail-paragraph">
                      {item.text}
                    </p>
                  )
                })}
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
          )}
        </div>
      </div>
    </article>
  )
}
