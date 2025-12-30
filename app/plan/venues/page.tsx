import { buildMetadata, SITE_URL } from '@/lib/seo'
import type { Metadata } from 'next'
import { VenuesPageClient } from './VenuesPageClient'

export const revalidate = 3600

export const metadata: Metadata = buildMetadata({
  title: 'Event Venues in Auburn - Find the Perfect Space',
  description: 'Discover Auburn\'s premier event venues. From historic settings to modern facilities, find the perfect location for your wedding, meeting, festival, or celebration.',
  canonical: `${SITE_URL}/plan/venues`,
})

export default function VenuesPage() {
  return <VenuesPageClient />
}


