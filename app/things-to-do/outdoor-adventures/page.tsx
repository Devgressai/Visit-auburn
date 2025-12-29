import { buildMetadata, SITE_URL } from '@/lib/seo'
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs'
import { RelatedPages } from '@/components/ui/RelatedPages'
import { AuburnHeroImage, AuburnImage } from '@/components/ui/AuburnImage'
import { generateBreadcrumbs } from '@/lib/routes'
import Link from 'next/link'
import { Mountain, Waves, Bike, Compass, MapPin } from 'lucide-react'
import type { Metadata } from 'next'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Outdoor Adventures in Auburn, California - Hiking, Biking & Water Sports',
    description: 'Discover outdoor recreation in Auburn, CA. Hike Lake Clementine Trail, explore Hidden Falls Regional Park, mountain bike Western States Trail, and swim the American River in Gold Country.',
    canonical: `${SITE_URL}/things-to-do/outdoor-adventures`,
  })
}

const activities = [
  {
    icon: Mountain,
    title: 'Hiking Trails',
    description: 'World-class trails from easy strolls to challenging climbs',
    highlights: ['Lake Clementine Trail', 'Hidden Falls Regional Park', 'Quarry Ponds Loop', 'Overlook Park Vista']
  },
  {
    icon: Waves,
    title: 'Water Activities',
    description: 'Swimming, kayaking, and fishing on the American River',
    highlights: ['Auburn swimming holes', 'Lake Clementine kayaking', 'American River fishing', 'North Fork recreation']
  },
  {
    icon: Bike,
    title: 'Mountain Biking',
    description: 'Technical trails and scenic rides through Gold Country',
    highlights: ['Western States Trail', 'Olmstead Loop', 'Confluence trails', 'Foresthill Divide']
  },
  {
    icon: Compass,
    title: 'Scenic Drives',
    description: 'Breathtaking routes through canyons and foothills',
    highlights: ['Foresthill Bridge', 'Highway 49 scenic byway', 'Auburn-Foresthill Road', 'Canyon overlooks']
  }
]

export default async function OutdoorAdventuresPage() {
  const breadcrumbs = generateBreadcrumbs('/things-to-do/outdoor-adventures')

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero */}
      <section className="relative h-[500px] md:h-[600px]">
        <AuburnHeroImage imageId="hero-american-river-canyon">
          <div className="container mx-auto px-4 text-center">
            <span className="inline-block px-4 py-2 bg-green-600/90 text-white text-sm font-semibold rounded-full mb-4">
              Auburn Outdoor Recreation
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Outdoor Adventures in Auburn
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Where Sierra Nevada wilderness meets Gold Country heritage—endless trails, rivers, and canyons await
            </p>
          </div>
        </AuburnHeroImage>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={breadcrumbs} />

          {/* Intro Content */}
          <div className="max-w-4xl mx-auto mb-16">
            <p className="text-xl text-charcoal-700 leading-relaxed mb-6">
              <strong>Auburn, California</strong> sits at the perfect elevation—1,255 feet—where the Sacramento Valley rises 
              into the Sierra Nevada foothills. This unique position creates a year-round outdoor playground carved by the 
              American River's North and Middle Forks. The result? Over 100 miles of trails within 15 minutes of downtown, 
              world-class mountain biking on the legendary Western States Trail, swimming holes that stay refreshing through 
              summer, and canyon views that rival anything in California.
            </p>

            <h2 className="text-3xl font-bold text-charcoal-900 mt-12 mb-6">
              Why Auburn is California's Outdoor Recreation Capital
            </h2>
            <p className="mb-4">
              Auburn State Recreation Area—covering 42,000 acres—forms the backbone of outdoor adventures here. The American 
              River carved this dramatic canyon over millions of years, creating ecosystems from riparian zones to oak woodlands 
              to chaparral hillsides. Add Placer County's regional parks (Hidden Falls, Railhead, Overlook) and you have an 
              interconnected trail system that hosted the Western States 100 Endurance Run for nearly 50 years.
            </p>
            <p className="mb-6">
              What makes Auburn special isn't just the quantity of trails—it's the variety and accessibility. Start your morning 
              with coffee in Old Town Auburn, hike 10 miles by lunch, cool off in the river, then return for dinner without ever 
              driving more than 20 minutes. This is Auburn's outdoor lifestyle, and it's available 12 months a year thanks to 
              our mild Mediterranean climate.
            </p>

            {/* Activity Cards */}
            <div className="grid md:grid-cols-2 gap-6 my-12">
              {activities.map((activity) => {
                const Icon = activity.icon
                return (
                  <div key={activity.title} className="card p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-green-700" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-charcoal-900 mb-2">{activity.title}</h3>
                        <p className="text-charcoal-600">{activity.description}</p>
                      </div>
                    </div>
                    <ul className="space-y-2 text-sm text-charcoal-700">
                      {activity.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-green-600 flex-shrink-0" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Photo 1 */}
          <div className="mb-16">
            <AuburnImage 
              imageId="outdoor-hidden-falls"
              className="rounded-lg w-full h-[500px] object-cover shadow-lg"
            />
            <p className="text-sm text-charcoal-600 mt-3 italic text-center">
              Hidden Falls cascades year-round in Auburn's regional park system, just 15 minutes from downtown
            </p>
          </div>

          {/* Top Trails Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8">
              Auburn's Best Hiking Trails
            </h2>

            <div className="space-y-8">
              <div className="border-l-4 border-green-600 pl-6">
                <h3 className="text-2xl font-bold text-charcoal-900 mb-3">
                  Lake Clementine Trail
                </h3>
                <p className="text-charcoal-700 mb-3">
                  <strong>Distance:</strong> 8 miles out-and-back | <strong>Difficulty:</strong> Moderate | <strong>Elevation:</strong> 600 ft gain
                </p>
                <p className="mb-3">
                  Auburn's most popular trail follows the North Fork American River to stunning Lake Clementine. The trail 
                  hugs cliff sides, crosses seasonal streams, and offers multiple swimming holes en route. Spring brings 
                  wildflower displays; summer means refreshing dips; fall showcases golden oaks. Trailhead parking fills 
                  early on weekends—arrive by 8am or go midweek.
                </p>
                <p className="text-sm text-charcoal-600">
                  <strong>Trailhead:</strong> Lake Clementine Road, off Highway 49 North
                </p>
              </div>

              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-2xl font-bold text-charcoal-900 mb-3">
                  Hidden Falls Regional Park
                </h3>
                <p className="text-charcoal-700 mb-3">
                  <strong>Distance:</strong> 3-12 miles (multiple loops) | <strong>Difficulty:</strong> Easy to Moderate | <strong>Elevation:</strong> Varies
                </p>
                <p className="mb-3">
                  Placer County's newest regional park opened in 2010 and quickly became an Auburn favorite. The waterfall 
                  flows year-round (peak in spring), surrounded by oak woodlands and wildflower meadows. Choose from easy 
                  family loops to longer backcountry trails. Mountain bikers and hikers share trails peacefully. Bring a 
                  picnic—tables near the falls make perfect lunch spots.
                </p>
                <p className="text-sm text-charcoal-600">
                  <strong>Trailhead:</strong> 7587 Mears Place, Auburn
                </p>
              </div>

              <div className="border-l-4 border-purple-600 pl-6">
                <h3 className="text-2xl font-bold text-charcoal-900 mb-3">
                  Quarry Ponds Trail
                </h3>
                <p className="text-charcoal-700 mb-3">
                  <strong>Distance:</strong> 5-mile loop | <strong>Difficulty:</strong> Easy | <strong>Elevation:</strong> Minimal
                </p>
                <p className="mb-3">
                  Former mining ponds now host ducks, turtles, and eagles along this gentle trail perfect for families and 
                  trail runners. The loop circles two spring-fed ponds with Sierra foothills rising behind. Bring binoculars 
                  for birdwatching—over 80 species documented. Dogs love the water access points. Connect to longer trails 
                  that lead deeper into Auburn State Recreation Area.
                </p>
                <p className="text-sm text-charcoal-600">
                  <strong>Trailhead:</strong> Rock Creek Road, off Highway 49
                </p>
              </div>
            </div>
          </div>

          {/* Photo 2 */}
          <div className="mb-16">
            <AuburnImage 
              imageId="outdoor-mountain-biking"
              className="rounded-lg w-full h-[500px] object-cover shadow-lg"
            />
            <p className="text-sm text-charcoal-600 mt-3 italic text-center">
              Western States Trail through Auburn draws mountain bikers from across California for technical single-track
            </p>
          </div>

          {/* Water Activities */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-6">
              American River Swimming & Water Sports
            </h2>
            <p className="mb-6">
              The American River stays refreshingly cool through Auburn's hot summers (85-95°F July-August) thanks to 
              Sierra snowmelt and dam releases. Local swimming holes range from deep pools perfect for diving to shallow 
              beaches ideal for kids. Always check flow rates before visiting—safe levels are 1,000-3,000 CFS.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg mb-6">
              <h4 className="font-bold text-lg mb-3">Popular Swimming Spots</h4>
              <ul className="space-y-2">
                <li><strong>Lake Clementine:</strong> Reservoir swimming with sandy beach access</li>
                <li><strong>Auburn SRA Swimming Hole:</strong> Below Foresthill Bridge, deep pools for diving</li>
                <li><strong>Confluence:</strong> Where North and Middle Forks meet, calm water and sand bars</li>
                <li><strong>Mountain Quarries:</strong> Spring-fed ponds, warmer than river water</li>
              </ul>
            </div>

            <p className="text-sm text-charcoal-600 mb-6">
              <strong>Safety Note:</strong> The American River has strong currents. Always wear life jackets when kayaking. 
              Never swim alone. Check river flow at California Data Exchange Center before visiting.
            </p>
          </div>

          {/* Photo 3 */}
          <div className="mb-16">
            <AuburnImage 
              imageId="outdoor-river-swimming"
              className="rounded-lg w-full h-[500px] object-cover shadow-lg"
            />
            <p className="text-sm text-charcoal-600 mt-3 italic text-center">
              American River swimming holes near Auburn provide refreshing escapes during Gold Country summers
            </p>
          </div>

          {/* Best Times */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-6">
              Best Time for Auburn Outdoor Adventures
            </h2>

            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-xl text-charcoal-900 mb-2">Spring (March-May)</h4>
                <p>
                  <strong>Perfect for:</strong> Waterfall hikes, wildflower viewing, comfortable temperatures (60-75°F). 
                  Hidden Falls peaks in March-April. Lake Clementine Trail explodes with California poppies and lupine. 
                  Rivers run high—beautiful for viewing but use caution near water.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-xl text-charcoal-900 mb-2">Summer (June-August)</h4>
                <p>
                  <strong>Perfect for:</strong> Swimming, early morning hikes, water sports. Hit trails before 9am to beat 
                  heat. River swimming peaks June-July. Western States 100 runs through Auburn in late June—watch endurance 
                  athletes tackle the Canyons. Evening canyon breezes make sunset hikes pleasant.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-xl text-charcoal-900 mb-2">Fall (September-November)</h4>
                <p>
                  <strong>Perfect for:</strong> All-day hiking, mountain biking, photography. Oak trees turn gold in October. 
                  Temps drop to ideal 65-80°F. Trails less crowded than summer. Best season for long-distance hikes and 
                  backcountry exploration. Rivers low but still swimmable through September.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-xl text-charcoal-900 mb-2">Winter (December-February)</h4>
                <p>
                  <strong>Perfect for:</strong> Solitude on trails, waterfall viewing after storms, mild hiking (45-55°F). 
                  Rain brings green hills and flowing creeks. Trails muddy after storms—wait 2 days for drying. Sierra snow 
                  visible from canyon overlooks. Quick drive to Tahoe skiing (90 minutes) while staying in mild Auburn.
                </p>
              </div>
            </div>
          </div>

          {/* Nearby Pairings */}
          <div className="max-w-4xl mx-auto my-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8">
              Complete Your Auburn Outdoor Experience
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/accommodations" className="card card-hover p-6 group">
                <h3 className="text-xl font-bold text-charcoal-900 mb-3 group-hover:text-green-600 transition-colors">
                  Stay Near Trailheads →
                </h3>
                <p className="text-charcoal-600">
                  Auburn hotels and cabins put you minutes from trails. Park once, hike daily, return for showers and locally-brewed beer.
                </p>
              </Link>
              <Link href="/dining" className="card card-hover p-6 group">
                <h3 className="text-xl font-bold text-charcoal-900 mb-3 group-hover:text-green-600 transition-colors">
                  Refuel After Adventures →
                </h3>
                <p className="text-charcoal-600">
                  Old Town Auburn restaurants welcome muddy hikers. Farm-to-table meals, craft beer, and patio seating.
                </p>
              </Link>
              <Link href="/itineraries/outdoor-adventure" className="card card-hover p-6 group">
                <h3 className="text-xl font-bold text-charcoal-900 mb-3 group-hover:text-green-600 transition-colors">
                  Plan Your Trip →
                </h3>
                <p className="text-charcoal-600">
                  Follow our 3-day outdoor itinerary: best trails, swimming spots, and post-hike dining.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <RelatedPages currentPath="/things-to-do/outdoor-adventures" />
    </div>
  )
}

