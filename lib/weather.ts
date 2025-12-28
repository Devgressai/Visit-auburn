/**
 * Weather utilities for Auburn, CA
 * Uses OpenWeather API for current conditions
 */

export interface WeatherData {
  temp: number
  feelsLike: number
  conditions: string
  description: string
  icon: string
  humidity: number
  windSpeed: number
}

export async function getCurrentWeather(): Promise<WeatherData | null> {
  const apiKey = process.env.OPENWEATHER_API_KEY
  
  if (!apiKey) {
    console.warn('OpenWeather API key not configured')
    return null
  }
  
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Auburn,CA,US&appid=${apiKey}&units=imperial`,
      { next: { revalidate: 1800 } } // Cache for 30 minutes
    )
    
    if (!response.ok) {
      throw new Error('Weather API request failed')
    }
    
    const data = await response.json()
    
    return {
      temp: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      conditions: data.weather[0].main,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed),
    }
  } catch (error) {
    console.error('Error fetching weather:', error)
    return null
  }
}

export function getWeatherIconComponent(conditions: string) {
  const normalized = conditions.toLowerCase()
  
  if (normalized.includes('clear') || normalized.includes('sun')) return 'Sun'
  if (normalized.includes('cloud')) return 'Cloud'
  if (normalized.includes('rain')) return 'CloudRain'
  if (normalized.includes('snow')) return 'Snowflake'
  if (normalized.includes('thunder') || normalized.includes('storm')) return 'CloudLightning'
  if (normalized.includes('mist') || normalized.includes('fog')) return 'CloudFog'
  
  return 'Cloud'
}


