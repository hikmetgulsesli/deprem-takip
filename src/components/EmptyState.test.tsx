import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { EmptyState } from './EmptyState';

describe('EmptyState', () => {
  it('renders with default title and message', () => {
    render(<EmptyState />);
    expect(screen.getByText('Kayıt Bulunamadı')).toBeInTheDocument();
    expect(
      screen.getByText(/Seçilen filtre kriterlerine uygun sismik aktivite tespit edilemedi/)
    ).toBeInTheDocument();
  });

  it('renders with custom title and message', () => {
    render(
      <EmptyState
        title="Sonuç Yok"
        message="Arama kriterlerinize uygun deprem kaydı bulunamadı."
      />
    );
    expect(screen.getByText('Sonuç Yok')).toBeInTheDocument();
    expect(
      screen.getByText('Arama kriterlerinize uygun deprem kaydı bulunamadı.')
    ).toBeInTheDocument();
  });

  it('renders action button with Turkish label', () => {
    const onAction = vi.fn();
    render(<EmptyState onAction={onAction} />);
    expect(screen.getByText('FİLTRELERİ TEMİZLE')).toBeInTheDocument();
  });

  it('calls onAction when action button is clicked', () => {
    const onAction = vi.fn();
    render(<EmptyState onAction={onAction} />);
    const actionButton = screen.getByText('FİLTRELERİ TEMİZLE');
    fireEvent.click(actionButton);
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it('does not render action button when onAction is not provided', () => {
    render(<EmptyState />);
    expect(screen.queryByText('FİLTRELERİ TEMİZLE')).not.toBeInTheDocument();
  });

  it('has correct accessibility attributes', () => {
    render(<EmptyState />);
    const emptyState = screen.getByTestId('empty-state');
    expect(emptyState).toHaveAttribute('role', 'status');
    expect(emptyState).toHaveAttribute('aria-live', 'polite');
  });

  it('renders database_off icon', () => {
    render(<EmptyState />);
    expect(screen.getByText('database_off')).toBeInTheDocument();
  });

  it('renders placeholder stats', () => {
    render(<EmptyState />);
    expect(screen.getByText('Magnitude')).toBeInTheDocument();
    expect(screen.getByText('Derinlik')).toBeInTheDocument();
    expect(screen.getByText('Konum')).toBeInTheDocument();
  });

  it('renders custom action label', () => {
    const onAction = vi.fn();
    render(<EmptyState onAction={onAction} actionLabel="FİLTRELERİ SIFIRLA" />);
    expect(screen.getByText('FİLTRELERİ SIFIRLA')).toBeInTheDocument();
  });
});
