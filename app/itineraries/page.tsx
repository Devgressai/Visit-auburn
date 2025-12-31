import { buildMetadata, SITE_URL } from '@/lib/seo'
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs'
import { RelatedPages } from '@/components/ui/RelatedPages'
import { AuburnHeroImage, AuburnImage } from '@/components/ui/AuburnImage'
import { generateBreadcrumbs } from '@/lib/routes'
import Link from 'next/link'
import { Calendar, Clock, MapPin, Heart, Users, Mountain } from 'lucide-react'
import type { Metadata } from 'next'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Auburn Itineraries - Plan Your Perfect Gold Country Trip',
    description: 'Curated Auburn, CA itineraries for every traveler. Weekend getaways, outdoor adventures, Gold Rush history tours, family fun, and romantic escapes—all with day-by-day plans.',
    canonical: `${SITE_URL}/itineraries`,
  })
}

const itineraries = [
  {
    title: 'Weekend Getaway',
    slug: 'weekend-getaway',
    duration: '2-3 Days',
    icon: Calendar,
    description: 'Perfect introduction to Auburn—hiking, Old Town dining, Gold Rush history, and relaxation',
    highlights: ['Lake Clementine Trail', 'Old Town restaurants', 'Gold Country Museum', 'Downtown shopping'],
    bestFor: 'First-time visitors, couples, friends',
    difficulty: 'Easy to Moderate'
  },
  {
    title: 'Outdoor Adventure',
    slug: 'outdoor-adventure',
    duration: '3 Days',
    icon: Mountain,
    description: "Maximize Auburn's trails, swimming holes, and canyon views for outdoor enthusiasts",
    highlights: ['Multiple trail hikes', 'American River swimming', 'Mountain biking', 'Canyon exploration'],
    bestFor: 'Active travelers, nature lovers, hikers',
    difficulty: 'Moderate to Challenging'
  },
  {
    title: 'Gold Rush History',
    slug: 'gold-rush-history',
    duration: '2 Days',
    icon: Clock,
    description: 'Deep dive into California Gold Rush heritage through museums and historic sites',
    highlights: ['3 major museums', 'Walking tours', 'Historic buildings', 'Gold panning'],
    bestFor: 'History buffs, culture seekers, seniors',
    difficulty: 'Easy'
  },
  {
    title: 'Family Fun',
    slug: 'family-fun',
    duration: '2-3 Days',
    icon: Users,
    description: 'Kid-friendly Auburn activities balancing adventure, education, and enjoyment',
    highlights: ['Easy trails', 'Swimming spots', 'Museums with kids programs', 'Parks and playgrounds'],
    bestFor: 'Families with children ages 5-15',
    difficulty: 'Easy'
  },
  {
    title: 'Romantic Escape',
    slug: 'romantic-escape',
    duration: '2 Days',
    icon: Heart,
    description: 'Intimate Auburn experiences for couples—scenic trails, wine tasting, cozy dining',
    highlights: ['Sunset canyon views', 'Farm-to-table dining', 'Historic inn stays', 'Art galleries'],
    bestFor: 'Couples, anniversaries, honeymoons',
    difficulty: 'Easy to Moderate'
  }
]

export default async function ItinerariesPage() {
  const breadcrumbs = generateBreadcrumbs('/itineraries')

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-[500px] md:h-[600px]">
        <AuburnHeroImage imageId="hero-american-river-canyon">
          <div className="container mx-auto px-4 text-center">
            <span className="inline-block px-4 py-2 bg-lake-500/90 text-white text-sm font-semibold rounded-full mb-4">
              Trip Planning Made Easy
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Auburn Itineraries
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Curated day-by-day plans for experiencing California's Gold Country—hiking, history, dining, and more
            </p>
          </div>
        </AuburnHeroImage>
      </section>

      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-4 bg-white">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      {/* Main Content - White background */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">

          {/* Intro */}
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <p className="text-xl text-charcoal-700 leading-relaxed mb-6">
              <strong>Auburn, California</strong> packs more experiences into a small area than most destinations—world-class 
              hiking within 10 minutes of downtown, three Gold Rush museums, dozens of trail systems, historic districts, 
              farm-to-table restaurants, and the American River canyon cutting through it all. That abundance can feel 
              overwhelming when planning a visit. These itineraries solve that problem: each provides day-by-day schedules, 
              specific recommendations, timing suggestions, and practical tips based on hundreds of visits to Auburn.
            </p>
            <p className="text-lg text-charcoal-600 mb-8">
              Choose your style, follow the plan, customize as desired—then experience the best of Gold Country.
            </p>
            
            {/* Additional Auburn Images */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="relative h-64 rounded-xl overflow-hidden">
                <AuburnImage imageId="historic-old-town-clocktower" />
              </div>
              <div className="relative h-64 rounded-xl overflow-hidden">
                <AuburnImage imageId="outdoor-lake-clementine" />
              </div>
            </div>
            
            <p className="text-charcoal-700 leading-relaxed">
              Whether you're planning a quick weekend escape or a longer stay, these curated itineraries help you 
              make the most of your time in Auburn. Each plan balances must-see attractions with hidden gems, 
              providing a mix of activities that showcase different aspects of Gold Country life. From outdoor 
              adventures that take advantage of Auburn's stunning natural setting to cultural experiences that 
              connect you with the region's rich history, these itineraries ensure you'll leave with lasting 
              memories and a deep appreciation for what makes Auburn special.
            </p>
          </div>

          {/* Itinerary Cards */}
          <div className="max-w-6xl mx-auto space-y-8 mb-20">
            {itineraries.map((itinerary) => {
              const Icon = itinerary.icon
              return (
                <Link 
                  key={itinerary.slug}
                  href={`/itineraries/${itinerary.slug}`}
                  className="card card-hover block overflow-hidden"
                >
                  <div className="md:flex">
                    <div className="md:w-1/3 relative h-64 md:h-auto">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-green-600 opacity-90"></div>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                        <Icon className="w-16 h-16 mb-4" />
                        <h3 className="text-2xl font-bold mb-2">{itinerary.title}</h3>
                        <p className="text-sm opacity-90">{itinerary.duration}</p>
                      </div>
                    </div>
                    <div className="md:w-2/3 p-6 md:p-8">
                      <p className="text-charcoal-700 text-lg mb-4">
                        {itinerary.description}
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="font-semibold text-sm text-charcoal-900 mb-2">Highlights:</h4>
                          <ul className="text-sm text-charcoal-600 space-y-1">
                            {itinerary.highlights.map((highlight) => (
                              <li key={highlight} className="flex items-center gap-2">
                                <MapPin className="w-3 h-3 text-blue-600 flex-shrink-0" />
                                {highlight}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <div className="mb-3">
                            <h4 className="font-semibold text-sm text-charcoal-900 mb-1">Best For:</h4>
                            <p className="text-sm text-charcoal-600">{itinerary.bestFor}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm text-charcoal-900 mb-1">Difficulty:</h4>
                            <p className="text-sm text-charcoal-600">{itinerary.difficulty}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm group-hover:gap-3 transition-all">
                        View Full Itinerary 
                        <span>→</span>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>

          {/* Additional Content Section */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-white rounded-xl p-8 border border-charcoal-100">
              <h3 className="text-2xl font-bold text-charcoal-900 mb-4">
                Why Use These Itineraries?
              </h3>
              <div className="space-y-4 text-charcoal-700 leading-relaxed">
                <p>
                  Planning a trip to Auburn can be overwhelming given the sheer number of activities, trails, 
                  restaurants, and attractions available. These itineraries eliminate the guesswork by providing 
                  tested, day-by-day plans that maximize your time and ensure you experience the best of what 
                  Auburn has to offer.
                </p>
                <p>
                  Each itinerary has been carefully crafted based on real visits, local knowledge, and an 
                  understanding of how to balance different types of activities. They account for travel times, 
                  seasonal considerations, and the practical realities of visiting Auburn. Whether you're a 
                  first-time visitor or returning to explore new aspects of the area, these plans provide a 
                  solid foundation that you can customize to match your interests and schedule.
                </p>
                <p>
                  The itineraries also help you understand how different parts of Auburn connect, making it 
                  easier to navigate the area and discover unexpected gems along the way. By following a 
                  structured plan, you'll experience a more cohesive visit that tells the story of Auburn's 
                  Gold Country heritage, natural beauty, and vibrant community.
                </p>
              </div>
            </div>
          </div>

          {/* Planning Tips - Cream background */}
          <div className="max-w-4xl mx-auto mb-16 py-12 bg-cream-50 rounded-xl px-6">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8 text-center">
              Tips for Planning Your Auburn Trip
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="card p-6">
                <h3 className="text-xl font-bold text-charcoal-900 mb-3">Best Time to Visit Auburn</h3>
                <p className="text-charcoal-700 text-sm mb-3">
                  <strong>Spring (March-May)</strong> and <strong>Fall (September-November)</strong> offer ideal 
                  conditions: comfortable temperatures (65-80°F), fewer crowds, and beautiful scenery. Summer works 
                  great for water activities despite heat. Winter provides mild weather and trail solitude.
                </p>
                <p className="text-xs text-charcoal-600">
                  Book accommodations 2-3 weeks ahead for spring/fall weekends, earlier for major events like 
                  Gold Country Fair (May) or Western States 100 (June).
                </p>
              </div>

              <div className="card p-6">
                <h3 className="text-xl font-bold text-charcoal-900 mb-3">Getting Around Auburn</h3>
                <p className="text-charcoal-700 text-sm mb-3">
                  Auburn requires a car—trailheads, restaurants, and attractions spread across the area. Downtown 
                  Old Town is walkable once you arrive. Most trails have parking lots (arrive early on summer 
                  weekends). Everything is within 15 minutes drive from downtown.
                </p>
                <p className="text-xs text-charcoal-600">
                  Auburn is 35 miles from Sacramento airport (1 hour drive), 100 miles from San Francisco (2 hours), 
                  and 90 minutes from Lake Tahoe.
                </p>
              </div>

              <div className="card p-6">
                <h3 className="text-xl font-bold text-charcoal-900 mb-3">What to Pack for Auburn</h3>
                <ul className="text-sm text-charcoal-700 space-y-2">
                  <li><strong>Hiking essentials:</strong> Sturdy shoes, water bottles, sun protection, trail snacks</li>
                  <li><strong>Layers:</strong> Mornings cool, afternoons warm—bring jacket and t-shirts</li>
                  <li><strong>Summer additions:</strong> Swimsuit, towel, river shoes for water activities</li>
                  <li><strong>Camera:</strong> Canyon views, waterfalls, and historic buildings are photo-worthy</li>
                </ul>
              </div>

              <div className="card p-6">
                <h3 className="text-xl font-bold text-charcoal-900 mb-3">Dining & Lodging Notes</h3>
                <p className="text-charcoal-700 text-sm mb-3">
                  <Link href="/accommodations" className="text-blue-600 hover:text-blue-700 font-semibold">
                    Auburn accommodations
                  </Link> range from historic hotels to modern chains. Old Town locations put you in the action. 
                  Book ahead for weekends.
                </p>
                <p className="text-charcoal-700 text-sm">
                  <Link href="/dining" className="text-blue-600 hover:text-blue-700 font-semibold">
                    Restaurants
                  </Link> cluster in Old Town. Many accept walk-ins, but popular spots fill Friday-Saturday evenings. 
                  Casual dress is standard—hikers welcome!
                </p>
              </div>
            </div>
          </div>

          {/* Related Links - White background */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8 text-center">
              More Auburn Planning Resources
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/things-to-do" className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow group border border-charcoal-100">
                <Mountain className="w-10 h-10 text-lake-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-charcoal-900 mb-2 group-hover:text-lake-600 transition-colors">
                  Things to Do
                </h3>
                <p className="text-sm text-charcoal-600">
                  Browse all Auburn activities by category—outdoor, history, arts, dining, events
                </p>
              </Link>
              <Link href="/plan/visitor-information" className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow group border border-charcoal-100">
                <MapPin className="w-10 h-10 text-lake-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-charcoal-900 mb-2 group-hover:text-lake-600 transition-colors">
                  Visitor Info
                </h3>
                <p className="text-sm text-charcoal-600">
                  Weather, transportation, visitor centers, and essential Auburn information
                </p>
              </Link>
              <Link href="/events" className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow group border border-charcoal-100">
                <Calendar className="w-10 h-10 text-lake-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-charcoal-900 mb-2 group-hover:text-lake-600 transition-colors">
                  Events Calendar
                </h3>
                <p className="text-sm text-charcoal-600">
                  Check what's happening during your visit—festivals, concerts, art walks
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Blue accent band */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-lake-500 to-lake-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-display">
            Ready to Plan Your Auburn Adventure?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Choose an itinerary and start exploring California's Gold Country today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/accommodations"
              className="bg-white text-lake-600 font-semibold px-8 py-4 rounded-lg hover:bg-cream-50 transition-colors inline-flex items-center justify-center gap-2 shadow-lg"
            >
              Find Places to Stay
            </Link>
            <Link
              href="/plan/getting-here"
              className="border-2 border-white/70 text-white font-semibold px-8 py-4 rounded-lg hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2"
            >
              Getting Here
            </Link>
          </div>
        </div>
      </section>

      <RelatedPages currentPath="/itineraries" />
    </div>
  )
}

