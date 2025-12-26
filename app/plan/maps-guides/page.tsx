import { buildMetadata, SITE_URL } from '@/lib/seo'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Maps & Guides for Auburn, California',
    description: 'Download maps and guides for Auburn, CA. Get printable maps, digital guides, and helpful resources for exploring Gold Country.',
    canonical: `${SITE_URL}/plan/maps-guides`,
  })
}

export default function MapsGuidesPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Maps & Guides</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Download helpful maps and guides for exploring Auburn and the surrounding Gold Country area.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <h2>Area Maps</h2>
          <p>
            Access detailed maps of Auburn and surrounding areas to help you navigate during your visit.
          </p>

          <h2>Travel Guides</h2>
          <p>
            Download comprehensive travel guides featuring itineraries, recommendations, and insider
            tips for making the most of your time in Auburn.
          </p>

          <h2>Interactive Maps</h2>
          <p>
            Explore our interactive maps to discover accommodations, dining, activities, and points
            of interest throughout the area.
          </p>
        </div>
      </div>
    </div>
  )
}

