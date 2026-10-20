/**
 * GA4 event helpers (plan §9). Safe no-ops until gtag is installed.
 * Events: enquiry_start, enquiry_submit, whatsapp_click, phone_click
 */
export function track(event, params = {}) {
  if (typeof window === 'undefined') return
  const payload = { ...params, send_to: undefined }
  if (typeof window.gtag === 'function') {
    window.gtag('event', event, payload)
    return
  }
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event, ...payload })
  }
}

export function trackEnquiryStart(park, pageType) {
  track('enquiry_start', { park: park || 'none', page_type: pageType || 'unknown' })
}

export function trackEnquirySubmit(park, pageType) {
  track('enquiry_submit', { park: park || 'none', page_type: pageType || 'unknown' })
}

export function trackWhatsApp(park, pageType) {
  track('whatsapp_click', { park: park || 'none', page_type: pageType || 'unknown' })
}

export function trackPhone(park, pageType) {
  track('phone_click', { park: park || 'none', page_type: pageType || 'unknown' })
}
