import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import type { Accommodation, Activity, Dining, Event } from '@/types'

interface ListingCardProps {
  title: string
  slug: { current: string }
  excerpt?: string
  featuredImage?: any
  href: string
  metadata?: string
}

function ListingCard({ title, slug, excerpt, featuredImage, href, metadata }: ListingCardProps) {
  return (
    <Link href={href} className="group block">
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
        {featuredImage && (
          <div className="relative h-48 overflow-hidden">
            <Image
              src={urlFor(featuredImage).width(600).height(400).url()}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        {!featuredImage && (
          <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300" />
        )}
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          {excerpt && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{excerpt}</p>
          )}
          {metadata && (
            <p className="text-sm text-gray-500">{metadata}</p>
          )}
        </div>
      </div>
    </Link>
  )
}

interface SectionGridProps {
  title: string
  description?: string
  items: (Accommodation | Activity | Dining | Event)[]
  itemType: 'accommodations' | 'activities' | 'dining' | 'events'
  viewAllLink: string
}

export function SectionGrid({ title, description, items, itemType, viewAllLink }: SectionGridProps) {
  if (!items || items.length === 0) return null

  const getHref = (item: Accommodation | Activity | Dining | Event) => {
    const slug = item.slug.current
    switch (itemType) {
      case 'accommodations':
        return `/accommodations/${slug}`
      case 'activities':
        return `/activities/${slug}`
      case 'dining':
        return `/dining/${slug}`
      case 'events':
        return `/events/${slug}`
      default:
        return '#'
    }
  }

  const getMetadata = (item: Accommodation | Activity | Dining | Event) => {
    if (itemType === 'accommodations') {
      const acc = item as Accommodation
      return acc.priceRange || acc.location?.city || ''
    }
    if (itemType === 'activities') {
      const act = item as Activity
      return act.duration || act.location?.city || ''
    }
    if (itemType === 'dining') {
      const din = item as Dining
      return din.cuisine || din.priceRange || ''
    }
    if (itemType === 'events') {
      const evt = item as Event
      if (evt.startDate) {
        return new Date(evt.startDate).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })
      }
    }
    return ''
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          {description && (
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">{description}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {items.slice(0, 6).map((item) => (
            <ListingCard
              key={item._id}
              title={item.title}
              slug={item.slug}
              excerpt={item.excerpt}
              featuredImage={item.featuredImage}
              href={getHref(item)}
              metadata={getMetadata(item)}
            />
          ))}
        </div>

        <div className="text-center">
          <Link
            href={viewAllLink}
            className="inline-block bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            View All {title}
          </Link>
        </div>
      </div>
    </section>
  )
}



