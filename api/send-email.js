export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, service, message } = req.body;
  const RESEND_API_KEY = process.env.VITE_RESEND_API_KEY || process.env.RESEND_API_KEY;

  if (!RESEND_API_KEY) {
    return res.status(500).json({ error: 'Resend API key is not configured.' });
  }

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
  `;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'Josan Website <onboarding@resend.dev>', // Keep onboarding@resend.dev or change to your verified domain sender e.g. info@josancll.ca / quotes@josancll.ca
        to: ['info@josancll.ca'],
        reply_to: email,
        subject: `New Quote Request: ${service || 'General Enquiry'} — ${name}`,
        html: htmlContent
      })
    });

    const data = await response.json();
    if (response.ok) {
      return res.status(200).json({ success: true, data });
    } else {
      return res.status(response.status).json({ error: data });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
