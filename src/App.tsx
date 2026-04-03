import { useState } from 'react'
import type { Earthquake } from './types'
import './index.css'

const mockEarthquakes: Earthquake[] = [
  {
    id: '1',
    location: 'İstanbul',
    magnitude: 3.5,
    depth: 10,
    timestamp: new Date().toISOString(),
    latitude: 41.0082,
    longitude: 28.9784,
    source: 'Kandilli'
  }
]

function App() {
  const [earthquakes] = useState<Earthquake[]>(mockEarthquakes)
  const [loading] = useState(false)
  const [error] = useState('')

  if (loading) return <div className="text-on-surface font-body">Yükleniyor...</div>
  if (error) return <div className="text-error font-body">{error}</div>

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <h1 className="font-headline text-4xl font-bold text-slate-100 mb-8">Deprem Takip</h1>
      <div className="space-y-4">
        {earthquakes.map(eq => (
          <div key={eq.id} className="bg-slate-800 rounded-xl p-6 flex items-center gap-6">
            <div className="font-headline text-5xl font-bold text-blue-400">{eq.magnitude}</div>
            <div className="flex-1">
              <div className="font-headline text-xl text-slate-100">{eq.location}</div>
              <div className="font-body text-sm text-slate-400 mt-1">Derinlik: {eq.depth} km</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
