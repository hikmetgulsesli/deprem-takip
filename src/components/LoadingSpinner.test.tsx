import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LoadingSpinner } from './LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders with default message', () => {
    render(<LoadingSpinner />);
    expect(screen.getByText('Veriler yükleniyor...')).toBeInTheDocument();
  });

  it('renders with custom message', () => {
    render(<LoadingSpinner message="Sismik veriler analiz ediliyor..." />);
    expect(screen.getByText('Sismik veriler analiz ediliyor...')).toBeInTheDocument();
  });

  it('has correct accessibility attributes', () => {
    render(<LoadingSpinner />);
    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toHaveAttribute('role', 'status');
    expect(spinner).toHaveAttribute('aria-live', 'polite');
  });

  it('renders radar icon', () => {
    render(<LoadingSpinner />);
    expect(screen.getByText('radar')).toBeInTheDocument();
  });

  it('renders loading description text', () => {
    render(<LoadingSpinner />);
    expect(
      screen.getByText(/Gelen ham sismik veriler spektral analiz biriminde süzülüyor/)
    ).toBeInTheDocument();
  });
});
