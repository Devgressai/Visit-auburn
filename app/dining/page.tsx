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
          <div className="max-w-4xl mx-auto mb-16">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-charcoal-900 mb-4">
                  A Taste of Gold Country
                </h2>
                <p className="text-charcoal-600 text-lg mb-6">
                  From farm-to-fork dining to award-winning wineries, Auburn's culinary scene 
                  reflects the rich bounty of the Sierra foothills. Pull up a chair and dig in.
                </p>
                <p className="text-charcoal-600">
                  Explore historic Old Town restaurants, discover local wineries, and enjoy fresh 
                  ingredients from the weekly farmers market.
                </p>
              </div>
              <div>
                <AuburnImage 
                  imageId="dining-local-cuisine"
                  className="rounded-lg w-full h-[300px] object-cover shadow-lg"
                />
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

      {/* Dining Categories - Cream background */}
      <section className="py-16 md:py-24 bg-cream-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal-900 mb-4">
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
