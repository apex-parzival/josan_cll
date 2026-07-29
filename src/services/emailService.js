/**
 * Email Service — Handles sending website enquiries to info@josancll.ca
 * Primary Provider: Resend (https://resend.com)
 */

export async function sendEnquiryEmail({ name, email, phone, service, message }) {
  const RECIPIENT_EMAIL = 'info@josancll.ca'
  
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, phone, service, message })
    })

    const data = await response.json()
    if (response.ok && data.success) {
      return { success: true, provider: 'resend_api_route', data }
    } else {
      console.warn('API route returned error, falling back to mailto:', data)
      triggerMailtoFallback({ name, email, phone, service, message, RECIPIENT_EMAIL })
      return { success: true, provider: 'mailto_fallback', error: data }
    }
  } catch (err) {
    console.error('Failed to send email via API route:', err)
    triggerMailtoFallback({ name, email, phone, service, message, RECIPIENT_EMAIL })
    return { success: true, provider: 'mailto_fallback', error: err.message }
  }
}

function triggerMailtoFallback({ name, email, phone, service, message, RECIPIENT_EMAIL }) {
  const mailtoSubject = encodeURIComponent(`New Quote Request: ${service || 'General Enquiry'} - ${name}`)
  const mailtoBody = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nService: ${service || 'General'}\n\nMessage:\n${message}`
  )
  window.open(`mailto:${RECIPIENT_EMAIL}?subject=${mailtoSubject}&body=${mailtoBody}`, '_blank')
}
