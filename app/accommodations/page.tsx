import { accommodations } from '@/lib/data'
import { buildMetadata, SITE_URL } from '@/lib/seo'
import { PageHero } from '@/components/ui/PageHero'
import { ListingGrid } from '@/components/listings/ListingGrid'
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
  return (
    <div className="min-h-screen bg-cream-50">
      <PageHero
        title="Where to Stay"
        subtitle="Rest easy in Auburn's finest hotels, charming inns, and unique vacation rentals"
        badge="Auburn Lodging"
        imageKey="stay"
        size="md"
      />

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {/* Intro Text */}
          <div className="max-w-3xl mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-charcoal-900 mb-4">
              Your Home Base in Gold Country
            </h2>
            <p className="text-charcoal-600 text-lg">
              From historic boutique hotels to modern comforts, Auburn offers the perfect 
              accommodations for your Gold Country getaway. Wake up refreshed and ready to explore.
            </p>
          </div>

          <ListingGrid
            items={accommodations}
            itemType="accommodations"
            showFilters={true}
          />
        </div>
      </section>
    </div>
  )
}
