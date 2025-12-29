import { buildMetadata, SITE_URL } from '@/lib/seo'
import { FAQSection } from '@/components/plan/FAQSection'
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs'
import { RelatedPages } from '@/components/ui/RelatedPages'
import { generateBreadcrumbs } from '@/lib/routes'
import { Mail, Phone, MapPin, MessageCircle, ChevronRight } from 'lucide-react'
import Image from 'next/image'
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
    icon: Mail,
    title: 'Email Us',
    description: 'Get a response within 24 hours',
    action: 'info@visitauburn.com',
    href: 'mailto:info@visitauburn.com',
  },
  {
    icon: Phone,
    title: 'Call Us',
    description: 'Mon-Sat, 10am - 4pm',
    action: '(530) 885-5616',
    href: 'tel:+15308855616',
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    description: 'Auburn Visitor Center',
    action: '1103 High Street',
    href: '/plan/visitor-information',
  },
]

export default function FAQPage() {
  const breadcrumbs = generateBreadcrumbs('/plan/faq')

  return (
    <div className="min-h-screen bg-deep-bg">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/things-to-do.jpg"
            alt="Auburn California"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-deep-bg/90 via-deep-bg/70 to-deep-bg" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-center gap-3 mb-6">
            <MessageCircle className="w-8 h-8 text-pine-400" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary text-center mb-6 font-display">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-text-muted text-center max-w-2xl mx-auto">
            Everything you need to know before visiting Auburn, California - 
            the heart of Gold Country.
          </p>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-4">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      {/* FAQ Content */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <FAQSection />
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 md:py-28 bg-deep-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="section-eyebrow mb-4">Need More Help?</p>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 font-display">
              Still Have Questions?
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              Can't find what you're looking for? Our visitor center team is here to help 
              you plan the perfect Auburn experience.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {contactOptions.map((option) => {
              const Icon = option.icon
              const isExternal = option.href.startsWith('mailto:') || option.href.startsWith('tel:')
              
              return (
                <a
                  key={option.title}
                  href={option.href}
                  className="card-glass p-8 text-center hover:bg-white/[0.08] transition-colors group"
                >
                  <div className="w-14 h-14 rounded-full bg-pine-500/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-pine-500/30 transition-colors">
                    <Icon className="w-7 h-7 text-pine-400" />
                  </div>
                  <h3 className="font-bold text-text-primary mb-1">{option.title}</h3>
                  <p className="text-text-muted text-sm mb-3">{option.description}</p>
                  <span className="text-pine-400 font-medium group-hover:text-pine-300 transition-colors">
                    {option.action}
                  </span>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4 font-display">
              Popular Resources
            </h2>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
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
                className="inline-flex items-center gap-2 px-6 py-3 card-glass text-text-muted hover:text-pine-400 hover:bg-white/[0.08] transition-colors rounded-full"
              >
                {link.name}
                <ChevronRight className="w-4 h-4" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <RelatedPages currentPath="/plan/faq" />
    </div>
  )
}
