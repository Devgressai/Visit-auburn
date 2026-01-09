import type { Homepage, Navigation, Activity, Accommodation, Dining, Event, Editorial, Image, Slug } from '@/types'
import { getPlaceholderImage, activityImages, accommodationImages, diningImages, eventImages, type PlaceholderKey } from '@/lib/images'

/**
 * Image helper - creates image object with Unsplash URLs
 * Accepts either a placeholder key or a full URL
 */
function createImage(urlOrKey: string, alt?: string): Image {
  // Check if it's a placeholder key or a full URL
  const isPlaceholderKey = ['hero', 'stay', 'things-to-do', 'dining', 'discover'].includes(urlOrKey)
  const imageUrl = isPlaceholderKey 
    ? getPlaceholderImage(urlOrKey as PlaceholderKey)
    : urlOrKey.startsWith('http') 
      ? urlOrKey 
      : getPlaceholderImage('hero') // fallback
  
  return {
    _type: 'image',
    asset: {
      _ref: 'local-image',
      _type: 'reference',
      url: imageUrl,
    },
    alt: alt || '',
    mockUrl: imageUrl,
  }
}

/**
 * Slug helper
 */
function createSlug(slug: string): Slug {
  return {
    current: slug,
    _type: 'slug',
  }
}

// Activities
export const activities: (Activity & { subHub?: string; seoTitle?: string; seoDescription?: string })[] = [
  {
    _id: 'mock-activity-1',
    _type: 'activity',
    title: 'Lake Clementine Trail',
    slug: createSlug('lake-clementine-trail'),
    excerpt: 'Scenic hiking trail along Lake Clementine offering beautiful views of the American River and surrounding mountains.',
    featuredImage: createImage('things-to-do', 'Lake Clementine Trail'),
    location: {
      address: 'Lake Clementine Access Road',
      city: 'Auburn',
      state: 'CA',
      zip: '95603',
    },
    subHub: 'outdoor-adventures' as const,
    duration: '2-3 hours',
    priceRange: 'Free',
    category: 'Hiking',
    seoTitle: 'Lake Clementine Trail - Hiking in Auburn, CA',
    seoDescription: 'Discover the scenic Lake Clementine Trail in Auburn, California. Perfect for hiking, nature walks, and enjoying the American River views.',
  },
  {
    _id: 'mock-activity-2',
    _type: 'activity',
    title: 'Hidden Falls Regional Park',
    slug: createSlug('hidden-falls-regional-park'),
    excerpt: 'Beautiful regional park featuring waterfalls, hiking trails, and picnic areas perfect for a day outdoors.',
    featuredImage: createImage('things-to-do', 'Hidden Falls Regional Park'),
    location: {
      address: '7587 Mears Place',
      city: 'Auburn',
      state: 'CA',
      zip: '95603',
    },
    subHub: 'outdoor-adventures' as const,
    duration: '2-4 hours',
    priceRange: 'Free',
    category: 'Parks & Nature',
    seoTitle: 'Hidden Falls Regional Park - Outdoor Recreation in Auburn',
    seoDescription: 'Explore Hidden Falls Regional Park in Auburn, CA. Features waterfalls, hiking trails, and scenic picnic areas.',
  },
  {
    _id: 'mock-activity-3',
    _type: 'activity',
    title: 'Overlook Park',
    slug: createSlug('overlook-park'),
    excerpt: 'Scenic park offering panoramic views of Auburn and the American River canyon.',
    featuredImage: createImage('things-to-do', 'Overlook Park'),
    location: {
      address: '490 Auburn Ravine Road',
      city: 'Auburn',
      state: 'CA',
      zip: '95603',
    },
    subHub: 'outdoor-adventures' as const,
    duration: '1 hour',
    priceRange: 'Free',
    category: 'Parks',
    seoTitle: 'Overlook Park - Scenic Views in Auburn, California',
    seoDescription: 'Visit Overlook Park in Auburn, CA for breathtaking views of the American River canyon and surrounding landscape.',
  },
  {
    _id: 'mock-activity-4',
    _type: 'activity',
    title: 'Railhead Park',
    slug: createSlug('railhead-park'),
    excerpt: 'Community park featuring playgrounds, sports facilities, and beautiful open spaces in the heart of Auburn.',
    featuredImage: createImage('things-to-do', 'Railhead Park'),
    location: {
      address: '400 Railhead Way',
      city: 'Auburn',
      state: 'CA',
      zip: '95603',
    },
    subHub: 'outdoor-adventures' as const,
    duration: '1-2 hours',
    priceRange: 'Free',
    category: 'Parks',
    seoTitle: 'Railhead Park - Community Park in Auburn, CA',
    seoDescription: 'Enjoy Railhead Park in Auburn, California. Perfect for families with playgrounds, sports facilities, and open spaces.',
  },
  {
    _id: 'mock-activity-5',
    _type: 'activity',
    title: 'Black Hole of Calcutta Falls & Quarry Road Trail',
    slug: createSlug('black-hole-of-calcutta-falls-quarry-road-trail'),
    excerpt: 'Unique natural swimming hole and hiking trail featuring a beautiful waterfall and historic quarry site.',
    featuredImage: createImage('things-to-do', 'Black Hole of Calcutta Falls'),
    location: {
      address: 'Quarry Road',
      city: 'Auburn',
      state: 'CA',
      zip: '95603',
    },
    subHub: 'outdoor-adventures' as const,
    duration: '2-3 hours',
    priceRange: 'Free',
    category: 'Hiking & Swimming',
    seoTitle: 'Black Hole of Calcutta Falls - Natural Swimming Hole in Auburn',
    seoDescription: 'Experience Black Hole of Calcutta Falls and Quarry Road Trail in Auburn, CA. Beautiful waterfall and natural swimming area.',
  },
  {
    _id: 'mock-activity-6',
    _type: 'activity',
    title: 'Auburn Swim Hole on American River',
    slug: createSlug('auburn-swim-hole-american-river'),
    excerpt: 'Popular swimming destination on the American River, perfect for cooling off on hot summer days.',
    featuredImage: createImage('things-to-do', 'Auburn Swim Hole'),
    location: {
      address: 'American River',
      city: 'Auburn',
      state: 'CA',
      zip: '95603',
    },
    subHub: 'outdoor-adventures' as const,
    duration: '2-4 hours',
    priceRange: 'Free',
    category: 'Swimming',
    seoTitle: 'Auburn Swim Hole - Swimming on the American River',
    seoDescription: 'Enjoy the Auburn Swim Hole on the American River. A popular spot for swimming and relaxing in Auburn, California.',
  },
  {
    _id: 'mock-activity-7',
    _type: 'activity',
    title: 'Gold Rush Museum',
    slug: createSlug('gold-rush-museum'),
    excerpt: 'Discover the rich history of the California Gold Rush and Auburn\'s role in this historic era.',
    featuredImage: createImage('things-to-do', 'Gold Rush Museum'),
    location: {
      address: '601 Lincoln Way',
      city: 'Auburn',
      state: 'CA',
      zip: '95603',
    },
    subHub: 'history-culture',
    duration: '1-2 hours',
    priceRange: '$5-$10',
    category: 'Museum',
    seoTitle: 'Gold Rush Museum - Gold Country History in Auburn, CA',
    seoDescription: 'Visit the Gold Rush Museum in Auburn, California to learn about the California Gold Rush and local history.',
  },
  {
    _id: 'mock-activity-8',
    _type: 'activity',
    title: 'Placer County Museum',
    slug: createSlug('placer-county-museum'),
    excerpt: 'Explore the history of Placer County and Auburn through engaging exhibits and artifacts.',
    featuredImage: createImage('things-to-do', 'Placer County Museum'),
    location: {
      address: '101 Maple Street',
      city: 'Auburn',
      state: 'CA',
      zip: '95603',
    },
    subHub: 'history-culture',
    duration: '1-2 hours',
    priceRange: 'Free',
    category: 'Museum',
    seoTitle: 'Placer County Museum - Local History in Auburn',
    seoDescription: 'Explore Placer County Museum in Auburn, CA to discover the rich history of the region and local community.',
  },
  {
    _id: 'mock-activity-9',
    _type: 'activity',
    title: 'Bernhard Museum',
    slug: createSlug('bernhard-museum'),
    excerpt: 'Historic museum complex featuring restored 19th-century buildings and exhibits on early Auburn life.',
    featuredImage: createImage('things-to-do', 'Bernhard Museum'),
    location: {
      address: '291 Auburn-Folsom Road',
      city: 'Auburn',
      state: 'CA',
      zip: '95603',
    },
    subHub: 'history-culture',
    duration: '1 hour',
    priceRange: 'Free',
    category: 'Museum',
    seoTitle: 'Bernhard Museum - Historic Site in Auburn, California',
    seoDescription: 'Visit Bernhard Museum in Auburn, CA to experience 19th-century history through restored buildings and exhibits.',
  },
  {
    _id: 'mock-activity-10',
    _type: 'activity',
    title: 'Old Town Auburn',
    slug: createSlug('old-town-auburn'),
    excerpt: 'Charming historic downtown featuring unique shops, restaurants, and Gold Rush-era architecture.',
    featuredImage: createImage('things-to-do', 'Old Town Auburn'),
    location: {
      address: 'Lincoln Way',
      city: 'Auburn',
      state: 'CA',
      zip: '95603',
    },
    subHub: 'arts-culture',
    duration: '2-3 hours',
    priceRange: 'Varies',
    category: 'Shopping & Dining',
    seoTitle: 'Old Town Auburn - Historic Downtown Shopping District',
    seoDescription: 'Explore Old Town Auburn, California. Historic downtown with unique shops, restaurants, and Gold Rush architecture.',
  },
  {
    _id: 'mock-activity-11',
    _type: 'activity',
    title: 'Auburn Clock Tower',
    slug: createSlug('auburn-clock-tower'),
    excerpt: 'Iconic landmark and symbol of Auburn, located in the heart of Old Town.',
    featuredImage: createImage('things-to-do', 'Auburn Clock Tower'),
    location: {
      address: 'Lincoln Way & High Street',
      city: 'Auburn',
      state: 'CA',
      zip: '95603',
    },
    subHub: 'history-culture',
    duration: '15 minutes',
    priceRange: 'Free',
    category: 'Landmark',
    seoTitle: 'Auburn Clock Tower - Historic Landmark',
    seoDescription: 'See the iconic Auburn Clock Tower, a historic landmark in the heart of Old Town Auburn, California.',
  },
  {
    _id: 'mock-activity-12',
    _type: 'activity',
    title: 'Foresthill Bridge',
    slug: createSlug('foresthill-bridge'),
    excerpt: 'One of the tallest bridges in California, offering stunning views of the American River canyon.',
    featuredImage: createImage('things-to-do', 'Foresthill Bridge'),
    location: {
      address: 'Foresthill Road',
      city: 'Auburn',
      state: 'CA',
      zip: '95603',
    },
    subHub: 'outdoor-adventures' as const,
    duration: '30 minutes',
    priceRange: 'Free',
    category: 'Scenic View',
    seoTitle: 'Foresthill Bridge - Tallest Bridge in California',
    seoDescription: 'Visit Foresthill Bridge in Auburn, CA. One of California\'s tallest bridges with breathtaking canyon views.',
  },
  {
    _id: 'mock-activity-13',
    _type: 'activity',
    title: 'Ashford Park',
    slug: createSlug('ashford-park'),
    excerpt: 'Beautiful neighborhood park with playgrounds, sports facilities, and open green spaces for families to enjoy.',
    featuredImage: createImage('things-to-do', 'Ashford Park'),
    location: {
      address: 'Ashford Drive',
      city: 'Auburn',
      state: 'CA',
      zip: '95603',
    },
    subHub: 'outdoor-adventures' as const,
    duration: '1-2 hours',
    priceRange: 'Free',
    category: 'Parks',
    seoTitle: 'Ashford Park - Family Park in Auburn, CA',
    seoDescription: 'Visit Ashford Park in Auburn, California. Family-friendly park with playgrounds, sports facilities, and open spaces.',
  },
]

// Accommodations
export const accommodations: (Accommodation & { seoTitle?: string; seoDescription?: string })[] = [
  {
    _id: 'mock-accommodation-1',
    _type: 'accommodation',
    title: 'Historic Auburn Hotel',
    slug: createSlug('historic-auburn-hotel'),
    excerpt: 'Charming historic hotel in the heart of Old Town Auburn, offering comfortable accommodations and period charm.',
    featuredImage: createImage(accommodationImages['historic-auburn-hotel'], 'Historic Auburn Hotel'),
    location: {
      address: '1340 Lincoln Way',
      city: 'Auburn',
      state: 'CA',
      zip: '95603',
    },
    category: 'Hotel',
    priceRange: '$$',
    rating: 4.5,
    amenities: ['Wi-Fi', 'Parking', 'Breakfast'],
    seoTitle: 'Historic Auburn Hotel - Stay in Old Town Auburn',
    seoDescription: 'Experience historic charm at the Historic Auburn Hotel. Comfortable accommodations in the heart of Old Town Auburn, CA.',
  },
  {
    _id: 'mock-accommodation-2',
    _type: 'accommodation',
    title: 'Gold Country Inn',
    slug: createSlug('gold-country-inn'),
    excerpt: 'Convenient motel-style accommodations with modern amenities, located near major attractions.',
    featuredImage: createImage(accommodationImages['gold-country-inn'], 'Gold Country Inn'),
    location: {
      address: '13450 Lincoln Way',
      city: 'Auburn',
      state: 'CA',
      zip: '95603',
    },
    category: 'Motel',
    priceRange: '$',
    rating: 4.0,
    amenities: ['Wi-Fi', 'Pool', 'Parking'],
    seoTitle: 'Gold Country Inn - Affordable Motel in Auburn',
    seoDescription: 'Stay at Gold Country Inn in Auburn, California. Affordable motel accommodations with modern amenities.',
  },
]

// Dining
export const dining: (Dining & { seoTitle?: string; seoDescription?: string })[] = [
  {
    _id: 'mock-dining-1',
    _type: 'dining',
    title: 'Mt Vernon Winery',
    slug: createSlug('mt-vernon-winery'),
    excerpt: 'Local winery offering wine tastings, tours, and beautiful views of the Sierra foothills.',
    featuredImage: createImage('dining', 'Mt Vernon Winery'),
    location: {
      address: '10850 Mount Vernon Road',
      city: 'Auburn',
      state: 'CA',
      zip: '95603',
    },
    category: 'Winery',
    cuisine: 'Wine Tasting',
    priceRange: '$$',
    seoTitle: 'Mt Vernon Winery - Wine Tasting in Auburn, CA',
    seoDescription: 'Visit Mt Vernon Winery in Auburn, California. Enjoy wine tastings, tours, and scenic views of Gold Country.',
  },
  {
    _id: 'mock-dining-2',
    _type: 'dining',
    title: 'Auburn Old Town Farmer\'s Market',
    slug: createSlug('auburn-old-town-farmers-market'),
    excerpt: 'Weekly farmers market featuring local produce, artisan foods, and community gatherings.',
    featuredImage: createImage('dining', 'Auburn Farmers Market'),
    location: {
      address: 'Old Town Auburn',
      city: 'Auburn',
      state: 'CA',
      zip: '95603',
    },
    category: 'Market',
    cuisine: 'Farm Fresh',
    priceRange: '$',
    seoTitle: 'Auburn Old Town Farmers Market - Local Produce & Artisan Foods',
    seoDescription: 'Visit Auburn Old Town Farmers Market in California. Fresh local produce, artisan foods, and community events.',
  },
  {
    _id: 'mock-dining-3',
    _type: 'dining',
    title: 'Out of Order Arcade',
    slug: createSlug('out-of-order-arcade'),
    excerpt: 'Retro arcade bar featuring classic games, craft beer, and a fun atmosphere for all ages.',
    featuredImage: createImage('dining', 'Out of Order Arcade'),
    location: {
      address: '1205 High Street',
      city: 'Auburn',
      state: 'CA',
      zip: '95603',
    },
    category: 'Entertainment',
    cuisine: 'American',
    priceRange: '$$',
    seoTitle: 'Out of Order Arcade - Retro Arcade Bar in Auburn',
    seoDescription: 'Experience Out of Order Arcade in Auburn, CA. Classic arcade games, craft beer, and fun entertainment.',
  },
]

// Helper to create event dates - uses current year/month for realistic calendar display
function getEventDate(dayOffset: number, hour: number = 10, minute: number = 0): string {
  const now = new Date()
  const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + dayOffset, hour, minute)
  return date.toISOString()
}

// Events - with realistic dates spread across current and next month
export const events: (Event & { seoTitle?: string; seoDescription?: string })[] = [
  {
    _id: 'mock-event-1',
    _type: 'event',
    title: 'Auburn Old Town Farmers Market',
    slug: createSlug('auburn-farmers-market-weekly'),
    excerpt: 'Weekly farmers market featuring fresh local produce, artisan foods, live music, and community events.',
    featuredImage: createImage('dining', 'Auburn Farmers Market'),
    startDate: getEventDate(2, 8, 0), // 2 days from now at 8 AM
    location: {
      address: 'Old Town Auburn',
      city: 'Auburn',
      state: 'CA',
      zip: '95603',
    },
    category: 'Market',
    seoTitle: 'Auburn Old Town Farmers Market - Weekly Event',
    seoDescription: 'Join us at Auburn Old Town Farmers Market every week for fresh produce, artisan foods, and community fun.',
  },
  {
    _id: 'mock-event-2',
    _type: 'event',
    title: 'Gold Rush Days',
    slug: createSlug('gold-rush-days'),
    excerpt: 'Annual festival celebrating Auburn\'s Gold Rush heritage with music, food, historical reenactments, and family activities.',
    featuredImage: createImage('hero', 'Gold Rush Days'),
    startDate: getEventDate(21, 10, 0), // 3 weeks from now
    endDate: getEventDate(23, 18, 0),
    location: {
      address: 'Old Town Auburn',
      city: 'Auburn',
      state: 'CA',
      zip: '95603',
    },
    category: 'Festival',
    seoTitle: 'Gold Rush Days Festival - Annual Celebration in Auburn',
    seoDescription: 'Celebrate Gold Rush Days in Auburn, California. Annual festival with music, food, and historical celebrations.',
  },
  {
    _id: 'mock-event-3',
    _type: 'event',
    title: 'Wine Walk in Old Town',
    slug: createSlug('wine-walk-old-town'),
    excerpt: 'Stroll through historic Old Town Auburn while sampling wines from local wineries and enjoying live music.',
    featuredImage: createImage('dining', 'Wine Walk'),
    startDate: getEventDate(5, 17, 0), // 5 days from now at 5 PM
    location: {
      address: 'Old Town Auburn',
      city: 'Auburn',
      state: 'CA',
      zip: '95603',
    },
    category: 'Wine & Food',
    seoTitle: 'Wine Walk in Old Town Auburn',
    seoDescription: 'Experience Auburn\'s Wine Walk featuring local wineries, live music, and historic Old Town charm.',
  },
  {
    _id: 'mock-event-4',
    _type: 'event',
    title: 'Live Music at Bootleggers',
    slug: createSlug('live-music-bootleggers'),
    excerpt: 'Enjoy live local bands and craft cocktails at Bootleggers Old Town Tavern every Friday night.',
    featuredImage: createImage('dining', 'Live Music'),
    startDate: getEventDate(3, 20, 0), // 3 days from now at 8 PM
    location: {
      address: '210 Washington St',
      city: 'Auburn',
      state: 'CA',
      zip: '95603',
    },
    category: 'Music',
    seoTitle: 'Live Music at Bootleggers - Auburn Nightlife',
    seoDescription: 'Live music every Friday at Bootleggers Old Town Tavern in Auburn, CA.',
  },
  {
    _id: 'mock-event-5',
    _type: 'event',
    title: 'Auburn Symphony Concert',
    slug: createSlug('auburn-symphony-concert'),
    excerpt: 'The Auburn Symphony Orchestra presents a classical evening featuring works by Beethoven and Mozart.',
    featuredImage: createImage('discover', 'Symphony Concert'),
    startDate: getEventDate(14, 19, 30), // 2 weeks from now at 7:30 PM
    location: {
      address: 'Auburn State Theatre',
      city: 'Auburn',
      state: 'CA',
      zip: '95603',
    },
    category: 'Arts & Culture',
    seoTitle: 'Auburn Symphony Concert - Classical Music in Gold Country',
    seoDescription: 'Experience classical music with the Auburn Symphony Orchestra at the historic Auburn State Theatre.',
  },
  {
    _id: 'mock-event-6',
    _type: 'event',
    title: 'Trail Running Workshop',
    slug: createSlug('trail-running-workshop'),
    excerpt: 'Learn trail running techniques from experienced ultramarathoners on Auburn\'s famous Western States Trail.',
    featuredImage: createImage('things-to-do', 'Trail Running'),
    startDate: getEventDate(10, 7, 0), // 10 days from now at 7 AM
    location: {
      address: 'Cool Staging Area',
      city: 'Auburn',
      state: 'CA',
      zip: '95603',
    },
    category: 'Sports & Fitness',
    seoTitle: 'Trail Running Workshop - Western States Trail Auburn',
    seoDescription: 'Join our trail running workshop on Auburn\'s famous Western States Trail.',
  },
  {
    _id: 'mock-event-7',
    _type: 'event',
    title: 'Art Walk First Friday',
    slug: createSlug('art-walk-first-friday'),
    excerpt: 'Explore Auburn\'s vibrant art scene with gallery openings, artist demonstrations, and live entertainment.',
    featuredImage: createImage('discover', 'Art Walk'),
    startDate: getEventDate(7, 17, 0), // 1 week from now at 5 PM
    location: {
      address: 'Old Town Auburn',
      city: 'Auburn',
      state: 'CA',
      zip: '95603',
    },
    category: 'Arts & Culture',
    seoTitle: 'Art Walk First Friday - Auburn Arts Scene',
    seoDescription: 'Discover Auburn\'s art galleries and local artists during First Friday Art Walk.',
  },
  {
    _id: 'mock-event-8',
    _type: 'event',
    title: 'Farmers Market (Weekly)',
    slug: createSlug('farmers-market-weekly-2'),
    excerpt: 'Weekly farmers market featuring fresh local produce, artisan foods, live music, and community events.',
    featuredImage: createImage('dining', 'Auburn Farmers Market'),
    startDate: getEventDate(9, 8, 0), // 9 days from now at 8 AM
    location: {
      address: 'Old Town Auburn',
      city: 'Auburn',
      state: 'CA',
      zip: '95603',
    },
    category: 'Market',
    seoTitle: 'Auburn Farmers Market - Fresh Local Produce',
    seoDescription: 'Shop fresh produce and artisan goods at Auburn\'s weekly farmers market.',
  },
]

// Editorials
export const editorials: (Editorial & { seoTitle?: string; seoDescription?: string })[] = [
  {
    _id: 'mock-editorial-1',
    _type: 'editorial',
    title: 'Discovering Auburn\'s Gold Rush Heritage',
    slug: createSlug('auburn-gold-rush-heritage'),
    excerpt: 'Explore the rich history of the California Gold Rush and how it shaped Auburn into the community it is today.',
    featuredImage: createImage('discover', 'Gold Rush History'),
    publishedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 2 weeks ago
    category: 'History',
    seoTitle: 'Auburn\'s Gold Rush Heritage - History Guide',
    seoDescription: 'Learn about Auburn\'s Gold Rush heritage and discover how California\'s gold mining history shaped this Gold Country community.',
  },
]

// Homepage - matches homepageQuery structure
export const homepage: any = {
  _id: 'homepage',
  _type: 'homepage',
  heroTitle: 'Discover Auburn, California',
  heroSubtitle: 'Your gateway to Gold Country adventures, history, and natural beauty',
  heroImage: createImage('hero', 'Auburn, California'),
  heroCtaText: 'Explore Auburn',
  heroCtaLink: '/things-to-do',
  seasonalHeroContent: {
    spring: {
      title: 'Spring in Auburn',
      subtitle: 'Wildflowers, mild weather, and outdoor adventures await',
      image: createImage('hero', 'Spring in Auburn'),
    },
    summer: {
      title: 'Summer Adventures in Auburn',
      subtitle: 'Swimming, hiking, and festivals under the California sun',
      image: createImage('hero', 'Summer in Auburn'),
    },
    fall: {
      title: 'Autumn Colors in Gold Country',
      subtitle: 'Experience fall foliage and harvest festivals',
      image: createImage('hero', 'Fall in Auburn'),
    },
    winter: {
      title: 'Winter Wonderland in Auburn',
      subtitle: 'Cozy up with history, wine, and holiday celebrations',
      image: createImage('hero', 'Winter in Auburn'),
    },
  },
  featuredActivities: activities.slice(0, 6),
  featuredAccommodations: accommodations,
  featuredDining: dining,
  featuredEvents: events,
  featuredExperiences: [
    activities[0], // Lake Clementine Trail
    activities[1], // Hidden Falls
    dining[0], // Mt Vernon Winery
    events[0], // Farmers Market
  ],
  featuredEditorial: editorials[0],
  seasonalSpotlightContent: [
    {
      _type: 'block',
      children: [
        {
          _type: 'span',
          text: 'Experience the best of Auburn this season. From outdoor adventures to historic sites, discover why visitors return year after year.',
        },
      ],
    },
  ],
}

// Navigation
export const navigation: Navigation = {
  _id: 'navigation',
  _type: 'navigation',
  mainNavigation: [
    {
      _id: 'nav-accommodations',
      title: 'Stay',
      description: 'Hotels, resorts, and vacation rentals',
      children: [
        {
          _id: 'nav-accommodations-all',
          title: 'All Accommodations',
          slug: createSlug('/accommodations'),
        },
        {
          _id: 'nav-accommodations-hotels',
          title: 'Hotels & Motels',
          slug: createSlug('/accommodations?category=hotels'),
        },
        {
          _id: 'nav-accommodations-rentals',
          title: 'Vacation Rentals',
          slug: createSlug('/accommodations?category=vacation-rentals'),
        },
      ],
    },
    {
      _id: 'nav-activities',
      title: 'Things to Do',
      description: 'Activities and attractions',
      children: [
        {
          _id: 'nav-activities-all',
          title: 'All Activities',
          slug: createSlug('/things-to-do'),
        },
        {
          _id: 'nav-activities-outdoor',
          title: 'Outdoor Adventures',
          slug: createSlug('/things-to-do/outdoor-adventures'),
        },
        {
          _id: 'nav-activities-history',
          title: 'History & Culture',
          slug: createSlug('/things-to-do/history-culture'),
        },
        {
          _id: 'nav-activities-arts',
          title: 'Arts & Culture',
          slug: createSlug('/things-to-do/arts-culture'),
        },
      ],
    },
    {
      _id: 'nav-dining',
      title: 'Food & Drink',
      description: 'Restaurants, cafes, and breweries',
      children: [
        {
          _id: 'nav-dining-all',
          title: 'All Dining',
          slug: createSlug('/dining'),
        },
        {
          _id: 'nav-dining-restaurants',
          title: 'Restaurants',
          slug: createSlug('/dining?category=restaurants'),
        },
        {
          _id: 'nav-dining-cafes',
          title: 'Cafes & Coffee',
          slug: createSlug('/dining?category=cafes'),
        },
        {
          _id: 'nav-dining-wineries',
          title: 'Breweries & Wineries',
          slug: createSlug('/dining?category=breweries-wineries'),
        },
      ],
    },
    {
      _id: 'nav-events',
      title: 'Events',
      description: 'Upcoming events and festivals',
      slug: createSlug('/events'),
    },
    {
      _id: 'nav-discover',
      title: 'Discover',
      description: 'Stories and insights about Auburn',
      slug: createSlug('/discover'),
    },
    {
      _id: 'nav-plan',
      title: 'Plan Your Visit',
      description: 'Visitor information and resources',
      slug: createSlug('/plan'),
    },
  ],
}

// Featured - grouped exports for easy access
export const featured = {
  accommodations: accommodations,
  activities: activities,
  dining: dining,
  events: events,
  editorials: editorials,
}

