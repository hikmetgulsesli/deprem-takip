import type { FilterState } from '../types/earthquake';

interface FilterPanelProps {
  filters: FilterState;
  onMinMagnitudeChange: (value: number) => void;
  onTimeRangeChange: (value: '24h' | '7d' | '30d') => void;
  onDataSourceChange: (value: 'KANDILLI' | 'USGS' | 'BOTH') => void;
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
        <label className="block text-sm font-bold text-on-surface-variant mb-2">
          Minimum Büyüklük: {filters.minMagnitude.toFixed(1)}
        </label>
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
        <label className="block text-sm font-bold text-on-surface-variant mb-2">
          Zaman Aralığı
        </label>
        <div className="flex gap-2">
          {(['24h', '7d', '30d'] as const).map((range) => (
            <button
              key={range}
              onClick={() => onTimeRangeChange(range)}
              className={`flex-1 py-2 px-4 rounded-lg font-bold text-xs uppercase tracking-wider transition-all ${
                filters.timeRange === range
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {range === '24h' ? '24 Saat' : range === '7d' ? '7 Gün' : '30 Gün'}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-on-surface-variant mb-2">
          Veri Kaynağı
        </label>
        <div className="flex gap-2">
          {(['KANDILLI', 'USGS', 'BOTH'] as const).map((source) => (
            <button
              key={source}
              onClick={() => onDataSourceChange(source)}
              className={`flex-1 py-2 px-4 rounded-lg font-bold text-xs uppercase tracking-wider transition-all ${
                filters.dataSource === source
                  ? 'bg-secondary-container text-on-secondary-container'
                  : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {source === 'KANDILLI' ? 'Kandilli' : source === 'USGS' ? 'USGS' : 'Tümü'}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
