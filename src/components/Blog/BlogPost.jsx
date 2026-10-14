import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import '../ServiceDetailPage/ServiceDetailPage.css'
import './Blog.css'
import { getPost, POSTS } from '../../blog/posts'
import { getServiceSeo } from '../../seo/seoConfig'

function formatDate(iso) {
  const [y, m, d] = iso.split('-').map(Number)
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  return `${months[m - 1]} ${d}, ${y}`
}

export default function BlogPost() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const post = getPost(slug)

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [slug])

  const go = (e, path) => { e.preventDefault(); navigate(path); window.scrollTo({ top: 0, behavior: 'instant' }) }

  if (!post) {
    return (
      <section className="service-error" style={{ padding: '160px 20px 80px', textAlign: 'center' }}>
        <h1>Article Not Found</h1>
        <a href="/blog" className="btn btn-primary" onClick={e => go(e, '/blog')}><span>See all guides</span></a>
      </section>
    )
  }

  const others = POSTS.filter(p => p.slug !== post.slug).slice(0, 3)

  return (
    <article className="service-detail blog-post">
      <header className="detail-hero" style={{ backgroundImage: `url('${post.image}')` }} role="img" aria-label={post.imageAlt}>
        <div className="detail-hero-overlay" />
        <div className="container detail-hero-content">
          <span className="detail-badge">Calgary Homeowner Guide</span>
          <h1 className="detail-title">{post.h1}</h1>
          <p className="blog-meta">
            By Josan Construction &amp; Landscaping · Published <time dateTime={post.published}>{formatDate(post.published)}</time>
            {post.updated !== post.published && <> · Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time></>}
          </p>
        </div>
      </header>

      <div className="detail-body-section">
        <div className="container blog-container">
          <div className="detail-top-nav">
            <a href="/blog" className="btn-back-text" onClick={e => go(e, '/blog')}>← All guides</a>
            <div className="detail-breadcrumbs">
              <a href="/" className="crumb" onClick={e => go(e, '/')}>Home</a>
              <span className="crumb-sep">/</span>
              <a href="/blog" className="crumb" onClick={e => go(e, '/blog')}>Guides</a>
              <span className="crumb-sep">/</span>
              <span className="crumb-current">{post.title}</span>
            </div>
          </div>

          <p className="blog-intro">{post.intro}</p>

          {post.sections.map((s, i) => (
            <section key={i} className="detail-paragraph blog-section">
              <h2 className="card-question">{s.heading}</h2>
              {(s.paragraphs || []).map((p, j) => <p key={j} className="card-answer">{p}</p>)}
              {s.bullets && (
                <ul className="calgary-facts-list">
                  {s.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              )}
              {s.after && <p className="card-answer">{s.after}</p>}
            </section>
          ))}

          <section className="detail-paragraph blog-section">
            <h2 className="card-question">Sources</h2>
            <ul className="calgary-facts-list">
              {post.sources.map((src, i) => (
                <li key={i}><a href={src.url} target="_blank" rel="noopener noreferrer">{src.label}</a></li>
              ))}
            </ul>
            <p className="calgary-facts-note">Sources checked {formatDate(post.checked)}. City guidance changes and has no legal status — always confirm requirements with the City of Calgary for your property.</p>
          </section>

          <nav className="detail-paragraph related-services" aria-label="Related services">
            <h2 className="card-question">Related services</h2>
            <ul className="related-services-list">
              {post.related.map(id => {
                const seo = getServiceSeo(id)
                return seo ? <li key={id}><a href={`/services/${id}`} onClick={e => go(e, `/services/${id}`)}>{seo.h1}</a></li> : null
              })}
            </ul>
          </nav>

          <nav className="detail-paragraph related-services" aria-label="More guides">
            <h2 className="card-question">More Calgary guides</h2>
            <ul className="related-services-list">
              {others.map(p => (
                <li key={p.slug}><a href={`/blog/${p.slug}`} onClick={e => go(e, `/blog/${p.slug}`)}>{p.title}</a></li>
              ))}
            </ul>
          </nav>

          <div className="blog-cta">
            <h2>Planning a project in Calgary?</h2>
            <p>Get a free, no-obligation estimate. We speak English, Hindi, Punjabi &amp; Urdu.</p>
            <div className="blog-cta-btns">
              <a href="tel:5873944029" className="btn btn-primary"><span>📞 Call (587) 394-4029</span></a>
              <a href="/#contact" className="btn btn-outline dark" onClick={e => { e.preventDefault(); navigate('/'); setTimeout(() => { const el = document.getElementById('contact'); if (el) el.scrollIntoView({ behavior: 'smooth' }) }, 100) }}>Request a Quote</a>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
