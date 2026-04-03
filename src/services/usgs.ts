import type { Earthquake, EarthquakeServiceResponse } from '../types/earthquake'

const FETCH_TIMEOUT = 10000 // 10 saniye

interface USGSFeature {
  id: string
  properties: {
    mag: number
    place: string
    time: number
    depth?: number
  }
  geometry: {
    type: 'Point'
    coordinates: [number, number, number]
  }
}

interface USGSGeoJSON {
  features: USGSFeature[]
}

/**
 * USGS GeoJSON verisini Earthquake formatına dönüştürür
 */
function parseUSGSGeoJSON(data: USGSGeoJSON): Earthquake[] {
  return data.features.map((feature) => {
    const [longitude, latitude, depth] = feature.geometry.coordinates
    
    return {
      id: `usgs-${feature.id}`,
      location: feature.properties.place,
      magnitude: feature.properties.mag,
      depth: depth || feature.properties.depth || 0,
      date: new Date(feature.properties.time).toISOString(),
      latitude,
      longitude,
      source: 'usgs',
    }
  })
}

/**
 * Fetch with timeout
 */
async function fetchWithTimeout(url: string, timeoutMs: number): Promise<Response> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs)
  
  try {
    const response = await fetch(url, { signal: controller.signal })
    clearTimeout(timeoutId)
    return response
  } catch (error) {
    clearTimeout(timeoutId)
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Bağlantı zaman aşımına uğradı (10 saniye)', { cause: error })
    }
    throw error
  }
}

/**
 * USGS deprem verilerini çeker
 * @param minMagnitude Minimum büyüklük filtresi (opsiyonel)
 * @param period Zaman aralığı: 'hour' | 'day' | 'week' | 'month'
 */
export async function fetchUSGSEarthquakes(
  minMagnitude?: number,
  period: 'hour' | 'day' | 'week' | 'month' = 'day'
): Promise<EarthquakeServiceResponse> {
  // USGS feed URL'leri büyüklük ve zaman aralığına göre
  const magnitudePath = minMagnitude 
    ? minMagnitude >= 4.5 ? '4.5' : minMagnitude >= 2.5 ? '2.5' : '1.0'
    : 'all'
  
  const periodPath = period === 'hour' ? 'hour' : period
  
  const url = `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/${magnitudePath}_${periodPath}.geojson`
  
  try {
    const response = await fetchWithTimeout(url, FETCH_TIMEOUT)
    
    if (!response.ok) {
      throw new Error(`HTTP hata: ${response.status}`)
    }
    
    const data: USGSGeoJSON = await response.json()
    const earthquakes = parseUSGSGeoJSON(data)
    
    return {
      earthquakes,
      fetchedAt: new Date(),
    }
  } catch {
    // 1 kez otomatik retry
    try {
      const response = await fetchWithTimeout(url, FETCH_TIMEOUT)
      const data: USGSGeoJSON = await response.json()
      const earthquakes = parseUSGSGeoJSON(data)
      
      return {
        earthquakes,
        fetchedAt: new Date(),
      }
    } catch (retryError) {
      const errorMessage = retryError instanceof Error 
        ? retryError.message 
        : 'USGS verisi alınamadı'
      
      return {
        earthquakes: [],
        fetchedAt: new Date(),
        error: errorMessage,
      }
    }
  }
}
