/**
 * Things to Do in Auburn, CA - Comprehensive Directory Data
 * Enriched with official sources and credible information
 */

export interface ThingsToDoCategory {
  title: string
  slug: string
  description: string
  iconKey: string
  sortOrder: number
}

export interface ThingsToDoLocation {
  city: string
  state: string
  address?: string
  zip?: string
}

export interface ThingsToDoSource {
  label: string
  url: string
}

export interface ThingsToDoItem {
  id: string
  title: string
  slug: string
  categorySlug: string
  shortDescription: string
  highlights: string[]
  goodFor: string[]
  location: ThingsToDoLocation
  website?: string
  sources: ThingsToDoSource[]
  visitTips?: string[]
  sortRank?: number
  imageKey?: string
}

// ============================================================================
// CATEGORIES
// ============================================================================

export const thingsToDoCategories: ThingsToDoCategory[] = [
  {
    title: 'Outdoor Adventures & Nature',
    slug: 'outdoor-adventures',
    description: 'Explore Auburn\'s stunning natural landscape with hiking trails, parks, waterfalls, and scenic river access along the American River.',
    iconKey: 'mountain',
    sortOrder: 1,
  },
  {
    title: 'History & Culture',
    slug: 'history-culture',
    description: 'Discover Auburn\'s rich Gold Rush heritage through museums, historic landmarks, and preserved 1850s architecture in Old Town.',
    iconKey: 'building',
    sortOrder: 2,
  },
  {
    title: 'Wine, Food & Markets',
    slug: 'wine-food-markets',
    description: 'Savor local wines, farm-fresh produce at weekly markets, and unique dining experiences in Auburn\'s historic downtown.',
    iconKey: 'utensils',
    sortOrder: 3,
  },
  {
    title: 'Events & Seasonal Fun',
    slug: 'events-seasonal',
    description: 'Experience Auburn\'s vibrant community through year-round festivals, seasonal celebrations, and special events.',
    iconKey: 'calendar',
    sortOrder: 4,
  },
  {
    title: 'Active Adventures',
    slug: 'active-adventures',
    description: 'Get your adrenaline pumping with mountain biking, rafting, horseback riding, and other outdoor sports in Gold Country.',
    iconKey: 'bike',
    sortOrder: 5,
  },
]

// ============================================================================
// ITEMS - OUTDOOR ADVENTURES & NATURE
// ============================================================================

export const thingsToDoItems: ThingsToDoItem[] = [
  // OUTDOOR ADVENTURES
  {
    id: 'lake-clementine-trail',
    title: 'Lake Clementine Trail',
    slug: 'lake-clementine-trail',
    categorySlug: 'outdoor-adventures',
    shortDescription: 'Scenic 3-mile trail along Lake Clementine with stunning views of the North Fork American River, perfect for hiking, mountain biking, and exploring the historic North Fork Dam.',
    highlights: [
      'Historic North Fork Dam and powerhouse',
      'Swimming and fishing opportunities',
      'Wildflower viewing in spring',
      'Mountain biking allowed',
    ],
    goodFor: ['Hiking', 'Views', 'Mountain Biking', 'Photography', 'Family-friendly'],
    location: {
      city: 'Auburn',
      state: 'CA',
      address: 'Lake Clementine Rd (off Foresthill Rd)',
    },
    sources: [
      {
        label: 'Placer County Parks',
        url: 'https://www.placer.ca.gov/1392/Lake-Clementine',
      },
      {
        label: 'AllTrails',
        url: 'https://www.alltrails.com/trail/us/california/lake-clementine-trail',
      },
    ],
    visitTips: [
      'Best visited in spring for wildflowers and fall for foliage',
      'Parking available at the trailhead off Foresthill Road',
      'Trail can be hot in summer - bring plenty of water',
    ],
    sortRank: 1,
    imageKey: 'lake-clementine',
  },
  {
    id: 'hidden-falls-regional-park',
    title: 'Hidden Falls Regional Park',
    slug: 'hidden-falls-regional-park',
    categorySlug: 'outdoor-adventures',
    shortDescription: '1,143-acre regional park featuring seasonal waterfalls, 30+ miles of trails for hiking, mountain biking, and horseback riding through oak woodlands and rolling hills.',
    highlights: [
      'Seven seasonal waterfalls',
      'Over 30 miles of multi-use trails',
      'Wildlife viewing opportunities',
      'Accessible trails available',
    ],
    goodFor: ['Hiking', 'Mountain Biking', 'Horseback Riding', 'Nature', 'Photography', 'Family-friendly'],
    location: {
      city: 'Auburn',
      state: 'CA',
      address: '7587 Mears Pl',
      zip: '95602',
    },
    website: 'https://www.placer.ca.gov/1594/Hidden-Falls-Regional-Park',
    sources: [
      {
        label: 'Placer County Parks (Official)',
        url: 'https://www.placer.ca.gov/1594/Hidden-Falls-Regional-Park',
      },
      {
        label: 'AllTrails',
        url: 'https://www.alltrails.com/parks/us/california/hidden-falls-regional-park',
      },
    ],
    visitTips: [
      'Best waterfall viewing: February through April after rainfall',
      'Park opens dawn to dusk daily',
      'Free parking and admission',
      'Dogs allowed on leash',
    ],
    sortRank: 2,
    imageKey: 'hidden-falls',
  },
  {
    id: 'overlook-park',
    title: 'Overlook Park',
    slug: 'overlook-park',
    categorySlug: 'outdoor-adventures',
    shortDescription: 'Scenic 6.8-acre park offering panoramic views of the American River Canyon, Auburn Ravine, and surrounding foothills with paved walking paths and picnic areas.',
    highlights: [
      'Breathtaking canyon overlooks',
      'Paved accessible walking paths',
      'Picnic tables and benches',
      'Sunset viewing spot',
    ],
    goodFor: ['Views', 'Walking', 'Picnics', 'Photography', 'Family-friendly', 'Accessible'],
    location: {
      city: 'Auburn',
      state: 'CA',
      address: '490 Auburn Ravine Rd',
      zip: '95603',
    },
    sources: [
      {
        label: 'City of Auburn Parks',
        url: 'https://www.auburn.ca.gov/Facilities/Facility/Details/Overlook-Park-21',
      },
    ],
    visitTips: [
      'Perfect for sunset viewing',
      'Free parking available',
      'Well-maintained paved paths suitable for strollers and wheelchairs',
    ],
    sortRank: 3,
    imageKey: 'overlook-park',
  },
  {
    id: 'railhead-park',
    title: 'Railhead Park',
    slug: 'railhead-park',
    categorySlug: 'outdoor-adventures',
    shortDescription: 'Urban park in downtown Auburn with walking paths, green space, and historic railroad heritage along the old rail corridor.',
    highlights: [
      'Historic railroad corridor',
      'Easy walking paths',
      'Green space and lawn areas',
      'Close to Old Town dining and shops',
    ],
    goodFor: ['Walking', 'History', 'Family-friendly', 'Picnics'],
    location: {
      city: 'Auburn',
      state: 'CA',
      address: 'Sacramento St near Nevada St',
    },
    sources: [
      {
        label: 'City of Auburn',
        url: 'https://www.auburn.ca.gov',
      },
    ],
    visitTips: [
      'Convenient starting point for exploring Old Town Auburn',
      'Free parking nearby in Old Town lots',
    ],
    sortRank: 4,
    imageKey: 'railhead-park',
  },
  {
    id: 'ashford-park',
    title: 'Ashford Park',
    slug: 'ashford-park',
    categorySlug: 'outdoor-adventures',
    shortDescription: 'Neighborhood park with walking trails, playground, and open space for recreation and relaxation.',
    highlights: [
      'Playground equipment',
      'Walking trails',
      'Open grass areas',
      'Picnic facilities',
    ],
    goodFor: ['Family-friendly', 'Walking', 'Picnics', 'Playground'],
    location: {
      city: 'Auburn',
      state: 'CA',
      address: 'Ashford Ln',
    },
    sources: [
      {
        label: 'City of Auburn Parks',
        url: 'https://www.auburn.ca.gov',
      },
    ],
    sortRank: 5,
    imageKey: 'ashford-park',
  },
  {
    id: 'black-hole-of-calcutta-falls',
    title: 'Black Hole of Calcutta Falls & Quarry Road Trail',
    slug: 'black-hole-of-calcutta-falls',
    categorySlug: 'outdoor-adventures',
    shortDescription: 'Hidden waterfall and swimming hole accessed via Quarry Road Trail, offering a secluded natural experience with swimming opportunities in the American River Canyon.',
    highlights: [
      'Seasonal waterfall',
      'Natural swimming hole',
      'Geological formations',
      'Moderate hiking trail',
    ],
    goodFor: ['Hiking', 'Swimming', 'Nature', 'Photography', 'Adventure'],
    location: {
      city: 'Auburn',
      state: 'CA',
      address: 'Quarry Rd Trail access',
    },
    sources: [
      {
        label: 'AllTrails',
        url: 'https://www.alltrails.com/trail/us/california/quarry-road-trail',
      },
    ],
    visitTips: [
      'Best visited spring through early summer when water flow is highest',
      'Trail can be steep and rocky - wear appropriate footwear',
      'Swimming conditions vary by season',
    ],
    sortRank: 6,
    imageKey: 'black-hole-falls',
  },
  {
    id: 'auburn-swim-hole',
    title: 'Auburn Swim Hole on American River',
    slug: 'auburn-swim-hole',
    categorySlug: 'outdoor-adventures',
    shortDescription: 'Popular summer swimming spot along the American River with natural pools, sandy beaches, and easy water access for cooling off on hot days.',
    highlights: [
      'Natural swimming pools',
      'Sandy river beaches',
      'Easy water access',
      'Scenic river setting',
    ],
    goodFor: ['Swimming', 'Family-friendly', 'Summer', 'Picnics'],
    location: {
      city: 'Auburn',
      state: 'CA',
      address: 'American River access off Foresthill Rd',
    },
    sources: [
      {
        label: 'Placer County',
        url: 'https://www.placer.ca.gov',
      },
    ],
    visitTips: [
      'Best swimming: June through September',
      'River levels vary by season - check conditions before visiting',
      'No lifeguard on duty - swim at your own risk',
    ],
    sortRank: 7,
    imageKey: 'swim-hole',
  },

  // HISTORY & CULTURE
  {
    id: 'placer-county-museum',
    title: 'Placer County Museum',
    slug: 'placer-county-museum',
    categorySlug: 'history-culture',
    shortDescription: 'Free museum housed in a historic 1851 courthouse featuring Gold Rush artifacts, Native American exhibits, and Placer County history.',
    highlights: [
      'Original 1851 courthouse building',
      'Gold Rush era artifacts',
      'Native American exhibits',
      'Free admission',
    ],
    goodFor: ['History', 'Museums', 'Education', 'Family-friendly', 'Indoor'],
    location: {
      city: 'Auburn',
      state: 'CA',
      address: '101 Maple St',
      zip: '95603',
    },
    website: 'https://www.placer.ca.gov/1414/Placer-County-Museums',
    sources: [
      {
        label: 'Placer County Museums (Official)',
        url: 'https://www.placer.ca.gov/1414/Placer-County-Museums',
      },
      {
        label: 'Visit Placer',
        url: 'https://www.visitplacer.com',
      },
    ],
    visitTips: [
      'Open Tuesday-Sunday, 10am-4pm',
      'Free admission',
      'Guided tours available by appointment',
    ],
    sortRank: 1,
    imageKey: 'placer-museum',
  },
  {
    id: 'gold-country-museum',
    title: 'Gold Country Museum',
    slug: 'gold-country-museum',
    categorySlug: 'history-culture',
    shortDescription: 'Interactive museum featuring Gold Rush exhibits, a recreated mine tunnel, working stamp mill, and hands-on gold panning experiences.',
    highlights: [
      'Walk-through mine tunnel',
      'Working stamp mill demonstrations',
      'Gold panning lessons',
      'Historic mining equipment',
    ],
    goodFor: ['History', 'Museums', 'Family-friendly', 'Education', 'Interactive'],
    location: {
      city: 'Auburn',
      state: 'CA',
      address: '1273 High St',
      zip: '95603',
    },
    website: 'https://www.placer.ca.gov/1415/Gold-Country-Museum',
    sources: [
      {
        label: 'Placer County Museums (Official)',
        url: 'https://www.placer.ca.gov/1415/Gold-Country-Museum',
      },
    ],
    visitTips: [
      'Open Tuesday-Sunday, 11am-4pm',
      'Small admission fee ($5 adults, children free)',
      'Gold panning equipment available for hands-on experience',
    ],
    sortRank: 2,
    imageKey: 'gold-museum',
  },
  {
    id: 'bernhard-museum',
    title: 'Bernhard Museum Complex',
    slug: 'bernhard-museum',
    categorySlug: 'history-culture',
    shortDescription: 'Historic 1851 Traveler\'s Rest Hotel and ranch complex showcasing Victorian-era life with original buildings, artifacts, and period furnishings.',
    highlights: [
      'Original 1851 hotel building',
      'Victorian period rooms',
      'Historic winery and carriage house',
      'Guided tours available',
    ],
    goodFor: ['History', 'Architecture', 'Museums', 'Photography'],
    location: {
      city: 'Auburn',
      state: 'CA',
      address: '291 Auburn Ravine Rd',
      zip: '95603',
    },
    website: 'https://www.placer.ca.gov/1413/Bernhard-Museum-Complex',
    sources: [
      {
        label: 'Placer County Museums (Official)',
        url: 'https://www.placer.ca.gov/1413/Bernhard-Museum-Complex',
      },
    ],
    visitTips: [
      'Open Tuesday-Friday 11am-3pm, weekends 12pm-4pm',
      'Free admission',
      'Group tours available by appointment',
    ],
    sortRank: 3,
    imageKey: 'bernhard-museum',
  },
  {
    id: 'old-town-auburn',
    title: 'Old Town Auburn',
    slug: 'old-town-auburn',
    categorySlug: 'history-culture',
    shortDescription: 'Historic downtown district with preserved 1850s Gold Rush architecture, antique shops, restaurants, galleries, and the iconic clock tower.',
    highlights: [
      'Preserved Gold Rush-era buildings',
      'Antique shops and galleries',
      'Diverse dining options',
      'Weekly farmers market',
    ],
    goodFor: ['History', 'Shopping', 'Dining', 'Walking', 'Architecture', 'Photography'],
    location: {
      city: 'Auburn',
      state: 'CA',
      address: 'Downtown Auburn (Commercial St & Lincoln Way)',
    },
    website: 'https://www.oldtownauburn.com',
    sources: [
      {
        label: 'Old Town Auburn (Official)',
        url: 'https://www.oldtownauburn.com',
      },
      {
        label: 'Placer County Visitors Bureau',
        url: 'https://www.visitplacer.com/listing/historic-old-town-auburn',
      },
    ],
    visitTips: [
      'Free parking in city lots',
      'Saturday Farmers Market 8am-12pm (year-round)',
      'Many shops closed Sunday-Monday',
    ],
    sortRank: 4,
    imageKey: 'old-town',
  },
  {
    id: 'old-town-walking-tour',
    title: 'Old Town Auburn Walking Tour',
    slug: 'old-town-walking-tour',
    categorySlug: 'history-culture',
    shortDescription: 'Self-guided and interactive scavenger hunt walking tours exploring Auburn\'s Gold Rush history, historic buildings, and local landmarks.',
    highlights: [
      'Interactive scavenger hunt format',
      'Historic building markers',
      'Gold Rush history',
      'Family-friendly activity',
    ],
    goodFor: ['History', 'Walking', 'Family-friendly', 'Education', 'Self-guided'],
    location: {
      city: 'Auburn',
      state: 'CA',
      address: 'Start at Old Town Auburn Depot',
    },
    sources: [
      {
        label: 'Auburn Visitor Center',
        url: 'https://www.auburn.ca.gov',
      },
    ],
    visitTips: [
      'Download walking tour map from visitor center',
      'Allow 1-2 hours for full tour',
      'Best done during business hours when shops are open',
    ],
    sortRank: 5,
    imageKey: 'walking-tour',
  },
  {
    id: 'auburn-clock-tower',
    title: 'Auburn Firehouse Clock Tower',
    slug: 'auburn-clock-tower',
    categorySlug: 'history-culture',
    shortDescription: 'Iconic 1891 clock tower atop the historic Auburn Firehouse, a beloved landmark and symbol of Old Town Auburn.',
    highlights: [
      'Built in 1891',
      'Historic firehouse building',
      'Old Town landmark',
      'Photo opportunity',
    ],
    goodFor: ['History', 'Architecture', 'Photography', 'Landmarks'],
    location: {
      city: 'Auburn',
      state: 'CA',
      address: '1155 Lincoln Way',
      zip: '95603',
    },
    sources: [
      {
        label: 'City of Auburn',
        url: 'https://www.auburn.ca.gov',
      },
    ],
    sortRank: 6,
    imageKey: 'clock-tower',
  },
  {
    id: 'foresthill-bridge',
    title: 'Foresthill Bridge',
    slug: 'foresthill-bridge',
    categorySlug: 'history-culture',
    shortDescription: 'One of the highest bridges in California at 730 feet, spanning the North Fork American River Canyon with spectacular views and photo opportunities.',
    highlights: [
      '730 feet above the river',
      'Fourth highest bridge in the US',
      'Spectacular canyon views',
      'Engineering marvel (built 1973)',
    ],
    goodFor: ['Views', 'Photography', 'Engineering', 'Scenic Drive'],
    location: {
      city: 'Auburn',
      state: 'CA',
      address: 'Foresthill Rd, 14 miles from Auburn',
    },
    sources: [
      {
        label: 'Wikipedia',
        url: 'https://en.wikipedia.org/wiki/Foresthill_Bridge',
      },
      {
        label: 'Placer County',
        url: 'https://www.placer.ca.gov',
      },
    ],
    visitTips: [
      'Pullout parking areas on both sides of bridge',
      'Best photos from east side pullout',
      'About 20-minute drive from downtown Auburn',
    ],
    sortRank: 7,
    imageKey: 'foresthill-bridge',
  },

  // WINE, FOOD & MARKETS
  {
    id: 'mt-vernon-winery',
    title: 'Mt. Vernon Winery',
    slug: 'mt-vernon-winery',
    categorySlug: 'wine-food-markets',
    shortDescription: 'Family-owned winery in the Sierra Foothills producing award-winning wines with tasting room, events, and beautiful vineyard views.',
    highlights: [
      'Award-winning wines',
      'Tasting room open daily',
      'Special events and live music',
      'Picnic grounds',
    ],
    goodFor: ['Wine', 'Tasting', 'Adults', 'Events'],
    location: {
      city: 'Auburn',
      state: 'CA',
      address: '2912 Carson Ct',
      zip: '95603',
    },
    website: 'https://www.mtvernonwine.com',
    sources: [
      {
        label: 'Mt. Vernon Winery (Official)',
        url: 'https://www.mtvernonwine.com',
      },
    ],
    visitTips: [
      'Open Thursday-Sunday, 12pm-5pm',
      'Reservations recommended for groups of 6+',
      'Check website for live music and event schedule',
    ],
    sortRank: 1,
    imageKey: 'mt-vernon',
  },
  {
    id: 'auburn-farmers-market',
    title: 'Auburn Old Town Farmers Market',
    slug: 'auburn-farmers-market',
    categorySlug: 'wine-food-markets',
    shortDescription: 'Year-round Saturday farmers market featuring local produce, artisan goods, baked goods, and seasonal crafts from Placer County farmers and vendors.',
    highlights: [
      'Open year-round',
      'Local produce and fruits',
      'Artisan breads and pastries',
      'Handmade crafts',
    ],
    goodFor: ['Shopping', 'Food', 'Family-friendly', 'Local', 'Weekly'],
    location: {
      city: 'Auburn',
      state: 'CA',
      address: 'Old Town Auburn (Court St & Commercial St)',
    },
    website: 'https://www.pcfb.org/auburn-certified-farmers-market',
    sources: [
      {
        label: 'Placer County Certified Farmers Market',
        url: 'https://www.pcfb.org/auburn-certified-farmers-market',
      },
    ],
    visitTips: [
      'Open Saturdays 8am-12pm year-round',
      'Arrive early for best selection',
      'Bring reusable bags',
      'Cash and cards accepted by most vendors',
    ],
    sortRank: 2,
    imageKey: 'farmers-market',
  },
  {
    id: 'out-of-order-arcade',
    title: 'Out of Order Arcade Bar',
    slug: 'out-of-order-arcade',
    categorySlug: 'wine-food-markets',
    shortDescription: 'Retro arcade bar featuring classic and modern arcade games, craft cocktails, beer, and a fun nostalgic atmosphere for adults.',
    highlights: [
      'Classic arcade games',
      'Craft cocktails and local beer',
      '21+ venue',
      'Retro atmosphere',
    ],
    goodFor: ['Adults', 'Entertainment', 'Nightlife', 'Groups'],
    location: {
      city: 'Auburn',
      state: 'CA',
      address: '1245 Lincoln Way',
      zip: '95603',
    },
    website: 'https://www.facebook.com/OutofOrderArcade',
    sources: [
      {
        label: 'Facebook Page',
        url: 'https://www.facebook.com/OutofOrderArcade',
      },
    ],
    visitTips: [
      '21+ only',
      'Check Facebook for current hours',
      'Popular on weekend nights',
    ],
    sortRank: 3,
    imageKey: 'arcade',
  },
  {
    id: 'old-town-dining',
    title: 'Old Town Auburn Restaurants & Cafes',
    slug: 'old-town-dining',
    categorySlug: 'wine-food-markets',
    shortDescription: 'Diverse dining scene in historic Old Town featuring American, Italian, Mexican, Asian cuisine, cafes, breweries, and wine bars.',
    highlights: [
      'Historic setting',
      'Diverse cuisines',
      'Local favorites like The Club Car',
      'Outdoor dining options',
    ],
    goodFor: ['Dining', 'Food', 'Historic', 'Variety'],
    location: {
      city: 'Auburn',
      state: 'CA',
      address: 'Old Town Auburn district',
    },
    sources: [
      {
        label: 'Old Town Auburn',
        url: 'https://www.oldtownauburn.com',
      },
    ],
    sortRank: 4,
    imageKey: 'dining',
  },

  // EVENTS & SEASONAL
  {
    id: 'auburn-events',
    title: 'Auburn Festivals & Community Events',
    slug: 'auburn-events',
    categorySlug: 'events-seasonal',
    shortDescription: 'Year-round community events including Gold Rush Days, State Fair, car shows, concerts, and seasonal celebrations throughout Auburn.',
    highlights: [
      'Gold Rush Days (May)',
      'Auburn Car Show',
      'Summer concerts',
      'Holiday events',
    ],
    goodFor: ['Events', 'Family-friendly', 'Seasonal', 'Community'],
    location: {
      city: 'Auburn',
      state: 'CA',
      address: 'Various locations',
    },
    website: 'https://www.visitauburn.com/events',
    sources: [
      {
        label: 'Visit Auburn Events Calendar',
        url: 'https://www.visitauburn.com/events',
      },
      {
        label: 'City of Auburn',
        url: 'https://www.auburn.ca.gov',
      },
    ],
    visitTips: [
      'Check event calendar for current dates and details',
      'Many events in Old Town and fairgrounds',
      'Free admission to most community events',
    ],
    sortRank: 1,
    imageKey: 'events',
  },
  {
    id: 'pumpkin-nights',
    title: 'Pumpkin Nights at Gold Country Fairgrounds',
    slug: 'pumpkin-nights',
    categorySlug: 'events-seasonal',
    shortDescription: 'Seasonal fall event featuring thousands of illuminated carved pumpkins, themed displays, fall treats, and family activities.',
    highlights: [
      'Thousands of carved pumpkins',
      'Illuminated displays',
      'Fall festival atmosphere',
      'Family-friendly',
    ],
    goodFor: ['Seasonal', 'Fall', 'Family-friendly', 'Events', 'Photography'],
    location: {
      city: 'Auburn',
      state: 'CA',
      address: 'Gold Country Fairgrounds',
    },
    sources: [
      {
        label: 'Gold Country Fair',
        url: 'https://www.goldcountryfair.com',
      },
    ],
    visitTips: [
      'Typically runs October',
      'Check website for current year dates and tickets',
      'Popular event - book tickets in advance',
    ],
    sortRank: 2,
    imageKey: 'pumpkin-nights',
  },
  {
    id: 'mandarin-festival',
    title: 'Mandarin Festival',
    slug: 'mandarin-festival',
    categorySlug: 'events-seasonal',
    shortDescription: 'Annual winter celebration of Placer County\'s citrus heritage with mandarin tastings, local vendors, entertainment, and family activities.',
    highlights: [
      'Mandarin orange tastings',
      'Local food vendors',
      'Live entertainment',
      'Family activities',
    ],
    goodFor: ['Seasonal', 'Winter', 'Family-friendly', 'Food', 'Community'],
    location: {
      city: 'Auburn',
      state: 'CA',
      address: 'Varies by year',
    },
    sources: [
      {
        label: 'Placer County Events',
        url: 'https://www.visitplacer.com',
      },
    ],
    visitTips: [
      'Typically held in January',
      'Check Placer County events calendar for current year details',
    ],
    sortRank: 3,
    imageKey: 'mandarin-festival',
  },

  // ACTIVE ADVENTURES
  {
    id: 'bicycle-emporium',
    title: 'Bicycle Emporium',
    slug: 'bicycle-emporium',
    categorySlug: 'active-adventures',
    shortDescription: 'Local bike shop offering bike sales, rentals, repairs, and expert advice for exploring Auburn\'s trails and roads.',
    highlights: [
      'Bike rentals',
      'Professional repairs',
      'Trail recommendations',
      'Quality bikes and gear',
    ],
    goodFor: ['Biking', 'Rentals', 'Adventure', 'Active'],
    location: {
      city: 'Auburn',
      state: 'CA',
      address: '2550 Bell Rd',
      zip: '95603',
    },
    website: 'https://www.bicycleemporium.com',
    sources: [
      {
        label: 'Bicycle Emporium (Official)',
        url: 'https://www.bicycleemporium.com',
      },
    ],
    visitTips: [
      'Reservations recommended for rentals',
      'Staff can recommend trails based on skill level',
      'Open Tuesday-Saturday',
    ],
    sortRank: 1,
    imageKey: 'bicycle-shop',
  },
  {
    id: 'adventure-sports',
    title: 'Rafting, Mountain Biking & Horseback Riding',
    slug: 'adventure-sports',
    categorySlug: 'active-adventures',
    shortDescription: 'Auburn serves as gateway to American River rafting, extensive mountain bike trail systems, and horseback riding adventures in the Sierra foothills.',
    highlights: [
      'Whitewater rafting on American River',
      'World-class mountain bike trails',
      'Horseback riding through foothills',
      'Professional outfitters available',
    ],
    goodFor: ['Adventure', 'Rafting', 'Biking', 'Horseback Riding', 'Active', 'Outdoor'],
    location: {
      city: 'Auburn',
      state: 'CA',
      address: 'Various locations and outfitters',
    },
    sources: [
      {
        label: 'Visit Placer',
        url: 'https://www.visitplacer.com/things-to-do/outdoor-recreation/',
      },
      {
        label: 'Auburn State Recreation Area',
        url: 'https://www.parks.ca.gov/?page_id=502',
      },
    ],
    visitTips: [
      'Book rafting trips in advance, especially summer weekends',
      'Best rafting season: April through September',
      'Multiple outfitters offer guided experiences',
    ],
    sortRank: 2,
    imageKey: 'adventure-sports',
  },
]

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getCategoryBySlug(slug: string): ThingsToDoCategory | undefined {
  return thingsToDoCategories.find(cat => cat.slug === slug)
}

export function getItemsByCategory(categorySlug: string): ThingsToDoItem[] {
  return thingsToDoItems
    .filter(item => item.categorySlug === categorySlug)
    .sort((a, b) => (a.sortRank || 999) - (b.sortRank || 999))
}

export function getItemBySlug(slug: string): ThingsToDoItem | undefined {
  return thingsToDoItems.find(item => item.slug === slug)
}

export function getAllItems(): ThingsToDoItem[] {
  return thingsToDoItems.sort((a, b) => (a.sortRank || 999) - (b.sortRank || 999))
}

export function getItemsGroupedByCategory(): Record<string, ThingsToDoItem[]> {
  const grouped: Record<string, ThingsToDoItem[]> = {}
  
  thingsToDoCategories.forEach(category => {
    grouped[category.slug] = getItemsByCategory(category.slug)
  })
  
  return grouped
}

