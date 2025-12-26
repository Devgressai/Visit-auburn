import { buildMetadata, SITE_URL } from '@/lib/seo'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Visitor Information for Auburn, California',
    description: 'Essential visitor information for Auburn, CA including visitor centers, local resources, and helpful tips for your visit to Gold Country.',
    canonical: `${SITE_URL}/plan/visitor-information`,
  })
}

export default function VisitorInformationPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Visitor Information</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Everything you need to know for your visit to Auburn, California.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <h2>Visitor Centers</h2>
          <p>
            Visit our local visitor centers for maps, brochures, and personalized recommendations
            to help you make the most of your stay in Auburn.
          </p>

          <h2>Local Resources</h2>
          <p>
            Discover helpful resources including parking information, local services, and community
            guidelines to ensure a pleasant visit.
          </p>

          <h2>Weather & Seasons</h2>
          <p>
            Auburn experiences a Mediterranean climate with warm, dry summers and mild, wet winters.
            Check current weather conditions before your visit to plan accordingly.
          </p>
        </div>
      </div>
    </div>
  )
}

