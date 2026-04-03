import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorBanner } from './ErrorBanner';

describe('ErrorBanner', () => {
  it('renders with default title and message', () => {
    render(<ErrorBanner />);
    expect(screen.getByText('Veri Akışı Kesildi')).toBeInTheDocument();
    expect(
      screen.getByText(/Merkezi sismik istasyon ile bağlantı zaman aşımına uğradı/)
    ).toBeInTheDocument();
  });

  it('renders with custom title and message', () => {
    render(
      <ErrorBanner
        title="Bağlantı Hatası"
        message="Sunucuya ulaşılamıyor."
      />
    );
    expect(screen.getByText('Bağlantı Hatası')).toBeInTheDocument();
    expect(screen.getByText('Sunucuya ulaşılamıyor.')).toBeInTheDocument();
  });

  it('renders retry button with Turkish label', () => {
    const onRetry = vi.fn();
    render(<ErrorBanner onRetry={onRetry} />);
    expect(screen.getByText('TEKRAR DENE')).toBeInTheDocument();
  });

  it('calls onRetry when retry button is clicked', () => {
    const onRetry = vi.fn();
    render(<ErrorBanner onRetry={onRetry} />);
    const retryButton = screen.getByText('TEKRAR DENE');
    fireEvent.click(retryButton);
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('does not render retry button when onRetry is not provided', () => {
    render(<ErrorBanner />);
    expect(screen.queryByText('TEKRAR DENE')).not.toBeInTheDocument();
  });

  it('has correct accessibility attributes', () => {
    render(<ErrorBanner />);
    const banner = screen.getByTestId('error-banner');
    expect(banner).toHaveAttribute('role', 'alert');
    expect(banner).toHaveAttribute('aria-live', 'assertive');
  });

  it('renders signal_disconnected icon', () => {
    render(<ErrorBanner />);
    expect(screen.getByText('signal_disconnected')).toBeInTheDocument();
  });

  it('renders packet loss indicator', () => {
    render(<ErrorBanner />);
    expect(screen.getByText('Packet Loss Rate')).toBeInTheDocument();
    expect(screen.getByText('100%')).toBeInTheDocument();
  });
});
