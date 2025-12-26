import Link from 'next/link'
import Image from 'next/image'
import { urlFor, isSanityConfigured } from '@/lib/sanity'
import { getPlaceholderImage } from '@/lib/images'
import { Card } from '@/components/ui'
import type { Accommodation } from '@/types'
import { ArrowRight, Star } from 'lucide-react'

interface AccommodationsPreviewProps {
  accommodations: Accommodation[]
}

export function AccommodationsPreview({ accommodations }: AccommodationsPreviewProps) {
  if (!accommodations || accommodations.length === 0) return null

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Where to Stay
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Find the perfect place to rest during your visit
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {accommodations.slice(0, 6).map((accommodation) => (
            <Link key={accommodation._id} href={`/accommodations/${accommodation.slug.current}`} className="group">
              <Card className="h-full">
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={accommodation.featuredImage 
                      ? urlFor(accommodation.featuredImage).width(800).height(450).url() 
                      : getPlaceholderImage('stay')}
                    alt={accommodation.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors flex-1">
                      {accommodation.title}
                    </h3>
                    {accommodation.rating && (
                      <div className="flex items-center gap-1 text-yellow-500 ml-2">
                        <Star className="w-5 h-5 fill-current" />
                        <span className="text-sm font-semibold text-gray-900">{accommodation.rating}</span>
                      </div>
                    )}
                  </div>
                  {accommodation.excerpt && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{accommodation.excerpt}</p>
                  )}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {accommodation.amenities?.slice(0, 3).map((amenity, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700"
                      >
                        {amenity}
                      </span>
                    ))}
                    {accommodation.amenities && accommodation.amenities.length > 3 && (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
                        +{accommodation.amenities.length - 3} more
                      </span>
                    )}
                  </div>
                  {accommodation.priceRange && (
                    <p className="text-sm font-semibold text-gray-900">{accommodation.priceRange}</p>
                  )}
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/accommodations"
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors shadow-md hover:shadow-lg"
          >
            View All Accommodations
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}

