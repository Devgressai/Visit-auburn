import { Metadata } from 'next'
import { SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE } from './site'

export interface MetadataOptions {
  title: string
  description: string
  canonical?: string
  ogImage?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  noindex?: boolean
}

/**
 * Build Next.js Metadata object from SEO options
 */
export function buildMetadata(options: MetadataOptions): Metadata {
  const {
    title,
    description,
    canonical,
    ogImage,
    type = 'website',
    publishedTime,
    modifiedTime,
    author,
    noindex = false,
  } = options

  const canonicalUrl = canonical || SITE_URL
  const imageUrl = ogImage ? (ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`) : `${SITE_URL}${DEFAULT_OG_IMAGE}`

  return {
    title,
    description,
    robots: noindex
      ? { index: false, follow: true }
      : {
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
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      images: [{ url: imageUrl }],
      type,
      publishedTime,
      modifiedTime,
      ...(author && { authors: [author] }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  }
}

/**
 * Truncate text to a safe length for SEO descriptions
 */
export function truncateDescription(text: string, maxLength: number = 160): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength - 3).trim() + '...'
}



