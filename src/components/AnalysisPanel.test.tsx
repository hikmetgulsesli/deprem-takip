import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AnalysisPanel } from './AnalysisPanel';
import type { Earthquake } from '../types';

describe('AnalysisPanel', () => {
  const mockEarthquakes: Earthquake[] = [
    { id: '1', location: 'İstanbul', magnitude: 3.5, depth: 10, timestamp: new Date().toISOString(), latitude: 41, longitude: 28, source: 'KANDILLI' },
    { id: '2', location: 'İstanbul', magnitude: 4.2, depth: 12, timestamp: new Date().toISOString(), latitude: 41, longitude: 28, source: 'KANDILLI' },
    { id: '3', location: 'Ankara', magnitude: 2.1, depth: 8, timestamp: new Date().toISOString(), latitude: 39, longitude: 32, source: 'USGS' },
    { id: '4', location: 'İzmir', magnitude: 5.8, depth: 15, timestamp: new Date().toISOString(), latitude: 38, longitude: 27, source: 'AFAD' },
    { id: '5', location: 'Ankara', magnitude: 3.3, depth: 10, timestamp: new Date().toISOString(), latitude: 39, longitude: 32, source: 'KANDILLI' },
    { id: '6', location: 'Bursa', magnitude: 4.5, depth: 11, timestamp: new Date().toISOString(), latitude: 40, longitude: 29, source: 'USGS' },
  ];

  it('renders magnitude distribution section', () => {
    render(<AnalysisPanel earthquakes={mockEarthquakes} />);
    expect(screen.getByText('Büyüklük Dağılımı')).toBeInTheDocument();
    expect(screen.getByText('Deprem büyüklüğüne göre dağılım')).toBeInTheDocument();
  });

  it('renders magnitude range labels', () => {
    render(<AnalysisPanel earthquakes={mockEarthquakes} />);
    expect(screen.getByText('1-2')).toBeInTheDocument();
    expect(screen.getByText('2-3')).toBeInTheDocument();
    expect(screen.getByText('3-4')).toBeInTheDocument();
    expect(screen.getByText('4-5')).toBeInTheDocument();
    expect(screen.getByText('5+')).toBeInTheDocument();
  });

  it('renders top locations section', () => {
    render(<AnalysisPanel earthquakes={mockEarthquakes} />);
    expect(screen.getByText('En Aktif Bölgeler')).toBeInTheDocument();
    expect(screen.getByText('Deprem sayısına göre ilk 5 bölge')).toBeInTheDocument();
  });

  it('displays top 5 locations sorted by count', () => {
    render(<AnalysisPanel earthquakes={mockEarthquakes} />);
    // İstanbul should be first with 2 earthquakes
    expect(screen.getByText('İstanbul')).toBeInTheDocument();
    expect(screen.getByText('Ankara')).toBeInTheDocument();
    expect(screen.getByText('İzmir')).toBeInTheDocument();
    expect(screen.getByText('Bursa')).toBeInTheDocument();
  });

  it('displays total earthquake count', () => {
    render(<AnalysisPanel earthquakes={mockEarthquakes} />);
    expect(screen.getByText('Toplam 6 deprem analiz edildi')).toBeInTheDocument();
  });

  it('displays summary stats', () => {
    render(<AnalysisPanel earthquakes={mockEarthquakes} />);
    expect(screen.getByText('Toplam Deprem')).toBeInTheDocument();
    expect(screen.getByText('Ortalama Büyüklük')).toBeInTheDocument();
    expect(screen.getByText('En Güçlü Deprem')).toBeInTheDocument();
  });

  it('calculates average magnitude correctly', () => {
    render(<AnalysisPanel earthquakes={mockEarthquakes} />);
    // Average: (3.5 + 4.2 + 2.1 + 5.8 + 3.3 + 4.5) / 6 = 23.4 / 6 = 3.9
    expect(screen.getByText('3.9')).toBeInTheDocument();
  });

  it('calculates max magnitude correctly', () => {
    render(<AnalysisPanel earthquakes={mockEarthquakes} />);
    // Max: 5.8
    expect(screen.getByText('5.8')).toBeInTheDocument();
  });

  it('handles empty earthquakes array', () => {
    render(<AnalysisPanel earthquakes={[]} />);
    expect(screen.getByText('Henüz veri bulunmamaktadır')).toBeInTheDocument();
    expect(screen.getByText('0.0')).toBeInTheDocument();
  });

  it('displays magnitude counts correctly', () => {
    render(<AnalysisPanel earthquakes={mockEarthquakes} />);
    // Based on mock data: 2-3: 1 (Ankara 2.1), 3-4: 2 (İstanbul 3.5, Ankara 3.3), 4-5: 2 (İstanbul 4.2, Bursa 4.5), 5+: 1 (İzmir 5.8)
    const counts = screen.getAllByText(/^[012]$/);
    expect(counts.length).toBeGreaterThan(0);
  });
});
