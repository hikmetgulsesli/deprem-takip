import type { Earthquake } from '../types/earthquake';

interface StatisticsBarProps {
  earthquakes: Earthquake[];
}

export function StatisticsBar({ earthquakes }: StatisticsBarProps) {
  const total = earthquakes.length;
  const average = total > 0 
    ? earthquakes.reduce((sum, eq) => sum + eq.magnitude, 0) / total 
    : 0;
  const strongest = total > 0
    ? earthquakes.reduce((max, eq) => eq.magnitude > max.magnitude ? eq : max, earthquakes[0])
    : null;

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-surface-container p-4 rounded-xl border border-outline-variant/15 text-center">
        <div className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">
          Toplam
        </div>
        <div className="text-3xl font-black font-headline text-primary">
          {total}
        </div>
      </div>

      <div className="bg-surface-container p-4 rounded-xl border border-outline-variant/15 text-center">
        <div className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">
          Ortalama
        </div>
        <div className="text-3xl font-black font-headline text-secondary">
          {average.toFixed(1)}
        </div>
      </div>

      <div className="bg-surface-container p-4 rounded-xl border border-outline-variant/15 text-center">
        <div className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">
          En Güçlü
        </div>
        <div className="text-3xl font-black font-headline text-tertiary">
          {strongest ? strongest.magnitude.toFixed(1) : '--'}
        </div>
      </div>
    </div>
  );
}
