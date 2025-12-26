import { buildMetadata, SITE_URL } from '@/lib/seo'
import { Search as SearchIcon } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}): Promise<Metadata> {
  const params = await searchParams
  const query = params.q || ''
  
  return buildMetadata({
    title: query ? `Search Results for "${query}"` : 'Search Auburn',
    description: 'Search for accommodations, activities, restaurants, and events in Auburn, California.',
    canonical: `${SITE_URL}/search${query ? `?q=${query}` : ''}`,
  })
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const params = await searchParams
  const query = params.q || ''

  // Mock results - replace with actual search implementation
  const mockResults = query ? [
    {
      id: '1',
      type: 'activity',
      title: 'Auburn State Recreation Area',
      description: 'Explore miles of scenic trails along the American River canyon.',
      slug: '/things-to-do/outdoor-adventures/auburn-state-recreation-area',
      category: 'Outdoor Adventures',
    },
    {
      id: '2',
      type: 'dining',
      title: 'Historic Downtown Restaurants',
      description: 'Discover authentic Gold Country cuisine in our historic district.',
      slug: '/dining',
      category: 'Dining',
    },
    {
      id: '3',
      type: 'accommodation',
      title: 'Gold Country Inns',
      description: 'Charming bed & breakfasts in historic Auburn.',
      slug: '/accommodations',
      category: 'Accommodations',
    },
  ] : []

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-16">
        <div className="container max-w-4xl">
          <div className="flex items-center justify-center mb-6">
            <SearchIcon className="w-16 h-16" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            {query ? `Search Results for "${query}"` : 'Search Auburn'}
          </h1>
          
          {/* Search Bar */}
          <form action="/search" method="GET" className="relative">
            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Search for places, activities, restaurants..."
              className="w-full px-6 py-4 pr-14 text-lg rounded-2xl text-gray-900 shadow-2xl focus:outline-none focus:ring-4 focus:ring-white/30"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              <SearchIcon className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>

      {/* Results */}
      <div className="container py-16 max-w-4xl">
        {!query ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">Enter a search term to find what you're looking for.</p>
            
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Searches</h2>
              <div className="flex flex-wrap justify-center gap-3">
                {['Hiking Trails', 'Historic Sites', 'Restaurants', 'Hotels', 'Events', 'Gold Rush'].map((term) => (
                  <Link
                    key={term}
                    href={`/search?q=${encodeURIComponent(term)}`}
                    className="px-6 py-3 bg-white border border-gray-200 rounded-full hover:border-blue-500 hover:text-blue-600 transition-colors shadow-sm hover:shadow-md"
                  >
                    {term}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : mockResults.length > 0 ? (
          <>
            <p className="text-gray-600 mb-8">
              Found {mockResults.length} result{mockResults.length !== 1 ? 's' : ''} for "{query}"
            </p>
            
            <div className="space-y-6">
              {mockResults.map((result) => (
                <Link
                  key={result.id}
                  href={result.slug}
                  className="block bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 p-6 border border-gray-200 hover:border-blue-500"
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h2 className="text-2xl font-bold text-gray-900 hover:text-blue-600">
                      {result.title}
                    </h2>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full whitespace-nowrap">
                      {result.category}
                    </span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {result.description}
                  </p>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <SearchIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Results Found</h2>
            <p className="text-gray-600 mb-8">
              We couldn't find anything matching "{query}". Try a different search term.
            </p>
            
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Suggestions:</h3>
              <ul className="text-left max-w-md mx-auto space-y-2 text-gray-600">
                <li>• Check your spelling</li>
                <li>• Try more general keywords</li>
                <li>• Try different keywords</li>
                <li>• Browse our main categories instead</li>
              </ul>
              
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link href="/things-to-do" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors">
                  Browse Activities
                </Link>
                <Link href="/dining" className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-900 font-semibold rounded-full hover:border-blue-600 hover:text-blue-600 transition-colors">
                  Browse Dining
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

