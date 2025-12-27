import { buildMetadata, SITE_URL } from '@/lib/seo'
import Image from 'next/image'
import Link from 'next/link'
import { Car, Plane, Train, MapPin, Clock, Navigation, ExternalLink, ChevronRight } from 'lucide-react'
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
    description: 'Closest major airport with direct flights from most US cities',
    highlight: true,
  },
  {
    code: 'SFO',
    name: 'San Francisco International',
    distance: '140 miles',
    driveTime: '2.5 hrs',
    description: 'Major hub with extensive international connections',
    highlight: false,
  },
  {
    code: 'OAK',
    name: 'Oakland International',
    distance: '120 miles',
    driveTime: '2 hrs',
    description: 'Budget-friendly alternative with Southwest & Spirit',
    highlight: false,
  },
  {
    code: 'RNO',
    name: 'Reno-Tahoe International',
    distance: '95 miles',
    driveTime: '1.5 hrs',
    description: 'Great option if continuing to Lake Tahoe',
    highlight: false,
  },
]

const drivingRoutes = [
  {
    from: 'Sacramento',
    distance: '35 miles',
    time: '40 min',
    route: 'I-80 East',
    directions: 'Head east on I-80, take exit 119A for Elm Ave/Auburn',
  },
  {
    from: 'San Francisco',
    distance: '140 miles',
    time: '2.5 hrs',
    route: 'I-80 East',
    directions: 'Cross Bay Bridge, continue I-80 East through Sacramento to Auburn',
  },
  {
    from: 'Lake Tahoe',
    distance: '55 miles',
    time: '1 hr',
    route: 'I-80 West',
    directions: 'Take I-80 West from Truckee, exit at Auburn',
  },
  {
    from: 'Reno',
    distance: '95 miles',
    time: '1.5 hrs',
    route: 'I-80 West',
    directions: 'Head west on I-80 over Donner Pass to Auburn',
  },
]

export default function GettingHerePage() {
  return (
    <div className="min-h-screen bg-deep-bg">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero.jpg"
            alt="Road to Auburn"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-deep-bg/90 via-deep-bg/70 to-deep-bg" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <p className="section-eyebrow text-center mb-4">Plan Your Journey</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary text-center mb-6 font-display">
            Getting to Auburn
          </h1>
          <p className="text-xl text-text-muted text-center max-w-2xl mx-auto">
            Located in the heart of California's Gold Country, Auburn is easily accessible 
            from major cities and airports throughout Northern California.
          </p>
        </div>
      </section>

      {/* Quick Stats Bar */}
      <section className="bg-deep-surface border-y border-border-subtle">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border-subtle">
            {[
              { label: 'From Sacramento', value: '35 mi' },
              { label: 'From SF', value: '140 mi' },
              { label: 'Elevation', value: "1,255'" },
              { label: 'On Interstate', value: 'I-80' },
            ].map((stat) => (
              <div key={stat.label} className="py-6 px-4 text-center">
                <div className="text-2xl md:text-3xl font-bold text-text-primary">{stat.value}</div>
                <div className="text-sm text-text-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* By Car Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-14 h-14 rounded-full bg-pine-500 flex items-center justify-center">
              <Car className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="section-eyebrow mb-1">Most Popular</p>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary font-display">By Car</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {drivingRoutes.map((route) => (
              <div 
                key={route.from}
                className="card-glass p-6 hover:bg-white/[0.08] transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-text-primary mb-1">From {route.from}</h3>
                    <p className="text-pine-400 font-medium">{route.route}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-text-primary">{route.time}</div>
                    <div className="text-sm text-text-muted">{route.distance}</div>
                  </div>
                </div>
                <p className="text-text-muted text-sm">{route.directions}</p>
              </div>
            ))}
          </div>

          {/* Google Maps Embed Placeholder */}
          <div className="card-glass p-2 rounded-2xl overflow-hidden">
            <div className="aspect-[16/9] md:aspect-[21/9] bg-deep-surface rounded-xl flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-pine-500 mx-auto mb-4" />
                <p className="text-text-muted mb-4">Interactive Map</p>
                <a 
                  href="https://maps.google.com/?q=Auburn,CA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-pine-400 hover:text-pine-300 font-medium"
                >
                  Open in Google Maps
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* By Air Section */}
      <section className="py-20 md:py-28 bg-deep-surface">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-14 h-14 rounded-full bg-lake-400 flex items-center justify-center">
              <Plane className="w-7 h-7 text-deep-bg" />
            </div>
            <div>
              <p className="section-eyebrow mb-1">Fly In</p>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary font-display">Nearby Airports</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {airports.map((airport) => (
              <div 
                key={airport.code}
                className={`card-glass p-6 relative overflow-hidden ${airport.highlight ? 'ring-2 ring-pine-500' : ''}`}
              >
                {airport.highlight && (
                  <div className="absolute top-4 right-4">
                    <span className="pine-badge">Recommended</span>
                  </div>
                )}
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-pine-400">{airport.code}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-text-primary mb-1">{airport.name}</h3>
                    <p className="text-text-muted text-sm mb-3">{airport.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1 text-text-muted">
                        <Navigation className="w-4 h-4 text-pine-500" />
                        {airport.distance}
                      </span>
                      <span className="flex items-center gap-1 text-text-muted">
                        <Clock className="w-4 h-4 text-pine-500" />
                        {airport.driveTime}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-text-muted">
              Rental cars available at all airports. We recommend booking in advance during peak season.
            </p>
          </div>
        </div>
      </section>

      {/* Public Transit Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-14 h-14 rounded-full bg-gold-500 flex items-center justify-center">
              <Train className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="section-eyebrow mb-1">Alternative Options</p>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary font-display">Public Transportation</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="card-glass p-8">
              <h3 className="text-xl font-bold text-text-primary mb-4">Amtrak Capitol Corridor</h3>
              <p className="text-text-muted mb-6">
                The Capitol Corridor train runs from the Bay Area through Sacramento. 
                From Sacramento station, connect to Placer County Transit bus service to Auburn.
              </p>
              <a 
                href="https://www.capitolcorridor.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-pine-400 hover:text-pine-300 font-medium"
              >
                Visit Capitol Corridor
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="card-glass p-8">
              <h3 className="text-xl font-bold text-text-primary mb-4">Placer County Transit</h3>
              <p className="text-text-muted mb-6">
                Local bus service connects Auburn to surrounding communities including 
                Sacramento, Roseville, and Lincoln. Routes run Monday through Saturday.
              </p>
              <a 
                href="https://www.placer.ca.gov/transit"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-pine-400 hover:text-pine-300 font-medium"
              >
                View Routes & Schedules
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-deep-surface border-t border-border-subtle">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6 font-display">
            Ready to Explore?
          </h2>
          <p className="text-xl text-text-muted mb-8 max-w-2xl mx-auto">
            Now that you know how to get here, discover what awaits you in Auburn.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/activities" className="btn-primary inline-flex items-center gap-2">
              Things to Do
              <ChevronRight className="w-5 h-5" />
            </Link>
            <Link href="/accommodations" className="btn-outline-white inline-flex items-center gap-2">
              Where to Stay
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
