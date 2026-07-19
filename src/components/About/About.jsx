import './About.css'

export default function About() {
  function scrollTo(id) {
    const el = document.getElementById(id)
    if (el) window.scrollTo({ top: el.offsetTop - 72, behavior: 'smooth' })
  }

  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about-grid">
          
          {/* Images Grid */}
          <div className="about-images reveal left">
            <div className="about-img-main">
              <img src="/assets/Garage.webp" alt="Josan Construction project" loading="lazy" />
            </div>
            <div className="about-img-grid">
              <img src="/assets/Who-we-are-332-x-250-qty-4.webp" alt="Our landscaping work" loading="lazy" />
              <img src="/assets/Who-we-are-332-x-250-qty-4-2.webp" alt="Paving and patios" loading="lazy" />
              <img src="/assets/Who-we-are-332-x-250-qty-4-3.webp" alt="Fencing and deck installation" loading="lazy" />
              <img src="/assets/Who-we-are-332-x-250-qty-4-4.webp" alt="Professional gardening" loading="lazy" />
            </div>
            <div className="about-badge-float">
              <div className="float-badge">
                <span className="float-num">15+</span>
                <span className="float-text">Years of<br />Experience</span>
              </div>
            </div>
          </div>

          {/* About Content */}
          <div className="about-content reveal right">
            <div className="section-label">Who We Are</div>
            <h2 className="section-title">Every detail is our care, every project is our passion.</h2>
            <p className="about-description">
              We are experienced builders with a clear vision. We design areas that bring comfort, strength, and beauty to every home we touch, making us a reliable landscaping company Calgary residents can count on.
            </p>
            <p className="about-description">
              Our workforce builds from the basement to the outdoor areas with care and skill, turning your ideas into lasting places you genuinely enjoy.
            </p>
            
            <div className="about-features">
              <div className="feature-item">
                <div className="feature-icon">⭐</div>
                <div className="feature-text">
                  <strong>Award-Winning Quality</strong>
                  <span>Trusted by hundreds of Calgary homeowners</span>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🛡️</div>
                <div className="feature-text">
                  <strong>Fully Insured & Licensed</strong>
                  <span>Safe, compliant, and professional work</span>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">📋</div>
                <div className="feature-text">
                  <strong>Transparent Pricing</strong>
                  <span>No hidden fees, no surprises</span>
                </div>
              </div>
            </div>
            
            <button className="btn btn-primary" onClick={() => scrollTo('contact')}>
              <span>Learn More About Us</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  )
}
