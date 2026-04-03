import type { Earthquake, EarthquakeServiceResponse } from '../types/earthquake'

const KANDILLI_RSS_URL = 'http://www.koeri.boun.edu.tr/rss.php'
const FETCH_TIMEOUT = 10000 // 10 saniye

/**
 * Kandilli RSS XML'ini parse eder (regex tabanlı)
 */
function parseKandilliXML(xmlText: string): Earthquake[] {
  const earthquakes: Earthquake[] = []
  
  // <item> etiketlerini regex ile bul
  const itemRegex = /<item>([\s\S]*?)<\/item>/g
  let itemMatch
  
  while ((itemMatch = itemRegex.exec(xmlText)) !== null) {
    const itemContent = itemMatch[1]
    
    // title etiketini bul
    const titleMatch = itemContent.match(/<title>(.*?)<\/title>/)
    const descriptionMatch = itemContent.match(/<description>(.*?)<\/description>/)
    
    const title = titleMatch ? titleMatch[1] : ''
    const description = descriptionMatch ? descriptionMatch[1] : ''
    
    // Başlık formatı: "Tarih Saat Büyüklük Yer Derinlik"
    // Örnek: "2024.01.15 14:30:00 3.5 İstanbul 10.0"
    const parsedTitle = title.match(/(\d{4}\.\d{2}\.\d{2})\s+(\d{2}:\d{2}:\d{2})\s+([\d.]+)\s+(.+?)\s+([\d.]+)/)
    
    if (parsedTitle) {
      const [, date, time, magnitude, location, depth] = parsedTitle
      
      // Açıklamadan koordinatları çıkar
      const latMatch = description.match(/Enlem:\s*([\d.]+)/)
      const lonMatch = description.match(/Boylam:\s*([\d.]+)/)
      
      const latitude = latMatch ? parseFloat(latMatch[1]) : 0
      const longitude = lonMatch ? parseFloat(lonMatch[1]) : 0
      
      earthquakes.push({
        id: `kandilli-${date}-${time}`,
        location: location.trim(),
        magnitude: parseFloat(magnitude),
        depth: parseFloat(depth),
        date: new Date(`${date.replace(/\./g, '-')}T${time}`).toISOString(),
        latitude,
        longitude,
        source: 'kandilli',
      })
    }
  }
  
  return earthquakes
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
 * Kandilli deprem verilerini çeker
 */
export async function fetchKandilliEarthquakes(): Promise<EarthquakeServiceResponse> {
  try {
    const response = await fetchWithTimeout(KANDILLI_RSS_URL, FETCH_TIMEOUT)
    
    if (!response.ok) {
      throw new Error(`HTTP hata: ${response.status}`)
    }
    
    const xmlText = await response.text()
    const earthquakes = parseKandilliXML(xmlText)
    
    return {
      earthquakes,
      fetchedAt: new Date(),
    }
  } catch {
    // 1 kez otomatik retry
    try {
      const response = await fetchWithTimeout(KANDILLI_RSS_URL, FETCH_TIMEOUT)
      const xmlText = await response.text()
      const earthquakes = parseKandilliXML(xmlText)
      
      return {
        earthquakes,
        fetchedAt: new Date(),
      }
    } catch (retryError) {
      const errorMessage = retryError instanceof Error 
        ? retryError.message 
        : 'Kandilli verisi alınamadı'
      
      return {
        earthquakes: [],
        fetchedAt: new Date(),
        error: errorMessage,
      }
    }
  }
}
