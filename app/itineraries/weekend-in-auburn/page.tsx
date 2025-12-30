import { buildMetadata, SITE_URL } from '@/lib/seo'
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs'
import { RelatedPages } from '@/components/ui/RelatedPages'
import { AuburnHeroImage, AuburnImage } from '@/components/ui/AuburnImage'
import { generateBreadcrumbs } from '@/lib/routes'
import Link from 'next/link'
import { Calendar, MapPin, Clock, Star, ArrowRight, Utensils, Mountain, Camera } from 'lucide-react'
import type { Metadata } from 'next'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Weekend in Auburn - 48-Hour Gold Country Escape Itinerary',
    description: 'Plan your perfect Auburn weekend: 48 hours of hiking, historic Old Town, farm-to-table dining, and Gold Country charm. Complete Friday-Sunday itinerary with timing, restaurants, and insider tips.',
    canonical: `${SITE_URL}/itineraries/weekend-in-auburn`,
  })
}

export default function WeekendInAuburnPage() {
  const breadcrumbs = generateBreadcrumbs('/itineraries/weekend-in-auburn')

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-[500px] md:h-[600px]">
        <AuburnHeroImage imageId="hero-downtown-autumn">
          <div className="container mx-auto px-4 text-center">
            <span className="inline-block px-4 py-2 bg-lake-500/90 text-white text-sm font-semibold rounded-full mb-4">
              48-Hour Itinerary
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Weekend in Auburn
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Two perfect days in California's Gold Country—trails, history, food, and small-town charm
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
          <div className="max-w-4xl mx-auto mb-12">
            <div className="card p-8 bg-cream-50">
              <div className="grid md:grid-cols-4 gap-6 mb-6">
                <div className="text-center">
                  <Calendar className="w-8 h-8 text-lake-600 mx-auto mb-2" />
                  <p className="text-sm text-charcoal-600">Duration</p>
                  <p className="font-bold text-charcoal-900">2 Days / 2 Nights</p>
                </div>
                <div className="text-center">
                  <Star className="w-8 h-8 text-lake-600 mx-auto mb-2" />
                  <p className="text-sm text-charcoal-600">Best For</p>
                  <p className="font-bold text-charcoal-900">Couples & Friends</p>
                </div>
                <div className="text-center">
                  <Mountain className="w-8 h-8 text-lake-600 mx-auto mb-2" />
                  <p className="text-sm text-charcoal-600">Activity Level</p>
                  <p className="font-bold text-charcoal-900">Moderate</p>
                </div>
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-lake-600 mx-auto mb-2" />
                  <p className="text-sm text-charcoal-600">Starting Point</p>
                  <p className="font-bold text-charcoal-900">Old Town Auburn</p>
                </div>
              </div>
              <p className="text-charcoal-700 text-lg leading-relaxed">
                <strong>Auburn, California</strong> is Sacramento's favorite weekend escape—just 35 miles east where 
                the Sierra foothills begin rising toward Tahoe. This 48-hour itinerary balances outdoor adventure 
                with Gold Rush history, farm-to-table dining with canyon exploration. You'll hike the same trails 
                where miners panned for gold, dine in buildings from 1856, and experience why Auburn remains 
                California's most authentic Gold Country town.
              </p>
            </div>
          </div>

          {/* Friday Evening */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-full bg-lake-600 text-white flex flex-col items-center justify-center flex-shrink-0">
                <span className="text-xs uppercase font-semibold">Day 1</span>
                <span className="text-lg font-bold">FRI</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-charcoal-900">Friday Evening: Arrival & Old Town</h2>
                <p className="text-charcoal-600">Ease into Gold Country with dinner and exploration</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="card p-6 border-l-4 border-lake-500">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-5 h-5 text-lake-600" />
                  <span className="font-bold text-charcoal-900">4:00 PM</span>
                  <span className="text-charcoal-600">— Check into your Auburn hotel</span>
                </div>
                <p className="text-charcoal-700 mb-3">
                  Drop bags at your <Link href="/accommodations" className="text-lake-600 hover:text-lake-700 font-semibold">Auburn accommodation</Link>—ideally 
                  in Old Town for walkability. Take 30 minutes to refresh before heading out.
                </p>
              </div>

              <div className="card p-6 border-l-4 border-lake-500">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-5 h-5 text-lake-600" />
                  <span className="font-bold text-charcoal-900">5:00 PM</span>
                  <span className="text-charcoal-600">— Golden Hour Stroll</span>
                </div>
                <p className="text-charcoal-700 mb-3">
                  Walk <Link href="/things-to-do/history-culture" className="text-lake-600 hover:text-lake-700 font-semibold">historic Old Town Auburn</Link> as 
                  afternoon light illuminates 1850s brick buildings. Start at the iconic Firehouse Tower, browse 
                  antique shops, and soak in the Gold Rush atmosphere. This casual orientation sets the stage for 
                  two days of adventure.
                </p>
              </div>

              <div className="card p-6 border-l-4 border-lake-500">
                <div className="flex items-center gap-3 mb-3">
                  <Utensils className="w-5 h-5 text-lake-600" />
                  <span className="font-bold text-charcoal-900">6:30 PM</span>
                  <span className="text-charcoal-600">— Dinner in a Historic Building</span>
                </div>
                <p className="text-charcoal-700 mb-3">
                  <Link href="/dining" className="text-lake-600 hover:text-lake-700 font-semibold">Auburn's restaurants</Link> occupy 
                  buildings miners once used as saloons, hotels, and trading posts. Choose a farm-to-table spot 
                  serving seasonal California cuisine with Sierra Foothills wines. Outdoor patios offer warm-evening 
                  dining spring through fall.
                </p>
                <p className="text-sm text-charcoal-600">
                  <strong>Tip:</strong> Ask your server about the building's history—most have fascinating Gold Rush stories.
                </p>
              </div>
            </div>
          </div>

          {/* Photo 1 */}
          <div className="mb-16">
            <AuburnImage 
              imageId="downtown-lincoln-way"
              className="rounded-xl w-full h-[450px] object-cover shadow-lg"
            />
            <p className="text-sm text-charcoal-600 mt-3 italic text-center">
              Old Town Auburn's Lincoln Way—1850s buildings now housing restaurants, galleries, and shops
            </p>
          </div>

          {/* Saturday */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-full bg-green-600 text-white flex flex-col items-center justify-center flex-shrink-0">
                <span className="text-xs uppercase font-semibold">Day 2</span>
                <span className="text-lg font-bold">SAT</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-charcoal-900">Saturday: Canyon Adventure Day</h2>
                <p className="text-charcoal-600">Lake Clementine Trail, American River, downtown evening</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="card p-6 border-l-4 border-green-500">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-5 h-5 text-green-600" />
                  <span className="font-bold text-charcoal-900">7:30 AM</span>
                  <span className="text-charcoal-600">— Early Breakfast</span>
                </div>
                <p className="text-charcoal-700">
                  Fuel up at an Old Town café—you'll need energy for today's hike. Grab coffee to go if you prefer 
                  eating at the trailhead with canyon views.
                </p>
              </div>

              <div className="card p-6 border-l-4 border-green-500">
                <div className="flex items-center gap-3 mb-3">
                  <Mountain className="w-5 h-5 text-green-600" />
                  <span className="font-bold text-charcoal-900">8:30 AM</span>
                  <span className="text-charcoal-600">— Lake Clementine Trail</span>
                </div>
                <p className="text-charcoal-700 mb-3">
                  <Link href="/things-to-do/outdoor-adventures" className="text-green-600 hover:text-green-700 font-semibold">Auburn's signature hike</Link>: 
                  8 miles round-trip following the North Fork American River to Lake Clementine. The trail contours 
                  along canyon walls with continuous river views, crosses seasonal creeks, and reveals swimming holes. 
                  Allow 3-4 hours.
                </p>
                <p className="text-sm text-charcoal-600">
                  <strong>What to bring:</strong> 2L water, snacks, sun protection, camera. Summer visitors: bring swimsuits!
                </p>
              </div>

              <div className="card p-6 border-l-4 border-green-500">
                <div className="flex items-center gap-3 mb-3">
                  <Utensils className="w-5 h-5 text-green-600" />
                  <span className="font-bold text-charcoal-900">1:00 PM</span>
                  <span className="text-charcoal-600">— Post-Hike Lunch</span>
                </div>
                <p className="text-charcoal-700">
                  Return to Auburn for a well-deserved lunch. Many restaurants welcome hikers (Auburn's casual that way). 
                  Local breweries serve craft beer perfect for celebrating your trail accomplishment.
                </p>
              </div>

              <div className="card p-6 border-l-4 border-green-500">
                <div className="flex items-center gap-3 mb-3">
                  <Camera className="w-5 h-5 text-green-600" />
                  <span className="font-bold text-charcoal-900">3:00 PM</span>
                  <span className="text-charcoal-600">— Rest & Explore Options</span>
                </div>
                <ul className="text-charcoal-700 space-y-2">
                  <li>• <strong>Nap:</strong> Hotel rest before evening (no shame—you earned it!)</li>
                  <li>• <strong>Museums:</strong> <Link href="/things-to-do/history-culture" className="text-green-600 hover:text-green-700 font-semibold">Gold Country Museum</Link> for Gold Rush history</li>
                  <li>• <strong>Drive:</strong> Foresthill Bridge overlook (California's highest bridge)</li>
                  <li>• <strong>Shop:</strong> Old Town antiques and local boutiques</li>
                </ul>
              </div>

              <div className="card p-6 border-l-4 border-green-500">
                <div className="flex items-center gap-3 mb-3">
                  <Utensils className="w-5 h-5 text-green-600" />
                  <span className="font-bold text-charcoal-900">7:00 PM</span>
                  <span className="text-charcoal-600">— Special Dinner</span>
                </div>
                <p className="text-charcoal-700">
                  Saturday night deserves Auburn's best. Reserve at a <Link href="/dining" className="text-green-600 hover:text-green-700 font-semibold">top-rated restaurant</Link> for 
                  elevated California cuisine—seasonal menus, local wines, intimate atmosphere. This is the meal 
                  you'll remember.
                </p>
              </div>
            </div>
          </div>

          {/* Photo 2 */}
          <div className="mb-16">
            <AuburnImage 
              imageId="outdoor-lake-clementine"
              className="rounded-xl w-full h-[450px] object-cover shadow-lg"
            />
            <p className="text-sm text-charcoal-600 mt-3 italic text-center">
              Lake Clementine Trail rewards hikers with stunning North Fork American River canyon views
            </p>
          </div>

          {/* Sunday */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-full bg-lake-600 text-white flex flex-col items-center justify-center flex-shrink-0">
                <span className="text-xs uppercase font-semibold">Day 3</span>
                <span className="text-lg font-bold">SUN</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-charcoal-900">Sunday: History & Departure</h2>
                <p className="text-charcoal-600">Museums, brunch, and one last Old Town stroll</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="card p-6 border-l-4 border-blue-500">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-5 h-5 text-lake-600" />
                  <span className="font-bold text-charcoal-900">9:00 AM</span>
                  <span className="text-charcoal-600">— Leisurely Brunch</span>
                </div>
                <p className="text-charcoal-700">
                  Sunday brunch in Auburn means fresh pastries, excellent coffee, and no rush. Take your time—
                  this is Gold Country pace.
                </p>
              </div>

              <div className="card p-6 border-l-4 border-blue-500">
                <div className="flex items-center gap-3 mb-3">
                  <Camera className="w-5 h-5 text-lake-600" />
                  <span className="font-bold text-charcoal-900">10:30 AM</span>
                  <span className="text-charcoal-600">— Gold Country Museum</span>
                </div>
                <p className="text-charcoal-700 mb-3">
                  Spend 90 minutes at Auburn's <Link href="/things-to-do/history-culture" className="text-lake-600 hover:text-lake-700 font-semibold">Gold Country Museum</Link>. 
                  Walk through the replica mine, try gold panning (you keep what you find!), and understand 
                  how 1848's gold discovery transformed California.
                </p>
              </div>

              <div className="card p-6 border-l-4 border-blue-500">
                <div className="flex items-center gap-3 mb-3">
                  <MapPin className="w-5 h-5 text-lake-600" />
                  <span className="font-bold text-charcoal-900">12:30 PM</span>
                  <span className="text-charcoal-600">— Final Old Town Stroll</span>
                </div>
                <p className="text-charcoal-700">
                  One last walk through downtown before heading home. Grab Auburn souvenirs, take final photos 
                  of the Firehouse Tower, and promise yourself you'll return. Most visitors do.
                </p>
              </div>
            </div>
          </div>

          {/* Photo 3 */}
          <div className="mb-16">
            <AuburnImage 
              imageId="historic-gold-country-museum"
              className="rounded-xl w-full h-[450px] object-cover shadow-lg"
            />
            <p className="text-sm text-charcoal-600 mt-3 italic text-center">
              Gold Country Museum brings Auburn's 1850s mining heritage to life with hands-on exhibits
            </p>
          </div>

          {/* Plan Your Visit CTA */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="card p-8 md:p-12 bg-gradient-to-br from-lake-500 to-lake-600 text-white">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Plan Your Auburn Weekend</h2>
                <p className="text-xl text-white/90 max-w-2xl mx-auto">
                  Ready to experience Gold Country's best-kept secret? Start planning your 48-hour escape today.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Link href="/accommodations" className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-colors group">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors">Find Lodging</h3>
                  <p className="text-white/90 text-sm mb-3">Historic inns to modern hotels—book your Auburn stay</p>
                  <span className="inline-flex items-center text-sm font-semibold">
                    Browse Hotels <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                <Link href="/dining" className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-colors group">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors">Reserve Dinner</h3>
                  <p className="text-white/90 text-sm mb-3">Farm-to-table restaurants in Gold Rush buildings</p>
                  <span className="inline-flex items-center text-sm font-semibold">
                    View Restaurants <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                <Link href="/events" className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-colors group">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors">Check Events</h3>
                  <p className="text-white/90 text-sm mb-3">What's happening during your visit?</p>
                  <span className="inline-flex items-center text-sm font-semibold">
                    See Calendar <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </div>

              <div className="text-center">
                <Link 
                  href="/plan/visitor-information" 
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-lake-600 font-bold rounded-full hover:bg-cream-50 transition-colors shadow-lg"
                >
                  Get Visitor Information
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Tips */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-charcoal-900 mb-6">Weekend Quick Tips</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card p-6">
                <h3 className="font-bold text-charcoal-900 mb-3">Best Season</h3>
                <p className="text-charcoal-700 text-sm">
                  <strong>Spring (Mar-May)</strong> and <strong>Fall (Sep-Nov)</strong> offer ideal 65-80°F 
                  hiking weather. Summer's hot but swimming holes compensate. Winter's mild with fewer crowds.
                </p>
              </div>
              <div className="card p-6">
                <h3 className="font-bold text-charcoal-900 mb-3">Budget Estimate</h3>
                <p className="text-charcoal-700 text-sm">
                  <strong>Lodging:</strong> $120-180/night × 2 = $240-360<br />
                  <strong>Dining:</strong> $50-80/day = $100-160<br />
                  <strong>Activities:</strong> Trails free, museum $5<br />
                  <strong>Total:</strong> $350-530 per couple
                </p>
              </div>
              <div className="card p-6">
                <h3 className="font-bold text-charcoal-900 mb-3">Getting Here</h3>
                <p className="text-charcoal-700 text-sm">
                  <strong>From Sacramento:</strong> 35 min via I-80<br />
                  <strong>From SF:</strong> 2 hours via I-80<br />
                  <strong>From Tahoe:</strong> 90 min via I-80<br />
                  <Link href="/plan/getting-here" className="text-lake-600 hover:text-lake-700 font-semibold">Detailed directions →</Link>
                </p>
              </div>
              <div className="card p-6">
                <h3 className="font-bold text-charcoal-900 mb-3">What to Pack</h3>
                <p className="text-charcoal-700 text-sm">
                  Hiking shoes, layers (temps vary 20°F morning to afternoon), swimsuit (summer), 
                  camera, reusable water bottle. Casual dress for dinner—Auburn's relaxed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RelatedPages currentPath="/itineraries/weekend-in-auburn" />
    </div>
  )
}

