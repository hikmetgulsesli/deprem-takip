import type { FilterState } from '../types/earthquake';

interface FilterPanelProps {
  filters: FilterState;
  onMinMagnitudeChange: (value: number) => void;
  onTimeRangeChange: (value: '1h' | '24h' | '7d' | '30d') => void;
  onDataSourceChange: (value: 'ALL' | 'USGS' | 'KANDILLI' | 'AFAD') => void;
}

export function FilterPanel({
  filters,
  onMinMagnitudeChange,
  onTimeRangeChange,
  onDataSourceChange,
}: FilterPanelProps) {
  return (
    <div className="bg-surface-container p-6 rounded-2xl border border-outline-variant/15 space-y-6">
      <div>
        <div className="flex justify-between items-end mb-2">
          <label className="text-[11px] font-headline tracking-widest uppercase text-on-surface-variant">
            Minimum Büyüklük
          </label>
          <span className="text-primary font-headline font-bold">{filters.minMagnitude.toFixed(1)}</span>
        </div>
        <input
          type="range"
          min="0"
          max="7"
          step="0.5"
          value={filters.minMagnitude}
          onChange={(e) => onMinMagnitudeChange(parseFloat(e.target.value))}
          className="w-full h-2 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary"
        />
        <div className="flex justify-between text-xs text-on-surface-variant mt-1">
          <span>0</span>
          <span>3.5</span>
          <span>7</span>
        </div>
      </div>

      <div>
        <label className="block text-[11px] font-headline tracking-widest uppercase text-on-surface-variant mb-3">
          Zaman Aralığı
        </label>
        <div className="grid grid-cols-4 gap-2">
          {(['1h', '24h', '7d', '30d'] as const).map((range) => (
            <button
              key={range}
              onClick={() => onTimeRangeChange(range)}
              className={`py-2 px-3 rounded-lg font-bold text-[10px] uppercase tracking-wider transition-all ${
                filters.timeRange === range
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {range === '1h' ? '1S' : range === '24h' ? '24S' : range === '7d' ? '7G' : '30G'}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-[11px] font-headline tracking-widest uppercase text-on-surface-variant mb-3">
          Veri Kaynağı
        </label>
        <div className="space-y-2">
          {([
            { value: 'ALL', label: 'Tümü' },
            { value: 'KANDILLI', label: 'Kandilli' },
            { value: 'USGS', label: 'USGS' },
            { value: 'AFAD', label: 'AFAD' }
          ] as const).map(({ value, label }) => (
            <button
              key={value}
              onClick={() => onDataSourceChange(value)}
              className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                filters.source === value
                  ? 'bg-secondary-container text-on-secondary-container'
                  : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="text-sm font-medium">{label}</span>
              <div className={`w-10 h-5 rounded-full relative transition-colors ${
                filters.source === value ? 'bg-secondary' : 'bg-surface-container-highest'
              }`}>
                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${
                  filters.source === value ? 'right-0.5' : 'left-0.5'
                }`} />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
