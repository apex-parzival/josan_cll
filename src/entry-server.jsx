// Build-time renderer used by scripts/prerender.mjs to produce static HTML
// for every page, so search engines see the full content without running JS.
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { AppShell } from './App.jsx'

export { getSeo, getServiceSeo, SERVICE_IDS, SITE_URL, CONTENT_UPDATED, servicesData } from './seo/seoConfig.js'
export { POSTS } from './blog/posts.js'
export { CALGARY_FACTS, FACTS_DISCLAIMER, FACTS_CHECKED, RELATED_SERVICES } from './seo/calgaryFacts.js'
export { getServiceCards } from './seo/serviceCards.js'
export { WRITTEN_REVIEWS } from './seo/reviews.js'
export { PROJECT_VIDEOS } from './seo/videos.js'

export function render(url) {
  return renderToString(
    <React.StrictMode>
      <StaticRouter location={url}>
        <AppShell />
      </StaticRouter>
    </React.StrictMode>
  )
}
