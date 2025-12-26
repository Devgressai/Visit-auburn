import { notFound } from 'next/navigation'
import { activities, accommodations, dining, events } from "@/lib/data"
import { buildMetadata, breadcrumbJsonLd, SITE_URL, truncateDescription } from '@/lib/seo'
import { getImageUrl } from "@/lib/images"
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'

export const revalidate = 3600

// Define hub configurations for static content
const HUB_CONFIG: Record<string, Record<string, { title: string; description: string; getItems: () => any[] }>> = {
  'things-to-do': {
    'outdoor-adventures': {
      title: 'Outdoor Adventures',
      description: 'Explore hiking trails, parks, and natural attractions in Auburn, California.',
      getItems: () => activities.filter(a => a.subHub === 'outdoor-adventures'),
    },
    'history-culture': {
      title: 'History & Culture',
      description: 'Discover Auburn\'s rich Gold Rush heritage and cultural attractions.',
      getItems: () => activities.filter(a => a.subHub === 'history-culture'),
    },
    'arts-culture': {
      title: 'Arts & Culture',
      description: 'Experience Auburn\'s vibrant arts scene and cultural offerings.',
      getItems: () => activities.filter(a => a.subHub === 'arts-culture'),
    },
  },
}

function getHubPage(hubType: string, subHub: string) {
  const hubConfig = HUB_CONFIG[hubType]?.[subHub]
  if (!hubConfig) return null
  
  return {
    title: hubConfig.title,
    excerpt: hubConfig.description,
    featuredItems: hubConfig.getItems(),
  }
}

export async function generateStaticParams() {
  const params: { hubType: string; subHub: string }[] = []
  
  for (const [hubType, subHubs] of Object.entries(HUB_CONFIG)) {
    for (const subHub of Object.keys(subHubs)) {
      params.push({ hubType, subHub })
    }
  }
  
  return params
}

export async function generateMetadata({ params }: { params: Promise<{ hubType: string; subHub: string }> }): Promise<Metadata> {
  const { hubType, subHub } = await params
  const hubPage = getHubPage(hubType, subHub)

  if (!hubPage) {
    return {}
  }

  const canonical = `${SITE_URL}/${hubType}/${subHub}`
  const title = `${hubPage.title} - ${hubType.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} in Auburn, CA`
  const description = truncateDescription(hubPage.excerpt || `Explore ${subHub} in Auburn, California.`)

  return buildMetadata({
    title,
    description,
    canonical,
  })
}

function getItemHref(item: any) {
  if (!item._type || !item.slug?.current) return '#'
  
  switch (item._type) {
    case 'accommodation':
      return `/accommodations/${item.slug.current}`
    case 'activity':
      if (item.subHub) {
        return `/things-to-do/${item.subHub}/${item.slug.current}`
      }
      return '#'
    case 'dining':
      return `/dining/${item.slug.current}`
    case 'event':
      return `/events/${item.slug.current}`
    default:
      return '#'
  }
}

export default async function HubPage({ params }: { params: Promise<{ hubType: string; subHub: string }> }) {
  const { hubType, subHub } = await params
  const hubPage = getHubPage(hubType, subHub)

  if (!hubPage) {
    notFound()
  }

  const canonical = `${SITE_URL}/${hubType}/${subHub}`
  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: hubType.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '), url: `/${hubType}` },
    { name: hubPage.title, url: `/${hubType}/${subHub}` },
  ])

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: hubType.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '), href: `/${hubType}` },
    { label: hubPage.title, href: `/${hubType}/${subHub}` },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <article className="min-h-screen bg-white">
        <div className="bg-gradient-to-r from-amber-600 to-orange-500 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{hubPage.title}</h1>
            {hubPage.excerpt && (
              <p className="text-xl text-amber-100">{hubPage.excerpt}</p>
            )}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Breadcrumbs items={breadcrumbItems} />

          {hubPage.featuredItems && hubPage.featuredItems.length > 0 ? (
            <div className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {hubPage.featuredItems.map((item: any) => {
                  const href = getItemHref(item)
                  const imageUrl = item.featuredImage ? getImageUrl(item.featuredImage) : null
                  
                  return (
                    <Link key={item._id} href={href} className="group block">
                      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                        {imageUrl && (
                          <div className="relative h-48 overflow-hidden">
                            <Image
                              src={imageUrl}
                              alt={item.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <div className="p-6">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
                            {item.title}
                          </h3>
                          {item.excerpt && (
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.excerpt}</p>
                          )}
                          <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                            {item.priceRange && <span>{item.priceRange}</span>}
                            {item.duration && <span>• {item.duration}</span>}
                            {item.category && <span className="bg-gray-100 px-2 py-1 rounded">{item.category}</span>}
                          </div>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No items found in this category.</p>
            </div>
          )}
        </div>
      </article>
    </>
  )
}
