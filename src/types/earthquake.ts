/**
 * Deprem verisi tip tanımlamaları
 */

export interface Earthquake {
  id: string
  location: string
  magnitude: number
  depth: number
  date: string
  latitude: number
  longitude: number
  source: 'kandilli' | 'usgs'
}

export interface EarthquakeServiceResponse {
  earthquakes: Earthquake[]
  fetchedAt: Date
  error?: string
}
