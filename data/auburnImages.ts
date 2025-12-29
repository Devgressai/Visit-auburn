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
export function getAuburnImagePath(id: string): string {
  const image = getAuburnImageById(id)
  return image ? `/auburn/${image.src}` : ''
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
  return auburnImages.map(img => `/auburn/${img.src}`)
}

// Search images by location
export function searchAuburnImagesByLocation(query: string): AuburnImage[] {
  const lowerQuery = query.toLowerCase()
  return auburnImages.filter(img => 
    img.locationName.toLowerCase().includes(lowerQuery) ||
    img.alt.toLowerCase().includes(lowerQuery)
  )
}

