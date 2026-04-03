import { useState, useEffect, useCallback } from 'react';
import type { Earthquake } from '../types/earthquake';
import { fetchUSGSEarthquakes } from '../services/usgs';
import { fetchKandilliEarthquakes } from '../services/kandilli';

interface UseEarthquakesReturn {
  earthquakes: Earthquake[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 dakika

interface CacheEntry {
  data: Earthquake[];
  timestamp: number;
}

const cache: Record<string, CacheEntry> = {};

export function useEarthquakes(
  minMagnitude?: number,
  period: 'hour' | 'day' | 'week' | 'month' = 'day',
  dataSource: 'kandilli' | 'usgs' | 'both' = 'both'
): UseEarthquakesReturn {
  const [earthquakes, setEarthquakes] = useState<Earthquake[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const refetch = useCallback(() => {
    setRefreshKey(k => k + 1);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const cacheKey = `${dataSource}-${minMagnitude}-${period}`;
      const cached = cache[cacheKey];
      
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        setEarthquakes(cached.data);
        setLoading(false);
        return;
      }

      try {
        let results: Earthquake[] = [];
        let errors: string[] = [];

        if (dataSource === 'usgs' || dataSource === 'both') {
          const usgsResponse = await fetchUSGSEarthquakes(minMagnitude, period);
          if (usgsResponse.error) {
            errors.push(usgsResponse.error);
          } else {
            results = [...results, ...usgsResponse.earthquakes];
          }
        }

        if (dataSource === 'kandilli' || dataSource === 'both') {
          const kandilliResponse = await fetchKandilliEarthquakes();
          if (kandilliResponse.error) {
            errors.push(kandilliResponse.error);
          } else {
            results = [...results, ...kandilliResponse.earthquakes];
          }
        }

        // Büyüklüğe göre sırala (büyükten küçüğe)
        results.sort((a, b) => b.magnitude - a.magnitude);

        cache[cacheKey] = { data: results, timestamp: Date.now() };
        setEarthquakes(results);
        
        if (errors.length > 0) {
          setError(errors.join(', '));
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Bilinmeyen hata');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [minMagnitude, period, dataSource, refreshKey]);

  return { earthquakes, loading, error, refetch };
}
