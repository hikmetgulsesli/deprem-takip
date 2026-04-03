import './About.css';

export function About() {
  const version = '1.0.0';
  const lastUpdate = new Date().toLocaleDateString('tr-TR');

  return (
    <div className="about-container">
      <div className="about-card">
        <h1 className="about-title">Deprem Takip</h1>
        <p className="about-description">
          Deprem Takip, Türkiye ve dünya genelindeki deprem aktivitelerini gerçek zamanlı olarak 
          izlemenizi sağlayan modern bir web uygulamasıdır. Kandilli Rasathanesi ve USGS verilerini 
          bir araya getirerek kapsamlı bir deprem takip deneyimi sunar.
        </p>
      </div>

      <div className="about-card">
        <h2 className="section-title">Veri Kaynakları</h2>
        
        <div className="source-item">
          <div className="source-header">
            <span className="source-badge kandilli">Kandilli</span>
            <h3 className="source-name">Kandilli Rasathanesi</h3>
          </div>
          <p className="source-description">
            Türkiye ve çevresindeki depremler için yerel veri sağlayıcısı. 
            Boğaziçi Üniversitesi Kandilli Rasathanesi ve Deprem Araştırma Enstitüsü'nden 
            alınan gerçek zamanlı veriler.
          </p>
          <div className="source-meta">
            <span className="meta-label">URL:</span>
            <a href="http://www.koeri.boun.edu.tr/sismo/2/tr/" target="_blank" rel="noopener noreferrer" className="source-link">
              www.koeri.boun.edu.tr
            </a>
          </div>
          <div className="source-meta">
            <span className="meta-label">Veri Tipi:</span>
            <span>Türkiye ve çevresi depremleri</span>
          </div>
          <div className="source-meta">
            <span className="meta-label">Yenileme:</span>
            <span>Her 5 dakikada bir</span>
          </div>
        </div>

        <div className="source-divider"></div>

        <div className="source-item">
          <div className="source-header">
            <span className="source-badge usgs">USGS</span>
            <h3 className="source-name">USGS Earthquake Hazards Program</h3>
          </div>
          <p className="source-description">
            Dünya genelindeki depremler için uluslararası veri sağlayıcısı. 
            ABD Jeoloji Araştırmaları Kurumu'nun küresel deprem veritabanından 
            alınan gerçek zamanlı veriler.
          </p>
          <div className="source-meta">
            <span className="meta-label">URL:</span>
            <a href="https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php" target="_blank" rel="noopener noreferrer" className="source-link">
              earthquake.usgs.gov
            </a>
          </div>
          <div className="source-meta">
            <span className="meta-label">Veri Tipi:</span>
            <span>Dünya geneli depremler</span>
          </div>
          <div className="source-meta">
            <span className="meta-label">Yenileme:</span>
            <span>Her 1 dakikada bir</span>
          </div>
        </div>
      </div>

      <div className="about-card disclaimer-card">
        <h2 className="section-title">Yasal Uyarı</h2>
        <p className="disclaimer-text">
          Bu uygulamadaki veriler bilgilendirme amaçlıdır, deprem tahmini için kullanılamaz. 
          Deprem verileri üçüncü taraf kaynaklardan sağlanmaktadır ve gecikme veya hata içerebilir. 
          Resmi bilgi ve uyarılar için AFAD ve Kandilli Rasathanesi web sitelerini kontrol ediniz.
        </p>
      </div>

      <div className="about-card version-card">
        <div className="version-grid">
          <div className="version-item">
            <span className="version-label">Versiyon</span>
            <span className="version-value">{version}</span>
          </div>
          <div className="version-item">
            <span className="version-label">Son Güncelleme</span>
            <span className="version-value">{lastUpdate}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
