'use client'

import { Button } from '@/components/ui/Button'
import { Share2, Calendar } from 'lucide-react'

interface ItineraryActionsProps {
  itineraryTitle: string
}

export function ItineraryActions({ itineraryTitle }: ItineraryActionsProps) {
  const handleShare = () => {
    if (typeof window !== 'undefined') {
      const url = window.location.href
      if (navigator.share) {
        navigator.share({
          title: itineraryTitle,
          text: `Check out my Auburn itinerary: ${itineraryTitle}`,
          url,
        }).catch(() => {
          // Fallback to copy
          navigator.clipboard.writeText(url)
          alert('Link copied to clipboard!')
        })
      } else {
        navigator.clipboard.writeText(url)
        alert('Link copied to clipboard!')
      }
    }
  }

  return (
    <div className="max-w-4xl mx-auto mb-8 flex flex-wrap gap-4 justify-center">
      <Button
        onClick={handleShare}
        variant="primary"
        className="flex items-center gap-2"
      >
        <Share2 className="w-5 h-5" />
        Share Itinerary
      </Button>
      <Button
        href="/itineraries"
        variant="secondary"
        className="flex items-center gap-2"
      >
        <Calendar className="w-5 h-5" />
        Browse All Itineraries
      </Button>
      <Button
        href="/trip-builder"
        variant="ghost"
      >
        Build Another Trip
      </Button>
    </div>
  )
}
