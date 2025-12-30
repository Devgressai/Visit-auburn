import { buildMetadata, SITE_URL } from '@/lib/seo'
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs'
import { RelatedPages } from '@/components/ui/RelatedPages'
import { AuburnHeroImage, AuburnImage } from '@/components/ui/AuburnImage'
import { generateBreadcrumbs } from '@/lib/routes'
import Link from 'next/link'
import { MapPin, Coffee, UtensilsCrossed, Camera, Moon } from 'lucide-react'
import type { Metadata } from 'next'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Auburn Weekend Getaway Itinerary - 2-3 Day Gold Country Trip',
    description: 'Perfect Auburn, CA weekend: Lake Clementine hiking, Old Town dining, Gold Rush museums, and American River canyon views. Complete day-by-day itinerary with timing and tips.',
    canonical: `${SITE_URL}/itineraries/weekend-getaway`,
  })
}

export default async function WeekendGetawayPage() {
  const breadcrumbs = generateBreadcrumbs('/itineraries/weekend-getaway')

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-[500px] md:h-[600px]">
        <AuburnHeroImage imageId="hero-downtown-autumn">
          <div className="container mx-auto px-4 text-center">
            <span className="inline-block px-4 py-2 bg-lake-500/90 text-white text-sm font-semibold rounded-full mb-4">
              2-3 Day Itinerary
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Auburn Weekend Getaway
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              The perfect introduction to California Gold Country—hiking, history, dining, and relaxation
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

          {/* Overview */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="card p-8">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">Weekend Overview</h2>
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-sm text-charcoal-600 mb-2">DURATION</h4>
                  <p className="text-charcoal-900">2-3 Days / 2 Nights</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-charcoal-600 mb-2">DIFFICULTY</h4>
                  <p className="text-charcoal-900">Easy to Moderate</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-charcoal-600 mb-2">BEST FOR</h4>
                  <p className="text-charcoal-900">First-time visitors, couples</p>
                </div>
              </div>
              <p className="text-charcoal-700">
                This itinerary balances Auburn's top attractions—the stunning Lake Clementine Trail, authentic Gold Rush 
                history, farm-to-table dining in historic buildings, and the relaxed pace that defines Gold Country. You'll 
                hike canyon trails, explore 1850s museums, eat memorable meals, and understand why Auburn thrives as both 
                outdoor destination and historic town.
              </p>
            </div>
          </div>

          {/* Day 1 */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-lake-600 text-white flex items-center justify-center text-2xl font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h2 className="text-3xl font-bold text-charcoal-900">Friday: Arrival & Old Town</h2>
                <p className="text-charcoal-600">Ease into Auburn with historic downtown exploration</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-6 h-6 text-lake-600" />
                  <div>
                    <h3 className="text-xl font-bold text-charcoal-900">3:00 PM - Check-In & Settle</h3>
                    <p className="text-sm text-charcoal-600">Auburn accommodation</p>
                  </div>
                </div>
                <p className="text-charcoal-700 mb-3">
                  Check into your Auburn hotel or inn. For maximum convenience, stay in or near Old Town—you'll walk to 
                  dinner and easily access trails tomorrow. Take 30 minutes to unpack and refresh.
                </p>
                <p className="text-sm text-charcoal-600">
                  <strong>Lodging Tip:</strong> Auburn hotels include historic inns in Old Town and chain hotels near 
                  Interstate 80. <Link href="/accommodations" className="text-lake-600 hover:text-lake-700">View Auburn accommodations →</Link>
                </p>
              </div>

              <div className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Coffee className="w-6 h-6 text-lake-600" />
                  <div>
                    <h3 className="text-xl font-bold text-charcoal-900">4:00 PM - Old Town Walking Tour</h3>
                    <p className="text-sm text-charcoal-600">Self-guided • 60 minutes • Easy</p>
                  </div>
                </div>
                <p className="text-charcoal-700 mb-3">
                  Walk Old Town Auburn's historic district while afternoon light illuminates 1850s brick buildings. Start 
                  at the Visitor Center (old railroad depot) for a free walking tour map. Key stops: Firehouse Tower, 
                  Union Bar Building (1856), Shanghai Restaurant Building, and Auburn City Hall (1893). Browse antique 
                  shops, galleries, and cafes occupying Gold Rush-era structures.
                </p>
                <p className="text-sm text-charcoal-600">
                  <strong>Location:</strong> Start at 601 Lincoln Way (Visitor Center) • Free parking in public lots
                </p>
              </div>

              <div className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <UtensilsCrossed className="w-6 h-6 text-lake-600" />
                  <div>
                    <h3 className="text-xl font-bold text-charcoal-900">6:00 PM - Dinner in Old Town</h3>
                    <p className="text-sm text-charcoal-600">Farm-to-table Auburn dining</p>
                  </div>
                </div>
                <p className="text-charcoal-700 mb-3">
                  Enjoy dinner at one of Old Town's restaurants serving California cuisine with Gold Country ingredients. 
                  Many occupy historic buildings—you'll dine where miners once traded gold dust. Expect locally-sourced 
                  meats, seasonal vegetables from nearby farms, and wines from Sierra Foothills wineries. Outdoor patios 
                  offer pleasant evening ambiance spring through fall.
                </p>
                <p className="text-sm text-charcoal-600">
                  <Link href="/dining" className="text-lake-600 hover:text-lake-700">Explore Auburn restaurants →</Link>
                </p>
              </div>

              <div className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Moon className="w-6 h-6 text-lake-600" />
                  <div>
                    <h3 className="text-xl font-bold text-charcoal-900">8:00 PM - Evening Stroll</h3>
                    <p className="text-sm text-charcoal-600">Optional</p>
                  </div>
                </div>
                <p className="text-charcoal-700">
                  If energy permits, walk off dinner with a short evening stroll through Old Town. Historic buildings 
                  beautifully lit at night. Check local event calendars—First Saturday (monthly) brings art walks with 
                  galleries open late, live music, and wine tasting.
                </p>
              </div>
            </div>
          </div>

          {/* Photo */}
          <div className="mb-16">
            <AuburnImage 
              imageId="downtown-lincoln-way"
              className="rounded-lg w-full h-[500px] object-cover shadow-lg"
            />
            <p className="text-sm text-charcoal-600 mt-3 italic text-center">
              Old Town Auburn's Lincoln Way features 1850s buildings now housing restaurants, galleries, and shops
            </p>
          </div>

          {/* Day 2 */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-green-600 text-white flex items-center justify-center text-2xl font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h2 className="text-3xl font-bold text-charcoal-900">Saturday: Lake Clementine Trail</h2>
                <p className="text-charcoal-600">Auburn's iconic canyon hike and American River</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Coffee className="w-6 h-6 text-green-600" />
                  <div>
                    <h3 className="text-xl font-bold text-charcoal-900">7:30 AM - Breakfast</h3>
                    <p className="text-sm text-charcoal-600">Fuel for hiking</p>
                  </div>
                </div>
                <p className="text-charcoal-700">
                  Eat a substantial breakfast—you'll hike 8 miles today. Old Town cafes open early for trail-goers. Grab 
                  coffee, pastries, and breakfast sandwiches to go if you prefer picnicking at the trailhead.
                </p>
              </div>

              <div className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-6 h-6 text-green-600" />
                  <div>
                    <h3 className="text-xl font-bold text-charcoal-900">8:30 AM - Lake Clementine Trail</h3>
                    <p className="text-sm text-charcoal-600">8 miles • Moderate • 3-4 hours • 600 ft elevation</p>
                  </div>
                </div>
                <p className="text-charcoal-700 mb-3">
                  Auburn's signature hike follows the North Fork American River to beautiful Lake Clementine. The trail 
                  contours along canyon walls offering continuous river views, crosses seasonal creeks, and reveals 
                  multiple swimming holes. Spring brings wildflowers; summer means refreshing swims; fall showcases golden 
                  oaks. The 8-mile out-and-back takes 3-4 hours at a moderate pace with photo stops.
                </p>
                <p className="text-sm text-charcoal-600 mb-3">
                  <strong>What to Bring:</strong> 2 liters water per person, snacks, sun protection, sturdy shoes, 
                  swimsuit (summer), camera
                </p>
                <p className="text-sm text-charcoal-600">
                  <strong>Trailhead:</strong> Lake Clementine Road off Highway 49 North (10 min from Old Town) • Free 
                  parking (arrive by 9am weekends)
                </p>
              </div>

              <div className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <UtensilsCrossed className="w-6 h-6 text-green-600" />
                  <div>
                    <h3 className="text-xl font-bold text-charcoal-900">1:00 PM - Lunch in Auburn</h3>
                    <p className="text-sm text-charcoal-600">Post-hike meal</p>
                  </div>
                </div>
                <p className="text-charcoal-700">
                  Return to Auburn for lunch. Many restaurants welcome hikers (Auburn's casual that way). Opt for outdoor 
                  patios where you can relax post-trail while enjoying burgers, salads, or sandwiches. Local breweries 
                  serve craft beer perfect for celebrating your morning accomplishment.
                </p>
              </div>

              <div className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-6 h-6 text-green-600" />
                  <div>
                    <h3 className="text-xl font-bold text-charcoal-900">3:00 PM - Rest & Explore</h3>
                    <p className="text-sm text-charcoal-600">Flexible afternoon</p>
                  </div>
                </div>
                <p className="text-charcoal-700 mb-4">
                  Take afternoon at your own pace. Options:
                </p>
                <ul className="text-charcoal-700 space-y-2 text-sm">
                  <li><strong>• Rest at hotel:</strong> Nap, shower, recharge for evening</li>
                  <li><strong>• Visit Placer County Courthouse:</strong> Historic building with museum (free, closes 4pm)</li>
                  <li><strong>• Browse Old Town shops:</strong> Antiques, galleries, Gold Country souvenirs</li>
                  <li><strong>• Drive Foresthill Road:</strong> 30-min scenic loop to Foresthill Bridge overlooks</li>
                </ul>
              </div>

              <div className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <UtensilsCrossed className="w-6 h-6 text-green-600" />
                  <div>
                    <h3 className="text-xl font-bold text-charcoal-900">6:30 PM - Special Dinner</h3>
                    <p className="text-sm text-charcoal-600">Celebrate your Auburn adventure</p>
                  </div>
                </div>
                <p className="text-charcoal-700">
                  Make tonight's dinner memorable. Auburn's best restaurants serve elevated California cuisine in intimate 
                  settings—often historic buildings with exposed brick and local art. Expect Sierra Foothills wines, 
                  seasonal menus, and attentive service that balances sophistication with Gold Country friendliness.
                </p>
              </div>
            </div>
          </div>

          {/* Photo */}
          <div className="mb-16">
            <AuburnImage 
              imageId="outdoor-lake-clementine"
              className="rounded-lg w-full h-[500px] object-cover shadow-lg"
            />
            <p className="text-sm text-charcoal-600 mt-3 italic text-center">
              Lake Clementine Trail rewards hikers with stunning North Fork American River canyon views
            </p>
          </div>

          {/* Day 3 */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-amber-600 text-white flex items-center justify-center text-2xl font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h2 className="text-3xl font-bold text-charcoal-900">Sunday: Gold Rush History</h2>
                <p className="text-charcoal-600">Museums and departure (or extend your stay)</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Coffee className="w-6 h-6 text-amber-600" />
                  <div>
                    <h3 className="text-xl font-bold text-charcoal-900">9:00 AM - Breakfast</h3>
                    <p className="text-sm text-charcoal-600">Leisurely Sunday morning</p>
                  </div>
                </div>
                <p className="text-charcoal-700">
                  Enjoy relaxed breakfast. Check out (if leaving today) but explore museums before departing—most offer 
                  luggage-friendly visits.
                </p>
              </div>

              <div className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-6 h-6 text-amber-600" />
                  <div>
                    <h3 className="text-xl font-bold text-charcoal-900">10:00 AM - Gold Country Museum</h3>
                    <p className="text-sm text-charcoal-600">Open Tue-Sun 10am-4pm • $5 admission</p>
                  </div>
                </div>
                <p className="text-charcoal-700 mb-3">
                  Spend 1-2 hours exploring Auburn's premier Gold Rush museum. Walk through the replica mine shaft, see 
                  authentic mining equipment, try gold panning (you keep what you find!), and learn how the 1848 gold 
                  discovery transformed California. The museum brings Gold Rush history to life beyond textbook facts—
                  you'll understand why Auburn thrived while other mining camps faded.
                </p>
                <p className="text-sm text-charcoal-600">
                  <strong>Location:</strong> 1273 High Street, Auburn • Free parking • Allow 90 minutes
                </p>
              </div>

              <div className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Camera className="w-6 h-6 text-amber-600" />
                  <div>
                    <h3 className="text-xl font-bold text-charcoal-900">12:00 PM - Final Old Town Stroll</h3>
                    <p className="text-sm text-charcoal-600">Last looks and lunch</p>
                  </div>
                </div>
                <p className="text-charcoal-700 mb-3">
                  Return to Old Town for lunch and final exploring. Grab last photos of the Firehouse Tower, browse any 
                  shops you missed, pick up Gold Country souvenirs. This is Auburn at its weekend best—locals grabbing 
                  coffee, families strolling, the Gold Rush architecture glowing in California sun.
                </p>
              </div>

              <div className="card p-6 bg-lake-50 border-l-4 border-lake-600">
                <h3 className="text-xl font-bold text-charcoal-900 mb-3">Extending Your Weekend?</h3>
                <p className="text-charcoal-700 mb-4">
                  If staying Sunday night or adding Monday, consider:
                </p>
                <ul className="text-charcoal-700 space-y-2 text-sm">
                  <li><strong>• Hidden Falls Regional Park:</strong> Easier 3-6 mile trails with year-round waterfall</li>
                  <li><strong>• Bernhard Museum Complex:</strong> Victorian-era hotel and winery from 1851</li>
                  <li><strong>• Auburn State Recreation Area:</strong> More trail options and river swimming</li>
                  <li><strong>• Day trip to Nevada City:</strong> Historic Gold Rush town 45 minutes north</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Photo */}
          <div className="mb-16">
            <AuburnImage 
              imageId="historic-gold-country-museum"
              className="rounded-lg w-full h-[500px] object-cover shadow-lg"
            />
            <p className="text-sm text-charcoal-600 mt-3 italic text-center">
              Gold Country Museum in Auburn brings 1850s mining history to life with authentic equipment and exhibits
            </p>
          </div>

          {/* Practical Info */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8">Practical Information</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card p-6">
                <h3 className="text-xl font-bold text-charcoal-900 mb-4">Best Time for This Itinerary</h3>
                <p className="text-charcoal-700 mb-3">
                  <strong>Spring (March-May)</strong> and <strong>Fall (September-November)</strong> offer ideal 
                  conditions: comfortable temps (65-80°F), wildflowers or fall colors, and manageable trail crowds. 
                  Summer works but plan Lake Clementine hike before 9am to beat heat.
                </p>
                <p className="text-sm text-charcoal-600">
                  Winter (Dec-Feb) is quieter with mild 45-55°F days—perfectly pleasant for museum visits and gentle 
                  hiking if you don't mind cooler temperatures.
                </p>
              </div>

              <div className="card p-6">
                <h3 className="text-xl font-bold text-charcoal-900 mb-4">Budget Estimate</h3>
                <ul className="text-sm text-charcoal-700 space-y-2">
                  <li><strong>Lodging:</strong> $120-180/night (2 nights = $240-360)</li>
                  <li><strong>Dining:</strong> $30-50/meal × 5 meals = $150-250</li>
                  <li><strong>Museum admission:</strong> $5-10</li>
                  <li><strong>Gas:</strong> Minimal (everything close)</li>
                  <li><strong>Total per couple:</strong> $400-620 for full weekend</li>
                </ul>
                <p className="text-xs text-charcoal-600 mt-3">
                  Trails are free. Old Town parking is free. Auburn is affordable compared to Bay Area or Tahoe.
                </p>
              </div>

              <div className="card p-6">
                <h3 className="text-xl font-bold text-charcoal-900 mb-4">What to Pack</h3>
                <ul className="text-sm text-charcoal-700 space-y-2">
                  <li>• Hiking shoes (sturdy, broken-in)</li>
                  <li>• Daypack for trail</li>
                  <li>• Reusable water bottles (2L capacity)</li>
                  <li>• Layers (mornings cool, afternoons warm)</li>
                  <li>• Sun protection (hat, sunscreen, sunglasses)</li>
                  <li>• Swimsuit (summer visits)</li>
                  <li>• Camera or phone for photos</li>
                  <li>• Casual dining clothes (Auburn is relaxed)</li>
                </ul>
              </div>

              <div className="card p-6">
                <h3 className="text-xl font-bold text-charcoal-900 mb-4">Getting to Auburn</h3>
                <p className="text-charcoal-700 mb-3">
                  <strong>From Sacramento:</strong> 35 miles, 45 minutes via I-80 East<br />
                  <strong>From San Francisco:</strong> 130 miles, 2-2.5 hours via I-80 East<br />
                  <strong>From Lake Tahoe:</strong> 90 miles, 90 minutes via I-80 West
                </p>
                <p className="text-sm text-charcoal-600">
                  Sacramento International Airport is closest (1 hour). Rental car required—Auburn isn't walkable 
                  between neighborhoods, though Old Town itself is pedestrian-friendly.
                </p>
              </div>
            </div>
          </div>

          {/* Related Links */}
          <div className="max-w-4xl mx-auto">
            <div className="card p-8 bg-gradient-to-br from-blue-50 to-green-50">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-6 text-center">
                More Auburn Itineraries
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Link href="/itineraries/outdoor-adventure" className="text-center group">
                  <h3 className="font-bold text-charcoal-900 mb-2 group-hover:text-lake-600 transition-colors">
                    Outdoor Adventure →
                  </h3>
                  <p className="text-sm text-charcoal-600">3 days focused on hiking, biking, and river activities</p>
                </Link>
                <Link href="/itineraries/gold-rush-history" className="text-center group">
                  <h3 className="font-bold text-charcoal-900 mb-2 group-hover:text-lake-600 transition-colors">
                    Gold Rush History →
                  </h3>
                  <p className="text-sm text-charcoal-600">Deep dive into Auburn's Gold Rush heritage and museums</p>
                </Link>
                <Link href="/itineraries/romantic-escape" className="text-center group">
                  <h3 className="font-bold text-charcoal-900 mb-2 group-hover:text-lake-600 transition-colors">
                    Romantic Escape →
                  </h3>
                  <p className="text-sm text-charcoal-600">Couples-focused Auburn weekend with wine and dining</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RelatedPages currentPath="/itineraries/weekend-getaway" />
    </div>
  )
}

