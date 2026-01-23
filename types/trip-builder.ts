export type TripDuration = '1-day' | 'weekend' | '3-plus-days'
export type TripGroup = 'solo' | 'couple' | 'family'
export type TripVibe = 'adventure' | 'relaxed' | 'food-wine' | 'history'
export type TripPace = 'light' | 'balanced' | 'packed'

export interface TripPreferences {
  duration: TripDuration
  group: TripGroup
  vibe: TripVibe
  pace: TripPace
}

export interface ItineraryDay {
  dayNumber: number
  title: string
  activities: ItineraryActivity[]
  dining: ItineraryDining[]
  events?: ItineraryEvent[]
}

export interface ItineraryActivity {
  id: string
  title: string
  time: string
  duration: string
  description: string
  location?: string
  category?: string
  link?: string
}

export interface ItineraryDining {
  id: string
  title: string
  time: string
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack'
  description: string
  cuisine?: string
  priceRange?: string
  link?: string
}

export interface ItineraryEvent {
  id: string
  title: string
  time: string
  description: string
  location?: string
  category?: string
  link?: string
}

export interface GeneratedItinerary {
  title: string
  description: string
  duration: TripDuration
  group: TripGroup
  vibe: TripVibe
  pace: TripPace
  days: ItineraryDay[]
  tips?: string[]
}
