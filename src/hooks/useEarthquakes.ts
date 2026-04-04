import { useState, useEffect, useCallback, type Dispatch, type SetStateAction } from 'react';
import type { Earthquake, FilterState } from '../types/earthquake';

interface UseEarthquakesReturn {
  earthquakes: Earthquake[];
  loading: boolean;
  error: string | null;
  total: number;
  refetch: () => void;
}

// Mock data for development
const mockEarthquakes: Earthquake[] = [
  {
    id: '1',
    location: 'MARMARA DENİZİ (SİLİVRİ AÇIKLARI)',
    magnitude: 5.8,
    depth: 7.2,
    timestamp: new Date().toISOString(),
    latitude: 40.8523,
    longitude: 28.1472,
    source: 'KANDILLI'
  },
  {
    id: '2',
    location: 'EGE DENİZİ (KUŞADASI KÖRFEZİ)',
    magnitude: 3.4,
    depth: 15.0,
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    latitude: 37.9150,
    longitude: 27.1245,
    source: 'USGS'
  },
  {
    id: '3',
    location: 'AKDENİZ (ANTALYA AÇIKLARI)',
    magnitude: 4.2,
    depth: 12.5,
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    latitude: 36.8969,
    longitude: 30.7133,
    source: 'AFAD'
  },
  {
    id: '4',
    location: 'KARADENİZ (SAMSUN KUZEYİ)',
    magnitude: 2.1,
    depth: 8.0,
    timestamp: new Date(Date.now() - 10800000).toISOString(),
    latitude: 41.2867,
    longitude: 36.3381,
    source: 'KANDILLI'
  },
  {
    id: '5',
    location: 'DOĞU ANADOLU (VAN GÖLÜ)',
    magnitude: 6.2,
    depth: 5.5,
    timestamp: new Date(Date.now() - 14400000).toISOString(),
    latitude: 38.5010,
    longitude: 43.3730,
    source: 'USGS'
  },
  {
    id: '6',
    location: 'MARMARA DENİZİ (TEKİRDAĞ AÇIKLARI)',
    magnitude: 3.8,
    depth: 10.2,
    timestamp: new Date(Date.now() - 18000000).toISOString(),
    latitude: 40.9789,
    longitude: 27.5156,
    source: 'KANDILLI'
  },
  {
    id: '7',
    location: 'EGE DENİZİ (BODRUM AÇIKLARI)',
    magnitude: 4.5,
    depth: 8.5,
    timestamp: new Date(Date.now() - 21600000).toISOString(),
    latitude: 37.0344,
    longitude: 27.4305,
    source: 'USGS'
  }
];

export function useEarthquakes(minMagnitude?: number): UseEarthquakesReturn {
  const [earthquakes, setEarthquakes] = useState<Earthquake[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refetch = useCallback(() => {
    setRefreshTrigger((prev: number) => prev + 1);
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadEarthquakes() {
      setLoading(true);
      setError(null);

      try {
        // Use shorter delay for tests
        const delay = typeof window !== 'undefined' && (window as { __TEST__?: boolean }).__TEST__ ? 10 : 800;
        await new Promise(resolve => setTimeout(resolve, delay));

        if (!isMounted) return;

        // Filter by minMagnitude if provided
        let filtered = [...mockEarthquakes];
        if (minMagnitude !== undefined) {
          filtered = filtered.filter(eq => eq.magnitude >= minMagnitude);
        }

        setEarthquakes(filtered);
      } catch (err) {
        if (!isMounted) return;
        setError(err instanceof Error ? err.message : 'Bilinmeyen bir hata oluştu');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadEarthquakes();

    return () => {
      isMounted = false;
    };
  }, [minMagnitude, refreshTrigger]);

  return {
    earthquakes,
    loading,
    error,
    total: earthquakes.length,
    refetch
  };
}

export function useEarthquake(id: string | null) {
  const [earthquake, setEarthquake] = useState<Earthquake | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setEarthquake(null);
      setLoading(false);
      setError(null);
      return;
    }

    let isMounted = true;

    async function loadEarthquake() {
      setLoading(true);
      setError(null);

      try {
        // Use shorter delay for tests
        const delay = typeof window !== 'undefined' && (window as { __TEST__?: boolean }).__TEST__ ? 10 : 500;
        await new Promise(resolve => setTimeout(resolve, delay));

        if (!isMounted) return;

        const found = mockEarthquakes.find(eq => eq.id === id);
        
        if (found) {
          setEarthquake(found);
        } else {
          setError('Deprem bulunamadı');
        }
      } catch (err) {
        if (!isMounted) return;
        setError(err instanceof Error ? err.message : 'Bilinmeyen bir hata oluştu');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadEarthquake();

    return () => {
      isMounted = false;
    };
  }, [id]);

  return { earthquake, loading, error };
}

interface UseFilteredEarthquakesReturn extends UseEarthquakesReturn {
  filters: FilterState;
  setFilters: Dispatch<SetStateAction<FilterState>>;
  filteredEarthquakes: Earthquake[];
}

export function useFilteredEarthquakes(): UseFilteredEarthquakesReturn {
  const [filters, setFilters] = useState<FilterState>({
    minMagnitude: 0,
    timeRange: '24h',
    source: 'ALL'
  });

  const { earthquakes, loading, error, total, refetch } = useEarthquakes();

  const filteredEarthquakes = earthquakes.filter(eq => {
    // Filter by magnitude
    if (eq.magnitude < filters.minMagnitude) return false;

    // Filter by time range
    const eqDate = new Date(eq.timestamp || eq.date || new Date().toISOString());
    const now = new Date();
    const diffHours = (now.getTime() - eqDate.getTime()) / (1000 * 60 * 60);

    switch (filters.timeRange) {
      case '1h':
        if (diffHours > 1) return false;
        break;
      case '24h':
        if (diffHours > 24) return false;
        break;
      case '7d':
        if (diffHours > 24 * 7) return false;
        break;
      case '30d':
        if (diffHours > 24 * 30) return false;
        break;
    }

    // Filter by source
    if (filters.source !== 'ALL' && eq.source !== filters.source) return false;

    return true;
  });

  return {
    earthquakes,
    filteredEarthquakes,
    loading,
    error,
    total,
    refetch,
    filters,
    setFilters
  };
}
