import { notFound } from 'next/navigation'
import { thingsToDoCategories, thingsToDoItems, getItemBySlug, getCategoryBySlug, getItemsByCategory } from '@/lib/thingsToDo.data'
import { buildMetadata, breadcrumbJsonLd, touristAttractionJsonLd, SITE_URL } from '@/lib/seo'
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs'
import Link from 'next/link'
import { MapPin, ExternalLink, Info } from 'lucide-react'
import type { Metadata } from 'next'

export const revalidate = 3600

export async function generateStaticParams() {
  return thingsToDoItems.map(item => ({
    category: item.categorySlug,
    slug: item.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ category: string; slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const item = getItemBySlug(slug)

  if (!item) {
    return {}
  }

  return buildMetadata({
    title: `${item.title} - Things to Do in Auburn, CA`,
    description: item.shortDescription,
    canonical: `${SITE_URL}/things-to-do/${item.categorySlug}/${slug}`,
  })
}

export default async function AttractionDetailPage({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category: categorySlug, slug } = await params
  const item = getItemBySlug(slug)
  const category = getCategoryBySlug(categorySlug)

  if (!item || !category || item.categorySlug !== categorySlug) {
    notFound()
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Things to Do', href: '/things-to-do' },
    { label: category.title, href: `/things-to-do/${categorySlug}` },
    { label: item.title, href: `/things-to-do/${categorySlug}/${slug}` },
  ]

  const breadcrumbSchema = breadcrumbJsonLd([
    { name: 'Home', url: SITE_URL },
    { name: 'Things to Do', url: `${SITE_URL}/things-to-do` },
    { name: category.title, url: `${SITE_URL}/things-to-do/${categorySlug}` },
    { name: item.title, url: `${SITE_URL}/things-to-do/${categorySlug}/${slug}` },
  ])

  const attractionSchema = touristAttractionJsonLd({
    name: item.title,
    description: item.shortDescription,
    address: {
      street: item.location.address,
      city: item.location.city,
      state: item.location.state,
      zip: item.location.zip,
    },
    url: `${SITE_URL}/things-to-do/${categorySlug}/${slug}`,
  })

  // Get related items from same category
  const relatedItems = getItemsByCategory(categorySlug)
    .filter(i => i.id !== item.id)
    .slice(0, 3)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(attractionSchema) }}
      />

      <article className="min-h-screen bg-white">
        <div className="bg-gradient-to-r from-forest-600 to-forest-700 text-white py-16 md:py-20">
          <div className="container mx-auto px-4">
            <Breadcrumbs items={breadcrumbItems} className="mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{item.title}</h1>
            <p className="text-xl text-white/90 max-w-3xl">
              {item.shortDescription}
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Good For Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {item.goodFor.map((tag) => (
                <span
                  key={tag}
                  className="text-sm bg-gold-100 text-gold-800 px-3 py-1.5 rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Highlights */}
            {item.highlights.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-charcoal-900 mb-4">Highlights</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {item.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-gold-500 mr-3 text-xl">✓</span>
                      <span className="text-charcoal-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Location */}
            <div className="mb-8 p-6 bg-cream-50 rounded-xl border border-charcoal-200">
              <h2 className="text-xl font-bold text-charcoal-900 mb-3 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gold-600" />
                Location
              </h2>
              <div className="text-charcoal-700">
                {item.location.address && <div>{item.location.address}</div>}
                <div>
                  {item.location.city}, {item.location.state}
                  {item.location.zip && ` ${item.location.zip}`}
                </div>
              </div>
            </div>

            {/* Visit Tips */}
            {item.visitTips && item.visitTips.length > 0 && (
              <div className="mb-8 p-6 bg-forest-50 rounded-xl border border-forest-200">
                <h2 className="text-xl font-bold text-charcoal-900 mb-3 flex items-center gap-2">
                  <Info className="w-5 h-5 text-forest-600" />
                  Visitor Tips
                </h2>
                <ul className="space-y-2">
                  {item.visitTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-forest-500 mr-3">•</span>
                      <span className="text-charcoal-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Website */}
            {item.website && (
              <div className="mb-8">
                <a
                  href={item.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-gold text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-shadow"
                >
                  Visit Official Website
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}

            {/* Sources */}
            {item.sources.length > 0 && (
              <div className="mb-12 p-6 bg-white rounded-xl border border-charcoal-200">
                <h3 className="text-lg font-bold text-charcoal-900 mb-3">Additional Information</h3>
                <ul className="space-y-2">
                  {item.sources.map((source, idx) => (
                    <li key={idx}>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gold-600 hover:text-gold-700 hover:underline inline-flex items-center gap-2"
                      >
                        {source.label}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Related Items */}
            {relatedItems.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-charcoal-900 mb-6">
                  More in {category.title}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedItems.map((related) => (
                    <Link
                      key={related.id}
                      href={`/things-to-do/${categorySlug}/${related.slug}`}
                      className="card card-hover p-5"
                    >
                      <h3 className="text-lg font-bold text-charcoal-900 mb-2 group-hover:text-gold-600 transition-colors line-clamp-2">
                        {related.title}
                      </h3>
                      <p className="text-charcoal-600 text-sm line-clamp-2">
                        {related.shortDescription}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-cream-100 py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-charcoal-900 mb-4">
              Explore More of Auburn
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/things-to-do"
                className="btn-primary"
              >
                All Things to Do
              </Link>
              <Link
                href={`/things-to-do/${categorySlug}`}
                className="btn-outline-pine"
              >
                More {category.title}
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}

