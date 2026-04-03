import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { Earthquake } from '../types/earthquake';

interface EarthquakeMapProps {
  earthquakes: Earthquake[];
}

export function EarthquakeMap({ earthquakes }: EarthquakeMapProps) {
  // Calculate marker radius based on magnitude (min 5px, max 30px)
  const getRadius = (magnitude: number) => {
    return Math.max(5, Math.min(30, magnitude * 3));
  };

  // Get color based on source
  const getColor = (source: string) => {
    return source === 'KANDILLI' ? '#f97316' : '#3b82f6'; // orange-500 : blue-500
  };

  // Format time in Turkish
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <MapContainer
      center={[39, 35]}
      zoom={5}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {earthquakes.map((eq) => (
        <CircleMarker
          key={eq.id}
          center={[eq.latitude, eq.longitude]}
          radius={getRadius(eq.magnitude)}
          fillColor={getColor(eq.source)}
          color={getColor(eq.source)}
          fillOpacity={0.6}
          stroke={true}
          weight={2}
        >
          <Popup>
            <div className="popup-content">
              <h3 className="font-bold text-lg">{eq.location}</h3>
              <p className="font-bold text-xl" style={{ color: getColor(eq.source) }}>
                {eq.magnitude.toFixed(1)}
              </p>
              <p>Derinlik: {eq.depth} km</p>
              <p className="text-sm text-gray-500">{formatTime(eq.timestamp)}</p>
              <p className="text-xs text-gray-400">Kaynak: {eq.source}</p>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
