export interface Slug {
  current: string
  _type: 'slug'
}

export interface Image {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
    url?: string  // For static content
  }
  alt?: string
  mockUrl?: string  // For static/mock content
}

export interface Location {
  address?: string
  city?: string
  state?: string
  zip?: string
  coordinates?: {
    lat: number
    lng: number
  }
}

export interface Contact {
  phone?: string
  email?: string
  website?: string
}

export interface Accommodation {
  _id: string
  _type: 'accommodation'
  title: string
  slug: Slug
  excerpt?: string
  description?: any
  featuredImage?: Image
  gallery?: Image[]
  category?: string
  location?: Location
  contact?: Contact
  priceRange?: string
  rating?: number
  amenities?: string[]
  featured?: boolean
  relatedAccommodations?: Accommodation[]
}

export interface Activity {
  _id: string
  _type: 'activity'
  title: string
  slug: Slug
  excerpt?: string
  description?: any
  featuredImage?: Image
  gallery?: Image[]
  category?: string
  location?: Location
  contact?: Contact
  duration?: string
  priceRange?: string
  featured?: boolean
  relatedActivities?: Activity[]
}

export interface Dining {
  _id: string
  _type: 'dining'
  title: string
  slug: Slug
  excerpt?: string
  description?: any
  featuredImage?: Image
  gallery?: Image[]
  category?: string
  cuisine?: string
  location?: Location
  contact?: Contact
  priceRange?: string
  featured?: boolean
  relatedDining?: Dining[]
}

export interface Event {
  _id: string
  _type: 'event'
  title: string
  slug: Slug
  excerpt?: string
  description?: any
  featuredImage?: Image
  gallery?: Image[]
  startDate: string
  endDate?: string
  location?: Location
  category?: string
  featured?: boolean
  relatedEvents?: Event[]
}

export interface Editorial {
  _id: string
  _type: 'editorial'
  title: string
  slug: Slug
  excerpt?: string
  content?: any
  featuredImage?: Image
  publishedAt: string
  category?: string
  author?: {
    _id: string
    name: string
    image?: Image
  }
}

export interface NavigationItem {
  _id: string
  title: string
  slug?: Slug
  description?: string
  children?: NavigationItem[]
}

export interface Navigation {
  _id: string
  _type: 'navigation'
  mainNavigation: NavigationItem[]
}

export interface Homepage {
  _id: string
  _type: 'homepage'
  heroSection?: {
    title?: string
    subtitle?: string
    image?: Image
    ctaText?: string
    ctaLink?: string
  }
  accommodationsSection?: {
    title?: string
    description?: string
    accommodations?: Accommodation[]
  }
  activitiesSection?: {
    title?: string
    description?: string
    activities?: Activity[]
  }
  diningSection?: {
    title?: string
    description?: string
    dining?: Dining[]
  }
  eventsSection?: {
    title?: string
    description?: string
    events?: Event[]
  }
}

