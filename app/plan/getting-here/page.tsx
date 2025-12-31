import { buildMetadata, SITE_URL } from '@/lib/seo'
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs'
import { RelatedPages } from '@/components/ui/RelatedPages'
import { generateBreadcrumbs } from '@/lib/routes'
import { AuburnHeroImage, AuburnImage } from '@/components/ui/AuburnImage'
import Image from 'next/image'
import Link from 'next/link'
import { Car, Plane, Train, MapPin, Clock, Navigation, ExternalLink, ChevronRight, Route } from 'lucide-react'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Getting to Auburn, California',
    description: 'Plan your trip to Auburn, CA. Find directions, transportation options, and travel information for visiting Gold Country.',
    canonical: `${SITE_URL}/plan/getting-here`,
  })
}

const airports = [
  {
    code: 'SMF',
    name: 'Sacramento International',
    distance: '35 miles',
    driveTime: '45 min',
    description: 'Closest major airport with direct flights from most US cities. Easy access via I-80 East.',
    highlight: true,
  },
  {
    code: 'SFO',
    name: 'San Francisco International',
    distance: '140 miles',
    driveTime: '2.5 hrs',
    description: 'Major international hub with extensive connections. Scenic drive through the Bay Area and Central Valley.',
    highlight: false,
  },
  {
    code: 'OAK',
    name: 'Oakland International',
    distance: '120 miles',
    driveTime: '2 hrs',
    description: 'Budget-friendly alternative with Southwest & Spirit Airlines. Slightly shorter drive than SFO.',
    highlight: false,
  },
  {
    code: 'RNO',
    name: 'Reno-Tahoe International',
    distance: '95 miles',
    driveTime: '1.5 hrs',
    description: 'Great option if continuing to Lake Tahoe or coming from the east. Beautiful mountain drive over Donner Pass.',
    highlight: false,
  },
]

const drivingRoutes = [
  {
    from: 'Sacramento',
    distance: '35 miles',
    time: '40 min',
    route: 'I-80 East',
    directions: 'Head east on I-80, take exit 119A for Elm Ave/Auburn. Follow signs to Old Town.',
    icon: '🌉',
  },
  {
    from: 'San Francisco',
    distance: '140 miles',
    time: '2.5 hrs',
    route: 'I-80 East',
    directions: 'Cross Bay Bridge, continue I-80 East through Sacramento. Exit 119A for Auburn.',
    icon: '🌁',
  },
  {
    from: 'Lake Tahoe',
    distance: '55 miles',
    time: '1 hr',
    route: 'I-80 West',
    directions: 'Take I-80 West from Truckee through the Sierra Nevada. Exit 119A for Auburn.',
    icon: '🏔️',
  },
  {
    from: 'Reno',
    distance: '95 miles',
    time: '1.5 hrs',
    route: 'I-80 West',
    directions: 'Head west on I-80 over Donner Pass. Descend into the foothills and exit 119A for Auburn.',
    icon: '⛰️',
  },
]

export default function GettingHerePage() {
  const breadcrumbs = generateBreadcrumbs('/plan/getting-here')

  return (
    <div className="min-h-screen bg-white">
      {/* ═══════════════════════════════════════════════════════════════════
          HERO SECTION - Cinematic style with Auburn image
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] w-full overflow-hidden">
        <AuburnHeroImage imageId="hero-american-river-canyon">
          <div className="relative z-10 min-h-[60vh] md:min-h-[70vh] flex flex-col justify-end items-start text-left px-4 sm:px-6 md:px-12 lg:px-20 pb-16 md:pb-24">
            <p 
              className="uppercase tracking-[0.2em] text-sm font-medium mb-4 text-white/80"
              style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}
            >
              Plan Your Journey
            </p>
            <h1 
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              style={{ textShadow: '0 4px 20px rgba(0,0,0,0.6)' }}
            >
              Getting to Auburn
            </h1>
            <p 
              className="text-lg md:text-xl text-white/90 max-w-2xl"
              style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}
            >
              Located in the heart of California's Gold Country, Auburn is easily accessible 
              from major cities and airports throughout Northern California.
            </p>
          </div>
        </AuburnHeroImage>
      </section>

      {/* Breadcrumbs */}
      <div className="bg-cream-50 border-b border-charcoal-100">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumbs items={breadcrumbs} />
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          QUICK STATS BAR - Cream background
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="bg-cream-50 border-y border-charcoal-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-charcoal-200">
            {[
              { label: 'From Sacramento', value: '35 mi' },
              { label: 'From SF', value: '140 mi' },
              { label: 'Elevation', value: "1,255'" },
              { label: 'On Interstate', value: 'I-80' },
            ].map((stat) => (
              <div key={stat.label} className="py-6 px-4 text-center">
                <div className="text-2xl md:text-3xl font-bold text-charcoal-900">{stat.value}</div>
                <div className="text-sm text-charcoal-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          BY CAR SECTION - White background with white cards
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-14 h-14 rounded-full bg-forest-500 flex items-center justify-center">
              <Car className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="section-eyebrow-light mb-1">Most Popular</p>
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal-900 font-display">By Car</h2>
            </div>
          </div>

          <p className="text-charcoal-600 mb-8 max-w-3xl leading-relaxed">
            Auburn is conveniently located on Interstate 80, making it easily accessible from major cities 
            throughout Northern California. The drive offers stunning views of the Sierra Nevada foothills 
            and Gold Country landscapes. Whether you're coming from Sacramento, the Bay Area, Lake Tahoe, or 
            points beyond, Auburn's central location in Gold Country makes it an ideal destination for a 
            weekend getaway or extended stay.
          </p>
          
          {/* Additional Auburn Images */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="relative h-48 rounded-xl overflow-hidden">
              <AuburnImage imageId="downtown-lincoln-way" />
            </div>
            <div className="relative h-48 rounded-xl overflow-hidden">
              <AuburnImage imageId="historic-old-town-clocktower" />
            </div>
            <div className="relative h-48 rounded-xl overflow-hidden">
              <AuburnImage imageId="outdoor-lake-clementine" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {drivingRoutes.map((route) => (
              <div 
                key={route.from}
                className="bg-white rounded-2xl border border-charcoal-100 p-6 shadow-card hover:shadow-card-hover transition-shadow duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{route.icon}</span>
                    <div>
                      <h3 className="text-xl font-bold text-charcoal-900 mb-1">From {route.from}</h3>
                      <p className="text-forest-600 font-semibold text-sm">{route.route}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-charcoal-900">{route.time}</div>
                    <div className="text-sm text-charcoal-600">{route.distance}</div>
                  </div>
                </div>
                <p className="text-charcoal-600 text-sm">{route.directions}</p>
              </div>
            ))}
          </div>

          {/* Interactive Map Section */}
          <div className="bg-white rounded-2xl border border-charcoal-100 p-2 shadow-card overflow-hidden">
            <div className="aspect-[16/9] md:aspect-[21/9] bg-cream-50 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-forest-500 mx-auto mb-4" />
                <p className="text-charcoal-600 mb-4 font-medium">Interactive Map</p>
                <a 
                  href="https://maps.google.com/?q=Auburn,CA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-forest-600 hover:text-forest-700 font-semibold transition-colors"
                >
                  Open in Google Maps
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          BY AIR SECTION - Cream background
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-cream-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-14 h-14 rounded-full bg-forest-500 flex items-center justify-center">
              <Plane className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="section-eyebrow-light mb-1">Fly In</p>
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal-900 font-display">Nearby Airports</h2>
            </div>
          </div>

          <p className="text-charcoal-600 mb-8 max-w-3xl leading-relaxed">
            Several major airports serve Auburn, with Sacramento International being the closest and most convenient. 
            All airports offer rental car services, and we recommend booking in advance during peak travel seasons. 
            Once you arrive, Auburn's compact size and walkable downtown make it easy to explore on foot, though 
            having a car is recommended for accessing trailheads, wineries, and attractions outside the city center. 
            For those interested in <Link href="/things-to-do/outdoor-adventures" className="text-lake-600 hover:text-lake-700 font-semibold underline">outdoor adventures</Link> or 
            exploring the surrounding Gold Country region, a vehicle provides the flexibility to visit multiple 
            destinations during your stay.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {airports.map((airport) => (
              <div 
                key={airport.code}
                className={`bg-white rounded-2xl border p-6 shadow-card hover:shadow-card-hover transition-shadow duration-300 relative overflow-hidden ${
                  airport.highlight 
                    ? 'border-forest-500 ring-2 ring-forest-500/20' 
                    : 'border-charcoal-100'
                }`}
              >
                {airport.highlight && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-forest-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Recommended
                    </span>
                  </div>
                )}
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-xl bg-forest-500/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-forest-600">{airport.code}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-charcoal-900 mb-1">{airport.name}</h3>
                    <p className="text-charcoal-600 text-sm mb-3">{airport.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1 text-charcoal-600">
                        <Navigation className="w-4 h-4 text-forest-500" />
                        {airport.distance}
                      </span>
                      <span className="flex items-center gap-1 text-charcoal-600">
                        <Clock className="w-4 h-4 text-forest-500" />
                        {airport.driveTime}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-charcoal-600">
              Rental cars available at all airports. We recommend booking in advance during peak season (summer and holidays).
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          PUBLIC TRANSIT SECTION - White background
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-14 h-14 rounded-full bg-gold-500 flex items-center justify-center">
              <Train className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="section-eyebrow-light mb-1">Alternative Options</p>
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal-900 font-display">Public Transportation</h2>
            </div>
          </div>

          <p className="text-charcoal-600 mb-8 max-w-3xl leading-relaxed">
            While driving is the most convenient option, public transportation is available for those who prefer 
            not to drive. Both train and bus services connect Auburn to the greater Sacramento region and Bay Area. 
            For visitors planning to stay primarily in downtown Auburn and explore <Link href="/plan/visitor-information" className="text-lake-600 hover:text-lake-700 font-semibold underline">visitor attractions</Link> 
            within walking distance, public transit can be a viable option. However, for the most flexibility in 
            experiencing Auburn's full range of activities, including <Link href="/dining" className="text-lake-600 hover:text-lake-700 font-semibold underline">dining</Link> at restaurants throughout 
            the area and visiting nearby wineries, a car is recommended.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-charcoal-100 p-8 shadow-card">
              <div className="flex items-center gap-3 mb-4">
                <Train className="w-6 h-6 text-forest-500" />
                <h3 className="text-xl font-bold text-charcoal-900">Amtrak Capitol Corridor</h3>
              </div>
              <p className="text-charcoal-600 mb-6">
                The Capitol Corridor train runs from the Bay Area through Sacramento with multiple daily departures. 
                From Sacramento station, connect to Placer County Transit bus service to Auburn. The scenic train 
                ride offers beautiful views of the Central Valley and Sierra Nevada foothills.
              </p>
              <a 
                href="https://www.capitolcorridor.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-forest-600 hover:text-forest-700 font-semibold transition-colors"
              >
                Visit Capitol Corridor
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="bg-white rounded-2xl border border-charcoal-100 p-8 shadow-card">
              <div className="flex items-center gap-3 mb-4">
                <Route className="w-6 h-6 text-forest-500" />
                <h3 className="text-xl font-bold text-charcoal-900">Placer County Transit</h3>
              </div>
              <p className="text-charcoal-600 mb-6">
                Local bus service connects Auburn to surrounding communities including Sacramento, Roseville, 
                and Lincoln. Routes run Monday through Saturday with convenient stops throughout Auburn. 
                Perfect for day trips and exploring the region without a car.
              </p>
              <a 
                href="https://www.placer.ca.gov/transit"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-forest-600 hover:text-forest-700 font-semibold transition-colors"
              >
                View Routes & Schedules
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          CTA SECTION - Blue accent band matching homepage
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-br from-lake-500 to-lake-600 text-white">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-display">
            Ready to Explore?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Now that you know how to get here, discover what awaits you in Auburn.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/things-to-do" 
              className="bg-white text-lake-600 font-semibold px-8 py-4 rounded-lg hover:bg-cream-50 transition-colors inline-flex items-center justify-center gap-2 shadow-lg"
            >
              Things to Do
              <ChevronRight className="w-5 h-5" />
            </Link>
            <Link 
              href="/accommodations" 
              className="border-2 border-white/70 text-white font-semibold px-8 py-4 rounded-lg hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2"
            >
              Where to Stay
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <RelatedPages currentPath="/plan/getting-here" />
    </div>
  )
}
