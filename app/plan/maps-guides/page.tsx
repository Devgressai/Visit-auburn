import { buildMetadata, SITE_URL } from '@/lib/seo'
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs'
import { RelatedPages } from '@/components/ui/RelatedPages'
import { generateBreadcrumbs } from '@/lib/routes'
import Image from 'next/image'
import Link from 'next/link'
import { Download, Map, FileText, Smartphone, ExternalLink, MapPin, Mountain, Utensils, Calendar, ChevronRight } from 'lucide-react'
import type { Metadata } from 'next'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Maps & Guides for Auburn, California',
    description: 'Download maps and guides for Auburn, CA. Get printable maps, digital guides, and helpful resources for exploring Gold Country.',
    canonical: `${SITE_URL}/plan/maps-guides`,
  })
}

const downloadableGuides = [
  {
    title: 'Auburn Visitor Guide',
    description: 'Comprehensive guide covering accommodations, dining, activities, and local attractions',
    type: 'PDF',
    size: '4.2 MB',
    icon: FileText,
    featured: true,
  },
  {
    title: 'Downtown Walking Map',
    description: 'Detailed map of Old Town Auburn with historic sites, shops, and restaurants marked',
    type: 'PDF',
    size: '1.8 MB',
    icon: Map,
  },
  {
    title: 'Trail Guide',
    description: 'Maps and information for hiking and biking trails in Auburn State Recreation Area',
    type: 'PDF',
    size: '3.1 MB',
    icon: Mountain,
  },
  {
    title: 'Dining Guide',
    description: 'Directory of restaurants, wineries, breweries, and cafes throughout Auburn',
    type: 'PDF',
    size: '2.4 MB',
    icon: Utensils,
  },
  {
    title: 'Events Calendar',
    description: 'Annual events, festivals, and seasonal happenings in Auburn',
    type: 'PDF',
    size: '1.2 MB',
    icon: Calendar,
  },
]

const interactiveMaps = [
  {
    title: 'Auburn Area Map',
    description: 'Explore accommodations, restaurants, attractions, and more',
    link: 'https://maps.google.com/?q=Auburn,CA',
  },
  {
    title: 'Trail System Map',
    description: 'Auburn State Recreation Area trails and access points',
    link: 'https://www.parks.ca.gov/?page_id=502',
  },
  {
    title: 'Wine Trail Map',
    description: 'Local wineries and tasting rooms in the foothills',
    link: '/dining?category=winery',
    internal: true,
  },
]

export default function MapsGuidesPage() {
  const breadcrumbs = generateBreadcrumbs('/plan/maps-guides')

  return (
    <div className="min-h-screen bg-deep-bg">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/discover.jpg"
            alt="Auburn Map"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-deep-bg/90 via-deep-bg/70 to-deep-bg" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <p className="section-eyebrow text-center mb-4">Plan Your Adventure</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary text-center mb-6 font-display">
            Maps & Guides
          </h1>
          <p className="text-xl text-text-muted text-center max-w-2xl mx-auto">
            Download helpful maps and guides to make the most of your Auburn adventure. 
            Available in print-friendly and mobile formats.
          </p>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-4">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      {/* Downloadable Guides Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="section-eyebrow mb-4">Free Downloads</p>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 font-display">
              Downloadable Guides
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              Print these guides before your trip or save them to your phone for offline access.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {downloadableGuides.map((guide) => {
              const Icon = guide.icon
              return (
                <div 
                  key={guide.title}
                  className={`card-glass p-6 relative overflow-hidden group hover:bg-white/[0.08] transition-colors ${guide.featured ? 'ring-2 ring-pine-500 md:col-span-2 lg:col-span-1' : ''}`}
                >
                  {guide.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="pine-badge">Popular</span>
                    </div>
                  )}
                  
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-pine-500/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-pine-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-text-primary mb-1">{guide.title}</h3>
                      <p className="text-text-muted text-sm">{guide.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-border-subtle">
                    <span className="text-text-muted text-sm">{guide.type} • {guide.size}</span>
                    <button className="inline-flex items-center gap-2 text-pine-400 hover:text-pine-300 font-medium text-sm group-hover:gap-3 transition-all">
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Request Physical Guide */}
          <div className="mt-12 card-glass p-8 text-center max-w-2xl mx-auto">
            <Smartphone className="w-12 h-12 text-pine-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-text-primary mb-2">Prefer a Printed Guide?</h3>
            <p className="text-text-muted mb-6">
              Visit our visitor center to pick up free printed maps and guides, 
              or request them by mail.
            </p>
            <Link href="/plan/visitor-information" className="btn-outline-pine inline-flex items-center gap-2">
              Visit Center Info
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Maps Section */}
      <section className="py-20 md:py-28 bg-deep-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="section-eyebrow mb-4">Explore Online</p>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 font-display">
              Interactive Maps
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              Use these interactive maps to plan your routes and discover points of interest.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {interactiveMaps.map((map) => (
              <a
                key={map.title}
                href={map.link}
                target={map.internal ? undefined : '_blank'}
                rel={map.internal ? undefined : 'noopener noreferrer'}
                className="card-glass p-6 hover:bg-white/[0.08] transition-colors group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <MapPin className="w-5 h-5 text-pine-400" />
                  <h3 className="text-lg font-bold text-text-primary">{map.title}</h3>
                </div>
                <p className="text-text-muted text-sm mb-4">{map.description}</p>
                <span className="inline-flex items-center gap-2 text-pine-400 text-sm font-medium group-hover:gap-3 transition-all">
                  {map.internal ? 'View Map' : 'Open Map'}
                  <ExternalLink className="w-4 h-4" />
                </span>
              </a>
            ))}
          </div>

          {/* Google Maps Embed */}
          <div className="card-glass p-2 rounded-2xl overflow-hidden max-w-4xl mx-auto">
            <div className="aspect-video bg-deep-bg rounded-xl flex items-center justify-center">
              <div className="text-center">
                <Map className="w-16 h-16 text-pine-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-text-primary mb-2">Auburn Area Map</h3>
                <p className="text-text-muted mb-6 max-w-md mx-auto">
                  Explore downtown Auburn, surrounding trails, and points of interest
                </p>
                <a 
                  href="https://maps.google.com/?q=Auburn,CA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  Open in Google Maps
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Reference Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="section-eyebrow mb-4">Quick Reference</p>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 font-display">
              Key Locations
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { name: 'Visitor Center', address: '1103 High Street' },
              { name: 'Old Town Auburn', address: 'Lincoln Way & Sacramento St' },
              { name: 'Foresthill Bridge', address: 'Foresthill Road' },
              { name: 'Auburn State Rec Area', address: 'Highway 49' },
            ].map((location) => (
              <div key={location.name} className="card-glass p-5 text-center">
                <MapPin className="w-6 h-6 text-pine-400 mx-auto mb-3" />
                <h3 className="font-bold text-text-primary mb-1">{location.name}</h3>
                <p className="text-text-muted text-sm">{location.address}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-deep-surface border-t border-border-subtle">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6 font-display">
            Ready to Explore?
          </h2>
          <p className="text-xl text-text-muted mb-8 max-w-2xl mx-auto">
            You've got the maps - now discover what Auburn has to offer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/things-to-do" className="btn-primary inline-flex items-center gap-2">
              Things to Do
              <ChevronRight className="w-5 h-5" />
            </Link>
            <Link href="/plan/getting-here" className="btn-outline-white inline-flex items-center gap-2">
              Getting Here
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <RelatedPages currentPath="/plan/maps-guides" />
    </div>
  )
}
