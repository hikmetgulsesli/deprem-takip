import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FilterPanel } from './FilterPanel';
import type { FilterState } from '../types';

describe('FilterPanel', () => {
  const defaultFilters: FilterState = {
    minMagnitude: 3,
    timeRange: '24h',
    source: 'all',
  };

  it('renders magnitude slider with correct label', () => {
    render(
      <FilterPanel
        filters={defaultFilters}
        onMinMagnitudeChange={vi.fn()}
        onTimeRangeChange={vi.fn()}
        onSourceChange={vi.fn()}
        onReset={vi.fn()}
      />
    );
    
    expect(screen.getByText('Büyüklük')).toBeInTheDocument();
    expect(screen.getByLabelText('Büyüklük filtresi')).toBeInTheDocument();
  });

  it('renders time range buttons with Turkish labels', () => {
    render(
      <FilterPanel
        filters={defaultFilters}
        onMinMagnitudeChange={vi.fn()}
        onTimeRangeChange={vi.fn()}
        onSourceChange={vi.fn()}
        onReset={vi.fn()}
      />
    );
    
    expect(screen.getByText('Zaman Aralığı')).toBeInTheDocument();
    expect(screen.getByText('Son 24 saat')).toBeInTheDocument();
    expect(screen.getByText('Son 7 gün')).toBeInTheDocument();
    expect(screen.getByText('Son 30 gün')).toBeInTheDocument();
  });

  it('renders source toggle with Turkish labels', () => {
    render(
      <FilterPanel
        filters={defaultFilters}
        onMinMagnitudeChange={vi.fn()}
        onTimeRangeChange={vi.fn()}
        onSourceChange={vi.fn()}
        onReset={vi.fn()}
      />
    );
    
    expect(screen.getByText('Veri Kaynağı')).toBeInTheDocument();
    expect(screen.getByText('Kandilli')).toBeInTheDocument();
    expect(screen.getByText('USGS')).toBeInTheDocument();
    expect(screen.getByText('Her ikisi')).toBeInTheDocument();
  });

  it('renders reset button with Turkish label', () => {
    render(
      <FilterPanel
        filters={defaultFilters}
        onMinMagnitudeChange={vi.fn()}
        onTimeRangeChange={vi.fn()}
        onSourceChange={vi.fn()}
        onReset={vi.fn()}
      />
    );
    
    expect(screen.getByText('Filtreleri Temizle')).toBeInTheDocument();
  });

  it('calls onTimeRangeChange when time range button is clicked', () => {
    const onTimeRangeChange = vi.fn();
    render(
      <FilterPanel
        filters={defaultFilters}
        onMinMagnitudeChange={vi.fn()}
        onTimeRangeChange={onTimeRangeChange}
        onSourceChange={vi.fn()}
        onReset={vi.fn()}
      />
    );
    
    fireEvent.click(screen.getByText('Son 7 gün'));
    expect(onTimeRangeChange).toHaveBeenCalledWith('7d');
  });

  it('calls onSourceChange when source button is clicked', () => {
    const onSourceChange = vi.fn();
    render(
      <FilterPanel
        filters={defaultFilters}
        onMinMagnitudeChange={vi.fn()}
        onTimeRangeChange={vi.fn()}
        onSourceChange={onSourceChange}
        onReset={vi.fn()}
      />
    );
    
    fireEvent.click(screen.getByText('Kandilli'));
    expect(onSourceChange).toHaveBeenCalledWith('Kandilli');
  });

  it('calls onReset when reset button is clicked', () => {
    const onReset = vi.fn();
    render(
      <FilterPanel
        filters={defaultFilters}
        onMinMagnitudeChange={vi.fn()}
        onTimeRangeChange={vi.fn()}
        onSourceChange={vi.fn()}
        onReset={onReset}
      />
    );
    
    fireEvent.click(screen.getByText('Filtreleri Temizle'));
    expect(onReset).toHaveBeenCalled();
  });

  it('shows active state for selected time range', () => {
    render(
      <FilterPanel
        filters={{ ...defaultFilters, timeRange: '7d' }}
        onMinMagnitudeChange={vi.fn()}
        onTimeRangeChange={vi.fn()}
        onSourceChange={vi.fn()}
        onReset={vi.fn()}
      />
    );
    
    const activeButton = screen.getByText('Son 7 gün');
    expect(activeButton).toHaveAttribute('aria-pressed', 'true');
  });

  it('shows active state for selected source', () => {
    render(
      <FilterPanel
        filters={{ ...defaultFilters, source: 'Kandilli' }}
        onMinMagnitudeChange={vi.fn()}
        onTimeRangeChange={vi.fn()}
        onSourceChange={vi.fn()}
        onReset={vi.fn()}
      />
    );
    
    const activeButton = screen.getByText('Kandilli');
    expect(activeButton).toHaveAttribute('aria-pressed', 'true');
  });
});
