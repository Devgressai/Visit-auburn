import { buildMetadata, SITE_URL } from '@/lib/seo'
import { MapPin, Users, Wifi, Accessibility } from 'lucide-react'
import type { Metadata } from 'next'
import { exampleVenues } from '@/types/venue'
import Image from 'next/image'
import { getPlaceholderImage } from '@/lib/images'

export const metadata: Metadata = buildMetadata({
  title: 'Event Venues in Auburn - Find the Perfect Space',
  description: 'Discover Auburn\'s premier event venues. From historic settings to modern facilities, find the perfect location for your wedding, meeting, festival, or celebration.',
  canonical: `${SITE_URL}/plan/venues`,
})

export default function VenuesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-16 md:py-24">
        <div className="container">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center">
            Event Venues in Auburn
          </h1>
          <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto text-center leading-relaxed">
            From intimate gatherings to large-scale events, Auburn offers versatile venues for every occasion
          </p>
        </div>
      </div>

      {/* Venues Grid */}
      <div className="container py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {exampleVenues.map((venue) => (
            <div
              key={venue._id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={venue.image?.url || getPlaceholderImage('things-to-do')}
                  alt={venue.image?.alt || venue.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {venue.capacity && (
                  <div className="absolute top-4 right-4 px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full font-semibold text-gray-900 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    {venue.capacity.toLocaleString()}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {venue.name}
                </h2>
                
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">
                    {venue.location.city}, {venue.location.state}
                  </span>
                </div>

                <p className="text-gray-600 mb-4 leading-relaxed">
                  {venue.description}
                </p>

                {/* Categories */}
                {venue.categories && venue.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {venue.categories.map((category) => (
                      <span
                        key={category}
                        className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full capitalize"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                )}

                {/* Amenities */}
                {venue.amenities && venue.amenities.length > 0 && (
                  <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                    {venue.amenities.slice(0, 4).map((amenity) => (
                      <div
                        key={amenity}
                        className="flex items-center gap-1 text-xs text-gray-600"
                        title={amenity}
                      >
                        {amenity === 'wifi' && <Wifi className="w-4 h-4" />}
                        {amenity === 'accessible' && <Accessibility className="w-4 h-4" />}
                        {amenity === 'parking' && <span>🅿️</span>}
                        {amenity === 'outdoor' && <span>🌳</span>}
                      </div>
                    ))}
                    {venue.amenities.length > 4 && (
                      <span className="text-xs text-gray-500">
                        +{venue.amenities.length - 4} more
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Need Help Finding the Perfect Venue?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Our team can help you find and book the ideal venue for your event
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/plan/meetings"
              className="px-8 py-4 bg-white text-blue-600 font-bold rounded-full hover:bg-blue-50 transition-colors shadow-lg"
            >
              Corporate Events
            </a>
            <a
              href="/plan/weddings"
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-colors"
            >
              Weddings
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

