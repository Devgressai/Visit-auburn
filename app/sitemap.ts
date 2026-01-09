import { MetadataRoute } from 'next'
import { activities, events, editorials, dining, accommodations } from '@/lib/data'
import { SITE_URL } from '@/lib/seo'
import { getAllRoutes } from '@/lib/routes'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date().toISOString()
  
  // Get all static routes from route map
  const staticRoutes = getAllRoutes()
  
  const routes: MetadataRoute.Sitemap = staticRoutes.map((route) => {
    // Determine change frequency and priority based on route type
    let changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' = 'weekly'
    let priority = 0.8

    if (route === '/') {
      changeFrequency = 'daily'
      priority = 1
    } else if (route === '/events') {
      changeFrequency = 'daily'
      priority = 0.9
    } else if (['/things-to-do', '/accommodations', '/dining', '/discover', '/itineraries'].includes(route)) {
      changeFrequency = 'weekly'
      priority = 0.9
    } else if (route.startsWith('/things-to-do/') || route.startsWith('/itineraries/')) {
      changeFrequency = 'weekly'
      priority = 0.85
    } else if (route.startsWith('/plan/')) {
      changeFrequency = 'monthly'
      priority = 0.7
    }

    return {
      url: `${SITE_URL}${route}`,
      lastModified: currentDate,
      changeFrequency,
      priority,
    }
  })

  // Add activity pages
  activities.forEach((activity: any) => {
    if (activity.subHub) {
      routes.push({
        url: `${SITE_URL}/things-to-do/${activity.subHub}/${activity.slug.current}`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.8,
      })
    }
    routes.push({
      url: `${SITE_URL}/activities/${activity.slug.current}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    })
  })

  // Add event pages
  events.forEach((event: any) => {
    routes.push({
      url: `${SITE_URL}/events/${event.slug.current}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    })
  })

  // Add editorial pages
  editorials.forEach((editorial: any) => {
    routes.push({
      url: `${SITE_URL}/discover/${editorial.slug.current}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  })

  // Add restaurant/dining pages (if they have individual pages)
  dining.forEach((restaurant: any) => {
    if (restaurant.slug?.current) {
      routes.push({
        url: `${SITE_URL}/dining/${restaurant.slug.current}`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.6,
      })
    }
  })

  // Add accommodation pages (if they have individual pages)
  accommodations.forEach((accommodation: any) => {
    if (accommodation.slug?.current) {
      routes.push({
        url: `${SITE_URL}/accommodations/${accommodation.slug.current}`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.6,
      })
    }
  })

  // Add special pages
  const specialPages = [
    { url: '/search', priority: 0.5, changeFrequency: 'weekly' as const },
    { url: '/special-offers', priority: 0.7, changeFrequency: 'weekly' as const },
    { url: '/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
    { url: '/terms', priority: 0.3, changeFrequency: 'yearly' as const },
    { url: '/accessibility', priority: 0.3, changeFrequency: 'yearly' as const },
  ]

  specialPages.forEach((page) => {
    // Check if not already in routes
    if (!routes.find(r => r.url === `${SITE_URL}${page.url}`)) {
      routes.push({
        url: `${SITE_URL}${page.url}`,
        lastModified: currentDate,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
      })
    }
  })

  return routes
}
