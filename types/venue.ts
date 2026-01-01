/**
 * Venue Schema for Events
 * Physical locations where events take place
 */

export interface Venue {
  _id: string
  name: string
  slug: { current: string }
  description: string
  image?: {
    url: string
    alt?: string
  }
  location: {
    address?: string
    city: string
    state: string
    zip?: string
    coordinates?: {
      lat: number
      lng: number
    }
  }
  capacity?: number
  amenities?: string[]
  website?: string
  phone?: string
  email?: string
  categories?: string[] // indoor, outdoor, historic, modern, etc.
}

// Sanity Schema Definition (for reference)
export const venueSchema = {
  name: 'venue',
  title: 'Event Venue',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Venue Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'longDescription',
      title: 'Long Description',
      type: 'blockContent',
    },
    {
      name: 'image',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        },
      ],
    },
    {
      name: 'images',
      title: 'Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            },
          ],
        },
      ],
    },
    {
      name: 'location',
      title: 'Location',
      type: 'object',
      fields: [
        {
          name: 'address',
          title: 'Street Address',
          type: 'string',
        },
        {
          name: 'city',
          title: 'City',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'state',
          title: 'State',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'zip',
          title: 'ZIP Code',
          type: 'string',
        },
        {
          name: 'coordinates',
          title: 'GPS Coordinates',
          type: 'geopoint',
        },
      ],
    },
    {
      name: 'capacity',
      title: 'Maximum Capacity',
      type: 'number',
      description: 'Maximum number of attendees',
    },
    {
      name: 'capacityDetails',
      title: 'Capacity Details',
      type: 'object',
      fields: [
        {
          name: 'theater',
          title: 'Theater Style',
          type: 'number',
        },
        {
          name: 'banquet',
          title: 'Banquet Style',
          type: 'number',
        },
        {
          name: 'classroom',
          title: 'Classroom Style',
          type: 'number',
        },
        {
          name: 'reception',
          title: 'Standing Reception',
          type: 'number',
        },
      ],
    },
    {
      name: 'amenities',
      title: 'Amenities',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Parking', value: 'parking' },
          { title: 'Wheelchair Accessible', value: 'accessible' },
          { title: 'WiFi', value: 'wifi' },
          { title: 'AV Equipment', value: 'av-equipment' },
          { title: 'Catering Available', value: 'catering' },
          { title: 'Bar/Alcohol Service', value: 'bar' },
          { title: 'Kitchen', value: 'kitchen' },
          { title: 'Stage', value: 'stage' },
          { title: 'Dance Floor', value: 'dance-floor' },
          { title: 'Outdoor Space', value: 'outdoor' },
          { title: 'Climate Control', value: 'climate-control' },
          { title: 'Green Room', value: 'green-room' },
          { title: 'Restrooms', value: 'restrooms' },
        ],
      },
    },
    {
      name: 'categories',
      title: 'Venue Categories',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Indoor', value: 'indoor' },
          { title: 'Outdoor', value: 'outdoor' },
          { title: 'Historic', value: 'historic' },
          { title: 'Modern', value: 'modern' },
          { title: 'Conference Center', value: 'conference' },
          { title: 'Hotel', value: 'hotel' },
          { title: 'Park', value: 'park' },
          { title: 'Theater', value: 'theater' },
          { title: 'Museum', value: 'museum' },
          { title: 'Fairgrounds', value: 'fairgrounds' },
        ],
      },
    },
    {
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        {
          name: 'website',
          title: 'Website',
          type: 'url',
        },
        {
          name: 'phone',
          title: 'Phone',
          type: 'string',
        },
        {
          name: 'email',
          title: 'Email',
          type: 'string',
        },
      ],
    },
    {
      name: 'pricing',
      title: 'Pricing Information',
      type: 'object',
      fields: [
        {
          name: 'startingPrice',
          title: 'Starting Price',
          type: 'number',
        },
        {
          name: 'priceRange',
          title: 'Price Range',
          type: 'string',
          options: {
            list: ['$', '$$', '$$$', '$$$$'],
          },
        },
        {
          name: 'pricingNotes',
          title: 'Pricing Notes',
          type: 'text',
          rows: 2,
        },
      ],
    },
    {
      name: 'isFeatured',
      title: 'Featured Venue',
      type: 'boolean',
      description: 'Show this venue prominently',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'location.city',
      media: 'image',
    },
  },
}

// Example venue data
export const exampleVenues: Venue[] = [
  {
    _id: '1',
    name: 'Placer County Fairgrounds',
    slug: { current: 'placer-county-fairgrounds' },
    description: 'Large outdoor and indoor event space perfect for festivals, concerts, and community gatherings',
    image: {
      url: '/images/venue-fairgrounds.jpg',
      alt: 'Placer County Fairgrounds',
    },
    location: {
      address: '800 All America City Blvd',
      city: 'Roseville',
      state: 'CA',
      zip: '95678',
    },
    capacity: 5000,
    amenities: ['parking', 'accessible', 'outdoor', 'restrooms', 'kitchen'],
    categories: ['outdoor', 'fairgrounds'],
  },
  {
    _id: '2',
    name: 'Historic Old Town Auburn',
    slug: { current: 'historic-old-town' },
    description: 'Charming Gold Rush era downtown perfect for street festivals and community events',
    image: {
      url: '/images/venue-oldtown.jpg',
      alt: 'Old Town Auburn',
    },
    location: {
      address: 'High Street',
      city: 'Auburn',
      state: 'CA',
      zip: '95603',
    },
    capacity: 2000,
    amenities: ['accessible', 'outdoor', 'historic'],
    categories: ['outdoor', 'historic'],
  },
  {
    _id: '3',
    name: 'Gold Country Community Center',
    slug: { current: 'gold-country-community-center' },
    description: 'Modern facility with flexible event spaces for meetings, receptions, and performances',
    location: {
      city: 'Auburn',
      state: 'CA',
      zip: '95603',
    },
    capacity: 300,
    amenities: ['parking', 'accessible', 'wifi', 'av-equipment', 'catering', 'climate-control'],
    categories: ['indoor', 'modern', 'conference'],
  },
]



