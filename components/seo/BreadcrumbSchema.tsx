'use client'

import { useEffect } from 'react'

interface BreadcrumbSchemaProps {
  items: Array<{ label: string; href: string }>
}

/**
 * Client component that adds BreadcrumbList JSON-LD schema to a page
 * Must be used in conjunction with Breadcrumbs component for visible breadcrumbs
 */
export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  useEffect(() => {
    // Create breadcrumb schema
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.label,
        item: item.href.startsWith('http') 
          ? item.href 
          : `${window.location.origin}${item.href}`,
      })),
    }

    // Add schema to page
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(schema)
    script.id = 'breadcrumb-schema'
    document.head.appendChild(script)

    // Cleanup on unmount
    return () => {
      const existingScript = document.getElementById('breadcrumb-schema')
      if (existingScript) {
        document.head.removeChild(existingScript)
      }
    }
  }, [items])

  return null
}

