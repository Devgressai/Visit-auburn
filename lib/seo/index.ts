/**
 * SEO utilities index
 * Export all SEO helpers for centralized access
 */

export * from './site'
export * from './metadata'
export * from './jsonld'

// Re-export named constants from site
export { SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE } from './site'

// Legacy exports for backwards compatibility
export { buildMetadata as generateMetadata } from './metadata'
export { organizationJsonLd as generateOrganizationSchema } from './jsonld'
export { breadcrumbJsonLd as generateBreadcrumbSchema } from './jsonld'
export { eventJsonLd as generateEventSchema } from './jsonld'
export { localBusinessJsonLd as generateLocalBusinessSchema } from './jsonld'
export { articleJsonLd as generateArticleSchema } from './jsonld'

