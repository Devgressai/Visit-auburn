import { accommodations } from '@/lib/data'
import { buildMetadata, SITE_URL } from '@/lib/seo'
import { ListingGrid } from '@/components/listings/ListingGrid'
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs'
import { RelatedPages } from '@/components/ui/RelatedPages'
import { AuburnHeroImage, AuburnImage } from '@/components/ui/AuburnImage'
import { generateBreadcrumbs } from '@/lib/routes'
import type { Metadata } from 'next'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Where to Stay in Auburn, California',
    description: 'Find the perfect place to stay in Auburn, CA. Hotels, vacation rentals, bed & breakfasts, and more in California\'s Gold Country.',
    canonical: `${SITE_URL}/accommodations`,
  })
}

export default async function AccommodationsPage() {
  const breadcrumbs = generateBreadcrumbs('/accommodations')

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero Section with Auburn Image */}
      <section className="relative h-[400px] md:h-[500px]">
        <AuburnHeroImage imageId="hero-old-town-clocktower">
          <div className="container mx-auto px-4 text-center">
            <span className="inline-block px-4 py-2 bg-gold-500/90 text-white text-sm font-semibold rounded-full mb-4">
              Auburn Lodging
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Where to Stay in Auburn
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Rest easy in Auburn's finest hotels, charming inns, and unique vacation rentals in the heart of Gold Country
            </p>
          </div>
        </AuburnHeroImage>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <Breadcrumbs items={breadcrumbs} />

          {/* Main Content */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-charcoal-700 leading-relaxed mb-6">
                Finding the perfect place to stay in <strong>Auburn, California</strong> means immersing yourself in authentic Gold Country hospitality. 
                Whether you're drawn to the Victorian charm of Old Town Auburn's historic hotels, seeking a cozy cabin retreat in the Sierra 
                foothills, or prefer modern amenities near outdoor adventures, Auburn offers accommodations that make you feel like a local 
                from the moment you arrive.
              </p>

              <h2 className="text-3xl font-bold text-charcoal-900 mt-12 mb-6">
                Why Stay in Auburn, California?
              </h2>
              <p className="mb-4">
                Auburn sits at the perfect elevation (1,255 feet) where the Sacramento Valley meets the Sierra Nevada, giving you the best 
                of both worlds. You're just 35 miles from Sacramento's airport, yet surrounded by pristine wilderness. The American River 
                Canyon carves through town, offering world-class recreation literally steps from your hotel door. And unlike crowded mountain 
                towns, Auburn maintains its authentic small-town character while providing genuine Western hospitality.
              </p>
              <p className="mb-6">
                Most importantly, staying in Auburn puts you at the center of Gold Country exploration. Wake up and walk to historic Old Town 
                for breakfast at a local cafe. Spend your day hiking Hidden Falls Regional Park or exploring the Placer County Museum. Return 
                to your lodging to refresh, then stroll back downtown for dinner and live music. This is the Auburn experience—and it's only 
                possible when you stay right here in town.
              </p>
            </div>

            {/* Photo Insert 1 */}
            <div className="my-12">
              <AuburnImage 
                imageId="stay-historic-hotel"
                className="rounded-lg w-full h-[400px] object-cover shadow-lg"
              />
              <p className="text-sm text-charcoal-600 mt-3 italic text-center">
                Historic hotels in Old Town Auburn offer Victorian charm steps from restaurants and trails
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-charcoal-900 mt-12 mb-6">
                Types of Accommodations in Auburn
              </h2>

              <h3 className="text-2xl font-bold text-charcoal-800 mt-8 mb-4">
                Historic Old Town Hotels
              </h3>
              <p className="mb-4">
                Auburn's historic downtown district features beautifully preserved hotels dating back to the Gold Rush era. These properties 
                combine period architecture with modern comforts—think original hardwood floors, antique furnishings, and complimentary wine 
                tastings in elegant parlors. You'll wake up to the sound of the courthouse bells and step outside to cobblestone streets lined 
                with cafes, boutiques, and trailheads.
              </p>
              <ul className="space-y-2 mb-6">
                <li>Walk to 20+ restaurants and bars in Old Town</li>
                <li>Direct access to Western States Trail and Overlook Park</li>
                <li>On-site parking (rare in historic districts)</li>
                <li>Pet-friendly options available</li>
                <li>Local wine and craft beer in rooms</li>
              </ul>

              <h3 className="text-2xl font-bold text-charcoal-800 mt-8 mb-4">
                Modern Chain Hotels
              </h3>
              <p className="mb-4">
                For travelers who prefer familiar brands, Auburn's newer hotel corridor along Highway 49 offers reliable comfort with 
                Gold Country touches. These properties feature pools, complimentary breakfast, and easy freeway access while still keeping 
                you close to outdoor recreation. Many cater specifically to endurance athletes training on Auburn's legendary trails.
              </p>
              <ul className="space-y-2 mb-6">
                <li>Free breakfast and WiFi</li>
                <li>Swimming pools and fitness centers</li>
                <li>Quick access to I-80 and Sacramento</li>
                <li>Large parking areas for trailers and bikes</li>
                <li>Business centers for digital nomads</li>
              </ul>

              <h3 className="text-2xl font-bold text-charcoal-800 mt-8 mb-4">
                Vacation Rentals & Cabins
              </h3>
              <p className="mb-4">
                Auburn's surrounding foothills are dotted with private cabins, ranch-style homes, and vineyard cottages perfect for longer 
                stays or group getaways. These rentals offer full kitchens, outdoor spaces, and the privacy to truly unwind. Many sit on 
                acreage with wildlife viewing, stargazing, and seasonal creek access.
              </p>
              <ul className="space-y-2 mb-6">
                <li>Full kitchens stocked with local coffee</li>
                <li>Private decks with foothill or canyon views</li>
                <li>Fire pits and BBQ grills</li>
                <li>Dog-friendly properties with fenced yards</li>
                <li>Weekly rates available</li>
              </ul>
            </div>

            {/* Photo Insert 2 */}
            <div className="my-12">
              <AuburnImage 
                imageId="stay-cozy-room"
                className="rounded-lg w-full h-[400px] object-cover shadow-lg"
              />
              <p className="text-sm text-charcoal-600 mt-3 italic text-center">
                Comfortable rooms blend Gold Country character with modern amenities throughout Auburn
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-charcoal-900 mt-12 mb-6">
                Best Time to Book Auburn Accommodations
              </h2>
              <p className="mb-4">
                Auburn experiences four distinct seasons, each with its own lodging rhythm:
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-8 rounded-r-lg">
                <h4 className="font-bold text-lg mb-3">Peak Season (May-October)</h4>
                <p className="mb-0">
                  Summer brings the highest demand, especially during Western States 100 Endurance Run (late June) and Gold Rush Days 
                  (September). Book 2-3 months ahead for weekends. Midweek rates offer better value, and the weather is perfect for hiking, 
                  swimming, and evening strolls through Old Town.
                </p>
              </div>

              <div className="bg-amber-50 border-l-4 border-amber-500 p-6 my-8 rounded-r-lg">
                <h4 className="font-bold text-lg mb-3">Shoulder Season (March-April, November)</h4>
                <p className="mb-0">
                  Spring wildflowers and fall foliage make these months magical for photography and hiking. Lodging rates drop slightly, 
                  and you'll have trails mostly to yourself. Auburn's elevation means comfortable temperatures while valleys swelter or 
                  mountains freeze.
                </p>
              </div>

              <div className="bg-slate-50 border-l-4 border-slate-500 p-6 my-8 rounded-r-lg">
                <h4 className="font-bold text-lg mb-3">Winter (December-February)</h4>
                <p className="mb-0">
                  Auburn's mildest season offers the best lodging deals and uncrowded restaurants. While higher elevations get snow, 
                  Auburn itself stays mild (40-55°F). Perfect for museum visits, wine tasting, and cozy fireside evenings. Quick access 
                  to Tahoe skiing (90 minutes) without mountain lodging prices.
                </p>
              </div>

              <h2 className="text-3xl font-bold text-charcoal-900 mt-12 mb-6">
                What's Nearby Your Auburn Lodging
              </h2>
              <p className="mb-4">
                No matter where you stay in Auburn, you're never more than 10 minutes from outdoor recreation and 5 minutes from 
                great dining:
              </p>
              <ul className="space-y-2 mb-6">
                <li><strong>Old Town Auburn:</strong> 20+ restaurants, bars, galleries, and shops within 3 walkable blocks</li>
                <li><strong>Trailheads:</strong> Quarry Ponds, Lake Clementine, and Western States Trail all under 15 minutes</li>
                <li><strong>Foresthill Bridge:</strong> 10-minute drive to California's highest bridge with sunset views</li>
                <li><strong>Wine Country:</strong> Auburn's foothills wine region offers tasting rooms 5-20 minutes away</li>
                <li><strong>Placer County Museums:</strong> Three museums showcasing Gold Rush history, all free or under $10</li>
              </ul>

              <h2 className="text-3xl font-bold text-charcoal-900 mt-12 mb-6">
                Insider Tips for Staying in Auburn
            </h2>
              <ul className="space-y-3 mb-6">
                <li><strong>Park once, walk everywhere:</strong> Old Town hotels let you ditch your car for the entire stay</li>
                <li><strong>Ask about trail maps:</strong> Most lodgings provide free Auburn area trail guides and updates on conditions</li>
                <li><strong>Midweek magic:</strong> Sunday-Thursday rates can be 30-40% lower than weekends</li>
                <li><strong>Elevation advantage:</strong> Auburn stays 10-15°F cooler than Sacramento in summer—no AC bills</li>
                <li><strong>Local breakfast:</strong> Skip hotel breakfast and walk to an Auburn cafe for the real deal</li>
                <li><strong>Extend your stay:</strong> Many properties offer weekly rates 20% below nightly pricing</li>
              </ul>

              <div className="bg-green-50 border-l-4 border-green-600 p-6 my-8 rounded-r-lg">
                <h4 className="font-bold text-lg mb-3 text-green-900">Pro Tip: The Auburn Lifestyle</h4>
                <p className="mb-0 text-green-800">
                  True Auburn locals start their day with coffee on Old Town patios, spend mornings on trails, return for lunch 
                  at their lodging, then explore museums or wine taste in the afternoon. Dinner means fresh pasta or wood-fired pizza, 
                  followed by live music or stargazing. Plan to stay at least 3 nights to experience Auburn's rhythm properly.
                </p>
              </div>
            </div>
          </div>

          {/* Lodging Grid */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8 text-center">
              Browse Auburn Accommodations
            </h2>
          <ListingGrid
            items={accommodations}
            itemType="accommodations"
            showFilters={true}
          />
          </div>

          {/* Nearby Pairings Section */}
          <div className="max-w-4xl mx-auto my-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8">
              Plan Your Auburn Stay
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Link href="/dining" className="card card-hover p-6 group">
                <h3 className="text-xl font-bold text-charcoal-900 mb-3 group-hover:text-gold-600 transition-colors">
                  Where to Eat in Auburn →
                </h3>
                <p className="text-charcoal-600">
                  Discover farm-to-table restaurants, historic taverns, and Gold Country wineries all within walking 
                  distance of Auburn lodging.
                </p>
              </Link>
              <Link href="/events" className="card card-hover p-6 group">
                <h3 className="text-xl font-bold text-charcoal-900 mb-3 group-hover:text-gold-600 transition-colors">
                  Auburn Events Calendar →
                </h3>
                <p className="text-charcoal-600">
                  Time your visit around Gold Rush Days, farmers markets, concerts, and community celebrations throughout 
                  the year.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <RelatedPages currentPath="/accommodations" />
    </div>
  )
}
