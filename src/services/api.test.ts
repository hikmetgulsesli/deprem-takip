import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fetchEarthquakes, fetchEarthquakeById } from './api';

describe('API Service', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('fetchEarthquakes', () => {
    it('should return earthquakes with default options', async () => {
      const promise = fetchEarthquakes();
      vi.advanceTimersByTime(1000);
      const result = await promise;

      expect(result.earthquakes).toBeDefined();
      expect(result.earthquakes.length).toBeGreaterThan(0);
      expect(result.total).toBeGreaterThan(0);
      expect(typeof result.hasMore).toBe('boolean');
    });

    it('should filter by minMagnitude', async () => {
      const promise = fetchEarthquakes({ minMagnitude: 4.0 });
      vi.advanceTimersByTime(1000);
      const result = await promise;

      expect(result.earthquakes.every(eq => eq.magnitude >= 4.0)).toBe(true);
    });

    it('should filter by source', async () => {
      const promise = fetchEarthquakes({ source: 'KANDILLI' });
      vi.advanceTimersByTime(1000);
      const result = await promise;

      expect(result.earthquakes.every(eq => eq.source === 'KANDILLI')).toBe(true);
    });

    it('should paginate results', async () => {
      const promise = fetchEarthquakes({ limit: 2, offset: 0 });
      vi.advanceTimersByTime(1000);
      const result = await promise;

      expect(result.earthquakes.length).toBeLessThanOrEqual(2);
    });

    it('should sort by timestamp descending', async () => {
      const promise = fetchEarthquakes();
      vi.advanceTimersByTime(1000);
      const result = await promise;

      for (let i = 1; i < result.earthquakes.length; i++) {
        const prev = new Date(result.earthquakes[i - 1].timestamp).getTime();
        const curr = new Date(result.earthquakes[i].timestamp).getTime();
        expect(prev).toBeGreaterThanOrEqual(curr);
      }
    });
  });

  describe('fetchEarthquakeById', () => {
    it('should return earthquake by id', async () => {
      const promise = fetchEarthquakeById('1');
      vi.advanceTimersByTime(500);
      const result = await promise;

      expect(result).not.toBeNull();
      expect(result?.id).toBe('1');
    });

    it('should return null for non-existent id', async () => {
      const promise = fetchEarthquakeById('999');
      vi.advanceTimersByTime(500);
      const result = await promise;

      expect(result).toBeNull();
    });
  });
});
