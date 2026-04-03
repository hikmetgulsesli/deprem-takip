import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { About } from './About';

describe('About page', () => {
  it('renders app name heading', () => {
    render(<About />);
    expect(screen.getByText('Deprem Takip')).toBeInTheDocument();
  });

  it('renders Veri Kaynakları section', () => {
    render(<About />);
    expect(screen.getByText('Veri Kaynakları')).toBeInTheDocument();
  });

  it('renders Kandilli Rasathanesi source', () => {
    render(<About />);
    expect(screen.getByText('Kandilli Rasathanesi')).toBeInTheDocument();
    expect(screen.getByText(/Türkiye ve çevresindeki depremler/i)).toBeInTheDocument();
  });

  it('renders USGS source', () => {
    render(<About />);
    expect(screen.getByText('USGS Earthquake Hazards Program')).toBeInTheDocument();
    expect(screen.getByText(/Dünya genelindeki depremler/i)).toBeInTheDocument();
  });

  it('renders disclaimer', () => {
    render(<About />);
    expect(screen.getByText(/Bu uygulamadaki veriler bilgilendirme amaçlıdır/i)).toBeInTheDocument();
  });

  it('renders version info', () => {
    render(<About />);
    expect(screen.getByText('Versiyon')).toBeInTheDocument();
    expect(screen.getByText('1.0.0')).toBeInTheDocument();
  });

  it('renders last update timestamp', () => {
    render(<About />);
    expect(screen.getByText('Son Güncelleme')).toBeInTheDocument();
  });

  it('has valid source links', () => {
    render(<About />);
    const kandilliLink = screen.getByText('www.koeri.boun.edu.tr');
    const usgsLink = screen.getByText('earthquake.usgs.gov');
    
    expect(kandilliLink).toHaveAttribute('href', 'http://www.koeri.boun.edu.tr/sismo/2/tr/');
    expect(usgsLink).toHaveAttribute('href', 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php');
  });
});
