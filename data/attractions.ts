/**
 * Auburn Attractions Data
 * 
 * Central registry of Auburn, CA attractions for use across the site.
 * Each attraction links to internal pages (not external URLs).
 */

export type AttractionType = 
  | 'trail'
  | 'park'
  | 'museum'
  | 'historic-site'
  | 'winery'
  | 'restaurant'
  | 'brewery'
  | 'market'
  | 'viewpoint'
  | 'water-activity'
  | 'cultural'
  | 'shopping'
  | 'family'

export type LocationArea = 
  | 'old-town'
  | 'downtown'
  | 'auburn-sra'
  | 'foresthill'
  | 'north-auburn'
  | 'placer-county'
  | 'foothills'

export interface Attraction {
  id: string
  name: string
  type: AttractionType
  shortDescription: string
  longDescription?: string
  locationArea: LocationArea
  address?: string
  relatedPages: string[]
  imageId: string
  highlights?: string[]
  bestFor?: string[]
  duration?: string
  difficulty?: 'easy' | 'moderate' | 'challenging'
  featured?: boolean
  seasonal?: boolean
  familyFriendly?: boolean
  petFriendly?: boolean
}

export const attractions: Attraction[] = [
  // ============================================
  // OUTDOOR ADVENTURES
  // ============================================
  {
    id: 'lake-clementine-trail',
    name: 'Lake Clementine Trail',
    type: 'trail',
    shortDescription: 'Auburn\'s signature canyon hike with stunning North Fork American River views and swimming holes.',
    longDescription: 'This 8-mile round-trip trail follows the North Fork American River through dramatic canyon scenery. Popular with hikers, trail runners, and swimmers seeking refreshing river access.',
    locationArea: 'auburn-sra',
    relatedPages: ['/things-to-do/outdoor-adventures', '/itineraries/outdoor-adventure-day', '/itineraries/weekend-in-auburn'],
    imageId: 'outdoor-lake-clementine',
    highlights: ['River swimming holes', 'Canyon views', 'Wildflowers in spring'],
    bestFor: ['Hikers', 'Trail runners', 'Swimmers'],
    duration: '3-4 hours',
    difficulty: 'moderate',
    featured: true,
    familyFriendly: true,
    petFriendly: true,
  },
  {
    id: 'hidden-falls',
    name: 'Hidden Falls Regional Park',
    type: 'park',
    shortDescription: 'Year-round waterfall destination with 30+ miles of trails through oak woodlands and canyons.',
    locationArea: 'auburn-sra',
    relatedPages: ['/things-to-do/outdoor-adventures', '/itineraries/family-day'],
    imageId: 'outdoor-hidden-falls',
    highlights: ['Waterfalls', 'Wildlife viewing', 'Multiple trail loops'],
    bestFor: ['Families', 'Hikers', 'Nature lovers'],
    duration: '2-4 hours',
    difficulty: 'easy',
    featured: true,
    familyFriendly: true,
    petFriendly: true,
  },
  {
    id: 'confluence-trails',
    name: 'Auburn Confluence Trails',
    type: 'trail',
    shortDescription: 'Where the North and Middle Forks of the American River meet—epic views and swimming.',
    locationArea: 'auburn-sra',
    relatedPages: ['/things-to-do/outdoor-adventures', '/itineraries/outdoor-adventure-day'],
    imageId: 'outdoor-confluence-trails',
    highlights: ['River confluence', 'Swimming', 'Dramatic canyon'],
    bestFor: ['Adventurers', 'Swimmers', 'Photographers'],
    duration: '2-5 hours',
    difficulty: 'moderate',
    featured: true,
    familyFriendly: false,
    petFriendly: true,
  },
  {
    id: 'foresthill-bridge',
    name: 'Foresthill Bridge',
    type: 'viewpoint',
    shortDescription: 'California\'s highest bridge at 730 feet—stunning canyon overlook and photo opportunity.',
    locationArea: 'foresthill',
    relatedPages: ['/things-to-do/outdoor-adventures', '/itineraries/weekend-in-auburn'],
    imageId: 'outdoor-foresthill-bridge',
    highlights: ['Panoramic views', 'Photo spot', 'Engineering marvel'],
    bestFor: ['Photographers', 'Sightseers', 'Road trippers'],
    duration: '30 minutes',
    difficulty: 'easy',
    featured: true,
    familyFriendly: true,
    petFriendly: true,
  },
  {
    id: 'quarry-ponds',
    name: 'Quarry Road Ponds Trail',
    type: 'trail',
    shortDescription: 'Easy 3-mile loop perfect for families, birdwatchers, and casual walkers.',
    locationArea: 'auburn-sra',
    relatedPages: ['/things-to-do/outdoor-adventures', '/itineraries/family-day'],
    imageId: 'outdoor-quarry-ponds',
    highlights: ['Bird watching', 'Easy terrain', 'Scenic ponds'],
    bestFor: ['Families', 'Beginners', 'Birdwatchers'],
    duration: '1-2 hours',
    difficulty: 'easy',
    familyFriendly: true,
    petFriendly: true,
  },
  {
    id: 'training-hill',
    name: 'Training Hill',
    type: 'trail',
    shortDescription: 'Legendary 1-mile climb used by Western States ultrarunners—Auburn\'s ultimate fitness challenge.',
    locationArea: 'auburn-sra',
    relatedPages: ['/things-to-do/outdoor-adventures', '/itineraries/outdoor-adventure-day'],
    imageId: 'outdoor-training-hill',
    highlights: ['700ft elevation gain', 'Runner\'s benchmark', 'Canyon views'],
    bestFor: ['Trail runners', 'Fitness enthusiasts', 'Ultrarunners'],
    duration: '1-2 hours',
    difficulty: 'challenging',
    familyFriendly: false,
    petFriendly: true,
  },
  {
    id: 'american-river-rafting',
    name: 'American River Rafting',
    type: 'water-activity',
    shortDescription: 'World-class whitewater from mellow floats to Class IV rapids on the American River.',
    locationArea: 'auburn-sra',
    relatedPages: ['/things-to-do/outdoor-adventures', '/itineraries/outdoor-adventure-day'],
    imageId: 'outdoor-river-rafting',
    highlights: ['Class II-IV rapids', 'Guided trips', 'Scenic canyon'],
    bestFor: ['Thrill seekers', 'Families', 'Groups'],
    duration: 'Half to full day',
    difficulty: 'moderate',
    seasonal: true,
    familyFriendly: true,
    petFriendly: false,
  },

  // ============================================
  // HISTORY & CULTURE
  // ============================================
  {
    id: 'gold-country-museum',
    name: 'Gold Country Museum',
    type: 'museum',
    shortDescription: 'Interactive Gold Rush exhibits, mine replica walkthrough, and hands-on gold panning.',
    locationArea: 'placer-county',
    relatedPages: ['/things-to-do/history-culture/gold-country-museum', '/itineraries/family-day', '/itineraries/history-and-wine'],
    imageId: 'historic-gold-country-museum',
    highlights: ['Gold panning', 'Mine replica', 'Interactive exhibits'],
    bestFor: ['Families', 'History buffs', 'Kids'],
    duration: '1-2 hours',
    difficulty: 'easy',
    featured: true,
    familyFriendly: true,
    petFriendly: false,
  },
  {
    id: 'old-town-auburn',
    name: 'Old Town Auburn Historic District',
    type: 'historic-site',
    shortDescription: 'Walk through California\'s oldest continually operating post office town with 1850s buildings.',
    locationArea: 'old-town',
    relatedPages: ['/things-to-do/history-culture/old-town-auburn', '/itineraries/weekend-in-auburn', '/itineraries/romantic-getaway'],
    imageId: 'historic-old-town-street',
    highlights: ['Historic architecture', 'Antique shops', 'Restaurants'],
    bestFor: ['History lovers', 'Photographers', 'Shoppers'],
    duration: '2-3 hours',
    difficulty: 'easy',
    featured: true,
    familyFriendly: true,
    petFriendly: true,
  },
  {
    id: 'placer-county-courthouse',
    name: 'Placer County Courthouse',
    type: 'historic-site',
    shortDescription: 'Stunning 1898 Classical Revival courthouse—one of California\'s most photographed buildings.',
    locationArea: 'downtown',
    relatedPages: ['/things-to-do/history-culture/placer-county-courthouse', '/itineraries/history-and-wine'],
    imageId: 'historic-courthouse',
    highlights: ['Classical architecture', 'Photo spot', 'Historic landmark'],
    bestFor: ['Architecture fans', 'Photographers', 'History buffs'],
    duration: '30 minutes',
    difficulty: 'easy',
    familyFriendly: true,
    petFriendly: true,
  },
  {
    id: 'bernhard-museum',
    name: 'Bernhard Museum Complex',
    type: 'museum',
    shortDescription: 'Victorian-era winery and residence showcasing 1800s California family life.',
    locationArea: 'downtown',
    relatedPages: ['/things-to-do/history-culture/bernhard-museum', '/itineraries/history-and-wine'],
    imageId: 'historic-bernhard-museum',
    highlights: ['Victorian gardens', 'Wine history', 'Period furnishings'],
    bestFor: ['History enthusiasts', 'Wine lovers', 'Photographers'],
    duration: '1-2 hours',
    difficulty: 'easy',
    familyFriendly: true,
    petFriendly: false,
  },
  {
    id: 'firehouse-tower',
    name: 'Auburn Firehouse Tower',
    type: 'historic-site',
    shortDescription: 'Auburn\'s iconic 1891 landmark—the most photographed building in Gold Country.',
    locationArea: 'old-town',
    relatedPages: ['/things-to-do/history-culture/old-town-firehouse', '/itineraries/weekend-in-auburn'],
    imageId: 'historic-old-town-clocktower',
    highlights: ['Iconic landmark', 'Photo spot', 'Historic firefighting'],
    bestFor: ['Photographers', 'History lovers', 'First-time visitors'],
    duration: '15 minutes',
    difficulty: 'easy',
    featured: true,
    familyFriendly: true,
    petFriendly: true,
  },
  {
    id: 'chinese-joss-house',
    name: 'Chinese Joss House',
    type: 'historic-site',
    shortDescription: 'Rare surviving temple honoring Auburn\'s Chinese mining community heritage.',
    locationArea: 'old-town',
    relatedPages: ['/things-to-do/history-culture/chinese-joss-house'],
    imageId: 'historic-chinese-joss-house',
    highlights: ['Chinese heritage', 'Religious history', 'Mining community'],
    bestFor: ['History enthusiasts', 'Cultural explorers'],
    duration: '30 minutes',
    difficulty: 'easy',
    familyFriendly: true,
    petFriendly: false,
  },

  // ============================================
  // FOOD & DRINK
  // ============================================
  {
    id: 'auburn-alehouse',
    name: 'Auburn Alehouse',
    type: 'brewery',
    shortDescription: 'Award-winning craft brewery in a historic Gold Rush building with elevated pub fare.',
    locationArea: 'old-town',
    relatedPages: ['/dining', '/itineraries/weekend-in-auburn'],
    imageId: 'dining-auburn-alehouse',
    highlights: ['Craft beer', 'Historic building', 'Local favorite'],
    bestFor: ['Beer lovers', 'Foodies', 'Groups'],
    duration: '1-2 hours',
    difficulty: 'easy',
    familyFriendly: true,
    petFriendly: false,
  },
  {
    id: 'bootleggers-old-town',
    name: 'Bootleggers Old Town Tavern',
    type: 'restaurant',
    shortDescription: 'Speakeasy-inspired gastropub with craft cocktails and elevated American cuisine.',
    locationArea: 'old-town',
    relatedPages: ['/dining', '/itineraries/romantic-getaway'],
    imageId: 'dining-bootleggers',
    highlights: ['Craft cocktails', 'Historic atmosphere', 'Upscale dining'],
    bestFor: ['Date nights', 'Cocktail enthusiasts', 'Foodies'],
    duration: '1.5-2 hours',
    difficulty: 'easy',
    familyFriendly: false,
    petFriendly: false,
  },
  {
    id: 'auburn-farmers-market',
    name: 'Auburn Farmers Market',
    type: 'market',
    shortDescription: 'Saturday morning tradition with local produce, artisan goods, and live music.',
    locationArea: 'old-town',
    relatedPages: ['/dining', '/events', '/itineraries/family-day'],
    imageId: 'dining-farmers-market',
    highlights: ['Local produce', 'Artisan vendors', 'Community vibe'],
    bestFor: ['Foodies', 'Families', 'Locals'],
    duration: '1-2 hours',
    difficulty: 'easy',
    seasonal: true,
    familyFriendly: true,
    petFriendly: true,
  },
  {
    id: 'sierra-foothills-wineries',
    name: 'Sierra Foothills Wine Trail',
    type: 'winery',
    shortDescription: 'California\'s original wine region—boutique tasting rooms with Old Vine Zinfandel.',
    locationArea: 'foothills',
    relatedPages: ['/dining', '/itineraries/history-and-wine', '/itineraries/romantic-getaway'],
    imageId: 'wine-foothill-vineyard',
    highlights: ['Old Vine Zinfandel', 'Barbera', 'Vineyard views'],
    bestFor: ['Wine lovers', 'Couples', 'Day trippers'],
    duration: '3-5 hours',
    difficulty: 'easy',
    featured: true,
    familyFriendly: false,
    petFriendly: false,
  },
  {
    id: 'knee-deep-brewing',
    name: 'Knee Deep Brewing',
    type: 'brewery',
    shortDescription: 'Beloved local brewery known for IPAs and creative seasonal releases.',
    locationArea: 'north-auburn',
    relatedPages: ['/dining', '/itineraries/weekend-in-auburn'],
    imageId: 'dining-knee-deep',
    highlights: ['IPA specialists', 'Taproom', 'Local favorite'],
    bestFor: ['Beer enthusiasts', 'Groups', 'Locals'],
    duration: '1-2 hours',
    difficulty: 'easy',
    familyFriendly: true,
    petFriendly: true,
  },
  {
    id: 'latitudes-restaurant',
    name: 'Latitudes Restaurant',
    type: 'restaurant',
    shortDescription: 'Fine dining with farm-to-table California cuisine and Sierra Foothills wine pairings.',
    locationArea: 'old-town',
    relatedPages: ['/dining', '/itineraries/romantic-getaway', '/itineraries/history-and-wine'],
    imageId: 'dining-farm-table',
    highlights: ['Farm-to-table', 'Wine pairings', 'Special occasions'],
    bestFor: ['Couples', 'Foodies', 'Celebrations'],
    duration: '2-3 hours',
    difficulty: 'easy',
    familyFriendly: false,
    petFriendly: false,
  },

  // ============================================
  // ARTS & CULTURE
  // ============================================
  {
    id: 'old-town-galleries',
    name: 'Old Town Art Galleries',
    type: 'cultural',
    shortDescription: 'Collection of artist-owned galleries featuring local and regional fine art.',
    locationArea: 'old-town',
    relatedPages: ['/things-to-do/arts-culture', '/itineraries/weekend-in-auburn'],
    imageId: 'arts-old-town-gallery',
    highlights: ['Local artists', 'Fine art', 'Monthly art walks'],
    bestFor: ['Art lovers', 'Collectors', 'Browsers'],
    duration: '1-2 hours',
    difficulty: 'easy',
    familyFriendly: true,
    petFriendly: false,
  },
  {
    id: 'auburn-state-theatre',
    name: 'Auburn State Theatre',
    type: 'cultural',
    shortDescription: 'Historic 1930 art deco theatre hosting live performances, concerts, and film screenings.',
    locationArea: 'old-town',
    relatedPages: ['/things-to-do/arts-culture', '/events'],
    imageId: 'arts-state-theatre',
    highlights: ['Live performances', 'Art deco architecture', 'Community events'],
    bestFor: ['Music lovers', 'Theatre fans', 'Date nights'],
    duration: '2-3 hours',
    difficulty: 'easy',
    familyFriendly: true,
    petFriendly: false,
  },
  {
    id: 'placer-county-fair',
    name: 'Placer County Fair',
    type: 'cultural',
    shortDescription: 'Annual summer celebration with rides, livestock, local exhibits, and live entertainment.',
    locationArea: 'placer-county',
    relatedPages: ['/events', '/itineraries/family-day'],
    imageId: 'events-county-fair',
    highlights: ['Carnival rides', 'Livestock shows', 'Live music'],
    bestFor: ['Families', 'Kids', 'Community'],
    duration: '4-6 hours',
    difficulty: 'easy',
    seasonal: true,
    familyFriendly: true,
    petFriendly: false,
  },

  // ============================================
  // SHOPPING & ENTERTAINMENT
  // ============================================
  {
    id: 'old-town-antiques',
    name: 'Old Town Antique Shops',
    type: 'shopping',
    shortDescription: 'Treasure hunting through multi-dealer antique stores in historic Gold Rush buildings.',
    locationArea: 'old-town',
    relatedPages: ['/things-to-do/arts-culture', '/itineraries/weekend-in-auburn'],
    imageId: 'shopping-antiques',
    highlights: ['Vintage finds', 'Historic buildings', 'Local vendors'],
    bestFor: ['Collectors', 'Decorators', 'Browsers'],
    duration: '1-3 hours',
    difficulty: 'easy',
    familyFriendly: true,
    petFriendly: false,
  },
]

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get attractions by type
 */
export function getAttractionsByType(type: AttractionType): Attraction[] {
  return attractions.filter(a => a.type === type)
}

/**
 * Get attractions by location area
 */
export function getAttractionsByLocation(area: LocationArea): Attraction[] {
  return attractions.filter(a => a.locationArea === area)
}

/**
 * Get featured attractions
 */
export function getFeaturedAttractions(limit?: number): Attraction[] {
  const featured = attractions.filter(a => a.featured)
  return limit ? featured.slice(0, limit) : featured
}

/**
 * Get family-friendly attractions
 */
export function getFamilyFriendlyAttractions(): Attraction[] {
  return attractions.filter(a => a.familyFriendly)
}

/**
 * Get attractions for a specific page
 */
export function getAttractionsForPage(pagePath: string): Attraction[] {
  return attractions.filter(a => a.relatedPages.includes(pagePath))
}

/**
 * Get attractions by difficulty
 */
export function getAttractionsByDifficulty(difficulty: 'easy' | 'moderate' | 'challenging'): Attraction[] {
  return attractions.filter(a => a.difficulty === difficulty)
}

/**
 * Get outdoor attractions
 */
export function getOutdoorAttractions(): Attraction[] {
  return attractions.filter(a => 
    ['trail', 'park', 'viewpoint', 'water-activity'].includes(a.type)
  )
}

/**
 * Get history/culture attractions
 */
export function getHistoryCultureAttractions(): Attraction[] {
  return attractions.filter(a => 
    ['museum', 'historic-site', 'cultural'].includes(a.type)
  )
}

/**
 * Get food & drink attractions
 */
export function getFoodDrinkAttractions(): Attraction[] {
  return attractions.filter(a => 
    ['restaurant', 'brewery', 'winery', 'market'].includes(a.type)
  )
}

/**
 * Get a single attraction by ID
 */
export function getAttractionById(id: string): Attraction | undefined {
  return attractions.find(a => a.id === id)
}

/**
 * Type-to-label mapping for display
 */
export const attractionTypeLabels: Record<AttractionType, string> = {
  'trail': 'Trail',
  'park': 'Park',
  'museum': 'Museum',
  'historic-site': 'Historic Site',
  'winery': 'Winery',
  'restaurant': 'Restaurant',
  'brewery': 'Brewery',
  'market': 'Market',
  'viewpoint': 'Viewpoint',
  'water-activity': 'Water Activity',
  'cultural': 'Arts & Culture',
  'shopping': 'Shopping',
  'family': 'Family Fun',
}

/**
 * Location area labels for display
 */
export const locationAreaLabels: Record<LocationArea, string> = {
  'old-town': 'Old Town Auburn',
  'downtown': 'Downtown',
  'auburn-sra': 'Auburn State Recreation Area',
  'foresthill': 'Foresthill',
  'north-auburn': 'North Auburn',
  'placer-county': 'Placer County',
  'foothills': 'Sierra Foothills',
}

