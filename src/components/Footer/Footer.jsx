import { useNavigate } from 'react-router-dom'
import './Footer.css'

const FOOTER_PAGE_MAP = {
  'Artificial Grass / Turf': 'artificial-grass-installation-turf',
  'Deck Building': 'deck-building-services',
  'Patios': 'patios',
  'Fencing Services': 'fencing-services',
  'Basement Renovations': 'basement-renovations',
  'Sod Installation': 'sod',
  'Retaining Walls': 'retaining-walls',
  'Pergola & Gazebo': 'gazebo',
  'Bobcat Service': 'bobcat-service',
  'Trees & Gardening': 'trees',
  'Railing & Gates': 'railing',
  'Painting Service': 'painting-service',
  'Kitchen Service': 'kitchen-service',
  'Rock Landscaping': 'rock',
  'Framing Service': 'framing-service',
  'Flower Bed': 'flower-bed'
}

export default function Footer() {
  const navigate = useNavigate()

  function scrollTo(id) {
    navigate('/')
    setTimeout(() => {
      const el = document.getElementById(id)
      if (el) window.scrollTo({ top: el.offsetTop - 72, behavior: 'smooth' })
    }, 100)
  }

  function handleServiceClick(name) {
    const pageId = FOOTER_PAGE_MAP[name]
    if (pageId) {
      navigate('/services/' + pageId)
      window.scrollTo({ top: 0, behavior: 'instant' })
    } else {
      scrollTo('services')
    }
  }

  return (
    <footer className="footer" id="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">
            
            <div className="footer-brand">
              <button className="footer-logo-btn" onClick={() => scrollTo('home')} aria-label="Go to home">
                <img src="/assets/logo.png" alt="Josan Construction & Landscaping LTD" className="logo-img" />
              </button>
              <p>Calgary's most trusted landscaping and construction company, delivering quality craftsmanship for over 15 years.</p>
              <div className="footer-social">
                <a href="https://www.facebook.com/share/17AfZBYfVF/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="facebook">
                  <svg viewBox="0 0 320 512" xmlns="http://www.w3.org/2000/svg">
                    <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/>
                  </svg>
                </a>
                <a href="https://www.instagram.com/josancll?igsh=NWwyamIxMWI3MHRh" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="instagram">
                  <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
                  </svg>
                </a>
                <a href="https://www.tiktok.com/@josancalgary" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="tiktok">
                  <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                    <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/>
                  </svg>
                </a>
                <a href="https://youtube.com/@josancalgary?si=SjCGdM01UC8UB0iK" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="youtube">
                  <svg viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg">
                    <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div className="footer-col">
              <h4>Services</h4>
              <ul>
                <li><button onClick={() => handleServiceClick('Artificial Grass / Turf')}>Artificial Grass / Turf</button></li>
                <li><button onClick={() => handleServiceClick('Deck Building')}>Deck Building</button></li>
                <li><button onClick={() => handleServiceClick('Patios')}>Patios</button></li>
                <li><button onClick={() => handleServiceClick('Fencing Services')}>Fencing Services</button></li>
                <li><button onClick={() => handleServiceClick('Basement Renovations')}>Basement Renovations</button></li>
                <li><button onClick={() => handleServiceClick('Sod Installation')}>Sod Installation</button></li>
                <li><button onClick={() => handleServiceClick('Retaining Walls')}>Retaining Walls</button></li>
                <li><button onClick={() => handleServiceClick('Pergola & Gazebo')}>Pergola & Gazebo</button></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>More Services</h4>
              <ul>
                <li><button onClick={() => handleServiceClick('Bobcat Service')}>Bobcat Service</button></li>
                <li><button onClick={() => handleServiceClick('Trees & Gardening')}>Trees & Gardening</button></li>
                <li><button onClick={() => handleServiceClick('Railing & Gates')}>Railing & Gates</button></li>
                <li><button onClick={() => handleServiceClick('Painting Service')}>Painting Service</button></li>
                <li><button onClick={() => handleServiceClick('Kitchen Service')}>Kitchen Service</button></li>
                <li><button onClick={() => handleServiceClick('Rock Landscaping')}>Rock Landscaping</button></li>
                <li><button onClick={() => handleServiceClick('Framing Service')}>Framing Service</button></li>
                <li><button onClick={() => handleServiceClick('Flower Bed')}>Flower Bed</button></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Contact</h4>
              <ul className="footer-contact">
                <li>
                  <span>📞</span>
                  <a href="tel:+14030000000">+1 (403) 000-0000</a>
                </li>
                <li>
                  <span>✉️</span>
                  <a href="mailto:info@josancll.ca">info@josancll.ca</a>
                </li>
                <li>
                  <span>📍</span>
                  <span>Calgary, Alberta, Canada</span>
                </li>
                <li>
                  <span>🕐</span>
                  <span>Mon–Sat: 8AM–6PM</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>© 2026 Josan Construction & Landscaping LTD. All Rights Reserved.</p>
          <p>Serving Calgary & surrounding areas with pride.</p>
        </div>
      </div>
    </footer>
  )
}
