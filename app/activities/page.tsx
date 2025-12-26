import { activities } from '@/lib/data'
import { buildMetadata, SITE_URL } from '@/lib/seo'
import { PageHero } from '@/components/ui/PageHero'
import { ListingGrid } from '@/components/listings/ListingGrid'
import type { Metadata } from 'next'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Things to Do in Auburn, California',
    description: 'Discover exciting activities and attractions in Auburn, CA. Outdoor recreation, historic sites, arts & culture, shopping, and more in Gold Country.',
    canonical: `${SITE_URL}/activities`,
  })
}

export default async function ActivitiesPage() {
  return (
    <div className="min-h-screen bg-cream-50">
      <PageHero
        title="Things to Do"
        subtitle="From scenic trails to Gold Rush history, discover everything Auburn has to offer"
        badge="Explore Auburn"
        imageKey="things-to-do"
        size="md"
      />

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {/* Intro Text */}
          <div className="max-w-3xl mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-charcoal-900 mb-4">
              Adventures Await in Gold Country
            </h2>
            <p className="text-charcoal-600 text-lg">
              Whether you're seeking outdoor thrills, cultural experiences, or a glimpse into 
              California's Gold Rush past, Auburn offers unforgettable activities for every interest.
            </p>
          </div>

          <ListingGrid
            items={activities}
            itemType="activities"
            showFilters={true}
          />
        </div>
      </section>
    </div>
  )
}
