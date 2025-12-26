import { dining } from '@/lib/data'
import { buildMetadata, SITE_URL } from '@/lib/seo'
import { PageHero } from '@/components/ui/PageHero'
import { ListingGrid } from '@/components/listings/ListingGrid'
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
  return (
    <div className="min-h-screen bg-cream-50">
      <PageHero
        title="Food & Drink"
        subtitle="Savor the flavors of Gold Country at Auburn's best restaurants, wineries, and cafes"
        badge="Auburn Dining"
        imageKey="dining"
        size="md"
      />

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {/* Intro Text */}
          <div className="max-w-3xl mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-charcoal-900 mb-4">
              A Taste of Gold Country
            </h2>
            <p className="text-charcoal-600 text-lg">
              From farm-to-fork dining to award-winning wineries, Auburn's culinary scene 
              reflects the rich bounty of the Sierra foothills. Pull up a chair and dig in.
            </p>
          </div>

          <ListingGrid
            items={dining}
            itemType="dining"
            showFilters={true}
          />
        </div>
      </section>
    </div>
  )
}
