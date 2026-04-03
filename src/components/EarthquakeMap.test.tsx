import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EarthquakeMap } from './EarthquakeMap';
import type { Earthquake } from '../types/earthquake';

const mockEarthquakes: Earthquake[] = [
  {
    id: '1',
    location: 'İstanbul',
    magnitude: 3.5,
    depth: 10,
    timestamp: '2024-01-01T00:00:00Z',
    latitude: 41.0082,
    longitude: 28.9784,
    source: 'KANDILLI'
  },
  {
    id: '2',
    location: 'Ege Denizi',
    magnitude: 4.2,
    depth: 15,
    timestamp: '2024-01-01T00:00:00Z',
    latitude: 38.5,
    longitude: 26.5,
    source: 'USGS'
  }
];

describe('EarthquakeMap', () => {
  it('renders without crashing', () => {
    render(<EarthquakeMap earthquakes={mockEarthquakes} />);
    expect(document.querySelector('.leaflet-container')).toBeInTheDocument();
  });

  it('renders with empty earthquakes array', () => {
    render(<EarthquakeMap earthquakes={[]} />);
    expect(document.querySelector('.leaflet-container')).toBeInTheDocument();
  });
});
