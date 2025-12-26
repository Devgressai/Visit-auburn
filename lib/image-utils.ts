/**
 * Image utilities for static site
 * Handles image URL generation from static data
 */

import type { Image } from '@/types'
import { getPlaceholderImage, type PlaceholderKey } from './images'

/**
 * Get image URL from Image object
 * Supports both mockUrl (Unsplash) and local images
 */
export function getImageUrl(image: Image | undefined | null): string {
  if (!image) {
    return getPlaceholderImage('hero')
  }

  // If the image has a mockUrl (Unsplash), use it
  if ('mockUrl' in image && image.mockUrl) {
    return image.mockUrl
  }

  // If the asset has a URL, use it
  if (image.asset && 'url' in image.asset && image.asset.url) {
    return image.asset.url
  }

  // Fallback to placeholder
  return getPlaceholderImage('hero')
}

/**
 * URL builder API that mimics Sanity's urlFor() but for static images
 * This maintains API compatibility with the old Sanity code
 */
export function urlFor(source: any) {
  const url = getImageUrl(source)
  
  return {
    width: (w: number) => ({
      height: (h: number) => ({
        url: () => url,
      }),
      url: () => url,
    }),
    height: (h: number) => ({
      url: () => url,
    }),
    url: () => url,
  }
}

// No longer needed - always true for static site
export const isSanityConfigured = true
export const client = null

