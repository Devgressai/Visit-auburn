import { notFound } from 'next/navigation'
import { thingsToDoCategories, getItemsByCategory, getCategoryBySlug } from '@/lib/thingsToDo.data'
import { buildMetadata, breadcrumbJsonLd, itemListJsonLd, SITE_URL } from '@/lib/seo'
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs'
import { PageHero } from '@/components/ui/PageHero'
import Link from 'next/link'
import type { Metadata } from 'next'

export const revalidate = 3600

// Map old category slugs from thingsToDo.data to match subHub naming
// This allows /things-to-do/outdoor-adventures to work with both systems
const CATEGORY_SLUG_MAP: Record<string, string> = {
  'outdoor-adventures': 'outdoor-adventures',
  'history-culture': 'history-culture',
  'arts-culture': 'arts-culture',
  'wine-food-markets': 'wine-food-markets',
  'events-seasonal': 'events-seasonal',
  'active-adventures': 'active-adventures',
}

export async function generateStaticParams() {
  return thingsToDoCategories.map(category => ({
    subHub: category.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ subHub: string }> }): Promise<Metadata> {
  const { subHub } = await params
  const categorySlug = CATEGORY_SLUG_MAP[subHub] || subHub
  const category = getCategoryBySlug(categorySlug)

  if (!category) {
    return {}
  }

  return buildMetadata({
    title: `${category.title} in Auburn, California`,
    description: category.description,
    canonical: `${SITE_URL}/things-to-do/${subHub}`,
  })
}

export default async function SubHubPage({ params }: { params: Promise<{ subHub: string }> }) {
  const { subHub } = await params
  const categorySlug = CATEGORY_SLUG_MAP[subHub] || subHub
  const category = getCategoryBySlug(categorySlug)

  if (!category) {
    notFound()
  }

  const items = getItemsByCategory(categorySlug)

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Things to Do', href: '/things-to-do' },
    { label: category.title, href: `/things-to-do/${subHub}` },
  ]

  const breadcrumbSchema = breadcrumbJsonLd([
    { name: 'Home', url: SITE_URL },
    { name: 'Things to Do', url: `${SITE_URL}/things-to-do` },
    { name: category.title, url: `${SITE_URL}/things-to-do/${subHub}` },
  ])

  const itemListSchema = itemListJsonLd(
    items.map((item, index) => ({
      position: index + 1,
      name: item.title,
      url: `${SITE_URL}/things-to-do/${subHub}/${item.slug}`,
    }))
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <div className="min-h-screen bg-white">
        <PageHero
          title={category.title}
          subtitle={category.description}
          badge="Things to Do"
          imageKey="things-to-do"
          size="sm"
        />

        {/* Breadcrumbs */}
        <div className="container mx-auto px-4 py-4 bg-white">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        <div className="container mx-auto px-4 py-12 bg-white">

          <div className="mt-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-charcoal-900">
                {items.length} {items.length === 1 ? 'Attraction' : 'Attractions'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <Link
                  key={item.id}
                  href={`/things-to-do/${subHub}/${item.slug}`}
                  className="card card-hover overflow-hidden group"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-charcoal-900 mb-3 group-hover:text-lake-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-charcoal-600 text-sm mb-4 line-clamp-3">
                      {item.shortDescription}
                    </p>
                    
                    {/* Highlights */}
                    {item.highlights.length > 0 && (
                      <ul className="text-sm text-charcoal-700 mb-4 space-y-1">
                        {item.highlights.slice(0, 3).map((highlight, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-lake-500 mr-2">•</span>
                            <span className="line-clamp-1">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    {/* Good For Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.goodFor.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-lake-50 text-lake-700 px-2 py-1 rounded-full border border-lake-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Location */}
                    <div className="text-sm text-charcoal-500">
                      📍 {item.location.city}, {item.location.state}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

