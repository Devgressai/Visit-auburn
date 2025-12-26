import { notFound } from 'next/navigation'
import { activities } from "@/lib/data"
import { buildMetadata, breadcrumbJsonLd, touristAttractionJsonLd, SITE_URL, truncateDescription } from '@/lib/seo'
import { getImageUrl } from "@/lib/images"
import { PortableText } from '@/components/portable-text/PortableText'
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs'
import { RelatedActivities } from '@/components/related'
import Image from 'next/image'
import type { Metadata } from 'next'

export const revalidate = 3600

const VALID_SUBHUBS = ['outdoor-adventures', 'history-culture', 'arts-culture', 'shopping']

function getActivity(subHub: string, slug: string) {
  if (!VALID_SUBHUBS.includes(subHub)) {
    return null
  }
  
  const activity = activities.find(
    a => a.subHub === subHub && a.slug.current === slug
  )
  return activity || null
}

export async function generateStaticParams() {
  return activities
    .filter(activity => activity.subHub && VALID_SUBHUBS.includes(activity.subHub))
    .map(activity => ({
      subHub: activity.subHub,
      slug: activity.slug.current,
    }))
}

export async function generateMetadata({ params }: { params: Promise<{ subHub: string; slug: string }> }): Promise<Metadata> {
  const { subHub, slug } = await params
  const activity = getActivity(subHub, slug)

  if (!activity) {
    return {}
  }

  const canonical = `${SITE_URL}/things-to-do/${subHub}/${slug}`
  const image = activity.featuredImage
    ? getImageUrl(activity.featuredImage)
    : undefined

  const title = activity.seoTitle || `${activity.title} - Things to Do in Auburn, CA`
  const description = truncateDescription(
    activity.seoDescription || activity.excerpt || `Discover ${activity.title} in Auburn, California.`
  )

  return buildMetadata({
    title,
    description,
    canonical,
    ogImage: image,
    type: 'article',
  })
}

function getRelatedActivities(subHub: string, excludeId?: string) {
  return activities
    .filter(a => a.subHub === subHub && a._id !== excludeId)
    .slice(0, 3)
}

export default async function ActivityDetailPage({ params }: { params: Promise<{ subHub: string; slug: string }> }) {
  const { subHub, slug } = await params
  const activity = getActivity(subHub, slug)

  if (!activity) {
    notFound()
  }

  const canonical = `${SITE_URL}/things-to-do/${subHub}/${slug}`
  const imageUrl = activity.featuredImage ? getImageUrl(activity.featuredImage) : null
  
  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Things to Do', url: '/things-to-do' },
    { name: activity.subHub ? activity.subHub.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'Activity', url: `/things-to-do/${subHub}` },
    { name: activity.title, url: `/things-to-do/${subHub}/${slug}` },
  ])

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Things to Do', href: '/things-to-do' },
    { label: subHub.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '), href: `/things-to-do/${subHub}` },
    { label: activity.title, href: `/things-to-do/${subHub}/${slug}` },
  ]

  const relatedActivities = getRelatedActivities(subHub, activity._id)

  const activitySchema = touristAttractionJsonLd({
    name: activity.title,
    description: truncateDescription(activity.excerpt || activity.title),
    address: activity.location ? {
      street: activity.location.address,
      city: activity.location.city,
      state: activity.location.state,
      zip: activity.location.zip,
    } : undefined,
    image: imageUrl || undefined,
    url: canonical,
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(activitySchema) }}
      />

      <article className="min-h-screen bg-white">
        {imageUrl && (
          <div className="relative h-[400px] md:h-[500px] overflow-hidden">
            <Image
              src={imageUrl}
              alt={activity.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <Breadcrumbs items={breadcrumbItems} />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{activity.title}</h1>
            {activity.excerpt && (
              <p className="text-xl text-gray-600 mb-6">{activity.excerpt}</p>
            )}
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              {activity.duration && (
                <div><strong>Duration:</strong> {activity.duration}</div>
              )}
              {activity.priceRange && (
                <div><strong>Price:</strong> {activity.priceRange}</div>
              )}
              {activity.category && (
                <div><strong>Category:</strong> {activity.category}</div>
              )}
            </div>
            {activity.location && (
              <div className="mt-4 text-gray-600">
                <strong>Location:</strong>{' '}
                {[activity.location.address, activity.location.city, activity.location.state]
                  .filter(Boolean)
                  .join(', ')}
              </div>
            )}
          </div>

          {activity.description && (
            <div className="prose prose-lg max-w-none mb-12 text-gray-700">
              <PortableText content={activity.description} />
            </div>
          )}

          <RelatedActivities
            activities={relatedActivities}
            currentActivityId={activity._id}
            currentSubHub={activity.subHub}
          />
        </div>
      </article>
    </>
  )
}
