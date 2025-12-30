/**
 * ═══════════════════════════════════════════════════════════════════
 * MEETINGS & EVENTS PAGE - Auburn, California (95603)
 * ═══════════════════════════════════════════════════════════════════
 * 
 * TODO CHECKLIST:
 * [ ] Add images to /public/images/auburn/meetings/
 *     - hero-old-town.jpg
 *     - downtown-streetscape.jpg
 *     - canyon-overlook.jpg
 *     - venue-1.jpg through venue-8.jpg
 *     - team-building-1.jpg through team-building-4.jpg
 * [ ] Confirm venue list + details with Auburn Chamber of Commerce
 * [ ] Confirm contact email/phone for meetings inquiries
 * [ ] Verify nav link exists from Plan/ footer (should be in NavigationNew.tsx)
 * [ ] Test form submission endpoint
 */

import { buildMetadata, SITE_URL } from '@/lib/seo'
import { MeetingsPageClient } from './MeetingsPageClient'
import type { Metadata } from 'next'

export const revalidate = 3600

export const metadata: Metadata = buildMetadata({
  title: 'Meetings & Events in Auburn, California (95603) - Corporate Retreats & Conferences',
  description: 'Host successful meetings, conferences, and corporate retreats in Auburn, CA. Modern venues, team-building activities, and Gold Country hospitality. Easy access from Sacramento, Bay Area, and Lake Tahoe.',
  canonical: `${SITE_URL}/plan/meetings`,
})

export default function MeetingsPage() {
  return <MeetingsPageClient />
}
