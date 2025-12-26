import { notFound } from 'next/navigation'
import { activities } from '@/lib/data'
import { buildMetadata, breadcrumbJsonLd, SITE_URL } from '@/lib/seo'
import { getImageUrl } from '@/lib/images'
import { DetailLayout } from '@/components/detail/DetailLayout'
import type { Metadata } from 'next'

export const revalidate = 3600

function getActivity(slug: string) {
  return activities.find(activity => activity.slug.current === slug) || null
}

function getRelatedActivities(currentId: string, category?: string) {
  return activities
    .filter(a => a._id !== currentId && (!category || a.category === category))
    .slice(0, 3)
}

export async function generateStaticParams() {
  return activities.map((activity) => ({
    slug: activity.slug.current
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const activity = getActivity(slug)
  
  if (!activity) {
    return {}
  }

  const url = `${SITE_URL}/activities/${slug}`
  const image = activity.featuredImage
    ? getImageUrl(activity.featuredImage)
    : undefined

  return buildMetadata({
    title: `${activity.title} - Things to Do in Auburn`,
    description: activity.excerpt || `Experience ${activity.title} in Auburn, California.`,
    ogImage: image,
    canonical: url,
  })
}

export default async function ActivityDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const activity = getActivity(slug)

  if (!activity) {
    notFound()
  }

  const relatedActivities = getRelatedActivities(activity._id, activity.category)

  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Activities', url: '/activities' },
    { name: activity.title, url: `/activities/${slug}` },
  ])

  // Build info items with string icon names
  const info = []
  if (activity.category) {
    info.push({ icon: 'Tag', label: 'Category', value: activity.category })
  }
  if (activity.duration) {
    info.push({ icon: 'Clock', label: 'Duration', value: activity.duration })
  }
  if (activity.priceRange) {
    info.push({ icon: 'DollarSign', label: 'Price', value: activity.priceRange })
  }
  if (activity.location?.city) {
    info.push({ icon: 'MapPin', label: 'Location', value: activity.location.city })
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <DetailLayout
        title={activity.title}
        excerpt={activity.excerpt}
        description={activity.description}
        featuredImage={activity.featuredImage}
        category={activity.category}
        info={info}
        location={activity.location}
        contact={activity.contact}
        relatedItems={relatedActivities}
        relatedTitle="More Activities"
        relatedBasePath="/activities"
        breadcrumbLabel="Activities"
        breadcrumbPath="/activities"
      />
    </>
  )
}
