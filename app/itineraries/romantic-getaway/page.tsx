import { buildMetadata, SITE_URL } from '@/lib/seo'
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs'
import { RelatedPages } from '@/components/ui/RelatedPages'
import { AuburnHeroImage, AuburnImage } from '@/components/ui/AuburnImage'
import { generateBreadcrumbs } from '@/lib/routes'
import Link from 'next/link'
import { Heart, MapPin, Clock, Star, ArrowRight, Utensils, Wine, Sunrise, Moon } from 'lucide-react'
import type { Metadata } from 'next'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Romantic Getaway in Auburn - Couples Escape to Gold Country',
    description: 'Escape to Auburn for a romantic weekend: candlelit dinners, vineyard views, sunset hikes, and boutique hotel charm. Complete couples itinerary for anniversaries and special occasions.',
    canonical: `${SITE_URL}/itineraries/romantic-getaway`,
  })
}

export default function RomanticGetawayPage() {
  const breadcrumbs = generateBreadcrumbs('/itineraries/romantic-getaway')

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero */}
      <section className="relative h-[500px] md:h-[600px]">
        <AuburnHeroImage imageId="hero-downtown-autumn">
          <div className="container mx-auto px-4 text-center">
            <span className="inline-block px-4 py-2 bg-pink-600/90 text-white text-sm font-semibold rounded-full mb-4">
              Couples Itinerary
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Romantic Getaway
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Fall in love again in Auburn—where Gold Rush charm meets California romance
            </p>
          </div>
        </AuburnHeroImage>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={breadcrumbs} />

          {/* Intro */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="card p-8 bg-gradient-to-br from-pink-50 to-cream-100">
              <div className="grid md:grid-cols-4 gap-6 mb-6">
                <div className="text-center">
                  <Clock className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                  <p className="text-sm text-charcoal-600">Duration</p>
                  <p className="font-bold text-charcoal-900">1-2 Nights</p>
                </div>
                <div className="text-center">
                  <Heart className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                  <p className="text-sm text-charcoal-600">Perfect For</p>
                  <p className="font-bold text-charcoal-900">Couples</p>
                </div>
                <div className="text-center">
                  <Star className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                  <p className="text-sm text-charcoal-600">Vibe</p>
                  <p className="font-bold text-charcoal-900">Slow & Romantic</p>
                </div>
                <div className="text-center">
                  <Wine className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                  <p className="text-sm text-charcoal-600">Highlights</p>
                  <p className="font-bold text-charcoal-900">Wine, Dining, Views</p>
                </div>
              </div>
              <p className="text-charcoal-700 text-lg leading-relaxed">
                <strong>Auburn, California</strong> is Sacramento's most romantic escape—close enough for a 
                spontaneous getaway, far enough to feel like you've traveled somewhere special. Imagine: 
                walking hand-in-hand through 1850s streets at golden hour, sipping wine as sunset paints 
                the Sierra foothills, dining by candlelight in a building where miners once celebrated their 
                fortunes. This itinerary is for couples who want to reconnect, celebrate, or simply remember 
                why you fell in love. No kids. No schedules. Just the two of you.
              </p>
            </div>
          </div>

          {/* Arrival */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-full bg-pink-500 text-white flex flex-col items-center justify-center flex-shrink-0">
                <Heart className="w-8 h-8" />
                <span className="text-xs font-bold">START</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-charcoal-900">Afternoon: Arrive & Settle In</h2>
                <p className="text-charcoal-600">Check in, decompress, set the tone</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="card p-6 border-l-4 border-pink-400">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-5 h-5 text-pink-600" />
                  <span className="font-bold text-charcoal-900">3:00 PM</span>
                  <span className="text-charcoal-600">— Check Into Your Boutique Stay</span>
                </div>
                <p className="text-charcoal-700 mb-4">
                  <Link href="/accommodations" className="text-pink-600 hover:text-pink-700 font-semibold">Auburn's accommodations</Link> include 
                  charming boutique hotels, historic inns, and elegant B&Bs perfect for romance. Look for:
                </p>
                <ul className="text-charcoal-700 text-sm space-y-1 mb-4">
                  <li>💐 King beds with quality linens</li>
                  <li>🛁 Jetted tubs or rain showers</li>
                  <li>🍷 In-room wine service</li>
                  <li>🏛️ Historic building charm</li>
                  <li>🌅 Balcony or garden views</li>
                </ul>
                <p className="text-charcoal-700">
                  Take time to actually enjoy the room. Open the wine, draw a bath, leave your phone in the bag. 
                  The romance starts now.
                </p>
              </div>

              <div className="card p-6 border-l-4 border-pink-400">
                <div className="flex items-center gap-3 mb-3">
                  <MapPin className="w-5 h-5 text-pink-600" />
                  <span className="font-bold text-charcoal-900">4:30 PM</span>
                  <span className="text-charcoal-600">— Golden Hour Stroll</span>
                </div>
                <p className="text-charcoal-700 mb-3">
                  Walk <Link href="/things-to-do/history-culture" className="text-pink-600 hover:text-pink-700 font-semibold">Old Town Auburn</Link> as 
                  afternoon light turns the brick buildings to gold. Window-shop antique stores, peek into 
                  galleries, take photos in front of the Firehouse Tower. Hold hands. Remember dating.
                </p>
                <p className="text-sm text-charcoal-600 italic">
                  This isn't a museum tour—it's slow, aimless wandering with someone you love.
                </p>
              </div>
            </div>
          </div>

          {/* Photo 1 */}
          <div className="mb-16">
            <AuburnImage 
              imageId="downtown-lincoln-way"
              className="rounded-xl w-full h-[450px] object-cover shadow-lg"
            />
            <p className="text-sm text-charcoal-600 mt-3 italic text-center">
              Golden hour in Old Town Auburn—brick buildings glow as the day softens
            </p>
          </div>

          {/* Evening */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-full bg-rose-700 text-white flex flex-col items-center justify-center flex-shrink-0">
                <Moon className="w-8 h-8" />
                <span className="text-xs font-bold">EVE</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-charcoal-900">Evening: Dinner & Night Magic</h2>
                <p className="text-charcoal-600">The meal you'll remember</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="card p-6 border-l-4 border-rose-600">
                <div className="flex items-center gap-3 mb-3">
                  <Wine className="w-5 h-5 text-rose-700" />
                  <span className="font-bold text-charcoal-900">6:00 PM</span>
                  <span className="text-charcoal-600">— Pre-Dinner Drinks</span>
                </div>
                <p className="text-charcoal-700 mb-3">
                  Start with cocktails or wine at a local spot. <Link href="/dining" className="text-rose-700 hover:text-rose-800 font-semibold">Auburn's bars</Link> occupy 
                  historic spaces with character—exposed brick, vintage details, craft cocktail menus. 
                  Sit close. Share appetizers. Make eye contact.
                </p>
              </div>

              <div className="card p-6 border-l-4 border-rose-600">
                <div className="flex items-center gap-3 mb-3">
                  <Utensils className="w-5 h-5 text-rose-700" />
                  <span className="font-bold text-charcoal-900">7:30 PM</span>
                  <span className="text-charcoal-600">— Candlelit Dinner</span>
                </div>
                <p className="text-charcoal-700 mb-4">
                  Reserve at <Link href="/dining" className="text-rose-700 hover:text-rose-800 font-semibold">Auburn's best restaurant</Link>. 
                  Request a corner table or patio seat. Let the server guide wine pairings. Order dessert 
                  even if you're full. Linger over every course.
                </p>
                <div className="bg-pink-50 p-4 rounded-lg">
                  <h4 className="font-bold text-charcoal-900 mb-2">Evening Dining Tips</h4>
                  <ul className="text-charcoal-700 text-sm space-y-1">
                    <li>💝 <strong>Mention</strong> anniversary/special occasion when booking</li>
                    <li>📱 <strong>Leave phones</strong> in your pocket (yes, really)</li>
                    <li>🍷 <strong>Try</strong> a bottle of Sierra Foothills wine you haven't had</li>
                    <li>🎁 <strong>Many restaurants</strong> will plate dessert for celebrations</li>
                  </ul>
                </div>
              </div>

              <div className="card p-6 border-l-4 border-rose-600">
                <div className="flex items-center gap-3 mb-3">
                  <Moon className="w-5 h-5 text-rose-700" />
                  <span className="font-bold text-charcoal-900">10:00 PM</span>
                  <span className="text-charcoal-600">— Nightcap & Night Walk</span>
                </div>
                <p className="text-charcoal-700">
                  Old Town at night is magical—gas-lit buildings, empty streets, stars visible above. 
                  Take a slow walk to digest, then return to your room for a nightcap on the balcony 
                  or by the fire. This is why you escaped.
                </p>
              </div>
            </div>
          </div>

          {/* Photo 2 */}
          <div className="mb-16">
            <AuburnImage 
              imageId="dining-intimate-setting"
              className="rounded-xl w-full h-[450px] object-cover shadow-lg"
            />
            <p className="text-sm text-charcoal-600 mt-3 italic text-center">
              Intimate dining in Auburn—candlelit tables, seasonal menus, memorable evenings
            </p>
          </div>

          {/* Morning After */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-full bg-amber-500 text-white flex flex-col items-center justify-center flex-shrink-0">
                <Sunrise className="w-8 h-8" />
                <span className="text-xs font-bold">AM</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-charcoal-900">Next Morning: Slow & Sweet</h2>
                <p className="text-charcoal-600">No alarms, no rush</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="card p-6 border-l-4 border-amber-400">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-5 h-5 text-amber-600" />
                  <span className="font-bold text-charcoal-900">Whenever You Wake</span>
                  <span className="text-charcoal-600">— Sleep In</span>
                </div>
                <p className="text-charcoal-700">
                  There's no 7am alarm here. Wake when you wake. Order room service coffee or stay in bed 
                  longer than usual. This is a getaway, not a checklist.
                </p>
              </div>

              <div className="card p-6 border-l-4 border-amber-400">
                <div className="flex items-center gap-3 mb-3">
                  <Utensils className="w-5 h-5 text-amber-600" />
                  <span className="font-bold text-charcoal-900">Late Morning</span>
                  <span className="text-charcoal-600">— Brunch for Two</span>
                </div>
                <p className="text-charcoal-700 mb-3">
                  Brunch in Auburn is an experience. <Link href="/dining" className="text-amber-600 hover:text-amber-700 font-semibold">Local cafes</Link> serve 
                  excellent eggs, fresh pastries, and proper coffee. Sit outside if weather permits. 
                  Share plates. Read the newspaper together (remember when people did that?).
                </p>
              </div>

              <div className="card p-6 border-l-4 border-amber-400">
                <div className="flex items-center gap-3 mb-3">
                  <Heart className="w-5 h-5 text-amber-600" />
                  <span className="font-bold text-charcoal-900">Afternoon Options</span>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <h4 className="font-bold text-charcoal-900 mb-2">Active Romance</h4>
                    <ul className="text-charcoal-700 text-sm space-y-1">
                      <li>🥾 Easy <Link href="/things-to-do/outdoor-adventures" className="text-amber-600 hover:text-amber-700 font-semibold">hiking trail</Link> with canyon views</li>
                      <li>🚴 Scenic bike ride through foothills</li>
                      <li>🏊 Summer swimming at the river</li>
                    </ul>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <h4 className="font-bold text-charcoal-900 mb-2">Relaxed Romance</h4>
                    <ul className="text-charcoal-700 text-sm space-y-1">
                      <li>🍷 <Link href="/dining" className="text-amber-600 hover:text-amber-700 font-semibold">Wine tasting</Link> at foothill vineyards</li>
                      <li>🛍️ Antique shopping in Old Town</li>
                      <li>☕ Afternoon coffee and people-watching</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Photo 3 */}
          <div className="mb-16">
            <AuburnImage 
              imageId="wine-foothill-vineyard"
              className="rounded-xl w-full h-[450px] object-cover shadow-lg"
            />
            <p className="text-sm text-charcoal-600 mt-3 italic text-center">
              Sierra Foothills wineries—afternoon tastings with vineyard views
            </p>
          </div>

          {/* Plan Your Visit CTA */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="card p-8 md:p-12 bg-gradient-to-br from-pink-600 to-rose-700 text-white">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Plan Your Romantic Escape</h2>
                <p className="text-xl text-pink-100 max-w-2xl mx-auto">
                  Book your Auburn getaway and start counting down to reconnection.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Link href="/accommodations" className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-colors group">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-pink-200 transition-colors">Romantic Stays</h3>
                  <p className="text-pink-100 text-sm mb-3">Boutique hotels & charming inns</p>
                  <span className="inline-flex items-center text-sm font-semibold">
                    Browse Hotels <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                <Link href="/dining" className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-colors group">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-pink-200 transition-colors">Date Night Dining</h3>
                  <p className="text-pink-100 text-sm mb-3">Intimate restaurants & wine bars</p>
                  <span className="inline-flex items-center text-sm font-semibold">
                    View Restaurants <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                <Link href="/events" className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-colors group">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-pink-200 transition-colors">Special Events</h3>
                  <p className="text-pink-100 text-sm mb-3">Wine releases & live music</p>
                  <span className="inline-flex items-center text-sm font-semibold">
                    See Calendar <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </div>

              <div className="text-center">
                <Link 
                  href="/plan/visitor-information" 
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-pink-700 font-bold rounded-full hover:bg-pink-50 transition-colors shadow-lg"
                >
                  Get Visitor Information
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-charcoal-900 mb-6">Romance Tips</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card p-6">
                <h3 className="font-bold text-charcoal-900 mb-3">💐 Special Occasion Ideas</h3>
                <ul className="text-charcoal-700 text-sm space-y-1">
                  <li>🎁 Have flowers delivered to your room before arrival</li>
                  <li>🍾 Pre-order champagne for check-in</li>
                  <li>📝 Write a letter to read at dinner</li>
                  <li>📸 Book a couples photo session in Old Town</li>
                  <li>💆 Arrange in-room massage services</li>
                </ul>
              </div>
              <div className="card p-6">
                <h3 className="font-bold text-charcoal-900 mb-3">📅 Best Times to Visit</h3>
                <p className="text-charcoal-700 text-sm">
                  <strong>Weekdays:</strong> Fewer crowds, easier reservations<br />
                  <strong>Fall:</strong> Wine harvest, golden light<br />
                  <strong>Spring:</strong> Wildflowers, perfect weather<br />
                  <strong>Winter weekends:</strong> Cozy, off-season rates
                </p>
              </div>
              <div className="card p-6">
                <h3 className="font-bold text-charcoal-900 mb-3">💰 Budget Ideas</h3>
                <p className="text-charcoal-700 text-sm">
                  <strong>Splurge-worthy:</strong> One amazing dinner<br />
                  <strong>Save on:</strong> Activities—trails are free!<br />
                  <strong>Book early:</strong> Better room rates<br />
                  <strong>Mid-week:</strong> Often 20-30% cheaper
                </p>
                <p className="text-sm mt-2">
                  <Link href="/special-offers" className="text-pink-600 hover:text-pink-700 font-semibold">Check special offers →</Link>
                </p>
              </div>
              <div className="card p-6">
                <h3 className="font-bold text-charcoal-900 mb-3">💝 Keep the Romance Going</h3>
                <ul className="text-charcoal-700 text-sm space-y-1">
                  <li>📱 Actually put phones away (challenge each other)</li>
                  <li>🗣️ Make a "no logistics" rule—don't discuss home stuff</li>
                  <li>📖 Bring a book to read together</li>
                  <li>📸 Take photos of each other, not just selfies</li>
                  <li>🎯 Focus on being present, not documenting</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RelatedPages currentPath="/itineraries/romantic-getaway" />
    </div>
  )
}

