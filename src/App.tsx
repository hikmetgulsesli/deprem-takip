import { useState, useCallback, useMemo } from 'react';
import { Map, List, BarChart3, Bell, Settings, Info } from 'lucide-react';
import { 
  EarthquakeList, 
  EarthquakeMap, 
  FilterPanel,
  StatisticsBar,
  LoadingSpinner,
  ErrorBanner,
  EarthquakeDetailModal
} from './components';
import { About } from './About';
import { useFilteredEarthquakes } from './hooks/useEarthquakes';
import type { Earthquake, FilterState } from './types/earthquake';
import './App.css';

type TabType = 'harita' | 'liste' | 'analiz' | 'hakkinda';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('liste');
  const [selectedEarthquake, setSelectedEarthquake] = useState<Earthquake | null>(null);
  
  const {
    filteredEarthquakes,
    loading,
    error,
    refetch,
    filters,
    setFilters
  } = useFilteredEarthquakes();

  const handleEarthquakeClick = useCallback((earthquake: Earthquake) => {
    setSelectedEarthquake(earthquake);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedEarthquake(null);
  }, []);

  const handleFilterChange = useCallback((newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, [setFilters]);

  const stats = useMemo(() => {
    const total = filteredEarthquakes.length;
    const average = total > 0 
      ? filteredEarthquakes.reduce((sum, eq) => sum + eq.magnitude, 0) / total 
      : 0;
    const strongest = total > 0
      ? filteredEarthquakes.reduce((max, eq) => eq.magnitude > max.magnitude ? eq : max, filteredEarthquakes[0])
      : null;
    
    return { total, average, strongest };
  }, [filteredEarthquakes]);

  // Loading state
  if (loading && filteredEarthquakes.length === 0) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <LoadingSpinner message="Deprem verileri yükleniyor..." />
        </div>
      </div>
    );
  }

  // Error state
  if (error && filteredEarthquakes.length === 0) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <ErrorBanner 
            title="Bağlantı Hatası"
            message={error}
            onRetry={refetch}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body flex">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col h-screen p-4 bg-surface-container-low w-64 border-r border-white/5">
        <div className="mb-10 px-2">
          <h1 className="text-2xl font-black text-on-surface font-headline">Deprem Takip</h1>
          <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-medium">Gerçek Zamanlı İzleme</p>
        </div>
        <nav className="flex-1 space-y-2">
          <button 
            onClick={() => setActiveTab('harita')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-headline font-medium transition-all w-full text-left ${
              activeTab === 'harita' 
                ? 'bg-primary/10 text-primary border-r-4 border-primary' 
                : 'text-on-surface opacity-50 hover:bg-surface-container hover:opacity-100'
            }`}
          >
            <Map size={20} />
            <span>Harita</span>
          </button>
          <button 
            onClick={() => setActiveTab('liste')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-headline font-medium transition-all w-full text-left ${
              activeTab === 'liste' 
                ? 'bg-primary/10 text-primary border-r-4 border-primary' 
                : 'text-on-surface opacity-50 hover:bg-surface-container hover:opacity-100'
            }`}
          >
            <List size={20} />
            <span>Liste</span>
          </button>
          <button 
            onClick={() => setActiveTab('analiz')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-headline font-medium transition-all w-full text-left ${
              activeTab === 'analiz' 
                ? 'bg-primary/10 text-primary border-r-4 border-primary' 
                : 'text-on-surface opacity-50 hover:bg-surface-container hover:opacity-100'
            }`}
          >
            <BarChart3 size={20} />
            <span>Analiz</span>
          </button>
          <button 
            onClick={() => setActiveTab('hakkinda')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-headline font-medium transition-all w-full text-left ${
              activeTab === 'hakkinda' 
                ? 'bg-primary/10 text-primary border-r-4 border-primary' 
                : 'text-on-surface opacity-50 hover:bg-surface-container hover:opacity-100'
            }`}
          >
            <Info size={20} />
            <span>Hakkında</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Nav */}
        <header className="w-full bg-surface-dim flex justify-between items-center px-6 py-4 border-b border-white/5">
          <div className="md:hidden text-xl font-bold tracking-tighter text-on-surface font-headline">Deprem Takip</div>
          <div className="hidden md:flex gap-8 items-center">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">
              Son Güncelleme: {new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              className="p-2 text-primary hover:bg-surface-variant rounded-full transition-colors"
              aria-label="Bildirimler"
            >
              <Bell size={20} />
            </button>
            <button 
              className="p-2 text-primary hover:bg-surface-variant rounded-full transition-colors"
              aria-label="Ayarlar"
            >
              <Settings size={20} />
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'hakkinda' ? (
            <div className="p-6">
              <About />
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row h-full">
              {/* Filter Sidebar */}
              <aside className="w-full lg:w-80 p-6 border-b lg:border-b-0 lg:border-r border-outline-variant/10 bg-surface-container-low/30">
                <div className="mb-6">
                  <h2 className="font-headline text-lg font-bold tracking-tight text-on-surface mb-4">FİLTRELE</h2>
                  <FilterPanel
                    filters={filters}
                    onMinMagnitudeChange={(value) => handleFilterChange({ minMagnitude: value })}
                    onTimeRangeChange={(value) => handleFilterChange({ timeRange: value })}
                    onDataSourceChange={(value) => handleFilterChange({ source: value })}
                  />
                </div>
                
                {/* Statistics */}
                <div className="mt-8">
                  <h3 className="text-[11px] font-bold text-on-surface-variant uppercase tracking-widest mb-4">İSTATİSTİKLER</h3>
                  <StatisticsBar earthquakes={filteredEarthquakes} />
                </div>
              </aside>

              {/* Main Content Area */}
              <div className="flex-1 p-6 overflow-y-auto">
                {/* Stats Header */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-surface-container-low p-5 rounded-xl border border-outline-variant/10">
                    <p className="text-[10px] font-bold text-on-surface-variant tracking-widest mb-2 uppercase">En Yüksek Mag</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-headline font-bold text-error">
                        {stats.strongest ? stats.strongest.magnitude.toFixed(1) : '--'}
                      </span>
                      <span className="text-xs text-on-surface-variant font-medium">Mw</span>
                    </div>
                  </div>
                  <div className="bg-surface-container-low p-5 rounded-xl border border-outline-variant/10">
                    <p className="text-[10px] font-bold text-on-surface-variant tracking-widest mb-2 uppercase">Ortalama Mag</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-headline font-bold text-tertiary">{stats.average.toFixed(1)}</span>
                      <span className="text-xs text-on-surface-variant font-medium">Mw</span>
                    </div>
                  </div>
                  <div className="bg-surface-container-low p-5 rounded-xl border border-outline-variant/10">
                    <p className="text-[10px] font-bold text-on-surface-variant tracking-widest mb-2 uppercase">Toplam</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-headline font-bold text-primary">{stats.total}</span>
                      <span className="text-xs text-on-surface-variant font-medium">kayıt</span>
                    </div>
                  </div>
                  <div className="bg-surface-container-low p-5 rounded-xl border border-outline-variant/10 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-primary-container to-transparent"></div>
                    <p className="text-[10px] font-bold text-on-surface-variant tracking-widest mb-2 uppercase relative z-10">Durum</p>
                    <div className="flex items-baseline gap-2 relative z-10">
                      <span className="text-xl font-headline font-bold text-on-surface">
                        {loading ? 'Yükleniyor...' : 'Aktif'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tab Content */}
                {activeTab === 'harita' && (
                  <div className="h-[500px] lg:h-[600px] rounded-xl overflow-hidden border border-outline-variant/20">
                    <EarthquakeMap 
                      earthquakes={filteredEarthquakes}
                      onMarkerClick={handleEarthquakeClick}
                    />
                  </div>
                )}

                {activeTab === 'liste' && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-2xl font-bold font-headline text-on-surface">DEPREM LİSTESİ</h2>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded">CANLI VERİ</span>
                          <span className="text-xs font-medium text-on-surface-variant font-label uppercase tracking-widest">
                            {filteredEarthquakes.length} Sismik Olay
                          </span>
                        </div>
                      </div>
                    </div>
                    <EarthquakeList 
                      earthquakes={filteredEarthquakes}
                      onEarthquakeClick={handleEarthquakeClick}
                      loading={loading}
                    />
                  </div>
                )}

                {activeTab === 'analiz' && (
                  <div className="text-center py-20">
                    <BarChart3 size={64} className="mx-auto text-on-surface-variant/30 mb-4" />
                    <h2 className="text-2xl font-bold font-headline text-on-surface mb-2">Analiz Paneli</h2>
                    <p className="text-on-surface-variant">Detaylı sismik analiz raporları yakında eklenecek.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Mobile Bottom Nav */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface-container-low border-t border-white/5 px-6 py-3 flex justify-around z-40">
          <button 
            onClick={() => setActiveTab('harita')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'harita' ? 'text-primary' : 'text-on-surface opacity-50'}`}
          >
            <Map size={20} />
            <span className="text-[10px] font-bold">Harita</span>
          </button>
          <button 
            onClick={() => setActiveTab('liste')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'liste' ? 'text-primary' : 'text-on-surface opacity-50'}`}
          >
            <List size={20} />
            <span className="text-[10px] font-bold">Liste</span>
          </button>
          <button 
            onClick={() => setActiveTab('analiz')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'analiz' ? 'text-primary' : 'text-on-surface opacity-50'}`}
          >
            <BarChart3 size={20} />
            <span className="text-[10px] font-bold">Analiz</span>
          </button>
          <button 
            onClick={() => setActiveTab('hakkinda')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'hakkinda' ? 'text-primary' : 'text-on-surface opacity-50'}`}
          >
            <Info size={20} />
            <span className="text-[10px] font-bold">Hakkında</span>
          </button>
        </nav>
      </main>

      {/* Detail Modal */}
      <EarthquakeDetailModal 
        earthquake={selectedEarthquake}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;
