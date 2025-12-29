import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getRelatedPages } from '@/lib/routes'

interface RelatedPagesProps {
  currentPath: string
  title?: string
  limit?: number
  className?: string
}

/**
 * RelatedPages Component
 * Displays 6 related Auburn pages with short blurbs
 * Ensures no page is an orphan by providing contextual navigation
 */
export function RelatedPages({
  currentPath,
  title = 'Explore More of Auburn',
  limit = 6,
  className = '',
}: RelatedPagesProps) {
  const relatedPages = getRelatedPages(currentPath, limit)

  if (relatedPages.length === 0) {
    return null
  }

  return (
    <section className={`py-12 md:py-16 bg-cream-50 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal-900 mb-3">
              {title}
            </h2>
            <p className="text-charcoal-600 text-lg">
              Continue exploring California's Gold Country
            </p>
          </div>

          {/* Related Pages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPages.map((page) => (
              <Link
                key={page.path}
                href={page.path}
                className="group card card-hover p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-xl font-bold text-charcoal-900 group-hover:text-gold-600 transition-colors">
                    {page.label}
                  </h3>
                  <ArrowRight className="w-5 h-5 text-gold-600 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-charcoal-600 text-sm leading-relaxed">
                  {page.blurb}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

