/**
 * Placeholder image utilities for design-only mode
 * Using high-quality Unsplash images for Auburn, California
 */

export type PlaceholderKey = 'hero' | 'stay' | 'things-to-do' | 'dining' | 'discover'

// Curated Unsplash images for Auburn, California destination marketing
const unsplashImages: Record<PlaceholderKey, string> = {
  // Hero: Golden California foothills - rolling oak-studded hills characteristic of Placer County/Auburn
  'hero': 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&q=80',
  
  // Stay: Cozy modern hotel/cabin interior
  'stay': 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&q=80',
  
  // Things to Do: Hiking trail in pine forest
  'things-to-do': 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&q=80',
  
  // Dining: Upscale dining with wine
  'dining': 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80',
  
  // Discover: Historic Gold Rush era building/scene
  'discover': 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=1200&q=80',
}

export function getPlaceholderImage(key: PlaceholderKey): string {
  return unsplashImages[key]
}

// Activity-specific images for more variety
export const activityImages = {
  'lake-clementine-trail': 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1200&q=80', // Mountain lake
  'hidden-falls-regional-park': 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=1200&q=80', // Waterfall
  'overlook-park': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80', // Mountain vista
  'railhead-park': 'https://images.unsplash.com/photo-1537655780520-1e392ead81f2?w=1200&q=80', // Community park
  'ashford-park': 'https://images.unsplash.com/photo-1562841791-9a0cc2be5464?w=1200&q=80', // Family park
  'black-hole-of-calcutta-falls-quarry-road-trail': 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1200&q=80', // Swimming hole
  'auburn-swim-hole-american-river': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80', // River
  'gold-rush-museum': 'https://images.unsplash.com/photo-1566127444979-b2f1f4b1e18b?w=1200&q=80', // Museum interior
  'placer-county-museum': 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=1200&q=80', // Historic artifacts
  'bernhard-museum': 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=1200&q=80', // Historic building
  'old-town-auburn': 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80', // Historic downtown
  'auburn-clock-tower': 'https://images.unsplash.com/photo-1533134486753-c833f0ed4866?w=1200&q=80', // Clock tower
  'foresthill-bridge': 'https://images.unsplash.com/photo-1470158499416-75be5168c2f3?w=1200&q=80', // Bridge
}

// Accommodation images - using local Auburn images
export const accommodationImages = {
  'historic-auburn-hotel': '/images/auburn/weddings/historic-venue.webp', // Historic hotel building
  'gold-country-inn': '/images/auburn/weddings/reception-hall.webp', // Modern motel interior
}

// Dining images - using local Auburn images
export const diningImages = {
  'mt-vernon-winery': '/images/auburn/dining/wine-tasting.webp', // Winery tasting room
  'auburn-old-town-farmers-market': '/images/auburn/dining/farmers-market.webp', // Farmers market
  'auburn-farmers-market': '/images/auburn/dining/farmers-market.webp', // Farmers market (alternative name)
  'out-of-order-arcade': '/images/auburn/dining/cafe-ambiance.webp', // Arcade/entertainment venue
  'wine-walk': '/images/auburn/dining/wine-tasting.webp', // Wine event
  'live-music': '/images/auburn/dining/brewery-taproom.webp', // Entertainment venue
}

// Event images
export const eventImages = {
  'auburn-farmers-market-weekly': 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1200&q=80', // Farmers market
  'gold-rush-days': 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200&q=80', // Festival
}

/**
 * Get image URL from various image source formats
 * Supports: mockUrl, asset.url, direct string, or fallback to placeholder
 * Prioritizes local images over Unsplash URLs
 */
export function getImageUrl(source: any, fallbackKey: PlaceholderKey = 'hero'): string {
  if (!source) {
    return getPlaceholderImage(fallbackKey)
  }
  
  // Direct string URL - check if it's a local path
  if (typeof source === 'string') {
    // If it starts with /, it's a local path - use it directly
    if (source.startsWith('/')) {
      return source
    }
    // Otherwise it's an external URL (Unsplash, etc)
    return source
  }
  
  // Mock image with mockUrl
  if (source.mockUrl) {
    // Prefer local paths over Unsplash URLs
    if (source.mockUrl.startsWith('/')) {
      return source.mockUrl
    }
    return source.mockUrl
  }
  
  // Image with asset.url (from mock content)
  if (source.asset?.url) {
    // Prefer local paths over Unsplash URLs
    if (source.asset.url.startsWith('/')) {
      return source.asset.url
    }
    return source.asset.url
  }
  
  // Fallback to placeholder
  return getPlaceholderImage(fallbackKey)
}

