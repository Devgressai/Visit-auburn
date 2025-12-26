import { buildMetadata, SITE_URL } from '@/lib/seo'
import { FAQSection } from '@/components/plan/FAQSection'
import { Mail, Phone, MapPin } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = buildMetadata({
  title: 'Frequently Asked Questions - Plan Your Visit to Auburn',
  description: 'Get answers to common questions about visiting Auburn, California. Learn about the best time to visit, things to do, where to stay, and practical travel information.',
  canonical: `${SITE_URL}/plan/faq`,
})

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white py-16 md:py-24">
        <div className="container">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center">
            Frequently Asked Questions
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto text-center leading-relaxed">
            Everything you need to know before visiting Auburn, California
          </p>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="container py-16 md:py-24">
        <FAQSection />

        {/* Contact CTA */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Still Have Questions?
          </h2>
          <p className="text-lg text-gray-600 mb-8 text-center max-w-2xl mx-auto">
            Can't find what you're looking for? Our visitor center team is here to help 
            you plan the perfect Auburn experience.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Mail className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Email Us</h3>
              <a 
                href="mailto:info@visitauburn.com" 
                className="text-blue-600 hover:text-blue-700 hover:underline"
              >
                info@visitauburn.com
              </a>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Phone className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Call Us</h3>
              <a 
                href="tel:+15305551234" 
                className="text-blue-600 hover:text-blue-700 hover:underline"
              >
                (530) 555-1234
              </a>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <MapPin className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Visit Us</h3>
              <p className="text-gray-600">
                1103 High Street<br />
                Auburn, CA 95603
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

