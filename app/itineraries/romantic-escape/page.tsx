import { buildMetadata, SITE_URL } from '@/lib/seo'
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs'
import { RelatedPages } from '@/components/ui/RelatedPages'
import { AuburnHeroImage, AuburnImage } from '@/components/ui/AuburnImage'
import { generateBreadcrumbs } from '@/lib/routes'
import Link from 'next/link'
import { Heart, Wine, Camera, Sunset } from 'lucide-react'
import type { Metadata } from 'next'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Romantic Escape to Auburn - 2-Day Couples Getaway in Gold Country',
    description: 'Perfect Auburn couples retreat: scenic trails, intimate dining, wine tasting, sunset canyon views, and historic inn stays. Complete 2-day romantic itinerary.',
    canonical: `${SITE_URL}/itineraries/romantic-escape`,
  })
}

export default async function RomanticEscapePage() {
  const breadcrumbs = generateBreadcrumbs('/itineraries/romantic-escape')

  return (
    <div className="min-h-screen bg-cream-50">
      <section className="relative h-[500px] md:h-[600px]">
        <AuburnHeroImage imageId="nature-sunset-hills">
          <div className="container mx-auto px-4 text-center">
            <span className="inline-block px-4 py-2 bg-rose-600/90 text-white text-sm font-semibold rounded-full mb-4">
              Couples Retreat
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Romantic Escape in Auburn
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Intimate Gold Country getaway—scenic trails, candlelit dining, and Sierra foothills sunsets
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
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">Romantic Getaway Overview</h2>
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-sm text-charcoal-600 mb-2">DURATION</h4>
                  <p className="text-charcoal-900">2 Days / 1 Night</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-charcoal-600 mb-2">DIFFICULTY</h4>
                  <p className="text-charcoal-900">Easy to Moderate</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-charcoal-600 mb-2">BEST FOR</h4>
                  <p className="text-charcoal-900">Couples, anniversaries, honeymoons</p>
                </div>
              </div>
              <p className="text-charcoal-700">
                This Auburn escape focuses on intimate experiences perfect for couples seeking romance away from city crowds. 
                Expect scenic canyon hikes with just the two of you, farm-to-table dinners in candlelit historic buildings, 
                Sierra Foothills wine tasting, sunset overlooks made for photography and hand-holding, and the quiet charm 
                of Gold Country's most authentic small town. Auburn's un-touristy nature means genuinely peaceful moments—
                no crowds competing for "romantic" spots.
              </p>
            </div>
          </div>

          {/* Day 1 */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-lake-600 text-white flex items-center justify-center text-2xl font-bold">1</div>
              <div>
                <h2 className="text-3xl font-bold text-charcoal-900">Day 1: Arrival & Old Town Romance</h2>
                <p className="text-charcoal-600">Leisurely exploration and intimate dining</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Heart className="w-6 h-6 text-lake-600" />
                  <h3 className="text-xl font-bold text-charcoal-900">2:00 PM - Check-In & Refresh</h3>
                </div>
                <p className="text-charcoal-700 mb-3">
                  Arrive Auburn mid-afternoon. Choose lodging carefully—historic Old Town inns offer Victorian charm with 
                  modern amenities, while boutique hotels provide contemporary comfort. Either way, book a room with character: 
                  exposed brick, high ceilings, views of Gold Rush architecture. Take time to settle in—no rushing on a 
                  romantic getaway.
                </p>
                <p className="text-sm text-charcoal-600">
                  <strong>Romance Tip:</strong> Some Auburn inns offer champagne or wine upon check-in. Ask when booking!
                </p>
              </div>

              <div className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Camera className="w-6 h-6 text-lake-600" />
                  <h3 className="text-xl font-bold text-charcoal-900">4:00 PM - Golden Hour Stroll</h3>
                </div>
                <p className="text-charcoal-700 mb-4">
                  Explore Old Town during golden hour when California sun bathes 1850s brick buildings in warm light. Walk 
                  hand-in-hand through quiet streets—Auburn isn't crowded like Napa or Tahoe. Stop at:
                </p>
                <ul className="text-charcoal-700 space-y-2 mb-4">
                  <li>• <strong>Art Galleries:</strong> Local artists, Gold Country landscapes, pottery, jewelry</li>
                  <li>• <strong>Antique Shops:</strong> Victorian treasures in actual historic buildings</li>
                  <li>• <strong>Firehouse Tower:</strong> Auburn's iconic clocktower, perfect photo backdrop</li>
                  <li>• <strong>Courthouse Vista:</strong> Walk up for panoramic Gold Country views</li>
                </ul>
                <p className="text-sm text-charcoal-600">
                  <strong>First Saturday?</strong> If visiting first Saturday of the month, Art Walk features galleries open 
                  late, wine tasting, live music—magical evening atmosphere.
                </p>
              </div>

              <div className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Wine className="w-6 h-6 text-lake-600" />
                  <h3 className="text-xl font-bold text-charcoal-900">6:30 PM - Intimate Dinner</h3>
                </div>
                <p className="text-charcoal-700 mb-4">
                  Reserve Auburn's most romantic restaurant—look for places offering:
                </p>
                <ul className="text-charcoal-700 space-y-2 mb-4">
                  <li>• <strong>Historic Setting:</strong> 1850s brick walls, candlelight, exposed beams</li>
                  <li>• <strong>Farm-to-Table Cuisine:</strong> Seasonal menus, local ingredients, creative preparation</li>
                  <li>• <strong>Sierra Foothills Wines:</strong> Exceptional local wineries (Placer, El Dorado counties)</li>
                  <li>• <strong>Quiet Tables:</strong> Auburn restaurants rarely packed—easy to get intimate corners</li>
                </ul>
                <p className="text-sm text-charcoal-600 mb-3">
                  <strong>Wine Pairing:</strong> Ask servers for Sierra Foothills recommendations—local wines rival Napa 
                  quality without the pretension.
                </p>
                <p className="text-sm text-charcoal-600">
                  <Link href="/dining" className="text-lake-600 hover:text-lake-700 font-semibold">
                    Browse Auburn restaurants →
                  </Link>
                </p>
              </div>

              <div className="card p-6 bg-lake-50">
                <h3 className="text-xl font-bold text-charcoal-900 mb-3">Evening: Stargazing or Nightcap</h3>
                <p className="text-charcoal-700 mb-3">
                  Auburn's dark skies (minimal light pollution) make stargazing exceptional. Options:
                </p>
                <ul className="text-sm text-charcoal-700 space-y-2">
                  <li>• <strong>Foresthill Bridge Overlook:</strong> 10-minute drive, stunning night canyon views</li>
                  <li>• <strong>Hotel Patio/Balcony:</strong> Private stargazing with wine from local shops</li>
                  <li>• <strong>Late-Night Stroll:</strong> Old Town beautifully lit at night, streets empty and romantic</li>
                  <li>• <strong>Simply Rest:</strong> Tomorrow's hike rewards early sleep tonight</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <AuburnImage imageId="downtown-night" className="rounded-lg w-full h-[500px] object-cover shadow-lg" />
            <p className="text-sm text-charcoal-600 mt-3 italic text-center">
              Old Town Auburn transforms at night with historic buildings illuminated and quiet streets perfect for couples
            </p>
          </div>

          {/* Day 2 */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-amber-600 text-white flex items-center justify-center text-2xl font-bold">2</div>
              <div>
                <h2 className="text-3xl font-bold text-charcoal-900">Day 2: Canyon Views & Departure</h2>
                <p className="text-charcoal-600">Scenic trail and memorable finale</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Sunset className="w-6 h-6 text-amber-600" />
                  <h3 className="text-xl font-bold text-charcoal-900">8:00 AM - Leisurely Breakfast</h3>
                </div>
                <p className="text-charcoal-700">
                  No need to rush—enjoy slow breakfast together. Old Town cafes offer cozy ambiance with excellent coffee, 
                  fresh pastries, and hearty options. Outdoor patios capture morning sun and Gold Country freshness.
                </p>
              </div>

              <div className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Camera className="w-6 h-6 text-amber-600" />
                  <h3 className="text-xl font-bold text-charcoal-900">10:00 AM - Lake Clementine Trail</h3>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-semibold">4-8 miles • Your choice</span>
                </div>
                <p className="text-charcoal-700 mb-4">
                  Hike Auburn's most scenic trail together. Lake Clementine offers multiple distance options:
                </p>
                <ul className="text-charcoal-700 space-y-3 mb-4">
                  <li>
                    <strong>• Shorter Option (4 miles):</strong> Hike to first overlook and return—stunning North Fork views 
                    without full commitment. Perfect for couples preferring gentler activity.
                  </li>
                  <li>
                    <strong>• Full Trail (8 miles):</strong> Complete the out-and-back to Lake Clementine. More time together 
                    in beautiful canyon setting, swimming hole stops, shared adventure.
                  </li>
                </ul>
                <p className="text-sm text-charcoal-600 mb-3">
                  <strong>Romance Factor:</strong> This isn't a crowded Yosemite-style trail. You'll likely have long stretches 
                  alone together—just you, the canyon, and the American River far below.
                </p>
                <p className="text-sm text-charcoal-600">
                  <strong>What to Bring:</strong> Water, snacks, camera, swimsuits (summer), sunscreen. Pack light picnic 
                  for trail lunch with a view.
                </p>
              </div>

              <div className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Heart className="w-6 h-6 text-amber-600" />
                  <h3 className="text-xl font-bold text-charcoal-900">2:00 PM - Farewell to Auburn</h3>
                </div>
                <p className="text-charcoal-700 mb-4">
                  Before departing, create one last Auburn memory:
                </p>
                <ul className="text-charcoal-700 space-y-2">
                  <li><strong>• Lunch at Favorite Spot:</strong> Return to yesterday's dining discovery</li>
                  <li><strong>• Local Wine Shop:</strong> Buy bottles from Sierra Foothills wineries to enjoy at home</li>
                  <li><strong>• Foresthill Bridge:</strong> Final photo at California's highest bridge (730 feet above canyon)</li>
                  <li><strong>• Book Next Visit:</strong> Auburn pulls couples back—already planning return?</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <AuburnImage imageId="hero-foresthill-bridge" className="rounded-lg w-full h-[500px] object-cover shadow-lg" />
            <p className="text-sm text-charcoal-600 mt-3 italic text-center">
              Foresthill Bridge offers breathtaking canyon views perfect for couples seeking Auburn's dramatic landscapes
            </p>
          </div>

          {/* Optional Extensions */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="card p-8 bg-amber-50">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-6">Extend Your Romantic Escape</h2>
              <p className="text-charcoal-700 mb-6">
                Adding a third day? These experiences deepen your Auburn connection:
              </p>

              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-charcoal-900 mb-2">🍷 Sierra Foothills Wine Tasting</h4>
                  <p className="text-sm text-charcoal-700">Drive 30-45 minutes to El Dorado or Placer County wineries. Small 
                  family operations, personal tastings, beautiful vineyard settings—nothing like Napa's crowds.</p>
                </div>

                <div>
                  <h4 className="font-bold text-charcoal-900 mb-2">🌊 Hidden Falls Waterfall Hike</h4>
                  <p className="text-sm text-charcoal-700">Easier 3-mile trail to year-round cascade. Less strenuous than Lake 
                  Clementine, equally beautiful. Picnic at the falls with just the sound of water.</p>
                </div>

                <div>
                  <h4 className="font-bold text-charcoal-900 mb-2">🏛️ Bernhard Museum Victorian Experience</h4>
                  <p className="text-sm text-charcoal-700">Tour 1851 hotel and winery together—imagine Gold Rush-era life while 
                  walking through actual Victorian rooms. Some weekends feature period demonstrations.</p>
                </div>

                <div>
                  <h4 className="font-bold text-charcoal-900 mb-2">🌅 Sunset Canyon Drive</h4>
                  <p className="text-sm text-charcoal-700">Drive Auburn-Foresthill Road at sunset. Multiple pullouts for canyon 
                  views, minimal traffic, golden light on Sierra foothills—bring camera and each other.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Practical Info */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8">Planning Your Romantic Auburn Escape</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card p-6">
                <h3 className="text-xl font-bold text-charcoal-900 mb-4">Best Time for Couples</h3>
                <p className="text-charcoal-700 mb-3">
                  <strong>Spring (March-May):</strong> Wildflowers, waterfall peaks, perfect 65-75°F weather, less crowded<br />
                  <strong>Fall (Sept-Nov):</strong> Golden oaks, harvest season, warm days/cool evenings, romantic ambiance<br />
                  <strong>Winter (Dec-Feb):</strong> Solitude, cozy dining, fireplace weather, Victorian Christmas (magical!)
                </p>
                <p className="text-sm text-charcoal-600">
                  <strong>Avoid:</strong> Western States 100 weekend (late June)—Auburn floods with race spectators
                </p>
              </div>

              <div className="card p-6">
                <h3 className="text-xl font-bold text-charcoal-900 mb-4">Lodging Recommendations</h3>
                <p className="text-charcoal-700 mb-3">
                  For romance, prioritize location and character over chain convenience:
                </p>
                <ul className="text-sm text-charcoal-700 space-y-2">
                  <li>• <strong>Old Town Inns:</strong> Walk to dinner, Victorian charm, historic atmosphere</li>
                  <li>• <strong>Boutique Hotels:</strong> Modern comfort, often locally-owned, personal service</li>
                  <li>• <strong>Room Features to Request:</strong> King bed, quiet location, views, jacuzzi tub (some have!)</li>
                </ul>
                <p className="text-sm text-charcoal-600 mt-3">
                  <Link href="/accommodations" className="text-lake-600 hover:text-lake-700 font-semibold">
                    Explore Auburn accommodations →
                  </Link>
                </p>
              </div>

              <div className="card p-6">
                <h3 className="text-xl font-bold text-charcoal-900 mb-4">Budget Estimate (Couple)</h3>
                <ul className="text-sm text-charcoal-700 space-y-2">
                  <li><strong>Lodging:</strong> $140-200/night (splurge on nice room!)</li>
                  <li><strong>Dining:</strong> $80-120/day (2 nice meals + breakfast)</li>
                  <li><strong>Wine/Drinks:</strong> $40-60</li>
                  <li><strong>Activities:</strong> FREE (trails cost nothing!)</li>
                  <li><strong>Total 2-Day Trip:</strong> $400-600 for couple</li>
                </ul>
                <p className="text-xs text-charcoal-600 mt-3">
                  Auburn delivers romance without Napa/Tahoe price tags. Splurge on lodging/dining, save on free outdoor beauty.
                </p>
              </div>

              <div className="card p-6">
                <h3 className="text-xl font-bold text-charcoal-900 mb-4">Romance Essentials to Pack</h3>
                <ul className="text-sm text-charcoal-700 space-y-2">
                  <li>✓ Hiking clothes + nice dinner outfits</li>
                  <li>✓ Camera for memories</li>
                  <li>✓ Comfortable walking shoes (Old Town cobblestones!)</li>
                  <li>✓ Layers (temps vary morning to afternoon)</li>
                  <li>✓ Sunscreen and hats</li>
                  <li>✓ Swimsuits (summer visits)</li>
                  <li>✓ Your favorite wine/champagne (bring from home or buy locally)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Why Auburn for Romance */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="card p-8 bg-gradient-to-br from-rose-50 to-amber-50">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-6">Why Couples Love Auburn</h2>
              <div className="space-y-4">
                <p className="text-charcoal-700">
                  <strong>Authenticity Over Tourism:</strong> Auburn hasn't been transformed into a tourist destination. 
                  It's a real Gold Country town where locals live daily lives, giving romantic visits genuine character 
                  instead of manufactured charm.
                </p>
                <p className="text-charcoal-700">
                  <strong>Solitude in Nature:</strong> Unlike Yosemite or Tahoe, Auburn's trails rarely feel crowded. You 
                  get genuine alone-together moments in stunning canyons without competing with hundreds of other visitors.
                </p>
                <p className="text-charcoal-700">
                  <strong>Intimate Dining:</strong> Restaurants serve incredible food without pretension. Servers remember 
                  guests, chefs use local ingredients, atmosphere feels personal—you're welcomed, not processed.
                </p>
                <p className="text-charcoal-700">
                  <strong>Close Yet Remote:</strong> Just 35 miles from Sacramento, Auburn feels worlds away. Easy to reach, 
                  yet delivers genuine escape. Perfect for couples wanting getaway vibes without road-trip commitment.
                </p>
                <p className="text-charcoal-700">
                  <strong>Affordable Romance:</strong> Auburn's lack of tourist inflation means romantic experiences cost 
                  significantly less than Napa, Carmel, or Tahoe while delivering equal quality and more authenticity.
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="card p-8 bg-gradient-to-br from-rose-50 to-purple-50">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-6 text-center">More Auburn Itineraries</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Link href="/itineraries/weekend-getaway" className="text-center group">
                  <h3 className="font-bold text-charcoal-900 mb-2 group-hover:text-lake-600 transition-colors">
                    Weekend Getaway →
                  </h3>
                  <p className="text-sm text-charcoal-600">Balanced intro to Auburn for first-time couples</p>
                </Link>
                <Link href="/itineraries/outdoor-adventure" className="text-center group">
                  <h3 className="font-bold text-charcoal-900 mb-2 group-hover:text-lake-600 transition-colors">
                    Outdoor Adventure →
                  </h3>
                  <p className="text-sm text-charcoal-600">For active couples who love challenging hikes</p>
                </Link>
                <Link href="/itineraries/gold-rush-history" className="text-center group">
                  <h3 className="font-bold text-charcoal-900 mb-2 group-hover:text-lake-600 transition-colors">
                    Gold Rush History →
                  </h3>
                  <p className="text-sm text-charcoal-600">Cultural focus for history-loving couples</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RelatedPages currentPath="/itineraries/romantic-escape" />
    </div>
  )
}

