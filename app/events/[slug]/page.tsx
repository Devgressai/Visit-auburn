import { notFound } from 'next/navigation'
import { events } from '@/lib/data'
import { buildMetadata, breadcrumbJsonLd, eventJsonLd, SITE_URL, truncateDescription } from '@/lib/seo'
import { getImageUrl } from '@/lib/images'
import { EventDetailClient } from '@/components/events/EventDetailClient'
import type { Metadata } from 'next'

export const revalidate = 3600

function getEvent(slug: string) {
  return events.find(e => e.slug.current === slug) || null
}

function getUpcomingEvents(excludeId?: string, limit: number = 3) {
  const now = new Date()
  return events
    .filter(e => e._id !== excludeId && new Date(e.startDate) >= now)
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .slice(0, limit)
}

export async function generateStaticParams() {
  return events.map(e => ({ slug: e.slug.current }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const event = getEvent(slug)
  
  if (!event) {
    return {}
  }

  const canonical = `${SITE_URL}/events/${slug}`
  const image = event.featuredImage
    ? getImageUrl(event.featuredImage)
    : undefined

  const isPast = event.startDate ? new Date(event.startDate) < new Date() : false

  const title = `${event.title} - Events in Auburn`
  const description = truncateDescription(
    event.excerpt || `Join us for ${event.title} in Auburn, California.`
  )

  return buildMetadata({
    title,
    description,
    canonical,
    ogImage: image,
    type: 'article',
    publishedTime: event.startDate,
    noindex: isPast,
  })
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const event = getEvent(slug)

  if (!event) {
    notFound()
  }

  const isPast = event.startDate ? new Date(event.startDate) < new Date() : false
  const upcomingEvents = getUpcomingEvents(event._id, 3)
  const imageUrl = event.featuredImage ? getImageUrl(event.featuredImage) : null

  const canonical = `${SITE_URL}/events/${slug}`
  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Events', url: '/events' },
    { name: event.title, url: `/events/${slug}` },
  ])

  const eventSchema = eventJsonLd({
    name: event.title,
    description: truncateDescription(event.excerpt || event.title),
    startDate: event.startDate,
    endDate: event.endDate,
    location: event.location ? {
      name: 'Auburn, CA',
      address: event.location.address ? {
        street: event.location.address,
        city: event.location.city || 'Auburn',
        state: event.location.state || 'CA',
        zip: event.location.zip || '',
      } : undefined,
    } : undefined,
    image: imageUrl || undefined,
    url: canonical,
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />

      <EventDetailClient
        event={event}
        imageUrl={imageUrl}
        isPast={isPast}
        upcomingEvents={upcomingEvents}
      />
    </>
  )
}
