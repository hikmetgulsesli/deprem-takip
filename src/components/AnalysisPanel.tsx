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
  colorVar: string;
  description: string;
}

const magnitudeRanges: MagnitudeRange[] = [
  { label: '1-2', min: 1, max: 2, colorVar: '--color-tertiary', description: 'Mikro' },
  { label: '2-3', min: 2, max: 3, colorVar: '--color-tertiary', description: 'Çok Hafif' },
  { label: '3-4', min: 3, max: 4, colorVar: '--color-secondary', description: 'Hafif' },
  { label: '4-5', min: 4, max: 5, colorVar: '--color-secondary', description: 'Orta' },
  { label: '5+', min: 5, max: Infinity, colorVar: '--color-error', description: 'Güçlü' },
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

  // Calculate pie chart segments
  const pieSegments = [
    { label: 'M 1.0 - 3.0', value: distribution.slice(0, 2).reduce((sum, d) => sum + d.count, 0), color: 'var(--color-tertiary)', desc: 'Mikro Sarsıntılar' },
    { label: 'M 3.0 - 5.0', value: distribution.slice(2, 4).reduce((sum, d) => sum + d.count, 0), color: 'var(--color-secondary)', desc: 'Hissedilebilir' },
    { label: 'M 5.0+', value: distribution[4]?.count || 0, color: 'var(--color-error)', desc: 'Yüksek Risk' },
  ];
  const totalPie = pieSegments.reduce((sum, s) => sum + s.value, 0) || 1;
  const piePercentages = pieSegments.map(s => Math.round((s.value / totalPie) * 100));

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
          <span className="analysis-subtitle">Global Seismic Intelligence &amp; Data Insights</span>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="bento-grid">
        {/* Main Trend Chart - Magnitude Distribution */}
        <section className="bento-main">
          <div className="bento-header">
            <div>
              <h3 className="bento-title">BÜYÜKLÜK DAĞILIMI</h3>
              <p className="bento-subtitle">Deprem büyüklüğü aralıklarına göre dağılım</p>
            </div>
            <div className="bento-badge">
              <span className="live-badge">LIVE PULSE</span>
            </div>
          </div>
          
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
                      backgroundColor: `var(${item.colorVar})`
                    }}
                  />
                </div>
                <span className="distribution-description">{item.description}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Side Stats */}
        <div className="bento-side">
          {/* Stats Cards */}
          <div className="side-card stats-mini">
            <h3 className="side-title">İSTATİSTİKLER</h3>
            <div className="stats-mini-grid">
              <div className="stat-mini">
                <span className="stat-mini-value">{total}</span>
                <span className="stat-mini-label">Toplam</span>
              </div>
              <div className="stat-mini">
                <span className="stat-mini-value">{avgMagnitude}</span>
                <span className="stat-mini-label">Ort. M</span>
              </div>
              <div className="stat-mini">
                <span className="stat-mini-value stat-mini-error">{maxMagnitude}</span>
                <span className="stat-mini-label">Max M</span>
              </div>
              <div className="stat-mini">
                <span className="stat-mini-value stat-mini-tertiary">{avgDepth}</span>
                <span className="stat-mini-label">Ort. km</span>
              </div>
            </div>
          </div>

          {/* Total Activity Card */}
          <div className="side-card activity-card">
            <div className="activity-header">
              <div>
                <h4 className="activity-value">{total}</h4>
                <p className="activity-label">Toplam Aktivite</p>
              </div>
              <div className="activity-icon">
                <span className="material-symbols-outlined">pulse_alert</span>
              </div>
            </div>
            <div className="activity-sparkline">
              <svg viewBox="0 0 100 20" className="sparkline-svg">
                <path d="M0,10 L10,12 L20,5 L30,15 L40,8 L50,12 L60,3 L70,14 L80,9 L90,12 L100,6" fill="none" strokeWidth="1" />
              </svg>
            </div>
          </div>
        </div>

        {/* Magnitude Segmentation (Pie Chart) */}
        <section className="bento-pie">
          <h3 className="bento-title">MAGNİTÜD SEGMENTASYONU</h3>
          <div className="pie-content">
            <div className="pie-chart">
              <svg viewBox="0 0 36 36" className="pie-svg">
                <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="var(--color-surface-container)" strokeWidth="4" />
                <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="var(--color-tertiary)" strokeWidth="4" 
                  strokeDasharray={`${piePercentages[0]} 100`} strokeDashoffset="0" />
                <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="var(--color-secondary)" strokeWidth="4" 
                  strokeDasharray={`${piePercentages[1]} 100`} strokeDashoffset={`-${piePercentages[0]}`} />
                <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="var(--color-error)" strokeWidth="4" 
                  strokeDasharray={`${piePercentages[2]} 100`} strokeDashoffset={`-${piePercentages[0] + piePercentages[1]}`} />
              </svg>
              <div className="pie-center">
                <span className="pie-total">{total}</span>
                <span className="pie-label">TOPLAM</span>
              </div>
            </div>
            <div className="pie-legend">
              {pieSegments.map((seg, idx) => (
                <div key={seg.label} className="legend-item">
                  <div className="legend-color" style={{ backgroundColor: seg.color }}></div>
                  <div className="legend-info">
                    <p className="legend-label">{seg.label}</p>
                    <p className="legend-desc">{seg.desc}</p>
                  </div>
                  <span className="legend-percent">{piePercentages[idx]}%</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Top Locations */}
        <section className="bento-locations">
          <h3 className="bento-title">EN AKTİF BÖLGELER</h3>
          <p className="bento-subtitle">Deprem sayısına göre ilk 5 lokasyon</p>
          
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
                ? `Toplam ${total} deprem analiz edildi. En güçlü deprem ${maxMagnitude}M olarak ölçüldü.`
                : 'Henüz veri bulunmamaktadır'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
