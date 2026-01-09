import { buildMetadata, SITE_URL } from '@/lib/seo'
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs'
import { RelatedPages } from '@/components/ui/RelatedPages'
import { generateBreadcrumbs } from '@/lib/routes'
import { AuburnHeroImage } from '@/components/ui/AuburnImage'
import Link from 'next/link'
import { Download, Map, FileText, Smartphone, ExternalLink, MapPin, Mountain, Utensils, Calendar, ChevronRight, Navigation, Camera } from 'lucide-react'
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
    description: 'Complete guide to accommodations, dining, activities, and attractions in Auburn and Placer County',
    type: 'PDF',
    size: '4.2 MB',
    icon: FileText,
    featured: true,
    downloadUrl: '/downloads/auburn-visitor-guide.pdf',
  },
  {
    title: 'Old Town Auburn Walking Map',
    description: 'Historic downtown map featuring Gold Rush-era buildings, museums, shops, and restaurants along Lincoln Way',
    type: 'PDF',
    size: '1.8 MB',
    icon: Map,
    downloadUrl: '/downloads/old-town-walking-map.pdf',
  },
  {
    title: 'Auburn State Recreation Area Trail Guide',
    description: 'Comprehensive trail maps for hiking, mountain biking, and equestrian trails along the American River',
    type: 'PDF',
    size: '3.1 MB',
    icon: Mountain,
    downloadUrl: '/downloads/trail-guide.pdf',
  },
  {
    title: 'Gold Country Dining & Wine Guide',
    description: 'Directory of restaurants, wineries, breweries, and cafes throughout Auburn and the Sierra Foothills',
    type: 'PDF',
    size: '2.4 MB',
    icon: Utensils,
    downloadUrl: '/downloads/dining-wine-guide.pdf',
  },
  {
    title: 'Auburn Events & Festivals Calendar',
    description: 'Annual events including Gold Rush Days, Auburn Old Town Farmers Market, and seasonal celebrations',
    type: 'PDF',
    size: '1.2 MB',
    icon: Calendar,
    downloadUrl: '/downloads/events-calendar.pdf',
  },
  {
    title: 'Historic Sites & Museums Guide',
    description: 'Map and guide to Auburn\'s Gold Rush heritage sites, museums, and historic landmarks',
    type: 'PDF',
    size: '1.9 MB',
    icon: Camera,
    downloadUrl: '/downloads/historic-sites-guide.pdf',
  },
]

const interactiveMaps = [
  {
    title: 'Auburn Area Map',
    description: 'Explore accommodations, restaurants, attractions, and points of interest throughout Auburn',
    link: 'https://maps.google.com/?q=Auburn,CA',
    icon: MapPin,
  },
  {
    title: 'Auburn State Recreation Area',
    description: 'Interactive trail maps for the 30+ miles of trails along the North and Middle Forks of the American River',
    link: 'https://www.parks.ca.gov/?page_id=502',
    icon: Mountain,
  },
  {
    title: 'Placer County Wine Trail',
    description: 'Map of local wineries and tasting rooms in Auburn and the surrounding Sierra Foothills',
    link: '/dining?category=winery',
    internal: true,
    icon: Utensils,
  },
  {
    title: 'Historic Gold Rush Sites',
    description: 'Interactive map of historic sites, museums, and Gold Rush-era landmarks in Auburn',
    link: '/things-to-do/history-culture',
    internal: true,
    icon: Camera,
  },
]

const keyLocations = [
  { 
    name: 'Auburn Visitor Center', 
    address: '1103 High Street, Auburn, CA 95603',
    description: 'Start here for maps, brochures, and local recommendations',
  },
  { 
    name: 'Old Town Auburn', 
    address: 'Lincoln Way & Sacramento Street',
    description: 'Historic downtown with shops, restaurants, and Gold Rush architecture',
  },
  { 
    name: 'Foresthill Bridge', 
    address: 'Foresthill Road, Auburn',
    description: 'California\'s second-highest bridge, offering spectacular canyon views',
  },
  { 
    name: 'Auburn State Recreation Area', 
    address: 'Highway 49, Auburn',
    description: '30+ miles of trails along the American River canyons',
  },
  {
    name: 'Placer County Museum',
    address: '101 Maple Street, Auburn',
    description: 'Gold Rush history and artifacts in the historic courthouse',
  },
  {
    name: 'Auburn Old Town Farmers Market',
    address: 'Lincoln Way, Old Town Auburn',
    description: 'Saturday morning market (8am-12pm) with local produce and crafts',
  },
]

export default function MapsGuidesPage() {
  const breadcrumbs = generateBreadcrumbs('/plan/maps-guides')

  return (
    <div className="min-h-screen bg-white">
      {/* ═══════════════════════════════════════════════════════════════════
          HERO SECTION - Cinematic style with Auburn map/guide image
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[450px] md:min-h-[500px] w-full overflow-hidden">
        <AuburnHeroImage imageId="hero-old-town-clocktower" contentPosition="bottom-left">
          <div className="relative z-10">
            <p 
              className="uppercase tracking-[0.2em] text-sm font-medium mb-4 text-white/80"
              style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}
            >
              Plan Your Adventure
            </p>
            <h1 
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              style={{ textShadow: '0 4px 20px rgba(0,0,0,0.6)' }}
            >
              Maps & Guides
            </h1>
            <p 
              className="text-lg md:text-xl text-white/90 max-w-2xl"
              style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}
            >
              Download helpful maps and guides to make the most of your Auburn adventure. 
              Available in print-friendly and mobile formats.
            </p>
          </div>
        </AuburnHeroImage>
      </section>

      {/* Breadcrumbs */}
      <div className="bg-cream-50 border-b border-charcoal-100">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumbs items={breadcrumbs} />
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          DOWNLOADABLE GUIDES SECTION - White background
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="section-eyebrow-light mb-4">Free Downloads</p>
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal-900 mb-4 font-display">
              Downloadable Guides
            </h2>
            <p className="text-charcoal-600 max-w-2xl mx-auto">
              Print these guides before your trip or save them to your phone for offline access. 
              All guides are updated annually with current information.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {downloadableGuides.map((guide) => {
              const Icon = guide.icon
              return (
                <div 
                  key={guide.title}
                  className={`bg-white rounded-2xl border p-6 shadow-card hover:shadow-card-hover transition-shadow duration-300 relative overflow-hidden ${
                    guide.featured 
                      ? 'border-forest-500 ring-2 ring-forest-500/20 md:col-span-2 lg:col-span-1' 
                      : 'border-charcoal-100'
                  }`}
                >
                  {guide.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-forest-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-forest-500/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-forest-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-charcoal-900 mb-1">{guide.title}</h3>
                      <p className="text-charcoal-600 text-sm">{guide.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-charcoal-100">
                    <span className="text-charcoal-600 text-sm">{guide.type} • {guide.size}</span>
                    <a 
                      href={guide.downloadUrl} 
                      download 
                      className="inline-flex items-center gap-2 text-forest-600 hover:text-forest-700 font-semibold text-sm transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </a>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Request Physical Guide */}
          <div className="mt-12 bg-cream-50 rounded-2xl border border-charcoal-100 p-8 text-center max-w-2xl mx-auto shadow-card">
            <Smartphone className="w-12 h-12 text-forest-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-charcoal-900 mb-2">Prefer a Printed Guide?</h3>
            <p className="text-charcoal-600 mb-6">
              Visit our visitor center at 1103 High Street to pick up free printed maps and guides, 
              or request them by mail. Our friendly staff can help you plan your perfect Auburn adventure.
            </p>
            <Link 
              href="/plan/visitor-information" 
              className="btn-outline-pine inline-flex items-center gap-2"
            >
              Visit Center Info
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          INTERACTIVE MAPS SECTION - Cream background
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-cream-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="section-eyebrow-light mb-4">Explore Online</p>
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal-900 mb-4 font-display">
              Interactive Maps
            </h2>
            <p className="text-charcoal-600 max-w-2xl mx-auto">
              Use these interactive maps to plan your routes and discover points of interest throughout 
              Auburn and Placer County.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {interactiveMaps.map((map) => {
              const Icon = map.icon
              const MapComponent = map.internal ? Link : 'a'
              const props = map.internal 
                ? { href: map.link }
                : { href: map.link, target: '_blank', rel: 'noopener noreferrer' }
              
              return (
                <MapComponent
                  key={map.title}
                  {...props}
                  className="bg-white rounded-2xl border border-charcoal-100 p-6 shadow-card hover:shadow-card-hover transition-shadow duration-300 group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Icon className="w-5 h-5 text-forest-500" />
                    <h3 className="text-lg font-bold text-charcoal-900">{map.title}</h3>
                  </div>
                  <p className="text-charcoal-600 text-sm mb-4">{map.description}</p>
                  <span className="inline-flex items-center gap-2 text-forest-600 text-sm font-semibold group-hover:gap-3 transition-all">
                    {map.internal ? 'View Map' : 'Open Map'}
                    <ExternalLink className="w-4 h-4" />
                  </span>
                </MapComponent>
              )
            })}
          </div>

          {/* Google Maps Embed */}
          <div className="bg-white rounded-2xl border border-charcoal-100 p-2 shadow-card overflow-hidden max-w-4xl mx-auto">
            <div className="aspect-video bg-cream-50 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <Map className="w-16 h-16 text-forest-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-charcoal-900 mb-2">Auburn Area Map</h3>
                <p className="text-charcoal-600 mb-6 max-w-md mx-auto">
                  Explore downtown Auburn, surrounding trails, and points of interest throughout Placer County
                </p>
                <a 
                  href="https://maps.google.com/?q=Auburn,CA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-pine inline-flex items-center gap-2"
                >
                  Open in Google Maps
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          KEY LOCATIONS SECTION - White background
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="section-eyebrow-light mb-4">Quick Reference</p>
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal-900 mb-4 font-display">
              Key Locations
            </h2>
            <p className="text-charcoal-600 max-w-2xl mx-auto">
              Essential addresses and landmarks to help you navigate Auburn and make the most of your visit.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {keyLocations.map((location) => (
              <div 
                key={location.name} 
                className="bg-white rounded-2xl border border-charcoal-100 p-6 shadow-card hover:shadow-card-hover transition-shadow duration-300"
              >
                <MapPin className="w-6 h-6 text-forest-500 mx-auto mb-3" />
                <h3 className="font-bold text-charcoal-900 mb-1 text-center">{location.name}</h3>
                <p className="text-charcoal-600 text-sm mb-2 text-center">{location.address}</p>
                <p className="text-charcoal-500 text-xs text-center">{location.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          CTA SECTION - Blue accent band matching homepage
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-br from-lake-500 to-lake-600 text-white">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-display">
            Ready to Explore?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            You've got the maps - now discover what Auburn has to offer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/things-to-do" 
              className="bg-white text-lake-600 font-semibold px-8 py-4 rounded-lg hover:bg-cream-50 transition-colors inline-flex items-center justify-center gap-2 shadow-lg"
            >
              Things to Do
              <ChevronRight className="w-5 h-5" />
            </Link>
            <Link 
              href="/plan/getting-here" 
              className="border-2 border-white/70 text-white font-semibold px-8 py-4 rounded-lg hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2"
            >
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
