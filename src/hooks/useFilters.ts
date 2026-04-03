import { useState, useEffect, useCallback } from 'react';
import type { FilterState } from '../types';

const DEFAULT_FILTERS: FilterState = {
  minMagnitude: 1,
  timeRange: '24h',
  source: 'all',
};

export interface UseFiltersReturn {
  filters: FilterState;
  setMinMagnitude: (value: number) => void;
  setTimeRange: (value: FilterState['timeRange']) => void;
  setSource: (value: FilterState['source']) => void;
  resetFilters: () => void;
}

export function useFilters(): UseFiltersReturn {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  // Load filters from URL params on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const minMag = params.get('minMagnitude');
    const timeRange = params.get('timeRange') as FilterState['timeRange'] | null;
    const source = params.get('source') as FilterState['source'] | null;

    const newFilters: FilterState = { ...DEFAULT_FILTERS };

    if (minMag) {
      const parsed = parseFloat(minMag);
      if (!isNaN(parsed) && parsed >= 1 && parsed <= 7) {
        newFilters.minMagnitude = parsed;
      }
    }

    if (timeRange && ['1h', '6h', '24h', '7d', '30d'].includes(timeRange)) {
      newFilters.timeRange = timeRange;
    }

    if (source && ['all', 'USGS', 'Kandilli'].includes(source)) {
      newFilters.source = source;
    }

    setFilters(newFilters);
  }, []);

  // Sync filters to URL params
  const updateURL = useCallback((newFilters: FilterState) => {
    const params = new URLSearchParams();
    
    if (newFilters.minMagnitude !== DEFAULT_FILTERS.minMagnitude) {
      params.set('minMagnitude', newFilters.minMagnitude.toString());
    }
    if (newFilters.timeRange !== DEFAULT_FILTERS.timeRange) {
      params.set('timeRange', newFilters.timeRange);
    }
    if (newFilters.source !== DEFAULT_FILTERS.source) {
      params.set('source', newFilters.source);
    }

    const newURL = params.toString() 
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;
    
    window.history.replaceState({}, '', newURL);
  }, []);

  const setMinMagnitude = useCallback((value: number) => {
    setFilters(prev => {
      const newFilters = { ...prev, minMagnitude: value };
      updateURL(newFilters);
      return newFilters;
    });
  }, [updateURL]);

  const setTimeRange = useCallback((value: FilterState['timeRange']) => {
    setFilters(prev => {
      const newFilters = { ...prev, timeRange: value };
      updateURL(newFilters);
      return newFilters;
    });
  }, [updateURL]);

  const setSource = useCallback((value: FilterState['source']) => {
    setFilters(prev => {
      const newFilters = { ...prev, source: value };
      updateURL(newFilters);
      return newFilters;
    });
  }, [updateURL]);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    updateURL(DEFAULT_FILTERS);
  }, [updateURL]);

  return {
    filters,
    setMinMagnitude,
    setTimeRange,
    setSource,
    resetFilters,
  };
}
