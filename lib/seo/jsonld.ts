import { SITE_URL } from './site'

/**
 * Generate Organization JSON-LD schema
 */
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Visit Auburn',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    sameAs: [],
  }
}

/**
 * Generate BreadcrumbList JSON-LD schema
 */
export function breadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  }
}

/**
 * Generate LocalBusiness JSON-LD schema for accommodations and dining
 */
export function localBusinessJsonLd(place: {
  name: string
  description: string
  address?: {
    street?: string
    city?: string
    state?: string
    zip?: string
  }
  phone?: string
  image?: string
  priceRange?: string
  rating?: number
  url?: string
}) {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: place.name,
    description: place.description,
  }

  if (place.address) {
    schema.address = {
      '@type': 'PostalAddress',
      ...(place.address.street && { streetAddress: place.address.street }),
      ...(place.address.city && { addressLocality: place.address.city }),
      ...(place.address.state && { addressRegion: place.address.state }),
      ...(place.address.zip && { postalCode: place.address.zip }),
    }
  }

  if (place.phone) {
    schema.telephone = place.phone
  }

  if (place.image) {
    schema.image = place.image.startsWith('http') ? place.image : `${SITE_URL}${place.image}`
  }

  if (place.priceRange) {
    schema.priceRange = place.priceRange
  }

  if (place.rating) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: place.rating,
    }
  }

  if (place.url) {
    schema.url = place.url.startsWith('http') ? place.url : `${SITE_URL}${place.url}`
  }

  return schema
}

/**
 * Generate TouristAttraction JSON-LD schema for activities
 */
export function touristAttractionJsonLd(activity: {
  name: string
  description: string
  address?: {
    street?: string
    city?: string
    state?: string
    zip?: string
  }
  image?: string
  url?: string
}) {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: activity.name,
    description: activity.description,
  }

  if (activity.address) {
    schema.address = {
      '@type': 'PostalAddress',
      ...(activity.address.street && { streetAddress: activity.address.street }),
      ...(activity.address.city && { addressLocality: activity.address.city }),
      ...(activity.address.state && { addressRegion: activity.address.state }),
      ...(activity.address.zip && { postalCode: activity.address.zip }),
    }
  }

  if (activity.image) {
    schema.image = activity.image.startsWith('http') ? activity.image : `${SITE_URL}${activity.image}`
  }

  if (activity.url) {
    schema.url = activity.url.startsWith('http') ? activity.url : `${SITE_URL}${activity.url}`
  }

  return schema
}

/**
 * Generate Event JSON-LD schema
 */
export function eventJsonLd(event: {
  name: string
  description: string
  startDate: string
  endDate?: string
  location?: {
    name?: string
    address?: {
      street?: string
      city?: string
      state?: string
      zip?: string
    }
  }
  image?: string
  url?: string
}) {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.name,
    description: event.description,
    startDate: event.startDate,
  }

  if (event.endDate) {
    schema.endDate = event.endDate
  }

  if (event.location) {
    schema.location = {
      '@type': 'Place',
      ...(event.location.name && { name: event.location.name }),
      ...(event.location.address && {
        address: {
          '@type': 'PostalAddress',
          ...(event.location.address.street && { streetAddress: event.location.address.street }),
          ...(event.location.address.city && { addressLocality: event.location.address.city }),
          ...(event.location.address.state && { addressRegion: event.location.address.state }),
          ...(event.location.address.zip && { postalCode: event.location.address.zip }),
        },
      }),
    }
  }

  if (event.image) {
    schema.image = event.image.startsWith('http') ? event.image : `${SITE_URL}${event.image}`
  }

  if (event.url) {
    schema.url = event.url.startsWith('http') ? event.url : `${SITE_URL}${event.url}`
  }

  return schema
}

/**
 * Generate Article JSON-LD schema for editorial content
 */
export function articleJsonLd(editorial: {
  headline: string
  description: string
  image?: string
  datePublished: string
  dateModified?: string
  author?: {
    name: string
    image?: string
  }
  url?: string
}) {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: editorial.headline,
    description: editorial.description,
    datePublished: editorial.datePublished,
  }

  if (editorial.dateModified) {
    schema.dateModified = editorial.dateModified
  }

  if (editorial.image) {
    schema.image = editorial.image.startsWith('http') ? editorial.image : `${SITE_URL}${editorial.image}`
  }

  if (editorial.author) {
    schema.author = {
      '@type': 'Person',
      name: editorial.author.name,
      ...(editorial.author.image && {
        image: editorial.author.image.startsWith('http')
          ? editorial.author.image
          : `${SITE_URL}${editorial.author.image}`,
      }),
    }
  }

  if (editorial.url) {
    schema.url = editorial.url.startsWith('http') ? editorial.url : `${SITE_URL}${editorial.url}`
  }

  return schema
}

