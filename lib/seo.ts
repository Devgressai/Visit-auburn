import { Metadata } from 'next'

// Re-export constants from lib/seo/site.ts
export { SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE } from './seo/site'

// Re-export functions from lib/seo modules
export { buildMetadata, truncateDescription } from './seo/metadata'
export { organizationJsonLd, breadcrumbJsonLd, localBusinessJsonLd, touristAttractionJsonLd, eventJsonLd, articleJsonLd, itemListJsonLd } from './seo/jsonld'

// Legacy exports for backwards compatibility - these duplicate the functions below, removing to avoid conflicts
// export { buildMetadata as generateMetadata } from './seo/metadata'
// export { organizationJsonLd as generateOrganizationSchema } from './seo/jsonld'
// export { breadcrumbJsonLd as generateBreadcrumbSchema } from './seo/jsonld'
// export { eventJsonLd as generateEventSchema } from './seo/jsonld'
// export { localBusinessJsonLd as generateLocalBusinessSchema } from './seo/jsonld'
// export { articleJsonLd as generateArticleSchema } from './seo/jsonld'

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Visit Auburn',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://visitauburn.com',
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://visitauburn.com'}/logo.png`,
    sameAs: [],
  }
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function generateLocalBusinessSchema(data: {
  name: string
  description: string
  address?: {
    street: string
    city: string
    state: string
    zip: string
  }
  phone?: string
  image?: string
  priceRange?: string
  rating?: number
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: data.name,
    description: data.description,
    ...(data.address && {
      address: {
        '@type': 'PostalAddress',
        streetAddress: data.address.street,
        addressLocality: data.address.city,
        addressRegion: data.address.state,
        postalCode: data.address.zip,
      },
    }),
    ...(data.phone && { telephone: data.phone }),
    ...(data.image && { image: data.image }),
    ...(data.priceRange && { priceRange: data.priceRange }),
    ...(data.rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: data.rating,
      },
    }),
  }
}

export function generateEventSchema(data: {
  name: string
  description: string
  startDate: string
  endDate?: string
  location?: {
    name: string
    address?: {
      street: string
      city: string
      state: string
      zip: string
    }
  }
  image?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: data.name,
    description: data.description,
    startDate: data.startDate,
    ...(data.endDate && { endDate: data.endDate }),
    ...(data.location && {
      location: {
        '@type': 'Place',
        name: data.location.name,
        ...(data.location.address && {
          address: {
            '@type': 'PostalAddress',
            streetAddress: data.location.address.street,
            addressLocality: data.location.address.city,
            addressRegion: data.location.address.state,
            postalCode: data.location.address.zip,
          },
        }),
      },
    }),
    ...(data.image && { image: data.image }),
  }
}

export function generateArticleSchema(data: {
  headline: string
  description: string
  image?: string
  datePublished: string
  dateModified?: string
  author?: {
    name: string
    image?: string
  }
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.headline,
    description: data.description,
    ...(data.image && { image: data.image }),
    datePublished: data.datePublished,
    ...(data.dateModified && { dateModified: data.dateModified }),
    ...(data.author && {
      author: {
        '@type': 'Person',
        name: data.author.name,
        ...(data.author.image && { image: data.author.image }),
      },
    }),
  }
}

