import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import servicesData from '../../services_content_all.json'

export default function SEO() {
  const location = useLocation()

  useEffect(() => {
    const path = location.pathname
    let title = 'Landscaping Services Calgary – Decks, Patios, Fences & Sod | Josan Construction & Landscaping LTD'
    let description = 'Top-rated Calgary landscaping contractor specializing in custom deck building, stone patios, perimeter fencing, sod & artificial grass, retaining walls & legal basement suite renovations. Serving Cornerstone, Saddle Ridge, Redstone, Airdrie & Chestermere. Free Quote!'
    let keywords = 'landscaping Calgary, deck builder Calgary, patio installation Calgary, fencing contractor Calgary, sod installation Calgary, artificial grass Calgary, retaining wall Calgary, basement renovation Calgary, Bobcat service Calgary, Cornerstone landscaping, Saddle Ridge landscaping, Redstone landscaping, Airdrie landscaping, Chestermere landscaping'

    let breadcrumbs = [
      { name: 'Home', item: 'https://josancll.ca/' }
    ]

    let faqs = [
      {
        q: 'What landscaping and construction services do you offer in Calgary?',
        a: 'Josan Construction & Landscaping LTD provides full-service landscaping and outdoor construction including custom deck building, stone patio paver installation, perimeter fencing, sod and artificial turf laying, structural retaining walls, Bobcat excavation, lot grading, and legal basement suite renovations.'
      },
      {
        q: 'Do you provide free estimates for landscaping and construction projects?',
        a: 'Yes! We offer 100% free, no-obligation consultations and detailed estimates for all residential and commercial landscaping and construction projects across Calgary, Airdrie, Chestermere, and Cochrane. Call (587) 394-4029 or submit an online request.'
      },
      {
        q: 'Which Calgary communities and surrounding areas do you serve?',
        a: 'We serve all of Calgary, including Cornerstone, Saddle Ridge, Redstone, Savanna, Skyview Ranch, Taradale, Martindale, Northeast Calgary, Northwest Calgary, Southwest Calgary, Southeast Calgary, as well as Airdrie, Chestermere, Cochrane, and Okotoks.'
      },
      {
        q: 'Do you handle City of Calgary permits for legal basement suite renovations?',
        a: 'Yes, we manage the complete planning, architectural framing, plumbing, electrical, and City of Calgary permit approval process for legal basement suite conversions and secondary suite developments.'
      }
    ]

    if (path === '/') {
      // Defaults kept
    } else if (path === '/gallery') {
      title = 'Project Gallery | Landscaping, Decks & Patios Photos Calgary | Josan Construction'
      description = 'Explore real project photos of our completed landscaping, custom deck building, stone patios, fences, and basement renovations in Calgary.'
      keywords = 'landscaping portfolio Calgary, deck photos Calgary, patio photos Calgary, fence photos Calgary, basement renovation photos Calgary, Calgary landscaping examples'
      breadcrumbs.push({ name: 'Project Gallery', item: 'https://josancll.ca/#/gallery' })
    } else if (path === '/reviews') {
      title = 'Client Reviews & Video Testimonials | Josan Construction & Landscaping LTD Calgary'
      description = 'Read 135+ 5-star customer reviews and watch real video testimonials from satisfied homeowners in Calgary who chose Josan Construction for landscaping and renovations.'
      keywords = 'Josan Construction reviews, Calgary landscaping reviews, deck builder reviews Calgary, contractor testimonials Calgary'
      breadcrumbs.push({ name: 'Client Reviews', item: 'https://josancll.ca/#/reviews' })
    } else if (path.startsWith('/services/')) {
      const serviceId = path.split('/services/')[1]
      const service = servicesData[serviceId]
      if (service) {
        title = `${service.title} Calgary | Josan Construction & Landscaping LTD`
        if (service.paragraphs && service.paragraphs.length > 0) {
          description = `${service.paragraphs[0].text.substring(0, 150)}... Serving Calgary, Airdrie & Chestermere. Call (587) 394-4029 for a free quote!`
        } else {
          description = `Expert ${service.title} services in Calgary, Cornerstone, Saddle Ridge, Redstone, Airdrie & Chestermere. Call (587) 394-4029 for a free quote today.`
        }
        keywords = `${service.title} Calgary, ${service.title.toLowerCase()} Calgary, Calgary ${service.title.toLowerCase()} contractor, Cornerstone ${service.title.toLowerCase()}, Airdrie ${service.title.toLowerCase()}`
        
        breadcrumbs.push({ name: 'Services', item: 'https://josancll.ca/#/services' })
        breadcrumbs.push({ name: service.title, item: `https://josancll.ca/#/services/${serviceId}` })

        faqs.unshift({
          q: `Why choose Josan Construction for ${service.title} in Calgary?`,
          a: `With over 15 years of local experience and 135+ 5-star Google reviews, Josan Construction delivers premium craftsmanship, transparent upfront pricing, clean jobsites, and guaranteed on-time completion for ${service.title.toLowerCase()} across Calgary.`
        })
      }
    }

    // Update Document Title & Meta Tags
    document.title = title

    let metaDesc = document.querySelector('meta[name="description"]')
    if (!metaDesc) {
      metaDesc = document.createElement('meta')
      metaDesc.name = 'description'
      document.head.appendChild(metaDesc)
    }
    metaDesc.setAttribute('content', description)

    let metaKeys = document.querySelector('meta[name="keywords"]')
    if (!metaKeys) {
      metaKeys = document.createElement('meta')
      metaKeys.name = 'keywords'
      document.head.appendChild(metaKeys)
    }
    metaKeys.setAttribute('content', keywords)

    let ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute('content', title)

    let ogDesc = document.querySelector('meta[property="og:description"]')
    if (ogDesc) ogDesc.setAttribute('content', description)

    // Dynamic Breadcrumb Schema (JSON-LD)
    let breadcrumbScript = document.getElementById('jsonld-breadcrumb')
    if (!breadcrumbScript) {
      breadcrumbScript = document.createElement('script')
      breadcrumbScript.id = 'jsonld-breadcrumb'
      breadcrumbScript.type = 'application/ld+json'
      document.head.appendChild(breadcrumbScript)
    }
    breadcrumbScript.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': breadcrumbs.map((b, idx) => ({
        '@type': 'ListItem',
        'position': idx + 1,
        'name': b.name,
        'item': b.item
      }))
    })

    // Dynamic FAQ Schema (JSON-LD)
    let faqScript = document.getElementById('jsonld-faq')
    if (!faqScript) {
      faqScript = document.createElement('script')
      faqScript.id = 'jsonld-faq'
      faqScript.type = 'application/ld+json'
      document.head.appendChild(faqScript)
    }
    faqScript.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': faqs.map(f => ({
        '@type': 'Question',
        'name': f.q,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': f.a
        }
      }))
    })

  }, [location.pathname])

  return null
}
