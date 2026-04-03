import React from 'react';

interface EmptyStateProps {
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'Kayıt Bulunamadı',
  message = 'Seçilen filtre kriterlerine uygun sismik aktivite tespit edilemedi. Filtreleri sıfırlamayı deneyin.',
  actionLabel = 'FİLTRELERİ TEMİZLE',
  onAction,
  className = '',
}) => {
  return (
    <div
      className={`group relative flex flex-col items-center justify-center min-h-[400px] p-8 bg-surface-container-low rounded-xl border border-outline-variant/10 ${className}`}
      role="status"
      aria-live="polite"
      data-testid="empty-state"
    >
      {/* Icon */}
      <div className="mb-8 opacity-40 group-hover:opacity-100 transition-opacity duration-700">
        <div className="relative">
          <span
            className="material-symbols-outlined text-7xl text-on-surface-variant font-thin"
            style={{ fontVariationSettings: "'wght' 100" }}
            aria-hidden="true"
          >
            database_off
          </span>
          <div className="absolute bottom-0 right-0 w-12 h-[1px] bg-primary/40 rotate-45 transform origin-left" />
        </div>
      </div>

      {/* Title */}
      <h3 className="font-headline text-2xl font-bold text-on-surface-variant uppercase tracking-tight mb-3">
        {title}
      </h3>

      {/* Message */}
      <p className="text-center text-on-surface-variant/60 text-sm font-body leading-relaxed max-w-[240px] mb-8">
        {message}
      </p>

      {/* Action button */}
      {onAction && (
        <button
          onClick={onAction}
          className="px-6 py-2 border border-outline-variant/30 text-on-surface-variant font-headline text-[10px] uppercase tracking-[0.25em] hover:bg-surface-container-highest transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
          type="button"
        >
          {actionLabel}
        </button>
      )}

      {/* Stats placeholders */}
      <div className="mt-12 flex items-center gap-6">
        <div className="text-center">
          <p className="text-[10px] uppercase font-headline font-bold text-on-surface-variant/30 mb-1">
            Magnitude
          </p>
          <p className="text-lg font-headline font-light text-on-surface-variant/50">--</p>
        </div>
        <div className="w-[1px] h-8 bg-outline-variant/20" />
        <div className="text-center">
          <p className="text-[10px] uppercase font-headline font-bold text-on-surface-variant/30 mb-1">
            Derinlik
          </p>
          <p className="text-lg font-headline font-light text-on-surface-variant/50">--</p>
        </div>
        <div className="w-[1px] h-8 bg-outline-variant/20" />
        <div className="text-center">
          <p className="text-[10px] uppercase font-headline font-bold text-on-surface-variant/30 mb-1">
            Konum
          </p>
          <p className="text-lg font-headline font-light text-on-surface-variant/50">--</p>
        </div>
      </div>
    </div>
  );
};
