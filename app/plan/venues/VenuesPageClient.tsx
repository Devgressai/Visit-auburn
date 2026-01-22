'use client'

import { Breadcrumbs } from '@/components/navigation/Breadcrumbs'
import { generateBreadcrumbs } from '@/lib/routes'
import { MapPin, Users, Wifi, Accessibility, ExternalLink, Filter, X, Calendar, Phone, Image as ImageIcon, ArrowRight } from 'lucide-react'
import { useState, useMemo } from 'react'
import { allVenues, getAllCategories } from '@/data/venues'
import Image from 'next/image'
import { getAuburnImagePath } from '@/data/auburnImages'
import Link from 'next/link'

// Organize venues by category for structured display
const getVenuesByCategory = (category: string) => {
  return allVenues.filter(v => v.categories.includes(category))
}

// Categorize venues for section display
const indoorVenues = allVenues.filter(v => v.categories.includes('indoor') && !v.categories.includes('outdoor'))
const outdoorVenues = allVenues.filter(v => v.categories.includes('outdoor'))
const historicVenues = allVenues.filter(v => v.categories.includes('historic'))
const largeScaleVenues = allVenues.filter(v => (v.capacity?.max || 0) >= 200)
const boutiqueVenues = allVenues.filter(v => (v.capacity?.max || 0) < 150 && !v.categories.includes('fairgrounds'))

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

  // Get best use cases for a venue
  const getBestUseCases = (venue: typeof allVenues[0]) => {
    const uses: string[] = []
    if (venue.categories.includes('theater') || venue.capacity?.theater) uses.push('Presentations')
    if (venue.categories.includes('historic')) uses.push('Cultural Events')
    if (venue.categories.includes('outdoor')) uses.push('Outdoor Gatherings')
    if (venue.capacity?.reception) uses.push('Receptions')
    if (venue.capacity?.banquet) uses.push('Banquets')
    if (venue.categories.includes('park')) uses.push('Community Events')
    if (venue.categories.includes('museum')) uses.push('Educational Events')
    if (venue.categories.includes('fairgrounds')) uses.push('Large Festivals')
    if (venue.categories.includes('theater')) uses.push('Performances')
    if (!uses.length) uses.push('General Events')
    return uses
  }

  // Get capacity type
  const getCapacityType = (venue: typeof allVenues[0]) => {
    const max = venue.capacity?.max || 0
    if (max >= 300) return 'Large Scale'
    if (max >= 150) return 'Medium Scale'
    return 'Small Scale'
  }

  // Get location context
  const getLocationContext = (venue: typeof allVenues[0]) => {
    if (venue.location.address?.includes('High Street') || venue.location.address?.includes('Lincoln Way')) {
      return 'Downtown Auburn'
    }
    if (venue.location.address?.includes('Old Town') || venue.name.toLowerCase().includes('old town')) {
      return 'Old Town Auburn'
    }
    if (venue.categories.includes('park') || venue.categories.includes('outdoor')) {
      return 'Auburn Foothills'
    }
    return 'Auburn, CA'
  }

  // Render venue card CTAs
  const renderVenueCTAs = (venue: typeof allVenues[0]) => {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.googleMapsQuery)}`
    const contactUrl = `/contact?venue=${encodeURIComponent(venue.name)}`
    const phoneUrl = venue.phone ? `tel:${venue.phone.replace(/\D/g, '')}` : null

    return (
      <div className="pt-4 border-t border-charcoal-100">
        <div className="grid grid-cols-2 gap-2">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-lake-600 hover:text-lake-700 hover:bg-lake-50 rounded-lg transition-colors"
          >
            <MapPin className="w-3.5 h-3.5" />
            View Venue
          </a>
          <a
            href={contactUrl}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-lake-600 hover:text-lake-700 hover:bg-lake-50 rounded-lg transition-colors"
          >
            <Calendar className="w-3.5 h-3.5" />
            Check Availability
          </a>
          {phoneUrl ? (
            <a
              href={phoneUrl}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-lake-600 hover:text-lake-700 hover:bg-lake-50 rounded-lg transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              Contact
            </a>
          ) : (
            <a
              href={contactUrl}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-lake-600 hover:text-lake-700 hover:bg-lake-50 rounded-lg transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              Contact
            </a>
          )}
          {venue.website ? (
            <a
              href={venue.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-lake-600 hover:text-lake-700 hover:bg-lake-50 rounded-lg transition-colors"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              View Gallery
            </a>
          ) : (
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-lake-600 hover:text-lake-700 hover:bg-lake-50 rounded-lg transition-colors"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              View Gallery
            </a>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden">
        <Image
          src={getAuburnImagePath('hero-old-town-clocktower')}
          alt="Historic Old Town Auburn California event venues in Gold Country"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/75 via-charcoal-800/65 to-charcoal-900/75" />
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 font-display text-balance">
            Event Venues in Auburn, California
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-white/95 max-w-4xl mx-auto leading-relaxed mb-8">
            From historic Gold Rush halls to scenic outdoor spaces—discover premier venues for weddings, meetings, and celebrations in California's Gold Country
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#venues"
              className="px-8 py-4 bg-white text-charcoal-900 font-bold rounded-lg hover:bg-cream-50 transition-colors shadow-lg"
            >
              Explore Venues
            </Link>
            <Link
              href="/plan/weddings"
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors"
            >
              Wedding Venues
            </Link>
          </div>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-4 bg-white border-b border-charcoal-100">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      {/* Introduction Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-charcoal-700 leading-relaxed mb-6">
              Nestled in the <strong>Sierra Foothills</strong> of <strong>Placer County</strong>, Auburn, California stands as a premier destination for events of all scales. This historic Gold Rush town, founded during the 1849 California Gold Rush, offers a unique blend of heritage architecture, modern amenities, and breathtaking natural settings.
            </p>
            <p className="text-lg text-charcoal-600 leading-relaxed mb-6">
              From the charming brick facades of <strong>Old Town Auburn</strong> to the panoramic vistas of the <strong>American River Canyon</strong>, Auburn's event venues reflect the authentic character of California's Gold Country. Whether you're planning an intimate wedding ceremony, a corporate retreat, a community festival, or a cultural celebration, Auburn provides venues that combine historic charm with contemporary functionality.
            </p>
            <p className="text-lg text-charcoal-600 leading-relaxed">
              Our venues serve diverse event types including <strong>weddings</strong>, <strong>corporate events</strong>, <strong>retreats</strong>, <strong>community gatherings</strong>, <strong>cultural events</strong>, and <strong>outdoor celebrations</strong>. Each space tells a story of Auburn's rich history while offering the modern amenities and professional service your event deserves.
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-cream-50 border-b border-charcoal-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-charcoal-600" />
              <span className="font-semibold text-charcoal-900">Filter Venues:</span>
            </div>
            
            {/* Location Filter */}
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedLocation('all')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  selectedLocation === 'all'
                    ? 'bg-lake-600 text-white'
                    : 'bg-white text-charcoal-700 hover:bg-cream-100 border border-charcoal-200'
                }`}
              >
                All Locations
              </button>
              <button
                onClick={() => setSelectedLocation('auburn')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  selectedLocation === 'auburn'
                    ? 'bg-lake-600 text-white'
                    : 'bg-white text-charcoal-700 hover:bg-cream-100 border border-charcoal-200'
                }`}
              >
                Auburn 95603
              </button>
              <button
                onClick={() => setSelectedLocation('near')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  selectedLocation === 'near'
                    ? 'bg-lake-600 text-white'
                    : 'bg-white text-charcoal-700 hover:bg-cream-100 border border-charcoal-200'
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
                  {cat.charAt(0).toUpperCase() + cat.slice(1).replace(/-/g, ' ')}
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

      {/* Venue Categories - Only show when no filters active */}
      {!hasActiveFilters && (
        <>
          {/* Indoor Venues Section */}
          {indoorVenues.length > 0 && (
            <section id="venues" className="py-16 md:py-24 bg-white">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-charcoal-900 mb-4 font-display">
                  Indoor Venues
                </h2>
                <p className="text-lg text-charcoal-600 mb-12 max-w-3xl">
                  Climate-controlled spaces perfect for year-round events, from intimate meetings to large receptions.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {indoorVenues.slice(0, 6).map((venue) => {
                    const venueImage = getAuburnImagePath(venue.imageId)
                    
                    return (
                      <div
                        key={venue.id}
                        className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-charcoal-100 group"
                      >
                        <div className="relative h-64 overflow-hidden">
                          <Image
                            src={imageErrors.has(venue.id) ? '/images/discover.jpg' : venueImage}
                            alt={`${venue.name} indoor event venue in ${getLocationContext(venue)}, Auburn California`}
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
                        </div>
                        <div className="p-6">
                          <h3 className="text-2xl font-bold text-charcoal-900 mb-2 group-hover:text-lake-600 transition-colors font-display">
                            {venue.name}
                          </h3>
                          <div className="flex items-center gap-2 text-charcoal-600 mb-4">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm">{getLocationContext(venue)}</span>
                          </div>
                          <p className="text-charcoal-700 mb-4 leading-relaxed">
                            {venue.description}
                          </p>
                          <div className="mb-4">
                            <p className="text-xs text-charcoal-500 mb-2 font-semibold">Best for:</p>
                            <div className="flex flex-wrap gap-2">
                              {getBestUseCases(venue).slice(0, 3).map((use) => (
                                <span key={use} className="px-3 py-1 bg-lake-100 text-lake-700 text-xs font-semibold rounded-full">
                                  {use}
                                </span>
                              ))}
                            </div>
                          </div>
                          {renderVenueCTAs(venue)}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </section>
          )}

          {/* Outdoor Venues & Scenic Locations Section */}
          {outdoorVenues.length > 0 && (
            <section className="py-16 md:py-24 bg-cream-50">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-charcoal-900 mb-4 font-display">
                  Outdoor Venues & Scenic Locations
                </h2>
                <p className="text-lg text-charcoal-600 mb-12 max-w-3xl">
                  Breathtaking natural settings with panoramic views of the Sierra Foothills and American River Canyon.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {outdoorVenues.slice(0, 6).map((venue) => {
                    const venueImage = getAuburnImagePath(venue.imageId)
                    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.googleMapsQuery)}`
                    
                    return (
                      <div
                        key={venue.id}
                        className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-charcoal-100 group"
                      >
                        <div className="relative h-64 overflow-hidden">
                          <Image
                            src={imageErrors.has(venue.id) ? '/images/discover.jpg' : venueImage}
                            alt={`${venue.name} outdoor event venue in ${getLocationContext(venue)}, Auburn California with Sierra foothills views`}
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
                        </div>
                        <div className="p-6">
                          <h3 className="text-2xl font-bold text-charcoal-900 mb-2 group-hover:text-lake-600 transition-colors font-display">
                            {venue.name}
                          </h3>
                          <div className="flex items-center gap-2 text-charcoal-600 mb-4">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm">{getLocationContext(venue)}</span>
                          </div>
                          <p className="text-charcoal-700 mb-4 leading-relaxed">
                            {venue.description}
                          </p>
                          <div className="mb-4">
                            <p className="text-xs text-charcoal-500 mb-2 font-semibold">Best for:</p>
                            <div className="flex flex-wrap gap-2">
                              {getBestUseCases(venue).slice(0, 3).map((use) => (
                                <span key={use} className="px-3 py-1 bg-lake-100 text-lake-700 text-xs font-semibold rounded-full">
                                  {use}
                                </span>
                              ))}
                            </div>
                          </div>
                          {renderVenueCTAs(venue)}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </section>
          )}

          {/* Historic & Cultural Venues Section */}
          {historicVenues.length > 0 && (
            <section className="py-16 md:py-24 bg-white">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-charcoal-900 mb-4 font-display">
                  Historic & Cultural Venues
                </h2>
                <p className="text-lg text-charcoal-600 mb-12 max-w-3xl">
                  Authentic Gold Rush-era buildings and cultural landmarks that bring history to life.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {historicVenues.slice(0, 6).map((venue) => {
                    const venueImage = getAuburnImagePath(venue.imageId)
                    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.googleMapsQuery)}`
                    
                    return (
                      <div
                        key={venue.id}
                        className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-charcoal-100 group"
                      >
                        <div className="relative h-64 overflow-hidden">
                          <Image
                            src={imageErrors.has(venue.id) ? '/images/discover.jpg' : venueImage}
                            alt={`${venue.name} historic event venue in ${getLocationContext(venue)}, Auburn California Gold Country`}
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
                        </div>
                        <div className="p-6">
                          <h3 className="text-2xl font-bold text-charcoal-900 mb-2 group-hover:text-lake-600 transition-colors font-display">
                            {venue.name}
                          </h3>
                          <div className="flex items-center gap-2 text-charcoal-600 mb-4">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm">{getLocationContext(venue)}</span>
                          </div>
                          <p className="text-charcoal-700 mb-4 leading-relaxed">
                            {venue.description}
                          </p>
                          <div className="mb-4">
                            <p className="text-xs text-charcoal-500 mb-2 font-semibold">Best for:</p>
                            <div className="flex flex-wrap gap-2">
                              {getBestUseCases(venue).slice(0, 3).map((use) => (
                                <span key={use} className="px-3 py-1 bg-lake-100 text-lake-700 text-xs font-semibold rounded-full">
                                  {use}
                                </span>
                              ))}
                            </div>
                          </div>
                          {renderVenueCTAs(venue)}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </section>
          )}

          {/* Large-Scale Event Venues Section */}
          {largeScaleVenues.length > 0 && (
            <section className="py-16 md:py-24 bg-cream-50">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-charcoal-900 mb-4 font-display">
                  Large-Scale Event Venues
                </h2>
                <p className="text-lg text-charcoal-600 mb-12 max-w-3xl">
                  Spacious facilities designed for major celebrations, conferences, and community events.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {largeScaleVenues.slice(0, 6).map((venue) => {
                    const venueImage = getAuburnImagePath(venue.imageId)
                    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.googleMapsQuery)}`
                    
                    return (
                      <div
                        key={venue.id}
                        className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-charcoal-100 group"
                      >
                        <div className="relative h-64 overflow-hidden">
                          <Image
                            src={imageErrors.has(venue.id) ? '/images/discover.jpg' : venueImage}
                            alt={`${venue.name} large-scale event venue in ${getLocationContext(venue)}, Auburn California`}
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
                        </div>
                        <div className="p-6">
                          <h3 className="text-2xl font-bold text-charcoal-900 mb-2 group-hover:text-lake-600 transition-colors font-display">
                            {venue.name}
                          </h3>
                          <div className="flex items-center gap-2 text-charcoal-600 mb-4">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm">{getLocationContext(venue)}</span>
                          </div>
                          <p className="text-charcoal-700 mb-4 leading-relaxed">
                            {venue.description}
                          </p>
                          <div className="mb-4">
                            <p className="text-xs text-charcoal-500 mb-2 font-semibold">Best for:</p>
                            <div className="flex flex-wrap gap-2">
                              {getBestUseCases(venue).slice(0, 3).map((use) => (
                                <span key={use} className="px-3 py-1 bg-lake-100 text-lake-700 text-xs font-semibold rounded-full">
                                  {use}
                                </span>
                              ))}
                            </div>
                          </div>
                          {renderVenueCTAs(venue)}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </section>
          )}

          {/* Unique & Boutique Venues Section */}
          {boutiqueVenues.length > 0 && (
            <section className="py-16 md:py-24 bg-white">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-charcoal-900 mb-4 font-display">
                  Unique & Boutique Venues
                </h2>
                <p className="text-lg text-charcoal-600 mb-12 max-w-3xl">
                  Intimate and distinctive spaces perfect for smaller gatherings with character and charm.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {boutiqueVenues.slice(0, 6).map((venue) => {
                    const venueImage = getAuburnImagePath(venue.imageId)
                    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.googleMapsQuery)}`
                    
                    return (
                      <div
                        key={venue.id}
                        className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-charcoal-100 group"
                      >
                        <div className="relative h-64 overflow-hidden">
                          <Image
                            src={imageErrors.has(venue.id) ? '/images/discover.jpg' : venueImage}
                            alt={`${venue.name} boutique event venue in ${getLocationContext(venue)}, Auburn California`}
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
                        </div>
                        <div className="p-6">
                          <h3 className="text-2xl font-bold text-charcoal-900 mb-2 group-hover:text-lake-600 transition-colors font-display">
                            {venue.name}
                          </h3>
                          <div className="flex items-center gap-2 text-charcoal-600 mb-4">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm">{getLocationContext(venue)}</span>
                          </div>
                          <p className="text-charcoal-700 mb-4 leading-relaxed">
                            {venue.description}
                          </p>
                          <div className="mb-4">
                            <p className="text-xs text-charcoal-500 mb-2 font-semibold">Best for:</p>
                            <div className="flex flex-wrap gap-2">
                              {getBestUseCases(venue).slice(0, 3).map((use) => (
                                <span key={use} className="px-3 py-1 bg-lake-100 text-lake-700 text-xs font-semibold rounded-full">
                                  {use}
                                </span>
                              ))}
                            </div>
                          </div>
                          {renderVenueCTAs(venue)}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* All Venues Grid (when filters are active) */}
      {hasActiveFilters && (
        <section id="venues" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            {filteredVenues.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-charcoal-600 mb-4">No venues found matching your filters.</p>
                <button
                  onClick={clearFilters}
                  className="px-8 py-4 bg-lake-600 text-white font-bold rounded-lg hover:bg-lake-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-3xl md:text-4xl font-bold text-charcoal-900 mb-12 font-display">
                  Filtered Venues
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredVenues.map((venue) => {
                    const venueImage = getAuburnImagePath(venue.imageId)
                    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.googleMapsQuery)}`
                    
                    return (
                      <div
                        key={venue.id}
                        className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-charcoal-100 group"
                      >
                        <div className="relative h-64 overflow-hidden">
                          <Image
                            src={imageErrors.has(venue.id) ? '/images/discover.jpg' : venueImage}
                            alt={`${venue.name} event venue in ${getLocationContext(venue)}, Auburn California`}
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
                        </div>
                        <div className="p-6">
                          <h3 className="text-2xl font-bold text-charcoal-900 mb-2 group-hover:text-lake-600 transition-colors font-display">
                            {venue.name}
                          </h3>
                          <div className="flex items-center gap-2 text-charcoal-600 mb-4">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm">{getLocationContext(venue)}</span>
                          </div>
                          <p className="text-charcoal-700 mb-4 leading-relaxed">
                            {venue.description}
                          </p>
                          <div className="mb-4">
                            <p className="text-xs text-charcoal-500 mb-2 font-semibold">Best for:</p>
                            <div className="flex flex-wrap gap-2">
                              {getBestUseCases(venue).slice(0, 3).map((use) => (
                                <span key={use} className="px-3 py-1 bg-lake-100 text-lake-700 text-xs font-semibold rounded-full">
                                  {use}
                                </span>
                              ))}
                            </div>
                          </div>
                          {renderVenueCTAs(venue)}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </>
            )}
          </div>
        </section>
      )}

      {/* Scenic Auburn Image Gallery */}
      <section className="py-16 md:py-24 bg-cream-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal-900 mb-4 font-display text-center">
            Discover Auburn's Scenic Event Settings
          </h2>
          <p className="text-lg text-charcoal-600 mb-12 max-w-3xl mx-auto text-center">
            From the historic streets of Old Town to the panoramic vistas of the American River Canyon, Auburn offers stunning backdrops for your event.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative h-64 md:h-80 rounded-xl overflow-hidden group">
              <Image
                src={getAuburnImagePath('hero-old-town-clocktower')}
                alt="Historic Old Town Auburn California with clocktower, perfect for event photography"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="relative h-64 md:h-80 rounded-xl overflow-hidden group">
              <Image
                src={getAuburnImagePath('outdoor-overlook-park')}
                alt="Overlook Park panoramic views of Auburn California and Sierra foothills for outdoor events"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="relative h-64 md:h-80 rounded-xl overflow-hidden group">
              <Image
                src={getAuburnImagePath('outdoor-lake-clementine')}
                alt="Lake Clementine scenic setting in Auburn California for outdoor gatherings"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="relative h-64 md:h-80 rounded-xl overflow-hidden group">
              <Image
                src={getAuburnImagePath('downtown-lincoln-way')}
                alt="Downtown Auburn California Lincoln Way historic district for event venues"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="relative h-64 md:h-80 rounded-xl overflow-hidden group">
              <Image
                src={getAuburnImagePath('hero-american-river-canyon')}
                alt="American River Canyon scenic views near Auburn California for outdoor event venues"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="relative h-64 md:h-80 rounded-xl overflow-hidden group">
              <Image
                src={getAuburnImagePath('historic-gold-country-museum')}
                alt="Gold Country Museum historic venue in Auburn California for cultural events"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Planning CTA Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal-900 mb-6 font-display">
              Plan Your Event in Auburn
            </h2>
            <p className="text-lg text-charcoal-600 mb-12 leading-relaxed">
              Complete your event planning with Auburn's exceptional accommodations, dining, and activities. From group lodging to farm-to-table restaurants, we'll help you create an unforgettable experience.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
              <Link
                href="/accommodations"
                className="px-6 py-4 bg-cream-50 hover:bg-cream-100 rounded-lg text-charcoal-900 font-semibold transition-colors border border-charcoal-200"
              >
                Lodging
              </Link>
              <Link
                href="/dining"
                className="px-6 py-4 bg-cream-50 hover:bg-cream-100 rounded-lg text-charcoal-900 font-semibold transition-colors border border-charcoal-200"
              >
                Dining
              </Link>
              <Link
                href="/plan/getting-here"
                className="px-6 py-4 bg-cream-50 hover:bg-cream-100 rounded-lg text-charcoal-900 font-semibold transition-colors border border-charcoal-200"
              >
                Transportation
              </Link>
              <Link
                href="/things-to-do"
                className="px-6 py-4 bg-cream-50 hover:bg-cream-100 rounded-lg text-charcoal-900 font-semibold transition-colors border border-charcoal-200"
              >
                Activities
              </Link>
              <Link
                href="/plan/weddings"
                className="px-6 py-4 bg-cream-50 hover:bg-cream-100 rounded-lg text-charcoal-900 font-semibold transition-colors border border-charcoal-200"
              >
                Weddings
              </Link>
              <Link
                href="/plan/meetings"
                className="px-6 py-4 bg-cream-50 hover:bg-cream-100 rounded-lg text-charcoal-900 font-semibold transition-colors border border-charcoal-200"
              >
                Group Travel
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Block */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-lake-500 to-lake-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-display">
              Start Planning Your Auburn Event Experience
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Whether you're planning a wedding, corporate retreat, or community celebration, Auburn's unique venues and authentic Gold Country charm create memorable experiences for you and your guests.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/plan/weddings"
                className="px-8 py-4 bg-white text-lake-600 font-bold rounded-lg hover:bg-cream-50 transition-colors shadow-lg"
              >
                Plan a Wedding
              </Link>
              <Link
                href="/plan/meetings"
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors"
              >
                Plan a Meeting
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
