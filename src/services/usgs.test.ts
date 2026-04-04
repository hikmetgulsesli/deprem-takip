import { describe, it, expect, vi, beforeEach } from 'vitest'
import { fetchUSGSEarthquakes } from './usgs'

describe('usgs service', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('parses USGS GeoJSON correctly', async () => {
    const mockGeoJSON = {
      type: 'FeatureCollection',
      features: [
        {
          id: 'us7000abc',
          properties: {
            mag: 5.2,
            place: '10 km NE of Los Angeles, CA',
            time: 1705312200000,
          },
          geometry: {
            type: 'Point',
            coordinates: [-118.2437, 34.0522, 12.5],
          },
        },
      ],
    }

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockGeoJSON),
    } as Response)

    const result = await fetchUSGSEarthquakes()

    expect(result.earthquakes).toHaveLength(1)
    expect(result.earthquakes[0]).toMatchObject({
      location: '10 km NE of Los Angeles, CA',
      magnitude: 5.2,
      depth: 12.5,
      latitude: 34.0522,
      longitude: -118.2437,
      source: 'USGS',
    })
    expect(result.error).toBeUndefined()
  })

  it('filters by magnitude parameter', async () => {
    const mockGeoJSON = {
      type: 'FeatureCollection',
      features: [],
    }

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockGeoJSON),
    } as Response)

    await fetchUSGSEarthquakes(4.5)

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('4.5'),
      expect.any(Object)
    )
  })

  it('returns error on fetch failure', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'))

    const result = await fetchUSGSEarthquakes()

    expect(result.earthquakes).toHaveLength(0)
    expect(result.error).toBeDefined()
  })

  it('retries on first failure then succeeds', async () => {
    const mockGeoJSON = {
      type: 'FeatureCollection',
      features: [
        {
          id: 'us7000def',
          properties: {
            mag: 3.8,
            place: 'Test Location',
            time: 1705312200000,
          },
          geometry: {
            type: 'Point',
            coordinates: [0, 0, 5],
          },
        },
      ],
    }

    global.fetch = vi.fn()
      .mockRejectedValueOnce(new Error('Network error'))
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockGeoJSON),
      } as Response)

    const result = await fetchUSGSEarthquakes()

    expect(result.earthquakes).toHaveLength(1)
    expect(result.error).toBeUndefined()
  })

  it('handles timeout error', async () => {
    global.fetch = vi.fn().mockImplementation(() => {
      const error = new Error('The operation was aborted')
      error.name = 'AbortError'
      return Promise.reject(error)
    })

    const result = await fetchUSGSEarthquakes()

    expect(result.error).toContain('zaman aşımı')
  }, 10000)
})
