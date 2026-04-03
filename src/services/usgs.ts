import type { Earthquake } from '../types/earthquake';

const USGS_API_URL = 'https://earthquake.usgs.gov/fdsnws/event/1/query';

// Cache for 5 minutes
const CACHE_DURATION = 5 * 60 * 1000;
let cache: { data: Earthquake[]; timestamp: number } | null = null;

/**
 * Fetch earthquakes from USGS API
 * @param timeRange - Time range for query (24h, 7d, 30d)
 * @param minMagnitude - Minimum magnitude filter
 * @returns Array of Earthquake objects
 */
export async function fetchUSGSEarthquakes(
  timeRange: '24h' | '7d' | '30d' = '24h',
  minMagnitude: number = 0
): Promise<Earthquake[]> {
  // Check cache
  if (cache && Date.now() - cache.timestamp < CACHE_DURATION) {
    return cache.data;
  }

  const endtime = new Date().toISOString();
  const starttime = new Date(
    Date.now() - (timeRange === '24h' ? 1 : timeRange === '7d' ? 7 : 30) * 24 * 60 * 60 * 1000
  ).toISOString();

  const params = new URLSearchParams({
    format: 'geojson',
    starttime,
    endtime,
    minmagnitude: minMagnitude.toString(),
    limit: '100',
  });

  const response = await fetch(`${USGS_API_URL}?${params}`);
  
  if (!response.ok) {
    throw new Error(`USGS API error: ${response.status}`);
  }

  const data = await response.json();
  
  const earthquakes: Earthquake[] = data.features.map((feature: {
    id: string;
    properties: {
      time: number;
      mag: number;
      place: string;
    };
    geometry: {
      coordinates: [number, number, number];
    };
  }) => ({
    id: feature.id,
    timestamp: new Date(feature.properties.time).toISOString(),
    latitude: feature.geometry.coordinates[1],
    longitude: feature.geometry.coordinates[0],
    magnitude: feature.properties.mag,
    depth: feature.geometry.coordinates[2],
    location: feature.properties.place,
    source: 'USGS' as const,
  }));

  // Update cache
  cache = { data: earthquakes, timestamp: Date.now() };
  
  return earthquakes;
}
