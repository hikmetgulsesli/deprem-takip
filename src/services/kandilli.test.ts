import { describe, it, expect, vi, beforeEach } from 'vitest'
import { fetchKandilliEarthquakes } from './kandilli'

describe('kandilli service', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('parses Kandilli RSS XML correctly', async () => {
    const mockXML = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <item>
      <title>2024.01.15 14:30:00 3.5 İstanbul 10.0</title>
      <description>Enlem: 41.0082 Boylam: 28.9784</description>
    </item>
  </channel>
</rss>`

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(mockXML),
    } as Response)

    const result = await fetchKandilliEarthquakes()

    expect(result.earthquakes).toHaveLength(1)
    expect(result.earthquakes[0]).toMatchObject({
      location: 'İstanbul',
      magnitude: 3.5,
      depth: 10,
      latitude: 41.0082,
      longitude: 28.9784,
      source: 'KANDILLI',
    })
    expect(result.error).toBeUndefined()
  })

  it('returns empty array on parse error', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      text: () => Promise.resolve('invalid xml'),
    } as Response)

    const result = await fetchKandilliEarthquakes()

    expect(result.earthquakes).toHaveLength(0)
  })

  it('returns error on fetch failure', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'))

    const result = await fetchKandilliEarthquakes()

    expect(result.earthquakes).toHaveLength(0)
    expect(result.error).toBeDefined()
  })

  it('retries on first failure then succeeds', async () => {
    const mockXML = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <item>
      <title>2024.01.15 14:30:00 4.0 Ankara 15.0</title>
      <description>Enlem: 39.9334 Boylam: 32.8597</description>
    </item>
  </channel>
</rss>`

    global.fetch = vi.fn()
      .mockRejectedValueOnce(new Error('Network error'))
      .mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(mockXML),
      } as Response)

    const result = await fetchKandilliEarthquakes()

    expect(result.earthquakes).toHaveLength(1)
    expect(result.earthquakes[0].location).toBe('Ankara')
    expect(result.error).toBeUndefined()
  })

  it('handles timeout error', async () => {
    global.fetch = vi.fn().mockImplementation(() => {
      const error = new Error('The operation was aborted')
      error.name = 'AbortError'
      return Promise.reject(error)
    })

    const result = await fetchKandilliEarthquakes()

    expect(result.error).toContain('zaman aşımı')
  }, 10000)
})
