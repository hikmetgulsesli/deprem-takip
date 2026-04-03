import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Veriler yükleniyor...',
  className = '',
}) => {
  return (
    <div
      className={`relative flex flex-col items-center justify-center min-h-[400px] p-8 bg-surface-container rounded-xl border border-outline-variant/10 ${className}`}
      role="status"
      aria-live="polite"
      data-testid="loading-spinner"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50 pointer-events-none" />

      {/* Modern Spinner */}
      <div className="relative w-32 h-32 mb-8">
        <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-transparent border-t-primary border-r-primary/30 animate-[spin_1s_linear_infinite]" />
        <div className="absolute inset-4 rounded-full border-b-2 border-l-2 border-transparent border-b-primary/60 border-l-primary/10 animate-[spin_1.5s_linear_infinite_reverse]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="material-symbols-outlined text-primary text-3xl animate-pulse"
            aria-hidden="true"
          >
            radar
          </span>
        </div>
      </div>

      <h3 className="font-headline text-2xl font-bold text-primary uppercase tracking-tight mb-3">
        {message}
      </h3>

      <p className="text-center text-on-surface-variant text-sm font-body leading-relaxed max-w-[240px] mb-8">
        Gelen ham sismik veriler spektral analiz biriminde süzülüyor. Lütfen bekleyin.
      </p>

      <div className="flex gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" />
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:0.2s]" />
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:0.4s]" />
      </div>

      <div className="mt-12 w-full grid grid-cols-3 gap-2">
        <div className="h-1 bg-primary/20 rounded-full overflow-hidden">
          <div className="h-full bg-primary w-full animate-[pulse_2s_infinite]" />
        </div>
        <div className="h-1 bg-primary/20 rounded-full overflow-hidden">
          <div className="h-full bg-primary w-3/4 animate-[pulse_2s_infinite_0.5s]" />
        </div>
        <div className="h-1 bg-primary/20 rounded-full overflow-hidden">
          <div className="h-full bg-primary w-1/2 animate-[pulse_2s_infinite_1s]" />
        </div>
      </div>
    </div>
  );
};
