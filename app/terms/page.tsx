import { buildMetadata, SITE_URL } from '@/lib/seo'
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs'
import { RelatedPages } from '@/components/ui/RelatedPages'
import { generateBreadcrumbs } from '@/lib/routes'
import type { Metadata } from 'next'

export const revalidate = 3600

export const metadata: Metadata = buildMetadata({
  title: 'Legal Disclaimer - Visit Auburn',
  description: 'Legal disclaimer and terms of use for Visit Auburn website.',
  canonical: `${SITE_URL}/terms`,
})

export default function TermsPage() {
  const breadcrumbs = generateBreadcrumbs('/terms')

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <Breadcrumbs items={breadcrumbs} />

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-charcoal-900 mb-6 font-display">
            Legal Disclaimer
          </h1>
          <p className="text-lg text-charcoal-600 mb-8">
            Last updated: December 29, 2025
          </p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">Website Terms of Use</h2>
              <p className="text-charcoal-700 leading-relaxed mb-4">
                By accessing and using the Visit Auburn website (visit-auburn.com), you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">Accuracy of Information</h2>
              <p className="text-charcoal-700 leading-relaxed mb-4">
                While we strive to provide accurate and up-to-date information about Auburn, California, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information, products, services, or related graphics contained on this website.
              </p>
              <p className="text-charcoal-700 leading-relaxed mb-4">
                Information regarding businesses, venues, events, accommodations, and services is provided for informational purposes only. We recommend that you verify all information directly with the relevant businesses or organizations before making travel plans or reservations.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">Third-Party Content</h2>
              <p className="text-charcoal-700 leading-relaxed mb-4">
                Our website may include links to third-party websites, services, and content. We do not endorse or assume responsibility for the content, privacy policies, or practices of any third-party websites or services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">Limitation of Liability</h2>
              <p className="text-charcoal-700 leading-relaxed mb-4">
                Visit Auburn, its affiliates, and contributors shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use this website, including but not limited to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-charcoal-700 mb-4 ml-4">
                <li>Errors or omissions in content</li>
                <li>Interruptions in service</li>
                <li>Loss of data or profits</li>
                <li>Travel or accommodation issues</li>
                <li>Business or event cancellations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">Business Listings</h2>
              <p className="text-charcoal-700 leading-relaxed mb-4">
                Business listings, venue information, and service descriptions are provided for informational purposes. We do not guarantee:
              </p>
              <ul className="list-disc list-inside space-y-2 text-charcoal-700 mb-4 ml-4">
                <li>Availability of services or accommodations</li>
                <li>Pricing accuracy</li>
                <li>Business hours or operational status</li>
                <li>Quality or suitability of services</li>
              </ul>
              <p className="text-charcoal-700 leading-relaxed mb-4">
                All reservations, bookings, and transactions are made directly with the respective businesses, and their terms and conditions apply.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">Event Information</h2>
              <p className="text-charcoal-700 leading-relaxed mb-4">
                Event dates, times, and details are subject to change without notice. We recommend confirming event information directly with event organizers before making travel plans.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">Intellectual Property</h2>
              <p className="text-charcoal-700 leading-relaxed mb-4">
                All content on this website, including text, graphics, logos, images, and software, is the property of Visit Auburn or its content suppliers and is protected by copyright and other intellectual property laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">User Conduct</h2>
              <p className="text-charcoal-700 leading-relaxed mb-4">
                You agree not to use this website:
              </p>
              <ul className="list-disc list-inside space-y-2 text-charcoal-700 mb-4 ml-4">
                <li>For any unlawful purpose</li>
                <li>To transmit harmful code or malware</li>
                <li>To interfere with website functionality</li>
                <li>To collect user information without consent</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">Changes to Terms</h2>
              <p className="text-charcoal-700 leading-relaxed mb-4">
                We reserve the right to modify these terms at any time. Your continued use of the website after any changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">Governing Law</h2>
              <p className="text-charcoal-700 leading-relaxed mb-4">
                These terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">Contact</h2>
              <p className="text-charcoal-700 leading-relaxed mb-4">
                If you have questions about these terms, please contact us through our website contact form or visit our visitor information center.
              </p>
            </section>
          </div>
        </div>
      </div>

      <RelatedPages currentPath="/terms" />
    </div>
  )
}

