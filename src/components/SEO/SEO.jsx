import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import servicesData from '../../services_content_all.json'

export default function SEO() {
  const location = useLocation()

  useEffect(() => {
    const path = location.pathname
    let title = 'Landscaping Services – Expert, Affordable & Trusted | Josan Construction & Landscaping LTD'
    let description = 'Landscaping services for beautiful, durable outdoor spaces. From lawn care to patios, decks, fencing, and more – our experts deliver stunning results. Call today!'
    let keywords = 'landscaping Calgary, deck building, patios, fencing, sod installation, landscaping services, basement renovations'

    if (path === '/') {
      // Keep defaults
    } else if (path === '/gallery') {
      title = 'Project Gallery | Real Landscaping & Construction Work in Calgary'
      description = 'Browse photos of our landscaping, decking, fencing, and basement projects across Calgary.'
      keywords = 'landscaping portfolio, construction gallery, deck photos, patio photos, Calgary landscaping examples'
    } else if (path === '/reviews') {
      title = 'Client Reviews & Video Testimonials | Josan Construction & Landscaping LTD'
      description = 'See what our clients say about our quality landscaping and home renovation services in Calgary. Real video reviews.'
      keywords = 'landscaping reviews, construction reviews, client testimonials, Calgary builder reviews'
    } else if (path.startsWith('/services/')) {
      const serviceId = path.split('/services/')[1]
      const service = servicesData[serviceId]
      if (service) {
        title = `${service.title} | Josan Construction & Landscaping LTD`
        // Get the first few sentences/words of the first paragraph if available
        if (service.paragraphs && service.paragraphs.length > 0) {
          description = service.paragraphs[0].text.substring(0, 160) + '...'
        } else {
          description = `Expert ${service.title} services in Calgary and surrounding areas. Contact us for a free quote today.`
        }
        keywords = `${service.title}, Calgary ${service.title.toLowerCase()}, landscaping services Calgary, home renovations`
      }
    }

    // Update document title
    document.title = title

    // Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.name = 'description'
      document.head.appendChild(metaDescription)
    }
    metaDescription.setAttribute('content', description)

    // Update Meta Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]')
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta')
      metaKeywords.name = 'keywords'
      document.head.appendChild(metaKeywords)
    }
    metaKeywords.setAttribute('content', keywords)

    // Update OpenGraph Title & Description
    let ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute('content', title)

    let ogDesc = document.querySelector('meta[property="og:description"]')
    if (ogDesc) ogDesc.setAttribute('content', description)

  }, [location.pathname])

  return null
}
