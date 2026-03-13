'use client'

import { useState } from 'react'

type Bike = {
  id: number
  model_year: number
  model_des: string
  price: number
  weight: number
  frame_material: string
  bike_type_main: string
  reach: number
  stack: number
  wheelbase: number
  head_angle: number
  chainstay: number
  bb_drop: number
}

export default function ComparePage() {
  const [bike, setBike] = useState<Bike | null>(null)
  const [loading, setLoading] = useState(false)
  const [debugLog, setDebugLog] = useState<string[]>([])

  function log(msg: string) {
    setDebugLog(prev => [...prev, `${new Date().toISOString().slice(11,23)} — ${msg}`])
  }

  async function fetchRandomBike() {
    setLoading(true)
    const url = `/api/random-bike?t=${Date.now()}`
    log(`Fetching: ${url}`)

    try {
      const res = await fetch(url)
      log(`Response status: ${res.status} ${res.statusText}`)

      const text = await res.text()
      log(`Raw response: ${text.slice(0, 300)}`)

      let data
      try {
        data = JSON.parse(text)
        log(`Parsed OK — bike id: ${data?.id}, name: ${data?.model_des}`)
      } catch (e) {
        log(`JSON parse error: ${e}`)
        setLoading(false)
        return
      }

      if (!data || !data.id) {
        log(`No bike in response — data was: ${JSON.stringify(data)}`)
        setLoading(false)
        return
      }

      setBike(data)
    } catch (e) {
      log(`Fetch error: ${e}`)
    }

    setLoading(false)
  }

  return (
    <main className="min-h-screen p-4 md:p-8 font-sans">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-[#0a0a0a]">Visual Bike Comparison Tool</h1>

        <button
          onClick={fetchRandomBike}
          disabled={loading}
          className="bg-bikotic-blue text-white px-8 py-4 text-lg font-bold rounded-lg hover:bg-bikotic-blue-dark transition-colors shadow-md disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Show Random Bike'}
        </button>

        {/* DEBUG LOG */}
        {debugLog.length > 0 && (
          <div className="mt-6 bg-black text-green-400 font-mono text-sm p-4 rounded-lg">
            <p className="text-white font-bold mb-2">Debug log:</p>
            {debugLog.map((line, i) => <p key={i}>{line}</p>)}
          </div>
        )}

        {bike && (
          <div className="mt-8 bg-white border-2 border-gray-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-1 text-[#0a0a0a]">{bike.model_des}</h2>
            <p className="text-bikotic-blue font-semibold mb-6">{bike.model_year} · {bike.bike_type_main}</p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Price</p>
                <p className="text-lg font-bold">£{bike.price.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Weight</p>
                <p className="text-lg font-bold">{bike.weight} kg</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Frame</p>
                <p className="text-lg font-bold">{bike.frame_material}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Reach</p>
                <p className="text-lg font-bold">{bike.reach} mm</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Stack</p>
                <p className="text-lg font-bold">{bike.stack} mm</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Wheelbase</p>
                <p className="text-lg font-bold">{bike.wheelbase} mm</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Head Angle</p>
                <p className="text-lg font-bold">{bike.head_angle}°</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Chainstay</p>
                <p className="text-lg font-bold">{bike.chainstay} mm</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
