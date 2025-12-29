import { buildMetadata, SITE_URL } from '@/lib/seo'
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs'
import { RelatedPages } from '@/components/ui/RelatedPages'
import { AuburnHeroImage, AuburnImage } from '@/components/ui/AuburnImage'
import { generateBreadcrumbs } from '@/lib/routes'
import Link from 'next/link'
import { Mountain, Waves, MapPin, Sunrise, Compass } from 'lucide-react'
import type { Metadata } from 'next'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Auburn Outdoor Adventure Itinerary - 3-Day Hiking & River Trip',
    description: 'Maximum Auburn outdoor experiences: Lake Clementine, Hidden Falls, mountain biking, American River swimming, and canyon exploration. Complete 3-day active itinerary.',
    canonical: `${SITE_URL}/itineraries/outdoor-adventure`,
  })
}

export default async function OutdoorAdventurePage() {
  const breadcrumbs = generateBreadcrumbs('/itineraries/outdoor-adventure')

  return (
    <div className="min-h-screen bg-cream-50">
      <section className="relative h-[500px] md:h-[600px]">
        <AuburnHeroImage imageId="hero-american-river-canyon">
          <div className="container mx-auto px-4 text-center">
            <span className="inline-block px-4 py-2 bg-green-600/90 text-white text-sm font-semibold rounded-full mb-4">
              3-Day Active Itinerary
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Outdoor Adventure in Auburn
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Three days of trails, canyons, rivers—experience Auburn's outdoor paradise
            </p>
          </div>
        </AuburnHeroImage>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={breadcrumbs} />

          <div className="max-w-4xl mx-auto mb-12">
            <div className="card p-8">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">Adventure Overview</h2>
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-sm text-charcoal-600 mb-2">DURATION</h4>
                  <p className="text-charcoal-900">3 Days / 2 Nights</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-charcoal-600 mb-2">DIFFICULTY</h4>
                  <p className="text-charcoal-900">Moderate to Challenging</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-charcoal-600 mb-2">BEST FOR</h4>
                  <p className="text-charcoal-900">Active hikers, outdoor enthusiasts</p>
                </div>
              </div>
              <p className="text-charcoal-700 mb-4">
                This itinerary maximizes Auburn's outdoor opportunities—hiking Auburn State Recreation Area's best trails, 
                swimming in American River pools, exploring Hidden Falls Regional Park, and experiencing the canyon landscapes 
                that make Auburn a premier California outdoor destination. Expect 8-12 miles of hiking daily, elevation gain, 
                and full immersion in Sierra Nevada foothills wilderness.
              </p>
              <p className="text-sm text-charcoal-600">
                <strong>Fitness Level:</strong> Comfortable hiking 8+ miles with 600-1000 ft elevation gain. Previous 
                backpacking/hiking experience recommended.
              </p>
            </div>
          </div>

          {/* Day 1: Lake Clementine */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold">1</div>
              <div>
                <h2 className="text-3xl font-bold text-charcoal-900">Day 1: Lake Clementine & River Swimming</h2>
                <p className="text-charcoal-600">10 miles • 800 ft gain • North Fork American River</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Sunrise className="w-6 h-6 text-blue-600" />
                  <h3 className="text-xl font-bold text-charcoal-900">7:00 AM - Early Start</h3>
                </div>
                <p className="text-charcoal-700 mb-3">
                  Beat crowds and heat with early trailhead arrival. Grab breakfast to-go from Auburn, eat at trailhead 
                  while planning your day. Lake Clementine parking fills by 9am summer weekends—7am guarantees a spot.
                </p>
              </div>

              <div className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Mountain className="w-6 h-6 text-blue-600" />
                  <h3 className="text-xl font-bold text-charcoal-900">7:30 AM - Lake Clementine Extended Loop</h3>
                </div>
                <p className="text-charcoal-700 mb-4">
                  Complete the full 10-mile Lake Clementine loop (not just out-and-back). This extended version crosses the 
                  dam, explores both sides of the canyon, and offers superior North Fork views. You'll gain 800 feet over 
                  switchbacks, traverse exposed ridge lines, descend to river level, and loop back via shaded canyon trail.
                </p>
                <p className="text-sm text-charcoal-600 mb-3">
                  <strong>Trail Highlights:</strong> Dam overlook, canyon vistas, multiple swimming holes, wildflowers 
                  (spring), golden oaks (fall)
                </p>
                <p className="text-sm text-charcoal-600">
                  <strong>What to Pack:</strong> 3L water, lunch, snacks, swimsuit, towel, sun protection, first aid
                </p>
              </div>

              <div className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Waves className="w-6 h-6 text-blue-600" />
                  <h3 className="text-xl font-bold text-charcoal-900">12:00 PM - River Swimming & Lunch</h3>
                </div>
                <p className="text-charcoal-700">
                  Stop at one of Lake Clementine's swimming holes for lunch and a refreshing dip. The river stays cool 
                  (60-70°F) through summer thanks to dam releases. Find shaded rocks for picnicking, deep pools for 
                  swimming, shallow areas for wading. This is Auburn outdoor living at its finest—canyon walls rising 
                  above, river flowing past, California sun warming granite.
                </p>
              </div>

              <div className="card p-6 bg-blue-50">
                <h3 className="text-xl font-bold text-charcoal-900 mb-3">Afternoon: Rest & Explore</h3>
                <p className="text-charcoal-700 mb-3">
                  Return to Auburn mid-afternoon. After 10 miles, your body needs recovery. Options:
                </p>
                <ul className="text-sm text-charcoal-700 space-y-2">
                  <li>• <strong>Hotel rest:</strong> Shower, nap, stretch—essential for tomorrow's hike</li>
                  <li>• <strong>Gentle Old Town stroll:</strong> Light walking to keep legs loose</li>
                  <li>• <strong>Brewery visit:</strong> Local craft beer and pub food perfect post-hike</li>
                  <li>• <strong>Sunset drive:</strong> Foresthill Bridge overlooks (15 min drive)</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <AuburnImage imageId="outdoor-river-swimming" className="rounded-lg w-full h-[500px] object-cover shadow-lg" />
            <p className="text-sm text-charcoal-600 mt-3 italic text-center">
              American River swimming holes provide perfect midday breaks during Auburn trail adventures
            </p>
          </div>

          {/* Day 2: Hidden Falls */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-green-600 text-white flex items-center justify-center text-2xl font-bold">2</div>
              <div>
                <h2 className="text-3xl font-bold text-charcoal-900">Day 2: Hidden Falls Backcountry</h2>
                <p className="text-charcoal-600">12 miles • 1000 ft gain • Regional park trails</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Mountain className="w-6 h-6 text-green-600" />
                  <h3 className="text-xl font-bold text-charcoal-900">8:00 AM - Hidden Falls Extended Loop</h3>
                </div>
                <p className="text-charcoal-700 mb-4">
                  Hidden Falls Regional Park offers multiple trail options. Today, tackle the full 12-mile backcountry 
                  loop combining waterfall, ridge trails, oak woodlands, and meadow crossings. This longer route takes 
                  you beyond where most visitors turn around, into quieter sections where you might hike an hour without 
                  seeing another person.
                </p>
                <p className="text-sm text-charcoal-600">
                  <strong>Trail Route:</strong> Waterfall Loop → Ridge Trail → Pond Trail → Back to Falls → Return via 
                  creek trail. Allow 5-6 hours with breaks.
                </p>
              </div>

              <div className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Compass className="w-6 h-6 text-green-600" />
                  <h3 className="text-xl font-bold text-charcoal-900">Hidden Falls Highlights</h3>
                </div>
                <ul className="text-charcoal-700 space-y-2">
                  <li><strong>• The Waterfall:</strong> Year-round cascade (peak March-May) with picnic tables</li>
                  <li><strong>• Ridge Views:</strong> Panoramic Sierra foothills and distant snow-capped peaks</li>
                  <li><strong>• Oak Woodlands:</strong> Mature valley oaks providing shade and fall color</li>
                  <li><strong>• Wildflower Meadows:</strong> Spring displays of California poppies and lupine</li>
                  <li><strong>• Wildlife:</strong> Deer, wild turkeys, hawks, occasional mountain lions (rare)</li>
                </ul>
              </div>

              <div className="card p-6">
                <h3 className="text-xl font-bold text-charcoal-900 mb-3">Afternoon: Auburn State Recreation Area</h3>
                <p className="text-charcoal-700 mb-3">
                  If energy remains (and legs cooperate), explore Auburn SRA's additional trails. Short options near 
                  Foresthill Bridge: Cliffs Trail (2 miles), Cardiac Canyon overlook (1 mile), or simply drive the scenic 
                  loop for canyon photography without hiking.
                </p>
                <p className="text-sm text-charcoal-600">
                  <strong>Real Talk:</strong> After 22 miles in two days, rest is legitimate. Tomorrow's adventure requires 
                  recovered legs.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <AuburnImage imageId="outdoor-hidden-falls" className="rounded-lg w-full h-[500px] object-cover shadow-lg" />
            <p className="text-sm text-charcoal-600 mt-3 italic text-center">
              Hidden Falls cascades year-round along Auburn's extensive regional park trail system
            </p>
          </div>

          {/* Day 3 */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-amber-600 text-white flex items-center justify-center text-2xl font-bold">3</div>
              <div>
                <h2 className="text-3xl font-bold text-charcoal-900">Day 3: Quarry Ponds & Recovery</h2>
                <p className="text-charcoal-600">6 miles easy • Relaxed finale</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Mountain className="w-6 h-6 text-amber-600" />
                  <h3 className="text-xl font-bold text-charcoal-900">9:00 AM - Quarry Ponds Loop</h3>
                </div>
                <p className="text-charcoal-700 mb-3">
                  End your Auburn adventure with the gentle 6-mile Quarry Ponds loop—a reward for yesterday's efforts. This 
                  mostly-flat trail circles spring-fed ponds perfect for bird watching and photography. Bring binoculars: 
                  80+ bird species documented including herons, eagles, and migratory waterfowl.
                </p>
                <p className="text-sm text-charcoal-600">
                  <strong>Why This Trail Last:</strong> Minimal elevation, shaded sections, benches for resting, accessible 
                  yet beautiful—perfect recovery hike before driving home.
                </p>
              </div>

              <div className="card p-6 bg-green-50">
                <h3 className="text-xl font-bold text-charcoal-900 mb-3">Before You Leave Auburn</h3>
                <p className="text-charcoal-700 mb-3">
                  Celebrate three days of Auburn adventures with:
                </p>
                <ul className="text-sm text-charcoal-700 space-y-2">
                  <li>• <strong>Brunch in Old Town:</strong> You've earned a big meal</li>
                  <li>• <strong>Trail snacks restocking:</strong> Auburn sporting goods stores for your next trip</li>
                  <li>• <strong>Photo review:</strong> Relive 28+ miles of Gold Country trails</li>
                  <li>• <strong>Plan your return:</strong> You've only scratched Auburn's trail system surface</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Practical Info */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8">Outdoor Adventure Essentials</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card p-6">
                <h3 className="text-xl font-bold text-charcoal-900 mb-4">Best Season</h3>
                <p className="text-charcoal-700 mb-3">
                  <strong>Spring (March-May):</strong> Perfect temps (60-75°F), waterfalls peak, wildflowers bloom<br />
                  <strong>Fall (Sept-Nov):</strong> Ideal hiking weather (65-80°F), golden oaks, fewer crowds<br />
                  <strong>Summer:</strong> Hot (85-95°F) but manageable with early starts and river swimming
                </p>
              </div>

              <div className="card p-6">
                <h3 className="text-xl font-bold text-charcoal-900 mb-4">Gear Checklist</h3>
                <ul className="text-sm text-charcoal-700 space-y-1">
                  <li>✓ Hiking boots (broken in!)</li>
                  <li>✓ Daypack (25-30L)</li>
                  <li>✓ 3L water capacity</li>
                  <li>✓ Trail snacks & lunches</li>
                  <li>✓ Sun protection (hat, sunscreen, sunglasses)</li>
                  <li>✓ First aid kit</li>
                  <li>✓ Swimsuit & towel</li>
                  <li>✓ Trekking poles (optional but helpful)</li>
                  <li>✓ Camera/phone + portable charger</li>
                  <li>✓ Layers (temps vary 20-30°F dawn to afternoon)</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="card p-8 bg-gradient-to-br from-green-50 to-blue-50">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-6 text-center">More Auburn Itineraries</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Link href="/itineraries/weekend-getaway" className="text-center group">
                  <h3 className="font-bold text-charcoal-900 mb-2 group-hover:text-green-600 transition-colors">
                    Weekend Getaway →
                  </h3>
                  <p className="text-sm text-charcoal-600">Balanced intro to Auburn with easier hiking</p>
                </Link>
                <Link href="/itineraries/gold-rush-history" className="text-center group">
                  <h3 className="font-bold text-charcoal-900 mb-2 group-hover:text-green-600 transition-colors">
                    Gold Rush History →
                  </h3>
                  <p className="text-sm text-charcoal-600">Museums and historic sites (rest those legs!)</p>
                </Link>
                <Link href="/itineraries/family-fun" className="text-center group">
                  <h3 className="font-bold text-charcoal-900 mb-2 group-hover:text-green-600 transition-colors">
                    Family Fun →
                  </h3>
                  <p className="text-sm text-charcoal-600">Kid-friendly trails and activities</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RelatedPages currentPath="/itineraries/outdoor-adventure" />
    </div>
  )
}

