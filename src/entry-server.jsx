// Build-time renderer used by scripts/prerender.mjs to produce static HTML
// for every page, so search engines see the full content without running JS.
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { AppShell } from './App.jsx'

export { getSeo, SERVICE_IDS } from './seo/seoConfig.js'

export function render(url) {
  return renderToString(
    <React.StrictMode>
      <StaticRouter location={url}>
        <AppShell />
      </StaticRouter>
    </React.StrictMode>
  )
}
