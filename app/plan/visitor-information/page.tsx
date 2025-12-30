import { buildMetadata, SITE_URL } from '@/lib/seo'
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs'
import { RelatedPages } from '@/components/ui/RelatedPages'
import { generateBreadcrumbs } from '@/lib/routes'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Clock, Phone, Mail, Sun, Thermometer, Wifi, Car, CreditCard, Shield, ChevronRight, Sparkles, Map, Mountain, Coffee } from 'lucide-react'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Visitor Information for Auburn, California',
    description: 'Essential visitor information for Auburn, CA including visitor centers, local resources, and helpful tips for your visit to Gold Country.',
    canonical: `${SITE_URL}/plan/visitor-information`,
  })
}

const breadcrumbs = generateBreadcrumbs('/plan/visitor-information')

const seasons = [
  {
    name: 'Spring',
    months: 'Mar - May',
    temp: '55-75°F',
    description: 'Wildflowers bloom, waterfalls peak, perfect hiking weather',
    icon: '🌸',
    gradient: 'from-emerald-400 to-green-500',
  },
  {
    name: 'Summer',
    months: 'Jun - Aug',
    temp: '75-95°F',
    description: 'Warm and sunny, ideal for river activities and festivals',
    icon: '☀️',
    gradient: 'from-amber-400 to-orange-500',
  },
  {
    name: 'Fall',
    months: 'Sep - Nov',
    temp: '55-80°F',
    description: 'Wine harvest, golden foliage, comfortable temperatures',
    icon: '🍂',
    gradient: 'from-orange-400 to-red-500',
  },
  {
    name: 'Winter',
    months: 'Dec - Feb',
    temp: '40-55°F',
    description: 'Mild winters, occasional rain, nearby snow sports',
    icon: '❄️',
    gradient: 'from-sky-400 to-blue-500',
  },
]

const practicalInfo = [
  {
    icon: Wifi,
    title: 'WiFi & Connectivity',
    description: 'Free WiFi available at most cafes, hotels, and the Auburn Library. Cell coverage is excellent in town.',
  },
  {
    icon: Car,
    title: 'Parking',
    description: 'Free street parking in downtown. Paid lots available near popular trailheads on busy weekends.',
  },
  {
    icon: CreditCard,
    title: 'Payment',
    description: 'Most businesses accept credit cards. ATMs available at banks on Lincoln Way and High Street.',
  },
  {
    icon: Shield,
    title: 'Safety',
    description: 'Auburn is a safe community. Trail safety: bring water, wear layers, tell someone your plans.',
  },
]

const localTips = [
  {
    icon: Mountain,
    tip: 'Best Time for Trails',
    detail: 'Hit the trails early morning (before 9am) in summer to beat the heat. Spring mornings offer the best wildflower viewing.',
  },
  {
    icon: Coffee,
    tip: 'Dining Reservations',
    detail: 'Weekend dinner reservations recommended at popular Old Town restaurants, especially during events and holidays.',
  },
  {
    icon: Map,
    tip: 'Farmers Market',
    detail: 'Saturday morning farmers market (8am-12pm) in Old Town is a must. Arrive early for the best selection.',
  },
  {
    icon: Sparkles,
    tip: 'Hidden Gem',
    detail: 'The view from the Foresthill Bridge at sunset is spectacular. Park at Vista Point on the Auburn side.',
  },
]

export default function VisitorInformationPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ═══════════════════════════════════════════════════════════════════
          HERO SECTION - Cinematic style matching homepage
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/things-to-do.jpg"
            alt="Auburn Visitor Center"
            fill
            className="object-cover"
            priority
          />
          <div 
            className="absolute inset-0"
            style={{
              background: `linear-gradient(
                to bottom,
                rgba(0, 0, 0, 0.3) 0%,
                rgba(0, 0, 0, 0.15) 50%,
                rgba(0, 0, 0, 0.5) 100%
              )`
            }}
          />
        </div>
        
        <div className="relative z-10 min-h-[60vh] md:min-h-[70vh] flex flex-col justify-end items-start text-left px-4 sm:px-6 md:px-12 lg:px-20 pb-16 md:pb-24">
          <p 
            className="uppercase tracking-[0.2em] text-sm font-medium mb-4 text-white/80"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}
          >
            Plan Your Visit
          </p>
          <h1 
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            style={{ textShadow: '0 4px 20px rgba(0,0,0,0.6)' }}
          >
            Visitor Information
          </h1>
          <p 
            className="text-lg md:text-xl text-white/90 max-w-2xl"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}
          >
            Everything you need to know for an amazing visit to Auburn, California — 
            the heart of Gold Country.
          </p>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="bg-cream-50 border-b border-charcoal-100">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumbs items={breadcrumbs} />
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          VISITOR CENTER SECTION - Cream background with white card
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-cream-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="section-eyebrow-light mb-4">Start Here</p>
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal-900 mb-6 font-display">
                Auburn Visitor Center
              </h2>
              <p className="text-charcoal-600 text-lg mb-8">
                Stop by our visitor center for maps, brochures, local recommendations, 
                and personalized trip planning assistance from our friendly staff.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-forest-500/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-forest-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal-900">Location</h3>
                    <p className="text-charcoal-600">1103 High Street, Auburn, CA 95603</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-forest-500/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-forest-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal-900">Hours</h3>
                    <p className="text-charcoal-600">Monday - Saturday: 10am - 4pm</p>
                    <p className="text-charcoal-600">Sunday: 11am - 3pm</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-forest-500/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-forest-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal-900">Contact</h3>
                    <p className="text-charcoal-600">(530) 885-5616</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-forest-500/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-forest-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal-900">Email</h3>
                    <p className="text-charcoal-600">info@visitauburn.com</p>
                  </div>
                </div>
              </div>

              <Link href="/plan/maps-guides" className="btn-outline-pine inline-flex items-center gap-2">
                Download Maps & Guides
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="bg-white p-2 rounded-2xl shadow-card">
              <div className="aspect-square rounded-xl overflow-hidden relative">
                <Image
                  src="/images/discover.jpg"
                  alt="Auburn Visitor Center"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          WEATHER & SEASONS - White background with crisp cards
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="section-eyebrow-light mb-4">When to Visit</p>
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal-900 mb-4 font-display">
              Weather & Seasons
            </h2>
            <p className="text-charcoal-600 max-w-2xl mx-auto">
              Auburn enjoys a Mediterranean climate with over 300 days of sunshine. 
              Every season offers unique experiences.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {seasons.map((season) => (
              <div 
                key={season.name} 
                className="bg-white rounded-2xl border border-charcoal-100 p-6 text-center shadow-card hover:shadow-card-hover transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{season.icon}</div>
                <h3 className="text-xl font-bold text-charcoal-900 mb-1">{season.name}</h3>
                <p className="text-forest-600 text-sm font-semibold mb-3">{season.months}</p>
                <div className="inline-flex items-center gap-2 bg-charcoal-50 rounded-full px-3 py-1.5 mb-4">
                  <Thermometer className="w-4 h-4 text-charcoal-500" />
                  <span className="text-charcoal-700 font-semibold text-sm">{season.temp}</span>
                </div>
                <p className="text-charcoal-600 text-sm">{season.description}</p>
              </div>
            ))}
          </div>

          {/* Current Weather Widget */}
          <div className="mt-12 bg-gradient-to-br from-gold-500 to-gold-600 rounded-2xl p-8 max-w-md mx-auto text-center shadow-lg">
            <div className="flex items-center justify-center gap-4 mb-4">
              <Sun className="w-12 h-12 text-white" />
              <div className="text-left">
                <div className="text-4xl font-bold text-white">72°F</div>
                <div className="text-white/80">Sunny</div>
              </div>
            </div>
            <p className="text-white/70 text-sm">
              Current conditions in Auburn, CA
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          PRACTICAL INFORMATION - Cream background
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-cream-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="section-eyebrow-light mb-4">Good to Know</p>
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal-900 mb-4 font-display">
              Practical Information
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {practicalInfo.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="bg-white rounded-2xl border border-charcoal-100 p-6 shadow-card">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-forest-500/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-forest-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-charcoal-900 mb-2">{item.title}</h3>
                      <p className="text-charcoal-600 text-sm">{item.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          LOCAL TIPS - White background with accent cards
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <p className="section-eyebrow-light mb-4">Insider Knowledge</p>
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal-900 mb-4 font-display">
                Local Tips
              </h2>
            </div>

            <div className="space-y-4">
              {localTips.map((item, index) => {
                const Icon = item.icon
                return (
                  <div 
                    key={index} 
                    className="bg-white rounded-2xl border border-charcoal-100 p-6 shadow-card hover:shadow-card-hover transition-shadow duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-gold-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-charcoal-900 mb-2">{item.tip}</h3>
                        <p className="text-charcoal-600">{item.detail}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          CTA SECTION - Forest green gradient like "Respect Auburn"
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/bridge.webp"
            alt="Auburn scenic view"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-600/95 to-forest-500/90" />
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-display">
            Ready to Plan Your Trip?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Download our guides, check out activities, or find the perfect place to stay.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/plan/maps-guides" 
              className="bg-white text-forest-600 font-semibold px-8 py-4 rounded-full hover:bg-cream-50 transition-colors inline-flex items-center justify-center gap-2"
            >
              Maps & Guides
              <ChevronRight className="w-5 h-5" />
            </Link>
            <Link 
              href="/things-to-do" 
              className="border-2 border-white/70 text-white font-semibold px-8 py-4 rounded-full hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2"
            >
              Things to Do
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <RelatedPages currentPath="/plan/visitor-information" />
    </div>
  )
}
