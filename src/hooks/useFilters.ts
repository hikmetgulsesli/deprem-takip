import { useState, useCallback } from 'react';

export interface FilterState {
  minMagnitude: number;
  timeRange: '24h' | '7d' | '30d';
  dataSource: 'kandilli' | 'usgs' | 'both';
}

interface UseFiltersReturn {
  filters: FilterState;
  setMinMagnitude: (value: number) => void;
  setTimeRange: (value: '24h' | '7d' | '30d') => void;
  setDataSource: (value: 'kandilli' | 'usgs' | 'both') => void;
  resetFilters: () => void;
}

const defaultFilters: FilterState = {
  minMagnitude: 0,
  timeRange: '24h',
  dataSource: 'both',
};

export function useFilters(initialFilters?: Partial<FilterState>): UseFiltersReturn {
  const [filters, setFilters] = useState<FilterState>({
    ...defaultFilters,
    ...initialFilters,
  });

  const setMinMagnitude = useCallback((value: number) => {
    setFilters(prev => ({ ...prev, minMagnitude: value }));
  }, []);

  const setTimeRange = useCallback((value: '24h' | '7d' | '30d') => {
    setFilters(prev => ({ ...prev, timeRange: value }));
  }, []);

  const setDataSource = useCallback((value: 'kandilli' | 'usgs' | 'both') => {
    setFilters(prev => ({ ...prev, dataSource: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  return {
    filters,
    setMinMagnitude,
    setTimeRange,
    setDataSource,
    resetFilters,
  };
}
