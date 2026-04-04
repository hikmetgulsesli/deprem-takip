import type { Earthquake } from '../types/earthquake';
import { X } from 'lucide-react';

interface EarthquakeDetailModalProps {
  earthquake: Earthquake | null;
  onClose: () => void;
}

export function EarthquakeDetailModal({ earthquake, onClose }: EarthquakeDetailModalProps) {
  if (!earthquake) return null;

  const getMagnitudeColor = (magnitude: number) => {
    if (magnitude >= 5) return 'text-error';
    if (magnitude >= 3) return 'text-secondary';
    return 'text-tertiary';
  };

  const getMagnitudeLabel = (magnitude: number) => {
    if (magnitude >= 6) return 'Güçlü Deprem';
    if (magnitude >= 5) return 'Orta-Şiddetli Deprem';
    if (magnitude >= 4) return 'Hafif Deprem';
    if (magnitude >= 3) return 'Çok Hafif Deprem';
    return 'Mikro Deprem';
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return {
      date: date.toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      time: date.toLocaleTimeString('tr-TR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    };
  };

  const time = formatDate(earthquake.timestamp || earthquake.date || '');

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="bg-surface-container-low rounded-2xl border border-outline-variant/20 w-full max-w-md overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative p-6 border-b border-outline-variant/10">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high rounded-lg transition-colors"
            aria-label="Kapat"
          >
            <X size={20} />
          </button>
          
          <div className="text-center">
            <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
              Deprem Detayı
            </span>
            <h2 
              id="modal-title" 
              className={`text-5xl font-headline font-black mt-2 ${getMagnitudeColor(earthquake.magnitude)}`}
            >
              {earthquake.magnitude.toFixed(1)}
            </h2>
            <p className="text-sm font-medium text-on-surface-variant mt-1">
              {getMagnitudeLabel(earthquake.magnitude)}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Location */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">
              Konum
            </p>
            <p className="text-lg font-semibold text-on-surface leading-tight">
              {earthquake.location}
            </p>
          </div>

          {/* Grid Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface-container-high/50 p-4 rounded-xl">
              <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">
                Derinlik
              </p>
              <p className="text-2xl font-headline font-bold text-on-surface">
                {earthquake.depth} <span className="text-sm font-normal text-on-surface-variant">km</span>
              </p>
            </div>
            
            <div className="bg-surface-container-high/50 p-4 rounded-xl">
              <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">
                Kaynak
              </p>
              <p className="text-xl font-headline font-bold text-on-surface">
                {earthquake.source}
              </p>
            </div>
          </div>

          {/* Date & Time */}
          <div className="bg-surface-container-high/50 p-4 rounded-xl">
            <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">
              Tarih ve Saat
            </p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold text-on-surface">{time.date}</p>
                <p className="text-sm text-on-surface-variant">{time.time}</p>
              </div>
              <span className="material-symbols-outlined text-3xl text-on-surface-variant">
                calendar_today
              </span>
            </div>
          </div>

          {/* Coordinates */}
          <div className="flex items-center justify-between text-xs text-on-surface-variant">
            <span>Koordinatlar:</span>
            <span className="font-mono">
              {earthquake.latitude.toFixed(4)}°N, {earthquake.longitude.toFixed(4)}°E
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-surface-container-high/30 border-t border-outline-variant/10">
          <button
            onClick={onClose}
            className="w-full py-3 bg-primary text-on-primary font-headline font-bold text-xs uppercase tracking-[0.2em] rounded-xl hover:brightness-110 transition-all active:scale-[0.98]"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
}
