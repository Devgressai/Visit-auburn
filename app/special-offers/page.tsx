import { buildMetadata, SITE_URL } from '@/lib/seo'
import { PageHero } from '@/components/ui/PageHero'
import { SpecialOffersGrid } from '@/components/offers/SpecialOffersGrid'
import { Tag, Gift, Sparkles } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = buildMetadata({
  title: 'Special Offers & Deals - Save on Your Auburn Visit',
  description: 'Discover exclusive deals and special offers on accommodations, dining, activities, and packages in Auburn, California. Save big on your Gold Country adventure!',
  canonical: `${SITE_URL}/special-offers`,
})

export const revalidate = 1800

const mockOffers = [
  {
    _id: '1',
    title: 'Summer Escape Package',
    slug: { current: 'summer-escape-package' },
    description: 'Book 2 nights and get the 3rd night free at participating hotels. Perfect for extended summer getaways!',
    image: { url: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80', alt: 'Auburn Hotel' },
    discountAmount: '33% OFF',
    discountType: 'package',
    startDate: '2025-06-01',
    endDate: '2025-08-31',
    category: 'accommodation',
    promoCode: 'SUMMER33',
    bookingLink: '/accommodations',
    terms: 'Valid for stays Sun-Thurs only. Blackout dates may apply.',
  },
  {
    _id: '2',
    title: 'Gold Rush Dining Experience',
    slug: { current: 'gold-rush-dining' },
    description: 'Enjoy 20% off dinner at select historic downtown restaurants. Taste the flavors of Gold Country!',
    image: { url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80', alt: 'Auburn Dining' },
    discountAmount: '20% OFF',
    discountType: 'percentage',
    startDate: '2025-01-01',
    endDate: '2026-01-05',
    category: 'dining',
    promoCode: 'GOLDRUSH20',
    bookingLink: '/dining',
    terms: 'Valid for dinner service only. Participating restaurants only.',
  },
  {
    _id: '3',
    title: 'Trail Adventure Bundle',
    slug: { current: 'trail-adventure-bundle' },
    description: 'Get 25% off guided hiking tours and mountain bike rentals. Explore Auburn State Recreation Area!',
    image: { url: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80', alt: 'Auburn Trails' },
    discountAmount: '25% OFF',
    discountType: 'percentage',
    startDate: '2025-03-01',
    endDate: '2025-12-31',
    category: 'activity',
    promoCode: 'TRAILS25',
    bookingLink: '/activities',
    terms: 'Advance booking required. Subject to availability.',
  },
  {
    _id: '4',
    title: 'Midweek Special',
    slug: { current: 'midweek-special' },
    description: 'Save on accommodations Sunday through Thursday. The perfect excuse for a midweek escape.',
    image: { url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80', alt: 'Auburn Lodging' },
    discountAmount: '$50 OFF',
    discountType: 'dollar',
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    category: 'accommodation',
    promoCode: 'MIDWEEK50',
    bookingLink: '/accommodations',
    terms: 'Valid Sun-Thurs only. Minimum 2-night stay required.',
  },
  {
    _id: '5',
    title: 'Family Fun Package',
    slug: { current: 'family-fun-package' },
    description: 'Special family rate includes accommodation, breakfast, and tickets to local attractions. Kids stay free!',
    image: { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', alt: 'Family Activities' },
    discountAmount: 'SPECIAL RATE',
    discountType: 'package',
    startDate: '2025-06-15',
    endDate: '2025-09-15',
    category: 'package',
    bookingLink: '/accommodations',
    terms: 'Based on availability. Up to 2 children 12 and under.',
  },
  {
    _id: '6',
    title: 'Wine & Dine Experience',
    slug: { current: 'wine-dine-experience' },
    description: 'Complimentary wine tasting flight with purchase of entrée at participating restaurants.',
    image: { url: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&q=80', alt: 'Wine and Dining' },
    discountAmount: 'FREE WINE',
    discountType: 'upgrade',
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    category: 'dining',
    promoCode: 'WINEDINE',
    bookingLink: '/dining',
    terms: 'Must be 21+. One wine flight per entrée.',
  },
]

export default function SpecialOffersPage() {
  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-gradient-to-br from-gold-500 via-gold-600 to-rust-500 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-white rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Gift className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-gold-600" />
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Special Offers & Deals
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Save big on your Auburn adventure with exclusive offers on stays, dining, and activities
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="bg-white border-b border-charcoal-100 sticky top-16 z-30 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-hide">
            <Link
              href="/special-offers"
              className="px-6 py-2.5 rounded-full font-semibold whitespace-nowrap transition-all bg-gold-500 text-white"
            >
              All Offers
            </Link>
            <Link
              href="/special-offers?category=accommodation"
              className="px-6 py-2.5 rounded-full font-semibold whitespace-nowrap transition-all bg-cream-100 text-charcoal-700 hover:bg-gold-100 hover:text-gold-700"
            >
              Accommodations
            </Link>
            <Link
              href="/special-offers?category=dining"
              className="px-6 py-2.5 rounded-full font-semibold whitespace-nowrap transition-all bg-cream-100 text-charcoal-700 hover:bg-gold-100 hover:text-gold-700"
            >
              Dining
            </Link>
            <Link
              href="/special-offers?category=activity"
              className="px-6 py-2.5 rounded-full font-semibold whitespace-nowrap transition-all bg-cream-100 text-charcoal-700 hover:bg-gold-100 hover:text-gold-700"
            >
              Activities
            </Link>
            <Link
              href="/special-offers?category=package"
              className="px-6 py-2.5 rounded-full font-semibold whitespace-nowrap transition-all bg-cream-100 text-charcoal-700 hover:bg-gold-100 hover:text-gold-700"
            >
              Packages
            </Link>
          </div>
        </div>
      </div>

      {/* Offers Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <SpecialOffersGrid offers={mockOffers} />
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-charcoal-900 py-16">
        <div className="container mx-auto px-4 max-w-3xl text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Never Miss a Deal
          </h2>
          <p className="text-xl text-charcoal-300 mb-8">
            Subscribe to our newsletter and be the first to know about new special offers.
          </p>
          <Link
            href="/#newsletter"
            className="inline-block px-8 py-4 bg-gold-500 text-white font-bold rounded-full hover:bg-gold-600 transition-colors shadow-lg"
          >
            Subscribe Now
          </Link>
        </div>
      </section>
    </div>
  )
}
