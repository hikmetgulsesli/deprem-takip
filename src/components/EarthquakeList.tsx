import type { Earthquake } from '../types';

interface EarthquakeListProps {
  earthquakes: Earthquake[];
  onEarthquakeClick?: (earthquake: Earthquake) => void;
}

export function EarthquakeList({ earthquakes, onEarthquakeClick }: EarthquakeListProps) {
  return (
    <div className="space-y-3">
      {earthquakes.map((eq) => (
        <div
          key={eq.id}
          onClick={() => onEarthquakeClick?.(eq)}
          className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/10 cursor-pointer hover:bg-surface-container transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-lg ${
                eq.magnitude >= 5 ? 'bg-error/20 text-error' :
                eq.magnitude >= 4 ? 'bg-secondary/20 text-secondary' :
                'bg-tertiary/20 text-tertiary'
              }`}>
                {eq.magnitude.toFixed(1)}
              </div>
              <div>
                <h3 className="font-semibold text-on-surface">{eq.location}</h3>
                <p className="text-xs text-on-surface-variant">
                  {new Date(eq.timestamp || '').toLocaleString('tr-TR')}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-on-surface-variant">{eq.depth} km</p>
              <p className="text-xs text-on-surface-variant">{eq.source}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
