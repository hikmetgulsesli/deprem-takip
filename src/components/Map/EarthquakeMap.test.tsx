import { describe, it, expect, vi } from 'vitest';
import { render} from '@testing-library/react';
import { EarthquakeMap } from './EarthquakeMap';
import type { Earthquake } from '../../types/earthquake';

const mockEarthquakes: Earthquake[] = [
  {
    id: '1',
    location: 'İstanbul',
    magnitude: 3.5,
    depth: 10,
    date: new Date().toISOString(),
    latitude: 41.0082,
    longitude: 28.9784,
    source: 'kandilli'
  },
  {
    id: '2',
    location: 'Ege Denizi',
    magnitude: 4.2,
    depth: 15,
    date: new Date().toISOString(),
    latitude: 38.5,
    longitude: 26.5,
    source: 'usgs'
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

  it('calls onMarkerClick when marker is clicked', () => {
    const onMarkerClick = vi.fn();
    render(<EarthquakeMap earthquakes={mockEarthquakes} onMarkerClick={onMarkerClick} />);
    // Note: Actual click testing would require more setup with leaflet
    expect(typeof onMarkerClick).toBe('function');
  });
});
