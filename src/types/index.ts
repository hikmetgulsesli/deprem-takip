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
  source: 'USGS' | 'Kandilli';
}

/**
 * Filter state for earthquake data
 */
export interface FilterState {
  minMagnitude: number;
  timeRange: '1h' | '6h' | '24h' | '7d' | '30d';
  source: 'all' | 'USGS' | 'Kandilli';
}
