import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../ServiceDetailPage/ServiceDetailPage.css'
import './Blog.css'
import { POSTS } from '../../blog/posts'

export default function BlogIndex() {
  const navigate = useNavigate()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [])
  const go = (e, path) => { e.preventDefault(); navigate(path); window.scrollTo({ top: 0, behavior: 'instant' }) }

  return (
    <div className="service-detail blog-index">
      <header className="detail-hero" style={{ backgroundImage: "url('/assets/patios.webp')" }}>
        <div className="detail-hero-overlay" />
        <div className="container detail-hero-content">
          <span className="detail-badge">Guides &amp; Tips</span>
          <h1 className="detail-title">Calgary Landscaping &amp; Construction Guides</h1>
          <p className="blog-meta">Practical, source-checked answers for Calgary homeowners — permits, fences, decks, lawns and basement suites.</p>
        </div>
      </header>
      <div className="detail-body-section">
        <div className="container">
          <div className="blog-grid">
            {POSTS.map(p => (
              <a key={p.slug} href={`/blog/${p.slug}`} className="blog-card" onClick={e => go(e, `/blog/${p.slug}`)}>
                <img src={p.image} alt={p.imageAlt} loading="lazy" />
                <div className="blog-card-body">
                  <h2>{p.title}</h2>
                  <p>{p.description}</p>
                  <span className="blog-card-more">Read guide →</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
