import { Suspense } from 'react'
import { buildMetadata, SITE_URL } from '@/lib/seo'
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs'
import { RelatedPages } from '@/components/ui/RelatedPages'
import { AuburnHeroImage, AuburnImage } from '@/components/ui/AuburnImage'
import { generateBreadcrumbs } from '@/lib/routes'
import DiningClient from './DiningClient'
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

      {/* Client Component with useSearchParams */}
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <DiningClient />
      </Suspense>

      {/* Related Pages */}
      <RelatedPages currentPath="/dining" />
    </div>
  )
}
