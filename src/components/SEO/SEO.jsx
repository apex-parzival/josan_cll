import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getSeo } from '../../seo/seoConfig'

// Keeps <head> in sync when visitors navigate inside the app.
// The first page load already has the right tags baked in by scripts/prerender.mjs.
function setMeta(selector, attr, key, content) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export default function SEO() {
  const location = useLocation()

  useEffect(() => {
    const seo = getSeo(location.pathname)

    document.title = seo.title
    setMeta('meta[name="description"]', 'name', 'description', seo.description)
    setMeta('meta[name="robots"]', 'name', 'robots', seo.robots)
    setMeta('meta[property="og:title"]', 'property', 'og:title', seo.title)
    setMeta('meta[property="og:description"]', 'property', 'og:description', seo.description)
    setMeta('meta[property="og:url"]', 'property', 'og:url', seo.canonical)
    setMeta('meta[property="og:image"]', 'property', 'og:image', seo.image)
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', seo.title)
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', seo.description)
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', seo.image)

    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = seo.canonical

    document.head.querySelectorAll('script[data-page-jsonld]').forEach(s => s.remove())
    seo.jsonLd.forEach(data => {
      const s = document.createElement('script')
      s.type = 'application/ld+json'
      s.setAttribute('data-page-jsonld', '')
      s.textContent = JSON.stringify(data)
      document.head.appendChild(s)
    })
  }, [location.pathname])

  return null
}
