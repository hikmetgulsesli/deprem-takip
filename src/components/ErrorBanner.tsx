import React from 'react';

interface ErrorBannerProps {
  title?: string;
  message?: string;
  retryLabel?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorBanner: React.FC<ErrorBannerProps> = ({
  title = 'Veri Akışı Kesildi',
  message = 'Merkezi sismik istasyon ile bağlantı zaman aşımına uğradı. Sinyal geri kazanımı denetleniyor.',
  retryLabel = 'TEKRAR DENE',
  onRetry,
  className = '',
}) => {
  return (
    <div
      className={`group relative flex flex-col items-center justify-center min-h-[400px] p-8 bg-surface-container-low rounded-xl border border-outline-variant/10 overflow-hidden ${className}`}
      role="alert"
      aria-live="assertive"
      data-testid="error-banner"
    >
      {/* Error indicator bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-error/20">
        <div className="w-1/3 h-full bg-error" />
      </div>

      {/* Icon */}
      <div className="mb-8 relative">
        <div className="w-24 h-24 rounded-full border-4 border-error/20 flex items-center justify-center text-error">
          <span
            className="material-symbols-outlined text-5xl"
            style={{ fontVariationSettings: "'wght' 200" }}
            aria-hidden="true"
          >
            signal_disconnected
          </span>
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-error rounded-full flex items-center justify-center animate-pulse">
          <span
            className="material-symbols-outlined text-on-error text-xs"
            style={{ fontVariationSettings: "'wght' 700" }}
            aria-hidden="true"
          >
            priority_high
          </span>
        </div>
      </div>

      {/* Title */}
      <h3 className="font-headline text-2xl font-bold text-error uppercase tracking-tight mb-3">
        {title}
      </h3>

      {/* Message */}
      <p className="text-center text-on-surface-variant text-sm font-body leading-relaxed max-w-[240px] mb-8">
        {message}
      </p>

      {/* Retry button */}
      {onRetry && (
        <button
          onClick={onRetry}
          className="group/btn relative px-8 py-3 bg-error text-on-error font-headline font-bold uppercase text-xs tracking-[0.2em] rounded transition-transform active:scale-95 cursor-pointer hover:brightness-110 focus-visible:outline-2 focus-visible:outline-error focus-visible:outline-offset-2"
          type="button"
        >
          {retryLabel}
          <div className="absolute inset-0 border border-error translate-x-1 translate-y-1 group-hover/btn:translate-x-0 group-hover/btn:translate-y-0 transition-transform" />
        </button>
      )}

      {/* Progress bar */}
      <div className="mt-12 w-full">
        <div className="flex justify-between items-end mb-2">
          <span className="text-[10px] font-headline font-bold uppercase text-on-surface-variant/40">
            Packet Loss Rate
          </span>
          <span className="text-xs font-headline font-bold text-error">100%</span>
        </div>
        <div className="h-1 bg-surface-container-highest rounded-full overflow-hidden">
          <div className="h-full bg-error w-full" />
        </div>
      </div>
    </div>
  );
};
