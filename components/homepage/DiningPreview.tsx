import Link from 'next/link'
import Image from 'next/image'
import { urlFor, isSanityConfigured } from '@/lib/sanity'
import { getPlaceholderImage } from '@/lib/images'
import { Card } from '@/components/ui'
import type { Dining } from '@/types'
import { ArrowRight } from 'lucide-react'

interface DiningPreviewProps {
  dining: Dining[]
}

export function DiningPreview({ dining }: DiningPreviewProps) {
  if (!dining || dining.length === 0) return null

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Food & Drink
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Savor the flavors of Auburn's culinary scene
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {dining.slice(0, 6).map((item) => (
            <Link key={item._id} href={`/dining/${item.slug.current}`} className="group">
              <Card className="h-full">
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={item.featuredImage 
                      ? urlFor(item.featuredImage).width(800).height(450).url() 
                      : getPlaceholderImage('dining')}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors flex-1">
                      {item.title}
                    </h3>
                  </div>
                  {item.excerpt && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.excerpt}</p>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {item.cuisine && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {item.cuisine}
                      </span>
                    )}
                    {item.category && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {item.category}
                      </span>
                    )}
                    {item.priceRange && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {item.priceRange}
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/dining"
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors shadow-md hover:shadow-lg"
          >
            View All Dining
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}

