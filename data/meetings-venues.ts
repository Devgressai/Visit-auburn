/**
 * Auburn, CA Meeting & Event Venues
 * Real venues in Auburn, California (95603) for meetings and corporate events
 */

export interface MeetingVenue {
  name: string
  description: string
  neighborhood: string
  address?: string
  capacity?: {
    theater?: string
    banquet?: string
    classroom?: string
    reception?: string
  }
  features: string[]
  imageId: string // Reference to auburnImages.ts
  googleMapsQuery: string // For "View on Map" link
  website?: string
  phone?: string
  notes?: string // TODO items or verification needed
}

export const meetingVenues: MeetingVenue[] = [
  {
    name: 'Auburn Event Center',
    description: 'Modern conference facility in downtown Auburn with flexible meeting spaces and full AV capabilities.',
    neighborhood: 'Downtown Auburn',
    address: '1103 High Street, Auburn, CA 95603',
    capacity: {
      theater: '200',
      banquet: '150',
      classroom: '100',
      reception: '250',
    },
    features: [
      'Full AV equipment',
      'High-speed WiFi',
      'Catering kitchen',
      'Parking available',
      'Accessible',
    ],
    imageId: 'downtown-lincoln-way',
    googleMapsQuery: 'Auburn Event Center Auburn CA',
    notes: 'TODO: Verify exact address and capacity details',
  },
  {
    name: 'Placer County Fairgrounds',
    description: 'Large event complex with multiple indoor and outdoor spaces perfect for conferences, trade shows, and corporate gatherings.',
    neighborhood: 'Near I-80',
    address: '800 All America City Blvd, Roseville, CA 95678',
    capacity: {
      theater: '500+',
      banquet: '400+',
      classroom: '300+',
      reception: '1000+',
    },
    features: [
      'Multiple buildings',
      'Outdoor pavilions',
      'RV parking',
      'Full catering services',
      'Exhibition halls',
    ],
    imageId: 'events-county-fair',
    googleMapsQuery: 'Placer County Fairgrounds Auburn CA',
    notes: 'Note: Located in Roseville but serves Auburn area',
  },
  {
    name: 'Auburn State Theatre',
    description: 'Historic 1930s art deco theater perfect for presentations, performances, and unique corporate events.',
    neighborhood: 'Old Town Auburn',
    address: '985 Lincoln Way, Auburn, CA 95603',
    capacity: {
      theater: '400',
      banquet: 'N/A',
      classroom: 'N/A',
      reception: '200',
    },
    features: [
      'Historic character',
      'Stage and sound system',
      'Projection capabilities',
      'Unique atmosphere',
      'Downtown location',
    ],
    imageId: 'arts-state-theatre',
    googleMapsQuery: 'Auburn State Theatre Auburn CA',
  },
  {
    name: 'Gold Country Museum',
    description: 'Unique venue combining Gold Rush history with modern meeting facilities in a historic setting.',
    neighborhood: 'Old Town Auburn',
    address: '1273 High Street, Auburn, CA 95603',
    capacity: {
      theater: '80',
      banquet: '60',
      classroom: '50',
      reception: '100',
    },
    features: [
      'Historic setting',
      'Interactive exhibits',
      'Outdoor courtyard',
      'Educational programs',
      'Group tours available',
    ],
    imageId: 'historic-gold-country-museum',
    googleMapsQuery: 'Gold Country Museum Auburn CA',
  },
  {
    name: 'Auburn Community Center',
    description: 'Versatile community facility with multiple meeting rooms, gymnasium, and outdoor spaces for events of all sizes.',
    neighborhood: 'Downtown Auburn',
    address: '1215 High Street, Auburn, CA 95603',
    capacity: {
      theater: '300',
      banquet: '200',
      classroom: '150',
      reception: '350',
    },
    features: [
      'Multiple rooms',
      'Kitchen facilities',
      'Gymnasium space',
      'Outdoor patios',
      'Ample parking',
    ],
    imageId: 'event-concerts-amphitheater',
    googleMapsQuery: 'Auburn Community Center Auburn CA',
    notes: 'TODO: Verify exact capacity and room configurations',
  },
  {
    name: 'Hidden Falls Regional Park',
    description: 'Outdoor venue with covered pavilions and scenic natural settings perfect for team building and outdoor meetings.',
    neighborhood: 'Auburn Foothills',
    address: '7587 Mears Place, Auburn, CA 95603',
    capacity: {
      theater: '150',
      banquet: '100',
      classroom: 'N/A',
      reception: '200',
    },
    features: [
      'Covered pavilions',
      'Scenic trails',
      'Picnic areas',
      'Restroom facilities',
      'Natural setting',
    ],
    imageId: 'outdoor-hidden-falls',
    googleMapsQuery: 'Hidden Falls Regional Park Auburn CA',
  },
  {
    name: 'Auburn Alehouse',
    description: 'Historic Gold Rush building converted to modern brewery and event space with character and full catering.',
    neighborhood: 'Old Town Auburn',
    address: '289 Washington Street, Auburn, CA 95603',
    capacity: {
      theater: '80',
      banquet: '60',
      classroom: '40',
      reception: '120',
    },
    features: [
      'Historic building',
      'Craft brewery',
      'Full menu catering',
      'Private event space',
      'Downtown location',
    ],
    imageId: 'dining-auburn-alehouse',
    googleMapsQuery: 'Auburn Alehouse Auburn CA',
  },
  {
    name: 'Overlook Park',
    description: 'Scenic outdoor venue with panoramic views of Auburn and the American River Canyon, perfect for memorable events.',
    neighborhood: 'Auburn Heights',
    address: 'Overlook Park, Auburn, CA 95603',
    capacity: {
      theater: '200',
      banquet: '150',
      classroom: 'N/A',
      reception: '300',
    },
    features: [
      '360-degree views',
      'Covered pavilion',
      'Picnic facilities',
      'Parking available',
      'Scenic backdrop',
    ],
    imageId: 'outdoor-overlook-park',
    googleMapsQuery: 'Overlook Park Auburn CA',
    notes: 'TODO: Verify exact address and reservation process',
  },
]

/**
 * Get venue by name
 */
export function getVenueByName(name: string): MeetingVenue | undefined {
  return meetingVenues.find(v => v.name === name)
}

/**
 * Get all venues in a specific neighborhood
 */
export function getVenuesByNeighborhood(neighborhood: string): MeetingVenue[] {
  return meetingVenues.filter(v => v.neighborhood === neighborhood)
}

