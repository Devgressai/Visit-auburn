import { Suspense } from 'react'
import { buildMetadata, SITE_URL } from '@/lib/seo'
import type { Metadata } from 'next'
import PrivacyClient from './PrivacyClient'

export const revalidate = 3600

export const metadata: Metadata = buildMetadata({
  title: 'Privacy Policy - Visit Auburn',
  description: 'Privacy policy for Visit Auburn website. Learn how we collect, use, and protect your personal information.',
  canonical: `${SITE_URL}/privacy`,
})

export default function PrivacyPage() {
  return (
    <Suspense fallback={<div className="min-h-[200px]" />}>
      <PrivacyClient />
    </Suspense>
  )
}

