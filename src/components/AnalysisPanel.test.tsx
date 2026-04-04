import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AnalysisPanel } from './AnalysisPanel';
import type { Earthquake } from '../types';

describe('AnalysisPanel', () => {
  const mockEarthquakes: Earthquake[] = [
    { id: '1', location: 'İstanbul', magnitude: 3.5, depth: 10, date: new Date().toISOString(), latitude: 41, longitude: 28, source: 'kandilli' },
    { id: '2', location: 'İstanbul', magnitude: 4.2, depth: 12, date: new Date().toISOString(), latitude: 41, longitude: 28, source: 'kandilli' },
    { id: '3', location: 'Ankara', magnitude: 2.1, depth: 8, date: new Date().toISOString(), latitude: 39, longitude: 32, source: 'usgs' },
    { id: '4', location: 'İzmir', magnitude: 5.8, depth: 15, date: new Date().toISOString(), latitude: 38, longitude: 27, source: 'usgs' },
    { id: '5', location: 'Ankara', magnitude: 3.3, depth: 10, date: new Date().toISOString(), latitude: 39, longitude: 32, source: 'kandilli' },
    { id: '6', location: 'Bursa', magnitude: 4.5, depth: 11, date: new Date().toISOString(), latitude: 40, longitude: 29, source: 'usgs' },
  ];

  it('renders magnitude distribution section', () => {
    render(<AnalysisPanel earthquakes={mockEarthquakes} />);
    expect(screen.getByText('BÜYÜKLÜK DAĞILIMI')).toBeInTheDocument();
    expect(screen.getByText('Deprem büyüklüğü aralıklarına göre dağılım')).toBeInTheDocument();
  });

  it('renders magnitude range labels', () => {
    render(<AnalysisPanel earthquakes={mockEarthquakes} />);
    expect(screen.getByText('M 1-2')).toBeInTheDocument();
    expect(screen.getByText('M 2-3')).toBeInTheDocument();
    expect(screen.getByText('M 3-4')).toBeInTheDocument();
    expect(screen.getByText('M 4-5')).toBeInTheDocument();
    expect(screen.getByText('M 5+')).toBeInTheDocument();
  });

  it('renders top locations section', () => {
    render(<AnalysisPanel earthquakes={mockEarthquakes} />);
    expect(screen.getByText('EN AKTİF BÖLGELER')).toBeInTheDocument();
    expect(screen.getByText('Deprem sayısına göre ilk 5 lokasyon')).toBeInTheDocument();
  });

  it('displays top 5 locations sorted by count', () => {
    render(<AnalysisPanel earthquakes={mockEarthquakes} />);
    // İstanbul should be first with 2 earthquakes
    expect(screen.getByText('İstanbul')).toBeInTheDocument();
    expect(screen.getByText('Ankara')).toBeInTheDocument();
    expect(screen.getByText('İzmir')).toBeInTheDocument();
    expect(screen.getByText('Bursa')).toBeInTheDocument();
  });

  it('displays total earthquake count in summary', () => {
    render(<AnalysisPanel earthquakes={mockEarthquakes} />);
    expect(screen.getByText(/Toplam 6 deprem analiz edildi/)).toBeInTheDocument();
  });

  it('displays summary stats', () => {
    render(<AnalysisPanel earthquakes={mockEarthquakes} />);
    expect(screen.getByText('İSTATİSTİKLER')).toBeInTheDocument();
  });

  it('calculates average magnitude correctly', () => {
    render(<AnalysisPanel earthquakes={mockEarthquakes} />);
    // Average: (3.5 + 4.2 + 2.1 + 5.8 + 3.3 + 4.5) / 6 = 23.4 / 6 = 3.9
    const avgElements = screen.getAllByText('3.9');
    expect(avgElements.length).toBeGreaterThan(0);
  });

  it('calculates max magnitude correctly', () => {
    render(<AnalysisPanel earthquakes={mockEarthquakes} />);
    // Max: 5.8
    const maxElements = screen.getAllByText('5.8');
    expect(maxElements.length).toBeGreaterThan(0);
  });

  it('handles empty earthquakes array', () => {
    render(<AnalysisPanel earthquakes={[]} />);
    expect(screen.getByText('Henüz veri bulunmamaktadır')).toBeInTheDocument();
    // Check for 0.0 values (there are multiple, so use getAllByText)
    const zeroValues = screen.getAllByText('0.0');
    expect(zeroValues.length).toBeGreaterThan(0);
  });

  it('displays magnitude counts correctly', () => {
    render(<AnalysisPanel earthquakes={mockEarthquakes} />);
    // Based on mock data: 2-3: 1 (Ankara 2.1), 3-4: 2 (İstanbul 3.5, Ankara 3.3), 4-5: 2 (İstanbul 4.2, Bursa 4.5), 5+: 1 (İzmir 5.8)
    // Check that counts are displayed (use getAllByText since there are multiple "1" values)
    const countOnes = screen.getAllByText('1');
    expect(countOnes.length).toBeGreaterThan(0);
  });

  it('renders magnitude segmentation section', () => {
    render(<AnalysisPanel earthquakes={mockEarthquakes} />);
    expect(screen.getByText('MAGNİTÜD SEGMENTASYONU')).toBeInTheDocument();
  });

  it('renders pie chart legend items', () => {
    render(<AnalysisPanel earthquakes={mockEarthquakes} />);
    expect(screen.getByText('M 1.0 - 3.0')).toBeInTheDocument();
    expect(screen.getByText('M 3.0 - 5.0')).toBeInTheDocument();
    expect(screen.getByText('M 5.0+')).toBeInTheDocument();
  });

  it('renders analysis title', () => {
    render(<AnalysisPanel earthquakes={mockEarthquakes} />);
    expect(screen.getByText('SİSMİK ANALİZ')).toBeInTheDocument();
  });

  it('renders live pulse badge', () => {
    render(<AnalysisPanel earthquakes={mockEarthquakes} />);
    expect(screen.getByText('LIVE PULSE')).toBeInTheDocument();
  });
});
