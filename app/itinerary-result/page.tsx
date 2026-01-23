import { buildMetadata, SITE_URL } from '@/lib/seo'
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs'
import { RelatedPages } from '@/components/ui/RelatedPages'
import { AuburnHeroImage } from '@/components/ui/AuburnImage'
import { generateBreadcrumbs } from '@/lib/routes'
import { generateItinerary } from '@/lib/trip-mapping'
import type { TripDuration, TripGroup, TripVibe, TripPace } from '@/types/trip-builder'
import { ItineraryActions } from '@/components/trip-builder/ItineraryActions'
import Link from 'next/link'
import { MapPin, Clock, UtensilsCrossed, Calendar } from 'lucide-react'
import type { Metadata } from 'next'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Your Auburn Plan - Custom Itinerary',
    description: 'Your personalized Auburn itinerary with day-by-day activities, dining suggestions, and tips for your perfect Gold Country visit.',
    canonical: `${SITE_URL}/itinerary-result`,
  })
}

interface ItineraryResultPageProps {
  searchParams: {
    duration?: string
    group?: string
    vibe?: string
    pace?: string
  }
}

export default async function ItineraryResultPage({ searchParams }: ItineraryResultPageProps) {
  const breadcrumbs = generateBreadcrumbs('/itinerary-result')

  // Parse and validate search params
  const duration = (searchParams.duration as TripDuration) || 'weekend'
  const group = (searchParams.group as TripGroup) || 'couple'
  const vibe = (searchParams.vibe as TripVibe) || 'relaxed'
  const pace = (searchParams.pace as TripPace) || 'balanced'

  // Generate itinerary
  const itinerary = generateItinerary({ duration, group, vibe, pace })

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-[400px] md:h-[500px]">
        <AuburnHeroImage imageId="hero-american-river-canyon">
          <div className="container mx-auto px-4 text-center">
            <span className="inline-block px-4 py-2 bg-lake-500/90 text-white text-sm font-semibold rounded-full mb-4">
              Your Custom Itinerary
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {itinerary.title}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              {itinerary.description}
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
          {/* Action Buttons */}
          <ItineraryActions itineraryTitle={itinerary.title} />

          {/* Itinerary Days */}
          <div className="max-w-4xl mx-auto space-y-16">
            {itinerary.days.map((day) => (
              <div key={day.dayNumber} className="space-y-8">
                {/* Day Header */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-lake-600 text-white flex items-center justify-center text-2xl font-bold flex-shrink-0">
                    {day.dayNumber}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-charcoal-900">{day.title}</h2>
                  </div>
                </div>

                {/* Activities */}
                <div className="space-y-4">
                  {day.activities.map((activity) => (
                    <div key={activity.id} className="card p-6">
                      <div className="flex items-start gap-4">
                        <MapPin className="w-6 h-6 text-lake-600 flex-shrink-0 mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <h3 className="text-xl font-bold text-charcoal-900">
                              {activity.title}
                            </h3>
                            <span className="text-sm text-charcoal-600 flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {activity.time}
                            </span>
                            {activity.duration && (
                              <span className="text-sm text-charcoal-600">
                                • {activity.duration}
                              </span>
                            )}
                          </div>
                          <p className="text-charcoal-700 mb-2">{activity.description}</p>
                          {activity.location && (
                            <p className="text-sm text-charcoal-600 flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {activity.location}
                            </p>
                          )}
                          {activity.category && (
                            <span className="inline-block mt-2 px-3 py-1 bg-lake-100 text-lake-800 text-xs font-semibold rounded-full">
                              {activity.category}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Dining */}
                {day.dining.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-charcoal-900 flex items-center gap-2">
                      <UtensilsCrossed className="w-6 h-6 text-lake-600" />
                      Dining
                    </h3>
                    {day.dining.map((meal) => (
                      <div key={meal.id} className="card p-6 bg-cream-50">
                        <div className="flex items-start gap-4">
                          <UtensilsCrossed className="w-6 h-6 text-lake-600 flex-shrink-0 mt-1" />
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2 flex-wrap">
                              <h4 className="text-lg font-bold text-charcoal-900">
                                {meal.title}
                              </h4>
                              <span className="text-sm text-charcoal-600 flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {meal.time}
                              </span>
                              <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full font-semibold capitalize">
                                {meal.mealType}
                              </span>
                            </div>
                            <p className="text-charcoal-700">{meal.description}</p>
                            {meal.cuisine && (
                              <span className="inline-block mt-2 px-3 py-1 bg-amber-100 text-amber-800 text-xs font-semibold rounded-full">
                                {meal.cuisine}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Events */}
                {day.events && day.events.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-charcoal-900 flex items-center gap-2">
                      <Calendar className="w-6 h-6 text-lake-600" />
                      Events
                    </h3>
                    {day.events.map((event) => (
                      <div key={event.id} className="card p-6 bg-green-50">
                        <div className="flex items-start gap-4">
                          <Calendar className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2 flex-wrap">
                              <h4 className="text-lg font-bold text-charcoal-900">
                                {event.title}
                              </h4>
                              <span className="text-sm text-charcoal-600 flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {event.time}
                              </span>
                            </div>
                            <p className="text-charcoal-700">{event.description}</p>
                            {event.location && (
                              <p className="text-sm text-charcoal-600 flex items-center gap-1 mt-2">
                                <MapPin className="w-4 h-4" />
                                {event.location}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Tips Section */}
          {itinerary.tips && itinerary.tips.length > 0 && (
            <div className="max-w-4xl mx-auto mt-16">
              <div className="card p-8 bg-lake-50">
                <h2 className="text-2xl font-bold text-charcoal-900 mb-6">
                  Pro Tips for Your Trip
                </h2>
                <ul className="space-y-3">
                  {itinerary.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-3 text-charcoal-700">
                      <span className="text-lake-600 font-bold mt-1">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Related Links */}
          <div className="max-w-4xl mx-auto mt-16">
            <div className="card p-8 bg-gradient-to-br from-blue-50 to-green-50">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-6 text-center">
                Plan Your Visit
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Link href="/accommodations" className="text-center group">
                  <h3 className="font-bold text-charcoal-900 mb-2 group-hover:text-lake-600 transition-colors">
                    Find Accommodations →
                  </h3>
                  <p className="text-sm text-charcoal-600">Hotels, inns, and stays in Auburn</p>
                </Link>
                <Link href="/dining" className="text-center group">
                  <h3 className="font-bold text-charcoal-900 mb-2 group-hover:text-lake-600 transition-colors">
                    Explore Dining →
                  </h3>
                  <p className="text-sm text-charcoal-600">Restaurants, cafes, and wineries</p>
                </Link>
                <Link href="/things-to-do" className="text-center group">
                  <h3 className="font-bold text-charcoal-900 mb-2 group-hover:text-lake-600 transition-colors">
                    More Activities →
                  </h3>
                  <p className="text-sm text-charcoal-600">Discover all Auburn has to offer</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RelatedPages currentPath="/itinerary-result" />
    </div>
  )
}
