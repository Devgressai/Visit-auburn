import { buildMetadata, SITE_URL } from '@/lib/seo'
import { PageHero } from '@/components/ui/PageHero'
import { SpecialOffersGrid } from '@/components/offers/SpecialOffersGrid'
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs'
import { RelatedPages } from '@/components/ui/RelatedPages'
import { generateBreadcrumbs } from '@/lib/routes'
import { Tag, Gift, Sparkles } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = buildMetadata({
  title: 'Special Offers & Deals - Save on Your Auburn Visit',
  description: 'Discover exclusive deals and special offers on accommodations, dining, activities, and packages in Auburn, California. Save big on your Gold Country adventure!',
  canonical: `${SITE_URL}/special-offers`,
})

export const revalidate = 1800

interface PageProps {
  searchParams: Promise<{ category?: string }>
}

// Current special offers for Auburn, CA - Updated January 2026
const mockOffers = [
  {
    _id: '1',
    title: 'Spring Adventure Package',
    slug: { current: 'spring-adventure-package' },
    description: 'Book 2 nights and get 20% off your stay plus complimentary trail map. Perfect for spring hiking season!',
    image: { url: '/images/stay.jpg', alt: 'Auburn Hotel accommodation' },
    discountAmount: '20% OFF',
    discountType: 'percentage',
    startDate: '2026-03-01',
    endDate: '2026-05-31',
    category: 'accommodation',
    promoCode: 'SPRING26',
    bookingLink: '/accommodations',
    terms: 'Valid for stays Sun-Thurs only. Minimum 2-night stay required. Subject to availability.',
  },
  {
    _id: '2',
    title: 'Gold Rush Dining Week',
    slug: { current: 'gold-rush-dining-week' },
    description: 'Experience Auburn\'s culinary scene with special prix fixe menus at participating historic restaurants.',
    image: { url: '/images/dining.jpg', alt: 'Auburn dining in historic Old Town' },
    discountAmount: 'SPECIAL MENU',
    discountType: 'package',
    startDate: '2026-02-10',
    endDate: '2026-02-16',
    category: 'dining',
    promoCode: 'DINEWEEK26',
    bookingLink: '/dining',
    terms: 'Reservations required. Participating restaurants only. Three-course menu $45.',
  },
  {
    _id: '3',
    title: 'Summer Trail Pass',
    slug: { current: 'summer-trail-pass' },
    description: 'Get unlimited access to guided hiking tours throughout summer. Explore Auburn State Recreation Area!',
    image: { url: '/images/things-to-do.jpg', alt: 'Auburn hiking trails and outdoor recreation' },
    discountAmount: '$99',
    discountType: 'package',
    startDate: '2026-06-01',
    endDate: '2026-08-31',
    category: 'activity',
    promoCode: 'TRAILS26',
    bookingLink: '/activities',
    terms: 'Pass valid June-August 2026. Advance booking required for tours. Subject to availability.',
  },
  {
    _id: '4',
    title: 'Midweek Escape Special',
    slug: { current: 'midweek-escape-2026' },
    description: 'Save $75 on midweek stays and enjoy a quieter Auburn experience. Perfect for remote workers!',
    image: { url: '/images/stay.jpg', alt: 'Auburn lodging and accommodations' },
    discountAmount: '$75 OFF',
    discountType: 'dollar',
    startDate: '2026-01-20',
    endDate: '2026-12-20',
    category: 'accommodation',
    promoCode: 'MIDWEEK75',
    bookingLink: '/accommodations',
    terms: 'Valid Mon-Thurs only. Minimum 2-night stay required. Not valid on holidays.',
  },
  {
    _id: '5',
    title: 'Family Summer Adventure',
    slug: { current: 'family-summer-2026' },
    description: 'Family package includes lodging, breakfast daily, and passes to local attractions. Kids 12 & under stay free!',
    image: { url: '/images/things-to-do.jpg', alt: 'Family activities in Auburn' },
    discountAmount: 'FAMILY RATE',
    discountType: 'package',
    startDate: '2026-06-15',
    endDate: '2026-09-01',
    category: 'package',
    bookingLink: '/accommodations',
    terms: 'Based on availability. Up to 2 children 12 and under. Minimum 2-night stay.',
  },
  {
    _id: '6',
    title: 'Wine Country Experience',
    slug: { current: 'wine-country-2026' },
    description: 'Enjoy a complimentary wine tasting at local wineries with any dinner entrée purchase at participating restaurants.',
    image: { url: '/images/dining.jpg', alt: 'Wine and dining in Auburn Gold Country' },
    discountAmount: 'FREE TASTING',
    discountType: 'upgrade',
    startDate: '2026-01-15',
    endDate: '2026-12-15',
    category: 'dining',
    promoCode: 'WINE26',
    bookingLink: '/dining',
    terms: 'Must be 21+. One tasting voucher per entrée. Participating locations only.',
  },
  {
    _id: '7',
    title: 'Winter Getaway Package',
    slug: { current: 'winter-getaway-2026' },
    description: 'Cozy winter escape with 25% off stays, complimentary hot cocoa, and access to nearby snow activities.',
    image: { url: '/images/stay.jpg', alt: 'Auburn winter accommodation' },
    discountAmount: '25% OFF',
    discountType: 'percentage',
    startDate: '2026-12-01',
    endDate: '2026-12-31',
    category: 'accommodation',
    promoCode: 'WINTER26',
    bookingLink: '/accommodations',
    terms: 'Valid for stays through December 2026. Excludes holiday weeks. Minimum 2-night stay.',
  },
  {
    _id: '8',
    title: 'Romantic Escape for Two',
    slug: { current: 'romantic-escape-2026' },
    description: 'Perfect for couples! Includes champagne, chocolates, and a special dinner for two at a historic restaurant.',
    image: { url: '/images/dining.jpg', alt: 'Romantic dining in Auburn' },
    discountAmount: 'ROMANCE PKG',
    discountType: 'package',
    startDate: '2026-01-20',
    endDate: '2026-12-20',
    category: 'package',
    promoCode: 'ROMANCE26',
    bookingLink: '/accommodations',
    terms: 'Advance booking required. Participating hotels and restaurants only. Subject to availability.',
  },
]

export default async function SpecialOffersPage({ searchParams }: PageProps) {
  const breadcrumbs = generateBreadcrumbs('/special-offers')
  const params = await searchParams
  const category = params.category

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-gradient-to-br from-gold-500 via-gold-600 to-rust-500 overflow-hidden z-0">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
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

      {/* Breadcrumbs Section */}
      <div className="container mx-auto px-4 pt-8">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      {/* Filter Tabs */}
      <div className="bg-white border-b border-charcoal-100 sticky top-16 z-40 shadow-sm pointer-events-auto">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-hide">
            <Link
              href="/special-offers"
              className={`px-6 py-2.5 rounded-full font-semibold whitespace-nowrap transition-all cursor-pointer ${
                !category 
                  ? 'bg-gold-500 text-white hover:bg-gold-600' 
                  : 'bg-cream-100 text-charcoal-700 hover:bg-gold-100 hover:text-gold-700'
              }`}
            >
              All Offers
            </Link>
            <Link
              href="/special-offers?category=accommodation"
              className={`px-6 py-2.5 rounded-full font-semibold whitespace-nowrap transition-all cursor-pointer ${
                category === 'accommodation'
                  ? 'bg-gold-500 text-white hover:bg-gold-600'
                  : 'bg-cream-100 text-charcoal-700 hover:bg-gold-100 hover:text-gold-700'
              }`}
            >
              Accommodations
            </Link>
            <Link
              href="/special-offers?category=dining"
              className={`px-6 py-2.5 rounded-full font-semibold whitespace-nowrap transition-all cursor-pointer ${
                category === 'dining'
                  ? 'bg-gold-500 text-white hover:bg-gold-600'
                  : 'bg-cream-100 text-charcoal-700 hover:bg-gold-100 hover:text-gold-700'
              }`}
            >
              Dining
            </Link>
            <Link
              href="/special-offers?category=activity"
              className={`px-6 py-2.5 rounded-full font-semibold whitespace-nowrap transition-all cursor-pointer ${
                category === 'activity'
                  ? 'bg-gold-500 text-white hover:bg-gold-600'
                  : 'bg-cream-100 text-charcoal-700 hover:bg-gold-100 hover:text-gold-700'
              }`}
            >
              Activities
            </Link>
            <Link
              href="/special-offers?category=package"
              className={`px-6 py-2.5 rounded-full font-semibold whitespace-nowrap transition-all cursor-pointer ${
                category === 'package'
                  ? 'bg-gold-500 text-white hover:bg-gold-600'
                  : 'bg-cream-100 text-charcoal-700 hover:bg-gold-100 hover:text-gold-700'
              }`}
            >
              Packages
            </Link>
          </div>
        </div>
      </div>

      {/* Offers Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <SpecialOffersGrid offers={mockOffers} category={category} />
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
            href="/plan/visitor-information"
            className="inline-block px-8 py-4 bg-gold-500 text-white font-bold rounded-full hover:bg-gold-600 transition-colors shadow-lg"
          >
            Subscribe Now
          </Link>
        </div>
      </section>

      {/* Related Pages */}
      <RelatedPages currentPath="/special-offers" />
    </div>
  )
}
