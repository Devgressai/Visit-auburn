import { buildMetadata, SITE_URL } from '@/lib/seo'
import { Users, Building2, Coffee, Wifi, MapPin, Car, Mountain, Clock, Mail, Phone } from 'lucide-react'
import Image from 'next/image'
import { getPlaceholderImage } from '@/lib/images'
import type { Metadata } from 'next'

export const metadata: Metadata = buildMetadata({
  title: 'Meetings & Events in Auburn - Professional Event Planning',
  description: 'Host your next corporate meeting, conference, or team retreat in Auburn, California. Modern facilities, team-building activities, and easy accessibility from major cities.',
  canonical: `${SITE_URL}/plan/meetings`,
})

const whyAuburn = [
  {
    icon: MapPin,
    title: 'Strategic Location',
    description: '30 minutes from Sacramento, 2.5 hours from Bay Area, 45 minutes from Lake Tahoe',
  },
  {
    icon: Car,
    title: 'Easy Accessibility',
    description: 'Direct I-80 access, proximity to two major airports, ample parking',
  },
  {
    icon: Building2,
    title: 'Versatile Venues',
    description: 'Modern conference centers, historic venues, and outdoor spaces',
  },
  {
    icon: Mountain,
    title: 'Team Building',
    description: 'Hiking, rafting, gold panning, and adventure activities for groups',
  },
  {
    icon: Coffee,
    title: 'Complete Services',
    description: 'AV equipment, catering, accommodations, and transportation',
  },
  {
    icon: Wifi,
    title: 'Modern Amenities',
    description: 'High-speed internet, state-of-the-art technology, professional support',
  },
]

const venueCapacities = [
  {
    name: 'Conference Centers',
    theater: '500+',
    banquet: '300+',
    classroom: '200+',
  },
  {
    name: 'Hotel Meeting Rooms',
    theater: '200+',
    banquet: '150+',
    classroom: '100+',
  },
  {
    name: 'Outdoor Venues',
    theater: '1000+',
    banquet: '500+',
    classroom: 'N/A',
  },
]

export default function MeetingsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <Image
          src={getPlaceholderImage('things-to-do')}
          alt="Auburn Meeting Venue"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 via-blue-800/60 to-blue-900/70" />
        
        <div className="relative z-10 container text-center text-white px-4">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6">
            <Users className="w-10 h-10" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Meet, Connect, Inspire
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Host successful meetings and events in Auburn's unique Gold Country setting
          </p>
        </div>
      </div>

      {/* Why Auburn */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Choose Auburn for Your Event?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Combine productivity with inspiration in a destination that offers modern facilities, 
              natural beauty, and unique team-building opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyAuburn.map((reason, index) => {
              const Icon = reason.icon
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow border border-gray-100"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {reason.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Venue Capacities */}
      <section className="py-16 md:py-24">
        <div className="container max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Flexible Venues for Any Event Size
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From intimate board meetings to large conferences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {venueCapacities.map((venue, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  {venue.name}
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-blue-200">
                    <span className="text-gray-700 font-medium">Theater Style</span>
                    <span className="text-2xl font-bold text-blue-600">{venue.theater}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-blue-200">
                    <span className="text-gray-700 font-medium">Banquet Style</span>
                    <span className="text-2xl font-bold text-blue-600">{venue.banquet}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Classroom Style</span>
                    <span className="text-2xl font-bold text-blue-600">{venue.classroom}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Building */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Unique Team-Building Experiences
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Auburn's Gold Country setting offers memorable activities that strengthen teams and create lasting connections
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Outdoor Adventures',
                activities: ['Guided hiking tours', 'White-water rafting', 'Mountain biking excursions', 'Rock climbing challenges'],
              },
              {
                title: 'Gold Country Experiences',
                activities: ['Gold panning competitions', 'Historic walking tours', 'Wine tasting experiences', 'Culinary team challenges'],
              },
              {
                title: 'Problem-Solving Activities',
                activities: ['Escape room challenges', 'Scavenger hunts', 'Team building workshops', 'Leadership development'],
              },
              {
                title: 'Relaxation & Wellness',
                activities: ['Yoga sessions', 'Nature walks', 'Spa experiences', 'Mindfulness retreats'],
              },
            ].map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {category.title}
                </h3>
                <ul className="space-y-3">
                  {category.activities.map((activity, actIndex) => (
                    <li key={actIndex} className="flex items-center gap-3 text-gray-700">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Included */}
      <section className="py-16 md:py-24">
        <div className="container max-w-6xl">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Full-Service Event Support
              </h2>
              <p className="text-xl text-blue-100">
                Everything you need for a successful event, all in one place
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {[
                'AV Equipment',
                'High-Speed WiFi',
                'Catering Services',
                'Event Planning',
                'Transportation',
                'Accommodations',
                'Tech Support',
                'Custom Branding',
              ].map((service) => (
                <div key={service} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <p className="font-semibold">{service}</p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <p className="text-lg text-blue-100 mb-6">
                <Clock className="w-5 h-5 inline mr-2" />
                Dedicated event coordinator from planning to execution
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* RFP Form */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Request a Proposal
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Tell us about your event and we'll help you create an unforgettable experience
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Organization Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Contact Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Event Type
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Conference</option>
                    <option>Corporate Meeting</option>
                    <option>Team Retreat</option>
                    <option>Training</option>
                    <option>Trade Show</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Preferred Date(s)
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Number of Attendees
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Event Details & Requirements
                </label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Please describe your event needs, including venue preferences, AV requirements, catering, accommodations, and any special requests..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
              >
                Submit RFP
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-center gap-6 text-gray-600">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-600" />
                <a href="mailto:meetings@visitauburn.com" className="hover:text-blue-600">
                  meetings@visitauburn.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-blue-600" />
                <a href="tel:+15305551234" className="hover:text-blue-600">
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


