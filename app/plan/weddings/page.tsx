/**
 * TODO Checklist for Weddings Page:
 * 
 * IMAGES TO ADD:
 * - /public/images/auburn/weddings/park-victorian.jpg (or .webp)
 * - /public/images/auburn/weddings/ridge-golf-course.jpg
 * - /public/images/auburn/weddings/garden-theater.jpg
 * - /public/images/auburn/weddings/veterans-memorial.jpg
 * - /public/images/auburn/weddings/old-town-auburn-wedding.jpg
 * - /public/images/auburn/weddings/canyon-overlook.jpg
 * - /public/images/auburn/weddings/historic-building.jpg
 * - /public/images/auburn/weddings/american-river-scenic.jpg
 * - /public/images/auburn/weddings/hero-weddings.jpg (for hero section)
 * 
 * VENUE VERIFICATION:
 * - Verify all venue details (addresses, websites, descriptions) with actual sources
 * - Update capacity and pricing info where available
 * - Confirm map search queries work correctly
 * - Add more venues if verified sources available
 * 
 * CONTENT REVIEW:
 * - Verify seasonal planning tips match Auburn climate accurately
 * - Confirm drive times and distances are approximately correct
 * - Update with any additional local wedding resources
 */

import { buildMetadata, SITE_URL } from '@/lib/seo'
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs'
import { RelatedPages } from '@/components/ui/RelatedPages'
import { generateBreadcrumbs } from '@/lib/routes'
import { WeddingForm } from '@/components/weddings/WeddingForm'
import { VenueImage } from '@/components/weddings/VenueImage'
import { Heart, MapPin, Calendar, Camera, Utensils, Music, Car, Users, ExternalLink, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const revalidate = 3600

export const metadata: Metadata = buildMetadata({
  title: 'Weddings in Auburn, California (95603) - Gold Country Wedding Venues',
  description: 'Plan your dream wedding in Auburn, California. Discover stunning venues in the heart of Gold Country, from historic buildings to scenic outdoor spaces. Perfect wedding destination just 30 minutes from Sacramento.',
  canonical: `${SITE_URL}/plan/weddings`,
})

interface WeddingVenue {
  name: string
  areaLabel: string
  shortDescription: string
  mapSearchQuery: string
  imageSrc: string
  website?: string
  capacity?: string
  venueType?: string
}

const weddingVenues: WeddingVenue[] = [
  {
    name: 'Park Victorian',
    areaLabel: 'Auburn 95603',
    shortDescription: 'Historic Victorian home with elegant gardens and vintage charm, perfect for intimate ceremonies and receptions.',
    mapSearchQuery: 'Park Victorian Auburn CA 95603',
    imageSrc: '/images/auburn/weddings/park-victorian.jpg',
    website: 'https://parkvictorian.com',
    capacity: 'Up to 150 guests',
    venueType: 'Historic Estate',
  },
  {
    name: 'The Ridge Golf Course & Events Center',
    areaLabel: 'Auburn 95603',
    shortDescription: 'Scenic golf course venue with panoramic Sierra Nevada views, ideal for outdoor ceremonies and elegant receptions.',
    mapSearchQuery: 'The Ridge Golf Course Events Center Auburn CA',
    imageSrc: '/images/auburn/weddings/ridge-golf-course.jpg',
    website: 'https://ridgegc.com',
    capacity: '200+ guests',
    venueType: 'Golf Course & Events',
  },
  {
    name: 'Auburn Garden Theater',
    areaLabel: 'Auburn 95603',
    shortDescription: 'Charming outdoor theater venue with lush gardens and historic character, perfect for unique ceremonies.',
    mapSearchQuery: 'Auburn Garden Theater Auburn CA',
    imageSrc: '/images/auburn/weddings/garden-theater.jpg',
    capacity: '100-200 guests',
    venueType: 'Garden & Theater',
  },
  {
    name: 'Auburn Veterans Memorial Building',
    areaLabel: 'Auburn 95603',
    shortDescription: 'Historic community building with grand ballroom and flexible event spaces for large receptions.',
    mapSearchQuery: 'Auburn Veterans Memorial Building 95603',
    imageSrc: '/images/auburn/weddings/veterans-memorial.jpg',
    capacity: '300+ guests',
    venueType: 'Community Hall',
  },
  {
    name: 'Old Town Auburn Historic District',
    areaLabel: 'Auburn 95603',
    shortDescription: 'Charming Gold Rush era downtown with historic buildings and courtyards for ceremonies and photos.',
    mapSearchQuery: 'Old Town Auburn Historic District CA 95603',
    imageSrc: '/images/auburn/weddings/old-town-auburn-wedding.jpg',
    venueType: 'Historic District',
  },
  {
    name: 'Placer County Fairgrounds',
    areaLabel: 'Near Auburn',
    shortDescription: 'Large outdoor and indoor event spaces perfect for big celebrations with ample parking and facilities.',
    mapSearchQuery: 'Placer County Fairgrounds Roseville CA',
    imageSrc: '/images/auburn/weddings/fairgrounds.jpg',
    capacity: '500+ guests',
    venueType: 'Fairgrounds',
  },
  {
    name: 'Hidden Falls Regional Park',
    areaLabel: 'Auburn 95603',
    shortDescription: 'Scenic outdoor park with waterfalls and natural beauty for intimate outdoor ceremonies.',
    mapSearchQuery: 'Hidden Falls Regional Park Auburn CA',
    imageSrc: '/images/auburn/weddings/hidden-falls.jpg',
    venueType: 'Outdoor Park',
  },
  {
    name: 'Winery Venues (Local Wineries)',
    areaLabel: 'Near Auburn',
    shortDescription: 'Local wineries in the Gold Country foothills offering romantic vineyard settings with sunset views.',
    mapSearchQuery: 'Wedding venues wineries near Auburn CA',
    imageSrc: '/images/auburn/weddings/winery-venue.jpg',
    venueType: 'Winery & Vineyard',
  },
]

const photoSpots = [
  {
    name: 'Old Town Auburn',
    description: 'Historic Gold Rush architecture with charming storefronts and vintage details',
    imageSrc: '/images/auburn/weddings/old-town-auburn-wedding.jpg',
  },
  {
    name: 'Canyon Overlooks',
    description: 'Panoramic views of the American River canyon and Sierra Nevada foothills',
    imageSrc: '/images/auburn/weddings/canyon-overlook.jpg',
  },
  {
    name: 'Historic Buildings',
    description: 'Victorian and Gold Rush era buildings with authentic period character',
    imageSrc: '/images/auburn/weddings/historic-building.jpg',
  },
  {
    name: 'American River Scenic Spots',
    description: 'Riverside locations with natural beauty and water features',
    imageSrc: '/images/auburn/weddings/american-river-scenic.jpg',
  },
]

const seasonalTips = [
  {
    season: 'Spring',
    months: 'March - May',
    description: 'Mild temperatures (60-75°F), blooming wildflowers, ideal for outdoor ceremonies. Book early as this is peak season.',
    highlights: ['Wildflower blooms', 'Comfortable temperatures', 'Longer daylight hours'],
  },
  {
    season: 'Summer',
    months: 'June - August',
    description: 'Warm days (75-95°F), long daylight hours perfect for evening receptions. Plan for shade and hydration for outdoor events.',
    highlights: ['Longest daylight', 'Warm evenings', 'Peak outdoor season'],
  },
  {
    season: 'Fall',
    months: 'September - November',
    description: 'Beautiful autumn colors, moderate temperatures (65-80°F), less crowded than summer. Perfect for vineyard venues.',
    highlights: ['Fall foliage', 'Mild weather', 'Fewer crowds'],
  },
  {
    season: 'Winter',
    months: 'December - February',
    description: 'Cooler temperatures (45-65°F), occasional rain, cozy indoor venues shine. Lower demand may offer better availability.',
    highlights: ['Indoor venues', 'Better availability', 'Cozy atmosphere'],
  },
]

export default function WeddingsPage() {
  const breadcrumbs = generateBreadcrumbs('/plan/weddings')

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <VenueImage
          src="/images/auburn/weddings/hero-weddings.jpg"
          alt="Wedding in Auburn, California - Historic Gold Country venue"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/60 via-charcoal-900/40 to-charcoal-900/70" />
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-display">
            Weddings in Auburn, California (95603)
          </h1>
          <p className="text-xl md:text-2xl text-white/95 max-w-3xl mx-auto mb-8 leading-relaxed">
            Say "I Do" in the Heart of Gold Country
          </p>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed">
            Historic charm meets natural beauty in Auburn, where every wedding tells a story
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#wedding-form"
              className="btn-primary min-w-[200px] text-center inline-block"
            >
              Request Wedding Info
            </a>
            <a
              href="#featured-venues"
              className="btn-outline-white min-w-[200px] text-center inline-block"
            >
              Explore Venues
            </a>
          </div>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-4">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      {/* Why Auburn */}
      <section className="py-20 md:py-28 bg-cream-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="section-eyebrow-light">Why Choose Auburn</p>
            <h2 className="section-title-light mb-6">
              Your Perfect Wedding Destination
            </h2>
            <p className="text-xl text-charcoal-700 max-w-3xl mx-auto leading-relaxed">
              Auburn offers the perfect blend of historic elegance, natural beauty, and modern amenities—all just 30 minutes from Sacramento and 45 minutes from Lake Tahoe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-8 border border-charcoal-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-gradient-to-br from-gold-500 to-gold-600 rounded-full flex items-center justify-center mb-4">
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-charcoal-900 mb-3 font-display">
                Historic Venues
              </h3>
              <p className="text-charcoal-600 leading-relaxed">
                Gold Rush era buildings and courtyards with authentic character
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-charcoal-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-gradient-to-br from-pine-500 to-pine-600 rounded-full flex items-center justify-center mb-4">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-charcoal-900 mb-3 font-display">
                Garden Settings
              </h3>
              <p className="text-charcoal-600 leading-relaxed">
                Beautiful outdoor spaces surrounded by Sierra Nevada foothills
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-charcoal-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-gradient-to-br from-lake-500 to-lake-600 rounded-full flex items-center justify-center mb-4">
                <Camera className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-charcoal-900 mb-3 font-display">
                Stunning Photo Spots
              </h3>
              <p className="text-charcoal-600 leading-relaxed">
                Scenic overlooks, historic buildings, and natural beauty at every turn
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Wedding Venues */}
      <section id="featured-venues" className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="section-eyebrow-light">Featured Venues</p>
            <h2 className="section-title-light mb-6">
              Wedding Venues in Auburn
            </h2>
            <p className="text-xl text-charcoal-700 max-w-3xl mx-auto leading-relaxed">
              From historic estates to scenic outdoor spaces, discover the perfect venue for your special day
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {weddingVenues.map((venue, index) => (
              <div
                key={index}
                className="card card-hover"
              >
                <div className="card-image relative">
                  <VenueImage
                    src={venue.imageSrc}
                    alt={`${venue.name} - ${venue.venueType || 'Wedding venue'} in ${venue.areaLabel}`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {venue.venueType && (
                    <div className="absolute top-3 left-3 bg-charcoal-900/80 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                      {venue.venueType}
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="card-title flex-1">{venue.name}</h3>
                  </div>
                  <p className="text-sm text-charcoal-600 mb-3">{venue.areaLabel}</p>
                  <p className="text-charcoal-700 mb-4 leading-relaxed">
                    {venue.shortDescription}
                  </p>
                  {venue.capacity && (
                    <p className="text-sm font-semibold text-charcoal-900 mb-4">
                      Capacity: {venue.capacity}
                    </p>
                  )}
                  <div className="flex flex-col sm:flex-row gap-2">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.mapSearchQuery)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-charcoal-100 text-charcoal-900 font-semibold rounded-lg hover:bg-charcoal-200 transition-colors text-sm"
                    >
                      <MapPin className="w-4 h-4" />
                      View on Map
                    </a>
                    {venue.website && (
                      <a
                        href={venue.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-charcoal-300 text-charcoal-900 font-semibold rounded-lg hover:bg-charcoal-50 transition-colors text-sm"
                      >
                        Website
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wedding Weekend Itinerary */}
      <section className="py-20 md:py-28 bg-cream-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="section-eyebrow-light">Plan Your Weekend</p>
            <h2 className="section-title-light mb-6">
              Your Wedding Weekend in Auburn
            </h2>
            <p className="text-xl text-charcoal-700 max-w-3xl mx-auto leading-relaxed">
              Make it a celebration weekend with dining, activities, and accommodations all in one place
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-white rounded-2xl p-8 border border-charcoal-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gold-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  1
                </div>
                <h3 className="text-2xl font-bold text-charcoal-900 font-display">Day 1: Welcome & Rehearsal</h3>
              </div>
              <div className="space-y-4 text-charcoal-700">
                <p className="font-semibold text-charcoal-900">Evening:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Rehearsal dinner at a local <Link href="/dining" className="text-lake-600 hover:text-lake-700 underline">Auburn restaurant</Link></li>
                  <li>Welcome drinks in Old Town Auburn</li>
                  <li>Explore historic <Link href="/things-to-do/history-culture" className="text-lake-600 hover:text-lake-700 underline">Gold Rush sites</Link></li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-charcoal-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gold-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  2
                </div>
                <h3 className="text-2xl font-bold text-charcoal-900 font-display">Day 2: Your Wedding Day</h3>
              </div>
              <div className="space-y-4 text-charcoal-700">
                <p className="font-semibold text-charcoal-900">Morning:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Getting ready at your <Link href="/accommodations" className="text-lake-600 hover:text-lake-700 underline">hotel or venue</Link></li>
                  <li>Pre-wedding photos at scenic spots</li>
                </ul>
                <p className="font-semibold text-charcoal-900 mt-4">Afternoon/Evening:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Ceremony and reception</li>
                  <li>Celebrate with local <Link href="/dining" className="text-lake-600 hover:text-lake-700 underline">catering and cuisine</Link></li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-charcoal-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gold-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  3
                </div>
                <h3 className="text-2xl font-bold text-charcoal-900 font-display">Day 3: Brunch & Activities</h3>
              </div>
              <div className="space-y-4 text-charcoal-700">
                <p className="font-semibold text-charcoal-900">Morning:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Brunch with guests at a local café</li>
                  <li>Explore <Link href="/things-to-do" className="text-lake-600 hover:text-lake-700 underline">outdoor activities</Link> like hiking or river rafting</li>
                </ul>
                <p className="font-semibold text-charcoal-900 mt-4">Afternoon:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Wine tasting at local wineries</li>
                  <li>Relax and enjoy Auburn's natural beauty</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Photo Spots */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="section-eyebrow-light">Photo Opportunities</p>
            <h2 className="section-title-light mb-6">
              Best Photo Spots in Auburn
            </h2>
            <p className="text-xl text-charcoal-700 max-w-3xl mx-auto leading-relaxed">
              Capture unforgettable moments at these iconic Auburn locations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            {photoSpots.map((spot, index) => (
              <div key={index} className="card card-hover">
                <div className="card-image relative">
                  <VenueImage
                    src={spot.imageSrc}
                    alt={`${spot.name} - ${spot.description}`}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="card-title mb-3">{spot.name}</h3>
                  <p className="text-charcoal-600 leading-relaxed">
                    {spot.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal Planning Tips */}
      <section className="py-20 md:py-28 bg-cream-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="section-eyebrow-light">When to Plan</p>
            <h2 className="section-title-light mb-6">
              Seasonal Planning Tips
            </h2>
            <p className="text-xl text-charcoal-700 max-w-3xl mx-auto leading-relaxed">
              Choose the perfect season for your Auburn wedding
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {seasonalTips.map((season, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 border border-charcoal-100 hover:shadow-lg transition-shadow">
                <div className="mb-4">
                  <Calendar className="w-10 h-10 text-gold-500 mb-2" />
                  <h3 className="text-xl font-bold text-charcoal-900 mb-1 font-display">{season.season}</h3>
                  <p className="text-sm text-charcoal-600">{season.months}</p>
                </div>
                <p className="text-charcoal-700 mb-4 leading-relaxed text-sm">
                  {season.description}
                </p>
                <ul className="space-y-1">
                  {season.highlights.map((highlight, i) => (
                    <li key={i} className="text-sm text-charcoal-600 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-gold-500 rounded-full"></span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guest Logistics */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Getting Here */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Car className="w-8 h-8 text-gold-500" />
                <h2 className="text-3xl font-bold text-charcoal-900 font-display">Getting Here</h2>
              </div>
              <div className="space-y-4 text-charcoal-700">
                <p className="leading-relaxed">
                  Auburn is easily accessible from major California cities, making it convenient for your wedding guests.
                </p>
                <div className="bg-cream-50 rounded-xl p-6 space-y-3">
                  <div>
                    <p className="font-semibold text-charcoal-900">By Car:</p>
                    <p className="text-sm">Located on I-80, approximately:</p>
                    <ul className="list-disc list-inside text-sm ml-2 mt-1 space-y-1">
                      <li>30 minutes from Sacramento</li>
                      <li>2.5 hours from San Francisco Bay Area</li>
                      <li>45 minutes from Lake Tahoe</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-charcoal-900">By Air:</p>
                    <p className="text-sm">Sacramento International Airport (SMF) is approximately 35 minutes away</p>
                  </div>
                  <div>
                    <p className="font-semibold text-charcoal-900">Parking:</p>
                    <p className="text-sm">Most venues offer ample parking. Downtown areas have public parking lots and street parking.</p>
                  </div>
                </div>
                <Link
                  href="/plan/getting-here"
                  className="inline-flex items-center gap-2 text-lake-600 hover:text-lake-700 font-semibold"
                >
                  Learn more about getting to Auburn
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Lodging & Dining */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-8 h-8 text-gold-500" />
                <h2 className="text-3xl font-bold text-charcoal-900 font-display">Guest Accommodations</h2>
              </div>
              <div className="space-y-4 text-charcoal-700">
                <p className="leading-relaxed">
                  Auburn offers a variety of accommodations and dining options to make your guests' stay comfortable and memorable.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Link
                    href="/accommodations"
                    className="bg-cream-50 rounded-xl p-6 hover:bg-cream-100 transition-colors group"
                  >
                    <h3 className="font-bold text-charcoal-900 mb-2 group-hover:text-lake-600 transition-colors">
                      Where to Stay
                    </h3>
                    <p className="text-sm text-charcoal-600 mb-3">
                      Hotels, inns, and vacation rentals for your wedding party and guests
                    </p>
                    <span className="text-sm font-semibold text-lake-600 group-hover:text-lake-700 inline-flex items-center gap-1">
                      Browse accommodations
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                  <Link
                    href="/dining"
                    className="bg-cream-50 rounded-xl p-6 hover:bg-cream-100 transition-colors group"
                  >
                    <h3 className="font-bold text-charcoal-900 mb-2 group-hover:text-lake-600 transition-colors">
                      Food & Drink
                    </h3>
                    <p className="text-sm text-charcoal-600 mb-3">
                      Restaurants, caterers, and local cuisine for rehearsal dinners and celebrations
                    </p>
                    <span className="text-sm font-semibold text-lake-600 group-hover:text-lake-700 inline-flex items-center gap-1">
                      Explore dining options
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wedding Services */}
      <section className="py-20 md:py-28 bg-cream-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="section-eyebrow-light">Complete Services</p>
            <h2 className="section-title-light mb-6">
              Everything You Need for Your Special Day
            </h2>
            <p className="text-xl text-charcoal-700 max-w-3xl mx-auto leading-relaxed">
              Auburn has all the services you need for a perfect wedding
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center mb-4">
                <Camera className="w-6 h-6 text-gold-600" />
              </div>
              <h3 className="text-xl font-bold text-charcoal-900 mb-3 font-display">Photography</h3>
              <p className="text-charcoal-600 leading-relaxed">
                Capture your special day with local professional photographers who know the best Auburn locations.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center mb-4">
                <Utensils className="w-6 h-6 text-gold-600" />
              </div>
              <h3 className="text-xl font-bold text-charcoal-900 mb-3 font-display">Catering</h3>
              <p className="text-charcoal-600 leading-relaxed">
                From farm-to-table cuisine to classic Gold Country fare, Auburn caterers deliver exceptional dining.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center mb-4">
                <Music className="w-6 h-6 text-gold-600" />
                  </div>
              <h3 className="text-xl font-bold text-charcoal-900 mb-3 font-display">Entertainment</h3>
              <p className="text-charcoal-600 leading-relaxed">
                Live bands, DJs, and musicians to set the perfect mood for your celebration.
                  </p>
                </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-charcoal-900 mb-6 text-center font-display">
              Additional Services Available
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {['Florists', 'Wedding Planners', 'Hair & Makeup', 'Officiants', 'Rentals & Decor', 'Transportation', 'Bakeries', 'Accommodations'].map((service) => (
                <div key={service} className="p-4 bg-cream-50 rounded-lg">
                  <p className="font-semibold text-charcoal-900">{service}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="wedding-form" className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <p className="section-eyebrow-light">Get Started</p>
            <h2 className="section-title-light mb-6">
              Request Wedding Information
            </h2>
            <p className="text-xl text-charcoal-700 mb-4 leading-relaxed">
              Tell us about your wedding vision and we'll help you discover the perfect venues, vendors, and accommodations in Auburn.
            </p>
            <p className="text-charcoal-600">
              Submit the form and we'll follow up with personalized recommendations for your special day.
            </p>
          </div>

          <div className="bg-cream-50 rounded-2xl shadow-xl p-8 md:p-12 max-w-3xl mx-auto">
            <WeddingForm />
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <RelatedPages currentPath="/plan/weddings" />
    </div>
  )
}