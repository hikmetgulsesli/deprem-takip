import type { FC } from 'react';
import { Activity, Globe, Clock, RotateCcw } from 'lucide-react';
import type { FilterState } from '../types';

interface FilterPanelProps {
  filters: FilterState;
  onMinMagnitudeChange: (value: number) => void;
  onTimeRangeChange: (value: FilterState['timeRange']) => void;
  onSourceChange: (value: FilterState['source']) => void;
  onReset: () => void;
}

const TIME_RANGE_OPTIONS: { value: FilterState['timeRange']; label: string }[] = [
  { value: '24h', label: 'Son 24 saat' },
  { value: '7d', label: 'Son 7 gün' },
  { value: '30d', label: 'Son 30 gün' },
];

const SOURCE_OPTIONS: { value: FilterState['source']; label: string; icon: typeof Activity }[] = [
  { value: 'Kandilli', label: 'Kandilli', icon: Activity },
  { value: 'USGS', label: 'USGS', icon: Globe },
  { value: 'all', label: 'Her ikisi', icon: Globe },
];

export const FilterPanel: FC<FilterPanelProps> = ({
  filters,
  onMinMagnitudeChange,
  onTimeRangeChange,
  onSourceChange,
  onReset,
}) => {
  return (
    <div className="bg-slate-900 rounded-xl p-6 space-y-6">
      {/* Magnitude Slider */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-slate-300">
          <Activity className="w-4 h-4" />
          <span className="font-medium">Büyüklük</span>
        </div>
        <div className="space-y-2">
          <input
            type="range"
            min="1"
            max="7"
            step="0.1"
            value={filters.minMagnitude}
            onChange={(e) => onMinMagnitudeChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            aria-label="Büyüklük filtresi"
          />
          <div className="flex justify-between text-sm text-slate-400">
            <span>1.0</span>
            <span className="text-blue-400 font-medium">{filters.minMagnitude.toFixed(1)}+</span>
            <span>7.0</span>
          </div>
        </div>
      </div>

      {/* Time Range */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-slate-300">
          <Clock className="w-4 h-4" />
          <span className="font-medium">Zaman Aralığı</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {TIME_RANGE_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => onTimeRangeChange(option.value)}
              className={`
                px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                ${filters.timeRange === option.value
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }
              `}
              aria-pressed={filters.timeRange === option.value}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Source Toggle */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-slate-300">
          <Globe className="w-4 h-4" />
          <span className="font-medium">Veri Kaynağı</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {SOURCE_OPTIONS.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.value}
                onClick={() => onSourceChange(option.value)}
                className={`
                  flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${filters.source === option.value
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                  }
                `}
                aria-pressed={filters.source === option.value}
              >
                <Icon className="w-4 h-4" />
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={onReset}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg font-medium transition-all duration-200"
      >
        <RotateCcw className="w-4 h-4" />
        Filtreleri Temizle
      </button>
    </div>
  );
};
