import { useState } from 'react';
import { Map, List, BarChart3, FileText, Bell, Settings, RefreshCw } from 'lucide-react';
import { EarthquakeList } from './components/EarthquakeList';
import { ErrorBanner } from './components/ErrorBanner';
import { LoadingSpinner } from './components/LoadingSpinner';
import { useEarthquakes } from './hooks/useEarthquakes';
import type { Earthquake } from './types';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('liste');
  const [selectedEarthquake, setSelectedEarthquake] = useState<Earthquake | null>(null);
  const [minMagnitude, setMinMagnitude] = useState<number | undefined>(undefined);
  const [source, setSource] = useState<string | undefined>(undefined);

  const { earthquakes, loading, error, hasMore, total, refetch, loadMore } = useEarthquakes(minMagnitude, source);

  const handleEarthquakeClick = (earthquake: Earthquake) => {
    setSelectedEarthquake(earthquake);
    // In a real app, this would center the map and open a modal
    console.log('Selected earthquake:', earthquake);
  };

  if (loading && earthquakes.length === 0) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <LoadingSpinner label="Deprem verileri yükleniyor..." />
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
            onClick={() => setActiveTab('raporlar')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-headline font-medium transition-all w-full text-left ${
              activeTab === 'raporlar' 
                ? 'bg-primary/10 text-primary border-r-4 border-primary' 
                : 'text-on-surface opacity-50 hover:bg-surface-container hover:opacity-100'
            }`}
          >
            <FileText size={20} />
            <span>Raporlar</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Nav */}
        <header className="w-full bg-surface-dim flex justify-between items-center px-6 py-4 border-b border-white/5">
          <div className="md:hidden text-xl font-bold tracking-tighter text-on-surface font-headline">Deprem Takip</div>
          <div className="hidden md:flex gap-8 items-center">
            <span className="text-primary font-bold border-b-2 border-primary font-headline py-1">Son Depremler</span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => refetch()}
              disabled={loading}
              className="p-2 text-primary hover:bg-surface-variant rounded-full transition-colors disabled:opacity-50"
            >
              <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
            </button>
            <button className="p-2 text-primary hover:bg-surface-variant rounded-full transition-colors">
              <Bell size={20} />
            </button>
            <button className="p-2 text-primary hover:bg-surface-variant rounded-full transition-colors">
              <Settings size={20} />
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 pb-24 md:pb-6">
          <div className="max-w-6xl mx-auto">
            {/* Error Banner */}
            {error && (
              <div className="mb-6">
                <ErrorBanner error={error} onRetry={refetch} type="api" />
              </div>
            )}

            {/* Stats Header */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-surface-container-low p-5 rounded-xl border border-outline-variant/10">
                <p className="text-[10px] font-bold text-on-surface-variant tracking-widest mb-2 uppercase">En Yüksek Mag</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-headline font-bold text-error">
                    {earthquakes.length > 0 ? Math.max(...earthquakes.map(eq => eq.magnitude)).toFixed(1) : '-'}
                  </span>
                  <span className="text-xs text-on-surface-variant font-medium">Mv</span>
                </div>
              </div>
              <div className="bg-surface-container-low p-5 rounded-xl border border-outline-variant/10">
                <p className="text-[10px] font-bold text-on-surface-variant tracking-widest mb-2 uppercase">Ortalama Derinlik</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-headline font-bold text-tertiary">
                    {earthquakes.length > 0 ? (earthquakes.reduce((acc, eq) => acc + eq.depth, 0) / earthquakes.length).toFixed(1) : '-'}
                  </span>
                  <span className="text-xs text-on-surface-variant font-medium">km</span>
                </div>
              </div>
              <div className="bg-surface-container-low p-5 rounded-xl border border-outline-variant/10">
                <p className="text-[10px] font-bold text-on-surface-variant tracking-widest mb-2 uppercase">Sismik Aktivite</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-headline font-bold text-primary">Normal</span>
                </div>
              </div>
              <div className="bg-surface-container-low p-5 rounded-xl border border-outline-variant/10 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-primary-container to-transparent"></div>
                <p className="text-[10px] font-bold text-on-surface-variant tracking-widest mb-2 uppercase relative z-10">Aktif Depremler</p>
                <div className="flex items-baseline gap-2 relative z-10">
                  <span className="text-3xl font-headline font-bold text-on-surface">{total}</span>
                </div>
              </div>
            </div>

            {/* Filter Controls */}
            <div className="flex flex-wrap gap-4 mb-6">
              <select
                value={minMagnitude || ''}
                onChange={(e) => setMinMagnitude(e.target.value ? parseFloat(e.target.value) : undefined)}
                className="px-4 py-2 bg-surface-container rounded-lg text-on-surface border border-outline-variant/20 focus:border-primary focus:outline-none"
              >
                <option value="">Tüm Büyüklükler</option>
                <option value="2">2.0+</option>
                <option value="3">3.0+</option>
                <option value="4">4.0+</option>
                <option value="5">5.0+</option>
              </select>
              <select
                value={source || ''}
                onChange={(e) => setSource(e.target.value || undefined)}
                className="px-4 py-2 bg-surface-container rounded-lg text-on-surface border border-outline-variant/20 focus:border-primary focus:outline-none"
              >
                <option value="">Tüm Kaynaklar</option>
                <option value="kandilli">Kandilli</option>
                <option value="USGS">USGS</option>
                <option value="AFAD">AFAD</option>
              </select>
            </div>

            {/* Earthquake List */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold font-headline text-on-surface mb-2">DEPREM LİSTESİ</h2>
              <div className="flex items-center gap-4">
                <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded">CANLI VERİ</span>
                <span className="text-xs font-medium text-on-surface-variant font-label uppercase tracking-widest">Son 24 Saat İçinde {total} Sismik Olay</span>
              </div>
            </div>

            {loading && earthquakes.length === 0 ? (
              <LoadingSpinner label="Deprem verileri yükleniyor..." />
            ) : (
              <>
                <EarthquakeList 
                  earthquakes={earthquakes}
                  onEarthquakeClick={handleEarthquakeClick}
                />
                
                {/* Load More */}
                {hasMore && (
                  <div className="mt-6 text-center">
                    <button
                      onClick={loadMore}
                      disabled={loading}
                      className="px-6 py-3 bg-surface-container hover:bg-surface-container-high text-on-surface rounded-lg font-medium transition-all disabled:opacity-50"
                    >
                      {loading ? 'Yükleniyor...' : 'Daha Fazla Yükle'}
                    </button>
                  </div>
                )}
              </>
            )}

            {/* Selected Earthquake Info */}
            {selectedEarthquake && (
              <div className="mt-6 p-4 bg-primary/10 rounded-xl border border-primary/30">
                <p className="text-sm text-on-surface">
                  Seçilen deprem: <span className="font-semibold">{selectedEarthquake.location}</span> - 
                  Büyüklük: <span className="font-semibold">{selectedEarthquake.magnitude}</span>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Bottom Nav */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface-container-low border-t border-white/5 px-6 py-3 flex justify-around">
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
            onClick={() => setActiveTab('ayarlar')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'ayarlar' ? 'text-primary' : 'text-on-surface opacity-50'}`}
          >
            <Settings size={20} />
            <span className="text-[10px] font-bold">Ayar</span>
          </button>
        </nav>
      </main>
    </div>
  );
}

export default App;
