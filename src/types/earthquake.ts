/**
 * Earthquake data type definition
 */
export interface Earthquake {
  id: string;
  timestamp: string;
  latitude: number;
  longitude: number;
  magnitude: number;
  depth: number;
  location: string;
  source: 'USGS' | 'KANDILLI' | 'AFAD';
}

/**
 * Filter state for earthquake list
 */
export interface FilterState {
  minMagnitude: number;
  timeRange: '24h' | '7d' | '30d';
  dataSource: 'KANDILLI' | 'USGS' | 'BOTH';
}
