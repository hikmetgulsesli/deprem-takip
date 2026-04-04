export interface Earthquake {
  id: string;
  timestamp?: string;
  date?: string;
  latitude: number;
  longitude: number;
  magnitude: number;
  depth: number;
  location: string;
  source: 'USGS' | 'KANDILLI' | 'AFAD';
}

export interface FilterState {
  minMagnitude: number;
  timeRange: '1h' | '24h' | '7d' | '30d';
  source: 'ALL' | 'USGS' | 'KANDILLI' | 'AFAD';
}
