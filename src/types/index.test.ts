import { describe, it, expect } from 'vitest';
import type { Earthquake, FilterState } from './types';

describe('Type definitions', () => {
  it('Earthquake type has correct structure', () => {
    const earthquake: Earthquake = {
      id: '1',
      timestamp: new Date().toISOString(),
      latitude: 41.0082,
      longitude: 28.9784,
      magnitude: 3.5,
      depth: 10,
      location: 'İstanbul',
      source: 'KANDILLI'
    };
    expect(earthquake.id).toBe('1');
    expect(earthquake.location).toBe('İstanbul');
    expect(earthquake.magnitude).toBe(3.5);
    expect(earthquake.source).toBe('KANDILLI');
  });

  it('FilterState type has correct structure', () => {
    const filter: FilterState = {
      minMagnitude: 3.0,
      timeRange: '24h',
      source: 'ALL'
    };
    expect(filter.minMagnitude).toBe(3.0);
    expect(filter.timeRange).toBe('24h');
    expect(filter.source).toBe('ALL');
  });
});
