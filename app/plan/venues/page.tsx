import { buildMetadata, SITE_URL } from '@/lib/seo'
import { RelatedPages } from '@/components/ui/RelatedPages'
import type { Metadata } from 'next'
import { VenuesPageClient } from './VenuesPageClient'
import { organizationJsonLd, touristDestinationJsonLd, breadcrumbJsonLd, webPageJsonLd } from '@/lib/seo/jsonld'
import { generateBreadcrumbs } from '@/lib/routes'
import { allVenues } from '@/data/venues'
import { getAuburnImagePath } from '@/data/auburnImages'

export const revalidate = 3600

export const metadata: Metadata = buildMetadata({
  title: 'Event Venues in Auburn CA | Weddings, Meetings & Outdoor Events in Gold Country',
  description: 'Discover the best event venues in Auburn, CA — from historic halls and scenic outdoor spaces to modern meeting venues in California\'s Gold Country.',
  canonical: `${SITE_URL}/plan/venues`,
})

// Generate EventVenue schema for each venue
function eventVenueJsonLd(venue: typeof allVenues[0]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'EventVenue',
    name: venue.name,
    description: venue.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: venue.location.city,
      addressRegion: venue.location.state,
      ...(venue.location.zip && { postalCode: venue.location.zip }),
      ...(venue.location.address && { streetAddress: venue.location.address }),
    },
    ...(venue.capacity?.max && { maximumAttendeeCapacity: venue.capacity.max }),
    ...(venue.website && { url: venue.website }),
    ...(venue.phone && { telephone: venue.phone }),
    image: `${SITE_URL}${getAuburnImagePath(venue.imageId)}`,
  }
}

export default function VenuesPage() {
  const breadcrumbs = generateBreadcrumbs('/plan/venues')
  const breadcrumbSchema = breadcrumbJsonLd(breadcrumbs)
  const organizationSchema = organizationJsonLd()
  const destinationSchema = touristDestinationJsonLd()
  const pageSchema = webPageJsonLd({
    name: 'Event Venues in Auburn, California',
    description: 'Discover the best event venues in Auburn, CA — from historic halls and scenic outdoor spaces to modern meeting venues in California\'s Gold Country.',
    url: `${SITE_URL}/plan/venues`,
    breadcrumbs,
  })

  // Generate venue schemas for key venues
  const venueSchemas = allVenues.slice(0, 10).map(venue => eventVenueJsonLd(venue))

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(destinationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      {venueSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div className="min-h-screen bg-white">
        {/* Main content in client component (includes breadcrumbs) */}
        <VenuesPageClient />
        
        {/* Related Pages */}
        <section className="py-16 bg-cream-50" aria-label="Related pages">
          <div className="container mx-auto px-4">
            <RelatedPages currentPath="/plan/venues" />
          </div>
        </section>
      </div>
    </>
  )
}


