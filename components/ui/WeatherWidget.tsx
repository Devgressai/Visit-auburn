'use client'

import { useEffect, useState } from 'react'
import { Sun, Cloud, CloudRain, Snowflake, CloudLightning, CloudFog } from 'lucide-react'
import type { WeatherData } from '@/lib/weather'

const iconMap = {
  Sun,
  Cloud,
  CloudRain,
  Snowflake,
  CloudLightning,
  CloudFog,
}

function getWeatherIcon(conditions: string) {
  const normalized = conditions.toLowerCase()
  
  if (normalized.includes('clear') || normalized.includes('sun')) return 'Sun'
  if (normalized.includes('cloud')) return 'Cloud'
  if (normalized.includes('rain')) return 'CloudRain'
  if (normalized.includes('snow')) return 'Snowflake'
  if (normalized.includes('thunder') || normalized.includes('storm')) return 'CloudLightning'
  if (normalized.includes('mist') || normalized.includes('fog')) return 'CloudFog'
  
  return 'Cloud'
}

interface WeatherWidgetProps {
  isHomepage?: boolean
}

export function WeatherWidget({ isHomepage = false }: WeatherWidgetProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('/api/weather')
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setWeather(data)
        }
      })
      .catch(error => console.error('Error loading weather:', error))
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading || !weather) {
    return null
  }

  const iconName = getWeatherIcon(weather.conditions)
  const IconComponent = iconMap[iconName as keyof typeof iconMap]

  return (
    <div 
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-sm transition-colors ${
        isHomepage 
          ? 'bg-white/10 hover:bg-white/20 text-white' 
          : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
      }`}
    >
      <IconComponent className="w-4 h-4" />
      <span className="font-semibold text-sm">
        {weather.temp}°F
      </span>
      <span className={`text-xs hidden md:inline ${isHomepage ? 'text-white/90' : 'text-gray-600'}`}>
        {weather.conditions}
      </span>
    </div>
  )
}



