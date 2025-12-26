/**
 * Image utilities for static content
 * This replaces Sanity's urlFor function for a static site
 */

import { getImageUrl, getPlaceholderImage } from './images'

// Re-export for backwards compatibility with existing code
export { getImageUrl, getPlaceholderImage }

/**
 * urlFor - backwards compatible image URL builder
 * Mimics Sanity's urlFor API for easy migration
 */
export function urlFor(source: any) {
  const url = getImageUrl(source)
  
  return {
    width: (w: number) => ({
      height: (h: number) => ({ url: () => url }),
      url: () => url,
    }),
    height: (h: number) => ({ url: () => url }),
    url: () => url,
  }
}

// No Sanity client - this is a static site
export const client = null
export const isSanityConfigured = false

export default client
