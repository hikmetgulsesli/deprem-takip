import { describe, it, expect } from 'vitest';
import type { Earthquake, FilterState } from './index';

describe('Type definitions', () => {
  it('Earthquake type should have all required properties', () => {
    const earthquake: Earthquake = {
      id: '1',
      timestamp: '2024-01-01T00:00:00Z',
      latitude: 41.0082,
      longitude: 28.9784,
      magnitude: 3.5,
      depth: 10,
      location: 'İstanbul',
      source: 'Kandilli'
    };

    expect(earthquake.id).toBe('1');
    expect(earthquake.timestamp).toBe('2024-01-01T00:00:00Z');
    expect(earthquake.latitude).toBe(41.0082);
    expect(earthquake.longitude).toBe(28.9784);
    expect(earthquake.magnitude).toBe(3.5);
    expect(earthquake.depth).toBe(10);
    expect(earthquake.location).toBe('İstanbul');
    expect(earthquake.source).toBe('Kandilli');
  });

  it('FilterState type should have all required properties', () => {
    const filterState: FilterState = {
      minMagnitude: 3.0,
      timeRange: '24h',
      source: 'all'
    };

    expect(filterState.minMagnitude).toBe(3.0);
    expect(filterState.timeRange).toBe('24h');
    expect(filterState.source).toBe('all');
  });

  it('Earthquake source should accept USGS', () => {
    const earthquake: Earthquake = {
      id: '2',
      timestamp: '2024-01-01T00:00:00Z',
      latitude: 40.7128,
      longitude: -74.0060,
      magnitude: 4.0,
      depth: 15,
      location: 'New York',
      source: 'USGS'
    };

    expect(earthquake.source).toBe('USGS');
  });

  it('FilterState timeRange should accept all valid values', () => {
    const timeRanges: FilterState['timeRange'][] = ['1h', '6h', '24h', '7d', '30d'];
    
    timeRanges.forEach(timeRange => {
      const filterState: FilterState = {
        minMagnitude: 2.0,
        timeRange,
        source: 'all'
      };
      expect(filterState.timeRange).toBe(timeRange);
    });
  });
});
