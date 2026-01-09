import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

interface RelatedDining {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  featuredImage?: any
  category?: string
  cuisine?: string
  priceRange?: string
  location?: {
    address?: string
    city?: string
    state?: string
  }
}

interface RelatedDiningProps {
  dining: RelatedDining[]
  currentDiningId?: string
  title?: string
}

export function RelatedDining({
  dining,
  currentDiningId,
  title = 'Related Dining',
}: RelatedDiningProps) {
  if (!dining || dining.length === 0) {
    return null
  }

  // Filter out current dining if provided
  const filteredDining = currentDiningId
    ? dining.filter((item) => item._id !== currentDiningId)
    : dining

  if (filteredDining.length === 0) {
    return null
  }

  return (
    <section className="border-t border-gray-200 pt-12 mt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredDining.slice(0, 3).map((item) => (
          <Link
            key={item._id}
            href={`/dining/${item.slug?.current || ''}`}
            className="block group"
          >
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              {item.featuredImage && (
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={urlFor(item.featuredImage).width(600).height(400).url()}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                {item.excerpt && (
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.excerpt}</p>
                )}
                <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                  {item.cuisine && <span>{item.cuisine}</span>}
                  {item.priceRange && <span>• {item.priceRange}</span>}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}




