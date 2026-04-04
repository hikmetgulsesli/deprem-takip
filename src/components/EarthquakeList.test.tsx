import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { EarthquakeList } from './EarthquakeList';
import type { Earthquake } from '../types/earthquake';

const mockEarthquakes: Earthquake[] = [
  {
    id: '1',
    timestamp: new Date(Date.now() - 60000).toISOString(),
    latitude: 41.0082,
    longitude: 28.9784,
    magnitude: 5.8,
    depth: 10,
    location: 'İstanbul',
    source: 'KANDILLI',
  },
  {
    id: '2',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    latitude: 38.4192,
    longitude: 27.1287,
    location: 'İzmir',
    magnitude: 4.2,
    depth: 15,
    source: 'USGS',
  },
  {
    id: '3',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    latitude: 36.8969,
    longitude: 30.7133,
    location: 'Antalya',
    magnitude: 3.1,
    depth: 8,
    source: 'AFAD',
  },
];

describe('EarthquakeList', () => {
  it('renders earthquake locations', () => {
    render(<EarthquakeList earthquakes={mockEarthquakes} />);
    expect(screen.getByText('İstanbul')).toBeInTheDocument();
    expect(screen.getByText('İzmir')).toBeInTheDocument();
    expect(screen.getByText('Antalya')).toBeInTheDocument();
  });

  it('displays magnitudes with correct values', () => {
    render(<EarthquakeList earthquakes={mockEarthquakes} />);
    expect(screen.getByText('5.8')).toBeInTheDocument();
    expect(screen.getByText('4.2')).toBeInTheDocument();
    expect(screen.getByText('3.1')).toBeInTheDocument();
  });

  it('displays source badges', () => {
    render(<EarthquakeList earthquakes={mockEarthquakes} />);
    expect(screen.getByText('KANDILLI')).toBeInTheDocument();
    expect(screen.getByText('USGS')).toBeInTheDocument();
    expect(screen.getByText('AFAD')).toBeInTheDocument();
  });

  it('calls onEarthquakeClick when row is clicked', () => {
    const onEarthquakeClick = vi.fn();
    render(
      <EarthquakeList
        earthquakes={mockEarthquakes}
        onEarthquakeClick={onEarthquakeClick}
      />
    );
    fireEvent.click(screen.getByText('İstanbul'));
    expect(onEarthquakeClick).toHaveBeenCalledWith(mockEarthquakes[0]);
  });

  it('renders empty state when no earthquakes', () => {
    render(<EarthquakeList earthquakes={[]} />);
    expect(screen.getByText('Deprem Bulunamadı')).toBeInTheDocument();
  });

  it('renders loading skeleton when loading', () => {
    render(<EarthquakeList earthquakes={[]} loading={true} />);
    const skeletons = document.querySelectorAll('.animate-pulse');
    expect(skeletons.length).toBeGreaterThan(0);
  });
});
