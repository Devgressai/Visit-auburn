import { accommodations } from '@/lib/data'
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
    title: 'Where to Stay in Auburn, California',
    description: 'Find the perfect place to stay in Auburn, CA. Hotels, vacation rentals, bed & breakfasts, and more in California\'s Gold Country.',
    canonical: `${SITE_URL}/accommodations`,
  })
}

export default async function AccommodationsPage() {
  const breadcrumbs = generateBreadcrumbs('/accommodations')

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero Section with Auburn Image */}
      <section className="relative h-[400px] md:h-[500px]">
        <AuburnHeroImage imageId="hero-old-town-clocktower">
          <div className="container mx-auto px-4 text-center">
            <span className="inline-block px-4 py-2 bg-gold-500/90 text-white text-sm font-semibold rounded-full mb-4">
              Auburn Lodging
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Where to Stay
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Rest easy in Auburn's finest hotels, charming inns, and unique vacation rentals
            </p>
          </div>
        </AuburnHeroImage>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <Breadcrumbs items={breadcrumbs} />

          {/* Intro Text with Auburn Images */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-charcoal-900 mb-4">
                Your Home Base in Gold Country
              </h2>
              <p className="text-charcoal-600 text-lg mb-6">
                From historic boutique hotels to modern comforts, Auburn offers the perfect 
                accommodations for your Gold Country getaway. Wake up refreshed and ready to explore.
              </p>
              <p className="text-charcoal-600">
                Whether you're seeking a romantic bed & breakfast in Old Town, a family-friendly 
                hotel near outdoor adventures, or a cozy cabin in the foothills, Auburn has lodging 
                to match every style and budget.
              </p>
            </div>
            <div>
              <AuburnImage 
                imageId="stay-historic-hotel"
                className="rounded-lg w-full h-[300px] object-cover"
              />
            </div>
          </div>

          {/* Additional Auburn Image */}
          <div className="mb-12">
            <AuburnImage 
              imageId="stay-cozy-room"
              className="rounded-lg w-full h-[400px] object-cover"
            />
          </div>

          <ListingGrid
            items={accommodations}
            itemType="accommodations"
            showFilters={true}
          />
        </div>
      </section>

      {/* Related Pages */}
      <RelatedPages currentPath="/accommodations" />
    </div>
  )
}
