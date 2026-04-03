import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useEarthquakes } from './useEarthquakes';
import * as usgsService from '../services/usgs';
import * as kandilliService from '../services/kandilli';

vi.mock('../services/usgs');
vi.mock('../services/kandilli');

describe('useEarthquakes hook', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('returns loading state initially', () => {
    vi.mocked(usgsService.fetchUSGSEarthquakes).mockResolvedValue({
      earthquakes: [],
      fetchedAt: new Date(),
    });
    vi.mocked(kandilliService.fetchKandilliEarthquakes).mockResolvedValue({
      earthquakes: [],
      fetchedAt: new Date(),
    });

    const { result } = renderHook(() => useEarthquakes());
    expect(result.current.loading).toBe(true);
  });

  it('returns earthquakes after fetch', async () => {
    vi.mocked(usgsService.fetchUSGSEarthquakes).mockResolvedValue({
      earthquakes: [{
        id: 'usgs-1',
        location: 'Test Location',
        magnitude: 4.5,
        depth: 10,
        date: new Date().toISOString(),
        latitude: 39,
        longitude: 35,
        source: 'usgs',
      }],
      fetchedAt: new Date(),
    });
    vi.mocked(kandilliService.fetchKandilliEarthquakes).mockResolvedValue({
      earthquakes: [],
      fetchedAt: new Date(),
    });

    const { result } = renderHook(() => useEarthquakes());
    
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.earthquakes).toHaveLength(1);
    expect(result.current.earthquakes[0].location).toBe('Test Location');
  });

  it('returns error when fetch fails', async () => {
    vi.mocked(usgsService.fetchUSGSEarthquakes).mockResolvedValue({
      earthquakes: [],
      fetchedAt: new Date(),
      error: 'USGS hatası',
    });
    vi.mocked(kandilliService.fetchKandilliEarthquakes).mockResolvedValue({
      earthquakes: [],
      fetchedAt: new Date(),
    });

    const { result } = renderHook(() => useEarthquakes());
    
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBe('USGS hatası');
  });

  it('has refetch function', () => {
    vi.mocked(usgsService.fetchUSGSEarthquakes).mockResolvedValue({
      earthquakes: [],
      fetchedAt: new Date(),
    });
    vi.mocked(kandilliService.fetchKandilliEarthquakes).mockResolvedValue({
      earthquakes: [],
      fetchedAt: new Date(),
    });

    const { result } = renderHook(() => useEarthquakes());
    expect(typeof result.current.refetch).toBe('function');
  });
});
