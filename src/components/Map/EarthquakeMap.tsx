import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { Earthquake } from '../../types/earthquake';

interface EarthquakeMapProps {
  earthquakes: Earthquake[];
  onMarkerClick?: (earthquake: Earthquake) => void;
}

export function EarthquakeMap({ earthquakes, onMarkerClick }: EarthquakeMapProps) {
  // Calculate marker radius based on magnitude (min 5px, max 30px)
  const getRadius = (magnitude: number) => {
    return Math.max(5, Math.min(30, magnitude * 3));
  };

  // Get color based on source
  const getColor = (source: string) => {
    return source === 'kandilli' ? '#f97316' : '#3b82f6'; // orange-500 : blue-500
  };

  // Format time in Turkish
  const formatTime = (date: string) => {
    return new Date(date).toLocaleString('tr-TR', {
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
      zoom={6}
      style={{ height: '100%', width: '100%' }}
      className="z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      {earthquakes.map((eq) => (
        <CircleMarker
          key={eq.id}
          center={[eq.latitude, eq.longitude]}
          radius={getRadius(eq.magnitude)}
          fillColor={getColor(eq.source)}
          color={getColor(eq.source)}
          fillOpacity={0.7}
          stroke={true}
          weight={2}
          eventHandlers={{
            click: () => onMarkerClick?.(eq),
          }}
        >
          <Popup>
            <div className="popup-content min-w-[200px]">
              <h3 className="font-bold text-lg mb-1">{eq.location}</h3>
              <p className="font-bold text-xl mb-2" style={{ color: getColor(eq.source) }}>
                {eq.magnitude.toFixed(1)}
              </p>
              <div className="space-y-1 text-sm">
                <p><span className="text-gray-500">Derinlik:</span> {eq.depth} km</p>
                <p><span className="text-gray-500">Tarih:</span> {formatTime(eq.date)}</p>
                <p><span className="text-gray-500">Kaynak:</span> {eq.source === 'kandilli' ? 'Kandilli' : 'USGS'}</p>
              </div>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
