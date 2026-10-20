export const siteUrl = 'https://tigersafarisinindia.com'

export const brand = {
  name: 'Tiger Safaris in India',
  full: 'Tiger Safaris in India',
  wordmark: ['TIGER SAFARIS', 'IN INDIA'],
  hashtag: 'TigerSafarisInIndia',
  domain: 'tigersafarisinindia.com',
  tagline: "India's great tiger forests, travelled slowly",
  email: 'tigersafarisinindiaa@gmail.com',
  phone: '+91 9315297507',
  whatsapp: '919315297507',
}

/** Old hash routes → locked path URLs */
export const hashRedirects = {
  '#/parks/ranthambhore': '/ranthambore/',
  '#/parks/corbett': '/jim-corbett/',
  '#/parks/panna': '/panna/',
  '#/parks/satpura': '/satpura/',
  '#/parks/sariska': '/sariska/',
}

export const absUrl = (path = '/') => {
  const p = path.startsWith('/') ? path : `/${path}`
  const withSlash = p === '/' ? '/' : p.endsWith('/') ? p : `${p}/`
  return `${siteUrl}${withSlash}`
}
