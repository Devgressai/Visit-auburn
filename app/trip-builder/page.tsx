import { buildMetadata, SITE_URL } from '@/lib/seo'
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs'
import { RelatedPages } from '@/components/ui/RelatedPages'
import { AuburnHeroImage } from '@/components/ui/AuburnImage'
import { generateBreadcrumbs } from '@/lib/routes'
import { TripBuilderWizard } from '@/components/trip-builder/TripBuilderWizard'
import type { Metadata } from 'next'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Trip Builder - Plan Your Perfect Auburn Visit',
    description: 'Build your custom Auburn itinerary in minutes. Choose your duration, group, vibe, and pace to get a personalized day-by-day plan for your Gold Country visit.',
    canonical: `${SITE_URL}/trip-builder`,
  })
}

export default async function TripBuilderPage() {
  const breadcrumbs = generateBreadcrumbs('/trip-builder')

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-[400px] md:h-[500px]">
        <AuburnHeroImage imageId="hero-american-river-canyon">
          <div className="container mx-auto px-4 text-center">
            <span className="inline-block px-4 py-2 bg-lake-500/90 text-white text-sm font-semibold rounded-full mb-4">
              Plan Your Perfect Trip
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Trip Builder
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Create your custom Auburn itinerary in minutes
            </p>
          </div>
        </AuburnHeroImage>
      </section>

      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-4 bg-white">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      {/* Main Content */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <TripBuilderWizard />
        </div>
      </section>

      <RelatedPages currentPath="/trip-builder" />
    </div>
  )
}
