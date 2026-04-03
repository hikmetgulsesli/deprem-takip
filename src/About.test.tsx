import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { About } from './About';

describe('About Page', () => {
  it('renders app name heading', () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>
    );
    expect(screen.getByText('Deprem Takip')).toBeInTheDocument();
  });

  it('renders Veri Kaynakları section', () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>
    );
    expect(screen.getByText('Veri Kaynakları')).toBeInTheDocument();
  });

  it('renders Kandilli Rasathanesi source', () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>
    );
    expect(screen.getByText('Kandilli Rasathanesi')).toBeInTheDocument();
  });

  it('renders USGS source', () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>
    );
    expect(screen.getByText('USGS Earthquake Hazards Program')).toBeInTheDocument();
  });

  it('renders disclaimer text', () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>
    );
    expect(screen.getByText(/Bu uygulamadaki veriler bilgilendirme amaçlıdır/)).toBeInTheDocument();
  });

  it('renders version info', () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>
    );
    expect(screen.getByText('Versiyon')).toBeInTheDocument();
    expect(screen.getByText('1.0.0')).toBeInTheDocument();
  });

  it('renders last update timestamp', () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>
    );
    expect(screen.getByText('Son Güncelleme')).toBeInTheDocument();
  });

  it('has valid external links', () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>
    );
    const kandilliLink = screen.getByText('www.koeri.boun.edu.tr');
    const usgsLink = screen.getByText('earthquake.usgs.gov');
    
    expect(kandilliLink).toHaveAttribute('href', 'http://www.koeri.boun.edu.tr/sismo/2/tr/');
    expect(kandilliLink).toHaveAttribute('target', '_blank');
    expect(usgsLink).toHaveAttribute('href', 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php');
    expect(usgsLink).toHaveAttribute('target', '_blank');
  });
});
