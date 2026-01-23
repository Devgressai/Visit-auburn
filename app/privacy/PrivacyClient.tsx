'use client'

import { useSearchParams } from 'next/navigation'
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs'
import { RelatedPages } from '@/components/ui/RelatedPages'
import { generateBreadcrumbs } from '@/lib/routes'

export default function PrivacyClient() {
  const searchParams = useSearchParams()
  const breadcrumbs = generateBreadcrumbs('/privacy')

  // You can use searchParams here if needed
  // const someParam = searchParams?.get('param')

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <Breadcrumbs items={breadcrumbs} />

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-charcoal-900 mb-6 font-display">
            Privacy Policy
          </h1>
          <p className="text-lg text-charcoal-600 mb-8">
            Last updated: December 29, 2025
          </p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">Introduction</h2>
              <p className="text-charcoal-700 leading-relaxed mb-4">
                Visit Auburn ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website visit-auburn.com.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">Information We Collect</h2>
              <h3 className="text-xl font-semibold text-charcoal-800 mb-3">Information You Provide</h3>
              <p className="text-charcoal-700 leading-relaxed mb-4">
                We may collect information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc list-inside space-y-2 text-charcoal-700 mb-4 ml-4">
                <li>Submit forms (newsletter signup, meeting proposals, wedding inquiries)</li>
                <li>Contact us via email or phone</li>
                <li>Participate in surveys or promotions</li>
              </ul>
              <p className="text-charcoal-700 leading-relaxed mb-4">
                This information may include your name, email address, phone number, organization name, and event details.
              </p>

              <h3 className="text-xl font-semibold text-charcoal-800 mb-3 mt-6">Automatically Collected Information</h3>
              <p className="text-charcoal-700 leading-relaxed mb-4">
                When you visit our website, we may automatically collect certain information about your device, including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-charcoal-700 mb-4 ml-4">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Pages you visit and time spent on pages</li>
                <li>Referring website addresses</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">How We Use Your Information</h2>
              <p className="text-charcoal-700 leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-charcoal-700 mb-4 ml-4">
                <li>Respond to your inquiries and provide customer service</li>
                <li>Send you newsletters and promotional materials (with your consent)</li>
                <li>Process meeting and event proposals</li>
                <li>Improve our website and user experience</li>
                <li>Analyze website usage and trends</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">Information Sharing</h2>
              <p className="text-charcoal-700 leading-relaxed mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 text-charcoal-700 mb-4 ml-4">
                <li>With service providers who assist us in operating our website and conducting our business</li>
                <li>When required by law or to protect our rights</li>
                <li>With your explicit consent</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">Data Security</h2>
              <p className="text-charcoal-700 leading-relaxed mb-4">
                We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">Your Rights</h2>
              <p className="text-charcoal-700 leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-charcoal-700 mb-4 ml-4">
                <li>Access and receive a copy of your personal information</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt-out of marketing communications</li>
              </ul>
              <p className="text-charcoal-700 leading-relaxed mb-4">
                To exercise these rights, please contact us using the information provided below.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">Cookies</h2>
              <p className="text-charcoal-700 leading-relaxed mb-4">
                Our website may use cookies and similar tracking technologies to enhance your experience. You can set your browser to refuse cookies, but this may limit some website functionality.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">Third-Party Links</h2>
              <p className="text-charcoal-700 leading-relaxed mb-4">
                Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">Children's Privacy</h2>
              <p className="text-charcoal-700 leading-relaxed mb-4">
                Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">Changes to This Policy</h2>
              <p className="text-charcoal-700 leading-relaxed mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">Contact Us</h2>
              <p className="text-charcoal-700 leading-relaxed mb-4">
                If you have questions about this Privacy Policy, please contact us through our website contact form or visit our visitor information center.
              </p>
            </section>
          </div>
        </div>
      </div>

      <RelatedPages currentPath="/privacy" />
    </div>
  )
}
