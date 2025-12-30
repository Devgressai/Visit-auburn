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
  {
    name: 'Auburn Veterans Memorial Building',
    description: 'Historic community building with grand ballroom and flexible event spaces for large meetings and corporate gatherings.',
    neighborhood: 'Downtown Auburn',
    address: '100 East Street, Auburn, CA 95603',
    capacity: {
      theater: '350',
      banquet: '250',
      classroom: '200',
      reception: '400',
    },
    features: [
      'Grand ballroom',
      'Multiple meeting rooms',
      'Kitchen facilities',
      'Stage and AV',
      'Historic character',
      'Ample parking',
    ],
    imageId: 'weddings-veterans-memorial',
    googleMapsQuery: 'Auburn Veterans Memorial Building 95603',
  },
  {
    name: 'The Ridge Golf Course & Events Center',
    description: 'Scenic golf course venue with modern event facilities and panoramic Sierra Nevada views, ideal for corporate retreats.',
    neighborhood: 'Auburn Foothills',
    address: '2020 Golf Course Road, Auburn, CA 95603',
    capacity: {
      theater: '180',
      banquet: '150',
      classroom: '100',
      reception: '200',
    },
    features: [
      'Modern event center',
      'Golf course views',
      'Full catering',
      'AV equipment',
      'Outdoor terraces',
      'Parking available',
    ],
    imageId: 'weddings-ridge-golf-course',
    googleMapsQuery: 'The Ridge Golf Course Events Center Auburn CA',
    website: 'https://ridgegc.com',
  },
  {
    name: 'Bernhard Museum Complex',
    description: 'Historic museum complex with meeting spaces in authentic Gold Rush era buildings, perfect for unique corporate events.',
    neighborhood: 'Old Town Auburn',
    address: '291 Auburn Folsom Road, Auburn, CA 95603',
    capacity: {
      theater: '60',
      banquet: '50',
      classroom: '40',
      reception: '80',
    },
    features: [
      'Historic setting',
      'Museum exhibits',
      'Outdoor courtyard',
      'Educational programs',
      'Unique atmosphere',
    ],
    imageId: 'historic-gold-country-museum',
    googleMapsQuery: 'Bernhard Museum Auburn CA',
  },
  {
    name: 'Auburn Library Community Room',
    description: 'Modern community meeting space in the Auburn Library with flexible setup options and full technology support.',
    neighborhood: 'Downtown Auburn',
    address: '350 Nevada Street, Auburn, CA 95603',
    capacity: {
      theater: '100',
      banquet: '60',
      classroom: '50',
      reception: '80',
    },
    features: [
      'Modern facility',
      'Full AV equipment',
      'WiFi included',
      'Accessible',
      'Parking available',
    ],
    imageId: 'downtown-lincoln-way',
    googleMapsQuery: 'Auburn Library Community Room Auburn CA',
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

