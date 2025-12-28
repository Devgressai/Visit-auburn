import { thingsToDoCategories, thingsToDoItems, getItemsGroupedByCategory } from '@/lib/thingsToDo.data'
import { buildMetadata, itemListJsonLd, SITE_URL } from '@/lib/seo'
import { PageHero } from '@/components/ui/PageHero'
import Link from 'next/link'
import { Mountain, Building, Utensils, Calendar, Bike } from 'lucide-react'
import type { Metadata } from 'next'

export const revalidate = 3600

const iconMap = {
  mountain: Mountain,
  building: Building,
  utensils: Utensils,
  calendar: Calendar,
  bike: Bike,
}

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Things to Do in Auburn, California - Complete Guide',
    description: 'Discover the best attractions, activities, and experiences in Auburn, CA. From hiking trails and Gold Rush history to wineries, events, and outdoor adventures in California\'s Gold Country.',
    canonical: `${SITE_URL}/things-to-do`,
  })
}

export default async function ThingsToDoPage() {
  const groupedItems = getItemsGroupedByCategory()
  
  // Create JSON-LD ItemList
  const itemListSchema = itemListJsonLd(
    thingsToDoItems.map((item, index) => ({
      position: index + 1,
      name: item.title,
      url: `${SITE_URL}/things-to-do/${item.categorySlug}/${item.slug}`,
    }))
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <div className="min-h-screen bg-cream-50">
        <PageHero
          title="Things to Do in Auburn"
          subtitle="From scenic trails to Gold Rush history, discover everything Auburn has to offer"
          badge="Explore Auburn"
          imageKey="things-to-do"
          size="md"
        />

        {/* Intro Section */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal-900 mb-6">
                Adventures Await in Gold Country
              </h2>
              <p className="text-charcoal-600 text-lg md:text-xl leading-relaxed mb-4">
                Whether you're seeking outdoor thrills, cultural experiences, or a glimpse into 
                California's Gold Rush past, Auburn offers unforgettable activities for every interest.
              </p>
              <p className="text-charcoal-600 text-lg">
                Explore over {thingsToDoItems.length} curated attractions across {thingsToDoCategories.length} categories.
              </p>
            </div>
          </div>
        </section>

        {/* Category Cards */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-charcoal-900 mb-8 text-center">
              Explore by Category
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {thingsToDoCategories.map((category) => {
                const Icon = iconMap[category.iconKey as keyof typeof iconMap] || Mountain
                const itemCount = groupedItems[category.slug]?.length || 0
                
                return (
                  <Link
                    key={category.slug}
                    href={`/things-to-do/${category.slug}`}
                    className="group card card-hover p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-charcoal-900 mb-2 group-hover:text-gold-600 transition-colors">
                          {category.title}
                        </h3>
                        <p className="text-charcoal-600 text-sm mb-3">
                          {category.description}
                        </p>
                        <div className="text-gold-600 font-semibold text-sm">
                          {itemCount} {itemCount === 1 ? 'attraction' : 'attractions'} →
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* All Attractions by Category */}
        {thingsToDoCategories.map((category) => {
          const items = groupedItems[category.slug] || []
          if (items.length === 0) return null

          return (
            <section key={category.slug} className="py-12 md:py-16 bg-white odd:bg-cream-50">
              <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-charcoal-900">
                    {category.title}
                  </h2>
                  <Link
                    href={`/things-to-do/${category.slug}`}
                    className="text-gold-600 hover:text-gold-700 font-semibold text-sm md:text-base"
                  >
                    View All →
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((item) => (
                    <Link
                      key={item.id}
                      href={`/things-to-do/${category.slug}/${item.slug}`}
                      className="card card-hover overflow-hidden group"
                    >
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-charcoal-900 mb-3 group-hover:text-gold-600 transition-colors line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-charcoal-600 text-sm mb-4 line-clamp-3">
                          {item.shortDescription}
                        </p>
                        
                        {/* Good For Tags */}
                        <div className="flex flex-wrap gap-2">
                          {item.goodFor.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs bg-gold-50 text-gold-700 px-2 py-1 rounded-full border border-gold-200"
                            >
                              {tag}
                            </span>
                          ))}
                          {item.goodFor.length > 3 && (
                            <span className="text-xs text-charcoal-500">
                              +{item.goodFor.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )
        })}

        {/* CTA Section */}
        <section className="py-16 md:py-20 bg-gradient-to-r from-forest-600 to-forest-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Explore Auburn?
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Plan your visit today and discover why Auburn is California's best-kept secret.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/accommodations"
                className="btn-outline-white"
              >
                Find Places to Stay
              </Link>
              <Link
                href="/plan/visitor-information"
                className="btn-outline-white"
              >
                Visitor Information
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

