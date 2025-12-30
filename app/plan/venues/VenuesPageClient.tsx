'use client'

import { Breadcrumbs } from '@/components/navigation/Breadcrumbs'
import { RelatedPages } from '@/components/ui/RelatedPages'
import { generateBreadcrumbs } from '@/lib/routes'
import { MapPin, Users, Wifi, Accessibility, ExternalLink, Filter, X } from 'lucide-react'
import { useState, useMemo } from 'react'
import { allVenues, getAllCategories } from '@/data/venues'
import Image from 'next/image'
import { getAuburnImagePath } from '@/data/auburnImages'
import Link from 'next/link'

export function VenuesPageClient() {
  const breadcrumbs = generateBreadcrumbs('/plan/venues')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedLocation, setSelectedLocation] = useState<'all' | 'auburn' | 'near'>('all')
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set())

  const categories = getAllCategories()

  const filteredVenues = useMemo(() => {
    let filtered = [...allVenues]

    // Filter by location
    if (selectedLocation === 'auburn') {
      filtered = filtered.filter(v => v.location.areaLabel.includes('Auburn 95603'))
    } else if (selectedLocation === 'near') {
      filtered = filtered.filter(v => v.location.areaLabel.includes('Near Auburn'))
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(v => v.categories.includes(selectedCategory))
    }

    return filtered
  }, [selectedCategory, selectedLocation])

  const handleImageError = (venueId: string) => {
    setImageErrors(prev => new Set(prev).add(venueId))
  }

  const clearFilters = () => {
    setSelectedCategory(null)
    setSelectedLocation('all')
  }

  const hasActiveFilters = selectedCategory !== null || selectedLocation !== 'all'

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - White background with image overlay */}
      <section className="relative h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
        <Image
          src={getAuburnImagePath('downtown-lincoln-way')}
          alt="Auburn, California event venues"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/70 via-charcoal-800/60 to-charcoal-900/70" />
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-display">
            Event Venues in Auburn
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            From intimate gatherings to large-scale events, Auburn offers versatile venues for every occasion
          </p>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-4 bg-white">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      {/* Filters Section - White background */}
      <section className="py-8 bg-white border-b border-charcoal-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-charcoal-600" />
              <span className="font-semibold text-charcoal-900">Filters:</span>
            </div>
            
            {/* Location Filter */}
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedLocation('all')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  selectedLocation === 'all'
                    ? 'bg-lake-600 text-white'
                    : 'bg-cream-50 text-charcoal-700 hover:bg-cream-100'
                }`}
              >
                All Locations
              </button>
              <button
                onClick={() => setSelectedLocation('auburn')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  selectedLocation === 'auburn'
                    ? 'bg-lake-600 text-white'
                    : 'bg-cream-50 text-charcoal-700 hover:bg-cream-100'
                }`}
              >
                Auburn 95603
              </button>
              <button
                onClick={() => setSelectedLocation('near')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  selectedLocation === 'near'
                    ? 'bg-lake-600 text-white'
                    : 'bg-cream-50 text-charcoal-700 hover:bg-cream-100'
                }`}
              >
                Near Auburn
              </button>
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory || ''}
              onChange={(e) => setSelectedCategory(e.target.value || null)}
              className="px-4 py-2 rounded-lg border border-charcoal-300 bg-white text-charcoal-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-lake-500"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-charcoal-600 hover:text-charcoal-900 transition-colors"
              >
                <X className="w-4 h-4" />
                Clear Filters
              </button>
            )}
          </div>

          {hasActiveFilters && (
            <p className="text-sm text-charcoal-600">
              Showing {filteredVenues.length} venue{filteredVenues.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      </section>

      {/* Venues Grid - White background */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          {filteredVenues.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-charcoal-600 mb-4">No venues found matching your filters.</p>
              <button
                onClick={clearFilters}
                className="btn-primary"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVenues.map((venue) => {
                const venueImage = getAuburnImagePath(venue.imageId)
                const fallbackImage = '/images/discover.jpg'
                const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.googleMapsQuery)}`
                
                return (
                  <div
                    key={venue.id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-charcoal-100 group"
                  >
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={imageErrors.has(venue.id) ? fallbackImage : venueImage}
                        alt={`${venue.name} in ${venue.location.areaLabel}`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        onError={() => handleImageError(venue.id)}
                      />
                      {venue.capacity?.max && (
                        <div className="absolute top-4 right-4 px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full font-semibold text-charcoal-900 flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          Up to {venue.capacity.max}
                        </div>
                      )}
                      {venue.location.areaLabel.includes('Near Auburn') && (
                        <div className="absolute top-4 left-4 px-3 py-1.5 bg-charcoal-900/80 backdrop-blur-sm rounded-full text-white text-xs font-semibold">
                          Near Auburn
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h2 className="text-2xl font-bold text-charcoal-900 mb-2 group-hover:text-lake-600 transition-colors font-display">
                        {venue.name}
                      </h2>
                      
                      <div className="flex items-center gap-2 text-charcoal-600 mb-4">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{venue.location.areaLabel}</span>
                      </div>

                      <p className="text-charcoal-700 mb-4 leading-relaxed">
                        {venue.description}
                      </p>

                      {/* Categories */}
                      {venue.categories.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {venue.categories.slice(0, 3).map((category) => (
                            <span
                              key={category}
                              className="px-3 py-1 bg-lake-100 text-lake-700 text-xs font-semibold rounded-full capitalize"
                            >
                              {category}
                            </span>
                          ))}
                          {venue.categories.length > 3 && (
                            <span className="px-3 py-1 bg-charcoal-100 text-charcoal-600 text-xs font-semibold rounded-full">
                              +{venue.categories.length - 3}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Capacity Details */}
                      {venue.capacity && (
                        <div className="mb-4 pb-4 border-t border-charcoal-100 pt-4">
                          <p className="text-xs text-charcoal-500 mb-2 font-semibold">Capacity:</p>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            {venue.capacity.theater && (
                              <div>
                                <span className="text-charcoal-500">Theater:</span>
                                <span className="font-semibold text-charcoal-900 ml-1">{venue.capacity.theater}</span>
                              </div>
                            )}
                            {venue.capacity.banquet && (
                              <div>
                                <span className="text-charcoal-500">Banquet:</span>
                                <span className="font-semibold text-charcoal-900 ml-1">{venue.capacity.banquet}</span>
                              </div>
                            )}
                            {venue.capacity.reception && (
                              <div>
                                <span className="text-charcoal-500">Reception:</span>
                                <span className="font-semibold text-charcoal-900 ml-1">{venue.capacity.reception}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Amenities */}
                      {venue.amenities.length > 0 && (
                        <div className="flex flex-wrap gap-3 pt-4 border-t border-charcoal-100">
                          {venue.amenities.slice(0, 4).map((amenity) => (
                            <div
                              key={amenity}
                              className="flex items-center gap-1 text-xs text-charcoal-600"
                              title={amenity}
                            >
                              {amenity === 'wifi' && <Wifi className="w-4 h-4" />}
                              {amenity === 'accessible' && <Accessibility className="w-4 h-4" />}
                              {amenity === 'parking' && <span>🅿️</span>}
                              {amenity === 'outdoor' && <span>🌳</span>}
                            </div>
                          ))}
                          {venue.amenities.length > 4 && (
                            <span className="text-xs text-charcoal-500">
                              +{venue.amenities.length - 4} more
                            </span>
                          )}
                        </div>
                      )}

                      {/* Actions */}
                      <div className="mt-4 pt-4 border-t border-charcoal-100">
                        <a
                          href={googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-semibold text-lake-600 hover:text-lake-700 transition-colors"
                        >
                          View on Map
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section - Blue accent band */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-lake-500 to-lake-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">
              Need Help Finding the Perfect Venue?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Our team can help you find and book the ideal venue for your event
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/plan/meetings"
                className="px-8 py-4 bg-white text-lake-600 font-bold rounded-lg hover:bg-cream-50 transition-colors shadow-lg"
              >
                Corporate Events
              </Link>
              <Link
                href="/plan/weddings"
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors"
              >
                Weddings
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Pages */}
      {/* RelatedPages are rendered in server component */}
    </div>
  )
}

