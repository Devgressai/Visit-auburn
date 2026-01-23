'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { TripDuration, TripGroup, TripVibe, TripPace, TripPreferences } from '@/types/trip-builder'
import { WizardStep } from './WizardStep'
import { Button } from '@/components/ui/Button'
import { Calendar, Users, Heart, Gauge } from 'lucide-react'

const STEPS = [
  {
    id: 'duration',
    title: 'How long are you staying?',
    icon: Calendar,
  },
  {
    id: 'group',
    title: 'Who\'s traveling?',
    icon: Users,
  },
  {
    id: 'vibe',
    title: 'What\'s your vibe?',
    icon: Heart,
  },
  {
    id: 'pace',
    title: 'What pace suits you?',
    icon: Gauge,
  },
] as const

const DURATION_OPTIONS: { value: TripDuration; label: string; description: string }[] = [
  { value: '1-day', label: '1 Day', description: 'Quick visit' },
  { value: 'weekend', label: 'Weekend', description: '2-3 days' },
  { value: '3-plus-days', label: '3+ Days', description: 'Extended stay' },
]

const GROUP_OPTIONS: { value: TripGroup; label: string; description: string }[] = [
  { value: 'solo', label: 'Solo', description: 'Traveling alone' },
  { value: 'couple', label: 'Couple', description: 'Two people' },
  { value: 'family', label: 'Family', description: 'With kids' },
]

const VIBE_OPTIONS: { value: TripVibe; label: string; description: string }[] = [
  { value: 'adventure', label: 'Adventure', description: 'Hiking, outdoor activities' },
  { value: 'relaxed', label: 'Relaxed', description: 'Easy-going, flexible' },
  { value: 'food-wine', label: 'Food & Wine', description: 'Dining, wineries' },
  { value: 'history', label: 'History', description: 'Museums, heritage' },
]

const PACE_OPTIONS: { value: TripPace; label: string; description: string }[] = [
  { value: 'light', label: 'Light', description: 'Fewer activities, more rest' },
  { value: 'balanced', label: 'Balanced', description: 'Mix of activities' },
  { value: 'packed', label: 'Packed', description: 'Maximum activities' },
]

type StepOption = { value: string; label: string; description: string }

export function TripBuilderWizard() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [preferences, setPreferences] = useState<Partial<TripPreferences>>({})

  const handleSelect = (stepId: string, value: string) => {
    setPreferences(prev => ({
      ...prev,
      [stepId]: value,
    }))
  }

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleComplete()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = () => {
    const completePreferences: TripPreferences = {
      duration: preferences.duration as TripDuration || 'weekend',
      group: preferences.group as TripGroup || 'couple',
      vibe: preferences.vibe as TripVibe || 'relaxed',
      pace: preferences.pace as TripPace || 'balanced',
    }

    const params = new URLSearchParams({
      duration: completePreferences.duration,
      group: completePreferences.group,
      vibe: completePreferences.vibe,
      pace: completePreferences.pace,
    })

    router.push(`/itinerary-result?${params.toString()}`)
  }

  const currentStepData = STEPS[currentStep]
  const currentValue = preferences[currentStepData.id as keyof TripPreferences]

  let options: StepOption[] = []
  if (currentStepData.id === 'duration') options = DURATION_OPTIONS
  else if (currentStepData.id === 'group') options = GROUP_OPTIONS
  else if (currentStepData.id === 'vibe') options = VIBE_OPTIONS
  else if (currentStepData.id === 'pace') options = PACE_OPTIONS

  const canProceed = currentValue !== undefined

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {STEPS.map((step, index) => {
            const Icon = step.icon
            const isActive = index === currentStep
            const isComplete = index < currentStep
            const isUpcoming = index > currentStep

            return (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      isActive
                        ? 'bg-lake-600 text-white scale-110'
                        : isComplete
                        ? 'bg-green-600 text-white'
                        : 'bg-charcoal-200 text-charcoal-600'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`text-xs mt-2 text-center ${isActive ? 'font-semibold text-charcoal-900' : 'text-charcoal-600'}`}>
                    {step.title.split('?')[0]}
                  </span>
                </div>
                {index < STEPS.length - 1 && (
                  <div
                    className={`h-1 flex-1 mx-2 transition-all ${
                      isComplete ? 'bg-green-600' : 'bg-charcoal-200'
                    }`}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Step Content */}
      <div className="card p-8 md:p-12 mb-8">
        <h2 className="text-3xl font-bold text-charcoal-900 mb-2">
          {currentStepData.title}
        </h2>
        <p className="text-charcoal-600 mb-8">
          Select the option that best describes your trip
        </p>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {options.map((option) => {
            const isSelected = currentValue === option.value
            return (
              <button
                key={option.value}
                onClick={() => handleSelect(currentStepData.id, option.value)}
                className={`p-6 rounded-lg border-2 transition-all text-left ${
                  isSelected
                    ? 'border-lake-600 bg-lake-50 shadow-md'
                    : 'border-charcoal-200 hover:border-lake-300 hover:bg-charcoal-50'
                }`}
              >
                <h3 className="text-xl font-bold text-charcoal-900 mb-1">
                  {option.label}
                </h3>
                <p className="text-sm text-charcoal-600">
                  {option.description}
                </p>
              </button>
            )
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          onClick={handleBack}
          variant="secondary"
          disabled={currentStep === 0}
        >
          Back
        </Button>
        <Button
          onClick={handleNext}
          variant="primary"
          disabled={!canProceed}
        >
          {currentStep === STEPS.length - 1 ? 'Generate Itinerary' : 'Next'}
        </Button>
      </div>
    </div>
  )
}
