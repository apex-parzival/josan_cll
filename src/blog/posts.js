// Calgary homeowner guides published at /blog/<slug>.
// Every regulatory fact links to its City of Calgary (or other official) source and the
// date it was checked. Re-check sources at least yearly and update `updated`.
// Shared by BlogIndex/BlogPost (HTML), seoConfig (meta + BlogPosting schema),
// scripts/prerender.mjs (routes/sitemap) and scripts/markdown-export.mjs (/llm/pages/*.md).

const DECK_SRC = { label: 'City of Calgary – Decks: permits and requirements', url: 'https://www.calgary.ca/development/home-building/decks.html' }
const FENCE_SRC = { label: 'City of Calgary – Fences & retaining walls', url: 'https://www.calgary.ca/development/home-building/fences.html' }
const LOCATE_SRC = { label: 'Utility Safety Partners – Click Before You Dig (homeowners)', url: 'https://utilitysafety.ca/wheres-the-line/click-before-you-dig/homeowner-overview' }
const SUITE_SRC = { label: 'City of Calgary – Secondary suites', url: 'https://www.calgary.ca/development/home-building/secondary-suites.html' }
const SUITE_LEGAL_SRC = { label: 'City of Calgary – Legalize an existing secondary suite', url: 'https://www.calgary.ca/pda/pd/home-building-and-renovations/legalize-an-existing-suite.html' }
const WATER_SRC = { label: 'City of Calgary – Lawn and landscape watering schedule', url: 'https://www.calgary.ca/water/drought/lawn-watering-schedule.html' }
const HEAT_SRC = { label: 'D. Li, North Dakota State University – “Managing field surface temperature” (SportsTurf, April 2008)', url: 'https://sturf.lib.msu.edu/article/2008apr14.pdf' }

export const POSTS = [
  {
    slug: 'wood-fence-calgary-height-rules-permits',
    title: 'Wood Fence Rules in Calgary: Heights, Permits & Planning',
    h1: 'Building a Wood Fence in Calgary: Height Rules, Permits and Planning Tips',
    description: 'Calgary fence height limits, when a fence or gate needs a permit, utility locates before digging, and how to choose cedar or pressure-treated wood.',
    published: '2026-10-15',
    updated: '2026-10-15',
    image: '/assets/fencing-services.webp',
    imageAlt: 'New wood privacy fence built in a Calgary backyard',
    related: ['fencing-services', 'gate-building', 'retaining-walls'],
    intro: 'A good wood fence gives you privacy, keeps kids and pets in, and adds value to your home. Before the first post goes in, it pays to know Calgary’s height rules, when a permit is needed and what to check underground. Here is a plain-language summary for Calgary homeowners.',
    sections: [
      {
        heading: 'How tall can a fence be in Calgary?',
        paragraphs: ['According to the City of Calgary, a permit is typically required when a fence goes above these heights:'],
        bullets: [
          'Front yard: higher than 1.2 m (4 ft).',
          'Rear yard: higher than 2 m (6 ft 6 in).',
          'Inside a corner visibility triangle (the area near a street corner that drivers need to see across): higher than 0.75 m (2 ft 6 in).'
        ],
        after: 'Most backyard privacy fences are built at or just under the rear-yard limit, so you get full privacy without needing a permit. If you want something taller, plan for the permit before you order materials.'
      },
      {
        heading: 'Do gates need a permit?',
        paragraphs: ['The City lists a gate higher than 2.5 m (8 ft 2 in) as another case where a permit is typically required. Standard walk-through and driveway gates built to match a backyard fence are usually well below that height.']
      },
      {
        heading: 'Fences near retaining walls',
        paragraphs: ['If your yard slopes and the fence sits on or next to a retaining wall, the wall has its own rules. The City says a permit is typically required when a wall retains 1.2 m (4 ft) or more of soil, and walls or garden boxes within 1 m of each other are counted together. Plan the fence and the wall as one project so both are built correctly.']
      },
      {
        heading: 'Call before you dig the post holes',
        paragraphs: ['Fence posts go deep enough to hit buried gas, power and telecom lines. In Alberta, locate requests go through Utility Safety Partners’ Click Before You Dig service, online or at 1-800-242-3447. Submit the request at least three full working days before digging; Utility Safety Partners notes responses can take 5 to 10 business days in busy periods, so book early in spring.']
      },
      {
        heading: 'Know where your property line is',
        paragraphs: ['Building a fence on the wrong side of the line is one of the most common neighbour disputes. In Alberta, many homes have a Real Property Report (RPR) from when they were bought, which shows the property boundaries and existing structures. Check yours before you plan the fence layout, and talk to your neighbour early if the fence is on a shared line.']
      },
      {
        heading: 'Cedar or pressure-treated wood?',
        paragraphs: ['Both are common in Calgary:'],
        bullets: [
          'Cedar: naturally rot-resistant, light and attractive. It costs more but ages well, especially if it is stained or sealed every few years.',
          'Pressure-treated lumber: chemically treated against rot and insects and usually the lower-cost choice. It works well for posts and for fences that will be painted or stained.'
        ],
        after: 'Many fences combine the two: pressure-treated posts in the ground with cedar boards and trim above. Whatever you choose, Calgary’s freeze-thaw cycles and dry chinook winds are hard on wood, so a regular stain or sealer extends the life of the fence.'
      },
      {
        heading: 'How Josan Construction & Landscaping can help',
        paragraphs: ['We build wood and privacy fences, gates and retaining walls across Calgary, Airdrie, Chestermere, Cochrane and Okotoks, and we check the height rules for your lot as part of every quote. Estimates are free, and our team speaks English, Hindi, Punjabi and Urdu.']
      }
    ],
    sources: [FENCE_SRC, LOCATE_SRC],
    checked: '2026-10-15'
  },
  {
    slug: 'deck-permit-calgary',
    title: 'Do You Need a Permit to Build a Deck in Calgary?',
    h1: 'Do You Need a Permit to Build a Deck in Calgary?',
    description: 'When a Calgary deck needs a building permit or development permit, how pergolas and stairs change the rules, and how to plan a deck project.',
    published: '2026-10-15',
    updated: '2026-10-15',
    image: '/assets/deck-building-services.webp',
    imageAlt: 'Custom backyard deck built in Calgary',
    related: ['deck-building-services', 'decking', 'railing', 'pergola-services'],
    intro: 'Whether your deck needs a permit in Calgary mostly comes down to two things: how high it is and whether it has a roof or pergola. Here is what the City of Calgary says, in plain language.',
    sections: [
      {
        heading: 'When you need a building permit',
        paragraphs: ['The City of Calgary requires a building permit when:'],
        bullets: [
          'The deck is covered — that includes a deck with a pergola or a roof.',
          'The deck is uncovered but its surface is higher than 0.6 m (2 ft) above grade at any point.',
          'You rebuild, extend or add stairs to an existing uncovered deck that is higher than 0.6 m above grade.'
        ],
        after: 'An uncovered deck that is 0.6 m (2 ft) or lower above grade at every point does not need a building permit. On sloped yards, measure at the lowest point of the ground — a deck that is low at the house can still be well above 0.6 m at the far end.'
      },
      {
        heading: 'When you may also need a development permit',
        paragraphs: ['Separately from the building permit, the City lists cases where a development permit may be required, for example when the deck is:'],
        bullets: [
          'Located at the front of the home.',
          'Closer than 1.2 m to a side property line.',
          'Closer than 6 m to the rear property line.',
          'On a property within, or within 6 m of, a floodway.'
        ]
      },
      {
        heading: 'Pergolas, roofs and future plans',
        paragraphs: ['Because a pergola or roof makes the deck “covered”, adding one later can turn a no-permit deck into one that needs a permit. If you think you might want shade later, design the deck and its footings for it from the start.']
      },
      {
        heading: 'Composite or wood decking?',
        paragraphs: ['Pressure-treated wood is the budget-friendly option and is easy to repair. Cedar looks and smells great but needs regular staining. Composite boards cost more up front but need far less maintenance — no staining or sanding — which many Calgary homeowners prefer given our freeze-thaw winters and strong summer sun. The frame underneath is usually pressure-treated lumber either way.']
      },
      {
        heading: 'Before you start',
        bullets: [
          'Check your Real Property Report so you know where the property lines are.',
          'Request utility locates through Utility Safety Partners (Click Before You Dig) at least three working days before digging footings.',
          'If a permit is needed, allow time for the application and inspections before your planned build date.'
        ]
      },
      {
        heading: 'How Josan Construction & Landscaping can help',
        paragraphs: ['We design and build composite and wood decks, railings, stairs and pergolas across Calgary and nearby communities. We confirm whether your deck needs a permit as part of the quote. Estimates are free, and we speak English, Hindi, Punjabi and Urdu.']
      }
    ],
    sources: [DECK_SRC, LOCATE_SRC],
    checked: '2026-10-15'
  },
  {
    slug: 'legal-basement-suite-calgary-amnesty',
    title: 'Legal Basement Suites in Calgary: Rules & Dec. 31 Deadline',
    h1: 'Legal Basement Suites in Calgary: Requirements and the Dec. 31, 2026 Amnesty Deadline',
    description: 'What makes a Calgary basement suite legal: permits, egress windows, fire separation, smoke and CO alarms, inspections — and the amnesty ending Dec. 31, 2026.',
    published: '2026-10-15',
    updated: '2026-10-15',
    image: '/assets/basement-renovations.webp',
    imageAlt: 'Finished basement suite in a Calgary home',
    related: ['basement-renovations', 'new-basement-construction', 'basement-renovation-home', 'framing-service'],
    intro: 'A legal basement suite can earn rental income, house family members and add value to your home. If you already have a suite — or are planning one — the City of Calgary’s Secondary Suite Amnesty Program ends on December 31, 2026. Here is what a legal suite needs and why timing matters.',
    sections: [
      {
        heading: 'When is a basement a “secondary suite”?',
        paragraphs: ['If your basement (or in-law suite) has both a bathroom and cooking facilities, the City treats it as a secondary suite, and it needs a building permit. Each suite must also have its own entrance — a shared stairwell is acceptable as long as each unit has a private entrance.']
      },
      {
        heading: 'Permits you may need',
        bullets: [
          'Building permit — required for a suite with a bathroom and cooking facilities.',
          'Development permit — may be required if suites are discretionary in your land use district or the design does not meet the Land Use Bylaw.',
          'Electrical and plumbing permits — each is a separate permit.'
        ]
      },
      {
        heading: 'Key life-safety requirements',
        paragraphs: ['For existing suites, the City lists minimum life-safety requirements, including:'],
        bullets: [
          'Egress windows: each bedroom needs at least one window that opens fully, with an opening of at least 0.35 m² and no side smaller than 380 mm.',
          'Fire separation: drywall at least 12.7 mm thick on the ceiling and on both sides of the wall studs between the suite and the main home, with joints taped and filled.',
          'Smoke alarms: in each bedroom and common space, interconnected so an alarm sounds in both the suite and the main home.',
          'Carbon monoxide alarms: located centrally, within 5 m of bedrooms, and interconnected.'
        ],
        after: 'Suites built before March 12, 2018 may qualify for reduced requirements, but they must still meet these minimum life-safety standards. New suites are built to the full building code.'
      },
      {
        heading: 'Inspections',
        paragraphs: ['Two inspections are required: a framing (rough-in) inspection before insulation and drywall cover the work, and a final inspection when the suite is ready to live in. For existing suites, the City offers a reduced-requirements application (owner declaration, suite information sheet and photos) or a full-plans application.']
      },
      {
        heading: 'The amnesty deadline: December 31, 2026',
        paragraphs: ['Under the Secondary Suite Amnesty Program, homeowners who apply before December 31, 2026 can avoid development permit charges and registration fees. Registered suites appear on the City’s online Secondary Suite Registry and receive a numbered sticker for the entrance; registration is free until the amnesty ends and stays with the address if the home is sold.', 'Note that the City’s separate Suite Incentive Programs closed to applications on September 28, 2026.']
      },
      {
        heading: 'How Josan Construction & Landscaping can help',
        paragraphs: ['We develop basements and legal suites in Calgary from bare concrete to finished space — framing, drywall and fire separation, egress windows, bathrooms, kitchens and painting — and we work through the permit and inspection steps with you. Free estimates; we speak English, Hindi, Punjabi and Urdu.']
      }
    ],
    sources: [SUITE_SRC, SUITE_LEGAL_SRC],
    checked: '2026-10-15'
  },
  {
    slug: 'new-sod-calgary-watering-rules',
    title: 'New Sod in Calgary: Watering Rules & First-Month Care',
    h1: 'Laying New Sod in Calgary: Watering Rules and First-Month Care',
    description: 'Calgary’s lawn watering schedule, the 21-day watering allowance for new sod, and practical tips to help a new lawn root well.',
    published: '2026-10-15',
    updated: '2026-10-15',
    image: '/assets/sod.webp',
    imageAlt: 'Fresh sod being installed in a Calgary yard',
    related: ['sod', 'lot-gardening', 'bobcat-service', 'artificial-grass-installation-turf'],
    intro: 'New sod gives you a finished lawn in a day, but the first few weeks decide whether it roots well. Calgary now has a year-round watering schedule, with a special allowance for new sod. Here is how it works and how to look after a new lawn.',
    sections: [
      {
        heading: 'Calgary’s lawn watering schedule',
        paragraphs: ['The City of Calgary’s lawn and landscape watering schedule has been in effect since April 29, 2026. Watering days depend on the last digit of your street address:'],
        bullets: [
          'Even addresses (ending 0, 2, 4, 6, 8): Tuesday, Thursday and Saturday.',
          'Odd addresses (ending 1, 3, 5, 7, 9): Wednesday, Friday and Sunday.',
          'Allowed times on your days: midnight to 10 a.m. and 7 p.m. to 11:59 p.m.'
        ],
        after: 'Multi-unit buildings use the building’s street address, not the unit number.'
      },
      {
        heading: 'New sod can be watered any day for 21 days',
        paragraphs: ['The schedule allows watering of new plantings during their establishment period on any day. For sod, that period is 21 days. Seed gets 45 days, and new trees and shrubs get 5 years. After the 21 days, a new lawn moves onto the regular schedule like any other.']
      },
      {
        heading: 'First-month care tips',
        bullets: [
          'Water right after installation until the soil under the sod is moist, not just the grass on top.',
          'In the first one to two weeks, water often enough that the sod never dries out — lift a corner to check the soil underneath.',
          'Stay off the lawn as much as possible while the roots knit into the soil.',
          'Once the sod no longer lifts easily at the corners, start watering less often but more deeply to encourage deep roots — and plan to be on the regular schedule by day 21.',
          'Wait to mow until the roots have taken hold, and keep the mower set high for the first few cuts.'
        ]
      },
      {
        heading: 'Good sod starts with good grading',
        paragraphs: ['Most problems with new lawns come from what is underneath: low spots that hold water, compacted soil, or too little topsoil. Grading the yard so water drains away from the house and spreading a proper layer of topsoil before laying sod makes the lawn easier to water — which matters more now that watering days are limited.']
      },
      {
        heading: 'How Josan Construction & Landscaping can help',
        paragraphs: ['We grade yards, bring in topsoil with our Bobcat, and lay fresh sod for new builds and lawn replacements across Calgary, Airdrie and Chestermere. Free estimates; we speak English, Hindi, Punjabi and Urdu.']
      }
    ],
    sources: [WATER_SRC],
    checked: '2026-10-15'
  },
  {
    slug: 'artificial-turf-vs-real-grass-calgary',
    title: 'Artificial Turf vs Real Grass in Calgary: Pros & Cons',
    h1: 'Artificial Turf vs Real Grass in Calgary: An Honest Comparison',
    description: 'Comparing artificial turf and natural grass for Calgary yards: watering limits, summer surface heat, maintenance, pets and cost over time.',
    published: '2026-10-15',
    updated: '2026-10-15',
    image: '/assets/artificial-grass-installation-turf.webp',
    imageAlt: 'Artificial turf being installed in a Calgary backyard',
    related: ['artificial-grass-installation-turf', 'sod', 'rock', 'flower-bed'],
    intro: 'More Calgary homeowners are asking whether to replace their lawn with artificial turf. Neither choice is right for every yard. Here is a balanced look at the trade-offs for Calgary’s climate.',
    sections: [
      {
        heading: 'Watering: the biggest difference',
        paragraphs: ['Calgary’s year-round watering schedule (in effect since April 29, 2026) limits lawn watering to three set days a week, based on your address, during set hours. Artificial turf needs no regular watering at all, which is a big reason people consider it. A healthy natural lawn on good topsoil can still thrive on the schedule, but thin, sun-baked or sloped areas often struggle.']
      },
      {
        heading: 'Summer heat',
        paragraphs: ['Synthetic turf gets hotter than grass in full sun. In a study at North Dakota State University, maximum surface temperatures on synthetic turf plots reached roughly 50–58 °C in summer, compared with roughly 39–50 °C on natural grass plots. On hot days, that matters for bare feet, kids and pets. Shade, a quick rinse with a hose and choosing lighter-coloured or cooling turf products can help.']
      },
      {
        heading: 'Maintenance',
        bullets: [
          'Natural grass: mowing, fertilizing, aerating, weeding and watering — but it repairs itself and cools the yard.',
          'Artificial turf: no mowing or watering; occasional brushing to keep the blades upright, removing leaves and debris, and rinsing pet areas.'
        ]
      },
      {
        heading: 'Kids and pets',
        paragraphs: ['Turf stays green and mud-free through spring melt, which many dog owners love. Pet areas need a good base that drains well and occasional rinsing to keep odours down. Natural grass is softer and cooler in summer heat but can wear into bare, muddy patches where dogs run.']
      },
      {
        heading: 'Cost over time',
        paragraphs: ['Artificial turf costs more to install than sod, because the old lawn is removed and a compacted gravel base is built before the turf goes down. Over the following years, you save on water, fertilizer and mowing. Sod is cheaper up front but has ongoing care costs. The right choice depends on how you use the yard and how long you plan to stay.']
      },
      {
        heading: 'A common middle ground',
        paragraphs: ['Many Calgary yards mix both: turf in high-traffic or hard-to-water areas (dog runs, narrow side yards, steep spots) and natural grass, flower beds or rock landscaping elsewhere.']
      },
      {
        heading: 'How Josan Construction & Landscaping can help',
        paragraphs: ['We install both artificial turf and natural sod, along with rock landscaping and flower beds, so we can recommend what suits each part of your yard. Free estimates; we speak English, Hindi, Punjabi and Urdu.']
      }
    ],
    sources: [WATER_SRC, HEAT_SRC],
    checked: '2026-10-15'
  }
]

export function getPost(slug) {
  return POSTS.find(p => p.slug === slug) || null
}

// Posts that mention a service, used for "Helpful guides" on service pages.
export function postsForService(serviceId) {
  return POSTS.filter(p => p.related.includes(serviceId))
}
