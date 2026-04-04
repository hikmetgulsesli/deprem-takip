import type { Earthquake } from '../types/earthquake';
import { EmptyState } from './EmptyState';

interface EarthquakeListProps {
  earthquakes: Earthquake[];
  onEarthquakeClick?: (earthquake: Earthquake) => void;
  loading?: boolean;
}

export function EarthquakeList({ 
  earthquakes, 
  onEarthquakeClick,
  loading = false 
}: EarthquakeListProps) {
  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i} 
            className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/10 animate-pulse"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-surface-container-highest rounded-lg" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-surface-container-highest rounded w-3/4" />
                <div className="h-3 bg-surface-container-highest rounded w-1/2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (earthquakes.length === 0) {
    return (
      <EmptyState 
        title="Deprem Bulunamadı"
        message="Seçilen filtre kriterlerine uygun deprem kaydı bulunamadı."
      />
    );
  }

  const getMagnitudeColor = (magnitude: number) => {
    if (magnitude >= 5) return 'bg-error-container/30 border-error/30 text-error';
    if (magnitude >= 3) return 'bg-secondary-container/30 border-secondary/30 text-secondary';
    return 'bg-tertiary-container/30 border-tertiary/30 text-tertiary';
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    const timeAgo = diffMins < 1 ? 'Az önce' : diffMins < 60 ? `${diffMins} dakika önce` : diffHours < 24 ? `${diffHours} saat önce` : `${diffDays} gün önce`;

    return {
      full: date.toLocaleString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      ago: timeAgo
    };
  };

  return (
    <div className="space-y-2">
      {earthquakes.map((eq) => {
        const time = formatTime(eq.timestamp || eq.date || '');
        return (
          <div
            key={eq.id}
            onClick={() => onEarthquakeClick?.(eq)}
            className="flex items-center gap-4 p-4 rounded-lg hover:bg-surface-container-high transition-all group cursor-pointer border border-transparent hover:border-outline-variant/10"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onEarthquakeClick?.(eq);
              }
            }}
          >
            <div className={`w-12 h-12 rounded-lg flex flex-col items-center justify-center border ${getMagnitudeColor(eq.magnitude)} group-hover:scale-105 transition-transform`}>
              <span className="text-lg font-headline font-bold">{eq.magnitude.toFixed(1)}</span>
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-on-surface group-hover:text-primary transition-colors truncate">
                {eq.location}
              </p>
              <div className="flex items-center gap-3 mt-1">
                <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">
                  {time.ago}
                </p>
                <span className="text-on-surface-variant/30">•</span>
                <p className="text-[10px] text-on-surface-variant">
                  {eq.depth} km derinlik
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-bold bg-surface-container-high px-2 py-1 rounded text-on-surface-variant border border-outline-variant/10">
                {eq.source}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
