import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MapLegend } from './MapLegend';

describe('MapLegend', () => {
  it('renders legend title', () => {
    render(<MapLegend />);
    expect(screen.getByText('Büyüklük')).toBeInTheDocument();
  });

  it('renders USGS label', () => {
    render(<MapLegend />);
    expect(screen.getByText('USGS')).toBeInTheDocument();
  });

  it('renders Kandilli label', () => {
    render(<MapLegend />);
    expect(screen.getByText('Kandilli')).toBeInTheDocument();
  });

  it('renders magnitude ranges', () => {
    render(<MapLegend />);
    expect(screen.getByText('< 3.0')).toBeInTheDocument();
    expect(screen.getByText('3.0 - 5.0')).toBeInTheDocument();
    expect(screen.getByText('> 5.0')).toBeInTheDocument();
  });
});
