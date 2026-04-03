import type { Earthquake } from '../types/earthquake';

const KANDILLI_RSS_URL = 'http://www.koeri.boun.edu.tr/scripts/lst0.asp';

// Cache for 5 minutes
const CACHE_DURATION = 5 * 60 * 1000;
let cache: { data: Earthquake[]; timestamp: number } | null = null;

/**
 * Parse Kandilli RSS HTML to extract earthquake data
 * Note: In production, this would parse actual RSS XML
 * For demo purposes, returning mock data that matches the format
 */
export async function fetchKandilliEarthquakes(
  timeRange: '24h' | '7d' | '30d' = '24h',
  minMagnitude: number = 0
): Promise<Earthquake[]> {
  // Check cache
  if (cache && Date.now() - cache.timestamp < CACHE_DURATION) {
    return cache.data;
  }

  // Mock data for demo - in production this would parse actual RSS
  const mockEarthquakes: Earthquake[] = [
    {
      id: 'kandilli-1',
      timestamp: new Date().toISOString(),
      latitude: 41.0082,
      longitude: 28.9784,
      magnitude: 3.5,
      depth: 10,
      location: 'İstanbul',
      source: 'KANDILLI',
    },
    {
      id: 'kandilli-2',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      latitude: 38.35,
      longitude: 38.3,
      magnitude: 4.2,
      depth: 8,
      location: 'Malatya',
      source: 'KANDILLI',
    },
    {
      id: 'kandilli-3',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      latitude: 37.9,
      longitude: 27.3,
      magnitude: 2.8,
      depth: 12,
      location: 'Aydın',
      source: 'KANDILLI',
    },
  ].filter(eq => eq.magnitude >= minMagnitude);

  // Update cache
  cache = { data: mockEarthquakes, timestamp: Date.now() };
  
  return mockEarthquakes;
}
