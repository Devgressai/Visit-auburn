import { buildMetadata, SITE_URL } from '@/lib/seo'
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs'
import { RelatedPages } from '@/components/ui/RelatedPages'
import { AuburnHeroImage, AuburnImage } from '@/components/ui/AuburnImage'
import { generateBreadcrumbs } from '@/lib/routes'
import Link from 'next/link'
import { Wine, MapPin, Clock, Star, ArrowRight, Utensils, History, Camera } from 'lucide-react'
import type { Metadata } from 'next'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'History & Wine Day in Auburn - Gold Rush Heritage & Sierra Foothills Wine',
    description: 'One sophisticated day in Auburn: Gold Rush history, foothill wineries, farm-to-table dining. Complete cultural itinerary for history buffs and wine lovers.',
    canonical: `${SITE_URL}/itineraries/history-and-wine`,
  })
}

export default function HistoryAndWinePage() {
  const breadcrumbs = generateBreadcrumbs('/itineraries/history-and-wine')

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-[500px] md:h-[600px]">
        <AuburnHeroImage imageId="downtown-historic-buildings">
          <div className="container mx-auto px-4 text-center">
            <span className="inline-block px-4 py-2 bg-lake-500/90 text-white text-sm font-semibold rounded-full mb-4">
              Cultural Itinerary
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              History & Wine Day
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Where Gold Rush heritage meets Sierra Foothills wine—a sophisticated day in Auburn
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
                  <Clock className="w-8 h-8 text-lake-600 mx-auto mb-2" />
                  <p className="text-sm text-charcoal-600">Duration</p>
                  <p className="font-bold text-charcoal-900">1 Day (8-10 hrs)</p>
                </div>
                <div className="text-center">
                  <Wine className="w-8 h-8 text-lake-600 mx-auto mb-2" />
                  <p className="text-sm text-charcoal-600">Wine Tastings</p>
                  <p className="font-bold text-charcoal-900">2-3 Wineries</p>
                </div>
                <div className="text-center">
                  <History className="w-8 h-8 text-lake-600 mx-auto mb-2" />
                  <p className="text-sm text-charcoal-600">Historic Sites</p>
                  <p className="font-bold text-charcoal-900">5+ Locations</p>
                </div>
                <div className="text-center">
                  <Star className="w-8 h-8 text-lake-600 mx-auto mb-2" />
                  <p className="text-sm text-charcoal-600">Best For</p>
                  <p className="font-bold text-charcoal-900">Couples & Friends</p>
                </div>
              </div>
              <p className="text-charcoal-700 text-lg leading-relaxed">
                <strong>Auburn, California</strong> offers something rare: authentic Gold Rush history you can touch, 
                walk through, and taste—paired with award-winning wines from one of California's oldest wine regions. 
                The Sierra Foothills AVA has been producing wine since 1849, when miners needed something to drink 
                after a hard day panning for gold. Today's boutique wineries carry that pioneer spirit, crafting 
                bold Zinfandels and elegant Barberas in tasting rooms with million-dollar views. This itinerary 
                weaves together 170 years of history with the pleasures of great wine and food.
              </p>
            </div>
          </div>

          {/* Morning */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-full bg-amber-700 text-white flex flex-col items-center justify-center flex-shrink-0">
                <History className="w-8 h-8" />
                <span className="text-xs font-bold">AM</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-charcoal-900">Morning: Gold Rush Immersion</h2>
                <p className="text-charcoal-600">Museums, walking tour, and 1850s architecture</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="card p-6 border-l-4 border-amber-600">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-5 h-5 text-amber-700" />
                  <span className="font-bold text-charcoal-900">9:00 AM</span>
                  <span className="text-charcoal-600">— Coffee & Pastry in Old Town</span>
                </div>
                <p className="text-charcoal-700 mb-3">
                  Begin in <Link href="/things-to-do/history-culture" className="text-lake-600 hover:text-lake-700 font-semibold">Old Town Auburn</Link>, 
                  where Gold Rush buildings line the streets. Grab coffee and a pastry at a local café—you're 
                  likely sitting in a building from the 1850s. Take your time. The day ahead is about savoring.
                </p>
              </div>

              <div className="card p-6 border-l-4 border-amber-600">
                <div className="flex items-center gap-3 mb-3">
                  <MapPin className="w-5 h-5 text-amber-700" />
                  <span className="font-bold text-charcoal-900">9:45 AM</span>
                  <span className="text-charcoal-600">— Self-Guided Walking Tour</span>
                </div>
                <p className="text-charcoal-700 mb-4">
                  Walk Auburn's historic district at your own pace. Key stops include:
                </p>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <h4 className="font-bold text-charcoal-900 mb-2">Must-See Buildings</h4>
                    <ul className="text-charcoal-700 text-sm space-y-1">
                      <li>🏛️ <strong>Placer County Courthouse</strong> — Classical Revival, 1898</li>
                      <li>🚒 <strong>Firehouse Tower</strong> — Auburn's iconic symbol</li>
                      <li>🏨 <strong>Shanghai Restaurant Building</strong> — 1856 brick</li>
                      <li>⛪ <strong>First Congregational Church</strong> — 1861</li>
                    </ul>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <h4 className="font-bold text-charcoal-900 mb-2">Historic Streets</h4>
                    <ul className="text-charcoal-700 text-sm space-y-1">
                      <li>🚶 <strong>Lincoln Way</strong> — Original commercial district</li>
                      <li>🚶 <strong>Sacramento Street</strong> — Historic storefronts</li>
                      <li>🚶 <strong>Commercial Street</strong> — Victorian architecture</li>
                      <li>📜 <strong>Chinese Alley</strong> — Chinese mining heritage</li>
                    </ul>
                  </div>
                </div>
                <p className="text-sm text-charcoal-600">
                  <Link href="/plan/maps-guides" className="text-lake-600 hover:text-lake-700 font-semibold">Download the walking tour map →</Link>
                </p>
              </div>

              <div className="card p-6 border-l-4 border-amber-600">
                <div className="flex items-center gap-3 mb-3">
                  <History className="w-5 h-5 text-amber-700" />
                  <span className="font-bold text-charcoal-900">11:00 AM</span>
                  <span className="text-charcoal-600">— Gold Country Museum</span>
                </div>
                <p className="text-charcoal-700 mb-3">
                  Spend an hour at the <Link href="/things-to-do/history-culture" className="text-lake-600 hover:text-lake-700 font-semibold">Gold Country Museum</Link>. 
                  Walk through the mine replica, see original mining equipment, and try gold panning—yes, adults 
                  enjoy it too. The museum provides excellent context for everything you'll see throughout the day.
                </p>
                <p className="text-sm text-charcoal-600">
                  <strong>Admission:</strong> $5 adults • <strong>Duration:</strong> 60-90 minutes
                </p>
              </div>
            </div>
          </div>

          {/* Photo 1 */}
          <div className="mb-16">
            <AuburnImage 
              imageId="historic-old-town-clocktower"
              className="rounded-xl w-full h-[450px] object-cover shadow-lg"
            />
            <p className="text-sm text-charcoal-600 mt-3 italic text-center">
              Old Town Auburn's iconic Firehouse Tower has watched over Lincoln Way since 1891
            </p>
          </div>

          {/* Lunch */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-full bg-green-700 text-white flex flex-col items-center justify-center flex-shrink-0">
                <Utensils className="w-8 h-8" />
                <span className="text-xs font-bold">NOON</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-charcoal-900">Midday: Farm-to-Table Lunch</h2>
                <p className="text-charcoal-600">Local cuisine in a historic setting</p>
              </div>
            </div>

            <div className="card p-6 border-l-4 border-green-600">
              <div className="flex items-center gap-3 mb-3">
                <Utensils className="w-5 h-5 text-green-700" />
                <span className="font-bold text-charcoal-900">12:30 PM</span>
                <span className="text-charcoal-600">— Elevated Lunch in Old Town</span>
              </div>
              <p className="text-charcoal-700 mb-4">
                <Link href="/dining" className="text-lake-600 hover:text-lake-700 font-semibold">Auburn's restaurants</Link> specialize 
                in California farm-to-table cuisine—seasonal menus featuring produce from local farms, proteins from 
                nearby ranches, and yes, Sierra Foothills wines by the glass.
              </p>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-bold text-charcoal-900 mb-2">What to Look For</h4>
                <ul className="text-charcoal-700 text-sm space-y-1">
                  <li>🥗 Seasonal salads with local greens and fruit</li>
                  <li>🧀 Artisan cheese plates from California creameries</li>
                  <li>🍷 Wine flights featuring foothill vintages</li>
                  <li>🏛️ Historic building ambiance—ask about the space's past</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Afternoon */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-full bg-lake-600 text-white flex flex-col items-center justify-center flex-shrink-0">
                <Wine className="w-8 h-8" />
                <span className="text-xs font-bold">PM</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-charcoal-900">Afternoon: Sierra Foothills Wine Trail</h2>
                <p className="text-charcoal-600">World-class wines with foothill views</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="card p-6 border-l-4 border-lake-600">
                <div className="flex items-center gap-3 mb-3">
                  <Wine className="w-5 h-5 text-lake-600" />
                  <span className="font-bold text-charcoal-900">2:00 PM</span>
                  <span className="text-charcoal-600">— First Winery Stop</span>
                </div>
                <p className="text-charcoal-700 mb-4">
                  Head to the <Link href="/dining" className="text-lake-600 hover:text-lake-700 font-semibold">Auburn wine region</Link>—foothill 
                  vineyards are just 15-20 minutes from downtown. The Sierra Foothills AVA is California's 
                  original wine country, with vines planted alongside Gold Rush mining camps.
                </p>
                <div className="bg-lake-50 p-4 rounded-lg mb-4">
                  <h4 className="font-bold text-charcoal-900 mb-2">Sierra Foothills Specialties</h4>
                  <ul className="text-charcoal-700 text-sm space-y-1">
                    <li>🍷 <strong>Old Vine Zinfandel</strong> — Bold, spicy, uniquely California</li>
                    <li>🍷 <strong>Barbera</strong> — Italian varietal thriving in granite soil</li>
                    <li>🍷 <strong>Tempranillo</strong> — Spanish grapes, Gold Country character</li>
                    <li>🥂 <strong>Sparkling</strong> — Mountain altitude creates ideal bubbles</li>
                  </ul>
                </div>
                <p className="text-sm text-charcoal-600">
                  <strong>Tasting fees:</strong> $15-25, often waived with bottle purchase
                </p>
              </div>

              <div className="card p-6 border-l-4 border-lake-600">
                <div className="flex items-center gap-3 mb-3">
                  <Wine className="w-5 h-5 text-lake-600" />
                  <span className="font-bold text-charcoal-900">3:30 PM</span>
                  <span className="text-charcoal-600">— Second Winery (Scenic Drive)</span>
                </div>
                <p className="text-charcoal-700 mb-3">
                  Take the scenic back roads between wineries—rolling vineyards, oak-studded hills, and 
                  glimpses of the Sierra Nevada create a picturesque drive. Stop at a second tasting room 
                  with different varietals or winemaking style.
                </p>
                <p className="text-charcoal-700">
                  Many foothill wineries are family-owned, fourth-generation operations. You'll often 
                  meet the winemaker pouring your tasting.
                </p>
              </div>

              <div className="card p-6 border-l-4 border-lake-600">
                <div className="flex items-center gap-3 mb-3">
                  <Camera className="w-5 h-5 text-lake-600" />
                  <span className="font-bold text-charcoal-900">5:00 PM</span>
                  <span className="text-charcoal-600">— Optional Third Stop or Golden Hour Views</span>
                </div>
                <p className="text-charcoal-700 mb-3">
                  If you're staying overnight, add a third winery or find a scenic overlook to watch sunset 
                  paint the foothills gold. Day-trippers should start heading back—you want someone sober driving.
                </p>
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                  <p className="text-sm text-amber-800">
                    ⚠️ <strong>Drink Responsibly:</strong> Designate a driver or use wine country transport services. 
                    Many <Link href="/accommodations" className="text-lake-600 hover:text-lake-700 font-semibold">Auburn hotels</Link> offer wine 
                    tour packages.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Photo 2 */}
          <div className="mb-16">
            <AuburnImage 
              imageId="wine-foothill-vineyard"
              className="rounded-xl w-full h-[450px] object-cover shadow-lg"
            />
            <p className="text-sm text-charcoal-600 mt-3 italic text-center">
              Sierra Foothills vineyards—California wine country with Gold Rush heritage
            </p>
          </div>

          {/* Evening */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-full bg-slate-800 text-white flex flex-col items-center justify-center flex-shrink-0">
                <span className="text-2xl">🌙</span>
                <span className="text-xs font-bold">EVE</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-charcoal-900">Evening: Fine Dining Finale</h2>
                <p className="text-charcoal-600">Chef's table experience in Gold Country</p>
              </div>
            </div>

            <div className="card p-6 border-l-4 border-slate-600">
              <div className="flex items-center gap-3 mb-3">
                <Utensils className="w-5 h-5 text-slate-700" />
                <span className="font-bold text-charcoal-900">7:00 PM</span>
                <span className="text-charcoal-600">— Dinner at Auburn's Best</span>
              </div>
              <p className="text-charcoal-700 mb-4">
                End the day with a special dinner at one of <Link href="/dining" className="text-lake-600 hover:text-lake-700 font-semibold">Auburn's top restaurants</Link>. 
                Many offer multi-course tasting menus or chef-driven seasonal plates paired with Sierra Foothills 
                wines you discovered earlier. This is the meal you've been working toward all day.
              </p>
              <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="font-bold text-charcoal-900 mb-2">Perfect Evening Flow</h4>
                <ul className="text-charcoal-700 text-sm space-y-1">
                  <li>🥂 Start with a glass of sparkling from the afternoon</li>
                  <li>🍽️ Let the chef guide your experience</li>
                  <li>🍷 Pair each course with foothill wines</li>
                  <li>🌃 Walk Old Town after—it's beautiful at night</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Photo 3 */}
          <div className="mb-16">
            <AuburnImage 
              imageId="dining-farm-table"
              className="rounded-xl w-full h-[450px] object-cover shadow-lg"
            />
            <p className="text-sm text-charcoal-600 mt-3 italic text-center">
              Farm-to-table dining in Auburn—seasonal California cuisine with foothill wines
            </p>
          </div>

          {/* Plan Your Visit CTA */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="card p-8 md:p-12 bg-gradient-to-br from-lake-500 to-lake-600 text-white">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Plan Your Visit</h2>
                <p className="text-xl text-white/90 max-w-2xl mx-auto">
                  Turn history and wine day into an unforgettable Auburn getaway.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Link href="/accommodations" className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-colors group">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors">Boutique Hotels</h3>
                  <p className="text-white/90 text-sm mb-3">Historic inns and charming stays</p>
                  <span className="inline-flex items-center text-sm font-semibold">
                    Find Lodging <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                <Link href="/dining" className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-colors group">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors">Wine & Dine</h3>
                  <p className="text-white/90 text-sm mb-3">Restaurants and tasting rooms</p>
                  <span className="inline-flex items-center text-sm font-semibold">
                    View Restaurants <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                <Link href="/events" className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-colors group">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors">Wine Events</h3>
                  <p className="text-white/90 text-sm mb-3">Harvest festivals and tastings</p>
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

          {/* Tips */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-charcoal-900 mb-6">Planning Tips</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card p-6">
                <h3 className="font-bold text-charcoal-900 mb-3">💰 Budget Estimate</h3>
                <ul className="text-charcoal-700 text-sm space-y-1">
                  <li><strong>Museum:</strong> $5 per person</li>
                  <li><strong>Lunch:</strong> $30-50 per person</li>
                  <li><strong>Wine tastings:</strong> $15-25 × 2-3 = $30-75</li>
                  <li><strong>Dinner:</strong> $60-100 per person</li>
                  <li><strong>Total:</strong> $125-230 per person</li>
                </ul>
              </div>
              <div className="card p-6">
                <h3 className="font-bold text-charcoal-900 mb-3">🚗 Getting Around</h3>
                <p className="text-charcoal-700 text-sm">
                  Old Town is walkable. Wineries require driving (15-30 min). Consider a designated driver 
                  or wine tour service if visiting multiple tastings.
                  <br /><br />
                  <Link href="/plan/getting-here" className="text-lake-600 hover:text-lake-700 font-semibold">Directions to Auburn →</Link>
                </p>
              </div>
              <div className="card p-6">
                <h3 className="font-bold text-charcoal-900 mb-3">📅 Best Times</h3>
                <p className="text-charcoal-700 text-sm">
                  <strong>Fall (harvest season):</strong> Wine releases, crush events<br />
                  <strong>Spring:</strong> Wildflowers, mild temperatures<br />
                  <strong>Weekdays:</strong> Less crowded tasting rooms<br />
                  <strong>Wine club pickups:</strong> Often include special access
                </p>
              </div>
              <div className="card p-6">
                <h3 className="font-bold text-charcoal-900 mb-3">🍷 Wine Transport</h3>
                <p className="text-charcoal-700 text-sm">
                  Most wineries ship, but you can bring wine home if stored properly. Summer tip: keep 
                  bottles in a cooler—foothill heat can damage wine. Consider shipping larger purchases.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RelatedPages currentPath="/itineraries/history-and-wine" />
    </div>
  )
}

