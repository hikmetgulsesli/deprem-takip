import { useState } from 'react';
import { EarthquakeMap } from './components/EarthquakeMap';
import { MapLegend } from './components/MapLegend';
import './App.css';

interface Earthquake {
  id: string;
  location: string;
  magnitude: number;
  depth: number;
  timestamp: string;
  latitude: number;
  longitude: number;
  source: 'USGS' | 'KANDILLI' | 'AFAD';
}

const mockEarthquakes: Earthquake[] = [
  {
    id: '1',
    location: 'İstanbul',
    magnitude: 3.5,
    depth: 10,
    timestamp: new Date().toISOString(),
    latitude: 41.0082,
    longitude: 28.9784,
    source: 'KANDILLI'
  },
  {
    id: '2',
    location: 'Ege Denizi',
    magnitude: 4.2,
    depth: 15,
    timestamp: new Date().toISOString(),
    latitude: 38.5,
    longitude: 26.5,
    source: 'USGS'
  },
  {
    id: '3',
    location: 'Malatya',
    magnitude: 5.4,
    depth: 8,
    timestamp: new Date().toISOString(),
    latitude: 38.35,
    longitude: 38.3,
    source: 'KANDILLI'
  }
];

function App() {
  const [earthquakes] = useState<Earthquake[]>(mockEarthquakes);
  const [loading] = useState(false);
  const [error] = useState('');

  if (loading) return <div className="loading">Yükleniyor...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="h-screen w-full relative">
      <EarthquakeMap earthquakes={earthquakes} />
      <MapLegend />
    </div>
  );
}

export default App;
