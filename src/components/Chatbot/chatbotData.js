/**
 * Josan chatbot content — refined from Josan_Website_Chatbot_FAQs_and_Flow.xlsx.
 *
 * Bot rules this content follows (from the spreadsheet):
 * - Never quote prices, start dates, warranty terms, permit decisions or insurance details; route to the team.
 * - Only confirm services listed on the website; anything else is "the team will confirm".
 * - No structural/electrical/gas/excavation instructions.
 * - Never ask for passwords, banking, SIN or card details.
 * - Complaints: collect facts calmly, never admit liability or promise compensation.
 * - When unsure, or the customer asks for a person, offer a callback.
 */

export const CONTACT = {
  phones: [
    { label: '(587) 394-4029', href: 'tel:5873944029' },
    { label: '(587) 227-8001', href: 'tel:5872278001' }
  ],
  email: 'info@josancll.ca',
  address: '4029 Cornerstone Blvd NE, Calgary T3N 2A5',
  hours: 'Mon – Sat: 8:00 AM – 6:00 PM'
}

const CONTACT_LINKS = [
  ...CONTACT.phones.map(p => ({ label: `📞 ${p.label}`, href: p.href })),
  { label: `✉️ ${CONTACT.email}`, href: `mailto:${CONTACT.email}` }
]

/* ── Quick-reply menus ── */

export const MAIN_MENU = [
  { label: 'Get a Quote', action: { type: 'flow', flow: 'quote' } },
  { label: 'Landscaping', action: { type: 'category', category: 'landscaping' } },
  { label: 'Fence', action: { type: 'category', category: 'fence' } },
  { label: 'Deck & Patio', action: { type: 'category', category: 'deckPatio' } },
  { label: 'Renovation / Construction', action: { type: 'category', category: 'construction' } },
  { label: 'Existing Customer', action: { type: 'existingMenu' } },
  { label: 'Talk to Someone', action: { type: 'flow', flow: 'callback' } }
]

export const EXISTING_MENU = [
  { label: 'Question about my current project', action: { type: 'flow', flow: 'existing' } },
  { label: 'Issue with completed work', action: { type: 'flow', flow: 'issue' } },
  { label: 'Main menu', action: { type: 'menu' } }
]

// Each option presets the service and tailors the "measurements" question to that kind of project
export const CATEGORIES = {
  landscaping: {
    question: 'What type of landscaping are you considering?',
    options: [
      { label: 'Backyard', service: 'Landscaping – Backyard', detail: 'Roughly how big is the yard (e.g. 30 ft x 40 ft)?' },
      { label: 'Front Yard', service: 'Landscaping – Front Yard', detail: 'Roughly how big is the front yard?' },
      { label: 'Sod', service: 'Sod Installation', detail: 'Approximately how many square feet of sod?' },
      { label: 'Artificial Turf', service: 'Artificial Grass / Turf', detail: 'Approximately how many square feet of turf?' },
      { label: 'Grading / Levelling', service: 'Grading / Bobcat Service', detail: 'Roughly how large is the area that needs grading?' },
      { label: 'Retaining Wall', service: 'Retaining Wall', detail: 'Approximate length and height of the wall?' },
      { label: 'Trees & Garden Beds', service: 'Trees / Flower Beds / Lot Gardening', detail: 'Roughly how many trees or how large are the beds?' },
      { label: 'Rock Landscaping', service: 'Rock Landscaping', detail: 'Approximately how large is the area?' },
      { label: 'Other', service: 'Landscaping – Other', detail: null }
    ]
  },
  fence: {
    question: 'Are you looking for a new fence, a replacement, or something else?',
    options: [
      { label: 'New Fence', service: 'Fence – New', detail: 'Approximate fence length, and the material you have in mind?' },
      { label: 'Replace Existing', service: 'Fence – Replacement', detail: 'Approximate length of the existing fence, and the material you have in mind?' },
      { label: 'Gate', service: 'Gate Building', detail: 'How wide is the opening, and what style of gate?' },
      { label: 'Repair / Other', service: 'Fence – Repair / Other', detail: null }
    ]
  },
  deckPatio: {
    question: 'What are you interested in?',
    options: [
      { label: 'Deck', service: 'Deck Building', detail: 'Approximate deck size (e.g. 12 ft x 16 ft), and preferred material?' },
      { label: 'Patio', service: 'Patio', detail: 'Approximate patio size, and preferred material (stone, concrete, pavers)?' },
      { label: 'Paving Stones / Walkway', service: 'Paving Stones / Walkway', detail: 'Approximate area or length?' },
      { label: 'Pergola / Gazebo', service: 'Pergola / Gazebo', detail: 'Approximate size you have in mind?' },
      { label: 'Railing', service: 'Railing', detail: 'Approximate length of railing needed?' },
      { label: 'Other', service: 'Deck & Patio – Other', detail: null }
    ]
  },
  construction: {
    question: 'What type of project are you planning?',
    options: [
      { label: 'Basement', service: 'Basement Renovation / Development', detail: 'Approximate basement size (sq ft), and is it finished or unfinished now?' },
      { label: 'Garage', service: 'Garage Construction', detail: 'Approximate garage size (e.g. single, double, 24 ft x 24 ft)?' },
      { label: 'Kitchen', service: 'Kitchen Renovation', detail: 'Roughly how big is the kitchen?' },
      { label: 'Home Renovation', service: 'Home Renovation', detail: 'Which rooms or areas are involved?' },
      { label: 'Framing', service: 'Framing', detail: 'Approximate size of the area to be framed?' },
      { label: 'Painting', service: 'Painting', detail: 'Interior or exterior, and roughly how many rooms or square feet?' },
      { label: 'Concrete', service: 'Concrete', detail: 'What is the concrete for (patio, pad, walkway), and its approximate size?' },
      { label: 'Other', service: 'Construction – Other', detail: null }
    ]
  }
}

/* ── Lead-capture steps ── */

export const BUDGET_OPTIONS = ['Under $5K', '$5K – $10K', '$10K – $25K', '$25K+', 'Not sure yet']
export const TIMELINE_OPTIONS = ['ASAP', 'Within 1 month', '1 – 3 months', '3+ months', 'Flexible']

// label: used in the summary and in the email to the team
export const STEPS = {
  name: { label: 'Name', prompt: "What's your name?", input: 'text', placeholder: 'First and last name' },
  phone: { label: 'Phone', prompt: 'Thanks, {firstName}! What is the best phone number to reach you?', input: 'tel', placeholder: '10-digit number, e.g. 4035550123' },
  email: { label: 'Email', prompt: 'And your email address?', input: 'email', placeholder: 'you@example.com' },
  location: { label: 'Project address / postal code', prompt: 'What is the project address or postal code?', input: 'text', placeholder: 'Address or postal code' },
  service: {
    label: 'Service',
    prompt: 'Which service do you need?',
    options: ['Landscaping', 'Sod / Artificial Turf', 'Fence / Gate', 'Deck / Railing', 'Patio / Pavers', 'Retaining Wall', 'Pergola / Gazebo', 'Bobcat / Grading', 'Basement', 'Garage', 'Kitchen / Home Renovation', 'Painting', 'Other']
  },
  description: { label: 'Project description', prompt: "Please briefly describe what you'd like done.", input: 'text', placeholder: 'e.g. Replace lawn, add a patio and a new fence' },
  measurements: { label: 'Approx. measurements', prompt: 'Do you have approximate measurements? A rough guess is fine.', input: 'text', optional: true, placeholder: 'e.g. 30 ft x 40 ft' },
  budget: { label: 'Budget', prompt: 'Do you have an approximate budget range in mind?', options: BUDGET_OPTIONS },
  timeline: { label: 'Preferred timeline', prompt: 'When would you ideally like the project to start?', options: TIMELINE_OPTIONS },
  photo: { label: 'Photo', prompt: 'If you have one, please upload a photo of the project area (max 3MB). A wide-angle shot works best.', input: 'file', optional: true },
  contactPref: { label: 'Preferred contact method', prompt: 'How would you prefer the team to contact you?', options: ['Phone', 'Email', 'Either'] },
  contactTime: { label: 'Best time to call', prompt: 'When is the best time to call you?', options: ['Morning', 'Afternoon', 'Evening', 'Anytime'] },
  completionDate: { label: 'Completion date', prompt: 'Roughly when was the work completed?', input: 'text', optional: true, skipLabel: 'Not sure', placeholder: 'e.g. June 2025' }
}

export const FLOWS = {
  quote: {
    title: 'Quote request',
    existingCustomer: 'No',
    intro: "Great, I'll collect a few details so the Josan team can review your project. It takes about a minute.",
    steps: ['name', 'phone', 'email', 'location', 'service', 'description', 'measurements', 'budget', 'timeline', 'photo', 'contactPref'],
    done: "Thank you, {firstName}! Your project details have been sent to the Josan team. They'll review them and follow up about next steps. Estimates are free and no-obligation."
  },
  callback: {
    title: 'Callback request',
    existingCustomer: 'No',
    intro: "Certainly! I'll take a few details and someone from the team will call you.",
    steps: ['name', 'phone', 'email', 'contactTime', 'description'],
    prompts: { description: 'Briefly, what would you like to talk about?' },
    done: "Thanks, {firstName}! Your callback request has been sent. The team is available {hours} and will call you as soon as they can."
  },
  existing: {
    title: 'Existing customer enquiry',
    existingCustomer: 'Yes',
    intro: "No problem. I'll pass your message to the team member handling your project.",
    steps: ['name', 'phone', 'email', 'location', 'description', 'photo'],
    prompts: { description: 'What do you need help with?' },
    done: 'Thanks, {firstName}! Your message has been sent to the team, and the right person will follow up with you.'
  },
  issue: {
    title: 'Issue with completed work',
    existingCustomer: 'Yes',
    intro: "I'm sorry to hear something isn't right. Let me collect the details so the team can review it properly.",
    steps: ['name', 'phone', 'email', 'location', 'completionDate', 'description', 'photo'],
    prompts: {
      description: 'Please describe the concern in as much detail as you can.',
      photo: 'Photos really help the team understand the issue. Please upload one if you can (max 3MB).'
    },
    done: 'Thank you, {firstName}. Your report has been sent to the team. They will review it and follow up with you.'
  }
}

/* ── FAQs ──
 * keywords: lowercase, singular, punctuation-free phrases matched as whole words ("don't" → "don t").
 * boost: extra weight so rule-sensitive topics (pricing, permits…) win when a message mentions several things.
 * next: follow-up buttons — 'quote' | 'callback' | 'categories' | 'existing'
 * start: instead of buttons, go straight into that lead flow, using the answer as its intro.
 * service: preset for the quote flow when the customer continues from this answer.
 */
export const FAQS = [
  {
    id: 'services',
    keywords: ['service', 'what do you do', 'what do you offer', 'what can you do', 'offer', 'contractor', 'kind of work', 'type of work'],
    answer: "We're a Calgary landscaping and construction company. Our services include:\n• Landscaping: sod, artificial turf, retaining walls, rock landscaping, flower beds, trees, lot gardening and Bobcat work\n• Outdoor structures: decks, patios, fencing, gates, railings, pergolas and gazebos\n• Construction & renovation: basements, new basement construction, garages, framing, kitchens, home renovation and painting\n\nWhat are you planning?",
    next: 'categories'
  },
  {
    id: 'service-area',
    keywords: ['calgary', 'service area', 'area', 'near me', 'airdrie', 'chestermere', 'cochrane', 'okotoks', 'where do you work', 'do you come to', 'serve', 'serving', 'cover'],
    answer: "We serve all of Calgary (NE, NW, SW and SE), plus Airdrie, Chestermere, Cochrane and Okotoks. If you're nearby but not on that list, share your postal code in a quote request and the team will confirm.",
    next: 'quote'
  },
  {
    id: 'backyard',
    keywords: ['backyard', 'back yard', 'yard makeover', 'backyard renovation', 'landscaping', 'landscape', 'yard'],
    answer: 'Yes! We do complete backyard transformations. A project can combine sod or turf, patios, decks, fencing, retaining walls, rock and planting. Tell us what you have in mind and we\'ll prepare an estimate.',
    next: 'quote',
    service: 'Landscaping – Backyard',
    links: [{ label: 'See our project gallery', to: '/gallery' }]
  },
  {
    id: 'front-yard',
    keywords: ['front yard', 'frontyard', 'front landscaping', 'curb appeal'],
    answer: 'Yes. We can refresh or redesign front yards with sod, rock landscaping, flower beds, walkways and other exterior improvements.',
    next: 'quote',
    service: 'Landscaping – Front Yard'
  },
  {
    id: 'turf',
    keywords: ['artificial turf', 'artificial grass', 'fake grass', 'synthetic grass', 'synthetic turf', 'turf'],
    answer: 'Yes, we install artificial grass for low-maintenance, year-round green. Share the approximate area (sq ft) and a photo if you can, and we\'ll prepare an estimate.',
    next: 'quote',
    service: 'Artificial Grass / Turf',
    links: [{ label: 'Artificial grass service', to: '/services/artificial-grass-installation-turf' }]
  },
  {
    id: 'sod',
    keywords: ['sod', 'new lawn', 'lawn', 'grass installation', 'grass', 'lay sod'],
    answer: 'Yes, we install sod, either on its own or as part of a larger landscaping project.',
    next: 'quote',
    service: 'Sod Installation',
    links: [{ label: 'Sod installation service', to: '/services/sod' }]
  },
  {
    id: 'grading',
    keywords: ['grading', 'grade', 'leveling', 'levelling', 'level', 'uneven', 'drainage', 'excavation', 'excavate', 'bobcat', 'dig', 'land preparation'],
    answer: 'Yes. Grading, levelling and excavation are handled by our Bobcat service. Photos of the area help the team assess the work involved.',
    next: 'quote',
    service: 'Grading / Bobcat Service',
    links: [{ label: 'Bobcat service', to: '/services/bobcat-service' }]
  },
  {
    id: 'fence',
    keywords: ['fence', 'fencing', 'fence contractor', 'fence installation', 'replace fence', 'fence replacement', 'damaged fence', 'old fence', 'privacy fence'],
    answer: 'Yes, we build new fences and replace old or damaged ones. The approximate length, the material you\'re considering and photos of the existing fence help us prepare an estimate.',
    next: 'quote',
    service: 'Fence',
    links: [{ label: 'Fencing service', to: '/services/fencing-services' }]
  },
  {
    id: 'gates-railings',
    keywords: ['gate', 'railing', 'handrail', 'hand rail', 'stair railing'],
    answer: 'Yes, we build custom gates and install railings.',
    next: 'quote',
    service: 'Gates / Railing',
    links: [{ label: 'Gate building', to: '/services/gate-building' }, { label: 'Railing', to: '/services/railing' }]
  },
  {
    id: 'deck',
    keywords: ['deck', 'decking', 'deck builder', 'deck replacement', 'new deck', 'composite deck'],
    answer: 'Yes, we build new decks and handle deck replacements. Tell us the approximate size and what you have in mind.',
    next: 'quote',
    service: 'Deck Building',
    links: [{ label: 'Deck building service', to: '/services/deck-building-services' }]
  },
  {
    id: 'patio',
    keywords: ['patio', 'patio contractor', 'outdoor living', 'stone patio', 'concrete patio'],
    answer: 'Yes, we build patios in stone, concrete or pavers. Share the approximate size and your preferred material.',
    next: 'quote',
    service: 'Patio',
    links: [{ label: 'Patio service', to: '/services/patios' }]
  },
  {
    id: 'pavers',
    keywords: ['paving stone', 'paver', 'interlock', 'interlocking', 'hardscaping', 'hardscape', 'walkway', 'pathway', 'path'],
    answer: 'Our patio installations include paver options. For walkways and other hardscaping, send the approximate area and a few photos and the team will confirm what\'s possible.',
    next: 'quote',
    service: 'Paving Stones / Walkway'
  },
  {
    id: 'retaining-wall',
    keywords: ['retaining wall', 'garden wall', 'retaining', 'block wall'],
    answer: 'Yes, we build retaining walls. Requirements vary by property, so the team will need photos and the approximate length and height to confirm the scope.',
    next: 'quote',
    service: 'Retaining Wall',
    links: [{ label: 'Retaining walls', to: '/services/retaining-walls' }]
  },
  {
    id: 'concrete',
    keywords: ['concrete', 'concrete pad', 'cement', 'slab'],
    answer: "Concrete patios are one of our patio options. For other concrete work, like a pad or a walkway, tell us what you need and the team will confirm whether it's something we can take on.",
    next: 'quote',
    service: 'Concrete'
  },
  {
    id: 'pergola-gazebo',
    keywords: ['pergola', 'gazebo', 'shade structure', 'shade'],
    answer: 'Yes, we design and build custom pergolas and gazebos.',
    next: 'quote',
    service: 'Pergola / Gazebo',
    links: [{ label: 'Pergolas', to: '/services/pergola-services' }, { label: 'Gazebos', to: '/services/gazebo' }]
  },
  {
    id: 'trees-garden',
    keywords: ['tree', 'planting', 'plant', 'garden', 'gardening', 'flower bed', 'flower', 'lot gardening', 'shrub', 'hedge'],
    answer: 'Yes, we plant trees, design flower beds and offer lot gardening.',
    next: 'quote',
    service: 'Trees / Flower Beds / Lot Gardening',
    links: [{ label: 'Trees', to: '/services/trees' }, { label: 'Flower beds', to: '/services/flower-bed' }]
  },
  {
    id: 'rock',
    keywords: ['rock', 'river rock', 'gravel', 'boulder', 'xeriscape', 'xeriscaping', 'mulch'],
    answer: 'Yes, we install decorative river rock, boulders and gravel ground cover.',
    next: 'quote',
    service: 'Rock Landscaping',
    links: [{ label: 'Rock landscaping', to: '/services/rock' }]
  },
  {
    id: 'basement',
    keywords: ['basement', 'basement renovation', 'basement development', 'basement suite', 'legal suite', 'secondary suite', 'suite', 'develop basement'],
    answer: 'Yes, we renovate existing basements and build new basements, including legal suites. Tell us what you\'re planning and we can arrange a consultation or estimate.',
    next: 'quote',
    service: 'Basement Renovation / Development',
    links: [{ label: 'Basement renovations', to: '/services/basement-renovations' }, { label: 'New basement construction', to: '/services/new-basement-construction' }]
  },
  {
    id: 'garage',
    keywords: ['garage', 'detached garage', 'attached garage', 'garage construction'],
    answer: 'Yes, we build detached and attached garages. Share the property location and the approximate size you have in mind.',
    next: 'quote',
    service: 'Garage Construction',
    links: [{ label: 'Garage construction', to: '/services/garage' }]
  },
  {
    id: 'renovation',
    keywords: ['kitchen', 'renovation', 'renovate', 'remodel', 'remodeling', 'home renovation', 'cabinet', 'countertop', 'interior'],
    answer: 'Yes, we handle kitchen remodelling and interior and exterior home renovations.',
    next: 'quote',
    service: 'Home / Kitchen Renovation',
    links: [{ label: 'Kitchen remodelling', to: '/services/kitchen-service' }, { label: 'Home renovation', to: '/services/professional-home-renovation' }]
  },
  {
    id: 'framing',
    keywords: ['framing', 'frame', 'framer', 'stud'],
    answer: 'Yes, we provide structural framing for homes and basements.',
    next: 'quote',
    service: 'Framing',
    links: [{ label: 'Framing service', to: '/services/framing-service' }]
  },
  {
    id: 'painting',
    keywords: ['paint', 'painting', 'painter', 'repaint'],
    answer: 'Yes, we offer interior and exterior painting.',
    next: 'quote',
    service: 'Painting',
    links: [{ label: 'Painting service', to: '/services/painting-service' }]
  },
  {
    id: 'both',
    keywords: ['landscaping and construction', 'one contractor', 'both', 'everything', 'full project', 'multiple service'],
    answer: 'Yes. We handle both landscaping and construction, so one team can coordinate your whole project instead of you managing several contractors.',
    next: 'quote'
  },
  {
    id: 'free-estimate',
    keywords: ['free', 'free estimate', 'free quote', 'consultation', 'no obligation', 'estimate free'],
    answer: 'Yes, consultations and estimates are free and no-obligation. Photos, rough measurements and your location help the team assess your project faster.',
    next: 'quote',
    boost: 10
  },
  {
    id: 'pricing',
    keywords: ['cost', 'price', 'pricing', 'how much', 'charge', 'rate', 'per square', 'sq ft', 'square foot', 'square feet', 'afford', 'affordable', 'cheap', 'expensive', 'budget', 'ballpark'],
    answer: "I can't give prices in chat. Every project depends on its size, materials and site conditions, so the team prepares an estimate from your details, sometimes after a site visit. If you share a budget range, they can suggest what's achievable within it.",
    next: 'quote',
    boost: 20
  },
  {
    id: 'timeline',
    keywords: ['how long', 'timeline', 'duration', 'take to', 'finish', 'completion', 'complete', 'how many day', 'how many week'],
    answer: 'Timelines depend on the size and complexity of the project, the materials and the weather. Once the team reviews the scope, they can give you a more accurate timeline.',
    next: 'quote',
    boost: 10
  },
  {
    id: 'availability',
    keywords: ['when can you start', 'start', 'availability', 'available', 'schedule', 'book', 'booking', 'soon', 'this week', 'next week', 'this summer', 'this spring'],
    answer: "Availability depends on current projects and the type of work, so I can't promise a start date. Send us your project details and preferred timeframe, and the team will confirm availability.",
    next: 'quote',
    boost: 10
  },
  {
    id: 'site-visit',
    keywords: ['site visit', 'come out', 'come and look', 'come look', 'visit', 'inspect', 'inspection', 'see my property', 'look at my'],
    answer: 'Yes. Share your contact details, property location and a short description of the work, and the team will arrange the next step.',
    next: 'quote',
    boost: 5
  },
  {
    id: 'photos',
    keywords: ['photo', 'picture', 'pic', 'image', 'upload', 'video'],
    answer: "Absolutely, photos are very helpful. You can upload one while requesting a quote here. For more, email wide-angle shots plus close-ups of anything specific to {email}.",
    next: 'quote'
  },
  {
    id: 'design',
    keywords: ['design', 'idea', 'not sure', 'don t know', 'dont know', 'recommend', 'recommendation', 'suggest', 'suggestion', 'inspiration', 'help me decide', 'undecided'],
    answer: "Happy to help! Tell us how you'd like to use the space (more lawn, a patio, a deck, garden beds, low maintenance…), what you don't like about it now, and a rough budget. The team can suggest options from there.",
    next: 'quote'
  },
  {
    id: 'permits',
    keywords: ['permit', 'approval', 'city approval', 'city of calgary', 'bylaw', 'building permit', 'development permit', 'regulation'],
    answer: 'Permit requirements depend on the type, size and location of the work, so I can\'t say whether one is needed without a project review. The team will look at your project and discuss any permits or approvals with you.',
    next: 'callback',
    boost: 20
  },
  {
    id: 'insurance',
    keywords: ['insured', 'insurance', 'liability', 'wcb', 'bonded', 'licensed', 'license', 'licence'],
    answer: 'Please ask the Josan team directly for current insurance, licensing and coverage information for your project. I can arrange a call.',
    next: 'callback',
    boost: 20
  },
  {
    id: 'warranty',
    keywords: ['warranty', 'guarantee', 'guaranteed', 'workmanship guarantee'],
    answer: 'Warranty coverage depends on the type of work and materials. The team will explain the warranty terms that apply before your project begins.',
    next: 'callback',
    boost: 20
  },
  {
    id: 'payment',
    keywords: ['payment', 'pay', 'financing', 'finance', 'deposit', 'e transfer', 'etransfer', 'installment', 'instalment', 'invoice', 'cash'],
    answer: "The team will go over payment terms with your estimate. For your security, please don't share card or banking details in this chat.",
    next: 'callback',
    boost: 15
  },
  {
    id: 'safety',
    keywords: ['electrical', 'wiring', 'wire', 'outlet', 'gas line', 'load bearing', 'structural', 'engineer', 'engineering', 'diy', 'do it myself', 'utility line', 'call before you dig'],
    answer: "I can't give technical or safety instructions for structural, electrical, gas or excavation work. Please rely on a qualified professional. If this is part of a project you'd like us to take on, the team can review it.",
    next: 'callback',
    boost: 25
  },
  {
    id: 'unsupported',
    keywords: ['roof', 'roofing', 'snow', 'snow removal', 'plumbing', 'plumber', 'hvac', 'furnace', 'window', 'siding', 'eavestrough', 'gutter', 'pool', 'hot tub', 'solar', 'asphalt', 'mowing', 'lawn care', 'sprinkler', 'irrigation', 'demolition'],
    answer: "That isn't one of the services listed on our website, so I can't confirm it. Leave your details and the team will let you know whether they can help.",
    next: 'callback',
    boost: 5
  },
  {
    id: 'commercial',
    keywords: ['commercial', 'business', 'office building', 'property manager', 'condo', 'strata', 'builder'],
    answer: 'We provide estimates for both residential and commercial projects. Share the details and the team will confirm the scope.',
    next: 'quote'
  },
  {
    id: 'quote',
    keywords: ['quote', 'estimate', 'get a price', 'quotation', 'bid', 'proposal'],
    answer: "I can help with that! I'll ask for your contact details, project location, the service you need and a short description. Photos and rough measurements help too.",
    start: 'quote'
  },
  {
    id: 'contact',
    keywords: ['contact', 'phone number', 'call you', 'email', 'address', 'office', 'reach', 'number', 'located', 'where are you'],
    answer: 'Tap below to call or email us.\n📍 Office: {address}\n🕐 {hours}\n\nOr I can have someone call you back.',
    next: 'callback',
    links: CONTACT_LINKS
  },
  {
    id: 'hours',
    keywords: ['hour', 'open', 'closed', 'opening', 'sunday', 'saturday', 'weekend', 'holiday', 'timing'],
    answer: 'Our hours are {hours}. You can send a quote request here any time, and the team will follow up during business hours.',
    next: 'quote'
  },
  {
    id: 'callback',
    keywords: ['call me', 'callback', 'call back', 'talk to someone', 'speak', 'speak to', 'human', 'person', 'agent', 'representative', 'real person', 'someone'],
    answer: "Of course. I'll take a few details and someone from the team will call you.",
    start: 'callback',
    boost: 10
  },
  {
    id: 'existing',
    keywords: ['existing project', 'current project', 'my project', 'ongoing', 'existing customer', 'already have', 'already working', 'in progress', 'my job'],
    answer: 'Thanks for being a Josan customer! Is this about a project in progress, or an issue with completed work?',
    next: 'existing',
    boost: 10
  },
  {
    id: 'issue',
    keywords: ['problem', 'complaint', 'complain', 'issue with', 'unhappy', 'not happy', 'defect', 'poor work', 'bad job', 'deficiency', 'completed work', 'went wrong', 'broke', 'broken', 'crack', 'cracked', 'leak', 'leaking'],
    answer: "I'm sorry to hear that. I'll collect the details so the team can review it properly.",
    start: 'issue',
    boost: 5
  },
  {
    id: 'portfolio',
    keywords: ['portfolio', 'previous work', 'example', 'past project', 'gallery', 'your work', 'see your work', 'review', 'testimonial', 'before and after'],
    answer: 'Yes, you can browse our completed projects and read what our customers say:',
    next: 'quote',
    links: [{ label: 'Project gallery', to: '/gallery' }, { label: 'Customer reviews', to: '/reviews' }]
  },
  {
    id: 'why-josan',
    keywords: ['why', 'choose', 'better', 'experience', 'how long have you been', 'trust', 'rating', 'reputation', 'reliable', 'good'],
    answer: 'Josan has 8+ years of local experience, 508+ completed projects and 98% customer satisfaction. We handle both landscaping and construction, so one team can take care of your whole project, and consultations and estimates are free.',
    next: 'quote'
  }
]

/* ── Small talk ── */

export const GREETING_WORDS = ['hi', 'hello', 'hey', 'hiya', 'good morning', 'good afternoon', 'good evening', 'yo', 'howdy']
export const THANKS_WORDS = ['thanks', 'thank you', 'thank', 'thx', 'ty', 'appreciate', 'cheers', 'great', 'ok', 'okay', 'cool', 'perfect']
export const MENU_WORDS = ['menu', 'main menu', 'start over', 'restart', 'cancel', 'stop', 'exit', 'back']
export const SKIP_WORDS = ['skip', 'no', 'none', 'nope', 'n a', 'na', 'not sure', 'dont know', 'don t know', 'no photo']

export const WELCOME = "Hi! 👋 Welcome to Josan Construction & Landscaping. How can we help with your project today? Choose an option below or type your question."
export const FALLBACK = "Sorry, I didn't quite catch that. I can answer questions about our services, service area, estimates and more, or have someone from the team contact you."
export const PRIVACY_WARNING = "For your security, please don't share card numbers, banking details, SIN or passwords here. I've hidden that message. The team will never ask for them in chat."
