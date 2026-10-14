// Groups legacy service paragraphs into heading + answer cards.
// Shared by ServiceDetailPage (HTML) and scripts/prerender.mjs (Markdown export)
// so both representations always contain the same text.

// Treat short lines without ending punctuation as headings.
function isHeading(item) {
  if (item.tag === 'h2' || item.tag === 'h3') return true
  const text = item.text.trim()
  return text.length < 60 && !text.endsWith('.') && !text.endsWith('?')
}

export function getServiceCards(paragraphs) {
  const cards = []
  let pendingHeadings = []

  paragraphs.forEach((item) => {
    if (isHeading(item)) {
      pendingHeadings.push(item.text.trim())
    } else {
      let headingText = ''
      if (pendingHeadings.length > 0) {
        headingText = pendingHeadings.map(h => {
          let clean = h.replace(/\.+$/, '')
          if (!clean.endsWith('?')) clean += '?'
          return clean
        }).join(' ')
        pendingHeadings = []
      }
      cards.push({ heading: headingText, text: item.text })
    }
  })

  if (pendingHeadings.length > 0) {
    cards.push({
      heading: pendingHeadings.map(h => h.endsWith('?') ? h : h + '?').join(' '),
      text: ''
    })
  }
  return cards
}
