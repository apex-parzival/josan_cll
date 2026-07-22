/**
 * Email Service — Handles sending website enquiries to info@josancll.ca
 * Primary Provider: Resend (https://resend.com)
 */

export async function sendEnquiryEmail({ name, email, phone, service, message }) {
  const RESEND_API_KEY = import.meta.env.VITE_RESEND_API_KEY
  const RECIPIENT_EMAIL = 'info@josancll.ca'
  
  // Format HTML Email Body for Resend
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #1a1a1a; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px;">
      <h2 style="color: #1b4332; border-bottom: 2px solid #2d6a4f; padding-bottom: 10px;">
        🏗️ New Website Quote Request
      </h2>
      <p>A new enquiry has been submitted on <strong>josancll.ca</strong>:</p>
      
      <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <tr>
          <td style="padding: 10px; font-weight: bold; width: 120px; background: #f8f9fa;">Name:</td>
          <td style="padding: 10px; background: #ffffff;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold; background: #f8f9fa;">Email:</td>
          <td style="padding: 10px; background: #ffffff;"><a href="mailto:${email}">${email}</a></td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold; background: #f8f9fa;">Phone:</td>
          <td style="padding: 10px; background: #ffffff;">${phone || 'Not provided'}</td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold; background: #f8f9fa;">Service:</td>
          <td style="padding: 10px; background: #ffffff;">${service || 'General Enquiry'}</td>
        </tr>
      </table>

      <div style="margin-top: 20px; padding: 15px; background: #f4f6f4; border-left: 4px solid #2d6a4f; border-radius: 4px;">
        <strong style="display: block; margin-bottom: 5px; color: #1b4332;">Message Details:</strong>
        <p style="margin: 0; white-space: pre-wrap; line-height: 1.6;">${message}</p>
      </div>

      <p style="margin-top: 25px; font-size: 0.85em; color: #666; border-top: 1px solid #eee; padding-top: 10px;">
        Sent automatically from <a href="https://josancll.ca">Josan Construction Web Portal</a>
      </p>
    </div>
  `

  // 1. If Resend API Key is set in .env (VITE_RESEND_API_KEY), call Resend REST API
  if (RESEND_API_KEY) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${RESEND_API_KEY}`
        },
        body: JSON.stringify({
          from: 'Josan Construction Website <onboarding@resend.dev>', // Replace with your domain e.g. quotes@josancll.ca after domain verification
          to: [RECIPIENT_EMAIL],
          reply_to: email,
          subject: `New Quote Request: ${service || 'General Enquiry'} — ${name}`,
          html: htmlContent
        })
      })

      const data = await response.json()
      if (response.ok) {
        return { success: true, provider: 'resend', data }
      } else {
        console.warn('Resend API returned error:', data)
        // Fallback to mailto if API returned error
        triggerMailtoFallback({ name, email, phone, service, message, RECIPIENT_EMAIL })
        return { success: true, provider: 'mailto_fallback', error: data }
      }
    } catch (err) {
      console.error('Failed to send email via Resend API:', err)
      triggerMailtoFallback({ name, email, phone, service, message, RECIPIENT_EMAIL })
      return { success: true, provider: 'mailto_fallback', error: err.message }
    }
  }

  // 2. If no Resend API key is provided yet, trigger mailto fallback or web contact link
  triggerMailtoFallback({ name, email, phone, service, message, RECIPIENT_EMAIL })
  return { success: true, provider: 'mailto' }
}

function triggerMailtoFallback({ name, email, phone, service, message, RECIPIENT_EMAIL }) {
  const mailtoSubject = encodeURIComponent(`New Quote Request: ${service || 'General Enquiry'} - ${name}`)
  const mailtoBody = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nService: ${service || 'General'}\n\nMessage:\n${message}`
  )
  window.open(`mailto:${RECIPIENT_EMAIL}?subject=${mailtoSubject}&body=${mailtoBody}`, '_blank')
}
