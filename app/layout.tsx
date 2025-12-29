import type { Metadata } from 'next'
import './globals.css'
import { NavigationNew } from '@/components/navigation/NavigationNew'
import { FooterNew } from '@/components/footer/FooterNew'
import { SavedItemsPill } from '@/components/ui/SavedItemsPill'
import { organizationJsonLd, touristDestinationJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: {
    default: 'Visit Auburn - Discover California\'s Gold Country',
    template: '%s | Visit Auburn',
  },
  description: 'Explore Auburn, California - your guide to accommodations, activities, dining, events, and attractions in the heart of Gold Country.',
  keywords: ['Auburn California', 'Gold Country', 'travel', 'tourism', 'accommodations', 'restaurants', 'activities', 'events', 'hiking', 'wine tasting', 'historic downtown'],
  authors: [{ name: 'Visit Auburn' }],
  manifest: '/manifest.json',
  themeColor: '#D4A017',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://visitauburn.com',
    siteName: 'Visit Auburn',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@visitauburn',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Visit Auburn',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const organizationSchema = organizationJsonLd()
  const destinationSchema = touristDestinationJsonLd()

  return (
    <html lang="en">
      <head>
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {/* Tourist Destination Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(destinationSchema) }}
        />
      </head>
      <body className="font-sans">
        <NavigationNew />
        <main>{children}</main>
        <SavedItemsPill />
        <FooterNew />
      </body>
    </html>
  )
}
