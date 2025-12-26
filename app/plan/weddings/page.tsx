import { buildMetadata, SITE_URL } from '@/lib/seo'
import { Heart, Camera, Utensils, Music, MapPin, Users, Mail, Phone } from 'lucide-react'
import Image from 'next/image'
import { getPlaceholderImage } from '@/lib/images'
import type { Metadata } from 'next'

export const metadata: Metadata = buildMetadata({
  title: 'Weddings in Auburn - Say "I Do" in Gold Country',
  description: 'Plan your dream wedding in Auburn, California. Discover stunning venues, vendors, and services in the heart of Gold Country. Historic charm meets natural beauty.',
  canonical: `${SITE_URL}/plan/weddings`,
})

const venueTypes = [
  {
    icon: MapPin,
    title: 'Historic Venues',
    description: 'Gold Rush era buildings and courtyards with authentic character',
  },
  {
    icon: Users,
    title: 'Garden Settings',
    description: 'Beautiful outdoor spaces surrounded by Sierra Nevada foothills',
  },
  {
    icon: Heart,
    title: 'Vineyard Views',
    description: 'Romantic winery locations with stunning sunset backdrops',
  },
]

const services = [
  {
    category: 'Photography',
    icon: Camera,
    description: 'Capture your special day with local professional photographers who know the best Auburn locations.',
  },
  {
    category: 'Catering',
    icon: Utensils,
    description: 'From farm-to-table cuisine to classic Gold Country fare, Auburn caterers deliver exceptional dining.',
  },
  {
    category: 'Entertainment',
    icon: Music,
    description: 'Live bands, DJs, and musicians to set the perfect mood for your celebration.',
  },
]

export default function WeddingsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <Image
          src={getPlaceholderImage('hero')}
          alt="Auburn Wedding Venue"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-pink-900/60 via-purple-900/50 to-pink-900/60" />
        
        <div className="relative z-10 container text-center text-white px-4">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6">
            <Heart className="w-10 h-10 fill-current" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Say "I Do" in Gold Country
          </h1>
          <p className="text-xl md:text-2xl text-pink-100 max-w-3xl mx-auto leading-relaxed">
            Celebrate your love story in Auburn's historic charm and natural beauty
          </p>
        </div>
      </div>

      {/* Why Auburn */}
      <section className="py-16 md:py-24">
        <div className="container max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Choose Auburn for Your Wedding?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Auburn offers the perfect blend of historic elegance, natural beauty, and modern amenities—all just 30 minutes from Sacramento and 45 minutes from Lake Tahoe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {venueTypes.map((venue, index) => {
              const Icon = venue.icon
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-8 border border-pink-100 hover:shadow-lg transition-shadow"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {venue.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {venue.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Wedding Services */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Complete Wedding Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need for your perfect day, all in one charming Gold Country town
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow"
                >
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-pink-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {service.category}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              )
            })}
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Additional Services Available
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {['Florists', 'Wedding Planners', 'Hair & Makeup', 'Officiants', 'Rentals & Decor', 'Transportation', 'Bakeries', 'Accommodations'].map((service) => (
                <div key={service} className="p-4 bg-gray-50 rounded-lg">
                  <p className="font-semibold text-gray-900">{service}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Guest Experience */}
      <section className="py-16 md:py-24">
        <div className="container max-w-6xl">
          <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Your Guests Will Love Auburn Too
              </h2>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                With 25+ hotels, 100+ restaurants, hiking trails, historic sites, and proximity to Lake Tahoe, 
                your wedding weekend becomes a memorable Gold Country getaway for everyone.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/accommodations"
                  className="px-8 py-4 bg-white text-blue-600 font-bold rounded-full hover:bg-blue-50 transition-colors shadow-lg"
                >
                  Browse Accommodations
                </a>
                <a
                  href="/things-to-do"
                  className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-colors"
                >
                  Explore Activities
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-pink-50 via-purple-50 to-pink-50">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Start Planning Your Auburn Wedding
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Our team is here to help you find the perfect venues, vendors, and accommodations for your special day.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Partner's Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Wedding Date (if set)
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Estimated Guest Count
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tell us about your wedding vision
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Venue preferences, style, special requests..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold rounded-lg hover:from-pink-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
              >
                Request Wedding Information
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-center gap-6 text-gray-600">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-pink-600" />
                <a href="mailto:weddings@visitauburn.com" className="hover:text-pink-600">
                  weddings@visitauburn.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-pink-600" />
                <a href="tel:+15305551234" className="hover:text-pink-600">
                  (530) 555-1234
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

