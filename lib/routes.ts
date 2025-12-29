/**
 * ROUTE MAP - Single Source of Truth for Site Structure
 * Defines every page, breadcrumbs, parent sections, and related pages
 */

export interface RouteMetadata {
  path: string
  breadcrumbLabel: string
  parentSection?: string
  relatedPages: string[] // Array of route paths (min 5)
  photoRequired: boolean
  blurb: string // Short Auburn-specific description (1 sentence)
}

export const ROUTE_MAP: Record<string, RouteMetadata> = {
  // ============================================
  // HOME
  // ============================================
  '/': {
    path: '/',
    breadcrumbLabel: 'Home',
    relatedPages: [
      '/things-to-do',
      '/accommodations',
      '/dining',
      '/events',
      '/discover',
      '/plan/visitor-information',
    ],
    photoRequired: true,
    blurb: 'Your gateway to California\'s Gold Country, where history and adventure meet in the Sierra Nevada foothills.',
  },

  // ============================================
  // ACCOMMODATIONS
  // ============================================
  '/accommodations': {
    path: '/accommodations',
    breadcrumbLabel: 'Accommodations',
    relatedPages: [
      '/',
      '/things-to-do',
      '/dining',
      '/plan/visitor-information',
      '/special-offers',
      '/events',
    ],
    photoRequired: true,
    blurb: 'Discover comfortable lodging from historic hotels to cozy cabins in Auburn\'s charming Gold Country setting.',
  },

  // ============================================
  // ACTIVITIES/THINGS TO DO
  // ============================================
  '/activities': {
    path: '/activities',
    breadcrumbLabel: 'Activities',
    relatedPages: [
      '/things-to-do',
      '/things-to-do/outdoor-adventures',
      '/things-to-do/history-culture',
      '/events',
      '/plan/getting-here',
      '/accommodations',
    ],
    photoRequired: true,
    blurb: 'Experience Auburn\'s best attractions from scenic trails to Gold Rush museums and cultural venues.',
  },

  '/things-to-do': {
    path: '/things-to-do',
    breadcrumbLabel: 'Things to Do',
    relatedPages: [
      '/things-to-do/outdoor-adventures',
      '/things-to-do/history-culture',
      '/things-to-do/arts-culture',
      '/events',
      '/dining',
      '/accommodations',
    ],
    photoRequired: true,
    blurb: 'Explore Auburn\'s diverse attractions including hiking, history, arts, and outdoor adventures in Gold Country.',
  },

  '/things-to-do/outdoor-adventures': {
    path: '/things-to-do/outdoor-adventures',
    breadcrumbLabel: 'Outdoor Adventures',
    parentSection: '/things-to-do',
    relatedPages: [
      '/things-to-do',
      '/things-to-do/history-culture',
      '/things-to-do/arts-culture',
      '/events',
      '/plan/maps-guides',
      '/accommodations',
    ],
    photoRequired: true,
    blurb: 'Hike scenic trails, explore parks, and discover Auburn\'s natural beauty along the American River canyon.',
  },

  '/things-to-do/history-culture': {
    path: '/things-to-do/history-culture',
    breadcrumbLabel: 'History & Culture',
    parentSection: '/things-to-do',
    relatedPages: [
      '/things-to-do',
      '/things-to-do/outdoor-adventures',
      '/things-to-do/arts-culture',
      '/discover',
      '/plan/visitor-information',
      '/events',
    ],
    photoRequired: true,
    blurb: 'Step back in time and explore Auburn\'s rich Gold Rush heritage through museums, historic sites, and walking tours.',
  },

  '/things-to-do/arts-culture': {
    path: '/things-to-do/arts-culture',
    breadcrumbLabel: 'Arts & Culture',
    parentSection: '/things-to-do',
    relatedPages: [
      '/things-to-do',
      '/things-to-do/history-culture',
      '/things-to-do/outdoor-adventures',
      '/events',
      '/dining',
      '/discover',
    ],
    photoRequired: true,
    blurb: 'Experience Auburn\'s vibrant arts scene with galleries, theaters, and cultural events throughout the year.',
  },

  // ============================================
  // DINING
  // ============================================
  '/dining': {
    path: '/dining',
    breadcrumbLabel: 'Food & Drink',
    relatedPages: [
      '/things-to-do',
      '/accommodations',
      '/events',
      '/discover',
      '/plan/visitor-information',
      '/',
    ],
    photoRequired: true,
    blurb: 'Savor Auburn\'s culinary scene from farm-to-table restaurants to craft breweries and Gold Country wineries.',
  },

  // ============================================
  // EVENTS
  // ============================================
  '/events': {
    path: '/events',
    breadcrumbLabel: 'Events',
    relatedPages: [
      '/things-to-do',
      '/dining',
      '/accommodations',
      '/plan/visitor-information',
      '/discover',
      '/',
    ],
    photoRequired: true,
    blurb: 'Join Auburn\'s vibrant community at festivals, markets, and seasonal celebrations throughout the year.',
  },

  // ============================================
  // DISCOVER (EDITORIALS/BLOG)
  // ============================================
  '/discover': {
    path: '/discover',
    breadcrumbLabel: 'Discover',
    relatedPages: [
      '/things-to-do',
      '/things-to-do/history-culture',
      '/events',
      '/dining',
      '/plan/visitor-information',
      '/accommodations',
    ],
    photoRequired: true,
    blurb: 'Read insider stories, travel tips, and local insights about Auburn and California\'s Gold Country.',
  },

  // ============================================
  // ITINERARIES
  // ============================================
  '/itineraries': {
    path: '/itineraries',
    breadcrumbLabel: 'Itineraries',
    relatedPages: [
      '/itineraries/weekend-in-auburn',
      '/itineraries/family-day',
      '/itineraries/outdoor-adventure-day',
      '/itineraries/history-and-wine',
      '/itineraries/romantic-getaway',
      '/accommodations',
    ],
    photoRequired: true,
    blurb: 'Curated day-by-day Auburn itineraries for every traveler—weekend getaways, outdoor adventures, and romantic escapes.',
  },

  '/itineraries/weekend-getaway': {
    path: '/itineraries/weekend-getaway',
    breadcrumbLabel: 'Weekend Getaway',
    parentSection: '/itineraries',
    relatedPages: [
      '/itineraries',
      '/things-to-do',
      '/accommodations',
      '/dining',
      '/things-to-do/outdoor-adventures',
      '/things-to-do/history-culture',
    ],
    photoRequired: true,
    blurb: 'Perfect 2-3 day Auburn introduction combining Lake Clementine hiking, Old Town dining, and Gold Rush history.',
  },

  '/itineraries/outdoor-adventure': {
    path: '/itineraries/outdoor-adventure',
    breadcrumbLabel: 'Outdoor Adventure',
    parentSection: '/itineraries',
    relatedPages: [
      '/itineraries',
      '/things-to-do/outdoor-adventures',
      '/accommodations',
      '/dining',
      '/itineraries/weekend-getaway',
      '/plan/maps-guides',
    ],
    photoRequired: true,
    blurb: 'Three days maximizing Auburn trails—Lake Clementine, Hidden Falls, canyon exploration, and river swimming.',
  },

  '/itineraries/gold-rush-history': {
    path: '/itineraries/gold-rush-history',
    breadcrumbLabel: 'Gold Rush History',
    parentSection: '/itineraries',
    relatedPages: [
      '/itineraries',
      '/things-to-do/history-culture',
      '/accommodations',
      '/dining',
      '/discover',
      '/itineraries/weekend-getaway',
    ],
    photoRequired: true,
    blurb: 'Two-day deep dive into California Gold Rush heritage through Auburn\'s museums, historic sites, and walking tours.',
  },

  '/itineraries/family-fun': {
    path: '/itineraries/family-fun',
    breadcrumbLabel: 'Family Fun',
    parentSection: '/itineraries',
    relatedPages: [
      '/itineraries',
      '/things-to-do',
      '/accommodations',
      '/things-to-do/outdoor-adventures',
      '/things-to-do/history-culture',
      '/dining',
    ],
    photoRequired: true,
    blurb: 'Kid-friendly Auburn adventure balancing easy trails, gold panning, swimming holes, and family dining.',
  },

  '/itineraries/romantic-escape': {
    path: '/itineraries/romantic-escape',
    breadcrumbLabel: 'Romantic Escape',
    parentSection: '/itineraries',
    relatedPages: [
      '/itineraries',
      '/accommodations',
      '/dining',
      '/things-to-do/outdoor-adventures',
      '/things-to-do/arts-culture',
      '/itineraries/weekend-getaway',
    ],
    photoRequired: true,
    blurb: 'Intimate Auburn couples retreat featuring scenic trails, farm-to-table dining, wine tasting, and canyon sunsets.',
  },

  '/itineraries/weekend-in-auburn': {
    path: '/itineraries/weekend-in-auburn',
    breadcrumbLabel: 'Weekend in Auburn',
    parentSection: '/itineraries',
    relatedPages: [
      '/itineraries',
      '/things-to-do',
      '/accommodations',
      '/dining',
      '/things-to-do/outdoor-adventures',
      '/things-to-do/history-culture',
      '/events',
      '/plan/visitor-information',
    ],
    photoRequired: true,
    blurb: '48-hour Gold Country escape—hiking, historic Old Town, farm-to-table dining, and authentic Auburn charm.',
  },

  '/itineraries/family-day': {
    path: '/itineraries/family-day',
    breadcrumbLabel: 'Family Day',
    parentSection: '/itineraries',
    relatedPages: [
      '/itineraries',
      '/things-to-do',
      '/things-to-do/outdoor-adventures',
      '/accommodations',
      '/dining',
      '/things-to-do/history-culture',
      '/events',
      '/plan/maps-guides',
    ],
    photoRequired: true,
    blurb: 'One perfect day with kids—easy trails, gold panning, river swimming, and ice cream in historic Old Town.',
  },

  '/itineraries/outdoor-adventure-day': {
    path: '/itineraries/outdoor-adventure-day',
    breadcrumbLabel: 'Outdoor Adventure Day',
    parentSection: '/itineraries',
    relatedPages: [
      '/itineraries',
      '/things-to-do/outdoor-adventures',
      '/accommodations',
      '/dining',
      '/plan/maps-guides',
      '/things-to-do',
      '/events',
      '/plan/getting-here',
    ],
    photoRequired: true,
    blurb: 'Epic day of canyon trails, river adventures, and mountain biking in Auburn State Recreation Area.',
  },

  '/itineraries/history-and-wine': {
    path: '/itineraries/history-and-wine',
    breadcrumbLabel: 'History & Wine',
    parentSection: '/itineraries',
    relatedPages: [
      '/itineraries',
      '/things-to-do/history-culture',
      '/dining',
      '/accommodations',
      '/things-to-do/arts-culture',
      '/events',
      '/plan/visitor-information',
      '/discover',
    ],
    photoRequired: true,
    blurb: 'Gold Rush heritage meets Sierra Foothills wine—museums, walking tours, and foothill tasting rooms.',
  },

  '/itineraries/romantic-getaway': {
    path: '/itineraries/romantic-getaway',
    breadcrumbLabel: 'Romantic Getaway',
    parentSection: '/itineraries',
    relatedPages: [
      '/itineraries',
      '/accommodations',
      '/dining',
      '/things-to-do/history-culture',
      '/things-to-do/outdoor-adventures',
      '/events',
      '/special-offers',
      '/plan/visitor-information',
    ],
    photoRequired: true,
    blurb: 'Couples escape to Gold Country—boutique hotels, candlelit dinners, vineyard views, and small-town romance.',
  },

  // ============================================
  // PLAN YOUR VISIT
  // ============================================
  '/plan/visitor-information': {
    path: '/plan/visitor-information',
    breadcrumbLabel: 'Visitor Information',
    parentSection: '/plan',
    relatedPages: [
      '/plan/getting-here',
      '/plan/maps-guides',
      '/accommodations',
      '/things-to-do',
      '/plan/faq',
      '/events',
    ],
    photoRequired: false,
    blurb: 'Essential information for planning your Auburn visit including hours, contacts, and local services.',
  },

  '/plan/getting-here': {
    path: '/plan/getting-here',
    breadcrumbLabel: 'Getting Here',
    parentSection: '/plan',
    relatedPages: [
      '/plan/visitor-information',
      '/plan/maps-guides',
      '/accommodations',
      '/things-to-do',
      '/plan/faq',
      '/',
    ],
    photoRequired: false,
    blurb: 'Find directions, transportation options, and travel tips for reaching Auburn in California\'s Gold Country.',
  },

  '/plan/maps-guides': {
    path: '/plan/maps-guides',
    breadcrumbLabel: 'Maps & Guides',
    parentSection: '/plan',
    relatedPages: [
      '/plan/visitor-information',
      '/plan/getting-here',
      '/things-to-do',
      '/accommodations',
      '/dining',
      '/events',
    ],
    photoRequired: false,
    blurb: 'Download maps, trail guides, and helpful resources for exploring Auburn and the surrounding area.',
  },

  '/plan/faq': {
    path: '/plan/faq',
    breadcrumbLabel: 'FAQ',
    parentSection: '/plan',
    relatedPages: [
      '/plan/visitor-information',
      '/plan/getting-here',
      '/plan/maps-guides',
      '/accommodations',
      '/things-to-do',
      '/events',
    ],
    photoRequired: false,
    blurb: 'Get answers to frequently asked questions about visiting Auburn, from weather to parking and beyond.',
  },

  '/plan/respect-auburn': {
    path: '/plan/respect-auburn',
    breadcrumbLabel: 'Respect Auburn',
    parentSection: '/plan',
    relatedPages: [
      '/plan/visitor-information',
      '/things-to-do/outdoor-adventures',
      '/plan/maps-guides',
      '/things-to-do',
      '/discover',
      '/plan/faq',
    ],
    photoRequired: false,
    blurb: 'Learn how to be a responsible visitor and help preserve Auburn\'s natural beauty and community for future generations.',
  },

  '/plan/weddings': {
    path: '/plan/weddings',
    breadcrumbLabel: 'Weddings',
    parentSection: '/plan',
    relatedPages: [
      '/plan/venues',
      '/accommodations',
      '/dining',
      '/plan/visitor-information',
      '/things-to-do',
      '/plan/meetings',
    ],
    photoRequired: true,
    blurb: 'Plan your dream Gold Country wedding in Auburn with stunning venues, scenic backdrops, and historic charm.',
  },

  '/plan/meetings': {
    path: '/plan/meetings',
    breadcrumbLabel: 'Meetings & Groups',
    parentSection: '/plan',
    relatedPages: [
      '/plan/venues',
      '/accommodations',
      '/plan/weddings',
      '/dining',
      '/plan/visitor-information',
      '/things-to-do',
    ],
    photoRequired: true,
    blurb: 'Host successful meetings and group events in Auburn with versatile venues and professional services.',
  },

  '/plan/venues': {
    path: '/plan/venues',
    breadcrumbLabel: 'Venues',
    parentSection: '/plan',
    relatedPages: [
      '/plan/weddings',
      '/plan/meetings',
      '/accommodations',
      '/dining',
      '/plan/visitor-information',
      '/events',
    ],
    photoRequired: true,
    blurb: 'Discover Auburn\'s event venues perfect for weddings, meetings, and celebrations in Gold Country.',
  },

  // ============================================
  // SPECIAL OFFERS
  // ============================================
  '/special-offers': {
    path: '/special-offers',
    breadcrumbLabel: 'Special Offers',
    relatedPages: [
      '/accommodations',
      '/things-to-do',
      '/dining',
      '/events',
      '/plan/visitor-information',
      '/',
    ],
    photoRequired: false,
    blurb: 'Save on your Auburn getaway with exclusive deals on lodging, activities, and dining experiences.',
  },

  // ============================================
  // SEARCH
  // ============================================
  '/search': {
    path: '/search',
    breadcrumbLabel: 'Search',
    relatedPages: [
      '/things-to-do',
      '/accommodations',
      '/dining',
      '/events',
      '/discover',
      '/plan/visitor-information',
    ],
    photoRequired: false,
    blurb: 'Search Auburn attractions, accommodations, restaurants, and events to plan your perfect visit.',
  },
}

/**
 * Get route metadata by path
 */
export function getRouteMetadata(path: string): RouteMetadata | null {
  return ROUTE_MAP[path] || null
}

/**
 * Generate breadcrumbs for a given path
 */
export function generateBreadcrumbs(path: string): Array<{ label: string; href: string }> {
  const breadcrumbs: Array<{ label: string; href: string }> = [
    { label: 'Home', href: '/' },
  ]

  if (path === '/') {
    return [{ label: 'Home', href: '/' }]
  }

  const metadata = getRouteMetadata(path)
  if (!metadata) {
    return breadcrumbs
  }

  // Add parent section if it exists
  if (metadata.parentSection) {
    const parentMetadata = getRouteMetadata(metadata.parentSection)
    if (parentMetadata) {
      breadcrumbs.push({
        label: parentMetadata.breadcrumbLabel,
        href: parentMetadata.path,
      })
    }
  }

  // Add current page
  breadcrumbs.push({
    label: metadata.breadcrumbLabel,
    href: metadata.path,
  })

  return breadcrumbs
}

/**
 * Get related pages with metadata
 */
export function getRelatedPages(
  currentPath: string,
  limit: number = 6
): Array<{ path: string; label: string; blurb: string }> {
  const metadata = getRouteMetadata(currentPath)
  if (!metadata) {
    return []
  }

  return metadata.relatedPages.slice(0, limit).map((path) => {
    const relatedMetadata = getRouteMetadata(path)
    return {
      path,
      label: relatedMetadata?.breadcrumbLabel || path,
      blurb: relatedMetadata?.blurb || '',
    }
  })
}

/**
 * Get all routes (for validation)
 */
export function getAllRoutes(): string[] {
  return Object.keys(ROUTE_MAP)
}

/**
 * Validate that a page has sufficient internal links
 */
export function validatePageLinks(path: string, linkCount: number): boolean {
  const MIN_LINKS = 3
  return linkCount >= MIN_LINKS
}

