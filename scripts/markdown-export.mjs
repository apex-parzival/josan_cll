// Builds the public Markdown knowledge surface from the SAME source data as the
// prerendered HTML pages:
//   /llms.txt                 – entry point for LLM readers
//   /sitemap.md               – complete content map
//   /llm/topics/<topic>.md    – topic maps
//   /llm/pages/<id>.md        – one Markdown answer document per canonical page
// Output layout and wording follow the seo-aeo-geo-ultimate suite projection
// (manage_markdown_site.py) so it can be verified byte-for-byte. It also writes a
// private inventory + page bodies to md-source/ (git-ignored, never deployed) for that check.
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'

const SITE_NAME = 'Josan Construction & Landscaping LTD'
const SUMMARY = 'Calgary landscaping and construction contractor: decks, fencing, patios, sod, artificial grass, retaining walls, basement development and home renovations.'
const OWNER = 'Josan Construction & Landscaping LTD'
const LOCALE = 'en-CA'

const TOPICS = {
  landscaping: ['artificial-grass-installation-turf', 'sod', 'lot-gardening', 'trees', 'flower-bed', 'rock', 'bobcat-service', 'retaining-walls', 'patios'],
  'outdoor-structures': ['deck-building-services', 'decking', 'railing', 'pergola-services', 'gazebo', 'fencing-services', 'gate-building', 'garage'],
  renovations: ['basement-renovations', 'basement-renovation-home', 'new-basement-construction', 'professional-home-renovation', 'kitchen-service', 'framing-service', 'painting-service']
}

const CONTACT = [
  '## Contact and service area',
  '',
  'Josan Construction & Landscaping LTD, 4029 Cornerstone Blvd NE, Calgary, AB T3N 2A5.',
  '',
  '- Phone: [+1 (587) 394-4029](tel:+15873944029) or [+1 (587) 227-8001](tel:+15872278001)',
  '- Email: [info@josancll.ca](mailto:info@josancll.ca)',
  '- Hours: Monday to Saturday, 8 AM to 6 PM',
  '- Languages spoken: English, Hindi, Punjabi and Urdu',
  '- Service area: Calgary, Airdrie, Chestermere, Cochrane and Okotoks',
  '- Estimates: free, no-obligation quotes'
].join('\n')

function topicOf(id) {
  for (const [topic, ids] of Object.entries(TOPICS)) if (ids.includes(id)) return topic
  return 'company'
}

export function exportMarkdown({ root, distDir, data }) {
  const { SITE_URL, CONTENT_UPDATED, servicesData, getServiceSeo, getServiceCards,
    CALGARY_FACTS, FACTS_DISCLAIMER, FACTS_CHECKED, RELATED_SERVICES, SERVICE_IDS,
    WRITTEN_REVIEWS, PROJECT_VIDEOS } = data
  const origin = SITE_URL

  const missing = SERVICE_IDS.filter(id => topicOf(id) === 'company')
  if (missing.length) throw new Error(`markdown-export: add these services to a topic: ${missing.join(', ')}`)

  // Source revision = hash of the content sources (same inputs as the HTML pages)
  const hash = crypto.createHash('sha256')
  for (const rel of ['src/services_content_all.json', 'src/seo/seoConfig.js', 'src/seo/calgaryFacts.js', 'src/seo/reviews.js', 'src/seo/videos.js', 'scripts/markdown-export.mjs']) {
    hash.update(fs.readFileSync(path.join(root, rel)))
  }
  const revision = `content-${hash.digest('hex').slice(0, 12)}`
  const md = id => `${origin}/llm/pages/${id}.md`

  // ---- page bodies -------------------------------------------------------
  const pages = []

  const serviceList = ids => ids.map(id => `- [${getServiceSeo(id).h1}](${md(id)})`).join('\n')
  const homeBody = [
    '## What does Josan Construction & Landscaping do?',
    '',
    'Josan Construction & Landscaping LTD is a Calgary-based contractor that builds and renovates both outdoor spaces and home interiors. Free estimates are available for every project.',
    '',
    '## Landscaping services',
    '',
    serviceList(TOPICS.landscaping),
    '',
    '## Decks, fences and outdoor structures',
    '',
    serviceList(TOPICS['outdoor-structures']),
    '',
    '## Basements and home renovations',
    '',
    serviceList(TOPICS.renovations),
    '',
    CONTACT
  ].join('\n')
  pages.push({ id: 'home', url: `${origin}/`, title: 'Landscaping and Construction in Calgary', purpose: 'Company overview, full service list, service area and contact details', topic: 'company', body: homeBody })

  for (const id of SERVICE_IDS) {
    const seo = getServiceSeo(id)
    const service = servicesData[id]
    const parts = [`## About ${seo.name.toLowerCase()} in Calgary`, '']
    for (const card of getServiceCards(service.paragraphs)) {
      if (card.heading) parts.push(`### ${card.heading}`, '')
      if (card.text) parts.push(card.text.trim(), '')
    }
    const facts = CALGARY_FACTS[id]
    if (facts) {
      parts.push('## Calgary permit facts', '', `${facts.heading}`, '')
      for (const pt of facts.points) parts.push(`- ${pt}`)
      parts.push('', `${FACTS_DISCLAIMER} Checked ${FACTS_CHECKED}. Source: ${facts.sources.map(s => `[${s.label}](${s.url})`).join(', ')}.`, '')
    }
    const related = (RELATED_SERVICES[id] || []).filter(r => servicesData[r])
    if (related.length) {
      parts.push('## Related services', '', serviceList(related), '')
    }
    parts.push(CONTACT)
    pages.push({
      id, url: `${origin}/services/${id}`, title: seo.h1,
      purpose: facts
        ? `What the ${seo.name.toLowerCase()} service includes, Calgary permit facts and how to get a quote`
        : `What the ${seo.name.toLowerCase()} service includes and how to get a quote`,
      topic: topicOf(id), body: parts.join('\n')
    })
  }

  // Reviews page: written reviews (confirmed genuine by the owner) + project videos
  const reviewsBody = [
    '## Written customer reviews',
    '',
    ...WRITTEN_REVIEWS.flatMap(r => [
      `### ${r.title}`,
      '',
      `> ${r.text}`,
      '',
      `${r.author}, ${r.loc} (${r.service})`,
      ''
    ]),
    '## Project and client videos',
    '',
    ...PROJECT_VIDEOS.map(v => `- ${v.title}: ${v.text}`),
    '',
    CONTACT
  ].join('\n')
  pages.push({ id: 'reviews', url: `${origin}/reviews`, title: 'Customer Reviews and Project Videos', purpose: 'Written reviews from Calgary homeowners and descriptions of project videos', topic: 'company', body: reviewsBody })

  const excluded = [
    { id: 'gallery', url: `${origin}/gallery`, disposition: 'exclude', reason: 'Image-only project gallery; no substantive text answer to export.' }
  ]

  // ---- projection (identical format to manage_markdown_site.py render) ----
  const outputs = {}
  for (const p of pages) {
    const header = `# ${p.title}\n\nCanonical: [${p.title}](${p.url})\n\n` +
      `Locale: ${LOCALE}\n\nPurpose: ${p.purpose}\n\n` +
      `Content updated: ${CONTENT_UPDATED}\n\nSource revision: ${revision}\n\n` +
      `Maintenance owner: ${OWNER}\n\n` +
      `[Topic map](${origin}/llm/topics/${p.topic}.md) · [Complete scoped map](${origin}/sitemap.md)\n\n`
    outputs[`llm/pages/${p.id}.md`] = header + p.body.trim() + '\n'
  }
  const topics = [...new Set(pages.map(p => p.topic))].sort()
  const rows = sel => sel.map(p => `- [${p.title}](${origin}/llm/pages/${p.id}.md): ${p.purpose} (${LOCALE}); [canonical page](${p.url}).`).join('\n')
  const topicLinks = topics.map(t => `- [${t}](${origin}/llm/topics/${t}.md): All public ${t} documents in this inventory.`).join('\n')
  outputs['sitemap.md'] = `# ${SITE_NAME} content map\n\nInventory scope: complete. Public documents: ${pages.length}.\n\n` +
    `${SUMMARY}\n\n## Topics\n\n${topicLinks}\n\n## All public documents\n\n${rows(pages)}\n`
  for (const t of topics) {
    outputs[`llm/topics/${t}.md`] = `# ${t}\n\n[Site content map](${origin}/sitemap.md)\n\n` + rows(pages.filter(p => p.topic === t)) + '\n'
  }
  outputs['llms.txt'] = `# ${SITE_NAME}\n\n> ${SUMMARY}\n\nInventory scope: complete. Content is maintained by ${OWNER}.\n\n` +
    `If you are an LLM looking for site information, use the [content map](${origin}/sitemap.md) to locate the relevant topic and its linked Markdown answer.\n` +
    "Use that document's cited sources and canonical page; if the requested information is absent, report that gap.\n\n" +
    `## Content map\n\n- [Site content map](${origin}/sitemap.md): All public document destinations within the declared inventory.\n\n` +
    `## Topics\n\n${topicLinks}\n`

  for (const [rel, text] of Object.entries(outputs)) {
    const file = path.join(distDir, rel)
    fs.mkdirSync(path.dirname(file), { recursive: true })
    fs.writeFileSync(file, text)
  }

  // ---- private verification inputs (not deployed) -------------------------
  const srcDir = path.join(root, 'md-source')
  fs.rmSync(srcDir, { recursive: true, force: true })
  fs.mkdirSync(path.join(srcDir, 'bodies'), { recursive: true })
  for (const p of pages) fs.writeFileSync(path.join(srcDir, 'bodies', `${p.id}.md`), p.body.trim() + '\n')
  const inventory = {
    schema_version: '1.0.0', site_name: SITE_NAME, summary: SUMMARY, origin, inventory_scope: 'complete',
    inventory_evidence: 'Generated from the React route table: home, gallery, reviews and every id in src/services_content_all.json (same list as the XML sitemap).',
    owner: OWNER, refresh_trigger: 'Regenerated on every build from the same source revision as the HTML pages.',
    index_policy: 'canonical-to-html',
    pages: [
      ...pages.map(p => ({ id: p.id, url: p.url, disposition: 'publish', reviewed_public: true, title: p.title, purpose: p.purpose,
        locale: LOCALE, topic: p.topic, updated_at: CONTENT_UPDATED, source_revision: revision, body_ref: `bodies/${p.id}.md`, md_path: `llm/pages/${p.id}.md` })),
      ...excluded
    ]
  }
  fs.writeFileSync(path.join(srcDir, 'inventory.json'), JSON.stringify(inventory, null, 2) + '\n')

  return { count: Object.keys(outputs).length, pages: pages.length, revision }
}
