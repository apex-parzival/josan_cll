import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './Chatbot.css'
import {
  CONTACT, MAIN_MENU, EXISTING_MENU, CATEGORIES, STEPS, FLOWS,
  WELCOME, FALLBACK, PRIVACY_WARNING
} from './chatbotData'
import { matchFaq, stripGreeting, isMenuRequest, isSkip, isThanks, looksLikeCardNumber } from './faqMatcher'
import { sendEnquiryEmail, emailDomainAcceptsMail } from '../../services/emailService'
import { isEmailFormat, toTenDigitPhone, imageFileError, fileToBase64 } from '../../services/formUtils'

const TYPING_DELAY = 550
const TEASER_KEY = 'josan-chat-teaser-seen'
const EMAIL_DOMAIN_ERROR = "That email domain doesn't seem to exist. Please check for typos (e.g. gmail.com, outlook.com)."

const MENU_BUTTON = { label: 'Main menu', action: { type: 'menu' } }
const POPULAR_QUESTIONS = [
  'Do you offer free estimates?',
  'What areas do you serve?',
  'How long does a project take?'
].map(q => ({ label: `💬 ${q}`, action: { type: 'question', text: q } }))
const QUOTE_BUTTON ={ label: 'Get a Quote', action: { type: 'flow', flow: 'quote' } }
const CALLBACK_BUTTON = { label: 'Request a Callback', action: { type: 'flow', flow: 'callback' } }
const ASK_BUTTON = { label: 'Ask another question', action: { type: 'ask' } }
const SUMMARY_OPTIONS = [
  { label: '✅ Send to the team', action: { type: 'submit' } },
  { label: 'Start over', action: { type: 'restartFlow' } },
  { label: 'Cancel', action: { type: 'menu' } }
]
const POSTAL_CODE = /\b([a-z])\d[a-z][ -]?\d[a-z]\d\b/i

// Replaces {firstName}, {email}, {phones}, {address}, {hours} in bot text
function fill(template, data = {}) {
  const values = {
    firstName: (data.name || '').trim().split(/\s+/)[0] || 'there',
    email: CONTACT.email,
    phones: CONTACT.phones.map(p => p.label).join(' / '),
    address: CONTACT.address,
    hours: CONTACT.hours
  }
  return template.replace(/\{(\w+)\}/g, (match, key) => values[key] ?? match)
}

function followUps(next, service) {
  switch (next) {
    case 'quote': return [{ ...QUOTE_BUTTON, action: { ...QUOTE_BUTTON.action, service } }, ASK_BUTTON, MENU_BUTTON]
    case 'callback': return [CALLBACK_BUTTON, QUOTE_BUTTON, MENU_BUTTON]
    case 'categories': return [...MAIN_MENU.filter(o => o.action.type === 'category'), QUOTE_BUTTON]
    case 'existing': return EXISTING_MENU
    default: return MAIN_MENU
  }
}

function stepDef(current, key) {
  const def = { ...STEPS[key] }
  const override = FLOWS[current.name].prompts?.[key]
  if (override) def.prompt = override
  if (key === 'measurements' && current.preset.detail) def.prompt = `${current.preset.detail} A rough guess is fine.`
  return def
}

function stepOptions(def) {
  const options = (def.options || []).map(o => ({ label: o, action: { type: 'answer', value: o } }))
  if (def.input === 'file') options.push({ label: '📷 Upload a photo', action: { type: 'upload' } })
  if (def.optional) options.push({ label: def.skipLabel || 'Skip', action: { type: 'answer', value: null } })
  return options
}

function locationNote(value) {
  const postal = value.match(POSTAL_CODE)
  if (postal && postal[1].toUpperCase() !== 'T') {
    return "That postal code looks like it's outside Alberta. The team will confirm whether your property is within our service area."
  }
  return ''
}

function summaryText(current) {
  const lines = FLOWS[current.name].steps
    .filter(key => current.data[key])
    .map(key => `${STEPS[key].label}: ${key === 'photo' ? current.data.photo.name : current.data[key]}`)
  return `Here's what I have:\n\n${lines.join('\n')}\n\nShall I send this to the Josan team?`
}

// Body of the email the team receives; name, phone and email already have their own rows
function buildMessage(current) {
  const flow = FLOWS[current.name]
  const lines = ['Sent via the website chatbot', `Request type: ${flow.title}`, `Existing customer: ${flow.existingCustomer}`, '']
  for (const key of flow.steps) {
    if (['name', 'phone', 'email', 'photo'].includes(key)) continue
    lines.push(`${STEPS[key].label}: ${current.data[key] || '—'}`)
  }
  return lines.join('\n')
}

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [options, setOptions] = useState([])
  const [typing, setTyping] = useState(false)
  const [flow, setFlow] = useState(null) // { name, index, data, preset }
  const [input, setInput] = useState('')
  const [teaser, setTeaser] = useState(false)

  const idRef = useRef(0)
  const timers = useRef([])
  const listRef = useRef(null)
  const inputRef = useRef(null)
  const fileRef = useRef(null)

  const steps = flow ? FLOWS[flow.name].steps : []
  const currentStep = flow && flow.index < steps.length ? steps[flow.index] : null
  const currentDef = currentStep ? stepDef(flow, currentStep) : null

  useEffect(() => {
    let seen = false
    try { seen = sessionStorage.getItem(TEASER_KEY) === '1' } catch { /* storage unavailable */ }
    if (seen) return
    const t = setTimeout(() => setTeaser(true), 6000)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  useEffect(() => {
    const el = listRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, typing, options])

  // Focus the input on desktop only; on phones it would pop the keyboard over the conversation
  useEffect(() => {
    if (open && window.matchMedia('(pointer: fine)').matches) inputRef.current?.focus()
  }, [open])

  function dismissTeaser() {
    setTeaser(false)
    try { sessionStorage.setItem(TEASER_KEY, '1') } catch { /* storage unavailable */ }
  }

  function addUser(text) {
    setMessages(prev => [...prev, { id: ++idRef.current, from: 'user', text }])
  }

  function botSay(texts, nextOptions = [], links) {
    const list = [].concat(texts).filter(Boolean)
    setOptions([])
    setTyping(true)
    const t = setTimeout(() => {
      setTyping(false)
      setMessages(prev => [
        ...prev,
        ...list.map((text, i) => ({ id: ++idRef.current, from: 'bot', text, links: i === list.length - 1 ? links : undefined }))
      ])
      setOptions(nextOptions)
    }, TYPING_DELAY)
    timers.current.push(t)
  }

  function openChat() {
    setOpen(true)
    dismissTeaser()
    if (messages.length === 0 && !typing) botSay(WELCOME, MAIN_MENU)
  }

  function restart() {
    timers.current.forEach(clearTimeout)
    timers.current = []
    setMessages([])
    setFlow(null)
    botSay(WELCOME, MAIN_MENU)
  }

  /* ── Lead flows ── */

  function startFlow(name, preset = {}, intro = FLOWS[name].intro) {
    const data = preset.service ? { service: preset.service } : {}
    askNext({ name, index: -1, data, preset }, intro)
  }

  // Moves to the next unanswered step (preset answers are skipped), or to the summary
  function askNext(current, lead) {
    const flowSteps = FLOWS[current.name].steps
    let index = current.index + 1
    while (index < flowSteps.length && current.data[flowSteps[index]] !== undefined) index++
    const next = { ...current, index }
    setFlow(next)
    if (index >= flowSteps.length) {
      botSay([lead, summaryText(next)], SUMMARY_OPTIONS)
      return
    }
    const def = stepDef(next, flowSteps[index])
    botSay([lead, fill(def.prompt, next.data)], stepOptions(def))
  }

  async function answerStep(raw, display) {
    const key = currentStep
    const retry = message => botSay(message, stepOptions(currentDef))
    const save = (value, lead) => askNext({ ...flow, data: { ...flow.data, [key]: value } }, lead)

    addUser(display)
    if (raw === null || (currentDef.optional && isSkip(raw))) return save('')
    if (currentDef.input === 'file') return retry('Please tap "Upload a photo", or "Skip" if you don\'t have one handy.')

    let value = raw.trim()
    if (!value) return retry('Please type an answer or choose an option.')
    if (key === 'name' && value.length < 2) return retry('Please enter your name.')
    if (key === 'phone') {
      value = toTenDigitPhone(value)
      if (value.length !== 10) return retry('Please enter a 10-digit phone number, e.g. 4035550123.')
    }
    if (key === 'email') {
      if (!isEmailFormat(value)) return retry("That doesn't look like a valid email address. Please check it and try again.")
      setTyping(true)
      const ok = await emailDomainAcceptsMail(value)
      setTyping(false)
      if (!ok) return retry(EMAIL_DOMAIN_ERROR)
    }
    save(value, key === 'location' ? locationNote(value) : '')
  }

  function handleFile(e) {
    const file = e.target.files[0]
    e.target.value = ''
    if (!file || currentStep !== 'photo') return
    const err = imageFileError(file)
    if (err) return botSay(err, stepOptions(currentDef))
    addUser(`📎 ${file.name}`)
    askNext({ ...flow, data: { ...flow.data, photo: file } })
  }

  async function submitFlow() {
    const current = flow
    const def = FLOWS[current.name]
    const { name, phone, email, service, photo } = current.data
    setOptions([])
    setTyping(true)

    let imageContent = null
    let imageName = ''
    if (photo) {
      try {
        imageContent = await fileToBase64(photo)
        imageName = photo.name
      } catch (err) {
        console.error('Failed to convert image to base64:', err)
      }
    }

    const result = await sendEnquiryEmail({
      name,
      email,
      phone,
      service: `Chatbot – ${def.title}${service ? `: ${service}` : ''}`,
      message: buildMessage(current),
      imageContent,
      imageName
    })
    setTyping(false)

    if (result.error === 'invalid_email_domain') {
      const data = { ...current.data }
      delete data.email
      askNext({ ...current, index: def.steps.indexOf('email') - 1, data }, EMAIL_DOMAIN_ERROR)
      return
    }
    setFlow(null)
    botSay(fill(def.done, current.data), [ASK_BUTTON, MENU_BUTTON, { label: 'Close chat', action: { type: 'close' } }])
  }

  /* ── Input handling ── */

  function choose(option) {
    if (typing) return
    const { action } = option
    if (action.type === 'upload') return fileRef.current?.click()
    if (action.type === 'answer') return answerStep(action.value, option.label)

    addUser(option.label)
    switch (action.type) {
      case 'menu':
        setFlow(null)
        return botSay('What can I help you with?', MAIN_MENU)
      case 'ask':
        setFlow(null)
        inputRef.current?.focus()
        return botSay('Sure, what would you like to know? Type your question below, or pick a popular one.', [...POPULAR_QUESTIONS, MENU_BUTTON])
      case 'question':
        setFlow(null)
        return respondToQuestion(action.text)
      case 'existingMenu':
        setFlow(null)
        return botSay('Thanks for being a Josan customer! What do you need help with?', EXISTING_MENU)
      case 'category': {
        const category = CATEGORIES[action.category]
        setFlow(null)
        return botSay(category.question, category.options.map(o => ({
          label: o.label,
          action: { type: 'flow', flow: 'quote', service: o.service, detail: o.detail }
        })))
      }
      case 'flow':
        return startFlow(action.flow, { service: action.service, detail: action.detail })
      case 'restartFlow':
        return startFlow(flow.name, flow.preset)
      case 'submit':
        return submitFlow()
      case 'close':
        return setOpen(false)
    }
  }

  function respondToQuestion(text) {
    if (isMenuRequest(text)) return botSay('What can I help you with?', MAIN_MENU)
    if (isThanks(text)) return botSay("You're welcome! Is there anything else I can help with?", MAIN_MENU)
    const question = stripGreeting(text)
    if (!question) return botSay('Hi there! 👋 How can we help with your project today?', MAIN_MENU)

    const faq = matchFaq(question)
    if (!faq) return botSay(FALLBACK, [QUOTE_BUTTON, CALLBACK_BUTTON, ...POPULAR_QUESTIONS, MENU_BUTTON])
    if (faq.start) return startFlow(faq.start, {}, fill(faq.answer))
    botSay(fill(faq.answer), followUps(faq.next, faq.service), faq.links)
  }

  function handleSend(e) {
    e.preventDefault()
    const text = input.trim()
    if (!text || typing) return
    setInput('')

    if (currentStep !== 'phone' && looksLikeCardNumber(text)) {
      addUser('•••• (hidden for your security)')
      return botSay(PRIVACY_WARNING, currentDef ? stepOptions(currentDef) : MAIN_MENU)
    }
    if (flow && isMenuRequest(text)) {
      addUser(text)
      setFlow(null)
      return botSay("No problem, I've cancelled that. What else can I help with?", MAIN_MENU)
    }
    if (currentStep) return answerStep(text, text)
    if (flow) {
      // Waiting on the summary: accept a typed "yes", otherwise point back to the buttons
      addUser(text)
      if (/^(yes|y|yeah|yep|send|submit|sure|ok|okay)\b/i.test(text)) return submitFlow()
      return botSay('Please choose one of the options below.', SUMMARY_OPTIONS)
    }
    addUser(text)
    respondToQuestion(text)
  }

  function handleLinkClick() {
    // On phones the chat covers the page, so close it to show where the link went
    if (window.matchMedia('(max-width: 480px)').matches) setOpen(false)
  }

  // Progress through a lead flow, counting only the steps the user is actually asked
  const flowProgress = flow && currentStep
    ? { step: flow.index + 1, total: steps.length, label: STEPS[currentStep].label }
    : null

  const inputType = currentDef?.input === 'email' ? 'email' : currentDef?.input === 'tel' ? 'tel' : 'text'
  const placeholder = currentDef?.input === 'file'
    ? 'Upload a photo above, or type "skip"'
    : currentDef?.placeholder || (flow ? 'Choose an option above' : 'Type your question…')

  return (
    <div className="chatbot" onKeyDown={e => e.key === 'Escape' && setOpen(false)}>
      {open && (
        <section className="chatbot-panel" role="dialog" aria-label="Chat with Josan Construction & Landscaping">
          <header className="chatbot-header">
            <div className="chatbot-avatar-wrap">
              <img src="/assets/logo.png" alt="" className="chatbot-avatar" />
              <span className="chatbot-online" aria-hidden="true" />
            </div>
            <div className="chatbot-title">
              <strong>Josan Assistant</strong>
              <span>Online · Replies instantly</span>
            </div>
            <a href={CONTACT.phones[0].href} className="chatbot-icon-btn" aria-label={`Call us at ${CONTACT.phones[0].label}`} title={`Call ${CONTACT.phones[0].label}`}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z" /></svg>
            </a>
            <button type="button" className="chatbot-icon-btn" onClick={restart} aria-label="Restart conversation" title="Restart">↺</button>
            <button type="button" className="chatbot-icon-btn" onClick={() => setOpen(false)} aria-label="Close chat" title="Close">✕</button>
          </header>

          {flowProgress && (
            <div className="chatbot-progress" aria-label={`Step ${flowProgress.step} of ${flowProgress.total}`}>
              <div className="chatbot-progress-text">
                <span>{FLOWS[flow.name].title}</span>
                <span>Step {flowProgress.step} of {flowProgress.total}</span>
              </div>
              <div className="chatbot-progress-track">
                <div className="chatbot-progress-fill" style={{ width: `${(flowProgress.step / flowProgress.total) * 100}%` }} />
              </div>
            </div>
          )}

          <div className="chatbot-messages" ref={listRef} aria-live="polite">
            {messages.map((m, i) => (
              <div key={m.id} className={`chatbot-msg ${m.from}${m.from === 'bot' && messages[i - 1]?.from === 'bot' ? ' grouped' : ''}`}>
                <div className="chatbot-bubble">{m.text}</div>
                {m.links && (
                  <div className="chatbot-links">
                    {m.links.map(link => link.to
                      ? <Link key={link.label} to={link.to} className="chatbot-link" onClick={handleLinkClick}>{link.label} →</Link>
                      : <a key={link.label} href={link.href} className="chatbot-link">{link.label}</a>
                    )}
                  </div>
                )}
              </div>
            ))}
            {typing && (
              <div className={`chatbot-msg bot${messages.at(-1)?.from === 'bot' ? ' grouped' : ''}`}>
                <div className="chatbot-bubble chatbot-typing" aria-label="Assistant is typing">
                  <span /><span /><span />
                </div>
              </div>
            )}
            {!typing && options.length > 0 && (
              <div className="chatbot-options">
                {options.map(o => (
                  <button key={o.label} type="button" className="chatbot-option" onClick={() => choose(o)}>{o.label}</button>
                ))}
              </div>
            )}
          </div>

          <form className="chatbot-input" onSubmit={handleSend}>
            <input
              ref={inputRef}
              type={inputType}
              inputMode={inputType === 'tel' ? 'numeric' : undefined}
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={placeholder}
              aria-label="Type your message"
              maxLength={1000}
            />
            <button type="submit" disabled={!input.trim() || typing} aria-label="Send">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.4 20.4 21 12 3.4 3.6l-.01 6.53L15 12 3.39 13.87z" /></svg>
            </button>
          </form>
          <input ref={fileRef} type="file" accept="image/png, image/jpeg, image/jpg, image/webp" onChange={handleFile} hidden />
        </section>
      )}

      {!open && teaser && (
        <div className="chatbot-teaser">
          <button type="button" className="chatbot-teaser-text" onClick={openChat}>👋 Planning a project? Get a free quote here.</button>
          <button type="button" className="chatbot-teaser-close" onClick={dismissTeaser} aria-label="Dismiss">✕</button>
        </div>
      )}

      <button
        type="button"
        className={`chatbot-launcher${open ? ' open' : ''}${!open && teaser ? ' attention' : ''}`}
        onClick={open ? () => setOpen(false) : openChat}
        aria-label={open ? 'Close chat' : 'Chat with us'}
        aria-expanded={open}
      >
        {!open && teaser && <span className="chatbot-badge" aria-hidden="true">1</span>}
        {open
          ? <span aria-hidden="true">✕</span>
          : <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3C6.5 3 2 6.6 2 11c0 2.2 1.1 4.2 2.9 5.6-.2 1.5-.9 2.9-2 3.9 2.1 0 4-.8 5.4-2 1.2.3 2.4.5 3.7.5 5.5 0 10-3.6 10-8s-4.5-8-10-8z" /></svg>}
      </button>
    </div>
  )
}
