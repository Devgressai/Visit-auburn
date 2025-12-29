import { buildMetadata, SITE_URL } from '@/lib/seo'
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs'
import { RelatedPages } from '@/components/ui/RelatedPages'
import { AuburnHeroImage, AuburnImage } from '@/components/ui/AuburnImage'
import { generateBreadcrumbs } from '@/lib/routes'
import Link from 'next/link'
import { Mountain, MapPin, Clock, Star, ArrowRight, Utensils, Bike, Camera } from 'lucide-react'
import type { Metadata } from 'next'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Outdoor Adventure Day in Auburn - Epic Day of Trails & Rivers',
    description: 'One action-packed day in Auburn: world-class hiking, mountain biking, trail running, and river adventures. Complete athlete\'s itinerary with routes, elevation, and post-adventure refueling.',
    canonical: `${SITE_URL}/itineraries/outdoor-adventure-day`,
  })
}

export default function OutdoorAdventureDayPage() {
  const breadcrumbs = generateBreadcrumbs('/itineraries/outdoor-adventure-day')

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero */}
      <section className="relative h-[500px] md:h-[600px]">
        <AuburnHeroImage imageId="outdoor-confluence-trails">
          <div className="container mx-auto px-4 text-center">
            <span className="inline-block px-4 py-2 bg-green-600/90 text-white text-sm font-semibold rounded-full mb-4">
              Adventure Itinerary
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Outdoor Adventure Day
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              One epic day of trails, canyons, and rivers—Auburn's outdoor playground awaits
            </p>
          </div>
        </AuburnHeroImage>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={breadcrumbs} />

          {/* Intro */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="card p-8 bg-gradient-to-br from-green-50 to-cream-100">
              <div className="grid md:grid-cols-4 gap-6 mb-6">
                <div className="text-center">
                  <Clock className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm text-charcoal-600">Duration</p>
                  <p className="font-bold text-charcoal-900">1 Day (8-12 hrs)</p>
                </div>
                <div className="text-center">
                  <Mountain className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm text-charcoal-600">Difficulty</p>
                  <p className="font-bold text-charcoal-900">Moderate-Hard</p>
                </div>
                <div className="text-center">
                  <Star className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm text-charcoal-600">Best For</p>
                  <p className="font-bold text-charcoal-900">Hikers & Athletes</p>
                </div>
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm text-charcoal-600">Total Miles</p>
                  <p className="font-bold text-charcoal-900">10-15 miles</p>
                </div>
              </div>
              <p className="text-charcoal-700 text-lg leading-relaxed">
                <strong>Auburn, California</strong> isn't just Gold Country—it's home to 100+ miles of trails 
                woven through the American River canyons. The Western States Trail passes through here. Ultramarathons 
                and world-class mountain biking call Auburn home. This is where serious outdoor athletes come to 
                play, and today, you're joining them. This itinerary maximizes one day for hikers, trail runners, 
                mountain bikers, or multi-sport adventurers who want Auburn's best.
              </p>
            </div>
          </div>

          {/* Choose Your Adventure */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl font-bold text-charcoal-900 mb-6 text-center">Choose Your Adventure Track</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="card p-6 border-2 border-green-200 hover:border-green-400 transition-colors">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Mountain className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-bold text-charcoal-900 mb-2">Trail Hiker</h3>
                <p className="text-charcoal-600 text-sm mb-3">Canyon trails, river views, swimming holes</p>
                <p className="text-green-600 font-semibold text-sm">10-12 miles / 1,500ft gain</p>
              </div>
              <div className="card p-6 border-2 border-orange-200 hover:border-orange-400 transition-colors">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <Bike className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-bold text-charcoal-900 mb-2">Mountain Biker</h3>
                <p className="text-charcoal-600 text-sm mb-3">Technical single-track, flow trails</p>
                <p className="text-orange-600 font-semibold text-sm">15-20 miles / 2,000ft gain</p>
              </div>
              <div className="card p-6 border-2 border-blue-200 hover:border-blue-400 transition-colors">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl">🏃</span>
                </div>
                <h3 className="font-bold text-charcoal-900 mb-2">Trail Runner</h3>
                <p className="text-charcoal-600 text-sm mb-3">Western States route, tempo trails</p>
                <p className="text-blue-600 font-semibold text-sm">12-18 miles / 2,500ft gain</p>
              </div>
            </div>
          </div>

          {/* Early Morning */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-full bg-slate-700 text-white flex flex-col items-center justify-center flex-shrink-0">
                <span className="text-2xl">🌅</span>
                <span className="text-xs font-bold">5:30</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-charcoal-900">Dawn Patrol Start</h2>
                <p className="text-charcoal-600">Beat the heat, catch golden hour light</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="card p-6 border-l-4 border-slate-600">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-5 h-5 text-slate-600" />
                  <span className="font-bold text-charcoal-900">5:30 AM</span>
                  <span className="text-charcoal-600">— Staging & Fuel</span>
                </div>
                <p className="text-charcoal-700 mb-3">
                  Arrive at the <Link href="/things-to-do/outdoor-adventures" className="text-green-600 hover:text-green-700 font-semibold">Auburn State Recreation Area</Link> confluence 
                  parking lot. Coffee, banana, and gear check. Study trail maps one last time. Bathrooms available.
                </p>
                <p className="text-sm text-charcoal-600">
                  <strong>Pro tip:</strong> Park at the bottom if hiking, top if biking—plan your shuttle/loop accordingly.
                </p>
              </div>

              <div className="card p-6 border-l-4 border-green-500">
                <div className="flex items-center gap-3 mb-3">
                  <Mountain className="w-5 h-5 text-green-600" />
                  <span className="font-bold text-charcoal-900">6:00 AM</span>
                  <span className="text-charcoal-600">— Hit the Trail</span>
                </div>
                <p className="text-charcoal-700 mb-4">
                  <strong>Hikers:</strong> Start the Western States / Confluence Loop. First 3 miles climb 
                  from the confluence up to the ridge with constant canyon views.
                </p>
                <p className="text-charcoal-700 mb-4">
                  <strong>Bikers:</strong> Warm up on the Olmstead Loop (technical single-track) before 
                  connecting to Training Hill and the Connector trails.
                </p>
                <p className="text-charcoal-700">
                  <strong>Runners:</strong> Access the actual Western States 100 course—the most iconic 
                  ultramarathon trail in the world runs through Auburn.
                </p>
              </div>
            </div>
          </div>

          {/* Photo 1 */}
          <div className="mb-16">
            <AuburnImage 
              imageId="outdoor-confluence-trails"
              className="rounded-xl w-full h-[450px] object-cover shadow-lg"
            />
            <p className="text-sm text-charcoal-600 mt-3 italic text-center">
              The confluence of the North and Middle Forks of the American River—Auburn's adventure epicenter
            </p>
          </div>

          {/* Mid-Morning */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-full bg-green-600 text-white flex flex-col items-center justify-center flex-shrink-0">
                <span className="text-2xl">⛰️</span>
                <span className="text-xs font-bold">9:00</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-charcoal-900">Peak Adventure Zone</h2>
                <p className="text-charcoal-600">The heart of your outdoor day</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="card p-6 border-l-4 border-green-500">
                <div className="flex items-center gap-3 mb-3">
                  <MapPin className="w-5 h-5 text-green-600" />
                  <span className="font-bold text-charcoal-900">9:00 AM - 12:00 PM</span>
                  <span className="text-charcoal-600">— Core Mileage</span>
                </div>
                <p className="text-charcoal-700 mb-4">
                  This is your focus time. For hikers tackling the Lake Clementine Trail (8mi RT), you're 
                  reaching the turnaround point. For bikers on extended loops, you're hitting the most 
                  technical sections. For runners doing tempo work—embrace the suffering, it's Western States tradition.
                </p>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-bold text-charcoal-900 mb-2">Trail Highlights (Don't Miss)</h4>
                  <ul className="text-charcoal-700 text-sm space-y-1">
                    <li>🏔️ <strong>Training Hill:</strong> 700ft climb in 1 mile—the local benchmark</li>
                    <li>🌊 <strong>Lake Clementine:</strong> Emerald waters at trail's end</li>
                    <li>🌉 <strong>No Hands Bridge:</strong> Historic railroad trestle crossing canyon</li>
                    <li>🦅 <strong>Robie Point:</strong> Panoramic views of both river forks</li>
                  </ul>
                </div>
              </div>

              <div className="card p-6 border-l-4 border-blue-500">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-blue-600">💧</span>
                  <span className="font-bold text-charcoal-900">Hydration Check</span>
                </div>
                <p className="text-charcoal-700">
                  Auburn trails can hit 100°F+ in summer. Carry minimum 2-3 liters. Know water refill points 
                  (river access, park facilities). Electrolytes are mandatory, not optional.
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
              Lake Clementine—the reward at the end of Auburn's most popular canyon hike
            </p>
          </div>

          {/* Afternoon */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex flex-col items-center justify-center flex-shrink-0">
                <span className="text-2xl">🏊</span>
                <span className="text-xs font-bold">PM</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-charcoal-900">Recovery & Refuel</h2>
                <p className="text-charcoal-600">River cooling, massive eating, celebrating</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="card p-6 border-l-4 border-blue-500">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-blue-600">🏊</span>
                  <span className="font-bold text-charcoal-900">12:30 PM</span>
                  <span className="text-charcoal-600">— River Recovery</span>
                </div>
                <p className="text-charcoal-700 mb-3">
                  Find a <Link href="/things-to-do/outdoor-adventures" className="text-blue-600 hover:text-blue-700 font-semibold">swimming hole on your route</Link> and 
                  dive in. The American River is nature's ice bath. Spend 20-30 minutes soaking tired legs 
                  and lowering core temp. This isn't leisure—it's recovery protocol.
                </p>
              </div>

              <div className="card p-6 border-l-4 border-orange-500">
                <div className="flex items-center gap-3 mb-3">
                  <Utensils className="w-5 h-5 text-orange-600" />
                  <span className="font-bold text-charcoal-900">1:30 PM</span>
                  <span className="text-charcoal-600">— Post-Adventure Feast</span>
                </div>
                <p className="text-charcoal-700 mb-4">
                  You've earned it. Head to <Link href="/dining" className="text-orange-600 hover:text-orange-700 font-semibold">Auburn's restaurants</Link> and 
                  order everything. Local spots understand athletes—don't be shy about calorie needs.
                </p>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-bold text-charcoal-900 mb-2">Recovery Meal Must-Haves</h4>
                  <ul className="text-charcoal-700 text-sm space-y-1">
                    <li>🍔 <strong>Protein:</strong> Burger, steak, fish—your muscles need rebuilding</li>
                    <li>🥗 <strong>Greens:</strong> Salad or veg for micronutrients</li>
                    <li>🍟 <strong>Carbs:</strong> Don't skip—fries/bread/rice refill glycogen</li>
                    <li>🍺 <strong>Local beer:</strong> Hydration + celebration (one won't hurt)</li>
                  </ul>
                </div>
              </div>

              <div className="card p-6 border-l-4 border-amber-500">
                <div className="flex items-center gap-3 mb-3">
                  <Camera className="w-5 h-5 text-amber-600" />
                  <span className="font-bold text-charcoal-900">3:00 PM</span>
                  <span className="text-charcoal-600">— Optional: Old Town Walk</span>
                </div>
                <p className="text-charcoal-700">
                  If legs cooperate, gentle walk through <Link href="/things-to-do/history-culture" className="text-amber-600 hover:text-amber-700 font-semibold">historic Old Town</Link>. 
                  Browse outdoor gear shops, grab coffee, take photos of buildings where miners once traded gold. 
                  Keep it short—you've done enough today.
                </p>
              </div>
            </div>
          </div>

          {/* Photo 3 */}
          <div className="mb-16">
            <AuburnImage 
              imageId="outdoor-training-hill"
              className="rounded-xl w-full h-[450px] object-cover shadow-lg"
            />
            <p className="text-sm text-charcoal-600 mt-3 italic text-center">
              Training Hill—where ultrarunners earn their Western States credentials
            </p>
          </div>

          {/* Plan Your Visit CTA */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="card p-8 md:p-12 bg-gradient-to-br from-green-600 to-green-700 text-white">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Plan Your Adventure</h2>
                <p className="text-xl text-green-100 max-w-2xl mx-auto">
                  Turn a day trip into an adventure weekend—Auburn's trails deserve more than one day.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Link href="/accommodations" className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-colors group">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-green-200 transition-colors">Athlete Lodging</h3>
                  <p className="text-green-100 text-sm mb-3">Hotels near trailheads with early checkout</p>
                  <span className="inline-flex items-center text-sm font-semibold">
                    Find Hotels <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                <Link href="/things-to-do/outdoor-adventures" className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-colors group">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-green-200 transition-colors">Trail Maps</h3>
                  <p className="text-green-100 text-sm mb-3">100+ miles of trails to explore</p>
                  <span className="inline-flex items-center text-sm font-semibold">
                    View Trails <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                <Link href="/events" className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-colors group">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-green-200 transition-colors">Race Calendar</h3>
                  <p className="text-green-100 text-sm mb-3">Runs, rides, and outdoor events</p>
                  <span className="inline-flex items-center text-sm font-semibold">
                    See Events <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </div>

              <div className="text-center">
                <Link 
                  href="/plan/visitor-information" 
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-700 font-bold rounded-full hover:bg-green-50 transition-colors shadow-lg"
                >
                  Get Visitor Information
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Gear & Tips */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-charcoal-900 mb-6">Essential Gear & Intel</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card p-6">
                <h3 className="font-bold text-charcoal-900 mb-3">🎒 Pack List</h3>
                <ul className="text-charcoal-700 text-sm space-y-1">
                  <li>✓ 2-3L hydration (bladder or bottles)</li>
                  <li>✓ Electrolyte tabs/mix</li>
                  <li>✓ Trail snacks (500+ calories)</li>
                  <li>✓ Sunscreen SPF 50+</li>
                  <li>✓ Hat with brim</li>
                  <li>✓ Light layer (mornings can be cool)</li>
                  <li>✓ Trail map (phone + paper backup)</li>
                  <li>✓ First aid basics</li>
                  <li>✓ Swimsuit (summer)</li>
                </ul>
              </div>
              <div className="card p-6">
                <h3 className="font-bold text-charcoal-900 mb-3">⚠️ Trail Hazards</h3>
                <ul className="text-charcoal-700 text-sm space-y-1">
                  <li><strong>Heat:</strong> 90-105°F common Jun-Sep. Start before 7am.</li>
                  <li><strong>Rattlesnakes:</strong> Watch where you step. Give wide berth.</li>
                  <li><strong>Poison Oak:</strong> "Leaves of three, let it be."</li>
                  <li><strong>River current:</strong> Check flow before swimming.</li>
                  <li><strong>Cell service:</strong> Patchy in canyons. Tell someone your plan.</li>
                </ul>
              </div>
              <div className="card p-6">
                <h3 className="font-bold text-charcoal-900 mb-3">🌡️ Best Seasons</h3>
                <p className="text-charcoal-700 text-sm">
                  <strong>Spring (Mar-May):</strong> Perfect. Wildflowers, waterfalls, 60-80°F.<br />
                  <strong>Fall (Sep-Nov):</strong> Ideal. Golden light, 65-85°F.<br />
                  <strong>Summer:</strong> Go early! 5am-10am window.<br />
                  <strong>Winter:</strong> Mild but trails may be muddy.
                </p>
                <p className="text-sm mt-2">
                  <Link href="/plan/getting-here" className="text-green-600 hover:text-green-700 font-semibold">Plan your route →</Link>
                </p>
              </div>
              <div className="card p-6">
                <h3 className="font-bold text-charcoal-900 mb-3">📍 Trailhead Access</h3>
                <p className="text-charcoal-700 text-sm">
                  <strong>Main parking:</strong> Auburn State Recreation Area lots require $10 day-use fee.<br />
                  <strong>Confluence:</strong> Most popular staging area.<br />
                  <strong>Foresthill:</strong> Access Training Hill, Western States.<br />
                  <strong>Cool:</strong> North side access, less crowded.
                </p>
                <p className="text-sm mt-2">
                  <Link href="/plan/maps-guides" className="text-green-600 hover:text-green-700 font-semibold">Download trail maps →</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RelatedPages currentPath="/itineraries/outdoor-adventure-day" />
    </div>
  )
}

