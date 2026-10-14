// Calgary permit facts shown on service pages (and exported to /llm/pages/*.md).
// Every fact below is taken from the City of Calgary pages linked in `sources`,
// checked on FACTS_CHECKED. The City states its web guidance "has no legal status",
// so each block ends by telling readers to confirm with the City.
// Re-check these pages at least once a year or whenever the City updates its bylaws.

export const FACTS_CHECKED = '2026-10-14'

const DECK_SOURCE = { label: 'City of Calgary – Decks: permits and requirements', url: 'https://www.calgary.ca/development/home-building/decks.html' }
const FENCE_SOURCE = { label: 'City of Calgary – Fences & retaining walls', url: 'https://www.calgary.ca/development/home-building/fences.html' }
const BASEMENT_SOURCE = { label: 'City of Calgary – Basement development', url: 'https://www.calgary.ca/development/home-building/basements.html' }

const DECK_FACTS = {
  heading: 'Do I need a permit to build a deck in Calgary?',
  points: [
    'A building permit is required for any covered deck (a deck with a pergola or roof).',
    'An uncovered deck needs a building permit if its surface is higher than 0.6 m (2 ft) above grade at any point. An uncovered deck that is 0.6 m or lower at every point does not need one.',
    'Rebuilding, extending or adding stairs to an existing uncovered deck that is higher than 0.6 m also requires a building permit.',
    'A development permit may also be needed — for example when the deck is at the front of the home, closer than 1.2 m to a side property line, closer than 6 m to the rear property line, or within or near a floodway.'
  ],
  sources: [DECK_SOURCE]
}

const FENCE_FACTS = {
  heading: 'What are the fence height rules in Calgary?',
  points: [
    'A permit is typically required if a fence is higher than 1.2 m (4 ft) in the front yard or higher than 2 m (6 ft 6 in) in the rear yard.',
    'Inside a corner visibility triangle the limit is 0.75 m (2 ft 6 in).',
    'A gate higher than 2.5 m (8 ft 2 in) also typically needs a permit.'
  ],
  sources: [FENCE_SOURCE]
}

const RETAINING_FACTS = {
  heading: 'When does a retaining wall need a permit in Calgary?',
  points: [
    'A permit is typically required when a wall retains 1.2 m (4 ft) or more of soil.',
    'Walls and garden boxes within 1 m (3 ft 3 in) of each other count together: if their combined height is 1.2 m or more, a permit is typically required.',
    'In most situations retaining walls only need a building permit, but the City notes walls 1.2 m or taller may also require a development permit — confirm for your property.'
  ],
  sources: [FENCE_SOURCE]
}

const BASEMENT_FACTS = {
  heading: 'What permits does a basement development need in Calgary?',
  points: [
    'Developing a basement for the first time requires a building permit.',
    'A separate electrical permit is needed for all electrical installations and renovations, and a separate plumbing permit for all new plumbing.',
    'If the basement will have both a kitchen and a bathroom, it must be applied for as a secondary suite.'
  ],
  sources: [BASEMENT_SOURCE]
}

export const CALGARY_FACTS = {
  'deck-building-services': DECK_FACTS,
  'decking': DECK_FACTS,
  'pergola-services': DECK_FACTS,
  'fencing-services': FENCE_FACTS,
  'gate-building': FENCE_FACTS,
  'retaining-walls': RETAINING_FACTS,
  'basement-renovations': BASEMENT_FACTS,
  'basement-renovation-home': BASEMENT_FACTS,
  'new-basement-construction': BASEMENT_FACTS
}

export const FACTS_DISCLAIMER = 'Summarized from City of Calgary guidance, which the City says has no legal status. Requirements change, so always confirm with the City of Calgary before you build.'

// Contextual internal links between closely related services.
export const RELATED_SERVICES = {
  'artificial-grass-installation-turf': ['sod', 'lot-gardening', 'rock', 'flower-bed'],
  'basement-renovation-home': ['basement-renovations', 'new-basement-construction', 'framing-service', 'painting-service'],
  'basement-renovations': ['new-basement-construction', 'basement-renovation-home', 'framing-service', 'kitchen-service'],
  'bobcat-service': ['sod', 'retaining-walls', 'lot-gardening', 'patios'],
  'deck-building-services': ['decking', 'railing', 'pergola-services', 'patios'],
  'decking': ['deck-building-services', 'railing', 'pergola-services', 'gazebo'],
  'fencing-services': ['gate-building', 'railing', 'retaining-walls', 'deck-building-services'],
  'flower-bed': ['trees', 'rock', 'lot-gardening', 'sod'],
  'framing-service': ['basement-renovations', 'garage', 'professional-home-renovation', 'new-basement-construction'],
  'garage': ['framing-service', 'bobcat-service', 'professional-home-renovation', 'painting-service'],
  'gate-building': ['fencing-services', 'railing', 'deck-building-services', 'retaining-walls'],
  'gazebo': ['pergola-services', 'deck-building-services', 'patios', 'decking'],
  'kitchen-service': ['professional-home-renovation', 'basement-renovations', 'painting-service', 'framing-service'],
  'lot-gardening': ['sod', 'trees', 'flower-bed', 'bobcat-service'],
  'new-basement-construction': ['basement-renovations', 'framing-service', 'basement-renovation-home', 'kitchen-service'],
  'painting-service': ['professional-home-renovation', 'kitchen-service', 'basement-renovation-home', 'deck-building-services'],
  'patios': ['retaining-walls', 'pergola-services', 'deck-building-services', 'rock'],
  'pergola-services': ['gazebo', 'deck-building-services', 'patios', 'decking'],
  'professional-home-renovation': ['kitchen-service', 'basement-renovations', 'painting-service', 'framing-service'],
  'railing': ['deck-building-services', 'gate-building', 'fencing-services', 'decking'],
  'retaining-walls': ['patios', 'bobcat-service', 'fencing-services', 'rock'],
  'rock': ['flower-bed', 'retaining-walls', 'artificial-grass-installation-turf', 'lot-gardening'],
  'sod': ['lot-gardening', 'artificial-grass-installation-turf', 'bobcat-service', 'trees'],
  'trees': ['lot-gardening', 'flower-bed', 'sod', 'rock']
}
