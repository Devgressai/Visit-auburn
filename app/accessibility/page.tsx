import { buildMetadata, SITE_URL } from '@/lib/seo'
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs'
import { RelatedPages } from '@/components/ui/RelatedPages'
import { AuburnImage } from '@/components/ui/AuburnImage'
import { generateBreadcrumbs } from '@/lib/routes'
import { Accessibility, Eye, MousePointer, Volume2, Keyboard } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const revalidate = 3600

export const metadata: Metadata = buildMetadata({
  title: 'Accessibility Statement - Visit Auburn',
  description: 'Visit Auburn is committed to making our website accessible to all users. Learn about our accessibility features and how to get help.',
  canonical: `${SITE_URL}/accessibility`,
})

export default function AccessibilityPage() {
  const breadcrumbs = generateBreadcrumbs('/accessibility')

  const accessibilityFeatures = [
    {
      icon: Keyboard,
      title: 'Keyboard Navigation',
      description: 'All interactive elements can be accessed using keyboard navigation. Use Tab to move forward, Shift+Tab to move backward, and Enter or Space to activate.',
    },
    {
      icon: Eye,
      title: 'Screen Reader Support',
      description: 'Our website is designed to work with screen readers. We use semantic HTML, ARIA labels, and proper heading structure.',
    },
    {
      icon: MousePointer,
      title: 'Clear Focus Indicators',
      description: 'Interactive elements have visible focus indicators to help users navigate the site.',
    },
    {
      icon: Volume2,
      title: 'Alternative Text',
      description: 'All images include descriptive alternative text for users who cannot see them.',
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <Breadcrumbs items={breadcrumbs} />

        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Accessibility className="w-12 h-12 text-lake-600" />
            <h1 className="text-4xl md:text-5xl font-bold text-charcoal-900 font-display">
              Accessibility Statement
            </h1>
          </div>
          
          <p className="text-lg text-charcoal-600 mb-8">
            Last updated: December 29, 2025
          </p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">Our Commitment</h2>
              <p className="text-charcoal-700 leading-relaxed mb-4">
                Visit Auburn is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards to achieve these goals. Our website serves as a gateway to discovering Auburn, California's Gold Country heritage, and we believe everyone should have equal access to information about our community's attractions, events, accommodations, and activities.
              </p>
              <p className="text-charcoal-700 leading-relaxed mb-4">
                We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards, which explain how to make web content more accessible for people with disabilities. This commitment extends to all pages on our site, including our <Link href="/things-to-do" className="text-lake-600 hover:text-lake-700 font-semibold underline">activities directory</Link>, <Link href="/events" className="text-lake-600 hover:text-lake-700 font-semibold underline">events calendar</Link>, and <Link href="/plan/visitor-information" className="text-lake-600 hover:text-lake-700 font-semibold underline">visitor information pages</Link>.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-6">Accessibility Features</h2>
              
              {/* Auburn Images */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="relative h-48 rounded-xl overflow-hidden">
                  <AuburnImage imageId="historic-old-town-clocktower" />
                </div>
                <div className="relative h-48 rounded-xl overflow-hidden">
                  <AuburnImage imageId="downtown-lincoln-way" />
                </div>
                <div className="relative h-48 rounded-xl overflow-hidden">
                  <AuburnImage imageId="outdoor-lake-clementine" />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {accessibilityFeatures.map((feature, index) => {
                  const Icon = feature.icon
                  return (
                    <div key={index} className="bg-cream-50 rounded-xl p-6 border border-charcoal-100">
                      <div className="w-12 h-12 bg-lake-100 rounded-full flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-lake-600" />
                      </div>
                      <h3 className="text-xl font-bold text-charcoal-900 mb-2 font-display">
                        {feature.title}
                      </h3>
                      <p className="text-charcoal-700 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  )
                })}
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">Areas for Improvement</h2>
              <p className="text-charcoal-700 leading-relaxed mb-4">
                We are actively working to improve the accessibility of our website. Areas we are focusing on include:
              </p>
              <ul className="list-disc list-inside space-y-2 text-charcoal-700 mb-4 ml-4">
                <li>Ensuring all interactive elements are keyboard accessible</li>
                <li>Improving color contrast ratios</li>
                <li>Adding more descriptive alternative text to images</li>
                <li>Enhancing form labels and error messages</li>
                <li>Testing with assistive technologies</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">Feedback</h2>
              <p className="text-charcoal-700 leading-relaxed mb-4">
                We welcome your feedback on the accessibility of Visit Auburn. If you encounter accessibility barriers, please let us know:
              </p>
              <ul className="list-disc list-inside space-y-2 text-charcoal-700 mb-4 ml-4">
                <li>Contact us through our website contact form</li>
                <li>Visit our visitor information center</li>
                <li>Describe the issue and the page where you encountered it</li>
              </ul>
              <p className="text-charcoal-700 leading-relaxed mb-4">
                We aim to respond to accessibility feedback within 5 business days.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">Third-Party Content</h2>
              <p className="text-charcoal-700 leading-relaxed mb-4">
                Some content on our website may be provided by third parties. We cannot guarantee the accessibility of third-party content, but we work with our partners to encourage accessible practices.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">Assistive Technologies</h2>
              <p className="text-charcoal-700 leading-relaxed mb-4">
                Our website is designed to work with common assistive technologies, including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-charcoal-700 mb-4 ml-4">
                <li>Screen readers (NVDA, JAWS, VoiceOver)</li>
                <li>Screen magnification software</li>
                <li>Voice recognition software</li>
                <li>Keyboard-only navigation</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">Browser Compatibility</h2>
              <p className="text-charcoal-700 leading-relaxed mb-4">
                We recommend using the latest versions of modern browsers (Chrome, Firefox, Safari, Edge) for the best accessibility experience. Older browsers may have limited accessibility support.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">Physical Accessibility</h2>
              <p className="text-charcoal-700 leading-relaxed mb-4">
                For information about physical accessibility of Auburn businesses, venues, and attractions, please contact individual businesses directly or visit our <Link href="/plan/visitor-information" className="text-lake-600 hover:text-lake-700 font-semibold underline">visitor information center</Link> for assistance. Many of Auburn's historic sites, parks, and recreational areas are accessible, and we're working with local businesses to improve physical accessibility throughout our community.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-4">Updates</h2>
              <p className="text-charcoal-700 leading-relaxed mb-4">
                This accessibility statement will be reviewed and updated regularly as we continue to improve our website's accessibility.
              </p>
            </section>
          </div>
        </div>
      </div>

      <RelatedPages currentPath="/accessibility" />
    </div>
  )
}

