import { notFound } from 'next/navigation'
import { accommodations } from '@/lib/data'
import { buildMetadata, breadcrumbJsonLd, localBusinessJsonLd, SITE_URL, truncateDescription } from '@/lib/seo'
import { getImageUrl } from '@/lib/images'
import { DetailLayout } from '@/components/detail/DetailLayout'
import type { Metadata } from 'next'

export const revalidate = 3600

function getAccommodation(slug: string) {
  return accommodations.find(acc => acc.slug.current === slug) || null
}

function getRelatedAccommodations(currentId: string, category?: string) {
  return accommodations
    .filter(a => a._id !== currentId && (!category || a.category === category))
    .slice(0, 3)
}

export async function generateStaticParams() {
  return accommodations.map((accommodation) => ({
    slug: accommodation.slug.current
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const accommodation = getAccommodation(slug)
  
  if (!accommodation) {
    return {}
  }

  const canonical = `${SITE_URL}/accommodations/${slug}`
  const image = accommodation.featuredImage
    ? getImageUrl(accommodation.featuredImage)
    : undefined

  const title = `${accommodation.title} - Where to Stay in Auburn`
  const description = truncateDescription(
    accommodation.excerpt || `Stay at ${accommodation.title} in Auburn, California.`
  )

  return buildMetadata({
    title,
    description,
    canonical,
    ogImage: image,
  })
}

export default async function AccommodationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const accommodation = getAccommodation(slug)

  if (!accommodation) {
    notFound()
  }

  const canonical = `${SITE_URL}/accommodations/${slug}`
  const imageUrl = accommodation.featuredImage ? getImageUrl(accommodation.featuredImage) : null
  const relatedAccommodations = getRelatedAccommodations(accommodation._id, accommodation.category)

  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Accommodations', url: '/accommodations' },
    { name: accommodation.title, url: `/accommodations/${slug}` },
  ])

  const businessSchema = accommodation.location ? localBusinessJsonLd({
    name: accommodation.title,
    description: accommodation.excerpt || accommodation.title,
    address: accommodation.location.address ? {
      street: accommodation.location.address,
      city: accommodation.location.city || 'Auburn',
      state: accommodation.location.state || 'CA',
      zip: accommodation.location.zip || '',
    } : undefined,
    image: imageUrl || undefined,
    priceRange: accommodation.priceRange,
    rating: accommodation.rating,
    url: canonical,
  }) : null

  // Build info items with string icon names
  const info = []
  if (accommodation.category) {
    info.push({ icon: 'Tag', label: 'Type', value: accommodation.category })
  }
  if (accommodation.priceRange) {
    info.push({ icon: 'DollarSign', label: 'Price Range', value: accommodation.priceRange })
  }
  if (accommodation.rating) {
    info.push({ icon: 'Star', label: 'Rating', value: `${accommodation.rating} / 5` })
  }
  if (accommodation.location?.city) {
    info.push({ icon: 'MapPin', label: 'Location', value: accommodation.location.city })
  }
  // Add amenities as info items
  if (accommodation.amenities && accommodation.amenities.length > 0) {
    accommodation.amenities.slice(0, 2).forEach(amenity => {
      const iconName = amenity.toLowerCase().includes('wifi') ? 'Wifi' : 
                       amenity.toLowerCase().includes('parking') ? 'Car' : 
                       amenity.toLowerCase().includes('breakfast') ? 'Coffee' : 'Tag'
      info.push({ icon: iconName, label: 'Amenity', value: amenity })
    })
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      {businessSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
        />
      )}

      <DetailLayout
        title={accommodation.title}
        excerpt={accommodation.excerpt}
        description={accommodation.description}
        featuredImage={accommodation.featuredImage}
        category={accommodation.category}
        rating={accommodation.rating}
        info={info}
        location={accommodation.location}
        contact={accommodation.contact}
        relatedItems={relatedAccommodations}
        relatedTitle="More Places to Stay"
        relatedBasePath="/accommodations"
        breadcrumbLabel="Accommodations"
        breadcrumbPath="/accommodations"
      />
    </>
  )
}
