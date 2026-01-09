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

/**
 * Image deduplication utilities
 * Ensures unique images within the same page grid/list
 */

interface ItemWithImage {
  id?: string | number
  imageId?: string
  image?: string
  imageSrc?: string
  [key: string]: any
}

/**
 * Category fallback images for venues, dining, etc.
 * Used when item doesn't have a specific image
 */
export const categoryFallbackImages: Record<string, string> = {
  // Venue categories
  'banquet-hall': 'https://images.unsplash.com/photo-1519167758481-83f19106ab41?w=1200&q=80',
  'historic-estate': 'https://images.unsplash.com/photo-1508873699372-f91e59a9a9b5?w=1200&q=80',
  'golf-course': 'https://images.unsplash.com/photo-1587280591960-e3fda66ea385?w=1200&q=80',
  'garden': 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1200&q=80',
  'outdoor-park': 'https://images.unsplash.com/photo-1511497584788-876760111969?w=1200&q=80',
  'winery': 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1200&q=80',
  'brewery': 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=1200&q=80',
  
  // Restaurant categories
  'restaurant': 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80',
  'cafe': 'https://images.unsplash.com/photo-1450521dd9f369cea-6380facbc417649cd4dc89542?w=1200&q=80',
  'market': 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1200&q=80',
  
  // Activity categories
  'hiking': 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&q=80',
  'water': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
  'history': 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=1200&q=80',
}

/**
 * Global fallback image (used when nothing else matches)
 */
export const globalFallbackImage = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80'

/**
 * Get image for an item, ensuring it's not in the used set (for deduplication)
 * Returns fallback images in order of priority:
 * 1. Item's own image (if not already used)
 * 2. Category fallback image
 * 3. Global fallback image
 */
export function getUniqueImageForItem(
  item: ItemWithImage,
  usedImages: Set<string> = new Set(),
  categoryKey?: string
): string {
  // Try item's own image first
  const itemImage = item.imageSrc || item.image || item.imageId
  if (itemImage && typeof itemImage === 'string' && !usedImages.has(itemImage)) {
    return itemImage
  }

  // Try category fallback
  if (categoryKey && categoryFallbackImages[categoryKey]) {
    const categoryImage = categoryFallbackImages[categoryKey]
    if (!usedImages.has(categoryImage)) {
      return categoryImage
    }
  }

  // Fall back to global
  return globalFallbackImage
}

/**
 * Deduplicate images in a list of items
 * Returns items with unique images, prioritizing original images then fallbacks
 */
export function deduplicateImages<T extends ItemWithImage>(
  items: T[],
  categoryKey?: string
): T[] {
  const usedImages = new Set<string>()
  
  return items.map((item) => {
    const uniqueImage = getUniqueImageForItem(item, usedImages, categoryKey)
    usedImages.add(uniqueImage)
    
    return {
      ...item,
      image: uniqueImage,
    }
  })
}

