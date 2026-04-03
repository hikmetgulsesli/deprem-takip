import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFilters } from './useFilters';

describe('useFilters', () => {
  beforeEach(() => {
    // Reset URL
    window.history.replaceState({}, '', '/');
  });

  it('should initialize with default filters', () => {
    const { result } = renderHook(() => useFilters());
    
    expect(result.current.filters.minMagnitude).toBe(1);
    expect(result.current.filters.timeRange).toBe('24h');
    expect(result.current.filters.source).toBe('all');
  });

  it('should update minMagnitude', () => {
    const { result } = renderHook(() => useFilters());
    
    act(() => {
      result.current.setMinMagnitude(4.5);
    });
    
    expect(result.current.filters.minMagnitude).toBe(4.5);
  });

  it('should update timeRange', () => {
    const { result } = renderHook(() => useFilters());
    
    act(() => {
      result.current.setTimeRange('7d');
    });
    
    expect(result.current.filters.timeRange).toBe('7d');
  });

  it('should update source', () => {
    const { result } = renderHook(() => useFilters());
    
    act(() => {
      result.current.setSource('Kandilli');
    });
    
    expect(result.current.filters.source).toBe('Kandilli');
  });

  it('should reset filters to defaults', () => {
    const { result } = renderHook(() => useFilters());
    
    act(() => {
      result.current.setMinMagnitude(5);
      result.current.setTimeRange('30d');
      result.current.setSource('USGS');
    });
    
    act(() => {
      result.current.resetFilters();
    });
    
    expect(result.current.filters.minMagnitude).toBe(1);
    expect(result.current.filters.timeRange).toBe('24h');
    expect(result.current.filters.source).toBe('all');
  });

  it('should sync minMagnitude to URL', () => {
    const { result } = renderHook(() => useFilters());
    
    act(() => {
      result.current.setMinMagnitude(3.5);
    });
    
    expect(window.location.search).toContain('minMagnitude=3.5');
  });

  it('should sync timeRange to URL', () => {
    const { result } = renderHook(() => useFilters());
    
    act(() => {
      result.current.setTimeRange('7d');
    });
    
    expect(window.location.search).toContain('timeRange=7d');
  });

  it('should sync source to URL', () => {
    const { result } = renderHook(() => useFilters());
    
    act(() => {
      result.current.setSource('Kandilli');
    });
    
    expect(window.location.search).toContain('source=Kandilli');
  });
});
