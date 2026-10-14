// Single source of truth for page-level SEO.
// Used by the <SEO /> component (client-side navigation) AND by
// scripts/prerender.mjs (static HTML generated at build time for Google).
import servicesData from '../services_content_all.json'
import { PROJECT_VIDEOS, VIDEOS_UPLOAD_DATE } from './videos.js'

export const SITE_URL = 'https://josancll.ca'
export const BUSINESS_NAME = 'Josan Construction & Landscaping LTD'
export const PHONE = '+1 (587) 394-4029'
// Bump when page copy (services JSON, SEO text or Calgary facts) is reviewed/changed.
export const CONTENT_UPDATED = '2026-10-14'
export { servicesData }

// Calgary-focused names, titles and descriptions for every service page.
// `h1` is shown as the page heading; `title` is the <title> tag (~60 chars).
export const SERVICE_SEO = {
  'artificial-grass-installation-turf': {
    name: 'Artificial Grass Installation',
    h1: 'Artificial Grass & Turf Installation in Calgary',
    title: 'Artificial Grass Installation Calgary | Josan Construction',
    description: 'Professional artificial grass and synthetic turf installation in Calgary, Airdrie & Chestermere. Low-maintenance lawns built for Alberta winters. Free quote.'
  },
  'basement-renovation-home': {
    name: 'Basement Renovation',
    h1: 'Basement Renovation Services in Calgary',
    title: 'Basement Renovation Contractor Calgary | Josan Construction',
    description: 'Modern, functional basement renovations in Calgary — framing, drywall, flooring, bathrooms and permits handled for you. Call (587) 394-4029 for a free quote.'
  },
  'basement-renovations': {
    name: 'Basement Renovations & Legal Suites',
    h1: 'Basement Renovations & Legal Suites in Calgary',
    title: 'Basement Renovations & Legal Suites Calgary | Josan',
    description: 'Calgary basement renovations and legal secondary suites, from design and City permits to final inspection. 8+ years local experience. Free estimate.'
  },
  'bobcat-service': {
    name: 'Bobcat Service',
    h1: 'Bobcat Services in Calgary',
    title: 'Bobcat Services Calgary – Grading & Excavation | Josan',
    description: 'Bobcat services in Calgary for excavation, grading, soil and gravel moving, and landscape site prep. Fast scheduling and fair rates. Call (587) 394-4029.'
  },
  'deck-building-services': {
    name: 'Deck Building',
    h1: 'Custom Deck Builders in Calgary',
    title: 'Deck Builders Calgary | Custom Decks | Josan Construction',
    description: 'Custom deck building in Calgary — composite and wood decks, railings and stairs built for Calgary weather. Permits handled. Get a free deck quote today.'
  },
  'decking': {
    name: 'Decking',
    h1: 'Composite & Wood Decking in Calgary',
    title: 'Composite & Wood Decking Calgary | Josan Construction',
    description: 'Composite and pressure-treated wood decking installation and deck resurfacing in Calgary. Durable, low-maintenance decks. Free on-site estimate.'
  },
  'fencing-services': {
    name: 'Fencing',
    h1: 'Fence Installation in Calgary',
    title: 'Fence Installation Calgary | Wood & Privacy Fences | Josan',
    description: 'Wood, privacy and perimeter fence installation in Calgary, Airdrie & Chestermere. Strong posts set below frost line. Call (587) 394-4029 for a free quote.'
  },
  'flower-bed': {
    name: 'Flower Bed Design',
    h1: 'Flower Bed Design & Installation in Calgary',
    title: 'Flower Bed Design & Installation Calgary | Josan',
    description: 'Custom flower bed design, planting, edging and mulch installation in Calgary using plants that thrive in Alberta’s climate. Free landscaping quote.'
  },
  'framing-service': {
    name: 'Framing',
    h1: 'Framing Contractor in Calgary',
    title: 'Framing Contractor Calgary | Basements & Additions | Josan',
    description: 'Residential framing in Calgary for basements, additions, garages and renovations. Built to code and inspection-ready. Call (587) 394-4029.'
  },
  'garage': {
    name: 'Garage Construction',
    h1: 'Garage Builders in Calgary',
    title: 'Garage Builders Calgary | Detached Garages | Josan',
    description: 'Detached and attached garage construction in Calgary — foundation, framing, roofing and permits. Get a free garage building estimate today.'
  },
  'gate-building': {
    name: 'Gate Building',
    h1: 'Custom Gate Building in Calgary',
    title: 'Custom Gates Calgary | Wood & Metal Gates | Josan',
    description: 'Custom wood and metal gate building and installation in Calgary, including driveway and side-yard gates built to last. Free quote.'
  },
  'gazebo': {
    name: 'Gazebo',
    h1: 'Custom Gazebos in Calgary',
    title: 'Gazebo Builders Calgary | Custom Gazebos | Josan',
    description: 'Custom gazebo design and construction in Calgary — built for shade, snow load and year-round outdoor living. Call (587) 394-4029 for a free quote.'
  },
  'kitchen-service': {
    name: 'Kitchen Renovation',
    h1: 'Kitchen Renovations in Calgary',
    title: 'Kitchen Renovations Calgary | Josan Construction',
    description: 'Kitchen renovation and remodelling in Calgary — cabinets, countertops, backsplash, flooring and lighting. Transparent pricing. Free estimate.'
  },
  'lot-gardening': {
    name: 'Landscaping & Lot Gardening',
    h1: 'Landscaping & Lot Gardening in Calgary',
    title: 'Landscaping & Lot Gardening Calgary | Josan Construction',
    description: 'Full-yard landscaping and lot gardening in Calgary — grading, sod, beds, trees and clean-ups for new builds and existing homes. Free landscaping quote.'
  },
  'new-basement-construction': {
    name: 'New Basement Construction',
    h1: 'New Basement Development in Calgary',
    title: 'Basement Development Calgary | New Basements | Josan',
    description: 'Basement development in Calgary from bare concrete to finished space or legal suite — framing, electrical, plumbing and permits. Free estimate.'
  },
  'painting-service': {
    name: 'Painting',
    h1: 'Interior & Exterior Painting in Calgary',
    title: 'Painters Calgary | Interior & Exterior Painting | Josan',
    description: 'Interior and exterior house painting in Calgary with premium paints, clean prep and a tidy finish. Call (587) 394-4029 for a free painting quote.'
  },
  'patios': {
    name: 'Patio Installation',
    h1: 'Patio & Paver Installation in Calgary',
    title: 'Patio & Paver Installation Calgary | Josan Construction',
    description: 'Paver, stone and concrete patio installation in Calgary with a proper compacted base for freeze-thaw. Custom designs. Get a free patio quote.'
  },
  'pergola-services': {
    name: 'Pergola',
    h1: 'Custom Pergolas in Calgary',
    title: 'Pergola Builders Calgary | Custom Pergolas | Josan',
    description: 'Custom wood and aluminum pergola design and installation in Calgary for decks, patios and backyards. Free on-site quote.'
  },
  'professional-home-renovation': {
    name: 'Home Renovation',
    h1: 'Home Renovation Contractor in Calgary',
    title: 'Home Renovation Contractor Calgary | Josan Construction',
    description: 'Complete home renovations in Calgary — interiors, exteriors, kitchens, bathrooms and basements by one trusted local contractor. Free estimate.'
  },
  'railing': {
    name: 'Railing Installation',
    h1: 'Railing Installation in Calgary',
    title: 'Railing Installation Calgary | Deck & Glass Railings | Josan',
    description: 'Deck, stair, glass and aluminum railing installation in Calgary that meets code and looks great. Call (587) 394-4029 for a free quote.'
  },
  'retaining-walls': {
    name: 'Retaining Walls',
    h1: 'Retaining Wall Contractor in Calgary',
    title: 'Retaining Walls Calgary | Block & Timber Walls | Josan',
    description: 'Structural and decorative retaining wall construction in Calgary with proper drainage and base. Block, stone and timber walls. Free estimate.'
  },
  'rock': {
    name: 'Rock Landscaping',
    h1: 'Rock Landscaping in Calgary',
    title: 'Rock Landscaping Calgary | River Rock & Gravel | Josan',
    description: 'River rock, decorative stone, boulders and gravel landscaping in Calgary — low-water, low-maintenance yards. Get a free landscaping quote.'
  },
  'sod': {
    name: 'Sod Installation',
    h1: 'Sod Installation in Calgary',
    title: 'Sod Installation Calgary | Lawn Installation | Josan',
    description: 'Professional sod installation in Calgary, Airdrie & Chestermere — grading, topsoil and fresh sod laid right for a healthy lawn. Free sod quote.'
  },
  'trees': {
    name: 'Tree Planting & Care',
    h1: 'Tree Planting & Care in Calgary',
    title: 'Tree Planting & Removal Calgary | Josan Construction',
    description: 'Tree and shrub planting, pruning and removal in Calgary, plus full lot landscaping. Hardy species for Alberta. Call (587) 394-4029.'
  }
}

export const SERVICE_IDS = Object.keys(servicesData)

export function getServiceSeo(serviceId) {
  const service = servicesData[serviceId]
  if (!service) return null
  const base = SERVICE_SEO[serviceId] || {}
  const name = base.name || service.title
  return {
    name,
    h1: base.h1 || `${name} in Calgary`,
    title: base.title || `${name} Calgary | Josan Construction`,
    description: base.description ||
      `Expert ${name.toLowerCase()} in Calgary, Airdrie & Chestermere. Call (587) 394-4029 for a free quote today.`
  }
}

// Returns everything a page needs in <head>.
export function getSeo(pathname) {
  const path = (pathname || '/').replace(/\/+$/, '') || '/'

  let title = 'Landscaping & Construction Calgary | Josan Construction'
  let description = 'Calgary landscaping & construction: custom decks, patios, fencing, sod, artificial grass, retaining walls & basements. Free quote: (587) 394-4029.'
  let image = `${SITE_URL}/assets/sod.webp`
  const breadcrumbs = [{ name: 'Home', item: `${SITE_URL}/` }]
  let found = true

  if (path === '/') {
    // homepage defaults
  } else if (path === '/gallery') {
    title = 'Project Gallery – Decks, Patios & Landscaping Calgary | Josan'
    description = 'Real project photos of our landscaping, custom decks, stone patios, fences and basement renovations completed for homeowners across Calgary.'
    breadcrumbs.push({ name: 'Project Gallery', item: `${SITE_URL}/gallery` })
  } else if (path === '/reviews') {
    title = 'Reviews & Project Videos | Josan Construction Calgary'
    description = 'Watch project videos and read reviews from Calgary homeowners who chose Josan Construction & Landscaping for patios, turf, sod, decks and more.'
    breadcrumbs.push({ name: 'Client Reviews', item: `${SITE_URL}/reviews` })
  } else if (path.startsWith('/services/')) {
    const serviceId = path.split('/services/')[1]
    const seo = getServiceSeo(serviceId)
    if (seo) {
      title = seo.title
      description = seo.description
      image = `${SITE_URL}${servicesData[serviceId].image || '/assets/sod.webp'}`
      breadcrumbs.push({ name: 'Services', item: `${SITE_URL}/#services` })
      breadcrumbs.push({ name: seo.name, item: `${SITE_URL}/services/${serviceId}` })
    } else {
      found = false
    }
  } else {
    found = false
  }

  if (!found) {
    title = 'Page Not Found | Josan Construction & Landscaping'
    description = 'Sorry, that page could not be found. Explore our Calgary landscaping and construction services.'
  }

  const canonical = path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`

  const jsonLd = []
  if (found && breadcrumbs.length > 1) {
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((b, idx) => ({
        '@type': 'ListItem', position: idx + 1, name: b.name, item: b.item
      }))
    })
  }

  if (found && path === '/reviews') {
    PROJECT_VIDEOS.forEach(v => jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: v.title,
      description: v.text,
      thumbnailUrl: `${SITE_URL}${v.thumbnailUrl}`,
      contentUrl: `${SITE_URL}${v.videoUrl}`,
      uploadDate: `${VIDEOS_UPLOAD_DATE}T00:00:00-06:00`,
      duration: v.duration,
      publisher: { '@id': `${SITE_URL}/#organization` }
    }))
  }

  if (found && path.startsWith('/services/')) {
    const serviceId = path.split('/services/')[1]
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: getServiceSeo(serviceId).name,
      serviceType: getServiceSeo(serviceId).name,
      url: canonical,
      areaServed: ['Calgary', 'Airdrie', 'Chestermere', 'Cochrane', 'Okotoks'].map(n => ({ '@type': 'City', name: n })),
      provider: { '@id': `${SITE_URL}/#organization` }
    })
  }

  return { title, description, canonical, image, jsonLd, found, robots: found ? 'index, follow' : 'noindex, follow' }
}
