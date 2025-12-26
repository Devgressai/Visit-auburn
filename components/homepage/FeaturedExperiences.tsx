import Link from 'next/link'
import Image from 'next/image'
import { urlFor, isSanityConfigured } from '@/lib/sanity'
import { getPlaceholderImage } from '@/lib/images'
import { Card } from '@/components/ui'

interface FeaturedExperiencesProps {
  experiences: Array<{
    _id: string
    _type: string
    title: string
    excerpt?: string
    featuredImage?: any
    slug?: { current: string }
    subHub?: string
  }>
}

export function FeaturedExperiences({ experiences }: FeaturedExperiencesProps) {
  if (!experiences || experiences.length === 0) return null

  const getHref = (item: typeof experiences[0]) => {
    if (item._type === 'activity' && item.subHub) {
      return `/things-to-do/${item.subHub}/${item.slug?.current || ''}`
    }
    if (item._type === 'dining') {
      return `/dining/${item.slug?.current || ''}`
    }
    if (item._type === 'accommodation') {
      return `/accommodations/${item.slug?.current || ''}`
    }
    if (item._type === 'event') {
      return `/events/${item.slug?.current || ''}`
    }
    return '#'
  }

  // Take first 4 for 2x2 grid
  const featured = experiences.slice(0, 4)

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Featured Experiences
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Handpicked highlights showcasing the best of Auburn
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featured.map((item) => (
            <Link key={item._id} href={getHref(item)} className="group">
              <Card className="h-full">
                <div className="relative h-64 md:h-80 overflow-hidden">
                  <Image
                    src={item.featuredImage 
                      ? urlFor(item.featuredImage).width(1200).height(600).url() 
                      : getPlaceholderImage('things-to-do')}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  {item.excerpt && (
                    <p className="text-gray-600 line-clamp-2">{item.excerpt}</p>
                  )}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

