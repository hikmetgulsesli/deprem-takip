import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFilters } from './useFilters';

describe('useFilters hook', () => {
  it('returns default filters', () => {
    const { result } = renderHook(() => useFilters());
    
    expect(result.current.filters.minMagnitude).toBe(0);
    expect(result.current.filters.timeRange).toBe('24h');
    expect(result.current.filters.dataSource).toBe('both');
  });

  it('sets minMagnitude', () => {
    const { result } = renderHook(() => useFilters());
    
    act(() => {
      result.current.setMinMagnitude(3.5);
    });
    
    expect(result.current.filters.minMagnitude).toBe(3.5);
  });

  it('sets timeRange', () => {
    const { result } = renderHook(() => useFilters());
    
    act(() => {
      result.current.setTimeRange('7d');
    });
    
    expect(result.current.filters.timeRange).toBe('7d');
  });

  it('sets dataSource', () => {
    const { result } = renderHook(() => useFilters());
    
    act(() => {
      result.current.setDataSource('usgs');
    });
    
    expect(result.current.filters.dataSource).toBe('usgs');
  });

  it('resets filters to default', () => {
    const { result } = renderHook(() => useFilters());
    
    act(() => {
      result.current.setMinMagnitude(5);
      result.current.setTimeRange('30d');
      result.current.setDataSource('kandilli');
    });
    
    act(() => {
      result.current.resetFilters();
    });
    
    expect(result.current.filters.minMagnitude).toBe(0);
    expect(result.current.filters.timeRange).toBe('24h');
    expect(result.current.filters.dataSource).toBe('both');
  });

  it('accepts initial filters', () => {
    const { result } = renderHook(() => useFilters({
      minMagnitude: 4,
      timeRange: '7d',
      dataSource: 'usgs',
    }));
    
    expect(result.current.filters.minMagnitude).toBe(4);
    expect(result.current.filters.timeRange).toBe('7d');
    expect(result.current.filters.dataSource).toBe('usgs');
  });
});
