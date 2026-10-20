/**
 * POST enquiry payload to the Vercel /api/enquiry Nodemailer endpoint.
 * @returns {{ ok: true } | { ok: false, error: string }}
 */
export async function submitEnquiry(payload) {
  try {
    const res = await fetch('/api/enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok || !data.ok) {
      return { ok: false, error: data.error || 'Could not send enquiry. Please try again.' }
    }
    return { ok: true }
  } catch {
    return { ok: false, error: 'Could not send enquiry. Check your connection and try again.' }
  }
}
