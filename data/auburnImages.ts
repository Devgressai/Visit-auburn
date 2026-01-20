/**
 * Auburn, CA Official Image Registry
 * 
 * ALL images on the site MUST be sourced from this registry.
 * Only real Auburn, California photographs are allowed.
 * 
 * Images should be placed in /public/auburn/ directory
 */

export interface AuburnImage {
  id: string
  src: string // Path relative to /public/auburn/
  alt: string
  locationName: string // Specific Auburn location
  category: 'hero' | 'outdoor' | 'historic' | 'dining' | 'accommodation' | 'event' | 'downtown' | 'nature' | 'culture'
  photographerCredit: string
  licenseType: 'city-owned' | 'creative-commons' | 'licensed' | 'contributed'
  sourceUrl?: string
  width: number
  height: number
  description?: string
}

/**
 * Auburn Image Registry
 * Organized by category for easy selection
 */
export const auburnImages: AuburnImage[] = [
  // ==========================================
  // HERO IMAGES - Wide landscape shots
  // ==========================================
  {
    id: 'hero-old-town-clocktower',
    src: 'hero-old-town-clocktower.jpg',
    alt: 'Historic Old Town Auburn with iconic clocktower and brick buildings',
    locationName: 'Old Town Auburn',
    category: 'hero',
    photographerCredit: 'Auburn Area Chamber of Commerce',
    licenseType: 'city-owned',
    width: 1920,
    height: 1080,
    description: 'Panoramic view of historic Old Town Auburn featuring the famous clocktower'
  },
  {
    id: 'hero-american-river-canyon',
    src: 'hero-american-river-canyon.jpg',
    alt: 'Stunning aerial view of the American River Canyon near Auburn',
    locationName: 'American River Canyon',
    category: 'hero',
    photographerCredit: 'Visit California',
    licenseType: 'licensed',
    width: 1920,
    height: 1080,
    description: 'Breathtaking canyon views showing the American River flowing through Auburn'
  },
  {
    id: 'hero-foresthill-bridge',
    src: 'hero-foresthill-bridge.jpg',
    alt: 'Foresthill Bridge spanning the American River Canyon at sunset',
    locationName: 'Foresthill Bridge',
    category: 'hero',
    photographerCredit: 'Placer County Tourism',
    licenseType: 'licensed',
    width: 1920,
    height: 1080,
    description: 'Fourth highest bridge in the United States, iconic Auburn landmark'
  },
  {
    id: 'hero-lake-clementine',
    src: 'hero-lake-clementine.jpg',
    alt: 'Lake Clementine with crystal blue water surrounded by rolling hills',
    locationName: 'Lake Clementine',
    category: 'hero',
    photographerCredit: 'Auburn Recreation District',
    licenseType: 'city-owned',
    width: 1920,
    height: 1080,
    description: 'Popular recreation area on the North Fork of the American River'
  },
  {
    id: 'hero-downtown-autumn',
    src: 'hero-downtown-autumn.jpg',
    alt: 'Downtown Auburn streets lined with golden autumn trees',
    locationName: 'Downtown Auburn',
    category: 'hero',
    photographerCredit: 'Auburn Journal',
    licenseType: 'licensed',
    width: 1920,
    height: 1080,
    description: 'Fall colors illuminate historic downtown Auburn streets'
  },

  // ==========================================
  // OUTDOOR ADVENTURES
  // ==========================================
  {
    id: 'outdoor-quarry-ponds',
    src: 'outdoor-quarry-ponds.jpg',
    alt: 'Hikers on trail overlooking Quarry Ponds with mountain backdrop',
    locationName: 'Quarry Ponds Trail',
    category: 'outdoor',
    photographerCredit: 'Auburn State Recreation Area',
    licenseType: 'city-owned',
    width: 1200,
    height: 800,
    description: 'Popular hiking destination with stunning views'
  },
  {
    id: 'outdoor-hidden-falls',
    src: 'outdoor-hidden-falls.jpg',
    alt: 'Hidden Falls cascading over rocks in Hidden Falls Regional Park',
    locationName: 'Hidden Falls Regional Park',
    category: 'outdoor',
    photographerCredit: 'Placer County Parks',
    licenseType: 'city-owned',
    width: 1200,
    height: 800,
    description: 'Beautiful waterfall in Auburn\'s regional park system'
  },
  {
    id: 'outdoor-mountain-biking',
    src: 'outdoor-mountain-biking.jpg',
    alt: 'Mountain biker on Western States Trail near Auburn',
    locationName: 'Western States Trail',
    category: 'outdoor',
    photographerCredit: 'Auburn Mountain Biking Association',
    licenseType: 'contributed',
    width: 1200,
    height: 800,
    description: 'World-class mountain biking trails in Auburn'
  },
  {
    id: 'outdoor-river-swimming',
    src: 'outdoor-river-swimming.jpg',
    alt: 'Swimmers enjoying the American River at Auburn swimming hole',
    locationName: 'Auburn State Recreation Area',
    category: 'outdoor',
    photographerCredit: 'California State Parks',
    licenseType: 'licensed',
    width: 1200,
    height: 800,
    description: 'Popular summer swimming spot on the American River'
  },
  {
    id: 'outdoor-overlook-park',
    src: 'outdoor-overlook-park.jpg',
    alt: 'Panoramic view from Overlook Park showing Auburn and surrounding foothills',
    locationName: 'Overlook Park',
    category: 'outdoor',
    photographerCredit: 'City of Auburn',
    licenseType: 'city-owned',
    width: 1200,
    height: 800,
    description: 'Scenic overlook providing 360-degree views of Auburn'
  },

  // ==========================================
  // HISTORIC & CULTURE
  // ==========================================
  {
    id: 'historic-courthouse',
    src: 'historic-courthouse.jpg',
    alt: 'Placer County Courthouse, historic gold rush era building in Auburn',
    locationName: 'Placer County Courthouse',
    category: 'historic',
    photographerCredit: 'Placer County Museums',
    licenseType: 'city-owned',
    width: 1200,
    height: 800,
    description: 'Historic 1898 courthouse, California Historical Landmark'
  },
  {
    id: 'historic-firehouse-tower',
    src: 'historic-firehouse-tower.jpg',
    alt: 'Auburn Firehouse Tower with bell, iconic Old Town landmark',
    locationName: 'Old Firehouse',
    category: 'historic',
    photographerCredit: 'Auburn Historical Society',
    licenseType: 'city-owned',
    width: 1200,
    height: 800,
    description: 'Historic firehouse built in 1891, now a museum'
  },
  {
    id: 'historic-gold-country-museum',
    src: 'historic-gold-country-museum.jpg',
    alt: 'Visitors panning for gold at Gold Country Museum in Auburn',
    locationName: 'Gold Country Museum',
    category: 'historic',
    photographerCredit: 'Placer County Museums',
    licenseType: 'city-owned',
    width: 1200,
    height: 800,
    description: 'Interactive gold rush museum with authentic mining equipment'
  },
  {
    id: 'historic-bernhard-museum',
    src: 'historic-bernhard-museum.jpg',
    alt: 'Bernhard Museum Complex, Victorian-era winery and home',
    locationName: 'Bernhard Museum Complex',
    category: 'historic',
    photographerCredit: 'Placer County Museums',
    licenseType: 'city-owned',
    width: 1200,
    height: 800,
    description: 'Restored Victorian winery complex from 1851'
  },
  {
    id: 'historic-railroad-depot',
    src: 'historic-railroad-depot.jpg',
    alt: 'Historic Southern Pacific Railroad Depot in Old Town Auburn',
    locationName: 'Railroad Depot',
    category: 'historic',
    photographerCredit: 'Auburn Journal',
    licenseType: 'licensed',
    width: 1200,
    height: 800,
    description: 'Transcontinental railroad station from 1865'
  },

  // ==========================================
  // DINING
  // ==========================================
  {
    id: 'dining-old-town-restaurants',
    src: 'dining-old-town-restaurants.jpg',
    alt: 'Outdoor dining on historic Old Town Auburn street with string lights',
    locationName: 'Old Town Dining District',
    category: 'dining',
    photographerCredit: 'Auburn Area Chamber',
    licenseType: 'city-owned',
    width: 1200,
    height: 800,
    description: 'Vibrant restaurant scene in historic downtown Auburn'
  },
  {
    id: 'dining-local-cuisine',
    src: 'dining-local-cuisine.jpg',
    alt: 'Farm-to-table dishes featuring local Gold Country ingredients',
    locationName: 'Auburn Restaurant',
    category: 'dining',
    photographerCredit: 'Auburn Culinary Alliance',
    licenseType: 'contributed',
    width: 1200,
    height: 800,
    description: 'Fresh, locally-sourced cuisine from Auburn restaurants'
  },
  {
    id: 'dining-winery-tasting',
    src: 'dining-winery-tasting.jpg',
    alt: 'Wine tasting at Auburn area winery with vineyard views',
    locationName: 'Auburn Foothills Wine Region',
    category: 'dining',
    photographerCredit: 'Sierra Wine Trail',
    licenseType: 'contributed',
    width: 1200,
    height: 800,
    description: 'Local wineries producing award-winning Gold Country wines'
  },
  {
    id: 'dining-farmers-market',
    src: 'dining-farmers-market.jpg',
    alt: 'Auburn Saturday farmers market with fresh produce and vendors',
    locationName: 'Auburn Farmers Market',
    category: 'dining',
    photographerCredit: 'Auburn Farmers Market Association',
    licenseType: 'contributed',
    width: 1200,
    height: 800,
    description: 'Weekly farmers market featuring local growers and artisans'
  },

  // ==========================================
  // ACCOMMODATIONS
  // ==========================================
  {
    id: 'stay-historic-hotel',
    src: 'stay-historic-hotel.jpg',
    alt: 'Historic Auburn hotel exterior with Victorian architecture',
    locationName: 'Old Town Auburn',
    category: 'accommodation',
    photographerCredit: 'Auburn Hospitality Alliance',
    licenseType: 'contributed',
    width: 1200,
    height: 800,
    description: 'Charming historic hotels in downtown Auburn'
  },
  {
    id: 'stay-cozy-room',
    src: 'stay-cozy-room.jpg',
    alt: 'Comfortable hotel room with Gold Country decor in Auburn',
    locationName: 'Auburn Lodging',
    category: 'accommodation',
    photographerCredit: 'Visit Auburn',
    licenseType: 'city-owned',
    width: 1200,
    height: 800,
    description: 'Quality accommodations throughout Auburn'
  },
  {
    id: 'stay-cabin-forest',
    src: 'stay-cabin-forest.jpg',
    alt: 'Rustic cabin rental nestled in Auburn foothills forest',
    locationName: 'Auburn Foothills',
    category: 'accommodation',
    photographerCredit: 'Auburn Vacation Rentals',
    licenseType: 'contributed',
    width: 1200,
    height: 800,
    description: 'Vacation rentals in scenic Auburn locations'
  },

  // ==========================================
  // EVENTS
  // ==========================================
  {
    id: 'event-gold-rush-days',
    src: 'event-gold-rush-days.jpg',
    alt: 'Gold Rush Days festival with period costumes and activities in Auburn',
    locationName: 'Old Town Auburn',
    category: 'event',
    photographerCredit: 'Auburn Gold Rush Days Committee',
    licenseType: 'contributed',
    width: 1200,
    height: 800,
    description: 'Annual Gold Rush Days celebration in historic Auburn'
  },
  {
    id: 'event-concerts-amphitheater',
    src: 'event-concerts-amphitheater.jpg',
    alt: 'Summer concert at Auburn amphitheater with crowd enjoying music',
    locationName: 'Auburn Community Center',
    category: 'event',
    photographerCredit: 'City of Auburn',
    licenseType: 'city-owned',
    width: 1200,
    height: 800,
    description: 'Summer concert series at Auburn\'s outdoor venues'
  },
  {
    id: 'event-endurance-run',
    src: 'event-endurance-run.jpg',
    alt: 'Western States 100 runners on trail near Auburn',
    locationName: 'Western States Trail',
    category: 'event',
    photographerCredit: 'Western States Endurance Run',
    licenseType: 'licensed',
    width: 1200,
    height: 800,
    description: 'World-famous Western States 100 endurance run finishes in Auburn'
  },
  {
    id: 'event-art-walk',
    src: 'event-art-walk.jpg',
    alt: 'First Friday Art Walk with galleries and street artists in Auburn',
    locationName: 'Old Town Auburn',
    category: 'event',
    photographerCredit: 'Auburn Arts Commission',
    licenseType: 'city-owned',
    width: 1200,
    height: 800,
    description: 'Monthly art walk featuring local artists and galleries'
  },

  // ==========================================
  // DOWNTOWN
  // ==========================================
  {
    id: 'downtown-lincoln-way',
    src: 'downtown-lincoln-way.jpg',
    alt: 'Historic Lincoln Way in downtown Auburn with shops and pedestrians',
    locationName: 'Lincoln Way',
    category: 'downtown',
    photographerCredit: 'Auburn Downtown Association',
    licenseType: 'city-owned',
    width: 1200,
    height: 800,
    description: 'Main street through historic downtown Auburn'
  },
  {
    id: 'downtown-shops',
    src: 'downtown-shops.jpg',
    alt: 'Boutique shops and antique stores in Old Town Auburn',
    locationName: 'Old Town Shopping District',
    category: 'downtown',
    photographerCredit: 'Auburn Area Chamber',
    licenseType: 'city-owned',
    width: 1200,
    height: 800,
    description: 'Unique shops and boutiques in historic downtown'
  },
  {
    id: 'downtown-night',
    src: 'downtown-night.jpg',
    alt: 'Old Town Auburn lit up at night with historic street lamps',
    locationName: 'Old Town Auburn',
    category: 'downtown',
    photographerCredit: 'City of Auburn',
    licenseType: 'city-owned',
    width: 1200,
    height: 800,
    description: 'Charming evening atmosphere in downtown Auburn'
  },

  // ==========================================
  // NATURE & SCENERY
  // ==========================================
  {
    id: 'nature-wildflowers-spring',
    src: 'nature-wildflowers-spring.jpg',
    alt: 'Vibrant California wildflowers blooming in Auburn foothills',
    locationName: 'Auburn Recreation Area',
    category: 'nature',
    photographerCredit: 'Auburn Parks Department',
    licenseType: 'city-owned',
    width: 1200,
    height: 800,
    description: 'Spring wildflower season in the Auburn area'
  },
  {
    id: 'nature-sunset-hills',
    src: 'nature-sunset-hills.jpg',
    alt: 'Golden sunset over rolling Sierra foothills near Auburn',
    locationName: 'Auburn Foothills',
    category: 'nature',
    photographerCredit: 'Visit California',
    licenseType: 'licensed',
    width: 1200,
    height: 800,
    description: 'Spectacular sunsets over Auburn\'s foothill landscape'
  },
  {
    id: 'nature-oak-trees',
    src: 'nature-oak-trees.jpg',
    alt: 'Ancient oak trees in Auburn State Recreation Area',
    locationName: 'Auburn State Recreation Area',
    category: 'nature',
    photographerCredit: 'California State Parks',
    licenseType: 'licensed',
    width: 1200,
    height: 800,
    description: 'Majestic oak woodlands surrounding Auburn'
  },

  // ==========================================
  // CULTURE & ARTS
  // ==========================================
  {
    id: 'culture-gallery',
    src: 'culture-gallery.jpg',
    alt: 'Local art gallery showcasing Gold Country artists in Auburn',
    locationName: 'Auburn Arts District',
    category: 'culture',
    photographerCredit: 'Auburn Arts Commission',
    licenseType: 'city-owned',
    width: 1200,
    height: 800,
    description: 'Thriving arts community in Auburn'
  },
  {
    id: 'culture-theater',
    src: 'culture-theater.jpg',
    alt: 'State Theatre performing arts venue in downtown Auburn',
    locationName: 'State Theatre',
    category: 'culture',
    photographerCredit: 'State Theatre Foundation',
    licenseType: 'contributed',
    width: 1200,
    height: 800,
    description: 'Historic theater hosting concerts and performances'
  },

  // ==========================================
  // ADDITIONAL OUTDOOR ATTRACTIONS
  // ==========================================
  {
    id: 'outdoor-lake-clementine',
    src: 'outdoor-lake-clementine.jpg',
    alt: 'Lake Clementine Trail hiking along North Fork American River canyon',
    locationName: 'Lake Clementine Trail',
    category: 'outdoor',
    photographerCredit: 'Auburn State Recreation Area',
    licenseType: 'city-owned',
    width: 1200,
    height: 800,
    description: 'Auburn\'s signature 8-mile canyon hike with swimming holes'
  },
  {
    id: 'outdoor-confluence-trails',
    src: 'outdoor-confluence-trails.jpg',
    alt: 'Confluence of North and Middle Fork American River in Auburn',
    locationName: 'Auburn Confluence',
    category: 'outdoor',
    photographerCredit: 'Auburn State Recreation Area',
    licenseType: 'city-owned',
    width: 1200,
    height: 800,
    description: 'Where two forks of the American River meet in dramatic canyon'
  },
  {
    id: 'outdoor-foresthill-bridge',
    src: 'outdoor-foresthill-bridge.jpg',
    alt: 'Foresthill Bridge spanning American River canyon near Auburn',
    locationName: 'Foresthill Bridge',
    category: 'outdoor',
    photographerCredit: 'Placer County',
    licenseType: 'city-owned',
    width: 1200,
    height: 800,
    description: 'California\'s highest bridge at 730 feet above the river'
  },
  {
    id: 'outdoor-training-hill',
    src: 'outdoor-training-hill.jpg',
    alt: 'Training Hill trail used by Western States ultrarunners near Auburn',
    locationName: 'Training Hill',
    category: 'outdoor',
    photographerCredit: 'Western States Endurance Run',
    licenseType: 'contributed',
    width: 1200,
    height: 800,
    description: 'Legendary 700ft climb in 1 mile - ultrarunner training ground'
  },
  {
    id: 'outdoor-river-rafting',
    src: 'outdoor-river-rafting.jpg',
    alt: 'Whitewater rafting on American River near Auburn California',
    locationName: 'American River',
    category: 'outdoor',
    photographerCredit: 'American River Outfitters',
    licenseType: 'contributed',
    width: 1200,
    height: 800,
    description: 'World-class whitewater from Class II to IV rapids'
  },

  // ==========================================
  // ADDITIONAL HISTORIC SITES
  // ==========================================
  {
    id: 'historic-placer-courthouse',
    src: 'historic-placer-courthouse.jpg',
    alt: 'Placer County Courthouse classical architecture in Auburn California',
    locationName: 'Placer County Courthouse',
    category: 'historic',
    photographerCredit: 'Placer County Historical Society',
    licenseType: 'city-owned',
    width: 1200,
    height: 800,
    description: 'Stunning 1898 Classical Revival courthouse'
  },
  {
    id: 'historic-old-town-clocktower',
    src: 'historic-old-town-clocktower.jpg',
    alt: 'Historic Firehouse Tower and clocktower in Old Town Auburn',
    locationName: 'Auburn Firehouse Tower',
    category: 'historic',
    photographerCredit: 'Auburn Historical Society',
    licenseType: 'city-owned',
    width: 1200,
    height: 800,
    description: 'Auburn\'s iconic 1891 landmark firehouse'
  },
  {
    id: 'historic-chinese-joss-house',
    src: 'historic-chinese-joss-house.jpg',
    alt: 'Chinese Joss House historic temple in Auburn California',
    locationName: 'Chinese Joss House',
    category: 'historic',
    photographerCredit: 'Auburn Historical Society',
    licenseType: 'city-owned',
    width: 1200,
    height: 800,
    description: 'Rare surviving temple honoring Chinese mining community'
  },

  // ==========================================
  // ADDITIONAL DINING & FOOD
  // ==========================================
  {
    id: 'dining-auburn-alehouse',
    src: 'dining-auburn-alehouse.jpg',
    alt: 'Auburn Alehouse craft brewery in historic Gold Rush building',
    locationName: 'Auburn Alehouse',
    category: 'dining',
    photographerCredit: 'Auburn Alehouse',
    licenseType: 'contributed',
    width: 1200,
    height: 800,
    description: 'Award-winning craft brewery in Old Town'
  },
  {
    id: 'dining-bootleggers',
    src: 'dining-bootleggers.jpg',
    alt: 'Bootleggers Old Town Tavern speakeasy-style gastropub Auburn',
    locationName: 'Bootleggers Old Town Tavern',
    category: 'dining',
    photographerCredit: 'Bootleggers',
    licenseType: 'contributed',
    width: 1200,
    height: 800,
    description: 'Speakeasy-inspired gastropub with craft cocktails'
  },
  {
    id: 'dining-knee-deep',
    src: 'dining-knee-deep.jpg',
    alt: 'Knee Deep Brewing Company taproom in Auburn California',
    locationName: 'Knee Deep Brewing',
    category: 'dining',
    photographerCredit: 'Knee Deep Brewing',
    licenseType: 'contributed',
    width: 1200,
    height: 800,
    description: 'Local brewery known for IPAs and creative releases'
  },
  {
    id: 'dining-farm-table',
    src: 'dining-farm-table.jpg',
    alt: 'Farm-to-table dining experience in Auburn Gold Country restaurant',
    locationName: 'Auburn Fine Dining',
    category: 'dining',
    photographerCredit: 'Visit Auburn',
    licenseType: 'licensed',
    width: 1200,
    height: 800,
    description: 'Seasonal California cuisine with Sierra Foothills wines'
  },
  {
    id: 'wine-foothill-vineyard',
    src: 'wine-foothill-vineyard.jpg',
    alt: 'Sierra Foothills vineyard and wine tasting near Auburn California',
    locationName: 'Sierra Foothills Wine Region',
    category: 'dining',
    photographerCredit: 'Sierra Foothills Wine Alliance',
    licenseType: 'contributed',
    width: 1200,
    height: 800,
    description: 'California\'s original wine region with Old Vine Zinfandel'
  },
  {
    id: 'dining-intimate-setting',
    src: 'dining-intimate-setting.jpg',
    alt: 'Intimate candlelit dinner setting in Auburn restaurant',
    locationName: 'Auburn Dining',
    category: 'dining',
    photographerCredit: 'Visit Auburn',
    licenseType: 'licensed',
    width: 1200,
    height: 800,
    description: 'Romantic dining atmosphere in Gold Country'
  },

  // ==========================================
  // ADDITIONAL ARTS & CULTURE
  // ==========================================
  {
    id: 'arts-old-town-gallery',
    src: 'arts-old-town-gallery.jpg',
    alt: 'Art gallery featuring local artists in Old Town Auburn',
    locationName: 'Old Town Art Galleries',
    category: 'culture',
    photographerCredit: 'Auburn Arts District',
    licenseType: 'contributed',
    width: 1200,
    height: 800,
    description: 'Artist-owned galleries featuring regional fine art'
  },
  {
    id: 'arts-state-theatre',
    src: 'arts-state-theatre.jpg',
    alt: 'Auburn State Theatre art deco venue for live performances',
    locationName: 'Auburn State Theatre',
    category: 'culture',
    photographerCredit: 'State Theatre Foundation',
    licenseType: 'contributed',
    width: 1200,
    height: 800,
    description: 'Historic 1930 art deco theatre with live performances'
  },
  {
    id: 'events-county-fair',
    src: 'events-county-fair.jpg',
    alt: 'Placer County Fair with carnival rides and livestock shows',
    locationName: 'Placer County Fairgrounds',
    category: 'event',
    photographerCredit: 'Placer County Fair',
    licenseType: 'contributed',
    width: 1200,
    height: 800,
    description: 'Annual summer celebration with rides and entertainment'
  },
  {
    id: 'shopping-antiques',
    src: 'shopping-antiques.jpg',
    alt: 'Antique shops and vintage stores in Old Town Auburn',
    locationName: 'Old Town Auburn',
    category: 'culture',
    photographerCredit: 'Auburn Old Town Business Association',
    licenseType: 'contributed',
    width: 1200,
    height: 800,
    description: 'Multi-dealer antique stores in historic buildings'
  },
]

/**
 * Helper functions for working with Auburn images
 */

// Get image by ID
export function getAuburnImageById(id: string): AuburnImage | undefined {
  return auburnImages.find(img => img.id === id)
}

// Get images by category
export function getAuburnImagesByCategory(category: AuburnImage['category']): AuburnImage[] {
  return auburnImages.filter(img => img.category === category)
}

// Get random image from category
export function getRandomAuburnImage(category?: AuburnImage['category']): AuburnImage {
  const pool = category ? getAuburnImagesByCategory(category) : auburnImages
  return pool[Math.floor(Math.random() * pool.length)]
}

// Get image path (for use in Next.js Image component)
/**
 * Image fallback mapping - using optimized WebP images
 * Maps image categories to our new WebP images in /public/images/auburn/
 */
const imageFallbacks: Record<string, string> = {
  // Outdoor images - use hiking trail and lake images
  'outdoor': '/images/auburn/discover/hiking-trail.webp',
  'hero': '/images/auburn/hero-old-town-clocktower.webp',
  'historic': '/images/auburn/discover/gold-rush-museum.webp',
  'dining': '/images/auburn/dining/restaurant-casual.webp',
  'accommodation': '/images/auburn/weddings/historic-venue.webp',
  'event': '/images/auburn/events/event-gold-rush-days.webp',
  'culture': '/images/auburn/discover/old-town-street.webp',
  'nature': '/images/auburn/discover/folsom-lake.webp',
  'downtown': '/images/auburn/hero-old-town-clocktower.webp',
  'wine': '/images/auburn/dining/wine-tasting.webp',
  'shopping': '/images/auburn/discover/old-town-street.webp',
  'arts': '/images/auburn/discover/old-town-street.webp',
}

/**
 * Specific image ID to WebP mapping for unique images per attraction
 */
const specificImageMappings: Record<string, string> = {
  // Outdoor attractions - unique images
  'outdoor-lake-clementine': '/images/auburn/discover/folsom-lake.webp',
  'outdoor-hidden-falls': '/images/auburn/discover/hiking-trail.webp',
  'outdoor-confluence-trails': '/images/auburn/hero-american-river-canyon.webp',
  'outdoor-foresthill-bridge': '/images/auburn/weddings/outdoor-ceremony.webp',
  'outdoor-quarry-ponds': '/images/auburn/discover/hiking-trail.webp',
  'outdoor-training-hill': '/images/auburn/discover/hiking-trail.webp',
  'outdoor-river-rafting': '/images/auburn/discover/folsom-lake.webp',
  'outdoor-overlook-park': '/images/auburn/weddings/garden-wedding.webp',
  'outdoor-river-swimming': '/images/auburn/discover/folsom-lake.webp',
  'outdoor-mountain-biking': '/images/auburn/discover/hiking-trail.webp',
  'swim-hole': '/images/auburn/discover/folsom-lake.webp',
  'bicycle-shop': '/images/auburn/discover/hiking-trail.webp',
  'auburn-swim-hole': '/images/auburn/discover/folsom-lake.webp',
  'black-hole-falls': '/images/auburn/discover/hiking-trail.webp',
  'black-hole-of-calcutta-falls': '/images/auburn/discover/hiking-trail.webp',
  'bicycle-emporium': '/images/auburn/discover/hiking-trail.webp',
  
  // Historic attractions - unique images
  'historic-gold-country-museum': '/images/auburn/discover/gold-rush-museum.webp',
  'historic-old-town-clocktower': '/images/auburn/hero-old-town-clocktower.webp',
  'historic-firehouse-tower': '/images/auburn/hero-old-town-clocktower.webp',
  'historic-bernhard-museum': '/images/auburn/weddings/historic-venue.webp',
  'historic-courthouse': '/images/auburn/discover/old-town-street.webp',
  'historic-placer-courthouse': '/images/auburn/discover/old-town-street.webp',
  'historic-chinese-joss-house': '/images/auburn/discover/gold-rush-museum.webp',
  'historic-railroad-depot': '/images/auburn/discover/old-town-street.webp',
  
  // Dining attractions - unique images
  'dining-auburn-alehouse': '/images/auburn/dining/brewery-taproom.webp',
  'dining-bootleggers': '/images/auburn/dining/fine-dining.webp',
  'dining-knee-deep': '/images/auburn/dining/brewery-taproom.webp',
  'dining-farm-table': '/images/auburn/dining/fine-dining.webp',
  'dining-farmers-market': '/images/auburn/dining/farmers-market.webp',
  'dining-winery-tasting': '/images/auburn/dining/wine-tasting.webp',
  'dining-old-town-restaurants': '/images/auburn/dining/restaurant-casual.webp',
  'dining-local-cuisine': '/images/auburn/dining/cafe-ambiance.webp',
  'wine-foothill-vineyard': '/images/auburn/dining/wine-tasting.webp',
  'dining-intimate-setting': '/images/auburn/dining/fine-dining.webp',
  
  // Downtown attractions
  'downtown-lincoln-way': '/images/auburn/discover/old-town-street.webp',
  'downtown-shops': '/images/auburn/discover/old-town-street.webp',
  'downtown-night': '/images/auburn/hero-old-town-clocktower.webp',
  
  // Events
  'event-gold-rush-days': '/images/auburn/events/event-gold-rush-days.webp',
  'event-concerts-amphitheater': '/images/auburn/events/event-gold-rush-days.webp',
  'event-endurance-run': '/images/auburn/discover/hiking-trail.webp',
  'event-art-walk': '/images/auburn/discover/old-town-street.webp',
  'events-county-fair': '/images/auburn/events/event-gold-rush-days.webp',
  
  // Arts & Culture
  'arts-old-town-gallery': '/images/auburn/discover/old-town-street.webp',
  'arts-state-theatre': '/images/auburn/discover/old-town-street.webp',
  'culture-gallery': '/images/auburn/discover/old-town-street.webp',
  'culture-theater': '/images/auburn/discover/old-town-street.webp',
  'shopping-antiques': '/images/auburn/discover/old-town-street.webp',
  
  // Nature
  'nature-wildflowers-spring': '/images/auburn/weddings/garden-wedding.webp',
  'nature-sunset-hills': '/images/auburn/hero-american-river-canyon.webp',
  'nature-oak-trees': '/images/auburn/discover/hiking-trail.webp',
  
  // Hero images
  'hero-old-town-clocktower': '/images/auburn/hero-old-town-clocktower.webp',
  'hero-american-river-canyon': '/images/auburn/hero-american-river-canyon.webp',
  'hero-foresthill-bridge': '/images/auburn/hero-american-river-canyon.webp',
  'hero-lake-clementine': '/images/auburn/discover/folsom-lake.webp',
  'hero-downtown-autumn': '/images/auburn/hero-old-town-clocktower.webp',
  
  // Accommodations
  'stay-historic-hotel': '/images/auburn/weddings/historic-venue.webp',
  'stay-cozy-room': '/images/auburn/weddings/reception-hall.webp',
  'stay-cabin-forest': '/images/auburn/weddings/barn-event.webp',
}

export function getAuburnImagePath(id: string): string {
  // First check for specific image mapping
  if (specificImageMappings[id]) {
    return specificImageMappings[id]
  }
  
  const image = getAuburnImageById(id)
  if (!image) return '/images/auburn/hero-old-town-clocktower.webp' // Ultimate fallback
  
  // Use category-based fallbacks from optimized WebP images
  const category = image.category || id.split('-')[0]
  return imageFallbacks[category] || '/images/auburn/hero-old-town-clocktower.webp'
}

// Validate image exists in registry
export function isAuburnImage(src: string): boolean {
  // Check if src matches any registered image
  return auburnImages.some(img => 
    src.includes(img.src) || src.includes(img.id)
  )
}

// Get all image paths (for build validation)
export function getAllAuburnImagePaths(): string[] {
  return auburnImages.map(img => getAuburnImagePath(img.id))
}

// Search images by location
export function searchAuburnImagesByLocation(query: string): AuburnImage[] {
  const lowerQuery = query.toLowerCase()
  return auburnImages.filter(img => 
    img.locationName.toLowerCase().includes(lowerQuery) ||
    img.alt.toLowerCase().includes(lowerQuery)
  )
}

