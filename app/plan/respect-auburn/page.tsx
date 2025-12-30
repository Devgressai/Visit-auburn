import { buildMetadata, SITE_URL } from '@/lib/seo'
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs'
import { RelatedPages } from '@/components/ui/RelatedPages'
import { generateBreadcrumbs } from '@/lib/routes'
import { AuburnHeroImage } from '@/components/ui/AuburnImage'
import Link from 'next/link'
import { Leaf, Heart, Trash2, Camera, MapPin, Users, ShoppingBag, ChevronRight } from 'lucide-react'
import type { Metadata } from 'next'

export const revalidate = 3600

export const metadata: Metadata = buildMetadata({
  title: 'Respect Auburn - Responsible Tourism Guidelines',
  description: 'Learn how to be a responsible visitor to Auburn, California. Follow our principles to help preserve Auburn\'s history, nature, and community.',
  canonical: `${SITE_URL}/plan/respect-auburn`,
})

const principles = [
  {
    icon: Leaf,
    title: 'Leave No Trace',
    tagline: 'Pack it in, pack it out',
    description: 'Carry out everything you bring in. Use designated trash and recycling bins. Leave natural areas as you found them—or better.',
    tips: [
      'Bring a small bag for your trash',
      'Stay on marked trails',
      'Don\'t pick wildflowers or disturb wildlife',
      'Use reusable water bottles',
    ],
  },
  {
    icon: Heart,
    title: 'Respect History',
    tagline: 'Preserve our Gold Rush heritage',
    description: 'Auburn\'s historic buildings and sites are treasures. Help us protect them for future generations to enjoy and learn from.',
    tips: [
      'Don\'t climb on historic structures',
      'Take photos, not artifacts',
      'Follow posted guidelines at heritage sites',
      'Support local preservation efforts',
    ],
  },
  {
    icon: Trash2,
    title: 'Keep It Clean',
    tagline: 'Leave it better than you found it',
    description: 'Help maintain the beauty of our trails, parks, and public spaces. A clean Auburn is a welcoming Auburn.',
    tips: [
      'Pick up litter when you see it',
      'Use proper waste disposal',
      'Report vandalism or damage',
      'Participate in local clean-up events',
    ],
  },
  {
    icon: Camera,
    title: 'Share Responsibly',
    tagline: 'Inspire others the right way',
    description: 'Social media helps others discover Auburn. Share your experiences while encouraging responsible behavior.',
    tips: [
      'Tag @VisitAuburn in your posts',
      'Don\'t geotag sensitive areas',
      'Show responsible recreation',
      'Inspire others to respect nature',
    ],
  },
  {
    icon: MapPin,
    title: 'Stay on Trails',
    tagline: 'Protect native habitats',
    description: 'Our trails are carefully designed to let you enjoy nature while protecting delicate ecosystems and preventing erosion.',
    tips: [
      'Walk single file on narrow trails',
      'Don\'t create shortcuts',
      'Yield to uphill hikers',
      'Keep dogs on designated trails',
    ],
  },
  {
    icon: Users,
    title: 'Support Local',
    tagline: 'Strengthen our community',
    description: 'When you shop and dine locally, you support Auburn families and help maintain our unique character.',
    tips: [
      'Eat at locally-owned restaurants',
      'Shop at local boutiques and markets',
      'Stay at locally-owned accommodations',
      'Hire local guides and outfitters',
    ],
  },
]

export default function RespectAuburnPage() {
  const breadcrumbs = generateBreadcrumbs('/plan/respect-auburn')

  return (
    <div className="min-h-screen bg-deep-bg">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <AuburnHeroImage imageId="outdoor-hidden-falls">
          <div className="container mx-auto px-4 relative z-10">
            <div className="pine-badge mb-6 mx-auto flex items-center justify-center w-fit">
              <Leaf className="w-4 h-4 mr-2" />
              Responsible Tourism
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-6 font-display">
              Respect Auburn
            </h1>
            <p className="text-xl text-white/90 text-center max-w-2xl mx-auto">
              The stunning trails. The rich history. The welcoming community. 
              It all starts with mutual respect. Here's how to keep Auburn awesome.
            </p>
          </div>
        </AuburnHeroImage>
      </section>

      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-4">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      {/* Principles Grid */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {principles.map((principle) => {
              const Icon = principle.icon
              return (
                <div key={principle.title} className="card-glass p-8">
                  <div className="w-14 h-14 rounded-full bg-pine-500 flex items-center justify-center mb-6 shadow-lg shadow-pine-500/20">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-text-primary mb-2 font-display">
                    {principle.title}
                  </h3>
                  <p className="text-pine-400 font-medium text-sm mb-4">
                    {principle.tagline}
                  </p>
                  <p className="text-text-muted mb-6">
                    {principle.description}
                  </p>
                  
                  <div className="pt-6 border-t border-border-subtle">
                    <p className="text-xs uppercase tracking-wider text-text-muted mb-3">How to help:</p>
                    <ul className="space-y-2">
                      {principle.tips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-text-muted">
                          <span className="text-pine-400 mt-1">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why It Matters Section */}
      <section className="py-20 md:py-28 bg-deep-surface">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <p className="section-eyebrow mb-4">The Big Picture</p>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 font-display">
                Why Responsible Tourism Matters
              </h2>
            </div>
            
            <div className="space-y-6 text-text-muted text-lg leading-relaxed">
              <p>
                Auburn is more than just a destination—it's a living community with 
                175 years of history, pristine natural areas, and residents who call this 
                place home. As visitor numbers grow, so does our responsibility to protect 
                what makes Auburn special.
              </p>
              
              <p>
                By following these simple principles, you help ensure that Auburn's 
                Gold Rush heritage sites remain intact, our trails and natural areas 
                stay beautiful, and our local businesses continue to thrive.
              </p>
              
              <p>
                Every action counts. Whether it's picking up a piece of litter on the trail, 
                choosing a local restaurant over a chain, or simply being courteous to residents, 
                you're making a positive impact on Auburn's future.
              </p>
            </div>

            <div className="mt-12 card-glass p-8 border-l-4 border-pine-500">
              <h3 className="text-xl font-bold text-text-primary mb-2 font-display">
                Thank You
              </h3>
              <p className="text-text-muted">
                We appreciate your commitment to being a responsible visitor. 
                Together, we can keep Auburn beautiful, authentic, and welcoming 
                for generations to come.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pledge Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6 font-display">
              Take the Pledge
            </h2>
            <p className="text-text-muted mb-8">
              Commit to being a responsible visitor and help us protect Auburn 
              for future generations.
            </p>
            
            <div className="card-glass p-8 text-left mb-8">
              <p className="text-text-primary italic text-lg leading-relaxed">
                "I pledge to respect Auburn's history, protect its natural beauty, 
                support its local community, and leave it better than I found it. 
                I will be a responsible visitor and inspire others to do the same."
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/things-to-do" className="btn-primary inline-flex items-center gap-2">
                Explore Responsibly
                <ChevronRight className="w-5 h-5" />
              </Link>
              <Link href="/plan/visitor-information" className="btn-outline-white inline-flex items-center gap-2">
                Visitor Information
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <RelatedPages currentPath="/plan/respect-auburn" />
    </div>
  )
}
