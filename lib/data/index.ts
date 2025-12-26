/**
 * Static content exports
 * Centralized export for all site content data
 */

// Re-export all mock content for easy imports
export { 
  activities as mockActivities,
  accommodations as mockAccommodations,
  dining as mockDining,
  events as mockEvents,
  editorials as mockEditorials,
  homepage as mockHomepage,
  navigation as mockNavigation,
  featured as mockFeatured
} from './content'

// Also export without mock prefix for compatibility
export { 
  activities,
  accommodations,
  dining,
  events,
  editorials,
  homepage,
  navigation,
  featured
} from './content'


