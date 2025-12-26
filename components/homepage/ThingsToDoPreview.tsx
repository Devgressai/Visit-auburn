import Link from 'next/link'
import Image from 'next/image'
import { urlFor, isSanityConfigured } from '@/lib/sanity'
import { getPlaceholderImage } from '@/lib/images'
import { Card } from '@/components/ui'
import type { Activity } from '@/types'
import { ArrowRight } from 'lucide-react'

interface ThingsToDoPreviewProps {
  activities: Activity[]
}

export function ThingsToDoPreview({ activities }: ThingsToDoPreviewProps) {
  if (!activities || activities.length === 0) return null

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Things To Do
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Discover exciting activities and attractions in Auburn
          </p>
        </div>

        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-x-visible pb-6 md:pb-0 scrollbar-hide">
          {activities.slice(0, 6).map((activity) => (
            <Link
              key={activity._id}
              href={`/things-to-do/${(activity as any).subHub || 'outdoor-adventures'}/${activity.slug.current}`}
              className="group flex-shrink-0 w-80 md:w-auto"
            >
              <Card className="h-full">
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={activity.featuredImage 
                      ? urlFor(activity.featuredImage).width(800).height(450).url() 
                      : getPlaceholderImage('things-to-do')}
                    alt={activity.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {activity.title}
                  </h3>
                  {activity.excerpt && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{activity.excerpt}</p>
                  )}
                  {activity.duration && (
                    <p className="text-sm text-gray-500">{activity.duration}</p>
                  )}
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/things-to-do"
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors shadow-md hover:shadow-lg"
          >
            View All Activities
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}

