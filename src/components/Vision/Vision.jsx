import './Vision.css'

export default function Vision() {
  function scrollTo(id) {
    const el = document.getElementById(id)
    if (el) window.scrollTo({ top: el.offsetTop - 72, behavior: 'smooth' })
  }

  return (
    <section className="vision" id="vision">
      <div className="vision-bg">
        <img src="/assets/patios-2.webp" alt="Beautiful patio design" loading="lazy" />
        <div className="vision-overlay" />
      </div>
      <div className="container">
        <div className="vision-grid">
          
          <div className="vision-content reveal up">
            <div className="section-label light">Building Your Vision</div>
            <h2 className="section-title light">Your ideas are Important.<br />We make them real.</h2>
            <p className="vision-text">
              Our workforce builds from the basement to the outdoor areas with care and skill, turning your ideas into lasting places you genuinely enjoy.
            </p>
            <button className="btn btn-primary" onClick={() => scrollTo('services')}>
              <span>Discover More</span>
            </button>
          </div>

          <div className="vision-img-block reveal right">
            <img src="/assets/Building-your-visions-400-x-400.webp" alt="Building your visions" loading="lazy" />
          </div>

        </div>
      </div>
    </section>
  )
}
