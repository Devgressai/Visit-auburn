/**
 * Comprehensive Event Venues in Auburn, CA (95603) and Nearby
 * Combines meeting venues, wedding venues, and general event spaces
 */

export interface Venue {
  id: string
  name: string
  description: string
  location: {
    city: string
    state: string
    zip?: string
    address?: string
    areaLabel: string // "Auburn 95603" or "Near Auburn / Placer County"
  }
  capacity?: {
    theater?: string
    banquet?: string
    classroom?: string
    reception?: string
    max?: number
  }
  categories: string[] // indoor, outdoor, historic, modern, conference, hotel, park, theater, museum, fairgrounds
  amenities: string[] // parking, accessible, wifi, av-equipment, catering, bar, kitchen, stage, outdoor, etc.
  imageId: string // Reference to auburnImages.ts
  googleMapsQuery: string
  website?: string
  phone?: string
  notes?: string
}

export const allVenues: Venue[] = [
  // Auburn 95603 Venues
  {
    id: 'auburn-event-center',
    name: 'Auburn Event Center',
    description: 'Modern conference facility in downtown Auburn with flexible meeting spaces and full AV capabilities.',
    location: {
      city: 'Auburn',
      state: 'CA',
      zip: '95603',
      address: '1103 High Street',
      areaLabel: 'Auburn 95603',
    },
    capacity: {
      theater: '200',
      banquet: '150',
      classroom: '100',
      reception: '250',
      max: 250,
    },
    categories: ['indoor', 'modern', 'conference'],
    amenities: ['parking', 'accessible', 'wifi', 'av-equipment', 'catering', 'kitchen'],
    imageId: 'downtown-lincoln-way',
    googleMapsQuery: 'Auburn Event Center Auburn CA',
    notes: 'TODO: Verify exact address and capacity details',
  },
  {
    id: 'auburn-state-theatre',
    name: 'Auburn State Theatre',
    description: 'Historic 1930s art deco theater perfect for presentations, performances, and unique corporate events.',
    location: {
      city: 'Auburn',
      state: 'CA',
      zip: '95603',
      address: '985 Lincoln Way',
      areaLabel: 'Auburn 95603',
    },
    capacity: {
      theater: '400',
      reception: '200',
      max: 400,
    },
    categories: ['indoor', 'historic', 'theater'],
    amenities: ['parking', 'accessible', 'wifi', 'av-equipment', 'stage'],
    imageId: 'arts-state-theatre',
    googleMapsQuery: 'Auburn State Theatre Auburn CA',
  },
  {
    id: 'gold-country-museum',
    name: 'Gold Country Museum',
    description: 'Unique venue combining Gold Rush history with modern meeting facilities in a historic setting.',
    location: {
      city: 'Auburn',
      state: 'CA',
      zip: '95603',
      address: '1273 High Street',
      areaLabel: 'Auburn 95603',
    },
    capacity: {
      theater: '80',
      banquet: '60',
      classroom: '50',
      reception: '100',
      max: 100,
    },
    categories: ['indoor', 'historic', 'museum'],
    amenities: ['parking', 'accessible', 'outdoor'],
    imageId: 'historic-gold-country-museum',
    googleMapsQuery: 'Gold Country Museum Auburn CA',
  },
  {
    id: 'auburn-community-center',
    name: 'Auburn Community Center',
    description: 'Versatile community facility with multiple meeting rooms, gymnasium, and outdoor spaces for events of all sizes.',
    location: {
      city: 'Auburn',
      state: 'CA',
      zip: '95603',
      address: '1215 High Street',
      areaLabel: 'Auburn 95603',
    },
    capacity: {
      theater: '300',
      banquet: '200',
      classroom: '150',
      reception: '350',
      max: 350,
    },
    categories: ['indoor', 'modern', 'conference'],
    amenities: ['parking', 'accessible', 'wifi', 'kitchen', 'outdoor'],
    imageId: 'event-concerts-amphitheater',
    googleMapsQuery: 'Auburn Community Center Auburn CA',
    notes: 'TODO: Verify exact capacity and room configurations',
  },
  {
    id: 'hidden-falls-park',
    name: 'Hidden Falls Regional Park',
    description: 'Outdoor venue with covered pavilions and scenic natural settings perfect for team building and outdoor meetings.',
    location: {
      city: 'Auburn',
      state: 'CA',
      zip: '95603',
      address: '7587 Mears Place',
      areaLabel: 'Auburn 95603',
    },
    capacity: {
      theater: '150',
      banquet: '100',
      reception: '200',
      max: 200,
    },
    categories: ['outdoor', 'park'],
    amenities: ['parking', 'accessible', 'outdoor', 'restrooms'],
    imageId: 'outdoor-hidden-falls',
    googleMapsQuery: 'Hidden Falls Regional Park Auburn CA',
  },
  {
    id: 'auburn-alehouse',
    name: 'Auburn Alehouse',
    description: 'Historic Gold Rush building converted to modern brewery and event space with character and full catering.',
    location: {
      city: 'Auburn',
      state: 'CA',
      zip: '95603',
      address: '289 Washington Street',
      areaLabel: 'Auburn 95603',
    },
    capacity: {
      theater: '80',
      banquet: '60',
      classroom: '40',
      reception: '120',
      max: 120,
    },
    categories: ['indoor', 'historic'],
    amenities: ['parking', 'catering', 'bar'],
    imageId: 'dining-auburn-alehouse',
    googleMapsQuery: 'Auburn Alehouse Auburn CA',
  },
  {
    id: 'overlook-park',
    name: 'Overlook Park',
    description: 'Scenic outdoor venue with panoramic views of Auburn and the American River Canyon, perfect for memorable events.',
    location: {
      city: 'Auburn',
      state: 'CA',
      zip: '95603',
      areaLabel: 'Auburn 95603',
    },
    capacity: {
      theater: '200',
      banquet: '150',
      reception: '300',
      max: 300,
    },
    categories: ['outdoor', 'park'],
    amenities: ['parking', 'outdoor'],
    imageId: 'outdoor-overlook-park',
    googleMapsQuery: 'Overlook Park Auburn CA',
    notes: 'TODO: Verify exact address and reservation process',
  },
  {
    id: 'park-victorian',
    name: 'Park Victorian',
    description: 'Historic Victorian home with elegant gardens and vintage charm, perfect for intimate ceremonies and receptions.',
    location: {
      city: 'Auburn',
      state: 'CA',
      zip: '95603',
      areaLabel: 'Auburn 95603',
    },
    capacity: {
      banquet: '150',
      reception: '150',
      max: 150,
    },
    categories: ['indoor', 'outdoor', 'historic'],
    amenities: ['parking', 'outdoor', 'catering'],
    imageId: 'weddings-park-victorian',
    googleMapsQuery: 'Park Victorian Auburn CA 95603',
    website: 'https://parkvictorian.com',
  },
  {
    id: 'ridge-golf-course',
    name: 'The Ridge Golf Course & Events Center',
    description: 'Scenic golf course venue with panoramic Sierra Nevada views, ideal for outdoor ceremonies and elegant receptions.',
    location: {
      city: 'Auburn',
      state: 'CA',
      zip: '95603',
      areaLabel: 'Auburn 95603',
    },
    capacity: {
      banquet: '200+',
      reception: '200+',
      max: 200,
    },
    categories: ['indoor', 'outdoor'],
    amenities: ['parking', 'accessible', 'catering', 'bar', 'outdoor'],
    imageId: 'weddings-ridge-golf-course',
    googleMapsQuery: 'The Ridge Golf Course Events Center Auburn CA',
    website: 'https://ridgegc.com',
  },
  {
    id: 'auburn-garden-theater',
    name: 'Auburn Garden Theater',
    description: 'Charming outdoor theater venue with lush gardens and historic character, perfect for unique ceremonies.',
    location: {
      city: 'Auburn',
      state: 'CA',
      zip: '95603',
      areaLabel: 'Auburn 95603',
    },
    capacity: {
      theater: '100-200',
      reception: '100-200',
      max: 200,
    },
    categories: ['outdoor', 'theater', 'historic'],
    amenities: ['parking', 'outdoor', 'stage'],
    imageId: 'weddings-garden-theater',
    googleMapsQuery: 'Auburn Garden Theater Auburn CA',
  },
  {
    id: 'veterans-memorial',
    name: 'Auburn Veterans Memorial Building',
    description: 'Historic community building with grand ballroom and flexible event spaces for large receptions.',
    location: {
      city: 'Auburn',
      state: 'CA',
      zip: '95603',
      areaLabel: 'Auburn 95603',
    },
    capacity: {
      banquet: '300+',
      reception: '300+',
      max: 300,
    },
    categories: ['indoor', 'historic'],
    amenities: ['parking', 'accessible', 'kitchen', 'stage'],
    imageId: 'weddings-veterans-memorial',
    googleMapsQuery: 'Auburn Veterans Memorial Building 95603',
  },
  {
    id: 'old-town-historic',
    name: 'Old Town Auburn Historic District',
    description: 'Charming Gold Rush era downtown with historic buildings and courtyards for ceremonies and photos.',
    location: {
      city: 'Auburn',
      state: 'CA',
      zip: '95603',
      areaLabel: 'Auburn 95603',
    },
    capacity: {
      reception: '2000',
      max: 2000,
    },
    categories: ['outdoor', 'historic'],
    amenities: ['parking', 'accessible', 'outdoor'],
    imageId: 'weddings-old-town-auburn-wedding',
    googleMapsQuery: 'Old Town Auburn Historic District CA 95603',
  },
  // Near Auburn / Placer County Venues
  {
    id: 'placer-fairgrounds',
    name: 'Placer County Fairgrounds',
    description: 'Large outdoor and indoor event spaces perfect for big celebrations with ample parking and facilities.',
    location: {
      city: 'Roseville',
      state: 'CA',
      zip: '95678',
      address: '800 All America City Blvd',
      areaLabel: 'Near Auburn / Placer County',
    },
    capacity: {
      theater: '500+',
      banquet: '400+',
      classroom: '300+',
      reception: '1000+',
      max: 5000,
    },
    categories: ['indoor', 'outdoor', 'fairgrounds'],
    amenities: ['parking', 'accessible', 'wifi', 'catering', 'kitchen', 'outdoor'],
    imageId: 'events-county-fair',
    googleMapsQuery: 'Placer County Fairgrounds Roseville CA',
    notes: 'Note: Located in Roseville but serves Auburn area',
  },
  {
    id: 'winery-venues',
    name: 'Winery Venues (Local Wineries)',
    description: 'Local wineries in the Gold Country foothills offering romantic vineyard settings with sunset views.',
    location: {
      city: 'Near Auburn',
      state: 'CA',
      areaLabel: 'Near Auburn / Placer County',
    },
    capacity: {
      banquet: '50-150',
      reception: '50-150',
      max: 150,
    },
    categories: ['indoor', 'outdoor'],
    amenities: ['parking', 'catering', 'bar', 'outdoor'],
    imageId: 'weddings-winery-venue',
    googleMapsQuery: 'Wedding venues wineries near Auburn CA',
  },
]

/**
 * Get all venues
 */
export function getAllVenues(): Venue[] {
  return allVenues
}

/**
 * Get venues by category
 */
export function getVenuesByCategory(category: string): Venue[] {
  return allVenues.filter(v => v.categories.includes(category))
}

/**
 * Get venues by location (Auburn vs Near Auburn)
 */
export function getVenuesByLocation(location: 'auburn' | 'near'): Venue[] {
  if (location === 'auburn') {
    return allVenues.filter(v => v.location.areaLabel.includes('Auburn 95603'))
  }
  return allVenues.filter(v => v.location.areaLabel.includes('Near Auburn'))
}

/**
 * Get all unique categories
 */
export function getAllCategories(): string[] {
  const categories = new Set<string>()
  allVenues.forEach(venue => {
    venue.categories.forEach(cat => categories.add(cat))
  })
  return Array.from(categories).sort()
}

