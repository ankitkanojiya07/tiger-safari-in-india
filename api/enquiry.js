import nodemailer from 'nodemailer'

const PARK_NAMES = {
  ranthambore: 'Ranthambore',
  'jim-corbett': 'Jim Corbett',
  panna: 'Panna',
  satpura: 'Satpura',
  sariska: 'Sariska',
}

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function parkLabel(slug) {
  return PARK_NAMES[slug] || slug
}

/** Validate + send enquiry email. Returns { ok, error?, status } */
export async function sendEnquiryEmail(body = {}) {
  const { startDate, days, guests, name, email, phone, requests, parks = [], source } = body

  if (!startDate?.trim()) return { ok: false, status: 400, error: 'Please choose a start date.' }
  if (!days?.toString().trim()) return { ok: false, status: 400, error: 'Please enter the number of days.' }
  if (!guests?.toString().trim()) return { ok: false, status: 400, error: 'Please enter the number of guests.' }
  if (!name?.trim()) return { ok: false, status: 400, error: 'Please enter your full name.' }
  if (!/^\S+@\S+\.\S+$/.test(email || '')) {
    return { ok: false, status: 400, error: 'Enter a valid email address.' }
  }
  if (!phone?.trim()) return { ok: false, status: 400, error: 'Please enter your phone number.' }

  const user = process.env.SMTP_USER
  const pass = (process.env.SMTP_PASS || '').replace(/\s+/g, '')
  const to = process.env.MAIL_TO || 'akanojiya550@gmail.com'
  const cc =
    process.env.MAIL_CC || 'ravindra207@gmail.com, tigersafarisinindiaa@gmail.com'

  if (!user || !pass) {
    console.error('Missing SMTP_USER or SMTP_PASS')
    return { ok: false, status: 500, error: 'Email is not configured.' }
  }

  const parkList = Array.isArray(parks) ? parks.map(parkLabel).join(', ') : ''
  const subject = `Safari enquiry — ${name.trim()}${parkList ? ` (${parkList})` : ''}`

  const text = [
    'New tiger safari enquiry',
    '',
    `Name: ${name.trim()}`,
    `Email: ${email.trim()}`,
    `Phone: ${phone.trim()}`,
    `Start date: ${startDate.trim()}`,
    `Days: ${days}`,
    `Guests: ${guests}`,
    `Parks: ${parkList || 'Not specified'}`,
    `Special requests: ${requests?.trim() || '—'}`,
    `Source: ${source || 'website'}`,
  ].join('\n')

  const html = `
    <h2 style="font-family:Georgia,serif;color:#123438">New tiger safari enquiry</h2>
    <table style="font-family:system-ui,sans-serif;font-size:14px;line-height:1.5;border-collapse:collapse">
      <tr><td style="padding:6px 12px 6px 0;color:#666">Name</td><td>${escapeHtml(name.trim())}</td></tr>
      <tr><td style="padding:6px 12px 6px 0;color:#666">Email</td><td>${escapeHtml(email.trim())}</td></tr>
      <tr><td style="padding:6px 12px 6px 0;color:#666">Phone</td><td>${escapeHtml(phone.trim())}</td></tr>
      <tr><td style="padding:6px 12px 6px 0;color:#666">Start date</td><td>${escapeHtml(startDate.trim())}</td></tr>
      <tr><td style="padding:6px 12px 6px 0;color:#666">Days</td><td>${escapeHtml(days)}</td></tr>
      <tr><td style="padding:6px 12px 6px 0;color:#666">Guests</td><td>${escapeHtml(guests)}</td></tr>
      <tr><td style="padding:6px 12px 6px 0;color:#666">Parks</td><td>${escapeHtml(parkList || 'Not specified')}</td></tr>
      <tr><td style="padding:6px 12px 6px 0;color:#666;vertical-align:top">Requests</td><td>${escapeHtml(requests?.trim() || '—')}</td></tr>
      <tr><td style="padding:6px 12px 6px 0;color:#666">Source</td><td>${escapeHtml(source || 'website')}</td></tr>
    </table>
  `

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass },
    })

    await transporter.sendMail({
      from: `"Tiger Safaris in India" <${user}>`,
      to,
      cc,
      replyTo: email.trim(),
      subject,
      text,
      html,
    })

    return { ok: true, status: 200 }
  } catch (err) {
    console.error('Enquiry email failed:', err)
    return { ok: false, status: 500, error: 'Could not send enquiry. Please try again or call us.' }
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(204).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  const result = await sendEnquiryEmail(req.body || {})
  return res.status(result.status).json({ ok: result.ok, error: result.error })
}
