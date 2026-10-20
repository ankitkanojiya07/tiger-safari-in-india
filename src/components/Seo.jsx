import { useEffect } from 'react'
import { absUrl, brand, siteUrl } from '../data/site'

function upsertMeta(attr, key, content) {
  if (!content) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function upsertJsonLd(id, data) {
  let el = document.getElementById(id)
  if (!el) {
    el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = id
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

/**
 * Per-page head tags. Runs client-side; build-time prerender injects the same values into HTML.
 */
export default function Seo({
  title,
  description,
  path = '/',
  image = `${siteUrl}/media/sketches/sketch-intro.jpg?v=2`,
  type = 'website',
  jsonLd = [],
}) {
  const url = absUrl(path)
  const fullTitle = title || brand.full

  useEffect(() => {
    document.title = fullTitle
    document.documentElement.lang = 'en-IN'

    upsertMeta('name', 'description', description)
    upsertLink('canonical', url)

    upsertMeta('property', 'og:type', type)
    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:image', image)
    upsertMeta('property', 'og:site_name', brand.full)
    upsertMeta('property', 'og:locale', 'en_IN')

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', fullTitle)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', image)

    jsonLd.forEach((data, i) => upsertJsonLd(`jsonld-${i}`, data))

    return () => {
      jsonLd.forEach((_, i) => document.getElementById(`jsonld-${i}`)?.remove())
    }
  }, [fullTitle, description, url, image, type, jsonLd])

  return null
}

export function breadcrumbLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absUrl(item.path),
    })),
  }
}

export function faqLd(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

export function organizationLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    '@id': `${siteUrl}/#org`,
    name: brand.full,
    url: `${siteUrl}/`,
    logo: `${siteUrl}/logo.png`,
    description:
      'Private tiger safaris across Ranthambore, Jim Corbett, Panna, Satpura and Sariska. Enquiry-led booking; not a government or forest department website.',
    areaServed: 'IN',
    telephone: brand.phone,
    email: brand.email,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: brand.phone,
      contactType: 'customer service',
      availableLanguage: ['English', 'Hindi'],
    },
  }
}

export function websiteLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    name: brand.full,
    url: `${siteUrl}/`,
    publisher: { '@id': `${siteUrl}/#org` },
    inLanguage: 'en-IN',
  }
}
