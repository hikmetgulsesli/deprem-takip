import { useFilters } from './hooks/useFilters';
import { FilterPanel } from './components/FilterPanel';
import './index.css';

function App() {
  const { filters, setMinMagnitude, setTimeRange, setSource, resetFilters } = useFilters();

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-headline text-4xl font-bold text-slate-100 mb-8">Deprem Takip</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filter Panel - Sidebar on desktop */}
          <aside className="lg:col-span-1">
            <FilterPanel
              filters={filters}
              onMinMagnitudeChange={setMinMagnitude}
              onTimeRangeChange={setTimeRange}
              onSourceChange={setSource}
              onReset={resetFilters}
            />
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            <div className="bg-slate-900 rounded-xl p-6">
              <h2 className="font-headline text-xl font-semibold text-slate-100 mb-4">
                Aktif Filtreler
              </h2>
              <div className="space-y-2 text-slate-300">
                <p>Min. Büyüklük: {filters.minMagnitude.toFixed(1)}+</p>
                <p>Zaman Aralığı: {filters.timeRange}</p>
                <p>Kaynak: {filters.source}</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
