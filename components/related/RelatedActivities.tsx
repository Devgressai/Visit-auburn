import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

interface RelatedActivity {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  featuredImage?: any
  subHub?: string
  location?: {
    address?: string
    city?: string
    state?: string
  }
  duration?: string
  priceRange?: string
}

interface RelatedActivitiesProps {
  activities: RelatedActivity[]
  currentActivityId?: string
  currentSubHub?: string
  title?: string
}

export function RelatedActivities({
  activities,
  currentActivityId,
  currentSubHub,
  title = 'Related Activities',
}: RelatedActivitiesProps) {
  if (!activities || activities.length === 0) {
    return null
  }

  // Filter out current activity if provided
  const filteredActivities = currentActivityId
    ? activities.filter((activity) => activity._id !== currentActivityId)
    : activities

  if (filteredActivities.length === 0) {
    return null
  }

  const getActivityHref = (activity: RelatedActivity) => {
    if (!activity.subHub || !activity.slug?.current) return '#'
    return `/things-to-do/${activity.subHub}/${activity.slug.current}`
  }

  return (
    <section className="border-t border-gray-200 pt-12 mt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredActivities.slice(0, 3).map((activity) => {
          const href = getActivityHref(activity)
          return (
            <Link key={activity._id} href={href} className="block group">
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                {activity.featuredImage && (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={urlFor(activity.featuredImage).width(600).height(400).url()}
                      alt={activity.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {activity.title}
                  </h3>
                  {activity.excerpt && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{activity.excerpt}</p>
                  )}
                  <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                    {activity.duration && <span>{activity.duration}</span>}
                    {activity.priceRange && <span>• {activity.priceRange}</span>}
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}


