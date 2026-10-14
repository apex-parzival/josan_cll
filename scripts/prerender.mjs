// Runs after `vite build`. Renders every page of the React app to static HTML
// (dist/<route>/index.html) so Google and other crawlers get the full text,
// headings, links, title, meta description, canonical and structured data on
// the very first request — no JavaScript needed. Also writes sitemap.xml and 404.html.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { exportMarkdown } from './markdown-export.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const distDir = path.join(root, 'dist')
const ssrDir = path.join(root, 'dist-ssr')

const ssrEntry = fs.readdirSync(ssrDir).find(f => /^entry-server\.m?js$/.test(f))
const ssr = await import(pathToFileURL(path.join(ssrDir, ssrEntry)).href)
const { render, getSeo, SERVICE_IDS } = ssr

const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8')

const routes = ['/', '/gallery', '/reviews', ...SERVICE_IDS.map(id => `/services/${id}`)]

const esc = s => String(s)
  .replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function setTag(html, regex, replacement, label) {
  if (!regex.test(html)) throw new Error(`prerender: could not find ${label} in index.html`)
  return html.replace(regex, replacement)
}

function buildPage(url) {
  const seo = getSeo(url)
  const appHtml = render(url)
  let html = template
  html = setTag(html, /<title>[\s\S]*?<\/title>/, `<title>${esc(seo.title)}</title>`, '<title>')
  html = setTag(html, /<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${esc(seo.description)}" />`, 'meta description')
  html = setTag(html, /<meta name="robots" content="[^"]*"\s*\/?>/, `<meta name="robots" content="${seo.robots}" />`, 'meta robots')
  html = setTag(html, /<link rel="canonical" href="[^"]*"\s*\/?>/, seo.found ? `<link rel="canonical" href="${esc(seo.canonical)}" />` : '', 'canonical')
  html = setTag(html, /<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${esc(seo.canonical)}" />`, 'og:url')
  html = setTag(html, /<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${esc(seo.title)}" />`, 'og:title')
  html = setTag(html, /<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${esc(seo.description)}" />`, 'og:description')
  html = setTag(html, /<meta property="og:image" content="[^"]*"\s*\/?>/, `<meta property="og:image" content="${esc(seo.image)}" />`, 'og:image')
  html = setTag(html, /<meta name="twitter:title" content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${esc(seo.title)}" />`, 'twitter:title')
  html = setTag(html, /<meta name="twitter:description" content="[^"]*"\s*\/?>/, `<meta name="twitter:description" content="${esc(seo.description)}" />`, 'twitter:description')
  html = setTag(html, /<meta name="twitter:image" content="[^"]*"\s*\/?>/, `<meta name="twitter:image" content="${esc(seo.image)}" />`, 'twitter:image')
  const jsonLd = seo.jsonLd
    .map(d => `<script type="application/ld+json" data-page-jsonld>${JSON.stringify(d).replace(/</g, '\\u003c')}</script>`)
    .join('\n    ')
  html = setTag(html, /<\/head>/, `    ${jsonLd}\n  </head>`, '</head>')
  html = setTag(html, /<div id="root"><\/div>/, `<div id="root">${appHtml}</div>`, '<div id="root">')
  return { html, seo }
}

function writeFile(rel, contents) {
  const file = path.join(distDir, rel)
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, contents)
}

for (const url of routes) {
  const { html, seo } = buildPage(url)
  if (!seo.found) throw new Error(`prerender: route ${url} has no SEO entry`)
  writeFile(url === '/' ? 'index.html' : path.join(url.slice(1), 'index.html'), html)
  console.log(`  prerendered ${url}`)
}

// 404 page (Vercel serves dist/404.html with a real 404 status for unknown URLs)
writeFile('404.html', buildPage('/__page-not-found').html)
console.log('  prerendered 404.html')

// sitemap.xml with real, crawlable URLs (no #/ fragments)
const today = new Date().toISOString().slice(0, 10)
const priority = url => url === '/' ? '1.0' : url.startsWith('/services/') ? '0.8' : '0.6'
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<!--
If you are an LLM looking for site information, start at https://josancll.ca/llms.txt.
Use https://josancll.ca/sitemap.md to find the relevant topic and its linked Markdown answer; if it is absent, report that gap.
-->
${routes.map(url => `  <url>
    <loc>${getSeo(url).canonical}</loc>
    <lastmod>${today}</lastmod>
    <priority>${priority(url)}</priority>
  </url>`).join('\n')}
</urlset>
`
writeFile('sitemap.xml', sitemap)
console.log(`  wrote sitemap.xml (${routes.length} URLs)`)

// Markdown knowledge surface: /llms.txt, /sitemap.md, /llm/** (same source as the HTML)
const mdResult = exportMarkdown({ root, distDir, data: ssr })
console.log(`  wrote ${mdResult.count} Markdown resources (${mdResult.pages} pages, ${mdResult.revision})`)

fs.rmSync(ssrDir, { recursive: true, force: true })
