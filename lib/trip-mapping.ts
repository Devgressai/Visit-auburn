import type { TripPreferences, GeneratedItinerary, ItineraryDay } from '@/types/trip-builder'
import { activities, dining, events } from '@/lib/data/content'

/**
 * Maps user preferences to a generated itinerary
 * Uses deterministic logic based on existing itinerary templates
 */
export function generateItinerary(preferences: TripPreferences): GeneratedItinerary {
  const { duration, group, vibe, pace } = preferences

  // Base template selection based on vibe and group
  const template = selectTemplate(vibe, group, duration)
  
  // Generate days based on duration
  const days = generateDays(template, duration, pace, group)

  // Generate title and description
  const title = generateTitle(vibe, group, duration)
  const description = generateDescription(vibe, group, duration, pace)

  // Generate tips
  const tips = generateTips(vibe, group, pace)

  return {
    title,
    description,
    duration,
    group,
    vibe,
    pace,
    days,
    tips,
  }
}

type TemplateKey = 'weekend-getaway' | 'outdoor-adventure' | 'gold-rush-history' | 'family-fun' | 'romantic-escape'

function selectTemplate(vibe: string, group: string, duration: string): TemplateKey {
  // Primary selection by vibe
  if (vibe === 'adventure') return 'outdoor-adventure'
  if (vibe === 'history') return 'gold-rush-history'
  if (vibe === 'food-wine') return 'romantic-escape'
  if (vibe === 'relaxed') {
    // Secondary selection by group
    if (group === 'family') return 'family-fun'
    return 'weekend-getaway'
  }
  
  // Fallback by group
  if (group === 'family') return 'family-fun'
  if (group === 'couple') return 'romantic-escape'
  return 'weekend-getaway'
}

function generateDays(template: TemplateKey, duration: string, pace: string, group: string): ItineraryDay[] {
  const dayCount = getDayCount(duration)
  const days: ItineraryDay[] = []

  for (let i = 1; i <= dayCount; i++) {
    const day = generateDay(i, template, duration, pace, group, dayCount)
    days.push(day)
  }

  return days
}

function getDayCount(duration: string): number {
  switch (duration) {
    case '1-day': return 1
    case 'weekend': return 2
    case '3-plus-days': return 3
    default: return 2
  }
}

function generateDay(
  dayNumber: number,
  template: TemplateKey,
  duration: string,
  pace: string,
  group: string,
  totalDays: number
): ItineraryDay {
  const isFirstDay = dayNumber === 1
  const isLastDay = dayNumber === totalDays

  let title = ''
  let activities: ItineraryDay['activities'] = []
  let dining: ItineraryDay['dining'] = []
  let dayEvents: ItineraryDay['events'] = []

  // Day 1 - Arrival/Introduction
  if (isFirstDay) {
    title = duration === '1-day' ? 'Your Auburn Day' : 'Day 1: Arrival & Introduction'
    
    if (template === 'outdoor-adventure') {
      activities = [
        {
          id: 'arrival',
          title: 'Check-In & Settle',
          time: '3:00 PM',
          duration: '30 min',
          description: 'Check into your accommodation and get ready for your Auburn adventure.',
        },
        {
          id: 'old-town-walk',
          title: 'Old Town Walking Tour',
          time: '4:00 PM',
          duration: '60 min',
          description: 'Explore historic Old Town Auburn with its Gold Rush-era buildings, shops, and galleries.',
          location: 'Old Town Auburn',
          category: 'Walking Tour',
        },
      ]
      dining = [
        {
          id: 'dinner-1',
          title: 'Dinner in Old Town',
          time: '6:30 PM',
          mealType: 'dinner',
          description: 'Enjoy farm-to-table dining in one of Old Town\'s historic restaurants.',
        },
      ]
    } else if (template === 'gold-rush-history') {
      activities = [
        {
          id: 'arrival',
          title: 'Check-In',
          time: '2:00 PM',
          duration: '30 min',
          description: 'Check into your accommodation.',
        },
        {
          id: 'visitor-center',
          title: 'Auburn Visitor Center',
          time: '3:00 PM',
          duration: '45 min',
          description: 'Start at the Visitor Center for maps, walking tour guides, and Gold Rush history overview.',
          location: '601 Lincoln Way',
          category: 'Museum',
        },
        {
          id: 'old-town-tour',
          title: 'Historic Old Town Walking Tour',
          time: '4:00 PM',
          duration: '90 min',
          description: 'Self-guided tour of 1850s buildings including Firehouse Tower, Union Bar Building, and historic markers.',
          location: 'Old Town Auburn',
          category: 'Walking Tour',
        },
      ]
      dining = [
        {
          id: 'dinner-1',
          title: 'Historic Restaurant Dinner',
          time: '6:00 PM',
          mealType: 'dinner',
          description: 'Dine in a Gold Rush-era building with California cuisine.',
        },
      ]
    } else if (template === 'family-fun') {
      activities = [
        {
          id: 'arrival',
          title: 'Check-In',
          time: '2:00 PM',
          duration: '30 min',
          description: 'Check into your family-friendly accommodation.',
        },
        {
          id: 'quarry-ponds',
          title: 'Quarry Ponds Loop Trail',
          time: '3:00 PM',
          duration: '90 min',
          description: 'Easy 3-mile family-friendly trail with ponds, wildlife spotting, and picnic areas.',
          location: 'Rock Creek Road',
          category: 'Hiking',
        },
      ]
      dining = [
        {
          id: 'dinner-1',
          title: 'Family-Friendly Dinner',
          time: '6:00 PM',
          mealType: 'dinner',
          description: 'Kid-approved dining in Old Town with outdoor patios.',
        },
      ]
    } else if (template === 'romantic-escape') {
      activities = [
        {
          id: 'arrival',
          title: 'Check-In',
          time: '3:00 PM',
          duration: '30 min',
          description: 'Check into your romantic accommodation.',
        },
        {
          id: 'old-town-stroll',
          title: 'Old Town Stroll',
          time: '4:00 PM',
          duration: '60 min',
          description: 'Leisurely walk through Old Town, browse galleries, and enjoy the historic ambiance.',
          location: 'Old Town Auburn',
          category: 'Sightseeing',
        },
      ]
      dining = [
        {
          id: 'wine-tasting',
          title: 'Wine Tasting',
          time: '5:00 PM',
          mealType: 'snack',
          description: 'Sierra Foothills wine tasting at a local winery.',
        },
        {
          id: 'dinner-1',
          title: 'Romantic Dinner',
          time: '7:00 PM',
          mealType: 'dinner',
          description: 'Intimate farm-to-table dinner in a historic setting.',
        },
      ]
    } else {
      // weekend-getaway default
      activities = [
        {
          id: 'arrival',
          title: 'Check-In & Settle',
          time: '3:00 PM',
          duration: '30 min',
          description: 'Check into your Auburn accommodation.',
        },
        {
          id: 'old-town',
          title: 'Old Town Exploration',
          time: '4:00 PM',
          duration: '90 min',
          description: 'Explore Old Town Auburn\'s historic district, shops, and galleries.',
          location: 'Old Town Auburn',
          category: 'Sightseeing',
        },
      ]
      dining = [
        {
          id: 'dinner-1',
          title: 'Dinner in Old Town',
          time: '6:00 PM',
          mealType: 'dinner',
          description: 'Farm-to-table dining in a historic Gold Rush building.',
        },
      ]
    }
  }

  // Day 2 - Main Activities
  if (dayNumber === 2 || (dayNumber === 1 && duration === '1-day')) {
    if (duration === '1-day') {
      title = 'Your Auburn Day'
    } else {
      title = 'Day 2: Main Adventure'
    }

    if (template === 'outdoor-adventure') {
      activities = [
        {
          id: 'breakfast',
          title: 'Early Breakfast',
          time: '7:00 AM',
          duration: '30 min',
          description: 'Fuel up for a day of hiking.',
        },
        {
          id: 'lake-clementine',
          title: 'Lake Clementine Trail',
          time: '8:00 AM',
          duration: '4 hours',
          description: pace === 'packed' 
            ? 'Full 10-mile loop with canyon views, river access, and multiple swimming holes.'
            : pace === 'balanced'
            ? '8-mile out-and-back hike with stunning North Fork American River views.'
            : '6-mile scenic hike with plenty of photo stops and rest breaks.',
          location: 'Lake Clementine Road',
          category: 'Hiking',
        },
        {
          id: 'river-swim',
          title: 'River Swimming & Lunch',
          time: '12:00 PM',
          duration: '90 min',
          description: 'Cool off in American River swimming holes and enjoy a riverside picnic.',
          location: 'Lake Clementine',
          category: 'Swimming',
        },
      ]
      dining = [
        {
          id: 'lunch-2',
          title: 'Post-Hike Lunch',
          time: '2:00 PM',
          mealType: 'lunch',
          description: 'Refuel at a local restaurant or brewery.',
        },
        {
          id: 'dinner-2',
          title: 'Celebration Dinner',
          time: '7:00 PM',
          mealType: 'dinner',
          description: 'Well-deserved dinner after your hiking adventure.',
        },
      ]
    } else if (template === 'gold-rush-history') {
      activities = [
        {
          id: 'breakfast',
          title: 'Breakfast',
          time: '9:00 AM',
          duration: '45 min',
          description: 'Start your day with breakfast in Old Town.',
        },
        {
          id: 'gold-museum',
          title: 'Gold Country Museum',
          time: '10:00 AM',
          duration: '2 hours',
          description: 'Explore Gold Rush history with mine replica, gold panning, and authentic equipment.',
          location: '1273 High Street',
          category: 'Museum',
        },
        {
          id: 'bernhard-museum',
          title: 'Bernhard Museum Complex',
          time: '1:00 PM',
          duration: '90 min',
          description: 'Visit 1851 Victorian hotel and winery with period furnishings.',
          location: '291 Auburn Folsom Road',
          category: 'Museum',
        },
      ]
      dining = [
        {
          id: 'lunch-2',
          title: 'Lunch',
          time: '12:00 PM',
          mealType: 'lunch',
          description: 'Lunch break between museum visits.',
        },
        {
          id: 'dinner-2',
          title: 'Historic Dinner',
          time: '6:00 PM',
          mealType: 'dinner',
          description: 'Dine in a historic Gold Rush building.',
        },
      ]
    } else if (template === 'family-fun') {
      activities = [
        {
          id: 'breakfast',
          title: 'Breakfast',
          time: '9:00 AM',
          duration: '45 min',
          description: 'Family breakfast to start the day.',
        },
        {
          id: 'hidden-falls',
          title: 'Hidden Falls Easy Trail',
          time: '10:00 AM',
          duration: '2 hours',
          description: 'Kid-friendly 2-mile hike to a beautiful waterfall with picnic tables.',
          location: '7587 Mears Place',
          category: 'Hiking',
        },
        {
          id: 'gold-panning',
          title: 'Gold Country Museum',
          time: '1:00 PM',
          duration: '90 min',
          description: 'Kids love the mine replica and gold panning (they keep what they find!).',
          location: '1273 High Street',
          category: 'Museum',
        },
      ]
      dining = [
        {
          id: 'lunch-2',
          title: 'Family Lunch',
          time: '12:00 PM',
          mealType: 'lunch',
          description: 'Kid-friendly lunch with outdoor seating.',
        },
        {
          id: 'dinner-2',
          title: 'Family Dinner',
          time: '6:00 PM',
          mealType: 'dinner',
          description: 'Family-friendly restaurant with kids menu.',
        },
      ]
    } else if (template === 'romantic-escape') {
      activities = [
        {
          id: 'breakfast',
          title: 'Leisurely Breakfast',
          time: '9:00 AM',
          duration: '60 min',
          description: 'Relaxed breakfast together.',
        },
        {
          id: 'scenic-hike',
          title: 'Scenic Trail Walk',
          time: '10:30 AM',
          duration: '2 hours',
          description: pace === 'packed'
            ? 'Moderate 6-mile hike with canyon views.'
            : 'Easy 3-mile walk with beautiful scenery.',
          location: 'Quarry Ponds or Lake Clementine',
          category: 'Hiking',
        },
        {
          id: 'wine-tasting-2',
          title: 'Winery Visit',
          time: '2:00 PM',
          duration: '90 min',
          description: 'Sierra Foothills winery tasting with scenic views.',
          location: 'Local Winery',
          category: 'Wine Tasting',
        },
      ]
      dining = [
        {
          id: 'lunch-2',
          title: 'Lunch',
          time: '12:30 PM',
          mealType: 'lunch',
          description: 'Light lunch at a local cafe.',
        },
        {
          id: 'dinner-2',
          title: 'Romantic Dinner',
          time: '7:00 PM',
          mealType: 'dinner',
          description: 'Intimate dinner with Sierra Foothills wines.',
        },
      ]
    } else {
      // weekend-getaway
      activities = [
        {
          id: 'breakfast',
          title: 'Breakfast',
          time: '8:00 AM',
          duration: '45 min',
          description: 'Fuel up for the day.',
        },
        {
          id: 'lake-clementine',
          title: 'Lake Clementine Trail',
          time: '9:00 AM',
          duration: '3-4 hours',
          description: pace === 'packed'
            ? 'Full 8-mile hike with canyon views.'
            : '6-mile scenic hike with photo stops.',
          location: 'Lake Clementine Road',
          category: 'Hiking',
        },
      ]
      dining = [
        {
          id: 'lunch-2',
          title: 'Post-Hike Lunch',
          time: '1:00 PM',
          mealType: 'lunch',
          description: 'Lunch in Auburn after your hike.',
        },
        {
          id: 'dinner-2',
          title: 'Special Dinner',
          time: '6:30 PM',
          mealType: 'dinner',
          description: 'Celebrate your Auburn adventure.',
        },
      ]
    }
  }

  // Day 3 - Final Day
  if (dayNumber === 3) {
    title = 'Day 3: Final Exploration'

    if (template === 'outdoor-adventure') {
      activities = [
        {
          id: 'breakfast',
          title: 'Breakfast',
          time: '8:00 AM',
          duration: '45 min',
          description: 'Early breakfast for your final hike.',
        },
        {
          id: 'hidden-falls',
          title: 'Hidden Falls Extended Loop',
          time: '9:00 AM',
          duration: '4-5 hours',
          description: pace === 'packed'
            ? 'Full 12-mile backcountry loop with waterfall and ridge views.'
            : '6-mile loop to waterfall and back.',
          location: '7587 Mears Place',
          category: 'Hiking',
        },
      ]
      dining = [
        {
          id: 'lunch-3',
          title: 'Trail Lunch',
          time: '12:00 PM',
          mealType: 'lunch',
          description: 'Picnic lunch on the trail.',
        },
        {
          id: 'dinner-3',
          title: 'Farewell Dinner',
          time: '6:00 PM',
          mealType: 'dinner',
          description: 'Final Auburn dinner before departure.',
        },
      ]
    } else if (template === 'gold-rush-history') {
      activities = [
        {
          id: 'breakfast',
          title: 'Breakfast',
          time: '9:00 AM',
          duration: '45 min',
          description: 'Final breakfast in Auburn.',
        },
        {
          id: 'courthouse',
          title: 'Placer County Courthouse',
          time: '10:00 AM',
          duration: '60 min',
          description: 'Historic courthouse with museum exhibits.',
          location: '101 Maple Street',
          category: 'Museum',
        },
        {
          id: 'final-stroll',
          title: 'Final Old Town Stroll',
          time: '11:30 AM',
          duration: '60 min',
          description: 'Last exploration of Old Town before departure.',
          location: 'Old Town Auburn',
          category: 'Sightseeing',
        },
      ]
      dining = [
        {
          id: 'lunch-3',
          title: 'Final Lunch',
          time: '12:30 PM',
          mealType: 'lunch',
          description: 'Last meal in Auburn before heading home.',
        },
      ]
    } else if (template === 'family-fun') {
      activities = [
        {
          id: 'breakfast',
          title: 'Breakfast',
          time: '9:00 AM',
          duration: '45 min',
          description: 'Family breakfast.',
        },
        {
          id: 'old-town-scavenger',
          title: 'Old Town Scavenger Hunt',
          time: '10:00 AM',
          duration: '90 min',
          description: 'Fun scavenger hunt through historic Old Town.',
          location: 'Old Town Auburn',
          category: 'Activity',
        },
      ]
      dining = [
        {
          id: 'lunch-3',
          title: 'Final Family Lunch',
          time: '12:00 PM',
          mealType: 'lunch',
          description: 'Last family meal in Auburn.',
        },
      ]
    } else if (template === 'romantic-escape') {
      activities = [
        {
          id: 'breakfast',
          title: 'Leisurely Breakfast',
          time: '9:00 AM',
          duration: '60 min',
          description: 'Final breakfast together.',
        },
        {
          id: 'art-galleries',
          title: 'Art Galleries & Shopping',
          time: '10:30 AM',
          duration: '2 hours',
          description: 'Browse Old Town galleries and shops.',
          location: 'Old Town Auburn',
          category: 'Shopping',
        },
      ]
      dining = [
        {
          id: 'brunch',
          title: 'Brunch',
          time: '11:00 AM',
          mealType: 'breakfast',
          description: 'Extended brunch before departure.',
        },
      ]
    } else {
      // weekend-getaway
      activities = [
        {
          id: 'breakfast',
          title: 'Breakfast',
          time: '9:00 AM',
          duration: '45 min',
          description: 'Sunday breakfast.',
        },
        {
          id: 'gold-museum',
          title: 'Gold Country Museum',
          time: '10:00 AM',
          duration: '90 min',
          description: 'Explore Gold Rush history and try gold panning.',
          location: '1273 High Street',
          category: 'Museum',
        },
        {
          id: 'final-stroll',
          title: 'Final Old Town Stroll',
          time: '12:00 PM',
          duration: '60 min',
          description: 'Last exploration of Old Town.',
          location: 'Old Town Auburn',
          category: 'Sightseeing',
        },
      ]
      dining = [
        {
          id: 'lunch-3',
          title: 'Final Lunch',
          time: '1:00 PM',
          mealType: 'lunch',
          description: 'Last meal before departure.',
        },
      ]
    }
  }

  // Adjust activities based on pace
  if (pace === 'light' && activities.length > 3) {
    activities = activities.slice(0, 3)
  } else if (pace === 'packed' && dayNumber !== 1) {
    // Add optional activities for packed pace
    if (template === 'outdoor-adventure' && dayNumber === 2) {
      activities.push({
        id: 'optional-bike',
        title: 'Optional: Mountain Biking',
        time: '4:00 PM',
        duration: '2 hours',
        description: 'Explore Auburn\'s mountain bike trails if energy permits.',
        category: 'Biking',
      })
    }
  }

  return {
    dayNumber,
    title,
    activities,
    dining,
    events: dayEvents.length > 0 ? dayEvents : undefined,
  }
}

function generateTitle(vibe: string, group: string, duration: string): string {
  const durationText = duration === '1-day' ? 'Day' : duration === 'weekend' ? 'Weekend' : 'Getaway'
  const groupText = group === 'family' ? 'Family' : group === 'couple' ? 'Romantic' : ''
  const vibeText = vibe === 'adventure' ? 'Adventure' : vibe === 'history' ? 'History' : vibe === 'food-wine' ? 'Food & Wine' : ''
  
  if (groupText && vibeText) {
    return `${groupText} ${vibeText} ${durationText}`
  } else if (vibeText) {
    return `${vibeText} ${durationText}`
  } else if (groupText) {
    return `${groupText} ${durationText}`
  }
  return `Your Auburn ${durationText}`
}

function generateDescription(vibe: string, group: string, duration: string, pace: string): string {
  const durationText = duration === '1-day' ? 'day' : duration === 'weekend' ? 'weekend' : 'extended stay'
  const paceText = pace === 'light' ? 'relaxed' : pace === 'packed' ? 'action-packed' : 'balanced'
  
  let desc = `A ${paceText} ${durationText} in Auburn, California, perfect for `
  
  if (group === 'family') {
    desc += 'families with kid-friendly activities, easy trails, and educational experiences.'
  } else if (group === 'couple') {
    desc += 'couples seeking romantic experiences, scenic views, and intimate dining.'
  } else {
    desc += 'exploring Auburn\'s best attractions at your own pace.'
  }
  
  if (vibe === 'adventure') {
    desc += ' Focus on outdoor activities, hiking, and nature exploration.'
  } else if (vibe === 'history') {
    desc += ' Deep dive into Gold Rush heritage, museums, and historic sites.'
  } else if (vibe === 'food-wine') {
    desc += ' Emphasis on local dining, wine tasting, and culinary experiences.'
  } else {
    desc += ' Balanced mix of activities, dining, and relaxation.'
  }
  
  return desc
}

function generateTips(vibe: string, group: string, pace: string): string[] {
  const tips: string[] = []
  
  if (group === 'family') {
    tips.push('Pack plenty of snacks and water for kids on trails.')
    tips.push('Many restaurants have kids menus and outdoor patios.')
    tips.push('Start activities early in the morning when kids have more energy.')
  }
  
  if (vibe === 'adventure') {
    tips.push('Wear sturdy hiking shoes and bring layers for changing weather.')
    tips.push('Arrive at trailheads early (before 9am) to secure parking.')
    tips.push('Pack a swimsuit for river swimming opportunities.')
  }
  
  if (vibe === 'history') {
    tips.push('Most museums are open Tuesday-Sunday, check hours before visiting.')
    tips.push('Allow extra time for gold panning—it\'s more fun than expected!')
    tips.push('Old Town walking tour maps are available at the Visitor Center.')
  }
  
  if (pace === 'packed') {
    tips.push('This is an active itinerary—comfortable shoes are essential.')
    tips.push('Stay hydrated and take breaks when needed.')
  } else if (pace === 'light') {
    tips.push('Feel free to skip activities if you need more rest time.')
    tips.push('Many activities can be shortened or extended based on your energy.')
  }
  
  tips.push('Old Town parking is free in public lots.')
  tips.push('Check local event calendars for special events during your visit.')
  
  return tips
}
