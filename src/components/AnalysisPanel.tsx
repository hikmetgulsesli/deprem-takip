import './AnalysisPanel.css';

interface AnalysisPanelProps {
  earthquakes: Array<{
    id: string;
    location: string;
    magnitude: number;
    depth: number;
    timestamp?: string;
    date?: string;
    latitude: number;
    longitude: number;
    source: string;
  }>;
}

interface MagnitudeRange {
  label: string;
  min: number;
  max: number;
  color: string;
  description: string;
}

const magnitudeRanges: MagnitudeRange[] = [
  { label: '1-2', min: 1, max: 2, color: '#59d5fb', description: 'Mikro' },
  { label: '2-3', min: 2, max: 3, color: '#59d5fb', description: 'Çok Hafif' },
  { label: '3-4', min: 3, max: 4, color: '#ffb59d', description: 'Hafif' },
  { label: '4-5', min: 4, max: 5, color: '#ffb59d', description: 'Orta' },
  { label: '5+', min: 5, max: Infinity, color: '#ffb4ab', description: 'Güçlü' },
];

export function AnalysisPanel({ earthquakes }: AnalysisPanelProps) {
  // Calculate magnitude distribution
  const distribution = magnitudeRanges.map(range => {
    const count = earthquakes.filter(eq => {
      if (range.max === Infinity) {
        return eq.magnitude >= range.min;
      }
      return eq.magnitude >= range.min && eq.magnitude < range.max;
    }).length;
    return { ...range, count };
  });

  const maxCount = Math.max(...distribution.map(d => d.count), 1);
  const total = earthquakes.length;

  // Calculate top 5 locations
  const locationCounts = earthquakes.reduce((acc, eq) => {
    // Extract region from location (e.g., "MARMARA DENİZİ" from "MARMARA DENİZİ (SİLİVRİ)")
    const region = eq.location.split('(')[0].trim();
    acc[region] = (acc[region] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topLocations = Object.entries(locationCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Calculate statistics
  const avgMagnitude = total > 0 
    ? (earthquakes.reduce((sum, eq) => sum + eq.magnitude, 0) / total).toFixed(1)
    : '0.0';
  
  const maxMagnitude = total > 0
    ? Math.max(...earthquakes.map(eq => eq.magnitude)).toFixed(1)
    : '0.0';

  const avgDepth = total > 0
    ? (earthquakes.reduce((sum, eq) => sum + eq.depth, 0) / total).toFixed(1)
    : '0.0';

  return (
    <div className="analysis-panel">
      {/* Page Header */}
      <div className="analysis-header">
        <h2 className="analysis-title">SİSMİK ANALİZ</h2>
        <div className="analysis-subtitle-row">
          <div className="analysis-line"></div>
          <span className="analysis-subtitle">Deprem İstatistikleri ve Dağılım Analizi</span>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="stats-grid">
        <div className="stat-card">
          <p className="stat-label">TOPLAM DEPREM</p>
          <div className="stat-value-row">
            <span className="stat-value">{total}</span>
          </div>
        </div>
        <div className="stat-card">
          <p className="stat-label">ORTALAMA BÜYÜKLÜK</p>
          <div className="stat-value-row">
            <span className="stat-value">{avgMagnitude}</span>
            <span className="stat-unit">M</span>
          </div>
        </div>
        <div className="stat-card">
          <p className="stat-label">EN YÜKSEK BÜYÜKLÜK</p>
          <div className="stat-value-row">
            <span className="stat-value stat-value-error">{maxMagnitude}</span>
            <span className="stat-unit">M</span>
          </div>
        </div>
        <div className="stat-card">
          <p className="stat-label">ORTALAMA DERİNLİK</p>
          <div className="stat-value-row">
            <span className="stat-value stat-value-tertiary">{avgDepth}</span>
            <span className="stat-unit">km</span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="analysis-grid">
        {/* Magnitude Distribution */}
        <section className="distribution-section">
          <h3 className="section-title">BÜYÜKLÜK DAĞILIMI</h3>
          <p className="section-subtitle">Deprem büyüklüğü aralıklarına göre dağılım</p>
          
          <div className="distribution-bars">
            {distribution.map((item) => (
              <div key={item.label} className="distribution-item">
                <div className="distribution-label-row">
                  <span className="distribution-label">M {item.label}</span>
                  <span className="distribution-count">{item.count}</span>
                </div>
                <div className="distribution-bar-bg">
                  <div 
                    className="distribution-bar-fill"
                    style={{ 
                      width: `${(item.count / maxCount) * 100}%`,
                      backgroundColor: item.color
                    }}
                  />
                </div>
                <span className="distribution-description">{item.description}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Top Locations */}
        <section className="locations-section">
          <h3 className="section-title">EN AKTİF BÖLGELER</h3>
          <p className="section-subtitle">Deprem sayısına göre ilk 5 lokasyon</p>
          
          <div className="locations-list">
            {topLocations.length > 0 ? (
              topLocations.map(([location, count], index) => (
                <div key={location} className="location-item">
                  <div className="location-rank">{index + 1}</div>
                  <div className="location-info">
                    <span className="location-name">{location}</span>
                    <div className="location-bar-bg">
                      <div 
                        className="location-bar-fill"
                        style={{ 
                          width: `${(count / topLocations[0][1]) * 100}%`
                        }}
                      />
                    </div>
                  </div>
                  <span className="location-count">{count}</span>
                </div>
              ))
            ) : (
              <div className="location-empty">Henüz veri bulunmuyor</div>
            )}
          </div>
        </section>
      </div>

      {/* Summary Card */}
      <section className="summary-section">
        <div className="summary-content">
          <span className="material-symbols-outlined summary-icon">analytics</span>
          <div className="summary-text">
            <h4 className="summary-title">Analiz Özeti</h4>
            <p className="summary-description">
              {total > 0 
                ? `Son dönemde ${total} deprem kaydedildi. En yüksek büyüklük ${maxMagnitude}M olarak ölçüldü.`
                : 'Henüz analiz edilecek deprem verisi bulunmuyor.'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
