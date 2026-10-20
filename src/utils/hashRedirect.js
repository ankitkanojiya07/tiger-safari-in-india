import { hashRedirects } from '../data/config'

/** Keep old `/#/parks/...` links working; send them to the new path URLs. */
export function applyHashRedirect() {
  if (typeof window === 'undefined') return
  const target = hashRedirects[window.location.hash]
  if (target) window.location.replace(target)
}
