import { Circle } from 'lucide-react';

export function MapLegend() {
  return (
    <div className="absolute bottom-4 right-4 bg-slate-800/90 backdrop-blur-sm p-4 rounded-lg shadow-lg z-[1000] border border-slate-700">
      <h4 className="text-sm font-bold mb-3 text-white">Büyüklük</h4>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Circle className="w-6 h-6 text-blue-500 fill-blue-500/60" />
          <span className="text-xs text-slate-300">USGS</span>
        </div>
        <div className="flex items-center gap-2">
          <Circle className="w-6 h-6 text-orange-500 fill-orange-500/60" />
          <span className="text-xs text-slate-300">Kandilli</span>
        </div>
      </div>
      <div className="mt-4 pt-3 border-t border-slate-700">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 rounded-full bg-slate-400"></div>
          <span className="text-xs text-slate-400">&lt; 3.0</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-4 h-4 rounded-full bg-slate-400"></div>
          <span className="text-xs text-slate-400">3.0 - 5.0</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-slate-400"></div>
          <span className="text-xs text-slate-400">&gt; 5.0</span>
        </div>
      </div>
    </div>
  );
}
