import { buildMetadata, SITE_URL } from '@/lib/seo'
import { FAQSection } from '@/components/plan/FAQSection'
import { FAQStructuredData } from '@/components/plan/FAQStructuredData'
import { FAQSearchProvider } from '@/components/plan/FAQSearchContext'
import { faqAuburnData } from '@/lib/content/faq-auburn'
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs'
import { RelatedPages } from '@/components/ui/RelatedPages'
import { generateBreadcrumbs } from '@/lib/routes'
import { AuburnHeroImage } from '@/components/ui/AuburnImage'
import { MapPin, MessageCircle, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const revalidate = 3600

export const metadata: Metadata = buildMetadata({
  title: 'Frequently Asked Questions - Plan Your Visit to Auburn',
  description: 'Get answers to common questions about visiting Auburn, California. Learn about the best time to visit, things to do, where to stay, and practical travel information.',
  canonical: `${SITE_URL}/plan/faq`,
})

const contactOptions = [
  {
    icon: MapPin,
    title: 'California Welcome Center (Auburn)',
    description: 'Visit our visitor center',
    action: 'See official details',
    href: '/plan/visitor-information',
  },
  {
    icon: MessageCircle,
    title: 'Contact Form',
    description: 'Submit your questions online',
    action: 'Use Contact Form',
    href: '/plan/visitor-information#contact',
  },
]

export default function FAQPage() {
  const breadcrumbs = generateBreadcrumbs('/plan/faq')

  // Create initial FAQPage JSON-LD with all FAQs (for SEO)
  const allFAQs = faqAuburnData.flatMap(cat => 
    cat.items.map(item => ({ question: item.question, answer: item.answer }))
  )

  const initialFAQSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allFAQs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Initial Structured Data - All FAQs for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(initialFAQSchema) }}
      />
      
      {/* FAQ Search Provider - Manages search state */}
      <FAQSearchProvider>
        {/* Dynamic Structured Data - Updates based on search */}
        <FAQStructuredData />
      
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <AuburnHeroImage imageId="hero-old-town-clocktower">
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex items-center justify-center gap-3 mb-6">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-6 font-display">
              Auburn, CA Travel FAQ
            </h1>
            <p className="text-xl text-white/90 text-center max-w-2xl mx-auto">
              Everything you need to know before visiting Auburn, California - 
              the heart of Gold Country.
            </p>
          </div>
        </AuburnHeroImage>
      </section>

      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-4 bg-white">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      {/* FAQ Content - White background */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          {/* Intro Content */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="text-center mb-8">
              <p className="text-charcoal-700 text-lg leading-relaxed mb-6">
                Planning a <strong>day trip from Sacramento</strong> or exploring <strong>California's Gold Country</strong>? 
                <strong> Auburn, California</strong> offers world-class <strong>hiking</strong> in the American River Canyon, 
                historic <strong>Old Town</strong> with Gold Rush charm, and diverse outdoor recreation. Whether you're 
                visiting for the first time or returning to explore more, find answers to common questions about 
                visiting this charming Gold Country destination.
              </p>
              <p className="text-charcoal-700 leading-relaxed mb-6">
                From <Link href="/things-to-do" className="text-lake-600 hover:text-lake-700 font-semibold underline">things to do</Link> and 
                <Link href="/accommodations" className="text-lake-600 hover:text-lake-700 font-semibold underline"> where to stay</Link> to 
                <Link href="/dining" className="text-lake-600 hover:text-lake-700 font-semibold underline"> dining options</Link> and 
                <Link href="/plan/getting-here" className="text-lake-600 hover:text-lake-700 font-semibold underline"> getting here</Link>, 
                we've compiled answers to help you plan your perfect Auburn visit. Explore our 
                <Link href="/plan/visitor-information" className="text-lake-600 hover:text-lake-700 font-semibold underline"> visitor information</Link> page for 
                additional planning resources.
              </p>
            </div>
          </div>
          
          <FAQSection />
          
          {/* Last Updated */}
          <div className="max-w-4xl mx-auto mt-12 pt-8 border-t border-charcoal-200">
            <p className="text-sm text-charcoal-500 text-center">
              Last updated: January 2026
            </p>
          </div>
        </div>
      </section>

      {/* Contact CTA Section - Cream background */}
      <section className="py-20 md:py-28 bg-cream-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-wider text-charcoal-600 mb-4">Need More Help?</p>
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal-900 mb-4 font-display">
              Still Have Questions?
            </h2>
            <p className="text-charcoal-600 max-w-2xl mx-auto">
              Can't find what you're looking for? Our visitor center team is here to help 
              you plan the perfect Auburn experience.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {contactOptions.map((option) => {
              const Icon = option.icon
              const isExternal = option.href.startsWith('mailto:') || option.href.startsWith('tel:')
              
              return (
                <a
                  key={option.title}
                  href={option.href}
                  className="bg-white rounded-xl p-8 text-center shadow-md hover:shadow-lg transition-shadow group border border-charcoal-100"
                >
                  <div className="w-14 h-14 rounded-full bg-lake-100 flex items-center justify-center mx-auto mb-4 group-hover:bg-lake-200 transition-colors">
                    <Icon className="w-7 h-7 text-lake-600" />
                  </div>
                  <h3 className="font-bold text-charcoal-900 mb-1">{option.title}</h3>
                  <p className="text-charcoal-600 text-sm mb-3">{option.description}</p>
                  <span className="text-lake-600 font-medium group-hover:text-lake-700 transition-colors">
                    {option.action}
                  </span>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* Quick Links - White background */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-charcoal-900 mb-4 font-display">
              Popular Resources
            </h2>
            <p className="text-charcoal-600 max-w-2xl mx-auto">
              Quick access to essential Auburn visitor information and planning resources.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
            {[
              { name: 'Visitor Information', href: '/plan/visitor-information' },
              { name: 'Getting Here', href: '/plan/getting-here' },
              { name: 'Maps & Guides', href: '/plan/maps-guides' },
              { name: 'Things to Do', href: '/things-to-do' },
              { name: 'Where to Stay', href: '/accommodations' },
              { name: 'Events', href: '/events' },
            ].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="bg-cream-50 rounded-lg p-4 text-center hover:bg-lake-50 hover:border-lake-200 transition-colors border border-charcoal-100 group"
              >
                <span className="text-charcoal-900 font-semibold text-sm group-hover:text-lake-600 transition-colors block">
                  {link.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Blue accent band */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-lake-500 to-lake-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-display">
            Ready to Plan Your Visit?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Start exploring Auburn's attractions, accommodations, and experiences today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/things-to-do"
              className="bg-white text-lake-600 font-semibold px-8 py-4 rounded-lg hover:bg-cream-50 transition-colors inline-flex items-center justify-center gap-2 shadow-lg"
            >
              Explore Things to Do
              <ChevronRight className="w-5 h-5" />
            </Link>
            <Link
              href="/accommodations"
              className="border-2 border-white/70 text-white font-semibold px-8 py-4 rounded-lg hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2"
            >
              Find Places to Stay
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <RelatedPages currentPath="/plan/faq" />
      </FAQSearchProvider>
    </div>
  )
}
