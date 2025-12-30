import { buildMetadata, SITE_URL } from '@/lib/seo'
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs'
import { RelatedPages } from '@/components/ui/RelatedPages'
import { AuburnHeroImage, AuburnImage } from '@/components/ui/AuburnImage'
import { generateBreadcrumbs } from '@/lib/routes'
import Link from 'next/link'
import { Users, MapPin, Heart, Smile } from 'lucide-react'
import type { Metadata } from 'next'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Family Fun in Auburn - Kid-Friendly 2-3 Day California Itinerary',
    description: 'Perfect Auburn family vacation: easy trails, swimming holes, gold panning, kid-friendly museums, parks, and dining. Complete 2-3 day itinerary for families with children.',
    canonical: `${SITE_URL}/itineraries/family-fun`,
  })
}

export default async function FamilyFunPage() {
  const breadcrumbs = generateBreadcrumbs('/itineraries/family-fun')

  return (
    <div className="min-h-screen bg-white">
      <section className="relative h-[500px] md:h-[600px]">
        <AuburnHeroImage imageId="outdoor-quarry-ponds">
          <div className="container mx-auto px-4 text-center">
            <span className="inline-block px-4 py-2 bg-lake-500/90 text-white text-sm font-semibold rounded-full mb-4">
              Family-Friendly Adventure
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Family Fun in Auburn
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Kid-approved activities in Gold Country—easy trails, swimming, gold panning, and hands-on history
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

          <div className="max-w-4xl mx-auto mb-12">
            <div className="card p-8">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">Family Trip Overview</h2>
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-sm text-charcoal-600 mb-2">DURATION</h4>
                  <p className="text-charcoal-900">2-3 Days / 2 Nights</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-charcoal-600 mb-2">DIFFICULTY</h4>
                  <p className="text-charcoal-900">Easy (kid-friendly trails)</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-charcoal-600 mb-2">BEST FOR</h4>
                  <p className="text-charcoal-900">Families with ages 5-15</p>
                </div>
              </div>
              <p className="text-charcoal-700">
                This itinerary balances adventure, education, and fun for families visiting Auburn. Expect easy nature 
                trails kids can complete, hands-on museum activities (gold panning!), swimming holes with shallow areas, 
                parks with playgrounds, and restaurants welcoming families. Auburn's small-town friendliness means locals 
                genuinely enjoy seeing kids experience Gold Country—you'll feel welcome everywhere.
              </p>
            </div>
          </div>

          {/* Day 1 */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-lake-600 text-white flex items-center justify-center text-2xl font-bold">1</div>
              <div>
                <h2 className="text-3xl font-bold text-charcoal-900">Day 1: Gentle Introduction</h2>
                <p className="text-charcoal-600">Quarry Ponds Trail & Gold Country Museum</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-6 h-6 text-lake-600" />
                  <h3 className="text-xl font-bold text-charcoal-900">10:00 AM - Quarry Ponds Loop</h3>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-semibold">3 miles • Easy</span>
                </div>
                <p className="text-charcoal-700 mb-4">
                  Start with Auburn's most family-friendly trail—the 3-mile Quarry Ponds loop is nearly flat, has benches 
                  for resting, and circles pretty ponds where kids can spot ducks, turtles, and fish. Bring binoculars for 
                  bird watching (80+ species). Pack snacks—there are perfect picnic spots along the water.
                </p>
                <p className="text-sm text-charcoal-600 mb-3">
                  <strong>Kid Appeal:</strong> Wildlife spotting, easy enough for young hikers, short enough to prevent "are we done yet?"
                </p>
                <p className="text-sm text-charcoal-600">
                  <strong>Trailhead:</strong> Rock Creek Road off Highway 49 • Free parking • Bring: water, snacks, camera
                </p>
              </div>

              <div className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Smile className="w-6 h-6 text-lake-600" />
                  <h3 className="text-xl font-bold text-charcoal-900">1:00 PM - Gold Country Museum</h3>
                  <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full font-semibold">$5 adults, kids under 5 free</span>
                </div>
                <p className="text-charcoal-700 mb-4">
                  After lunch, visit Auburn's kid-favorite museum (1273 High Street). Why kids love it:
                </p>
                <ul className="text-charcoal-700 space-y-2 mb-4">
                  <li><strong>• Walk-Through Mine:</strong> Explore an actual mine replica (not scary, exciting!)</li>
                  <li><strong>• Gold Panning:</strong> Kids keep any gold they find—real flakes in the pan!</li>
                  <li><strong>• Mining Equipment:</strong> Stamping mills, ore carts, tools to examine up close</li>
                  <li><strong>• Interactive Exhibits:</strong> Touchable displays designed for hands-on learning</li>
                  <li><strong>• Scavenger Hunts:</strong> Ask front desk for kid activity sheets</li>
                </ul>
                <p className="text-sm text-charcoal-600">
                  <strong>Plan:</strong> 90 minutes minimum—kids often want to pan for gold multiple times!
                </p>
              </div>

              <div className="card p-6 bg-lake-50">
                <h3 className="text-xl font-bold text-charcoal-900 mb-3">Evening: Family-Friendly Dining</h3>
                <p className="text-charcoal-700 mb-3">
                  Auburn restaurants welcome families enthusiastically. Look for places with:
                </p>
                <ul className="text-sm text-charcoal-700 space-y-1">
                  <li>• Kids menus (most Old Town restaurants have them)</li>
                  <li>• Outdoor patios (kids can move around without disturbing others)</li>
                  <li>• Casual atmosphere (Auburn's relaxed—no stuffy dress codes)</li>
                  <li>• Quick service (hungry kids = priority seating often available)</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <AuburnImage imageId="outdoor-quarry-ponds" className="rounded-lg w-full h-[500px] object-cover shadow-lg" />
            <p className="text-sm text-charcoal-600 mt-3 italic text-center">
              Quarry Ponds Trail offers easy family hiking with duck-spotting and picnic areas perfect for kids
            </p>
          </div>

          {/* Day 2 */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-green-600 text-white flex items-center justify-center text-2xl font-bold">2</div>
              <div>
                <h2 className="text-3xl font-bold text-charcoal-900">Day 2: Water Adventure Day</h2>
                <p className="text-charcoal-600">Swimming, waterfalls, and riverside fun</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-6 h-6 text-green-600" />
                  <h3 className="text-xl font-bold text-charcoal-900">9:00 AM - Hidden Falls Easy Trail</h3>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-semibold">2 miles • Easy</span>
                </div>
                <p className="text-charcoal-700 mb-4">
                  Hike the short route to Hidden Falls—just 2 miles round-trip to reach a year-round waterfall. The trail 
                  is wide, well-maintained, and gradual. Reward at the end: beautiful cascade with picnic tables where 
                  families can eat snacks while watching the water tumble down rocks.
                </p>
                <p className="text-sm text-charcoal-600 mb-3">
                  <strong>Kid Tips:</strong> Frame it as a "waterfall treasure hunt." Let kids set the pace. Bring trail 
                  mix for energy boosts.
                </p>
                <p className="text-sm text-charcoal-600">
                  <strong>Location:</strong> 7587 Mears Place, Auburn • Free parking • Best spring for maximum flow
                </p>
              </div>

              <div className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Smile className="w-6 h-6 text-green-600" />
                  <h3 className="text-xl font-bold text-charcoal-900">1:00 PM - American River Swimming</h3>
                </div>
                <p className="text-charcoal-700 mb-4">
                  After lunch, head to one of Auburn's family-friendly swimming spots on the American River. Look for areas with:
                </p>
                <ul className="text-charcoal-700 space-y-2 mb-4">
                  <li>• <strong>Shallow entry points</strong> where kids can wade safely</li>
                  <li>• <strong>Sandy beaches</strong> for building and playing</li>
                  <li>• <strong>Calm pools</strong> away from fast current</li>
                  <li>• <strong>Shaded spots</strong> for parents to relax while supervising</li>
                </ul>
                <p className="text-sm text-red-600 font-semibold mb-3">
                  ⚠️ <strong>Safety First:</strong> Always supervise children near water. Life jackets recommended. Never 
                  swim when river flow exceeds 3,000 CFS (check California Data Exchange Center).
                </p>
                <p className="text-sm text-charcoal-600">
                  <strong>What to Bring:</strong> Life jackets, towels, water shoes (river rocks can be sharp), sunscreen, 
                  water bottles, snacks
                </p>
              </div>

              <div className="card p-6 bg-green-50">
                <h3 className="text-xl font-bold text-charcoal-900 mb-3">Optional: Auburn Parks</h3>
                <p className="text-charcoal-700 mb-3">
                  If kids need playground time (or swimming doesn't appeal), Auburn has several parks with equipment:
                </p>
                <ul className="text-sm text-charcoal-700 space-y-2">
                  <li>• <strong>Auburn Recreational Park:</strong> Large play structures, open grass, picnic areas</li>
                  <li>• <strong>Ashford Park:</strong> Skate park, basketball, playground</li>
                  <li>• <strong>Richardson Park:</strong> Baseball fields, playground, shaded areas</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <AuburnImage imageId="outdoor-hidden-falls" className="rounded-lg w-full h-[500px] object-cover shadow-lg" />
            <p className="text-sm text-charcoal-600 mt-3 italic text-center">
              Hidden Falls offers an easy 2-mile family hike rewarding kids with a beautiful year-round cascade
            </p>
          </div>

          {/* Day 3 Optional */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-lake-600 text-white flex items-center justify-center text-2xl font-bold">3</div>
              <div>
                <h2 className="text-3xl font-bold text-charcoal-900">Day 3: History & Departure (Optional)</h2>
                <p className="text-charcoal-600">Old Town exploration before heading home</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-6 h-6 text-lake-600" />
                  <h3 className="text-xl font-bold text-charcoal-900">10:00 AM - Old Town Scavenger Hunt</h3>
                </div>
                <p className="text-charcoal-700 mb-4">
                  Turn Old Town Auburn history into a game. Create a scavenger hunt for kids to find:
                </p>
                <ul className="text-charcoal-700 space-y-2 mb-4">
                  <li>✓ Firehouse Tower (tallest building in Old Town)</li>
                  <li>✓ Building with a date before 1900 (many have plaques)</li>
                  <li>✓ Gold Rush-era brick (red bricks everywhere!)</li>
                  <li>✓ Historic marker or plaque (20+ around downtown)</li>
                  <li>✓ Auburn's oldest tree (hint: near the courthouse)</li>
                  <li>✓ Building with iron shutters (fire protection from 1800s)</li>
                </ul>
                <p className="text-sm text-charcoal-600">
                  <strong>Reward:</strong> Ice cream or treat at Old Town shop after completing the hunt!
                </p>
              </div>

              <div className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Heart className="w-6 h-6 text-lake-600" />
                  <h3 className="text-xl font-bold text-charcoal-900">12:00 PM - Final Auburn Memory</h3>
                </div>
                <p className="text-charcoal-700">
                  Before leaving, let kids pick one last Auburn activity: visiting an antique shop to see "old stuff," 
                  getting a souvenir from a Gold Country shop, or grabbing lunch at their favorite restaurant from the trip. 
                  This gives them ownership and creates positive "we get to choose" memories associated with Auburn.
                </p>
              </div>
            </div>
          </div>

          {/* Practical Tips */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8">Family Travel Tips for Auburn</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card p-6">
                <h3 className="text-xl font-bold text-charcoal-900 mb-4">Best Age Range</h3>
                <p className="text-charcoal-700 mb-3">
                  This itinerary works best for families with children <strong>ages 5-15</strong>. Younger kids (3-5) can 
                  do abbreviated versions (shorter trails, skip some hiking). Teens enjoy the outdoor activities and can 
                  handle longer trail options.
                </p>
                <p className="text-sm text-charcoal-600">
                  <strong>Stroller-Friendly?</strong> Quarry Ponds Trail is mostly stroller-accessible (wide, flat). Hidden 
                  Falls and other trails require baby carriers for young ones.
                </p>
              </div>

              <div className="card p-6">
                <h3 className="text-xl font-bold text-charcoal-900 mb-4">What to Pack</h3>
                <ul className="text-sm text-charcoal-700 space-y-2">
                  <li>✓ Kids' hiking shoes (broken in!)</li>
                  <li>✓ Swimsuits, towels, water shoes</li>
                  <li>✓ Life jackets for river swimming</li>
                  <li>✓ Sunscreen (reapply frequently)</li>
                  <li>✓ Hats and sunglasses</li>
                  <li>✓ Lots of water bottles</li>
                  <li>✓ Snacks (hangry kids = unhappy hike)</li>
                  <li>✓ First aid kit (band-aids essential)</li>
                  <li>✓ Binoculars for wildlife spotting</li>
                  <li>✓ Camera for memory-making</li>
                </ul>
              </div>

              <div className="card p-6">
                <h3 className="text-xl font-bold text-charcoal-900 mb-4">Best Season for Families</h3>
                <p className="text-charcoal-700 mb-3">
                  <strong>Spring (March-May):</strong> Perfect temps (65-75°F), wildflowers, waterfalls peak<br />
                  <strong>Summer (June-August):</strong> Swimming season! Plan activities before 11am to beat heat<br />
                  <strong>Fall (Sept-Oct):</strong> Still warm enough for swimming, beautiful autumn colors<br />
                  <strong>Winter (Nov-Feb):</strong> Mild 45-55°F, fewer crowds, but river too cold for swimming
                </p>
              </div>

              <div className="card p-6">
                <h3 className="text-xl font-bold text-charcoal-900 mb-4">Budget Estimate</h3>
                <ul className="text-sm text-charcoal-700 space-y-2">
                  <li><strong>Lodging:</strong> $120-180/night (2 nights = $240-360)</li>
                  <li><strong>Dining:</strong> $60-100/day for family of 4</li>
                  <li><strong>Museum admission:</strong> $10-15 (kids under 5 free)</li>
                  <li><strong>Activities:</strong> Trails are FREE!</li>
                  <li><strong>Souvenirs/treats:</strong> $50 budget</li>
                  <li><strong>Total for family of 4:</strong> $500-700 for 2-3 days</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Pro Tips */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="card p-8 bg-cream-50">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-6">Pro Tips from Auburn Parents</h2>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-charcoal-900 mb-2">🌅 Start Early</h4>
                  <p className="text-sm text-charcoal-700">Kids have more energy mornings. Hit trails before 10am, especially 
                  summer. Early start = cooler temps, fewer crowds, happier kids.</p>
                </div>
                <div>
                  <h4 className="font-bold text-charcoal-900 mb-2">🍎 Pack Extra Snacks</h4>
                  <p className="text-sm text-charcoal-700">Hungry kids = meltdowns. Bring twice the snacks you think you need. 
                  Trail mix, granola bars, fruit—whatever your kids actually eat.</p>
                </div>
                <div>
                  <h4 className="font-bold text-charcoal-900 mb-2">🎯 Set Expectations</h4>
                  <p className="text-sm text-charcoal-700">Before hikes, tell kids the distance/time. "We're hiking to a 
                  waterfall—it takes about 30 minutes." This prevents constant "are we there yet?"</p>
                </div>
                <div>
                  <h4 className="font-bold text-charcoal-900 mb-2">📸 Let Kids Be Photographers</h4>
                  <p className="text-sm text-charcoal-700">Give kids a camera (or phone) to document the trip. They engage more 
                  when they're "official photographers" capturing Auburn memories.</p>
                </div>
                <div>
                  <h4 className="font-bold text-charcoal-900 mb-2">🏊 Swimming = Instant Win</h4>
                  <p className="text-sm text-charcoal-700">If kids are fading, promise river swimming later. This motivates 
                  trail completion like nothing else. "Let's finish this hike so we can swim!"</p>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="card p-8 bg-cream-50">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-6 text-center">More Auburn Itineraries</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Link href="/itineraries/weekend-getaway" className="text-center group">
                  <h3 className="font-bold text-charcoal-900 mb-2 group-hover:text-lake-600 transition-colors">
                    Weekend Getaway →
                  </h3>
                  <p className="text-sm text-charcoal-600">Couples or friends—more challenging hikes</p>
                </Link>
                <Link href="/itineraries/outdoor-adventure" className="text-center group">
                  <h3 className="font-bold text-charcoal-900 mb-2 group-hover:text-lake-600 transition-colors">
                    Outdoor Adventure →
                  </h3>
                  <p className="text-sm text-charcoal-600">For families with older teens who love hiking</p>
                </Link>
                <Link href="/itineraries/gold-rush-history" className="text-center group">
                  <h3 className="font-bold text-charcoal-900 mb-2 group-hover:text-lake-600 transition-colors">
                    Gold Rush History →
                  </h3>
                  <p className="text-sm text-charcoal-600">Educational focus for history-loving families</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RelatedPages currentPath="/itineraries/family-fun" />
    </div>
  )
}

