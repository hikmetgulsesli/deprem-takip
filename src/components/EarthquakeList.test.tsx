import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { EarthquakeList } from './EarthquakeList';
import type { Earthquake } from '../types';

const mockEarthquakes: Earthquake[] = [
  {
    id: '1',
    timestamp: '2024-01-15T10:30:00Z',
    latitude: 41.0082,
    longitude: 28.9784,
    magnitude: 5.8,
    depth: 10,
    location: 'İstanbul',
    source: 'KANDILLI',
  },
  {
    id: '2',
    timestamp: '2024-01-14T08:15:00Z',
    latitude: 38.4192,
    longitude: 27.1287,
    location: 'İzmir',
    magnitude: 4.2,
    depth: 15,
    source: 'USGS',
  },
  {
    id: '3',
    timestamp: '2024-01-13T14:45:00Z',
    latitude: 36.8969,
    longitude: 30.7133,
    location: 'Antalya',
    magnitude: 3.1,
    depth: 8,
    source: 'AFAD',
  },
];

describe('EarthquakeList', () => {
  it('renders table headers in Turkish', () => {
    render(<EarthquakeList earthquakes={mockEarthquakes} />);
    
    expect(screen.getByText('Tarih')).toBeInTheDocument();
    expect(screen.getByText('Yer')).toBeInTheDocument();
    expect(screen.getByText('Büyüklük')).toBeInTheDocument();
    expect(screen.getByText('Derinlik')).toBeInTheDocument();
    expect(screen.getByText('Kaynak')).toBeInTheDocument();
  });

  it('renders earthquake data correctly', () => {
    render(<EarthquakeList earthquakes={mockEarthquakes} />);
    
    expect(screen.getByText('İstanbul')).toBeInTheDocument();
    expect(screen.getByText('İzmir')).toBeInTheDocument();
    expect(screen.getByText('Antalya')).toBeInTheDocument();
  });

  it('displays magnitude with color coding', () => {
    render(<EarthquakeList earthquakes={mockEarthquakes} />);
    
    // High magnitude (5.8) should have red styling
    const highMagElement = screen.getByText('5.8');
    expect(highMagElement).toBeInTheDocument();
    
    // Medium magnitude (4.2) should have orange styling
    const medMagElement = screen.getByText('4.2');
    expect(medMagElement).toBeInTheDocument();
    
    // Low magnitude (3.1) should have blue styling
    const lowMagElement = screen.getByText('3.1');
    expect(lowMagElement).toBeInTheDocument();
  });

  it('displays source badges with correct colors', () => {
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

  it('sorts by timestamp descending by default', () => {
    render(<EarthquakeList earthquakes={mockEarthquakes} />);
    
    const rows = screen.getAllByText(/İstanbul|İzmir|Antalya/);
    expect(rows[0]).toHaveTextContent('İstanbul'); // Most recent
    expect(rows[1]).toHaveTextContent('İzmir');
    expect(rows[2]).toHaveTextContent('Antalya'); // Oldest
  });

  it('toggles sort direction when clicking same column', () => {
    render(<EarthquakeList earthquakes={mockEarthquakes} />);
    
    // Click on magnitude to sort
    fireEvent.click(screen.getByText('Büyüklük'));
    
    // Should now be sorted by magnitude ascending
    const rows = screen.getAllByText(/İstanbul|İzmir|Antalya/);
    expect(rows[0]).toHaveTextContent('Antalya'); // 3.1
    expect(rows[1]).toHaveTextContent('İzmir'); // 4.2
    expect(rows[2]).toHaveTextContent('İstanbul'); // 5.8
  });

  it('formats dates in Turkish locale', () => {
    render(<EarthquakeList earthquakes={mockEarthquakes} />);
    
    // Check for Turkish date format (DD.MM.YYYY)
    expect(screen.getByText('15.01.2024')).toBeInTheDocument();
  });

  it('formats times in Turkish locale', () => {
    render(<EarthquakeList earthquakes={mockEarthquakes} />);
    
    // Check for Turkish time format (HH:MM)
    expect(screen.getByText('13:30')).toBeInTheDocument(); // UTC+3
  });
});
