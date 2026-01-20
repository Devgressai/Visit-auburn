import { thingsToDoCategories, thingsToDoItems, getItemsGroupedByCategory } from '@/lib/thingsToDo.data'
import { buildMetadata, itemListJsonLd, SITE_URL } from '@/lib/seo'
import { PageHero } from '@/components/ui/PageHero'
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs'
import { RelatedPages } from '@/components/ui/RelatedPages'
import { generateBreadcrumbs } from '@/lib/routes'
import { AttractionGrid, FeaturedAttractionGrid } from '@/components/attractions'
import { getFeaturedAttractions } from '@/data/attractions'
import Link from 'next/link'
import Image from 'next/image'
import { Mountain, Building, Utensils, Calendar, Bike, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const revalidate = 3600

const iconMap = {
  mountain: Mountain,
  building: Building,
  utensils: Utensils,
  calendar: Calendar,
  bike: Bike,
}

// Category hero images - optimized WebP images
const categoryImages: Record<string, string> = {
  'outdoor-adventures': '/images/auburn/discover/hiking-trail.webp',
  'history-culture': '/images/auburn/discover/gold-rush-museum.webp',
  'wine-food-markets': '/images/auburn/dining/wine-tasting.webp',
  'events-seasonal': '/images/auburn/events/event-gold-rush-days.webp',
  'active-adventures': '/images/auburn/discover/folsom-lake.webp',
}

// Attraction card images - unique optimized WebP images for each attraction
const attractionImages: Record<string, string> = {
  // Outdoor Adventures - each with unique image
  'lake-clementine': '/images/auburn/discover/folsom-lake.webp',
  'hidden-falls': '/images/auburn/discover/hiking-trail.webp',
  'overlook-park': '/images/auburn/hero-american-river-canyon.webp',
  'railhead-park': '/images/auburn/discover/old-town-street.webp',
  'ashford-park': '/images/auburn/weddings/garden-wedding.webp',
  'black-hole-falls': '/images/auburn/discover/hiking-trail.webp',
  'swim-hole': '/images/auburn/discover/folsom-lake.webp',
  
  // History & Culture - each with unique image
  'placer-museum': '/images/auburn/discover/gold-rush-museum.webp',
  'gold-museum': '/images/auburn/discover/gold-rush-museum.webp',
  'bernhard-museum': '/images/auburn/weddings/historic-venue.webp',
  'old-town': '/images/auburn/hero-old-town-clocktower.webp',
  'walking-tour': '/images/auburn/discover/old-town-street.webp',
  'clock-tower': '/images/auburn/hero-old-town-clocktower.webp',
  'foresthill-bridge': '/images/auburn/hero-american-river-canyon.webp',
  
  // Wine, Food & Markets - each with unique image
  'mt-vernon': '/images/auburn/dining/wine-tasting.webp',
  'farmers-market': '/images/auburn/dining/farmers-market.webp',
  'arcade': '/images/auburn/dining/brewery-taproom.webp',
  'dining': '/images/auburn/dining/restaurant-casual.webp',
  
  // Events & Seasonal - each with unique image
  'events': '/images/auburn/events/event-gold-rush-days.webp',
  'pumpkin-nights': '/images/auburn/weddings/outdoor-ceremony.webp',
  'mandarin-festival': '/images/auburn/dining/farmers-market.webp',
  
  // Active Adventures - each with unique image
  'bicycle-shop': '/images/auburn/discover/hiking-trail.webp',
  'adventure-sports': '/images/auburn/discover/folsom-lake.webp',
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
  const breadcrumbs = generateBreadcrumbs('/things-to-do')
  
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

      <div className="min-h-screen bg-white pt-[68px] md:pt-[84px] lg:pt-[100px]">
        <PageHero
          title="Things to Do in Auburn"
          subtitle="From scenic trails to Gold Rush history, discover everything Auburn has to offer"
          badge="Explore Auburn"
          imageKey="things-to-do"
          size="md"
        />

        {/* Intro Section - White background */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            {/* Breadcrumbs */}
            <Breadcrumbs items={breadcrumbs} />

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

        {/* Featured Attractions */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-charcoal-900 mb-3">
                Top Auburn Attractions
              </h2>
              <p className="text-charcoal-600 max-w-2xl mx-auto">
                The best of Gold Country—trails, history, and experiences that define Auburn
              </p>
            </div>
            <AttractionGrid
              attractions={getFeaturedAttractions(6)}
              showFilters={false}
              variant="mixed"
              columns={3}
            />
          </div>
        </section>

        {/* Category Cards - Cream background */}
        <section className="py-12 md:py-16 bg-cream-50">
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
        {thingsToDoCategories.map((category, index) => {
          const items = groupedItems[category.slug] || []
          if (items.length === 0) return null

          return (
            <section key={category.slug} className={`py-12 md:py-16 ${index % 2 === 0 ? 'bg-white' : 'bg-cream-50'}`}>
              <div className="container mx-auto px-4">
                {/* Category Header with Image */}
                <div className="mb-8">
                  {/* Category Image */}
                  <div className="relative h-48 md:h-64 rounded-2xl overflow-hidden mb-6">
                    <Image
                      src={categoryImages[category.slug] || '/images/things-to-do.jpg'}
                      alt={category.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900/80 via-charcoal-900/60 to-transparent" />
                    <div className="absolute inset-0 flex items-center px-6 md:px-12">
                      <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                          {category.title}
                        </h2>
                        <p className="text-white/90 text-base md:text-lg max-w-2xl">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* View All Link */}
                  <div className="flex justify-end">
                    <Link
                      href={`/things-to-do/${category.slug}`}
                      className="text-gold-600 hover:text-gold-700 font-semibold text-sm md:text-base inline-flex items-center gap-2"
                    >
                      View All {items.length} {items.length === 1 ? 'Attraction' : 'Attractions'} →
                    </Link>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((item) => (
                    <Link
                      key={item.id}
                      href={`/things-to-do/${category.slug}/${item.slug}`}
                      className="card card-hover overflow-hidden group"
                    >
                      {/* Attraction Image */}
                      {item.imageKey && attractionImages[item.imageKey] && (
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={attractionImages[item.imageKey]}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                      )}
                      
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

        {/* CTA Section - Blue accent band */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-lake-500 to-lake-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">
              Ready to Explore Auburn?
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Plan your visit today and discover why Auburn is California's best-kept secret.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/accommodations"
                className="bg-white text-lake-600 font-semibold px-8 py-4 rounded-lg hover:bg-cream-50 transition-colors inline-flex items-center justify-center gap-2 shadow-lg"
              >
                Find Places to Stay
              </Link>
              <Link
                href="/plan/visitor-information"
                className="border-2 border-white/70 text-white font-semibold px-8 py-4 rounded-lg hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2"
              >
                Visitor Information
              </Link>
            </div>
          </div>
        </section>

        {/* Related Pages */}
        <RelatedPages currentPath="/things-to-do" />
      </div>
    </>
  )
}

