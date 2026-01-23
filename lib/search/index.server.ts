/**
 * Server-only search index builder
 * Imports content arrays and builds search documents
 * DO NOT import this in client components
 */

import { activities, accommodations, dining, events, editorials } from '@/lib/data/content'
import { attractions, attractionTypeLabels, locationAreaLabels } from '@/data/attractions'
import { allVenues } from '@/data/venues'
import { meetingVenues } from '@/data/meetings-venues'
import type { SearchDocument } from './core'
import { cleanSnippet, buildSearchText } from './core'

/**
 * Get href for an activity
 */
function getActivityHref(activity: any): string {
  if (activity.subHub) {
    return `/things-to-do/${activity.subHub}/${activity.slug.current}`
  }
  return `/activities/${activity.slug.current}`
}

/**
 * Build all search documents from content sources
 * Server-only function
 */
export function buildSearchDocuments(): SearchDocument[] {
  const documents: SearchDocument[] = []

  // Activities
  activities.forEach((activity) => {
    if (!activity.slug?.current) return
    
    documents.push({
      id: activity._id,
      type: 'activity',
      title: activity.title,
      href: getActivityHref(activity),
      text: buildSearchText(
        activity.title,
        activity.excerpt,
        activity.description,
        activity.category,
        activity.location
      ),
      snippet: cleanSnippet(activity.excerpt || activity.title),
      tags: activity.category ? [activity.category] : undefined,
      location: activity.location?.city || 'Auburn',
    })
  })

  // Accommodations
  accommodations.forEach((accommodation) => {
    if (!accommodation.slug?.current) return
    
    documents.push({
      id: accommodation._id,
      type: 'accommodation',
      title: accommodation.title,
      href: `/accommodations/${accommodation.slug.current}`,
      text: buildSearchText(
        accommodation.title,
        accommodation.excerpt,
        accommodation.description,
        accommodation.category,
        accommodation.location
      ),
      snippet: cleanSnippet(accommodation.excerpt || accommodation.title),
      tags: accommodation.category ? [accommodation.category] : undefined,
      location: accommodation.location?.city || 'Auburn',
    })
  })

  // Dining
  dining.forEach((restaurant) => {
    if (!restaurant.slug?.current) return
    
    documents.push({
      id: restaurant._id,
      type: 'dining',
      title: restaurant.title,
      href: `/dining/${restaurant.slug.current}`,
      text: buildSearchText(
        restaurant.title,
        restaurant.excerpt,
        restaurant.description,
        restaurant.cuisine || restaurant.category,
        restaurant.location
      ),
      snippet: cleanSnippet(restaurant.excerpt || restaurant.title),
      tags: [restaurant.cuisine, restaurant.category].filter(Boolean) as string[],
      location: restaurant.location?.city || 'Auburn',
    })
  })

  // Events
  events.forEach((event) => {
    if (!event.slug?.current) return
    
    documents.push({
      id: event._id,
      type: 'event',
      title: event.title,
      href: `/events/${event.slug.current}`,
      text: buildSearchText(
        event.title,
        event.excerpt,
        event.description,
        event.category,
        event.location
      ),
      snippet: cleanSnippet(event.excerpt || event.title),
      tags: event.category ? [event.category] : undefined,
      location: event.location?.city || 'Auburn',
    })
  })

  // Editorials
  editorials.forEach((editorial) => {
    if (!editorial.slug?.current) return
    
    documents.push({
      id: editorial._id,
      type: 'editorial',
      title: editorial.title,
      href: `/discover/${editorial.slug.current}`,
      text: buildSearchText(
        editorial.title,
        editorial.excerpt,
        editorial.content,
        editorial.category
      ),
      snippet: cleanSnippet(editorial.excerpt || editorial.title),
      tags: editorial.category ? [editorial.category] : undefined,
    })
  })

  // Attractions
  attractions.forEach((attraction) => {
    documents.push({
      id: attraction.id,
      type: 'attraction',
      title: attraction.name,
      href: attraction.relatedPages[0] || '/things-to-do',
      text: buildSearchText(
        attraction.name,
        attraction.shortDescription,
        attraction.longDescription,
        attractionTypeLabels[attraction.type]
      ),
      snippet: cleanSnippet(attraction.shortDescription),
      tags: [attractionTypeLabels[attraction.type], ...(attraction.highlights || [])],
      location: locationAreaLabels[attraction.locationArea],
    })
  })

  // Venues (from venues.ts)
  allVenues.forEach((venue) => {
    documents.push({
      id: venue.id,
      type: 'venue',
      title: venue.name,
      href: `/plan/venues`,
      text: buildSearchText(
        venue.name,
        venue.description,
        undefined,
        venue.categories.join(' '),
        venue.location
      ),
      snippet: cleanSnippet(venue.description),
      tags: [...venue.categories, ...venue.amenities],
      location: venue.location.areaLabel,
    })
  })

  // Meeting Venues
  meetingVenues.forEach((venue) => {
    documents.push({
      id: `meeting-${venue.name.toLowerCase().replace(/\s+/g, '-')}`,
      type: 'venue',
      title: venue.name,
      href: `/plan/meetings`,
      text: buildSearchText(
        venue.name,
        venue.description,
        undefined,
        venue.features.join(' ')
      ),
      snippet: cleanSnippet(venue.description),
      tags: venue.features,
      location: venue.neighborhood,
    })
  })

  return documents
}
