import { buildMetadata, SITE_URL } from '@/lib/seo'
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs'
import { RelatedPages } from '@/components/ui/RelatedPages'
import { AuburnHeroImage, AuburnImage } from '@/components/ui/AuburnImage'
import { generateBreadcrumbs } from '@/lib/routes'
import Link from 'next/link'
import { Users, MapPin, Clock, Star, ArrowRight, Utensils, Smile, Camera, Heart } from 'lucide-react'
import type { Metadata } from 'next'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Family Day in Auburn - Kid-Friendly Gold Country Adventure',
    description: 'One perfect day with kids in Auburn, CA: easy trails, gold panning, swimming, ice cream, and making family memories. Complete family itinerary with ages, timing, and parent tips.',
    canonical: `${SITE_URL}/itineraries/family-day`,
  })
}

export default function FamilyDayPage() {
  const breadcrumbs = generateBreadcrumbs('/itineraries/family-day')

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero */}
      <section className="relative h-[500px] md:h-[600px]">
        <AuburnHeroImage imageId="outdoor-quarry-ponds">
          <div className="container mx-auto px-4 text-center">
            <span className="inline-block px-4 py-2 bg-purple-600/90 text-white text-sm font-semibold rounded-full mb-4">
              Family Adventure
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Family Day in Auburn
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              One amazing day with kids—easy trails, gold panning, swimming, and memories that last forever
            </p>
          </div>
        </AuburnHeroImage>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={breadcrumbs} />

          {/* Intro */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="card p-8 bg-gradient-to-br from-purple-50 to-cream-100">
              <div className="grid md:grid-cols-4 gap-6 mb-6">
                <div className="text-center">
                  <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm text-charcoal-600">Duration</p>
                  <p className="font-bold text-charcoal-900">1 Day (8-10 hrs)</p>
                </div>
                <div className="text-center">
                  <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm text-charcoal-600">Best Ages</p>
                  <p className="font-bold text-charcoal-900">4-14 years</p>
                </div>
                <div className="text-center">
                  <Star className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm text-charcoal-600">Activity Level</p>
                  <p className="font-bold text-charcoal-900">Easy</p>
                </div>
                <div className="text-center">
                  <Heart className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm text-charcoal-600">Kid Appeal</p>
                  <p className="font-bold text-charcoal-900">⭐⭐⭐⭐⭐</p>
                </div>
              </div>
              <p className="text-charcoal-700 text-lg leading-relaxed">
                <strong>Auburn, California</strong> might be the best day-trip for families within two hours of 
                Sacramento or the Bay Area. Easy trails kids can actually finish, gold panning where they find 
                real gold, swimming holes with shallow entry points, ice cream shops that welcome sticky fingers—
                this is a day your kids will talk about for months. And parents? You'll actually relax. This 
                itinerary is tested on real kids who rated it "awesome."
              </p>
            </div>
          </div>

          {/* Morning */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-full bg-yellow-500 text-white flex flex-col items-center justify-center flex-shrink-0">
                <span className="text-2xl">☀️</span>
                <span className="text-xs font-bold">AM</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-charcoal-900">Morning: Trail & Discovery</h2>
                <p className="text-charcoal-600">Easy hiking + Gold Country Museum before it gets hot</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="card p-6 border-l-4 border-yellow-400">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-5 h-5 text-yellow-600" />
                  <span className="font-bold text-charcoal-900">9:00 AM</span>
                  <span className="text-charcoal-600">— Quarry Ponds Trail</span>
                </div>
                <p className="text-charcoal-700 mb-3">
                  Start with <Link href="/things-to-do/outdoor-adventures" className="text-purple-600 hover:text-purple-700 font-semibold">Auburn's most kid-friendly trail</Link>—the 
                  3-mile Quarry Ponds loop. It's nearly flat, has benches for rest stops, and circles pretty 
                  ponds where kids can spot ducks, turtles, and fish. Bring binoculars for extra engagement.
                </p>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-charcoal-700">
                    <strong>🎯 Kid Hack:</strong> Frame it as a "nature scavenger hunt." Make a list: spot a duck, 
                    find a cool rock, see a dragonfly. Kids hike longer when they have missions.
                  </p>
                </div>
              </div>

              <div className="card p-6 border-l-4 border-yellow-400">
                <div className="flex items-center gap-3 mb-3">
                  <Smile className="w-5 h-5 text-yellow-600" />
                  <span className="font-bold text-charcoal-900">10:30 AM</span>
                  <span className="text-charcoal-600">— Gold Country Museum</span>
                </div>
                <p className="text-charcoal-700 mb-4">
                  The <Link href="/things-to-do/history-culture" className="text-purple-600 hover:text-purple-700 font-semibold">Gold Country Museum</Link> is 
                  kid-paradise. Why they'll love it:
                </p>
                <ul className="text-charcoal-700 space-y-2 mb-4">
                  <li>✨ <strong>Gold Panning:</strong> Real gold flakes—and they keep what they find!</li>
                  <li>⛏️ <strong>Mine Replica:</strong> Walk-through underground mine (exciting, not scary)</li>
                  <li>🔍 <strong>Hands-On Exhibits:</strong> Touch mining equipment, see how it worked</li>
                  <li>📜 <strong>Scavenger Hunts:</strong> Ask front desk for kid activity sheets</li>
                </ul>
                <p className="text-sm text-charcoal-600">
                  <strong>Admission:</strong> $5 adults, kids under 5 free • <strong>Duration:</strong> 90 min (gold panning takes time!)
                </p>
              </div>

              <div className="card p-6 border-l-4 border-yellow-400">
                <div className="flex items-center gap-3 mb-3">
                  <Utensils className="w-5 h-5 text-yellow-600" />
                  <span className="font-bold text-charcoal-900">12:00 PM</span>
                  <span className="text-charcoal-600">— Family Lunch in Old Town</span>
                </div>
                <p className="text-charcoal-700 mb-3">
                  <Link href="/dining" className="text-purple-600 hover:text-purple-700 font-semibold">Auburn restaurants</Link> welcome 
                  families enthusiastically. Look for outdoor patios (kids can move around), kids menus, and 
                  casual vibes. Pizza, burgers, tacos—whatever your crew likes.
                </p>
                <p className="text-sm text-charcoal-600">
                  <strong>Parent Tip:</strong> Auburn's Old Town is walkable between restaurants—let kids help choose 
                  based on what looks good.
                </p>
              </div>
            </div>
          </div>

          {/* Photo 1 */}
          <div className="mb-16">
            <AuburnImage 
              imageId="historic-gold-country-museum"
              className="rounded-xl w-full h-[450px] object-cover shadow-lg"
            />
            <p className="text-sm text-charcoal-600 mt-3 italic text-center">
              Gold Country Museum's gold panning—kids keep the real gold flakes they find!
            </p>
          </div>

          {/* Afternoon */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-full bg-blue-500 text-white flex flex-col items-center justify-center flex-shrink-0">
                <span className="text-2xl">🏊</span>
                <span className="text-xs font-bold">PM</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-charcoal-900">Afternoon: Water & Play</h2>
                <p className="text-charcoal-600">Swimming, parks, and cooling off</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="card p-6 border-l-4 border-blue-400">
                <div className="flex items-center gap-3 mb-3">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <span className="font-bold text-charcoal-900">1:30 PM</span>
                  <span className="text-charcoal-600">— River Swimming (Summer) or Park Play</span>
                </div>
                <p className="text-charcoal-700 mb-4">
                  <strong>Summer Option:</strong> Head to a family-friendly <Link href="/things-to-do/outdoor-adventures" className="text-blue-600 hover:text-blue-700 font-semibold">American River swimming spot</Link>. 
                  Look for areas with:
                </p>
                <ul className="text-charcoal-700 space-y-1 mb-4">
                  <li>• Shallow entry points for wading</li>
                  <li>• Sandy beaches for castle-building</li>
                  <li>• Calm pools away from current</li>
                  <li>• Shaded spots for parents</li>
                </ul>
                <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                  <p className="text-sm text-red-700">
                    ⚠️ <strong>Safety First:</strong> Always supervise children near water. Life jackets recommended 
                    for non-swimmers. Check river flow before swimming.
                  </p>
                </div>
              </div>

              <div className="card p-6 border-l-4 border-blue-400">
                <div className="flex items-center gap-3 mb-3">
                  <Smile className="w-5 h-5 text-blue-600" />
                  <span className="font-bold text-charcoal-900">Non-Summer Alternative</span>
                  <span className="text-charcoal-600">— Auburn Parks</span>
                </div>
                <p className="text-charcoal-700 mb-3">
                  If swimming's not happening, Auburn has excellent playgrounds:
                </p>
                <ul className="text-charcoal-700 space-y-2">
                  <li>🎢 <strong>Auburn Recreational Park:</strong> Large play structures, open grass, picnic areas</li>
                  <li>🛹 <strong>Ashford Park:</strong> Skate park, basketball, modern playground</li>
                  <li>⚾ <strong>Richardson Park:</strong> Baseball fields, shaded playground</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Photo 2 */}
          <div className="mb-16">
            <AuburnImage 
              imageId="outdoor-river-swimming"
              className="rounded-xl w-full h-[450px] object-cover shadow-lg"
            />
            <p className="text-sm text-charcoal-600 mt-3 italic text-center">
              Summer swimming in the American River—the ultimate reward for Auburn family days
            </p>
          </div>

          {/* Evening */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-full bg-pink-500 text-white flex flex-col items-center justify-center flex-shrink-0">
                <span className="text-2xl">🍦</span>
                <span className="text-xs font-bold">EVE</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-charcoal-900">Late Afternoon: Sweet Finish</h2>
                <p className="text-charcoal-600">Ice cream, Old Town, and happy tired kids</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="card p-6 border-l-4 border-pink-400">
                <div className="flex items-center gap-3 mb-3">
                  <Camera className="w-5 h-5 text-pink-600" />
                  <span className="font-bold text-charcoal-900">4:00 PM</span>
                  <span className="text-charcoal-600">— Ice Cream & Old Town Stroll</span>
                </div>
                <p className="text-charcoal-700 mb-3">
                  End the day with ice cream in <Link href="/things-to-do/history-culture" className="text-pink-600 hover:text-pink-700 font-semibold">Old Town Auburn</Link>. 
                  While kids enjoy their cones, point out the historic Firehouse Tower, let them peek in antique 
                  shop windows, and take family photos in front of Gold Rush-era buildings.
                </p>
                <p className="text-charcoal-700">
                  This low-key finale gives everyone a second wind for the drive home while creating those 
                  "remember when we got ice cream in that cool old town?" memories.
                </p>
              </div>

              <div className="card p-6 border-l-4 border-pink-400">
                <div className="flex items-center gap-3 mb-3">
                  <Heart className="w-5 h-5 text-pink-600" />
                  <span className="font-bold text-charcoal-900">5:00 PM</span>
                  <span className="text-charcoal-600">— Head Home (Happy & Tired)</span>
                </div>
                <p className="text-charcoal-700">
                  Kids zonking out in the car by mile 10? That's the sign of a perfect Auburn family day. 
                  You hiked, learned history, found real gold, swam in a river, ate ice cream—parenting win.
                </p>
              </div>
            </div>
          </div>

          {/* Photo 3 */}
          <div className="mb-16">
            <AuburnImage 
              imageId="historic-old-town-clocktower"
              className="rounded-xl w-full h-[450px] object-cover shadow-lg"
            />
            <p className="text-sm text-charcoal-600 mt-3 italic text-center">
              Old Town Auburn's Firehouse Tower—the perfect backdrop for family photos
            </p>
          </div>

          {/* Plan Your Visit CTA */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="card p-8 md:p-12 bg-gradient-to-br from-purple-600 to-purple-700 text-white">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Plan Your Family Adventure</h2>
                <p className="text-xl text-purple-100 max-w-2xl mx-auto">
                  Make it a weekend! Extend your Auburn day trip into a family getaway.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Link href="/accommodations" className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-colors group">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-purple-200 transition-colors">Family Hotels</h3>
                  <p className="text-purple-100 text-sm mb-3">Kid-friendly accommodations with pools and space</p>
                  <span className="inline-flex items-center text-sm font-semibold">
                    Find Lodging <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                <Link href="/dining" className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-colors group">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-purple-200 transition-colors">Kid-Friendly Eats</h3>
                  <p className="text-purple-100 text-sm mb-3">Restaurants that welcome families warmly</p>
                  <span className="inline-flex items-center text-sm font-semibold">
                    View Restaurants <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                <Link href="/events" className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-colors group">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-purple-200 transition-colors">Family Events</h3>
                  <p className="text-purple-100 text-sm mb-3">Festivals and activities happening now</p>
                  <span className="inline-flex items-center text-sm font-semibold">
                    See Calendar <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </div>

              <div className="text-center">
                <Link 
                  href="/plan/visitor-information" 
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-700 font-bold rounded-full hover:bg-purple-50 transition-colors shadow-lg"
                >
                  Get Visitor Information
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Parent Tips */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-charcoal-900 mb-6">Parent Survival Tips</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card p-6">
                <h3 className="font-bold text-charcoal-900 mb-3">🎒 Packing Checklist</h3>
                <ul className="text-charcoal-700 text-sm space-y-1">
                  <li>✓ Sunscreen (reapply frequently)</li>
                  <li>✓ Hats for everyone</li>
                  <li>✓ Lots of snacks (hangry = meltdowns)</li>
                  <li>✓ Water bottles (2+ per kid)</li>
                  <li>✓ Swimsuits & towels (summer)</li>
                  <li>✓ Life jackets (if swimming)</li>
                  <li>✓ Change of clothes</li>
                  <li>✓ Band-aids (always needed)</li>
                </ul>
              </div>
              <div className="card p-6">
                <h3 className="font-bold text-charcoal-900 mb-3">💰 Budget Estimate</h3>
                <ul className="text-charcoal-700 text-sm space-y-1">
                  <li><strong>Museum:</strong> $10-15 (family of 4)</li>
                  <li><strong>Lunch:</strong> $40-60</li>
                  <li><strong>Ice cream:</strong> $15-20</li>
                  <li><strong>Gas:</strong> ~$20 roundtrip from Sac</li>
                  <li><strong>Total:</strong> $85-115 for the day</li>
                </ul>
                <p className="text-sm text-charcoal-600 mt-3">
                  Trails and swimming are free! <Link href="/plan/maps-guides" className="text-purple-600 hover:text-purple-700 font-semibold">Download free trail maps →</Link>
                </p>
              </div>
              <div className="card p-6">
                <h3 className="font-bold text-charcoal-900 mb-3">🌡️ Best Time to Visit</h3>
                <p className="text-charcoal-700 text-sm">
                  <strong>Spring:</strong> Perfect temps, wildflowers, waterfalls flowing<br />
                  <strong>Summer:</strong> Swimming season! Start early to beat heat<br />
                  <strong>Fall:</strong> Golden colors, still warm enough for water<br />
                  <strong>Winter:</strong> Mild but skip swimming—focus on museums
                </p>
              </div>
              <div className="card p-6">
                <h3 className="font-bold text-charcoal-900 mb-3">🧠 Kid Psychology Hacks</h3>
                <ul className="text-charcoal-700 text-sm space-y-1">
                  <li>• Promise swimming as hiking motivation</li>
                  <li>• Let kids photograph the adventure</li>
                  <li>• Gold panning = instant engagement</li>
                  <li>• Ice cream solves everything</li>
                  <li>• "Are we there yet?" prevention: audio books</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RelatedPages currentPath="/itineraries/family-day" />
    </div>
  )
}

