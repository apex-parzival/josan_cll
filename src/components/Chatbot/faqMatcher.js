import { FAQS, GREETING_WORDS, THANKS_WORDS, MENU_WORDS, SKIP_WORDS } from './chatbotData'

// Lowercase, strip punctuation, pad with spaces so phrases can be matched as whole words
export function normalize(text) {
  return ' ' + text.toLowerCase().replace(/[^a-z0-9$ ]+/g, ' ').replace(/\s+/g, ' ').trim() + ' '
}

// Crude plural stripping so "fences" matches the keyword "fence"
function singularize(normalized) {
  return normalized.replace(/\b([a-z]{3,}[^s])s\b/g, '$1')
}

function isOnly(text, words) {
  return words.includes(normalize(text).trim())
}

export const isMenuRequest = text => isOnly(text, MENU_WORDS)
export const isSkip = text => isOnly(text, SKIP_WORDS)
export const isThanks = text => isOnly(text, THANKS_WORDS)

// Returns the text with any leading greeting removed, or '' if the message was only a greeting
export function stripGreeting(text) {
  let n = normalize(text)
  for (const g of [...GREETING_WORDS].sort((a, b) => b.length - a.length)) {
    if (n.startsWith(` ${g} `)) {
      n = n.slice(g.length + 1)
      break
    }
  }
  return n.trim() === 'there' ? '' : n.trim()
}

// Levenshtein distance, bailing out early once it exceeds max
function editDistance(a, b, max) {
  if (Math.abs(a.length - b.length) > max) return max + 1
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i)
  for (let i = 1; i <= a.length; i++) {
    const row = [i]
    let rowMin = i
    for (let j = 1; j <= b.length; j++) {
      row[j] = Math.min(prev[j] + 1, row[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1))
      rowMin = Math.min(rowMin, row[j])
    }
    if (rowMin > max) return max + 1
    prev = row
  }
  return prev[b.length]
}

// Typo tolerance for single-word keywords: "fense" → "fence", "basment" → "basement"
// (6+ letters and same first letter, so short words like "price"/"place" don't collide)
function fuzzyHit(words, keyword) {
  if (keyword.includes(' ') || keyword.length < 6) return false
  const max = keyword.length >= 9 ? 2 : 1
  return words.some(w => w[0] === keyword[0] && w.length >= 5 && editDistance(w, keyword, max) <= max)
}

// Scores each FAQ by the total length of its keywords found in the message (plus its boost); highest wins.
// Exact matches score full length; typo matches score a little less so exact hits win ties.
export function matchFaq(text) {
  const plain = normalize(text)
  const single = singularize(plain)
  const words = [...new Set([...plain.trim().split(' '), ...single.trim().split(' ')])]
  let best = null
  let bestScore = 0

  for (const faq of FAQS) {
    let score = 0
    for (const keyword of faq.keywords) {
      const phrase = ` ${keyword} `
      if (plain.includes(phrase) || single.includes(phrase)) score += keyword.length
      else if (fuzzyHit(words, keyword)) score += keyword.length - 1
    }
    if (score > 0) score += faq.boost || 0
    if (score > bestScore) {
      best = faq
      bestScore = score
    }
  }
  return best
}

// Card numbers (13–19 digits, optionally spaced/dashed) that shouldn't be sent or shown in chat
export function looksLikeCardNumber(text) {
  return /(?:\d[ -]?){13,19}/.test(text)
}
