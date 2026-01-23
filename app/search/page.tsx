import { buildMetadata, SITE_URL } from '@/lib/seo'
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs'
import { RelatedPages } from '@/components/ui/RelatedPages'
import { generateBreadcrumbs } from '@/lib/routes'
import { Search as SearchIcon } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'
import { buildSearchDocuments } from '@/lib/search/index.server'
import { createSearchIndex, searchIndex, type SearchDocumentType } from '@/lib/search/core'

// Force dynamic rendering since we use searchParams
export const dynamic = 'force-dynamic'

// Build index once at module init time
let searchIndexInstance: ReturnType<typeof createSearchIndex> | null = null

function getSearchIndex() {
  if (!searchIndexInstance) {
    const documents = buildSearchDocuments()
    searchIndexInstance = createSearchIndex(documents)
  }
  return searchIndexInstance
}

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
  searchParams: Promise<{ q?: string; type?: string }>
}) {
  const params = await searchParams
  const query = params.q || ''
  const typeFilter = params.type || ''
  const breadcrumbs = generateBreadcrumbs('/search')

  // Search directly using server function (no HTTP fetch)
  let searchResults: Array<{
    id: string
    type: string
    title: string
    href: string
    snippet: string
    tags?: string[]
    location?: string
  }> = []

  if (query) {
    try {
      const index = getSearchIndex()
      searchResults = searchIndex(index, query, {
        type: typeFilter as SearchDocumentType | undefined,
        limit: 20,
      })
    } catch (error) {
      console.error('Search error:', error)
    }
  }

  // Type labels for display
  const typeLabels: Record<string, string> = {
    activity: 'Activity',
    accommodation: 'Accommodation',
    dining: 'Dining',
    event: 'Event',
    editorial: 'Article',
    attraction: 'Attraction',
    venue: 'Venue',
  }

  // Available type filters
  const typeFilters = [
    { value: '', label: 'All' },
    { value: 'activity', label: 'Activities' },
    { value: 'accommodation', label: 'Accommodations' },
    { value: 'dining', label: 'Dining' },
    { value: 'event', label: 'Events' },
    { value: 'editorial', label: 'Articles' },
    { value: 'venue', label: 'Venues' },
  ]

  const featuredCategories = [
    { name: 'Outdoor Adventures', href: '/things-to-do/outdoor-adventures', icon: '🏔️', count: '20+ trails' },
    { name: 'Historic Sites', href: '/things-to-do/history-culture', icon: '🏛️', count: '15+ sites' },
    { name: 'Restaurants', href: '/dining', icon: '🍽️', count: '30+ options' },
    { name: 'Hotels & Lodging', href: '/accommodations', icon: '🛏️', count: '12+ properties' },
    { name: 'Events', href: '/events', icon: '📅', count: 'Year-round' },
    { name: 'Wineries', href: '/dining', icon: '🍷', count: '10+ wineries' },
  ]

  const popularDirectories = [
    { name: 'Gold Rush History', href: '/things-to-do/history-culture', description: 'Museums, historic sites, and Gold Country heritage' },
    { name: 'Hiking & Trails', href: '/things-to-do/outdoor-adventures', description: 'Scenic trails, waterfalls, and outdoor recreation' },
    { name: 'Old Town Dining', href: '/dining', description: 'Restaurants, cafes, and breweries in historic downtown' },
    { name: 'Wedding Venues', href: '/plan/weddings', description: 'Historic estates, gardens, and scenic outdoor spaces' },
    { name: 'Meeting Spaces', href: '/plan/meetings', description: 'Conference centers and corporate event venues' },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - White background with blue accent */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-lake-500 to-lake-600 text-white">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-center mb-6">
            <SearchIcon className="w-16 h-16" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center font-display">
            {query ? `Search Results for "${query}"` : 'Search Auburn'}
          </h1>
          
          {/* Search Bar */}
          <form action="/search" method="GET" className="relative">
            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Search for places, activities, restaurants..."
              className="w-full px-6 py-4 pr-14 text-lg rounded-2xl text-charcoal-900 shadow-2xl focus:outline-none focus:ring-4 focus:ring-white/30"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-lake-600 text-white rounded-xl hover:bg-lake-700 transition-colors"
              aria-label="Search"
            >
              <SearchIcon className="w-5 h-5" />
            </button>
          </form>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-4 bg-white">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      {/* Results */}
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {!query ? (
          <div className="space-y-16">
            {/* Featured Categories */}
            <section>
              <h2 className="text-3xl font-bold text-charcoal-900 mb-6 text-center font-display">
                Featured Categories
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {featuredCategories.map((category) => (
                  <Link
                    key={category.name}
                    href={category.href}
                    className="bg-cream-50 rounded-xl p-6 text-center hover:bg-cream-100 transition-colors border border-charcoal-100 group"
                  >
                    <div className="text-4xl mb-2">{category.icon}</div>
                    <h3 className="font-bold text-charcoal-900 mb-1 group-hover:text-lake-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-charcoal-600">{category.count}</p>
                  </Link>
                ))}
              </div>
            </section>

            {/* Popular Directories */}
            <section>
              <h2 className="text-3xl font-bold text-charcoal-900 mb-6 text-center font-display">
                Popular Directories
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {popularDirectories.map((directory) => (
                  <Link
                    key={directory.name}
                    href={directory.href}
                    className="bg-white rounded-xl p-6 border border-charcoal-200 hover:border-lake-500 hover:shadow-lg transition-all group"
                  >
                    <h3 className="text-xl font-bold text-charcoal-900 mb-2 group-hover:text-lake-600 transition-colors font-display">
                      {directory.name}
                    </h3>
                    <p className="text-charcoal-600 leading-relaxed">
                      {directory.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>

            {/* Popular Searches */}
            <section>
              <h2 className="text-3xl font-bold text-charcoal-900 mb-6 text-center font-display">
                Popular Searches
              </h2>
              <div className="flex flex-wrap justify-center gap-3">
                {['Hiking Trails', 'Historic Sites', 'Restaurants', 'Hotels', 'Events', 'Gold Rush', 'Wineries', 'Museums', 'Parks', 'Breweries'].map((term) => (
                  <Link
                    key={term}
                    href={`/search?q=${encodeURIComponent(term)}`}
                    className="px-6 py-3 bg-cream-50 border border-charcoal-200 rounded-full hover:border-lake-500 hover:text-lake-600 hover:bg-white transition-colors shadow-sm hover:shadow-md font-semibold"
                  >
                    {term}
                  </Link>
                ))}
              </div>
            </section>
          </div>
        ) : searchResults.length > 0 ? (
          <>
            {/* Type Filters */}
            <div className="mb-8 flex flex-wrap gap-2">
              {typeFilters.map((filter) => {
                const isActive = filter.value === typeFilter
                const searchParams = new URLSearchParams()
                searchParams.set('q', query)
                // Only include type param if it's non-empty
                if (filter.value) {
                  searchParams.set('type', filter.value)
                }
                const href = `/search?${searchParams.toString()}`
                
                return (
                  <Link
                    key={filter.value}
                    href={href}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                      isActive
                        ? 'bg-lake-600 text-white'
                        : 'bg-cream-50 text-charcoal-700 hover:bg-cream-100 border border-charcoal-200'
                    }`}
                  >
                    {filter.label}
                  </Link>
                )
              })}
            </div>

            <p className="text-charcoal-600 mb-8 text-lg">
              Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "<strong>{query}</strong>"
              {typeFilter && ` in ${typeLabels[typeFilter] || typeFilter}`}
            </p>
            
            <div className="space-y-6">
              {searchResults.map((result) => (
                <Link
                  key={result.id}
                  href={result.href}
                  className="block bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 p-6 border border-charcoal-200 hover:border-lake-500"
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h2 className="text-2xl font-bold text-charcoal-900 hover:text-lake-600 transition-colors font-display">
                      {result.title}
                    </h2>
                    <span className="px-3 py-1 bg-lake-100 text-lake-700 text-sm font-semibold rounded-full whitespace-nowrap">
                      {typeLabels[result.type] || result.type}
                    </span>
                  </div>
                  <p className="text-charcoal-600 leading-relaxed mb-2">
                    {result.snippet}
                  </p>
                  {(result.location || result.tags) && (
                    <div className="flex flex-wrap gap-2 text-sm text-charcoal-500">
                      {result.location && (
                        <span className="flex items-center gap-1">
                          📍 {result.location}
                        </span>
                      )}
                      {result.tags && result.tags.length > 0 && (
                        <span className="flex items-center gap-1">
                          🏷️ {result.tags.slice(0, 3).join(', ')}
                        </span>
                      )}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <SearchIcon className="w-16 h-16 text-charcoal-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-charcoal-900 mb-2 font-display">No Results Found</h2>
            <p className="text-charcoal-600 mb-8 text-lg">
              We couldn't find anything matching "<strong>{query}</strong>". Try a different search term or browse our categories below.
            </p>
            
            <div className="mt-12">
              <h3 className="text-lg font-semibold text-charcoal-900 mb-4">Suggestions:</h3>
              <ul className="text-left max-w-md mx-auto space-y-2 text-charcoal-600 mb-8">
                <li>• Check your spelling</li>
                <li>• Try more general keywords</li>
                <li>• Try different keywords</li>
                <li>• Browse our main categories instead</li>
              </ul>
              
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link href="/things-to-do" className="px-6 py-3 bg-lake-600 text-white font-semibold rounded-lg hover:bg-lake-700 transition-colors">
                  Browse Activities
                </Link>
                <Link href="/dining" className="px-6 py-3 bg-white border-2 border-charcoal-300 text-charcoal-900 font-semibold rounded-lg hover:border-lake-600 hover:text-lake-600 transition-colors">
                  Browse Dining
                </Link>
                <Link href="/accommodations" className="px-6 py-3 bg-white border-2 border-charcoal-300 text-charcoal-900 font-semibold rounded-lg hover:border-lake-600 hover:text-lake-600 transition-colors">
                  Browse Lodging
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Related Pages */}
      <RelatedPages currentPath="/search" />
    </div>
  )
}


