import { buildMetadata, SITE_URL } from '@/lib/seo'
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs'
import { RelatedPages } from '@/components/ui/RelatedPages'
import { AuburnHeroImage, AuburnImage } from '@/components/ui/AuburnImage'
import { generateBreadcrumbs } from '@/lib/routes'
import Link from 'next/link'
import { Palette, Music, Camera, Theater } from 'lucide-react'
import type { Metadata } from 'next'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Arts & Culture in Auburn, California - Galleries, Theater & Music',
    description: 'Discover Auburn\'s vibrant arts scene in California Gold Country. Local galleries, live music venues, community theater, monthly art walks, and cultural events throughout the year.',
    canonical: `${SITE_URL}/things-to-do/arts-culture`,
  })
}

const artsCategories = [
  {
    icon: Palette,
    title: 'Art Galleries',
    description: 'Local artists, Gold Country landscapes, rotating exhibitions',
    venues: '6+ galleries in Old Town'
  },
  {
    icon: Theater,
    title: 'Live Theater',
    description: 'Community productions, outdoor performances, summer concerts',
    venues: 'State Theatre & outdoor stages'
  },
  {
    icon: Music,
    title: 'Live Music',
    description: 'Local bands, acoustic sessions, festival performances',
    venues: 'Restaurants, breweries, parks'
  },
  {
    icon: Camera,
    title: 'Cultural Events',
    description: 'Art walks, film screenings, workshops, artist talks',
    venues: 'Monthly throughout Auburn'
  }
]

export default async function ArtsCulturePage() {
  const breadcrumbs = generateBreadcrumbs('/things-to-do/arts-culture')

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-[500px] md:h-[600px]">
        <AuburnHeroImage imageId="event-art-walk">
          <div className="container mx-auto px-4 text-center">
            <span className="inline-block px-4 py-2 bg-lake-500/90 text-white text-sm font-semibold rounded-full mb-4">
              Auburn Creative Scene
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Arts & Culture in Auburn
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Small-town creativity meets Gold Country heritage—galleries, music, theater, and monthly art walks
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

          {/* Intro Content */}
          <div className="max-w-4xl mx-auto mb-16">
            <p className="text-xl text-charcoal-700 leading-relaxed mb-6">
              <strong>Auburn, California</strong> arts scene thrives in the same historic buildings that housed Gold Rush 
              businesses 175 years ago. Old Town galleries occupy 1850s storefronts, live music echoes from brick-walled 
              restaurants, and the 1940s State Theatre hosts films and performances where miners once gathered. Auburn's 
              creative community embraces its small-town character—this isn't flashy gallery openings or exclusive events. 
              It's accessible art: First Saturday art walks where you meet the artists, free summer concerts in the park, 
              community theater in historic venues, and galleries welcoming browsers as warmly as buyers.
            </p>

            <h2 className="text-3xl font-bold text-charcoal-900 mt-12 mb-6">
              Auburn's Creative Community
            </h2>
            <p className="text-charcoal-700 mb-6">
              What makes Auburn's arts scene special is its integration with daily life. Murals depicting Gold Rush scenes 
              cover building walls. Sculptures dot downtown sidewalks. Musicians play while you sip coffee or browse 
              antiques. The monthly First Saturday Art Walk transforms Old Town into an open-air gallery where artists 
              display work on sidewalks, galleries stay open late, and wine tasting accompanies painting viewing. This 
              blend of history, small-town community, and creative energy creates an arts scene unlike Sacramento's urban 
              sophistication or Tahoe's tourist galleries—Auburn's is authentically local and refreshingly unpretentious.
            </p>

            {/* Category Overview */}
            <div className="grid md:grid-cols-2 gap-6 my-12">
              {artsCategories.map((category) => {
                const Icon = category.icon
                return (
                  <div key={category.title} className="card p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-purple-700" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-charcoal-900">{category.title}</h3>
                        <p className="text-sm text-purple-700 font-semibold">{category.venues}</p>
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
              imageId="downtown-lincoln-way"
              className="rounded-lg w-full h-[500px] object-cover shadow-lg"
            />
            <p className="text-sm text-charcoal-600 mt-3 italic text-center">
              Old Town Auburn's historic district hosts galleries, live music, and monthly art walks along Lincoln Way
            </p>
          </div>

          {/* Galleries Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-6">
              Auburn Art Galleries & Studios
            </h2>
            <p className="text-charcoal-700 mb-8">
              Auburn's galleries concentrate in Old Town, making gallery hopping walkable. Most focus on Gold Country 
              landscapes, Sierra Nevada photography, and local history-inspired work—art that reflects Auburn's setting.
            </p>

            <div className="space-y-6">
              <div className="border-l-4 border-purple-600 pl-6 py-2">
                <h4 className="font-bold text-lg text-charcoal-900 mb-2">Old Town Auburn Galleries</h4>
                <p className="text-charcoal-700 mb-3">
                  Multiple galleries along Lincoln Way and surrounding streets showcase local and regional artists. Expect 
                  paintings of American River canyons, photographs of Foresthill Bridge, ceramics inspired by Gold Rush 
                  history, and jewelry featuring Sierra crystals. Many artists live in Auburn or Placer County, giving work 
                  an authentic connection to place.
                </p>
                <p className="text-sm text-charcoal-600">
                  <strong>Best Time:</strong> First Saturday 5-9pm when galleries coordinate openings and wine tastings
                </p>
              </div>

              <div className="border-l-4 border-blue-600 pl-6 py-2">
                <h4 className="font-bold text-lg text-charcoal-900 mb-2">Artist Studios & Co-ops</h4>
                <p className="text-charcoal-700 mb-3">
                  Some Auburn artists open private studios by appointment or during special events. The advantage? Meeting 
                  artists in their working spaces, seeing works in progress, and understanding the creative process. Studio 
                  tours happen during Auburn's art walks and occasionally on weekends—check local event calendars.
                </p>
              </div>

              <div className="border-l-4 border-green-600 pl-6 py-2">
                <h4 className="font-bold text-lg text-charcoal-900 mb-2">Public Art & Murals</h4>
                <p className="text-charcoal-700">
                  Auburn's downtown features multiple large murals depicting Gold Rush scenes, historic Auburn buildings, 
                  and Sierra Nevada landscapes. Free to view year-round, these murals transform building walls into 
                  street-level art. Grab a coffee and take a self-guided mural walking tour through Old Town.
                </p>
              </div>
            </div>
          </div>

          {/* Live Music & Theater */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-6">
              Live Music & Performing Arts
            </h2>
            <p className="text-charcoal-700 mb-6">
              Auburn's music scene leans toward acoustic Americana, folk, blues, and classic rock—genres that fit brick-walled 
              restaurants and outdoor amphitheaters. Don't expect arena shows; expect intimate performances where musicians 
              chat between songs and you're close enough to watch guitar fingerpicking.
            </p>

            <div className="bg-purple-50 border-l-4 border-purple-600 p-6 rounded-r-lg mb-8">
              <h4 className="font-bold text-lg mb-3">Where to Find Live Music in Auburn</h4>
              <ul className="space-y-2 text-charcoal-700">
                <li><strong>Old Town Restaurants:</strong> Many feature live music Friday-Saturday evenings, especially during summer</li>
                <li><strong>Breweries:</strong> Local breweries host acoustic sets and open mic nights</li>
                <li><strong>Recreational Park:</strong> Free summer concert series with lawn seating and sunset views</li>
                <li><strong>Art Walk Nights:</strong> Street musicians perform during monthly First Saturday events</li>
              </ul>
            </div>

            <h3 className="text-2xl font-bold text-charcoal-900 mb-4">State Theatre</h3>
            <p className="text-charcoal-700 mb-6">
              Auburn's historic State Theatre (built in the 1940s) screens independent films, hosts live performances, and 
              serves as a community gathering space. The single-screen theater maintains its vintage character while showing 
              current indie releases, classic film series, and occasional live music or comedy shows. It's the kind of 
              theater where you might see the same neighbors you wave to at the farmers market—quintessential small-town 
              Auburn culture.
            </p>

            <h3 className="text-2xl font-bold text-charcoal-900 mb-4">Community Theater</h3>
            <p className="text-charcoal-700 mb-4">
              Local theater groups produce several shows annually, from classic plays to musical productions. Performances 
              happen in various Auburn venues, often utilizing historic buildings for added atmosphere. Community theater 
              here means exactly that—your server at lunch might be performing Shakespeare by evening, and audiences 
              enthusiastically support local talent.
            </p>
          </div>

          {/* Photo 2 */}
          <div className="mb-16">
            <AuburnImage 
              imageId="downtown-night"
              className="rounded-lg w-full h-[500px] object-cover shadow-lg"
            />
            <p className="text-sm text-charcoal-600 mt-3 italic text-center">
              Auburn's Old Town comes alive during evening art walks and live music events throughout the year
            </p>
          </div>

          {/* Cultural Events */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-6">
              Auburn Cultural Events & Festivals
            </h2>

            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-xl text-charcoal-900 mb-2">First Saturday Art Walk</h4>
                <p className="text-sm text-purple-700 font-semibold mb-3">Monthly | 5-9pm | Free</p>
                <p className="text-charcoal-700">
                  Auburn's signature arts event happens the first Saturday of every month. Galleries extend hours, artists 
                  display work on sidewalks, musicians perform at street corners, and wine tasting accompanies gallery 
                  browsing. It's social as much as cultural—neighbors catch up while admiring new paintings. Rain or shine, 
                  the Art Walk draws crowds to Old Town for an evening of creativity and community.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-xl text-charcoal-900 mb-2">Gold Country Fair (May)</h4>
                <p className="text-sm text-purple-700 font-semibold mb-3">Annual | Gold Country Fairgrounds</p>
                <p className="text-charcoal-700">
                  While primarily an agricultural and Gold Rush heritage fair, this event includes significant arts 
                  components: fine arts exhibitions, photography competitions, craft demonstrations, and live entertainment 
                  stages. It blends Auburn's farming roots, mining history, and creative community into one celebration.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-xl text-charcoal-900 mb-2">Summer Concert Series</h4>
                <p className="text-sm text-purple-700 font-semibold mb-3">June-August | Thursday Evenings | Free</p>
                <p className="text-charcoal-700">
                  Free concerts at Auburn's Recreational Park bring families and friends together for sunset music. Bring 
                  blankets, picnic dinners, and lawn chairs for a classic American summer tradition. Genres range from 
                  country to classic rock, always family-friendly and community-focused.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-xl text-charcoal-900 mb-2">Holiday Events</h4>
                <p className="text-sm text-purple-700 font-semibold mb-3">November-December</p>
                <p className="text-charcoal-700">
                  Auburn's holiday season includes Victorian Christmas celebrations (coordinating with Gold Rush history), 
                  holiday art markets featuring local artisans, seasonal concerts, and the lighting of Old Town's historic 
                  buildings. It's small-town charm at its peak, blending arts, history, and community traditions.
                </p>
              </div>
            </div>
          </div>

          {/* Photo 3 */}
          <div className="mb-16">
            <AuburnImage 
              imageId="nature-sunset-hills"
              className="rounded-lg w-full h-[500px] object-cover shadow-lg"
            />
            <p className="text-sm text-charcoal-600 mt-3 italic text-center">
              Gold Country sunsets inspire Auburn artists whose work captures the region's natural beauty
            </p>
          </div>

          {/* Nearby Pairings - Cream background */}
          <div className="max-w-4xl mx-auto my-16 py-12 bg-cream-50 rounded-xl px-6">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-8">
              Experience Auburn Arts & Culture
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/events" className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow group border border-charcoal-100">
                <h3 className="text-xl font-bold text-charcoal-900 mb-3 group-hover:text-lake-600 transition-colors">
                  Auburn Events Calendar →
                </h3>
                <p className="text-charcoal-600">
                  Check upcoming art walks, concerts, theater productions, and cultural festivals happening in Auburn.
                </p>
              </Link>
              <Link href="/dining" className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow group border border-charcoal-100">
                <h3 className="text-xl font-bold text-charcoal-900 mb-3 group-hover:text-lake-600 transition-colors">
                  Dine in Old Town →
                </h3>
                <p className="text-charcoal-600">
                  Many restaurants feature live music. Enjoy dinner, then stroll galleries during First Saturday Art Walk.
                </p>
              </Link>
              <Link href="/accommodations" className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow group border border-charcoal-100">
                <h3 className="text-xl font-bold text-charcoal-900 mb-3 group-hover:text-lake-600 transition-colors">
                  Stay Near the Arts →
                </h3>
                <p className="text-charcoal-600">
                  Old Town lodging puts you in the heart of Auburn's cultural district for easy evening exploring.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Blue accent band */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-lake-500 to-lake-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-display">
            Experience Auburn's Creative Scene
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Discover galleries, live music, theater, and monthly art walks in California's Gold Country.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/events"
              className="bg-white text-lake-600 font-semibold px-8 py-4 rounded-lg hover:bg-cream-50 transition-colors inline-flex items-center justify-center gap-2 shadow-lg"
            >
              View Events
            </Link>
            <Link
              href="/things-to-do"
              className="border-2 border-white/70 text-white font-semibold px-8 py-4 rounded-lg hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2"
            >
              All Things to Do
            </Link>
          </div>
        </div>
      </section>

      <RelatedPages currentPath="/things-to-do/arts-culture" />
    </div>
  )
}

