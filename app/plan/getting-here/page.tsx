import { buildMetadata, SITE_URL } from '@/lib/seo'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Getting to Auburn, California',
    description: 'Plan your trip to Auburn, CA. Find directions, transportation options, and travel information for visiting Gold Country.',
    canonical: `${SITE_URL}/plan/getting-here`,
  })
}

export default function GettingHerePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Getting to Auburn</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Plan your journey to Auburn, California - your guide to transportation and directions.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <h2>By Car</h2>
          <p>
            Auburn is easily accessible by car from major California cities. Located on Interstate 80,
            Auburn is approximately 30 miles northeast of Sacramento and 130 miles northeast of San Francisco.
          </p>

          <h2>Public Transportation</h2>
          <p>
            Public transportation options are available for visiting Auburn, including bus services
            connecting to surrounding areas.
          </p>

          <h2>Airports</h2>
          <p>
            The closest major airport is Sacramento International Airport (SMF), located approximately
            45 minutes from Auburn. Other nearby airports include San Francisco International Airport (SFO)
            and Reno-Tahoe International Airport (RNO).
          </p>
        </div>
      </div>
    </div>
  )
}

