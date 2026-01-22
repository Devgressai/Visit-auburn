import { dining } from '@/lib/data'
import { buildMetadata, SITE_URL } from '@/lib/seo'
import { ListingGrid } from '@/components/listings/ListingGrid'
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs'
import { RelatedPages } from '@/components/ui/RelatedPages'
import { AuburnHeroImage, AuburnImage } from '@/components/ui/AuburnImage'
import { generateBreadcrumbs } from '@/lib/routes'
import { AttractionGrid } from '@/components/attractions'
import { getFoodDrinkAttractions } from '@/data/attractions'
import Link from 'next/link'
import type { Metadata } from 'next'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Food & Drink in Auburn, California',
    description: 'Find the best restaurants, cafes, breweries, and wineries in Auburn, CA. Discover delicious dining options in California\'s Gold Country.',
    canonical: `${SITE_URL}/dining`,
  })
}

export default async function DiningPage() {
  const breadcrumbs = generateBreadcrumbs('/dining')

  return (
    <div className="min-h-screen bg-white">
      {/* Hero with Auburn Image */}
      <section className="relative h-[400px] md:h-[500px]">
        <AuburnHeroImage imageId="dining-old-town-restaurants">
          <div className="container mx-auto px-4 text-center">
            <span className="inline-block px-4 py-2 bg-lake-500/90 text-white text-sm font-semibold rounded-full mb-4">
              Auburn Dining
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Food & Drink
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Savor the flavors of Gold Country at Auburn's best restaurants, wineries, and cafes
            </p>
          </div>
        </AuburnHeroImage>
      </section>

      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-4 bg-white">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      {/* Intro Section - White background */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">

          {/* Intro with Auburn Images */}
          <div className="max-w-6xl mx-auto mb-16">
            <div className="grid md:grid-cols-2 gap-12 mb-12">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-charcoal-900 mb-6">
                  A Taste of Gold Country
                </h2>
                <p className="text-charcoal-600 text-lg mb-6 leading-relaxed">
                  From farm-to-fork dining to award-winning wineries, Auburn's culinary scene 
                  reflects the rich bounty of the Sierra foothills. Pull up a chair and dig in.
                </p>
                <p className="text-charcoal-600 text-base mb-6 leading-relaxed">
                  Explore historic Old Town restaurants, discover local wineries, and enjoy fresh 
                  ingredients from the weekly farmers market. Auburn's dining landscape has evolved 
                  from Gold Rush-era saloons to modern establishments that celebrate California's 
                  agricultural heritage while embracing contemporary culinary trends.
                </p>
                <p className="text-charcoal-600 text-base mb-6 leading-relaxed">
                  The Sierra Foothills region surrounding Auburn is renowned for its wine production, 
                  with over 200 wineries within a short drive. Many tasting rooms and wine bars have 
                  opened in downtown Auburn, making it easy to sample the region's best vintages without 
                  leaving the city limits. The area's Mediterranean climate and diverse terroir produce 
                  exceptional Zinfandel, Syrah, and Rhône varietals that have gained national recognition.
                </p>
                <p className="text-charcoal-600 text-base leading-relaxed">
                  Beyond wine, Auburn's food scene showcases the best of California's farm-to-table movement. 
                  Local chefs source ingredients from nearby farms, ranches, and orchards, creating menus 
                  that change with the seasons. From spring asparagus to summer stone fruits, fall apples 
                  to winter root vegetables, Auburn restaurants celebrate the region's agricultural abundance 
                  year-round.
                </p>
              </div>
              <div className="relative">
                <div className="sticky top-24">
                  <AuburnImage 
                    imageId="dining-local-cuisine"
                    className="rounded-lg w-full h-[400px] object-cover shadow-lg"
                  />
                  <p className="text-sm text-charcoal-600 mt-3 italic">
                    Photo: Auburn Culinary Alliance
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Auburn Image */}
            <div className="mb-12">
              <AuburnImage 
                imageId="dining-winery-tasting"
                className="rounded-lg w-full h-[400px] object-cover shadow-lg"
              />
              <p className="text-sm text-charcoal-600 mt-3 italic text-center">
                Sierra Foothills wineries offer tastings and tours just minutes from Auburn
              </p>
            </div>
            
            {/* Additional Content Section */}
            <div className="bg-cream-50 rounded-xl p-8 mb-12">
              <h3 className="text-2xl font-bold text-charcoal-900 mb-4">
                Dining Experiences in Auburn
              </h3>
              <div className="space-y-4 text-charcoal-700 leading-relaxed">
                <p>
                  Auburn's dining scene offers something for every palate and occasion. In historic Old Town, 
                  you'll find charming cafes perfect for breakfast or lunch, serving everything from artisanal 
                  coffee to hearty Gold Country fare. Many restaurants occupy beautifully preserved 19th-century 
                  buildings, creating an atmosphere that connects diners to Auburn's rich history.
                </p>
                <p>
                  For dinner, Auburn boasts an impressive selection of restaurants ranging from casual family 
                  favorites to upscale establishments. Many feature outdoor patios perfect for enjoying 
                  California's mild climate, and several offer live music on weekends. The city's walkable 
                  downtown makes it easy to enjoy a multi-course dining experience, starting with appetizers 
                  at one restaurant and moving to another for your main course.
                </p>
                <p>
                  Craft beer enthusiasts will find several breweries in and around Auburn, each with its own 
                  unique character and selection of locally brewed beers. These establishments often host 
                  food trucks, live music, and community events, making them popular gathering spots for 
                  locals and visitors alike.
                </p>
                <p>
                  Throughout the year, Auburn hosts food-focused events that showcase the region's culinary 
                  excellence. From wine festivals to farmers markets, food truck gatherings to harvest 
                  celebrations, these events provide opportunities to taste the best of what Auburn and 
                  the surrounding Sierra Foothills have to offer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dining Directory - Cream background */}
      <section className="py-16 md:py-24 bg-cream-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal-900 mb-4">
              Browse Auburn Restaurants & Dining
            </h2>
            <p className="text-charcoal-600 max-w-2xl mx-auto">
              Discover the best places to eat and drink in Auburn, from casual cafes to fine dining
            </p>
          </div>
          <ListingGrid
            items={dining}
            itemType="dining"
            showFilters={true}
          />
        </div>
      </section>

      {/* Featured Food & Drink Attractions - White background */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <AttractionGrid
            attractions={getFoodDrinkAttractions()}
            title="Featured Food & Drink"
            subtitle="Restaurants, breweries, wineries, and markets that define Auburn's culinary scene"
            showFilters={true}
            filterTypes={['restaurant', 'brewery', 'winery', 'market']}
            columns={3}
          />
        </div>
      </section>

      {/* Dining Categories - White background */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal-900 mb-4 font-display">
              Explore by Category
            </h2>
            <p className="text-charcoal-600 max-w-2xl mx-auto">
              Find the perfect dining experience for your taste and occasion
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link href="/dining?category=restaurant" className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow group border border-charcoal-100">
              <h3 className="text-xl font-bold text-charcoal-900 mb-3 group-hover:text-lake-600 transition-colors">
                Restaurants →
              </h3>
              <p className="text-charcoal-600">
                Farm-to-table dining, historic taverns, and Gold Country cuisine in Old Town Auburn
              </p>
            </Link>
            <Link href="/dining?category=winery" className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow group border border-charcoal-100">
              <h3 className="text-xl font-bold text-charcoal-900 mb-3 group-hover:text-lake-600 transition-colors">
                Wineries →
              </h3>
              <p className="text-charcoal-600">
                Sierra Foothills wine tasting rooms and vineyard tours near Auburn
              </p>
            </Link>
            <Link href="/dining?category=brewery" className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow group border border-charcoal-100">
              <h3 className="text-xl font-bold text-charcoal-900 mb-3 group-hover:text-lake-600 transition-colors">
                Breweries →
              </h3>
              <p className="text-charcoal-600">
                Craft beer and local breweries serving Gold Country's best brews
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section - Blue accent band */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-lake-500 to-lake-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-display">
            Plan Your Culinary Adventure
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            From wine tasting to craft beer, farm-to-table to food festivals—Auburn's food scene awaits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/itineraries/history-and-wine" 
              className="bg-white text-lake-600 font-semibold px-8 py-4 rounded-lg hover:bg-cream-50 transition-colors inline-flex items-center justify-center gap-2 shadow-lg"
            >
              Wine & History Itinerary
            </Link>
            <Link 
              href="/events" 
              className="border-2 border-white/70 text-white font-semibold px-8 py-4 rounded-lg hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2"
            >
              Food Events
            </Link>
            <Link 
              href="/things-to-do" 
              className="border-2 border-white/70 text-white font-semibold px-8 py-4 rounded-lg hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2"
            >
              Things to Do
            </Link>
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <RelatedPages currentPath="/dining" />
    </div>
  )
}
