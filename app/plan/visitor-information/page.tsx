import { buildMetadata, SITE_URL } from '@/lib/seo'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Clock, Phone, Mail, Sun, Cloud, Thermometer, Droplets, Wifi, Car, CreditCard, Shield, ChevronRight } from 'lucide-react'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Visitor Information for Auburn, California',
    description: 'Essential visitor information for Auburn, CA including visitor centers, local resources, and helpful tips for your visit to Gold Country.',
    canonical: `${SITE_URL}/plan/visitor-information`,
  })
}

const seasons = [
  {
    name: 'Spring',
    months: 'Mar - May',
    temp: '55-75°F',
    description: 'Wildflowers bloom, waterfalls peak, perfect hiking weather',
    icon: '🌸',
  },
  {
    name: 'Summer',
    months: 'Jun - Aug',
    temp: '75-95°F',
    description: 'Warm and sunny, ideal for river activities and festivals',
    icon: '☀️',
  },
  {
    name: 'Fall',
    months: 'Sep - Nov',
    temp: '55-80°F',
    description: 'Wine harvest, golden foliage, comfortable temperatures',
    icon: '🍂',
  },
  {
    name: 'Winter',
    months: 'Dec - Feb',
    temp: '40-55°F',
    description: 'Mild winters, occasional rain, nearby snow sports',
    icon: '❄️',
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

export default function VisitorInformationPage() {
  return (
    <div className="min-h-screen bg-deep-bg">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/things-to-do.jpg"
            alt="Auburn Visitor Center"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-deep-bg/90 via-deep-bg/70 to-deep-bg" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <p className="section-eyebrow text-center mb-4">Plan Your Visit</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary text-center mb-6 font-display">
            Visitor Information
          </h1>
          <p className="text-xl text-text-muted text-center max-w-2xl mx-auto">
            Everything you need to know for an amazing visit to Auburn, California - 
            the heart of Gold Country.
          </p>
        </div>
      </section>

      {/* Visitor Center Section */}
      <section className="py-20 md:py-28 bg-deep-surface">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="section-eyebrow mb-4">Start Here</p>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6 font-display">
                Auburn Visitor Center
              </h2>
              <p className="text-text-muted text-lg mb-8">
                Stop by our visitor center for maps, brochures, local recommendations, 
                and personalized trip planning assistance from our friendly staff.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-pine-500/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-pine-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">Location</h3>
                    <p className="text-text-muted">1103 High Street, Auburn, CA 95603</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-pine-500/20 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-pine-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">Hours</h3>
                    <p className="text-text-muted">Monday - Saturday: 10am - 4pm</p>
                    <p className="text-text-muted">Sunday: 11am - 3pm</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-pine-500/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-pine-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">Contact</h3>
                    <p className="text-text-muted">(530) 885-5616</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-pine-500/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-pine-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">Email</h3>
                    <p className="text-text-muted">info@visitauburn.com</p>
                  </div>
                </div>
              </div>

              <Link href="/plan/maps-guides" className="btn-primary inline-flex items-center gap-2">
                Download Maps & Guides
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="card-glass p-2 rounded-2xl">
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

      {/* Weather & Seasons */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="section-eyebrow mb-4">When to Visit</p>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 font-display">
              Weather & Seasons
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              Auburn enjoys a Mediterranean climate with over 300 days of sunshine. 
              Every season offers unique experiences.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {seasons.map((season) => (
              <div key={season.name} className="card-glass p-6 text-center">
                <div className="text-4xl mb-4">{season.icon}</div>
                <h3 className="text-xl font-bold text-text-primary mb-1">{season.name}</h3>
                <p className="text-pine-400 text-sm font-medium mb-2">{season.months}</p>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Thermometer className="w-4 h-4 text-text-muted" />
                  <span className="text-text-primary font-semibold">{season.temp}</span>
                </div>
                <p className="text-text-muted text-sm">{season.description}</p>
              </div>
            ))}
          </div>

          {/* Current Weather Widget Placeholder */}
          <div className="mt-12 card-glass p-8 max-w-md mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <Sun className="w-12 h-12 text-gold-400" />
              <div className="text-left">
                <div className="text-4xl font-bold text-text-primary">72°F</div>
                <div className="text-text-muted">Sunny</div>
              </div>
            </div>
            <p className="text-text-muted text-sm">
              Current conditions in Auburn, CA
            </p>
          </div>
        </div>
      </section>

      {/* Practical Information */}
      <section className="py-20 md:py-28 bg-deep-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="section-eyebrow mb-4">Good to Know</p>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 font-display">
              Practical Information
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {practicalInfo.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="card-glass p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-pine-500/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-pine-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-text-primary mb-2">{item.title}</h3>
                      <p className="text-text-muted text-sm">{item.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Local Tips */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <p className="section-eyebrow mb-4">Insider Knowledge</p>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 font-display">
                Local Tips
              </h2>
            </div>

            <div className="space-y-6">
              {[
                {
                  tip: 'Best Time for Trails',
                  detail: 'Hit the trails early morning (before 9am) in summer to beat the heat. Spring mornings offer the best wildflower viewing.',
                },
                {
                  tip: 'Dining Reservations',
                  detail: 'Weekend dinner reservations recommended at popular Old Town restaurants, especially during events and holidays.',
                },
                {
                  tip: 'Farmers Market',
                  detail: 'Saturday morning farmers market (8am-12pm) in Old Town is a must. Arrive early for the best selection.',
                },
                {
                  tip: 'Hidden Gem',
                  detail: 'The view from the Foresthill Bridge at sunset is spectacular. Park at Vista Point on the Auburn side.',
                },
              ].map((item, index) => (
                <div key={index} className="card-glass p-6">
                  <h3 className="text-lg font-bold text-pine-400 mb-2">{item.tip}</h3>
                  <p className="text-text-muted">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-deep-surface border-t border-border-subtle">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6 font-display">
            Ready to Plan Your Trip?
          </h2>
          <p className="text-xl text-text-muted mb-8 max-w-2xl mx-auto">
            Download our guides, check out activities, or find the perfect place to stay.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/plan/maps-guides" className="btn-primary inline-flex items-center gap-2">
              Maps & Guides
              <ChevronRight className="w-5 h-5" />
            </Link>
            <Link href="/activities" className="btn-outline-white inline-flex items-center gap-2">
              Things to Do
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
