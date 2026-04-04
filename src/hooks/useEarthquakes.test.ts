import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useEarthquakes, useEarthquake } from './useEarthquakes';

describe('useEarthquakes', () => {
  beforeEach(() => {
    // Set test mode for faster loading
    (window as { __TEST__?: boolean }).__TEST__ = true;
  });

  afterEach(() => {
    delete (window as { __TEST__?: boolean }).__TEST__;
  });

  it('should initialize with loading state', () => {
    const { result } = renderHook(() => useEarthquakes());
    
    expect(result.current.loading).toBe(true);
    expect(result.current.earthquakes).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it('should load earthquakes after mount', async () => {
    const { result } = renderHook(() => useEarthquakes());
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    }, { timeout: 1000 });
    
    expect(result.current.earthquakes.length).toBeGreaterThan(0);
    expect(result.current.error).toBeNull();
  });

  it('should filter by minMagnitude', async () => {
    const { result } = renderHook(() => useEarthquakes(4.0));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    }, { timeout: 1000 });
    
    expect(result.current.earthquakes.every(eq => eq.magnitude >= 4.0)).toBe(true);
  });

  it('should refetch data', async () => {
    const { result } = renderHook(() => useEarthquakes());
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    }, { timeout: 1000 });
    
    const initialCount = result.current.earthquakes.length;
    
    // Refetch
    result.current.refetch();
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    }, { timeout: 1000 });
    
    expect(result.current.earthquakes.length).toBe(initialCount);
  });

  it('should track total count', async () => {
    const { result } = renderHook(() => useEarthquakes());
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    }, { timeout: 1000 });
    
    expect(result.current.total).toBeGreaterThan(0);
  });
});

describe('useEarthquake', () => {
  beforeEach(() => {
    (window as { __TEST__?: boolean }).__TEST__ = true;
  });

  afterEach(() => {
    delete (window as { __TEST__?: boolean }).__TEST__;
  });

  it('should not fetch when id is null', () => {
    const { result } = renderHook(() => useEarthquake(null));
    
    expect(result.current.loading).toBe(false);
    expect(result.current.earthquake).toBeNull();
  });

  it('should fetch earthquake by id', async () => {
    const { result } = renderHook(() => useEarthquake('1'));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    }, { timeout: 1000 });
    
    expect(result.current.earthquake).not.toBeNull();
    expect(result.current.earthquake?.id).toBe('1');
  });

  it('should return error for non-existent id', async () => {
    const { result } = renderHook(() => useEarthquake('999'));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    }, { timeout: 1000 });
    
    expect(result.current.earthquake).toBeNull();
    expect(result.current.error).toContain('bulunamadı');
  });
});
