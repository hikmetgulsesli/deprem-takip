import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useEarthquakes, useEarthquake } from './useEarthquakes';

describe('useEarthquakes', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should initialize with loading state', () => {
    const { result } = renderHook(() => useEarthquakes());
    
    expect(result.current.loading).toBe(true);
    expect(result.current.earthquakes).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it('should load earthquakes after mount', async () => {
    const { result } = renderHook(() => useEarthquakes());
    
    vi.advanceTimersByTime(1500);
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.earthquakes.length).toBeGreaterThan(0);
    expect(result.current.error).toBeNull();
  });

  it('should filter by minMagnitude', async () => {
    const { result } = renderHook(() => useEarthquakes(4.0));
    
    vi.advanceTimersByTime(1500);
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.earthquakes.every(eq => eq.magnitude >= 4.0)).toBe(true);
  });

  it('should refetch data', async () => {
    const { result } = renderHook(() => useEarthquakes());
    
    vi.advanceTimersByTime(1500);
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    const initialCount = result.current.earthquakes.length;
    
    // Refetch
    result.current.refetch();
    vi.advanceTimersByTime(1500);
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.earthquakes.length).toBe(initialCount);
  });

  it('should track total count', async () => {
    const { result } = renderHook(() => useEarthquakes());
    
    vi.advanceTimersByTime(1500);
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.total).toBeGreaterThan(0);
  });
});

describe('useEarthquake', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should not fetch when id is null', () => {
    const { result } = renderHook(() => useEarthquake(null));
    
    expect(result.current.loading).toBe(false);
    expect(result.current.earthquake).toBeNull();
  });

  it('should fetch earthquake by id', async () => {
    const { result } = renderHook(() => useEarthquake('1'));
    
    vi.advanceTimersByTime(1000);
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.earthquake).not.toBeNull();
    expect(result.current.earthquake?.id).toBe('1');
  });

  it('should return error for non-existent id', async () => {
    const { result } = renderHook(() => useEarthquake('999'));
    
    vi.advanceTimersByTime(1000);
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.earthquake).toBeNull();
    expect(result.current.error).toContain('bulunamadı');
  });
});
