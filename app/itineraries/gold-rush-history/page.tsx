import { buildMetadata, SITE_URL } from '@/lib/seo'
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs'
import { RelatedPages } from '@/components/ui/RelatedPages'
import { AuburnHeroImage, AuburnImage } from '@/components/ui/AuburnImage'
import { generateBreadcrumbs } from '@/lib/routes'
import Link from 'next/link'
import { Clock, BookOpen, Camera, Map } from 'lucide-react'
import type { Metadata } from 'next'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Gold Rush History Itinerary - 2-Day Auburn Museum & Heritage Tour',
    description: 'Explore authentic California Gold Rush history in Auburn. Visit 3 museums, walk historic Old Town, see 1850s buildings, try gold panning. Complete 2-day heritage itinerary.',
    canonical: `${SITE_URL}/itineraries/gold-rush-history`,
  })
}

export default async function GoldRushHistoryPage() {
  const breadcrumbs = generateBreadcrumbs('/itineraries/gold-rush-history')

  return (
    <div className="min-h-screen bg-cream-50">
      <section className="relative h-[500px] md:h-[600px]">
        <AuburnHeroImage imageId="historic-old-town-clocktower">
          <div className="container mx-auto px-4 text-center">
            <span className="inline-block px-4 py-2 bg-amber-600/90 text-white text-sm font-semibold rounded-full mb-4">
              2-Day History Tour
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Gold Rush History in Auburn
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Experience California's 1849 Gold Rush through museums, historic sites, and stories from Auburn's past
            </p>
          </div>
        </AuburnHeroImage>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={breadcrumbs} />

          <div className="max-w-4xl mx-auto mb-12">
            <div className="card p-8">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">History Tour Overview</h2>
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-sm text-charcoal-600 mb-2">DURATION</h4>
                  <p className="text-charcoal-900">2 Days / 1 Night</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-charcoal-600 mb-2">DIFFICULTY</h4>
                  <p className="text-charcoal-900">Easy (minimal walking)</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-charcoal-600 mb-2">BEST FOR</h4>
                  <p className="text-charcoal-900">History buffs, seniors, culture seekers</p>
                </div>
              </div>
              <p className="text-charcoal-700">
                This itinerary dives deep into Auburn's Gold Rush heritage through three major museums, historic walking 
                tours, 1850s architecture, and living history experiences. You'll walk actual streets miners traveled, see 
                original mining equipment, try gold panning, and understand how the 1848 gold discovery transformed California 
                from sleepy Mexican territory to booming American state in just a few years.
              </p>
            </div>
          </div>

          {/* Day 1 */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-amber-600 text-white flex items-center justify-center text-2xl font-bold">1</div>
              <div>
                <h2 className="text-3xl font-bold text-charcoal-900">Day 1: Museums & Gold Country</h2>
                <p className="text-charcoal-600">Three museums revealing Auburn's past</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="w-6 h-6 text-amber-600" />
                  <h3 className="text-xl font-bold text-charcoal-900">10:00 AM - Gold Country Museum</h3>
                  <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full font-semibold">$5 admission</span>
                </div>
                <p className="text-charcoal-700 mb-4">
                  Start your history journey at Auburn's premier Gold Rush museum (1273 High Street). Plan 2 hours to explore:
                </p>
                <ul className="text-charcoal-700 space-y-2 mb-4">
                  <li><strong>• Mine Shaft Replica:</strong> Walk through full-scale underground mine with period equipment</li>
                  <li><strong>• Mining Artifacts:</strong> Stamping mills, sluice boxes, tools miners actually used</li>
                  <li><strong>• Gold Panning:</strong> Try your hand—you keep any gold you find!</li>
                  <li><strong>• Photograph Collection:</strong> 1850s-1890s images showing Auburn's transformation</li>
                  <li><strong>• Docent Tours:</strong> Ask questions—volunteers share stories beyond exhibit labels</li>
                </ul>
                <p className="text-sm text-charcoal-600">
                  <strong>Tip:</strong> The museum shop sells books on Gold Rush history, perfect for deeper reading later.
                </p>
              </div>

              <div className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-amber-600" />
                  <h3 className="text-xl font-bold text-charcoal-900">12:30 PM - Lunch in Historic Building</h3>
                </div>
                <p className="text-charcoal-700">
                  Eat lunch in one of Old Town's restaurants occupying 1850s-era buildings. You're literally dining where 
                  miners once traded gold dust for supplies. Many buildings retain original brick walls, high ceilings 
                  (pre-AC cooling strategy), and narrow windows (fire prevention after devastating 1855/1859 fires).
                </p>
              </div>

              <div className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="w-6 h-6 text-amber-600" />
                  <h3 className="text-xl font-bold text-charcoal-900">2:00 PM - Placer County Museum</h3>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-semibold ml-auto">FREE</span>
                </div>
                <p className="text-charcoal-700 mb-4">
                  Inside the magnificent 1898 Placer County Courthouse (101 Maple Street), this free museum broadens the 
                  Gold Rush story:
                </p>
                <ul className="text-charcoal-700 space-y-2 mb-4">
                  <li>• <strong>Native American History:</strong> Nisenan people lived here 4,000+ years pre-Gold Rush</li>
                  <li>• <strong>Chinese Miners:</strong> Contributions often erased from mainstream history</li>
                  <li>• <strong>Women in Gold Country:</strong> Beyond stereotypes—businesswomen, teachers, activists</li>
                  <li>• <strong>Railroad Era:</strong> How transcontinental railroad changed Auburn again</li>
                  <li>• <strong>Agricultural Transition:</strong> From gold to fruit—Auburn's second boom</li>
                </ul>
                <p className="text-sm text-charcoal-600">
                  <strong>Don't Miss:</strong> Courthouse clock tower offers panoramic Auburn views (check if open for visitors)
                </p>
              </div>

              <div className="card p-6 bg-amber-50">
                <h3 className="text-xl font-bold text-charcoal-900 mb-3">Evening: Victorian Dinner</h3>
                <p className="text-charcoal-700">
                  Choose a restaurant emphasizing Gold Country heritage—ideally one in a historic building with period 
                  details preserved. Some Auburn establishments highlight their building's history on menus or walls. Ask 
                  servers about the building's past—many have fascinating stories about original uses, previous owners, or 
                  Gold Rush connections.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <AuburnImage imageId="historic-gold-country-museum" className="rounded-lg w-full h-[500px] object-cover shadow-lg" />
            <p className="text-sm text-charcoal-600 mt-3 italic text-center">
              Gold Country Museum brings Auburn's mining heritage to life with authentic equipment and hands-on exhibits
            </p>
          </div>

          {/* Day 2 */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold">2</div>
              <div>
                <h2 className="text-3xl font-bold text-charcoal-900">Day 2: Walking Tours & Living History</h2>
                <p className="text-charcoal-600">Experience Old Town's preserved Gold Rush architecture</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                  <h3 className="text-xl font-bold text-charcoal-900">10:00 AM - Bernhard Museum Complex</h3>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-semibold">$5 admission</span>
                </div>
                <p className="text-charcoal-700 mb-4">
                  This 1851 Traveler's Rest Hotel and Winery (291 Auburn-Folsom Road) shows post-Gold Rush Auburn life. 
                  The Bernhard family ran the hotel 1868-1957, creating a time capsule of Victorian-era Gold Country:
                </p>
                <ul className="text-charcoal-700 space-y-2 mb-4">
                  <li>• <strong>Original Furnishings:</strong> Actual furniture, kitchen equipment, parlor setup from the period</li>
                  <li>• <strong>Winery Building:</strong> See how Gold Rush miners' grape vines became local wine industry</li>
                  <li>• <strong>Carriage House:</strong> Transportation evolution from horses to early automobiles</li>
                  <li>• <strong>Period Gardens:</strong> Heirloom vegetables and flowers Victorians would recognize</li>
                </ul>
                <p className="text-sm text-charcoal-600">
                  <strong>Special Events:</strong> Check calendar for living history days with period cooking, crafts, storytelling
                </p>
              </div>

              <div className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Map className="w-6 h-6 text-blue-600" />
                  <h3 className="text-xl font-bold text-charcoal-900">12:30 PM - Self-Guided Walking Tour</h3>
                </div>
                <p className="text-charcoal-700 mb-4">
                  Return to Old Town for detailed historic building exploration (grab walking tour map from Visitor Center, 
                  601 Lincoln Way). Key stops:
                </p>
                <div className="space-y-4">
                  <div className="border-l-4 border-amber-600 pl-4">
                    <h4 className="font-bold text-charcoal-900">Old Town Firehouse (1891)</h4>
                    <p className="text-sm text-charcoal-700">Three-story tower built to spot fires threatening wooden buildings. 
                    Now houses firefighting museum. Auburn's iconic landmark.</p>
                  </div>
                  <div className="border-l-4 border-amber-600 pl-4">
                    <h4 className="font-bold text-charcoal-900">Union Bar Building (1856)</h4>
                    <p className="text-sm text-charcoal-700">One of Auburn's oldest structures. Originally saloon where miners 
                    traded gold for whiskey. Note brick construction—fire prevention after devastating 1850s fires.</p>
                  </div>
                  <div className="border-l-4 border-amber-600 pl-4">
                    <h4 className="font-bold text-charcoal-900">Auburn City Hall (1893)</h4>
                    <p className="text-sm text-charcoal-700">Victorian architecture built into hillside (classic Gold Rush 
                    adaptation to terrain). Still functioning government building after 130+ years.</p>
                  </div>
                  <div className="border-l-4 border-amber-600 pl-4">
                    <h4 className="font-bold text-charcoal-900">Shanghai Restaurant Building (1890s)</h4>
                    <p className="text-sm text-charcoal-700">Represents Auburn's substantial Chinese community. Now antique store 
                    where you can explore two floors while standing in actual Gold Rush-era building.</p>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Camera className="w-6 h-6 text-blue-600" />
                  <h3 className="text-xl font-bold text-charcoal-900">2:30 PM - Photography & Reflection</h3>
                </div>
                <p className="text-charcoal-700 mb-3">
                  Spend final hours capturing Old Town's beauty and reflecting on two days of history. Best photo spots:
                </p>
                <ul className="text-sm text-charcoal-700 space-y-1">
                  <li>• Firehouse Tower from Lincoln Way (classic Auburn postcard shot)</li>
                  <li>• Courthouse from downtown (gold dome against blue sky)</li>
                  <li>• Steep streets showing Gold Rush-era planning</li>
                  <li>• Historic building plaques (most have installation dates and original uses)</li>
                  <li>• Auburn ravine where first mining camps stood</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <AuburnImage imageId="historic-courthouse" className="rounded-lg w-full h-[500px] object-cover shadow-lg" />
            <p className="text-sm text-charcoal-600 mt-3 italic text-center">
              Placer County Courthouse (1898) overlooks Old Town from the same site chosen by Gold Rush-era planners
            </p>
          </div>

          {/* Additional Resources */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8">Enhance Your History Experience</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card p-6">
                <h3 className="text-xl font-bold text-charcoal-900 mb-4">Best Time for History Tour</h3>
                <p className="text-charcoal-700 mb-3">
                  <strong>Any Season Works:</strong> Museums are climate-controlled, walking tours pleasant year-round in 
                  Auburn's mild climate. Spring and fall offer most comfortable outdoor walking (65-80°F). Summer means 
                  morning tours before heat. Winter provides solitude and occasional rain adds atmosphere to historic streets.
                </p>
                <p className="text-sm text-charcoal-600">
                  <strong>Special Events:</strong> Victorian Christmas (December), Gold Country Fair (May), living history 
                  days at Bernhard Museum (check calendar)
                </p>
              </div>

              <div className="card p-6">
                <h3 className="text-xl font-bold text-charcoal-900 mb-4">Recommended Reading</h3>
                <p className="text-charcoal-700 mb-3">
                  Deepen your understanding with books available at Gold Country Museum shop:
                </p>
                <ul className="text-sm text-charcoal-700 space-y-2">
                  <li>• <em>Gold Rush Stories</em> - First-hand accounts from 1849-1855</li>
                  <li>• <em>Auburn: Historic Heart of the Gold Country</em> - Local history</li>
                  <li>• <em>Chinese in the Gold Rush</em> - Often-overlooked contributions</li>
                  <li>• <em>Women of the Gold Rush</em> - Beyond stereotypes</li>
                </ul>
              </div>

              <div className="card p-6">
                <h3 className="text-xl font-bold text-charcoal-900 mb-4">Budget & Logistics</h3>
                <ul className="text-sm text-charcoal-700 space-y-2">
                  <li><strong>Museum Admissions:</strong> $15 total (2 museums charge, 1 free)</li>
                  <li><strong>Lodging:</strong> $120-180 (Old Town locations preferred)</li>
                  <li><strong>Meals:</strong> $40-60/day per person</li>
                  <li><strong>Walking Tours:</strong> Free (get maps at Visitor Center)</li>
                  <li><strong>Total 2-Day Trip:</strong> $200-300 per person</li>
                </ul>
              </div>

              <div className="card p-6">
                <h3 className="text-xl font-bold text-charcoal-900 mb-4">Accessibility Notes</h3>
                <p className="text-charcoal-700 text-sm mb-2">
                  <strong>Wheelchair Accessible:</strong> All three museums have ramps/elevators. Placer County Museum 
                  (in courthouse) fully accessible.
                </p>
                <p className="text-charcoal-700 text-sm">
                  <strong>Walking Distance:</strong> Old Town walking tour ~2 miles over 90 minutes, but can be shortened. 
                  Benches available. Steep streets can be avoided with route modifications.
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="card p-8 bg-gradient-to-br from-amber-50 to-blue-50">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-6 text-center">More Auburn Itineraries</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Link href="/itineraries/weekend-getaway" className="text-center group">
                  <h3 className="font-bold text-charcoal-900 mb-2 group-hover:text-amber-600 transition-colors">
                    Weekend Getaway →
                  </h3>
                  <p className="text-sm text-charcoal-600">Balance history with outdoor activities and dining</p>
                </Link>
                <Link href="/itineraries/outdoor-adventure" className="text-center group">
                  <h3 className="font-bold text-charcoal-900 mb-2 group-hover:text-amber-600 transition-colors">
                    Outdoor Adventure →
                  </h3>
                  <p className="text-sm text-charcoal-600">Explore trails miners once walked during Gold Rush</p>
                </Link>
                <Link href="/itineraries/family-fun" className="text-center group">
                  <h3 className="font-bold text-charcoal-900 mb-2 group-hover:text-amber-600 transition-colors">
                    Family Fun →
                  </h3>
                  <p className="text-sm text-charcoal-600">Kid-friendly history with hands-on museum activities</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RelatedPages currentPath="/itineraries/gold-rush-history" />
    </div>
  )
}

