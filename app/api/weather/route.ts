import { WeatherData } from '@/lib/weather'

export async function GET() {
  const apiKey = process.env.OPENWEATHER_API_KEY
  
  if (!apiKey) {
    return Response.json({ error: 'Weather API not configured' }, { status: 503 })
  }
  
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Auburn,CA,US&appid=${apiKey}&units=imperial`,
      { next: { revalidate: 1800 } }
    )
    
    if (!response.ok) {
      throw new Error('Weather API request failed')
    }
    
    const data = await response.json()
    
    const weatherData: WeatherData = {
      temp: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      conditions: data.weather[0].main,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed),
    }
    
    return Response.json(weatherData)
  } catch (error) {
    console.error('Error fetching weather:', error)
    return Response.json({ error: 'Failed to fetch weather' }, { status: 500 })
  }
}




