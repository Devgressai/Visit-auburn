import { notFound } from 'next/navigation'
import { dining } from '@/lib/data'
import { buildMetadata, breadcrumbJsonLd, localBusinessJsonLd, SITE_URL, truncateDescription } from '@/lib/seo'
import { getImageUrl } from '@/lib/images'
import { DetailLayout } from '@/components/detail/DetailLayout'
import type { Metadata } from 'next'

export const revalidate = 3600

function getDining(slug: string) {
  return dining.find(d => d.slug.current === slug) || null
}

function getRelatedDining(currentId: string, cuisine?: string) {
  return dining
    .filter(d => d._id !== currentId && (!cuisine || d.cuisine === cuisine))
    .slice(0, 3)
}

export async function generateStaticParams() {
  return dining.map(d => ({ slug: d.slug.current }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const diningItem = getDining(slug)
  
  if (!diningItem) {
    return {}
  }

  const canonical = `${SITE_URL}/dining/${slug}`
  const image = diningItem.featuredImage
    ? getImageUrl(diningItem.featuredImage)
    : undefined

  const title = `${diningItem.title} - Dining in Auburn`
  const description = truncateDescription(
    diningItem.excerpt || `Dine at ${diningItem.title} in Auburn, California.`
  )

  return buildMetadata({
    title,
    description,
    canonical,
    ogImage: image,
  })
}

export default async function DiningDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const diningItem = getDining(slug)

  if (!diningItem) {
    notFound()
  }

  const canonical = `${SITE_URL}/dining/${slug}`
  const imageUrl = diningItem.featuredImage ? getImageUrl(diningItem.featuredImage) : null
  const relatedDiningItems = getRelatedDining(diningItem._id, diningItem.cuisine)

  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Dining', url: '/dining' },
    { name: diningItem.title, url: `/dining/${slug}` },
  ])

  const businessSchema = diningItem.location ? localBusinessJsonLd({
    name: diningItem.title,
    description: diningItem.excerpt || diningItem.title,
    address: diningItem.location.address ? {
      street: diningItem.location.address,
      city: diningItem.location.city || 'Auburn',
      state: diningItem.location.state || 'CA',
      zip: diningItem.location.zip || '',
    } : undefined,
    image: imageUrl || undefined,
    priceRange: diningItem.priceRange,
    url: canonical,
  }) : null

  // Build info items with string icon names
  const info = []
  if (diningItem.category) {
    info.push({ icon: 'Tag', label: 'Category', value: diningItem.category })
  }
  if (diningItem.cuisine) {
    info.push({ icon: 'Utensils', label: 'Cuisine', value: diningItem.cuisine })
  }
  if (diningItem.priceRange) {
    info.push({ icon: 'DollarSign', label: 'Price Range', value: diningItem.priceRange })
  }
  if (diningItem.location?.city) {
    info.push({ icon: 'MapPin', label: 'Location', value: diningItem.location.city })
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
        title={diningItem.title}
        excerpt={diningItem.excerpt}
        description={diningItem.description}
        featuredImage={diningItem.featuredImage}
        category={diningItem.cuisine || diningItem.category}
        info={info}
        location={diningItem.location}
        contact={diningItem.contact}
        relatedItems={relatedDiningItems}
        relatedTitle="More Dining Options"
        relatedBasePath="/dining"
        breadcrumbLabel="Dining"
        breadcrumbPath="/dining"
      />
    </>
  )
}
