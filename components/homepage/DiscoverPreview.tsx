import Link from 'next/link'
import Image from 'next/image'
import { urlFor, isSanityConfigured } from '@/lib/sanity'
import { getPlaceholderImage } from '@/lib/images'
import { Card } from '@/components/ui'
import type { Editorial } from '@/types'
import { ArrowRight } from 'lucide-react'

interface DiscoverPreviewProps {
  editorial: Editorial
}

export function DiscoverPreview({ editorial }: DiscoverPreviewProps) {
  if (!editorial) return null

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Discover Auburn
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Stories, history, and insights about our community
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-12">
          <Link href={`/discover/${editorial.slug.current}`} className="group block">
            <Card>
              <div className="relative h-64 md:h-96 overflow-hidden">
                <Image
                  src={editorial.featuredImage 
                    ? urlFor(editorial.featuredImage).width(1200).height(600).url() 
                    : getPlaceholderImage('discover')}
                  alt={editorial.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-8 md:p-12">
                {editorial.category && (
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-blue-100 text-blue-800 mb-4">
                    {editorial.category}
                  </span>
                )}
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {editorial.title}
                </h3>
                {editorial.excerpt && (
                  <p className="text-lg text-gray-600 mb-6">{editorial.excerpt}</p>
                )}
                <span className="inline-flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-4 transition-all">
                  Read more
                  <ArrowRight className="w-5 h-5" />
                </span>
              </div>
            </Card>
          </Link>
        </div>

        <div className="text-center">
          <Link
            href="/discover"
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors shadow-md hover:shadow-lg"
          >
            Explore More Stories
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}

