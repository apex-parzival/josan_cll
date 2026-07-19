import './CtaBanner.css'

export default function CtaBanner() {
  function scrollTo(id) {
    const el = document.getElementById(id)
    if (el) window.scrollTo({ top: el.offsetTop - 72, behavior: 'smooth' })
  }

  return (
    <section className="cta-banner" id="ctaBanner">
      <div className="cta-bg">
        <img src="/assets/Jason.webp" alt="Jason - Josan Construction" loading="lazy" />
        <div className="cta-overlay" />
      </div>
      <div className="container">
        <div className="cta-content reveal up">
          <h2>Ready to Transform Your Property?</h2>
          <p>Get a free consultation and quote from Calgary's most trusted landscaping and construction experts. No pressure, no obligation.</p>
          <div className="cta-actions">
            <a href="tel:+14030000000" className="btn btn-primary btn-lg">
              <span>📞 Call Us Now</span>
            </a>
            <button className="btn btn-outline light btn-lg" onClick={() => scrollTo('contact')}>
              Get Free Quote
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
