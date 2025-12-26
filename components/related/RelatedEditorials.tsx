import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

interface RelatedEditorial {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  featuredImage?: any
  publishedAt?: string
  category?: string
}

interface RelatedEditorialsProps {
  editorials: RelatedEditorial[]
  currentEditorialId?: string
  title?: string
}

export function RelatedEditorials({
  editorials,
  currentEditorialId,
  title = 'Related Articles',
}: RelatedEditorialsProps) {
  if (!editorials || editorials.length === 0) {
    return null
  }

  // Filter out current editorial if provided
  const filteredEditorials = currentEditorialId
    ? editorials.filter((editorial) => editorial._id !== currentEditorialId)
    : editorials

  if (filteredEditorials.length === 0) {
    return null
  }

  return (
    <section className="border-t border-gray-200 pt-12 mt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredEditorials.slice(0, 3).map((editorial) => (
          <Link
            key={editorial._id}
            href={`/discover/${editorial.slug?.current || ''}`}
            className="block group"
          >
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              {editorial.featuredImage && (
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={urlFor(editorial.featuredImage).width(600).height(400).url()}
                    alt={editorial.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {editorial.title}
                </h3>
                {editorial.excerpt && (
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{editorial.excerpt}</p>
                )}
                {editorial.publishedAt && (
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(editorial.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

