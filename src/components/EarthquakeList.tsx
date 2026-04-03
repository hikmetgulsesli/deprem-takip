import { useState, useMemo } from 'react';
import type { Earthquake } from '../types';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

type SortField = 'timestamp' | 'location' | 'magnitude' | 'depth' | 'source';
type SortDirection = 'asc' | 'desc';

interface EarthquakeListProps {
  earthquakes: Earthquake[];
  onEarthquakeClick?: (earthquake: Earthquake) => void;
}

interface SortState {
  field: SortField;
  direction: SortDirection;
}

const getMagnitudeColor = (magnitude: number): string => {
  if (magnitude >= 6) return 'bg-red-500/20 text-red-400 border-red-500/30';
  if (magnitude >= 4) return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
  if (magnitude >= 2) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
  return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
};

const getSourceBadgeColor = (source: string): string => {
  switch (source) {
    case 'USGS':
      return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    case 'KANDILLI':
      return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
    case 'AFAD':
      return 'bg-green-500/20 text-green-400 border-green-500/30';
    default:
      return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
  }
};

const formatDate = (timestamp: string): string => {
  const date = new Date(timestamp);
  return date.toLocaleDateString('tr-TR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

const formatTime = (timestamp: string): string => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('tr-TR', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export function EarthquakeList({ earthquakes, onEarthquakeClick }: EarthquakeListProps) {
  const [sort, setSort] = useState<SortState>({ field: 'timestamp', direction: 'desc' });

  const handleSort = (field: SortField) => {
    setSort(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const sortedEarthquakes = useMemo(() => {
    return [...earthquakes].sort((a, b) => {
      let comparison = 0;
      switch (sort.field) {
        case 'timestamp':
          comparison = new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
          break;
        case 'location':
          comparison = a.location.localeCompare(b.location);
          break;
        case 'magnitude':
          comparison = a.magnitude - b.magnitude;
          break;
        case 'depth':
          comparison = a.depth - b.depth;
          break;
        case 'source':
          comparison = a.source.localeCompare(b.source);
          break;
      }
      return sort.direction === 'asc' ? comparison : -comparison;
    });
  }, [earthquakes, sort]);

  const getSortIcon = (field: SortField) => {
    if (sort.field !== field) return <ArrowUpDown className="w-4 h-4 opacity-40" />;
    return sort.direction === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />;
  };

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-800/50 border-b border-slate-800">
              <th
                onClick={() => handleSort('timestamp')}
                className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider cursor-pointer hover:text-slate-200 transition-colors"
              >
                <div className="flex items-center gap-2">
                  Tarih
                  {getSortIcon('timestamp')}
                </div>
              </th>
              <th
                onClick={() => handleSort('location')}
                className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider cursor-pointer hover:text-slate-200 transition-colors"
              >
                <div className="flex items-center gap-2">
                  Yer
                  {getSortIcon('location')}
                </div>
              </th>
              <th
                onClick={() => handleSort('magnitude')}
                className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider cursor-pointer hover:text-slate-200 transition-colors"
              >
                <div className="flex items-center gap-2">
                  Büyüklük
                  {getSortIcon('magnitude')}
                </div>
              </th>
              <th
                onClick={() => handleSort('depth')}
                className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider cursor-pointer hover:text-slate-200 transition-colors"
              >
                <div className="flex items-center gap-2">
                  Derinlik
                  {getSortIcon('depth')}
                </div>
              </th>
              <th
                onClick={() => handleSort('source')}
                className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider cursor-pointer hover:text-slate-200 transition-colors"
              >
                <div className="flex items-center gap-2">
                  Kaynak
                  {getSortIcon('source')}
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {sortedEarthquakes.map((earthquake) => (
              <tr
                key={earthquake.id}
                onClick={() => onEarthquakeClick?.(earthquake)}
                className="hover:bg-slate-800/50 cursor-pointer transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="text-sm text-slate-200">{formatDate(earthquake.timestamp)}</div>
                  <div className="text-xs text-slate-500">{formatTime(earthquake.timestamp)}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-slate-200">{earthquake.location}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-lg text-sm font-bold border ${getMagnitudeColor(earthquake.magnitude)}`}>
                    {earthquake.magnitude.toFixed(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-slate-200">{earthquake.depth} km</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${getSourceBadgeColor(earthquake.source)}`}>
                    {earthquake.source}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List */}
      <div className="md:hidden divide-y divide-slate-800">
        {sortedEarthquakes.map((earthquake) => (
          <div
            key={earthquake.id}
            onClick={() => onEarthquakeClick?.(earthquake)}
            className="p-4 hover:bg-slate-800/50 cursor-pointer transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="text-sm text-slate-200">{formatDate(earthquake.timestamp)}</div>
                <div className="text-xs text-slate-500">{formatTime(earthquake.timestamp)}</div>
              </div>
              <span className={`inline-flex items-center px-3 py-1 rounded-lg text-sm font-bold border ${getMagnitudeColor(earthquake.magnitude)}`}>
                {earthquake.magnitude.toFixed(1)}
              </span>
            </div>
            <div className="text-sm text-slate-200 mb-2">{earthquake.location}</div>
            <div className="flex items-center justify-between">
              <div className="text-xs text-slate-500">{earthquake.depth} km derinlik</div>
              <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${getSourceBadgeColor(earthquake.source)}`}>
                {earthquake.source}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
