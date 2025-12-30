import { activities } from '@/lib/data'
import { buildMetadata, SITE_URL } from '@/lib/seo'
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs'
import { RelatedPages } from '@/components/ui/RelatedPages'
import { AuburnHeroImage, AuburnImage } from '@/components/ui/AuburnImage'
import { ListingGrid } from '@/components/listings/ListingGrid'
import { generateBreadcrumbs } from '@/lib/routes'
import Link from 'next/link'
import { Mountain, BookOpen, Camera, Map, Calendar, UtensilsCrossed } from 'lucide-react'
import type { Metadata } from 'next'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Things to Do in Auburn, California - Activities & Attractions',
    description: 'Discover exciting activities and attractions in Auburn, CA. Outdoor recreation, historic sites, arts & culture, shopping, and more in Gold Country.',
    canonical: `${SITE_URL}/activities`,
  })
}

export default async function ActivitiesPage() {
  const breadcrumbs = generateBreadcrumbs('/activities')

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-[500px] md:h-[600px]">
        <AuburnHeroImage imageId="hero-american-river-canyon">
          <div className="container mx-auto px-4 text-center">
            <span className="inline-block px-4 py-2 bg-lake-500/90 text-white text-sm font-semibold rounded-full mb-4">
              Explore Auburn
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Things to Do in Auburn
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              From scenic trails to Gold Rush history, discover everything Auburn has to offer
            </p>
          </div>
        </AuburnHeroImage>
      </section>

      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-4 bg-white">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      {/* Main Content - White background */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          {/* Intro Text */}
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-charcoal-900 mb-4">
              Adventures Await in Gold Country
            </h2>
            <p className="text-charcoal-600 text-lg leading-relaxed mb-6">
              Whether you're seeking outdoor thrills, cultural experiences, or a glimpse into 
              California's Gold Rush past, Auburn offers unforgettable activities for every interest.
            </p>
            <p className="text-charcoal-600 leading-relaxed">
              Located at the gateway to the Sierra Nevada, Auburn combines easy access from Sacramento 
              and the Bay Area with world-class outdoor recreation, rich Gold Rush history, and authentic 
              small-town charm. From hiking the legendary Western States Trail to exploring 1850s mining 
              sites, every activity connects you to Auburn's unique character as California's Gold Country 
              capital.
            </p>
          </div>

          {/* Featured Categories Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <Link href="/things-to-do/outdoor-adventures" className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-charcoal-100 group">
              <div className="w-16 h-16 rounded-full bg-lake-100 flex items-center justify-center mb-4">
                <Mountain className="w-8 h-8 text-lake-600" />
              </div>
              <h3 className="text-xl font-bold text-charcoal-900 mb-2 group-hover:text-lake-600 transition-colors">
                Outdoor Adventures
              </h3>
              <p className="text-charcoal-600 text-sm">
                Hiking, biking, swimming, and exploring Auburn's natural beauty
              </p>
            </Link>

            <Link href="/things-to-do/history-culture" className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-charcoal-100 group">
              <div className="w-16 h-16 rounded-full bg-lake-100 flex items-center justify-center mb-4">
                <BookOpen className="w-8 h-8 text-lake-600" />
              </div>
              <h3 className="text-xl font-bold text-charcoal-900 mb-2 group-hover:text-lake-600 transition-colors">
                History & Culture
              </h3>
              <p className="text-charcoal-600 text-sm">
                Gold Rush museums, historic sites, and cultural attractions
              </p>
            </Link>

            <Link href="/things-to-do/arts-culture" className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-charcoal-100 group">
              <div className="w-16 h-16 rounded-full bg-lake-100 flex items-center justify-center mb-4">
                <Camera className="w-8 h-8 text-lake-600" />
              </div>
              <h3 className="text-xl font-bold text-charcoal-900 mb-2 group-hover:text-lake-600 transition-colors">
                Arts & Culture
              </h3>
              <p className="text-charcoal-600 text-sm">
                Galleries, theaters, and creative experiences in Auburn
              </p>
            </Link>
          </div>

          {/* Activities Grid */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-charcoal-900 mb-8">All Activities</h2>
            <ListingGrid
              items={activities}
              itemType="activities"
              showFilters={true}
            />
          </div>

          {/* Planning Resources */}
          <div className="bg-cream-50 rounded-2xl p-8 md:p-12 mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-charcoal-900 mb-6 text-center">
              Plan Your Auburn Visit
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/itineraries" className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow group">
                <Map className="w-10 h-10 text-lake-600 mb-4" />
                <h3 className="text-xl font-bold text-charcoal-900 mb-2 group-hover:text-lake-600 transition-colors">
                  Itineraries
                </h3>
                <p className="text-charcoal-600 text-sm">
                  Complete day-by-day plans for experiencing Auburn
                </p>
              </Link>

              <Link href="/events" className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow group">
                <Calendar className="w-10 h-10 text-lake-600 mb-4" />
                <h3 className="text-xl font-bold text-charcoal-900 mb-2 group-hover:text-lake-600 transition-colors">
                  Events Calendar
                </h3>
                <p className="text-charcoal-600 text-sm">
                  What's happening during your visit to Auburn
                </p>
              </Link>

              <Link href="/dining" className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow group">
                <UtensilsCrossed className="w-10 h-10 text-lake-600 mb-4" />
                <h3 className="text-xl font-bold text-charcoal-900 mb-2 group-hover:text-lake-600 transition-colors">
                  Dining
                </h3>
                <p className="text-charcoal-600 text-sm">
                  Discover Auburn's restaurants and culinary scene
                </p>
              </Link>
            </div>
          </div>

          {/* Featured Image Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div>
              <AuburnImage
                imageId="outdoor-lake-clementine"
                className="w-full h-64 md:h-80 rounded-xl object-cover mb-4"
              />
              <h3 className="text-xl font-bold text-charcoal-900 mb-2">
                Lake Clementine Trail
              </h3>
              <p className="text-charcoal-600">
                One of Auburn's most popular hiking destinations, offering stunning canyon views and access to the American River.
              </p>
            </div>
            <div>
              <AuburnImage
                imageId="historic-old-town-clocktower"
                className="w-full h-64 md:h-80 rounded-xl object-cover mb-4"
              />
              <h3 className="text-xl font-bold text-charcoal-900 mb-2">
                Historic Old Town
              </h3>
              <p className="text-charcoal-600">
                Explore Auburn's Gold Rush heritage in the beautifully preserved Old Town district with historic buildings and museums.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Blue accent band */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-lake-500 to-lake-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-display">
            Start Your Auburn Adventure
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Discover hidden gems, plan your visit, and experience authentic Gold Country in Auburn, California.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/itineraries"
              className="bg-white text-lake-600 font-semibold px-8 py-4 rounded-lg hover:bg-cream-50 transition-colors inline-flex items-center justify-center gap-2 shadow-lg"
            >
              View Itineraries
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

      <RelatedPages currentPath="/activities" />
    </div>
  )
}
