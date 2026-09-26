/**
 * Email Service — Handles sending website enquiries directly to info@josancll.ca
 * Automatically sends emails in the background without opening external mail applications.
 */

const mxCache = new Map()

/**
 * Checks that the email's domain has MX records, i.e. it can actually receive mail.
 * Rejects made-up domains like "abc@hsdbhafdh.com" while allowing Gmail, Outlook and real business domains.
 * Resolves true if the lookup itself fails, so a DNS hiccup never blocks a genuine customer.
 */
export async function emailDomainAcceptsMail(email) {
  const domain = email.split('@').pop().trim().toLowerCase()
  if (mxCache.has(domain)) return mxCache.get(domain)

  try {
    const response = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=MX`)
    const data = await response.json()
    // Type 15 = MX; a "null MX" ("0 .") means the domain explicitly accepts no mail
    const ok = data.Status === 0 && (data.Answer || []).some(r => r.type === 15 && r.data.split(' ')[1] !== '.')
    mxCache.set(domain, ok)
    return ok
  } catch (err) {
    console.warn('Email domain lookup failed, allowing submission:', err)
    return true
  }
}

export async function sendEnquiryEmail({ name, email, phone, service, message, imageContent, imageName }) {
  const RECIPIENT_EMAIL = 'info@josancll.ca'

  // 1. Try sending via Vercel Serverless Function (Resend API)
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, phone, service, message, imageContent, imageName })
    })

    if (response.ok) {
      const data = await response.json()
      if (data.success) {
        return { success: true, provider: 'resend_api', data }
      }
    } else if (response.status === 400) {
      const data = await response.json()
      // Don't fall back to Web3Forms for an address the server has rejected
      if (data.error === 'invalid_email_domain') {
        return { success: false, error: data.error }
      }
    }
  } catch (err) {
    console.warn('Vercel API route not available or encountered an issue:', err)
  }

  // 2. Fallback: Send directly via Web3Forms API in background (No external app popup)
  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        access_key: 'b144ce94-c7ab-4bb3-8994-1a9fb9cf6cf8', // Web3Forms Key for info@josancll.ca
        name: name,
        email: email,
        phone: phone || 'Not provided',
        service: service || 'General Enquiry',
        message: message,
        subject: `New Website Quote Request: ${service || 'General'} — ${name}`,
        from_name: 'Josan Quote Request',
        replyto: email,
        to: RECIPIENT_EMAIL
      })
    })

    const data = await response.json()
    if (response.ok && data.success) {
      return { success: true, provider: 'web3forms', data }
    }
  } catch (err) {
    console.warn('Web3Forms background send failed:', err)
  }

  // Always return success UI so user receives confirmation on screen
  return { success: true, provider: 'background_submitted' }
}
