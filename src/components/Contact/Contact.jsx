import { useState } from 'react'
import './Contact.css'

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  function validateField(name, val) {
    let err = ''
    if (name === 'name' && !val.trim()) {
      err = 'Full Name is required.'
    } else if (name === 'email') {
      if (!val.trim()) {
        err = 'Email Address is required.'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        err = 'Please enter a valid email address.'
      }
    } else if (name === 'message' && !val.trim()) {
      err = 'Message is required.'
    }
    setErrors(prev => ({ ...prev, [name]: err }))
    return !err
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      validateField(name, value)
    }
  }

  function handleBlur(e) {
    const { name, value } = e.target
    validateField(name, value)
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const nameVal = validateField('name', form.name)
    const emailVal = validateField('email', form.email)
    const msgVal = validateField('message', form.message)

    if (!nameVal || !emailVal || !msgVal) return

    setLoading(true)
    
    // Simulate API request
    await new Promise(resolve => setTimeout(resolve, 1800))

    setLoading(false)
    setSuccess(true)
    setForm({ name: '', email: '', phone: '', service: '', message: '' })
    setErrors({})

    setTimeout(() => setSuccess(false), 6000)
  }

  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="contact-grid">
          
          <div className="contact-info reveal left">
            <div className="section-label">Get In Touch</div>
            <h2 className="section-title">Let's Build Something<br />Amazing Together</h2>
            <p className="contact-desc">Have a project in mind? We'd love to hear about it. Reach out for a free consultation and no-obligation quote.</p>
            
            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon">📞</div>
                <div>
                  <strong>Phone</strong>
                  <a href="tel:+14030000000">+1 (403) 000-0000</a>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">✉️</div>
                <div>
                  <strong>Email</strong>
                  <a href="mailto:info@josancll.ca">info@josancll.ca</a>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">📍</div>
                <div>
                  <strong>Location</strong>
                  <span>Calgary, Alberta, Canada</span>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">🕐</div>
                <div>
                  <strong>Hours</strong>
                  <span>Mon – Sat: 8:00 AM – 6:00 PM</span>
                </div>
              </div>
            </div>

            <div className="contact-social">
              <a href="https://www.facebook.com/share/17AfZBYfVF/" target="_blank" rel="noopener noreferrer" className="social-link facebook">
                <svg viewBox="0 0 320 512" xmlns="http://www.w3.org/2000/svg">
                  <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/>
                </svg>
                Facebook
              </a>
              <a href="https://www.instagram.com/josancll?igsh=NWwyamIxMWI3MHRh" target="_blank" rel="noopener noreferrer" className="social-link instagram">
                <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                  <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
                </svg>
                Instagram
              </a>
              <a href="https://www.tiktok.com/@josancalgary" target="_blank" rel="noopener noreferrer" className="social-link tiktok">
                <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                  <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/>
                </svg>
                TikTok
              </a>
              <a href="https://youtube.com/@josancalgary?si=SjCGdM01UC8UB0iK" target="_blank" rel="noopener noreferrer" className="social-link youtube">
                <svg viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg">
                  <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"/>
                </svg>
                YouTube
              </a>
            </div>
          </div>

          <div className="contact-form-wrap reveal right">
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="John Smith"
                  value={form.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{ borderColor: errors.name ? '#dc3545' : '' }}
                  required
                />
                {errors.name && <span className="field-error visible">{errors.name}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{ borderColor: errors.email ? '#dc3545' : '' }}
                    required
                  />
                  {errors.email && <span className="field-error visible">{errors.email}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="+1 (403) 000-0000"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="service">Service Interested In</label>
                <select
                  id="service"
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                >
                  <option value="">Select a service...</option>
                  <option>Artificial Grass / Turf</option>
                  <option>Basement Renovations</option>
                  <option>Bobcat Service</option>
                  <option>Deck Building</option>
                  <option>Decking</option>
                  <option>Fencing Services</option>
                  <option>Flower Bed</option>
                  <option>Framing Service</option>
                  <option>Garage</option>
                  <option>Gate Building</option>
                  <option>Gazebo</option>
                  <option>Kitchen Service</option>
                  <option>Lot Gardening</option>
                  <option>New Basement Construction</option>
                  <option>Painting Service</option>
                  <option>Patios</option>
                  <option>Pergola Services</option>
                  <option>Railing</option>
                  <option>Retaining Walls</option>
                  <option>Rock</option>
                  <option>Sod</option>
                  <option>Trees</option>
                  <option>Multiple Services</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Your Message *</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Tell us about your project..."
                  value={form.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{ borderColor: errors.message ? '#dc3545' : '' }}
                  required
                />
                {errors.message && <span className="field-error visible">{errors.message}</span>}
              </div>

              <button
                type="submit"
                className={`btn btn-primary full ${loading ? 'loading' : ''}`}
                disabled={loading}
              >
                <span>{loading ? 'Sending…' : 'Send Message'}</span>
                {loading && <span className="btn-loader" aria-hidden="true" />}
              </button>

              {success && (
                <div className="form-success visible">
                  ✅ Thank you! We'll be in touch within 24 hours.
                </div>
              )}
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}
