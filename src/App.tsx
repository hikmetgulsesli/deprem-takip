import { useState } from 'react';
import { Map, List, BarChart3, FileText, Bell, Settings } from 'lucide-react';
import './App.css';

interface Earthquake {
  id: string;
  location: string;
  magnitude: number;
  depth: number;
  timestamp: string;
  latitude: number;
  longitude: number;
  source: 'USGS' | 'KANDILLI' | 'AFAD';
}

const mockEarthquakes: Earthquake[] = [
  {
    id: '1',
    location: 'İstanbul',
    magnitude: 3.5,
    depth: 10,
    timestamp: new Date().toISOString(),
    latitude: 41.0082,
    longitude: 28.9784,
    source: 'KANDILLI'
  }
];

function App() {
  const [earthquakes] = useState<Earthquake[]>(mockEarthquakes);
  const [loading] = useState(false);
  const [error] = useState('');
  const [activeTab, setActiveTab] = useState('liste');

  if (loading) return (
    <div className="min-h-screen bg-surface flex items-center justify-center">
      <div className="text-on-surface font-body text-xl">Yükleniyor...</div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen bg-surface flex items-center justify-center">
      <div className="text-error font-body text-xl">{error}</div>
    </div>
  );

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
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-black font-headline text-on-surface mb-8">Son Depremler</h1>
            <div className="space-y-4">
              {earthquakes.map(eq => (
                <div key={eq.id} className="bg-surface-container p-6 rounded-2xl border border-outline-variant/15 hover:bg-surface-container-high transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center font-headline font-black text-2xl ${
                        eq.magnitude >= 5 ? 'bg-error-container text-error' :
                        eq.magnitude >= 4 ? 'bg-secondary-container text-secondary' :
                        'bg-primary-container text-on-primary'
                      }`}>
                        {eq.magnitude.toFixed(1)}
                      </div>
                      <div>
                        <div className="text-xl font-bold font-headline text-on-surface">{eq.location}</div>
                        <div className="text-sm text-on-surface-variant">Derinlik: {eq.depth} km</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-on-surface-variant">
                        {new Date(eq.timestamp).toLocaleString('tr-TR')}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
