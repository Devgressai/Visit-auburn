import { buildMetadata, SITE_URL } from '@/lib/seo'
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs'
import { RelatedPages } from '@/components/ui/RelatedPages'
import { AuburnHeroImage, AuburnImage } from '@/components/ui/AuburnImage'
import { generateBreadcrumbs } from '@/lib/routes'
import Link from 'next/link'
import { BookOpen, Compass, Calendar, Map, BarChart3 } from 'lucide-react'
import type { Metadata } from 'next'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Discover Auburn, California - Travel Guides, Stories & Local Insights',
    description: 'Explore Auburn, CA through local stories, insider guides, and seasonal highlights. Discover hidden gems, Gold Country history, outdoor adventures, and authentic Auburn experiences.',
    canonical: `${SITE_URL}/discover`,
  })
}

const categories = [
  {
    icon: Compass,
    title: 'Outdoor Adventures',
    description: 'Trail guides, swimming holes, and Sierra Nevada exploration',
    slug: 'outdoor'
  },
  {
    icon: BookOpen,
    title: 'History & Heritage',
    description: 'Gold Rush stories, historic sites, and Auburn\'s past',
    slug: 'history'
  },
  {
    icon: Calendar,
    title: 'Seasonal Guides',
    description: 'What to do in Auburn spring, summer, fall, and winter',
    slug: 'seasonal'
  },
  {
    icon: Map,
    title: 'Local Insights',
    description: 'Insider tips, hidden gems, and Auburn favorites',
    slug: 'local'
  }
]

export default async function DiscoverPage() {
  const breadcrumbs = generateBreadcrumbs('/discover')

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-[500px] md:h-[600px]">
        <AuburnHeroImage imageId="hero-foresthill-bridge">
          <div className="container mx-auto px-4 text-center">
            <span className="inline-block px-4 py-2 bg-lake-500/90 text-white text-sm font-semibold rounded-full mb-4">
              Stories from Auburn
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Discover Auburn
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Local stories, insider guides, and everything you need to experience California's Gold Country
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
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <p className="text-xl text-charcoal-700 leading-relaxed">
              <strong>Auburn, California</strong> reveals itself slowly—in canyon trails locals have hiked for decades, 
              historic buildings still housing daily businesses, seasonal rhythms that define life in Gold Country, and 
              stories passed from longtime residents to curious visitors. This is where we share those discoveries: 
              detailed trail guides written after hundreds of hikes, seasonal tips from people who've experienced Auburn's 
              four distinct seasons for years, historical deep-dives that go beyond museum placards, and honest 
              recommendations for experiencing Auburn authentically.
            </p>
          </div>

          {/* Category Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <div key={category.title} className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow border border-charcoal-100">
                  <div className="w-16 h-16 rounded-full bg-lake-100 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-lake-600" />
                  </div>
                  <h3 className="text-xl font-bold text-charcoal-900 mb-2">{category.title}</h3>
                  <p className="text-charcoal-600 text-sm">{category.description}</p>
                </div>
              )
            })}
          </div>

          {/* Featured Content Sections */}
          <div className="max-w-6xl mx-auto">
            {/* Outdoor Adventures */}
            <div className="mb-20">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-charcoal-900">Outdoor Adventure Guides</h2>
                <Link 
                  href="/things-to-do/outdoor-adventures" 
                  className="text-lake-600 hover:text-lake-700 font-semibold text-sm"
                >
                  View All Outdoor Activities →
                </Link>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="card card-hover overflow-hidden">
                  <AuburnImage 
                    imageId="outdoor-lake-clementine"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <span className="text-xs font-semibold text-green-700 uppercase">Hiking Guide</span>
                    <h3 className="text-xl font-bold text-charcoal-900 mt-2 mb-3">
                      Lake Clementine Trail: Complete Guide
                    </h3>
                    <p className="text-charcoal-600 text-sm mb-4">
                      Everything you need to know about Auburn's most popular trail—parking, best times, swimming 
                      holes, and what to bring.
                    </p>
                    <Link href="/things-to-do/outdoor-adventures" className="text-lake-600 hover:text-lake-700 text-sm font-semibold">
                      Read More →
                    </Link>
                  </div>
                </div>

                <div className="card card-hover overflow-hidden">
                  <AuburnImage 
                    imageId="outdoor-hidden-falls"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <span className="text-xs font-semibold text-green-700 uppercase">Waterfall Guide</span>
                    <h3 className="text-xl font-bold text-charcoal-900 mt-2 mb-3">
                      Hidden Falls: Auburn's Year-Round Cascade
                    </h3>
                    <p className="text-charcoal-600 text-sm mb-4">
                      Trail options, seasonal differences, and why this regional park became an instant Auburn favorite.
                    </p>
                    <Link href="/things-to-do/outdoor-adventures" className="text-lake-600 hover:text-lake-700 text-sm font-semibold">
                      Read More →
                    </Link>
                  </div>
                </div>

                <div className="card card-hover overflow-hidden">
                  <AuburnImage 
                    imageId="outdoor-river-swimming"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <span className="text-xs font-semibold text-green-700 uppercase">Summer Guide</span>
                    <h3 className="text-xl font-bold text-charcoal-900 mt-2 mb-3">
                      Best Swimming Holes Near Auburn
                    </h3>
                    <p className="text-charcoal-600 text-sm mb-4">
                      Where locals cool off in the American River: access points, safety tips, and what to expect.
                    </p>
                    <Link href="/things-to-do/outdoor-adventures" className="text-lake-600 hover:text-lake-700 text-sm font-semibold">
                      Read More →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* History & Culture */}
            <div className="mb-20">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-charcoal-900">History & Heritage Stories</h2>
                <Link 
                  href="/things-to-do/history-culture" 
                  className="text-lake-600 hover:text-lake-700 font-semibold text-sm"
                >
                  Explore Auburn History →
                </Link>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="card card-hover overflow-hidden">
                  <AuburnImage 
                    imageId="historic-old-town-clocktower"
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <span className="text-xs font-semibold text-amber-700 uppercase">Gold Rush History</span>
                    <h3 className="text-2xl font-bold text-charcoal-900 mt-2 mb-3">
                      Old Town Auburn: Walking Through 175 Years
                    </h3>
                    <p className="text-charcoal-600 mb-4">
                      How Auburn survived when other Gold Rush towns became ghost settlements, and why these historic 
                      buildings still house daily businesses instead of becoming museums.
                    </p>
                    <Link href="/things-to-do/history-culture" className="text-lake-600 hover:text-lake-700 text-sm font-semibold">
                      Read the Story →
                    </Link>
                  </div>
                </div>

                <div className="card card-hover overflow-hidden">
                  <AuburnImage 
                    imageId="historic-gold-country-museum"
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <span className="text-xs font-semibold text-amber-700 uppercase">Museum Guide</span>
                    <h3 className="text-2xl font-bold text-charcoal-900 mt-2 mb-3">
                      Auburn's Museums: More Than Placards
                    </h3>
                    <p className="text-charcoal-600 mb-4">
                      Inside Auburn's three major museums—what you'll actually see, why they matter, and which exhibits 
                      reveal Gold Country history you won't find in textbooks.
                    </p>
                    <Link href="/things-to-do/history-culture" className="text-lake-600 hover:text-lake-700 text-sm font-semibold">
                      Read the Guide →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Planning Resources */}
            <div className="mb-20">
              <h2 className="text-3xl font-bold text-charcoal-900 mb-8">Plan Your Auburn Visit</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Link href="/itineraries" className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow group border border-charcoal-100">
                  <Map className="w-10 h-10 text-lake-600 mb-4" />
                  <h3 className="text-xl font-bold text-charcoal-900 mb-2 group-hover:text-lake-600 transition-colors">
                    Auburn Itineraries
                  </h3>
                  <p className="text-charcoal-600 text-sm">
                    Weekend getaways, outdoor adventures, history tours—complete day-by-day plans for experiencing Auburn.
                  </p>
                </Link>

                <Link href="/plan/visitor-information" className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow group border border-charcoal-100">
                  <BookOpen className="w-10 h-10 text-lake-600 mb-4" />
                  <h3 className="text-xl font-bold text-charcoal-900 mb-2 group-hover:text-lake-600 transition-colors">
                    Visitor Information
                  </h3>
                  <p className="text-charcoal-600 text-sm">
                    Practical details: weather, what to pack, getting around, and Auburn essentials for first-time visitors.
                  </p>
                </Link>

                <Link href="/events" className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow group border border-charcoal-100">
                  <Calendar className="w-10 h-10 text-lake-600 mb-4" />
                  <h3 className="text-xl font-bold text-charcoal-900 mb-2 group-hover:text-lake-600 transition-colors">
                    Events Calendar
                  </h3>
                  <p className="text-charcoal-600 text-sm">
                    What's happening during your visit: festivals, concerts, art walks, and seasonal Auburn celebrations.
                  </p>
                </Link>

                <Link href="/discover/auburn-data" className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow group border border-charcoal-100">
                  <BarChart3 className="w-10 h-10 text-lake-600 mb-4" />
                  <h3 className="text-xl font-bold text-charcoal-900 mb-2 group-hover:text-lake-600 transition-colors">
                    Auburn by the Numbers
                  </h3>
                  <p className="text-charcoal-600 text-sm">
                    Explore 120 years of Auburn's growth through interactive data visualizations and demographic trends.
                  </p>
                </Link>
              </div>
            </div>

            {/* Seasonal Highlights - Cream background */}
            <div className="bg-cream-50 rounded-2xl p-8 md:p-12 mb-20">
              <h2 className="text-3xl font-bold text-charcoal-900 mb-6 text-center">
                Auburn Through the Seasons
              </h2>
              <p className="text-center text-charcoal-600 mb-10 max-w-3xl mx-auto">
                Gold Country experiences four distinct seasons, each bringing unique attractions and activities to Auburn
              </p>

              <div className="grid md:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg p-6">
                  <h4 className="font-bold text-lg text-green-700 mb-2">Spring</h4>
                  <ul className="text-sm text-charcoal-700 space-y-1">
                    <li>• Wildflower trails</li>
                    <li>• Waterfall peaks</li>
                    <li>• 60-75°F weather</li>
                    <li>• Gold Country Fair</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-6">
                  <h4 className="font-bold text-lg text-lake-700 mb-2">Summer</h4>
                  <ul className="text-sm text-charcoal-700 space-y-1">
                    <li>• River swimming</li>
                    <li>• Early morning hikes</li>
                    <li>• Outdoor concerts</li>
                    <li>• Western States Trail</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-6">
                  <h4 className="font-bold text-lg text-amber-700 mb-2">Fall</h4>
                  <ul className="text-sm text-charcoal-700 space-y-1">
                    <li>• Golden oak trees</li>
                    <li>• Perfect hiking temps</li>
                    <li>• Harvest season</li>
                    <li>• Fewer trail crowds</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-6">
                  <h4 className="font-bold text-lg text-purple-700 mb-2">Winter</h4>
                  <ul className="text-sm text-charcoal-700 space-y-1">
                    <li>• Victorian Christmas</li>
                    <li>• Mild 45-55°F days</li>
                    <li>• Green hills</li>
                    <li>• Trail solitude</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Blue accent band */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-lake-500 to-lake-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-display">
            Start Exploring Auburn Today
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Discover hidden gems, plan your visit, and experience authentic Gold Country in Auburn, California.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/things-to-do"
              className="bg-white text-lake-600 font-semibold px-8 py-4 rounded-lg hover:bg-cream-50 transition-colors inline-flex items-center justify-center gap-2 shadow-lg"
            >
              Things to Do
            </Link>
            <Link
              href="/itineraries"
              className="border-2 border-white/70 text-white font-semibold px-8 py-4 rounded-lg hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2"
            >
              View Itineraries
            </Link>
          </div>
        </div>
      </section>

      <RelatedPages currentPath="/discover" />
    </div>
  )
}

