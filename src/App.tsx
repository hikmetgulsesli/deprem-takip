import { useState } from 'react'
import './App.css'

interface Earthquake {
  id: string
  location: string
  magnitude: number
  depth: number
  date: string
  latitude: number
  longitude: number
}

const mockEarthquakes: Earthquake[] = [
  {
    id: '1',
    location: 'İstanbul',
    magnitude: 3.5,
    depth: 10,
    date: new Date().toISOString(),
    latitude: 41.0082,
    longitude: 28.9784
  }
]

function App() {
  const [earthquakes] = useState<Earthquake[]>(mockEarthquakes)
  const [loading] = useState(false)
  const [error] = useState('')

  if (loading) return <div className="loading">Yükleniyor...</div>
  if (error) return <div className="error">{error}</div>

  return (
    <div className="container">
      <h1 className="title">Deprem Takip</h1>
      <div className="earthquake-list">
        {earthquakes.map(eq => (
          <div key={eq.id} className="earthquake-card">
            <div className="magnitude">{eq.magnitude}</div>
            <div className="details">
              <div className="location">{eq.location}</div>
              <div className="meta">Derinlik: {eq.depth} km</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
