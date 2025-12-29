import { buildMetadata, SITE_URL } from '@/lib/seo'
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs'
import { RelatedPages } from '@/components/ui/RelatedPages'
import { AuburnHeroImage, AuburnImage } from '@/components/ui/AuburnImage'
import { generateBreadcrumbs } from '@/lib/routes'
import { AttractionGrid } from '@/components/attractions'
import { getHistoryCultureAttractions } from '@/data/attractions'
import Link from 'next/link'
import { Landmark, Clock, Book, Star, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Gold Rush History & Culture in Auburn, California - Museums & Historic Sites',
    description: "Explore Auburn's authentic Gold Rush heritage. Visit Gold Country Museum, Placer County Courthouse, Bernhard Museum Complex, and Old Town historic district where California's history lives.",
    canonical: `${SITE_URL}/things-to-do/history-culture`,
  })
}

const historyCategories = [
  {
    icon: Landmark,
    title: 'Museums',
    description: 'Gold Rush artifacts, mining equipment, and pioneer stories',
    count: '3 major museums'
  },
  {
    icon: Clock,
    title: 'Historic Buildings',
    description: "1850s architecture from California's Gold Country era",
    count: '20+ preserved sites'
  },
  {
    icon: Book,
    title: 'Walking Tours',
    description: 'Self-guided tours through Old Town Auburn',
    count: '2 mile historic loop'
  },
  {
    icon: Star,
    title: 'Living History',
    description: 'Gold panning demos, historical reenactments, and events',
    count: 'Year-round programs'
  }
]

export default async function HistoryCulturePage() {
  const breadcrumbs = generateBreadcrumbs('/things-to-do/history-culture')

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero */}
      <section className="relative h-[500px] md:h-[600px]">
        <AuburnHeroImage imageId="hero-old-town-clocktower">
          <div className="container mx-auto px-4 text-center">
            <span className="inline-block px-4 py-2 bg-amber-600/90 text-white text-sm font-semibold rounded-full mb-4">
              Gold Rush Heritage
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              History & Culture in Auburn
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Where the California Gold Rush began in 1848—authentic heritage preserved in museums, buildings, and stories
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
              <strong>Auburn, California</strong> exists because Claude Chana discovered gold here in May 1848, just months 
              after James Marshall's find at Sutter's Mill. Within a year, thousands of prospectors poured into what became 
              the North Fork Dry Diggings, later renamed Auburn after Chana's New York hometown. Unlike many Gold Rush towns 
              that faded into ghost settlements, Auburn thrived—first from gold, then from agriculture, and eventually as 
              Placer County's seat. The result is one of California's most authentic Gold Country downtowns, where 1850s 
              buildings still stand, museums house original mining equipment, and streets follow the same footpaths miners 
              walked 175 years ago.
            </p>

            <h2 className="text-3xl font-bold text-charcoal-900 mt-12 mb-6">
              Auburn's Gold Rush Legacy
            </h2>
            <p className="mb-4">
              Auburn's historic district—Old Town Auburn—sits exactly where miners set up their first camps in 1848. The 
              steep streets climbing from Auburn Ravine, the narrow buildings facing Lincoln Way, even the courthouse 
              position overlooking the diggings—all reflect Gold Rush planning. Unlike Sacramento or San Francisco where 
              modernization erased much history, Auburn's geography protected its past. The ravines and hills made demolition 
              difficult, so buildings stayed. Today, over 20 structures predate 1900, many in continuous use as shops, 
              restaurants, and offices.
            </p>
            <p className="mb-6">
              What makes Auburn's history special is accessibility. Walk into any Old Town shop and you're standing where 
              miners traded gold dust for supplies. Eat at a restaurant built in 1856. Touch Gold Rush-era bricks still warm 
              from California sun. This isn't a theme park recreation—it's the real Gold Country, preserved through 
              continuous community use rather than museum curation.
            </p>

            {/* Category Overview */}
            <div className="grid md:grid-cols-2 gap-6 my-12">
              {historyCategories.map((category) => {
                const Icon = category.icon
                return (
                  <div key={category.title} className="card p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-amber-700" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-charcoal-900">{category.title}</h3>
                        <p className="text-sm text-amber-700 font-semibold">{category.count}</p>
                      </div>
                    </div>
                    <p className="text-charcoal-600">{category.description}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Photo 1 */}
          <div className="mb-16">
            <AuburnImage 
              imageId="historic-courthouse"
              className="rounded-lg w-full h-[500px] object-cover shadow-lg"
            />
            <p className="text-sm text-charcoal-600 mt-3 italic text-center">
              Placer County Courthouse (1898) overlooks Old Town Auburn from its Gold Rush-era site
            </p>
          </div>

          {/* Museums Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8">
              Auburn's Gold Country Museums
            </h2>

            <div className="space-y-10">
              <div className="border-l-4 border-amber-600 pl-6">
                <h3 className="text-2xl font-bold text-charcoal-900 mb-3">
                  Gold Country Museum
                </h3>
                <p className="text-charcoal-700 mb-4">
                  <strong>Location:</strong> 1273 High Street, Auburn | <strong>Hours:</strong> Tuesday-Sunday 10am-4pm | <strong>Admission:</strong> $5 adults, kids under 5 free
                </p>
                <p className="mb-4">
                  Walk through a full-scale replica of an 1850s Auburn mine, complete with mining equipment, ore carts, and 
                  simulated underground tunnels. The museum houses Placer County's gold mining artifacts: stamping mills, 
                  sluice boxes, and the largest collection of Gold Rush-era photographs in the region. Kids love the gold 
                  panning area (yes, real gold flakes!), while adults appreciate the detailed exhibits on hydraulic mining, 
                  Chinese immigrant contributions, and how Gold Rush technology shaped California.
                </p>
                <p className="text-sm text-charcoal-600 mb-3">
                  <strong>Don't Miss:</strong> The Working Mine Shaft replica and gold-weighing scales that miners actually used
                </p>
                <p className="text-sm">
                  <Link href="https://www.placer.ca.gov/goldcountrymuseum" className="text-amber-700 hover:text-amber-800 font-semibold">
                    Visit Gold Country Museum Website →
                  </Link>
                </p>
              </div>

              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-2xl font-bold text-charcoal-900 mb-3">
                  Bernhard Museum Complex
                </h3>
                <p className="text-charcoal-700 mb-4">
                  <strong>Location:</strong> 291 Auburn-Folsom Road | <strong>Hours:</strong> Tuesday-Friday 10am-3pm, Saturday 11am-4pm | <strong>Admission:</strong> $5 adults
                </p>
                <p className="mb-4">
                  This 1851 Traveler's Rest Hotel and Winery tells Auburn's post-Gold Rush story. The Bernhard family ran 
                  the hotel for decades, serving travelers between Auburn and Folsom. Original furnishings fill the Victorian 
                  rooms—you'll see the actual kitchen, parlor, and bedrooms where gold-seekers stayed. Outside, explore the 
                  winery building, carriage house, and grape arbors. The complex hosts living history events: Victorian teas, 
                  historic cooking demonstrations, and Gold Country storytelling.
                </p>
                <p className="text-sm text-charcoal-600 mb-3">
                  <strong>Special Events:</strong> Victorian Christmas in December, Vintage Harvest in September
                </p>
                <p className="text-sm">
                  <Link href="https://www.placer.ca.gov/bernhardmuseum" className="text-blue-700 hover:text-blue-800 font-semibold">
                    Visit Bernhard Museum Website →
                  </Link>
                </p>
              </div>

              <div className="border-l-4 border-green-600 pl-6">
                <h3 className="text-2xl font-bold text-charcoal-900 mb-3">
                  Placer County Museum
                </h3>
                <p className="text-charcoal-700 mb-4">
                  <strong>Location:</strong> 101 Maple Street, Auburn (in historic Courthouse) | <strong>Hours:</strong> Wednesday-Sunday 10am-4pm | <strong>Admission:</strong> Free
                </p>
                <p className="mb-4">
                  Inside the magnificent 1898 Placer County Courthouse, this free museum covers broader regional history: 
                  Native American Nisenan culture, Spanish exploration, Gold Rush transformation, railroad construction, 
                  agriculture development, and modern Auburn. The courthouse itself is an attraction—Romanesque Revival 
                  architecture with a distinctive gold-painted dome visible across Auburn. Rotating exhibits focus on specific 
                  topics like Chinese miners, women in Gold Country, or Auburn's railroad history.
                </p>
                <p className="text-sm text-charcoal-600 mb-3">
                  <strong>Insider Tip:</strong> Visit the clock tower for panoramic views of Auburn and surrounding foothills
                </p>
              </div>
            </div>
          </div>

          {/* Photo 2 */}
          <div className="mb-16">
            <AuburnImage 
              imageId="historic-gold-country-museum"
              className="rounded-lg w-full h-[500px] object-cover shadow-lg"
            />
            <p className="text-sm text-charcoal-600 mt-3 italic text-center">
              Gold Country Museum's authentic mining equipment and exhibits bring Auburn's 1850s history to life
            </p>
          </div>

          {/* Historic Buildings Walking Tour */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-6">
              Old Town Auburn Historic Walking Tour
            </h2>
            <p className="mb-6">
              Old Town Auburn packs over two dozen historic structures into a walkable 6-block district. Start at the 
              Visitor Center (old SP Depot) for a free walking tour map, then follow these highlights:
            </p>

            <div className="space-y-6">
              <div className="bg-amber-50 p-6 rounded-lg">
                <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center text-sm">1</span>
                  Old Town Firehouse (1891)
                </h4>
                <p className="text-charcoal-700">
                  Auburn's iconic three-story tower marks the heart of Old Town. Built to spot fires threatening wooden Gold 
                  Rush buildings, it now houses a museum with vintage firefighting equipment. The firehouse still serves as a 
                  symbol of Auburn—you'll see it on postcards, murals, and city logos.
                </p>
              </div>

              <div className="bg-amber-50 p-6 rounded-lg">
                <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center text-sm">2</span>
                  Union Bar Building (1856)
                </h4>
                <p className="text-charcoal-700">
                  One of Auburn's oldest buildings, originally a saloon where miners traded gold dust for whiskey. The 
                  two-story brick structure (brick to prevent fires!) now houses shops, but look up—you'll see original 
                  1850s construction details, iron shutters, and the narrow windows designed to keep interiors cool before 
                  air conditioning.
                </p>
              </div>

              <div className="bg-amber-50 p-6 rounded-lg">
                <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center text-sm">3</span>
                  Shanghai Restaurant Building (1890s)
                </h4>
                <p className="text-charcoal-700">
                  Auburn's Chinese community established thriving businesses after being pushed out of mining claims. This 
                  building housed restaurants, lodging, and shops serving Auburn's substantial Chinese population. Today it's 
                  an antique store where you can explore two floors of Gold Rush-era artifacts while standing in an actual 
                  historical building.
                </p>
              </div>

              <div className="bg-amber-50 p-6 rounded-lg">
                <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center text-sm">4</span>
                  Auburn City Hall (1893)
                </h4>
                <p className="text-charcoal-700">
                  Victorian architecture housing Auburn's government since 1893. The building survived multiple fires, 
                  earthquakes, and modernization threats thanks to community preservation efforts. Notice the ornate 
                  woodwork, tall ceilings (for summer cooling), and how it's built into the hillside—classic Gold Rush 
                  construction adapting to Auburn's steep terrain.
                </p>
              </div>
            </div>

            <div className="mt-8 p-6 bg-blue-50 border-l-4 border-blue-600 rounded-r-lg">
              <h4 className="font-bold text-lg mb-2">Download the Full Walking Tour</h4>
              <p className="mb-3">
                The Auburn Visitor Center offers free detailed maps covering 20+ historic sites, with photos and stories 
                for each building. Pick up a map at 601 Lincoln Way or download from the Auburn Chamber of Commerce website.
              </p>
              <p className="text-sm text-charcoal-600">
                <strong>Walking Time:</strong> 45-90 minutes | <strong>Distance:</strong> 2 miles | <strong>Best Time:</strong> Morning or late afternoon to avoid midday heat
              </p>
            </div>
          </div>

          {/* Photo 3 */}
          <div className="mb-16">
            <AuburnImage 
              imageId="historic-bernhard-museum"
              className="rounded-lg w-full h-[500px] object-cover shadow-lg"
            />
            <p className="text-sm text-charcoal-600 mt-3 italic text-center">
              Bernhard Museum Complex preserves Auburn's 1851 Traveler's Rest Hotel with original Victorian furnishings
            </p>
          </div>

          {/* Living History & Events */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-6">
              Experience Living Gold Rush History
            </h2>
            <p className="mb-6">
              Auburn doesn't just preserve history—it brings it to life through demonstrations, reenactments, and 
              hands-on experiences throughout the year:
            </p>

            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-20 flex-shrink-0 text-center">
                  <div className="bg-amber-100 rounded-lg p-2">
                    <p className="text-xs font-semibold text-amber-800">Year-Round</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-charcoal-900 mb-1">Gold Panning Lessons</h4>
                  <p className="text-charcoal-700">
                    Learn authentic Gold Rush techniques at Gold Country Museum. Find real gold flakes (you keep what you 
                    find!) while rangers explain how miners worked Auburn's rivers. Perfect for kids and adults alike.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-20 flex-shrink-0 text-center">
                  <div className="bg-amber-100 rounded-lg p-2">
                    <p className="text-xs font-semibold text-amber-800">Monthly</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-charcoal-900 mb-1">Victorian Life Demonstrations</h4>
                  <p className="text-charcoal-700">
                    Bernhard Museum hosts period cooking, crafts, and storytelling. Watch how Auburn families lived in the 
                    1850s-1880s, from candle-making to Victorian-era baking in wood-fired ovens.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-20 flex-shrink-0 text-center">
                  <div className="bg-amber-100 rounded-lg p-2">
                    <p className="text-xs font-semibold text-amber-800">May</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-charcoal-900 mb-1">Gold Country Fair</h4>
                  <p className="text-charcoal-700">
                    Auburn's biggest annual event celebrates Gold Rush heritage with historic demonstrations, mining 
                    equipment displays, period costumes, and living history camps recreating 1850s Auburn life.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-20 flex-shrink-0 text-center">
                  <div className="bg-amber-100 rounded-lg p-2">
                    <p className="text-xs font-semibold text-amber-800">December</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-charcoal-900 mb-1">Victorian Christmas</h4>
                  <p className="text-charcoal-700">
                    Old Town transforms into a Gold Rush-era Christmas with carolers in period dress, historic building 
                    tours, and Bernhard Museum's spectacular Victorian decorations. Experience holidays as Auburn settlers 
                    celebrated them 150 years ago.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Attraction Cards Grid */}
          <div className="my-16 py-12 bg-white -mx-4 px-4 md:-mx-8 md:px-8">
            <div className="max-w-6xl mx-auto">
              <AttractionGrid
                attractions={getHistoryCultureAttractions()}
                title="Historic Sites & Museums"
                subtitle="Gold Rush heritage, museums, and cultural attractions in Auburn"
                showFilters={true}
                filterTypes={['museum', 'historic-site', 'cultural']}
                columns={3}
              />
            </div>
          </div>

          {/* Nearby Pairings */}
          <div className="max-w-4xl mx-auto my-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8">
              Plan Your Auburn History Experience
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/accommodations" className="card card-hover p-6 group">
                <h3 className="text-xl font-bold text-charcoal-900 mb-3 group-hover:text-amber-600 transition-colors">
                  Stay in Old Town →
                </h3>
                <p className="text-charcoal-600">
                  Auburn's historic hotels and inns place you steps from museums, walking tours, and Gold Rush architecture.
                </p>
              </Link>
              <Link href="/dining" className="card card-hover p-6 group">
                <h3 className="text-xl font-bold text-charcoal-900 mb-3 group-hover:text-amber-600 transition-colors">
                  Dine in History →
                </h3>
                <p className="text-charcoal-600">
                  Old Town restaurants occupy 1850s buildings. Enjoy farm-to-table meals where miners once traded gold dust.
                </p>
              </Link>
              <Link href="/itineraries/history-and-wine" className="card card-hover p-6 group">
                <h3 className="text-xl font-bold text-charcoal-900 mb-3 group-hover:text-amber-600 transition-colors">
                  History & Wine Itinerary →
                </h3>
                <p className="text-charcoal-600">
                  Follow our curated history and wine tour hitting museums, historic sites, and foothill wineries.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <RelatedPages currentPath="/things-to-do/history-culture" />
    </div>
  )
}

