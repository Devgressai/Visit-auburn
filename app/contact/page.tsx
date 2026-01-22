import { buildMetadata, SITE_URL } from '@/lib/seo'
import { ContactForm } from '@/components/ui/ContactForm'
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs'
import { generateBreadcrumbs } from '@/lib/routes'
import { MessageCircle, Sparkles } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = buildMetadata({
  title: 'Contact Us - Visit Auburn, California',
  description: 'Get in touch with Visit Auburn for visitor information, trip planning assistance, and answers to your questions about exploring Auburn and Gold Country.',
  canonical: `${SITE_URL}/contact`,
})

export default function ContactPage() {
  const breadcrumbs = generateBreadcrumbs('/contact')

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
                <MessageCircle className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-gold-600" />
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Contact Us
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            We're here to help plan your perfect Auburn adventure
          </p>
        </div>
      </section>

      {/* Breadcrumbs Section */}
      <div className="container mx-auto px-4 pt-8">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      {/* Contact Form Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <ContactForm />
        </div>
      </section>

      {/* Additional Resources */}
      <section className="bg-white py-16 border-t border-charcoal-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-charcoal-900 text-center mb-12">
            Other Ways to Connect
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-cream-50 rounded-xl border border-charcoal-100">
              <h3 className="text-xl font-bold text-charcoal-900 mb-3">
                Plan a Meeting or Event
              </h3>
              <p className="text-charcoal-600 mb-4">
                Looking to host a meeting, conference, or group event in Auburn?
              </p>
              <a
                href="/plan/meetings"
                className="inline-block px-6 py-3 bg-gold-500 text-white font-semibold rounded-lg hover:bg-gold-600 transition-colors"
              >
                Request Proposal
              </a>
            </div>

            <div className="text-center p-6 bg-cream-50 rounded-xl border border-charcoal-100">
              <h3 className="text-xl font-bold text-charcoal-900 mb-3">
                Plan Your Wedding
              </h3>
              <p className="text-charcoal-600 mb-4">
                Discover romantic venues and wedding planning resources in Auburn.
              </p>
              <a
                href="/plan/weddings"
                className="inline-block px-6 py-3 bg-gold-500 text-white font-semibold rounded-lg hover:bg-gold-600 transition-colors"
              >
                Wedding Inquiry
              </a>
            </div>

            <div className="text-center p-6 bg-cream-50 rounded-xl border border-charcoal-100">
              <h3 className="text-xl font-bold text-charcoal-900 mb-3">
                Visitor Information
              </h3>
              <p className="text-charcoal-600 mb-4">
                Find maps, guides, and helpful resources for your visit.
              </p>
              <a
                href="/plan/visitor-information"
                className="inline-block px-6 py-3 bg-gold-500 text-white font-semibold rounded-lg hover:bg-gold-600 transition-colors"
              >
                View Resources
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ CTA */}
      <section className="bg-charcoal-900 py-16">
        <div className="container mx-auto px-4 max-w-3xl text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Have a Quick Question?
          </h2>
          <p className="text-xl text-charcoal-300 mb-8">
            Check out our frequently asked questions for instant answers.
          </p>
          <a
            href="/plan/faq"
            className="inline-block px-8 py-4 bg-gold-500 text-white font-bold rounded-full hover:bg-gold-600 transition-colors shadow-lg"
          >
            View FAQ
          </a>
        </div>
      </section>
    </div>
  )
}
