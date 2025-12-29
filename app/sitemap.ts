import { MetadataRoute } from 'next'
import { activities, events, editorials } from '@/lib/data'
import { SITE_URL } from '@/lib/seo'
import { getAllRoutes } from '@/lib/routes'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
      lastModified: new Date(),
      changeFrequency,
      priority,
    }
  })

  // Add activity pages
  activities.forEach((activity: any) => {
    if (activity.subHub) {
      routes.push({
        url: `${SITE_URL}/things-to-do/${activity.subHub}/${activity.slug.current}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      })
    }
    routes.push({
      url: `${SITE_URL}/activities/${activity.slug.current}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    })
  })

  // Add event pages
  events.forEach((event: any) => {
    routes.push({
      url: `${SITE_URL}/events/${event.slug.current}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    })
  })

  // Add editorial pages
  editorials.forEach((editorial: any) => {
    routes.push({
      url: `${SITE_URL}/discover/${editorial.slug.current}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  })

  return routes
}
