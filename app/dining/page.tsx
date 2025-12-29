import { dining } from '@/lib/data'
import { buildMetadata, SITE_URL } from '@/lib/seo'
import { ListingGrid } from '@/components/listings/ListingGrid'
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs'
import { RelatedPages } from '@/components/ui/RelatedPages'
import { AuburnHeroImage, AuburnImage } from '@/components/ui/AuburnImage'
import { generateBreadcrumbs } from '@/lib/routes'
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
    <div className="min-h-screen bg-cream-50">
      {/* Hero with Auburn Image */}
      <section className="relative h-[400px] md:h-[500px]">
        <AuburnHeroImage imageId="dining-old-town-restaurants">
          <div className="container mx-auto px-4 text-center">
            <span className="inline-block px-4 py-2 bg-gold-500/90 text-white text-sm font-semibold rounded-full mb-4">
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

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <Breadcrumbs items={breadcrumbs} />

          {/* Intro with Auburn Images */}
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
                className="rounded-lg w-full h-[300px] object-cover"
              />
            </div>
          </div>

          {/* Additional Auburn Image */}
          <div className="mb-12">
            <AuburnImage 
              imageId="dining-winery-tasting"
              className="rounded-lg w-full h-[400px] object-cover"
            />
          </div>

          <ListingGrid
            items={dining}
            itemType="dining"
            showFilters={true}
          />
        </div>
      </section>

      {/* Related Pages */}
      <RelatedPages currentPath="/dining" />
    </div>
  )
}
