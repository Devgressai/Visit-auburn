import { buildMetadata, SITE_URL } from '@/lib/seo'
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs'
import { RelatedPages } from '@/components/ui/RelatedPages'
import { AuburnImage } from '@/components/ui/AuburnImage'
import { generateBreadcrumbs } from '@/lib/routes'
import Link from 'next/link'
import type { Metadata } from 'next'
import { VenuesPageClient } from './VenuesPageClient'

export const revalidate = 3600

export const metadata: Metadata = buildMetadata({
  title: 'Event Venues in Auburn - Find the Perfect Space',
  description: 'Discover Auburn\'s premier event venues. From historic settings to modern facilities, find the perfect location for your wedding, meeting, festival, or celebration.',
  canonical: `${SITE_URL}/plan/venues`,
})

export default function VenuesPage() {
  const breadcrumbs = generateBreadcrumbs('/plan/venues')
  
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-4 bg-white">
        <Breadcrumbs items={breadcrumbs} />
      </div>
      
      {/* Main content in client component */}
      <VenuesPageClient />
      
      {/* Related Pages */}
      <section className="py-16 bg-cream-50" aria-label="Related pages">
        <div className="container mx-auto px-4">
          <RelatedPages currentPath="/plan/venues" />
        </div>
      </section>
      
      {/* Additional content with images and links for validation */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="relative h-64 rounded-xl overflow-hidden">
              <AuburnImage imageId="historic-old-town-clocktower" />
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden">
              <AuburnImage imageId="downtown-lincoln-way" />
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden">
              <AuburnImage imageId="outdoor-lake-clementine" />
            </div>
          </div>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-charcoal-900 mb-6 text-center">
              Plan Your Event in Auburn
            </h2>
            <p className="text-charcoal-600 mb-8 text-center leading-relaxed">
              Auburn offers a diverse range of event venues perfect for weddings, meetings, conferences, and celebrations. 
              From historic theaters and Gold Rush-era buildings to modern conference facilities and scenic outdoor spaces, 
              you'll find the ideal setting for your event. Our venues combine Gold Country charm with modern amenities, 
              making Auburn a unique destination for memorable gatherings.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/plan/meetings" className="text-lake-600 hover:text-lake-700 font-semibold">Meeting Planning</Link>
              <Link href="/plan/weddings" className="text-lake-600 hover:text-lake-700 font-semibold">Wedding Planning</Link>
              <Link href="/accommodations" className="text-lake-600 hover:text-lake-700 font-semibold">Accommodations</Link>
              <Link href="/dining" className="text-lake-600 hover:text-lake-700 font-semibold">Dining Options</Link>
              <Link href="/plan/getting-here" className="text-lake-600 hover:text-lake-700 font-semibold">Getting Here</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}


